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
import { Inter, Oswald } from "next/font/google";
import { ArrowRight, CheckCircle2, ExternalLink } from "lucide-react";
import CardCornerArrow from "@/components/CardCornerArrow";
import Footer from "@/components/Footer";
import { PageBanner } from "@/components/PageBanner";
import { SiteHeader } from "@/components/SiteHeader";
import type { ServicePageContent } from "@/lib/servicePages";

const sans = Inter({ subsets: ["latin"], display: "swap" });
const display = Oswald({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

const ACCENT = "#ed1164";
const CARD_GAP = 20;

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
      <span className="h-1.5 w-1.5 rounded-full bg-[#ed1164]" />
      {children}
      <span className="h-px w-12 bg-current/30" />
    </div>
  );
}

// Interactive panel: a frosted-glass "crystal" lens + sheen that follows the
// cursor. Position is written to CSS vars on pointer move (no React re-render).
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
      {/* magnifier lens — a scaled duplicate of the content masked to a circle
          that follows the cursor, so whatever is under it reads bigger/crisper */}
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
        {/* soft glass sheen so the lens reads like polished crystal */}
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

function ServiceHeroTitle({ page }: { page: ServicePageContent }) {
  const firstLine = page.hero.title.join(" ").replace("Always-On", "Always On");

  return (
    <>
      <span className="whitespace-nowrap">{firstLine}</span>
      <br />
      <span className="whitespace-nowrap">
        {page.slug === "it-helpdesk-24-7" ? "IT " : ""}
        <span className="text-[#ed1164]">{page.hero.highlight}</span>
      </span>
    </>
  );
}

function HelpdeskProofCard({
  value,
  label,
  className = "",
}: {
  value: string;
  label: string;
  className?: string;
}) {
  return (
    <article className={`group h-full rounded-[2rem] border border-[#3f3f3d]/15 bg-[#f7f7f7] p-6 text-[#3f3f3d] transition-all duration-300 hover:-translate-y-1 hover:bg-[#ed1164] hover:text-white ${className}`}>
      <span className="grid h-11 w-11 place-items-center rounded-full bg-[#ed1164] transition-colors duration-300 group-hover:bg-white">
        <CheckCircle2 className="h-5 w-5 text-white transition-colors duration-300 group-hover:text-[#ed1164]" />
      </span>
      <h3 className="mt-7 text-4xl font-extrabold uppercase leading-none" style={{ fontFamily: "var(--font-display)" }}>
        {value}
      </h3>
      <p className="mt-4 text-sm font-semibold uppercase leading-6 tracking-[0.08em] opacity-75">
        {label}
      </p>
    </article>
  );
}

