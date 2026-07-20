"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { ArrowUpRight, ChevronDown } from "lucide-react";
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

function AnimatedBackground({ activeIndex, total }: { activeIndex: number; total: number }) {
  const progress = activeIndex / (total - 1);

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Main gradient background */}
      <motion.div
        animate={{
          background: [
            "linear-gradient(135deg, #ed1164 0%, #9CCC3C 100%)",
            "linear-gradient(135deg, #9CCC3C 0%, #ed1164 100%)",
            "linear-gradient(135deg, #ed1164 0%, #9CCC3C 100%)",
          ],
        }}
        transition={{ duration: 8, repeat: Infinity }}
        className="absolute inset-0 opacity-10"
      />

      {/* Animated circles */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 6, repeat: Infinity }}
        className="absolute -top-32 -right-32 h-96 w-96 rounded-full bg-[#ed1164] blur-[100px]"
      />

      <motion.div
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 7, repeat: Infinity, delay: 1 }}
        className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-[#9CCC3C] blur-[100px]"
      />

      {/* Progress-based gradient shift */}
      <motion.div
        animate={{ x: `${progress * 100}%` }}
        transition={{ type: "spring", stiffness: 50, damping: 20 }}
        className="absolute top-0 h-1 w-1/3 bg-gradient-to-r from-transparent via-white to-transparent opacity-30"
      />
    </div>
  );
}

