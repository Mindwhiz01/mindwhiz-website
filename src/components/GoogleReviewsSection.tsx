"use client";

// ---------------------------------------------------------------------------
// Google reviews - real MindWhiz Google Business Profile reviews shown in an
// auto-advancing carousel. Cards and buttons link straight to the profile so
// visitors can read more or leave one. Shared across web-services and home.
// ---------------------------------------------------------------------------

import { useEffect, useRef, useState } from "react";
import { motion, type Variants } from "framer-motion";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import Cta from "@/components/Cta";

const PINK = "#ed1164";
const displayFont: React.CSSProperties = { fontFamily: "var(--font-display)" };

const GOOGLE_PROFILE = "https://www.google.com/maps/place/?q=place_id:ChIJpxX3PFMHGTkRoxa2DLw0C_0";
const GOOGLE_WRITE_REVIEW = "https://g.page/r/CaMWtgy8NAv9EBM/review";

type Review = { name: string; text: string; color: string };
const googleReviews: Review[] = [
  { name: "veronica B", color: "#ed1164", text: "I have become a fan of their work. These guys are extraordinary and they know what they are doing. You can expect good results, they will never let you down. I recommend you all to give it a go." },
  { name: "Hector M.. ", color: "#0f172a", text: "They provide the best quality work with extra value. The satisfaction is guaranteed. Highly recommended!" },
  { name: "Jaselle M", color: "#65a30d", text: "This is the first company of this type I've had the pleasure to work with, and the results have been amazing. True professionalism." },
  { name: "Sajid Bukhari", color: "#ed1164", text: "I have a great experience with this company. I love this company." },
  { name: "smith", color: "#0f172a", text: "One of the best in digital marketing." },
  { name: "Emma Rossi", color: "#65a30d", text: "Best consultant in town." },
];

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

function GoogleGlyph({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden focusable="false">
      <path fill="#4285F4" d="M45.12 24.5c0-1.56-.14-3.06-.4-4.5H24v8.51h11.84c-.51 2.75-2.06 5.08-4.39 6.64v5.52h7.11c4.16-3.83 6.56-9.47 6.56-16.17z" />
      <path fill="#34A853" d="M24 46c5.94 0 10.92-1.97 14.56-5.33l-7.11-5.52c-1.97 1.32-4.49 2.1-7.45 2.1-5.73 0-10.58-3.87-12.31-9.07H4.34v5.7C7.96 41.07 15.4 46 24 46z" />
      <path fill="#FBBC05" d="M11.69 28.18c-.44-1.32-.69-2.73-.69-4.18s.25-2.86.69-4.18v-5.7H4.34C2.85 17.09 2 20.45 2 24s.85 6.91 2.34 9.88l7.35-5.7z" />
      <path fill="#EA4335" d="M24 10.75c3.23 0 6.13 1.11 8.41 3.29l6.31-6.31C34.91 4.18 29.93 2 24 2 15.4 2 7.96 6.93 4.34 14.12l7.35 5.7c1.73-5.2 6.58-9.07 12.31-9.07z" />
    </svg>
  );
}

function Stars({ n = 5 }: { n?: number }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`${n} out of 5 stars`}>
      {Array.from({ length: n }).map((_, i) => (
        <Star key={i} className="h-4 w-4 fill-[#FBBC05] text-[#FBBC05]" />
      ))}
    </div>
  );
}

