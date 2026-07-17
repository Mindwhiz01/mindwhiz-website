import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Build your career at MindWhiz. Explore open IT, cloud, cybersecurity, finance, and HR roles across our US, UK, and Pakistan hubs — and see what life on a global delivery team looks like.",
  alternates: { canonical: "/careers" },
};

export default function CareersLayout({ children }: { children: React.ReactNode }) {
  return children;
}
