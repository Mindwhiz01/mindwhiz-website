"use client";

// ---------------------------------------------------------------------------
// Shared FAQ accordion - light gray band, one item open at a time. Extracted
// from the web-services page so every service and industry page can reuse the
// same look with its own questions.
// ---------------------------------------------------------------------------

import { useState } from "react";
import { motion, type Variants } from "framer-motion";
import { Plus, X } from "lucide-react";

export type Faq = { q: string; a: string };

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

export default function FaqSection({
  faqs,
  heading = "Frequently Asked",
  accent = "Questions",
  className = "",
}: {
  faqs: Faq[];
  heading?: string;
  accent?: string;
  className?: string;
}) {
  const [open, setOpen] = useState(0);

  // FAQPage structured data - lets answer engines (Google AI Overviews,
  // ChatGPT, Perplexity) lift these Q&As directly into generated answers.
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.a,
      },
    })),
  };

  return (
    <section className={`relative overflow-hidden bg-[#EEEEEE] py-24 ${className}`}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <div className="relative mx-auto max-w-4xl px-6 sm:px-8">
        <Reveal>
          <h2
            className="text-center text-[clamp(2.6rem,5.5vw,5rem)] font-extrabold uppercase leading-[0.9] tracking-tight text-black"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {heading} <span style={{ color: "#ed1164" }}>{accent}</span>
          </h2>
        </Reveal>

        <div className="mt-14 space-y-4">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={f.q} delay={i * 0.05}>
                <div
                  className={`overflow-hidden rounded-[1.75rem] transition-colors duration-300 ${
                    isOpen ? "bg-white shadow-xl shadow-black/[0.06]" : "bg-[#e3e3e6]"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? -1 : i)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-4 px-7 py-6 text-left sm:px-8"
                  >
                    <span className="text-lg font-bold text-black sm:text-xl">
                      {f.q}
                    </span>
                    <span
                      className={`grid h-11 w-11 shrink-0 place-items-center rounded-full transition-colors ${
                        isOpen ? "bg-[#e3e3e6] text-black" : "bg-white text-black"
                      }`}
                    >
                      {isOpen ? <X className="h-5 w-5" /> : <Plus className="h-5 w-5" />}
                    </span>
                  </button>
                  <div
                    className={`grid transition-all duration-300 ease-out ${
                      isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="px-7 pb-7 text-base leading-relaxed text-black/60 sm:px-8">
                        {f.a}
                      </p>
                    </div>
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
