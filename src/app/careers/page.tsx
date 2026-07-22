import CareersPageClient from "./CareersPageClient";
import { buildMetadata } from "@/seo.config";

export const metadata = buildMetadata("/careers");

export default function CareersPage() {
  return <CareersPageClient />;
}
