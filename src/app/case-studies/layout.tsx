import { buildMetadata } from "@/seo.config";

export const metadata = buildMetadata("/case-studies");

export default function CaseStudiesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
