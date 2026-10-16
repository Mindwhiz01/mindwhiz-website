import type { Metadata } from "next";

// ---------------------------------------------------------------------------
// Single source of truth for per-page SEO metadata.
//
// Titles here are FINAL (they already include "| MindWhiz"), so they are
// emitted with `title.absolute` to bypass the root `%s | MindWhiz` template
// and avoid double-branding. Descriptions are the hand-tuned 150-160 char
// copy (140-155 chars, no unverifiable numbers - see src/lib/claims.ts). Every route also gets a self-referencing
// canonical plus matching OpenGraph + Twitter tags so shared links no longer
// fall back to the homepage pitch.
//
// Keywords are chosen for winnable, high-intent long-tail demand (real
// volume/KD data), not broad head terms owned by the large staffing brands.
// To retitle a page, edit it here once - layouts and generateMetadata read
// from this map. Keep titles 50-60 chars and descriptions 140-155 chars.
// ---------------------------------------------------------------------------

export const siteUrl = "https://www.mindwhiz.com";

// Self-hosted, query-string-free share image (no Unsplash hotlinks, no
// encoded ampersands in og:image).
export const DEFAULT_SHARE_IMAGE = {
  url: "/og-default.jpg",
  width: 1200,
  height: 630,
  alt: "MindWhiz - offshore IT and operations teams for US companies",
};

export type SeoEntry = { title: string; description: string };

