"use client";

// ---------------------------------------------------------------------------
// Shared layout for legal documents (/privacy, /terms): a compact dark title
// band (data-header-dark keeps the fixed header legible over it), numbered
// prose sections with a sticky in-page nav on desktop, and the site footer.
// ---------------------------------------------------------------------------

import { motion, type Variants } from "framer-motion";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import Footer from "@/components/Footer";
import { SiteHeader } from "@/components/SiteHeader";
import { company } from "@/lib/content";

const sans = Inter({ subsets: ["latin"], display: "swap", preload: false });
const display = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-display",
  display: "swap",
  preload: false,
});

const reveal: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};

export type LegalSection = {
  heading: string;
  /** Paragraphs; a string[] item renders as a bulleted list instead. */
  body: (string | string[])[];
};

const slugify = (s: string) =>
  s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

export function LegalPage({
  kicker,
  title,
  updated,
  intro,
  sections,
}: {
  kicker: string;
  title: string;
  updated: string;
  intro: string;
  sections: LegalSection[];
}) {
  return (
    <main className={`${sans.className} ${display.variable} bg-white text-black`}>
      <SiteHeader theme="light" />

      {/* ---- dark title band ---- */}
      <section data-header-dark className="bg-[#383838] px-6 pb-16 pt-40 text-white sm:px-8">
        <motion.div
          variants={reveal}
          initial="hidden"
          animate="show"
          className="mx-auto max-w-4xl"
        >
          <div className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#9CCC3C]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#9CCC3C]" />
            {kicker}
            <span className="h-px w-12 bg-white/20" />
          </div>
          <h1
            className="mt-5 text-[clamp(3.6rem,11vw,11rem)] font-extrabold uppercase leading-[0.92] tracking-tight"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {title}
          </h1>
          <p className="mt-5 text-sm text-white/60">Last updated: {updated}</p>
        </motion.div>
      </section>

      {/* ---- body ---- */}
      <section className="px-6 py-16 sm:px-8">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[220px_1fr]">
          {/* in-page nav */}
          <nav className="hidden lg:block">
            <ul className="sticky top-28 space-y-2.5 border-l border-slate-200 pl-4 text-sm text-black/60">
              {sections.map((s, i) => (
                <li key={s.heading}>
                  <a href={`#${slugify(s.heading)}`} className="transition-colors hover:text-black">
                    {i + 1}. {s.heading}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="max-w-3xl">
            <p className="text-base leading-relaxed text-black/70">{intro}</p>

            {sections.map((s, i) => (
              <div key={s.heading} id={slugify(s.heading)} className="mt-12 scroll-mt-28">
                <h2
                  className="text-xl font-bold text-black sm:text-2xl"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  <span className="mr-2 text-[#9CCC3C]">{String(i + 1).padStart(2, "0")}</span>
                  {s.heading}
                </h2>
                {s.body.map((block, j) =>
                  Array.isArray(block) ? (
                    <ul key={j} className="mt-4 space-y-2 text-base leading-relaxed text-black/70">
                      {block.map((li) => (
                        <li key={li} className="flex gap-3">
                          <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#9CCC3C]" />
                          {li}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p key={j} className="mt-4 text-base leading-relaxed text-black/70">
                      {block}
                    </p>
                  )
                )}
              </div>
            ))}

            {/* contact block */}
            <div className="mt-14 rounded-2xl border border-slate-200 bg-slate-50 p-6">
              <h2
                className="text-lg font-bold text-black"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Questions?
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-black/70">
                Contact us at{" "}
                <a href={`mailto:${company.email}`} className="font-semibold text-black underline decoration-[#9CCC3C] decoration-2 underline-offset-2">
                  {company.email}
                </a>{" "}
                or write to {company.name}, {company.address}.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
