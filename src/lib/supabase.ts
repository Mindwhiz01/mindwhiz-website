// ---------------------------------------------------------------------------
// Supabase server-side client. Uses the SERVICE ROLE key, so this module must
// only ever be imported from server code (server components, route handlers).
// Never import it into a "use client" file.
//
// Everything degrades gracefully: if the env vars are missing the site still
// builds and renders using the static seed content — `getSupabase()` just
// returns null and callers fall back.
// ---------------------------------------------------------------------------

import { createClient, type SupabaseClient } from "@supabase/supabase-js";

let cached: SupabaseClient | null | undefined;

export function getSupabase(): SupabaseClient | null {
  if (cached !== undefined) return cached;

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key) {
    cached = null;
    return null;
  }

  cached = createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  return cached;
}

export function isSupabaseConfigured(): boolean {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY,
  );
}
