"use client";

// ---------------------------------------------------------------------------
// Why MindWhiz - company/about page. Content adapted from mindwhiz.com, built
// with the same chrome, motion language, and green theme as the home page.
// ---------------------------------------------------------------------------

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValueEvent,
  useScroll,
  type Variants,
} from "framer-motion";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import {
  ArrowRight,
  ArrowDown,
  ArrowUpRight,
  Rocket,
  ShieldCheck,
  Zap,
  Globe2,
  Quote,
  Mail,
  Phone,
  MapPin,
  type LucideIcon,
} from "lucide-react";
import { company } from "@/lib/content";
import Footer from "@/components/Footer";
import FaqSection, { type Faq } from "@/components/FaqSection";
import TrustedByClients from "@/components/TrustedByClients";
import Cta from "@/components/Cta";
import { SiteHeader } from "@/components/SiteHeader";
import { PageBanner } from "@/components/PageBanner";
import CardCornerArrow from "@/components/CardCornerArrow";
import { SLIDE_MS, useSlideSnap } from "@/lib/useSlideSnap";

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
    <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[#9CCC3C]">
      {children}
    </span>
  );
}

// ---------------------------------------------------------------------------
// The studio: a day-gradient bar with live local times across offices.
// ---------------------------------------------------------------------------
const studioCities = [
  { city: "United Kingdom", tz: "Europe/London", above: false },
  { city: "United States", tz: "America/Chicago", above: false },
  { city: "Pakistan", tz: "Asia/Karachi", above: true },
];

function cityClock(tz: string, now: Date | null) {
  if (!now) return { label: "--:--", pct: 50 };
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: tz,
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(now);
  const hh = Number(parts.find((p) => p.type === "hour")?.value ?? 0);
  const mm = Number(parts.find((p) => p.type === "minute")?.value ?? 0);
  const pct = ((hh + mm / 60) / 24) * 100;
  const label = `${String(hh).padStart(2, "0")}:${String(mm).padStart(2, "0")}`;
  return { label, pct };
}

