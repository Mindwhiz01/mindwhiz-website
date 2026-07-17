import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Newsletter",
  description:
    "Subscribe to The MindWhiz Dispatch — a once-a-month newsletter with practical ideas on hybrid staffing, IT operations, and building lean teams. No spam.",
  alternates: { canonical: "/newsletter" },
};

export default function NewsletterLayout({ children }: { children: React.ReactNode }) {
  return children;
}
