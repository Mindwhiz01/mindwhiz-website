"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  useInView,
  useTransform,
  type MotionValue,
  type Variants,
} from "framer-motion";
import { Inter, Oswald } from "next/font/google";
import {
  ArrowRight,
  BarChart3,
  CheckCircle2,
  ClipboardList,
  LineChart,
  Mail,
  MapPin,
  Megaphone,
  MousePointerClick,
  Phone,
  Play,
  Search,
  Share2,
  Sparkles,
  Target,
  type LucideIcon,
} from "lucide-react";
import { company } from "@/lib/content";
import { SiteHeader } from "@/components/SiteHeader";
import Footer from "@/components/Footer";
import Cta from "@/components/Cta";

const sans = Inter({ subsets: ["latin"], display: "swap" });
const display = Oswald({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

const ORANGE = "#ff4b00";
const BLUE = "#ed1164";
const CREAM = "#eee8e0";
const INK = "#3f3f3d";


const reveal: Variants = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};

const channels: { title: string; desc: string; Icon: LucideIcon }[] = [
  {
    title: "Performance Media",
    desc: "Paid search, paid social, retargeting, and conversion campaigns managed against clean acquisition goals.",
    Icon: Target,
  },
  {
    title: "SEO & Content",
    desc: "Technical SEO, topical content systems, landing pages, and reporting that lift organic visibility over time.",
    Icon: Search,
  },
  {
    title: "CRM & Lifecycle",
    desc: "Email, lead nurturing, automation, and segmentation that move prospects from first touch to close.",
    Icon: Mail,
  },
  {
    title: "Analytics & CRO",
    desc: "Tracking plans, dashboards, funnel analysis, and test cycles that turn spend into measurable learning.",
    Icon: LineChart,
  },
];

const bentoImages = [
  {
    src: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=900&q=80",
    title: "Campaign planning",
    meta: "Paid media",
    metric: "Search, social, retargeting, and budget pacing managed from one weekly plan.",
    className: "col-span-2 row-span-2 lg:col-span-5 lg:row-span-2",
  },
  {
    src: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=900&q=80",
    title: "Performance reporting",
    meta: "Attribution",
    metric: "Channel dashboards that separate spend, lead quality, pipeline, and conversion.",
    className: "col-span-2 lg:col-span-4",
  },
  {
    src: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=900&q=80",
    title: "Growth workshops",
    meta: "Planning",
    metric: "Focused planning sessions for positioning, offers, audiences, and campaign priorities.",
    className: "col-span-1 lg:col-span-3 lg:row-span-2",
  },
  {
    src: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=80",
    title: "Search Visibility",
    meta: "SEO",
    metric: "Technical SEO and content systems built around buyer intent.",
    className: "col-span-1 lg:col-span-2",
  },
  {
    src: "https://images.unsplash.com/photo-1557838923-2985c318be48?auto=format&fit=crop&w=900&q=80",
    title: "Social operations",
    meta: "Creative",
    metric: "Publishing, creative refreshes, and audience feedback loops.",
    className: "hidden lg:col-span-2 lg:block",
  },
  {
    src: "https://images.unsplash.com/photo-1556745757-8d76bdb6984b?auto=format&fit=crop&w=900&q=80",
    title: "CRM Workflows",
    meta: "Lifecycle",
    metric: "Email sequences and automation that keep leads moving after first contact.",
    className: "hidden lg:col-span-4 lg:row-span-2 lg:block",
  },
  {
    src: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=900&q=80",
    title: "Growth Planning",
    meta: "Roadmap",
    metric: "A prioritized backlog for campaigns, pages, content, and experiments.",
    className: "hidden lg:col-span-4 lg:block",
  },
  {
    src: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&w=900&q=80",
    title: "Creative Testing",
    meta: "CRO",
    metric: "Structured creative tests for ads, email, and landing page variants.",
    className: "hidden lg:col-span-4 lg:block",
  },
];

const proof = [
  { value: "30%", label: "Lower blended acquisition cost target" },
  { value: "90", label: "Day launch and optimization sprint" },
  { value: "24/7", label: "Campaign monitoring coverage" },
];

const process = [
  "Audit the market, tracking, funnel, and campaign economics.",
  "Build the channel plan, content calendar, landing pages, and measurement model.",
  "Launch paid, organic, CRM, and reporting operations with weekly optimization.",
  "Scale what proves efficient, pause what does not, and keep the team aligned.",
];

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
    <span className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.18em] text-current">
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {children}
      <span className="h-px w-12 bg-current/30" />
    </span>
  );
}

