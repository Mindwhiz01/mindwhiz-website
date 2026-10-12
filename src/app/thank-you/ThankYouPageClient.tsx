"use client";

// ---------------------------------------------------------------------------
// Post-submission landing page. Two jobs:
//
//   1. Tell the person what happens next (so they don't re-submit the form or
//      wonder whether it worked).
//   2. Act as the conversion trigger. The lead itself is captured by
//      LeadConnector the moment Submit is pressed - this page does NOT capture
//      anything. What a dedicated URL buys us is a reliable, observable signal
//      for ad platforms: the forms are cross-origin iframes, so the parent page
//      cannot see a submit event. A pageview on /thank-you is the only thing we
//      can actually measure, and it's what Meta/GA optimize against.
// ---------------------------------------------------------------------------

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import { ArrowRight, CalendarClock, Check, Mail, Phone } from "lucide-react";
import Footer from "@/components/Footer";
import { SiteHeader } from "@/components/SiteHeader";
import { BOOKING_URL, PINK_CTA_CLASS } from "@/components/PageBanner";
import { consumeLeadEventId } from "@/lib/leadEvent";

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

declare global {
  interface Window {
    dataLayer?: unknown[];
  }
}

export default function ThankYouPageClient() {
  // Same light/dark handoff every other page uses, so the header matches
  // whatever theme the visitor had on the page they submitted from.
  const [theme, setTheme] = useState<"light" | "dark">("light");
  useEffect(() => {
    const saved = localStorage.getItem("mw-theme");
    if (saved === "dark" || saved === "light") setTheme(saved);
  }, []);

  // Announce the conversion to GTM - but ONLY if a genuine saved lead put a
  // marker in sessionStorage. A direct visit, a refresh, or a back-navigation
  // to this URL finds nothing and pushes nothing, so no phantom conversions.
  //
  // We deliberately do not call fbq() here. GTM owns the Meta tag so it can
  // stamp the event with `meta_event_id`, which lets Meta dedupe this browser
  // hit against the same lead arriving via the Conversions API. Firing here as
  // well would double-count.
  useEffect(() => {
    const eventId = consumeLeadEventId();
    if (!eventId) return;

    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event: "generate_lead", meta_event_id: eventId });
  }, []);

  return (
    <div className={`${sans.className} ${display.variable} bg-white`}>
      <SiteHeader theme={theme} />

      <main className="relative overflow-hidden">
        <div className="pointer-events-none absolute -left-32 -top-20 h-96 w-96 rounded-full bg-[#9CCC3C]/30 blur-[140px]" />
        <div className="pointer-events-none absolute -bottom-32 right-0 h-96 w-96 rounded-full bg-[#ed1164]/20 blur-[140px]" />

        <section className="relative mx-auto max-w-3xl px-6 py-24 text-center sm:px-8 sm:py-32">
          <motion.div variants={reveal} initial="hidden" animate="show">
            <span className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-[#9CCC3C] text-black shadow-xl shadow-[#9CCC3C]/40">
              <Check className="h-8 w-8" strokeWidth={3} />
            </span>

            <h1
              className="mt-8 text-[clamp(2.4rem,5.5vw,4rem)] font-extrabold uppercase leading-[0.95] tracking-tight text-black"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Thank you, we&rsquo;ve got it
            </h1>

            <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-black/70">
              Your request is with our team. A MindWhiz specialist will review it
              and get back to you within one business day with next steps and
              indicative pricing.
            </p>
          </motion.div>

          <motion.div
            variants={reveal}
            initial="hidden"
            animate="show"
            transition={{ delay: 0.12 }}
            className="mt-12 rounded-[2rem] border border-slate-200 bg-white/70 p-8 text-left shadow-sm backdrop-blur"
          >
            <h2 className="text-xs font-semibold uppercase tracking-[0.22em] text-[#9CCC3C]">
              What happens next
            </h2>
            <ol className="mt-6 space-y-5">
              {[
                "We review your requirements and match them to the right delivery team.",
                "A specialist emails you within one business day to confirm scope.",
              ].map((step, i) => (
                <li key={step} className="flex gap-4">
                  <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-black text-xs font-bold text-white">
                    {i + 1}
                  </span>
                  <span className="text-sm leading-relaxed text-black/75">{step}</span>
                </li>
              ))}
            </ol>
          </motion.div>

          <motion.div
            variants={reveal}
            initial="hidden"
            animate="show"
            transition={{ delay: 0.2 }}
            className="mt-12"
          >
            <p className="text-sm font-semibold text-black">
              Don&rsquo;t want to wait? Grab a slot now.
            </p>
            <div className="mt-5 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a
                href={BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-2 rounded-full border px-7 py-3.5 text-sm font-semibold transition ${PINK_CTA_CLASS}`}
              >
                <CalendarClock className="h-4 w-4" />
                Book a free consultation
                <ArrowRight className="h-4 w-4" />
              </a>
              <Link
                href="/case-studies"
                className="inline-flex items-center gap-2 rounded-full border border-slate-300 px-7 py-3.5 text-sm font-semibold text-black transition hover:border-black"
              >
                See client results
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </motion.div>

          <motion.div
            variants={reveal}
            initial="hidden"
            animate="show"
            transition={{ delay: 0.28 }}
            className="mt-14 flex flex-col items-center justify-center gap-4 text-sm text-black/60 sm:flex-row sm:gap-8"
          >
            <a href="mailto:info@mindwhiz.com" className="inline-flex items-center gap-2 hover:text-black">
              <Mail className="h-4 w-4" />
              info@mindwhiz.com
            </a>
            <a href="tel:+18329004608" className="inline-flex items-center gap-2 hover:text-black">
              <Phone className="h-4 w-4" />
              +1 (832) 900-4608
            </a>
          </motion.div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
