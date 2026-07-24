import { buildMetadata } from "@/seo.config";
import { JsonLd, serviceJsonLd } from "@/components/JsonLd";

export const metadata = buildMetadata("/services/hr-services");

export default function HrLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={serviceJsonLd("/services/hr-services", "HR Outsourcing Services")} />
      {children}
    </>
  );
}
