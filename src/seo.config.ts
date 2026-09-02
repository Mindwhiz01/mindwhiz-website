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
      "24/7 NOC monitoring for US companies & MSPs: 99.9% uptime guarantee, proactive alerting, incident response. 30% cost reduction. Get free uptime assessment.",
  },
  "/services/cybersecurity-monitoring": {
    title: "Managed SOC & MDR Monitoring Services USA | MindWhiz",
    description:
      "Managed SOC & MDR for US companies: GIAC-certified analysts, 24/7 threat detection, incident response. $1500-3000/month. Free security risk assessment.",
  },
  "/services/cloud-infrastructure": {
    title: "Cloud Infrastructure Management USA, AWS & Azure | MindWhiz",
    description:
      "Cloud infrastructure for US companies: AWS, Azure, GCP management with 30% cost reduction, zero-downtime migrations, 99.9% uptime. Get free cloud audit.",
  },
  "/services/devops-automation": {
    title: "Outsourced DevOps & CI/CD Automation Services | MindWhiz",
    description:
      "DevOps & CI/CD automation for US teams: 2x faster deployments, infrastructure-as-code, Kubernetes, containers. 40% cost savings. Get free deployment audit.",
  },
  "/services/endpoint-security": {
    title: "Endpoint Security & Patch Management Services USA | MindWhiz",
    description:
      "Managed endpoint security (EDR) for US teams: SOC 2 compliant, 99.9% patch compliance, ransomware prevention, remote device control. Get free security assessment.",
  },
  "/services/server-network-administration": {
    title: "Server & Network Administration Outsourcing USA | MindWhiz",
    description:
      "Server & network administration for US companies: 99.8% uptime SLA, certified admins, proactive patching, 30% cost reduction. Get free network audit.",
  },
  "/services/remote-desktop-assets": {
    title: "IT Asset Management & Remote Desktop Support USA | MindWhiz",
    description:
      "IT asset management & remote desktop support: full hardware/software tracking, compliance-ready, 40% cost savings, secure remote access. Get free asset audit.",
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
      "Outsourced HR for US SMBs: RPO hiring 50% faster, payroll, HRIS, multi-state compliance, 70% cost savings. No in-house HR needed. Get free HR assessment.",
  },
  "/services/finance-accounting": {
    title: "Finance & Accounting Outsourcing USA, AP & AR | MindWhiz",
    description:
      "Outsourced accounting: 3-5 day close (vs weeks), AP/AR, bookkeeping, virtual CFO. 40% cost reduction, 24/7 US time zone. Get free process audit.",
  },
  "/services/digital-marketing": {
    title: "Digital Marketing Outsourcing USA, SEO & PPC | MindWhiz",
    description:
      "Digital marketing outsourcing: SEO, Google Ads, CRO, content, 30-50% higher conversions, dedicated team, $3-8K/month. Get free marketing audit.",
  },
  "/services/construction-estimation": {
    title: "Outsourced Construction Estimating & Takeoffs USA | MindWhiz",
    description:
      "Outsourced construction estimating for US contractors: quantity takeoffs, bid prep and cost planning by expert estimators. Bid more, win more. Free takeoff.",
  },
  "/web-services": {
    title: "Custom Web Development, Web Apps & Ecommerce | MindWhiz",
    description:
      "Custom web development: 50% faster load times, high-conversion sites, apps, dashboards, ecommerce. Deployed in 10 days. Get free web development quote.",
  },

  // --- Industries ---
  "/industries/information-technology": {
    title: "Managed IT & Staffing Services for Tech Companies | MindWhiz",
    description:
      "Managed IT & staffing for US tech companies: 60% cost savings, deploy in 10 days, 99.8% retention, 24/7 coverage. Schedule free tech audit.",
  },
  "/industries/ecommerce-retail": {
    title: "Ecommerce Support & Operations Outsourcing USA | MindWhiz",
    description:
      "Ecommerce support for US retail: 99.9% uptime, 24/7 storefront ops, product listing, customer support, 30% cost savings. Get free store audit.",
  },
  "/industries/startups-smbs": {
    title: "Outsourced IT & Staffing for Startups & SMBs | MindWhiz",
    description:
      "Flexible IT & staffing for US startups/SMBs: scale teams in days, no contracts, pay-as-you-grow, risk-free trial, 60% cost savings. Get free assessment.",
  },
  "/industries/construction-engineering": {
    title: "IT & Estimating Support for Construction Firms | MindWhiz",
    description:
      "Construction & engineering support: 2x faster bid prep, 50% fewer takeoff errors, site connectivity, estimating, drafting. Get free takeoff sample.",
  },
  "/industries/industrial-manufacturing": {
    title: "IT & Back-Office Outsourcing for Manufacturers | MindWhiz",
    description:
      "Manufacturing IT & back-office: 99.8% uptime, multi-site ops, 24/7 coverage, 40% cost savings, equipment monitoring. Schedule free ops review.",
  },
  "/industries/accounting-finance": {
    title: "Outsourced Accounting & Finance Teams for Firms | MindWhiz",
    description:
      "Accounting & finance support: 50% faster close, white-label teams, bookkeeping, reporting, no training needed. Get free process audit.",
  },
  "/industries/professional-services": {
    title: "Back-Office & IT Support for Professional Firms | MindWhiz",
    description:
      "Professional services support: free 1 billable person per 5-person team, 30-40% back-office savings, research, ops, IT. Book free consultation.",
  },
  "/industries/logistics-supply-chain": {
    title: "IT & Back-Office Support for Logistics Firms USA | MindWhiz",
    description:
      "Logistics & supply chain support: 60% fewer errors, 24/7 warehouse ops, TMS/WMS integration, tracking. Get free logistics audit.",
  },
  "/industries/healthcare-healthtech": {
    title: "Managed IT & HIPAA-Aware Support for Healthcare | MindWhiz",
    description:
      "Healthcare IT: 100% HIPAA compliant, zero breaches, EHR/EMR support, 24/7 clinical coverage, patient data security. Schedule free compliance review.",
  },

  // --- Company ---
  "/about": {
    title: "About MindWhiz | Offshore Staffing & Delivery Team",
    description:
      "About MindWhiz: 65+ vetted engineers, 99.8% retention, ISO 27001 certified, serving 50+ US & UK companies since 2020. Meet the team.",
  },
  "/why-mindwhiz": {
    title: "Why MindWhiz | 10-Day Deploy, 99.8% Retention",
    description:
      "Why US teams pick MindWhiz: vetted talent, ~10-day deployment, 99.8% retention and 24/7 coverage in your time zone. See how we compare. Book a free consult.",
  },
  "/case-studies": {
    title: "Client Results & Case Studies | MindWhiz",
    description:
      "MindWhiz case studies: $2.4M+ client savings, 2x faster delivery, scaled teams. Real engagements, real results. View all 50+ success stories.",
  },
  "/careers": {
    title: "Careers at MindWhiz | IT, Security & Ops Jobs",
    description:
      "Join MindWhiz in Lahore. Explore open roles in IT, cybersecurity, engineering and business operations serving clients across the US and UK. Apply online today.",
  },
  "/blog": {
    title: "MindWhiz Blog | IT, Security & Outsourcing Tips",
    description:
      "MindWhiz blog: 20+ guides on security, DevOps, staffing, playbooks from live engagements. Subscribe for insights on what works at scale.",
  },
  "/newsletter": {
    title: "Free IT & Security White Papers & Newsletter | MindWhiz",
    description:
      "Free IT & security resources: 4 white papers, monthly briefings, compliance guides, operations playbooks. Subscribe for insider insights.",
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
      "MindWhiz Lahore: 65+ engineers, growing 3x/year, ISO 27001 certified, serving US/UK. Join our team. Careers in IT, security, DevOps.",
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
