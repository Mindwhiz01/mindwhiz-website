"use client";

import { useEffect, useRef, useState } from "react";
import { motion, type Variants } from "framer-motion";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import {
  ArrowRight,
  ArrowUpRight,
  Ruler,
  Calculator,
  ClipboardList,
  Building2,
  HardHat,
  FileSpreadsheet,
  Layers,
  Boxes,
  PencilRuler,
  CheckCircle2,
  Clock,
  BadgeCheck,
  Factory,
  Zap,
  Wind,
  Droplets,
  Paintbrush,
  Truck,
  Home,
  Hammer,
  Inbox,
  Target,
  TrendingDown,
  type LucideIcon,
} from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { useBelowSm } from "@/lib/useBelowSm";
import { useCapabilitiesRide } from "@/lib/useCapabilitiesRide";
import { BOOKING_URL, PageBanner, PINK_CTA_CLASS } from "@/components/PageBanner";
import Footer from "@/components/Footer";
import FaqSection, { type Faq } from "@/components/FaqSection";
import CardCornerArrow from "@/components/CardCornerArrow";
import ProcessScroll from "@/components/ProcessScroll";
import { ProcessIntroBanner } from "@/components/ProcessIntroBanner";

const sans = Inter({ subsets: ["latin"], display: "swap", preload: false });
const display = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-display",
  display: "swap",
  preload: false,
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

function Kicker({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#ed1164]">
      <span className="h-1.5 w-1.5 rounded-full bg-[#9CCC3C]" />
      {children}
      <span className="h-px w-12 bg-current/30" />
    </div>
  );
}

// What we deliver - core estimation capabilities.
const capabilities: { title: string; desc: string; Icon: LucideIcon; img: string }[] = [
  {
    title: "Quantity Takeoffs",
    desc: "Accurate material and labor takeoffs from drawings and specs, delivered in your preferred format.",
    Icon: Ruler,
    img: "/images/stock/quantity-takeoffs-construction-estimating-services.webp",
  },
  {
    title: "Cost Estimating",
    desc: "Detailed cost breakdowns with current regional pricing, markups, and contingencies.",
    Icon: Calculator,
    img: "/images/stock/payroll-benefits-outsourced-hr-services.webp",
  },
  {
    title: "Bid Preparation",
    desc: "Complete, competitive bid packages assembled and reviewed against the scope of work.",
    Icon: ClipboardList,
    img: "/images/stock/bid-preparation-construction-estimating-services.webp",
  },
  {
    title: "Value Engineering",
    desc: "Alternative materials and methods that protect margin without compromising the build.",
    Icon: PencilRuler,
    img: "/images/stock/value-engineering-construction-estimating-services.webp",
  },
  {
    title: "Project Planning",
    desc: "Phasing, scheduling support, and resource planning that keep bids grounded in reality.",
    Icon: Layers,
    img: "/images/stock/project-planning-construction-estimating-services.webp",
  },
  {
    title: "Material Management",
    desc: "Vendor pricing, procurement lists, and quantity reconciliation from bid to build.",
    Icon: Boxes,
    img: "/images/stock/material-management-construction-estimating-services.webp",
  },
];

// Trades we estimate across - with CSI division, icon, stock image, and a
// masonry height class for visual rhythm.
const trades: {
  name: string;
  csi: string;
  Icon: LucideIcon;
  img: string;
  h: string;
}[] = [
  {
    name: "Concrete & Masonry",
    csi: "03 / 04",
    Icon: Building2,
    img: "/images/stock/concrete-masonry-takeoffs-cost-estimating.webp",
    h: "h-80",
  },
  {
    name: "Structural Steel",
    csi: "05",
    Icon: Factory,
    img: "/images/stock/structural-steel-takeoffs-cost-estimating.webp",
    h: "h-64",
  },
  {
    name: "Electrical",
    csi: "26",
    Icon: Zap,
    img: "/images/stock/electrical-takeoffs-cost-estimating.webp",
    h: "h-72",
  },
  {
    name: "Mechanical / HVAC",
    csi: "23",
    Icon: Wind,
    img: "/images/stock/mechanical-hvac-takeoffs-cost-estimating.webp",
    h: "h-80",
  },
  {
    name: "Plumbing",
    csi: "22",
    Icon: Droplets,
    img: "/images/stock/plumbing-takeoffs-cost-estimating.webp",
    h: "h-64",
  },
  {
    name: "Drywall & Finishes",
    csi: "09",
    Icon: Paintbrush,
    img: "/industries/construction-engineering.webp",
    h: "h-72",
  },
  {
    name: "Sitework & Earthwork",
    csi: "31",
    Icon: Truck,
    img: "/images/stock/sitework-earthwork-takeoffs-cost-estimating.webp",
    h: "h-80",
  },
  {
    name: "Roofing",
    csi: "07",
    Icon: Home,
    img: "/images/stock/roofing-takeoffs-cost-estimating.webp",
    h: "h-64",
  },
  {
    name: "Millwork & Carpentry",
    csi: "06",
    Icon: Hammer,
    img: "/images/stock/millwork-carpentry-takeoffs-cost-estimating.webp",
    h: "h-72",
  },
];

