import type { Metadata } from "next";
import HrPageClient from "./HrPageClient";

const title = "HR Services";
const description =
  "Recruiting, onboarding, payroll support, and HR operations delivered by an embedded MindWhiz team so your people function scales without new overhead.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/hr" },
  openGraph: { title: `${title} | MindWhiz`, description },
};

export default function HrPage() {
  return <HrPageClient />;
}
