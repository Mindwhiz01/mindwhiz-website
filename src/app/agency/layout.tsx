import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Digital Agency Services",
  description:
    "MindWhiz agency services, design, marketing, and digital execution powered by flexible hybrid teams that scale with your goals.",
  alternates: { canonical: "/agency" },
};

export default function AgencyLayout({ children }: { children: React.ReactNode }) {
  return children;
}
