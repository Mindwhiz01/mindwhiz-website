import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services - IT, Security & Business Operations",
  description:
    "Explore MindWhiz services: 24/7 IT helpdesk, NOC monitoring, cybersecurity, cloud, DevOps, HR, finance, and marketing - delivered by scalable hybrid teams.",
  alternates: { canonical: "/service" },
};

export default function ServiceLayout({ children }: { children: React.ReactNode }) {
  return children;
}
