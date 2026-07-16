import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "HR & Recruitment Services",
  description:
    "MindWhiz HR services - recruitment, onboarding, and people operations delivered by experienced hybrid teams across the US, UK, and Pakistan.",
  alternates: { canonical: "/hr" },
};

export default function HrLayout({ children }: { children: React.ReactNode }) {
  return children;
}
