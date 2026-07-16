import LocationPage from "@/components/LocationPage";
import { getLocation } from "@/lib/locations";

export default function PkLocationPage() {
  return <LocationPage location={getLocation("pk")!} />;
}
