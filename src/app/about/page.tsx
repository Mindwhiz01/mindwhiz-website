import type { Metadata } from "next";
import AboutPageClient from "./AboutPageClient";

const title = "About Us";
const description =
  "MindWhiz builds hybrid staffing and BPO teams across IT, security, and business operations from Houston, London, and Lahore - meet the team and the story behind it.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/about" },
  openGraph: { title: `${title} | MindWhiz`, description },
};

export default function AboutPage() {
  return <AboutPageClient />;
}
