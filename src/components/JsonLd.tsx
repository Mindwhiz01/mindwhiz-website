import { serviceSchemaGraph } from "@/lib/serviceSchema";
import { jsonLdScript } from "@/lib/jsonLd";

// Renders one or more JSON-LD blocks. Server-safe (plain script tags) so the
// structured data is in the initial HTML for crawlers.
export function JsonLd({ data }: { data: Record<string, unknown> | Record<string, unknown>[] }) {
  const blocks = Array.isArray(data) ? data : [data];
  return (
    <>
      {blocks.map((block, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLdScript(block) }}
        />
      ))}
    </>
  );
}

// Standalone service pages (not driven by servicePages.ts). Offers mirror the
// capability cards each page shows, so the schema matches visible content.
const STANDALONE_SERVICES: Record<
  string,
  { name: string; serviceType: string; category: string; image: string; offers: string[] }
> = {
  "/services/hr-services": {
    name: "Outsourced HR, Recruiting and Payroll Services for US Companies",
    serviceType: "HR outsourcing",
    category: "Business Operations",
    image: "/banners/hr.png",
    offers: ["Recruiting & RPO", "Payroll & Benefits", "HRIS & Systems", "Onboarding", "Compliance & Policy", "Performance & L&D"],
  },
  "/services/finance-accounting": {
    name: "Finance and Accounting Outsourcing for US Companies",
    serviceType: "Finance and accounting outsourcing",
    category: "Business Operations",
    image: "/banners/finance.png",
    offers: ["Bookkeeping", "Accounts Payable", "Accounts Receivable", "Financial Reporting", "Payroll & Compliance", "FP&A & CFO Support"],
  },
  "/services/construction-estimation": {
    name: "Outsourced Construction Estimating and Takeoff Services for US Contractors",
    serviceType: "Construction estimating",
    category: "Construction",
    image: "/banners/construction-estimation.png",
    offers: ["Quantity Takeoffs", "Cost Estimating", "Bid Preparation", "Value Engineering", "Project Planning", "Material Management"],
  },
  "/services/digital-marketing": {
    name: "Digital Marketing Outsourcing: SEO, PPC and CRO",
    serviceType: "Digital marketing",
    category: "Digital",
    image: "/banners/digital-marketing.png",
    offers: ["Performance Media", "SEO & Content", "CRM & Lifecycle", "Analytics & CRO"],
  },
  "/web-services": {
    name: "Custom Web Development, Web Apps and Ecommerce",
    serviceType: "Web development",
    category: "Digital",
    image: "/banners/web-services.png",
    offers: ["Custom Websites", "Web Applications", "Dashboards & Portals", "Ecommerce", "Performance & Care", "Support & Retainers"],
  },
};

/**
 * WebPage + Service + BreadcrumbList graph for a standalone service page.
 * `crumb` is the short name shown in the breadcrumb.
 */
export function serviceJsonLd(path: string, crumb: string): Record<string, unknown> {
  const def = STANDALONE_SERVICES[path];
  return serviceSchemaGraph({
    path,
    name: def?.name ?? crumb,
    shortName: crumb,
    kind: "service",
    serviceType: def?.serviceType ?? crumb,
    category: def?.category,
    image: def?.image,
    offers: (def?.offers ?? []).map((name) => ({ name })),
  });
}
