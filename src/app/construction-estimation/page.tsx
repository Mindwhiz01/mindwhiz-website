"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
  type Variants,
} from "framer-motion";
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
import { PageBanner } from "@/components/PageBanner";
import Footer from "@/components/Footer";
import CardCornerArrow from "@/components/CardCornerArrow";
import ProcessScroll from "@/components/ProcessScroll";

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

function Kicker({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#ed1164]">
      <span className="h-1.5 w-1.5 rounded-full bg-[#9CCC3C]" />
      {children}
      <span className="h-px w-12 bg-current/30" />
    </div>
  );
}

// What we deliver — core estimation capabilities.
const capabilities: { title: string; desc: string; Icon: LucideIcon; img: string }[] = [
  {
    title: "Quantity Takeoffs",
    desc: "Accurate material and labor takeoffs from drawings and specs, delivered in your preferred format.",
    Icon: Ruler,
    img: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=800&h=1000&q=80",
  },
  {
    title: "Cost Estimating",
    desc: "Detailed cost breakdowns with current regional pricing, markups, and contingencies.",
    Icon: Calculator,
    img: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=800&h=1000&q=80",
  },
  {
    title: "Bid Preparation",
    desc: "Complete, competitive bid packages assembled and reviewed against the scope of work.",
    Icon: ClipboardList,
    img: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&h=1000&q=80",
  },
  {
    title: "Value Engineering",
    desc: "Alternative materials and methods that protect margin without compromising the build.",
    Icon: PencilRuler,
    img: "https://images.unsplash.com/photo-1503389152951-9f343605f61e?auto=format&fit=crop&w=800&h=1000&q=80",
  },
  {
    title: "Project Planning",
    desc: "Phasing, scheduling support, and resource planning that keep bids grounded in reality.",
    Icon: Layers,
    img: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=800&h=1000&q=80",
  },
  {
    title: "Material Management",
    desc: "Vendor pricing, procurement lists, and quantity reconciliation from bid to build.",
    Icon: Boxes,
    img: "https://images.unsplash.com/photo-1517089152318-42ec560349c0?auto=format&fit=crop&w=800&h=1000&q=80",
  },
];

// Trades we estimate across — with CSI division, icon, stock image, and a
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
    img: "https://images.unsplash.com/photo-1621922688758-359fc864071e?auto=format&fit=crop&w=800&q=80",
    h: "h-80",
  },
  {
    name: "Structural Steel",
    csi: "05",
    Icon: Factory,
    img: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80",
    h: "h-64",
  },
  {
    name: "Electrical",
    csi: "26",
    Icon: Zap,
    img: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=800&q=80",
    h: "h-72",
  },
  {
    name: "Mechanical / HVAC",
    csi: "23",
    Icon: Wind,
    img: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=800&q=80",
    h: "h-80",
  },
  {
    name: "Plumbing",
    csi: "22",
    Icon: Droplets,
    img: "https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?auto=format&fit=crop&w=800&q=80",
    h: "h-64",
  },
  {
    name: "Drywall & Finishes",
    csi: "09",
    Icon: Paintbrush,
    img: "https://images.unsplash.com/photo-1595844730289-b0cb92b9d17f?auto=format&fit=crop&w=800&q=80",
    h: "h-72",
  },
  {
    name: "Sitework & Earthwork",
    csi: "31",
    Icon: Truck,
    img: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=800&q=80",
    h: "h-80",
  },
  {
    name: "Roofing",
    csi: "07",
    Icon: Home,
    img: "https://images.unsplash.com/photo-1632759145351-1d592919f522?auto=format&fit=crop&w=800&q=80",
    h: "h-64",
  },
  {
    name: "Millwork & Carpentry",
    csi: "06",
    Icon: Hammer,
    img: "https://images.unsplash.com/photo-1601564921647-b446839a013f?auto=format&fit=crop&w=800&q=80",
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
  { value: "24–48h", label: "Typical turnaround", Icon: Clock, bg: "#ed1164", fg: "#FFFFFF", chip: "bg-black/10", accent: "bg-black/30", border: "" },
  { value: "30%", label: "Average cost savings", Icon: TrendingDown, bg: "#FFFFFF", fg: "#111111", chip: "bg-[#9CCC3C]/15 text-[#ed1164]", accent: "bg-[#9CCC3C]", border: "border border-slate-200" },
];

const process = [
  { title: "Plans & Scope Intake", desc: "Send drawings, specs, and the bid deadline. We confirm scope, trades, and deliverable format." },
  { title: "Digital Takeoff", desc: "Estimators measure quantities on-screen with audited tools for consistent, traceable counts." },
  { title: "Price & Handover", desc: "We apply current material, labor, and equipment rates to build the priced estimate, then a senior estimator QA-checks the package before it lands in your inbox, ready to submit." },
];

