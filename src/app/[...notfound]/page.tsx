import { redirect } from "next/navigation";

// Rendered at request time so the redirect actually runs.
export const dynamic = "force-dynamic";

// Root catch-all: any URL that doesn't match a more specific route
// (e.g. /construction) lands here. More specific routes always win, so
// real pages like /services/hr-services are unaffected. Send everything
// else back to the home page instead of showing a 404.
export default function CatchAll() {
  redirect("/");
}
