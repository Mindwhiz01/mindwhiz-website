"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useSpring,
  useInView,
  type MotionValue,
  type Variants,
} from "framer-motion";
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
  ArrowUpRight,
  ChevronRight,
  ChevronDown,
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
import GrowSection from "@/components/GrowSection";
import { SiteHeader } from "@/components/SiteHeader";
import CardCornerArrow from "@/components/CardCornerArrow";

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

const btnPrimary =
  "inline-flex items-center justify-center gap-2 rounded-md bg-[#9CCC3C] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#7DB022]";
const btnOutline =
  "inline-flex items-center justify-center gap-2 rounded-md border border-[#9CCC3C] px-6 py-3 text-sm font-semibold text-[#9CCC3C] transition-colors hover:bg-[#9CCC3C] hover:text-white";

// Local template content (insights cards, technology platforms, socials)
const insights = [
  {
    category: "Case Study",
    title: "Scaling a 24/7 IT helpdesk without the hiring lag",
    desc: "How a hybrid Tier 1–3 model cut response times and cost.",
    img: "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=1200&h=1400&q=80",
  },
  {
    category: "White Paper",
    title: "Building a compliant SOC: SOC 2 & ISO 27001 in practice",
    desc: "A practical blueprint for security operations at scale.",
    img: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=900&h=700&q=80",
  },
  {
    category: "Blog",
    title: "NOC vs SOC: where monitoring ends and security begins",
    desc: "Clarifying roles, tooling, and escalation paths.",
    img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=900&h=700&q=80",
  },
  {
    category: "Case Study",
    title: "Construction estimation, delivered offshore",
    desc: "Faster takeoffs and bid prep with vetted estimators.",
    img: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&h=1400&q=80",
  },
  {
    category: "Blog",
    title: "Staff augmentation that actually integrates",
    desc: "Onboarding playbooks that get specialists productive fast.",
    img: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&h=700&q=80",
  },
  {
    category: "White Paper",
    title: "The economics of hybrid delivery",
    desc: "How onshore/offshore blends drive up to 30% cost savings.",
    img: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=900&h=700&q=80",
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

// Rotating word — cycles through words in the same position, again and again.
function RotatingWord({
  words,
  interval = 2200,
  className = "",
}: {
  words: string[];
  interval?: number;
  className?: string;
}) {
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setI((p) => (p + 1) % words.length), interval);
    return () => clearInterval(id);
  }, [words.length, interval]);
  return (
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

// Frosted-glass "crystal" lens that follows the cursor — same treatment used
// on the service/industry detail pages' closing CTA.
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

// Split CTA — a dark pill with the label beside a detached green arrow square.
function ArrowCta({
  href,
  label,
  className = "",
}: {
  href: string;
  label: string;
  className?: string;
}) {
  return (
    <a href={href} className={`group inline-flex items-stretch gap-2 ${className}`}>
      <span className="flex items-center rounded-2xl bg-[#232D26] px-7 py-4 text-xs font-semibold uppercase tracking-[0.15em] text-white transition-colors group-hover:bg-[#1a221c]">
        {label}
      </span>
      <span className="grid w-14 shrink-0 place-items-center rounded-2xl bg-[#9CCC3C] text-black transition-transform group-hover:translate-x-0.5">
        <ArrowRight className="h-5 w-5" />
      </span>
    </a>
  );
}

// ---------------------------------------------------------------------------
// Studio clock: a day-gradient bar with live local times across offices.
// ---------------------------------------------------------------------------
const studioCities = [
  { city: "United Kingdom", tz: "Europe/London", above: false },
  { city: "United States", tz: "America/New_York", above: false },
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
            offices in the UK and the USA. Building since 2017 — somewhere, the
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
        img: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=640&h=640&q=80",
      },
      {
        name: "E-commerce & Retail",
        slug: "ecommerce-retail",
        desc: "Catalog, support, and operations that keep storefronts running around the clock.",
        img: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=640&h=640&q=80",
      },
      {
        name: "Startups & SMBs",
        slug: "startups-smbs",
        desc: "Flexible, cost-effective teams that scale exactly as fast as you grow.",
        img: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=640&h=640&q=80",
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
        img: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=640&h=640&q=80",
      },
      {
        name: "Real Estate",
        slug: "real-estate",
        desc: "Listing, transaction, and operations support that keeps teams focused on deals, not admin.",
        img: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=640&h=640&q=80",
      },
      {
        name: "Industrial Manufacturing",
        slug: "industrial-manufacturing",
        desc: "Engineering, back-office, and IT support that keep operations efficient and connected.",
        img: "https://images.unsplash.com/photo-1565043666747-69f6646db940?auto=format&fit=crop&w=640&h=640&q=80",
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
        img: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=640&h=640&q=80",
      },
      {
        name: "Professional Services",
        slug: "professional-services",
        desc: "Research, operations, and back-office support for consulting and professional firms.",
        img: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=640&h=640&q=80",
      },
      {
        name: "Logistics & Supply Chain",
        slug: "logistics-supply-chain",
        desc: "Coordination, tracking, and back-office support that keep goods moving.",
        img: "https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&w=640&h=640&q=80",
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
        img: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=640&h=640&q=80",
      },
    ],
  },
];

