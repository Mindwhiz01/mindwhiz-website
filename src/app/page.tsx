"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useInView,
  type MotionValue,
  type Variants,
} from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import {
  Headset,
  Activity,
  ShieldCheck,
  Cloud,
  GitBranch,
  Laptop,
  Users,
  Calculator,
  Megaphone,
  Ruler,
  UserPlus,
  MonitorSmartphone,
  Globe2,
  BadgeCheck,
  Zap,
  Lock,
  Menu,
  X,
  Sun,
  Moon,
  ArrowRight,
  ArrowLeft,
  ArrowUpRight,
  ChevronRight,
  ChevronDown,
  Play,
  Pause,
  Check,
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Facebook,
  Instagram,
  Youtube,
  Twitter,
  type LucideIcon,
} from "lucide-react";
import {
  company,
  nav,
  hero,
  stats,
  services,
  industries,
  caseStudies,
  certifications,
  footerGroups,
} from "@/lib/content";
import Footer from "@/components/Footer";
import FaqSection, { type Faq } from "@/components/FaqSection";
import TrustedByClients from "@/components/TrustedByClients";
import Cta from "@/components/Cta";
import CardCornerArrow from "@/components/CardCornerArrow";
import GrowSection from "@/components/GrowSection";
import { SiteHeader } from "@/components/SiteHeader";
import ContactFormSection from "@/components/ContactFormSection";
import ClientsSection from "@/components/ClientsSection";
import ParticleBackground from "@/components/ParticleBackground";
import { useBelowSm } from "@/lib/useBelowSm";

const sans = Inter({ subsets: ["latin"], display: "swap" });
const display = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-display",
  display: "swap",
});

const ACCENT = "#9CCC3C";
const HERO_SLIDES = 2; // slide 0 = particle network, slide 1 = MindWhiz video

const iconMap: Record<string, LucideIcon> = {
  Headset,
  Activity,
  ShieldCheck,
  Cloud,
  GitBranch,
  Laptop,
  Users,
  Calculator,
  Megaphone,
  Ruler,
  UserPlus,
  MonitorSmartphone,
  Globe2,
  BadgeCheck,
  Zap,
  Lock,
};

// Local template content (insights cards, technology platforms, socials)
const insights = [
  {
    category: "Case Study",
    title: "Scaling a 24/7 IT helpdesk without the hiring lag",
    desc: "How a hybrid Tier 1–3 model cut response times and cost.",
    img: "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=1200&h=1400&q=80",
    href: "/case-studies",
  },
  {
    category: "White Paper",
    title: "Building a compliant SOC: SOC 2 & ISO 27001 in practice",
    desc: "A practical blueprint for security operations at scale.",
    img: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=900&h=700&q=80",
    href: "/newsletter",
  },
  {
    category: "Blog",
    title: "NOC vs SOC: where monitoring ends and security begins",
    desc: "Clarifying roles, tooling, and escalation paths.",
    img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=900&h=700&q=80",
    href: "/blog",
  },
  {
    category: "Case Study",
    title: "Construction estimation, delivered offshore",
    desc: "Faster takeoffs and bid prep with vetted estimators.",
    img: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&h=1400&q=80",
    href: "/case-studies",
  },
  {
    category: "Blog",
    title: "Staff augmentation that actually integrates",
    desc: "Onboarding playbooks that get specialists productive fast.",
    img: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&h=700&q=80",
    href: "/blog",
  },
  {
    category: "White Paper",
    title: "The economics of hybrid delivery",
    desc: "How onshore/offshore blends drive up to 30% cost savings.",
    img: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=900&h=700&q=80",
    href: "/newsletter",
  },
];

const certBadges = [
  { src: "/certs/gsoc.webp", alt: "GIAC Security Operations Certified (GSOC)" },
  { src: "/certs/oscp.webp", alt: "Offensive Security Certified Professional (OSCP)" },
  { src: "/certs/csa.webp", alt: "EC-Council Certified SOC Analyst (CSA)" },
  { src: "/certs/gwapt.webp", alt: "GIAC Web Application Penetration Tester (GWAPT)" },
  { src: "/certs/google-comptia.webp", alt: "Google Cybersecurity Certificate & CompTIA Security+" },
  { src: "/certs/ceh.webp", alt: "EC-Council Certified Ethical Hacker (CEH)" },
];

const socials: { label: string; Icon: LucideIcon }[] = [
  { label: "LinkedIn", Icon: Linkedin },
  { label: "Facebook", Icon: Facebook },
  { label: "Instagram", Icon: Instagram },
  { label: "YouTube", Icon: Youtube },
  { label: "Twitter", Icon: Twitter },
];

