"use client";

import { Plus_Jakarta_Sans, Inter } from "next/font/google";

const sans = Inter({ subsets: ["latin"], display: "swap" });
const display = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-display",
  display: "swap",
});

const GREEN = "#9CCC3C";
const INK = "#383838";

const LOGOS = [
  { name: "Alpha Bravo Construction", src: "/clients/alpha-bravo.png" },
  { name: "Highland Redstone", src: "/clients/highland.png" },
  { name: "Inovatiqa", src: "/clients/inovatiqa.png" },
  { name: "Jerdoni", src: "/clients/jerdoni.png" },
  { name: "Texas Diagnostic Labs", src: "/clients/texas.png" },
  { name: "Villa Tech", src: "/clients/villa-tech.png" },
];

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <span className="text-xs font-semibold uppercase tracking-[0.18em]" style={{ color: GREEN }}>
      {children}
    </span>
  );
}

function LogoImg({ src, name, className = "" }: { src: string; name: string; className?: string }) {
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={src} alt={name} className={`w-auto object-contain ${className}`} />;
}

// ── Variant A · two-row marquee (current style) ─────────────────────────────
function VariantMarquee() {
  const row2 = [...LOGOS].reverse();
  return (
    <section className="mx-auto max-w-7xl overflow-hidden px-6 py-16 sm:px-8">
      <Eyebrow>Trusted by</Eyebrow>
      <h2
        className="mt-3 text-3xl font-bold sm:text-4xl lg:text-5xl"
        style={{ fontFamily: "var(--font-display)", color: INK }}
      >
        Teams worldwide grow
        <br />
        with <span style={{ color: GREEN }}>MindWhiz</span>
      </h2>

      <div className="mt-10 flex flex-col gap-4">
        {[
          { items: LOGOS, dir: "animate-marquee-left" },
          { items: row2, dir: "animate-marquee-right" },
        ].map((r, ri) => {
          const row = [...r.items, ...r.items];
          return (
            <div key={ri} className="marquee marquee-mask relative overflow-hidden">
              <div className={`marquee-track gap-4 py-1 ${r.dir}`}>
                {row.map((c, i) => (
                  <span
                    key={`${c.name}-${i}`}
                    className="flex h-20 w-[170px] items-center justify-center overflow-hidden rounded-xl bg-white px-3 shadow-sm ring-1 ring-black/5"
                  >
                    <LogoImg src={c.src} name={c.name} className="h-full scale-[1.55]" />
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

// ── Variant B · centered single marquee on a dark band ──────────────────────
function VariantDarkStrip() {
  const row = [...LOGOS, ...LOGOS, ...LOGOS];
  return (
    <section className="relative overflow-hidden py-20" style={{ background: INK }}>
      <div className="pointer-events-none absolute -left-24 top-0 h-72 w-72 rounded-full blur-[120px]" style={{ background: `${GREEN}33` }} />
      <div className="relative mx-auto max-w-7xl px-6 text-center sm:px-8">
        <Eyebrow>Our clients</Eyebrow>
        <h2 className="mt-3 text-2xl font-bold text-white sm:text-3xl" style={{ fontFamily: "var(--font-display)" }}>
          Powering 500+ teams across the globe
        </h2>
      </div>
      <div className="marquee marquee-mask relative mt-12 overflow-hidden">
        <div className="marquee-track gap-6 animate-marquee-left">
          {row.map((c, i) => (
            <span
              key={`${c.name}-${i}`}
              className="flex h-24 w-[200px] items-center justify-center overflow-hidden rounded-2xl bg-white px-4 shadow-lg ring-1 ring-white/10"
            >
              <LogoImg src={c.src} name={c.name} className="h-full scale-[1.5]" />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Variant C · static responsive grid with hover lift ──────────────────────
function VariantGrid() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-20 text-center sm:px-8">
      <Eyebrow>Trusted by</Eyebrow>
      <h2
        className="mx-auto mt-3 max-w-2xl text-3xl font-bold sm:text-4xl"
        style={{ fontFamily: "var(--font-display)", color: INK }}
      >
        The teams that build with us
      </h2>
      <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
        {LOGOS.map((c) => (
          <div
            key={c.name}
            className="group flex h-28 items-center justify-center overflow-hidden rounded-2xl border border-slate-200 bg-white px-4 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
          >
            <LogoImg
              src={c.src}
              name={c.name}
              className="h-full scale-[1.5] opacity-80 grayscale transition-all duration-300 group-hover:opacity-100 group-hover:grayscale-0"
            />
          </div>
        ))}
      </div>
    </section>
  );
}

// ── Variant D · plain logo strip (no cards), grayscale → color ──────────────
function VariantPlainStrip() {
  const row = [...LOGOS, ...LOGOS, ...LOGOS];
  return (
    <section className="mx-auto max-w-7xl overflow-hidden px-6 py-16 text-center sm:px-8">
      <Eyebrow>Trusted by</Eyebrow>
      <div className="marquee marquee-mask relative mt-8 overflow-hidden">
        <div className="marquee-track items-center gap-14 animate-marquee-left">
          {row.map((c, i) => (
            <LogoImg
              key={`${c.name}-${i}`}
              src={c.src}
              name={c.name}
              className="h-16 shrink-0 opacity-70 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0"
            />
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Variant E · bordered divider grid ───────────────────────────────────────
function VariantDividerGrid() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-20 sm:px-8">
      <div className="text-center">
        <Eyebrow>Our clients</Eyebrow>
        <h2
          className="mt-3 text-3xl font-bold sm:text-4xl"
          style={{ fontFamily: "var(--font-display)", color: INK }}
        >
          Built with industry leaders
        </h2>
      </div>
      <div className="mt-12 grid grid-cols-2 divide-x divide-y divide-slate-200 overflow-hidden rounded-2xl border border-slate-200 sm:grid-cols-3">
        {LOGOS.map((c) => (
          <div key={c.name} className="flex h-32 items-center justify-center overflow-hidden p-6">
            <LogoImg src={c.src} name={c.name} className="h-full scale-[1.5]" />
          </div>
        ))}
      </div>
    </section>
  );
}

// ── Variant F · split: heading left, twin marquee right ─────────────────────
function VariantSplit() {
  const row2 = [...LOGOS].reverse();
  return (
    <section className="mx-auto max-w-7xl px-6 py-20 sm:px-8">
      <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
        <div>
          <Eyebrow>Trusted by</Eyebrow>
          <h2
            className="mt-3 text-4xl font-extrabold sm:text-5xl lg:text-6xl"
            style={{ fontFamily: "var(--font-display)", color: INK }}
          >
            Teams that scale with <span style={{ color: GREEN }}>MindWhiz</span>
          </h2>
          <p className="mt-4 max-w-md text-black">
            From construction to healthcare, our clients rely on us to deliver vetted talent and
            24/7 operations.
          </p>
        </div>
        <div className="flex flex-col gap-3 overflow-hidden">
          {[
            { items: LOGOS, dir: "animate-marquee-left" },
            { items: row2, dir: "animate-marquee-right" },
          ].map((r, ri) => {
            const row = [...r.items, ...r.items];
            return (
              <div key={ri} className="marquee marquee-mask relative overflow-hidden">
                <div className={`marquee-track gap-3 py-1 ${r.dir}`}>
                  {row.map((c, i) => (
                    <span
                      key={`${c.name}-${i}`}
                      className="flex h-16 w-[150px] items-center justify-center overflow-hidden rounded-xl bg-white px-3 shadow-sm ring-1 ring-black/5"
                    >
                      <LogoImg src={c.src} name={c.name} className="h-full scale-[1.55]" />
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default function ClientsSampleShowcase() {
  return (
    <main className={`${sans.className} ${display.variable} min-h-screen bg-white text-black`}>
      <div className="mx-auto max-w-7xl px-6 pt-10 sm:px-8">
        <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Sample showcase</p>
        <h1 className="mt-2 text-2xl font-bold" style={{ fontFamily: "var(--font-display)", color: INK }}>
          Client section — design variants
        </h1>
      </div>

      <Label n="A" title="Two-row opposite marquee" />
      <VariantMarquee />

      <Label n="B" title="Dark band, single marquee" />
      <VariantDarkStrip />

      <Label n="C" title="Static grid (grayscale → color on hover)" />
      <VariantGrid />

      <Label n="D" title="Plain logo strip (no cards)" />
      <VariantPlainStrip />

      <Label n="E" title="Bordered divider grid" />
      <VariantDividerGrid />

      <Label n="F" title="Split — heading left, twin marquee right" />
      <VariantSplit />

      <div className="h-16" />
    </main>
  );
}

function Label({ n, title }: { n: string; title: string }) {
  return (
    <div className="mx-auto mt-8 flex max-w-7xl items-center gap-3 px-6 sm:px-8">
      <span
        className="grid h-7 w-7 place-items-center rounded-full text-sm font-bold text-white"
        style={{ background: GREEN }}
      >
        {n}
      </span>
      <span className="text-sm font-semibold text-black">{title}</span>
      <span className="h-px flex-1 bg-slate-200" />
    </div>
  );
}
