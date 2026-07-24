"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
  type Variants,
} from "framer-motion";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import { ArrowRight } from "lucide-react";
import { caseStudies } from "@/lib/content";
import Footer from "@/components/Footer";
import { SiteHeader } from "@/components/SiteHeader";
import { useBelowSm } from "@/lib/useBelowSm";
import { BOOKING_URL, GREEN_CTA_CLASS, PageBanner } from "@/components/PageBanner";

const sans = Inter({ subsets: ["latin"], display: "swap" });
const display = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-display",
  display: "swap",
});

const reveal: Variants = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};

function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      variants={reveal}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-60px" }}
      transition={{ delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function CaseCard({
  cs,
  i,
  total,
  progress,
}: {
  cs: (typeof caseStudies)[number];
  i: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const isMobile = useBelowSm();
  const no = String(i + 1).padStart(2, "0");
  const targetScale = 1 - (total - 1 - i) * 0.04;
  const scale = useTransform(progress, [i / total, 1], isMobile ? [1, 1] : [1, targetScale]);
  const top = 110 + i * 26;

  return (
    <div
      className="relative sm:sticky sm:top-[var(--stack-top)]"
      style={{ ["--stack-top" as string]: `${top}px` }}
    >
      <motion.div
        style={{ scale: isMobile ? 1 : scale, transformOrigin: "top center" }}
        className="border-t border-black/10 bg-[#EEEEEE] pt-14 pb-4"
      >
        <div className="grid gap-10 lg:grid-cols-[6rem_1fr_17rem]">
          {/* number */}
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-black/35">No.</p>
            <p className="mt-1 text-5xl font-bold leading-none text-black" style={{ fontFamily: "var(--font-display)" }}>
              {no}
            </p>
            <p className="mt-3 text-xs text-black/35">2025</p>
          </div>

          {/* detail */}
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-black/40">
              {cs.category} · Engagement
            </p>
            <h3 className="mt-3 text-3xl font-semibold tracking-tight text-black sm:text-4xl" style={{ fontFamily: "var(--font-display)" }}>
              {cs.client}
            </h3>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-black/60">{cs.result}</p>
            <div className="mt-6 flex flex-wrap items-center gap-5">
              <a
                href="/contact"
                className="group inline-flex items-center gap-2 rounded-full bg-black px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#ed1164]"
              >
                Get in touch
                <ArrowRight className="h-4 w-4 text-[#9CCC3C] transition-transform duration-300 group-hover:translate-x-1" />
              </a>
              <span className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#7DB022]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#9CCC3C]" />
                Filed · {cs.category} · 2025
              </span>
            </div>
          </div>

          {/* exhibit */}
          <div>
            <div className="relative min-h-[26rem] overflow-hidden rounded-lg border border-black/10">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={cs.img}
                alt={`${cs.client} engagement`}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function CaseRecordSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const total = caseStudies.length;

  return (
    <section className="bg-white">
      <div className="m-[10px] rounded-t-3xl bg-[#EEEEEE] text-black">
        <div ref={ref} className="mx-auto max-w-7xl px-6 pt-24 pb-24 sm:px-8">
          {/* header */}
          <Reveal>
            <div className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#9CCC3C]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#9CCC3C]" />
              On the record
              <span className="h-px w-12 bg-black/15" />
            </div>
            <div className="mt-6 flex flex-col gap-8 border-b border-black/10 pb-12 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-xl">
                <h2 className="text-[clamp(2.6rem,5.5vw,5rem)] font-extrabold uppercase leading-[0.9] tracking-tight text-black" style={{ fontFamily: "var(--font-display)" }}>
                  Staff augmentation case <span style={{ color: "#ed1164" }}>studies</span>
                </h2>
                <p className="mt-5 max-w-md text-sm leading-relaxed text-black/60">
                  Three engagements delivered since 2025. Every entry below is on
                  file, with the thesis exactly as presented.
                </p>
              </div>
              <div className="space-y-1.5 text-left text-[11px] uppercase tracking-[0.18em] text-black/40 lg:text-right">
                <p>Record of client engagements</p>
                <p>00{caseStudies.length} entries</p>
                <p>2025 to 2026</p>
              </div>
            </div>
          </Reveal>

          {/* pinned stack of entries (plain flow below sm) */}
          <div className="mt-10 flex flex-col gap-10 sm:gap-[calc(var(--vh)*14)]">
            {caseStudies.map((cs, i) => (
              <CaseCard key={cs.client} cs={cs} i={i} total={total} progress={scrollYProgress} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default function CaseStudiesPage() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  useEffect(() => {
    const saved = localStorage.getItem("mw-theme");
    if (saved === "dark" || saved === "light") setTheme(saved);
  }, []);
  useEffect(() => {
    localStorage.setItem("mw-theme", theme);
  }, [theme]);

  return (
    <main className={`${sans.className} ${display.variable} bg-white text-black`}>
      <SiteHeader theme={theme} />

      <div className={theme === "dark" ? "theme-dark" : undefined}>
        <PageBanner
          image="/banners/case-studies.png"
          titleLines={["On", "The"]}
          rotateWords={["Record", "Results", "Proof", "Wins"]}
          highlightClassName="text-[#9CCC3C]"
          subtitle="Every engagement below is filed exactly as delivered, the client, the brief, and the outcome, on record."
          primary={{ label: "Build your team", href: "/contact" }}
          secondary={{ label: "Book free consultation", href: BOOKING_URL, external: true, className: GREEN_CTA_CLASS }}
        />

        <CaseRecordSection />

        <Footer />
      </div>
    </main>
  );
}
