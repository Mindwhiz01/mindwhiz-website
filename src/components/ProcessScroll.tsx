"use client";

// ---------------------------------------------------------------------------
// Process: a pinned, full-screen scroll experience. Each step fills the
// viewport with a big image; as you scroll, panels crossfade and the text
// rises into view — one step at a time. Shared across service-style pages.
// ---------------------------------------------------------------------------

import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import Cta from "@/components/Cta";

const defaultImages = [
  "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=2000&q=80",
  "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=2000&q=80",
  "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=2000&q=80",
  "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=2000&q=80",
  "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=2000&q=80",
  "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=2000&q=80",
];

type Step = { title: string; desc: string };

function ProcessPanel({
  step,
  i,
  total,
  progress,
  images,
}: {
  step: Step;
  i: number;
  total: number;
  progress: MotionValue<number>;
  images: string[];
}) {
  const seg = 1 / total;
  const start = i * seg;
  const end = (i + 1) * seg;
  const fade = seg * 0.35;

  const inStart = i === 0 ? 0 : start - fade;
  const inEnd = start + fade;
  const outStart = end - fade;
  const outEnd = i === total - 1 ? 1 : end + fade;

  const opacity = useTransform(progress, [inStart, inEnd, outStart, outEnd], [0, 1, 1, 0]);
  const imgScale = useTransform(progress, [inStart, outEnd], [1.2, 1]);
  const textY = useTransform(progress, [inStart, inEnd], [70, 0]);
  const numY = useTransform(progress, [inStart, inEnd], [30, 0]);

  return (
    <motion.div style={{ opacity }} className="absolute inset-0">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <motion.img
        src={images[i % images.length]}
        alt={step.title}
        style={{ scale: imgScale }}
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/30" />
      <div className="absolute inset-0 bg-black/25" />

      {/* giant ghost index number, top-right */}
      <motion.span
        style={{ y: numY, fontFamily: "var(--font-display)" }}
        className="pointer-events-none absolute right-4 top-24 select-none text-[26vw] font-extrabold leading-none text-white/[0.07] sm:right-10 sm:text-[18vw]"
      >
        {String(i + 1).padStart(2, "0")}
      </motion.span>

      {/* heading, top-left */}
      <motion.div
        style={{ y: textY }}
        className="absolute inset-x-0 top-0 mx-auto max-w-6xl px-6 pt-28 sm:px-8"
      >
        <h3
          className="max-w-2xl text-[clamp(2.2rem,5.5vw,4.5rem)] font-extrabold uppercase leading-[0.95] tracking-tight text-white"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {step.title}
        </h3>
      </motion.div>

      {/* description, bottom-right */}
      <motion.div
        style={{ y: textY }}
        className="absolute inset-x-0 bottom-0 mx-auto flex max-w-6xl justify-end px-6 pb-28 sm:px-8"
      >
        <div className="flex max-w-lg items-start gap-6">
          <span className="mt-2 h-px w-16 shrink-0 bg-white/40" />
          <p className="text-lg leading-relaxed text-white/85 sm:text-xl">{step.desc}</p>
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
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  const total = steps.length;
  const barScale = useTransform(scrollYProgress, [0, 1], [1 / total, 1]);

  return (
    <section data-header-dark className="relative bg-black">
      {/* heading sits above the images, not overlaid on them */}
      <div className="mx-auto flex max-w-6xl flex-col px-6 pb-16 pt-24 sm:px-8">
        <span className="text-xs font-semibold uppercase tracking-[0.22em] text-white/60">
          {kicker}
        </span>
        <h2
          className="mt-4 max-w-lg text-[clamp(2rem,4vw,3.5rem)] font-extrabold uppercase leading-[0.95] tracking-tight text-white"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {title}
        </h2>
        <Cta href={ctaHref} label={ctaLabel} className="mt-6 w-fit" />
      </div>

      <div ref={ref} className="relative" style={{ height: `${total * 100}vh` }}>
        <div className="sticky top-0 h-screen overflow-hidden">
          {steps.map((step, i) => (
            <ProcessPanel
              key={step.title}
              step={step}
              i={i}
              total={total}
              progress={scrollYProgress}
              images={images}
            />
          ))}

          {/* bottom progress bar */}
          <div className="absolute inset-x-0 bottom-0 z-10 h-1 bg-white/15">
            <motion.div
              style={{ scaleX: barScale, transformOrigin: "left" }}
              className="h-full w-full bg-[#ed1164]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
