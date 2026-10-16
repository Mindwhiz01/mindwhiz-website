import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BlogPostPage from "@/components/BlogPostPage";
import { getPostBySlug, posts, isPublished } from "@/lib/blog";
import { DEFAULT_SHARE_IMAGE } from "@/seo.config";

// Pre-render the static seed posts; admin-created slugs render on demand.
export const dynamicParams = true;
export const revalidate = 60;

export function generateStaticParams() {
  return posts.filter((p) => isPublished(p)).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = await getPostBySlug(params.slug);
  if (!post) return {};
  // Post titles run long and are the page's real identity - past ~50 chars
  // appending "| MindWhiz" pushes the <title> over Google's ~60 char cutoff,
  // so drop the brand suffix instead of truncating the title itself.
  const title = post.title.length > 50 ? { absolute: post.title } : post.title;
  const fullTitle = post.title.length > 50 ? post.title : `${post.title} | MindWhiz`;
  // Excerpts can run long; SERP snippets cut off around 155 chars.
  const description =
    post.metaDescription ??
    (post.excerpt.length > 155 ? `${post.excerpt.slice(0, 152).replace(/\s+\S*$/, "")}...` : post.excerpt);
  const images = post.image ? [{ url: post.image, alt: post.title }] : [DEFAULT_SHARE_IMAGE];
  return {
    title,
    description,
    alternates: { canonical: `/blog/${post.slug}` },
    // Per-post social tags: without these the root layout's homepage pitch
    // was shown when a post was shared.
    openGraph: {
      title: fullTitle,
      description,
      url: `/blog/${post.slug}`,
      images,
      type: "article",
      publishedTime: post.date,
      modifiedTime: post.updated ?? post.date,
      siteName: "MindWhiz",
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: images.map((i) => i.url),
    },
  };
}

export default async function Page({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug(params.slug);
  if (!post) notFound();
  return <BlogPostPage post={post} />;
}
