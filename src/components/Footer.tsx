"use client";

import {
  Linkedin,
  Instagram,
  Facebook,
  Mail,
  ShieldCheck,
  ArrowUpRight,
  MessageCircle,
  type LucideIcon,
} from "lucide-react";
import { company, footerGroups, certifications } from "@/lib/content";

/* ------------------------------------------------------------------ */
/*  Theme                                                              */
/* ------------------------------------------------------------------ */

const ACCENT = "#9CCC3C"; // MindWhiz template accent (cyan)

const socials: { label: string; Icon: LucideIcon; href: string }[] = [
  { label: "LinkedIn", Icon: Linkedin, href: "https://www.linkedin.com/company/mindwhiz" },
  { label: "Instagram", Icon: Instagram, href: "https://www.instagram.com/mindwhiz2.0/" },
  { label: "Facebook", Icon: Facebook, href: "https://www.facebook.com/mindwhizofficial/" },
  { label: "Email", Icon: Mail, href: `mailto:${company.email}` },
];

// Mark the link that should carry the "Hiring" badge.
const HIRING_LINK = "Careers";

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function Footer() {
  return (
    <footer data-header-dark className="relative bg-[#383838] text-white">
      <div className="mx-auto max-w-7xl px-6 pt-16 sm:px-8">
        {/* ---- top grid ---- */}
        <div className="grid grid-cols-2 gap-10 lg:grid-cols-[1.6fr_repeat(4,1fr)]">
          {/* brand block */}
          <div className="col-span-2 lg:col-span-1">
            <a href="/" aria-label={`${company.name} home`} className="flex items-center gap-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/mindwhiz-mark.png" alt="MindWhiz" className="h-9 w-9" />
              <span
                className="text-xl font-bold tracking-tight"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {company.name}
              </span>
            </a>

            <p className="mt-5 max-w-xs text-sm leading-relaxed text-white/50">
              {company.tagline}. Vetted engineers and 24/7 operations across the
              US, UK, and Pakistan, built for speed, reliability, and enterprise
              trust.
            </p>

            {/* status pill */}
            <a
              href="https://api.leadconnectorhq.com/widget/booking/I1hzuNe9sXdClDrIUCe3"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-1.5 text-[11px] font-medium uppercase tracking-wider text-white/70 transition-colors hover:border-[#9CCC3C] hover:text-[#9CCC3C]"
            >
              <span
                className="h-1.5 w-1.5 rounded-full"
                style={{ backgroundColor: ACCENT }}
              />
              Accepting New Clients
            </a>

            {/* socials */}
            <div className="mt-7 flex gap-3">
              {socials.map(({ label, Icon, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="grid h-9 w-9 place-items-center rounded-full border border-white/15 text-white/60 transition-colors hover:border-[#9CCC3C] hover:text-[#9CCC3C]"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>

            {/* Hostinger badge */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/Badge_brand_dark_640x240.svg"
              alt="Hostinger Partner Badge"
              width="160"
              height="60"
              className="mt-6"
            />
          </div>

          {/* link columns (single source of truth: content.ts) */}
          {footerGroups.map((group) => (
            <nav key={group.title} aria-label={group.title}>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
                {group.title}
              </h3>
              <ul className="mt-5 space-y-3">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="inline-flex items-center gap-2 text-sm text-white/55 transition-colors hover:text-[#9CCC3C]"
                    >
                      {link.label}
                      {link.label === HIRING_LINK && (
                        <span
                          className="animate-glow-pulse rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide"
                          style={{ color: "#9CCC3C", borderColor: "#9CCC3C" }}
                        >
                          Hiring
                        </span>
                      )}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        {/* ---- certifications banner - hidden for now, restore by uncommenting ---- */}
        {/*
        <div className="mt-14 border-t border-white/10 pt-8">
          <a href="#" className="group flex items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <ShieldCheck
                className="mt-0.5 h-5 w-5 shrink-0"
                style={{ color: ACCENT }}
              />
              <div>
                <p className="text-sm font-semibold uppercase tracking-wider">
                  Compliance &amp; Certifications
                </p>
                <p className="mt-1 text-sm text-white/50">
                  {certifications.join(" · ")}
                </p>
              </div>
            </div>
            <ArrowUpRight className="h-5 w-5 shrink-0 text-white/40 transition-colors group-hover:text-white" />
          </a>
        </div>
        */}

        {/* ---- bottom bar ---- */}
        <div className="mt-8 flex flex-col items-start justify-between gap-4 border-t border-white/10 py-6 text-xs text-white/40 sm:flex-row sm:items-center">
          <div className="flex flex-wrap items-center gap-6">
            <span>© 2026 {company.name}. All rights reserved.</span>
            <a href="/privacy" className="transition-colors hover:text-white">
              Privacy
            </a>
            <a href="/terms" className="transition-colors hover:text-white">
              Terms
            </a>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-white/50">Pakistan · UK · USA</span>
            <span
              className="rounded-full border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider"
              style={{ color: "#9CCC3C", borderColor: "#9CCC3C" }}
            >
              Since 2020
            </span>
          </div>
        </div>
      </div>

      {/* ---- floating chat pill - hidden for now, restore by uncommenting ---- */}
      {/*
      <button
        type="button"
        className="absolute bottom-5 left-0 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 py-2 pl-3 pr-4 text-sm font-medium text-white/80 backdrop-blur transition-colors hover:bg-white/10"
      >
        <MessageCircle className="h-4 w-4" style={{ color: ACCENT }} />
        Chat with us
      </button>
      */}
    </footer>
  );
}
