"use client";

import { motion, type Variants } from "framer-motion";
import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
};
const item: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

type Cta = { label: string; href: string };

function ArrowCta({ href, label, accent = "#9CCC3C" }: Cta & { accent?: string }) {
  return (
    <a href={href} className="group inline-flex items-stretch gap-2">
      <span className="flex items-center rounded-2xl bg-[#232D26] px-7 py-4 text-xs font-semibold uppercase tracking-[0.15em] text-white transition-colors group-hover:bg-[#1a221c]">
        {label}
      </span>
      <span
        className="grid w-14 shrink-0 place-items-center rounded-2xl text-black transition-transform group-hover:translate-x-0.5"
        style={{ backgroundColor: accent }}
      >
        <ArrowRight className="h-5 w-5" />
      </span>
    </a>
  );
}

/**
 * Shared page hero — same banner design as the home page: a rounded, inset
 * media panel with a dark gradient wash, a large display heading, and CTAs.
 * Uses a service-relevant background image (no eyebrow pill).
 */
export function PageBanner({
  title,
  subtitle,
  image,
  primary,
  secondary,
  accent = "#9CCC3C",
  headingClassName = "",
}: {
  title: ReactNode;
  subtitle?: ReactNode;
  image: string;
  primary?: Cta;
  secondary?: Cta;
  accent?: string;
  headingClassName?: string;
}) {
  return (
    <section data-header-dark className="relative min-h-screen overflow-hidden bg-white p-[10px] text-white">
      <div className="absolute inset-[10px] overflow-hidden rounded-3xl bg-[#383838]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={image} alt="" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-[#383838]/55" />
      </div>
      <div
        className="pointer-events-none absolute -bottom-32 -right-32 h-[38rem] w-[38rem] rounded-full blur-[150px]"
        style={{ backgroundColor: `${accent}59` }}
      />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative flex min-h-[calc(100vh-20px)] items-end px-5 pb-10 pt-32 text-left sm:px-8"
      >
        <div className="w-full">
          <motion.h1
            variants={item}
            className={`max-w-[48rem] text-[clamp(4.2rem,11vw,12rem)] font-extrabold uppercase leading-[0.88] tracking-[-0.055em] text-white ${headingClassName}`}
            style={{ fontFamily: "var(--font-display)" }}
          >
            {title}
          </motion.h1>

          {subtitle && (
            <motion.p
              variants={item}
              className="mt-8 max-w-xl text-base leading-relaxed text-white/75"
            >
              {subtitle}
            </motion.p>
          )}

          {(primary || secondary) && (
            <motion.div variants={item} className="mt-9 flex flex-wrap items-center gap-4">
              {primary && <ArrowCta href={primary.href} label={primary.label} accent={accent} />}
              {secondary && (
                <a
                  href={secondary.href}
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-white px-7 py-3 text-sm font-extrabold uppercase tracking-[0.08em] text-white transition-colors hover:bg-white hover:text-[var(--hover-color)]"
                  style={{ ["--hover-color" as string]: accent }}
                >
                  {secondary.label}
                </a>
              )}
            </motion.div>
          )}
        </div>
      </motion.div>
    </section>
  );
}
