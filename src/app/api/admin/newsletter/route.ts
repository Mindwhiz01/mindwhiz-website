import { NextResponse } from "next/server";
import { requireSupabase } from "@/lib/adminApi";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// List newsletter subscribers for the admin table.
export async function GET() {
  const { supabase, error } = requireSupabase();
  if (error) return error;

  const { data, error: dbError } = await supabase
    .from("newsletter_subscribers")
    .select("*")
    .order("created_at", { ascending: false });

  if (dbError) return NextResponse.json({ error: dbError.message }, { status: 500 });
  return NextResponse.json({ subscribers: data ?? [] });
}
