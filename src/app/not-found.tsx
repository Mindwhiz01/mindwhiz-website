import { redirect } from "next/navigation";

// Catch-all: any route that doesn't match a real page (e.g. /construction)
// renders this not-found boundary. Instead of showing a 404, send visitors
// back to the home page.
export default function NotFound() {
  redirect("/");
}
