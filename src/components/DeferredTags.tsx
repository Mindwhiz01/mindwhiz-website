"use client";

// ---------------------------------------------------------------------------
// Google Tag Manager (which also loads GA4 and Clarity) and the Meta Pixel,
// loaded on the visitor's first interaction instead of during page load.
//
// Together these scripts were ~1.9 s of main-thread work and most of the Total
// Blocking Time on mobile. Loading them on first scroll / tap / key / mouse
// move keeps them out of the critical window; a fallback timer still loads
// them for visitors who never interact, so pageviews are not lost.
//
// Conversion pages load the tags immediately: /thank-you pushes the
// generate_lead event and visitors often close it without interacting.
// dataLayer and fbq are stubbed up front so anything pushed before the
// scripts arrive is queued and replayed, exactly as with the stock snippets.
// ---------------------------------------------------------------------------

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const GTM_ID = "GTM-WNJXTS4Z";
const META_PIXEL_ID = "1270428855061399";
const FALLBACK_MS = 9000;
const IMMEDIATE_PATHS = ["/thank-you"];

type Fbq = ((...args: unknown[]) => void) & {
  callMethod?: (...args: unknown[]) => void;
  queue: unknown[];
  push: Fbq;
  loaded: boolean;
  version: string;
};

declare global {
  interface Window {
    dataLayer?: unknown[];
    fbq?: Fbq;
    _fbq?: Fbq;
    __mwTagsLoaded?: boolean;
  }
}

function stubQueues() {
  window.dataLayer = window.dataLayer || [];
  if (!window.fbq) {
    const n = function (...args: unknown[]) {
      if (n.callMethod) n.callMethod(...args);
      else n.queue.push(args);
    } as Fbq;
    n.queue = [];
    n.push = n;
    n.loaded = true;
    n.version = "2.0";
    window.fbq = n;
    if (!window._fbq) window._fbq = n;
  }
}

function addScript(src: string) {
  const s = document.createElement("script");
  s.async = true;
  s.src = src;
  document.head.appendChild(s);
}

function loadTags() {
  if (window.__mwTagsLoaded) return;
  window.__mwTagsLoaded = true;
  stubQueues();
  window.dataLayer!.push({ "gtm.start": Date.now(), event: "gtm.js" });
  addScript(`https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`);
  window.fbq!("init", META_PIXEL_ID);
  window.fbq!("track", "PageView");
  addScript("https://connect.facebook.net/en_US/fbevents.js");
}

const EVENTS = ["scroll", "pointerdown", "pointermove", "keydown", "touchstart", "wheel"] as const;

export default function DeferredTags() {
  const pathname = usePathname();

  useEffect(() => {
    stubQueues();
    if (window.__mwTagsLoaded) return;
    if (IMMEDIATE_PATHS.some((p) => pathname?.startsWith(p))) {
      loadTags();
      return;
    }
    const trigger = () => {
      cleanup();
      loadTags();
    };
    const timer = window.setTimeout(trigger, FALLBACK_MS);
    const cleanup = () => {
      window.clearTimeout(timer);
      EVENTS.forEach((e) => window.removeEventListener(e, trigger));
    };
    EVENTS.forEach((e) => window.addEventListener(e, trigger, { once: true, passive: true }));
    return cleanup;
  }, [pathname]);

  return null;
}
