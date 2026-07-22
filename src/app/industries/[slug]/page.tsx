import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ServiceDetailPage from "@/components/ServiceDetailPage";
import { getIndustryPage, industryPages } from "@/lib/industryPages";
import { buildMetadata } from "@/seo.config";

export function generateStaticParams() {
  return industryPages.map((page) => ({ slug: page.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const page = getIndustryPage(params.slug);
  if (!page) return {};
  // Prefer the hand-tuned entry in the SEO map; fall back to page data so any
  // new industry slug still gets a unique title/description and canonical.
  return buildMetadata(`/industries/${page.slug}`, {
    title: `${page.name} | MindWhiz`,
    description: page.hero.subtitle,
  });
}

export default function IndustryPage({ params }: { params: { slug: string } }) {
  const page = getIndustryPage(params.slug);

  if (!page) {
    notFound();
  }

  return <ServiceDetailPage page={page} basePath="/industries" sectionLabel="Industries" />;
}
