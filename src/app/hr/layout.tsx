import { buildMetadata } from "@/seo.config";

export const metadata = buildMetadata("/hr");

export default function HrLayout({ children }: { children: React.ReactNode }) {
  return children;
}
