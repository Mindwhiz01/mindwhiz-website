import LocationPage from "@/components/LocationPage";
import { getLocation } from "@/lib/locations";

export default function UsLocationPage() {
  return <LocationPage location={getLocation("us")!} />;
}