const industryWorlds = industryCategories.flatMap((cat) => cat.items);

function IndustriesWorlds() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const rowRef = useRef<HTMLDivElement>(null);
  const [distance, setDistance] = useState(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });
  const xRaw = useTransform(scrollYProgress, [0, 1], [0, -distance]);
  const x = useSpring(xRaw, { stiffness: 90, damping: 22, mass: 0.4 });

  useEffect(() => {
    const update = () => {
      const row = rowRef.current;
      if (!row) return;
      // how far the row must shift left so its end aligns with the viewport edge
      setDistance(Math.max(0, row.scrollWidth - window.innerWidth + 48));
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const total = String(industryWorlds.length).padStart(2, "0");

  return (
    <section
      ref={sectionRef}
      id="industries"
      data-header-dark
      className="relative bg-[#EEEEEE] pt-10 pb-32 text-white sm:pt-14 sm:pb-40"
      style={{ height: "300vh" }}
    >
      <div className="sticky top-0 flex h-screen flex-col justify-start overflow-hidden pt-4 pb-4 sm:pt-6 sm:pb-5">
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
              <span style={{ color: "#ed1164" }}>Industries</span> we serve.
            </h2>
            <p className="mb-6 mt-5 max-w-md text-sm leading-relaxed text-[#2F343B]">
              MindWhiz supports businesses across a wide range of industries. Our
              industry-focused expertise lets us tailor solutions that align with
              the unique requirements of each sector.
            </p>
          </Reveal>

          <Reveal delay={0.1} className="shrink-0">
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-md bg-[#2F343B] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#242A31]"
            >
              Get in touch
              <ArrowRight className="h-4 w-4" />
            </a>
          </Reveal>
        </div>

        <motion.div
          ref={rowRef}
          style={{ x }}
          className="mt-4 flex gap-5 px-6 will-change-transform sm:px-8"
        >
          {industryWorlds.map((w, i) => (
          <a
            key={w.slug}
            href={`/industries/${w.slug}`}
            className="group relative flex h-[58vh] max-h-[600px] min-h-[340px] w-[360px] shrink-0 flex-col justify-end overflow-hidden rounded-2xl transition-transform duration-300 hover:-translate-y-1.5"
          >
            {/* stock image */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={w.img}
              alt={w.name}
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            {/* dark overlay — strengthens text contrast over the image */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/70 to-black/40" />

            <span className="absolute left-6 top-6 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/70">
              {String(i + 1).padStart(2, "0")} / {total}
            </span>

            {/* detached corner arrow (notched pocket) */}
            <CardCornerArrow bg="#EEEEEE" />

            <div className="relative p-6 pb-12">
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
        </motion.div>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------
// Client logo marquee data + components.
type ClientItem = { name: string; src?: string };

const clientsRow1: ClientItem[] = [
  { name: "Alpha Bravo Construction", src: "/clients/alpha-bravo.png" },
  { name: "Highland Redstone", src: "/clients/highland.png" },
  { name: "Inovatiqa", src: "/clients/inovatiqa.png" },
  { name: "Jerdoni", src: "/clients/jerdoni.png" },
  { name: "Texas Diagnostic Labs", src: "/clients/texas.png" },
  { name: "Villa Tech", src: "/clients/villa-tech.png" },
];
const clientsRow2: ClientItem[] = [...clientsRow1].reverse();

function LogoChip({ item }: { item: ClientItem }) {
  return (
    // constant white card so logos (white backgrounds) render in both themes;
    // logo files are pre-trimmed, so object-contain fits them cleanly in the box.
    <span className="group flex h-24 w-[210px] items-center justify-center overflow-hidden rounded-2xl bg-[#EEEEEE] px-6 py-4 ring-1 ring-black/5 transition-shadow hover:shadow-md">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={item.src}
        alt={item.name}
        className="h-full w-full object-contain"
      />
    </span>
  );
}

function ClientMarquee({
  items,
  direction,
}: {
  items: ClientItem[];
  direction: "left" | "right";
}) {
  const row = [...items, ...items];
  return (
    <div className="marquee marquee-mask relative overflow-hidden">
      <div
        className={`marquee-track gap-5 py-1 ${
          direction === "left" ? "animate-marquee-left" : "animate-marquee-right"
        }`}
      >
        {row.map((item, i) => (
          <LogoChip key={`${item.name}-${i}`} item={item} />
        ))}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Scroll reveal band: "We Drive" enters from the right, "talent" from the left
// as the user scrolls through the (taller-than-viewport) section.
// ---------------------------------------------------------------------------
function DriveTalentSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  // Driven directly off scroll position (no spring lag) so the reveal starts
  // the instant the section is entered, not after scrolling further in.
  // "We Deliver" slides in from the left, is fully centered exactly at the
  // section's midpoint, then continues sliding out to the right.
  const driveX = useTransform(scrollYProgress, [0, 0.5, 1], ["-55%", "0%", "55%"]);
  const driveOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0]);

  // "Talent" slides in from the right, is fully centered at the same
  // midpoint, then continues sliding out to the left.
  const talentX = useTransform(scrollYProgress, [0, 0.5, 1], ["55%", "0%", "-55%"]);
  const talentOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0]);

  return (
    <section
      ref={ref}
      className="relative z-20 h-[140vh] overflow-hidden bg-transparent"
    >
      <div className="sticky top-0 flex h-screen flex-col items-center justify-center overflow-hidden px-6">
        {/* green light glow — coming from the top-left and bottom-right corners */}
        <div className="pointer-events-none absolute -left-32 -top-24 h-[42rem] w-[42rem] rounded-full bg-[#D5D8DE]/40 blur-[170px]" />
        <motion.h2
          style={{ x: driveX, opacity: driveOpacity, fontFamily: "var(--font-display)" }}
          className="crystal-heading relative text-center text-[clamp(5.5rem,17vw,17rem)] font-extrabold uppercase leading-[0.86] tracking-[-0.05em] text-black"
          aria-label="We Deliver"
        >
          We Deliver
        </motion.h2>
        <motion.span
          style={{ x: talentX, opacity: talentOpacity, fontFamily: "var(--font-display)" }}
          className="crystal-heading relative text-center text-[clamp(5.5rem,17vw,17rem)] font-extrabold uppercase leading-[0.86] tracking-[-0.05em] text-black"
        >
          Talent
        </motion.span>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Clients section: text slides in from the left, logos from the right — driven
// by scroll progress as the section moves up through the viewport.
// ---------------------------------------------------------------------------
function ClientsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"],
  });
  const progress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 24,
    restDelta: 0.001,
  });

  const y = useTransform(progress, [0, 1], [48, 0]);
  const opacity = useTransform(progress, [0, 0.6], [0, 1]);

  return (
    <section
      ref={ref}
      className="relative z-30 -mt-[45vh] rounded-t-[2.5rem] bg-white shadow-[0_-30px_60px_-30px_rgba(0,0,0,0.15)]"
    >
      <div className="mx-auto flex min-h-screen max-w-7xl flex-col justify-start px-6 pb-16 pt-20 sm:px-8">
        {/* centered header */}
        <motion.div style={{ y, opacity }} className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.2em] text-[#9CCC3C]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#9CCC3C]" />
            Trusted by
          </span>
          <h2
            className="mt-5 text-[clamp(2.6rem,5.5vw,5rem)] font-extrabold uppercase leading-[0.9] tracking-tight text-black"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Teams that scale with{" "}
            <span style={{ color: "#9CCC3C" }}>MindWhiz</span>
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-black/70">
            From construction to healthcare, our clients rely on us to deliver vetted talent and
            24/7 operations.
          </p>
        </motion.div>

        {/* logo showcase panel — two contained rows */}
        <motion.div
          style={{ y, opacity }}
          className="mt-14 overflow-hidden rounded-3xl bg-[#f5f5f5] p-5 sm:p-8"
        >
          <div className="flex flex-col gap-5 overflow-hidden">
            <ClientMarquee items={clientsRow1} direction="left" />
            <ClientMarquee items={clientsRow2} direction="right" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Services card-stack (GSAP-style): each card pins near the top and the next
// card scrolls up over it, while the one underneath scales down — reverses on
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
  const href = s.name === "Digital Marketing" ? "/service" : "/#services";
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
          <ArrowRight className="h-4 w-4 text-[#9CCC3C] transition-transform group-hover:translate-x-1" />
        </span>
      </motion.a>
    </div>
  );
}

function ServiceCardFlat({ s, i }: { s: (typeof services)[number]; i: number }) {
  const Icon = iconMap[s.icon] ?? Activity;
  const href = s.name === "Digital Marketing" ? "/service" : "/#services";
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
        <ArrowRight className="h-4 w-4 text-[#9CCC3C] transition-transform group-hover:translate-x-1" />
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
  // Skip the initial mount so the page doesn't jump here on load.
  const didMount = useRef(false);
  useEffect(() => {
    if (!didMount.current) {
      didMount.current = true;
      return;
    }
    if (!ref.current) return;
    const y = ref.current.getBoundingClientRect().top + window.scrollY - 90;
    window.scrollTo({ top: y, behavior: "smooth" });
  }, [expanded]);

  return (
    <section id="services" ref={ref} className="relative bg-[#EEEEEE] py-24">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 sm:px-8 lg:grid-cols-[0.8fr_1.2fr]">
        {/* heading — sticky on the left */}
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
                From IT and security to business operations — explore the services we deliver as you
                scroll.
              </p>
              <button
                type="button"
                onClick={() => setExpanded((v) => !v)}
                className="mt-7 inline-flex items-center gap-2 rounded-md border border-[#9CCC3C] px-5 py-2.5 text-sm font-semibold text-black transition-colors hover:bg-[#9CCC3C] hover:text-white"
              >
                {expanded ? "Show stacked view" : "View all services"}
                <ChevronDown
                  className={`h-4 w-4 transition-transform duration-300 ${expanded ? "rotate-180" : ""}`}
                />
              </button>
            </Reveal>
          </div>
        </div>

        {/* right side: scroll-stack OR expanded grid */}
        {expanded ? (
          <div className="grid gap-5 sm:grid-cols-2">
            {services.map((s, i) => (
              <ServiceCardFlat key={s.name} s={s} i={i} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col gap-[10vh]">
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
        )}
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Case record: a pinned card-stack — each engagement sticks in the same spot
// and the next scrolls up over it, revealing them one by one as you scroll.
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
  const no = String(i + 1).padStart(2, "0");
  const targetScale = 1 - (total - 1 - i) * 0.04;
  const scale = useTransform(progress, [i / total, 1], [1, targetScale]);
  const top = 110 + i * 26;

  return (
    <div className="sticky" style={{ top }}>
      <motion.div
        style={{ scale, transformOrigin: "top center" }}
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
            <p className="mt-4 max-w-md text-sm leading-relaxed text-white/60">{cs.result}</p>
            <span className="mt-6 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#9CCC3C]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#9CCC3C]" />
              Filed · {cs.category} · 2025
            </span>
          </div>

          {/* exhibit */}
          <div>
            <div className="flex items-center justify-between text-[10px] font-semibold uppercase tracking-[0.18em] text-white/35">
              <span>Exhibit {no}-A</span>
              <span>No photograph on file</span>
            </div>
            <div className="relative mt-3 flex min-h-[26rem] flex-col overflow-hidden rounded-lg border border-white/20 bg-white/[0.03] p-6">
              <div className="pointer-events-none absolute -left-10 bottom-0 h-40 w-40 rounded-full bg-[#9CCC3C]/10 blur-3xl" />
              <div className="relative">
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/40">The outcome, on record</p>
                <span className="mt-3 block h-0.5 w-7 bg-[#9CCC3C]" />
              </div>
              <div className="relative flex flex-1 items-center">
                <p className="text-2xl font-medium leading-snug text-white/90">{cs.highlights.join(". ")}.</p>
              </div>
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
                  The case <span style={{ color: "#ed1164" }}>record</span>.
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

          {/* pinned stack of entries */}
          <div className="mt-10 flex flex-col gap-[14vh]">
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

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % insights.length);
    }, 5000);
    return () => clearInterval(id);
  }, []);

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
                Latest <span style={{ color: "#ed1164" }}>insights</span>.
              </h2>
              <p className="max-w-md text-sm leading-relaxed text-black/70">
                Field notes from live engagements — security operations, delivery
                playbooks, and what actually works at scale.
              </p>
            </div>
          </Reveal>

          <div className="mt-14 grid gap-6 lg:grid-cols-[1.3fr_1fr]">
            {/* featured post */}
            <div className="relative h-[420px] overflow-hidden rounded-3xl sm:h-[520px]">
              <AnimatePresence mode="wait">
                <motion.a
                  key={featured.title}
                  href="#contact"
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
                      href="#contact"
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
      <section data-header-dark className="relative flex h-[100svh] min-h-[640px] items-center justify-start overflow-hidden bg-white">
        <div className="absolute inset-[10px] overflow-hidden rounded-3xl">
          <video autoPlay muted loop playsInline preload="auto" className="h-full w-full object-cover">
            <source src="/alphabravo-company-profile.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-[#383838]/75 via-[#383838]/55 to-[#383838]" />
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
            <a
              href={hero.secondaryCta.href}
              className="inline-flex items-center justify-center gap-2 rounded-md border border-white/30 bg-white/5 px-6 py-3 text-sm font-semibold text-white backdrop-blur transition-colors hover:bg-white/10"
            >
              {hero.secondaryCta.label}
            </a>
          </motion.div>
        </motion.div>
      </section>

      {/* ===================== 1.2 · WE DRIVE TALENT (scroll reveal) ===================== */}
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
      <section className="relative overflow-hidden bg-white text-black">
        {/* light-green glow in the top-left corner */}
        <div className="pointer-events-none absolute -left-32 -top-32 h-96 w-96 rounded-full bg-[#9CCC3C]/40 blur-[130px]" />
        <div className="relative mx-auto max-w-7xl px-6 py-20 sm:px-8">
          {/* top: heading + description / CTA */}
          <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
            <Reveal>
              <h2
                className="max-w-2xl text-[clamp(2.6rem,5.5vw,5rem)] font-extrabold uppercase leading-[0.9] tracking-tight"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Built for scale.
              </h2>
            </Reveal>
            <Reveal delay={0.1} className="shrink-0 lg:max-w-sm lg:text-right">
              <p className="text-sm leading-relaxed text-black">
                Performance that grows with your business.
              </p>
              <a
                href="#contact"
                className="mt-5 inline-flex items-center gap-2 rounded-md bg-[#2F343B] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#242A31]"
              >
                Work with us
                <ArrowRight className="h-4 w-4" />
              </a>
            </Reveal>
          </div>

          {/* stats row with dividers */}
          <div className="mt-16 grid grid-cols-2 gap-y-10 border-t border-slate-200 pt-12 lg:grid-cols-4 lg:divide-x lg:divide-slate-200">
            {stats.map((s) => (
              <CountStat
                key={s.label}
                value={s.value}
                label={s.label}
                className="px-2 lg:px-8"
                valueClassName="text-5xl font-bold text-black sm:text-6xl"
                labelClassName="mt-3 text-xs font-semibold uppercase leading-relaxed tracking-[0.18em] text-black"
              />
            ))}
          </div>
        </div>
      </section>

      {/* ===================== 7 · CREDENTIALS ===================== */}
      <section className="relative overflow-hidden bg-white">
        {/* light-green glow in the bottom-right corner */}
        <div className="pointer-events-none absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-[#9CCC3C]/50 blur-[130px]" />
        <div className="relative mx-auto max-w-7xl px-6 py-24 sm:px-8">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.7fr] lg:items-start lg:gap-16">
            {/* left: intro */}
            <Reveal>
              <div className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#9CCC3C]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#9CCC3C]" />
                Credentials
                <span className="h-px w-12 bg-slate-300" />
              </div>
              <h2
                className="mt-6 text-[clamp(2.6rem,5.5vw,5rem)] font-extrabold uppercase leading-[0.9] tracking-tight text-black"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Earned.
              </h2>
              <p className="mt-5 max-w-md text-sm leading-relaxed text-black">
                Every credential here was earned under live production conditions
                and verified externally.
              </p>
              <p className="mt-6 max-w-md text-xs leading-relaxed text-slate-400">
                SOC 2 Type II formal audit underway, controls implemented and under
                observation. Expected Q3 2026.
              </p>
            </Reveal>

            {/* right: credential badges */}
            <Reveal delay={0.1}>
              <div className="ml-auto grid max-w-md grid-cols-2 justify-items-center gap-2 sm:grid-cols-3">
                {certBadges.map((b) => (
                  <div
                    key={b.alt}
                    className="flex aspect-square w-full max-w-[150px] items-center justify-center rounded-xl border border-slate-200 bg-white p-3 shadow-sm transition-transform duration-300 hover:-translate-y-1 hover:shadow-md"
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
        </div>
      </section>

      {/* ===================== 8 · BLOG ===================== */}
      <BlogSection />

      {/* ===================== 8.5 · STUDIO CLOCK (timezones) ===================== */}
      <StudioClockSection />

      {/* ===================== 9 · FINAL CTA ===================== */}
      <section className="relative p-4 text-white sm:p-8">
        <GlassPanel className="relative overflow-hidden rounded-[2.5rem] bg-[#8DC63F]">
          <div
            className="absolute inset-0 opacity-40 mix-blend-overlay"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
            }}
          />
          <div className="relative mx-auto px-6 py-24 text-center sm:px-10 lg:px-16">
            <Reveal>
              <h2
                className="text-[clamp(2.6rem,5.5vw,5rem)] font-extrabold uppercase leading-[0.9] tracking-tight text-black"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Build your hybrid team now.
              </h2>
              <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-black/70">
                Tell us what you are trying to achieve. Mindwhiz will respond with
                the right people, the right approach, and a clear next step.
              </p>
              <a
                href="#contact"
                className="mt-8 inline-flex items-center justify-center gap-2 rounded-md bg-[#2F343B] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#242A31]"
              >
                Get in touch
                <ArrowRight className="h-4 w-4" />
              </a>
            </Reveal>
          </div>
        </GlassPanel>
      </section>

      {/* ===================== 13 · FOOTER ===================== */}
      <Footer />
      </div>
    </main>
  );
}
