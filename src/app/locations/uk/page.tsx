import LocationPage from "@/components/LocationPage";
import { getLocation, locationJsonLd } from "@/lib/locations";
import { buildMetadata } from "@/seo.config";
import { jsonLdScript } from "@/lib/jsonLd";

const location = getLocation("uk")!;

export const metadata = buildMetadata("/locations/uk");

export default function UkLocationPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(locationJsonLd(location)) }}
      />
      <LocationPage location={location} />
    </>
  );
}
