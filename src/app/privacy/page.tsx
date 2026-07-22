import type { Metadata } from "next";
import PrivacyPageClient from "./PrivacyPageClient";

const title = "Privacy Policy";
const description =
  "How MindWhiz collects, uses, and protects information from clients, candidates, and website visitors.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/privacy" },
  robots: { index: true, follow: true },
};

export default function PrivacyPage() {
  return <PrivacyPageClient />;
}
