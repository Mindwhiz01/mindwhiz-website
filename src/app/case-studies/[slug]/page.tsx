import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CaseStudyDetail from "@/components/CaseStudyDetail";
import { getCaseStudyBySlug } from "@/lib/caseStudies";
import { caseStudies } from "@/lib/content";
import { DEFAULT_SHARE_IMAGE } from "@/seo.config";

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
  // Titles name the client and the work ("Alpha Bravo Case Study:
  // Construction Estimation | MindWhiz") instead of a bare "Alpha Bravo,
  // Case Study"; descriptions add the services so they reach 140-155 chars.
  const title = `${cs.client} Case Study: ${cs.services?.[0] ?? cs.category} | MindWhiz`;
  let description = metaDescription(cs.result);
  // Append as many services as fit within 155 characters.
  for (let n = Math.min(3, cs.services?.length ?? 0); n > 0 && description.length < 130; n--) {
    const candidate = `${description} Services: ${cs.services.slice(0, n).join(", ")}.`;
    if (candidate.length <= 155) description = candidate;
  }
  const images = cs.img ? [cs.img] : [DEFAULT_SHARE_IMAGE.url];
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: `/case-studies/${cs.slug}` },
    openGraph: {
      title,
      description,
      url: `/case-studies/${cs.slug}`,
      images,
      type: "article",
      siteName: "MindWhiz",
    },
    twitter: { card: "summary_large_image", title, description, images },
  };
}

export default async function Page({ params }: { params: { slug: string } }) {
  const cs = await getCaseStudyBySlug(params.slug);
  if (!cs) notFound();
  return <CaseStudyDetail cs={cs} />;
}
