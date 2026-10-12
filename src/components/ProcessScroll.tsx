"use client";

// ---------------------------------------------------------------------------
// Process: a pinned, full-screen scroll experience. The section behaves like
// a slide deck: each scroll gesture advances exactly one step, and panels
// animate in/out with a time-based transition - so text is never caught
// half-faded between two slides. Shared across service-style pages.
// ---------------------------------------------------------------------------

import { useRef } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { SLIDE_MS, useSlideSnap } from "@/lib/useSlideSnap";
import { usePinnedActive } from "@/lib/usePinnedActive";

const defaultImages = [
  "/images/stock/operations-review.webp",
  "/images/stock/team-setup.webp",
  "/images/stock/integration.webp",
  "/images/stock/scale-sustain.webp",
  "/images/stock/rapid-scaling.webp",
  "/images/stock/delivery-process-team-planning.webp",
];

const EASE = [0.22, 1, 0.36, 1] as const;

type Step = { title: string; desc: string };

function ProcessPanel({
  step,
  i,
  active,
  images,
  ctaLabel,
  ctaHref,
}: {
  step: Step;
  i: number;
  active: number;
  images: string[];
  ctaLabel: string;
  ctaHref: string;
}) {
  const isActive = i === active;

  return (
    <motion.div
      initial={false}
      animate={{ opacity: isActive ? 1 : 0 }}
      transition={{ duration: SLIDE_MS / 1000, ease: EASE }}
      style={{ zIndex: isActive ? 2 : 1 }}
      className="pointer-events-none absolute inset-0"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <motion.img
        src={images[i % images.length]}
        alt={`${step.title} - MindWhiz`}
        initial={false}
        animate={{ scale: isActive ? 1 : 1.15 }}
        transition={{ duration: 1.1, ease: EASE }}
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/30" />
      <div className="absolute inset-0 bg-black/25" />

      {/* giant ghost index number, top-right */}
      <motion.span
        initial={false}
        animate={{ y: isActive ? 0 : 30, opacity: isActive ? 1 : 0 }}
        transition={{ duration: SLIDE_MS / 1000, ease: EASE }}
        style={{ fontFamily: "var(--font-display)" }}
        className="pointer-events-none absolute right-4 top-24 select-none text-[26vw] font-extrabold leading-none text-white/[0.07] sm:right-10 sm:text-[18vw]"
      >
        {String(i + 1).padStart(2, "0")}
      </motion.span>

      {/* heading, top-left */}
      <motion.div
        initial={false}
        animate={isActive ? { y: 0, opacity: 1 } : { y: 70, opacity: 0 }}
        transition={{
          duration: SLIDE_MS / 1000,
          ease: EASE,
          delay: isActive ? 0.12 : 0,
        }}
        className="absolute inset-x-0 top-0 mx-auto max-w-6xl px-6 pt-36 sm:px-8 sm:pt-40"
      >
        <h3
          className="max-w-2xl text-[clamp(1.9rem,5.5vw,4.5rem)] font-extrabold uppercase leading-[0.95] tracking-tight text-white"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {step.title}
        </h3>
      </motion.div>

      {/* description, bottom-right */}
      <motion.div
        initial={false}
        animate={isActive ? { y: 0, opacity: 1 } : { y: 70, opacity: 0 }}
        transition={{
          duration: SLIDE_MS / 1000,
          ease: EASE,
          delay: isActive ? 0.12 : 0,
        }}
        className="absolute inset-x-0 bottom-0 mx-auto flex max-w-6xl justify-end px-6 pb-16 sm:px-8 sm:pb-28"
      >
        <div className="flex max-w-lg items-start gap-4 sm:gap-6">
          <span className="mt-2 hidden h-px w-16 shrink-0 bg-white/40 sm:block" />
          <div>
            <p className="text-base leading-relaxed text-white/85 sm:text-xl">{step.desc}</p>
            <a
              href={ctaHref}
              className="pointer-events-auto mt-6 inline-flex items-center gap-2 rounded-full bg-[#ed1164] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#c50e53]"
            >
              {ctaLabel}
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function ProcessScroll({
  steps,
  ctaLabel = "Get in touch",
  ctaHref = "/contact",
  images = defaultImages,
}: {
  steps: Step[];
  // `kicker`/`title`/`description` are kept for call-site compatibility only -
  // the intro banner moved to the bottom of each page, so the pinned deck
  // renders on its own. `ctaLabel`/`ctaHref` still drive the per-slide CTA.
  kicker?: string;
  title?: React.ReactNode;
  description?: string;
  ctaLabel?: string;
  ctaHref?: string;
  images?: string[];
}) {
  // the ref must sit on the `total * 100vh` track, useSlideSnap keys its
  // snap math off this element's bounding rect
  const ref = useRef<HTMLDivElement>(null);
  const total = steps.length;

  // Active slide is read from the track geometry (see usePinnedActive) so it
  // stays locked to the snap position on every size, including the zoomed
  // laptop layout where scrollYProgress would leave the last panel skipped.
  const active = usePinnedActive(ref, total);

  // Pinned, one-gesture-per-slide deck on every size - the hook drives both
  // wheel (desktop/laptop) and touch (mobile/tablet), so the animated scroll
  // runs everywhere instead of falling back to a plain stack on phones.
  useSlideSnap(ref, total);

  return (
    <section className="relative bg-white">
      <div
        ref={ref}
        data-header-dark
        className="relative bg-black"
        style={{ height: `calc(var(--svh) * ${total * 100})` }}
      >
        <div className="sticky top-0 h-[calc(var(--svh)*100)] overflow-hidden">
          {steps.map((step, i) => (
            <ProcessPanel
              key={step.title}
              step={step}
              i={i}
              active={active}
              images={images}
              ctaLabel={ctaLabel}
              ctaHref={ctaHref}
            />
          ))}

          {/* bottom progress bar - fills one segment per slide */}
          <div className="absolute inset-x-0 bottom-0 z-10 h-1 bg-white/15">
            <motion.div
              initial={false}
              animate={{ scaleX: (active + 1) / total }}
              transition={{ duration: SLIDE_MS / 1000, ease: EASE }}
              style={{ transformOrigin: "left" }}
              className="h-full w-full bg-[#ed1164]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
