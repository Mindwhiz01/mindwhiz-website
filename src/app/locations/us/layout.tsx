import { buildMetadata } from "@/seo.config";

export const metadata = buildMetadata("/locations/us");

export default function UsLocationLayout({ children }: { children: React.ReactNode }) {
  return children;
}
