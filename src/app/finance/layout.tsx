import { buildMetadata } from "@/seo.config";

export const metadata = buildMetadata("/finance");

export default function FinanceLayout({ children }: { children: React.ReactNode }) {
  return children;
}
