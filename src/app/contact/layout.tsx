import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with MindWhiz. Build your hybrid team - a specialist will get back to you within one business day. Offices in the US, UK, and Pakistan.",
  alternates: { canonical: "/contact" },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
