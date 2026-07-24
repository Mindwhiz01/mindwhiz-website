import { buildMetadata } from "@/seo.config";
import { JsonLd, serviceJsonLd } from "@/components/JsonLd";

export const metadata = buildMetadata("/services/digital-marketing");

export default function ServiceLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={serviceJsonLd("/services/digital-marketing", "Digital Marketing Services")} />
      {children}
    </>
  );
}
