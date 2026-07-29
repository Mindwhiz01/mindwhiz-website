"use client";

// ---------------------------------------------------------------------------
// Newsletter, subscribe landing page. A centered sign-up hero with a working
// client-side form (front end validation + success state), a "what you get"
// benefits row, past editions, and social proof. Brand-consistent throughout.
// ---------------------------------------------------------------------------

import { useEffect, useState, type FormEvent } from "react";
import { motion, type Variants } from "framer-motion";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import {
  ArrowRight,
  Check,
  Mail,
  Newspaper,
  Sparkles,
  ShieldCheck,
  Clock,
} from "lucide-react";
import Footer from "@/components/Footer";
import { SiteHeader } from "@/components/SiteHeader";
import { posts, formatDate } from "@/lib/blog";

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

const benefits = [
  {
    Icon: Sparkles,
    title: "Actionable ideas",
    desc: "Practical takes on staffing, IT, and operations you can use the same week.",
  },
  {
    Icon: Clock,
    title: "Once a month",
    desc: "One thoughtful edition, never a flood of email cluttering your inbox.",
  },
  {
    Icon: ShieldCheck,
    title: "No spam, ever",
    desc: "We never share your address, and you can unsubscribe in one click.",
  },
];

// ---------------------------------------------------------------------------
// Subscribe form, front end only. Validates the email and shows a success
// state. Wire the `onSubmit` up to your ESP (Mailchimp, Resend, etc.) later.
// ---------------------------------------------------------------------------
function SubscribeForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "error" | "sending" | "done">("idle");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
    if (!valid) {
      setStatus("error");
      return;
    }
    setStatus("sending");
    try {
      const res = await fetch("/api/newsletter/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      });
      if (!res.ok) {
        setStatus("error");
        return;
      }
      setStatus("done");
    } catch {
      setStatus("error");
    }
  }

  if (status === "done") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex items-center gap-3 rounded-full border border-[#9CCC3C]/40 bg-[#9CCC3C]/15 px-6 py-4 text-sm font-semibold text-[#2f4d10]"
      >
        <span className="grid h-7 w-7 place-items-center rounded-full bg-[#9CCC3C] text-black">
          <Check className="h-4 w-4" />
        </span>
        You&apos;re in! Check your inbox to confirm your subscription.
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md">
      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Mail className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-black/40" />
          <input
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (status === "error") setStatus("idle");
            }}
            placeholder="you@company.com"
            aria-label="Email address"
            className="w-full rounded-full border border-black/15 bg-white py-3.5 pl-11 pr-4 text-sm text-black outline-none transition-colors focus:border-black/40"
          />
        </div>
        <button
          type="submit"
          disabled={status === "sending"}
          className="group inline-flex items-center justify-center gap-2 rounded-full bg-black px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-neutral-800 disabled:opacity-60"
        >
          {status === "sending" ? "Subscribing…" : "Subscribe"}
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </button>
      </div>
      {status === "error" && (
        <p className="mt-3 pl-4 text-sm text-[#ed1164]">Please enter a valid email address.</p>
      )}
      <p className="mt-3 pl-4 text-xs text-black/45">
        Join 2,000+ founders and operators. Unsubscribe anytime.
      </p>
    </form>
  );
}

