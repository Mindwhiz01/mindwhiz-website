import { SEO_MAP, siteUrl } from "@/seo.config";
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

const AREA_SERVED = [
  { "@type": "Country", name: "United States" },
  { "@type": "Country", name: "United Kingdom" },
  { "@type": "Country", name: "Pakistan" },
];

/**
 * Service + BreadcrumbList schema for a root-level service page (e.g. /hr).
 * Name/description are pulled from the SEO map so they stay in sync with the
 * page's title/description. `crumb` is the human label shown in the breadcrumb.
 */
export function serviceJsonLd(path: string, crumb: string): Record<string, unknown>[] {
  const entry = SEO_MAP[path];
  const url = `${siteUrl}${path}`;
  const name = crumb;

  const service: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description: entry?.description,
    provider: { "@id": `${siteUrl}/#organization` },
    areaServed: AREA_SERVED,
    serviceType: name,
    url,
  };

  const breadcrumb: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
      { "@type": "ListItem", position: 2, name, item: url },
    ],
  };

  return [service, breadcrumb];
}
