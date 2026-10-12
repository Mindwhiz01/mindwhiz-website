// ---------------------------------------------------------------------------
// Security headers.
//
// The Content-Security-Policy is shipped in Report-Only mode first so the
// embedded LeadConnector forms (contact + careers) can be verified in
// production before enforcement. Once confirmed working, flip CSP_ENFORCE to
// `true` — that swaps the header name to the enforcing `Content-Security-Policy`.
// See SECURITY_AUDIT.md §5.
// ---------------------------------------------------------------------------
const CSP_ENFORCE = false;

const contentSecurityPolicy = [
  "default-src 'self'",
  // Next.js emits inline hydration/runtime scripts; the LeadConnector lead-form
  // widget is loaded from link.msgsndr.com and may pull helpers from its CDN.
  // GTM + the Meta Pixel loader also fetch their tag scripts from their own CDNs.
  "script-src 'self' 'unsafe-inline' https://link.msgsndr.com https://*.msgsndr.com https://*.leadconnectorhq.com https://www.googletagmanager.com https://connect.facebook.net",
  // React inline styles, Tailwind, and framer-motion all require inline styles.
  "style-src 'self' 'unsafe-inline'",
  // Unsplash marketing/blog imagery + data/blob URIs (inline SVG, canvas).
  // www.facebook.com covers the Meta Pixel's tracking pixel (incl. the noscript <img>).
  "img-src 'self' data: blob: https://images.unsplash.com https://*.leadconnectorhq.com https://*.msgsndr.com https://www.googletagmanager.com https://www.facebook.com",
  "font-src 'self' data:",
  // The lead + booking widgets render inside iframes from these vendor hosts.
  "frame-src https://api.leadconnectorhq.com https://*.leadconnectorhq.com https://*.msgsndr.com",
  // The embed script posts captured form data back to LeadConnector; the Meta
  // Pixel beacons events to facebook.com.
  "connect-src 'self' https://*.leadconnectorhq.com https://*.msgsndr.com https://www.google-analytics.com https://www.facebook.com https://connect.facebook.net",
  "media-src 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self' https://*.leadconnectorhq.com https://*.msgsndr.com",
  "frame-ancestors 'none'",
  // NB: `upgrade-insecure-requests` is intentionally omitted while the policy
  // ships as Report-Only (the browser ignores it there and logs a console
  // warning). Re-add it in the same commit that flips CSP_ENFORCE to true.
].join("; ");

const securityHeaders = [
  {
    key: CSP_ENFORCE ? "Content-Security-Policy" : "Content-Security-Policy-Report-Only",
    value: contentSecurityPolicy,
  },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), browsing-topics=()",
  },
];

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  compress: true,
  async headers() {
    const isPreview = process.env.VERCEL_ENV === "preview";
    const headers = [...securityHeaders];

    // Prevent preview deployments from being indexed by search engines.
    if (isPreview) {
      headers.push({
        key: "X-Robots-Tag",
        value: "noindex, nofollow",
      });
    }

    return [{ source: "/:path*", headers }];
  },
  // Domain canonicalization, trailing slashes and legacy WordPress URLs are
  // handled together in src/middleware.ts so every old URL resolves in a
  // single 301 hop (map: src/lib/legacyRedirects.ts). Next's own trailing
  // slash redirect is disabled so it cannot add an extra hop in front.
  // HTTP -> HTTPS is done by Vercel's edge before the app is reached.
  skipTrailingSlashRedirect: true,
};

export default nextConfig;
