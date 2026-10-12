"use client";

import { AnimatePresence, motion, type Variants } from "framer-motion";
import { useEffect, useState, type ReactNode } from "react";
import Cta from "@/components/Cta";

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
};
const item: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

// Shared booking link + pink "Book free consultation" button styling, so every
// hero across the site can reuse the exact same call-to-action.
export const BOOKING_URL =
  "https://api.leadconnectorhq.com/widget/booking/I1hzuNe9sXdClDrIUCe3";
export const PINK_CTA_CLASS =
  "!border-[#ed1164] !bg-[#ed1164] !text-white shadow-xl shadow-[#ed1164]/50 hover:!bg-[#c50e53]";
// Green counterpart, for heroes whose highlight word is green. Uses dark text
// and dark arrows since white on lime green reads poorly.
export const GREEN_CTA_CLASS =
  "!border-[#9CCC3C] !bg-[#9CCC3C] !text-black shadow-xl shadow-[#9CCC3C]/50 hover:!bg-[#7DB022] [&_svg]:!text-black";

// Highlight word that cycles through a list, each one sliding in from the
// right (right-to-left). `initial={false}` lets the parent heading reveal
// handle the first paint, then it loops through the words.
export function SlidingHighlight({
  words,
  className = "",
}: {
  words: string[];
  className?: string;
}) {
  const [i, setI] = useState(0);
  useEffect(() => {
    if (words.length < 2) return;
    const id = setInterval(() => setI((p) => (p + 1) % words.length), 2600);
    return () => clearInterval(id);
  }, [words.length]);
  return (
    <span className="block">
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={words[i]}
          initial={{ x: "0.7em", opacity: 0 }}
          animate={{ x: "0em", opacity: 1 }}
          exit={{ x: "-0.7em", opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className={`inline-block whitespace-nowrap ${className}`}
        >
          {words[i]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

// Images that have a generated 828px "-828.webp" phone variant next to them.
const MOBILE_VARIANT = /^\/(banners|images\/stock)\/.+\.webp$/;

type CtaLink = { label: string; href: string; external?: boolean; className?: string };

/**
 * Shared page hero - same banner design as the home page: a rounded, inset
 * media panel with a dark gradient wash, a large display heading, and CTAs.
 * Uses a service-relevant background image (no eyebrow pill).
 *
 * SEO: pass `h1` with the page's keyword statement (e.g. "Managed SOC and
 * MDR Services for US Companies"). It renders as the page's single <h1> in a
 * small pill above the display slogan, and the slogan drops to a styled <p>,
 * so the heading search engines read is the keyword, not "DEFEAT CYBER
 * THREATS". Without `h1` the slogan stays the <h1> (legacy behavior).
 *
 * Two ways to supply the heading:
 *  - `title`: a ready-made React node (legacy / fully custom heading).
 *  - `titleLines` + `rotateWords`: the "Build Great Teams" treatment - each
 *    lead word stacked on its own line, then a pink last word that slides in
 *    from the right and rotates through `rotateWords`.
 */
export function PageBanner({
  h1,
  imageAlt,
  title,
  titleLines,
  rotateWords,
  subtitle,
  image,
  primary,
  secondary,
  accent = "#9CCC3C",
  headingClassName = "",
  highlightClassName = "text-[#ed1164]",
}: {
  h1?: string;
  imageAlt?: string;
  title?: ReactNode;
  titleLines?: string[];
  rotateWords?: string[];
  subtitle?: ReactNode;
  image: string;
  primary?: CtaLink;
  secondary?: CtaLink;
  accent?: string;
  headingClassName?: string;
  // color (and any extra styling) for the sliding highlight word. Defaults to
  // brand pink; pass "text-[#9CCC3C]" to keep a page's original green accent.
  highlightClassName?: string;
}) {
  const useStacked = Boolean(titleLines && rotateWords);
  const Slogan = h1 ? motion.p : motion.h1;
  return (
    <section data-header-dark className="relative min-h-screen overflow-hidden bg-white p-[10px] text-white">
      <div className="absolute inset-[10px] overflow-hidden rounded-3xl bg-[#383838]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        {/* LCP image. Every banner and stock photo ships with an
            828px "-828" variant, so phones download ~60 KB instead of the
            desktop file. */}
        <img
          src={image}
          srcSet={MOBILE_VARIANT.test(image) ? `${image.replace(/\.webp$/, "-828.webp")} 828w, ${image} 1920w` : undefined}
          sizes="100vw"
          alt={imageAlt ?? (h1 ? `${h1} - MindWhiz` : "")}
          fetchPriority="high"
          className="h-full w-full object-cover"
        />
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
          {h1 && (
            <motion.h1
              variants={item}
              className="mb-6 inline-flex max-w-2xl items-center rounded-full border border-white/15 bg-white/10 px-4 py-1.5 text-xs font-semibold tracking-wide text-white/85 backdrop-blur sm:text-sm"
            >
              {h1}
            </motion.h1>
          )}
          <Slogan
            variants={item}
            className={`max-w-[48rem] text-[clamp(3.6rem,11vw,11rem)] font-extrabold uppercase leading-[0.88] tracking-[-0.055em] text-white ${headingClassName}`}
            style={{ fontFamily: "var(--font-display)" }}
          >
            {useStacked ? (
              <>
                {/* trailing spaces keep words separate in the text content
                    (crawlers otherwise read "MindWhizUnited States") */}
                {titleLines!.map((word) => (
                  <span key={word} className="block whitespace-nowrap">
                    {word}{" "}
                  </span>
                ))}
                <SlidingHighlight words={rotateWords!} className={highlightClassName} />
              </>
            ) : (
              title
            )}
          </Slogan>

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
              {primary && (
                <Cta
                  href={primary.href}
                  label={primary.label}
                  {...(primary.external ? { target: "_blank", rel: "noreferrer" } : {})}
                />
              )}
              {secondary && (
                <Cta
                  href={secondary.href}
                  label={secondary.label}
                  variant="outline"
                  className={secondary.className}
                  {...(secondary.external ? { target: "_blank", rel: "noreferrer" } : {})}
                />
              )}
            </motion.div>
          )}
        </div>
      </motion.div>
    </section>
  );
}
