import type { Context } from "@netlify/functions";

declare const Netlify: {
  env: {
    get(name: string): string | undefined;
  };
};

const ALLOWED_ORIGIN = /^https:\/\/([a-z0-9-]+\.)*(dockdocs\.app|netlify\.app)$/i;
const ADOBE = "https://pdf-services.adobe.io";

// Reverse pdf -> office targets (high-fidelity, ToS-clean engine).
const TARGET: Record<string, string> = {
  "pdf-to-word": "docx",
  "pdf-to-excel": "xlsx",
  "pdf-to-ppt": "pptx",
};

// Best-effort per-IP sliding-window limiter (per warm instance).
const rlHits = new Map<string, number[]>();
function isRateLimited(req: Request, limit: number, windowMs: number): boolean {
  const ip =
    req.headers.get("x-nf-client-connection-ip") ||
    (req.headers.get("x-forwarded-for") || "").split(",")[0].trim() ||
    "anon";
  const now = Date.now();
  const arr = (rlHits.get(ip) || []).filter((ts) => now - ts < windowMs);
  arr.push(now);
  rlHits.set(ip, arr);
  if (rlHits.size > 5000) {
    for (const [k, v] of rlHits) if (!v.length || now - v[v.length - 1] > windowMs) rlHits.delete(k);
  }
  return arr.length > limit;
}

// Cache the OAuth token per warm instance (cheap, but no need to re-fetch each call).
let cachedToken = "";
let tokenExpiresAt = 0;
async function getToken(id: string, secret: string): Promise<string> {
  const now = Date.now();
  if (cachedToken && now < tokenExpiresAt) return cachedToken;
  const res = await fetch(`${ADOBE}/token`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: `client_id=${encodeURIComponent(id)}&client_secret=${encodeURIComponent(secret)}`,
  });
  if (!res.ok) throw new Error(`token ${res.status}`);
  const j = (await res.json()) as { access_token?: string };
  if (!j.access_token) throw new Error("no token");
  cachedToken = j.access_token;
  tokenExpiresAt = now + 20 * 60_000; // conservative 20-min cache
  return cachedToken;
}

// ---------------------------------------------------------------------------
// Control plane for Adobe PDF Services Export (pdf -> docx/xlsx/pptx).
// The source PDF and the result file never pass through this function — the
// browser PUTs to Adobe's presigned uploadUri and GETs the presigned
// downloadUri directly. Three actions: create -> convert -> status.
// ---------------------------------------------------------------------------
export default async (req: Request, _context: Context) => {
  if (req.method !== "POST") {
    return json({ ok: false, code: "METHOD_NOT_ALLOWED", message: "Use POST." }, 405);
  }

  const origin = req.headers.get("origin");
  if (origin && !ALLOWED_ORIGIN.test(origin) && !/^http:\/\/localhost(:\d+)?$/i.test(origin)) {
    return json({ ok: false, code: "FORBIDDEN_ORIGIN", message: "Requests are only allowed from DockDocs." }, 403);
  }

  const id = Netlify.env.get("PDF_SERVICES_CLIENT_ID")?.trim();
  const secret = Netlify.env.get("PDF_SERVICES_CLIENT_SECRET")?.trim();
  if (!id || !secret) {
    return json({ ok: false, code: "NOT_CONFIGURED", message: "Adobe PDF Services is not configured." }, 503);
  }

  let body: { action?: string; route?: string; assetID?: string; jobUrl?: string };
  try {
    body = await req.json();
  } catch {
    return json({ ok: false, code: "INVALID_BODY", message: "Expected JSON body." }, 400);
  }

  const headers = (tok: string) => ({
    Authorization: `Bearer ${tok}`,
    "x-api-key": id,
    "Content-Type": "application/json",
  });

  try {
    // ── CREATE: make an asset + presigned upload URI ──
    if (body.action === "create") {
      if (isRateLimited(req, 20, 60_000)) {
        return json({ ok: false, code: "RATE_LIMITED", message: "Too many conversions — please wait a minute and try again." }, 429);
      }
      const route = body.route?.trim() ?? "";
      if (!TARGET[route]) {
        return json({ ok: false, code: "INVALID_ROUTE", message: "Unsupported route." }, 400);
      }
      const tok = await getToken(id, secret);
      const res = await fetch(`${ADOBE}/assets`, {
        method: "POST",
        headers: headers(tok),
        body: JSON.stringify({ mediaType: "application/pdf" }),
      });
      if (!res.ok) {
        return json({ ok: false, code: "ASSET_FAILED", message: "Could not start the conversion." }, 502);
      }
      const a = (await res.json()) as { assetID?: string; uploadUri?: string };
      if (!a.assetID || !a.uploadUri) {
        return json({ ok: false, code: "ASSET_FAILED", message: "Could not start the conversion." }, 502);
      }
      return json({ ok: true, assetID: a.assetID, uploadUri: a.uploadUri, outputExt: TARGET[route] });
    }

    // ── CONVERT: kick off the export job, return the poll URL ──
    if (body.action === "convert") {
      const assetID = body.assetID?.trim() ?? "";
      const route = body.route?.trim() ?? "";
      if (!assetID || !TARGET[route]) {
        return json({ ok: false, code: "INVALID_REQUEST", message: "assetID and a valid route are required." }, 400);
      }
      const tok = await getToken(id, secret);
      const res = await fetch(`${ADOBE}/operation/exportpdf`, {
        method: "POST",
        headers: headers(tok),
        body: JSON.stringify({ assetID, targetFormat: TARGET[route] }),
      });
      if (res.status !== 201) {
        const detail = await res.text().catch(() => "");
        console.error("[adobe] export job failed", res.status, detail.slice(0, 300));
        return json({ ok: false, code: "JOB_FAILED", message: "The file could not be converted." }, 502);
      }
      const jobUrl = res.headers.get("location");
      if (!jobUrl) {
        return json({ ok: false, code: "NO_JOB", message: "No job URL was returned." }, 502);
      }
      return json({ ok: true, jobUrl });
    }

    // ── STATUS: poll the job ──
    if (body.action === "status") {
      const jobUrl = body.jobUrl?.trim() ?? "";
      if (!jobUrl.startsWith(`${ADOBE}/`)) {
        return json({ ok: false, code: "INVALID_JOB", message: "Invalid job URL." }, 400);
      }
      const tok = await getToken(id, secret);
      const res = await fetch(jobUrl, { headers: { Authorization: `Bearer ${tok}`, "x-api-key": id } });
      if (!res.ok) {
        return json({ ok: false, code: "STATUS_FAILED", message: "Could not check conversion status." }, 502);
      }
      const j = (await res.json()) as { status?: string; asset?: { downloadUri?: string } };
      if (j.status === "failed") {
        return json({ ok: false, code: "CONVERSION_FAILED", message: "The file could not be converted." }, 200);
      }
      if (j.status === "done") {
        return json({ ok: true, status: "done", downloadUri: j.asset?.downloadUri ?? null });
      }
      return json({ ok: true, status: j.status ?? "in progress" });
    }

    return json({ ok: false, code: "INVALID_ACTION", message: "Unknown action." }, 400);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return json({ ok: false, code: "INTERNAL_ERROR", message }, 500);
  }
};

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

export const config = {
  path: "/api/adobe-export",
};
