import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Finance & Accounting Services",
  description:
    "Outsourced finance and accounting from MindWhiz - bookkeeping, reporting, and financial operations handled by dedicated hybrid teams.",
  alternates: { canonical: "/finance" },
};

export default function FinanceLayout({ children }: { children: React.ReactNode }) {
  return children;
}