const proof: {
  value: string;
  label: string;
  Icon: LucideIcon;
  bg: string;
  fg: string;
  chip: string;
  accent: string;
  border: string;
}[] = [
  { value: "1,200+", label: "Bids estimated", Icon: ClipboardList, bg: "#ed1164", fg: "#FFFFFF", chip: "bg-black/10", accent: "bg-black/30", border: "" },
  { value: "±2%", label: "Takeoff accuracy target", Icon: Target, bg: "#FFFFFF", fg: "#111111", chip: "bg-[#9CCC3C]/15 text-[#ed1164]", accent: "bg-[#9CCC3C]", border: "border border-slate-200" },
  { value: "24 to 48h", label: "Typical turnaround", Icon: Clock, bg: "#ed1164", fg: "#FFFFFF", chip: "bg-black/10", accent: "bg-black/30", border: "" },
  { value: "30%", label: "Average cost savings", Icon: TrendingDown, bg: "#FFFFFF", fg: "#111111", chip: "bg-[#9CCC3C]/15 text-[#ed1164]", accent: "bg-[#9CCC3C]", border: "border border-slate-200" },
];

const process = [
  { title: "Plans & Scope Intake", desc: "Send drawings, specs, and the bid deadline. We confirm scope, trades, and deliverable format." },
  { title: "Digital Takeoff", desc: "Estimators measure quantities on screen with audited tools for consistent, traceable counts." },
  { title: "Price & Handover", desc: "We apply current material, labor, and equipment rates to build the priced estimate, then a senior estimator QA checks the package before it lands in your inbox, ready to submit." },
];

const deliverables: { text: string; Icon: LucideIcon }[] = [
  { text: "Detailed quantity takeoff sheets by trade and division", Icon: FileSpreadsheet },
  { text: "Priced estimates with labor, material, and equipment splits", Icon: Calculator },
  { text: "Bid ready proposal packages and summary cover sheets", Icon: ClipboardList },
  { text: "Marked up plans showing measured areas and counts", Icon: Building2 },
  { text: "Vendor and subcontractor comparison worksheets", Icon: Boxes },
  { text: "Change order and quantity reconciliation support", Icon: HardHat },
];

// ---------------------------------------------------------------------------
// Capabilities: a pinned big heading on the left, with the capability cards in
// a horizontal carousel on the right that scrubs left as the user scrolls -
// contained to its own column so the cards never slide over the heading.
// ---------------------------------------------------------------------------
const CARD_GAP = 20; // matches gap-5 on the row

