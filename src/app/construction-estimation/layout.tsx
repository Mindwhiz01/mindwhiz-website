import { buildMetadata } from "@/seo.config";
import { JsonLd, serviceJsonLd } from "@/components/JsonLd";

export const metadata = buildMetadata("/construction-estimation");

export default function ConstructionEstimationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <JsonLd
        data={serviceJsonLd("/construction-estimation", "Construction Estimation Services")}
      />
      {children}
    </>
  );
}
