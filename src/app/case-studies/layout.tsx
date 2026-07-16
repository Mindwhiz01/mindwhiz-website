import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Case Studies",
  description:
    "Real client engagements and outcomes delivered by MindWhiz hybrid teams — on the record across IT, security, and business operations.",
  alternates: { canonical: "/case-studies" },
};

export default function CaseStudiesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
