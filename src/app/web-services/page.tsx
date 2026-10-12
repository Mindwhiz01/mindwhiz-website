"use client";

// ---------------------------------------------------------------------------
// Web Services - bold agency design on a light canvas. Big gradient type, a
// scrolling marquee, image service tiles, and a large browser-mockup portfolio
// shown as alternating feature rows.
// ---------------------------------------------------------------------------

import { useEffect, useRef, useState } from "react";
import { motion, type Variants } from "framer-motion";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import {
  Code2,
  LayoutDashboard,
  ShoppingCart,
  Globe2,
  Gauge,
  Wrench,
  Search,
  LineChart,
  ShieldCheck,
  ArrowUpRight,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  Star,
  Sparkles,
  MessageCircleQuestion,
  type LucideIcon,
} from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import ClientsSection from "@/components/ClientsSection";
import GoogleReviewsSection from "@/components/GoogleReviewsSection";
import Footer from "@/components/Footer";
import Cta from "@/components/Cta";
import FaqSection, { type Faq } from "@/components/FaqSection";
import { ContactForm } from "@/components/ContactFormSection";
import { SLIDE_MS, useSlideSnap } from "@/lib/useSlideSnap";
import { usePinnedActive } from "@/lib/usePinnedActive";
import { ProcessIntroBanner } from "@/components/ProcessIntroBanner";

const sans = Inter({ subsets: ["latin"], display: "swap" });
const display = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-display",
  display: "swap",
});

const reveal: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
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
    <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-[#ed1164] shadow-sm">
      <span className="h-1.5 w-1.5 rounded-full bg-[#ed1164]" />
      {children}
    </span>
  );
}

const displayFont: React.CSSProperties = { fontFamily: "var(--font-display)" };
const PINK = "#ed1164";

// full-page screenshots captured once and served from /public/portfolio,
// no third-party screenshot service at runtime, so frames load instantly.
const FRAME_H = 360;
// slow, readable glide - the same pace drives the desktop hover transition and
// the touch play/pause loop, so both screens scroll identically
const SCROLL_PX_PER_S = 170;
const MIN_SCROLL_DUR = 10;

