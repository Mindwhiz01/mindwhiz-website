import { NextResponse } from "next/server";
import { requireSupabase } from "@/lib/adminApi";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Params = { params: { id: string } };

export async function DELETE(_req: Request, { params }: Params) {
  const { supabase, error } = requireSupabase();
  if (error) return error;

  const { error: dbError } = await supabase
    .from("newsletter_subscribers")
    .delete()
    .eq("id", params.id);

  if (dbError) return NextResponse.json({ error: dbError.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
