import { buildMetadata } from "@/seo.config";
import { JsonLd, serviceJsonLd } from "@/components/JsonLd";

export const metadata = buildMetadata("/web-services");

export default function WebServicesLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={serviceJsonLd("/web-services", "Web Development Services")} />
      {children}
    </>
  );
}
