"use client";

import { useState } from "react";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import {
  Activity,
  ArrowLeft,
  ArrowRight,
  Calculator,
  Check,
  Cloud,
  GitBranch,
  Headset,
  Laptop,
  Megaphone,
  MonitorSmartphone,
  Ruler,
  ShieldCheck,
  UserPlus,
  Users,
  type LucideIcon,
} from "lucide-react";
import { services } from "@/lib/content";

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

const serviceIconMap: Record<string, LucideIcon> = {
  Headset,
  Activity,
  ShieldCheck,
  Cloud,
  GitBranch,
  Laptop,
  Users,
  Calculator,
  Megaphone,
  Ruler,
  UserPlus,
  MonitorSmartphone,
};

const FORM_STEPS = ["You", "Service", "Details"] as const;

export function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", service: "", message: "" });
  const [sent, setSent] = useState(false);
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(1);

  const goTo = (n: number) => {
    setDirection(n > step ? 1 : -1);
    setStep(n);
  };

  const canContinueStep0 = form.name.trim() !== "" && form.email.trim() !== "";
  const canContinueStep1 = form.service !== "";

  if (sent) {
    return (
      <div className="mt-10 flex items-center gap-3 rounded-2xl border border-[#9CCC3C]/40 bg-[#9CCC3C]/10 px-6 py-5 text-sm font-semibold text-[#4d7a17]">
        <Check className="h-5 w-5 shrink-0" />
        Thanks - your message has been received. We&apos;ll be in touch shortly.
      </div>
    );
  }

  return (
    <div className="relative mt-10 overflow-hidden rounded-[2rem] border border-white/60 bg-white/40 shadow-xl shadow-black/5 backdrop-blur-2xl backdrop-saturate-150">
      {/* crystal sheen + top highlight */}
      <span className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-white/80 to-transparent" />
      <motion.span
        aria-hidden
        initial={{ x: "-130%" }}
        animate={{ x: "130%" }}
        transition={{ duration: 2.6, repeat: Infinity, repeatDelay: 3.5, ease: "easeInOut" }}
        className="pointer-events-none absolute inset-y-0 left-0 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/50 to-transparent"
      />

      {/* step progress */}
      <div className="relative flex items-center gap-2 px-7 pt-7 sm:px-9 sm:pt-9">
        {FORM_STEPS.map((label, i) => (
          <div key={label} className="flex flex-1 items-center gap-2">
            <span
              className={`grid h-7 w-7 shrink-0 place-items-center rounded-full text-[11px] font-bold transition-colors ${
                i <= step ? "bg-[#9CCC3C] text-black" : "bg-black/10 text-black/40"
              }`}
            >
              {i < step ? <Check className="h-3.5 w-3.5" /> : i + 1}
            </span>
            <span
              className={`hidden text-xs font-semibold uppercase tracking-[0.14em] sm:block ${
                i <= step ? "text-black" : "text-black/40"
              }`}
            >
              {label}
            </span>
            {i < FORM_STEPS.length - 1 && (
              <span className="h-px flex-1 bg-black/10">
                <span
                  className="block h-px bg-[#9CCC3C] transition-all duration-500"
                  style={{ width: i < step ? "100%" : "0%" }}
                />
              </span>
            )}
          </div>
        ))}
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          setSent(true);
        }}
        className="relative overflow-hidden p-7 sm:p-9"
      >
        <AnimatePresence mode="wait" custom={direction}>
          {step === 0 && (
            <motion.div
              key="step-0"
              custom={direction}
              initial={{ x: direction > 0 ? 40 : -40, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: direction > 0 ? -40 : 40, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              <p
                className="text-xl font-bold text-black"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Let&apos;s start with the basics.
              </p>
              <div className="mt-6 grid gap-5 sm:grid-cols-2">
                <div className="sm:col-span-1">
                  <label className="text-xs font-semibold uppercase tracking-[0.14em] text-black/60">
                    Name
                  </label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Your name"
                    className="mt-2 w-full rounded-md border border-slate-300 bg-white/70 px-4 py-3 text-sm text-black placeholder:text-black/35 outline-none backdrop-blur-sm transition-colors focus:border-slate-400 focus:bg-white"
                  />
                </div>
                <div className="sm:col-span-1">
                  <label className="text-xs font-semibold uppercase tracking-[0.14em] text-black/60">
                    Email
                  </label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="you@company.com"
                    className="mt-2 w-full rounded-md border border-slate-300 bg-white/70 px-4 py-3 text-sm text-black placeholder:text-black/35 outline-none backdrop-blur-sm transition-colors focus:border-slate-400 focus:bg-white"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="text-xs font-semibold uppercase tracking-[0.14em] text-black/60">
                    Phone (optional)
                  </label>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    placeholder="+1 (___) ___-____"
                    className="mt-2 w-full rounded-md border border-slate-300 bg-white/70 px-4 py-3 text-sm text-black placeholder:text-black/35 outline-none backdrop-blur-sm transition-colors focus:border-slate-400 focus:bg-white"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="text-xs font-semibold uppercase tracking-[0.14em] text-black/60">
                    Message (optional)
                  </label>
                  <textarea
                    rows={3}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Tell us about your team, timeline, and goals."
                    className="mt-2 w-full resize-none rounded-md border border-slate-300 bg-white/70 px-4 py-3 text-sm text-black placeholder:text-black/35 outline-none backdrop-blur-sm transition-colors focus:border-slate-400 focus:bg-white"
                  />
                </div>
              </div>
              <div className="mt-7 flex justify-end">
                <button
                  type="button"
                  disabled={!canContinueStep0}
                  onClick={() => goTo(1)}
                  className="inline-flex items-center justify-center gap-2 rounded-md bg-[#2F343B] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#242A31] disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Next
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </motion.div>
          )}

          {step === 1 && (
            <motion.div
              key="step-1"
              custom={direction}
              initial={{ x: direction > 0 ? 40 : -40, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: direction > 0 ? -40 : 40, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              <p
                className="text-xl font-bold text-black"
                style={{ fontFamily: "var(--font-display)" }}
              >
                What do you need help with?
              </p>
              <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
                {services.map((s) => {
                  const Icon = serviceIconMap[s.icon] ?? Activity;
                  const active = form.service === s.name;
                  return (
                    <button
                      key={s.name}
                      type="button"
                      onClick={() => setForm({ ...form, service: s.name })}
                      className={`flex flex-col items-start gap-3 rounded-xl border p-4 text-left transition-colors ${
                        active
                          ? "border-[#9CCC3C] bg-[#9CCC3C] text-black"
                          : "border-white/70 bg-white/70 text-black hover:border-[#9CCC3C]/50"
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                      <span className="text-xs font-semibold leading-snug">{s.name}</span>
                    </button>
                  );
                })}
                <button
                  type="button"
                  onClick={() => setForm({ ...form, service: "Other" })}
                  className={`flex flex-col items-start gap-3 rounded-xl border p-4 text-left transition-colors ${
                    form.service === "Other"
                      ? "border-[#9CCC3C] bg-[#9CCC3C] text-black"
                      : "border-white/70 bg-white/70 text-black hover:border-[#9CCC3C]/50"
                  }`}
                >
                  <Activity className="h-5 w-5" />
                  <span className="text-xs font-semibold leading-snug">Other</span>
                </button>
              </div>
              <div className="mt-7 flex justify-between">
                <button
                  type="button"
                  onClick={() => goTo(0)}
                  className="inline-flex items-center justify-center gap-2 rounded-md border border-black/15 px-6 py-3 text-sm font-semibold text-black transition-colors hover:bg-black/5"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back
                </button>
                <button
                  type="button"
                  disabled={!canContinueStep1}
                  onClick={() => goTo(2)}
                  className="inline-flex items-center justify-center gap-2 rounded-md bg-[#2F343B] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#242A31] disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Next
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step-2"
              custom={direction}
              initial={{ x: direction > 0 ? 40 : -40, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: direction > 0 ? -40 : 40, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              <p
                className="text-xl font-bold text-black"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Anything else we should know?
              </p>
              <div className="mt-6">
                <label className="text-xs font-semibold uppercase tracking-[0.14em] text-black/60">
                  What are you trying to achieve?
                </label>
                <textarea
                  rows={5}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="Tell us about your team, timeline, and goals."
                  className="mt-2 w-full resize-none rounded-md border border-white/70 bg-white/70 px-4 py-3 text-sm text-black placeholder:text-black/35 outline-none backdrop-blur-sm transition-colors focus:border-[#9CCC3C] focus:bg-white"
                />
              </div>
              <div className="mt-7 flex justify-between">
                <button
                  type="button"
                  onClick={() => goTo(1)}
                  className="inline-flex items-center justify-center gap-2 rounded-md border border-black/15 px-6 py-3 text-sm font-semibold text-black transition-colors hover:bg-black/5"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 rounded-md bg-[#2F343B] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#242A31]"
                >
                  Send message
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </form>
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

        {/* klickpin video - right (hidden on mobile) */}
        <Reveal
          delay={0.1}
          className="hidden aspect-video min-h-[240px] items-center justify-center overflow-hidden rounded-2xl border border-slate-200 bg-black sm:flex lg:aspect-auto lg:h-full lg:min-h-0"
        >
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
