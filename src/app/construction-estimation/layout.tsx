import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Construction Estimation Services",
  description:
    "Accurate construction estimation and takeoff services from MindWhiz - detailed, on-time estimates that help contractors win more bids.",
  alternates: { canonical: "/construction-estimation" },
};

export default function ConstructionEstimationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
