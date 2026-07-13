"use client";

import {
  User,
  SignalHigh,
  Wifi,
  BatteryFull,
  ChevronRight,
  Zap,
  ShoppingBag,
} from "lucide-react";

/* SVG grain texture as a data-URI background overlay */
const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

export default function GrowSection() {
  return (
    <section className="bg-[#EEEEEE] px-4 pt-10 sm:px-6 lg:px-8">
      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2.5rem] bg-[#5E5E5E]">
        {/* textured + lit background */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.40] mix-blend-soft-light"
          style={{ backgroundImage: GRAIN, backgroundSize: "220px 220px" }}
        />
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.20] mix-blend-overlay"
          style={{ backgroundImage: GRAIN, backgroundSize: "120px 120px" }}
        />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(130%_130%_at_15%_0%,rgba(255,255,255,0.22),transparent_55%)]" />

        <div className="relative grid items-end gap-8 px-8 pt-14 sm:px-12 lg:grid-cols-2 lg:px-16 lg:pt-20">
          {/* ---- left copy ---- */}
          <div className="pb-14 lg:pb-24">
            <h2
              className="max-w-md text-4xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-5xl"
              style={{ fontFamily: "var(--font-display)" }}
            >
              The easiest way to grow your restaurant online.
            </h2>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#contact"
                className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-black shadow-sm transition-transform hover:-translate-y-0.5"
              >
                Get a free demo
              </a>
              <a
                href="#how"
                className="rounded-full bg-white/20 px-6 py-3 text-sm font-semibold text-white backdrop-blur transition-colors hover:bg-white/30"
              >
                See how it works
              </a>
            </div>
          </div>

          {/* ---- right phone ---- */}
          <div className="relative flex justify-center lg:justify-end">
            <PhoneMockup />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Phone mockup                                                       */
/* ------------------------------------------------------------------ */

function PhoneMockup() {
  return (
    <div className="relative -mb-2 w-[300px] translate-y-6 sm:w-[330px] lg:translate-y-10">
      {/* device frame */}
      <div className="relative rounded-t-[3rem] border-[10px] border-b-0 border-black bg-black pt-3 shadow-2xl">
        {/* dynamic island */}
        <div className="absolute left-1/2 top-3 z-20 h-7 w-24 -translate-x-1/2 rounded-full bg-black" />

        {/* screen */}
        <div className="relative overflow-hidden rounded-t-[2.2rem] bg-white">
          {/* status bar */}
          <div className="flex items-center justify-between px-6 pb-1 pt-2.5 text-[11px] font-semibold text-black">
            <span>11:39</span>
            <div className="flex items-center gap-1">
              <SignalHigh className="h-3.5 w-3.5" />
              <Wifi className="h-3.5 w-3.5" />
              <BatteryFull className="h-4 w-4" />
            </div>
          </div>

          {/* hero food image */}
          <div className="relative h-44">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=900&q=80"
              alt="Restaurant dish"
              className="h-full w-full object-cover"
            />
            <div className="absolute left-4 top-4 grid h-9 w-9 place-items-center rounded-full bg-white/90 shadow">
              <User className="h-4 w-4 text-[#5E5E5E]" />
            </div>
          </div>

          {/* content */}
          <div className="px-5 pb-6 pt-4">
            <div className="text-center">
              <h3 className="text-lg font-bold text-black">Hawking Bird</h3>
              <p className="mt-0.5 text-[11px] text-black">
                4901 Telegraph Ave, Oakland, CA
              </p>
              <p className="mt-1 text-[11px] font-semibold text-[#5E5E5E]">
                ● Open till 9 PM
              </p>
            </div>

            {/* pickup / delivery toggle */}
            <div className="mt-4 flex rounded-full border border-slate-200 p-1">
              <button className="flex-1 rounded-full bg-slate-100 py-2 text-xs font-semibold text-black shadow-sm">
                Pickup
              </button>
              <button className="flex-1 rounded-full py-2 text-xs font-medium text-black">
                Delivery
              </button>
            </div>

            {/* info pills */}
            <div className="mt-3 grid grid-cols-2 gap-2.5">
              <Pill icon={<ShoppingBag className="h-3.5 w-3.5" />} label="Hawking Bird" />
              <Pill
                icon={<Zap className="h-3.5 w-3.5 text-[#5E5E5E]" />}
                label="ASAP (15 min)"
              />
            </div>

            {/* earn rewards */}
            <div className="mt-5 flex items-center justify-between">
              <span className="text-sm font-bold text-black">Earn rewards</span>
              <span className="inline-flex items-center gap-1 text-xs font-medium text-black">
                Explore <ChevronRight className="h-3.5 w-3.5" />
              </span>
            </div>

            {/* rewards slider */}
            <div className="mt-3 flex items-center gap-3">
              <div className="flex -space-x-2">
                {[
                  "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=120&q=60",
                  "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=120&q=60",
                ].map((src) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    key={src}
                    src={src}
                    alt=""
                    className="h-9 w-9 rounded-full border-2 border-white object-cover"
                  />
                ))}
              </div>
              <div className="relative flex-1">
                <div className="h-1 rounded-full bg-slate-200">
                  <div className="h-1 w-1/3 rounded-full bg-[#B8B2A7]" />
                </div>
                <div className="absolute left-1/3 top-1/2 h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#B8B2A7] ring-2 ring-white" />
                <div className="mt-2 flex justify-between text-[10px] font-medium text-slate-400">
                  <span>100</span>
                  <span>500</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Pill({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="flex items-center justify-between rounded-full border border-slate-200 px-3 py-2 text-[11px] font-medium text-black">
      <span className="flex items-center gap-1.5">
        {icon}
        {label}
      </span>
      <ChevronRight className="h-3.5 w-3.5 text-slate-400" />
    </div>
  );
}
