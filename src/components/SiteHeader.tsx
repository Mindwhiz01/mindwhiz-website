"use client";

// ---------------------------------------------------------------------------
// Shared site chrome - the floating glass header (with mega menu + region
// picker). Extracted so every page renders an identical, in-sync navigation.
// ---------------------------------------------------------------------------

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
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
  Globe2,
  BadgeCheck,
  Zap,
  Lock,
  Menu,
  X,
  ArrowRight,
  ArrowUpRight,
  ChevronDown,
  type LucideIcon,
} from "lucide-react";
import { nav, services, caseStudies } from "@/lib/content";

const iconMap: Record<string, LucideIcon> = {
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
  Globe2,
  BadgeCheck,
  Zap,
  Lock,
};

const regions = [
  { code: "US", label: "United States", flag: "https://flagcdn.com/w40/us.png", href: "/locations/us" },
  { code: "UK", label: "United Kingdom", flag: "https://flagcdn.com/w40/gb.png", href: "/locations/uk" },
  { code: "PK", label: "Pakistan", flag: "https://flagcdn.com/w40/pk.png", href: "/locations/pk" },
];

function FlagIcon({ src, label }: { src: string; label: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={`${label} flag`}
      className="h-3.5 w-5 shrink-0 rounded-[3px] object-cover ring-1 ring-black/10"
    />
  );
}

// Mega-menu groupings - services & industries organised into labelled columns.
const serviceMenu = [
  { heading: "IT & Security", items: [services[0], services[1], services[2], services[5]] },
  { heading: "Cloud & DevOps", items: [services[3], services[4], services[6], services[12]] },
  { heading: "Business Operations", items: [services[7], services[8], services[9], services[10]] },
  {
    heading: "Talent & Digital",
    items: [services[11], { name: "Web Services", icon: "MonitorSmartphone" }],
  },
];

const industryMenu = [
  {
    heading: "Technology & Digital",
    items: [
      { name: "Information Technology", icon: "Laptop" },
      { name: "E-commerce & Retail", icon: "Megaphone" },
      { name: "Startups & SMBs", icon: "Zap" },
    ],
  },
  {
    heading: "Built & Physical",
    items: [
      { name: "Construction & Engineering", icon: "Ruler" },
      { name: "Real Estate", icon: "Globe2" },
      { name: "Industrial Manufacturing", icon: "Activity" },
    ],
  },
  {
    heading: "Finance & Services",
    items: [
      { name: "Accounting & Finance", icon: "Calculator" },
      { name: "Professional Services", icon: "Users" },
      { name: "Logistics & Supply Chain", icon: "GitBranch" },
    ],
  },
  {
    heading: "Healthcare",
    items: [{ name: "Healthcare & HealthTech", icon: "ShieldCheck" }],
  },
];

const serviceRoutes: Record<string, string> = {
  "IT Helpdesk 24/7": "/services/it-helpdesk-24-7",
  "NOC Monitoring": "/services/noc-monitoring",
  "Cybersecurity Monitoring": "/services/cybersecurity-monitoring",
  "Endpoint Security": "/services/endpoint-security",
  "Cloud Infrastructure": "/services/cloud-infrastructure",
  "DevOps & Automation": "/services/devops-automation",
  "Server & Network Administration": "/services/server-network-administration",
  "Remote Desktop & Assets": "/services/remote-desktop-assets",
  "Staff Augmentation": "/services/staff-augmentation",
  "Digital Marketing": "/service",
  "Construction Estimation": "/construction-estimation",
  "Finance & Accounting": "/finance",
  "HR Services": "/hr",
  "Web Services": "/web-services",
  // industries
  "Information Technology": "/industries/information-technology",
  "E-commerce & Retail": "/industries/ecommerce-retail",
  "Startups & SMBs": "/industries/startups-smbs",
  "Construction & Engineering": "/industries/construction-engineering",
  "Real Estate": "/industries/real-estate",
  "Industrial Manufacturing": "/industries/industrial-manufacturing",
  "Accounting & Finance": "/industries/accounting-finance",
  "Professional Services": "/industries/professional-services",
  "Logistics & Supply Chain": "/industries/logistics-supply-chain",
  "Healthcare & HealthTech": "/industries/healthcare-healthtech",
};

