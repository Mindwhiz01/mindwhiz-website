import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "MindWhiz Pakistan",
  description:
    "MindWhiz's largest engineering and delivery hub in Lahore, Pakistan — 24/7 NOC, SOC, and helpdesk operations backed by deep technical talent.",
  alternates: { canonical: "/locations/pk" },
};

export default function PkLocationLayout({ children }: { children: React.ReactNode }) {
  return children;
}
