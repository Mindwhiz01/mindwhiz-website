import { buildMetadata } from "@/seo.config";

export const metadata = buildMetadata("/construction-estimation");

export default function ConstructionEstimationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
