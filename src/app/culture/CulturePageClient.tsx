"use client";

// ---------------------------------------------------------------------------
// Culture, "life at MindWhiz". Section structure modeled on the Alpha Bravo
// culture page: hero + 2x2 stats, a People-First philosophy split, a life
// gallery, empowerment pillars, numbered programs, team spotlights with a
// metrics strip, a core-values grid, and a closing CTA, reskinned to brand.
// ---------------------------------------------------------------------------

import { useEffect, useState } from "react";
import { motion, type Variants } from "framer-motion";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import {
  ArrowRight,
  Check,
  GraduationCap,
  Users,
  ShieldCheck,
  TrendingUp,
  Award,
  Wallet,
  Quote,
  ShieldHalf,
  Sparkles,
  Handshake,
  HeartHandshake,
  Rocket,
  ScrollText,
} from "lucide-react";
import Footer from "@/components/Footer";
import { SiteHeader } from "@/components/SiteHeader";

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
// Hero, full-bleed image, headline + 2 CTAs, and a 2x2 stats grid.
// ---------------------------------------------------------------------------
const heroStats = [
  { value: "6+", label: "Years delivering globally" },
  { value: "96%", label: "Client retention" },
  { value: "300+", label: "Specialists across 3 hubs" },
  { value: "24/7", label: "Coverage, every day" },
];