function ProcessPanel({
  step,
  i,
  active,
  images,
  ctaLabel,
  ctaHref,
  total,
}: {
  step: Step;
  i: number;
  active: number;
  images: string[];
  ctaLabel: string;
  ctaHref: string;
  total: number;
}) {
  const isActive = i === active;
  const isNext = i === active + 1;
  const isPrev = i === active - 1;

  return (
    <motion.div
      initial={false}
      animate={{ opacity: isActive ? 1 : 0, pointerEvents: isActive ? "auto" : "none" }}
      transition={{ duration: SLIDE_MS / 1000, ease: EASE }}
      style={{ zIndex: isActive ? 10 : 0 }}
      className="absolute inset-0"
    >
      {/* Background Image with better overlay */}
      <motion.img
        src={images[i % images.length]}
        alt={step.title}
        initial={false}
        animate={{ scale: isActive ? 1 : 1.1 }}
        transition={{ duration: 1.2, ease: EASE }}
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* Enhanced gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent" />

      {/* Animated accent line */}
      <motion.div
        initial={false}
        animate={isActive ? { opacity: 1, width: "100px" } : { opacity: 0, width: "0px" }}
        transition={{ duration: 0.6, ease: EASE }}
        className="absolute left-6 top-24 h-1 bg-gradient-to-r from-[#ed1164] to-[#9CCC3C] sm:left-8"
      />

      {/* Step number with better styling */}
      <motion.div
        initial={false}
        animate={isActive ? { y: 0, opacity: 1 } : { y: 40, opacity: 0 }}
        transition={{ duration: SLIDE_MS / 1000, ease: EASE, delay: isActive ? 0.08 : 0 }}
        className="absolute left-6 top-32 sm:left-8"
      >
        <p className="text-xl font-extrabold text-[#9CCC3C] sm:text-2xl">
          Step {i + 1} of {total}
        </p>
      </motion.div>

      {/* Main content - left side */}
      <motion.div
        initial={false}
        animate={isActive ? { y: 0, opacity: 1 } : { y: 60, opacity: 0 }}
        transition={{
          duration: SLIDE_MS / 1000,
          ease: EASE,
          delay: isActive ? 0.12 : 0,
        }}
        className="absolute inset-x-0 top-1/2 mx-auto flex max-w-6xl -translate-y-1/2 flex-col gap-6 px-6 sm:px-8"
      >
        <div className="max-w-2xl">
          <h3
            className="text-[clamp(2.5rem,6vw,5rem)] font-extrabold uppercase leading-[0.9] tracking-tight text-white"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {step.title}
          </h3>
          <p className="mt-6 max-w-lg text-lg leading-relaxed text-white/80">
            {step.desc}
          </p>
        </div>

        {/* CTA Button */}
        <motion.a
          href={ctaHref}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          className="group mt-4 inline-flex w-fit items-center gap-3 rounded-full bg-gradient-to-r from-[#ed1164] to-[#9CCC3C] px-8 py-4 text-sm font-semibold text-white shadow-lg transition-all hover:shadow-xl hover:shadow-[#ed1164]/50"
        >
          <span>{ctaLabel}</span>
          <motion.div
            animate={{ x: [0, 5, 0], y: [0, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <ArrowUpRight className="h-5 w-5" />
          </motion.div>
        </motion.a>
      </motion.div>

      {/* Right side - decorative card */}
      <motion.div
        initial={false}
        animate={isActive ? { x: 0, opacity: 1 } : { x: 100, opacity: 0 }}
        transition={{
          duration: SLIDE_MS / 1000,
          ease: EASE,
          delay: isActive ? 0.18 : 0,
        }}
        className="absolute bottom-12 right-6 hidden max-w-xs rounded-3xl border border-white/20 bg-white/10 p-8 backdrop-blur-md sm:right-8 lg:block"
      >
        <p className="text-sm font-semibold uppercase tracking-wider text-[#9CCC3C]">
          Process Step
        </p>
        <h4 className="mt-4 text-2xl font-bold text-white">{step.title}</h4>
        <p className="mt-4 text-sm leading-relaxed text-white/70">{step.desc}</p>
      </motion.div>

      {/* Bottom progress indicator */}
      <motion.div
        initial={false}
        animate={{ opacity: isActive ? 1 : 0.3 }}
        className="absolute bottom-0 left-0 right-0 h-1 bg-white/10"
      >
        <motion.div
          animate={{ scaleX: isActive ? 1 : 0 }}
          transition={{ duration: SLIDE_MS / 1000, ease: EASE }}
          style={{ transformOrigin: "left" }}
          className="h-full w-full bg-gradient-to-r from-[#ed1164] via-[#9CCC3C] to-[#ed1164]"
        />
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
  const [active, setActive] = useState(0);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const idx = Math.min(total - 1, Math.max(0, Math.round(v * (total - 1))));
    setActive(idx);
  });

  useSlideSnap(ref, total);

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white via-slate-50 to-white">
      {/* Header Section with improved design */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 opacity-40">
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.5, 0.8, 0.5],
            }}
            transition={{ duration: 8, repeat: Infinity }}
            className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-[#ed1164] blur-[80px]"
          />
          <motion.div
            animate={{
              scale: [1.1, 1, 1.1],
              opacity: [0.5, 0.8, 0.5],
            }}
            transition={{ duration: 8, repeat: Infinity, delay: 1 }}
            className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-[#9CCC3C] blur-[80px]"
          />
        </div>

        <div className="relative mx-auto flex max-w-6xl flex-col gap-12 px-6 py-24 sm:px-8">
          <div>
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-xs font-semibold uppercase tracking-[0.22em] text-[#ed1164]"
            >
              {kicker}
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mt-4 max-w-2xl text-[clamp(2.2rem,4vw,4rem)] font-extrabold uppercase leading-[0.95] tracking-tight text-black"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {title}
            </motion.h2>
          </div>

          {/* Steps preview cards */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`group rounded-2xl border-2 p-6 transition-all ${
                  i === active
                    ? "border-[#ed1164] bg-gradient-to-br from-[#ed1164]/10 to-[#9CCC3C]/10"
                    : "border-slate-200 bg-white hover:border-[#ed1164]/50 hover:bg-slate-50"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className={`text-2xl font-bold font-display ${i === active ? "text-[#ed1164]" : "text-slate-300"}`}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h4 className="text-sm font-bold uppercase text-slate-700 group-hover:text-[#ed1164]">
                    {step.title}
                  </h4>
                </div>
                <p className="mt-3 text-xs leading-relaxed text-slate-500 line-clamp-2">
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Scroll indicator */}
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="mt-8 flex justify-center"
          >
            <div className="rounded-full border border-slate-300 p-3">
              <ChevronDown className="h-5 w-5 text-slate-400" />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll section */}
      <div
        ref={ref}
        data-header-dark
        className="relative bg-black"
        style={{ height: `${total * 100}vh` }}
      >
        <div className="sticky top-0 h-screen overflow-hidden">
          {/* Background animation */}
          <AnimatedBackground activeIndex={active} total={total} />

          {/* Panels */}
          {steps.map((step, i) => (
            <ProcessPanel
              key={step.title}
              step={step}
              i={i}
              active={active}
              images={images}
              ctaLabel={ctaLabel}
              ctaHref={ctaHref}
              total={total}
            />
          ))}

          {/* Top indicator bar */}
          <div className="absolute inset-x-0 top-0 z-20 h-1 bg-white/10">
            <motion.div
              initial={false}
              animate={{ scaleX: (active + 1) / total, originX: 0 }}
              transition={{ duration: SLIDE_MS / 1000, ease: EASE }}
              className="h-full w-full bg-gradient-to-r from-[#ed1164] via-[#9CCC3C] to-[#ed1164]"
            />
          </div>

          {/* Step counter */}
          <motion.div className="absolute left-6 bottom-6 z-20 text-white sm:left-8">
            <p className="text-sm font-semibold text-white/60">
              Step {active + 1} of {total}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
