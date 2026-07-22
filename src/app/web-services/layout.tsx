import { buildMetadata } from "@/seo.config";

export const metadata = buildMetadata("/web-services");

export default function WebServicesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