function serviceHref(name: string) {
  return serviceRoutes[name] ?? "/#services";
}

// Mega-menu panel: labelled icon columns + a featured case-study rail.
function MegaPanel({
  groups,
}: {
  groups: { heading: string; items: { name: string; icon: string }[] }[];
}) {
  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_300px]">
      <div className="grid grid-cols-2 gap-x-8 gap-y-7">
        {groups.map((g) => (
          <div key={g.heading}>
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
              {g.heading}
            </p>
            <ul className="space-y-0.5">
              {g.items.map((it) => {
                const Icon = iconMap[it.icon] ?? Activity;
                return (
                  <li key={it.name}>
                    <a
                      href={serviceHref(it.name)}
                      className="flex items-center gap-3 rounded-lg px-2 py-1.5 transition-colors hover:bg-black/5"
                    >
                      <span className="grid h-8 w-8 shrink-0 place-items-center rounded-md bg-black/5 ring-1 ring-black/10">
                        <Icon className="h-4 w-4 text-[#9CCC3C]" />
                      </span>
                      <span className="text-sm text-black">{it.name}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>

      {/* featured rail - IT Staffing (Villa Tech) then Construction (Alpha Bravo) */}
      <div className="hidden flex-col gap-4 xl:flex">
        {[caseStudies[1], caseStudies[0]].map((cs) => (
          <a
            key={cs.client}
            href="/case-studies"
            className="group/card relative block h-36 overflow-hidden rounded-xl ring-1 ring-white/10"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={cs.img}
              alt={cs.client}
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover/card:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-4">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-[#9CCC3C]">
                {cs.category}
              </span>
              <p className="mt-1 text-sm font-semibold leading-snug text-white">
                How {cs.client} scaled with MindWhiz
              </p>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}

export function SiteHeader({ theme }: { theme: string }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  // reveals the wordmark when the cursor is anywhere over the left region
  // of the header bar, not only directly on the logo mark
  const [brandOpen, setBrandOpen] = useState(false);

  // Keep the active tab in sync with the actual page being viewed. Detail
  // routes (e.g. "/services/it-helpdesk-24-7", "/industries/real-estate",
  // "/why-mindwhiz") don't have their own nav item, so map them onto the
  // parent tab. On the home page nothing is highlighted until a hash tab is
  // clicked. This runs on every navigation so landing on a page always
  // highlights the right tab instead of whatever was clicked before.
  useEffect(() => {
    if (pathname === "/") {
      setActive(null);
      return;
    }
    if (pathname.startsWith("/services") || ["/hr", "/finance", "/service", "/construction-estimation"].includes(pathname)) {
      setActive("Services");
      return;
    }
    if (pathname.startsWith("/industries")) {
      setActive("Industries");
      return;
    }
    if (pathname === "/about" || pathname === "/why-mindwhiz") {
      setActive("About Us");
      return;
    }
    if (pathname.startsWith("/web-services")) {
      setActive("Web Services");
      return;
    }
    const match = nav.find((n) => !n.href.startsWith("/#") && n.href === pathname);
    setActive(match ? match.label : null);
  }, [pathname]);

  const [regionOpen, setRegionOpen] = useState(false);
  const [region, setRegion] = useState("US");
  const [mega, setMega] = useState<string | null>(null);
  const [mobileMenu, setMobileMenu] = useState<string | null>(null);
  const [onLight, setOnLight] = useState(false);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  // Sync region flag with current pathname
  useEffect(() => {
    if (pathname.includes("/locations/uk")) setRegion("UK");
    else if (pathname.includes("/locations/pk")) setRegion("PK");
    else setRegion("US");
  }, [pathname]);

  // The region dropdown is portaled to <body> so it isn't clipped by the
  // header pill's overflow-hidden (needed for the crystal sheen animation).
  const regionBtnRef = useRef<HTMLButtonElement>(null);
  const [regionPos, setRegionPos] = useState({ top: 0, right: 0 });
  useEffect(() => {
    if (!regionOpen) return;
    const update = () => {
      const el = regionBtnRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      setRegionPos({ top: r.bottom + 8, right: window.innerWidth - r.right });
    };
    update();
    window.addEventListener("resize", update);
    window.addEventListener("scroll", update, true);
    return () => {
      window.removeEventListener("resize", update);
      window.removeEventListener("scroll", update, true);
    };
  }, [regionOpen]);

  // hover-intent: keep the mega menu open while moving between the trigger
  // and the panel, but reliably close it shortly after the mouse leaves both.
  const megaTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const openMega = (label: string | null) => {
    if (megaTimer.current) clearTimeout(megaTimer.current);
    setMega(label);
  };
  const scheduleCloseMega = () => {
    if (megaTimer.current) clearTimeout(megaTimer.current);
    megaTimer.current = setTimeout(() => setMega(null), 140);
  };
  useEffect(() => () => {
    if (megaTimer.current) clearTimeout(megaTimer.current);
  }, []);
  useEffect(() => {
    const probeY = 56; // vertical center of the floating bar
    const onScroll = () => {
      if (theme === "dark") {
        setOnLight(false); // page sections are dark in dark mode
        return;
      }
      const darks = document.querySelectorAll<HTMLElement>("[data-header-dark]");
      let overDark = false;
      darks.forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.top <= probeY && r.bottom >= probeY) overDark = true;
      });
      setOnLight(!overDark);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [theme]);
  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 py-4" onMouseLeave={scheduleCloseMega}>
      {/* blurs the rest of the page while a mega menu is open */}
      <AnimatePresence>
        {mega && (
          <motion.div
            key="mega-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            aria-hidden
            className="pointer-events-none fixed inset-0 hidden bg-black/10 backdrop-blur-md xl:block"
          />
        )}
      </AnimatePresence>
      <motion.div
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="relative mx-auto flex w-full max-w-7xl items-center justify-between gap-4 overflow-hidden rounded-full border border-white/15 bg-black/20 px-3 py-3 shadow-xl shadow-black/20 backdrop-blur-2xl backdrop-saturate-150"
      >
        {/* crystal sheen + top highlight */}
        <span className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent" />
        <motion.span
          aria-hidden
          initial={{ x: "-130%" }}
          animate={{ x: "130%" }}
          transition={{ duration: 2.6, repeat: Infinity, repeatDelay: 3.5, ease: "easeInOut" }}
          className="pointer-events-none absolute inset-y-0 left-0 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/15 to-transparent"
        />
        {/* left-side hover zone: reveals the wordmark whenever the cursor is
            over the left region of the header, not only on the logo itself.
            Sits behind the logo (z-0) so the mark stays clickable, and stops
            short of the centered nav so tab hovers still work. */}
        <div
          className="absolute inset-y-0 left-0 z-0 w-1/3"
          onMouseEnter={() => setBrandOpen(true)}
          onMouseLeave={() => setBrandOpen(false)}
        />

        {/* Brand, dark pill stretches on hover to reveal the wordmark inside it */}
        <a
          href="/"
          onMouseEnter={() => setBrandOpen(true)}
          onMouseLeave={() => setBrandOpen(false)}
          className="relative z-10 flex cursor-pointer items-center pl-1"
        >
          <div className="flex items-center overflow-hidden rounded-full bg-neutral-900 ring-1 ring-white/10 transition-all duration-700 ease-out">
            <span className="grid h-11 w-11 shrink-0 place-items-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/mindwhiz-mark.png" alt="MindWhiz" className="h-7 w-7" />
            </span>
            <span
              className={`overflow-hidden whitespace-nowrap text-xl font-extrabold tracking-tight transition-all duration-700 ease-out ${
                brandOpen ? "max-w-[200px] pr-5 opacity-100" : "max-w-0 pr-0 opacity-0"
              }`}
              style={{ fontFamily: "var(--font-display)" }}
            >
              <span className="text-white">Mind</span>
              <span style={{ color: "#9CCC3C" }}>Whiz</span>
            </span>
          </div>
        </a>

        {/* Center nav - absolutely centered so the logo hover doesn't shift it */}
        {/* xl, not lg: at 1024-1279px this centered nav collides with the
            region selector + CTA on the right, so those widths keep the
            hamburger menu instead */}
        <nav className="z-10 hidden items-center gap-0.5 rounded-full bg-neutral-900/60 p-1 xl:absolute xl:left-1/2 xl:top-1/2 xl:flex xl:-translate-x-1/2 xl:-translate-y-1/2">
          {nav.map((n, i) => {
            const isActive = active === n.label;
            const hasMega =
              n.label === "Services" || n.label === "Industries" || n.label === "About Us";
            return (
              <motion.a
                key={n.label}
                href={n.href}
                onClick={(e) => {
                  // tabs with a mega dropdown shouldn't navigate on click -
                  // just open their menu so the tab stays put
                  if (hasMega) {
                    e.preventDefault();
                    openMega(mega === n.label ? null : n.label);
                  }
                  setActive(n.label);
                }}
                onMouseEnter={() => openMega(hasMega ? n.label : null)}
                initial={{ opacity: 0, scale: 0.75 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", stiffness: 320, damping: 22, delay: 0.18 + 0.05 * i }}
                style={{ transformOrigin: "bottom center" }}
                className={`crystal-tab relative whitespace-nowrap rounded-full px-3 py-2 text-sm font-semibold transition-colors ${
                  isActive ? "text-black" : "text-neutral-300 hover:text-white"
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="nav-pill"
                    transition={{ type: "spring", stiffness: 400, damping: 32 }}
                    className="absolute inset-0 rounded-full bg-white"
                  />
                )}
                <span className="relative inline-flex items-center gap-1">
                  <span className="crystal-label">{n.label}</span>
                  {hasMega && (
                    <ChevronDown
                      className={`h-3.5 w-3.5 opacity-70 transition-transform duration-300 ${
                        mega === n.label ? "rotate-180" : ""
                      }`}
                    />
                  )}
                </span>
              </motion.a>
            );
          })}
        </nav>

        {/* Actions */}
        <div className="relative z-10 flex items-center gap-2">
          {/* region selector, dropdown, portaled so it isn't clipped by the pill */}
          <div className="relative hidden sm:block">
            <button
              ref={regionBtnRef}
              onClick={() => setRegionOpen((v) => !v)}
              className={`flex items-center gap-1.5 rounded-full border px-3 py-2.5 text-sm font-medium transition-colors ${
                onLight
                  ? "border-black/20 text-black hover:border-black/40"
                  : "border-white/15 text-neutral-200 hover:border-white/30 hover:text-white"
              }`}
            >
              <FlagIcon
                src={regions.find((r) => r.code === region)?.flag ?? regions[0].flag}
                label={regions.find((r) => r.code === region)?.label ?? regions[0].label}
              />
              {region}
              <ChevronDown
                className={`h-3.5 w-3.5 opacity-70 transition-transform duration-300 ${
                  regionOpen ? "rotate-180" : ""
                }`}
              />
            </button>
          </div>
          {mounted &&
            createPortal(
              <AnimatePresence>
                {regionOpen && (
                  <>
                    {/* click-away catcher */}
                    <div
                      className="fixed inset-0 z-[70]"
                      onClick={() => setRegionOpen(false)}
                    />
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9, y: -6 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95, y: -6 }}
                      transition={{ type: "spring", stiffness: 320, damping: 28 }}
                      style={{ transformOrigin: "top right", top: regionPos.top, right: regionPos.right }}
                      className="fixed z-[71] w-48 overflow-hidden rounded-[14px] border border-white/15 bg-black/30 p-1.5 shadow-2xl shadow-black/40 backdrop-blur-2xl backdrop-saturate-150"
                    >
                      {regions.map((r) => (
                        <a
                          key={r.code}
                          href={r.href}
                          onClick={() => {
                            setRegion(r.code);
                            setRegionOpen(false);
                          }}
                          className={`flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm transition-colors hover:bg-white/10 ${
                            region === r.code ? "text-white" : "text-white/80"
                          }`}
                        >
                          <FlagIcon src={r.flag} label={r.label} />
                          {r.label}
                        </a>
                      ))}
                    </motion.div>
                  </>
                )}
              </AnimatePresence>,
              document.body
            )}
          <a
            href="/contact"
            className="group hidden items-center gap-2 rounded-full border border-white/20 bg-neutral-950 px-4 py-2.5 text-sm font-semibold text-white transition-colors duration-300 hover:bg-neutral-800 sm:flex"
          >
            <span className="relative h-4 w-4 overflow-hidden">
              <ArrowUpRight className="absolute inset-0 h-4 w-4 text-[#9CCC3C] transition-transform duration-300 ease-out group-hover:translate-x-5 group-hover:-translate-y-5" />
              <ArrowUpRight className="absolute inset-0 h-4 w-4 -translate-x-5 translate-y-5 text-[#9CCC3C] transition-transform duration-300 ease-out group-hover:translate-x-0 group-hover:translate-y-0" />
            </span>
            Get in Touch
          </a>
          <button
            onClick={() => setOpen((v) => !v)}
            className="grid h-10 w-10 place-items-center rounded-full text-white xl:hidden"
            aria-label="Toggle menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </motion.div>

      {/* services / industries / about mega menu (desktop) */}
      <AnimatePresence>
        {mega && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.99 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.99 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            onMouseEnter={() => openMega(mega)}
            onMouseLeave={scheduleCloseMega}
            className={`relative z-10 mx-auto mt-3 hidden rounded-2xl border border-black/10 bg-white shadow-2xl shadow-black/20 xl:block ${
              mega === "About Us" ? "w-64 p-2" : "w-full max-w-6xl p-6"
            }`}
          >
            {mega === "About Us" ? (
              <ul>
                {[
                  { label: "About Us", href: "/about" },
                  { label: "Why MindWhiz", href: "/why-mindwhiz" },
                ].map((it) => (
                  <li key={it.label}>
                    <a
                      href={it.href}
                      className="block rounded-lg px-4 py-2.5 text-sm font-semibold text-black transition-colors hover:bg-black/5"
                    >
                      {it.label}
                    </a>
                  </li>
                ))}
              </ul>
            ) : (
              <MegaPanel groups={mega === "Services" ? serviceMenu : industryMenu} />
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* mobile menu - liquid-glass panel with WhatsApp spring pop-in */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: -6 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -6 }}
            transition={{ type: "spring", stiffness: 320, damping: 28 }}
            style={{ transformOrigin: "top center" }}
            className="mx-auto mt-2 max-h-[calc(100dvh-6.5rem)] max-w-6xl overflow-y-auto overflow-x-hidden overscroll-contain rounded-[14px] border border-black/10 bg-white p-2 shadow-2xl shadow-black/20 xl:hidden"
          >
            {[
              ...nav.slice(0, 4),
              { label: "Why MindWhiz", href: "/why-mindwhiz" },
              ...nav.slice(4),
            ].map((n, i) => {
              const hasMega =
                n.label === "Services" || n.label === "Industries" || n.label === "About Us";
              const isExpanded = mobileMenu === n.label;

              return (
                <div key={n.label}>
                  <motion.button
                    onClick={() => {
                      if (hasMega) {
                        setMobileMenu(isExpanded ? null : n.label);
                      } else {
                        setActive(n.label);
                        setOpen(false);
                      }
                    }}
                    initial={{ opacity: 0, scale: 0.75 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ type: "spring", stiffness: 320, damping: 22, delay: 0.04 * i }}
                    style={{ transformOrigin: "bottom left" }}
                    className="flex w-full items-center justify-between rounded-xl px-4 py-3 text-base font-semibold text-black transition-colors hover:bg-black/5"
                  >
                    <span>{n.label}</span>
                    {hasMega && (
                      <ChevronDown
                        className={`h-4 w-4 opacity-70 transition-transform duration-300 ${
                          isExpanded ? "rotate-180" : ""
                        }`}
                      />
                    )}
                  </motion.button>

                  {hasMega && isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="mx-1 mb-1 overflow-hidden rounded-xl bg-black/[0.03] pl-2"
                    >
                      {n.label === "Services" &&
                        serviceMenu.map((g) => (
                          <div key={g.heading} className="py-2">
                            <p className="px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-slate-500">
                              {g.heading}
                            </p>
                            {g.items.map((item) => (
                              <a
                                key={item.name}
                                href={serviceHref(item.name)}
                                onClick={() => {
                                  setOpen(false);
                                  setMobileMenu(null);
                                }}
                                className="block rounded-lg px-4 py-2.5 text-sm text-black transition-colors hover:bg-black/5"
                              >
                                {item.name}
                              </a>
                            ))}
                          </div>
                        ))}

                      {n.label === "Industries" &&
                        industryMenu.map((g) => (
                          <div key={g.heading} className="py-2">
                            <p className="px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-slate-500">
                              {g.heading}
                            </p>
                            {g.items.map((item) => (
                              <a
                                key={item.name}
                                href={serviceHref(item.name)}
                                onClick={() => {
                                  setOpen(false);
                                  setMobileMenu(null);
                                }}
                                className="block rounded-lg px-4 py-2.5 text-sm text-black transition-colors hover:bg-black/5"
                              >
                                {item.name}
                              </a>
                            ))}
                          </div>
                        ))}

                      {n.label === "About Us" && (
                        <div>
                          <a
                            href="/about"
                            onClick={() => {
                              setOpen(false);
                              setMobileMenu(null);
                            }}
                            className="block rounded-lg px-4 py-2.5 text-sm text-black transition-colors hover:bg-black/5"
                          >
                            About Us
                          </a>
                          <a
                            href="/why-mindwhiz"
                            onClick={() => {
                              setOpen(false);
                              setMobileMenu(null);
                            }}
                            className="block rounded-lg px-4 py-2.5 text-sm text-black transition-colors hover:bg-black/5"
                          >
                            Why MindWhiz
                          </a>
                        </div>
                      )}
                    </motion.div>
                  )}
                </div>
              );
            })}
            <motion.a
              href="/contact"
              onClick={() => setOpen(false)}
              initial={{ opacity: 0, scale: 0.75 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", stiffness: 320, damping: 22, delay: 0.04 * nav.length }}
              className="group mt-1 flex items-center justify-center gap-2 rounded-full border border-white/20 bg-neutral-950 px-4 py-3 text-sm font-semibold text-white transition-colors duration-300 hover:bg-neutral-800"
            >
              <span className="relative h-4 w-4 overflow-hidden">
                <ArrowUpRight className="absolute inset-0 h-4 w-4 text-[#9CCC3C] transition-transform duration-300 ease-out group-hover:translate-x-5 group-hover:-translate-y-5" />
                <ArrowUpRight className="absolute inset-0 h-4 w-4 -translate-x-5 translate-y-5 text-[#9CCC3C] transition-transform duration-300 ease-out group-hover:translate-x-0 group-hover:translate-y-0" />
              </span>
              Get in Touch
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
