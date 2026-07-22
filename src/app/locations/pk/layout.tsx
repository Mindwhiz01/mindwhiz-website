import { buildMetadata } from "@/seo.config";

export const metadata = buildMetadata("/locations/pk");

export default function PkLocationLayout({ children }: { children: React.ReactNode }) {
  return children;
}
