"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { motion, type Variants } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, CheckCircle2 } from "lucide-react";
import CardCornerArrow from "@/components/CardCornerArrow";
import { servicePages } from "@/lib/servicePages";
import { industryPages } from "@/lib/industryPages";
import Footer from "@/components/Footer";
import FaqSection from "@/components/FaqSection";
import { ProcessIntroBanner } from "@/components/ProcessIntroBanner";
import { PageBanner, SlidingHighlight } from "@/components/PageBanner";
import { SiteHeader } from "@/components/SiteHeader";
import type { ServicePageContent } from "@/lib/servicePages";
import { SLIDE_MS, useSlideSnap } from "@/lib/useSlideSnap";
import { usePinnedActive } from "@/lib/usePinnedActive";
import { useBelowSm } from "@/lib/useBelowSm";
import { jsonLdScript } from "@/lib/jsonLd";

const sans = Inter({ subsets: ["latin"], display: "swap" });
const display = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-display",
  display: "swap",
});

const ACCENT = "#ed1164";
const CARD_GAP = 20;
const BOOKING_URL = "https://api.leadconnectorhq.com/widget/booking/I1hzuNe9sXdClDrIUCe3";

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

function ServiceHeroTitle({ page }: { page: ServicePageContent }) {
  // "Build Great Teams" style shared by every service and industry hero: each
  // title word is stacked on its own line, and the highlight renders as a
  // rotating word that slides in from the right (right-to-left). The rotation
  // list is page-specific (hero.heroRotate); it falls back to just the single
  // highlight when a page has not defined extra words.
  const rotating = [page.hero.highlight, ...(page.hero.heroRotate ?? [])];

  return (
    <>
      {page.hero.title.map((word) => (
        <span key={word} className="block whitespace-nowrap">
          {word}
        </span>
      ))}
      <SlidingHighlight words={rotating} className="text-[#ed1164]" />
    </>
  );
}

