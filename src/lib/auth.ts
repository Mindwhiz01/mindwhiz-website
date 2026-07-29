// ---------------------------------------------------------------------------
// Admin auth. A single shared password (ADMIN_PASSWORD) is exchanged for a
// signed, HTTP-only session cookie. The cookie carries an expiry timestamp and
// an HMAC-SHA256 signature so it can be verified without any server state.
//
// Uses the Web Crypto API (globalThis.crypto.subtle) so the same code runs in
// both the Node.js route handlers and the Edge middleware.
// ---------------------------------------------------------------------------

export const ADMIN_COOKIE = "mw_admin_session";
const SESSION_MS = 1000 * 60 * 60 * 12; // 12 hours

function getSecret(): string {
  // Falls back to the admin password so local dev works with just one var set,
  // but a dedicated ADMIN_SESSION_SECRET is strongly recommended in production.
  return (
    process.env.ADMIN_SESSION_SECRET ||
    process.env.ADMIN_PASSWORD ||
    "mindwhiz-dev-insecure-secret"
  );
}

function toHex(buf: ArrayBuffer): string {
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

async function hmac(payload: string): Promise<string> {
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    enc.encode(getSecret()),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const sig = await crypto.subtle.sign("HMAC", key, enc.encode(payload));
  return toHex(sig);
}

/** Constant-time-ish string compare to avoid trivial timing leaks. */
function safeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

/** Create a signed session token valid for SESSION_MS. */
export async function createSessionToken(): Promise<string> {
  const exp = Date.now() + SESSION_MS;
  const payload = String(exp);
  const sig = await hmac(payload);
  return `${payload}.${sig}`;
}

/** Verify a session token; returns true only if signature is valid and unexpired. */
export async function verifySessionToken(token: string | undefined): Promise<boolean> {
  if (!token) return false;
  const dot = token.lastIndexOf(".");
  if (dot < 0) return false;
  const payload = token.slice(0, dot);
  const sig = token.slice(dot + 1);
  const expected = await hmac(payload);
  if (!safeEqual(sig, expected)) return false;
  const exp = Number(payload);
  return Number.isFinite(exp) && exp > Date.now();
}

/** Check a submitted password against ADMIN_PASSWORD. */
export function passwordMatches(input: string): boolean {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) return false;
  return safeEqual(input, expected);
}

export function isAdminConfigured(): boolean {
  return Boolean(process.env.ADMIN_PASSWORD);
}

export const sessionCookieOptions = {
  httpOnly: true as const,
  sameSite: "lax" as const,
  secure: process.env.NODE_ENV === "production",
  path: "/",
  maxAge: SESSION_MS / 1000,
};
