import { buildMetadata } from "@/seo.config";
import { JsonLd, serviceJsonLd } from "@/components/JsonLd";

export const metadata = buildMetadata("/service");

export default function ServiceLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={serviceJsonLd("/service", "Digital Marketing Services")} />
      {children}
    </>
  );
}
