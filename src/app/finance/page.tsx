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
  BookOpen,
  Receipt,
  Wallet,
  FileText,
  Landmark,
  LineChart,
  Coins,
  Scale,
  Percent,
  CalendarClock,
  CheckCircle2,
  Clock,
  Target,
  TrendingDown,
  type LucideIcon,
} from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { PageBanner } from "@/components/PageBanner";
import Footer from "@/components/Footer";
import Cta from "@/components/Cta";
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

// What we handle - core finance capabilities.
const capabilities: { title: string; desc: string; Icon: LucideIcon; img: string }[] = [
  {
    title: "Bookkeeping",
    desc: "Day-to-day transaction recording, reconciliations, and clean books your accountant will thank you for.",
    Icon: BookOpen,
    img: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&h=1000&q=80",
  },
  {
    title: "Accounts Payable",
    desc: "Invoice processing, approvals, and on-time vendor payments with full audit trails.",
    Icon: Receipt,
    img: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=800&h=1000&q=80",
  },
  {
    title: "Accounts Receivable",
    desc: "Invoicing, collections, and cash application that keep working capital moving.",
    Icon: Wallet,
    img: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&h=1000&q=80",
  },
  {
    title: "Financial Reporting",
    desc: "Monthly close, P&L, balance sheet, and cash-flow statements delivered on schedule.",
    Icon: FileText,
    img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&h=1000&q=80",
  },
  {
    title: "Payroll & Compliance",
    desc: "Accurate payroll runs, filings, and compliance support across regions.",
    Icon: Landmark,
    img: "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=800&h=1000&q=80",
  },
  {
    title: "FP&A & CFO Support",
    desc: "Budgets, forecasts, and dashboards that turn numbers into decisions.",
    Icon: LineChart,
    img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&h=1000&q=80",
  },
];