function Hero() {
  return (
    <section
      data-header-dark
      className="relative min-h-screen overflow-hidden bg-white p-[10px] text-white"
    >
      <div className="absolute inset-[10px] overflow-hidden rounded-3xl bg-[#383838]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1900&q=80"
          alt="The MindWhiz team"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-[#383838]/55" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-black/20" />
      </div>
      <div
        className="pointer-events-none absolute -bottom-32 -right-32 h-[38rem] w-[38rem] rounded-full blur-[150px]"
        style={{ backgroundColor: "#9CCC3C59" }}
      />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="relative flex min-h-[calc(var(--vh)*100-20px)] flex-col justify-end px-5 pb-10 pt-32 sm:px-8"
      >
        <Kicker>Our culture</Kicker>
        <h1
          className="mt-4 max-w-4xl text-[clamp(3.6rem,11vw,11rem)] font-extrabold uppercase leading-[0.9] tracking-[-0.04em]"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Our people, <span className="text-[#9CCC3C]">our strength</span>
        </h1>
        <p className="mt-7 max-w-xl text-base leading-relaxed text-white/75">
          Empowered people build better outcomes. We invest in our team so they
          can do the best work of their careers, across the US, UK, and Pakistan.
        </p>
        <div className="mt-9 flex flex-wrap items-center gap-4">
          <a
            href="/careers"
            className="group inline-flex items-center gap-2 rounded-full bg-[#9CCC3C] px-4 py-2.5 text-sm font-semibold text-black"
          >
            View open positions
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
          <a
            href="/about"
            className="inline-flex items-center gap-2 rounded-full border border-white/25 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:border-white/50"
          >
            About our team
          </a>
        </div>

        <div className="mt-14 grid max-w-2xl grid-cols-2 gap-x-10 gap-y-8 border-t border-white/15 pt-10 sm:grid-cols-4">
          {heroStats.map((s) => (
            <div key={s.label}>
              <p
                className="text-[clamp(2.4rem,4vw,3.4rem)] font-extrabold leading-none tracking-tight text-[#9CCC3C]"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {s.value}
              </p>
              <p className="mt-2 text-xs leading-snug text-white/60">{s.label}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Philosophy, "People First, Always" split: image left, bullets right.
// ---------------------------------------------------------------------------
const philosophyPoints = [
  "Every voice matters, open feedback and real transparency at every level.",
  "We invest in training, certifications, and career growth for everyone.",
  "A culture of ownership: named owners, clear SLAs, and pride in the work.",
  "Recognition that's real, we celebrate wins loudly and often.",
];

function PhilosophySection() {
  return (
    <section className="bg-white py-24">
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-6 sm:px-8 lg:grid-cols-2 lg:gap-20">
        <Reveal className="order-2 lg:order-1">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=1200&q=80"
            alt="MindWhiz team collaborating"
            className="aspect-[4/3] w-full rounded-[2rem] object-cover"
          />
        </Reveal>

        <div className="order-1 lg:order-2">
          <Reveal>
            <Kicker>Our philosophy</Kicker>
            <h2
              className="mt-4 text-[clamp(2.4rem,5vw,4.4rem)] font-extrabold uppercase leading-[0.92] tracking-tight text-black"
              style={{ fontFamily: "var(--font-display)" }}
            >
              People first, <span style={{ color: "#ed1164" }}>always</span>
            </h2>
            <p className="mt-6 max-w-xl text-[15px] leading-relaxed text-black/65">
              We believe empowered people build better projects. When our team
              feels trusted, supported, and set up to grow, our clients feel the
              difference in every ticket resolved and every deadline hit.
            </p>
          </Reveal>

          <div className="mt-8 space-y-4">
            {philosophyPoints.map((p, i) => (
              <Reveal key={p} delay={i * 0.06}>
                <div className="flex items-start gap-4">
                  <span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full bg-[#9CCC3C]/20">
                    <Check className="h-4 w-4 text-[#4E7A22]" />
                  </span>
                  <p className="text-[15px] leading-relaxed text-black/75">{p}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Life at MindWhiz, 4-tile gallery (parties, offsites, celebrations).
// ---------------------------------------------------------------------------
const galleryTiles = [
  {
    src: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80",
    caption: "Year end team celebration",
    span: "sm:col-span-2 sm:row-span-2",
  },
  {
    src: "https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&w=800&q=80",
    caption: "Teamwork & collaboration",
    span: "",
  },
  {
    src: "https://images.unsplash.com/photo-1531058020387-3be344556be6?auto=format&fit=crop&w=800&q=80",
    caption: "Festive celebrations",
    span: "",
  },
  {
    src: "https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=1200&q=80",
    caption: "One big office family",
    span: "sm:col-span-2",
  },
];

function GallerySection() {
  return (
    <section className="bg-[#FAF9F5] py-24">
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        <Reveal>
          <Kicker>Life at MindWhiz</Kicker>
          <h2
            className="mt-4 max-w-3xl text-[clamp(2.4rem,5vw,4.4rem)] font-extrabold uppercase leading-[0.92] tracking-tight text-black"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Work hard, <span style={{ color: "#ed1164" }}>celebrate harder</span>
          </h2>
        </Reveal>

        <div className="mt-12 grid auto-rows-[240px] grid-cols-2 gap-4 sm:grid-cols-4">
          {galleryTiles.map((g, i) => (
            <Reveal
              key={g.src}
              delay={(i % 4) * 0.05}
              className={`group relative overflow-hidden rounded-[1.5rem] ${g.span}`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={g.src}
                alt={g.caption}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
              <p className="absolute inset-x-0 bottom-0 p-5 text-sm font-semibold text-white">
                {g.caption}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Empowerment pillars, 4-column grid.
// ---------------------------------------------------------------------------
const pillars = [
  {
    Icon: GraduationCap,
    title: "Continuous learning",
    desc: "Funded certifications and skill development, from cloud to security to leadership.",
  },
  {
    Icon: Handshake,
    title: "Team ownership",
    desc: "Real decision making authority on the floor, owners, not order takers.",
  },
  {
    Icon: ShieldCheck,
    title: "Reliability culture",
    desc: "A commitment to uptime and quality, reinforced with weekly delivery reviews.",
  },
  {
    Icon: TrendingUp,
    title: "Clear growth paths",
    desc: "Defined ladders from agent to team lead to delivery manager, and beyond.",
  },
];

function PillarsSection() {
  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        <Reveal>
          <Kicker>How we empower</Kicker>
          <h2
            className="mt-4 max-w-3xl text-[clamp(2.4rem,5vw,4.4rem)] font-extrabold uppercase leading-[0.92] tracking-tight text-black"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Built to help you <span style={{ color: "#9CCC3C" }}>thrive</span>
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.06}>
              <div className="flex h-full flex-col rounded-[1.75rem] border border-black/10 bg-[#FAF9F5] p-8">
                <span className="grid h-12 w-12 place-items-center rounded-xl bg-[#9CCC3C]/15 ring-1 ring-[#9CCC3C]/30">
                  <p.Icon className="h-6 w-6 text-[#4E7A22]" />
                </span>
                <h3
                  className="mt-6 text-xl font-bold leading-snug text-black"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {p.title}
                </h3>
                <p className="mt-3 text-[15px] leading-relaxed text-black/65">{p.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Empowerment programs, 3-column numbered cards.
// ---------------------------------------------------------------------------
const programs = [
  {
    num: "01",
    Icon: ScrollText,
    title: "Training & certification",
    items: [
      "Cloud & security certifications",
      "Tooling & platform training",
      "Project management pathways",
      "Bilingual workshops",
    ],
  },
  {
    num: "02",
    Icon: Rocket,
    title: "Leadership development",
    items: [
      "1:1 mentorship programs",
      "Quarterly leadership workshops",
      "Cross team rotation opportunities",
      "Structured annual reviews",
    ],
  },
  {
    num: "03",
    Icon: Wallet,
    title: "Compensation & benefits",
    items: [
      "Above market, transparent pay",
      "Health cover for you & family",
      "Generous paid time off",
      "Performance & referral bonuses",
    ],
  },
];

function ProgramsSection() {
  return (
    <section className="bg-[#383838] py-24 text-white">
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        <Reveal>
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[#9CCC3C]">
            Empowerment programs
          </span>
          <h2
            className="mt-4 max-w-3xl text-[clamp(2.4rem,5vw,4.4rem)] font-extrabold uppercase leading-[0.92] tracking-tight"
            style={{ fontFamily: "var(--font-display)" }}
          >
            How we invest in <span className="text-[#9CCC3C]">you</span>
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {programs.map((p, i) => (
            <Reveal key={p.num} delay={i * 0.08}>
              <div className="flex h-full flex-col rounded-[1.75rem] border border-white/10 bg-white/[0.04] p-8">
                <div className="flex items-center justify-between">
                  <span
                    className="text-4xl font-extrabold text-white/20"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {p.num}
                  </span>
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-[#9CCC3C]/15 ring-1 ring-[#9CCC3C]/30">
                    <p.Icon className="h-5 w-5 text-[#9CCC3C]" />
                  </span>
                </div>
                <h3
                  className="mt-6 text-xl font-bold"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {p.title}
                </h3>
                <ul className="mt-5 space-y-3">
                  {p.items.map((it) => (
                    <li key={it} className="flex items-start gap-3 text-sm text-white/70">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#9CCC3C]" />
                      {it}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Team spotlights, 3 testimonial cards + a metrics strip.
// ---------------------------------------------------------------------------
const spotlights = [
  {
    quote:
      "MindWhiz gave me the chance to grow from a helpdesk agent into a shift lead in under two years. The support is real.",
    name: "Ayesha K.",
    role: "Team Lead, IT Support · Lahore",
    img: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=400&q=80",
  },
  {
    quote:
      "Working across time zones just works here. I feel as connected to the London team as the people sitting next to me.",
    name: "Daniel M.",
    role: "Cloud Engineer · Houston",
    img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80",
  },
  {
    quote:
      "The year end party in Islamabad was unforgettable. It's the little things, being seen, celebrated, and part of the crew.",
    name: "Sara T.",
    role: "Finance Analyst · London",
    img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80",
  },
];

const spotlightMetrics = [
  { value: "200+", label: "Certifications earned" },
  { value: "40%", label: "Roles filled internally" },
  { value: "0", label: "Missed SLAs in 2025" },
  { value: "4.8", label: "Employee satisfaction" },
];

function SpotlightSection() {
  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        <Reveal>
          <Kicker>Team spotlights</Kicker>
          <h2
            className="mt-4 max-w-3xl text-[clamp(2.4rem,5vw,4.4rem)] font-extrabold uppercase leading-[0.92] tracking-tight text-black"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Straight from <span style={{ color: "#ed1164" }}>the team</span>
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {spotlights.map((v, i) => (
            <Reveal key={v.name} delay={i * 0.08}>
              <figure className="flex h-full flex-col rounded-[1.75rem] border border-black/10 bg-[#FAF9F5] p-8">
                <Quote className="h-8 w-8 text-[#9CCC3C]" />
                <blockquote className="mt-5 flex-1 text-[15px] leading-relaxed text-black/75">
                  “{v.quote}”
                </blockquote>
                <figcaption className="mt-7 flex items-center gap-4">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={v.img}
                    alt={v.name}
                    loading="lazy"
                    className="h-12 w-12 rounded-full object-cover"
                  />
                  <div>
                    <p className="text-sm font-semibold text-black">{v.name}</p>
                    <p className="text-sm text-black/55">{v.role}</p>
                  </div>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div className="mt-14 grid grid-cols-2 gap-y-10 rounded-[2rem] border border-black/10 bg-[#FAF9F5] px-8 py-12 sm:grid-cols-4">
            {spotlightMetrics.map((m) => (
              <div key={m.label} className="text-center">
                <p
                  className="text-[clamp(2.4rem,4vw,3.4rem)] font-extrabold leading-none tracking-tight text-[#ed1164]"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {m.value}
                </p>
                <p className="mt-3 text-sm text-black/60">{m.label}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Core values, 6-column grid.
// ---------------------------------------------------------------------------
const coreValues = [
  { Icon: ShieldHalf, title: "Integrity", desc: "Honest, consistent, and accountable in everything we do." },
  { Icon: Handshake, title: "Ownership", desc: "We take responsibility at every level, no passing the buck." },
  { Icon: HeartHandshake, title: "Respect", desc: "Equal dignity for every role, every hub, every person." },
  { Icon: Sparkles, title: "Excellence", desc: "Quality in every detail, the small things add up." },
  { Icon: ShieldCheck, title: "Reliability", desc: "A daily commitment to uptime and the trust it earns." },
  { Icon: Rocket, title: "Growth", desc: "We invest in learning people who never stop leveling up." },
];

function ValuesSection() {
  return (
    <section className="bg-[#FAF9F5] py-24">
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        <Reveal>
          <Kicker>What we stand for</Kicker>
          <h2
            className="mt-4 max-w-3xl text-[clamp(2.4rem,5vw,4.4rem)] font-extrabold uppercase leading-[0.92] tracking-tight text-black"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Our core <span style={{ color: "#9CCC3C" }}>values</span>
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          {coreValues.map((v, i) => (
            <Reveal key={v.title} delay={(i % 6) * 0.05}>
              <div className="flex h-full flex-col rounded-[1.5rem] border border-black/10 bg-white p-6">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-[#ed1164]/10 ring-1 ring-[#ed1164]/20">
                  <v.Icon className="h-5 w-5 text-[#ed1164]" />
                </span>
                <h3
                  className="mt-5 text-lg font-bold text-black"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {v.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-black/60">{v.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Closing CTA, "Ready to build your future?"
// ---------------------------------------------------------------------------
function CultureCta() {
  return (
    <section className="bg-[#FAF9F5] pb-24">
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2.5rem] bg-[#383838] px-8 py-16 text-center text-white sm:px-16">
            <div
              className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full blur-[130px]"
              style={{ backgroundColor: "#9CCC3C59" }}
            />
            <div className="relative">
              <h2
                className="mx-auto max-w-3xl text-[clamp(2.2rem,4.5vw,3.8rem)] font-extrabold uppercase leading-[0.95] tracking-tight"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Ready to build your <span className="text-[#9CCC3C]">future?</span>
              </h2>
              <p className="mx-auto mt-5 max-w-xl text-[15px] leading-relaxed text-white/70">
                If you want to grow fast, do meaningful work, and be part of a team
                that celebrates the wins together, we&apos;d love to meet you.
              </p>
              <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
                <a
                  href="/careers"
                  className="group inline-flex items-center gap-2 rounded-full bg-[#9CCC3C] px-4 py-2.5 text-sm font-semibold text-black"
                >
                  Explore careers
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </a>
                <a
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-full border border-white/25 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:border-white/50"
                >
                  Contact us
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Page shell
// ---------------------------------------------------------------------------
export default function CulturePageClient() {
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
        <Hero />
        <PhilosophySection />
        <GallerySection />
        <PillarsSection />
        <ProgramsSection />
        <SpotlightSection />
        <ValuesSection />
        <CultureCta />
        <Footer />
      </div>
    </main>
  );
}