export default function GoogleReviewsSection() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [perView, setPerView] = useState(3);
  const [containerW, setContainerW] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // track viewport-driven cards-per-view and the container width so the slide
  // step can be computed in pixels (keeps the gap aligned on every breakpoint)
  useEffect(() => {
    const measure = () => {
      const w = window.innerWidth;
      setPerView(w >= 1024 ? 3 : w >= 640 ? 2 : 1);
      if (containerRef.current) setContainerW(containerRef.current.offsetWidth);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const GAP = 24; // matches gap-6 on the track
  const step = perView ? (containerW + GAP) / perView : 0;
  const maxIndex = Math.max(0, googleReviews.length - perView);
  const go = (dir: number) =>
    setIndex((p) => {
      const next = p + dir;
      if (next < 0) return maxIndex;
      if (next > maxIndex) return 0;
      return next;
    });

  // keep the index valid when perView changes (e.g. on resize)
  useEffect(() => {
    setIndex((p) => Math.min(p, maxIndex));
  }, [maxIndex]);

  // auto-advance; hovering the track pauses it so visitors can read
  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => setIndex((p) => (p >= maxIndex ? 0 : p + 1)), 4000);
    return () => clearInterval(id);
  }, [paused, maxIndex]);

  return (
    <section className="relative overflow-hidden bg-[#faf9f7] py-24">
      <div className="pointer-events-none absolute -left-32 top-10 h-80 w-80 rounded-full bg-[#ed1164]/8 blur-[140px]" />
      <div className="pointer-events-none absolute -right-32 bottom-10 h-80 w-80 rounded-full bg-[#9CCC3C]/12 blur-[140px]" />
      <div className="relative mx-auto max-w-7xl px-6 sm:px-8">
        <div className="text-center">
          <Reveal className="flex justify-center">
            <Kicker>Google Reviews</Kicker>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-5 text-[clamp(2.6rem,5.5vw,5rem)] font-extrabold uppercase leading-[0.9] tracking-tight text-black" style={displayFont}>
              Our Client <span style={{ color: PINK }}>Feedback</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="mt-7 inline-flex items-center gap-3 rounded-full border border-slate-200 bg-white px-5 py-2.5 shadow-sm">
              <GoogleGlyph className="h-5 w-5" />
              <span className="text-lg font-extrabold text-black">5.0</span>
              <Stars />
              <span className="text-sm font-medium text-black/50">on Google</span>
            </div>
          </Reveal>
        </div>

        <div className="relative mt-14">
          <div ref={containerRef} className="overflow-hidden">
            <div
              className="flex gap-6 transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${index * step}px)` }}
              onMouseEnter={() => setPaused(true)}
              onMouseLeave={() => setPaused(false)}
            >
              {googleReviews.map((r) => (
                <div
                  key={r.name}
                  className="w-full shrink-0 sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]"
                  style={step ? { width: step - GAP } : undefined}
                >
                  <a
                    href={GOOGLE_PROFILE}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="group flex h-full flex-col rounded-[1.75rem] border border-slate-200 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#ed1164]/30 hover:shadow-xl hover:shadow-black/[0.06]"
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className="grid h-12 w-12 shrink-0 place-items-center rounded-full text-lg font-bold text-white"
                        style={{ backgroundColor: r.color }}
                      >
                        {r.name.charAt(0)}
                      </span>
                      <div className="min-w-0">
                        <p className="truncate font-bold text-black">{r.name}</p>
                        <Stars />
                      </div>
                      <GoogleGlyph className="ml-auto h-5 w-5 shrink-0" />
                    </div>
                    <p className="mt-5 text-[15px] leading-relaxed text-black/60">{r.text}</p>
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* controls - tablet & desktop: buttons on the left, arrows bottom-right */}
        <div className="mt-12 hidden flex-wrap items-center justify-between gap-4 sm:flex">
          <div className="flex flex-wrap items-center gap-4">
            <Cta href={GOOGLE_PROFILE} target="_blank" rel="noreferrer" label="See all reviews on Google" />
            <Cta
              href={GOOGLE_WRITE_REVIEW}
              target="_blank"
              rel="noreferrer"
              label="Leave a review"
              className="!border-[#ed1164] !bg-[#ed1164] !text-white shadow-xl shadow-[#ed1164]/40 hover:!bg-[#c50e53]"
            />
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Previous reviews"
              className="grid h-12 w-12 place-items-center rounded-full border border-slate-200 bg-white text-black transition-colors hover:border-[#ed1164] hover:bg-[#ed1164] hover:text-white"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Next reviews"
              className="grid h-12 w-12 place-items-center rounded-full border border-slate-200 bg-white text-black transition-colors hover:border-[#ed1164] hover:bg-[#ed1164] hover:text-white"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* controls - mobile: arrows below the card, then leave-a-review under them */}
        <div className="mt-8 flex flex-col items-center gap-5 sm:hidden">
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Previous reviews"
              className="grid h-12 w-12 place-items-center rounded-full border border-slate-200 bg-white text-black shadow-sm transition-colors hover:border-[#ed1164] hover:bg-[#ed1164] hover:text-white"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Next reviews"
              className="grid h-12 w-12 place-items-center rounded-full border border-slate-200 bg-white text-black shadow-sm transition-colors hover:border-[#ed1164] hover:bg-[#ed1164] hover:text-white"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
          <Cta
            href={GOOGLE_WRITE_REVIEW}
            target="_blank"
            rel="noreferrer"
            label="Leave a review"
            className="!border-[#ed1164] !bg-[#ed1164] !text-white shadow-xl shadow-[#ed1164]/40 hover:!bg-[#c50e53]"
          />
        </div>
      </div>
    </section>
  );
}
