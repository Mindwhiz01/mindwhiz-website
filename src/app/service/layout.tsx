import { buildMetadata } from "@/seo.config";

export const metadata = buildMetadata("/service");

export default function ServiceLayout({ children }: { children: React.ReactNode }) {
  return children;
}
