import type { Metadata } from "next";
import LocationPage from "@/components/LocationPage";
import { getLocation, locationMetadata, locationJsonLd } from "@/lib/locations";

const location = getLocation("pk")!;

export const metadata: Metadata = locationMetadata(location);

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
