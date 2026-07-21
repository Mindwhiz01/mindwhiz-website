import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ServiceDetailPage from "@/components/ServiceDetailPage";
import { getIndustryPage, industryPages } from "@/lib/industryPages";

export function generateStaticParams() {
  return industryPages.map((page) => ({ slug: page.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const page = getIndustryPage(params.slug);
  if (!page) return {};
  return {
    title: page.name,
    description: page.hero.subtitle,
    alternates: { canonical: `/industries/${page.slug}` },
    openGraph: {
      title: `${page.name} | MindWhiz`,
      description: page.hero.subtitle,
    },
  };
}

export default function IndustryPage({ params }: { params: { slug: string } }) {
  const page = getIndustryPage(params.slug);

  if (!page) {
    notFound();
  }

  return <ServiceDetailPage page={page} basePath="/industries" sectionLabel="Industries" />;
}
