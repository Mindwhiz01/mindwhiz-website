// ---------------------------------------------------------------------------
// Google service-account auth. Signs a JWT with the service account's private
// key and exchanges it for a short-lived OAuth2 access token, which the GA4 and
// Search Console REST calls use as a Bearer token.
//
// Self-contained (Node crypto only, no googleapis dependency) and server-only —
// the private key must never reach the browser. Tokens are cached in memory
// until shortly before they expire.
// ---------------------------------------------------------------------------

import { createSign } from "crypto";

const TOKEN_URL = "https://oauth2.googleapis.com/token";

type CachedToken = { token: string; expiresAt: number };
const cache = new Map<string, CachedToken>();

function base64url(input: Buffer | string): string {
  return Buffer.from(input)
    .toString("base64")
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
}

function getCredentials(): { email: string; privateKey: string } | null {
  const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  let privateKey = process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY;
  if (!email || !privateKey) return null;
  // Env vars store the PEM with literal "\n"; turn them back into real newlines.
  privateKey = privateKey.replace(/\\n/g, "\n");
  return { email, privateKey };
}

export function isGoogleConfigured(): boolean {
  return getCredentials() !== null;
}

/** Get an access token for the given OAuth scope (space-separated for multiple). */
export async function getAccessToken(scope: string): Promise<string> {
  const creds = getCredentials();
  if (!creds) throw new Error("Google service account is not configured.");

  const cached = cache.get(scope);
  const now = Date.now();
  if (cached && cached.expiresAt > now + 60_000) return cached.token;

  const iat = Math.floor(now / 1000);
  const exp = iat + 3600;
  const header = base64url(JSON.stringify({ alg: "RS256", typ: "JWT" }));
  const claim = base64url(
    JSON.stringify({
      iss: creds.email,
      scope,
      aud: TOKEN_URL,
      iat,
      exp,
    }),
  );
  const signingInput = `${header}.${claim}`;
  const signature = base64url(
    createSign("RSA-SHA256").update(signingInput).sign(creds.privateKey),
  );
  const assertion = `${signingInput}.${signature}`;

  const res = await fetch(TOKEN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion,
    }),
  });

  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    throw new Error(`Google token exchange failed (${res.status}): ${detail}`);
  }

  const data = (await res.json()) as { access_token: string; expires_in: number };
  cache.set(scope, {
    token: data.access_token,
    expiresAt: now + data.expires_in * 1000,
  });
  return data.access_token;
}
