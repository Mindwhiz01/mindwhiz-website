import { buildMetadata } from "@/seo.config";

export const metadata = buildMetadata("/careers");

export default function CareersLayout({ children }: { children: React.ReactNode }) {
  return children;
}
