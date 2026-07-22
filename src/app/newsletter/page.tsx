import NewsletterPageClient from "./NewsletterPageClient";
import { buildMetadata } from "@/seo.config";

export const metadata = buildMetadata("/newsletter");

export default function NewsletterPage() {
  return <NewsletterPageClient />;
}
