import { buildMetadata } from "@/seo.config";

export const metadata = buildMetadata("/contact");

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
