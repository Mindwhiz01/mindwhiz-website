import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BlogPostPage from "@/components/BlogPostPage";
import { getPost, posts } from "@/lib/blog";

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const post = getPost(params.slug);
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
      images: [post.image],
      type: "article",
    },
  };
}

export default function Page({ params }: { params: { slug: string } }) {
  const post = getPost(params.slug);
  if (!post) notFound();
  return <BlogPostPage post={post} />;
}