function StudioSection() {
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 20000);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="bg-[#EEEEEE] text-[#2F343B]">
      <div className="mx-auto max-w-7xl px-6 py-24 sm:px-8">
        <Reveal>
          <div className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#9CCC3C]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#9CCC3C]" />
            The studio
            <span className="h-px w-12 bg-slate-300" />
          </div>
          <h2
            className="mt-6 max-w-xl text-[clamp(2.6rem,5.5vw,5rem)] font-extrabold uppercase leading-[0.9] tracking-tight text-black"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Always on.
          </h2>
          <p className="mt-5 max-w-lg text-sm leading-relaxed text-black">
            Sixty-five engineers headquartered in Lahore, with client-facing
            offices in the UK and the USA. Building since 2017 - somewhere, the
            studio is always at work.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="relative mx-auto mt-32 mb-24 max-w-5xl">
            {/* day gradient bar */}
            <div className="relative h-10 rounded-full bg-[linear-gradient(90deg,#383838_0%,#5E5E5E_22%,#B0B0B0_50%,#5E5E5E_78%,#383838_100%)] ring-1 ring-white/10">
              {/* segment dividers */}
              {[25, 50, 75].map((x) => (
                <span
                  key={x}
                  style={{ left: `${x}%` }}
                  className="pointer-events-none absolute top-1 bottom-1 w-px -translate-x-1/2 bg-white/10"
                />
              ))}

              {/* city markers */}
              {studioCities.map((c) => {
                const t = cityClock(c.tz, now);
                return (
                  <div
                    key={c.city}
                    style={{ left: `${t.pct}%` }}
                    className="absolute inset-y-0"
                  >
                    {/* dot on the bar */}
                    <span className="absolute left-0 top-1/2 h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#9CCC3C] shadow-[0_0_0_5px_rgba(156,204,60,0.18)]" />

                    {c.above ? (
                      <div className="absolute bottom-full left-0 mb-4 -translate-x-1/2 whitespace-nowrap text-center">
                        <p className="text-xl font-semibold text-[#2F343B]">{t.label}</p>
                        <p className="text-xs font-semibold text-[#767D86]">{c.city}</p>
                        <span className="mx-auto mt-2 block h-4 w-px bg-slate-300" />
                      </div>
                    ) : (
                      <div className="absolute top-full left-0 mt-4 -translate-x-1/2 whitespace-nowrap text-center">
                        <span className="mx-auto mb-2 block h-4 w-px bg-slate-300" />
                        <p className="text-xl font-semibold text-[#2F343B]">{t.label}</p>
                        <p className="text-xs font-semibold text-[#767D86]">{c.city}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* time-of-day scale */}
            <div className="mt-3 flex justify-between text-[10px] font-medium uppercase tracking-[0.18em] text-slate-400">
              <span>Midnight</span>
              <span>Dawn</span>
              <span>Noon</span>
              <span>Dusk</span>
              <span>Midnight</span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Page data
// ---------------------------------------------------------------------------
const values: { title: string; desc: string; Icon: LucideIcon; image: string }[] = [
  {
    title: "Compliant Workforce",
    desc: "Skilled talent aligned with regulations.",
    Icon: ShieldCheck,
    image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=2000&q=80",
  },
  {
    title: "Seamless Scalability",
    desc: "Effortless workforce expansion and flexibility.",
    Icon: Zap,
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=2000&q=80",
  },
  {
    title: "Rapid Deployment",
    desc: "Accelerated project execution and delivery.",
    Icon: Rocket,
    image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=2000&q=80",
  },
  {
    title: "Global Delivery",
    desc: "Worldwide solutions tailored for success.",
    Icon: Globe2,
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=2000&q=80",
  },
];

// ---------------------------------------------------------------------------
// Core values: a pinned, full-screen slide deck. Each value fills the
// viewport with a big image; one wheel gesture advances one value, and
// panels animate in/out on a timed transition - never parked half-faded.
// ---------------------------------------------------------------------------
const EASE = [0.22, 1, 0.36, 1] as const;

function ValuePanel({
  v,
  i,
  active,
}: {
  v: (typeof values)[number];
  i: number;
  active: number;
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
      {/* big image fit to the screen */}
      <motion.img
        src={v.image}
        alt={v.title}
        initial={false}
        animate={{ scale: isActive ? 1 : 1.15 }}
        transition={{ duration: 1.1, ease: EASE }}
        className="absolute inset-0 h-full w-full object-cover"
      />
      {/* layered overlays so the text stays crisp over any image */}
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

      {/* text written on the image */}
      <motion.div
        initial={false}
        animate={isActive ? { y: 0, opacity: 1 } : { y: 70, opacity: 0 }}
        transition={{ duration: SLIDE_MS / 1000, ease: EASE, delay: isActive ? 0.12 : 0 }}
        className="absolute inset-0 mx-auto flex max-w-6xl flex-col justify-end px-6 pb-28 sm:px-8"
      >
        <h3
          className="max-w-4xl text-[clamp(3rem,8vw,7.5rem)] font-extrabold uppercase leading-[0.86] tracking-tight text-white"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {v.title}
        </h3>
        <div className="mt-8 flex items-center gap-6">
          <span className="h-px w-16 shrink-0 bg-white/40" />
          <p className="max-w-md text-lg leading-relaxed text-white/85 sm:text-xl">
            {v.desc}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}

function CoreValuesScroll() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  const total = values.length;
  const [active, setActive] = useState(0);

  // Snap the visible value to whole steps no matter how the user scrolls.
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setActive(Math.min(total - 1, Math.max(0, Math.round(v * (total - 1)))));
  });

  // While the section is pinned, one wheel gesture moves exactly one value.
  useSlideSnap(ref, total);

  return (
    <section ref={ref} className="relative bg-black" style={{ height: `${total * 100}vh` }}>
      <div className="sticky top-0 h-screen overflow-hidden">
        {values.map((v, i) => (
          <ValuePanel key={v.title} v={v} i={i} active={active} />
        ))}

        {/* fixed heading overlay on top of the panels */}
        <div className="pointer-events-none absolute inset-x-0 top-0 z-10 mx-auto max-w-6xl px-6 pt-28 sm:px-8">
          <span className="text-xs font-semibold uppercase tracking-[0.22em] text-white/60">
            Why choose MindWhiz
          </span>
          <h2
            className="mt-4 max-w-lg text-[clamp(2rem,4vw,3.5rem)] font-extrabold uppercase leading-[0.95] tracking-tight text-white"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Talent, without the <span style={{ color: "#ed1164" }}>friction</span>.
          </h2>
        </div>

        {/* bottom progress bar - fills one segment per value */}
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

const testimonials = [
  { client: "Villa Tech", role: "CTO, USA", quote: "MindWhiz provided the perfect talent to boost our cybersecurity efficiently. Highly recommended!", logo: "/clients/villa-tech.png" },
  { client: "IT Partners", role: "CEO, Canada", quote: "MindWhiz delivered top talent, ensuring seamless integration and outstanding results." },
  { client: "Tempura", role: "CEO, USA", quote: "MindWhiz's staff augmentation seamlessly integrated with our team, boosting security." },
  { client: "Inovatiqa", role: "COO, USA", quote: "With MindWhiz's expert staff, we quickly strengthened and enhanced our cybersecurity capabilities.", logo: "/clients/inovatiqa.png" },
  { client: "Houston Club", role: "Miami, USA", quote: "MindWhiz provided the right talent to elevate our cybersecurity efforts efficiently." },
];

const hubs = [
  { country: "United States", city: "Houston, Texas", flag: "/hubs/us.jpg", fit: "cover" },
  { country: "United Kingdom", city: "London", flag: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=640&h=860&q=80", fit: "cover" },
  { country: "Pakistan", city: "Lahore", flag: "/hubs/pk.jpg", fit: "cover" },
];

const offerings = [
  { name: "IT Services", desc: "Helpdesk, cloud, security, and DevOps delivered by vetted engineers - built for uptime and scale.", img: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=640&h=860&q=80" },
  { name: "HR Services", desc: "RPO, payroll, HRIS, and compliance handled end to end so your people operations never stall.", img: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=640&h=860&q=80" },
  { name: "Construction Estimation", desc: "Quantity takeoffs, bid prep, and planning that speed up every project and tighten margins.", img: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=640&h=860&q=80" },
  { name: "Finance & Accounting", desc: "Bookkeeping, AP/AR, reporting, and CFO-level support from experienced finance professionals.", img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=640&h=860&q=80" },
  { name: "Digital Marketing", desc: "SEO, campaigns, CRM, and content operations that scale your pipeline around the clock.", img: "https://images.unsplash.com/photo-1533750349088-cd871a92f312?auto=format&fit=crop&w=640&h=860&q=80" },
];

const bannerStats = [
  { value: "2020", label: "Year founded" },
  { value: "500+", label: "Specialists deployed" },
  { value: "$2.4M", label: "Avg. annual savings" },
  { value: "99.8%", label: "Client retention" },
];

const storyHighlights = [
  {
    title: "Founder-led, values-driven.",
    desc: "MindWhiz is a founder-led, values-driven staffing firm on a mission to bridge the talent gap for modern businesses - headquartered in Houston, Texas, with an offshore talent hub in South Asia.",
  },
  {
    title: "Decades of hiring expertise.",
    desc: "Our leadership brings decades of experience in technical recruiting across the industries we serve - construction, IT and cybersecurity, and finance.",
  },
  {
    title: "Built for speed.",
    desc: "Clients get experts working on their projects within 48–72 hours, with an average full deployment time of 10 days from first call to productive team.",
  },
];

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------
const faqs: Faq[] = [
  {
    q: "What does MindWhiz actually do?",
    a: "We provide managed IT and security services, finance, HR, and construction back-office support, and staff augmentation - either as your whole function or as an extension of the team you already have.",
  },
  {
    q: "How is staff augmentation different from outsourcing a project?",
    a: "You are adding people to your team rather than handing over a deliverable. Augmented staff work inside your tools, processes, and standups, and you direct their priorities day to day.",
  },
  {
    q: "Which time zones can you cover?",
    a: "Coverage can be aligned to your working hours, including live overlap with UK and US teams, and round-the-clock cover where operations require it.",
  },
  {
    q: "How do you handle security, confidentiality, and IP?",
    a: "Under signed agreements, with access scoped to only the systems a role requires and activity logged. Delivery is aligned to SOC 2 and ISO 27001 practices, and your data and IP remain yours throughout.",
  },
  {
    q: "How does an engagement start?",
    a: "With a free consultation covering your current situation, the gaps, and the outcome you want. You get a scoped plan, clear pricing, and a practical next step before committing to anything.",
  },
];

export default function WhyMindWhizPage() {
  const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
  };
  const item: Variants = {
    hidden: { opacity: 0, y: 26 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
  };

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
        {/* ===================== HERO BANNER ===================== */}
        <PageBanner
          image="/banners/why-mindwhiz.png"
          title={
            <>
              Real <span className="text-[#9CCC3C]">teams.</span>
            </>
          }
          subtitle="MindWhiz started in 2020 with a conviction: great work comes from small teams of exceptional, vetted people - not armies of average ones. Since then, that conviction has grown into a 500+ specialist network deploying talent worldwide."
          primary={{ label: "Contact us", href: "/contact" }}
          secondary={{ label: "Read the story", href: "/about#story" }}
        />

        {/* ===================== ABOUT STATS ===================== */}
        <section className="bg-[#EEEEEE] py-16">
          <div className="mx-auto w-full max-w-6xl px-6 sm:px-8">
            <div className="grid grid-cols-2 overflow-hidden rounded-2xl border border-slate-200 bg-white sm:grid-cols-4">
              {bannerStats.map((s, i) => (
                <div
                  key={s.label}
                  className={`px-7 py-8 ${
                    i !== 0 ? "border-slate-200 sm:border-l" : ""
                  } ${i >= 2 ? "border-t border-slate-200 sm:border-t-0" : ""} ${
                    i === 1 ? "border-l border-slate-200 sm:border-l" : ""
                  }`}
                >
                  <div
                    className="text-4xl font-bold text-black sm:text-5xl"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {s.value}
                  </div>
                  <div className="mt-2 text-sm text-black">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===================== THE STORY ===================== */}
        <section id="story" className="relative scroll-mt-28 overflow-hidden bg-white py-24">
          <div className="relative mx-auto max-w-6xl px-6 sm:px-8">
            <Reveal>
              <div className="flex items-center gap-3">
                <span className="h-2 w-2 rounded-full bg-[#9CCC3C]" />
                <span className="text-xs font-semibold uppercase tracking-[0.22em] text-[#9CCC3C]">
                  The story
                </span>
                <span className="h-px w-12 bg-[#9CCC3C]/50" />
              </div>
              <h2
                className="mt-6 text-[clamp(2.6rem,5.5vw,5rem)] font-extrabold uppercase leading-[0.9] tracking-tight text-black"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Bridging the
                <br />
                <span style={{ color: "#ed1164" }}>talent</span> gap.
              </h2>
              <p className="mt-5 max-w-md text-base leading-relaxed text-black">
                MindWhiz is more than a service provider - it&apos;s your partner in
                building the future of your business.
              </p>
            </Reveal>

            <div className="mt-14 grid gap-5 sm:grid-cols-3">
              {storyHighlights.map((h, i) => (
                <Reveal key={h.title} delay={i * 0.08}>
                  <div className="h-full rounded-2xl border border-slate-200 p-6 transition-colors hover:bg-[#EEEEEE]">
                    <span className="text-2xl font-semibold text-[#9CCC3C]" style={{ fontFamily: "var(--font-display)" }}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3
                      className="mt-4 text-lg font-semibold text-black"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {h.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-black">{h.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ===================== VISION / MISSION ===================== */}
        <section className="relative overflow-hidden bg-white py-24">
          <div className="relative mx-auto max-w-6xl px-6 sm:px-8">
            {/* kicker */}
            <Reveal>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#ed1164]">
                MindWhiz&apos;s Talent Partnership
              </p>
            </Reveal>

            {/* big multi-line statement heading */}
            <Reveal delay={0.05}>
              <h2
                className="mt-6 max-w-4xl text-[clamp(2.2rem,4.8vw,4.2rem)] font-semibold uppercase leading-[1.08] tracking-tight text-black"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Scale smarter,
                <br />
                adapt faster ...
                <br />
                and innovate boldly
              </h2>
            </Reveal>

            {/* rule on the left, copy + cta on the right */}
            <div className="mt-14 grid items-start gap-10 lg:grid-cols-2">
              <Reveal delay={0.1}>
                <span className="mt-3 block h-px w-full max-w-md bg-black/25" />
              </Reveal>
              <Reveal delay={0.15}>
                <p className="text-xl leading-relaxed text-black">
                  Our mission is simple: to help you{" "}
                  <span className="text-[#ed1164]">scale smarter</span>, adapt faster, and
                  innovate boldly. With MindWhiz, you&apos;re not just hiring talent -
                  you&apos;re gaining a reliable partner dedicated to your{" "}
                  <span className="text-[#ed1164]">success</span>.
                </p>
                <Cta href="/#services" label="What we do" className="mt-8" />
              </Reveal>
            </div>
          </div>
        </section>

        {/* ===================== CORE VALUES (pinned full-screen scroll) ===================== */}
        <CoreValuesScroll />

        {/* ===================== GLOBAL PRESENCE / STATS ===================== */}
        <section className="relative overflow-hidden bg-white py-24">
          <div className="pointer-events-none absolute -left-32 -top-32 h-96 w-96 rounded-full bg-[#9CCC3C]/30 blur-[130px]" />
          <div className="relative mx-auto max-w-6xl px-6 sm:px-8">
            <Reveal className="max-w-xl text-left">
              <Kicker>Global presence</Kicker>
              <h2
                className="mt-4 text-[clamp(2.6rem,5.5vw,5rem)] font-extrabold uppercase leading-[0.9] tracking-tight text-black"
                style={{ fontFamily: "var(--font-display)" }}
              >
<span style={{ color: "#9CCC3C" }}>Global</span> delivery, built in.
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-black">
                With delivery hubs across the United States, the United Kingdom, and
                Pakistan, we serve clients across North America, the Middle East,
                Canada, and Australia - operations covered around the clock.
              </p>
            </Reveal>

            <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {hubs.map((h, i) => (
                <Reveal key={h.country} delay={i * 0.1}>
                  <article className="group relative flex h-[58vh] max-h-[600px] min-h-[360px] flex-col justify-end overflow-hidden rounded-2xl bg-[#383838] transition-transform duration-300 hover:-translate-y-1.5">
                    {/* landmark image */}
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={h.flag}
                      alt={`${h.country} - ${h.city}`}
                      loading="lazy"
                      className={`absolute inset-0 h-full w-full transition-transform duration-700 group-hover:scale-105 ${
                        h.fit === "contain" ? "object-contain p-2" : "object-cover"
                      }`}
                    />
                    {/* dark overlay for text contrast */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/55 to-black/20" />

                    <span className="absolute left-6 top-6 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/70">
                      {String(i + 1).padStart(2, "0")} / 03
                    </span>

                    <div className="relative p-7">
                      <span className="grid h-11 w-11 place-items-center rounded-xl bg-[#9CCC3C]/15 ring-1 ring-[#9CCC3C]/40 backdrop-blur">
                        <MapPin className="h-5 w-5 text-[#9CCC3C]" />
                      </span>
                      <h3
                        className="mt-4 text-2xl font-semibold leading-tight text-white drop-shadow"
                        style={{ fontFamily: "var(--font-display)" }}
                      >
                        {h.country}
                      </h3>
                      <p className="mt-1.5 text-sm font-medium uppercase tracking-[0.16em] text-[#9CCC3C]">
                        {h.city}
                      </p>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ===================== THE STUDIO (continuous day) ===================== */}
        <StudioSection />

        {/* ===================== SERVICES OFFERED ===================== */}
        <section className="relative overflow-hidden bg-[#EEEEEE] py-24">
          <div className="relative mx-auto max-w-6xl px-6 sm:px-8">
            <Reveal className="max-w-2xl">
              <Kicker>What we do</Kicker>
              <h2
                className="mt-4 text-[clamp(2.6rem,5.5vw,5rem)] font-extrabold uppercase leading-[0.9] tracking-tight text-black"
                style={{ fontFamily: "var(--font-display)" }}
              >
                One partner.
              </h2>
            </Reveal>

          </div>

          {/* auto-scrolling carousel - pauses on hover */}
          <div className="group/marquee relative mt-12 overflow-hidden [mask-image:linear-gradient(to_right,transparent,#000_5%,#000_95%,transparent)]">
            <div
              className="flex w-max gap-5 px-6 [animation:marqueeX_38s_linear_infinite] group-hover/marquee:[animation-play-state:paused] sm:px-8"
              style={{ willChange: "transform" }}
            >
              {[...offerings, ...offerings].map((o, i) => (
                <a
                  key={`${o.name}-${i}`}
                  href="/#services"
                  className="group relative flex h-[58vh] max-h-[600px] min-h-[360px] w-[330px] shrink-0 flex-col justify-end overflow-hidden rounded-2xl rounded-br-none bg-[#383838] transition-transform duration-300 hover:-translate-y-1.5"
                >
                  {/* stock image */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={o.img}
                    alt={o.name}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* dark overlay - strengthens text contrast over the image */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/70 to-black/40" />

                  <span className="absolute left-6 top-6 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/70">
                    {String((i % offerings.length) + 1).padStart(2, "0")} /{" "}
                    {String(offerings.length).padStart(2, "0")}
                  </span>

                  {/* detached corner arrow (notched pocket) */}
                  <CardCornerArrow bg="#EEEEEE" />

                  <div className="relative p-6">
                    <h3
                      className="text-xl font-semibold leading-tight text-white drop-shadow"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {o.name}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-white/75">{o.desc}</p>
                    <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-[#9CCC3C]">
                      Explore <ArrowUpRight className="h-3.5 w-3.5" />
                    </span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* ===================== TESTIMONIALS (shared carousel) ===================== */}
        <TrustedByClients />

        {/* ===================== CTA / CONTACT ===================== */}
        <section className="relative overflow-hidden bg-[#383838] py-24" data-header-dark>
          {/* stock background image with dark overlay so the text stays readable */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1800&q=80"
            alt=""
            aria-hidden
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/80 to-black/90" />
          <div className="pointer-events-none absolute -left-24 -top-24 h-[34rem] w-[34rem] rounded-full bg-[#9CCC3C]/20 blur-[160px]" />
          <div className="relative mx-auto max-w-4xl px-6 text-center sm:px-8">
            <Reveal>
              <h2
                className="text-[clamp(2.2rem,4.5vw,4rem)] font-extrabold uppercase leading-[0.95] tracking-tight text-white"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Build your team.
              </h2>
              <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-white/70">
                Tell us what you&apos;re trying to ship. We&apos;ll match you with vetted
                experts and get them productive fast.
              </p>
            </Reveal>

            <Reveal delay={0.1} className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <Cta href={`mailto:${company.email}`} label={company.email} />
              <Cta href={company.phoneHref} label={company.phone} variant="outline" />
            </Reveal>

            <Reveal delay={0.2}>
              <p className="mt-8 inline-flex items-center gap-2 text-sm text-white/50">
                <MapPin className="h-4 w-4 text-[#9CCC3C]" />
                {company.city}
              </p>
            </Reveal>
          </div>
        </section>
      </div>

      <FaqSection faqs={faqs} />

      <Footer />
    </main>
  );
}
