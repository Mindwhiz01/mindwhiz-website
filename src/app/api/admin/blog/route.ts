import { NextResponse } from "next/server";
import { readJson, requireSupabase, slugify } from "@/lib/adminApi";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// List all blog posts (published + drafts) for the admin table.
export async function GET() {
  const { supabase, error } = requireSupabase();
  if (error) return error;

  const { data, error: dbError } = await supabase
    .from("blog_posts")
    .select("*")
    .order("date", { ascending: false });

  if (dbError) return NextResponse.json({ error: dbError.message }, { status: 500 });
  return NextResponse.json({ posts: data ?? [] });
}

// Create a blog post.
export async function POST(req: Request) {
  const { supabase, error } = requireSupabase();
  if (error) return error;

  const b = await readJson(req);
  const title = String(b.title ?? "").trim();
  if (!title) return NextResponse.json({ error: "Title is required" }, { status: 400 });

  const slug = slugify(String(b.slug ?? "") || title);
  const record = {
    slug,
    title,
    excerpt: String(b.excerpt ?? ""),
    category: String(b.category ?? "Operations"),
    date: String(b.date ?? new Date().toISOString().slice(0, 10)),
    read_time: String(b.readTime ?? "5 min read"),
    author_name: String(b.authorName ?? "MindWhiz Team"),
    author_role: String(b.authorRole ?? "Editorial"),
    author_avatar: String(b.authorAvatar ?? ""),
    image: String(b.image ?? ""),
    featured: Boolean(b.featured ?? false),
    published: Boolean(b.published ?? true),
    body: Array.isArray(b.body) ? b.body : [],
  };

  const { data, error: dbError } = await supabase
    .from("blog_posts")
    .insert(record)
    .select()
    .single();

  if (dbError) {
    const msg = dbError.code === "23505" ? "A post with that slug already exists" : dbError.message;
    return NextResponse.json({ error: msg }, { status: 400 });
  }
  return NextResponse.json({ post: data }, { status: 201 });
}
