"use client";

// ---------------------------------------------------------------------------
// Process: a pinned, full-screen scroll experience. The section behaves like
// a slide deck: each scroll gesture advances exactly one step, and panels
// animate in/out with a time-based transition - so text is never caught
// half-faded between two slides. Shared across service-style pages.
// ---------------------------------------------------------------------------

import { useRef, useState } from "react";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import Cta from "@/components/Cta";
import { SLIDE_MS, useSlideSnap } from "@/lib/useSlideSnap";

const defaultImages = [
  "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=2000&q=80",
  "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=2000&q=80",
  "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=2000&q=80",
  "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=2000&q=80",
  "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=2000&q=80",
  "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=2000&q=80",
];

const EASE = [0.22, 1, 0.36, 1] as const;

type Step = { title: string; desc: string };

function ProcessPanel({
  step,
  i,
  active,
  images,
}: {
  step: Step;
  i: number;
  active: number;
  images: string[];
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
        alt={step.title}
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

      <motion.div
        initial={false}
        animate={isActive ? { y: 0, opacity: 1 } : { y: 70, opacity: 0 }}
        transition={{
          duration: SLIDE_MS / 1000,
          ease: EASE,
          delay: isActive ? 0.12 : 0,
        }}
        className="absolute inset-0 mx-auto flex max-w-6xl flex-col justify-end px-6 pb-28 sm:px-8"
      >
        <h3
          className="max-w-4xl text-[clamp(2.4rem,6vw,5.5rem)] font-extrabold uppercase leading-[0.9] tracking-tight text-white"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {step.title}
        </h3>
        <div className="mt-8 flex items-center gap-6">
          <span className="h-px w-16 shrink-0 bg-white/40" />
          <p className="max-w-lg text-lg leading-relaxed text-white/85 sm:text-xl">{step.desc}</p>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function ProcessScroll({
  steps,
  kicker = "How it works",
  title,
  ctaLabel,
  ctaHref = "/contact",
  images = defaultImages,
}: {
  steps: Step[];
  kicker?: string;
  title: React.ReactNode;
  ctaLabel: string;
  ctaHref?: string;
  images?: string[];
}) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  const total = steps.length;
  const [active, setActive] = useState(0);

  // Snap the visible slide to whole steps no matter how the user scrolls
  // (scrollbar drag, keyboard, touch) - a panel is always fully in or out.
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const idx = Math.min(total - 1, Math.max(0, Math.round(v * (total - 1))));
    setActive(idx);
  });

  // While the section is pinned, one wheel gesture moves exactly one slide.
  useSlideSnap(ref, total);

  return (
    <section
      ref={ref}
      data-header-dark
      className="relative bg-black"
      style={{ height: `${total * 100}vh` }}
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        {steps.map((step, i) => (
          <ProcessPanel
            key={step.title}
            step={step}
            i={i}
            active={active}
            images={images}
          />
        ))}

        {/* fixed heading overlay */}
        <div className="pointer-events-none absolute inset-x-0 top-0 z-10 mx-auto flex max-w-6xl flex-col px-6 pt-28 sm:px-8">
          <span className="text-xs font-semibold uppercase tracking-[0.22em] text-white/60">
            {kicker}
          </span>
          <h2
            className="mt-4 max-w-lg text-[clamp(2rem,4vw,3.5rem)] font-extrabold uppercase leading-[0.95] tracking-tight text-white"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {title}
          </h2>
          <Cta href={ctaHref} label={ctaLabel} className="pointer-events-auto mt-6 w-fit" />
        </div>

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
    </section>
  );
}
