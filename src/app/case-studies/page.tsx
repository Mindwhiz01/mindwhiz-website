import CaseStudiesPageClient from "@/components/CaseStudiesPageClient";
import { getAllCaseStudies } from "@/lib/caseStudies";

// Revalidate so admin-created case studies appear without a redeploy.
export const revalidate = 60;

export default async function Page() {
  const items = await getAllCaseStudies();
  return <CaseStudiesPageClient items={items} />;
}
