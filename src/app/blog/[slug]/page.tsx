import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BlogPostPage from "@/components/BlogPostPage";
import { getPostBySlug, posts } from "@/lib/blog";

// Pre-render the static seed posts; admin-created slugs render on demand.
export const dynamicParams = true;
export const revalidate = 60;

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = await getPostBySlug(params.slug);
  if (!post) return {};
  // Post titles run long and are the page's real identity - past ~50 chars
  // appending "| MindWhiz" pushes the <title> over Google's ~60 char cutoff,
  // so drop the brand suffix instead of truncating the title itself.
  const title = post.title.length > 50 ? { absolute: post.title } : post.title;
  return {
    title,
    description: post.excerpt,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title: `${post.title} | MindWhiz`,
      description: post.excerpt,
      images: post.image ? [post.image] : undefined,
      type: "article",
    },
  };
}

export default async function Page({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug(params.slug);
  if (!post) notFound();
  return <BlogPostPage post={post} />;
}
