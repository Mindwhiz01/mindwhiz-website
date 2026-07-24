import { buildMetadata } from "@/seo.config";
import { JsonLd, serviceJsonLd } from "@/components/JsonLd";

export const metadata = buildMetadata("/services/finance-accounting");

export default function FinanceLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={serviceJsonLd("/services/finance-accounting", "Finance & Accounting Outsourcing")} />
      {children}
    </>
  );
}
