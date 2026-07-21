"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
  type Variants,
} from "framer-motion";
import { Inter, Oswald } from "next/font/google";
import { ArrowRight, ArrowUpRight, CheckCircle2, Mail } from "lucide-react";
import CardCornerArrow from "@/components/CardCornerArrow";
import Cta from "@/components/Cta";
import Footer from "@/components/Footer";
import FaqSection from "@/components/FaqSection";
import { PageBanner } from "@/components/PageBanner";
import { SiteHeader } from "@/components/SiteHeader";
import { company } from "@/lib/content";
import type { ServicePageContent } from "@/lib/servicePages";
import { SLIDE_MS, useSlideSnap } from "@/lib/useSlideSnap";
import { useBelowSm } from "@/lib/useBelowSm";

const sans = Inter({ subsets: ["latin"], display: "swap" });
const display = Oswald({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

const ACCENT = "#ed1164";
const CARD_GAP = 20;

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

function Kicker({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#ed1164]">
      <span className="h-1.5 w-1.5 rounded-full bg-[#ed1164]" />
      {children}
      <span className="h-px w-12 bg-current/30" />
    </div>
  );
}

// Interactive panel: a frosted-glass "crystal" lens + sheen that follows the
// cursor. Position is written to CSS vars on pointer move (no React re-render).
function GlassPanel({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  return (
    <div
      ref={ref}
      onPointerMove={(e) => {
        const el = ref.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        el.style.setProperty("--mx", `${e.clientX - r.left}px`);
        el.style.setProperty("--my", `${e.clientY - r.top}px`);
      }}
      onPointerEnter={() => setActive(true)}
      onPointerLeave={() => setActive(false)}
      className={className}
    >
      {children}
      {/* magnifier lens - a scaled duplicate of the content masked to a circle
          that follows the cursor, so whatever is under it reads bigger/crisper */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 transition-opacity duration-200"
        style={{
          opacity: active ? 1 : 0,
          maskImage:
            "radial-gradient(circle 135px at var(--mx) var(--my), #000 62%, transparent 75%)",
          WebkitMaskImage:
            "radial-gradient(circle 135px at var(--mx) var(--my), #000 62%, transparent 75%)",
        }}
      >
        <div
          className="absolute inset-0"
          style={{ transform: "scale(1.45)", transformOrigin: "var(--mx) var(--my)" }}
        >
          {children}
        </div>
        {/* soft glass sheen so the lens reads like polished crystal */}
        <div
          className="absolute inset-0 mix-blend-soft-light"
          style={{
            background:
              "radial-gradient(circle 135px at var(--mx) var(--my), rgba(255,255,255,0.55), rgba(255,255,255,0) 72%)",
          }}
        />
      </div>
    </div>
  );
}

function ServiceHeroTitle({ page }: { page: ServicePageContent }) {
  const firstLine = page.hero.title.join(" ").replace("Always-On", "Always On");

  return (
    <>
      <span className="whitespace-nowrap">{firstLine}</span>
      <br />
      <span className="whitespace-nowrap">
        {page.slug === "it-helpdesk-24-7" ? "IT " : ""}
        <span className="text-[#ed1164]">{page.hero.highlight}</span>
      </span>
    </>
  );
}

function HelpdeskProofCard({
  value,
  label,
  className = "",
}: {
  value: string;
  label: string;
  className?: string;
}) {
  return (
    <article className={`group h-full rounded-[2rem] border border-[#3f3f3d]/15 bg-[#f7f7f7] p-6 text-[#3f3f3d] transition-all duration-300 hover:-translate-y-1 hover:bg-[#ed1164] hover:text-white ${className}`}>
      <span className="grid h-11 w-11 place-items-center rounded-full bg-[#ed1164] transition-colors duration-300 group-hover:bg-white">
        <CheckCircle2 className="h-5 w-5 text-white transition-colors duration-300 group-hover:text-[#ed1164]" />
      </span>
      <h3 className="mt-7 text-4xl font-extrabold uppercase leading-none" style={{ fontFamily: "var(--font-display)" }}>
        {value}
      </h3>
      <p className="mt-4 text-sm font-semibold uppercase leading-6 tracking-[0.08em] opacity-75">
        {label}
      </p>
    </article>
  );
}

function IntroProblemCard({ card }: { card: NonNullable<ServicePageContent["intro"]["card"]> }) {
  return (
    <div className="group relative mx-auto aspect-[3/4] w-full max-w-sm overflow-hidden rounded-[2rem] text-white shadow-xl shadow-black/10">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={card.image}
        alt={card.title}
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
      {/* stronger dark shadow so the title, copy, and CTA stay prominent */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 to-black/35" />
      <div className="absolute inset-0 bg-black/20" />

      <div className="absolute inset-x-5 top-5 flex items-start justify-between gap-3">
        <div className="flex flex-wrap gap-2">
          {card.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-white/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.06em] backdrop-blur"
            >
              {tag}
            </span>
          ))}
        </div>
        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#9CCC3C] text-black">
          <ArrowRight className="h-4 w-4 -rotate-45" />
        </span>
      </div>

      <div className="absolute inset-x-5 bottom-5">
        <h3 className="text-2xl font-extrabold leading-tight drop-shadow-[0_2px_10px_rgba(0,0,0,0.6)]" style={{ fontFamily: "var(--font-display)" }}>
          {card.title}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-white/85 drop-shadow-[0_1px_8px_rgba(0,0,0,0.6)]">{card.desc}</p>
        <a
          href="/contact"
          className="mt-5 inline-flex w-full items-center justify-between rounded-full bg-[#9CCC3C] px-5 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-black transition-colors duration-300 hover:bg-[#8bbd2f]"
        >
          {card.cta}
          <ArrowRight className="h-4 w-4" />
        </a>
      </div>
    </div>
  );
}

function HelpdeskComparisonSection({ page }: { page: ServicePageContent }) {
  return (
    <section className="relative overflow-hidden bg-[#EEEEEE] py-24">
      <div className="pointer-events-none absolute -left-32 top-20 h-96 w-96 rounded-full bg-[#ed1164]/20 blur-[140px]" />
      <div className="relative mx-auto grid max-w-7xl gap-12 px-6 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <Reveal className="max-w-2xl">
          <Kicker>{page.intro.kicker}</Kicker>
          <h2
            className="mt-5 text-[clamp(2.8rem,5vw,5.4rem)] font-extrabold uppercase leading-[0.94] tracking-tight text-black"
            style={{ fontFamily: "var(--font-display)" }}
          >
            <span className="whitespace-nowrap">Support that</span>
            <br />
            never sleeps.
          </h2>
          <div className="mt-6 space-y-4 text-base leading-7 text-black/70">
            {page.intro.body.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </Reveal>

        <div className="grid gap-5 sm:grid-cols-2">
          {page.proof.map((item, index) => (
            <Reveal key={item.label} delay={index * 0.08} className={index % 2 === 1 ? "sm:translate-y-10" : ""}>
              <HelpdeskProofCard value={item.value} label={item.label} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function CapabilitiesCarousel({ page }: { page: ServicePageContent }) {
  const sectionRef = useRef<HTMLElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const isMobile = useBelowSm();
  const [cardW, setCardW] = useState(300);
  const [distance, setDistance] = useState(0);
  const [sectionVh, setSectionVh] = useState(180);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });
  const xRaw = useTransform(scrollYProgress, [0, 1], [0, -distance]);
  const x = useSpring(xRaw, { stiffness: 90, damping: 22, mass: 0.4 });

  useEffect(() => {
    const update = () => {
      const vp = viewportRef.current;
      if (!vp) return;
      const w = vp.clientWidth;
      const perView = w >= 900 ? 3 : w >= 600 ? 2 : 1;
      const cw = (w - CARD_GAP * (perView - 1)) / perView;
      setCardW(cw);
      const rowW = page.capabilities.length * cw + (page.capabilities.length - 1) * CARD_GAP;
      setDistance(Math.max(0, rowW - w));
      const long = page.capabilities.length > 3;
      setSectionVh(window.innerWidth < 640 ? (long ? 190 : 140) : long ? 260 : 180);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [page.capabilities.length]);

  const total = String(page.capabilities.length).padStart(2, "0");

  // Below `sm` the vertical-scroll-driven horizontal ride becomes a plain
  // swipeable snap-carousel - a scroll-jacked section reads as a long dead
  // scroll on a phone, and native horizontal swipe is the expected mobile
  // pattern. The pinned height/sticky/x-transform only apply at sm+.
  return (
    <section
      ref={sectionRef}
      id="capabilities"
      className="relative bg-[#EEEEEE]"
      style={{ height: isMobile ? undefined : `${sectionVh}vh` }}
    >
      <div className="flex items-center py-12 sm:sticky sm:top-0 sm:h-screen sm:overflow-hidden sm:py-0">
        <div className="mx-auto grid w-full max-w-[1680px] items-center gap-6 px-6 sm:gap-10 sm:px-8 lg:grid-cols-[1.5fr_0.66fr]">
          <div
            ref={viewportRef}
            className="order-2 -mx-6 overflow-x-auto px-6 [-ms-overflow-style:none] [scrollbar-width:none] sm:mx-0 sm:overflow-hidden sm:px-0 lg:order-1 [&::-webkit-scrollbar]:hidden"
          >
            <motion.div
              style={{ x: isMobile ? 0 : x }}
              className="flex snap-x snap-mandatory gap-5 sm:snap-none sm:will-change-transform"
            >
              {page.capabilities.map((item, index) => (
                <a
                  key={item.title}
                  href="/contact"
                  style={{ width: isMobile ? undefined : cardW }}
                  className="group relative flex h-[48vh] min-h-[280px] max-h-[600px] w-[78vw] max-w-[320px] shrink-0 snap-center flex-col justify-end overflow-hidden rounded-2xl rounded-br-none text-white transition-transform duration-300 hover:-translate-y-1.5 sm:h-[58vh] sm:min-h-[340px] sm:w-auto sm:max-w-none"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.image}
                    alt={item.title}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/70 to-black/35" />
                  <div className="absolute left-4 top-4 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/70 sm:left-6 sm:top-6">
                    <span className="grid h-8 w-8 place-items-center rounded-lg bg-white/10 text-[#ed1164] ring-1 ring-white/15 backdrop-blur">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    / {total}
                  </div>
                  <CardCornerArrow bg="#EEEEEE" accent={ACCENT} />
                  <div className="relative p-4 pb-10 sm:p-6 sm:pb-12">
                    <h3 className="text-lg font-semibold leading-tight drop-shadow sm:text-xl" style={{ fontFamily: "var(--font-display)" }}>
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-white/75">{item.desc}</p>
                  </div>
                </a>
              ))}
            </motion.div>
          </div>

          <div className="order-1 lg:order-2">
            <Kicker>{page.group}</Kicker>
            <h2 className="mt-6 text-[clamp(2.2rem,5.5vw,5rem)] font-extrabold uppercase leading-[0.9] tracking-tight text-black" style={{ fontFamily: "var(--font-display)" }}>
              Service
              <br />
              <span className="text-[#ed1164]">coverage.</span>
            </h2>
            <p className="mt-6 max-w-sm text-base leading-7 text-black/70">
              A clear view of the support coverage, response model, and operational controls that keep your teams productive around the clock.
            </p>
            <p className="mt-8 hidden items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-black/50 lg:flex">
              Scroll to explore
              <ArrowRight className="h-4 w-4 text-[#ed1164]" />
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function BenefitScrollCard({
  benefit,
  index,
  total,
  progress,
}: {
  benefit: ServicePageContent["benefits"][number];
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  // stagger each card along the scroll: gentle rise + fade, no sideways travel
  const step = total > 1 ? 0.55 / (total - 1) : 0;
  const start = index * step;
  const end = Math.min(1, start + 0.35);
  const opacity = useTransform(progress, [start, end], [0, 1]);
  const y = useTransform(progress, [start, end], [36, 0]);

  return (
    <motion.div
      style={{ opacity, y }}
      className="group flex min-h-[18rem] flex-col justify-between rounded-2xl border border-slate-200 bg-white p-7 shadow-lg shadow-black/5 transition-colors duration-300 hover:bg-[#ed1164] hover:text-white sm:p-8"
    >
      <div className="flex items-center justify-between">
        <span className="grid h-12 w-12 place-items-center rounded-xl bg-[#ed1164]/15 text-[#ed1164] transition-colors duration-300 group-hover:bg-white group-hover:text-[#ed1164]">
          <CheckCircle2 className="h-6 w-6" />
        </span>
        <span className="text-5xl font-extrabold leading-none text-[#ed1164]/60 transition-colors duration-300 group-hover:text-white/45" style={{ fontFamily: "var(--font-display)" }}>
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>
      <div>
        <h3 className="mt-6 text-2xl font-bold leading-tight text-black transition-colors duration-300 group-hover:text-white sm:text-3xl" style={{ fontFamily: "var(--font-display)" }}>
          {benefit.title}
        </h3>
        <p className="mt-3 text-base text-black/75 transition-colors duration-300 group-hover:text-white/80">{benefit.desc}</p>
      </div>
    </motion.div>
  );
}

function BenefitsStackSection({ page }: { page: ServicePageContent }) {
  const sectionRef = useRef<HTMLElement>(null);
  // progress runs while the section crosses the viewport, so cards finish
  // revealing well before the section bottom - they never sit half-shown
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 0.85", "end 0.9"],
  });
  const total = page.benefits.length;

  return (
    <section ref={sectionRef} className="relative bg-[#EEEEEE] py-16 sm:py-24">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 sm:px-8 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <div className="lg:sticky lg:top-32">
            <Reveal>
              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[#ed1164]">
                What you get
              </span>
              <h2
                className="mt-3 text-4xl font-black uppercase tracking-tight text-black sm:text-5xl lg:text-6xl"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Outcomes Built Into The Service.
              </h2>
              <p className="mt-5 max-w-sm text-black">
                Predictable support, certified delivery practices, and transparent pricing help you scale IT operations without adding unnecessary overhead.
              </p>
            </Reveal>
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          {page.benefits.map((benefit, index) => (
            <BenefitScrollCard
              key={benefit.title}
              benefit={benefit}
              index={index}
              total={total}
              progress={scrollYProgress}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Process: a pinned, full-screen slide deck. Each step fills the viewport
// with a big image; one wheel gesture advances one step, and panels animate
// in/out on a timed transition - never parked half-faded. Images are keyed
// by step order.
// ---------------------------------------------------------------------------
const PROCESS_EASE = [0.22, 1, 0.36, 1] as const;
const processImages = [
  "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=2000&q=80",
  "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=2000&q=80",
  "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=2000&q=80",
  "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=2000&q=80",
  "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=2000&q=80",
  "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=2000&q=80",
];

function ProcessPanel({
  step,
  i,
  active,
  mobile = false,
}: {
  step: ServicePageContent["process"][number];
  i: number;
  active: number;
  mobile?: boolean;
}) {
  // On mobile every panel is a static, always-visible block in normal flow -
  // no pin, no cross-fade. isActive is forced true so the enter states below
  // resolve to their final (visible) values with no animation.
  const isActive = mobile || i === active;
  const textAnimate = isActive ? { y: 0, opacity: 1 } : { y: 70, opacity: 0 };
  const textTransition = mobile
    ? { duration: 0 }
    : {
        duration: SLIDE_MS / 1000,
        ease: PROCESS_EASE,
        delay: isActive ? 0.12 : 0,
      };

  return (
    <motion.div
      initial={false}
      animate={{ opacity: mobile || isActive ? 1 : 0 }}
      transition={mobile ? { duration: 0 } : { duration: SLIDE_MS / 1000, ease: PROCESS_EASE }}
      style={{ zIndex: isActive ? 2 : 1 }}
      className={
        mobile
          ? "pointer-events-none relative h-[85vh] min-h-[520px] w-full overflow-hidden"
          : "pointer-events-none absolute inset-0"
      }
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <motion.img
        src={processImages[i % processImages.length]}
        alt={step.title}
        initial={false}
        animate={{ scale: isActive ? 1 : 1.15 }}
        transition={{ duration: 1.1, ease: PROCESS_EASE }}
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/30" />
      <div className="absolute inset-0 bg-black/25" />

      {/* giant ghost index number, top-right */}
      <motion.span
        initial={false}
        animate={{ y: isActive ? 0 : 30, opacity: isActive ? 1 : 0 }}
        transition={{ duration: SLIDE_MS / 1000, ease: PROCESS_EASE }}
        style={{ fontFamily: "var(--font-display)" }}
        className="pointer-events-none absolute right-4 top-20 select-none text-[clamp(6rem,26vw,16rem)] font-extrabold leading-none text-white/[0.07] sm:right-10 sm:top-24 sm:text-[18vw]"
      >
        {String(i + 1).padStart(2, "0")}
      </motion.span>

      {/* heading, top-left */}
      <motion.div
        initial={false}
        animate={textAnimate}
        transition={textTransition}
        className="absolute inset-x-0 top-0 mx-auto max-w-6xl px-6 pt-20 sm:px-8 sm:pt-28"
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
        animate={textAnimate}
        transition={textTransition}
        className="absolute inset-x-0 bottom-0 mx-auto flex max-w-6xl justify-end px-6 pb-16 sm:px-8 sm:pb-28"
      >
        <div className="flex max-w-lg items-start gap-4 sm:gap-6">
          <span className="mt-2 hidden h-px w-16 shrink-0 bg-white/40 sm:block" />
          <div>
            <p className="text-base leading-relaxed text-white/85 sm:text-lg lg:text-xl">
              {step.desc}
            </p>
            <a
              href="/contact"
              className="pointer-events-auto mt-6 inline-flex items-center gap-2 rounded-full bg-[#ed1164] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#c50e53]"
            >
              Get in touch
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function ProcessScrollSection({ page }: { page: ServicePageContent }) {
  const ref = useRef<HTMLDivElement>(null);
  const isMobile = useBelowSm();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  const total = page.process.length;
  const [active, setActive] = useState(0);
  // Shorter per-step scroll distance on small screens keeps the pinned
  // track from demanding an excessive amount of scrolling on mobile.
  const [stepVh, setStepVh] = useState(100);

  useEffect(() => {
    const update = () => setStepVh(window.innerWidth < 640 ? 70 : window.innerWidth < 1024 ? 85 : 100);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  // Snap the visible step to whole steps no matter how the user scrolls.
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setActive(Math.min(total - 1, Math.max(0, Math.round(v * (total - 1)))));
  });

  // While the track is pinned, one wheel gesture moves exactly one step.
  // Disabled on mobile, where the section is a plain stack, not pinned.
  useSlideSnap(ref, total, !isMobile);

  return (
    <section className="relative bg-white">
      {/* heading sits above the images on a light background; the CTA is a
          square block on the right that stretches to the heading's height.
          The glow is anchored to this full-width wrapper (not the centered
          max-w container) so it bleeds all the way to the viewport's left
          edge with no white gap. */}
      <div className="relative overflow-hidden">
        {/* soft light-green glow filling the bottom-left of the heading block */}
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-32 -left-32 h-[26rem] w-[26rem] rounded-full bg-[#9CCC3C]/40 blur-[130px]"
        />
        <div className="relative mx-auto flex max-w-6xl flex-col gap-6 px-6 pb-16 pt-16 sm:gap-8 sm:px-8 sm:pt-24 lg:flex-row lg:items-stretch lg:justify-between">
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.22em] text-[#ed1164]">
              How it works
            </span>
            <h2
              className="mt-4 max-w-lg text-[clamp(1.9rem,4vw,3.5rem)] font-extrabold uppercase leading-[0.95] tracking-tight text-black"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Setup to <span style={{ color: "#ed1164" }}>steady execution</span>.
            </h2>
          </div>
          <a
            href="/contact"
            className="animate-attention group relative flex h-20 w-full shrink-0 items-center justify-center rounded-2xl rounded-br-none bg-[#ed1164] p-5 text-white transition-colors duration-300 hover:bg-neutral-950 hover:[animation-play-state:paused] sm:h-24 sm:w-40 lg:h-auto lg:w-40 lg:self-stretch"
          >
            <span className="absolute right-5 top-5 h-8 w-8 overflow-hidden">
              <ArrowUpRight className="absolute inset-0 h-8 w-8 text-white transition-[transform,color] duration-300 ease-out group-hover:translate-x-10 group-hover:-translate-y-10 group-hover:text-[#9CCC3C]" />
              <ArrowUpRight className="absolute inset-0 h-8 w-8 -translate-x-10 translate-y-10 text-white transition-[transform,color] duration-300 ease-out group-hover:translate-x-0 group-hover:translate-y-0 group-hover:text-[#9CCC3C]" />
            </span>
            <span
              className="text-center text-xl font-extrabold leading-tight sm:text-2xl"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {page.finalCta.button}
            </span>
          </a>
        </div>
      </div>

      {/* Below `sm`: a plain stack of full panels in normal flow - no pin, no
          cross-fade, every step visible as you scroll. sm+ keeps the pinned
          one-panel-at-a-time track. */}
      <div
        ref={ref}
        data-header-dark
        className="relative bg-black"
        style={{ height: isMobile ? undefined : `${total * stepVh}vh` }}
      >
        {isMobile ? (
          <div className="flex flex-col">
            {page.process.map((step, i) => (
              <ProcessPanel key={step.title} step={step} i={i} active={active} mobile />
            ))}
          </div>
        ) : (
          <div className="sticky top-0 h-screen overflow-hidden">
            {page.process.map((step, i) => (
              <ProcessPanel key={step.title} step={step} i={i} active={active} />
            ))}

            {/* bottom progress bar - fills one segment per step */}
            <div className="absolute inset-x-0 bottom-0 z-10 h-1 bg-white/15">
              <motion.div
                initial={false}
                animate={{ scaleX: (active + 1) / total }}
                transition={{ duration: SLIDE_MS / 1000, ease: PROCESS_EASE }}
                style={{ transformOrigin: "left" }}
                className="h-full w-full bg-[#ed1164]"
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default function ServiceDetailPage({ page }: { page: ServicePageContent }) {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const saved = localStorage.getItem("mw-theme");
    if (saved === "dark" || saved === "light") setTheme(saved);
  }, []);

  useEffect(() => {
    localStorage.setItem("mw-theme", theme);
  }, [theme]);

  const isHelpdesk = page.slug === "it-helpdesk-24-7";

  return (
    <main className={`${sans.className} ${display.variable} bg-white text-black`}>
      <SiteHeader theme={theme} />

      <PageBanner
        image={page.hero.image}
        accent={ACCENT}
        headingClassName="text-[clamp(3.25rem,8.6vw,10.5rem)]"
        title={<ServiceHeroTitle page={page} />}
        subtitle={page.hero.subtitle}
        primary={{ label: page.hero.cta, href: "/#contact" }}
        secondary={{ label: "Explore capabilities", href: "#capabilities" }}
      />

      {!isHelpdesk && (
        <section className="bg-white">
          <div className="mx-auto max-w-7xl px-6 py-14 sm:px-8 sm:py-20">
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {page.proof.map((item, index) => (
                <Reveal key={item.label} delay={index * 0.08}>
                  <div
                    className={`group h-full rounded-2xl p-5 shadow-lg shadow-black/5 transition-transform duration-300 hover:-translate-y-1.5 sm:p-6 ${
                      index % 2 === 0 ? "bg-[#ed1164] text-white" : "border border-slate-200 bg-white text-black"
                    }`}
                  >
                    <p className="text-4xl font-extrabold sm:text-5xl" style={{ fontFamily: "var(--font-display)" }}>
                      {item.value}
                    </p>
                    <span className={`mt-4 block h-0.5 w-10 ${index % 2 === 0 ? "bg-white/50" : "bg-[#ed1164]"}`} />
                    <p className={`mt-4 text-xs font-semibold uppercase leading-relaxed tracking-[0.18em] ${index % 2 === 0 ? "text-white/80" : "text-black/65"}`}>
                      {item.label}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {isHelpdesk ? (
        <HelpdeskComparisonSection page={page} />
      ) : (
      <section className="relative overflow-hidden bg-white py-16 sm:py-24">
        <div className="pointer-events-none absolute -left-32 top-20 h-96 w-96 rounded-full bg-[#ed1164]/20 blur-[140px]" />
        <div className={`relative mx-auto grid max-w-7xl gap-10 px-6 sm:gap-12 sm:px-8 ${page.intro.card ? "lg:grid-cols-[1.2fr_0.8fr] lg:items-center" : ""}`}>
          <Reveal className="max-w-2xl">
            <Kicker>{page.intro.kicker}</Kicker>
            <h2
              className="mt-5 text-4xl font-extrabold uppercase leading-[0.94] tracking-tight text-black sm:text-5xl lg:text-6xl"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {page.intro.title}
            </h2>
            <div className="mt-6 space-y-4 text-base leading-7 text-black/70">
              {page.intro.body.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </Reveal>

          {page.intro.card && (
            <Reveal delay={0.1}>
              <IntroProblemCard card={page.intro.card} />
            </Reveal>
          )}
        </div>
      </section>
      )}

      {page.problems && (
        <section className="bg-[#EEEEEE] py-16 sm:py-24">
          <div className="mx-auto max-w-7xl px-6 sm:px-8">
            <Reveal className="max-w-3xl">
              <Kicker>Problems we solve</Kicker>
              <h2 className="mt-5 text-4xl font-bold leading-[1.05] tracking-tight text-black sm:text-5xl" style={{ fontFamily: "var(--font-display)" }}>
                {page.problems.title}
              </h2>
            </Reveal>

            <div className="mt-12 grid gap-5 lg:grid-cols-3">
              {page.problems.groups.map((group, index) => (
                <Reveal key={group.title} delay={index * 0.08}>
                  <div className="h-full rounded-2xl border border-slate-200 bg-white p-6">
                    <h3 className="text-xl font-bold text-black" style={{ fontFamily: "var(--font-display)" }}>
                      {group.title}
                    </h3>
                    <ul className="mt-5 space-y-3">
                      {group.items.map((item) => (
                        <li key={item} className="flex gap-3 text-sm leading-6 text-black/70">
                          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#ed1164]" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      <CapabilitiesCarousel page={page} />

      <BenefitsStackSection page={page} />

      <ProcessScrollSection page={page} />

      {page.faqs?.length ? <FaqSection faqs={page.faqs} /> : null}

      <section className="relative p-[30px] text-white">
        <div className="relative overflow-hidden rounded-[2.5rem]">
          {/* per-page background photo */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={page.hero.image}
            alt=""
            aria-hidden
            className="absolute inset-0 h-full w-full object-cover"
          />
          {/* dark shadow overlay so the copy stays prominent over the image */}
          <div className="absolute inset-0 bg-black/60" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-black/50" />
          <div className="relative mx-auto px-6 py-16 text-center sm:px-10 sm:py-24 lg:px-16">
            <Reveal>
            <h2 className="text-[clamp(2.2rem,5.5vw,5rem)] font-extrabold uppercase leading-[0.9] tracking-tight text-white drop-shadow-[0_3px_18px_rgba(0,0,0,0.65)]" style={{ fontFamily: "var(--font-display)" }}>
              {page.finalCta.title}
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-white/90 drop-shadow-[0_2px_12px_rgba(0,0,0,0.6)]">
              {page.finalCta.desc}
            </p>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-x-4 gap-y-3 sm:gap-x-7 sm:gap-y-4">
              <a
                href="/contact"
                className="group inline-flex items-center gap-2 rounded-full bg-[#ed1164] px-6 py-3 text-sm font-bold text-white shadow-lg shadow-[#ed1164]/40 transition-colors duration-300 hover:bg-[#c50e55] sm:px-8 sm:py-4 sm:text-base"
              >
                <span className="relative h-5 w-5 overflow-hidden">
                  <ArrowUpRight className="absolute inset-0 h-5 w-5 transition-transform duration-300 ease-out group-hover:translate-x-6 group-hover:-translate-y-6" />
                  <ArrowUpRight className="absolute inset-0 h-5 w-5 -translate-x-6 translate-y-6 transition-transform duration-300 ease-out group-hover:translate-x-0 group-hover:translate-y-0" />
                </span>
                {page.finalCta.button}
              </a>
              <a
                href={`mailto:${company.email}`}
                className="group inline-flex items-center gap-2 break-all rounded-full bg-[#9CCC3C] px-6 py-3 text-sm font-bold text-black shadow-lg shadow-[#9CCC3C]/40 transition-colors duration-300 hover:bg-[#8bbd2f] sm:px-8 sm:py-4 sm:text-base"
              >
                <Mail className="h-5 w-5 shrink-0" />
                {company.email}
              </a>
            </div>
          </Reveal>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
