"use client";

// ---------------------------------------------------------------------------
// Case study detail, the "on the record" dossier for a single engagement.
// Hero header, at-a-glance facts, challenge, approach, outcome metrics, a
// pull quote, and links to the other cases. Brand-consistent with the site.
// ---------------------------------------------------------------------------

import { useEffect, useState } from "react";
import { motion, type Variants } from "framer-motion";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import { ArrowLeft, ArrowRight, Check, Quote } from "lucide-react";
import Footer from "@/components/Footer";
import { SiteHeader } from "@/components/SiteHeader";
import { jsonLdScript } from "@/lib/jsonLd";
import { caseStudies } from "@/lib/content";

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

type CaseStudy = (typeof caseStudies)[number];

export default function CaseStudyDetail({ cs }: { cs: CaseStudy }) {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  useEffect(() => {
    const saved = localStorage.getItem("mw-theme");
    if (saved === "dark" || saved === "light") setTheme(saved);
  }, []);
  useEffect(() => {
    localStorage.setItem("mw-theme", theme);
  }, [theme]);

  const others = caseStudies.filter((c) => c.slug !== cs.slug);

  const siteUrl = "https://mindwhiz.com";
  const caseStudyJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${siteUrl}/case-studies/${cs.slug}`,
    articleSection: "Case Study",
    headline: `${cs.client}, ${cs.category} engagement`,
    description: cs.result,
    image: cs.img,
    about: { "@type": "Organization", name: cs.client },
    publisher: { "@id": `${siteUrl}/#organization` },
    mainEntityOfPage: `${siteUrl}/case-studies/${cs.slug}`,
  };
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
      { "@type": "ListItem", position: 2, name: "Case Studies", item: `${siteUrl}/case-studies` },
      { "@type": "ListItem", position: 3, name: cs.client, item: `${siteUrl}/case-studies/${cs.slug}` },
    ],
  };

  return (
    <main className={`${sans.className} ${display.variable} bg-white text-black`}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(caseStudyJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(breadcrumbJsonLd) }}
      />
      <SiteHeader theme={theme} />

      <div className={theme === "dark" ? "theme-dark" : undefined}>
        {/* hero */}
        <section
          data-header-dark
          className="relative overflow-hidden bg-[#383838] px-6 pb-16 pt-36 text-white sm:px-8"
        >
          <div className="absolute inset-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={cs.img} alt={`${cs.client} — MindWhiz case study`} className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/65 to-black/45" />
          </div>
          <div className="pointer-events-none absolute -bottom-32 -left-32 h-[26rem] w-[26rem] rounded-full bg-[#9CCC3C]/25 blur-[130px]" />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="relative mx-auto max-w-5xl"
          >
            <a
              href="/case-studies"
              className="inline-flex items-center gap-2 text-sm font-semibold text-white/70 transition-colors hover:text-white"
            >
              <ArrowLeft className="h-4 w-4" />
              The case record
            </a>
            <p className="mt-6 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#9CCC3C]">
              {cs.category} · Engagement · 2025
            </p>
            <h1
              className="mt-4 text-[clamp(3.6rem,11vw,11rem)] font-extrabold uppercase leading-[0.92] tracking-tight"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {cs.client}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/80">{cs.result}</p>
          </motion.div>
        </section>

        {/* at a glance */}
        <section className="border-b border-black/10 bg-white py-12">
          <div className="mx-auto grid max-w-5xl gap-8 px-6 sm:grid-cols-3 sm:px-8">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-black/40">Client</p>
              <p className="mt-2 text-lg font-bold text-black" style={{ fontFamily: "var(--font-display)" }}>
                {cs.client}
              </p>
            </div>
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-black/40">Category</p>
              <p className="mt-2 text-lg font-bold text-black" style={{ fontFamily: "var(--font-display)" }}>
                {cs.category}
              </p>
            </div>
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-black/40">Services</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {cs.services.map((s) => (
                  <span
                    key={s}
                    className="rounded-full border border-black/15 px-3 py-1 text-xs font-medium text-black/70"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* challenge + approach */}
        <section className="bg-white py-20">
          <div className="mx-auto grid max-w-5xl gap-14 px-6 sm:px-8 lg:grid-cols-2">
            <Reveal>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#ed1164]">The challenge</p>
              <h2
                className="mt-4 text-3xl font-bold leading-tight text-black"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Where they started
              </h2>
              <p className="mt-5 text-[15px] leading-relaxed text-black/70">{cs.challenge}</p>
            </Reveal>
            <Reveal delay={0.08}>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#ed1164]">Our approach</p>
              <h2
                className="mt-4 text-3xl font-bold leading-tight text-black"
                style={{ fontFamily: "var(--font-display)" }}
              >
                What we did
              </h2>
              <ul className="mt-5 space-y-4">
                {cs.approach.map((a) => (
                  <li key={a} className="flex items-start gap-3 text-[15px] leading-relaxed text-black/70">
                    <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-[#9CCC3C]/20">
                      <Check className="h-3.5 w-3.5 text-[#4E7A22]" />
                    </span>
                    {a}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </section>

        {/* outcome metrics */}
        <section className="bg-[#383838] py-20 text-white">
          <div className="mx-auto max-w-5xl px-6 sm:px-8">
            <Reveal>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#9CCC3C]">The outcome, on record</p>
              <h2
                className="mt-4 text-[clamp(2rem,4vw,3.2rem)] font-extrabold uppercase leading-[0.95] tracking-tight"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {cs.highlights.join(". ")}
              </h2>
            </Reveal>

            <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3">
              {cs.metrics.map((m, i) => (
                <Reveal key={m.label} delay={i * 0.06}>
                  <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-7">
                    <p
                      className="text-4xl font-extrabold leading-none text-[#9CCC3C]"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {m.value}
                    </p>
                    <p className="mt-3 text-sm text-white/65">{m.label}</p>
                  </div>
                </Reveal>
              ))}
            </div>

            <div className="mt-10 grid gap-3">
              {cs.outcomes.map((o) => (
                <div key={o} className="flex items-start gap-3 text-[15px] text-white/80">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#9CCC3C]" />
                  {o}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* quote */}
        <section className="bg-white py-20">
          <div className="mx-auto max-w-4xl px-6 text-center sm:px-8">
            <Reveal>
              <Quote className="mx-auto h-10 w-10 text-[#9CCC3C]" />
              <blockquote
                className="mt-6 text-[clamp(1.5rem,3vw,2.4rem)] font-bold leading-snug tracking-tight text-black"
                style={{ fontFamily: "var(--font-display)" }}
              >
                “{cs.quote.text}”
              </blockquote>
              <p className="mt-6 text-sm font-semibold uppercase tracking-[0.18em] text-black/50">
                {cs.quote.author}
              </p>
            </Reveal>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-[#FAF9F5] pb-20">
          <div className="mx-auto max-w-5xl px-6 sm:px-8">
            <Reveal>
              <div className="relative overflow-hidden rounded-[2rem] bg-[#383838] px-8 py-14 text-center text-white sm:px-14">
                <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#9CCC3C]/35 blur-[130px]" />
                <div className="relative">
                  <h2
                    className="mx-auto max-w-2xl text-[clamp(1.8rem,3.5vw,3rem)] font-extrabold uppercase leading-[0.98] tracking-tight"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    Want results like <span className="text-[#9CCC3C]">{cs.client}?</span>
                  </h2>
                  <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                    <a
                      href="/contact"
                      className="group inline-flex items-center gap-2 rounded-full bg-[#9CCC3C] px-4 py-2.5 text-sm font-semibold text-black"
                    >
                      Build your team
                      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </a>
                    <a
                      href="/case-studies"
                      className="inline-flex items-center gap-2 rounded-full border border-white/25 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:border-white/50"
                    >
                      All case studies
                    </a>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* other cases */}
        <section className="bg-[#FAF9F5] pb-24">
          <div className="mx-auto max-w-5xl px-6 sm:px-8">
            <h2 className="text-2xl font-bold text-black" style={{ fontFamily: "var(--font-display)" }}>
              More on the record
            </h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              {others.map((o) => (
                <a
                  key={o.slug}
                  href={`/case-studies/${o.slug}`}
                  className="group flex flex-col overflow-hidden rounded-[1.5rem] border border-black/10 bg-white transition-colors hover:border-black/25"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={o.img}
                    alt={o.client}
                    loading="lazy"
                    className="h-44 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="p-6">
                    <span className="text-xs font-semibold text-[#ed1164]">{o.category}</span>
                    <h3 className="mt-2 text-xl font-bold text-black" style={{ fontFamily: "var(--font-display)" }}>
                      {o.client}
                    </h3>
                    <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[#4E7A22]">
                      Read case study
                      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </main>
  );
}
