import { buildMetadata } from "@/seo.config";
import { JsonLd, serviceJsonLd } from "@/components/JsonLd";

export const metadata = buildMetadata("/finance");

export default function FinanceLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={serviceJsonLd("/finance", "Finance & Accounting Outsourcing")} />
      {children}
    </>
  );
}
