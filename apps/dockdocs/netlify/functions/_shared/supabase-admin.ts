// Server-side Supabase admin client using the service_role key.
// Uses raw fetch (same as billing-auth.ts) — no SDK import, keeps bundle lean.
//
// The service_role key BYPASSES RLS, so every caller must pass an explicit
// user_id and enforce ownership in the query itself (eq filter on user_id).
// NEVER expose this key to the client.
//
// Required Netlify env var: SUPABASE_SERVICE_ROLE_KEY
// (set in Netlify Dashboard → Site configuration → Environment variables)

declare const Netlify: {
  env: { get(name: string): string | undefined };
};

const SUPABASE_URL =
  Netlify.env.get("NEXT_PUBLIC_SUPABASE_URL")?.trim() ||
  "https://kxoqgjtlfggsdhtwofoo.supabase.co";

function serviceRoleKey(): string {
  const key = Netlify.env.get("SUPABASE_SERVICE_ROLE_KEY")?.trim();
  if (!key) {
    throw new Error(
      "SUPABASE_SERVICE_ROLE_KEY is not set. " +
        "Add it in Netlify Dashboard → Site configuration → Environment variables.",
    );
  }
  return key;
}

function restHeaders(): Record<string, string> {
  const key = serviceRoleKey();
  return {
    "Content-Type": "application/json",
    apikey: key,
    Authorization: `Bearer ${key}`,
    Prefer: "return=representation",
  };
}

/** POST /rest/v1/<table> — insert one row, return the created record. */
export async function dbInsert<T>(
  table: string,
  row: Record<string, unknown>,
): Promise<T> {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/${table}`, {
    method: "POST",
    headers: { ...restHeaders(), Prefer: "return=representation" },
    body: JSON.stringify(row),
  });
  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`Supabase insert into ${table} failed (${res.status}): ${body}`);
  }
  const rows = (await res.json()) as T[];
  return rows[0];
}

/** GET /rest/v1/<table>?<query> — select rows. query is a PostgREST filter string. */
export async function dbSelect<T>(
  table: string,
  query: string,
  columns = "*",
): Promise<T[]> {
  const url = `${SUPABASE_URL}/rest/v1/${table}?select=${encodeURIComponent(columns)}&${query}`;
  const res = await fetch(url, {
    method: "GET",
    headers: restHeaders(),
  });
  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`Supabase select from ${table} failed (${res.status}): ${body}`);
  }
  return res.json() as Promise<T[]>;
}

/** DELETE /rest/v1/<table>?<query> — delete matching rows. */
export async function dbDelete(table: string, query: string): Promise<void> {
  const url = `${SUPABASE_URL}/rest/v1/${table}?${query}`;
  const res = await fetch(url, {
    method: "DELETE",
    headers: restHeaders(),
  });
  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`Supabase delete from ${table} failed (${res.status}): ${body}`);
  }
}
