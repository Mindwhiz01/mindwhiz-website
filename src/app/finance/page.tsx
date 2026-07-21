import type { Metadata } from "next";
import FinancePageClient from "./FinancePageClient";

const title = "Finance & Accounting Services";
const description =
  "Back-office finance and accounting support - bookkeeping, AP/AR, reconciliations, and reporting delivered by a dedicated, embedded MindWhiz team.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/finance" },
  openGraph: { title: `${title} | MindWhiz`, description },
};

export default function FinancePage() {
  return <FinancePageClient />;
}
