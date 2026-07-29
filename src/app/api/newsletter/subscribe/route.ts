import { NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Public endpoint: the newsletter subscribe form posts here.
export async function POST(req: Request) {
  let email = "";
  try {
    const body = await req.json();
    email = String(body?.email ?? "").trim().toLowerCase();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
  }

  const supabase = getSupabase();
  // If Supabase isn't configured we still return success so the marketing form
  // keeps working — the address just isn't persisted.
  if (!supabase) return NextResponse.json({ ok: true, stored: false });

  const { error } = await supabase
    .from("newsletter_subscribers")
    .upsert({ email, status: "subscribed", source: "website" }, { onConflict: "email" });

  if (error) {
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }
  return NextResponse.json({ ok: true, stored: true });
}
