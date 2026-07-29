import { NextResponse } from "next/server";
import { gscConfig, getKeywordReport } from "@/lib/analytics";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const ALLOWED_DAYS = [7, 28, 90];

export async function GET(req: Request) {
  const cfg = gscConfig();
  if (!cfg.ok) return NextResponse.json({ error: cfg.reason }, { status: 503 });

  const url = new URL(req.url);
  const days = Number(url.searchParams.get("days"));
  const range = ALLOWED_DAYS.includes(days) ? days : 28;

  try {
    const keywords = await getKeywordReport(range);
    return NextResponse.json({ range, keywords });
  } catch (err) {
    return NextResponse.json({ error: (err as Error).message }, { status: 502 });
  }
}
