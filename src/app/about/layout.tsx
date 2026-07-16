import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Meet the leadership behind MindWhiz - CEO Muhammad Ali and COO Muhammad Aftab Zafar - and the three beliefs that guide how we build scalable hybrid teams.",
  alternates: { canonical: "/about" },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
