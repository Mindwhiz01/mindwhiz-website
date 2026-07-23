"use client";

// ---------------------------------------------------------------------------
// LocationPage - shared template for the regional pages (US / UK / PK) linked
// from the header's region selector. Hero, local highlights, office info with
// a live clock, services emphasized in that market, and shared testimonials.
// ---------------------------------------------------------------------------

import { useEffect, useState } from "react";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import { Clock, MapPin, ArrowRight } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { PageBanner } from "@/components/PageBanner";
import Footer from "@/components/Footer";
import Cta from "@/components/Cta";
import TrustedByClients from "@/components/TrustedByClients";
import ProcessScroll from "@/components/ProcessScroll";
import { ProcessIntroBanner } from "@/components/ProcessIntroBanner";
import type { LocationContent } from "@/lib/locations";
import { locations } from "@/lib/locations";
import { services as allServices, company } from "@/lib/content";

const sans = Inter({ subsets: ["latin"], display: "swap" });
const display = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-display",
  display: "swap",
});

function Kicker({ children }: { children: React.ReactNode }) {
  return (
    <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[#ed1164]">
      {children}
    </span>
  );
}

function LiveClock({ timezone }: { timezone: string }) {
  const [time, setTime] = useState<string | null>(null);
  useEffect(() => {
    const tick = () => {
      setTime(
        new Intl.DateTimeFormat("en-GB", {
          timeZone: timezone,
          hour: "2-digit",
          minute: "2-digit",
          hourCycle: "h23",
        }).format(new Date())
      );
    };
    tick();
    const id = setInterval(tick, 30_000);
    return () => clearInterval(id);
  }, [timezone]);

  return (
    <span className="tabular-nums">{time ?? "--:--"}</span>
  );
}

export default function LocationPage({ location }: { location: LocationContent }) {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  useEffect(() => {
    const saved = localStorage.getItem("mw-theme");
    if (saved === "dark" || saved === "light") setTheme(saved);
  }, []);

  const localServices = allServices.filter((s) => location.services.includes(s.name));
  const others = locations.filter((l) => l.slug !== location.slug);

  return (
    <main className={`${sans.className} ${display.variable} bg-white text-black`}>
      <SiteHeader theme={theme} />

      <div className={theme === "dark" ? "theme-dark" : undefined}>
        <PageBanner
          image={location.heroImage}
          title={
            <>
              MindWhiz <span className="text-[#9CCC3C]">{location.country}</span>
            </>
          }
          subtitle={location.tagline}
          primary={{ label: "Talk to our team", href: "/contact" }}
          secondary={{ label: "See all services", href: "/#services" }}
        />

        {/* ===================== INTRO + OFFICE CARD ===================== */}
        <section className="relative overflow-hidden bg-white py-24">
          <div className="pointer-events-none absolute -right-32 -top-24 h-96 w-96 rounded-full bg-[#9CCC3C]/25 blur-[140px]" />
          <div className="relative mx-auto grid max-w-6xl gap-12 px-6 sm:px-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <Kicker>{location.city}</Kicker>
              <h2
                className="mt-4 text-[clamp(2.2rem,4.5vw,4rem)] font-extrabold uppercase leading-[0.95] tracking-tight text-black"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Staff augmentation for <span style={{ color: "#ed1164" }}>{location.country}</span>
              </h2>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-black/65">
                {location.intro}
              </p>
              <Cta href="/contact" label="Get in touch" className="mt-8" />
            </div>

            {/* office card */}
            <div className="rounded-3xl border border-slate-200 bg-[#EEEEEE] p-8">
              <div className="flex items-center gap-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={location.flag} alt={`${location.country} flag`} className="h-8 w-11 rounded object-cover ring-1 ring-black/10" />
                <div>
                  <p className="text-lg font-bold text-black" style={{ fontFamily: "var(--font-display)" }}>
                    {location.city}
                  </p>
                  <p className="text-sm text-black/55">{location.country}</p>
                </div>
              </div>

              <div className="mt-6 space-y-4 border-t border-slate-200 pt-6 text-sm">
                {location.address && (
                  <div className="flex items-start gap-3">
                    <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#9CCC3C]" />
                    <span className="text-black/75">{location.address}</span>
                  </div>
                )}
                <div className="flex items-center gap-3">
                  <Clock className="h-4 w-4 shrink-0 text-[#9CCC3C]" />
                  <span className="text-black/75">
                    Local time: <LiveClock timezone={location.timezone} />
                  </span>
                </div>
                <a href={`mailto:${company.email}`} className="flex items-center gap-3 text-black/75 hover:text-black">
                  {company.email}
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ===================== HIGHLIGHTS ===================== */}
        <section className="relative overflow-hidden bg-[#EEEEEE] py-24">
          <div className="relative mx-auto max-w-6xl px-6 sm:px-8">
            <Kicker>Why this hub</Kicker>
            <h2
              className="mt-4 max-w-xl text-[clamp(2rem,4vw,3.25rem)] font-extrabold uppercase leading-[0.95] tracking-tight text-black"
              style={{ fontFamily: "var(--font-display)" }}
            >
              What {location.country} gives our clients
            </h2>
            <div className="mt-12 grid gap-6 sm:grid-cols-3">
              {location.highlights.map((h) => (
                <div key={h.title} className="rounded-2xl border border-slate-200 bg-white p-6">
                  <h3 className="text-lg font-bold text-black" style={{ fontFamily: "var(--font-display)" }}>
                    {h.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-black/60">{h.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===================== HIGHLIGHTS, PINNED FULL-SCREEN ===================== */}
        <ProcessScroll
          steps={location.highlights}
          kicker="Why this hub"
          title={
            <>
              What {location.country} <span style={{ color: "#9CCC3C" }}>gives</span> our clients.
            </>
          }
          ctaLabel="Get in touch"
          ctaHref="/contact"
          images={location.highlights.map((h) => h.image)}
        />

        {/* ===================== LOCAL SERVICES ===================== */}
        <section className="relative overflow-hidden bg-white py-24">
          <div className="relative mx-auto max-w-6xl px-6 sm:px-8">
            <Kicker>Popular here</Kicker>
            <h2
              className="mt-4 max-w-xl text-[clamp(2rem,4vw,3.25rem)] font-extrabold uppercase leading-[0.95] tracking-tight text-black"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Services clients in {location.country} ask for most
            </h2>
            {/* audience-aware hook that pulls B2B readers in */}
            <p className="mt-6 text-xs font-semibold uppercase tracking-[0.18em] text-[#ed1164]">
              For B2B teams in {location.country}
            </p>
            <p className="mt-3 max-w-xl text-lg font-semibold leading-snug text-black/80" style={{ fontFamily: "var(--font-display)" }}>
              Need a proven delivery team without the cost of building one in house?
            </p>
            <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {localServices.map((s) => (
                <a
                  key={s.name}
                  href="/#services"
                  className="group rounded-2xl border border-slate-200 bg-white p-6 transition-colors hover:border-[#ed1164]/40"
                >
                  <h3 className="text-base font-bold text-black" style={{ fontFamily: "var(--font-display)" }}>
                    {s.name}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-black/55">{s.desc}</p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-[#ed1164] opacity-0 transition-opacity group-hover:opacity-100">
                    Explore <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </a>
              ))}
            </div>
          </div>
        </section>

        <TrustedByClients />

        {/* ===================== OTHER LOCATIONS ===================== */}
        <section className="relative overflow-hidden bg-[#EEEEEE] py-24">
          <div className="relative mx-auto max-w-6xl px-6 sm:px-8">
            <Kicker>Global delivery</Kicker>
            <h2
              className="mt-4 max-w-xl text-[clamp(2rem,4vw,3.25rem)] font-extrabold uppercase leading-[0.95] tracking-tight text-black"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Also delivering from
            </h2>
            <div className="mt-10 grid gap-5 sm:grid-cols-2">
              {others.map((l) => (
                <a
                  key={l.slug}
                  href={`/locations/${l.slug}`}
                  className="group flex items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white p-6 transition-colors hover:border-[#ed1164]/40"
                >
                  <div className="flex items-center gap-4">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={l.flag} alt={`${l.country} flag`} className="h-8 w-11 rounded object-cover ring-1 ring-black/10" />
                    <div>
                      <p className="font-bold text-black" style={{ fontFamily: "var(--font-display)" }}>{l.country}</p>
                      <p className="text-sm text-black/55">{l.city}</p>
                    </div>
                  </div>
                  <ArrowRight className="h-4 w-4 shrink-0 text-black/40 transition-colors group-hover:text-[#ed1164]" />
                </a>
              ))}
            </div>
          </div>
        </section>

        <ProcessIntroBanner
          title={`Work with MindWhiz ${location.country}`}
          description={location.tagline}
          ctaLabel="Get in touch"
          ctaHref="/contact"
        />

        <Footer />
      </div>
    </main>
  );
}
