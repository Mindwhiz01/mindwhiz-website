"use client";

// Drives the "Service coverage / capabilities" carousel ride shared by the
// industry landing pages (finance, hr, construction-estimation). At sm+ the
// section pins (CSS sticky) and the card row rides left as you scroll, via a
// GSAP ScrollTrigger scrub that reads the row's LIVE width every frame - the
// same approach as the home "Industries we serve" section, so it works on
// every viewport size. The previous framer useScroll ride measured 0px of
// travel on desktop/laptop and never moved. Below sm the row stays a native
// swipe carousel (matchMedia only builds the timeline at sm+).
//
// Returns refs to wire onto the section / scroll-viewport / card row, plus:
//   cardW     - width to give each card at sm+ (so `perView` fit per view)
//   sectionVh - pinned scroll length as a vh multiple, sized to the actual
//               travel so the ride releases promptly once the last card lands
//   needsRide - false when the cards already fit (nothing to ride): the caller
//               drops the tall pinned height so there is no dead-scroll.

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useBelowSm } from "@/lib/useBelowSm";

const CARD_GAP = 20;

export function useCapabilitiesRide(itemCount: number) {
  const sectionRef = useRef<HTMLElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const rowRef = useRef<HTMLDivElement>(null);
  const isMobile = useBelowSm();
  const [cardW, setCardW] = useState(300);
  const [sectionVh, setSectionVh] = useState(180);
  const [needsRide, setNeedsRide] = useState(true);

  useEffect(() => {
    const update = () => {
      const vp = viewportRef.current;
      if (!vp) return;
      const w = vp.clientWidth;
      const perView = w >= 768 ? 3 : w >= 560 ? 2 : 1;
      const cw = (w - CARD_GAP * (perView - 1)) / perView;
      setCardW(cw);
      const rowW = itemCount * cw + (itemCount - 1) * CARD_GAP;
      const distance = Math.max(0, rowW - w);
      const ride = distance > 4;
      setNeedsRide(ride);
      // pin length ~0.9x the travel so the row keeps pace with the scroll and
      // releases promptly once the last card lands; clamped for short/long rides
      const vh = window.innerHeight || 800;
      const extraVh = ride ? Math.min(140, Math.max(28, (distance / vh) * 90)) : 0;
      setSectionVh(100 + extraVh);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [itemCount]);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia();
    mm.add("(min-width: 640px)", () => {
      const ctx = gsap.context(() => {
        const row = rowRef.current!;
        const vp = viewportRef.current!;
        // leftward travel that scrolls the row until its last card's right edge
        // meets the viewport's right edge, read live each frame while pinned
        const fullDistance = () => Math.max(0, row.scrollWidth - vp.clientWidth);
        const state = { progress: 0 };
        const apply = () => {
          gsap.set(row, { x: -fullDistance() * state.progress, force3D: true });
        };
        gsap
          .timeline({
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top top",
              end: "bottom bottom",
              scrub: 0.5,
              invalidateOnRefresh: true,
            },
          })
          .to(state, { progress: 1, duration: 1, ease: "none", onUpdate: apply });
      }, sectionRef);
      return () => ctx.revert();
    });
    return () => mm.revert();
  }, []);

  return { sectionRef, viewportRef, rowRef, isMobile, cardW, sectionVh, needsRide };
}
