"use client";

// One wheel gesture = one slide for pinned, full-screen scroll sections.
//
// The section must be `total * 100vh` tall with a sticky 100vh child, so
// slide k's snap point sits exactly k viewport-heights into the track.
// While the section is pinned, each wheel gesture eases the page to the
// next/previous snap point and swallows leftover momentum until the move
// settles; at the first/last slide the page scrolls on natively. Scrolls go
// through the app-wide Lenis instance when it's mounted (with `lock` so user
// input can't interrupt mid-move), falling back to a manual rAF glide.

import { useEffect, type RefObject } from "react";
import { getLenis } from "@/lib/lenis";

// Shared with the slide enter/exit animations so scroll and visuals settle together.
export const SLIDE_MS = 700;

export function useSlideSnap(ref: RefObject<HTMLElement | null>, total: number) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let locked = false;
    let raf = 0;
    let unlockTimer: ReturnType<typeof setTimeout>;

    const glideTo = (targetY: number) => {
      const startY = window.scrollY;
      const delta = targetY - startY;
      const start = performance.now();
      const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);
      const tick = (now: number) => {
        const t = Math.min(1, (now - start) / SLIDE_MS);
        window.scrollTo(0, startY + delta * easeOut(t));
        if (t < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    };

    const onWheel = (e: WheelEvent) => {
      if (e.ctrlKey) return; // pinch-zoom
      const rect = el.getBoundingClientRect();
      const pinned = rect.top <= 1 && rect.bottom >= window.innerHeight - 1;
      if (!pinned) return;

      const vh = window.innerHeight;
      const idx = Math.round(-rect.top / vh);
      const next = idx + (e.deltaY > 0 ? 1 : -1);

      // At either end, hand control back to the page's native scroll.
      if (next < 0 || next > total - 1) return;

      e.preventDefault();
      if (locked) return;
      locked = true;

      const targetY = window.scrollY + rect.top + next * vh;
      const lenis = getLenis();
      if (lenis) {
        lenis.scrollTo(targetY, { duration: SLIDE_MS / 1000, lock: true });
      } else {
        glideTo(targetY);
      }

      clearTimeout(unlockTimer);
      unlockTimer = setTimeout(() => {
        locked = false;
      }, SLIDE_MS + 250);
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    return () => {
      window.removeEventListener("wheel", onWheel);
      cancelAnimationFrame(raf);
      clearTimeout(unlockTimer);
    };
  }, [ref, total]);
}