const deliverables: { text: string; Icon: LucideIcon }[] = [
  { text: "Detailed quantity takeoff sheets by trade and division", Icon: FileSpreadsheet },
  { text: "Priced estimates with labor, material, and equipment splits", Icon: Calculator },
  { text: "Bid-ready proposal packages and summary cover sheets", Icon: ClipboardList },
  { text: "Marked-up plans showing measured areas and counts", Icon: Building2 },
  { text: "Vendor and subcontractor comparison worksheets", Icon: Boxes },
  { text: "Change-order and quantity reconciliation support", Icon: HardHat },
];

// ---------------------------------------------------------------------------
// Capabilities: a pinned big heading on the left, with the capability cards in
// a horizontal carousel on the right that scrubs left as the user scrolls —
// contained to its own column so the cards never slide over the heading.
// ---------------------------------------------------------------------------
const CARD_GAP = 20; // matches gap-5 on the row

function CapabilitiesCarousel() {
  const sectionRef = useRef<HTMLElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const [cardW, setCardW] = useState(300);
  const [distance, setDistance] = useState(0);

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
      // how many cards to show at once, then size each so exactly that many fit.
      const perView = w >= 768 ? 3 : w >= 560 ? 2 : 1;
      const cw = (w - CARD_GAP * (perView - 1)) / perView;
      setCardW(cw);
      const n = capabilities.length;
      const rowW = n * cw + (n - 1) * CARD_GAP;
      setDistance(Math.max(0, rowW - w));
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const total = String(capabilities.length).padStart(2, "0");

  return (
    <section
      ref={sectionRef}
      id="capabilities"
      className="relative bg-[#EEEEEE]"
      style={{ height: "260vh" }}
    >
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <div className="mx-auto grid w-full max-w-[1680px] items-center gap-10 px-6 sm:px-8 lg:grid-cols-[1.5fr_0.66fr]">
          {/* contained carousel viewport (left) */}
          <div ref={viewportRef} className="order-2 overflow-hidden lg:order-1">
            <motion.div style={{ x }} className="flex gap-5 will-change-transform">
              {capabilities.map(({ title, desc, Icon, img }, i) => (
                <article
                  key={title}
                  style={{ width: cardW }}
                  className="group relative flex h-[58vh] max-h-[600px] min-h-[340px] shrink-0 flex-col justify-end overflow-hidden rounded-2xl text-white transition-transform duration-300 hover:-translate-y-1.5"
                >
                  {/* background image */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={img}
                    alt={title}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* dark overlay — strengthens text contrast over the image */}
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
                    <p className="mt-2 text-sm leading-relaxed text-white/75">{desc}</p>
                    <a
                      href="#contact"
                      className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-[#ed1164]"
                    >
                      Learn more <ArrowUpRight className="h-3.5 w-3.5" />
                    </a>
                  </div>
                </article>
              ))}
            </motion.div>
          </div>

          {/* pinned big heading (right) */}
          <div className="order-1 lg:order-2">
            <Kicker>What we deliver</Kicker>
            <h2
              className="mt-6 text-[clamp(2.6rem,5.5vw,5rem)] font-extrabold uppercase leading-[0.9] tracking-tight text-black"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Estimation,
              <br />
              <span className="text-[#ed1164]">end to end.</span>
            </h2>
            <p className="mt-6 max-w-sm text-base leading-7 text-black/70">
              From the first set of drawings to the submitted bid, our estimators
              handle the measuring, pricing, and packaging — so your project
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
        image="https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1800&q=80"
        title={
          <>
            Win
            <br />
            More
            <br />
            <span className="text-[#ed1164]">Bids</span>
          </>
        }
        subtitle="Vetted offshore estimators deliver fast, accurate quantity takeoffs and bid-ready cost estimates — so your team quotes more work, faster, without carrying the overhead."
        primary={{ label: "Request an estimate", href: "#contact" }}
        secondary={{ label: "Explore capabilities", href: "#capabilities" }}
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
                  <span className={`mt-3 block h-0.5 w-8 rounded-full ${accent} transition-all duration-300 group-hover:w-16`} />
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
            From plans to a <span style={{ color: "#ed1164" }}>bid-ready</span> package.
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
                <span className="text-[#ed1164]">every trade.</span>
              </h2>
              <p className="mt-5 max-w-md text-base leading-7 text-black/70">
                Commercial, residential, and industrial — our estimators work
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
                    alt={name}
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
                    <span className="mb-2 block h-0.5 w-0 bg-[#9CCC3C] transition-all duration-500 group-hover:w-10" />
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
                <span className="text-[#ed1164]">your inbox.</span>
              </h2>
              <p className="mt-5 max-w-md text-base leading-7 text-black/70">
                Every engagement ends with a clean, organized package — reviewed,
                labeled, and ready to hand straight to the client or drop into
                your bid.
              </p>

              <div className="mt-8 space-y-3">
                {[
                  { Icon: Clock, title: "24–48 hour turnaround", sub: "From plans to a priced package" },
                  { Icon: BadgeCheck, title: "Senior estimator QA", sub: "Every file double-checked before send" },
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
                    All files QA-checked before send
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

      <Footer />
    </main>
  );
}
