import type { Metadata } from "next";
import CaseStudiesPageClient from "./CaseStudiesPageClient";
import { caseStudies } from "@/lib/content";

const title = "Case Studies";
const description =
  "Client engagement records - construction, IT staffing, and back-office case studies showing how MindWhiz builds and embeds hybrid teams.";
const siteUrl = "https://graphite-teal-template.vercel.app";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/case-studies" },
  openGraph: { title: `${title} | MindWhiz`, description },
};

const itemListJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  itemListElement: caseStudies.map((cs, i) => ({
    "@type": "ListItem",
    position: i + 1,
    url: `${siteUrl}/case-studies/${cs.slug}`,
    name: `${cs.client} — ${cs.category}`,
  })),
};

export default function CaseStudiesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />
      <CaseStudiesPageClient />
    </>
  );
}
