"use client";

// ---------------------------------------------------------------------------
// About Us — leadership page. Beliefs section modeled on the "3 beliefs that
// guide our company" split layout, followed by a mirrored COO section.
// ---------------------------------------------------------------------------

import { useEffect, useState } from "react";
import { motion, type Variants } from "framer-motion";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import Footer from "@/components/Footer";
import { SiteHeader } from "@/components/SiteHeader";
import { PageBanner } from "@/components/PageBanner";

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
// Beliefs — CEO section (heading + portrait left, belief rows right)
// ---------------------------------------------------------------------------
const beliefs = [
  {
    title: "We believe that performance beats endless customization.",
    paragraphs: [
      "Everyone else promises you everything. We won't. Partnering with MindWhiz means giving up some control over how your operations are staffed and run.",
      "In return, you get a proven system built to grow your business. Our numbers prove it. It's why our clients outperform their competition.",
    ],
  },
  {
    title: "We believe that all businesses should benefit from global talent.",
    paragraphs: [
      "Corporations have teams working around the clock across the globe. Most small businesses have no one. MindWhiz changes this.",
      "Our team of experts puts vetted hybrid talent to work for you. You get the same capabilities as a global enterprise, without spending millions to get there.",
    ],
  },
  {
    title: "We believe in growing your profits above all else.",
    paragraphs: [
      "A lot of staffing companies make money whether you grow or not. We think that's wrong.",
      "MindWhiz is built around one question: is this business growing profitably? That's what we wake up thinking about.",
    ],
  },
];

function BeliefsSection() {
  return (
    <section className="bg-[#FAF9F5] py-24">
      <div className="mx-auto grid max-w-7xl gap-16 px-6 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-24">
        {/* left: heading + CEO portrait */}
        <div className="flex flex-col justify-between gap-16">
          <Reveal>
            <Kicker>Our beliefs</Kicker>
            <h2
              className="mt-4 text-[clamp(2.6rem,5.5vw,5rem)] font-extrabold uppercase leading-[0.9] tracking-tight text-black"
              style={{ fontFamily: "var(--font-display)" }}
            >
              What We <span style={{ color: "#ed1164" }}>Believe</span>
            </h2>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="max-w-xs">
              <img
                src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=700&q=80"
                alt="Muhammad Ali — Co-Founder and CEO at MindWhiz"
                className="aspect-[3/4] w-full rounded-[2.5rem] object-cover"
              />
              <p className="mt-4 text-sm font-semibold text-black">Muhammad Ali</p>
              <p className="text-sm text-black/60">Co-Founder and CEO at MindWhiz</p>
            </div>
          </Reveal>
        </div>

        {/* right: belief rows */}
        <div>
          {beliefs.map((b, i) => (
            <Reveal key={b.title} delay={i * 0.08}>
              <div
                className={`grid gap-6 border-t border-black/10 py-12 sm:grid-cols-[0.9fr_1.1fr] sm:gap-10 ${
                  i === beliefs.length - 1 ? "pb-0" : ""
                }`}
              >
                <h3
                  className="text-xl font-bold leading-snug text-black sm:text-2xl"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {b.title}
                </h3>
                <div className="space-y-5">
                  {b.paragraphs.map((p) => (
                    <p key={p} className="text-[15px] leading-relaxed text-black/65">
                      {p}
                    </p>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// COO section — content on the left, portrait on the right
// ---------------------------------------------------------------------------
const cooPoints = [
  {
    title: "Operations that never sleep.",
    desc: "From 24/7 helpdesk floors to NOC monitoring, our delivery engine runs across three time zones so your business never stops.",
  },
  {
    title: "Quality you can measure.",
    desc: "Every engagement ships with SLAs, reporting cadences, and named owners — so you always know how your team is performing.",
  },
  {
    title: "People before process.",
    desc: "We invest in training, retention, and career paths for every specialist we place. Happy teams do the best work.",
  },
];

function CooSection() {
  return (
    <section className="bg-white py-24">
      <div className="mx-auto grid max-w-7xl items-center gap-16 px-6 sm:px-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-24">
        {/* left: content */}
        <div>
          <Reveal>
            <Kicker>Leadership</Kicker>
            <h2
              className="mt-4 text-[clamp(2.6rem,5.5vw,5rem)] font-extrabold uppercase leading-[0.9] tracking-tight text-black"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Built To <span style={{ color: "#ed1164" }}>Deliver</span>
            </h2>
            <p className="mt-6 max-w-xl text-[15px] leading-relaxed text-black/65">
              As Chief Operating Officer, Muhammad Aftab Zafar leads delivery across our
              US, UK, and Pakistan hubs — turning flexible talent, scalable teams, and
              global impact into daily operational excellence for every client we serve.
            </p>
          </Reveal>

          <div className="mt-10">
            {cooPoints.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.08}>
                <div className="grid gap-3 border-t border-black/10 py-8 sm:grid-cols-[0.9fr_1.1fr] sm:gap-10">
                  <h3
                    className="text-lg font-bold leading-snug text-black sm:text-xl"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {p.title}
                  </h3>
                  <p className="text-[15px] leading-relaxed text-black/65">{p.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* right: COO portrait */}
        <Reveal delay={0.1} className="mx-auto w-full max-w-xs">
          <div>
            <img
              src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=800&q=80"
              alt="Muhammad Aftab Zafar — Chief Operating Officer at MindWhiz"
              className="aspect-[3/4] w-full rounded-[2.5rem] object-cover"
            />
            <p className="mt-4 text-sm font-semibold text-black">Muhammad Aftab Zafar</p>
            <p className="text-sm text-black/60">Chief Operating Officer at MindWhiz</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Page shell
// ---------------------------------------------------------------------------
export default function AboutPage() {
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
        <PageBanner
          image="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=1800&q=80"
          title={
            <>
              About <span className="text-[#9CCC3C]">us.</span>
            </>
          }
          subtitle="The people and principles behind MindWhiz — a leadership team obsessed with building scalable, profitable operations for every client."
          primary={{ label: "Work with us", href: "/contact" }}
          secondary={{ label: "Our beliefs", href: "#beliefs" }}
        />

        <div id="beliefs">
          <BeliefsSection />
        </div>

        <CooSection />

        <Footer />
      </div>
    </main>
  );
}
