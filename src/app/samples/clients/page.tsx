import type { Metadata } from "next";
import ClientsSampleShowcaseClient from "./ClientsSampleShowcaseClient";

export const metadata: Metadata = {
  title: "Internal Design Samples",
  robots: { index: false, follow: false },
};

export default function ClientsSamplePage() {
  return <ClientsSampleShowcaseClient />;
}
