import { buildMetadata } from "@/seo.config";
import { JsonLd, serviceJsonLd } from "@/components/JsonLd";

export const metadata = buildMetadata("/hr");

export default function HrLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={serviceJsonLd("/hr", "HR Outsourcing Services")} />
      {children}
    </>
  );
}
