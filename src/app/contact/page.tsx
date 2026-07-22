import ContactPageClient from "./ContactPageClient";
import { buildMetadata } from "@/seo.config";

export const metadata = buildMetadata("/contact");

export default function ContactPage() {
  return <ContactPageClient />;
}
