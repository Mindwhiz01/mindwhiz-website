import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ServiceDetailPage from "@/components/ServiceDetailPage";
import { getServicePage, servicePages } from "@/lib/servicePages";
import { buildMetadata } from "@/seo.config";

export function generateStaticParams() {
  return servicePages.map((page) => ({ slug: page.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const page = getServicePage(params.slug);
  if (!page) return {};
  // Prefer the hand-tuned entry in the SEO map; fall back to page data so any
  // new service slug still gets a unique title/description and canonical.
  return buildMetadata(`/services/${page.slug}`, {
    title: `${page.name} | MindWhiz`,
    description: page.hero.subtitle,
  });
}

export default function ServicePage({ params }: { params: { slug: string } }) {
  const page = getServicePage(params.slug);

  if (!page) {
    notFound();
  }

  return <ServiceDetailPage page={page} basePath="/services" sectionLabel="Services" />;
}
