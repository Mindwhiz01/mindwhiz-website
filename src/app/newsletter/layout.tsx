import { buildMetadata } from "@/seo.config";

export const metadata = buildMetadata("/newsletter");

export default function NewsletterLayout({ children }: { children: React.ReactNode }) {
  return children;
}
