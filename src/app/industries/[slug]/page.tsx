import { notFound } from "next/navigation";
import ServiceDetailPage from "@/components/ServiceDetailPage";
import { getIndustryPage, industryPages } from "@/lib/industryPages";

export function generateStaticParams() {
  return industryPages.map((page) => ({ slug: page.slug }));
}

export default function IndustryPage({ params }: { params: { slug: string } }) {
  const page = getIndustryPage(params.slug);

  if (!page) {
    notFound();
  }

  return <ServiceDetailPage page={page} />;
}
