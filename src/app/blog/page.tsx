import BlogListPage from "@/components/BlogListPage";
import { buildMetadata } from "@/seo.config";

export const metadata = buildMetadata("/blog");

export default function Page() {
  return <BlogListPage />;
}
