"use client";

// ---------------------------------------------------------------------------
// Web Services — bold agency design on a light canvas. Big gradient type, a
// scrolling marquee, image service tiles, and a large browser-mockup portfolio
// shown as alternating feature rows.
// ---------------------------------------------------------------------------

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, type MotionValue, type Variants } from "framer-motion";
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
  Star,
  type LucideIcon,
} from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import Footer from "@/components/Footer";
import Cta from "@/components/Cta";

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

// viewportWidth forces a desktop render (fixes over-zoomed mobile layouts);
// wait lets Cloudflare / JS challenges resolve before the shot is taken.
function thumb(url: string) {
  return `https://image.thum.io/get/width/1400/viewportWidth/1440/wait/8/crop/1000/noanimate/${url}`;
}
function thumbFull(url: string) {
  return `https://image.thum.io/get/width/1200/viewportWidth/1440/wait/8/fullpage/noanimate/${url}`;
}

function BrowserFrame({
  url,
  className = "",
  scroll = false,
}: {
  url: string;
  className?: string;
  scroll?: boolean;
}) {
  const host = url.replace("https://", "").replace(/\/$/, "");
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
        <div className="relative h-[360px] overflow-hidden bg-[#f2f1ee]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={thumbFull(url)}
            alt={host}
            loading="lazy"
            className="w-full transition-transform duration-[6000ms] ease-linear group-hover:translate-y-[calc(-100%+360px)]"
          />
          <span className="pointer-events-none absolute bottom-3 right-3 rounded-full bg-black/60 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-white opacity-100 backdrop-blur transition-opacity duration-300 group-hover:opacity-0">
            Hover to scroll
          </span>
        </div>
      ) : (
        <div className="relative aspect-[16/10] overflow-hidden bg-[#f2f1ee]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={thumb(url)}
            alt={host}
            loading="lazy"
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
const services: { title: string; desc: string; Icon: LucideIcon; image: string }[] = [
  { title: "Custom Websites", desc: "Marketing sites and landing pages designed to convert — fast, responsive, and pixel-perfect on every device. We craft clear messaging, intuitive navigation, and conversion-focused layouts that turn visitors into customers and grow your brand online.", Icon: Globe2, image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?auto=format&fit=crop&w=1200&q=80" },
  { title: "Web Applications", desc: "Full-stack apps and internal tools built on modern frameworks with secure APIs and clean architecture. From MVPs to complex platforms, we build software that scales with your business, stays easy to maintain, and keeps your users productive.", Icon: Code2, image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=1200&q=80" },
  { title: "Dashboards & Portals", desc: "Data-rich admin panels, analytics dashboards, and customer portals with real-time reporting. We turn complex data into clear, actionable interfaces your team and clients will actually use — with role-based access and clean visualizations.", Icon: LayoutDashboard, image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80" },
  { title: "E-commerce", desc: "Storefronts, checkout flows, and payment integrations tuned for speed, trust, and higher order value. We build shopping experiences that load fast, feel secure, and drive repeat purchases across web and mobile.", Icon: ShoppingCart, image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1200&q=80" },
  { title: "Performance & Care", desc: "Core Web Vitals tuning, hosting, security patches, and ongoing maintenance so your site never stalls. We monitor, optimize, and keep everything running smoothly long after launch, so you can focus on your business.", Icon: Gauge, image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80" },
  { title: "Support & Retainers", desc: "Dedicated web engineers on call for updates, new features, and fixes on a predictable monthly cadence. Think of us as your on-demand web team — ready whenever you need to ship changes, test ideas, or move fast.", Icon: Wrench, image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80" },
];

const stack = ["JavaScript", "TypeScript", "React", "Next.js", "Node.js", "PHP", "Laravel", "Python", "Tailwind CSS", "WordPress", "WooCommerce", "Shopify", "Webflow", "MySQL", "MongoDB", "PostgreSQL", "Firebase", "AWS", "Vercel", "Docker"];

const portfolio: { name: string; url: string; category: string; blurb: string }[] = [
  { name: "Alpha Bravo", url: "https://alphabravous.com/", category: "Corporate · Services", blurb: "A polished corporate presence with a clear services story and strong calls to action." },
  { name: "Prime Axis Insurance", url: "https://primeaxisinsurance.com/", category: "Insurance", blurb: "A trust-first insurance site with clean quote flows and clear product pages." },
  { name: "Marquee Ranch", url: "https://marqueeranch.com/", category: "Hospitality · Real Estate", blurb: "An elegant venue and ranch experience with rich galleries and event enquiries." },
  { name: "Tempura Halal", url: "https://tempurahalal.com/", category: "Food & Restaurant", blurb: "An appetizing restaurant site with menus, online ordering, and event catering." },
  { name: "Tempura Food USA", url: "https://tempurafoodusa.com/", category: "Food & Beverage", blurb: "A bold food brand site showcasing products, story, and distribution." },
  { name: "My Safe Drives", url: "https://mysafedrives.com/", category: "Automotive · Safety", blurb: "A clean, reassuring platform focused on safe driving services and sign-ups." },
  { name: "Crownline Construction", url: "https://crownlineconstruct.com/", category: "Construction", blurb: "A sturdy construction brand with project showcases and lead capture." },
];

const seoCaps: { title: string; desc: string; Icon: LucideIcon; image: string }[] = [
  { title: "Technical SEO", desc: "Clean markup, crawlability, sitemaps, and canonical tags from day one.", Icon: Search, image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=80" },
  { title: "Core Web Vitals", desc: "Fast loads and stable layouts that Google rewards and users feel.", Icon: Gauge, image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=900&q=80" },
  { title: "Structured Data", desc: "Schema.org markup for rich results — products, reviews, and FAQs.", Icon: Code2, image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=900&q=80" },
  { title: "Analytics", desc: "GA4, Search Console, and conversion tracking wired up and measured.", Icon: LineChart, image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=900&q=80" },
  { title: "On-page & Local", desc: "Optimized metadata, content structure, and local listings that rank.", Icon: Globe2, image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=900&q=80" },
  { title: "Secure & Accessible", desc: "HTTPS, best-practice security, and accessible semantic HTML.", Icon: ShieldCheck, image: "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?auto=format&fit=crop&w=900&q=80" },
];

const steps = [
  { n: "01", title: "Discover", desc: "Map goals, audience, and scope, then set timeline and success metrics." },
  { n: "02", title: "Design", desc: "Wireframes and high-fidelity designs turn the plan into an on-brand experience." },
  { n: "03", title: "Build", desc: "Responsive front-end and secure back-end with your CMS and integrations." },
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
    <section className="relative min-h-screen overflow-hidden bg-white pt-36 pb-20">
      <div className="pointer-events-none absolute -right-40 -top-20 h-[38rem] w-[38rem] rounded-full bg-[#ed1164]/12 blur-[160px]" />
      <div className="pointer-events-none absolute -left-40 top-1/2 h-[30rem] w-[30rem] rounded-full bg-[#9CCC3C]/15 blur-[160px]" />
      <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-6 sm:px-8 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <Reveal>
            <Kicker>Web Development Department</Kicker>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="mt-7 text-[clamp(3rem,7vw,6.5rem)] font-extrabold uppercase leading-[0.9] tracking-tight text-black" style={displayFont}>
              We build
              <br />
              the <span style={{ color: PINK }}>web</span>.
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-7 max-w-lg text-lg leading-relaxed text-black/60">
              High-performance websites, web apps, and dashboards — designed, built, and
              optimized to look sharp, load fast, and rank well.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <Cta href="/contact" label="Start a project" />
              <Cta href="#work" label="See our work" variant="outline" className="!border-black/20 !bg-transparent !text-black hover:!bg-black/5" />
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.1} className="relative">
          <motion.div
            animate={{ y: [0, -14, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="group relative"
          >
            <div className="pointer-events-none absolute -inset-6 rounded-[2rem] bg-gradient-to-tr from-[#ed1164]/30 to-[#9CCC3C]/25 opacity-50 blur-2xl" />
            <BrowserFrame url="https://marqueeranch.com/" className="relative z-10 rotate-[-2deg]" />
            <div className="absolute -bottom-10 -right-2 z-20 hidden w-3/5 rotate-[4deg] sm:block">
              <BrowserFrame url="https://tempurahalal.com/" />
            </div>
          </motion.div>
        </Reveal>
      </div>
    </section>
  );
}

function MarqueeStrip() {
  return (
    <div className="border-y border-slate-200 bg-[#faf9f7] py-6">
      <Marquee items={["Web Design", "Web Apps", "Dashboards", "E-Commerce", "SEO", "Performance", "Support"]} />
    </div>
  );
}

function ServicePanel({
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
  // segments are stretched so the LAST card finishes fading in right at the
  // end of the pin — no dead scroll after card 6; the next section arrives
  // the moment the final card is fully shown.
  const seg = 1 / (total - 0.6);
  const start = i * seg;
  const end = (i + 1) * seg;
  const fade = seg * 0.3;
  const inStart = i === 0 ? 0 : start - fade;
  const inEnd = i === 0 ? fade : start + fade;
  const isLast = i === total - 1;
  const outStart = isLast ? 2 : end - fade;
  const outEnd = isLast ? 2.1 : end + fade;

  const opacity = useTransform(progress, [inStart, inEnd, outStart, outEnd], [0, 1, 1, 0]);
  const y = useTransform(progress, [inStart, inEnd], [50, 0]);

  return (
    <motion.div style={{ opacity }} className="absolute inset-x-0 top-[63%] -translate-y-1/2">
      <motion.div style={{ y }}>
        <div className="flex items-center gap-4">
          <span className="grid h-12 w-12 place-items-center rounded-xl bg-[#ed1164]/10 text-[#ed1164]">
            <s.Icon className="h-6 w-6" />
          </span>
          <span className="text-sm font-bold uppercase tracking-[0.2em] text-[#ed1164]">
            {String(i + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
          </span>
        </div>
        <h3
          className="mt-5 text-[clamp(2rem,5vw,4rem)] font-bold uppercase leading-[1] tracking-tight text-black"
          style={displayFont}
        >
          {s.title}
        </h3>
        <div className="mt-8 grid items-start gap-8 lg:grid-cols-[1fr_1.2fr]">
          <span className="mt-4 hidden h-px w-full bg-black/20 lg:block" />
          <p className="max-w-xl text-lg leading-relaxed text-black/70">{s.desc}</p>
        </div>
      </motion.div>
    </motion.div>
  );
}

function ServicesSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const total = services.length;
  const barScale = useTransform(scrollYProgress, [0, 1], [1 / total, 1]);

  return (
    <section ref={ref} className="relative bg-white" style={{ height: `${total * 100}vh` }}>
      <div className="sticky top-0 h-screen overflow-hidden">
        <div className="pointer-events-none absolute -right-32 top-20 h-96 w-96 rounded-full bg-[#ed1164]/10 blur-[150px]" />

        {/* fixed heading */}
        <div className="absolute inset-x-0 top-0 mx-auto max-w-7xl px-6 pt-28 sm:px-8">
          <Kicker>What we build</Kicker>
          <h2 className="mt-5 text-[clamp(2.6rem,5.5vw,5rem)] font-extrabold uppercase leading-[0.9] tracking-tight text-black" style={displayFont}>
            Web
            <br />
            that <span style={{ color: PINK }}>works</span>.
          </h2>
        </div>

        {/* crossfading service panels — same place, one at a time */}
        <div className="relative mx-auto h-full max-w-7xl px-6 sm:px-8">
          {services.map((s, i) => (
            <ServicePanel key={s.title} s={s} i={i} total={total} progress={scrollYProgress} />
          ))}
        </div>

        {/* progress bar */}
        <div className="absolute inset-x-0 bottom-0 h-1 bg-black/10">
          <motion.div style={{ scaleX: barScale, transformOrigin: "left" }} className="h-full w-full bg-[#ed1164]" />
        </div>
      </div>
    </section>
  );
}

function PortfolioSection() {
  return (
    <section id="work" className="relative overflow-hidden border-t border-slate-100 bg-[#faf9f7] py-24">
      <div className="relative mx-auto max-w-7xl px-6 sm:px-8">
        <Reveal className="max-w-2xl">
          <Kicker>Selected work</Kicker>
          <h2 className="mt-5 text-[clamp(2.6rem,5.5vw,5rem)] font-extrabold uppercase leading-[0.9] tracking-tight text-black" style={displayFont}>
            Sites we&apos;ve <span style={{ color: PINK }}>shipped</span>.
          </h2>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-black/55">
            Live websites and web projects designed, built, and launched by our team.
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
                    <BrowserFrame url={p.url} scroll className="relative transition-transform duration-500 group-hover:-translate-y-2" />
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
                    <a href={p.url} target="_blank" rel="noreferrer" className="mt-6 inline-flex items-center gap-2 rounded-full border border-black/15 px-5 py-2.5 text-sm font-semibold text-black transition-colors hover:border-[#ed1164] hover:text-[#ed1164]">
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

function StackSection() {
  return (
    <section className="relative overflow-hidden border-y border-slate-200 bg-white py-20">
      <div className="relative mx-auto mb-10 max-w-7xl px-6 text-center sm:px-8">
        <Reveal>
          <Kicker>Our stack</Kicker>
          <h2 className="mt-5 text-[clamp(2.4rem,5vw,4.5rem)] font-extrabold uppercase leading-[0.9] tracking-tight text-black" style={displayFont}>
            Languages &amp; <span style={{ color: PINK }}>technology</span>.
          </h2>
        </Reveal>
      </div>
      <div className="flex flex-col gap-5">
        <Marquee items={stack.slice(0, 10)} />
        <Marquee items={stack.slice(10)} reverse />
      </div>
    </section>
  );
}

function SeoSection() {
  return (
    <section className="relative overflow-hidden bg-[#faf9f7] py-24">
      <div className="pointer-events-none absolute -left-32 bottom-0 h-96 w-96 rounded-full bg-[#9CCC3C]/12 blur-[150px]" />
      <div className="relative mx-auto max-w-7xl px-6 sm:px-8">
        <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          {/* left: heading — sticky while the notes scroll by */}
          <div className="lg:sticky lg:top-32 lg:self-start">
            <Reveal>
              <Kicker>Search-ready</Kicker>
              <h2 className="mt-5 text-[clamp(2.6rem,5.5vw,5rem)] font-extrabold uppercase leading-[0.9] tracking-tight text-black" style={displayFont}>
                SEO built <span style={{ color: PINK }}>in</span>.
              </h2>
              <p className="mt-5 max-w-md text-base leading-relaxed text-black/55">
                Every site we ship is engineered to be found — fast, technically sound,
                and structured for search from the first commit.
              </p>
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

        {/* SEO tools we use */}
        <Reveal delay={0.1} className="mt-16">
          <p className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-black/40">
            Tools we use
          </p>
          <div className="mx-auto mt-8 grid max-w-5xl grid-cols-2 gap-4 sm:grid-cols-4">
            {seoTools.map((t, i) => (
              <motion.a
                key={t.slug}
                href="#"
                initial={{ opacity: 0, y: 24, scale: 0.92 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -6 }}
                className="group flex flex-col items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-7 shadow-sm transition-shadow hover:shadow-lg hover:shadow-black/5"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`https://cdn.simpleicons.org/${t.slug}`}
                  alt={t.name}
                  loading="lazy"
                  className="h-10 w-10 object-contain grayscale transition-all duration-300 group-hover:grayscale-0"
                />
                <span className="text-sm font-semibold text-black/70 transition-colors group-hover:text-black">
                  {t.name}
                </span>
              </motion.a>
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
            Idea to <span style={{ color: PINK }}>launch</span>.
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
                className="relative"
              >
                {/* numbered badge on the line */}
                <motion.span
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ type: "spring", stiffness: 300, damping: 18, delay: i * 0.12 + 0.15 }}
                  className="relative z-10 grid h-14 w-14 place-items-center rounded-full bg-[#ed1164] text-lg font-extrabold text-white shadow-lg shadow-[#ed1164]/25"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {s.n}
                </motion.span>
                <h3 className="mt-6 text-lg font-bold text-black" style={{ fontFamily: "var(--font-display)" }}>{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-black/55">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function CtaBand() {
  return (
    <section className="bg-white px-6 pb-24 pt-4 sm:px-8">
      <Reveal
        className="relative mx-auto max-w-7xl overflow-hidden rounded-[2.5rem] px-8 py-20 text-center text-white sm:px-16"
        // vibrant gradient band — bright, not dark
      >
        <div className="absolute inset-0" style={{ backgroundImage: "linear-gradient(120deg, #ff5d9e 0%, #ed1164 55%, #b80052 100%)" }} />
        <div className="pointer-events-none absolute -left-20 -top-20 h-80 w-80 rounded-full bg-white/20 blur-[120px]" />
        <div className="relative">
          <h2 className="mx-auto max-w-3xl text-[clamp(2.2rem,5vw,4rem)] font-extrabold uppercase leading-[0.95] tracking-tight text-white" style={{ fontFamily: "var(--font-display)" }}>
            Let&apos;s build your next website.
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-white/80">
            Tell us what you&apos;re trying to build. We&apos;ll scope it, design it, and ship it.
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
            <a href="/contact" className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-[#ed1164] transition-transform hover:-translate-y-0.5">
              Start a project
              <ArrowUpRight className="h-4 w-4" />
            </a>
            <a href="/#services" className="inline-flex items-center gap-2 rounded-full border border-white/40 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10">
              Explore all services
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </Reveal>
    </section>
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
      <PortfolioSection />
      <StackSection />
      <SeoSection />
      <ProcessSection />
      <CtaBand />
      <Footer />
    </main>
  );
}
