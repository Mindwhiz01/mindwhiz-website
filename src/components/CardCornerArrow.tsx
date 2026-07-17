"use client";

import { ArrowRight } from "lucide-react";

// Scooped corner CTA: the card's bottom-right corner is carved out into a
// smooth notch — concave quarter-circles ease the pocket into the card's
// right and bottom edges (an S-curve, not a hard step), so the cutout reads
// as part of the card silhouette. A circular arrow button sits in the notch.
// On hover of the parent card (.group) the arrow slides.
//
// The concave eases are SVG paths (square minus a quarter-disc) rather than
// radial-gradients: gradients with a hard `transparent` stop leave a faint
// dark anti-aliased fringe along the curve, which read as a stray curved
// border over the card image.
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
  // quarter-disc at the top-left is cut away (card shows through); the rest
  // of the square is bg, melting the pocket into the card edge
  const inversePath = `M ${radius} 0 V ${radius} H 0 A ${radius} ${radius} 0 0 0 ${radius} 0 Z`;

  const inverseCorner = (style: React.CSSProperties) => (
    <svg
      aria-hidden
      width={radius}
      height={radius}
      viewBox={`0 0 ${radius} ${radius}`}
      className="absolute block"
      style={style}
    >
      <path d={inversePath} fill={bg} />
    </svg>
  );

  return (
    <div
      className="absolute bottom-0 right-0 z-20"
      style={{ padding: gap, backgroundColor: bg, borderTopLeftRadius: radius }}
    >
      {/* concave ease into the card's right edge */}
      {inverseCorner({ top: -radius, right: 0 })}
      {/* concave ease into the card's bottom edge */}
      {inverseCorner({ bottom: 0, left: -radius })}
      <span
        className="grid place-items-center overflow-hidden rounded-full text-black transition-transform duration-300 group-hover:-translate-y-0.5"
        style={{ width: size, height: size, backgroundColor: accent }}
      >
        <ArrowRight className="h-5 w-5 transition-transform duration-300 ease-out group-hover:translate-x-1.5" />
      </span>
    </div>
  );
}
