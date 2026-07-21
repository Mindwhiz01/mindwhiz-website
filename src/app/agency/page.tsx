import type { Metadata } from "next";
import AgencyPageClient from "./AgencyPageClient";

const title = "Digital Agency — Brand & Growth Partner";
const description =
  "MindWhiz's digital agency arm - brand, web, and growth work built around a bonded, embedded team model instead of a typical project handoff.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/agency" },
  openGraph: { title: `${title} | MindWhiz`, description },
};

export default function AgencyPage() {
  return <AgencyPageClient />;
}