function CountPill({ value, label }: { value: string; label: string }) {
  return (
    <div className="border-l border-white/15 pl-5">
      <p className="text-3xl font-bold text-white" style={{ fontFamily: "var(--font-display)" }}>
        {value}
      </p>
      <p className="mt-2 text-xs font-semibold uppercase leading-relaxed tracking-[0.14em] text-white/45">
        {label}
      </p>
    </div>
  );
}

function FlowerMark({ className = "" }: { className?: string }) {
  return (
    <span aria-hidden className={`relative inline-block h-[1em] w-[1em] ${className}`}>
      {Array.from({ length: 8 }).map((_, index) => (
        <span
          key={index}
          className="absolute left-1/2 top-1/2 h-[0.28em] w-[0.9em] origin-left rounded-full bg-current"
          style={{ transform: `rotate(${index * 45}deg) translateY(-50%)` }}
        />
      ))}
      <span className="absolute left-1/2 top-1/2 h-[0.28em] w-[0.28em] -translate-x-1/2 -translate-y-1/2 rounded-full bg-current" />
    </span>
  );
}

function BentoTile({
  item,
  index,
  progress,
}: {
  item: (typeof bentoImages)[number];
  index: number;
  progress: MotionValue<number>;
}) {
  const configs = [
    { x: -34, y: -16, scale: 1.55 },
    { x: 0, y: -28, scale: 1.25 },
    { x: 28, y: -10, scale: 1.6 },
    { x: 38, y: 16, scale: 1.35 },
    { x: -30, y: 12, scale: 1.35 },
    { x: 36, y: 34, scale: 1.55 },
    { x: -22, y: 32, scale: 1.2 },
    { x: 0, y: 28, scale: 1.25 },
  ];
  const cfg = configs[index];
  const x = useTransform(progress, [0, 1], ["0vw", `${cfg.x}vw`]);
  const y = useTransform(progress, [0, 1], ["0vh", `${cfg.y}vh`]);
  const scale = useTransform(progress, [0, 1], [1, cfg.scale]);
  const radius = useTransform(progress, [0, 1], [18, 4]);

  return (
    <motion.div
      style={{ x, y, scale, borderRadius: radius }}
      className={`group relative min-h-0 overflow-hidden bg-[#ed1164] shadow-xl shadow-black/20 ring-1 ring-black/10 ${item.className}`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={item.src}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover opacity-55 mix-blend-luminosity transition-transform duration-700 group-hover:scale-[1.03]"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#ed1164]/95 via-[#ed1164]/68 to-[#ff4b00]/25" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,75,0,0.35),transparent_34%)]" />
      <div className="relative flex h-full flex-col justify-between p-5 sm:p-6">
        <div className="flex items-center justify-between gap-4">
          <span className="rounded-full border border-white/25 bg-white/10 px-3 py-1 text-[10px] font-extrabold uppercase tracking-[0.16em] text-white backdrop-blur">
            {item.meta}
          </span>
          <span
            className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-[#ff4b00]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            0{index + 1}
          </span>
        </div>

        <div>
          <h3
            className="max-w-xs text-xl font-extrabold uppercase leading-tight text-white sm:text-2xl lg:text-3xl"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {item.title}
          </h3>
          <p className="mt-3 max-w-sm text-sm leading-6 text-white/75">
            {item.metric}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

function ScrubbedBentoGallery() {
  return (
    <section className="bg-[#eee8e0] px-6 py-24 text-[#3f3f3d] sm:px-8">
      <div className="mx-auto max-w-7xl">
        <Reveal className="text-center">
          <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-[#ed1164]">
            Growth operations
          </p>
          <h2
            className="mx-auto mt-4 max-w-5xl text-4xl font-extrabold uppercase leading-[1.04] text-[#3f3f3d] sm:text-6xl"
            style={{ fontFamily: "var(--font-display)" }}
          >
            The channels we plan, launch, and improve every week.
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {bentoImages.map((item, index) => (
            <Reveal key={item.title} delay={index * 0.035}>
              <div className="group relative flex min-h-[21rem] overflow-hidden rounded-[2rem] bg-black p-5 text-white shadow-2xl shadow-black/25">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.src}
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/15" />
                <div className="absolute inset-0 shadow-[inset_0_-160px_120px_rgba(0,0,0,0.75)]" />
                <div className="relative flex h-full min-h-[21rem] flex-col justify-between">
                  <div className="flex items-center justify-between gap-4">
                    <span className="rounded-full border border-white/30 bg-white/10 px-3 py-1 text-[10px] font-extrabold uppercase tracking-[0.16em] backdrop-blur">
                      {item.meta}
                    </span>
                    <span className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-white/75">
                      0{index + 1}
                    </span>
                  </div>
                  <div>
                    <h3
                      className="text-3xl font-extrabold uppercase leading-none"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {item.title}
                    </h3>
                    <p className="mt-4 text-sm leading-6 text-white/78">{item.metric}</p>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// Clients shown as scattered, tilted cards (blob/rounded - not boxy), each with
// a short business note that appears on hover.
const serviceClients: {
  name: string;
  src: string;
  rot: number;
  y: number;
  size: string;
  desc: string;
}[] = [
  { name: "Alpha Bravo", src: "/clients/alpha-bravo.png", rot: -7, y: 20, size: "h-44 w-64 sm:h-48 sm:w-72", desc: "Construction & estimation firm scaling delivery with vetted remote teams." },
  { name: "Highland Redstone", src: "/clients/highland.png", rot: 6, y: -24, size: "h-40 w-60 sm:h-44 sm:w-64", desc: "Real-estate group streamlining back-office and marketing operations." },
  { name: "Inovatiqa", src: "/clients/inovatiqa.png", rot: -4, y: 32, size: "h-44 w-64 sm:h-48 sm:w-72", desc: "Technology company strengthening back-office accuracy and turnaround." },
  { name: "Jerdoni", src: "/clients/jerdoni.png", rot: 9, y: -12, size: "h-40 w-60 sm:h-44 sm:w-64", desc: "E-commerce brand growing with managed catalog and customer support." },
  { name: "Texas Diagnostic Labs", src: "/clients/texas.png", rot: -9, y: 28, size: "h-40 w-60 sm:h-44 sm:w-64", desc: "Healthcare lab improving reliability with dedicated IT and support." },
  { name: "Villa Tech", src: "/clients/villa-tech.png", rot: 5, y: -26, size: "h-44 w-64 sm:h-48 sm:w-72", desc: "IT services company scaling infrastructure with expert augmentation." },
];

function ClientsScatter() {
  return (
    <section
      className="relative overflow-hidden py-24 sm:py-28"
      style={{
        backgroundColor: "#eee8e0",
        backgroundImage: [
          "radial-gradient(38% 46% at 30% 82%, rgba(255,193,31,0.85), rgba(255,193,31,0) 72%)",
          "radial-gradient(34% 40% at 41% 58%, rgba(255,140,0,0.70), rgba(255,140,0,0) 70%)",
          "radial-gradient(42% 34% at 57% 30%, rgba(255,74,0,0.72), rgba(255,74,0,0) 70%)",
          "radial-gradient(30% 26% at 70% 17%, rgba(255,61,0,0.60), rgba(255,61,0,0) 72%)",
        ].join(", "),
      }}
    >
      <div className="relative mx-auto max-w-7xl px-6 sm:px-8">
        <div className="text-center">
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            className="inline-block text-xs font-extrabold uppercase tracking-[0.22em] text-[#ed1164]"
          >
            The clients
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto mt-4 max-w-4xl text-4xl font-extrabold uppercase leading-[1.02] text-[#3f3f3d] sm:text-6xl"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Brands that grow with us.
          </motion.h2>
        </div>

        <div className="mt-16 flex flex-wrap items-start justify-center gap-8 pb-28 sm:mt-20 sm:gap-12">
          {serviceClients.map((c, i) => (
            <motion.div
              key={c.name}
              initial={{ opacity: 0, y: 40, rotate: 0 }}
              whileInView={{ opacity: 1, y: 0, rotate: c.rot }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ type: "spring", stiffness: 180, damping: 16, delay: i * 0.09 }}
              whileHover={{ rotate: 0, y: -10, scale: 1.06, zIndex: 40 }}
              style={{ marginTop: c.y }}
              className="group relative z-0 shrink-0"
            >
              <div className={`flex items-center justify-center overflow-hidden rounded-[2.25rem] bg-white shadow-xl shadow-black/10 ring-1 ring-black/5 ${c.size}`}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={c.src}
                  alt={c.name}
                  loading="lazy"
                  className="h-full w-full object-contain p-4"
                />
              </div>

              {/* hover note */}
              <div className="pointer-events-none absolute left-1/2 top-full z-50 mt-3 w-64 -translate-x-1/2 translate-y-1 rounded-2xl bg-[#3f3f3d] p-4 text-center opacity-0 shadow-2xl shadow-black/30 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                <span className="absolute -top-1.5 left-1/2 h-3 w-3 -translate-x-1/2 rotate-45 bg-[#3f3f3d]" />
                <p className="text-sm font-extrabold uppercase tracking-wide text-white">{c.name}</p>
                <p className="mt-1.5 text-xs leading-relaxed text-white/70">{c.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Reels marquee - portrait video cards drifting on the left, big heading right.
const reels: { label: string; tag: string; img: string }[] = [
  { label: "Campaign Launch", tag: "Paid social", img: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&w=500&h=850&q=80" },
  { label: "Brand Film", tag: "Creative", img: "https://images.unsplash.com/photo-1492724441997-5dc865305da7?auto=format&fit=crop&w=500&h=850&q=80" },
  { label: "Product Teaser", tag: "Content", img: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=500&h=850&q=80" },
  { label: "Founder Story", tag: "Organic", img: "https://images.unsplash.com/photo-1522199755839-a2bacb67c546?auto=format&fit=crop&w=500&h=850&q=80" },
  { label: "Behind The Scenes", tag: "Reels", img: "https://images.unsplash.com/photo-1516251193007-45ef944ab0c6?auto=format&fit=crop&w=500&h=850&q=80" },
  { label: "Ad Creative", tag: "Performance", img: "https://images.unsplash.com/photo-1533750349088-cd871a92f312?auto=format&fit=crop&w=500&h=850&q=80" },
  { label: "Testimonial", tag: "Proof", img: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=500&h=850&q=80" },
  { label: "Case Study", tag: "Story", img: "https://images.unsplash.com/photo-1524749292158-7540c2494485?auto=format&fit=crop&w=500&h=850&q=80" },
];

function ReelsSection() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden bg-[#eee8e0] py-16 text-[#3f3f3d]">
      <div className="pointer-events-none absolute -left-24 bottom-0 h-96 w-96 rounded-full bg-[#ff4b00]/15 blur-[150px]" />

      <div className="relative z-10 mx-auto grid w-full max-w-[1700px] items-center gap-12 px-6 sm:px-8 lg:grid-cols-[1.4fr_0.6fr]">
        {/* left: drifting reels */}
        <div className="order-2 overflow-hidden text-white lg:order-1">
          <motion.div
            className="flex w-max gap-5"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 34, ease: "linear", repeat: Infinity }}
          >
            {[...reels, ...reels].map((r, i) => (
              <article
                key={i}
                className="group relative h-[60vh] max-h-[560px] min-h-[360px] w-[240px] shrink-0 overflow-hidden rounded-[1.75rem] ring-1 ring-white/10 sm:w-[280px]"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={r.img}
                  alt={r.label}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/10" />
                <span className="absolute left-1/2 top-1/2 grid h-14 w-14 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-[#ed1164] shadow-lg transition-transform duration-300 group-hover:scale-110">
                  <Play className="ml-0.5 h-6 w-6 fill-current" />
                </span>
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <span className="rounded-full border border-white/30 bg-white/10 px-3 py-1 text-[10px] font-extrabold uppercase tracking-[0.14em] backdrop-blur">
                    {r.tag}
                  </span>
                  <h3 className="mt-3 text-xl font-extrabold uppercase leading-tight" style={{ fontFamily: "var(--font-display)" }}>
                    {r.label}
                  </h3>
                </div>
              </article>
            ))}
          </motion.div>
        </div>

        {/* right: big heading */}
        <div className="order-1 lg:order-2">
          <span className="text-xs font-extrabold uppercase tracking-[0.22em] text-[#ed1164]">The reels</span>
          <h2 className="mt-4 text-[clamp(2.8rem,6vw,5.5rem)] font-extrabold uppercase leading-[0.92] tracking-tight text-[#1d1d1f]" style={{ fontFamily: "var(--font-display)" }}>
            Reels that
            <br />
            <span className="text-[#ed1164]">move brands.</span>
          </h2>
          <p className="mt-6 max-w-sm text-sm leading-7 text-[#3f3f3d]/80">
            Short-form video built to stop the scroll - scripted, shot, and cut for
            the platforms your audience actually uses.
          </p>
        </div>
      </div>
    </section>
  );
}

// Types the text out character-by-character when it scrolls into view. The
// untyped remainder is rendered transparent so the box never changes size.
function Typewriter({
  text,
  className = "",
  style,
  speed = 30,
}: {
  text: string;
  className?: string;
  style?: React.CSSProperties;
  speed?: number;
}) {
  const ref = useRef<HTMLHeadingElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setCount(text.length);
      return;
    }
    let raf = 0;
    let start = 0;
    const step = (t: number) => {
      if (!start) start = t;
      const c = Math.min(text.length, Math.floor((t - start) / speed));
      setCount(c);
      if (c < text.length) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [inView, text, speed]);

  return (
    <h3 ref={ref} className={className} style={style}>
      <span>{text.slice(0, count)}</span>
      <span
        aria-hidden
        className="ml-0.5 inline-block h-[0.85em] w-[3px] translate-y-[0.08em] animate-pulse bg-white align-middle"
      />
      <span className="opacity-0">{text.slice(count)}</span>
    </h3>
  );
}

// ---------------------------------------------------------------------------
// Brand showcase: sticky brand story on the right, a stream of big campaign
// images on the left - 3 per brand. Scrolling into a new brand's images swaps
// the story content with an animated transition.
// ---------------------------------------------------------------------------
const brandShowcase = [
  {
    name: "Velocity Retail",
    kicker: "E-commerce · Paid Media",
    desc: "A fashion retailer stuck at flat monthly revenue. We rebuilt their paid social funnel, refreshed creative weekly, and scaled spend only where ROAS held - revenue grew 2.4x in six months.",
    tags: ["Meta & TikTok Ads", "Creative testing", "Conversion tracking"],
    images: [
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=1400&q=80",
    ],
  },
  {
    name: "NovaTech",
    kicker: "SaaS · Demand Generation",
    desc: "A B2B software company with great product and zero pipeline. We paired an SEO content engine with LinkedIn ABM campaigns - qualified demos tripled and cost per lead dropped 48%.",
    tags: ["SEO content engine", "LinkedIn ABM", "Marketing automation"],
    images: [
      "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1400&q=80",
    ],
  },
  {
    name: "UrbanBites",
    kicker: "Hospitality · Social & Local",
    desc: "A restaurant group opening two new locations. We ran local awareness campaigns, influencer collabs, and a launch-week social blitz - both openings sold out their first weekend.",
    tags: ["Local campaigns", "Influencer collabs", "Launch strategy"],
    images: [
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1400&q=80",
    ],
  },
];

function BrandShowcaseSection() {
  const [active, setActive] = useState(0);
  const brand = brandShowcase[active];

  return (
    <section className="bg-[#eee8e0] text-[#3f3f3d]">
      <div className="mx-auto max-w-7xl px-6 py-24 sm:px-8">
        <Reveal>
          <Kicker>Brand stories</Kicker>
          <h2
            className="mt-5 max-w-2xl text-4xl font-extrabold uppercase leading-[1.02] sm:text-6xl"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Campaigns that <span className="text-[#ed1164]">built brands.</span>
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
          {/* left: big scrolling campaign images - 3 per brand */}
          <div className="flex flex-col gap-6">
            {brandShowcase.map((b, i) => (
              <motion.div
                key={b.name}
                onViewportEnter={() => setActive(i)}
                viewport={{ margin: "-45% 0px -45% 0px" }}
                className="flex flex-col gap-6"
              >
                {b.images.map((src, j) => (
                  <motion.div
                    key={src}
                    initial={{ clipPath: "inset(100% 0% 0% 0% round 2.5rem)" }}
                    whileInView={{ clipPath: "inset(0% 0% 0% 0% round 2.5rem)" }}
                    viewport={{ once: true, margin: "-15%" }}
                    transition={{ duration: 1, ease: [0.77, 0, 0.175, 1] }}
                    className="relative overflow-hidden rounded-[2.5rem]"
                  >
                    {/* mask wipe reveal + slow zoom-out for a cinematic feel */}
                    <motion.img
                      src={src}
                      alt={`${b.name} campaign visual ${j + 1}`}
                      loading="lazy"
                      initial={{ scale: 1.3 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true, margin: "-15%" }}
                      transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
                      className="h-[85vh] min-h-[32rem] w-full object-cover"
                    />
                    <span className="absolute bottom-5 left-5 rounded-full bg-black/40 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-white backdrop-blur-md">
                      {b.name} · {String(j + 1).padStart(2, "0")}
                    </span>
                  </motion.div>
                ))}
              </motion.div>
            ))}
          </div>

          {/* right: sticky brand story - swaps as the images scroll */}
          <div>
            <div className="lg:sticky lg:top-32">
              <AnimatePresence mode="wait">
                <motion.div
                  key={brand.name}
                  initial={{ opacity: 0, y: 34, filter: "blur(10px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -34, filter: "blur(10px)" }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                >
                  <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#ed1164]">
                    {String(active + 1).padStart(2, "0")} / {String(brandShowcase.length).padStart(2, "0")} · {brand.kicker}
                  </span>
                  <h3
                    className="mt-4 text-4xl font-extrabold uppercase leading-none sm:text-5xl"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {brand.name}
                  </h3>
                  <p className="mt-6 max-w-md text-sm leading-7 text-[#3f3f3d]/75">{brand.desc}</p>
                  <ul className="mt-8 space-y-3">
                    {brand.tags.map((tag) => (
                      <li key={tag} className="flex items-center gap-3 text-sm font-semibold">
                        <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[#ed1164]">
                          <CheckCircle2 className="h-4 w-4 text-white" />
                        </span>
                        {tag}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </AnimatePresence>

              {/* progress dots */}
              <div className="mt-10 flex gap-2">
                {brandShowcase.map((b, i) => (
                  <span
                    key={b.name}
                    className={`h-1.5 rounded-full transition-all duration-500 ${
                      i === active ? "w-10 bg-[#ed1164]" : "w-4 bg-[#3f3f3d]/20"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ScrollManifestoSection() {
  return (
    <section className="sticky top-0 z-0 flex h-screen flex-col items-center justify-center overflow-hidden bg-[#eee8e0] px-6">
      <div className="pointer-events-none absolute -left-32 -top-24 h-[42rem] w-[42rem] rounded-full bg-[#D5D8DE]/40 blur-[170px]" />
      <div className="pointer-events-none absolute -right-32 bottom-[-8rem] h-[38rem] w-[38rem] rounded-full bg-[#D5D8DE]/35 blur-[170px]" />

      <div
        className="absolute left-5 top-5 z-10 flex items-center gap-2 text-2xl font-bold uppercase leading-none text-white sm:left-8"
        style={{ fontFamily: "var(--font-display)" }}
      >
        <FlowerMark className="text-white" />
        Our manifesto
      </div>

      <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
        <motion.h2
          initial={{ opacity: 0, x: "18%" }}
          whileInView={{ opacity: 1, x: "0%" }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          style={{ fontFamily: "var(--font-display)" }}
          className="relative text-center text-7xl font-extrabold leading-[0.95] tracking-tight text-black sm:text-8xl lg:text-[11rem]"
          aria-label="The bond behind brand success"
        >
          The bond behind brand success
        </motion.h2>
      </div>
    </section>
  );
}

export default function ServicePage() {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const saved = localStorage.getItem("mw-theme");
    if (saved === "dark" || saved === "light") setTheme(saved);
  }, []);

  useEffect(() => {
    localStorage.setItem("mw-theme", theme);
  }, [theme]);

  return (
    <main
      className={`${sans.className} ${display.variable} overflow-clip bg-[#eee8e0] text-[#3f3f3d]`}
    >
      <SiteHeader theme={theme} />

        <section data-header-dark className="relative min-h-screen overflow-hidden bg-white p-[10px] text-white">
          <div className="relative flex min-h-[calc(100vh-20px)] overflow-hidden rounded-3xl bg-[#383838]">
          <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-35">
            {/* portrait pin video rotated 90° so it fills the landscape hero:
                sized width=100vh / height=100vw, then rotated a quarter turn */}
            <video
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              aria-hidden
              style={{ width: "100vh", height: "100vw" }}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rotate-[270deg] object-cover mix-blend-luminosity"
            >
              <source src="/hero-service.mp4" type="video/mp4" />
            </video>
          </div>
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/85 via-black/55 to-black/25" />

          {/* light-orange glow from the bottom-right */}
          <div className="pointer-events-none absolute -bottom-32 -right-32 h-[38rem] w-[38rem] rounded-full bg-[#ff4b00]/35 blur-[150px]" />

          <div className="relative flex min-h-[calc(100vh-20px)] items-end px-5 pb-10 pt-32 sm:px-8">
            <div className="w-full">
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              >
                <h1
                  className="max-w-[48rem] text-[clamp(4.2rem,11vw,12rem)] font-extrabold uppercase leading-[0.88] tracking-[-0.055em] text-white"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  Your
                  <br />
                  <span className="text-[#ed1164]">Digital</span>
                  <br />
                  Agency
                </h1>
              </motion.div>

              <div className="mt-8 flex flex-wrap gap-4 lg:hidden">
                <Cta href="/contact" label="Start a growth sprint" />
                <a
                  href="#bento"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-white px-7 py-3 text-sm font-extrabold uppercase tracking-[0.08em] text-white transition-colors hover:bg-white hover:text-[#ed1164]"
                >
                  View the system
                </a>
              </div>
            </div>
          </div>
          </div>
        </section>

        {/* manifesto pins in place while the statement below scrolls up and covers it */}
        <div className="relative">
        <ScrollManifestoSection />

        {/* manifesto statement - rises over the pinned manifesto and takes its place */}
        <section className="relative z-10 flex min-h-screen items-center justify-center bg-[#eee8e0] px-6 py-20">
          <motion.div
            initial={{ opacity: 0, y: 36 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="flex justify-center"
          >
            <Typewriter
              text="We bring strategy, creativity, and agile approach together to help brands connect with people, and turn that connection into real results."
              className="max-w-5xl rounded-[2rem] bg-black/90 px-6 py-5 text-[clamp(1.5rem,3vw,3.25rem)] font-bold uppercase leading-[1.02] tracking-[-0.02em] text-white shadow-2xl shadow-black/20 sm:px-10 sm:py-7"
              style={{ fontFamily: "var(--font-display)" }}
            />
          </motion.div>
        </section>
        </div>

        {/* clients - scattered, tilted cards */}
        <ClientsScatter />

        {/* reels - drifting portrait cards + big heading */}
        <ReelsSection />

        <section className="bg-[#eee8e0]">
          <div className="mx-auto max-w-7xl px-6 py-24 sm:px-8">
            <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
              {/* left - heading + supporting copy */}
              <Reveal>
                <span className="text-xs font-extrabold uppercase tracking-[0.18em] text-[#ed1164]">
                  What we operate
                </span>
                <h2
                  className="mt-5 text-4xl font-extrabold uppercase leading-[1.02] text-[#3f3f3d] sm:text-6xl"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  A complete digital marketing desk, built for execution.
                </h2>
                <p className="mt-6 max-w-xl text-base leading-7 text-[#3f3f3d]/75">
                  The work is not split across disconnected specialists. Strategy,
                  creative, media buying, technical SEO, automation, and reporting
                  run from one operating cadence, so every channel is tied to the
                  same commercial goal.
                </p>
              </Reveal>

              {/* right - staggered, offset service cards */}
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6">
                {channels.map(({ title, desc, Icon }, index) => (
                  <Reveal key={title} delay={index * 0.08}>
                    <div
                      className={`group h-full rounded-[2rem] border border-[#3f3f3d]/15 bg-[#fff8ed] p-6 transition-all duration-300 hover:-translate-y-1 hover:bg-[#ff4b00] hover:text-white ${
                        index % 2 === 1 ? "sm:translate-y-12" : ""
                      }`}
                    >
                      <span className="grid h-11 w-11 place-items-center rounded-full bg-[#ed1164] transition-colors duration-300 group-hover:bg-white">
                        <Icon className="h-5 w-5 text-white transition-colors duration-300 group-hover:text-[#ed1164]" />
                      </span>
                      <h3 className="mt-7 text-xl font-extrabold uppercase">{title}</h3>
                      <p className="mt-4 text-sm leading-6 opacity-75">{desc}</p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </section>

        <div id="bento">
          <ScrubbedBentoGallery />
        </div>

        <section className="bg-[#eee8e0] text-[#3f3f3d]">
          <div className="mx-auto grid max-w-7xl gap-12 px-6 py-24 sm:px-8 lg:grid-cols-[0.9fr_1.1fr]">
            <Reveal>
              <span className="text-xs font-extrabold uppercase tracking-[0.22em] text-[#ed1164]">
                Operating model
              </span>
              <h2
                className="mt-4 text-[clamp(2.8rem,6vw,5.5rem)] font-extrabold uppercase leading-[0.92] tracking-tight text-[#1d1d1f]"
                style={{ fontFamily: "var(--font-display)" }}
              >
                From audit
                <br />
                to
                <br />
                <span className="text-[#ed1164]">always-on optimization.</span>
              </h2>
              <p className="mt-6 max-w-md text-sm leading-7 text-[#3f3f3d]/75">
                Digital marketing compounds when the team keeps the same rhythm:
                measure, learn, create, launch, and improve. Our process is built
                around that rhythm.
              </p>
            </Reveal>

            <div className="space-y-4">
              {process.map((step, index) => (
                <Reveal key={step} delay={index * 0.06}>
                  <div className="grid gap-5 rounded-[2rem] border border-white/20 bg-white p-6 text-[#3f3f3d] shadow-sm sm:grid-cols-[4rem_1fr]">
                    <div
                      className="text-4xl font-extrabold text-[#ed1164]"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {String(index + 1).padStart(2, "0")}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 text-sm font-extrabold uppercase tracking-[0.14em] text-[#3f3f3d]">
                        <CheckCircle2 className="h-4 w-4 text-[#ed1164]" />
                        Step {index + 1}
                      </div>
                      <p className="mt-3 text-sm leading-7 text-[#3f3f3d]/70">{step}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#eee8e0] text-[#3f3f3d]">
          <div className="mx-auto max-w-7xl px-6 py-24 sm:px-8">
            <Reveal className="max-w-2xl">
              <span className="text-xs font-extrabold uppercase tracking-[0.18em] text-[#ed1164]">
                Deliverables
              </span>
              <h2
                className="mt-5 text-4xl font-extrabold uppercase leading-[1.02] sm:text-6xl"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Everything needed to run the growth engine.
              </h2>
            </Reveal>

            <div className="mt-12 grid gap-4 lg:grid-cols-3">
              {[
                { Icon: Megaphone, text: "Paid media campaign builds and weekly optimization" },
                { Icon: ClipboardList, text: "SEO roadmap, content briefs, and landing page direction" },
                { Icon: Share2, text: "Social publishing, creative testing, and audience insights" },
                { Icon: MousePointerClick, text: "Conversion tracking, events, tags, and attribution QA" },
                { Icon: BarChart3, text: "Executive dashboards with channel and funnel performance" },
                { Icon: Sparkles, text: "Creative refresh cycles for ads, emails, and campaign pages" },
              ].map(({ Icon, text }, index) => (
                <Reveal key={text} delay={index * 0.04}>
                  <div className="flex min-h-32 items-start gap-4 rounded-[2rem] border border-[#3f3f3d]/15 bg-[#fff8ed] p-5">
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#ed1164]">
                      <Icon className="h-5 w-5 text-white" />
                    </span>
                    <p className="text-sm font-semibold leading-7 text-[#3f3f3d]/75">{text}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <BrandShowcaseSection />

        <Footer />
    </main>
  );
}
