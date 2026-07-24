import ServicePageClient from "./ServicePageClient";
import { buildMetadata } from "@/seo.config";

export const metadata = buildMetadata("/services/digital-marketing");

export default function ServicePage() {
  return <ServicePageClient />;
}