function HelpdeskProofCard({
  value,
  label,
  image,
  className = "",
}: {
  value: string;
  label: string;
  image?: string;
  className?: string;
}) {
  return (
    <a
      href="/contact"
      className={`group relative flex h-full min-h-[19rem] flex-col justify-end overflow-hidden rounded-2xl rounded-br-none text-white transition-transform duration-300 hover:-translate-y-1.5 ${className}`}
    >
      {image && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={image}
          alt={label}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/70 to-black/40" />

      <CardCornerArrow bg="#EEEEEE" />

      <div className="relative p-6 pb-12">
        <h3 className="text-3xl font-extrabold uppercase leading-none drop-shadow" style={{ fontFamily: "var(--font-display)" }}>
          {value}
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-white/75">{label}</p>
        <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-[#9CCC3C]">
          Learn more <ArrowUpRight className="h-3.5 w-3.5" />
        </span>
      </div>
    </a>
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

      <div className="absolute inset-x-5 bottom-5">
        <h3 className="text-2xl font-extrabold leading-tight drop-shadow-[0_2px_10px_rgba(0,0,0,0.6)]" style={{ fontFamily: "var(--font-display)" }}>
          {card.title}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-white/85 drop-shadow-[0_1px_8px_rgba(0,0,0,0.6)]">{card.desc}</p>
        <a
          href="/contact"
          className="group/btn relative mt-5 inline-flex w-full items-center justify-between overflow-hidden rounded-full bg-[#ed1164] px-5 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-white"
        >
          <span className="absolute inset-0 bg-[#c40d52] origin-left scale-x-0 transition-transform duration-500 ease-out group-hover/btn:scale-x-100" />
          <span className="relative z-10">
            {card.cta}
          </span>
          <ArrowRight className="relative z-10 h-4 w-4" />
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
            className="mt-5 text-4xl font-black uppercase tracking-tight text-black sm:text-5xl lg:text-6xl"
            style={{ fontFamily: "var(--font-display)" }}
          >
            <span className="whitespace-nowrap">24/7 Helpdesk,</span>
            <br />
            Tiers 1 to 3
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
              <HelpdeskProofCard value={item.value} label={item.label} image={item.image} />
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
  const rowRef = useRef<HTMLDivElement>(null);
  const isMobile = useBelowSm();
  const [cardW, setCardW] = useState(300);
  const [sectionVh, setSectionVh] = useState(180);
  // Whether the card row is wider than its viewport at the current breakpoint.
  // When it is not (e.g. a 3-card page at 3-per-view), there is nothing to ride,
  // so the section drops the tall pinned height and renders as a normal row -
  // otherwise it would be a pinned dead-scroll with no horizontal movement.
  const [needsRide, setNeedsRide] = useState(true);

  useEffect(() => {
    const update = () => {
      const vp = viewportRef.current;
      if (!vp) return;
      const w = vp.clientWidth;
      const perView = w >= 900 ? 3 : w >= 600 ? 2 : 1;
      const cw = (w - CARD_GAP * (perView - 1)) / perView;
      setCardW(cw);
      const count = page.capabilities.length;
      const rowW = count * cw + (count - 1) * CARD_GAP;
      const distance = Math.max(0, rowW - w);
      const ride = distance > 4;
      setNeedsRide(ride);
      // Size the pinned scroll length to a bit less than the actual travel
      // (~0.9x) so the row keeps pace with the scroll and the section releases
      // promptly once the last card lands - a longer pin left the page holding
      // after the ride visually finished. Clamped so very short/long rides stay
      // reasonable.
      const vh = window.innerHeight || 800;
      const extraVh = ride ? Math.min(140, Math.max(28, (distance / vh) * 90)) : 0;
      setSectionVh(100 + extraVh);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [page.capabilities.length]);

  // At sm+ the section pins (CSS sticky) and the card row rides left as you
  // scroll - the same GSAP ScrollTrigger scrub the home page "Industries we
  // serve" section uses. It re-reads the row's LIVE width every frame, so it
  // works on every viewport size; the previous framer useScroll version
  // measured 0px of travel on desktop/laptop and never moved. matchMedia only
  // builds the timeline at sm+ and tears it down below, where the row stays a
  // native swipe carousel.
  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia();
    mm.add("(min-width: 640px)", () => {
      const ctx = gsap.context(() => {
        const row = rowRef.current!;
        const vp = viewportRef.current!;
        // Leftward travel that scrolls the row until its last card's right edge
        // meets the viewport's right edge, read live each frame while pinned.
        const fullDistance = () => Math.max(0, row.scrollWidth - vp.clientWidth);
        const state = { progress: 0 };
        const apply = () => {
          gsap.set(row, { x: -fullDistance() * state.progress, force3D: true });
        };
        gsap
          .timeline({
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top top",
              end: "bottom bottom",
              scrub: 0.5,
              invalidateOnRefresh: true,
            },
          })
          .to(state, { progress: 1, duration: 1, ease: "none", onUpdate: apply });
      }, sectionRef);
      return () => ctx.revert();
    });
    return () => mm.revert();
  }, []);

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
      style={{ height: isMobile || !needsRide ? undefined : `calc(var(--vh) * ${sectionVh})` }}
    >
      <div
        className={`flex items-center py-12 ${
          needsRide ? "sm:sticky sm:top-0 sm:h-screen sm:overflow-hidden sm:py-0" : ""
        }`}
      >
        <div className="mx-auto grid w-full max-w-[1680px] items-center gap-6 px-6 sm:gap-10 sm:px-8 lg:grid-cols-[1.5fr_0.66fr]">
          <div
            ref={viewportRef}
            className="order-2 -mx-6 overflow-x-auto px-6 [-ms-overflow-style:none] [scrollbar-width:none] sm:mx-0 sm:overflow-hidden sm:px-0 lg:order-1 [&::-webkit-scrollbar]:hidden"
          >
            <div
              ref={rowRef}
              className="flex snap-x snap-mandatory gap-5 sm:snap-none sm:will-change-transform"
            >
              {page.capabilities.map((item, index) => (
                <motion.a
                  key={item.title}
                  href="/contact"
                  style={{ width: isMobile ? undefined : cardW }}
                  // When the row isn't riding (phones, or a page whose cards fit
                  // without overflow) each card gets its own reveal on the way in
                  // - the same visual language as the desktop ride. While riding,
                  // the row itself moves, so the cards stay put and fully shown.
                  {...(isMobile || !needsRide
                    ? {
                        initial: { opacity: 0, y: 40 },
                        whileInView: { opacity: 1, y: 0 },
                        viewport: { once: true, margin: "-15%" },
                        transition: { duration: 0.5, ease: PROCESS_EASE },
                      }
                    : {})}
                  className="group relative flex h-[calc(var(--vh)*48)] min-h-[280px] max-h-[600px] w-[78vw] max-w-[320px] shrink-0 snap-center flex-col justify-end overflow-hidden rounded-2xl rounded-br-none text-white transition-transform duration-300 hover:-translate-y-1.5 sm:h-[calc(var(--vh)*58)] sm:min-h-[340px] sm:w-auto sm:max-w-none"
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
                  {/* extra bottom + right padding keeps the copy clear of the
                      corner-arrow button carved into the bottom-right */}
                  <div className="relative p-4 pb-14 sm:p-6 sm:pb-16">
                    <h3 className="text-lg font-semibold leading-tight drop-shadow sm:text-xl" style={{ fontFamily: "var(--font-display)" }}>
                      {item.title}
                    </h3>
                    <p className="mt-2 pr-16 text-sm leading-relaxed text-white/75">{item.desc}</p>
                  </div>
                </motion.a>
              ))}
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <Kicker>{page.group}</Kicker>
            <h2 className="mt-6 text-[clamp(2.2rem,5.5vw,5rem)] font-extrabold uppercase leading-[0.9] tracking-tight text-black" style={{ fontFamily: "var(--font-display)" }}>
              Service
              <br />
              <span className="text-[#ed1164]">coverage</span>
            </h2>
            {page.capabilitiesHook ? (
              <>
                {/* audience-aware hook that pulls B2B / B2C readers in */}
                <p className="mt-6 text-xs font-semibold uppercase tracking-[0.18em] text-[#ed1164]">
                  {page.capabilitiesHook.audience}
                </p>
                <p className="mt-3 max-w-sm text-lg font-semibold leading-snug text-black/80" style={{ fontFamily: "var(--font-display)" }}>
                  {page.capabilitiesHook.question}
                </p>
              </>
            ) : (
              <p className="mt-6 max-w-sm text-base leading-7 text-black/70">
                A clear view of the support coverage, response model, and operational controls that keep your teams productive around the clock.
              </p>
            )}
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
}: {
  benefit: ServicePageContent["benefits"][number];
  index: number;
}) {
  // Fade + rise each card in as it enters the viewport, using whileInView
  // (IntersectionObserver) so the reveal fires reliably on every viewport size.
  // The previous version tied every card's reveal to a slice of the whole
  // section's scroll progress, which only lined up when the section fit the
  // viewport (desktop). On shorter viewports (laptop) and when the cards stack
  // tall (mobile) the slice elapsed off-screen, so the animation never played.
  // A small index-based delay keeps the original staggered feel.
  return (
    <motion.div
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: (index % 2) * 0.08 }}
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
        <h3 className="mt-6 text-2xl font-extrabold leading-tight text-black transition-colors duration-300 group-hover:text-white sm:text-3xl" style={{ fontFamily: "var(--font-display)" }}>
          {benefit.title}
        </h3>
        <p className="mt-3 text-base text-black/75 transition-colors duration-300 group-hover:text-white/80">{benefit.desc}</p>
      </div>
    </motion.div>
  );
}

