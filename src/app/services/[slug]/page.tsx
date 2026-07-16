import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ServiceDetailPage from "@/components/ServiceDetailPage";
import { getServicePage, servicePages } from "@/lib/servicePages";

export function generateStaticParams() {
  return servicePages.map((page) => ({ slug: page.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const page = getServicePage(params.slug);
  if (!page) return {};
  return {
    title: page.name,
    description: page.hero.subtitle,
    alternates: { canonical: `/services/${page.slug}` },
    openGraph: {
      title: `${page.name} | MindWhiz`,
      description: page.hero.subtitle,
    },
  };
}

export default function ServicePage({ params }: { params: { slug: string } }) {
  const page = getServicePage(params.slug);

  if (!page) {
    notFound();
  }

  return <ServiceDetailPage page={page} />;
}
