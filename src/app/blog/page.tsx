import BlogListPage from "@/components/BlogListPage";
import { buildMetadata } from "@/seo.config";
import { getAllPosts } from "@/lib/blog";

export const metadata = buildMetadata("/blog");

// Revalidate so admin-created posts appear without a redeploy.
export const revalidate = 60;

export default async function Page() {
  const allPosts = await getAllPosts();
  return <BlogListPage allPosts={allPosts} />;
}
