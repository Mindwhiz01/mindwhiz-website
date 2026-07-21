import type { Metadata } from "next";
import ServicePageClient from "./ServicePageClient";

const title = "Digital Agency Services";
const description =
  "Growth sprints, web systems, and brand execution from MindWhiz's digital agency team - built to move fast and plug straight into your roadmap.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/service" },
  openGraph: { title: `${title} | MindWhiz`, description },
};

export default function ServicePage() {
  return <ServicePageClient />;
}
