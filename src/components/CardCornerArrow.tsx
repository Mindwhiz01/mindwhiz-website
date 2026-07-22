"use client";

import { ArrowRight } from "lucide-react";

// Scooped corner CTA: the card's bottom-right corner is carved out into a
// smooth notch, concave quarter-circles ease the pocket into the card's
// right and bottom edges (an S-curve, not a hard step), so the cutout reads
// as part of the card silhouette. A circular arrow button sits in the notch.
// On hover of the parent card (.group) the arrow slides.
//
// The whole notch is ONE svg path (eases + pocket + rounded inner corner):
// building it from separate divs/gradients left sub-pixel seams and
// anti-aliasing fringes that read as stray curved borders over the image.
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
  const pocket = size + gap * 2; // notch width/height along the card edges
  const w = pocket + radius; // svg box includes the concave eases
  const r = radius;
  // overshoot the card's right/bottom edges, the card clips the excess, so
  // the fill fully covers the clip boundary and no image pixel can fringe out
  const bleed = 2;

  // trace: card right edge → concave ease in → pocket top edge → convex
  // inner corner → pocket left edge → concave ease out → card bottom edge
  const d = [
    `M ${w + bleed} 0`,
    `L ${w} 0`,
    `A ${r} ${r} 0 0 1 ${pocket} ${r}`,
    `L ${r * 2} ${r}`,
    `A ${r} ${r} 0 0 0 ${r} ${r * 2}`,
    `L ${r} ${pocket}`,
    `A ${r} ${r} 0 0 1 0 ${w}`,
    `L 0 ${w + bleed}`,
    `L ${w + bleed} ${w + bleed}`,
    "Z",
  ].join(" ");

  return (
    <div className="absolute bottom-0 right-0 z-20" style={{ width: w, height: w }}>
      <svg
        aria-hidden
        width={w + bleed}
        height={w + bleed}
        viewBox={`0 0 ${w + bleed} ${w + bleed}`}
        shapeRendering="geometricPrecision"
        className="absolute left-0 top-0 block max-w-none"
      >
        <path d={d} fill={bg} />
      </svg>
      <span
        className="absolute grid place-items-center overflow-hidden rounded-full text-black transition-transform duration-300 group-hover:-translate-y-0.5"
        style={{ right: gap, bottom: gap, width: size, height: size, backgroundColor: accent }}
      >
        <ArrowRight className="h-5 w-5 transition-transform duration-300 ease-out group-hover:translate-x-1.5" />
      </span>
    </div>
  );
}
