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
  Users,
  UserPlus,
  UserCheck,
  Banknote,
  HeartHandshake,
  Building2,
  ShieldCheck,
  Award,
  GraduationCap,
  FileText,
  LineChart,
  CheckCircle2,
  Clock,
  BadgeCheck,
  FileSpreadsheet,
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

// What we handle - core HR capabilities.
const capabilities: { title: string; desc: string; Icon: LucideIcon; img: string }[] = [
  {
    title: "Recruiting & RPO",
    desc: "Sourcing, screening, and shortlists that fill roles fast with vetted candidates.",
    Icon: UserPlus,
    img: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=800&h=1000&q=80",
  },
  {
    title: "Payroll & Benefits",
    desc: "Accurate, on-time payroll plus benefits administration across regions.",
    Icon: Banknote,
    img: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=800&h=1000&q=80",
  },
  {
    title: "HRIS & Systems",
    desc: "Setup and management of your HR systems, data, and self-service workflows.",
    Icon: Building2,
    img: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=800&h=1000&q=80",
  },
  {
    title: "Onboarding",
    desc: "Structured onboarding that gets new hires productive from day one.",
    Icon: UserCheck,
    img: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=800&h=1000&q=80",
  },
  {
    title: "Compliance & Policy",
    desc: "Handbooks, policy, and labor-law compliance kept current and audit-ready.",
    Icon: ShieldCheck,
    img: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=800&h=1000&q=80",
  },
  {
    title: "Performance & L&D",
    desc: "Reviews, training, and development programs that grow and retain talent.",
    Icon: GraduationCap,
    img: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=800&h=1000&q=80",
  },
];

