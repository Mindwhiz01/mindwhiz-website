import LocationPage from "@/components/LocationPage";
import { getLocation, locationJsonLd } from "@/lib/locations";
import { buildMetadata } from "@/seo.config";

const location = getLocation("pk")!;

export const metadata = buildMetadata("/locations/pk");

export default function PkLocationPage() {
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
