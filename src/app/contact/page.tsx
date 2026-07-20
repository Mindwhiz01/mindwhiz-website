"use client";

import { useEffect, useState } from "react";
import { motion, type Variants } from "framer-motion";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import { Mail, MapPin, Phone, Target, Search, ClipboardList, LineChart, type LucideIcon } from "lucide-react";
import { company } from "@/lib/content";
import Footer from "@/components/Footer";
import { SiteHeader } from "@/components/SiteHeader";
import { PageBanner } from "@/components/PageBanner";
import { ContactForm } from "@/components/ContactFormSection";

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

const channels: { title: string; desc: string; Icon: LucideIcon }[] = [
  {
    title: "Performance Media",
    desc: "Paid search, paid social, retargeting, and conversion campaigns managed against clean acquisition goals.",
    Icon: Target,
  },
  {
    title: "SEO & Content",
    desc: "Technical SEO, topical content systems, landing pages, and reporting that lift organic visibility over time.",
    Icon: Search,
  },
  {
    title: "CRM & Lifecycle",
    desc: "Email, lead nurturing, automation, and segmentation that move prospects from first touch to close.",
    Icon: Mail,
  },
  {
    title: "Analytics & CRO",
    desc: "Tracking plans, dashboards, funnel analysis, and test cycles that turn spend into measurable learning.",
    Icon: LineChart,
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

              <ContactForm />
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
