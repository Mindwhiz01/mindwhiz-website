import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Web Development Services",
  description:
    "MindWhiz web department - custom websites, web apps, dashboards, and e-commerce built with modern technologies and SEO built in. See the sites we've shipped.",
  alternates: { canonical: "/web-services" },
};

export default function WebServicesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
