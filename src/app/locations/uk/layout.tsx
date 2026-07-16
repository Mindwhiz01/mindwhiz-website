import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "MindWhiz United Kingdom",
  description:
    "MindWhiz's European delivery hub in London - GDPR-aware delivery, local account management, and support for clients across the UK and Europe.",
  alternates: { canonical: "/locations/uk" },
};

export default function UkLocationLayout({ children }: { children: React.ReactNode }) {
  return children;
}