function CapabilitiesCarousel() {
  const { sectionRef, viewportRef, rowRef, isMobile, cardW, sectionVh, needsRide } =
    useCapabilitiesRide(capabilities.length);

  const total = String(capabilities.length).padStart(2, "0");

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
        <div className="mx-auto grid w-full max-w-[1680px] items-center gap-10 px-6 sm:px-8 lg:grid-cols-[1.5fr_0.66fr]">
          {/* contained carousel viewport (left) - native swipe on mobile */}
          <div
            ref={viewportRef}
            className="order-2 -mx-6 overflow-x-auto px-6 [-ms-overflow-style:none] [scrollbar-width:none] sm:mx-0 sm:overflow-hidden sm:px-0 lg:order-1 [&::-webkit-scrollbar]:hidden"
          >
            <div
              ref={rowRef}
              className="flex snap-x snap-mandatory gap-5 sm:snap-none sm:will-change-transform"
            >
              {capabilities.map(({ title, desc, Icon, img }, i) => (
                <article
                  key={title}
                  style={{ width: isMobile ? undefined : cardW }}
                  className="group relative flex h-[calc(var(--vh)*58)] max-h-[600px] min-h-[340px] w-[78vw] max-w-[320px] shrink-0 snap-center flex-col justify-end overflow-hidden rounded-2xl rounded-br-none text-white transition-transform duration-300 hover:-translate-y-1.5 sm:w-auto sm:max-w-none"
                >
                  {/* background image */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={img}
                    alt={`${title} - construction estimating services`}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* dark overlay - strengthens text contrast over the image */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/70 to-black/40" />

                  {/* index label */}
                  <div className="absolute left-6 top-6 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/70">
                    <span className="grid h-8 w-8 place-items-center rounded-lg bg-white/10 ring-1 ring-white/15 backdrop-blur">
                      <Icon className="h-4 w-4 text-[#ed1164]" />
                    </span>
                    {String(i + 1).padStart(2, "0")} / {total}
                  </div>

                  {/* detached corner arrow (notched pocket) */}
                  <CardCornerArrow bg="#EEEEEE" />

                  <div className="relative p-6 pb-12">
                    <h3
                      className="text-xl font-semibold leading-tight drop-shadow"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {title}
                    </h3>
                    <p className="mt-2 pr-16 text-sm leading-relaxed text-white/75">{desc}</p>
                    <a
                      href="#contact"
                      className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-[#ed1164]"
                    >
                      Learn more <ArrowUpRight className="h-3.5 w-3.5" />
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* pinned big heading (right) */}
          <div className="order-1 lg:order-2">
            <Kicker>What we deliver</Kicker>
            <h2
              className="mt-6 text-[clamp(2.6rem,5.5vw,5rem)] font-extrabold uppercase leading-[0.9] tracking-tight text-black"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Construction estimation,
              <br />
              <span className="text-[#ed1164]">end to end</span>
            </h2>
            {/* audience-aware hook that pulls B2B readers in */}
            <p className="mt-6 text-xs font-semibold uppercase tracking-[0.18em] text-[#ed1164]">
              For B2B contractors and builders
            </p>
            <p className="mt-3 max-w-sm text-lg font-semibold leading-snug text-black/80" style={{ fontFamily: "var(--font-display)" }}>
              How many bids slip away while your team is stuck doing takeoffs?
            </p>
            <p className="mt-4 max-w-sm text-base leading-7 text-black/70">
              From the first set of drawings to the submitted bid, our estimators
              handle the measuring, pricing, and packaging, so your project
              managers stay focused on winning and building the work.
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
const faqs: Faq[] = [
  {
    q: "What do outsourced construction estimating services deliver?",
    a: "Outsourced construction estimating delivers material and labor quantity takeoffs from your drawings and specs, detailed cost breakdowns with regional pricing and markups, and complete bid packages reviewed against the scope of work, in the format your team already works in.",
  },
  {
    q: "Which construction estimating software and file formats do you work with?",
    a: "The industry standards including Bluebeam, PlanSwift, AutoCAD, and Revit, and we deliver in your preferred output format so estimates drop straight into your existing bid process.",
  },
  {
    q: "How are drawing revisions and addenda handled in takeoffs?",
    a: "Revisions are tracked against the original scope, so changed quantities and costs are reissued with what moved made explicit rather than quietly folded into a new total.",
  },
  {
    q: "How accurate are outsourced construction estimates?",
    a: "Takeoffs are built from your actual drawings and specs and priced against current regional rates, with markups and contingencies stated separately. Every quote shows its basis and assumptions so you can see exactly what has been included and what has not.",
  },
  {
    q: "How much do construction estimating services cost, and what is the turnaround?",
    a: "Pricing is per project or on an ongoing basis depending on your bid volume, with scope and cost itemized up front. Turnaround is confirmed against the drawing set and bid date before work starts.",
  },
];

export default function ConstructionEstimationPage() {
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

      {/* ===================== HERO ===================== */}
      <PageBanner
        image="/banners/construction-estimation.webp"
        h1="Outsourced Construction Estimating and Takeoff Services for US Contractors"
        titleLines={["Win", "More"]}
        rotateWords={["Bids", "Projects", "Contracts", "Deals"]}
        subtitle="Vetted offshore estimators deliver fast, accurate quantity takeoffs and bid ready cost estimates, so your team quotes more work, faster, without carrying the overhead."
        primary={{ label: "Request an estimate", href: "/contact" }}
        secondary={{ label: "Book free consultation", href: BOOKING_URL, external: true, className: PINK_CTA_CLASS }}
      />

      {/* ===================== PROOF STATS (colored cards) ===================== */}
      <section className="relative overflow-hidden bg-white">
        <div className="relative mx-auto max-w-7xl px-6 py-24 sm:px-8">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {proof.map(({ value, label, Icon, bg, fg, chip, accent, border }, i) => (
              <Reveal key={label} delay={i * 0.18}>
                <div
                  style={{ backgroundColor: bg, color: fg }}
                  className={`group relative h-full overflow-hidden rounded-2xl p-6 shadow-lg shadow-black/5 transition-transform duration-300 hover:-translate-y-1.5 ${border}`}
                >
                  <span className={`grid h-11 w-11 place-items-center rounded-xl ${chip}`}>
                    <Icon className="h-5 w-5" />
                  </span>

                  <p
                    className="mt-8 text-4xl font-extrabold sm:text-5xl"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {value}
                  </p>
                  <span className={`mt-3 block h-0.5 w-16 origin-left scale-x-50 rounded-full ${accent} transition-transform duration-300 group-hover:scale-x-100`} />
                  <p className="mt-3 text-xs font-semibold uppercase leading-relaxed tracking-[0.16em] opacity-80">
                    {label}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== CAPABILITIES (pinned heading + scroll carousel) ===================== */}
      <CapabilitiesCarousel />

      {/* ===================== PROCESS (pinned card-stack, one by one) ===================== */}
      <ProcessScroll
        steps={process}
        title={
          <>
            From plans to a <span style={{ color: "#9CCC3C" }}>bid ready</span> package.
          </>
        }
        ctaLabel="Start a takeoff"
      />

      {/* ===================== TRADES (image masonry) ===================== */}
      <section className="relative overflow-hidden bg-white">
        <div className="pointer-events-none absolute -left-32 top-40 h-96 w-96 rounded-full bg-[#9CCC3C]/25 blur-[140px]" />
        <div className="relative mx-auto max-w-7xl px-6 py-24 sm:px-8">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
            <Reveal>
              <Kicker>Coverage</Kicker>
              <h2
                className="mt-5 text-4xl font-bold leading-[1.05] tracking-tight text-black sm:text-5xl lg:text-6xl"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Every division,
                <br />
                <span className="text-[#ed1164]">every trade</span>
              </h2>
              <p className="mt-5 max-w-md text-base leading-7 text-black/70">
                Commercial, residential, and industrial, our estimators work
                across the full CSI breakdown to price the whole job or just the
                scopes you need.
              </p>
            </Reveal>

            {/* division counter strip */}
            <Reveal delay={0.1}>
              <div className="grid grid-cols-3 gap-px overflow-hidden rounded-2xl border border-slate-200 bg-slate-200 text-center">
                {[
                  { v: String(trades.length).padStart(2, "0"), l: "CSI trades priced" },
                  { v: "3", l: "Build sectors" },
                  { v: "±2%", l: "Takeoff accuracy" },
                ].map((s) => (
                  <div key={s.l} className="bg-white px-4 py-7">
                    <p
                      className="text-3xl font-extrabold text-black sm:text-4xl"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {s.v}
                    </p>
                    <p className="mt-2 text-[11px] font-semibold uppercase leading-tight tracking-[0.14em] text-black/55">
                      {s.l}
                    </p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          {/* masonry of trade cards */}
          <div className="mt-14 gap-5 [column-fill:balance] sm:columns-2 lg:columns-3">
            {trades.map(({ name, csi, Icon, img, h }, i) => (
              <Reveal key={name} delay={(i % 3) * 0.05} className="mb-5 break-inside-avoid">
                <article
                  className={`group relative flex ${h} flex-col justify-end overflow-hidden rounded-2xl text-white`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={img}
                    alt={`${name} takeoffs and cost estimating`}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-black/10 transition-colors duration-500 group-hover:from-[#1b1b1b]/95 group-hover:via-[#2a3517]/45" />

                  {/* CSI division badge */}
                  <div className="absolute left-4 top-4 flex items-center gap-2">
                    <span className="grid h-9 w-9 place-items-center rounded-xl bg-white/10 ring-1 ring-white/20 backdrop-blur">
                      <Icon className="h-4 w-4 text-[#ed1164]" />
                    </span>
                    <span className="rounded-full bg-black/35 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-white/85 backdrop-blur">
                      CSI {csi}
                    </span>
                  </div>

                  {/* big ghost index */}
                  <span
                    className="absolute right-4 top-3 text-5xl font-extrabold leading-none text-white/15 transition-colors duration-500 group-hover:text-[#ed1164]/30"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  <div className="relative p-5">
                    <span className="mb-2 block h-0.5 w-10 origin-left scale-x-0 bg-[#9CCC3C] transition-transform duration-500 group-hover:scale-x-100" />
                    <h3
                      className="text-lg font-semibold leading-tight drop-shadow sm:text-xl"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {name}
                    </h3>
                    <span className="mt-2 inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#ed1164] opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                      Price this scope <ArrowUpRight className="h-3.5 w-3.5" />
                    </span>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== DELIVERABLES (file manifest) ===================== */}
      <section className="relative overflow-hidden bg-[#EEEEEE]">
        <div className="pointer-events-none absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-[#9CCC3C]/20 blur-[140px]" />
        <div className="relative mx-auto max-w-7xl px-6 py-24 sm:px-8">
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
            {/* left: heading + quick facts */}
            <Reveal>
              <Kicker>Deliverables</Kicker>
              <h2
                className="mt-5 text-4xl font-bold leading-[1.05] tracking-tight text-black sm:text-5xl lg:text-6xl"
                style={{ fontFamily: "var(--font-display)" }}
              >
                What lands in
                <br />
                <span className="text-[#ed1164]">your inbox</span>
              </h2>
              <p className="mt-5 max-w-md text-base leading-7 text-black/70">
                Every engagement ends with a clean, organized package, reviewed,
                labeled, and ready to hand straight to the client or drop into
                your bid.
              </p>

              <div className="mt-8 space-y-3">
                {[
                  { Icon: Clock, title: "24 to 48 hour turnaround", sub: "From plans to a priced package" },
                  { Icon: BadgeCheck, title: "Senior estimator QA", sub: "Every file double checked before send" },
                  { Icon: FileSpreadsheet, title: "Excel, PDF, or your template", sub: "Delivered in the format you use" },
                ].map(({ Icon, title, sub }) => (
                  <div
                    key={title}
                    className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3"
                  >
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-[#9CCC3C]/15 text-[#ed1164]">
                      <Icon className="h-4 w-4" />
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-black">{title}</p>
                      <p className="text-xs text-black/50">{sub}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>

            {/* right: manifest card */}
            <Reveal delay={0.1}>
              <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl shadow-black/10">
                {/* header bar */}
                <div className="flex items-center justify-between bg-[#383838] px-5 py-4 text-white">
                  <div className="flex items-center gap-3">
                    <span className="grid h-10 w-10 place-items-center rounded-xl bg-[#9CCC3C] text-black">
                      <Inbox className="h-5 w-5" />
                    </span>
                    <div>
                      <p className="text-sm font-semibold" style={{ fontFamily: "var(--font-display)" }}>
                        estimate-package.zip
                      </p>
                      <p className="text-[11px] text-white/50">Handover deliverables</p>
                    </div>
                  </div>
                  <span className="rounded-full bg-white/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-[#ed1164] ring-1 ring-[#9CCC3C]/40">
                    {deliverables.length} files
                  </span>
                </div>

                {/* file rows */}
                <ul>
                  {deliverables.map(({ text, Icon }, i) => (
                    <li
                      key={text}
                      className="group flex items-center gap-3 border-b border-slate-100 px-4 py-4 transition-colors last:border-b-0 hover:bg-[#9CCC3C]/[0.07] sm:gap-4 sm:px-5"
                    >
                      <span
                        className="w-6 shrink-0 text-center text-sm font-bold text-slate-300"
                        style={{ fontFamily: "var(--font-display)" }}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-[#9CCC3C]/15 text-[#ed1164] transition-colors group-hover:bg-[#9CCC3C] group-hover:text-black">
                        <Icon className="h-4 w-4" />
                      </span>
                      <p className="flex-1 text-sm font-medium leading-snug text-black">{text}</p>
                      <span className="hidden rounded-md bg-slate-100 px-2 py-1 text-[10px] font-bold tracking-wide text-slate-500 sm:inline-block">
                        {["XLSX", "XLSX", "PDF", "PDF", "XLSX", "DOCX"][i]}
                      </span>
                      <CheckCircle2 className="h-5 w-5 shrink-0 text-[#ed1164]" />
                    </li>
                  ))}
                </ul>

                {/* footer stamp */}
                <div className="flex items-center justify-between gap-3 px-4 py-4 sm:px-5">
                  <span className="inline-flex items-center gap-2 text-xs text-black/50">
                    <BadgeCheck className="h-4 w-4 text-[#ed1164]" />
                    All files QA checked before send
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-[#9CCC3C] px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-black">
                    Ready to submit
                  </span>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <FaqSection faqs={faqs} />

      <ProcessIntroBanner
        title="Ready to win more bids?"
        description="Send your plans and deadline. We'll respond with accurate takeoffs and a bid ready package."
        ctaLabel="Start a takeoff"
        ctaHref="/contact"
      />

      <Footer />
    </main>
  );
}
