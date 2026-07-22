import type { Metadata } from "next";
import TermsPageClient from "./TermsPageClient";

const title = "Terms & Conditions";
const description =
  "The terms and conditions governing use of the MindWhiz website and engagement of MindWhiz staffing and BPO services.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/terms" },
  robots: { index: true, follow: true },
};

export default function TermsPage() {
  return <TermsPageClient />;
}
