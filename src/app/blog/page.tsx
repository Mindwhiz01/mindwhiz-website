import type { Metadata } from "next";
import BlogListPage from "@/components/BlogListPage";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Ideas, guides, and behind-the-scenes stories from MindWhiz on hybrid staffing, IT operations, cloud, security, and building teams that scale.",
  alternates: { canonical: "/blog" },
};

export default function Page() {
  return <BlogListPage />;
}
