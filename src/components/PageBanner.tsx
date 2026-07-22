"use client";

import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";
import Cta from "@/components/Cta";

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
};
const item: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

type CtaLink = { label: string; href: string };

/**
 * Shared page hero - same banner design as the home page: a rounded, inset
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
  primary?: CtaLink;
  secondary?: CtaLink;
  accent?: string;
  headingClassName?: string;
}) {
  return (
    <section data-header-dark className="relative min-h-screen overflow-hidden bg-white p-[10px] text-white">
      <div className="absolute inset-[10px] overflow-hidden rounded-3xl bg-[#383838]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={image} alt="" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-[#383838]/55" />
        {/* bottom-weighted dark shadow so the heading and copy stay prominent */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-black/15" />
      </div>
      <div
        className="pointer-events-none absolute -bottom-32 -right-32 h-[38rem] w-[38rem] rounded-full blur-[150px]"
        style={{ backgroundColor: `${accent}59` }}
      />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative flex min-h-[calc(var(--vh)*100-20px)] items-center px-5 pb-10 pt-32 text-left sm:px-8"
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
              {primary && <Cta href={primary.href} label={primary.label} />}
              {secondary && <Cta href={secondary.href} label={secondary.label} variant="outline" />}
            </motion.div>
          )}
        </div>
      </motion.div>
    </section>
  );
}
