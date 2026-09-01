import { NextResponse } from "next/server";
import { readJson, requireSupabase, slugify } from "@/lib/adminApi";
import { EDITORIAL_AUTHOR } from "@/lib/blog";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Params = { params: { id: string } };

export async function PUT(req: Request, { params }: Params) {
  const { supabase, error } = requireSupabase();
  if (error) return error;

  const b = await readJson(req);
  const title = String(b.title ?? "").trim();
  if (!title) return NextResponse.json({ error: "Title is required" }, { status: 400 });

  const record = {
    slug: slugify(String(b.slug ?? "") || title),
    title,
    excerpt: String(b.excerpt ?? ""),
    category: String(b.category ?? "Operations"),
    date: String(b.date ?? new Date().toISOString().slice(0, 10)),
    read_time: String(b.readTime ?? "5 min read"),
    // Fixed editorial byline: posts are never attributed to an individual.
    author_name: EDITORIAL_AUTHOR.name,
    author_role: EDITORIAL_AUTHOR.role,
    author_avatar: EDITORIAL_AUTHOR.avatar,
    image: String(b.image ?? ""),
    featured: Boolean(b.featured ?? false),
    published: Boolean(b.published ?? true),
    body: Array.isArray(b.body) ? b.body : [],
    updated_at: new Date().toISOString(),
  };

  const { data, error: dbError } = await supabase
    .from("blog_posts")
    .update(record)
    .eq("id", params.id)
    .select()
    .single();

  if (dbError) {
    const msg = dbError.code === "23505" ? "A post with that slug already exists" : dbError.message;
    return NextResponse.json({ error: msg }, { status: 400 });
  }
  return NextResponse.json({ post: data });
}

export async function DELETE(_req: Request, { params }: Params) {
  const { supabase, error } = requireSupabase();
  if (error) return error;

  const { error: dbError } = await supabase.from("blog_posts").delete().eq("id", params.id);
  if (dbError) return NextResponse.json({ error: dbError.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
