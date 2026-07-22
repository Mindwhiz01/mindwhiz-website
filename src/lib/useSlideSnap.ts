"use client";

// One gesture = one slide for pinned, full-screen scroll sections.
//
// The section must be `total * 100svh` tall with a sticky 100svh child, so
// slide k's snap point sits exactly k viewport-heights into the track.
//
// Pointer-specific, because the two input models want opposite treatment:
//
// - Mouse wheel: each notch is discrete, so the gesture is intercepted up
//   front (preventDefault) and eased to the next/previous snap point, with
//   leftover momentum swallowed until the move settles.
// - Touch: swipes are continuous and preventDefault would kill native
//   scrolling outright, so the gesture is left alone and the page is eased to
//   the nearest snap point once it comes to rest. Same one-clean-panel
//   result, without taking the scroll away from the finger.
//
// At the first/last slide the page scrolls on natively. Scrolls go through the
// app-wide Lenis instance when it's mounted (with `lock` so user input can't
// interrupt mid-move), falling back to a manual rAF glide.

import { useEffect, type RefObject } from "react";
import { getLenis } from "@/lib/lenis";

// Shared with the slide enter/exit animations so scroll and visuals settle together.
export const SLIDE_MS = 700;

export function useSlideSnap(
  ref: RefObject<HTMLElement | null>,
  total: number,
  enabled = true,
) {
  useEffect(() => {
    if (!enabled) return;
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

      // Actual per-step scroll distance, so snapping stays correct even when
      // the section's height is scaled down (e.g. shorter steps on mobile).
      const step = rect.height / total;
      const idx = Math.round(-rect.top / step);
      const next = idx + (e.deltaY > 0 ? 1 : -1);

      // At either end, hand control back to the page's native scroll.
      if (next < 0 || next > total - 1) return;

      e.preventDefault();
      if (locked) return;
      locked = true;

      const targetY = window.scrollY + rect.top + next * step;
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

    // --- touch -------------------------------------------------------------
    // Never preventDefault here: the swipe scrolls the page natively, momentum
    // and all. Once the page has been still for a beat and the section is
    // still pinned, glide to whichever panel is closest so we never rest
    // half-way between two.
    let settleTimer: ReturnType<typeof setTimeout>;
    let touching = false;

    const snapToNearest = () => {
      if (locked || touching) return;
      const rect = el.getBoundingClientRect();
      const pinned = rect.top <= 1 && rect.bottom >= window.innerHeight - 1;
      if (!pinned) return;

      const step = rect.height / total;
      const idx = Math.min(total - 1, Math.max(0, Math.round(-rect.top / step)));
      const targetY = window.scrollY + rect.top + idx * step;
      // Already within a few pixels - leave it alone rather than nudging the
      // page under the user for no visible gain.
      if (Math.abs(targetY - window.scrollY) < 4) return;

      locked = true;
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

    const onTouchStart = () => {
      touching = true;
      clearTimeout(settleTimer);
    };
    const onTouchEnd = () => {
      touching = false;
    };
    // Fires for the swipe itself and for the momentum that follows it; the
    // debounce means we only act once the whole thing has come to rest.
    const onScroll = () => {
      clearTimeout(settleTimer);
      settleTimer = setTimeout(snapToNearest, 140);
    };

    const coarse = window.matchMedia("(pointer: coarse)").matches;

    window.addEventListener("wheel", onWheel, { passive: false });
    if (coarse) {
      window.addEventListener("touchstart", onTouchStart, { passive: true });
      window.addEventListener("touchend", onTouchEnd, { passive: true });
      window.addEventListener("scroll", onScroll, { passive: true });
    }
    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
      clearTimeout(unlockTimer);
      clearTimeout(settleTimer);
    };
  }, [ref, total, enabled]);
}