function BrowserFrame({
  url,
  image,
  label,
  className = "",
  scroll = false,
  scrollCapPx,
  hoverAutoScroll = false,
  onScrollComplete,
}: {
  url: string;
  image: string;
  /** Project name, used as alt text when there is no live URL to show. */
  label?: string;
  className?: string;
  scroll?: boolean;
  // when set, the hover / touch preview scrolls at most this many px instead of
  // gliding through the whole page - used for a short "just a peek" scroll
  scrollCapPx?: number;
  // when true the preview is driven by JS on hover: it peeks down by scrollCapPx
  // and then fires onScrollComplete (used to advance the spotlight slider)
  hoverAutoScroll?: boolean;
  onScrollComplete?: () => void;
}) {
  const host = url.replace("https://", "").replace(/\/$/, "");
  // most-negative translateY the preview may reach, capped by scrollCapPx
  const minOffset = (clientHeight: number) => {
    const full = Math.min(0, FRAME_H - clientHeight);
    return scrollCapPx ? Math.max(full, -scrollCapPx) : full;
  };
  // hover-scroll speed follows the page length so short and long sites
  // both glide at the same pace; mouse-out snaps back quickly
  const [scrollDur, setScrollDur] = useState(MIN_SCROLL_DUR);

  // rAF-driven preview: used for the touch play/pause button and, when
  // hoverAutoScroll is on, for the desktop hover "peek then advance" behavior.
  const imgRef = useRef<HTMLImageElement>(null);
  const posRef = useRef(0); // current translateY in px (0 → negative)
  const rafRef = useRef<number | null>(null);
  const [playing, setPlaying] = useState(false);
  const hoveringRef = useRef(false);
  // keep the latest callback without re-arming the rAF effect each render
  const onCompleteRef = useRef(onScrollComplete);
  onCompleteRef.current = onScrollComplete;

  useEffect(() => {
    if (!playing) return;
    const img = imgRef.current;
    if (!img) return;
    img.style.transition = "none";
    let last = performance.now();
    const tick = (now: number) => {
      const el = imgRef.current;
      if (!el) return;
      const full = Math.min(0, FRAME_H - el.clientHeight);
      const min = scrollCapPx ? Math.max(full, -scrollCapPx) : full;
      const dt = (now - last) / 1000;
      last = now;
      posRef.current = Math.max(min, posRef.current - SCROLL_PX_PER_S * dt);
      el.style.transform = `translateY(${posRef.current}px)`;
      if (posRef.current <= min) {
        setPlaying(false);
        // peek finished - let the parent advance to the next slide
        onCompleteRef.current?.();
        return;
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [playing, scrollCapPx]);

  // start a fresh peek from the very top of the page
  const startPeek = () => {
    const el = imgRef.current;
    posRef.current = 0;
    if (el) {
      el.style.transition = "none";
      el.style.transform = "translateY(0px)";
    }
    setPlaying(false);
    requestAnimationFrame(() => setPlaying(true));
  };

  // when the slide image swaps while the pointer is still over the frame,
  // immediately peek the new site so the hover cycle keeps going
  useEffect(() => {
    if (hoverAutoScroll && hoveringRef.current) startPeek();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [image]);

  const handleEnter = () => {
    if (!hoverAutoScroll) return;
    hoveringRef.current = true;
    startPeek();
  };
  const handleLeave = () => {
    if (!hoverAutoScroll) return;
    hoveringRef.current = false;
    setPlaying(false);
    posRef.current = 0;
    const el = imgRef.current;
    if (el) {
      el.style.transition = "transform 0.5s ease-out";
      el.style.transform = "translateY(0px)";
    }
  };

  const toggleScroll = (e: React.MouseEvent) => {
    // frames can sit inside a link, so don't navigate when tapping the control
    e.preventDefault();
    e.stopPropagation();
    setPlaying((p) => {
      if (!p) {
        const el = imgRef.current;
        const min = el ? minOffset(el.clientHeight) : 0;
        // if parked at the bottom, restart from the top
        if (posRef.current <= min) {
          posRef.current = 0;
          if (el) el.style.transform = "translateY(0px)";
        }
      }
      return !p;
    });
  };

  return (
    <div className={`overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl shadow-black/[0.08] ${className}`}>
      <div className="flex items-center gap-2 border-b border-slate-200 bg-[#f4f3f0] px-4 py-3">
        <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
        <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
        <span className="h-3 w-3 rounded-full bg-[#28c840]" />
        <span className="ml-3 flex-1 truncate rounded-md border border-slate-200 bg-white px-3 py-1 text-center text-xs text-black/45">
          {host}
        </span>
      </div>
      {scroll ? (
        // full-page preview that scrolls top → bottom on hover
        <div
          className="relative h-[360px] overflow-hidden bg-[#f2f1ee]"
          onMouseEnter={handleEnter}
          onMouseLeave={handleLeave}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            ref={imgRef}
            src={image}
            alt={host ? `${host} website built by MindWhiz` : label ? `${label} screenshot` : "Website project screenshot"}
            loading="lazy"
            decoding="async"
            onLoad={(e) => {
              const dist = e.currentTarget.clientHeight - FRAME_H;
              if (dist > 0) setScrollDur(Math.max(MIN_SCROLL_DUR, dist / SCROLL_PX_PER_S));
            }}
            style={{
              "--scroll-dur": `${scrollDur}s`,
              // capped or full CSS-hover target (only used when JS is not driving)
              "--hover-y": scrollCapPx
                ? `max(calc(360px - 100%), -${scrollCapPx}px)`
                : "min(0px, calc(360px - 100%))",
            } as React.CSSProperties}
            className={`w-full ease-linear [transition-property:transform] [transition-duration:0.9s] ${
              hoverAutoScroll
                ? ""
                : "[@media(hover:hover)]:group-hover:translate-y-[var(--hover-y)] [@media(hover:hover)]:group-hover:[transition-duration:var(--scroll-dur)]"
            }`}
          />
          {/* touch-only play / pause control, bottom-left, small */}
          <button
            type="button"
            onClick={toggleScroll}
            aria-label={playing ? "Pause preview scroll" : "Play preview scroll"}
            className="absolute bottom-3 left-3 z-10 grid h-8 w-8 place-items-center rounded-full bg-black/60 text-white backdrop-blur transition-colors hover:bg-[#ed1164] lg:hidden"
          >
            {playing ? <Pause className="h-3.5 w-3.5 fill-current" /> : <Play className="h-3.5 w-3.5 translate-x-[1px] fill-current" />}
          </button>
          {/* hover hint only makes sense on pointer devices */}
          <span className="pointer-events-none absolute bottom-3 right-3 hidden rounded-full bg-black/60 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-white opacity-100 backdrop-blur transition-opacity duration-300 group-hover:opacity-0 lg:block">
            Hover to scroll
          </span>
        </div>
      ) : (
        <div className="relative aspect-[16/10] overflow-hidden bg-[#f2f1ee]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={image}
            alt={host ? `${host} website built by MindWhiz` : label ? `${label} screenshot` : "Website project screenshot"}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover object-top transition-transform duration-[900ms] ease-out group-hover:scale-[1.05]"
          />
        </div>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// data
// ---------------------------------------------------------------------------
const services: { title: string; desc: string; Icon: LucideIcon; image: string; audience?: string; hook?: string; shot?: boolean }[] = [
  { title: "Custom Websites", audience: "For B2B & B2C brands", hook: "Is your website winning customers, or quietly losing them?", desc: "Marketing sites and landing pages designed to convert, fast, responsive, and pixel perfect on every device. We craft clear messaging, intuitive navigation, and conversion focused layouts that turn visitors into customers and grow your brand online.", Icon: Globe2, image: "/images/stock/custom-websites.webp" },
  { title: "Web Applications", audience: "For B2B & SaaS teams", hook: "Still running your business on spreadsheets and manual work?", desc: "Full stack apps and internal tools built on modern frameworks with secure APIs and clean architecture. From MVPs to complex platforms, we build software that scales with your business, stays easy to maintain, and keeps your users productive.", Icon: Code2, image: "/images/stock/web-applications.webp" },
  { title: "Dashboards & Portals", audience: "For B2B & B2C teams", hook: "What if your data was clear enough to act on in seconds?", desc: "Data rich admin panels, analytics dashboards, and customer portals with real time reporting. We turn complex data into clear, actionable interfaces your team and clients will actually use, with role based access and clean visualizations.", Icon: LayoutDashboard, image: "/portfolio/primeaxis-admin-dashboard.png" },
  { title: "Ecommerce", audience: "For B2C & retail brands", hook: "Are shoppers leaving before they reach your checkout?", desc: "Storefronts, checkout flows, and payment integrations tuned for speed, trust, and higher order value. We build shopping experiences that load fast, feel secure, and drive repeat purchases across web and mobile.", Icon: ShoppingCart, image: "/images/stock/ecommerce-development.webp" },
  { title: "Performance & Care", desc: "Core Web Vitals tuning, hosting, security patches, and ongoing maintenance so your site never stalls. We monitor, optimize, and keep everything running smoothly long after launch, so you can focus on your business.", Icon: Gauge, image: "/images/stock/website-performance-and-care.webp" },
  { title: "Support & Retainers", desc: "Dedicated web engineers on call for updates, new features, and fixes on a predictable monthly cadence. Think of us as your on demand web team, ready whenever you need to ship changes, test ideas, or move fast.", Icon: Wrench, image: "/images/stock/web-support-retainers.webp" },
];

const stackGroups: { label: string; items: { name: string; slug: string; color: string }[] }[] = [
  {
    label: "Languages",
    items: [
      { name: "JavaScript", slug: "javascript", color: "#E8A400" },
      { name: "TypeScript", slug: "typescript", color: "#3178C6" },
      { name: "PHP", slug: "php", color: "#777BB4" },
      { name: "Python", slug: "python", color: "#3776AB" },
    ],
  },
  {
    label: "Frameworks & Libraries",
    items: [
      { name: "React", slug: "react", color: "#149ECA" },
      { name: "Next.js", slug: "nextdotjs", color: "#000000" },
      { name: "Node.js", slug: "nodedotjs", color: "#5FA04E" },
      { name: "Laravel", slug: "laravel", color: "#FF2D20" },
      { name: "Tailwind CSS", slug: "tailwindcss", color: "#06B6D4" },
    ],
  },
  {
    label: "CMS & E-commerce",
    items: [
      { name: "WordPress", slug: "wordpress", color: "#21759B" },
      { name: "WooCommerce", slug: "woocommerce", color: "#96588A" },
      { name: "Shopify", slug: "shopify", color: "#5E8E3E" },
      { name: "Webflow", slug: "webflow", color: "#146EF5" },
      { name: "Wix", slug: "wix", color: "#0C6EFC" },
      { name: "Drupal", slug: "drupal", color: "#0678BE" },
    ],
  },
  {
    label: "Databases",
    items: [
      { name: "MySQL", slug: "mysql", color: "#00758F" },
      { name: "PostgreSQL", slug: "postgresql", color: "#336791" },
      { name: "MongoDB", slug: "mongodb", color: "#47A248" },
      { name: "Supabase", slug: "supabase", color: "#3FCF8E" },
      { name: "Firebase", slug: "firebase", color: "#F57C00" },
      { name: "Redis", slug: "redis", color: "#DC382D" },
      { name: "SQLite", slug: "sqlite", color: "#003B57" },
    ],
  },
  {
    label: "AI & ML",
    items: [
      { name: "OpenAI", slug: "openai", color: "#412991" },
      { name: "Claude", slug: "claude", color: "#D97757" },
      { name: "Gemini", slug: "googlegemini", color: "#4285F4" },
      { name: "Hugging Face", slug: "huggingface", color: "#FF9D00" },
      { name: "LangChain", slug: "langchain", color: "#1C3C3C" },
      { name: "TensorFlow", slug: "tensorflow", color: "#FF6F00" },
      { name: "PyTorch", slug: "pytorch", color: "#EE4C2C" },
      { name: "Ollama", slug: "ollama", color: "#000000" },
    ],
  },
  {
    label: "Mobile",
    items: [
      { name: "React Native", slug: "react", color: "#149ECA" },
      { name: "Flutter", slug: "flutter", color: "#02569B" },
      { name: "Swift", slug: "swift", color: "#F05138" },
      { name: "Kotlin", slug: "kotlin", color: "#7F52FF" },
      { name: "Expo", slug: "expo", color: "#000000" },
    ],
  },
  {
    label: "Cloud & Hosting",
    items: [
      { name: "AWS", slug: "amazonwebservices", color: "#FF9900" },
      { name: "DigitalOcean", slug: "digitalocean", color: "#0080FF" },
      { name: "Vercel", slug: "vercel", color: "#000000" },
      { name: "Hostinger", slug: "hostinger", color: "#673DE6" },
      { name: "GoDaddy", slug: "godaddy", color: "#018E8C" },
    ],
  },
  {
    label: "DevOps & Tools",
    items: [
      { name: "Docker", slug: "docker", color: "#2496ED" },
      { name: "Kubernetes", slug: "kubernetes", color: "#326CE5" },
      { name: "Git", slug: "git", color: "#F05032" },
      { name: "GitHub Actions", slug: "githubactions", color: "#2088FF" },
      { name: "GitLab", slug: "gitlab", color: "#FC6D26" },
      { name: "Jenkins", slug: "jenkins", color: "#D33833" },
      { name: "Nginx", slug: "nginx", color: "#009639" },
    ],
  },
];

const portfolio: { name: string; url: string; image: string; category: string; blurb: string }[] = [
  { name: "Marquee Ranch", url: "https://marqueeranch.com/", image: "/portfolio/marquee-ranch.jpg", category: "Hospitality · Real Estate", blurb: "An elegant venue and ranch experience with rich galleries and event enquiries." },
  { name: "Tempura Halal", url: "https://tempurahalal.com/", image: "/portfolio/tempura-halal-updated.jpg", category: "Food & Restaurant", blurb: "An appetizing restaurant site with menus, online ordering, and event catering." },
  { name: "Tempura Food USA", url: "https://tempurafoodusa.com/", image: "/portfolio/tempura-food-usa.jpg", category: "Food & Beverage", blurb: "A bold food brand site showcasing products, story, and distribution." },
  { name: "My Safe Drives", url: "https://mysafedrives.com/", image: "/portfolio/my-safe-drives.jpg", category: "Automotive · Safety", blurb: "A clean, reassuring platform focused on safe driving services and signups." },
  { name: "Crownline Construction", url: "https://crownlineconstruct.com/", image: "/portfolio/crownline-construction.jpg", category: "Construction", blurb: "A sturdy construction brand with project showcases and lead capture." },
  { name: "Maria Basit Malik", url: "https://mariabasitmalik.com/", image: "/portfolio/maria-basit-malik.jpg", category: "Fashion · Luxury", blurb: "A luxury couture store with rich lookbooks, featured collections, and shoppable edits." },
  { name: "Iron Box", url: "https://ironbox963.com/", image: "/portfolio/iron-box.jpg", category: "Ecommerce · Apparel", blurb: "An activewear storefront with collection browsing, product pages, and a smooth checkout." },
];

const seoCaps: { title: string; desc: string; Icon: LucideIcon; image: string }[] = [
  { title: "Technical SEO", desc: "Clean markup, crawlability, sitemaps, and canonical tags from day one.", Icon: Search, image: "/images/stock/search-visibility.webp" },
  { title: "Core Web Vitals", desc: "Fast loads and stable layouts that Google rewards and users feel.", Icon: Gauge, image: "/images/stock/campaign-planning.webp" },
  { title: "Structured Data", desc: "Schema.org markup for rich results, products, reviews, and FAQs.", Icon: Code2, image: "/images/stock/structured-data-schema-markup.webp" },
  { title: "Analytics", desc: "GA4, Search Console, and conversion tracking wired up and measured.", Icon: LineChart, image: "/images/stock/performance-reporting.webp" },
  { title: "On page & Local", desc: "Optimized metadata, content structure, and local listings that rank.", Icon: Globe2, image: "/images/stock/growth-planning.webp" },
  { title: "Secure & Accessible", desc: "HTTPS, best practice security, and accessible semantic HTML.", Icon: ShieldCheck, image: "/images/stock/secure-accessible-websites.webp" },
];

const steps = [
  { n: "01", title: "Discover", desc: "Map goals, audience, and scope, then set timeline and success metrics." },
  { n: "02", title: "Design", desc: "Wireframes and high fidelity designs turn the plan into an on brand experience." },
  { n: "03", title: "Build", desc: "Responsive front end and secure back end with your CMS and integrations." },
  { n: "04", title: "Optimize", desc: "Tune performance, wire up SEO and analytics, and test across devices." },
  { n: "05", title: "Launch", desc: "Ship, monitor, and stay on for updates, features, and fixes." },
];

const seoTools: { name: string; slug: string }[] = [
  { name: "Google Analytics", slug: "googleanalytics" },
  { name: "Search Console", slug: "googlesearchconsole" },
  { name: "SEMrush", slug: "semrush" },
  { name: "Tag Manager", slug: "googletagmanager" },
  { name: "PageSpeed", slug: "pagespeedinsights" },
  { name: "Lighthouse", slug: "lighthouse" },
  { name: "Yoast SEO", slug: "yoast" },
  { name: "Hotjar", slug: "hotjar" },
];

// The three optimization disciplines we cover - each acronym spelled out in
// full and shown as a stepped column that floods with its own colour on hover.
// fill = full-colour hover wash, num = acronym colour at rest (readable on
// white), ink = text colour once the column is filled.
const optimizations: {
  abbr: string;
  rank: string;
  full: string;
  tag: string;
  desc: string;
  Icon: LucideIcon;
  fill: string;
  num: string;
  ink: string;
}[] = [
  {
    abbr: "SEO",
    rank: "01",
    full: "Search Engine Optimization",
    tag: "search / google · bing",
    desc: "Rank higher on Google and Bing with fast, clean, technically sound pages built to be crawled and indexed.",
    Icon: Search,
    fill: "#111827",
    num: "#111827",
    ink: "#ffffff",
  },
  {
    abbr: "AEO",
    rank: "02",
    full: "Answer Engine Optimization",
    tag: "answers / snippets · voice",
    desc: "Win the direct answer in voice search, featured snippets, and assistants with structured, question-first content.",
    Icon: MessageCircleQuestion,
    fill: "#ed1164",
    num: "#ed1164",
    ink: "#ffffff",
  },
  {
    abbr: "GEO",
    rank: "03",
    full: "Generative Engine Optimization",
    tag: "ai / chatgpt · gemini",
    desc: "Get cited inside AI answers from ChatGPT, Gemini, and Perplexity so your brand shows up where buyers now search.",
    Icon: Sparkles,
    fill: "#9CCC3C",
    num: "#5f8a1e",
    ink: "#14210a",
  },
];

// Rest bottom inset per column (sm+). Every block reaches the top of the board
// and steps along the bottom - a descending staircase that grows taller left to
// right. On hover the block animates to bottom:0 and fills its whole column.
const OPT_BOTTOM = ["230px", "130px", "20px"];

// Extra top padding per column (sm+) so each title sits lower than the one
// before it - the cascading-number look from the reference. The last column is
// kept a touch higher so its longer, hover-revealed description still fits.
const OPT_PT = ["", "sm:pt-24", "sm:pt-36"];

// Mobile only: at rest each stacked card's colour starts at the left and leaves
// a little empty space on the right (a bit more on each row down). On hover the
// card grows to full width - see hover:mr-0 on the card.
const OPT_MR = ["", "mr-6", "mr-12"];

// ---------------------------------------------------------------------------
// sections
// ---------------------------------------------------------------------------
function Marquee({ items, reverse = false }: { items: string[]; reverse?: boolean }) {
  const row = [...items, ...items];
  return (
    <div className="flex overflow-hidden">
      <motion.div
        aria-hidden
        initial={{ x: reverse ? "-50%" : "0%" }}
        animate={{ x: reverse ? "0%" : "-50%" }}
        transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
        className="flex shrink-0 items-center gap-8 pr-8"
      >
        {row.map((t, i) => (
          <span key={i} className="flex items-center gap-8 whitespace-nowrap text-2xl font-extrabold uppercase tracking-tight text-black/15 sm:text-3xl" style={{ fontFamily: "var(--font-display)" }}>
            {t}
            <Star className="h-4 w-4 fill-[#ed1164] text-[#ed1164]" />
          </span>
        ))}
      </motion.div>
    </div>
  );
}

function Hero() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden bg-white pt-36 pb-12">
      <div className="pointer-events-none absolute -right-40 -top-20 h-[38rem] w-[38rem] rounded-full bg-[#ed1164]/12 blur-[160px]" />
      <div className="pointer-events-none absolute -left-40 top-1/2 h-[30rem] w-[30rem] rounded-full bg-[#9CCC3C]/15 blur-[160px]" />
      <div className="relative mx-auto grid w-full max-w-7xl items-center gap-14 px-6 sm:px-8 lg:gap-6 lg:grid-cols-2">
        <div className="order-2 lg:order-1">
          <Reveal delay={0.05}>
            <h1 className="mt-7 text-[clamp(2.6rem,7vw,6rem)] font-extrabold uppercase leading-[0.9] tracking-tight text-black" style={displayFont}>
              Websites
              {/* three lines on every size: Websites / built for / growth */}
              <br />
              {/* keep "built for" on one line so "for" never drops on narrow screens */}
              <span className="whitespace-nowrap">built for</span>
              <br />
              <span style={{ color: PINK }}>growth</span>
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-7 max-w-lg text-lg leading-relaxed text-black/60">
              High performance websites, web apps, and dashboards, designed, built, and
              optimized to look sharp, load fast, and rank well.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <Cta href="/contact" label="Get in touch" />
              <Cta href="https://api.leadconnectorhq.com/widget/booking/I1hzuNe9sXdClDrIUCe3" target="_blank" rel="noreferrer" label="Book free consultation" className="!border-[#ed1164] !bg-[#ed1164] !text-white shadow-xl shadow-[#ed1164]/50 hover:!bg-[#c50e53]" />
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.1} className="relative order-1 lg:order-2">
          <motion.div
            animate={{ y: [0, -14, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="group relative"
          >
            <div className="pointer-events-none absolute -inset-6 rounded-[2rem] bg-gradient-to-tr from-[#ed1164]/30 to-[#9CCC3C]/25 opacity-50 blur-2xl" />
            {/* laptop is the main device; phone floats over its right edge.
                both are tilted to match the earlier angled mockup, and on
                hover they drift apart a little (laptop left, phone right). */}
            <div className="relative z-10 pr-[16%] [perspective:1200px]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/portfolio/hero-laptop.png"
                alt="Alpha Bravo Construction website shown on a laptop"
                className="w-full rotate-[-3deg] transition-transform duration-500 ease-out group-hover:-translate-x-3 group-hover:rotate-[-4deg]"
              />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/portfolio/hero-phone.png"
                alt="Alpha Bravo Construction website shown on a phone"
                className="absolute bottom-0 right-0 z-20 w-[27%] rotate-[4deg] drop-shadow-2xl transition-transform duration-500 ease-out group-hover:translate-x-5 group-hover:translate-y-2 group-hover:rotate-[7deg]"
              />
            </div>
          </motion.div>
        </Reveal>
      </div>
    </section>
  );
}

function MarqueeStrip() {
  return (
    <div className="relative border-y border-slate-200 bg-[#faf9f7] py-6">
      {/* Hostinger badge in top right corner */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/badges/Badge_brand_dark_640x240.webp"
        alt="Hostinger Partner Badge"
        className="absolute z-30 h-16 w-48 drop-shadow-lg"
        style={{ top: '-90px', right: '20px' }}
      />
      <Marquee items={["Web Design", "Web Apps", "Dashboards", "Ecommerce", "SEO", "Performance", "Support"]} />
    </div>
  );
}

// Full-screen image slide - matches the shared ProcessScroll look: the image
// scales in behind a dark gradient, a giant ghost index sits top-right, the
// title top-left and the description bottom-right.
function ServicePanel({
  s,
  i,
  active,
}: {
  s: (typeof services)[number];
  i: number;
  active: number;
}) {
  const isActive = i === active;

  return (
    <motion.div
      initial={false}
      animate={{ opacity: isActive ? 1 : 0 }}
      transition={{ duration: SLIDE_MS / 1000, ease: [0.22, 1, 0.36, 1] }}
      style={{ zIndex: isActive ? 2 : 1 }}
      className="pointer-events-none absolute inset-0"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <motion.img
        src={s.image}
        alt={`${s.title} - web development services`}
        initial={false}
        animate={{ scale: isActive ? 1 : 1.15 }}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
        className={
          s.shot
            ? "absolute inset-0 h-full w-full object-contain p-6 [filter:drop-shadow(0_8px_18px_rgba(0,0,0,0.85))_drop-shadow(0_30px_60px_rgba(0,0,0,0.95))_drop-shadow(0_60px_120px_rgba(0,0,0,0.9))] sm:p-16"
            : "absolute inset-0 h-full w-full object-cover"
        }
      />
      {/* screenshot panels keep a lighter wash so the dashboard stays prominent;
          photo panels get the full dark gradient for readable overlaid text */}
      {s.shot ? (
        <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-transparent to-black/80" />
      ) : (
        <>
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/30" />
          <div className="absolute inset-0 bg-black/25" />
        </>
      )}

      {/* giant ghost index number, top-right */}
      <motion.span
        initial={false}
        animate={{ y: isActive ? 0 : 30, opacity: isActive ? 1 : 0 }}
        transition={{ duration: SLIDE_MS / 1000, ease: [0.22, 1, 0.36, 1] }}
        style={displayFont}
        className="pointer-events-none absolute right-4 top-24 select-none text-[26vw] font-extrabold leading-none text-white/[0.07] sm:right-10 sm:text-[18vw]"
      >
        {String(i + 1).padStart(2, "0")}
      </motion.span>

      {/* heading, top-left */}
      <motion.div
        initial={false}
        animate={isActive ? { y: 0, opacity: 1 } : { y: 70, opacity: 0 }}
        transition={{ duration: SLIDE_MS / 1000, ease: [0.22, 1, 0.36, 1], delay: isActive ? 0.12 : 0 }}
        className="absolute inset-x-0 top-0 mx-auto max-w-6xl px-6 pt-36 sm:px-8 sm:pt-40"
      >
        {/* audience eyebrow - tells B2B and B2C visitors this is for them */}
        {/* {s.audience && (
          <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-white backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-[#ed1164]" />
            {s.audience}
          </span>
        )} */}
        <h3
          className="max-w-2xl text-[clamp(1.9rem,5.5vw,4.5rem)] font-extrabold uppercase leading-[0.95] tracking-tight text-white"
          style={displayFont}
        >
          {s.title}
        </h3>
        {/* catchy hook line under the title */}
        {s.hook && (
          <p className="mt-5 max-w-xl text-lg font-medium leading-snug text-white/90 sm:text-2xl" style={displayFont}>
            {s.hook}
          </p>
        )}
      </motion.div>

      {/* description, bottom-right */}
      <motion.div
        initial={false}
        animate={isActive ? { y: 0, opacity: 1 } : { y: 70, opacity: 0 }}
        transition={{ duration: SLIDE_MS / 1000, ease: [0.22, 1, 0.36, 1], delay: isActive ? 0.12 : 0 }}
        className="absolute inset-x-0 bottom-0 mx-auto flex max-w-6xl justify-end px-6 pb-16 sm:px-8 sm:pb-28"
      >
        <div className="flex max-w-lg items-start gap-4 sm:gap-6">
          <span className="mt-2 hidden h-px w-16 shrink-0 bg-white/40 sm:block" />
          <div>
            <p className="text-base leading-relaxed text-white/85 sm:text-xl">{s.desc}</p>
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

function ServicesSection() {
  const ref = useRef<HTMLDivElement>(null);
  const total = 3;

  // Active slide is read from the track's geometry (see usePinnedActive) so it
  // stays locked to the snap position on every size, including the zoomed
  // laptop layout where scrollYProgress would leave the last panel skipped.
  const active = usePinnedActive(ref, total);

  // Pinned, one-gesture-per-slide deck on every size - the hook handles both
  // wheel (desktop/laptop) and touch (mobile/tablet), so the same animated
  // scroll experience runs everywhere.
  useSlideSnap(ref, total);

  return (
    <section id="web-that-works" className="relative bg-[#faf9f7]">
      <div
        ref={ref}
        data-header-dark
        className="relative bg-black"
        style={{ height: `calc(var(--svh) * ${total * 100})` }}
      >
        <div className="sticky top-0 h-[calc(var(--svh)*100)] overflow-hidden">
          {services.slice(0, total).map((s, i) => (
            <ServicePanel key={s.title} s={s} i={i} active={active} />
          ))}

          {/* progress bar - fills one segment per slide */}
          <div className="absolute inset-x-0 bottom-0 z-10 h-1 bg-white/15">
            <motion.div
              initial={false}
              animate={{ scaleX: (active + 1) / total }}
              transition={{ duration: SLIDE_MS / 1000, ease: [0.22, 1, 0.36, 1] }}
              style={{ transformOrigin: "left" }}
              className="h-full w-full bg-[#ed1164]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function PortfolioSection() {
  return (
    <section id="work" className="relative overflow-hidden border-t border-slate-100 bg-[#faf9f7] py-24">
      <div className="relative mx-auto max-w-7xl px-6 sm:px-8">
        <Reveal className="max-w-3xl">
          <Kicker>Selected work</Kicker>
          <h2 className="mt-5 text-[clamp(2.6rem,5.5vw,5rem)] font-extrabold uppercase leading-[0.9] tracking-tight text-black" style={displayFont}>
            Web development we&apos;ve <span style={{ color: PINK }}>Delivered</span>
          </h2>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-black/60">
            From first concept to launch day, a selection of the websites, stores, and platforms
            we&apos;ve designed, built, and shipped end to end for brands ready to stand out.
          </p>
        </Reveal>

        <div className="mt-16 flex flex-col gap-20 lg:gap-28">
          {portfolio.map((p, i) => {
            const flip = i % 2 === 1;
            return (
              <Reveal key={p.url}>
                <div className={`grid items-center gap-10 lg:grid-cols-2 lg:gap-16 ${flip ? "lg:[&>*:first-child]:order-2" : ""}`}>
                  <a href={p.url} target="_blank" rel="noreferrer" className="group relative block">
                    <div className="pointer-events-none absolute -inset-5 rounded-[2rem] bg-gradient-to-tr from-[#ed1164]/25 to-[#9CCC3C]/20 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-70" />
                    <BrowserFrame url={p.url} image={p.image} scroll className="relative transition-transform duration-500 group-hover:-translate-y-2" />
                  </a>
                  <div>
                    <span className="text-6xl font-extrabold text-black/[0.07] sm:text-7xl" style={{ fontFamily: "var(--font-display)" }}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <p className="mt-3 text-xs font-semibold uppercase tracking-[0.18em] text-[#ed1164]">{p.category}</p>
                    <h3 className="mt-3 text-4xl font-extrabold uppercase tracking-tight text-black sm:text-5xl" style={{ fontFamily: "var(--font-display)" }}>
                      {p.name}
                    </h3>
                    <p className="mt-4 max-w-md text-base leading-relaxed text-black/60">{p.blurb}</p>
                    <a href={p.url} target="_blank" rel="noreferrer" className="mt-6 inline-flex items-center gap-2 rounded-full border border-black/15 px-4 py-2.5 text-sm font-semibold text-black transition-colors hover:border-[#ed1164] hover:text-[#ed1164]">
                      Visit site
                      <ArrowUpRight className="h-4 w-4" />
                    </a>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

const spotlightSites: { name: string; url: string; image: string; category: string; blurb: string }[] = [
  { name: "PrimeAxis Reporting", url: "", image: "/portfolio/prime-axis-dashboard.jpg", category: "Insurance · Analytics", blurb: "A reporting suite with premium and conversion metrics, leads over time, and breakdowns by line, source, and agent." },
  { name: "Charity Finance", url: "", image: "/portfolio/charity-finance-dashboard.png", category: "Fintech · Nonprofit", blurb: "A charity finance management system with beneficiary tracking, payment trends, and Zakat-eligible reporting." },
  { name: "Inovatiqa Admin", url: "", image: "/portfolio/inovatiqa-dashboard.png", category: "Ecommerce · Admin Panel", blurb: "A full e-commerce admin dashboard with revenue analytics, orders, inventory sync, and role-based access." },
  { name: "PrimeAxis Admin", url: "", image: "/portfolio/primeaxis-admin-dashboard.png", category: "Insurance · CRM", blurb: "An insurance lead and policy CRM with pipeline tracking, ACORD forms, quoting, and agent performance." },
];

// Software / dashboard spotlight carousel - one centered browser mockup with a
// floating pill button above it, on a soft light-gray band. Left/right arrows
// cycle through each featured dashboard we've built.
function AlphaBravoShowcase() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const total = spotlightSites.length;
  const current = spotlightSites[i];
  const go = (dir: number) => setI((p) => (p + dir + total) % total);

  // auto-advance every few seconds; hovering the slider pauses it so visitors
  // can read the detail and hover-scroll the preview without it moving on
  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => setI((p) => (p + 1) % total), 5000);
    return () => clearInterval(id);
  }, [paused, total]);

  return (
    <section
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      className="relative overflow-hidden border-t border-slate-100 bg-[#EEEEEE] py-24"
    >
      <div className="relative mx-auto flex max-w-6xl flex-col items-center px-6 sm:px-8">
        <Reveal className="mb-14 max-w-3xl text-center">
          <div className="flex justify-center">
            <Kicker>Software Development</Kicker>
          </div>
          <h2 className="mt-5 text-[clamp(2.4rem,5.5vw,4.6rem)] font-extrabold uppercase leading-[0.9] tracking-tight text-black" style={displayFont}>
            Dashboards built to <span style={{ color: PINK }}>Scale</span> with you
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-black/60">
            Custom admin dashboards, internal tools, and data-rich web applications, built on modern
            frameworks with secure APIs, real-time reporting, and role-based access your team will
            actually use.
          </p>
        </Reveal>

        {/* single centered browser mockup, one featured dashboard at a time.
            No key remount here so the frame persists across slides and the
            hover peek-then-advance cycle keeps running while the pointer stays. */}
        <div className="w-full max-w-4xl">
          <div className="group relative">
            <div className="pointer-events-none absolute -inset-6 rounded-[2rem] bg-gradient-to-tr from-[#ed1164]/20 to-[#9CCC3C]/15 opacity-60 blur-2xl" />
            <BrowserFrame
              url={current.url}
              image={current.image}
              label={current.name}
              scroll
              hoverAutoScroll
              scrollCapPx={520}
              onScrollComplete={() => go(1)}
              className="relative"
            />
          </div>
        </div>

        {/* arrows + dots so users can move left / right through the slider */}
        <div className="mt-10 flex items-center justify-center gap-6">
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label="Previous website"
            className="grid h-12 w-12 place-items-center rounded-full bg-white text-black shadow-lg shadow-black/10 transition-colors hover:bg-[#ed1164] hover:text-white"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <div className="flex items-center gap-2">
            {spotlightSites.map((p, idx) => (
              <button
                key={p.image}
                type="button"
                onClick={() => setI(idx)}
                aria-label={`Show ${p.name}`}
                className={`h-2.5 rounded-full transition-all ${idx === i ? "w-6 bg-[#ed1164]" : "w-2.5 bg-black/20 hover:bg-black/40"}`}
              />
            ))}
          </div>
          <button
            type="button"
            onClick={() => go(1)}
            aria-label="Next website"
            className="grid h-12 w-12 place-items-center rounded-full bg-white text-black shadow-lg shadow-black/10 transition-colors hover:bg-[#ed1164] hover:text-white"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        <div className="mt-14 flex justify-center">
          <Cta href="/contact" label="Contact us" />
        </div>
      </div>
    </section>
  );
}

// brand logo tinted to its own color via CSS mask (source SVGs live in /public/stack)
function StackIcon({ slug, color }: { slug: string; color: string }) {
  const isPng = slug === "drupal";

  if (isPng) {
    return (
      <img
        aria-hidden
        src={`/stack/${slug}.png`}
        alt="Drupal logo"
        className="h-6 w-6 shrink-0 object-contain"
      />
    );
  }

  return (
    <span
      aria-hidden
      className="h-6 w-6 shrink-0"
      style={{
        backgroundColor: color,
        WebkitMaskImage: `url(/stack/${slug}.svg)`,
        maskImage: `url(/stack/${slug}.svg)`,
        WebkitMaskRepeat: "no-repeat",
        maskRepeat: "no-repeat",
        WebkitMaskPosition: "center",
        maskPosition: "center",
        WebkitMaskSize: "contain",
        maskSize: "contain",
      }}
    />
  );
}

function StackSection() {
  return (
    <section className="relative overflow-hidden border-y border-slate-200 bg-white py-20">
      <div className="relative mx-auto max-w-6xl px-6 sm:px-8">
        <Reveal className="text-center">
          <Kicker>Our stack</Kicker>
          <h2 className="mt-5 text-[clamp(2.4rem,5vw,4.5rem)] font-extrabold uppercase leading-[0.9] tracking-tight text-black" style={displayFont}>
            Languages &amp; <span style={{ color: PINK }}>technology</span>
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-black/55">
            The tools we build with every day, from front end frameworks and CMS platforms
            to databases, mobile, cloud hosting, and the DevOps that keeps it all shipping.
          </p>
        </Reveal>

        <div className="mt-14 flex flex-col gap-8">
          {stackGroups.map((group, gi) => (
            <Reveal
              key={group.label}
              delay={gi * 0.05}
              className="grid gap-4 border-t border-slate-200/80 pt-8 sm:grid-cols-[210px_1fr] sm:gap-8"
            >
              <div className="flex items-start gap-3">
                <span className="mt-0.5 text-sm font-bold text-[#ed1164]" style={displayFont}>
                  {String(gi + 1).padStart(2, "0")}
                </span>
                <h3 className="text-lg font-bold uppercase tracking-tight text-black" style={displayFont}>
                  {group.label}
                </h3>
              </div>
              <div className="flex flex-wrap gap-3">
                {group.items.map((item, ii) => (
                  <motion.div
                    key={`${group.label}-${item.name}`}
                    initial={{ opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.4, delay: ii * 0.03, ease: [0.22, 1, 0.36, 1] }}
                    whileHover={{ y: -3 }}
                    className="group flex items-center gap-2.5 rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 shadow-sm transition-colors duration-300 hover:border-[#ed1164]/40 hover:shadow-md"
                  >
                    <StackIcon slug={item.slug} color={item.color} />
                    <span className="whitespace-nowrap text-sm font-semibold text-black/70 transition-colors duration-300 group-hover:text-[#ed1164]">
                      {item.name}
                    </span>
                  </motion.div>
                ))}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function SeoSection() {
  return (
    <section className="relative overflow-x-clip bg-[#faf9f7] py-24">
      <div className="pointer-events-none absolute -left-32 bottom-0 h-96 w-96 rounded-full bg-[#9CCC3C]/12 blur-[150px]" />
      <div className="relative mx-auto max-w-7xl px-6 sm:px-8">
        <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          {/* left: heading - sticky while the notes scroll by */}
          <div className="lg:sticky lg:top-32 lg:self-start">
            <Reveal>
              <Kicker>Search ready</Kicker>
              <h2 className="mt-5 text-[clamp(2.6rem,5.5vw,5rem)] font-extrabold uppercase leading-[0.9] tracking-tight text-black" style={displayFont}>
                SEO built <span style={{ color: PINK }}>in</span>
              </h2>
              <p className="mt-5 max-w-md text-base leading-relaxed text-black/55">
                Every site we ship is engineered to be found, fast, technically sound,
                and structured for search from the first commit.
              </p>
              <a
                href="/blog/web-development-trends-2026"
                className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#ed1164] transition-colors hover:text-[#c50e53]"
              >
                Read: Web Development Trends 2026 for US &amp; UK businesses
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </Reveal>
          </div>

          {/* right: pinned sticky-note cards, zigzag with dashed connector */}
          <div className="relative">
            {/* dashed connector weaving between the notes */}
            <svg
              aria-hidden
              className="pointer-events-none absolute inset-0 hidden h-full w-full sm:block"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
            >
              <path
                d="M 72 3 C 30 8, 22 12, 28 18 C 60 28, 75 30, 72 37 C 66 46, 28 44, 28 52 C 28 60, 74 60, 72 70 C 70 78, 30 78, 28 87 C 27 92, 40 95, 55 96"
                fill="none"
                stroke="#b9b7b2"
                strokeWidth="0.45"
                strokeDasharray="1.6 1.8"
              />
            </svg>

            <div className="relative flex flex-col gap-12 sm:gap-16">
              {seoCaps.map((s, i) => {
                const right = i % 2 === 0;
                return (
                  <motion.div
                    key={s.title}
                    initial={{ opacity: 0, y: 50, rotate: right ? 7 : -7 }}
                    whileInView={{ opacity: 1, y: 0, rotate: right ? 2 : -2 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ type: "spring", stiffness: 120, damping: 16 }}
                    whileHover={{ rotate: 0, scale: 1.03 }}
                    className={`relative w-full max-w-[21rem] rounded-[1.4rem] bg-white p-7 pt-9 shadow-[0_18px_40px_-12px_rgba(0,0,0,0.18)] ${
                      right ? "self-end sm:mr-4" : "self-start sm:ml-4"
                    }`}
                  >
                    {/* push-pin */}
                    <span className="absolute -top-3 left-1/2 h-6 w-6 -translate-x-1/2 rounded-full bg-[#3b3b3b] shadow-[inset_0_2px_3px_rgba(255,255,255,0.45),0_3px_6px_rgba(0,0,0,0.3)] ring-4 ring-[#faf9f7]" />

                    <span className="text-sm font-semibold text-black/35" style={displayFont}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div className="mt-2 flex items-center gap-2.5">
                      <s.Icon className="h-5 w-5 shrink-0 text-[#ed1164]" />
                      <h3 className="text-xl font-bold text-black" style={displayFont}>
                        {s.title}
                      </h3>
                    </div>
                    <p className="mt-3 text-sm leading-relaxed text-black/55">{s.desc}</p>
                  </motion.div>
                );
              })}
            </div>

            {/* end note */}
            <Reveal delay={0.1}>
              <p
                className="mt-14 text-right text-3xl text-black"
                style={{ fontFamily: "'Brush Script MT', 'Segoe Script', cursive" }}
              >
                Ready to rank!
              </p>
            </Reveal>
          </div>
        </div>

        {/* SEO / AEO / GEO - the three optimization disciplines, each acronym
            spelled out in full and shown as prominent cards */}
        <Reveal delay={0.05} className="mt-24">
          <div className="text-center">
            <h3
              className="text-[clamp(1.8rem,4vw,3rem)] font-extrabold uppercase leading-[0.95] tracking-tight text-black"
              style={displayFont}
            >
              Search, answer &amp; <span style={{ color: PINK }}>generative</span> optimization
            </h3>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-black/55">
              We optimize for every way people find you today, classic search engines,
              answer engines, and the AI models rewriting how discovery works.
            </p>
          </div>

          {/* one board - three flush colour columns that step down like the
              reference; hovering a column grows its block to fill the column */}
          <div className="mt-14 overflow-hidden rounded-3xl border border-slate-200 bg-[#e7e7e7] shadow-xl shadow-black/[0.06]">
            {/* colour columns, flush with no divider between them */}
            <div className="grid sm:h-[460px] sm:grid-cols-3">
              {optimizations.map((o, i) => (
                <motion.div
                  key={o.abbr}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.5, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                  style={{ "--bottom": OPT_BOTTOM[i], "--ink": o.ink } as React.CSSProperties}
                  className={`group relative min-h-[260px] transition-[margin-right] duration-500 ease-out sm:min-h-0 ${OPT_MR[i]} sm:mr-0 hover:mr-0`}
                >
                  {/* colour block. Mobile: flows to its content height with the
                      chamfer on the bottom-right. Desktop: absolute, fills to the
                      top, steps along the bottom, grows to fill on hover, chamfer
                      on the bottom-left. */}
                  <div
                    style={{
                      background: o.fill,
                      transition: "bottom 0.5s ease, clip-path 0.5s ease",
                    }}
                    className={`relative flex flex-col p-6 pb-9 [clip-path:polygon(0_0,100%_0,100%_88%,88%_100%,0_100%)] sm:absolute sm:inset-x-0 sm:top-0 sm:bottom-[var(--bottom)] sm:[clip-path:polygon(0_0,100%_0,100%_100%,16%_100%,0_84%)] ${OPT_PT[i]} [@media(hover:hover)]:group-hover:bottom-0 [@media(hover:hover)]:group-hover:[clip-path:polygon(0_0,100%_0,100%_100%,0_100%,0_100%)]`}
                  >
                    {/* big acronym + rank superscript + corner icon */}
                    <div className="flex max-w-[13rem] items-start gap-1.5 sm:max-w-none">
                      <span
                        className="text-6xl font-extrabold leading-none tracking-tight text-[var(--ink)] sm:text-7xl"
                        style={displayFont}
                      >
                        {o.abbr}
                      </span>
                      <span className="mt-1.5 text-xs font-bold uppercase tracking-wider text-[var(--ink)] opacity-70">
                        ({o.rank})
                      </span>
                      <o.Icon className="ml-auto mt-1 h-5 w-5 shrink-0 text-[var(--ink)] opacity-60" />
                    </div>

                    {/* label lines - always visible */}
                    <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--ink)] opacity-80">
                      {o.tag}
                    </p>
                    <p
                      className="mt-1 max-w-[13rem] text-sm font-bold uppercase tracking-tight text-[var(--ink)] sm:max-w-none"
                      style={displayFont}
                    >
                      {o.full}
                    </p>

                    {/* description - shown on mobile, revealed as the column
                        fills on hover */}
                    <p className="mt-5 max-w-[13rem] text-sm leading-relaxed text-[var(--ink)] transition-all duration-300 sm:max-w-[15rem] sm:translate-y-2 sm:opacity-0 [@media(hover:hover)]:group-hover:translate-y-0 [@media(hover:hover)]:group-hover:opacity-100">
                      {o.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* board copy along the bottom, echoing the reference layout */}
            <div className="grid gap-6 px-7 pb-8 pt-6 sm:grid-cols-3">
              <p
                className="text-2xl font-medium lowercase leading-tight text-black/70"
                style={displayFont}
              >
                found everywhere
                <br />
                your buyers search
              </p>
              <p className="self-end text-xs leading-relaxed text-black/40">
                Optimized for search, answer,
                <br />
                and generative engines alike.
              </p>
            </div>
          </div>
        </Reveal>

        {/* SEO tools we use */}
        <Reveal delay={0.1} className="mt-16">
          <p className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-black/40">
            Tools we use
          </p>
          <div className="mx-auto mt-8 grid max-w-5xl grid-cols-2 gap-4 sm:grid-cols-4">
            {seoTools.map((t, i) => (
              <motion.div
                key={t.slug}
                initial={{ opacity: 0, y: 24, scale: 0.92 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -8, scale: 1.05 }}
                className="group flex flex-col items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-7 shadow-sm transition-all duration-300 hover:border-[#ed1164]/40 hover:bg-gradient-to-br hover:from-white hover:to-[#ed1164]/5 cursor-pointer"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <motion.img
                  src={`/seo-tools/${t.slug}.svg`}
                  alt={`${t.name} logo`}
                  loading="lazy"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                  className="h-10 w-10 object-contain grayscale-0 lg:grayscale transition-all duration-300 [@media(hover:hover)]:group-hover:grayscale-0"
                />
                <motion.span
                  className="text-sm font-semibold text-black/70 transition-colors duration-300 group-hover:text-[#ed1164]"
                >
                  {t.name}
                </motion.span>
              </motion.div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function ProcessSection() {
  return (
    <section className="relative overflow-hidden border-t border-slate-100 bg-white py-24">
      <div className="relative mx-auto max-w-7xl px-6 sm:px-8">
        <Reveal className="max-w-2xl">
          <Kicker>How we work</Kicker>
          <h2 className="mt-5 text-[clamp(2.6rem,5.5vw,5rem)] font-extrabold uppercase leading-[0.9] tracking-tight text-black" style={displayFont}>
            Idea to <span style={{ color: PINK }}>launch</span>
          </h2>
        </Reveal>

        <div className="relative mt-16">
          {/* connecting line that draws in on scroll (desktop) */}
          <div className="absolute left-0 right-0 top-7 hidden h-px bg-slate-200 lg:block">
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
              style={{ transformOrigin: "left" }}
              className="h-full w-full bg-[#ed1164]"
            />
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-5 lg:gap-6">
            {steps.map((s, i) => (
              <motion.div
                key={s.n}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                className="relative flex gap-5 sm:block"
              >
                {/* phone-only vertical connector: sits in the badge rail and
                    draws downward to the next step as that step scrolls in,
                    the portrait counterpart of the desktop horizontal line */}
                {i < steps.length - 1 && (
                  <div className="absolute left-[27.5px] top-14 -bottom-8 w-px bg-slate-200 sm:hidden">
                    <motion.div
                      initial={{ scaleY: 0 }}
                      whileInView={{ scaleY: 1 }}
                      viewport={{ once: true, margin: "-25% 0px -25% 0px" }}
                      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                      style={{ transformOrigin: "top" }}
                      className="h-full w-full bg-[#ed1164]"
                    />
                  </div>
                )}
                {/* numbered badge on the line */}
                <motion.span
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ type: "spring", stiffness: 300, damping: 18, delay: i * 0.12 + 0.15 }}
                  className="relative z-10 grid h-14 w-14 shrink-0 place-items-center rounded-full bg-[#ed1164] text-lg font-extrabold text-white shadow-lg shadow-[#ed1164]/25"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {s.n}
                </motion.span>
                {/* on phones the copy sits beside the badge; from sm up
                    `contents` dissolves this wrapper so the original
                    stacked layout is untouched */}
                <div className="min-w-0 sm:contents">
                  <h3 className="text-lg font-bold text-black sm:mt-6" style={{ fontFamily: "var(--font-display)" }}>{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-black/55">{s.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

const faqs: Faq[] = [
  {
    q: "What does a custom web development company do?",
    a: "A custom web development company designs and builds websites, web apps, and ecommerce stores tailored to your business instead of using an off-the-shelf template. At MindWhiz we handle the full process — UX design, front-end and back-end development, integrations, SEO, and ongoing support — so US businesses get a fast, secure, scalable product built to convert.",
  },
  {
    q: "How much does custom web development cost?",
    a: "Custom web development typically ranges from a few thousand dollars for a focused landing page to tens of thousands for multipage sites, ecommerce stores, and full web apps, depending on scope and complexity. We give every client a fixed, itemized quote up front so there are no surprises, and we can phase the build to fit your budget.",
  },
  {
    q: "How long does it take to build a custom website or web app?",
    a: "Most marketing sites and landing pages ship in 3 to 6 weeks, while larger web apps, dashboards, and ecommerce platforms run 8 to 12 weeks or more. After a short discovery call we scope the work and give you a clear timeline with milestones, so you always know what's next.",
  },
  {
    q: "Can I hire dedicated web developers for my US business?",
    a: "Yes. We provide dedicated web developers and full-stack teams that work as an extension of your business across the US, in your time zone and workflow. You get senior developers, designers, and QA on demand — without the cost and delay of hiring in-house.",
  },
  {
    q: "What's the difference between a website and a web application?",
    a: "A website mainly presents information — think marketing sites, landing pages, and blogs — while a web application lets users log in and do things, like dashboards, portals, booking tools, and SaaS platforms. We build both, and often combine them, so your site can market your brand and run your operations in one place.",
  },
  {
    q: "Do you build ecommerce websites and online stores?",
    a: "Yes. We build custom ecommerce websites and online stores with fast storefronts, secure checkout, and payment integrations like Stripe, PayPal, and Shopify. Every store is optimized for speed, trust, and higher order value so more visitors turn into paying customers.",
  },
  {
    q: "Will my website be fast, mobile-friendly, and SEO-ready?",
    a: "Always. Every build is responsive across devices, tuned for Core Web Vitals, and shipped with clean semantic markup, structured data, sitemaps, and analytics wired in — so it loads fast, feels smooth, and is set up to rank on Google from day one.",
  },
  {
    q: "Do you offer website maintenance and support after launch?",
    a: "Yes. We offer monthly website maintenance and care plans covering hosting, security patches, performance tuning, content updates, and new features, so your site keeps running smoothly and evolving long after launch.",
  },
  {
    q: "Can you redesign or migrate my existing website?",
    a: "Absolutely. We regularly redesign dated websites and migrate them to modern, faster stacks without losing your content or SEO rankings. We audit what you have, preserve your search traffic, and rebuild it into something you're proud to share.",
  },
];

function ContactSection() {
  return (
    <section id="contact" className="relative overflow-hidden border-t border-slate-100 bg-white py-24">
      <div className="pointer-events-none absolute -right-32 -top-20 h-96 w-96 rounded-full bg-[#ed1164]/12 blur-[150px]" />
      <div className="pointer-events-none absolute -left-32 bottom-0 h-96 w-96 rounded-full bg-[#9CCC3C]/12 blur-[150px]" />
      <div className="relative mx-auto grid max-w-7xl gap-14 px-6 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        {/* left: heading */}
        <div className="lg:sticky lg:top-32 lg:self-start">
          <Reveal>
            <Kicker>Get in touch</Kicker>
            <h2 className="mt-5 text-[clamp(2.6rem,5.5vw,5rem)] font-extrabold uppercase leading-[0.9] tracking-tight text-black" style={displayFont}>
              Let&apos;s discuss your <span style={{ color: PINK }}>project</span>
            </h2>
            <p className="mt-5 max-w-md text-lg leading-relaxed text-black/60">
              Tell us what you&apos;re building and a MindWhiz specialist will get
              back to you within one business day with next steps.
            </p>
          </Reveal>
        </div>

        {/* right: embedded lead form */}
        <Reveal delay={0.1}>
          <ContactForm
            formId="uiS0x0ABnKFGD1n8uScA"
            formName="Web services form website"
            height={709}
          />
        </Reveal>
      </div>
    </section>
  );
}

function CtaBand() {
  return (
    <ProcessIntroBanner
      title="Let's build your next website"
      description="Tell us what you're trying to build. We'll scope it, design it, and ship it."
      ctaLabel="Get in touch"
      ctaHref="/contact"
    />
  );
}

// ---------------------------------------------------------------------------
// page
// ---------------------------------------------------------------------------
export default function WebServicesPage() {
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
      <Hero />
      <MarqueeStrip />
      <ServicesSection />
      <AlphaBravoShowcase />
      <PortfolioSection />
      <ProcessSection />
      <StackSection />
      <SeoSection />
      <ClientsSection />
      <GoogleReviewsSection />
      <FaqSection faqs={faqs} />
      <ContactSection />
      <CtaBand />
      <Footer />
    </main>
  );
}
