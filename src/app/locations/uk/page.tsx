import LocationPage from "@/components/LocationPage";
import { getLocation } from "@/lib/locations";

export default function UkLocationPage() {
  return <LocationPage location={getLocation("uk")!} />;
}
