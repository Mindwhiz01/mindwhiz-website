import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Client Samples",
  description: "A selection of client work and samples delivered by MindWhiz teams.",
  alternates: { canonical: "/samples/clients" },
  robots: { index: false },
};

export default function ClientSamplesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
