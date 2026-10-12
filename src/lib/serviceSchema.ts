// ---------------------------------------------------------------------------
// Structured data for every service and industry page, built in one place so
// the 13 data-driven service pages, the 9 industry pages and the 5 standalone
// service pages (HR, finance, construction, digital marketing, web) all emit
// the same, complete graph:
//
//   WebPage  ->  about  ->  Service  ->  provider  ->  #organization (layout)
//            ->  breadcrumb  ->  BreadcrumbList
//
// FAQPage is emitted separately by <FaqSection>, from the same data as the
// visible FAQ.
// ---------------------------------------------------------------------------

import { SEO_MAP, siteUrl } from "@/seo.config";

const ORG = { "@id": `${siteUrl}/#organization` };
const WEBSITE = { "@id": `${siteUrl}/#website` };

const AREA_SERVED = [
  { "@type": "Country", name: "United States" },
  { "@type": "Country", name: "United Kingdom" },
];

export type ServiceSchemaInput = {
  /** Route path, e.g. "/services/noc-monitoring". */
  path: string;
  /** Page H1 / keyword name of the service. */
  name: string;
  /** Short name used in the breadcrumb and as alternateName. */
  shortName: string;
  /** schema.org serviceType (what the service is, in plain words). */
  serviceType: string;
  /** "service" for /services/*, "industry" for /industries/*. */
  kind: "service" | "industry";
  /** Category for services ("IT & Security") or the industry name. */
  category?: string;
  /** Falls back to the SEO map description for the path. */
  description?: string;
  /** What is included; becomes the OfferCatalog. */
  offers: { name: string; description?: string }[];
  /** Hero / banner image path. */
  image?: string;
};

export function serviceSchemaGraph(input: ServiceSchemaInput) {
  const url = `${siteUrl}${input.path}`;
  const seo = SEO_MAP[input.path];
  const description = input.description ?? seo?.description;
  const image = input.image
    ? input.image.startsWith("http")
      ? input.image
      : `${siteUrl}${input.image}`
    : undefined;

  const audience =
    input.kind === "industry"
      ? {
          "@type": "BusinessAudience",
          audienceType: `${input.category ?? input.shortName} companies`,
          geographicArea: AREA_SERVED,
        }
      : {
          "@type": "BusinessAudience",
          audienceType: "Small and mid-sized businesses, enterprises and MSPs",
          geographicArea: AREA_SERVED,
        };

  const service = {
    "@type": "Service",
    "@id": `${url}#service`,
    name: input.name,
    alternateName: input.shortName,
    description,
    serviceType: input.serviceType,
    ...(input.category ? { category: input.category } : {}),
    url,
    ...(image ? { image } : {}),
    provider: ORG,
    brand: ORG,
    areaServed: AREA_SERVED,
    audience,
    availableChannel: {
      "@type": "ServiceChannel",
      serviceUrl: `${siteUrl}/contact`,
      servicePhone: { "@type": "ContactPoint", telephone: "+1 (832) 900-4608", contactType: "sales" },
      availableLanguage: "English",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: `${input.shortName} services`,
      itemListElement: input.offers.map((o, i) => ({
        "@type": "Offer",
        position: i + 1,
        itemOffered: {
          "@type": "Service",
          name: o.name,
          ...(o.description ? { description: o.description } : {}),
          provider: ORG,
        },
      })),
    },
    mainEntityOfPage: { "@id": `${url}#webpage` },
  };

  const webPage = {
    "@type": "WebPage",
    "@id": `${url}#webpage`,
    url,
    name: seo?.title ?? input.name,
    description,
    inLanguage: "en-US",
    isPartOf: WEBSITE,
    about: { "@id": `${url}#service` },
    publisher: ORG,
    breadcrumb: { "@id": `${url}#breadcrumb` },
    ...(image ? { primaryImageOfPage: { "@type": "ImageObject", url: image } } : {}),
  };

  // Two levels only: /services and /industries have no index page, and a
  // breadcrumb item must point at a real URL.
  const breadcrumb = {
    "@type": "BreadcrumbList",
    "@id": `${url}#breadcrumb`,
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
      { "@type": "ListItem", position: 2, name: input.shortName, item: url },
    ],
  };

  return { "@context": "https://schema.org", "@graph": [webPage, service, breadcrumb] };
}
