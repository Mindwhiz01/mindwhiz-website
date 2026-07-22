"use client";

import { ArrowRight } from "lucide-react";

// Scooped corner CTA: the card's bottom-right corner is carved out into a
// smooth notch — concave quarter-circles ease the pocket into the card's
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
  corner = "bottom-right",
}: {
  bg?: string;
  accent?: string;
  size?: number;
  gap?: number;
  radius?: number;
  /** which card corner the notch is carved out of */
  corner?: "bottom-right" | "top-left";
}) {
  const topLeft = corner === "top-left";
  const pocket = size + gap * 2; // notch width/height along the card edges
  const w = pocket + radius; // svg box includes the concave eases
  const r = radius;
  // overshoot the card's right/bottom edges — the card clips the excess, so
  // the fill fully covers the clip boundary and no image pixel can fringe out
  const bleed = 2;

  const box = w + bleed;
  // the top-left notch is the same silhouette turned a half turn. Rotating the
  // points (rather than the element via CSS) keeps the path axis-aligned — a
  // transformed svg gets re-rasterised and leaves a soft hairline on the curve.
  const p = (x: number, y: number) => (topLeft ? `${box - x} ${box - y}` : `${x} ${y}`);
  // a half turn preserves orientation, so the arc sweep flags are unchanged
  const arc = (x: number, y: number, sweep: 0 | 1) => `A ${r} ${r} 0 0 ${sweep} ${p(x, y)}`;

  // trace: card right edge → concave ease in → pocket top edge → convex
  // inner corner → pocket left edge → concave ease out → card bottom edge
  const d = [
    `M ${p(box, 0)}`,
    `L ${p(w, 0)}`,
    arc(pocket, r, 1),
    `L ${p(r * 2, r)}`,
    arc(r, r * 2, 0),
    `L ${p(r, pocket)}`,
    arc(0, w, 1),
    `L ${p(0, box)}`,
    `L ${p(box, box)}`,
    "Z",
  ].join(" ");

  return (
    // the svg is anchored to the corner opposite the notch so its bleed
    // overflows the card edges and the card clips the excess
    <div
      className={`absolute z-20 ${topLeft ? "left-0 top-0" : "bottom-0 right-0"}`}
      style={{ width: w, height: w }}
    >
      <svg
        aria-hidden
        width={box}
        height={box}
        viewBox={`0 0 ${box} ${box}`}
        shapeRendering="geometricPrecision"
        className={`absolute block max-w-none ${topLeft ? "bottom-0 right-0" : "left-0 top-0"}`}
      >
        {/* stroked in the fill colour so the anti-aliased edge is opaque —
            otherwise the card shows through as a hairline along the curve */}
        <path d={d} fill={bg} stroke={bg} strokeWidth={1} />
      </svg>
      <span
        className="absolute grid place-items-center overflow-hidden rounded-full text-black transition-transform duration-300 group-hover:-translate-y-0.5"
        style={{
          ...(topLeft ? { left: gap, top: gap } : { right: gap, bottom: gap }),
          width: size,
          height: size,
          backgroundColor: accent,
        }}
      >
        <ArrowRight className="h-5 w-5 transition-transform duration-300 ease-out group-hover:translate-x-1.5" />
      </span>
    </div>
  );
}
