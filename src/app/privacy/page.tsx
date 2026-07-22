import PrivacyPageClient from "./PrivacyPageClient";
import { buildMetadata } from "@/seo.config";

export const metadata = buildMetadata("/privacy");

export default function PrivacyPage() {
  return <PrivacyPageClient />;
}
