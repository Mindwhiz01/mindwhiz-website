"use client";

import { useEffect } from "react";
import { motion, type Variants } from "framer-motion";

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
    <div className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#9CCC3C]">
      <span className="h-1.5 w-1.5 rounded-full bg-[#9CCC3C]" />
      {children}
      <span className="h-px w-12 bg-slate-300" />
    </div>
  );
}

export function ContactForm() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://link.msgsndr.com/js/form_embed.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return (
    <div className="mt-10 w-full overflow-hidden rounded-[2rem]">
      <iframe
        src="https://api.leadconnectorhq.com/widget/form/OyGF6Yyhw5QmxIveuuln"
        style={{ width: "100%", height: "666px", border: "none", borderRadius: "8px" }}
        id="inline-OyGF6Yyhw5QmxIveuuln"
        data-layout={'{"id":"INLINE"}'}
        data-trigger-type="alwaysShow"
        data-trigger-value=""
        data-activation-type="alwaysActivated"
        data-activation-value=""
        data-deactivation-type="neverDeactivate"
        data-deactivation-value=""
        data-form-name="Get Your Free Consultation - Inbound Lead Form"
        data-height="666"
        data-layout-iframe-id="inline-OyGF6Yyhw5QmxIveuuln"
        data-form-id="OyGF6Yyhw5QmxIveuuln"
        title="Get Your Free Consultation - Inbound Lead Form"
      />
    </div>
  );
}

export default function ContactFormSection() {
  return (
    <section id="contact" className="relative overflow-hidden bg-white py-24">
      <div className="pointer-events-none absolute -left-32 -top-20 h-96 w-96 rounded-full bg-[#9CCC3C]/30 blur-[140px]" />
      <div className="pointer-events-none absolute -bottom-32 right-0 h-96 w-96 rounded-full bg-[#ed1164]/20 blur-[140px]" />
      <div className="relative mx-auto grid max-w-7xl gap-16 px-6 sm:px-8 lg:grid-cols-[1fr_0.6fr]">
        {/* form - left */}
        <Reveal delay={0}>
          <Kicker>Get in touch</Kicker>
          <h2
            className="mt-5 text-[clamp(2.6rem,5.5vw,5rem)] font-extrabold uppercase leading-[0.9] tracking-tight text-black"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Build your hybrid team now.
          </h2>
          <p className="mt-5 max-w-md text-sm leading-relaxed text-black/70">
            Fill out the form and a MindWhiz specialist will get back to you
            within one business day.
          </p>

          <ContactForm />
        </Reveal>

        {/* klickpin video - right */}
        <Reveal delay={0.1} className="flex items-center justify-center overflow-hidden rounded-2xl border border-slate-200 bg-black">
          <video
            title="Klickpin Video"
            className="h-full w-full object-cover"
            controls
            autoPlay
            muted
            loop
            preload="auto"
          >
            <source src="/video.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </Reveal>
      </div>
    </section>
  );
}
