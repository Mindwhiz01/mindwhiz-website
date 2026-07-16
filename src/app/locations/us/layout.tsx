import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "MindWhiz United States",
  description:
    "MindWhiz's US headquarters in Houston, Texas — onshore account management, compliance-ready delivery, and 24/7 support for clients across the United States.",
  alternates: { canonical: "/locations/us" },
};

export default function UsLocationLayout({ children }: { children: React.ReactNode }) {
  return children;
}
