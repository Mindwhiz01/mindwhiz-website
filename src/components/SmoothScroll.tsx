"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { registerLenis } from "@/lib/lenis";

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
    });
    registerLenis(lenis);

    let rafId: number;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    // keep anchor links (e.g. /#services, /#contact) working with smooth scroll
    const onClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement).closest?.('a[href*="#"]') as
        | HTMLAnchorElement
        | null;
      if (!anchor) return;
      const url = new URL(anchor.href, window.location.href);
      if (url.pathname !== window.location.pathname || !url.hash) return;
      const target = document.querySelector(url.hash);
      if (!target) return;
      e.preventDefault();
      lenis.scrollTo(target as HTMLElement, { offset: -80 });
    };
    document.addEventListener("click", onClick);

    // cross-page anchor landings (e.g. /web-services -> /#services): the
    // browser's native hash jump fires before images and pinned scroll
    // sections settle the layout, so re-anchor to the hash target once early
    // and again after the layout has stabilised.
    const timeouts: ReturnType<typeof setTimeout>[] = [];
    if (window.location.hash) {
      const jumpToHash = () => {
        const target = document.getElementById(window.location.hash.slice(1));
        if (!target) return;
        lenis.scrollTo(target, { offset: -80, immediate: true });
      };
      timeouts.push(setTimeout(jumpToHash, 100));
      timeouts.push(setTimeout(jumpToHash, 800));
    }

    return () => {
      timeouts.forEach(clearTimeout);
      document.removeEventListener("click", onClick);
      cancelAnimationFrame(rafId);
      registerLenis(null);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
