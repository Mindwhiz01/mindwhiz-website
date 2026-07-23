"use client";

// Active panel index for a pinned, `total * 100svh` scroll deck.
//
// Derived from the track's getBoundingClientRect - the *same* geometry
// useSlideSnap snaps to - so the visible panel always matches the snap
// position. framer-motion's `scrollYProgress` is deliberately avoided here:
// under the short-laptop `zoom` hack (see globals.css) it miscalibrates and
// leaves the active index a full step behind the real scroll, so the last
// panel is reached only after the deck has already un-pinned (it looks like a
// slide gets skipped). This rect-based reading stays correct at any zoom.

import { useEffect, useState, type RefObject } from "react";

export function usePinnedActive(
  ref: RefObject<HTMLElement | null>,
  total: number,
) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let raf = 0;
    const measure = () => {
      raf = 0;
      const rect = el.getBoundingClientRect();
      const step = rect.height / total;
      if (step <= 0) return;
      const idx = Math.min(total - 1, Math.max(0, Math.round(-rect.top / step)));
      setActive((prev) => (prev === idx ? prev : idx));
    };
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule, { passive: true });
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [ref, total]);

  return active;
}
