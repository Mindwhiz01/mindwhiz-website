import type { Metadata } from "next";
import WhyMindWhizPageClient from "./WhyMindWhizPageClient";

const title = "Why MindWhiz";
const description =
  "Why businesses choose MindWhiz for hybrid staffing and BPO - the delivery model, client results, and what sets our embedded teams apart.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/why-mindwhiz" },
  openGraph: { title: `${title} | MindWhiz`, description },
};

export default function WhyMindWhizPage() {
  return <WhyMindWhizPageClient />;
}