// Coverage - finance functions we run, with a short tag, icon, image, height.
const coverage: {
  name: string;
  tag: string;
  Icon: LucideIcon;
  img: string;
  h: string;
}[] = [
  {
    name: "General Ledger",
    tag: "GL",
    Icon: BookOpen,
    img: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=800&q=80",
    h: "h-80",
  },
  {
    name: "Accounts Payable",
    tag: "AP",
    Icon: Receipt,
    img: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=800&q=80",
    h: "h-64",
  },
  {
    name: "Accounts Receivable",
    tag: "AR",
    Icon: Wallet,
    img: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80",
    h: "h-72",
  },
  {
    name: "Payroll",
    tag: "PAY",
    Icon: Landmark,
    img: "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=800&q=80",
    h: "h-80",
  },
  {
    name: "Bank Reconciliation",
    tag: "REC",
    Icon: Scale,
    img: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&w=800&q=80",
    h: "h-64",
  },
  {
    name: "Financial Reporting",
    tag: "RPT",
    Icon: FileText,
    img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
    h: "h-72",
  },
  {
    name: "Budgeting & FP&A",
    tag: "FP&A",
    Icon: LineChart,
    img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
    h: "h-80",
  },
  {
    name: "Tax Prep Support",
    tag: "TAX",
    Icon: Percent,
    img: "https://images.unsplash.com/photo-1586486855514-8c633cc6fd38?auto=format&fit=crop&w=800&q=80",
    h: "h-64",
  },
  {
    name: "Cash Flow Management",
    tag: "CASH",
    Icon: Coins,
    img: "https://images.unsplash.com/photo-1579621970795-87facc2f976d?auto=format&fit=crop&w=800&q=80",
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
  { value: "99.9%", label: "Reconciliation accuracy", Icon: Target, bg: "#ed1164", fg: "#FFFFFF", chip: "bg-black/10", accent: "bg-black/30", border: "" },
  { value: "5 days", label: "Average monthly close", Icon: CalendarClock, bg: "#FFFFFF", fg: "#111111", chip: "bg-[#9CCC3C]/15 text-[#ed1164]", accent: "bg-[#9CCC3C]", border: "border border-slate-200" },
  { value: "40%", label: "Lower back-office cost", Icon: TrendingDown, bg: "#ed1164", fg: "#FFFFFF", chip: "bg-black/10", accent: "bg-black/30", border: "" },
  { value: "24/7", label: "Follow-the-sun coverage", Icon: Clock, bg: "#FFFFFF", fg: "#111111", chip: "bg-[#9CCC3C]/15 text-[#ed1164]", accent: "bg-[#9CCC3C]", border: "border border-slate-200" },
];

const process = [
  { title: "Discovery & Setup", desc: "We map your chart of accounts, systems, and reporting needs, then agree on SLAs and cadence." },
  { title: "Secure Onboarding", desc: "Access is provisioned under least-privilege controls; historical data is cleaned and reconciled." },
  { title: "Operate & Report", desc: "Daily bookkeeping, AP/AR, and payroll run on a fixed rhythm, and a structured monthly close produces reviewed statements and the dashboards leadership needs." },
];

// Staff augmentation - core services, rendered as image cards matching the
// home-page industries design.
const coreServices: { title: string; desc: string; img: string }[] = [
  { title: "Accounts Payable & Receivable", desc: "Managing vendor payments and client collections efficiently.", img: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=800&h=1000&q=80" },
  { title: "Bookkeeping", desc: "Accurate recording of financial transactions across all periods.", img: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&h=1000&q=80" },
  { title: "Financial & Management Reporting", desc: "Detailed financial and performance reporting for decision-making.", img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&h=1000&q=80" },
  { title: "General Ledger Management", desc: "Maintaining and reconciling core accounting records.", img: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=800&h=1000&q=80" },
  { title: "Payroll Processing & Compliance", desc: "Accurate payroll execution with regulatory adherence.", img: "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=800&h=1000&q=80" },
  { title: "Tax Preparation Support", desc: "Assistance with tax calculations and filing processes.", img: "https://images.unsplash.com/photo-1586486855514-8c633cc6fd38?auto=format&fit=crop&w=800&h=1000&q=80" },
  { title: "Bank & Account Reconciliations", desc: "Matching financial records with bank statements for accuracy.", img: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&w=800&h=1000&q=80" },
];

const whyPoints = ["Process improvement", "Cost efficiency", "Remote accountants"];

// Service card matching the home-page industries card design: full-bleed
// image, dark gradient, index number top-left, scooped corner with a green
// circular arrow, and title + description + link pinned to the bottom.
function FinanceServiceCard({
  s,
  i,
}: {
  s: { title: string; desc: string; img: string };
  i: number;
}) {
  const total = String(coreServices.length).padStart(2, "0");
  return (
    <motion.a
      href="/contact"
      initial={{ opacity: 0, x: 80 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay: (i % 3) * 0.06, ease: [0.22, 1, 0.36, 1] }}
      className="group relative flex h-[420px] flex-col justify-end overflow-hidden rounded-2xl rounded-br-none text-white transition-transform duration-300 hover:-translate-y-1.5"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={s.img}
        alt={s.title}
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/70 to-black/40" />

      <span className="absolute left-6 top-6 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/70">
        {String(i + 1).padStart(2, "0")} / {total}
      </span>

      {/* scooped corner + green circular arrow */}
      <CardCornerArrow bg="#EEEEEE" />

      <div className="relative p-6 pb-12">
        <h3
          className="text-xl font-semibold leading-tight drop-shadow"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {s.title}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-white/75">{s.desc}</p>
        <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-[#9CCC3C]">
          Learn more <ArrowUpRight className="h-3.5 w-3.5" />
        </span>
      </div>
    </motion.a>
  );
}

// ---------------------------------------------------------------------------
// Capabilities: pinned big heading + horizontal scroll carousel (3 at a time).
// ---------------------------------------------------------------------------
const CARD_GAP = 20;

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
    <section ref={sectionRef} id="capabilities" className="relative bg-[#EEEEEE]" style={{ height: "260vh" }}>
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <div className="mx-auto grid w-full max-w-[1680px] items-center gap-10 px-6 sm:px-8 lg:grid-cols-[1.5fr_0.66fr]">
          {/* carousel (left) */}
          <div ref={viewportRef} className="order-2 overflow-hidden lg:order-1">
            <motion.div style={{ x }} className="flex gap-5 will-change-transform">
              {capabilities.map(({ title, desc, Icon, img }, i) => (
                <article
                  key={title}
                  style={{ width: cardW }}
                  className="group relative flex h-[58vh] max-h-[600px] min-h-[340px] shrink-0 flex-col justify-end overflow-hidden rounded-2xl rounded-br-none text-white transition-transform duration-300 hover:-translate-y-1.5"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={img}
                    alt={title}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/70 to-black/40" />

                  <div className="absolute left-6 top-6 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/70">
                    <span className="grid h-8 w-8 place-items-center rounded-lg bg-white/10 ring-1 ring-white/15 backdrop-blur">
                      <Icon className="h-4 w-4 text-[#ed1164]" />
                    </span>
                    {String(i + 1).padStart(2, "0")} / {total}
                  </div>

                  <CardCornerArrow bg="#EEEEEE" />

                  <div className="relative p-6 pb-12">
                    <h3 className="text-xl font-semibold leading-tight drop-shadow" style={{ fontFamily: "var(--font-display)" }}>
                      {title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-white/75">{desc}</p>
                    <a href="#contact" className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-[#ed1164]">
                      Learn more <ArrowUpRight className="h-3.5 w-3.5" />
                    </a>
                  </div>
                </article>
              ))}
            </motion.div>
          </div>

          {/* pinned heading (right) */}
          <div className="order-1 lg:order-2">
            <Kicker>What we handle</Kicker>
            <h2 className="mt-6 text-[clamp(2.6rem,5.5vw,5rem)] font-extrabold uppercase leading-[0.9] tracking-tight text-black" style={{ fontFamily: "var(--font-display)" }}>
              Finance,
              <br />
              <span className="text-[#ed1164]">handled.</span>
            </h2>
            <p className="mt-6 max-w-sm text-base leading-7 text-black/70">
              From daily bookkeeping to CFO-level analysis, we plug into your stack
              and run the numbers - so you get clean books, timely reports, and the
              insight to act on them.
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

// ---------------------------------------------------------------------------
// Coverage: cards fly in from all sides as the section scrolls up, settle into
// their masonry slots, then retreat the same way on scroll-up (scroll-linked).
// ---------------------------------------------------------------------------
// each card enters clearly from one side - left, right, or bottom.
const coverageDirs = [
  { x: -360, y: 0 },   // 01 · from left
  { x: 0, y: 260 },    // 02 · from bottom
  { x: 360, y: 0 },    // 03 · from right
  { x: 360, y: 0 },    // 04 · from right
  { x: -360, y: 0 },   // 05 · from left
  { x: 0, y: 260 },    // 06 · from bottom
  { x: -360, y: 0 },   // 07 · from left
  { x: 0, y: 260 },    // 08 · from bottom
  { x: 360, y: 0 },    // 09 · from right
];

function CoverageCard({
  item,
  i,
  progress,
}: {
  item: (typeof coverage)[number];
  i: number;
  progress: MotionValue<number>;
}) {
  const { name, tag, Icon, img, h } = item;
  const dir = coverageDirs[i % coverageDirs.length];
  const x = useTransform(progress, [0, 0.7], [dir.x, 0]);
  const y = useTransform(progress, [0, 0.7], [dir.y, 0]);
  const opacity = useTransform(progress, [0, 0.5], [0, 1]);

  return (
    <div className="mb-5 break-inside-avoid">
      <motion.article
        style={{ x, y, opacity }}
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

        <div className="absolute left-4 top-4 flex items-center gap-2">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-white/10 ring-1 ring-white/20 backdrop-blur">
            <Icon className="h-4 w-4 text-[#ed1164]" />
          </span>
          <span className="rounded-full bg-black/35 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-white/85 backdrop-blur">
            {tag}
          </span>
        </div>

        <span className="absolute right-4 top-3 text-5xl font-extrabold leading-none text-white/15 transition-colors duration-500 group-hover:text-[#ed1164]/30" style={{ fontFamily: "var(--font-display)" }}>
          {String(i + 1).padStart(2, "0")}
        </span>

        <div className="relative p-5">
          <span className="mb-2 block h-0.5 w-0 bg-[#9CCC3C] transition-all duration-500 group-hover:w-10" />
          <h3 className="text-lg font-semibold leading-tight drop-shadow sm:text-xl" style={{ fontFamily: "var(--font-display)" }}>
            {name}
          </h3>
          <span className="mt-2 inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#ed1164] opacity-0 transition-opacity duration-500 group-hover:opacity-100">
            See this service <ArrowUpRight className="h-3.5 w-3.5" />
          </span>
        </div>
      </motion.article>
    </div>
  );
}

function CoverageMasonry() {
  const masonryRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: masonryRef,
    offset: ["start end", "center center"],
  });
  const progress = useSpring(scrollYProgress, { stiffness: 80, damping: 26, restDelta: 0.001 });

  return (
    <section className="relative overflow-hidden bg-white">
      <div className="pointer-events-none absolute -left-32 top-40 h-96 w-96 rounded-full bg-[#9CCC3C]/25 blur-[140px]" />
      <div className="relative mx-auto max-w-7xl px-6 py-24 sm:px-8">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <Reveal>
            <Kicker>Coverage</Kicker>
            <h2 className="mt-5 text-4xl font-bold leading-[1.05] tracking-tight text-black sm:text-5xl lg:text-6xl" style={{ fontFamily: "var(--font-display)" }}>
              Every ledger,
              <br />
              <span className="text-[#ed1164]">every close.</span>
            </h2>
            <p className="mt-5 max-w-md text-base leading-7 text-black/70">
              Bookkeeping, payroll, reporting, and analysis - we cover the full
              finance function or just the pieces you need.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="grid grid-cols-3 gap-px overflow-hidden rounded-2xl border border-slate-200 bg-slate-200 text-center">
              {[
                { v: String(coverage.length).padStart(2, "0"), l: "Functions covered" },
                { v: "15+", l: "Accounting tools" },
                { v: "99.9%", l: "Reconciliation accuracy" },
              ].map((s) => (
                <div key={s.l} className="bg-white px-4 py-7">
                  <p className="text-3xl font-extrabold text-black sm:text-4xl" style={{ fontFamily: "var(--font-display)" }}>
                    {s.v}
                  </p>
                  <p className="mt-2 text-[11px] font-semibold uppercase leading-tight tracking-[0.14em] text-black/55">{s.l}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        <div ref={masonryRef} className="mt-14 gap-5 [column-fill:balance] sm:columns-2 lg:columns-3">
          {coverage.map((item, i) => (
            <CoverageCard key={item.name} item={item} i={i} progress={progress} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default function FinancePage() {
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
        image="https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1800&q=80"
        title={
          <>
            Close
            <br />
            The
            <br />
            <span className="text-[#ed1164]">Books</span>
          </>
        }
        subtitle="Vetted accountants handle your bookkeeping, AP/AR, payroll, and reporting - accurate numbers, faster closes, and up to 40% lower back-office cost."
        primary={{ label: "Talk to finance", href: "#contact" }}
        secondary={{ label: "Explore services", href: "#capabilities" }}
      />

      {/* ===================== PROOF STATS ===================== */}
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
                  <p className="mt-8 text-4xl font-extrabold sm:text-5xl" style={{ fontFamily: "var(--font-display)" }}>
                    {value}
                  </p>
                  <span className={`mt-3 block h-0.5 w-8 rounded-full ${accent} transition-all duration-300 group-hover:w-16`} />
                  <p className="mt-3 text-xs font-semibold uppercase leading-relaxed tracking-[0.16em] opacity-80">{label}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== WHY MINDWHIZ ===================== */}
      <section className="relative overflow-hidden bg-[#EEEEEE] text-black">
        <div className="pointer-events-none absolute -left-24 top-0 h-96 w-96 rounded-full bg-[#9CCC3C]/25 blur-[130px]" />
        <div className="relative mx-auto max-w-7xl px-6 py-24 sm:px-8">
          <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <Reveal>
              <Kicker>Why MindWhiz</Kicker>
              <h2 className="mt-5 text-4xl font-bold leading-[1.08] tracking-tight sm:text-5xl" style={{ fontFamily: "var(--font-display)" }}>
                Why choose MindWhiz for{" "}
                <span className="text-[#ed1164]">finance &amp; accounting</span>
              </h2>
              <p className="mt-5 max-w-xl text-base leading-7 text-black/70">
                Choosing the right partner for your finance and accounting needs is
                critical to your success. MindWhiz combines expertise, precision,
                and personalized solutions to help you build a stronger financial
                foundation.
              </p>

              <h3 className="mt-8 text-xl font-bold text-black" style={{ fontFamily: "var(--font-display)" }}>
                Expertise you can trust
              </h3>
              <p className="mt-3 max-w-xl text-sm leading-7 text-black/65">
                MindWhiz is the trusted partner for finance and accounting staff
                augmentation - delivering precise, compliant solutions with a
                personalized approach for each business. By streamlining processes
                and reducing costs, we help you increase efficiency and stay focused
                on growth, with skilled remote accountants and responsive execution.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                {whyPoints.map((p) => (
                  <span key={p} className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-4 py-2 text-sm font-medium text-black/80">
                    <CheckCircle2 className="h-4 w-4 text-[#ed1164]" />
                    {p}
                  </span>
                ))}
              </div>

              <div className="mt-8 flex flex-wrap gap-4">
                <Cta href="/contact" label="Contact us" />
                <a href="#capabilities" className="inline-flex items-center justify-center gap-2 rounded-md border border-black/20 bg-white px-6 py-3 text-sm font-semibold text-black transition-colors hover:bg-black/5">
                  Explore services
                </a>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="relative h-full min-h-[380px] overflow-hidden rounded-2xl ring-1 ring-black/10">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=1000&q=80"
                  alt="Finance and accounting team collaborating"
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-5 left-5 right-5 flex items-center gap-4 rounded-xl border border-white/15 bg-black/40 p-4 backdrop-blur">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-[#9CCC3C] text-black">
                    <TrendingDown className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-lg font-extrabold text-white" style={{ fontFamily: "var(--font-display)" }}>
                      Up to 40% lower cost
                    </p>
                    <p className="text-xs text-white/60">Skilled remote accountants, responsive execution</p>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ===================== CAPABILITIES ===================== */}
      <CapabilitiesCarousel />

      {/* ===================== PROCESS ===================== */}
      <ProcessScroll
        steps={process}
        title={
          <>
            From messy books to <span style={{ color: "#ed1164" }}>monthly</span> clarity.
          </>
        }
        ctaLabel="Book a consultation"
      />

      {/* ===================== COVERAGE (scroll-linked fly-in masonry) ===================== */}
      <CoverageMasonry />

      {/* ===================== STAFF AUGMENTATION (service lists) ===================== */}
      <section className="bg-[#EEEEEE]">
        <div className="mx-auto max-w-7xl px-6 py-24 sm:px-8">
          <Reveal className="max-w-2xl">
            <Kicker>Staff augmentation</Kicker>
            <h2 className="mt-5 text-4xl font-bold leading-[1.05] tracking-tight text-black sm:text-5xl lg:text-6xl" style={{ fontFamily: "var(--font-display)" }}>
              Expert accountants.
              <br />
              <span className="text-[#ed1164]">On demand.</span>
            </h2>
            <p className="mt-5 text-base leading-7 text-black/70">
              Expert accountants providing on-demand finance support through
              flexible staff augmentation, helping you maintain accuracy,
              compliance, and financial control.
            </p>
          </Reveal>

          {/* Group 1 - Core Financial Management */}
          <div className="mt-16">
            <Reveal>
              <div className="flex flex-col gap-5 border-b border-slate-300 pb-6 sm:flex-row sm:items-end sm:justify-between">
                <div className="max-w-xl">
                  <h3 className="text-2xl font-bold text-black sm:text-3xl" style={{ fontFamily: "var(--font-display)" }}>
                    Core Financial Management
                  </h3>
                  <p className="mt-2 text-sm leading-7 text-black/60">
                    Reliable accounting support that keeps your financial operations
                    accurate, compliant, and audit-ready.
                  </p>
                </div>
                <Cta href="/contact" label="Contact us" className="shrink-0" />
              </div>
            </Reveal>
            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {coreServices.map((s, i) => (
                <FinanceServiceCard key={s.title} s={s} i={i} />
              ))}
            </div>
          </div>

        </div>
      </section>

      <Footer />
    </main>
  );
}
