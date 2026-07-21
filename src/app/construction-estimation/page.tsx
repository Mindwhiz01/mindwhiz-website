import type { Metadata } from "next";
import ConstructionEstimationPageClient from "./ConstructionEstimationPageClient";

const title = "Construction Estimating Services";
const description =
  "Vetted remote estimators embedded in your bid workflow - faster takeoffs, more competitive bids, and no added in-house headcount.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/construction-estimation" },
  openGraph: { title: `${title} | MindWhiz`, description },
};

export default function ConstructionEstimationPage() {
  return <ConstructionEstimationPageClient />;
}
