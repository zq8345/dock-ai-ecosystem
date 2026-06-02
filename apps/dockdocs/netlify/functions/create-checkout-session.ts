import type { Config, Context } from "@netlify/functions";

declare const Netlify: {
  env: {
    get(name: string): string | undefined;
  };
};

type CheckoutPayload = {
  tier?: "PLUS" | "PRO";
  userId?: string;
  email?: string;
  origin?: string;
};

const priceEnvByTier = {
  PLUS: "DOCKDOCS_STRIPE_PLUS_PRICE_ID",
  PRO: "DOCKDOCS_STRIPE_PRO_PRICE_ID",
} as const;

export default async (req: Request, _context: Context) => {
  if (req.method !== "POST") {
    return Response.json(
      {
        ok: false,
        code: "METHOD_NOT_ALLOWED",
        message: "Use POST to create a checkout session.",
      },
      { status: 405, headers: { Allow: "POST" } },
    );
  }

  let payload: CheckoutPayload;
  try {
    payload = (await req.json()) as CheckoutPayload;
  } catch {
    return Response.json(
      {
        ok: false,
        code: "INVALID_JSON",
        message: "Send JSON with tier, userId, and email.",
      },
      { status: 400 },
    );
  }

  const tier = payload.tier;
  if (tier !== "PLUS" && tier !== "PRO") {
    return Response.json(
      {
        ok: false,
        code: "INVALID_TIER",
        message: "Choose PLUS or PRO.",
      },
      { status: 400 },
    );
  }

  const stripeSecretKey = readEnv("STRIPE_SECRET_KEY");
  const priceId = readEnv(priceEnvByTier[tier]);
  if (!stripeSecretKey || !priceId) {
    return Response.json(
      {
        ok: false,
        code: "BILLING_NOT_CONFIGURED",
        message:
          "Billing is not configured yet. Set STRIPE_SECRET_KEY and the DockDocs Stripe price ID environment variables.",
      },
      { status: 503 },
    );
  }

  const origin = sanitizeOrigin(payload.origin) ?? readSiteOrigin();
  const params = new URLSearchParams({
    mode: "subscription",
    success_url: `${origin}/account/?checkout=success&tier=${tier}&session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origin}/pricing/?checkout=cancelled`,
    client_reference_id: payload.userId ?? "",
  });
  params.append("line_items[0][price]", priceId);
  params.append("line_items[0][quantity]", "1");
  params.append("metadata[tier]", tier);
  if (payload.userId) {
    params.append("metadata[userId]", payload.userId);
  }
  if (payload.email) {
    params.append("customer_email", payload.email);
  }

  const response = await fetch("https://api.stripe.com/v1/checkout/sessions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${stripeSecretKey}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: params,
  });
  const session = (await response.json().catch(() => null)) as
    | { id?: string; url?: string; error?: { message?: string } }
    | null;

  if (!response.ok || !session?.url) {
    return Response.json(
      {
        ok: false,
        code: "STRIPE_CHECKOUT_FAILED",
        message:
          session?.error?.message ||
          "Stripe checkout could not be created. Check Stripe price configuration.",
      },
      { status: 502 },
    );
  }

  return Response.json({
    ok: true,
    id: session.id,
    url: session.url,
  });
};

export const config: Config = {
  path: "/api/create-checkout-session",
};

function readEnv(name: string) {
  return (
    (typeof Netlify !== "undefined" ? Netlify.env.get(name) : undefined) ??
    process.env[name]
  );
}

function readSiteOrigin() {
  const siteUrl =
    readEnv("URL") || readEnv("DEPLOY_PRIME_URL") || "https://dockdocs.app";
  return siteUrl.replace(/\/+$/u, "");
}

function sanitizeOrigin(value?: string) {
  if (!value) {
    return null;
  }

  try {
    const url = new URL(value);
    return `${url.protocol}//${url.host}`;
  } catch {
    return null;
  }
}
