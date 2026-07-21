import type { Metadata } from "next";
import ContactPageClient from "./ContactPageClient";

const title = "Contact Us";
const description =
  "Talk to MindWhiz about building a hybrid staffing, IT, security, or back-office team - reach our Houston HQ or start a conversation online.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/contact" },
  openGraph: { title: `${title} | MindWhiz`, description },
};

export default function ContactPage() {
  return <ContactPageClient />;
}
