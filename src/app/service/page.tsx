import ServicePageClient from "./ServicePageClient";
import { buildMetadata } from "@/seo.config";

export const metadata = buildMetadata("/service");

export default function ServicePage() {
  return <ServicePageClient />;
}