export default function NewsletterPageClient() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  useEffect(() => {
    const saved = localStorage.getItem("mw-theme");
    if (saved === "dark" || saved === "light") setTheme(saved);
  }, []);
  useEffect(() => {
    localStorage.setItem("mw-theme", theme);
  }, [theme]);

  const editions = posts.slice(0, 4);

  return (
    <main className={`${sans.className} ${display.variable} bg-white text-black`}>
      <SiteHeader theme={theme} />

      <div className={theme === "dark" ? "theme-dark" : undefined}>
        {/* hero + form */}
        <section
          data-header-dark
          className="relative overflow-hidden bg-[#383838] px-6 pb-24 pt-40 text-white sm:px-8"
        >
          <div
            className="pointer-events-none absolute -left-32 -top-24 h-[34rem] w-[34rem] rounded-full blur-[150px]"
            style={{ backgroundColor: "#9CCC3C40" }}
          />
          <div
            className="pointer-events-none absolute -bottom-40 -right-24 h-[34rem] w-[34rem] rounded-full blur-[150px]"
            style={{ backgroundColor: "#ed116430" }}
          />
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative mx-auto max-w-2xl text-center"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white/80">
              <Newspaper className="h-3.5 w-3.5 text-[#9CCC3C]" />
              The MindWhiz Dispatch
            </span>
            <h1
              className="mt-6 text-[clamp(3.6rem,11vw,11rem)] font-extrabold uppercase leading-[0.95] tracking-tight"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Smarter operations, <span className="text-[#9CCC3C]">once a month</span>
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-white/75">
              Join thousands of founders and operators getting our best thinking on
              hybrid staffing, IT, and running lean teams, straight to their inbox.
            </p>
          </motion.div>

          <div className="relative mt-10 flex justify-center">
            {/* form sits on a light card so inputs read clearly over the dark hero */}
            <div className="w-full max-w-md rounded-[1.75rem] bg-white/95 p-6 shadow-2xl shadow-black/30 backdrop-blur">
              <SubscribeForm />
            </div>
          </div>
        </section>

        {/* benefits */}
        <section className="bg-white py-24">
          <div className="mx-auto max-w-7xl px-6 sm:px-8">
            <Reveal>
              <h2
                className="max-w-3xl text-[clamp(2.2rem,4.5vw,3.6rem)] font-extrabold uppercase leading-[0.95] tracking-tight text-black"
                style={{ fontFamily: "var(--font-display)" }}
              >
                What you&apos;ll <span style={{ color: "#ed1164" }}>get</span>
              </h2>
            </Reveal>
            <div className="mt-12 grid gap-6 sm:grid-cols-3">
              {benefits.map((b, i) => (
                <Reveal key={b.title} delay={i * 0.06}>
                  <div className="flex h-full flex-col rounded-[1.75rem] border border-black/10 bg-[#FAF9F5] p-8">
                    <span className="grid h-12 w-12 place-items-center rounded-xl bg-[#9CCC3C]/15 ring-1 ring-[#9CCC3C]/30">
                      <b.Icon className="h-6 w-6 text-[#4E7A22]" />
                    </span>
                    <h3
                      className="mt-6 text-xl font-bold text-black"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {b.title}
                    </h3>
                    <p className="mt-3 text-[15px] leading-relaxed text-black/65">{b.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* past editions */}
        <section className="bg-[#FAF9F5] py-24">
          <div className="mx-auto max-w-7xl px-6 sm:px-8">
            <Reveal>
              <div className="flex flex-wrap items-end justify-between gap-6">
                <h2
                  className="text-[clamp(2.2rem,4.5vw,3.6rem)] font-extrabold uppercase leading-[0.95] tracking-tight text-black"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  Recent <span style={{ color: "#9CCC3C" }}>editions</span>
                </h2>
                <a
                  href="/blog"
                  className="group inline-flex items-center gap-2 text-sm font-semibold text-black"
                >
                  Read the blog
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </a>
              </div>
            </Reveal>

            <div className="mt-12 grid gap-4">
              {editions.map((p, i) => (
                <Reveal key={p.slug} delay={i * 0.05}>
                  <a
                    href={`/blog/${p.slug}`}
                    className="group flex items-center gap-6 rounded-[1.5rem] border border-black/10 bg-white p-5 transition-colors hover:border-black/25"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={p.image}
                      alt={p.title}
                      loading="lazy"
                      className="hidden h-20 w-28 shrink-0 rounded-xl object-cover sm:block"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 text-xs text-black/50">
                        <span className="font-semibold text-[#ed1164]">{p.category}</span>
                        <span>·</span>
                        <span>{formatDate(p.date)}</span>
                      </div>
                      <h3
                        className="mt-1.5 text-lg font-bold leading-snug text-black"
                        style={{ fontFamily: "var(--font-display)" }}
                      >
                        {p.title}
                      </h3>
                    </div>
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-black/15 text-black transition-transform duration-300 group-hover:translate-x-1">
                      <ArrowRight className="h-5 w-5" />
                    </span>
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
