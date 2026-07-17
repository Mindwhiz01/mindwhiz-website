"use client";

import { ArrowRight } from "lucide-react";

// Scooped corner CTA: the card's bottom-right corner is carved out into a
// smooth notch — concave quarter-circles ease the pocket into the card's
// right and bottom edges (an S-curve, not a hard step), so the cutout reads
// as part of the card silhouette. A circular arrow button sits in the notch.
// On hover of the parent card (.group) the arrow slides.
export default function CardCornerArrow({
  bg = "#EEEEEE",
  accent = "#9CCC3C",
  size = 54,
  gap = 12,
  radius = 26,
}: {
  bg?: string;
  accent?: string;
  size?: number;
  gap?: number;
  radius?: number;
}) {
  // inverse corner: transparent quarter-circle, bg fills the rest — placed
  // against the card edge it melts the pocket into the edge with a concave curve
  const inverse = `radial-gradient(circle at 0 0, transparent ${radius}px, ${bg} ${radius}px)`;

  return (
    <div
      className="absolute bottom-0 right-0 z-20"
      style={{ padding: gap, backgroundColor: bg, borderTopLeftRadius: radius }}
    >
      {/* concave ease into the card's right edge */}
      <span
        aria-hidden
        className="absolute right-0"
        style={{ top: -radius, width: radius, height: radius, background: inverse }}
      />
      {/* concave ease into the card's bottom edge */}
      <span
        aria-hidden
        className="absolute bottom-0"
        style={{ left: -radius, width: radius, height: radius, background: inverse }}
      />
      <span
        className="grid place-items-center overflow-hidden rounded-full text-black transition-transform duration-300 group-hover:-translate-y-0.5"
        style={{ width: size, height: size, backgroundColor: accent }}
      >
        <ArrowRight className="h-5 w-5 transition-transform duration-300 ease-out group-hover:translate-x-1.5" />
      </span>
    </div>
  );
}
