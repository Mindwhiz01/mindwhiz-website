import { NextResponse } from "next/server";
import { caseStudyRecord, readJson, requireSupabase } from "@/lib/adminApi";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Params = { params: { id: string } };

export async function PUT(req: Request, { params }: Params) {
  const { supabase, error } = requireSupabase();
  if (error) return error;

  const { ok, record } = caseStudyRecord(await readJson(req));
  if (!ok) return NextResponse.json({ error: "Client name is required" }, { status: 400 });

  const { data, error: dbError } = await supabase
    .from("case_studies")
    .update({ ...record, updated_at: new Date().toISOString() })
    .eq("id", params.id)
    .select()
    .single();

  if (dbError) {
    const msg = dbError.code === "23505" ? "A case study with that slug already exists" : dbError.message;
    return NextResponse.json({ error: msg }, { status: 400 });
  }
  return NextResponse.json({ caseStudy: data });
}

export async function DELETE(_req: Request, { params }: Params) {
  const { supabase, error } = requireSupabase();
  if (error) return error;

  const { error: dbError } = await supabase.from("case_studies").delete().eq("id", params.id);
  if (dbError) return NextResponse.json({ error: dbError.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
