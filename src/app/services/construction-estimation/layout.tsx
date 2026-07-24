import { buildMetadata } from "@/seo.config";
import { JsonLd, serviceJsonLd } from "@/components/JsonLd";

export const metadata = buildMetadata("/services/construction-estimation");

export default function ConstructionEstimationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <JsonLd
        data={serviceJsonLd("/services/construction-estimation", "Construction Estimation Services")}
      />
      {children}
    </>
  );
}
