import type { Metadata } from "next";
import NewsletterPageClient from "./NewsletterPageClient";

const title = "Newsletter";
const description =
  "The MindWhiz Dispatch - a monthly newsletter on hybrid staffing, IT operations, and running lean teams, straight to your inbox.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/newsletter" },
  openGraph: { title: `${title} | MindWhiz`, description },
};

export default function NewsletterPage() {
  return <NewsletterPageClient />;
}
