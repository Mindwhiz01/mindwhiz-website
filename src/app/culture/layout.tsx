import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Culture",
  description:
    "Life at MindWhiz — our values, employee benefits, team parties and off-sites, and the people who make our US, UK, and Pakistan hubs feel like family.",
  alternates: { canonical: "/culture" },
};

export default function CultureLayout({ children }: { children: React.ReactNode }) {
  return children;
}
