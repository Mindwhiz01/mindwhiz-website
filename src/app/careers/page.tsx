import type { Metadata } from "next";
import CareersPageClient from "./CareersPageClient";

const title = "Careers";
const description =
  "Join MindWhiz across Houston, London, and Lahore - open roles in IT support, security, back-office operations, and delivery for a hybrid staffing and BPO team.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/careers" },
  openGraph: { title: `${title} | MindWhiz`, description },
};

export default function CareersPage() {
  return <CareersPageClient />;
}
