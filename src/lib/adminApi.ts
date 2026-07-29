// Shared helpers for the admin API route handlers. Auth is already enforced by
// middleware.ts before any of these run.
import { NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";
import type { SupabaseClient } from "@supabase/supabase-js";

/** Returns the Supabase client, or a ready-to-return error response. */
export function requireSupabase():
  | { supabase: SupabaseClient; error: null }
  | { supabase: null; error: NextResponse } {
  const supabase = getSupabase();
  if (!supabase) {
    return {
      supabase: null,
      error: NextResponse.json(
        {
          error:
            "Supabase is not configured. Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY.",
        },
        { status: 503 },
      ),
    };
  }
  return { supabase, error: null };
}

export function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

export async function readJson(req: Request): Promise<Record<string, unknown>> {
  try {
    const body = await req.json();
    return body && typeof body === "object" ? (body as Record<string, unknown>) : {};
  } catch {
    return {};
  }
}

const strArray = (v: unknown): string[] =>
  Array.isArray(v) ? v.map((x) => String(x)).filter(Boolean) : [];

/** Normalize a case-study request body into a DB row. */
export function caseStudyRecord(b: Record<string, unknown>) {
  const client = String(b.client ?? "").trim();
  return {
    ok: Boolean(client),
    record: {
      slug: slugify(String(b.slug ?? "") || client),
      client,
      category: String(b.category ?? ""),
      result: String(b.result ?? ""),
      highlights: strArray(b.highlights),
      img: String(b.img ?? ""),
      logo: String(b.logo ?? b.img ?? ""),
      services: strArray(b.services),
      challenge: String(b.challenge ?? ""),
      approach: strArray(b.approach),
      outcomes: strArray(b.outcomes),
      metrics: Array.isArray(b.metrics)
        ? (b.metrics as unknown[])
            .map((m) => {
              const mm = (m ?? {}) as Record<string, unknown>;
              return { value: String(mm.value ?? ""), label: String(mm.label ?? "") };
            })
            .filter((m) => m.value || m.label)
        : [],
      quote_text: String(b.quoteText ?? ""),
      quote_author: String(b.quoteAuthor ?? ""),
      published: Boolean(b.published ?? true),
    },
  };
}