// ---------------------------------------------------------------------------
// Hero particle network (teal), light-on-dark. SSR-safe + reduced-motion aware.
// ---------------------------------------------------------------------------
function HeroParticles() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    type P = { x: number; y: number; vx: number; vy: number };
    let w = 0;
    let h = 0;
    let pts: P[] = [];
    const resize = () => {
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.max(34, Math.min(95, Math.floor((w * h) / 16000)));
      pts = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
      }));
    };
    resize();
    window.addEventListener("resize", resize);
    let raf = 0;
    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      for (const p of pts) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;
      }
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const a = pts[i];
          const b = pts[j];
          const dist = Math.hypot(a.x - b.x, a.y - b.y);
          if (dist < 145) {
            ctx.strokeStyle = `rgba(156,204,60,${(1 - dist / 145) * 0.3})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }
      for (const p of pts) {
        ctx.beginPath();
        ctx.fillStyle = "rgba(156,204,60,0.9)";
        ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
        ctx.fill();
      }
      if (!reduce) raf = requestAnimationFrame(draw);
    };
    draw();
    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(raf);
    };
  }, []);
  return <canvas ref={ref} className="absolute inset-0 h-full w-full" aria-hidden />;
}

// Rotating word - cycles through words in the same position, again and again.
function RotatingWord({
  words,
  icons,
  interval = 2200,
  className = "",
}: {
  words: string[];
  icons?: LucideIcon[];
  interval?: number;
  className?: string;
}) {
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setI((p) => (p + 1) % words.length), interval);
    return () => clearInterval(id);
  }, [words.length, interval]);
  const Icon = icons?.[i];
  return (
    <span className="inline-flex items-center gap-4 align-middle">
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={words[i]}
          initial={{ opacity: 0, y: "0.45em" }}
          animate={{ opacity: 1, y: "0em" }}
          exit={{ opacity: 0, y: "-0.45em" }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className={`inline-block whitespace-nowrap ${className}`}
        >
          {words[i]}
        </motion.span>
      </AnimatePresence>
      {Icon && (
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={words[i] + "-icon"}
            initial={{ opacity: 0, scale: 0.6, rotate: -35 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 0.6, rotate: 35 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="grid shrink-0 place-items-center text-[#ed1164]"
            style={{ width: "0.62em", height: "0.62em" }}
          >
            <Icon style={{ width: "0.5em", height: "0.5em" }} />
          </motion.span>
        </AnimatePresence>
      )}
    </span>
  );
}

function CountStat({
  value,
  label,
  className = "text-center",
  valueClassName = "text-4xl font-bold text-[#9CCC3C] sm:text-5xl",
  labelClassName = "mt-2 text-sm text-black",
}: {
  value: string;
  label: string;
  className?: string;
  valueClassName?: string;
  labelClassName?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [text, setText] = useState("0");
  useEffect(() => {
    if (!inView) return;
    const m = value.match(/^(\D*)([\d.]+)(.*)$/);
    if (!m) {
      setText(value);
      return;
    }
    const prefix = m[1];
    const target = parseFloat(m[2]);
    const suffix = m[3];
    const decimals = (m[2].split(".")[1] ?? "").length;
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / 1500);
      const eased = 1 - Math.pow(1 - t, 3);
      setText(prefix + (target * eased).toFixed(decimals) + suffix);
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value]);
  return (
    <div ref={ref} className={className}>
      <div className={valueClassName} style={{ fontFamily: "var(--font-display)" }}>
        {text}
      </div>
      <div className={labelClassName}>{label}</div>
    </div>
  );
}

// Stat card styled like the IndustriesWorlds cards: dark card, top-left
// counter, bottom-anchored content, and the scooped CardCornerArrow corner -
// but sized to the original 2x2 stat grid.
function StatCard({
  value,
  label,
  index,
  total,
  delay = 0,
}: {
  value: string;
  label: string;
  index: number;
  total: number;
  delay?: number;
}) {
  // brand color rotation: green / dark / pink / light
  const variants = [
    { bg: "bg-[#9CCC3C] text-black", counter: "text-black/60", sub: "text-black/70", arrow: "#ed1164", arrowText: "text-white" },
    { bg: "bg-[#1c1d21] text-white", counter: "text-white/70", sub: "text-white/75", arrow: "#9CCC3C", arrowText: "text-black" },
    { bg: "bg-[#ed1164] text-white", counter: "text-white/70", sub: "text-white/80", arrow: "#9CCC3C", arrowText: "text-black" },
    { bg: "bg-[#EEEEEE] text-black", counter: "text-black/50", sub: "text-black/65", arrow: "#ed1164", arrowText: "text-white" },
  ];
  const v = variants[(index - 1) % variants.length];
  return (
    <motion.a
      href="/contact"
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
      className={`group relative flex min-h-[14rem] flex-col justify-end overflow-hidden rounded-2xl rounded-br-none transition-transform duration-300 hover:-translate-y-1.5 ${v.bg}`}
    >
      <span className={`absolute left-6 top-6 text-[11px] font-semibold uppercase tracking-[0.2em] ${v.counter}`}>
        {String(index).padStart(2, "0")} / {String(total).padStart(2, "0")}
      </span>

      {/* scooped corner + circular arrow (section bg is white) */}
      <CardCornerArrow bg="#ffffff" accent={v.arrow} />

      <div className="relative p-6 pb-12 pr-20">
        <p
          className="text-4xl font-extrabold leading-none sm:text-5xl"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {value}
        </p>
        <p className={`mt-2 text-sm leading-relaxed ${v.sub}`}>{label}</p>
      </div>
    </motion.a>
  );
}

// Growth bar chart - bars rise on scroll, with a CAGR pill, like the reference.
function GrowthChart() {
  const bars = [
    { y: "2019", h: 26 },
    { y: "2020", h: 33 },
    { y: "2021", h: 42 },
    { y: "2022", h: 52 },
    { y: "2023", h: 63 },
    { y: "2024", h: 74 },
    { y: "2025", h: 84 },
    { y: "2026", h: 100 },
  ];
  return (
    <motion.a
      href="/contact"
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className="group relative flex h-full min-h-[22rem] flex-col justify-end overflow-hidden rounded-2xl rounded-tl-none bg-[#1c1d21] text-white transition-transform duration-300 hover:-translate-y-1.5"
    >
      {/* scooped corner + circular arrow, top-left (section bg is white) */}
      <CardCornerArrow bg="#ffffff" accent="#9CCC3C" corner="top-left" />

      <span className="absolute right-6 top-6 rounded-full bg-white px-4 py-1.5 text-[11px] font-semibold text-black sm:right-8 sm:top-8">
        34% CAGR
      </span>

      <div className="relative p-6 pb-8 pt-28 sm:p-8 sm:pb-10 sm:pt-28">
        <div className="flex h-56 items-end gap-1.5 sm:gap-2.5">
          {bars.map((b, i) => (
            <motion.div
              key={b.y}
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.7, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
              style={{ height: `${b.h}%`, transformOrigin: "bottom" }}
              className="flex-1 rounded-t-md bg-gradient-to-t from-[#9CCC3C] to-[#d6ee9e]"
            />
          ))}
        </div>
        <div className="mt-3 flex gap-1.5 sm:gap-2.5">
          {bars.map((b) => (
            <span key={b.y} className="flex-1 text-center text-[10px] text-white/45">
              {b.y}
            </span>
          ))}
        </div>
      </div>
    </motion.a>
  );
}

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

// Split CTA - a dark pill with the label beside a detached green arrow square.
function ArrowCta({
  href,
  label,
  className = "",
}: {
  href: string;
  label: string;
  className?: string;
}) {
  return <Cta href={href} label={label} className={className} />;
}

// ---------------------------------------------------------------------------
// Studio clock: a day-gradient bar with live local times across offices.
// ---------------------------------------------------------------------------
const studioCities = [
  { city: "United Kingdom", tz: "Europe/London", above: false },
  { city: "United States", tz: "America/New_York", above: true },
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

function StudioClockSection() {
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 20000);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="hidden bg-[#EEEEEE] text-[#2F343B] md:block">
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
            Hybrid staffing, always on
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
              {(() => {
                // Two zones can land close together on the bar (e.g. US/UK are
                // only ~5h apart), and their labels would otherwise overlap -
                // stagger same-side labels to a second tier so they never share
                // a vertical band, regardless of how close the dots get.
                let belowSeen = 0;
                let aboveSeen = 0;
                return studioCities.map((c) => {
                  const t = cityClock(c.tz, now);
                  const tier = c.above ? aboveSeen++ : belowSeen++;
                  return (
                    <div
                      key={c.city}
                      style={{ left: `${t.pct}%` }}
                      className="absolute inset-y-0"
                    >
                      {/* dot on the bar */}
                      <span className="absolute left-0 top-1/2 h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#9CCC3C] shadow-[0_0_0_5px_rgba(156,204,60,0.18)]" />

                      {c.above ? (
                        <div
                          className="absolute bottom-full left-0 -translate-x-1/2 whitespace-nowrap text-center"
                          style={{ marginBottom: tier === 0 ? "1rem" : "5rem" }}
                        >
                          <p className="text-xl font-semibold text-[#2F343B]">{t.label}</p>
                          <p className="text-xs font-semibold text-[#767D86]">{c.city}</p>
                          <span className="mx-auto mt-2 block h-4 w-px bg-slate-300" />
                        </div>
                      ) : (
                        <div
                          className="absolute top-full left-0 -translate-x-1/2 whitespace-nowrap text-center"
                          style={{ marginTop: tier === 0 ? "1rem" : "5rem" }}
                        >
                          <span className="mx-auto mb-2 block h-4 w-px bg-slate-300" />
                          <p className="text-xl font-semibold text-[#2F343B]">{t.label}</p>
                          <p className="text-xs font-semibold text-[#767D86]">{c.city}</p>
                        </div>
                      )}
                    </div>
                  );
                });
              })()}
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
// Industries: horizontal "worlds" carousel.
// ---------------------------------------------------------------------------
const industryCategories = [
  {
    heading: "Technology & Digital",
    items: [
      {
        name: "Information Technology",
        slug: "information-technology",
        desc: "Software, cloud, and cybersecurity teams that ship faster and run secure infrastructure at scale.",
        img: "/industries/information-technology.png",
      },
      {
        name: "E-commerce & Retail",
        slug: "ecommerce-retail",
        desc: "Catalog, support, and operations that keep storefronts running around the clock.",
        img: "/industries/ecommerce-retail.png",
      },
      {
        name: "Startups & SMBs",
        slug: "startups-smbs",
        desc: "Flexible, cost-effective teams that scale exactly as fast as you grow.",
        img: "/industries/startups-smbs.png",
      },
    ],
  },
  {
    heading: "Built & Physical",
    items: [
      {
        name: "Construction & Engineering",
        slug: "construction-engineering",
        desc: "Estimation, takeoffs, and engineering support that speed up bids and keep projects moving.",
        img: "/industries/construction-engineering.png",
      },
      {
        name: "Real Estate",
        slug: "real-estate",
        desc: "Listing, transaction, and operations support that keeps teams focused on deals, not admin.",
        img: "/industries/real-estate.png",
      },
      {
        name: "Industrial Manufacturing",
        slug: "industrial-manufacturing",
        desc: "Engineering, back-office, and IT support that keep operations efficient and connected.",
        img: "/industries/industrial-manufacturing.png",
      },
    ],
  },
  {
    heading: "Finance & Services",
    items: [
      {
        name: "Accounting & Finance",
        slug: "accounting-finance",
        desc: "Bookkeeping, reporting, and finance operations handled by vetted professionals.",
        img: "/industries/accounting-finance.png",
      },
      {
        name: "Professional Services",
        slug: "professional-services",
        desc: "Research, operations, and back-office support for consulting and professional firms.",
        img: "/industries/professional-services.png",
      },
      {
        name: "Logistics & Supply Chain",
        slug: "logistics-supply-chain",
        desc: "Coordination, tracking, and back-office support that keep goods moving.",
        img: "/industries/logistics-supply-chain.png",
      },
    ],
  },
  {
    heading: "Healthcare",
    items: [
      {
        name: "Healthcare & HealthTech",
        slug: "healthcare-healthtech",
        desc: "Compliant talent and support for care operations and health technology platforms.",
        img: "/industries/healthcare-healthtech.png",
      },
    ],
  },
];

const industryWorlds = industryCategories.flatMap((cat) => cat.items);

// ---------------------------------------------------------------------------
// Scroll reveal band: "We Deliver" enters from the right, "Talent" from the
// left, cross in the centre, and continue out the far side as the user
// scrolls through the (taller-than-viewport) section.
// ---------------------------------------------------------------------------
function DriveTalentSection() {
  const ref = useRef<HTMLElement>(null);
  const driveRef = useRef<HTMLHeadingElement>(null);
  const talentRef = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      // scrub: 0.5 lerps the playhead toward the scroll position over ~0.5s.
      // Unlike a spring it can never overshoot, so the words approach centre
      // from one side only - no left/right wobble on browsers that animate
      // wheel scrolling. Scrolling back up retraces the identical path.
      //
      // The section never pins - it scrolls through like any other content.
      // "top bottom" → "bottom top" spans its whole pass across the viewport,
      // so the timeline midpoint (words dead centre) lands exactly when the
      // section fills the screen, with no held scroll on either side.
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ref.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.5,
          // exit distances are measured from the DOM - re-derive on resize
          invalidateOnRefresh: true,
        },
      });
      // Distance that carries a centred element completely past a viewport
      // edge: half the viewport plus half the element, with a small margin so
      // the scrub's lerp tail can never leave a sliver behind. xPercent can't
      // express this - the words differ in width, so a percentage that clears
      // the wide one strands the narrow one on screen.
      const offscreen = (el: HTMLElement) =>
        (window.innerWidth + el.getBoundingClientRect().width) / 2 + 32;
      // First half: sweep in to dead centre, easing into place. Second half:
      // accelerate away (power1.in, the mirror of arriving) until fully off
      // the far edge - combined with the section itself scrolling on, the
      // words swipe out diagonally instead of parking half-visible. The entry
      // animates xPercent, the exit animates x; GSAP sums the two, so at the
      // midpoint both are 0 and the word is exactly centred. Fully opaque
      // throughout; scrolling back up replays everything in reverse.
      tl.fromTo(driveRef.current, { xPercent: -55 }, { xPercent: 0, duration: 1, ease: "power1.inOut", force3D: true }, 0)
        .fromTo(talentRef.current, { xPercent: 55 }, { xPercent: 0, duration: 1, ease: "power1.inOut", force3D: true }, 0)
        .to(driveRef.current, { x: () => offscreen(driveRef.current!), duration: 1, ease: "power1.in", force3D: true }, 1)
        .to(talentRef.current, { x: () => -offscreen(talentRef.current!), duration: 1, ease: "power1.in", force3D: true }, 1);
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={ref}
      // Exactly one viewport tall and no sticky child: the section flows past
      // like ordinary content - the sweep rides the scroll instead of holding
      // it. overflow-clip confines the exiting words without making this a
      // scroll container.
      className="relative z-20 hidden h-screen overflow-clip bg-transparent sm:block"
    >
      {/* Particle background */}
      <ParticleBackground
        sectionRef={ref}
        particleCount={95}
      />

      <div className="flex h-full flex-col items-center justify-center overflow-hidden px-6">
        {/* light glow - top-left and bottom-right corners */}
        <div className="pointer-events-none absolute -left-32 -top-24 h-[42rem] w-[42rem] rounded-full bg-[#D5D8DE]/40 blur-[170px]" />
        <h2
          ref={driveRef}
          style={{ fontFamily: "var(--font-display)" }}
          className="relative text-center text-[clamp(2.75rem,14vw,4.5rem)] font-extrabold uppercase leading-[0.86] tracking-[-0.05em] text-black sm:text-[clamp(4rem,15vw,9rem)] lg:text-[clamp(5.5rem,17vw,17rem)]"
        >
          {/* The hover treatment transitions `transform`, so it must sit on an
              inner element - on the outer one it would fight the transform
              GSAP rewrites every frame. */}
          <span className="crystal-heading">We&ensp;Deliver</span>
        </h2>
        <span
          ref={talentRef}
          style={{ fontFamily: "var(--font-display)" }}
          className="relative text-center text-[clamp(2.75rem,14vw,4.5rem)] font-extrabold uppercase leading-[0.86] tracking-[-0.05em] text-black sm:text-[clamp(4rem,15vw,9rem)] lg:text-[clamp(5.5rem,17vw,17rem)]"
        >
          <span className="crystal-heading">Talent</span>
        </span>
      </div>
    </section>
  );
}

function IndustriesWorlds() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const rowRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    // Below `sm` this becomes a plain swipeable carousel (see the row's
    // className) instead of a pinned scroll-jack - a scroll-jacked 300vh
    // section reads as a huge dead scroll on a phone, and native horizontal
    // swipe is the more familiar mobile pattern anyway. matchMedia only
    // builds the pin/scrub timeline at sm+ and tears it down if the viewport
    // crosses back below it.
    const mm = gsap.matchMedia();
    mm.add("(min-width: 640px)", () => {
      const ctx = gsap.context(() => {
        const row = rowRef.current!;
        // Shift needed to bring the LAST card's right edge flush with the
        // viewport's right edge (less a small gutter), so the run finishes with
        // no dead space on the right. Subtracting the row's current x makes the
        // measurement valid no matter where the scrub has dragged it (e.g. on
        // resize).
        const GUTTER = 25; // white space left after the last card on the right
        const distance = () => {
          const last = row.lastElementChild as HTMLElement;
          const r = last.getBoundingClientRect();
          const x = Number(gsap.getProperty(row, "x"));
          return Math.max(0, r.right - x - window.innerWidth + GUTTER);
        };
        // The row chases the scroll position over ~0.5s and can never
        // overshoot, so wheel notches glide instead of stepping, and scrolling
        // up retraces the identical path.
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.5,
            invalidateOnRefresh: true,
          },
        });
        // 0.85 of the pin for the ride, then a 0.15 dwell: the last card sits
        // centred for a beat before the pin releases into normal scrolling.
        tl.to(row, { x: () => -distance(), duration: 0.85, ease: "power1.inOut", force3D: true })
          .to({}, { duration: 0.15 });
      }, sectionRef);
      return () => ctx.revert();
    });
    return () => mm.revert();
  }, []);

  const total = String(industryWorlds.length).padStart(2, "0");

  return (
    <section
      ref={sectionRef}
      id="industries"
      data-header-dark
      // No vertical padding here: the sticky child may only travel within the
      // section's *content* box, so padding makes it latch late at the top
      // and detach before the section ends - mid-dwell. Mobile skips the pin
      // entirely, so it just needs its natural content height.
      className="relative bg-[#EEEEEE] text-white sm:h-[calc(var(--vh)*210)] lg:h-[calc(var(--vh)*300)]"
    >
      {/* pt clears the fixed site header so the heading stays readable below
          it for the whole pinned ride (sm+ only - mobile scrolls normally) */}
      <div className="flex flex-col justify-start pt-[5.5rem] pb-10 sm:sticky sm:top-0 sm:h-screen sm:overflow-hidden sm:pb-5 sm:pt-[6.5rem]">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-6 sm:px-8 lg:flex-row lg:items-end lg:justify-between">
          <Reveal>
            <div className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#9CCC3C]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#9CCC3C]" />
              The industries
              <span className="h-px w-12 bg-white/20" />
            </div>
            <h2
              className="text-[clamp(2.6rem,5.5vw,5rem)] font-extrabold uppercase leading-[0.9] tracking-tight text-black"
              style={{ fontFamily: "var(--font-display)" }}
            >
              <span style={{ color: "#ed1164" }}>Industries</span> we serve
            </h2>
            <p className="mb-6 mt-5 max-w-md text-sm leading-relaxed text-[#2F343B]">
              MindWhiz supports businesses across a wide range of industries. Our
              industry-focused expertise lets us tailor solutions that align with
              the unique requirements of each sector.
            </p>
          </Reveal>

          <Reveal delay={0.1} className="shrink-0">
            <a
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-[#2F343B] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#242A31]"
            >
              Get in touch
              <ArrowRight className="h-4 w-4" />
            </a>
          </Reveal>
        </div>

        <div
          ref={rowRef}
          className="mt-4 flex snap-x snap-mandatory gap-5 overflow-x-auto pl-[25px] pr-0 pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&>a:last-child]:mr-[25px] sm:snap-none sm:overflow-visible sm:px-[25px] sm:pb-0 sm:will-change-transform sm:[&>a:last-child]:mr-0 [&::-webkit-scrollbar]:hidden"
        >
          {industryWorlds.map((w, i) => (
          <a
            key={w.slug}
            href={`/industries/${w.slug}`}
            className="group relative flex h-[calc(var(--vh)*58)] max-h-[600px] min-h-[300px] w-[78vw] max-w-[320px] shrink-0 snap-center flex-col justify-end overflow-hidden rounded-2xl rounded-br-none transition-transform duration-300 hover:-translate-y-1.5 sm:w-[320px] lg:w-[360px]"
          >
            {/* stock image - using WebP for better performance */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <picture>
              <source srcSet={w.img.replace('.png', '.webp')} type="image/webp" />
              <img
                src={w.img}
                alt={w.name}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </picture>
            {/* dark overlay - strengthens text contrast over the image */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/70 to-black/40" />

            <span className="absolute left-6 top-6 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/70">
              {String(i + 1).padStart(2, "0")} / {total}
            </span>

            {/* scooped corner + green circular arrow */}
            <CardCornerArrow bg="#EEEEEE" />

            <div className="relative px-6 pb-6 pt-0">
              <h3
                className="text-xl font-semibold leading-tight drop-shadow"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {w.name}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-white/75">{w.desc}</p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-[#9CCC3C]">
                Enter <ArrowUpRight className="h-3.5 w-3.5" />
              </span>
            </div>
          </a>
          ))}
        </div>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

// Maps each service to its dedicated detail page so the cards (and their
// "Learn more" links) send visitors to the related page.
const serviceRoutes: Record<string, string> = {
  "IT Helpdesk 24/7": "/services/it-helpdesk-24-7",
  "NOC Monitoring": "/services/noc-monitoring",
  "Cybersecurity Monitoring": "/services/cybersecurity-monitoring",
  "Cloud Infrastructure": "/services/cloud-infrastructure",
  "DevOps & Automation": "/services/devops-automation",
  "Endpoint Security": "/services/endpoint-security",
  "Server & Network Administration": "/services/server-network-administration",
  "Remote Desktop & Assets": "/services/remote-desktop-assets",
  "Staff Augmentation": "/services/staff-augmentation",
  "Digital Marketing": "/service",
  "Construction Estimation": "/construction-estimation",
  "Finance & Accounting": "/finance",
  "HR Services": "/hr",
};
const serviceHref = (name: string) => serviceRoutes[name] ?? "/#services";

// ---------------------------------------------------------------------------
// Services card-stack (GSAP-style): each card pins near the top and the next
// card scrolls up over it, while the one underneath scales down - reverses on
// scroll-up so you can see the cards behind.
// ---------------------------------------------------------------------------
function StackCard({
  s,
  i,
  total,
  progress,
}: {
  s: (typeof services)[number];
  i: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const Icon = iconMap[s.icon] ?? Activity;
  const href = serviceHref(s.name);
  // each lower card shrinks a little so the stacked edges stay visible
  const targetScale = 1 - (total - 1 - i) * 0.045;
  const scale = useTransform(progress, [i / total, 1], [1, targetScale]);
  const top = 120 + i * 26; // staggered sticky offset → cascading stack

  return (
    <div className="sticky flex justify-center" style={{ top }}>
      <motion.a
        href={href}
        style={{ scale, transformOrigin: "top center" }}
        initial={{ opacity: 0, x: 110 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: false, amount: 0.3 }}
        whileHover={{ y: -8 }}
        transition={{ type: "spring", stiffness: 200, damping: 24 }}
        className="group flex h-[300px] w-full flex-col justify-between rounded-2xl border border-slate-200 bg-white p-8 sm:p-10"
      >
        <div>
          <div className="flex items-center justify-between">
            <motion.span
              whileHover={{ rotate: -8, scale: 1.08 }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
              className="grid h-14 w-14 place-items-center rounded-xl bg-[#9CCC3C]/15 text-[#9CCC3C]"
            >
              <Icon className="h-7 w-7" />
            </motion.span>
            <span
              className="text-5xl font-extrabold text-[#9CCC3C]/70"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {String(i + 1).padStart(2, "0")}
            </span>
          </div>
          <h3
            className="mt-6 text-2xl font-bold text-black sm:text-3xl"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {s.name}
          </h3>
          <p className="mt-3 text-base text-black">{s.desc}</p>
        </div>
        <span className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-black">
          Learn more
          <ArrowRight className="h-4 w-4 text-[#ed1164] transition-transform group-hover:translate-x-1" />
        </span>
      </motion.a>
    </div>
  );
}

function ServiceCardFlat({ s, i }: { s: (typeof services)[number]; i: number }) {
  const Icon = iconMap[s.icon] ?? Activity;
  const href = serviceHref(s.name);
  return (
    <motion.a
      href={href}
      initial={{ opacity: 0, x: 80 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay: (i % 2) * 0.06, ease: [0.22, 1, 0.36, 1] }}
      className="group flex h-full flex-col justify-between rounded-2xl border border-slate-200 bg-white p-7"
    >
      <div>
        <div className="flex items-center justify-between">
          <span className="grid h-12 w-12 place-items-center rounded-xl bg-[#9CCC3C]/15 text-[#9CCC3C]">
            <Icon className="h-6 w-6" />
          </span>
          <span
            className="text-3xl font-extrabold text-[#9CCC3C]/60"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {String(i + 1).padStart(2, "0")}
          </span>
        </div>
        <h3
          className="mt-5 text-xl font-bold text-black"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {s.name}
        </h3>
        <p className="mt-2 text-sm text-black">{s.desc}</p>
      </div>
      <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-black">
        Learn more
        <ArrowRight className="h-4 w-4 text-[#ed1164] transition-transform group-hover:translate-x-1" />
      </span>
    </motion.a>
  );
}

function ServicesScrollSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  const total = services.length;
  const [expanded, setExpanded] = useState(false);

  // Toggling to the expanded grid collapses the tall scroll-stack, which shrinks
  // the section and would otherwise leave the viewport stranded further down the
  // page. Re-anchor to the top of the Services section after the layout updates.
  // Compares against the previous `expanded` value (rather than a mount-count
  // flag) so this only fires on a real toggle - a boolean "have we mounted yet"
  // ref falsely fires on React 18 Strict Mode's double-invoked mount effect in
  // development, causing a random scroll jump on page load.
  const prevExpanded = useRef(expanded);
  useEffect(() => {
    if (prevExpanded.current === expanded) return;
    prevExpanded.current = expanded;
    if (!ref.current) return;
    const y = ref.current.getBoundingClientRect().top + window.scrollY - 90;
    window.scrollTo({ top: y, behavior: "smooth" });
  }, [expanded]);

  return (
    <section id="services" ref={ref} className="relative bg-[#EEEEEE] py-24">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 sm:px-8 lg:grid-cols-[0.8fr_1.2fr]">
        {/* heading - sticky on the left */}
        <div>
          <div className="lg:sticky lg:top-32">
            <Reveal>
              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[#9CCC3C]">
                What we do
              </span>
              <h2
                className="mt-3 text-[clamp(2.6rem,5.5vw,5rem)] font-extrabold uppercase leading-[0.9] tracking-tight text-black"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Solutions That <span style={{ color: "#ed1164" }}>Scale</span>
              </h2>
              <p className="mt-5 max-w-sm text-black">
                From IT and security to business operations - explore the services we deliver as you
                scroll.
              </p>
              <button
                type="button"
                onClick={() => setExpanded((v) => !v)}
                className="mt-7 inline-flex items-center gap-2 rounded-full border border-[#ed1164] bg-[#ed1164] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#c50e53] hover:border-[#c50e53]"
              >
                {expanded ? "Show stacked view" : "View all services"}
                <ChevronDown
                  className={`h-4 w-4 transition-transform duration-300 ${expanded ? "rotate-180" : ""}`}
                />
              </button>
              <div className="mt-4">
                <Cta href="/contact" label="Contact us" />
              </div>
            </Reveal>
          </div>
        </div>

        {/* right side: grid OR scroll-stack one-by-one */}
        <div>
          {expanded ? (
            <div className="flex flex-col gap-[calc(var(--vh)*10)]">
              {services.map((s, i) => (
                <StackCard
                  key={s.name}
                  s={s}
                  i={i}
                  total={total}
                  progress={scrollYProgress}
                />
              ))}
            </div>
          ) : (
            <div className="grid gap-5 sm:grid-cols-2">
              {services.map((s, i) => (
                <ServiceCardFlat key={s.name} s={s} i={i} />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Case record: a pinned card-stack - each engagement sticks in the same spot
// and the next scrolls up over it, revealing them one by one as you scroll.
// Below `sm` this is skipped entirely - just three cards in plain, normal
// vertical flow.
// ---------------------------------------------------------------------------
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
        className="border-t border-white/10 bg-[#383838] pt-14 pb-4"
      >
        <div className="grid gap-10 lg:grid-cols-[6rem_1fr_17rem]">
          {/* number */}
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/35">No.</p>
            <p className="mt-1 text-5xl font-bold leading-none text-white" style={{ fontFamily: "var(--font-display)" }}>
              {no}
            </p>
            <p className="mt-3 text-xs text-white/35">2025</p>
          </div>

          {/* detail */}
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/40">
              {cs.category} · Engagement
            </p>
            <h3 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl" style={{ fontFamily: "var(--font-display)" }}>
              {cs.client}
            </h3>
            <p className="mt-4 max-w-md text-base leading-relaxed text-white/60 sm:text-lg">{cs.result}</p>
            <Cta href="/contact" label="Get in touch" className="mt-6 w-fit" />
            <span className="mt-6 flex w-fit items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#9CCC3C]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#9CCC3C]" />
              Filed · {cs.category} · 2025
            </span>
          </div>

          {/* exhibit */}
          <div>
            <div className="flex items-center justify-between text-[10px] font-semibold uppercase tracking-[0.18em] text-white/35">
              <span>Exhibit {no}-A</span>
              <span>Client on file</span>
            </div>
            <div className="relative mt-3 flex min-h-[26rem] flex-col overflow-hidden rounded-lg border border-white/20 bg-white/[0.03] p-6">
              <div className="pointer-events-none absolute -left-10 bottom-0 h-40 w-40 rounded-full bg-[#9CCC3C]/10 blur-3xl" />
              {/* client logo, big and centred in the box at full opacity so it
                  reads clearly against the dark exhibit card */}
              {cs.logo && (
                <div className="pointer-events-none absolute inset-0">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={cs.logo} alt="" aria-hidden className="h-full w-full object-cover drop-shadow-[0_4px_18px_rgba(0,0,0,0.55)]" />
                </div>
              )}
              <div className="relative flex-1" />
              <p className="relative text-[10px] font-semibold uppercase tracking-[0.18em] text-white/35">{cs.client} · 2025</p>
            </div>
            <p className="mt-3 text-[11px] text-white/35">
              On file: client engagement, {cs.client}, {cs.category}, 2025.
            </p>
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
      <div className="m-[10px] rounded-t-3xl bg-[#383838] text-white">
        <div ref={ref} className="mx-auto max-w-7xl px-6 pt-24 pb-24 sm:px-8">
          {/* header */}
          <Reveal>
            <div className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#9CCC3C]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#9CCC3C]" />
              On the record
              <span className="h-px w-12 bg-white/20" />
            </div>
            <div className="mt-6 flex flex-col gap-8 border-b border-white/10 pb-12 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-xl">
                <h2 className="text-[clamp(2.6rem,5.5vw,5rem)] font-extrabold uppercase leading-[0.9] tracking-tight" style={{ fontFamily: "var(--font-display)" }}>
                  The case <span style={{ color: "#ed1164" }}>record</span>
                </h2>
                <p className="mt-5 max-w-md text-sm leading-relaxed text-white/55">
                  Three engagements delivered since 2025. Every entry below is on
                  file, with the thesis exactly as presented.
                </p>
              </div>
              <div className="space-y-1.5 text-left text-[11px] uppercase tracking-[0.18em] text-white/40 lg:text-right">
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

// ---------------------------------------------------------------------------
// Blog: featured + two side posts, auto-rotating through `insights`.
// ---------------------------------------------------------------------------
function BlogSection() {
  const [index, setIndex] = useState(0);

  // depending on `index` restarts the timer after a manual arrow click, so
  // the auto-rotate never fires right on the heels of a navigation
  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % insights.length);
    }, 5000);
    return () => clearInterval(id);
  }, [index]);

  const prev = () => setIndex((i) => (i - 1 + insights.length) % insights.length);
  const next = () => setIndex((i) => (i + 1) % insights.length);

  const featured = insights[index];
  const second = insights[(index + 1) % insights.length];
  const third = insights[(index + 2) % insights.length];

  return (
    <section className="relative bg-white text-black">
      <div className="relative mx-[10px] mt-[10px] overflow-hidden rounded-t-3xl bg-[#EEEEEE]">
        <div className="pointer-events-none absolute -left-24 top-0 h-96 w-96 rounded-full bg-[#9CCC3C]/25 blur-[140px]" />
        <div className="relative mx-auto max-w-7xl px-6 py-24 sm:px-8">
          <Reveal>
            <div className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#9CCC3C]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#9CCC3C]" />
              Blog
              <span className="h-px w-12 bg-slate-300" />
            </div>
            <div className="mt-6 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <h2
                className="max-w-2xl text-[clamp(2.6rem,5.5vw,5rem)] font-extrabold uppercase leading-[0.9] tracking-tight text-black"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Latest <span style={{ color: "#ed1164" }}>insights</span>
              </h2>
              <div className="flex flex-col items-start gap-5 sm:flex-row sm:items-end sm:gap-8">
                <p className="max-w-md text-sm leading-relaxed text-black/70">
                  Field notes from live engagements - security operations, delivery
                  playbooks, and what actually works at scale.
                </p>
                <div className="flex shrink-0 gap-3">
                  <button
                    type="button"
                    onClick={prev}
                    aria-label="Previous post"
                    className="grid h-12 w-12 place-items-center rounded-full border border-black/15 bg-white text-black transition-colors hover:bg-[#9CCC3C] hover:border-transparent"
                  >
                    <ArrowLeft className="h-5 w-5" />
                  </button>
                  <button
                    type="button"
                    onClick={next}
                    aria-label="Next post"
                    className="grid h-12 w-12 place-items-center rounded-full border border-black/15 bg-white text-black transition-colors hover:bg-[#9CCC3C] hover:border-transparent"
                  >
                    <ArrowRight className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          </Reveal>

          <div className="mt-14 grid gap-6 lg:grid-cols-[1.3fr_1fr]">
            {/* featured post */}
            <div className="relative h-[420px] overflow-hidden rounded-3xl sm:h-[520px]">
              <AnimatePresence mode="wait">
                <motion.a
                  key={featured.title}
                  href={featured.href}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6 }}
                  className="group absolute inset-0 flex flex-col justify-end"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={featured.img}
                    alt={featured.title}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 to-transparent" />
                  <div className="relative p-7 sm:p-9">
                    <span className="inline-flex items-center rounded-full bg-[#9CCC3C] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-black">
                      {featured.category}
                    </span>
                    <h3
                      className="mt-5 max-w-lg text-2xl font-bold leading-tight text-white sm:text-3xl"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {featured.title}
                    </h3>
                    <p className="mt-3 max-w-md text-sm leading-relaxed text-white/70">
                      {featured.desc}
                    </p>
                    <span className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-white">
                      Read more
                      <ArrowRight className="h-4 w-4 text-[#9CCC3C] transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </motion.a>
              </AnimatePresence>

              <div className="absolute right-6 top-6 flex gap-1.5">
                {insights.map((_, i) => (
                  <span
                    key={i}
                    className={`h-1.5 rounded-full transition-all duration-500 ${
                      i === index ? "w-6 bg-[#9CCC3C]" : "w-1.5 bg-white/40"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* secondary posts */}
            <div className="flex flex-col gap-6">
              {[second, third].map((post, i) => (
                <div key={i} className="relative h-full overflow-hidden rounded-2xl">
                  <AnimatePresence mode="wait">
                    <motion.a
                      key={post.title}
                      href={post.href}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.5 }}
                      className="group flex h-full gap-5 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition-colors hover:border-[#9CCC3C]/50"
                    >
                      <div className="relative h-full w-28 shrink-0 overflow-hidden rounded-xl sm:w-36">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={post.img}
                          alt={post.title}
                          loading="lazy"
                          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                      </div>
                      <div className="flex flex-col justify-center py-1">
                        <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#7DB022]">
                          {post.category}
                        </span>
                        <h3
                          className="mt-2 text-base font-bold leading-snug text-black"
                          style={{ fontFamily: "var(--font-display)" }}
                        >
                          {post.title}
                        </h3>
                        <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-black/70">
                          Read more
                          <ArrowRight className="h-3.5 w-3.5 text-[#9CCC3C] transition-transform group-hover:translate-x-1" />
                        </span>
                      </div>
                    </motion.a>
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const faqs: Faq[] = [
  {
    q: "What services does MindWhiz provide?",
    a: "Managed IT and cybersecurity, cloud and infrastructure, web development and digital marketing, and back-office support across finance, HR, and construction estimation - plus staff augmentation when you need people rather than a project.",
  },
  {
    q: "Do you work with businesses of our size?",
    a: "We work with startups and small businesses through to established multi-site companies. Pricing is per user and scales with headcount, so the service stays proportionate whether you are ten people or several hundred.",
  },
  {
    q: "Can you extend our existing team instead of replacing it?",
    a: "Yes, and that is the more common arrangement. Our people work inside your tools and processes under your direction, covering the hours, volume, or specialisms your team cannot sustain alone.",
  },
  {
    q: "Which time zones and regions do you cover?",
    a: "Coverage is aligned to your working hours, with live overlap for UK and US teams and continuous cover available where operations require it.",
  },
  {
    q: "How do we get started?",
    a: "Book a free consultation. We review your current situation, identify the gaps, and come back with a scoped plan, clear pricing, and a practical next step - with no obligation to proceed.",
  },
];

export default function SystemLimitedHome() {
  const { scrollY } = useScroll();
  const heroTextY = useTransform(scrollY, [0, 600], [0, 120]);
  const heroFade = useTransform(scrollY, [0, 480], [1, 0]);

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

      {/* ===================== 1 · HERO (single video banner) ===================== */}
      <section data-header-dark className="relative mb-10 flex h-[calc(var(--svh)*100)] min-h-[640px] items-center justify-start overflow-hidden bg-white">
        <div className="absolute inset-[10px] overflow-hidden rounded-3xl">
          <video autoPlay muted loop playsInline preload="metadata" className="h-full w-full object-cover">
            <source src="/alphabravo-company-profile.webm" type="video/webm" />
            <source src="/alphabravo-company-profile-compressed.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/55 to-black/25" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#383838]" />
        </div>

        <motion.div
          style={{ y: heroTextY, opacity: heroFade }}
          variants={container}
          initial="hidden"
          animate="show"
          className="relative max-w-5xl px-6 pt-16 text-left sm:px-10 lg:px-16"
        >
          <motion.div variants={item}>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-medium text-white/75 backdrop-blur">
              {hero.eyebrow}
            </span>
          </motion.div>
          <motion.h1
            variants={item}
            className="mt-6 text-[clamp(3.6rem,11vw,11rem)] font-extrabold uppercase leading-[0.86] tracking-[-0.05em] text-white"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Scale
            <br />
            Your
            <br />
            <RotatingWord
              words={["Teams", "Ops", "Reach", "Impact"]}
              interval={2200}
              className="text-[#9CCC3C]"
            />
          </motion.h1>
          <motion.div variants={item} className="mt-9 flex flex-wrap items-center justify-start gap-4">
            <ArrowCta href={hero.primaryCta.href} label={hero.primaryCta.label} />
            <Cta href={hero.secondaryCta.href} label={hero.secondaryCta.label} variant="outline" />
          </motion.div>
        </motion.div>
      </section>

      {/* ===================== 1.2 · WE DELIVER TALENT (scroll reveal) ===================== */}
      <DriveTalentSection />

      {/* ===================== 1.5 · CLIENTS (split) ===================== */}
      <ClientsSection />

      {/* ===================== 1.6 · INDUSTRIES (worlds carousel) ===================== */}
      <IndustriesWorlds />

      {/* ===================== 1.7 · SERVICES (pinned scroll-stack) ===================== */}
      <ServicesScrollSection />

      {/* ===================== 3 · CASE STUDIES (pinned one-by-one stack) ===================== */}
      <CaseRecordSection />

      {/* ===================== 6 · STATISTICS ===================== */}
      <section className="relative flex min-h-screen items-center overflow-hidden bg-white text-black">
        {/* light-green glow in the top-left corner */}
        <div className="pointer-events-none absolute -left-32 -top-32 h-96 w-96 rounded-full bg-[#9CCC3C]/40 blur-[130px]" />
        <div className="relative mx-auto w-full max-w-7xl px-6 py-20 sm:px-8">
          {/* top: heading + description / CTA */}
          <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
            <Reveal>
              <h2
                className="max-w-2xl text-[clamp(2.6rem,5.5vw,5rem)] font-extrabold uppercase leading-[0.9] tracking-tight"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Built for scale
              </h2>
            </Reveal>
            <Reveal delay={0.1} className="shrink-0 lg:max-w-sm lg:text-right">
              <p className="text-sm leading-relaxed text-black">
                Performance that grows with your business.
              </p>
              <Cta href="/contact" label="Work with us" className="mt-5" />
            </Reveal>
          </div>

          {/* body: stat cards on the left, growth chart on the right */}
          <div className="mt-14 grid gap-6 lg:grid-cols-2">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              {stats.map((s, i) => (
                <StatCard
                  key={s.label}
                  value={s.value}
                  label={s.label}
                  index={i + 1}
                  total={stats.length}
                  delay={i * 0.06}
                />
              ))}
            </div>
            <Reveal delay={0.1}>
              <GrowthChart />
            </Reveal>
          </div>
        </div>
      </section>

      {/* ===================== 7 · CREDENTIALS ===================== */}
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

      {/* ===================== 7.5 · TRUSTED BY CLIENTS (video carousel) ===================== */}
      <TrustedByClients />

      {/* ===================== 8 · BLOG ===================== */}
      <BlogSection />

      {/* ===================== 8.5 · STUDIO CLOCK (timezones) ===================== */}
      <StudioClockSection />

      <FaqSection faqs={faqs} />

      {/* ===================== 9 · CONTACT FORM ===================== */}
      <ContactFormSection />

      {/* ===================== 13 · FOOTER ===================== */}
      <Footer />
      </div>
    </main>
  );
}
