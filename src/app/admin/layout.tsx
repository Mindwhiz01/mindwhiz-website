import type { Metadata } from "next";
import type { ReactNode } from "react";

// Keep the admin area out of search engines entirely.
export const metadata: Metadata = {
  title: "Admin — MindWhiz",
  robots: { index: false, follow: false },
};

export default function AdminRootLayout({ children }: { children: ReactNode }) {
  return <div className="min-h-screen bg-slate-100 text-slate-900">{children}</div>;
}
