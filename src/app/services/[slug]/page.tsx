import { notFound } from "next/navigation";
import ServiceDetailPage from "@/components/ServiceDetailPage";
import { getServicePage, servicePages } from "@/lib/servicePages";

export function generateStaticParams() {
  return servicePages.map((page) => ({ slug: page.slug }));
}

export default function ServicePage({ params }: { params: { slug: string } }) {
  const page = getServicePage(params.slug);

  if (!page) {
    notFound();
  }

  return <ServiceDetailPage page={page} />;
}
