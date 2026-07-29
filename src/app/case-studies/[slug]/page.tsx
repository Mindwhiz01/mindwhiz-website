import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CaseStudyDetail from "@/components/CaseStudyDetail";
import { getCaseStudyBySlug } from "@/lib/caseStudies";
import { caseStudies } from "@/lib/content";

// Pre-render the static seed studies; admin-created slugs render on demand.
export const dynamicParams = true;
export const revalidate = 60;

export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

// Meta descriptions cap at ~155 chars before Google truncates mid-sentence -
// `result` runs several sentences long, so clip to the first sentence.
function metaDescription(text: string, max = 155) {
  const firstSentence = text.split(". ")[0] + ".";
  if (firstSentence.length <= max) return firstSentence;
  return `${text.slice(0, max - 1).trimEnd()}…`;
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const cs = await getCaseStudyBySlug(params.slug);
  if (!cs) return {};
  const description = metaDescription(cs.result);
  return {
    title: `${cs.client}, Case Study`,
    description,
    alternates: { canonical: `/case-studies/${cs.slug}` },
    openGraph: {
      title: `${cs.client}, Case Study | MindWhiz`,
      description,
      images: cs.img ? [cs.img] : undefined,
      type: "article",
    },
  };
}

export default async function Page({ params }: { params: { slug: string } }) {
  const cs = await getCaseStudyBySlug(params.slug);
  if (!cs) notFound();
  return <CaseStudyDetail cs={cs} />;
}
