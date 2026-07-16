"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
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
  Mail,
  MapPin,
  Megaphone,
  MonitorSmartphone,
  Phone,
  Ruler,
  ShieldCheck,
  UserPlus,
  Users,
  type LucideIcon,
} from "lucide-react";
import { company, services } from "@/lib/content";
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
    <div className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#9CCC3C]">
      <span className="h-1.5 w-1.5 rounded-full bg-[#9CCC3C]" />
      {children}
      <span className="h-px w-12 bg-slate-300" />
    </div>
  );
}

const contactCards = [
  { Icon: Mail, label: "Email us", value: company.email, href: `mailto:${company.email}` },
  { Icon: Phone, label: "Call us", value: company.phone, href: company.phoneHref },
  { Icon: MapPin, label: "Visit us", value: company.address, href: "#map" },
];

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

const offices = [
  {
    country: "United States",
    city: "Houston, Texas",
    img: "/hubs/us.jpg",
    mapQuery: "Houston, Texas, United States",
  },
  {
    country: "United Kingdom",
    city: "London",
    img: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=640&h=860&q=80",
    mapQuery: "London, United Kingdom",
  },
  {
    country: "Pakistan",
    city: "Lahore",
    img: "/hubs/pk.jpg",
    mapQuery: "Lahore, Pakistan",
  },
];

export default function ContactPage() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  useEffect(() => {
    const saved = localStorage.getItem("mw-theme");
    if (saved === "dark" || saved === "light") setTheme(saved);
  }, []);
  useEffect(() => {
    localStorage.setItem("mw-theme", theme);
  }, [theme]);

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

  // world-zoom view - wide enough for the US, UK, and Pakistan hubs to all sit in frame
  const worldMapSrc = "https://www.google.com/maps?q=20,10&z=2&output=embed";

  return (
    <main className={`${sans.className} ${display.variable} bg-white text-black`}>
      <SiteHeader theme={theme} />

      <div className={theme === "dark" ? "theme-dark" : undefined}>
        {/* ===================== HERO BANNER ===================== */}
        <PageBanner
          image="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1800&q=80"
          title={
            <>
              Let&apos;s <span className="text-[#9CCC3C]">talk.</span>
            </>
          }
          subtitle="Tell us what you're trying to achieve. MindWhiz will respond with the right people, the right approach, and a clear next step."
          primary={{ label: "Send a message", href: "#form" }}
          secondary={{ label: "Call us", href: company.phoneHref }}
        />

        {/* ===================== FORM ===================== */}
        <section id="form" className="relative overflow-hidden bg-white py-24">
          <div className="pointer-events-none absolute -left-32 -top-20 h-96 w-96 rounded-full bg-[#9CCC3C]/30 blur-[140px]" />
          <div className="pointer-events-none absolute -bottom-32 right-0 h-96 w-96 rounded-full bg-[#ed1164]/20 blur-[140px]" />
          <div className="relative mx-auto grid max-w-7xl gap-16 px-6 sm:px-8 lg:grid-cols-[1fr_0.6fr]">
            {/* form */}
            <Reveal>
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

              {sent ? (
                <div className="mt-10 flex items-center gap-3 rounded-2xl border border-[#9CCC3C]/40 bg-[#9CCC3C]/10 px-6 py-5 text-sm font-semibold text-[#4d7a17]">
                  <Check className="h-5 w-5 shrink-0" />
                  Thanks - your message has been received. We&apos;ll be in touch shortly.
                </div>
              ) : (
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
                          </div>
                          <div className="mt-7 flex justify-end">
                            <button
                              type="button"
                              disabled={!canContinueStep0}
                              onClick={() => goTo(1)}
                              className="inline-flex items-center justify-center gap-2 rounded-md bg-[#2F343B] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#242A31] disabled:cursor-not-allowed disabled:opacity-40"
                            >
                              Continue
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
                              Continue
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
              )}
            </Reveal>

            {/* contact info */}
            <Reveal delay={0.1} className="flex flex-col gap-4">
              {contactCards.map((c) => (
                <a
                  key={c.label}
                  href={c.href}
                  className="group flex items-start gap-4 rounded-2xl border border-slate-200 bg-[#EEEEEE] p-6 transition-colors hover:border-[#9CCC3C]/50"
                >
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-[#9CCC3C]/15 text-[#7DB022]">
                    <c.Icon className="h-5 w-5" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-xs font-semibold uppercase tracking-[0.14em] text-black/50">
                      {c.label}
                    </span>
                    <span className="mt-1 block text-sm font-medium leading-relaxed text-black">
                      {c.value}
                    </span>
                  </span>
                </a>
              ))}

              <div id="map" className="overflow-hidden rounded-2xl border border-slate-200 shadow-lg shadow-black/5">
                <iframe
                  title="MindWhiz global locations - United States, United Kingdom, Pakistan"
                  src={worldMapSrc}
                  className="h-64 w-full"
                  style={{ border: 0 }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </Reveal>
          </div>
        </section>

        {/* ===================== OFFICES ===================== */}
        <section className="bg-[#EEEEEE] py-24">
          <div className="mx-auto max-w-7xl px-6 sm:px-8">
            <Reveal>
              <Kicker>Offices</Kicker>
              <p className="mt-4 text-sm text-black/60">
                {company.locations.join(" · ")}
              </p>
            </Reveal>

            <div className="mt-8 grid gap-5 sm:grid-cols-3">
              {offices.map((o, i) => (
                <Reveal key={o.country} delay={i * 0.08}>
                  <a
                    href={`https://www.google.com/maps?q=${encodeURIComponent(o.mapQuery)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="group relative flex h-96 items-end overflow-hidden rounded-2xl"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={o.img}
                      alt={o.country}
                      loading="lazy"
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                    <div className="relative p-6">
                      <p
                        className="text-xl font-bold leading-tight text-white"
                        style={{ fontFamily: "var(--font-display)" }}
                      >
                        {o.country}
                      </p>
                      <p className="mt-1 text-xs font-semibold uppercase tracking-[0.14em] text-[#9CCC3C]">
                        {o.city}
                      </p>
                    </div>
                  </a>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </main>
  );
}
