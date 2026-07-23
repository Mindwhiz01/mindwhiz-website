import type { Metadata } from "next";
import CulturePageClient from "./CulturePageClient";

const title = "Our Culture";
const description =
  "How MindWhiz invests in its people across the US, UK, and Pakistan, the values and day to day culture behind our hybrid staffing teams.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/culture" },
  openGraph: { title: `${title} | MindWhiz`, description },
};

export default function CulturePage() {
  return <CulturePageClient />;
}
