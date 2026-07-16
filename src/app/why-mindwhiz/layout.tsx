import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Why MindWhiz",
  description:
    "Why teams choose MindWhiz: flexible engagement models, global talent hubs, and proven delivery across IT, security, and business operations.",
  alternates: { canonical: "/why-mindwhiz" },
};

export default function WhyMindwhizLayout({ children }: { children: React.ReactNode }) {
  return children;
}
