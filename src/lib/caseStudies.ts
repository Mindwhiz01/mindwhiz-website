// ---------------------------------------------------------------------------
// Case study data layer. The static `caseStudies` in content.ts are the
// seed/fallback set; the admin dashboard adds more via Supabase. These async
// helpers merge the two. Server-only (they touch the Supabase service role).
// ---------------------------------------------------------------------------

import { caseStudies, getCaseStudy as getStaticCaseStudy } from "@/lib/content";

export type CaseStudy = {
  slug: string;
  client: string;
  category: string;
  result: string;
  highlights: string[];
  img: string;
  logo: string;
  services: string[];
  challenge: string;
  approach: string[];
  outcomes: string[];
  metrics: { value: string; label: string }[];
  quote: { text: string; author: string };
};

// Shape of a row in the Supabase `case_studies` table.
type CaseStudyRow = {
  slug: string;
  client: string;
  category: string | null;
  result: string | null;
  highlights: string[] | null;
  img: string | null;
  logo: string | null;
  services: string[] | null;
  challenge: string | null;
  approach: string[] | null;
  outcomes: string[] | null;
  metrics: { value: string; label: string }[] | null;
  quote_text: string | null;
  quote_author: string | null;
};

function rowToCaseStudy(r: CaseStudyRow): CaseStudy {
  return {
    slug: r.slug,
    client: r.client,
    category: r.category ?? "",
    result: r.result ?? "",
    highlights: r.highlights ?? [],
    img: r.img ?? "",
    logo: r.logo ?? r.img ?? "",
    services: r.services ?? [],
    challenge: r.challenge ?? "",
    approach: r.approach ?? [],
    outcomes: r.outcomes ?? [],
    metrics: r.metrics ?? [],
    quote: { text: r.quote_text ?? "", author: r.quote_author ?? "" },
  };
}

/** All case studies: admin (Supabase, published) first, then static seeds. */
export async function getAllCaseStudies(): Promise<CaseStudy[]> {
  const { getSupabase } = await import("@/lib/supabase");
  const supabase = getSupabase();
  if (!supabase) return caseStudies as CaseStudy[];

  const { data, error } = await supabase
    .from("case_studies")
    .select("*")
    .eq("published", true)
    .order("created_at", { ascending: false });

  if (error || !data) return caseStudies as CaseStudy[];

  const dynamic = (data as CaseStudyRow[]).map(rowToCaseStudy);
  const dynamicSlugs = new Set(dynamic.map((c) => c.slug));
  return [
    ...dynamic,
    ...(caseStudies as CaseStudy[]).filter((c) => !dynamicSlugs.has(c.slug)),
  ];
}

export async function getCaseStudyBySlug(slug: string): Promise<CaseStudy | undefined> {
  const { getSupabase } = await import("@/lib/supabase");
  const supabase = getSupabase();
  if (supabase) {
    const { data } = await supabase
      .from("case_studies")
      .select("*")
      .eq("slug", slug)
      .eq("published", true)
      .maybeSingle();
    if (data) return rowToCaseStudy(data as CaseStudyRow);
  }
  return getStaticCaseStudy(slug) as CaseStudy | undefined;
}
