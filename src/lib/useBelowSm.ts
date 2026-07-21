"use client";

// True below Tailwind's `sm` breakpoint (< 640px). Used to swap pinned
// scroll-jack / scale animations for plain, native scrolling on phones.
// Returns false on the server and first client render (so hydration matches),
// then corrects after mount.

import { useEffect, useState } from "react";

export function useBelowSm() {
  const [below, setBelow] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 639px)");
    const update = () => setBelow(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return below;
}