function HelpdeskComparisonSection({ page }: { page: ServicePageContent }) {
  return (
    <section className="relative overflow-hidden bg-[#EEEEEE] py-24">
      <div className="pointer-events-none absolute -left-32 top-20 h-96 w-96 rounded-full bg-[#ed1164]/20 blur-[140px]" />
      <div className="relative mx-auto grid max-w-7xl gap-12 px-6 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <Reveal className="max-w-2xl">
          <Kicker>{page.intro.kicker}</Kicker>
          <h2
            className="mt-5 text-[clamp(2.8rem,5vw,5.4rem)] font-extrabold uppercase leading-[0.94] tracking-tight text-black"
            style={{ fontFamily: "var(--font-display)" }}
          >
            <span className="whitespace-nowrap">Support that</span>
            <br />
            never sleeps.
          </h2>
          <div className="mt-6 space-y-4 text-base leading-7 text-black/70">
            {page.intro.body.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <a
            href={page.sourceUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-7 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#ed1164]"
          >
            Source page
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </Reveal>

        <div className="grid gap-5 sm:grid-cols-2">
          {page.proof.map((item, index) => (
            <Reveal key={item.label} delay={index * 0.08} className={index % 2 === 1 ? "sm:translate-y-10" : ""}>
              <HelpdeskProofCard value={item.value} label={item.label} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function CapabilitiesCarousel({ page }: { page: ServicePageContent }) {
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
      const rowW = page.capabilities.length * cw + (page.capabilities.length - 1) * CARD_GAP;
      setDistance(Math.max(0, rowW - w));
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [page.capabilities.length]);

  const total = String(page.capabilities.length).padStart(2, "0");

  return (
    <section
      ref={sectionRef}
      id="capabilities"
      className="relative bg-[#EEEEEE]"
      style={{ height: page.capabilities.length > 3 ? "260vh" : "180vh" }}
    >
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <div className="mx-auto grid w-full max-w-[1680px] items-center gap-10 px-6 sm:px-8 lg:grid-cols-[1.5fr_0.66fr]">
          <div ref={viewportRef} className="order-2 overflow-hidden lg:order-1">
            <motion.div style={{ x }} className="flex gap-5 will-change-transform">
              {page.capabilities.map((item, index) => (
                <article
                  key={item.title}
                  style={{ width: cardW }}
                  className="group relative flex h-[58vh] max-h-[600px] min-h-[340px] shrink-0 flex-col justify-end overflow-hidden rounded-2xl text-white transition-transform duration-300 hover:-translate-y-1.5"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.image}
                    alt={item.title}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/70 to-black/35" />
                  <div className="absolute left-6 top-6 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/70">
                    <span className="grid h-8 w-8 place-items-center rounded-lg bg-white/10 text-[#ed1164] ring-1 ring-white/15 backdrop-blur">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    / {total}
                  </div>
                  <CardCornerArrow bg="#EEEEEE" accent={ACCENT} />
                  <div className="relative p-6 pb-12">
                    <h3 className="text-xl font-semibold leading-tight drop-shadow" style={{ fontFamily: "var(--font-display)" }}>
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-white/75">{item.desc}</p>
                  </div>
                </article>
              ))}
            </motion.div>
          </div>

          <div className="order-1 lg:order-2">
            <Kicker>{page.group}</Kicker>
            <h2 className="mt-6 text-[clamp(2.6rem,5.5vw,5rem)] font-extrabold uppercase leading-[0.9] tracking-tight text-black" style={{ fontFamily: "var(--font-display)" }}>
              Service
              <br />
              <span className="text-[#ed1164]">coverage.</span>
            </h2>
            <p className="mt-6 max-w-sm text-base leading-7 text-black/70">
              A clear view of the support coverage, response model, and operational controls that keep your teams productive around the clock.
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

function BenefitScrollCard({
  benefit,
  index,
  total,
  progress,
}: {
  benefit: ServicePageContent["benefits"][number];
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const step = total > 1 ? 0.68 / (total - 1) : 0;
  const start = index * step;
  const end = Math.min(1, start + 0.32);
  const x = useTransform(progress, [start, end], [index % 2 === 0 ? 150 : 210, 0]);
  const y = useTransform(progress, [start, end], [index < 2 ? 110 : 160, 0]);
  const opacity = useTransform(progress, [start, start + 0.2], [0.25, 1]);
  const scale = useTransform(progress, [start, end], [0.88, 1]);

  return (
    <motion.div
      style={{ x, y, opacity, scale }}
      className="group flex min-h-[18rem] flex-col justify-between rounded-2xl border border-slate-200 bg-white p-7 shadow-lg shadow-black/5 transition-colors duration-300 hover:bg-[#ed1164] hover:text-white sm:p-8"
    >
      <div className="flex items-center justify-between">
        <span className="grid h-12 w-12 place-items-center rounded-xl bg-[#ed1164]/15 text-[#ed1164] transition-colors duration-300 group-hover:bg-white group-hover:text-[#ed1164]">
          <CheckCircle2 className="h-6 w-6" />
        </span>
        <span className="text-5xl font-extrabold leading-none text-[#ed1164]/60 transition-colors duration-300 group-hover:text-white/45" style={{ fontFamily: "var(--font-display)" }}>
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>
      <div>
        <h3 className="mt-6 text-2xl font-bold leading-tight text-black transition-colors duration-300 group-hover:text-white sm:text-3xl" style={{ fontFamily: "var(--font-display)" }}>
          {benefit.title}
        </h3>
        <p className="mt-3 text-base text-black/75 transition-colors duration-300 group-hover:text-white/80">{benefit.desc}</p>
      </div>
    </motion.div>
  );
}

function BenefitsStackSection({ page }: { page: ServicePageContent }) {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });
  const total = page.benefits.length;

  return (
    <section ref={sectionRef} className="relative bg-[#EEEEEE] py-24">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 sm:px-8 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <div className="lg:sticky lg:top-32">
            <Reveal>
              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[#ed1164]">
                What you get
              </span>
              <h2
                className="mt-3 text-4xl font-black uppercase tracking-tight text-black sm:text-5xl lg:text-6xl"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Outcomes Built Into The Service.
              </h2>
              <p className="mt-5 max-w-sm text-black">
                Predictable support, certified delivery practices, and transparent pricing help you scale IT operations without adding unnecessary overhead.
              </p>
            </Reveal>
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          {page.benefits.map((benefit, index) => (
            <BenefitScrollCard
              key={benefit.title}
              benefit={benefit}
              index={index}
              total={total}
              progress={scrollYProgress}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default function ServiceDetailPage({ page }: { page: ServicePageContent }) {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const saved = localStorage.getItem("mw-theme");
    if (saved === "dark" || saved === "light") setTheme(saved);
  }, []);

  useEffect(() => {
    localStorage.setItem("mw-theme", theme);
  }, [theme]);

  const isHelpdesk = page.slug === "it-helpdesk-24-7";

  return (
    <main className={`${sans.className} ${display.variable} bg-white text-black`}>
      <SiteHeader theme={theme} />

      <PageBanner
        image={page.hero.image}
        accent={ACCENT}
        headingClassName="text-[clamp(3.25rem,8.6vw,10.5rem)]"
        title={<ServiceHeroTitle page={page} />}
        subtitle={page.hero.subtitle}
        primary={{ label: page.hero.cta, href: "/#contact" }}
        secondary={{ label: "Explore capabilities", href: "#capabilities" }}
      />

      {!isHelpdesk && (
        <section className="bg-white">
          <div className="mx-auto max-w-7xl px-6 py-20 sm:px-8">
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {page.proof.map((item, index) => (
                <Reveal key={item.label} delay={index * 0.08}>
                  <div
                    className={`group h-full rounded-2xl p-6 shadow-lg shadow-black/5 transition-transform duration-300 hover:-translate-y-1.5 ${
                      index % 2 === 0 ? "bg-[#ed1164] text-white" : "border border-slate-200 bg-white text-black"
                    }`}
                  >
                    <p className="text-5xl font-extrabold" style={{ fontFamily: "var(--font-display)" }}>
                      {item.value}
                    </p>
                    <span className={`mt-4 block h-0.5 w-10 ${index % 2 === 0 ? "bg-white/50" : "bg-[#ed1164]"}`} />
                    <p className={`mt-4 text-xs font-semibold uppercase leading-relaxed tracking-[0.18em] ${index % 2 === 0 ? "text-white/80" : "text-black/65"}`}>
                      {item.label}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {isHelpdesk ? (
        <HelpdeskComparisonSection page={page} />
      ) : (
      <section className="relative overflow-hidden bg-white py-24">
        <div className="pointer-events-none absolute -left-32 top-20 h-96 w-96 rounded-full bg-[#ed1164]/20 blur-[140px]" />
        <div className="relative mx-auto grid max-w-7xl gap-12 px-6 sm:px-8">
          <Reveal className="max-w-2xl">
            <Kicker>{page.intro.kicker}</Kicker>
            <h2
              className="mt-5 text-4xl font-extrabold uppercase leading-[0.94] tracking-tight text-black sm:text-5xl lg:text-6xl"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {page.intro.title}
            </h2>
            <div className="mt-6 space-y-4 text-base leading-7 text-black/70">
              {page.intro.body.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <a
              href={page.sourceUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-7 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#ed1164]"
            >
              Source page
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </Reveal>
        </div>
      </section>
      )}

      {page.problems && (
        <section className="bg-[#EEEEEE] py-24">
          <div className="mx-auto max-w-7xl px-6 sm:px-8">
            <Reveal className="max-w-3xl">
              <Kicker>Problems we solve</Kicker>
              <h2 className="mt-5 text-4xl font-bold leading-[1.05] tracking-tight text-black sm:text-5xl" style={{ fontFamily: "var(--font-display)" }}>
                {page.problems.title}
              </h2>
            </Reveal>

            <div className="mt-12 grid gap-5 lg:grid-cols-3">
              {page.problems.groups.map((group, index) => (
                <Reveal key={group.title} delay={index * 0.08}>
                  <div className="h-full rounded-2xl border border-slate-200 bg-white p-6">
                    <h3 className="text-xl font-bold text-black" style={{ fontFamily: "var(--font-display)" }}>
                      {group.title}
                    </h3>
                    <ul className="mt-5 space-y-3">
                      {group.items.map((item) => (
                        <li key={item} className="flex gap-3 text-sm leading-6 text-black/70">
                          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#ed1164]" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      <CapabilitiesCarousel page={page} />

      <BenefitsStackSection page={page} />

      <section data-header-dark className="bg-[#383838] py-24 text-white">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 sm:px-8 lg:grid-cols-[0.8fr_1.2fr]">
          <Reveal>
            <Kicker>How it works</Kicker>
            <h2
              className="mt-6 text-[clamp(2.6rem,5.5vw,5rem)] font-extrabold uppercase leading-[0.9] tracking-tight text-white"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Setup to
              <br />
              steady execution.
            </h2>
            <p className="mt-5 max-w-md text-sm leading-7 text-white/60">
              Each engagement starts by understanding your environment, then moves into controlled execution with reporting and continuous improvement built in.
            </p>
            <a href="/#contact" className="mt-8 inline-flex items-center justify-center gap-2 rounded-md bg-[#ed1164] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#c80f54]">
              {page.finalCta.button}
              <ArrowRight className="h-4 w-4" />
            </a>
          </Reveal>

          <div className="space-y-4">
            {page.process.map((step, index) => (
              <Reveal key={step.title} delay={index * 0.06}>
                <div className="grid gap-5 rounded-2xl border border-white/10 bg-white/[0.04] p-6 sm:grid-cols-[4rem_1fr]">
                  <div className="text-4xl font-extrabold text-[#ed1164]" style={{ fontFamily: "var(--font-display)" }}>
                    {String(index + 1).padStart(2, "0")}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-[0.14em] text-white">
                      <CheckCircle2 className="h-4 w-4 text-[#ed1164]" />
                      {step.title}
                    </div>
                    <p className="mt-3 text-sm leading-7 text-white/60">{step.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="relative p-4 text-white sm:p-8">
        <GlassPanel className="relative overflow-hidden rounded-[2.5rem]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_#ff2f8b_0,_#ed1164_48%,_#b80052_100%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.07),rgba(0,0,0,0.08))]" />
          <div className="relative mx-auto px-6 py-24 text-center sm:px-10 lg:px-16">
            <Reveal>
            <h2 className="text-[clamp(2.6rem,5.5vw,5rem)] font-extrabold uppercase leading-[0.9] tracking-tight text-white" style={{ fontFamily: "var(--font-display)" }}>
              {page.finalCta.title}
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-white/80">
              {page.finalCta.desc}
            </p>
            <a href="/#contact" className="mt-8 inline-flex items-center justify-center gap-2 rounded-md bg-white px-6 py-3 text-sm font-semibold text-[#ed1164] transition-colors hover:bg-white/90">
              {page.finalCta.button}
              <ArrowRight className="h-4 w-4" />
            </a>
          </Reveal>
          </div>
        </GlassPanel>
      </section>

      <Footer />
    </main>
  );
}
