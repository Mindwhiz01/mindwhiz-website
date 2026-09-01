import type { Metadata } from "next";

// ---------------------------------------------------------------------------
// Single source of truth for per-page SEO metadata.
//
// Titles here are FINAL (they already include "| MindWhiz"), so they are
// emitted with `title.absolute` to bypass the root `%s | MindWhiz` template
// and avoid double-branding. Descriptions are the hand-tuned 150-160 char
// copy from the keyword map. Every route also gets a self-referencing
// canonical plus matching OpenGraph + Twitter tags so shared links no longer
// fall back to the homepage pitch.
//
// Keywords are chosen for winnable, high-intent long-tail demand (real
// volume/KD data), not broad head terms owned by the large staffing brands.
// To retitle a page, edit it here once - layouts and generateMetadata read
// from this map. Keep titles 50-60 chars and descriptions 150-160 chars.
// ---------------------------------------------------------------------------

export const siteUrl = "https://www.mindwhiz.com";

export type SeoEntry = { title: string; description: string };

export const SEO_MAP: Record<string, SeoEntry> = {
  // --- Core ---
  "/": {
    title: "IT Outsourcing & Staff Augmentation Company USA | MindWhiz",
    description:
      "Offshore IT staffing for US companies: save 60% on IT, security & operations. 10-day deployment, 99.8% retention. 65+ vetted engineers. Get a free consultation today.",
  },

  // --- Services ---
  "/services/it-helpdesk-24-7": {
    title: "White-Label 24/7 IT Helpdesk Services USA | MindWhiz",
    description:
      "White-label 24/7 IT helpdesk for US MSPs: $6-12/user/month, Tier 1-3 support, 15-min response. Cut support costs 50%. Free helpdesk cost analysis—no commitment.",
  },
  "/services/noc-monitoring": {
    title: "Outsourced 24/7 NOC Monitoring Services USA | MindWhiz",
    description:
      "Outsourced NOC monitoring for US companies and MSPs: 24/7 network operations, proactive alerting and uptime reporting, white-label available. Get NOC pricing.",
  },
  "/services/cybersecurity-monitoring": {
    title: "Managed SOC & MDR Monitoring Services USA | MindWhiz",
    description:
      "Managed SOC & MDR for US companies: GIAC-certified analysts, 24/7 threat detection, incident response. $1500-3000/month. Free security risk assessment.",
  },
  "/services/cloud-infrastructure": {
    title: "Cloud Infrastructure Management USA, AWS & Azure | MindWhiz",
    description:
      "Cloud infrastructure management for US companies across AWS, Azure and Google Cloud: secure, stable environments, migrations and cost control. Free consult.",
  },
  "/services/devops-automation": {
    title: "Outsourced DevOps & CI/CD Automation Services | MindWhiz",
    description:
      "Outsourced DevOps for US teams: CI/CD pipelines, infrastructure as code, containers and release automation. Ship faster without new headcount. Free consult.",
  },
  "/services/endpoint-security": {
    title: "Endpoint Security & Patch Management Services USA | MindWhiz",
    description:
      "Managed endpoint security for US businesses: EDR, patch management outsourcing and device control across remote teams. Close the gaps attackers use. Talk to us.",
  },
  "/services/server-network-administration": {
    title: "Server & Network Administration Outsourcing USA | MindWhiz",
    description:
      "Outsourced server and network administration for US companies: certified admins keep systems patched, secure and stable across cloud and hybrid. Free audit.",
  },
  "/services/remote-desktop-assets": {
    title: "IT Asset Management & Remote Desktop Support USA | MindWhiz",
    description:
      "IT asset management and remote desktop support for US teams: full hardware and software tracking, lifecycle management and secure remote access. Speak to us.",
  },
  "/services/staff-augmentation": {
    title: "IT Staff Augmentation & Offshore Teams USA | MindWhiz",
    description:
      "Hire vetted offshore engineers in 10 days: 50-60% cheaper than US hiring, no benefits/payroll overhead. Hire Python, DevOps, QA engineers. Free team assessment.",
  },

  // --- Services (standalone pages under /services) ---
  "/services/hr-services": {
    title: "HR Outsourcing Services USA, RPO & Payroll | MindWhiz",
    description:
      "Outsourced HR for US small businesses: RPO, payroll, HRIS and multi-state compliance. Hire faster and stay compliant without an in-house HR team. Free consult.",
  },
  "/services/finance-accounting": {
    title: "Finance & Accounting Outsourcing USA, AP & AR | MindWhiz",
    description:
      "Outsourced accounting for US businesses: accounts payable, accounts receivable, bookkeeping, month-end close and virtual CFO support. Close in days, not weeks.",
  },
  "/services/digital-marketing": {
    title: "Digital Marketing Outsourcing USA, SEO & PPC | MindWhiz",
    description:
      "Outsourced digital marketing for US businesses: SEO, Google Ads, CRO, CRM and content from one dedicated team. Grow pipeline without new hires. Free quote.",
  },
  "/services/construction-estimation": {
    title: "Outsourced Construction Estimating & Takeoffs USA | MindWhiz",
    description:
      "Outsourced construction estimating for US contractors: quantity takeoffs, bid prep and cost planning by expert estimators. Bid more, win more. Free takeoff.",
  },
  "/web-services": {
    title: "Custom Web Development, Web Apps & Ecommerce | MindWhiz",
    description:
      "Custom web development for growing businesses — high-performance websites, web apps, dashboards and ecommerce built to convert. Request a free quote today.",
  },

  // --- Comparison & Pricing ---
  "/pricing": {
    title: "IT Outsourcing Pricing 2026 | MindWhiz",
    description:
      "See exact IT staffing costs: helpdesk ($6-15/user), SOC ($1500-3000), engineers ($3500-6500). USA pricing with no hidden fees. Get free quote.",
  },
  "/comparison": {
    title: "Staff Augmentation vs Outsourcing vs Managed Services | MindWhiz",
    description:
      "Compare staffing models: staff augmentation (you direct), outsourcing (vendor owns outcome), managed services (24/7 ops). Which is right for USA companies?",
  },
  "/usa-it-helpdesk": {
    title: "Outsourced 24/7 IT Helpdesk for US Companies | MindWhiz",
    description:
      "White-label IT helpdesk for USA MSPs & businesses: $6-12/user/month, 15-min response, Tier 1-3 support. Cut IT costs 50%. Free helpdesk assessment.",
  },

  // --- Industries ---
  "/industries/information-technology": {
    title: "Managed IT & Staffing Services for Tech Companies | MindWhiz",
    description:
      "Managed IT, cloud and cybersecurity staffing for US technology companies: extend your team and run secure infrastructure at scale. Explore IT solutions.",
  },
  "/industries/ecommerce-retail": {
    title: "Ecommerce Support & Operations Outsourcing USA | MindWhiz",
    description:
      "Outsourced ecommerce support for US retail brands: product listing, customer support and back-office operations that keep storefronts running 24/7. Contact us.",
  },
  "/industries/startups-smbs": {
    title: "Outsourced IT & Staffing for Startups & SMBs | MindWhiz",
    description:
      "Flexible outsourced IT and staffing for US startups and SMBs: support, security and back-office teams that scale as you grow. Pay per use. Free consult.",
  },
  "/industries/construction-engineering": {
    title: "IT & Estimating Support for Construction Firms | MindWhiz",
    description:
      "Managed IT, estimating and back-office support for US construction and engineering firms: takeoffs, site connectivity and drafting support. Build faster.",
  },
  "/industries/industrial-manufacturing": {
    title: "IT & Back-Office Outsourcing for Manufacturers | MindWhiz",
    description:
      "Managed IT, engineering and back-office support for US manufacturers: keep multi-site operations efficient, connected and secure around the clock. Talk to us.",
  },
  "/industries/accounting-finance": {
    title: "Outsourced Accounting & Finance Teams for Firms | MindWhiz",
    description:
      "Outsourced bookkeeping, reporting and finance operations for US accounting and CPA firms: white-label, dedicated remote teams under your process. Get in touch.",
  },
  "/industries/professional-services": {
    title: "Back-Office & IT Support for Professional Firms | MindWhiz",
    description:
      "Research, operations, IT and back-office support for US consulting, legal and advisory firms. Free your billable team from admin work. Book a free consultation.",
  },
  "/industries/logistics-supply-chain": {
    title: "IT & Back-Office Support for Logistics Firms USA | MindWhiz",
    description:
      "Managed IT, tracking and back-office support for US logistics and supply chain firms: warehouse connectivity, TMS/WMS integration and coverage. Get in touch.",
  },
  "/industries/healthcare-healthtech": {
    title: "Managed IT & HIPAA-Aware Support for Healthcare | MindWhiz",
    description:
      "HIPAA-aware managed IT and outsourced teams for US healthcare and healthtech: EHR/EMR support, patient data security and 24/7 clinical coverage. Talk to us.",
  },

  // --- Company ---
  "/about": {
    title: "About MindWhiz | Offshore Staffing & Delivery Team",
    description:
      "Meet MindWhiz: an offshore staffing and outsourcing partner for US and UK companies, with 65+ specialists and a dedicated contact, delivering since 2020.",
  },
  "/why-mindwhiz": {
    title: "Why MindWhiz | 10-Day Deploy, 99.8% Retention",
    description:
      "Why US teams pick MindWhiz: vetted talent, ~10-day deployment, 99.8% retention and 24/7 coverage in your time zone. See how we compare. Book a free consult.",
  },
  "/case-studies": {
    title: "Client Results & Case Studies | MindWhiz",
    description:
      "Real engagements, real numbers: how MindWhiz clients cut costs, sped up delivery and scaled teams without new hires. Read the full case studies on record.",
  },
  "/careers": {
    title: "Careers at MindWhiz | IT, Security & Ops Jobs",
    description:
      "Join MindWhiz in Lahore. Explore open roles in IT, cybersecurity, engineering and business operations serving clients across the US and UK. Apply online today.",
  },
  "/blog": {
    title: "MindWhiz Blog | IT, Security & Outsourcing Tips",
    description:
      "Field notes from live engagements: security operations, delivery playbooks and what actually works at scale. Read the latest insights from the MindWhiz team.",
  },
  "/newsletter": {
    title: "Free IT & Security White Papers & Newsletter | MindWhiz",
    description:
      "Get free white papers and practical insights on security operations, compliance and scaling delivery teams, straight to your inbox. Subscribe to MindWhiz today.",
  },
  "/contact": {
    title: "Contact MindWhiz | Free Quote in 1 Business Day",
    description:
      "Get a free IT staffing or outsourcing quote in 24 hours. No pressure consultation with MindWhiz experts. See exact pricing for your needs. Book your free call.",
  },

  // --- Locations ---
  "/locations/us": {
    title: "IT Outsourcing & Staff Augmentation in the USA | MindWhiz",
    description:
      "MindWhiz supports US businesses with vetted offshore teams in your time zone across IT, security, finance and operations. Cut costs up to 60%. Free consult.",
  },
  "/locations/uk": {
    title: "IT Outsourcing & Staff Augmentation in the UK | MindWhiz",
    description:
      "MindWhiz supports UK businesses with vetted offshore teams working in your hours across IT, security, finance and operations. GDPR-aware. Talk to us today.",
  },
  "/locations/pk": {
    title: "IT Outsourcing & Software Company in Lahore | MindWhiz",
    description:
      "MindWhiz runs its head office and delivery hub in Lahore, with 65+ engineers serving US and UK clients across IT, security and operations. Meet the team.",
  },

  // --- Legal ---
  "/privacy": {
    title: "Privacy Policy | MindWhiz",
    description:
      "How MindWhiz collects, uses, stores and protects personal data across our website and client engagements, including your rights and how to contact us.",
  },
  "/terms": {
    title: "Terms & Conditions | MindWhiz",
    description:
      "The terms that govern use of the MindWhiz website and our services, including acceptable use, intellectual property, liability and governing law.",
  },
};

/**
 * Build a complete, per-page Metadata object from the SEO map.
 *
 * @param path canonical route path, e.g. "/services/it-helpdesk-24-7"
 * @param fallback optional {title, description} used when a (dynamic) path is
 *   not present in SEO_MAP, so new slugs still get sane, non-duplicated tags.
 */
export function buildMetadata(path: string, fallback?: SeoEntry): Metadata {
  const entry = SEO_MAP[path] ?? fallback;

  if (!entry) {
    // No mapping and no fallback: at least pin a canonical so the route
    // never competes with another URL.
    return { alternates: { canonical: path } };
  }

  const { title, description } = entry;
  const canonical = path === "/" ? "/" : path;

  return {
    // absolute bypasses the root "%s | MindWhiz" template (titles already
    // carry the brand suffix).
    title: { absolute: title },
    description,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: canonical,
      type: "website",
      siteName: "MindWhiz",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}