// Coverage - HR functions across the employee lifecycle.
const coverage: {
  name: string;
  tag: string;
  Icon: LucideIcon;
  img: string;
  h: string;
}[] = [
  {
    name: "Talent Acquisition",
    tag: "TA",
    Icon: UserPlus,
    img: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=800&q=80",
    h: "h-80",
  },
  {
    name: "Payroll",
    tag: "PAY",
    Icon: Banknote,
    img: "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=800&q=80",
    h: "h-64",
  },
  {
    name: "Benefits Admin",
    tag: "BEN",
    Icon: HeartHandshake,
    img: "https://images.unsplash.com/photo-1573497491765-dccce02b29df?auto=format&fit=crop&w=800&q=80",
    h: "h-72",
  },
  {
    name: "Onboarding",
    tag: "ONB",
    Icon: UserCheck,
    img: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=800&q=80",
    h: "h-80",
  },
  {
    name: "HRIS & Systems",
    tag: "HRIS",
    Icon: Building2,
    img: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=800&q=80",
    h: "h-64",
  },
  {
    name: "Compliance",
    tag: "COMP",
    Icon: ShieldCheck,
    img: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=800&q=80",
    h: "h-72",
  },
  {
    name: "Performance",
    tag: "PERF",
    Icon: Award,
    img: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=800&q=80",
    h: "h-80",
  },
  {
    name: "Learning & Dev",
    tag: "L&D",
    Icon: GraduationCap,
    img: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=800&q=80",
    h: "h-64",
  },
  {
    name: "Employee Relations",
    tag: "ER",
    Icon: Users,
    img: "https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?auto=format&fit=crop&w=800&q=80",
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
  { value: "10 days", label: "Average time-to-hire", Icon: Clock, bg: "#ed1164", fg: "#FFFFFF", chip: "bg-black/10", accent: "bg-black/30", border: "" },
  { value: "98%", label: "Offer acceptance rate", Icon: Target, bg: "#FFFFFF", fg: "#111111", chip: "bg-[#9CCC3C]/15 text-[#ed1164]", accent: "bg-[#9CCC3C]", border: "border border-slate-200" },
  { value: "40%", label: "Lower HR overhead", Icon: TrendingDown, bg: "#ed1164", fg: "#FFFFFF", chip: "bg-black/10", accent: "bg-black/30", border: "" },
  { value: "24/7", label: "Global coverage", Icon: Users, bg: "#FFFFFF", fg: "#111111", chip: "bg-[#9CCC3C]/15 text-[#ed1164]", accent: "bg-[#9CCC3C]", border: "border border-slate-200" },
];

const process = [
  { title: "Role Intake", desc: "We align on the role, must-haves, comp, and timeline, then agree on SLAs and cadence." },
  { title: "Source & Screen", desc: "We source, screen, and shortlist vetted candidates matched to your criteria." },
  { title: "Onboard & Manage", desc: "Offers, onboarding, payroll, and day-to-day HR run on a clear, compliant cadence." },
  { title: "Review & Report", desc: "Performance cycles, compliance checks, and reporting keep the team on track." },
];

const deliverables: { text: string; Icon: LucideIcon }[] = [
  { text: "Vetted candidate shortlists with scorecards", Icon: UserPlus },
  { text: "Offer letters, contracts, and onboarding packs", Icon: FileText },
  { text: "Payroll registers and benefits enrollment", Icon: Banknote },
  { text: "HRIS records, org charts, and self-service setup", Icon: Building2 },
  { text: "Compliant handbooks, policies, and filings", Icon: ShieldCheck },
  { text: "Headcount, retention, and engagement dashboards", Icon: LineChart },
];

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
                  className="group relative flex h-[58vh] max-h-[600px] min-h-[340px] shrink-0 flex-col justify-end overflow-hidden rounded-2xl text-white transition-transform duration-300 hover:-translate-y-1.5"
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
              People ops,
              <br />
              <span className="text-[#ed1164]">handled.</span>
            </h2>
            <p className="mt-6 max-w-sm text-base leading-7 text-black/70">
              From first hire to a full HR function, we run recruiting, payroll,
              systems, and compliance - so your leaders can focus on building the
              business.
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


export default function HrPage() {
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
        image="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1800&q=80"
        title={
          <>
            Build
            <br />
            Great
            <br />
            <span className="text-[#ed1164]">Teams</span>
          </>
        }
        subtitle="End-to-end HR - recruiting, payroll, HRIS, and compliance handled by vetted specialists, so you can grow the team without the overhead."
        primary={{ label: "Talk to HR", href: "#contact" }}
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

      {/* ===================== CAPABILITIES ===================== */}
      <CapabilitiesCarousel />

      {/* ===================== PROCESS ===================== */}
      <ProcessScroll
        steps={process}
        title={
          <>
            From open role to <span style={{ color: "#ed1164" }}>onboarded</span> hire.
          </>
        }
        ctaLabel="Book a consultation"
      />

      {/* ===================== COVERAGE (image masonry) ===================== */}
      <section className="relative overflow-hidden bg-white">
        <div className="pointer-events-none absolute -left-32 top-40 h-96 w-96 rounded-full bg-[#9CCC3C]/25 blur-[140px]" />
        <div className="relative mx-auto max-w-7xl px-6 py-24 sm:px-8">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
            <Reveal>
              <Kicker>Coverage</Kicker>
              <h2 className="mt-5 text-4xl font-bold leading-[1.05] tracking-tight text-black sm:text-5xl lg:text-6xl" style={{ fontFamily: "var(--font-display)" }}>
                Every role,
                <br />
                <span className="text-[#ed1164]">every stage.</span>
              </h2>
              <p className="mt-5 max-w-md text-base leading-7 text-black/70">
                Across the full employee lifecycle - from sourcing to offboarding -
                we cover the whole HR function or just the parts you need.
              </p>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="grid grid-cols-3 gap-px overflow-hidden rounded-2xl border border-slate-200 bg-slate-200 text-center">
                {[
                  { v: String(coverage.length).padStart(2, "0"), l: "Functions covered" },
                  { v: "3", l: "Global regions" },
                  { v: "98%", l: "Offer acceptance" },
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

          <div className="mt-14 gap-5 [column-fill:balance] sm:columns-2 lg:columns-3">
            {coverage.map(({ name, tag, Icon, img, h }, i) => (
              <Reveal key={name} delay={(i % 3) * 0.05} className="mb-5 break-inside-avoid">
                <article className={`group relative flex ${h} flex-col justify-end overflow-hidden rounded-2xl text-white`}>
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
            <Reveal>
              <Kicker>Deliverables</Kicker>
              <h2 className="mt-5 text-4xl font-bold leading-[1.05] tracking-tight text-black sm:text-5xl lg:text-6xl" style={{ fontFamily: "var(--font-display)" }}>
                What lands in
                <br />
                <span className="text-[#ed1164]">your inbox.</span>
              </h2>
              <p className="mt-5 max-w-md text-base leading-7 text-black/70">
                Every engagement ends with organized, compliant HR docs - ready to
                sign, file, or act on.
              </p>

              <div className="mt-8 space-y-3">
                {[
                  { Icon: Clock, title: "10-day time-to-hire", sub: "From intake to signed offer" },
                  { Icon: BadgeCheck, title: "Vetted, compliant candidates", sub: "Screened and reference-checked" },
                  { Icon: FileSpreadsheet, title: "Your ATS/HRIS or ours", sub: "Delivered in the tools you use" },
                ].map(({ Icon, title, sub }) => (
                  <div key={title} className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3">
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

            <Reveal delay={0.1}>
              <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl shadow-black/10">
                <div className="flex items-center justify-between bg-[#383838] px-5 py-4 text-white">
                  <div className="flex items-center gap-3">
                    <span className="grid h-10 w-10 place-items-center rounded-xl bg-[#9CCC3C] text-black">
                      <Inbox className="h-5 w-5" />
                    </span>
                    <div>
                      <p className="text-sm font-semibold" style={{ fontFamily: "var(--font-display)" }}>
                        onboarding-pack.zip
                      </p>
                      <p className="text-[11px] text-white/50">New-hire pack</p>
                    </div>
                  </div>
                  <span className="rounded-full bg-white/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-[#ed1164] ring-1 ring-[#9CCC3C]/40">
                    {deliverables.length} files
                  </span>
                </div>

                <ul>
                  {deliverables.map(({ text, Icon }, i) => (
                    <li key={text} className="group flex items-center gap-3 border-b border-slate-100 px-4 py-4 transition-colors last:border-b-0 hover:bg-[#9CCC3C]/[0.07] sm:gap-4 sm:px-5">
                      <span className="w-6 shrink-0 text-center text-sm font-bold text-slate-300" style={{ fontFamily: "var(--font-display)" }}>
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-[#9CCC3C]/15 text-[#ed1164] transition-colors group-hover:bg-[#9CCC3C] group-hover:text-black">
                        <Icon className="h-4 w-4" />
                      </span>
                      <p className="flex-1 text-sm font-medium leading-snug text-black">{text}</p>
                      <span className="hidden rounded-md bg-slate-100 px-2 py-1 text-[10px] font-bold tracking-wide text-slate-500 sm:inline-block">
                        {["PDF", "PDF", "XLSX", "XLSX", "PDF", "XLSX"][i]}
                      </span>
                      <CheckCircle2 className="h-5 w-5 shrink-0 text-[#ed1164]" />
                    </li>
                  ))}
                </ul>

                <div className="flex items-center justify-between gap-3 px-4 py-4 sm:px-5">
                  <span className="inline-flex items-center gap-2 text-xs text-black/50">
                    <BadgeCheck className="h-4 w-4 text-[#ed1164]" />
                    All docs compliance-checked
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-[#9CCC3C] px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-black">
                    Ready to onboard
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
