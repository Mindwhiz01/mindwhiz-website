"use client";

// ---------------------------------------------------------------------------
// Cta - the shared call-to-action button used site-wide. Matches the header's
// "Get in Touch" pill: dark rounded pill, green up-right arrow, white text.
// On hover the arrow flies out the top-right and a fresh one slides in from the
// bottom-left.
// ---------------------------------------------------------------------------

import { ArrowUpRight } from "lucide-react";

export default function Cta({
  href,
  label,
  className = "",
  onClick,
  variant = "solid",
}: {
  href: string;
  label: React.ReactNode;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  variant?: "solid" | "outline";
}) {
  const look =
    variant === "outline"
      ? "border border-white/30 bg-white/5 text-white backdrop-blur hover:bg-white/10"
      : "border border-white/20 bg-neutral-950 text-white hover:bg-neutral-800";
  return (
    <a
      href={href}
      onClick={onClick}
      className={`group inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold transition-colors duration-300 ${look} ${className}`}
    >
      <span className="relative h-4 w-4 overflow-hidden">
        <ArrowUpRight className="absolute inset-0 h-4 w-4 text-[#9CCC3C] transition-transform duration-300 ease-out group-hover:translate-x-5 group-hover:-translate-y-5" />
        <ArrowUpRight className="absolute inset-0 h-4 w-4 -translate-x-5 translate-y-5 text-[#9CCC3C] transition-transform duration-300 ease-out group-hover:translate-x-0 group-hover:translate-y-0" />
      </span>
      {label}
    </a>
  );
}
