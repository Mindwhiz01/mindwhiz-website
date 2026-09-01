import type { Metadata } from "next";
import ThankYouPageClient from "./ThankYouPageClient";

// noindex on purpose. A thank-you page has no search value, and if it ranked
// (or got crawled) people could land on it without ever submitting a form -
// which would fire the Lead conversion and poison the ad optimisation data.
export const metadata: Metadata = {
  title: { absolute: "Thank You | MindWhiz" },
  description: "Your request has been received. A MindWhiz specialist will be in touch within one business day.",
  robots: { index: false, follow: true },
  alternates: { canonical: "/thank-you" },
};

export default function ThankYouPage() {
  return <ThankYouPageClient />;
}
