import LocationPage from "@/components/LocationPage";
import { getLocation, locationJsonLd } from "@/lib/locations";
import { buildMetadata } from "@/seo.config";

const location = getLocation("us")!;

export const metadata = buildMetadata("/locations/us");

export default function UsLocationPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(locationJsonLd(location)) }}
      />
      <LocationPage location={location} />
    </>
  );
}
