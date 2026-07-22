import { buildMetadata } from "@/seo.config";

export const metadata = buildMetadata("/locations/uk");

export default function UkLocationLayout({ children }: { children: React.ReactNode }) {
  return children;
}