export const SEO_MAP: Record<string, SeoEntry> = {
  "/": {
    title: "AI-Ready IT & Cybersecurity Staff Augmentation | MindWhiz",
    description:
      "Vetted offshore engineers, 24/7 IT support and back-office teams for US companies, working your hours at typically 30-60% below in-house cost. Free consult",
  },
  "/services/it-helpdesk-24-7": {
    title: "24/7 Outsourced IT Helpdesk for US Companies & MSPs | MindWhiz",
    description:
      "24/7 outsourced IT helpdesk, Tier 1 to 3, for US companies and MSPs. White-label options, US-hours coverage and clear per-user pricing. Get a free quote.",
  },
  "/services/noc-monitoring": {
    title: "Outsourced 24/7 NOC Monitoring Services for US Teams | MindWhiz",
    description:
      "Outsourced 24/7 NOC monitoring for US companies and MSPs: network, server and cloud alerts handled to runbooks, with clear SLAs and reporting. Get a quote.",
  },
  "/services/cybersecurity-monitoring": {
    title: "Managed SOC & MDR Services for US Companies | MindWhiz",
    description:
      "Managed SOC and MDR for US companies: 24/7 threat monitoring, investigation and incident response by certified analysts in your SIEM and EDR. Book now.",
  },
  "/services/cloud-infrastructure": {
    title: "Cloud Infrastructure Management: AWS, Azure, GCP | MindWhiz",
    description:
      "Managed cloud infrastructure for US companies on AWS, Azure and GCP: migrations, cost control, monitoring and infrastructure as code. Free cloud audit.",
  },
  "/services/devops-automation": {
    title: "Outsourced DevOps & CI/CD Automation Services | MindWhiz",
    description:
      "Outsourced DevOps engineers for US teams: CI/CD pipelines, Kubernetes, containers and infrastructure as code that ship releases faster. Book a free audit.",
  },
  "/services/endpoint-security": {
    title: "Managed Endpoint Security & Patch Management | MindWhiz",
    description:
      "Managed endpoint security for US teams: EDR, patch management, device hardening and ransomware protection across every laptop and server. Free assessment.",
  },
  "/services/server-network-administration": {
    title: "Server & Network Administration Outsourcing | MindWhiz",
    description:
      "Outsourced server and network administration for US companies: certified admins, proactive patching, monitoring and documented changes. Free review.",
  },
  "/services/remote-desktop-assets": {
    title: "Remote IT Asset Management & Desktop Support | MindWhiz",
    description:
      "Remote IT asset management and remote desktop support: track devices and licenses, onboard and offboard users and secure remote staff. Free asset audit.",
  },
  "/services/staff-augmentation": {
    title: "AI & IT Staff Augmentation Services for US Firms | MindWhiz",
    description:
      "IT staff augmentation for US companies: vetted engineers who join your team in about 10 business days, at typically 30-60% below a US hire. See pricing.",
  },
  "/services/offshore-staff-augmentation": {
    title: "Offshore AI & IT Staff Augmentation from Pakistan | MindWhiz",
    description:
      "Offshore staff augmentation from Pakistan for US companies: dedicated developers and specialists on US-hours shifts, typically 30-60% below a US hire.",
  },
  "/services/cybersecurity-staff-augmentation": {
    title: "AI-Ready Cybersecurity Staff Augmentation for US | MindWhiz",
    description:
      "Cybersecurity staff augmentation: add vetted SOC analysts, security engineers and pen testers to your team in about 10 business days, on US-hours shifts.",
  },
  "/services/cloud-security-consulting": {
    title: "Cloud Security Consulting for AWS, Azure & GCP | MindWhiz",
    description:
      "Cloud security consulting for US companies: AWS, Azure and GCP assessments against CIS Benchmarks, a prioritized fix plan and hands-on remediation.",
  },
  "/services/accounting-staff-augmentation": {
    title: "Accounting Staff Augmentation for US CPA Firms | MindWhiz",
    description:
      "Accounting staff augmentation for US CPA firms and finance teams: offshore accountants and bookkeepers trained on US GAAP, working in your software.",
  },
  "/services/hr-services": {
    title: "HR Outsourcing, RPO & Payroll for US Companies | MindWhiz",
    description:
      "Outsourced HR for US small and mid-sized businesses: recruiting (RPO), payroll support, HRIS administration and onboarding, without an in-house HR team.",
  },
  "/services/finance-accounting": {
    title: "Finance & Accounting Outsourcing for US Firms | MindWhiz",
    description:
      "Finance and accounting outsourcing for US companies: bookkeeping, AP and AR, payroll and month-end close by vetted accountants. Book a free process review.",
  },
  "/services/digital-marketing": {
    title: "Digital Marketing Outsourcing: SEO, PPC & CRO | MindWhiz",
    description:
      "Outsourced digital marketing for US businesses: SEO, Google Ads, conversion optimization and content from a dedicated team. Get a free marketing audit.",
  },
  "/services/construction-estimation": {
    title: "Outsourced Construction Estimating & Takeoffs | MindWhiz",
    description:
      "Outsourced construction estimating for US contractors: quantity takeoffs, bid-ready cost estimates and planning from expert estimators. Free takeoff.",
  },
  "/web-services": {
    title: "Custom Web Development, Web Apps & Ecommerce | MindWhiz",
    description:
      "Custom web development for growing businesses: fast marketing sites, web apps, dashboards and ecommerce stores, built and run by one team. Free quote.",
  },
  "/industries/information-technology": {
    title: "Managed IT & Staffing for US Tech Companies | MindWhiz",
    description:
      "Managed IT and staff augmentation for US technology companies and MSPs: engineers, support and security analysts on US-hours shifts. Book a tech review.",
  },
  "/industries/ecommerce-retail": {
    title: "Ecommerce Support & Operations Outsourcing | MindWhiz",
    description:
      "Ecommerce operations outsourcing for US retailers: customer support, product listings, order processing and storefront management. Get a free store audit.",
  },
  "/industries/startups-smbs": {
    title: "Outsourced IT & Staffing for Startups and SMBs | MindWhiz",
    description:
      "Flexible IT support and staff augmentation for US startups and SMBs: scale a team up or down monthly without hiring overhead. Book a free assessment today.",
  },
  "/industries/construction-engineering": {
    title: "Estimating & IT Support for Construction Firms | MindWhiz",
    description:
      "Support for US construction and engineering firms: quantity takeoffs, bid estimates, drafting and site IT from an offshore team. Get a free takeoff sample.",
  },
  "/industries/industrial-manufacturing": {
    title: "IT & Back-Office Outsourcing for Manufacturers | MindWhiz",
    description:
      "IT and back-office outsourcing for US manufacturers: multi-site IT support, monitoring, purchasing and finance operations around the clock. Free review.",
  },
  "/industries/accounting-finance": {
    title: "Outsourced Accounting Teams for CPA Firms | MindWhiz",
    description:
      "Outsourced accounting teams for US CPA firms and finance departments: white-label bookkeeping, reconciliations and reporting. Book a free process review.",
  },
  "/industries/professional-services": {
    title: "Back-Office & IT Support for Professional Firms | MindWhiz",
    description:
      "Back-office, research and IT support for US professional services firms, so billable staff spend more time on clients. Book a free consultation with us.",
  },
  "/industries/logistics-supply-chain": {
    title: "Logistics Back Office Support & IT Services USA | MindWhiz",
    description:
      "Logistics back office support for US brokers, 3PLs and carriers: track and trace, carrier onboarding, POD and freight billing, plus IT. Get a free review.",
  },
  "/industries/healthcare-healthtech": {
    title: "HIPAA-Aware IT & Support for Healthcare Firms | MindWhiz",
    description:
      "HIPAA-aware managed IT and back-office support for US healthcare and healthtech: EHR support, secure devices and 24/7 coverage. Book a compliance review.",
  },
  "/about": {
    title: "About MindWhiz | Offshore IT & Ops Teams",
    description:
      "About MindWhiz: a Lahore-based team of 65+ vetted engineers and specialists serving US and UK companies since 2020. Meet us.",
  },
  "/why-mindwhiz": {
    title: "Why MindWhiz | Vetted Offshore Teams in Your Hours",
    description:
      "Why US companies choose MindWhiz: vetted specialists, a start in about 10 business days, US-hours shifts and 24/7 coverage. See how we compare.",
  },
  "/case-studies": {
    title: "Client Results & Case Studies | MindWhiz",
    description:
      "MindWhiz case studies: how we helped construction, technology and ecommerce clients scale teams, launch faster and cut costs. Read the full engagements.",
  },
  "/careers": {
    title: "Careers at MindWhiz | IT, Security & Ops Jobs in Lahore",
    description:
      "Join MindWhiz in Lahore. Explore open roles in IT, cybersecurity, engineering and business operations serving clients across the US and UK. Apply online.",
  },
  "/blog": {
    title: "MindWhiz Blog | Staff Augmentation, IT & Security Guides",
    description:
      "Practical guides on staff augmentation, offshore teams, IT operations and cybersecurity for US companies, written from real client engagements. Read more.",
  },
  "/newsletter": {
    title: "IT & Security White Papers and Newsletter | MindWhiz",
    description:
      "Free IT and security resources from MindWhiz: white papers, monthly briefings, compliance guides and operations playbooks. Subscribe for practical insight.",
  },
  "/contact": {
    title: "Contact MindWhiz | Free Quote in 1 Business Day",
    description:
      "Get a free IT staffing or outsourcing quote, usually within one US business day. Tell MindWhiz the roles or services you need. Book your free call.",
  },
  "/locations/us": {
    title: "IT Staff Augmentation & Outsourcing for US Companies | MindWhiz",
    description:
      "How MindWhiz serves US companies from Lahore: US-hours shift table, pricing, contracts, data security and FAQs for IT staffing and managed services.",
  },
  "/locations/uk": {
    title: "IT Outsourcing & Staff Augmentation for UK Firms | MindWhiz",
    description:
      "MindWhiz supports UK businesses with vetted offshore teams working UK hours across IT, security, finance and operations. GDPR-aware delivery. Talk to us.",
  },
  "/locations/pk": {
    title: "IT Outsourcing & Software Company in Lahore | MindWhiz",
    description:
      "MindWhiz Lahore: our head office and delivery center, with 65+ engineers in IT, security, DevOps and operations serving US and UK clients. See careers.",
  },
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
    // Child metadata replaces (not merges) the root openGraph/twitter
    // objects, so the share image must be repeated here or pages ship
    // without one.
    openGraph: {
      title,
      description,
      url: canonical,
      type: "website",
      siteName: "MindWhiz",
      locale: "en_US",
      images: [DEFAULT_SHARE_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [DEFAULT_SHARE_IMAGE.url],
    },
  };
}
