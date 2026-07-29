import { NextResponse } from "next/server";
import { caseStudyRecord, readJson, requireSupabase } from "@/lib/adminApi";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const { supabase, error } = requireSupabase();
  if (error) return error;

  const { data, error: dbError } = await supabase
    .from("case_studies")
    .select("*")
    .order("created_at", { ascending: false });

  if (dbError) return NextResponse.json({ error: dbError.message }, { status: 500 });
  return NextResponse.json({ caseStudies: data ?? [] });
}

export async function POST(req: Request) {
  const { supabase, error } = requireSupabase();
  if (error) return error;

  const { ok, record } = caseStudyRecord(await readJson(req));
  if (!ok) return NextResponse.json({ error: "Client name is required" }, { status: 400 });

  const { data, error: dbError } = await supabase
    .from("case_studies")
    .insert(record)
    .select()
    .single();

  if (dbError) {
    const msg = dbError.code === "23505" ? "A case study with that slug already exists" : dbError.message;
    return NextResponse.json({ error: msg }, { status: 400 });
  }
  return NextResponse.json({ caseStudy: data }, { status: 201 });
}
