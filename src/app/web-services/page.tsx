import type { Metadata } from "next";
import WebServicesPageClient from "./WebServicesPageClient";

const title = "Web Development Services";
const description =
  "High-performance websites, web apps, and dashboards - designed, built, and optimized by MindWhiz to look sharp, load fast, and rank well.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/web-services" },
  openGraph: { title: `${title} | MindWhiz`, description },
};

export default function WebServicesPage() {
  return <WebServicesPageClient />;
}
