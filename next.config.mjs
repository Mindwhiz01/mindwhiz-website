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
  // Domain canonicalization and legacy route redirects.
  // All traffic flows to https://www.mindwhiz.com/ (www + HTTPS only).
  // Old WordPress URLs are 301'd to their closest new equivalents to preserve SEO equity.
  // Any old URL not listed here falls through to [...notfound] catch-all (307 to home).
  async redirects() {
    return [
      // --- CRITICAL: Domain canonicalization (non-www → www, HTTP → HTTPS) ---
      // Non-www domain still indexed in GSC with split traffic. Consolidate all to www.
      {
        source: "/:path*",
        destination: "https://www.mindwhiz.com/:path*",
        permanent: true,
        has: [{ type: "host", value: "mindwhiz.com" }],
      },
      // HTTP to HTTPS (Vercel adds x-forwarded-proto header for HTTP)
      {
        source: "/:path*",
        destination: "https://www.mindwhiz.com/:path*",
        permanent: true,
        has: [{ type: "header", key: "x-forwarded-proto", value: "http" }],
      },

      // --- short legacy aliases ---
      { source: "/hr", destination: "/services/hr-services", permanent: true },
      { source: "/finance", destination: "/services/finance-accounting", permanent: true },
      { source: "/service", destination: "/services/digital-marketing", permanent: true },
      {
        source: "/construction-estimation",
        destination: "/services/construction-estimation",
        permanent: true,
      },
      { source: "/it", destination: "/services/it-helpdesk-24-7", permanent: true },

      // --- old cybersecurity-staffing site: construction pages ---
      { source: "/construction", destination: "/services/construction-estimation", permanent: true },
      { source: "/construction-augmentation", destination: "/services/construction-estimation", permanent: true },

      // --- old site: finance / accounting pages ---
      { source: "/financial-services", destination: "/services/finance-accounting", permanent: true },
      { source: "/accounting-staff-augmentation-services", destination: "/services/finance-accounting", permanent: true },
      { source: "/accounting-staff-augmentation", destination: "/industries/accounting-finance", permanent: true },

      // --- old site: HR pages ---
      { source: "/employee-lifecycle-management", destination: "/services/hr-services", permanent: true },
      { source: "/payroll-and-benefits-administration", destination: "/services/hr-services", permanent: true },
      { source: "/outsourced-hr-services-in-the-us", destination: "/services/hr-services", permanent: true },

      // --- old site: cybersecurity pages ---
      { source: "/cyber-security-staff-augmentation-services", destination: "/services/cybersecurity-monitoring", permanent: true },
      { source: "/security-analyst", destination: "/services/cybersecurity-monitoring", permanent: true },
      { source: "/cybersecurity-consultant", destination: "/services/cybersecurity-monitoring", permanent: true },
      { source: "/cyber-security-staff-augmentation-mindwhiz", destination: "/services/cybersecurity-monitoring", permanent: true },
      { source: "/cybersecurity-talent-for-msps", destination: "/services/staff-augmentation", permanent: true },

      // --- old site: cloud pages ---
      { source: "/top-cloud-security-consulting", destination: "/services/cloud-infrastructure", permanent: true },

      // --- old site: more HR pages ---
      { source: "/right-hr-outsourcing-partner-in-the-u-s", destination: "/services/hr-services", permanent: true },

      // --- old site: client / case-study pages ---
      { source: "/vella-tech", destination: "/samples/clients", permanent: true },
      { source: "/inovatiqa-corporation", destination: "/case-studies/inovatiqa", permanent: true },

      // --- old site: company / about pages ---
      { source: "/who-we-are", destination: "/about", permanent: true },
      { source: "/bpo-solutions-by-mindwhiz", destination: "/web-services", permanent: true },

      // --- old site: contact / navigation ---
      { source: "/contact-us", destination: "/contact", permanent: true },
      { source: "/careers-at-mindwhiz", destination: "/careers", permanent: true },

      // --- old site: service pages (construction, IT consulting, etc.) ---
      { source: "/construction-estimation-services-in-the-usa", destination: "/services/construction-estimation", permanent: true },
      { source: "/it-consulting-firms", destination: "/services/it-helpdesk-24-7", permanent: true },

      // --- old site: articles and content pages ---
      { source: "/the-roi-of-staff-augmentation", destination: "/services/staff-augmentation", permanent: true },
      { source: "/it-infrastructure-and-digital-marketing-growth", destination: "/web-services", permanent: true },
      { source: "/top-penetration-testing-providers-for-cybersecurity", destination: "/blog", permanent: true },
      { source: "/privacy-policy", destination: "/privacy", permanent: true },

      // --- old site: blog articles (slugs differ; point at the blog index) ---
      { source: "/best-cybersecurity-expert-company-mindwhiz", destination: "/blog", permanent: true },
      { source: "/cyber-security-staff-augmentation-2025", destination: "/blog", permanent: true },
      { source: "/how-cyber-security-staff-augmentation", destination: "/blog", permanent: true },
      { source: "/mindwhiz-makes-accounting-staff-augmentation", destination: "/blog", permanent: true },
      { source: "/global-delivery-models-help-businesses", destination: "/blog", permanent: true },
    ];
  },
};

export default nextConfig;
