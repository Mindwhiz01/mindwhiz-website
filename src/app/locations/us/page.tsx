import LocationPage from "@/components/LocationPage";
import { getLocation, locationJsonLd } from "@/lib/locations";
import { buildMetadata } from "@/seo.config";
import { jsonLdScript } from "@/lib/jsonLd";

const location = getLocation("us")!;

export const metadata = buildMetadata("/locations/us");

export default function UsLocationPage() {
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