function BenefitsStackSection({ page }: { page: ServicePageContent }) {
  return (
    <section className="relative bg-[#EEEEEE] py-16 sm:py-24">
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
                Outcomes Built Into The Service
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
}: {
  step: ServicePageContent["process"][number];
  i: number;
  active: number;
}) {
  // A pinned cross-fade deck driven by the active step - one panel fully in at
  // a time, on every screen size.
  const isActive = i === active;

  const wrapperMotion = {
    initial: false as const,
    animate: { opacity: isActive ? 1 : 0 },
    transition: { duration: SLIDE_MS / 1000, ease: PROCESS_EASE },
  };

  const imgMotion = {
    initial: false as const,
    animate: { scale: isActive ? 1 : 1.15 },
    transition: { duration: 1.1, ease: PROCESS_EASE },
  };

  const numberMotion = {
    initial: false as const,
    animate: { y: isActive ? 0 : 30, opacity: isActive ? 1 : 0 },
    transition: { duration: SLIDE_MS / 1000, ease: PROCESS_EASE },
  };

  const textMotion = {
    initial: false as const,
    animate: isActive ? { y: 0, opacity: 1 } : { y: 70, opacity: 0 },
    transition: {
      duration: SLIDE_MS / 1000,
      ease: PROCESS_EASE,
      delay: isActive ? 0.12 : 0,
    },
  };

  return (
    <motion.div
      {...wrapperMotion}
      style={{ zIndex: isActive ? 2 : 1 }}
      className="pointer-events-none absolute inset-0"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <motion.img
        src={processImages[i % processImages.length]}
        alt={step.title}
        {...imgMotion}
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/30" />
      <div className="absolute inset-0 bg-black/25" />

      {/* giant ghost index number, top-right */}
      <motion.span
        {...numberMotion}
        style={{ fontFamily: "var(--font-display)" }}
        className="pointer-events-none absolute right-4 top-20 select-none text-[clamp(6rem,26vw,16rem)] font-extrabold leading-none text-white/[0.07] sm:right-10 sm:top-24 sm:text-[18vw]"
      >
        {String(i + 1).padStart(2, "0")}
      </motion.span>

      {/* heading, top-left */}
      <motion.div
        {...textMotion}
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
        {...textMotion}
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
              className="pointer-events-auto mt-6 inline-flex items-center gap-2 rounded-full bg-[#ed1164] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#c50e53]"
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
  const total = page.process.length;

  // Active step is read from the track geometry (see usePinnedActive) so it
  // stays locked to the snap position on every size, including the zoomed
  // laptop layout where scrollYProgress would leave the last panel skipped.
  const active = usePinnedActive(ref, total);

  // Pinned, one-gesture-per-step track on every size - the hook drives both
  // wheel (desktop/laptop) and touch (mobile/tablet), so the animated deck
  // runs everywhere instead of falling back to a plain stack on phones.
  useSlideSnap(ref, total);

  return (
    <section className="relative bg-slate-50">
      <div
        ref={ref}
        data-header-dark
        className="relative bg-black"
        // One full viewport of scroll per step, matching the sticky pin below -
        // so the wheel-snap step, the active-step read, and the pinned viewport
        // all stay in sync.
        style={{ height: `calc(var(--svh) * ${total * 100})` }}
      >
        <div className="sticky top-0 h-[calc(var(--svh)*100)] overflow-hidden">
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
      </div>
    </section>
  );
}

// Credentials shown on IT & Security and Cloud & DevOps service pages. Style
// mirrors the homepage credentials section (centered heading + badge row).
const certBadges = [
  { src: "/certs/gsoc.webp", alt: "GIAC Security Operations Certified (GSOC)" },
  { src: "/certs/oscp.webp", alt: "Offensive Security Certified Professional (OSCP)" },
  { src: "/certs/csa.webp", alt: "EC-Council Certified SOC Analyst (CSA)" },
  { src: "/certs/gwapt.webp", alt: "GIAC Web Application Penetration Tester (GWAPT)" },
  { src: "/certs/google-comptia.webp", alt: "Google Cybersecurity Certificate & CompTIA Security+" },
  { src: "/certs/ceh.webp", alt: "EC-Council Certified Ethical Hacker (CEH)" },
];

function CredentialsSection() {
  return (
    <section className="relative overflow-hidden bg-[#f7f6f4] py-24 text-black">
      <div className="relative mx-auto max-w-6xl px-6 text-center sm:px-8">
        <Reveal>
          <span className="text-xs font-semibold uppercase tracking-[0.22em] text-[#ed1164]">
            Credentials
          </span>
          <h2
            className="mx-auto mt-5 max-w-3xl text-[clamp(2.2rem,5vw,4rem)] font-extrabold uppercase leading-[1.02] tracking-tight text-black"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Earned under live conditions
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-black/70">
            Every credential here was earned under live production conditions and
            verified externally.
          </p>
        </Reveal>

        {/* desktop: single row with vertical dividers, like the reference */}
        <Reveal delay={0.1}>
          <div className="mt-16 hidden grid-cols-6 divide-x divide-black/10 lg:grid">
            {certBadges.map((b) => (
              <div key={b.alt} className="flex items-center justify-center px-4">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={b.src}
                  alt={b.alt}
                  title={b.alt}
                  className="h-24 w-auto max-w-full rounded-xl border border-slate-200 bg-white p-2.5 object-contain shadow-sm transition-transform duration-300 hover:-translate-y-1 hover:shadow-md"
                />
              </div>
            ))}
          </div>

          {/* mobile / tablet: tiled grid */}
          <div className="mt-14 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:hidden">
            {certBadges.map((b) => (
              <div
                key={b.alt}
                className="flex aspect-square items-center justify-center rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={b.src}
                  alt={b.alt}
                  className="max-h-full max-w-full object-contain"
                />
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// Must match siteUrl in seo.config.ts so the Service `provider` @id resolves
// to the same #organization node the root layout emits.
const SITE_URL = "https://www.mindwhiz.com";

export default function ServiceDetailPage({
  page,
  basePath = "/services",
  sectionLabel = "Services",
}: {
  page: ServicePageContent;
  basePath?: "/services" | "/industries";
  sectionLabel?: string;
}) {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  // Contextual internal links: surface sibling service/industry pages with
  // keyword-rich anchor text so link equity and crawl paths spread across the
  // catalogue instead of every CTA pointing only at /contact.
  const catalog = basePath === "/industries" ? industryPages : servicePages;
  const related = catalog.filter((p) => p.slug !== page.slug).slice(0, 6);

  const canonicalUrl = `${SITE_URL}${basePath}/${page.slug}`;
  // Service schema on both /services/* and /industries/* (the keyword map lists
  // Service for industry pages too), plus a matching breadcrumb trail so search
  // results show the page hierarchy.
  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: page.name,
    description: page.hero.subtitle,
    provider: { "@id": `${SITE_URL}/#organization` },
    areaServed: [
      { "@type": "Country", name: "United States" },
      { "@type": "Country", name: "United Kingdom" },
      { "@type": "Country", name: "Pakistan" },
    ],
    serviceType: page.name,
    url: canonicalUrl,
    // The capability deck is the page's real description of what is on offer.
    // Publishing it as an offer catalog gives search and AI answer engines an
    // itemised, quotable view of the service instead of one hero sentence.
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: `${page.name} capabilities`,
      itemListElement: page.capabilities.map((c) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: c.title, description: c.desc },
      })),
    },
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: sectionLabel, item: `${SITE_URL}${basePath}` },
      { "@type": "ListItem", position: 3, name: page.name, item: canonicalUrl },
    ],
  };

  // NB: FAQPage schema is emitted by <FaqSection> itself (co-located with the
  // rendered accordion), so it is intentionally not duplicated here.

  useEffect(() => {
    const saved = localStorage.getItem("mw-theme");
    if (saved === "dark" || saved === "light") setTheme(saved);
  }, []);

  useEffect(() => {
    localStorage.setItem("mw-theme", theme);
  }, [theme]);

  const isHelpdesk = page.slug === "it-helpdesk-24-7";
  // Credentials belong on the IT & Security and Cloud & DevOps service pages.
  const showCredentials = page.group === "IT & Security" || page.group === "Cloud & DevOps";

  return (
    <main className={`${sans.className} ${display.variable} bg-white text-black`}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(serviceJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(breadcrumbJsonLd) }}
      />
      <SiteHeader theme={theme} />

      <PageBanner
        image={page.hero.image}
        accent={ACCENT}
        headingClassName="text-[clamp(3.25rem,8.6vw,10.5rem)]"
        title={<ServiceHeroTitle page={page} />}
        subtitle={page.hero.subtitle}
        // Primary hero CTA goes straight to the contact page on every service
        // and industry hero.
        primary={{ label: page.hero.cta, href: "/contact" }}
        secondary={{
          label: "Book free consultation",
          href: BOOKING_URL,
          external: true,
          // Pink "Book free consultation" button, matching the web services hero.
          className:
            "!border-[#ed1164] !bg-[#ed1164] !text-white shadow-xl shadow-[#ed1164]/50 hover:!bg-[#c50e53]",
        }}
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
            {page.intro.highlight ? (
              // helpdesk-style heading: short, two lines, one word in brand pink
              <h2
                className="mt-5 text-[clamp(2.2rem,5.5vw,5rem)] font-extrabold uppercase leading-[0.9] tracking-tight text-black"
                style={{ fontFamily: "var(--font-display)" }}
              >
                <span className="whitespace-nowrap">{page.intro.title}</span>
                <br />
                <span className="text-[#ed1164]">{page.intro.highlight}</span>
              </h2>
            ) : (
              <h2
                className="mt-5 text-4xl font-extrabold uppercase leading-[0.94] tracking-tight text-black sm:text-5xl lg:text-6xl"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {page.intro.title}
              </h2>
            )}
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
              <h2 className="mt-5 text-4xl font-extrabold leading-[1.05] tracking-tight text-black sm:text-5xl" style={{ fontFamily: "var(--font-display)" }}>
                {page.problems.title}
              </h2>
            </Reveal>

            <div className="mt-12 grid gap-5 lg:grid-cols-3">
              {page.problems.groups.map((group, index) => (
                <Reveal key={group.title} delay={index * 0.08}>
                  <div className="h-full rounded-2xl border border-slate-200 bg-white p-6">
                    <h3 className="text-xl font-extrabold text-black" style={{ fontFamily: "var(--font-display)" }}>
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

      {showCredentials && <CredentialsSection />}

      {page.faqs?.length ? <FaqSection faqs={page.faqs} /> : null}

      {/* Pillar -> cluster links. Guides that support this page's target
          keyword, linked with descriptive anchors so the topical cluster is
          explicit to crawlers and to AI answer engines. */}
      {page.relatedReading?.length ? (
        <section className="bg-slate-50 py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-6 sm:px-8">
            <Kicker>Further reading</Kicker>
            <h2
              className="mt-4 text-3xl font-extrabold uppercase tracking-tight text-black sm:text-4xl"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Guides on {page.name.toLowerCase()}
            </h2>
            <ul className="mt-8 grid list-none gap-4 p-0 sm:grid-cols-2 lg:grid-cols-3">
              {page.relatedReading.map((r) => (
                <li key={r.href}>
                  <Link
                    href={r.href}
                    className="group flex h-full flex-col gap-2 rounded-2xl border border-slate-200 bg-white p-5 transition-colors hover:border-[#ed1164]"
                  >
                    <span className="flex items-start justify-between gap-4">
                      <span className="text-base font-semibold text-black">{r.title}</span>
                      <ArrowUpRight className="h-5 w-5 shrink-0 text-[#ed1164] transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </span>
                    <span className="text-sm text-slate-600">{r.desc}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      {/* Contextual internal links to related services/industries with
          descriptive, keyword-rich anchor text (internal-linking / SEO). */}
      {related.length > 0 && (
        <section className="bg-white py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-6 sm:px-8">
            <Kicker>Explore more</Kicker>
            <h2
              className="mt-4 text-3xl font-extrabold uppercase tracking-tight text-black sm:text-4xl"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Related {sectionLabel.toLowerCase()}
            </h2>
            <ul className="mt-8 grid list-none gap-4 p-0 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((r) => (
                <li key={r.slug}>
                  <Link
                    href={`${basePath}/${r.slug}`}
                    className="group flex items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white p-5 transition-colors hover:border-[#ed1164]"
                  >
                    <span className="text-base font-semibold text-black">{r.name}</span>
                    <ArrowUpRight className="h-5 w-5 shrink-0 text-[#ed1164] transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* Final CTA rendered as the shared "How it works" style banner, with
          this page's own finalCta content. */}
      <ProcessIntroBanner
        title={page.finalCta.title}
        description={page.finalCta.desc}
        ctaLabel={page.finalCta.button}
        ctaHref="/contact"
      />

      <Footer />
    </main>
  );
}
