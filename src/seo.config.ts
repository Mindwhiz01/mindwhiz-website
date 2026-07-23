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
// To retitle a page, edit it here once - layouts and generateMetadata read
// from this map. Keep titles 50-60 chars and descriptions 150-160 chars.
// ---------------------------------------------------------------------------

export const siteUrl = "https://graphite-teal-template.vercel.app";

export type SeoEntry = { title: string; description: string };

export const SEO_MAP: Record<string, SeoEntry> = {
  // --- Core ---
  "/": {
    title: "Hybrid Staffing & Staff Augmentation Company | MindWhiz",
    description:
      "MindWhiz delivers hybrid staffing, staff augmentation and BPO across IT, security and business operations. Scale teams with vetted global talent. Get in touch.",
  },

  // --- Services ---
  "/services/it-helpdesk-24-7": {
    title: "24/7 IT Helpdesk Services (Tier 1 to 3) | MindWhiz",
    description:
      "Outsourced 24/7 IT helpdesk with Tier 1 to 3 support, 15 minute response and fixed per user pricing. Cut downtime without hiring in house. Book a free review.",
  },
  "/services/noc-monitoring": {
    title: "NOC Monitoring Services | 24/7 Network Operations | MindWhiz",
    description:
      "24/7 NOC monitoring that catches network issues before your users do. Outsourced network operations, proactive alerting and uptime reporting. Talk to our team.",
  },
  "/services/cybersecurity-monitoring": {
    title: "Cybersecurity Monitoring & Managed SOC Services | MindWhiz",
    description:
      "24/7 cybersecurity monitoring with certified SOC analysts, threat detection and rapid incident response. SOC 2 and ISO 27001 aligned. Get a free review.",
  },
  "/services/cloud-infrastructure": {
    title: "Managed Cloud Infrastructure & Migration Services | MindWhiz",
    description:
      "Cloud infrastructure design, migration and managed operations across AWS and Azure. Stable, secure, cost controlled environments. Book a free consultation.",
  },
  "/services/devops-automation": {
    title: "DevOps & Automation Services | CI/CD Pipelines | MindWhiz",
    description:
      "DevOps engineers who build CI/CD pipelines, automate releases and stabilise delivery. Ship faster without growing headcount. Book a free DevOps consultation.",
  },
  "/services/endpoint-security": {
    title: "Endpoint Security Services | Managed EDR | MindWhiz",
    description:
      "Managed endpoint security with EDR monitoring, patching and centralised device control across remote teams. Close the gaps attackers use. Talk to a specialist.",
  },
  "/services/server-network-administration": {
    title: "Server & Network Administration Services | MindWhiz",
    description:
      "Certified admins who keep servers and networks secure, patched and stable around the clock. Outsource sysadmin and network operations. Get a free assessment.",
  },
  "/services/remote-desktop-assets": {
    title: "Remote Desktop & IT Asset Management Services | MindWhiz",
    description:
      "Secure remote access plus full IT asset tracking and lifecycle management for distributed teams. Know what you own and who is using it. Speak to our team today.",
  },
  "/services/staff-augmentation": {
    title: "IT Staff Augmentation Services | Hire Engineers | MindWhiz",
    description:
      "Staff augmentation that extends your team with vetted engineers and specialists, deployed in around 10 days. Scale without long hiring cycles. Get in touch.",
  },

  // --- Services (root-level) ---
  "/hr": {
    title: "HR Outsourcing Services | RPO, Payroll & HRIS | MindWhiz",
    description:
      "Outsourced HR covering RPO, payroll, HRIS administration and compliance. Hire faster and stay compliant without an in house HR team. Book a free consultation.",
  },
  "/finance": {
    title: "Finance & Accounting Outsourcing | Bookkeeping | MindWhiz",
    description:
      "Outsourced finance covering AP, AR, bookkeeping, reporting and CFO support. Close the month in days, not weeks, with vetted accountants. Talk to a specialist.",
  },
  "/service": {
    title: "Digital Marketing Services | SEO, PPC & CRM | MindWhiz",
    description:
      "Digital marketing delivered by a dedicated team: SEO, paid campaigns, CRM and content operations. Grow pipeline without hiring in house. Get in touch today.",
  },
  "/construction-estimation": {
    title: "Construction Estimation Services | Takeoffs | MindWhiz",
    description:
      "Outsourced construction estimating: quantity takeoffs, bid prep and cost planning by experienced estimators. Bid more, win more. Request a free sample takeoff.",
  },
  "/web-services": {
    title: "Web Development Services | Custom Sites & Apps | MindWhiz",
    description:
      "Custom websites, web applications and ecommerce builds delivered by dedicated developers, plus ongoing maintenance and support. Request a free project quote.",
  },

  // --- Industries ---
  "/industries/information-technology": {
    title: "IT Industry Staffing & Managed Services | MindWhiz",
    description:
      "Software, cloud and cybersecurity teams for technology companies that need to ship faster and run secure infrastructure at scale. Explore IT industry solutions.",
  },
  "/industries/ecommerce-retail": {
    title: "Ecommerce & Retail Outsourcing Services | MindWhiz",
    description:
      "Catalog, customer support and back office operations that keep storefronts running around the clock. Outsourced teams for ecommerce and retail brands.",
  },
  "/industries/startups-smbs": {
    title: "Staffing & Outsourcing for Startups and SMBs | MindWhiz",
    description:
      "Flexible, cost effective teams that scale as fast as you grow. Staffing, IT and back office support built for startups and SMBs. Book a free consultation.",
  },
  "/industries/construction-engineering": {
    title: "Construction & Engineering Support Services | MindWhiz",
    description:
      "Estimation, takeoffs and engineering support that speed up bids and keep projects moving. Outsourced teams for construction and engineering firms. Get in touch.",
  },
  "/industries/real estate": {
    title: "Real Estate Back Office & Transaction Support | MindWhiz",
    description:
      "Listing, transaction and operations support that keeps agents focused on deals instead of admin. Outsourced real estate teams. Book a free consultation today.",
  },
  "/industries/industrial-manufacturing": {
    title: "Manufacturing Support & Outsourcing Services | MindWhiz",
    description:
      "Engineering, back office and IT support that keeps manufacturing operations efficient and connected. Outsourced industrial support teams. Talk to a specialist.",
  },
  "/industries/accounting-finance": {
    title: "Accounting & Finance Outsourcing Support | MindWhiz",
    description:
      "Bookkeeping, reporting and finance operations handled by vetted professionals. Outsourced support for accounting firms and finance teams. Get in touch today.",
  },
  "/industries/professional-services": {
    title: "Professional Services Back Office Support | MindWhiz",
    description:
      "Research, operations and back office support for consulting and professional firms. Free your billable team from admin. Book a free consultation with MindWhiz.",
  },
  "/industries/logistics-supply-chain": {
    title: "Logistics & Supply Chain Support Services | MindWhiz",
    description:
      "Coordination, tracking and back office support that keeps goods moving. Outsourced logistics and supply chain teams available around the clock. Get in touch.",
  },
  "/industries/healthcare-healthtech": {
    title: "Healthcare & HealthTech Outsourcing Services | MindWhiz",
    description:
      "Compliant talent and support for care operations and health technology platforms. HIPAA aware outsourced teams for healthcare and healthtech. Talk to our team.",
  },

  // --- Company ---
  "/about": {
    title: "About MindWhiz | Global Staffing & Outsourcing Company",
    description:
      "Meet MindWhiz: 65 engineers in Lahore with client offices in the UK and USA, delivering staffing and managed operations since 2017. Learn our story.",
  },
  "/why-mindwhiz": {
    title: "Why MindWhiz | Staff Augmentation Done Right",
    description:
      "Why teams pick MindWhiz: vetted talent, 10 day deployment, 99.8% retention and 24/7 coverage across three regions. See how we compare. Book a free consultation.",
  },
  "/case-studies": {
    title: "Case Studies | Staffing & Outsourcing Results | MindWhiz",
    description:
      "Real engagements, real numbers: how MindWhiz clients cut costs, sped up delivery and scaled teams without new hires. Read the full case studies on record.",
  },
  "/careers": {
    title: "Careers at MindWhiz | IT, Security & Operations Jobs",
    description:
      "Join MindWhiz. Explore open roles in IT, cybersecurity, engineering and business operations working with clients across the US and UK. Apply online today.",
  },
  "/blog": {
    title: "Blog | IT, Security & Outsourcing Insights | MindWhiz",
    description:
      "Field notes from live engagements: security operations, delivery playbooks and what actually works at scale. Read the latest insights from the MindWhiz team.",
  },
  "/newsletter": {
    title: "Newsletter & White Papers | IT and Security | MindWhiz",
    description:
      "Get white papers and practical insights on security operations, compliance and scaling delivery teams, straight to your inbox. Subscribe to MindWhiz.",
  },
  "/contact": {
    title: "Contact MindWhiz | Book a Free Consultation",
    description:
      "Tell us what you are trying to achieve and a MindWhiz specialist will reply within one business day with a scoped plan and clear pricing. Contact us today.",
  },

  // --- Locations ---
  "/locations/us": {
    title: "Staff Augmentation & IT Services in the USA | MindWhiz",
    description:
      "MindWhiz supports US businesses with vetted offshore teams aligned to your time zone, covering IT, security, finance and operations. Book a free consultation.",
  },
  "/locations/uk": {
    title: "Staff Augmentation & IT Services in the UK | MindWhiz",
    description:
      "MindWhiz supports UK businesses with vetted offshore teams working in your hours across IT, security, finance and operations. Talk to a specialist today.",
  },
  "/locations/pk": {
    title: "IT Outsourcing Company in Lahore, Pakistan | MindWhiz",
    description:
      "MindWhiz runs its delivery hub in Lahore with 65 engineers serving US and UK clients across IT, security and business operations. Learn about our Pakistan team.",
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
