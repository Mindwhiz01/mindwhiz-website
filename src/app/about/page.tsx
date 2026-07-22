import AboutPageClient from "./AboutPageClient";
import { buildMetadata } from "@/seo.config";

export const metadata = buildMetadata("/about");

export default function AboutPage() {
  return <AboutPageClient />;
}
