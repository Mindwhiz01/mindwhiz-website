import TermsPageClient from "./TermsPageClient";
import { buildMetadata } from "@/seo.config";

export const metadata = buildMetadata("/terms");

export default function TermsPage() {
  return <TermsPageClient />;
}
