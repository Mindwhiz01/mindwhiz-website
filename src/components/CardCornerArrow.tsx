"use client";

import { ArrowRight } from "lucide-react";

// Detached corner arrow (integratedbio-style): the button sits inside a small
// "pocket" of the surrounding background carved out of the card's bottom-right
// corner, so the arrow reads as separate from the card box. On hover of the
// parent card (.group) the arrow slides.
export default function CardCornerArrow({
  bg = "#EEEEEE",
  accent = "#9CCC3C",
  size = 48,
  gap = 10,
  radius = 18,
}: {
  bg?: string;
  accent?: string;
  size?: number;
  gap?: number;
  radius?: number;
}) {
  return (
    <div
      className="absolute bottom-0 right-0 z-20"
      style={{ padding: gap, backgroundColor: bg, borderTopLeftRadius: radius }}
    >
      <span
        className="grid place-items-center overflow-hidden rounded-2xl text-black transition-transform duration-300 group-hover:-translate-y-0.5"
        style={{ width: size, height: size, backgroundColor: accent }}
      >
        <ArrowRight className="h-5 w-5 transition-transform duration-300 ease-out group-hover:translate-x-1.5" />
      </span>
    </div>
  );
}
