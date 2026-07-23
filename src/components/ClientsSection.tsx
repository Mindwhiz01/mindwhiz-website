"use client";

// ---------------------------------------------------------------------------
// Clients section: "Trusted by" header + two opposite-direction logo marquees.
// Text slides in from the left, logos from the right - driven by scroll
// progress as the section moves up through the viewport.
// Shared between the homepage and Web Services page.
// ---------------------------------------------------------------------------

import { motion } from "framer-motion";
import { useEffect, useRef } from "react";

// `bg` can override the default light card for a logo that needs it.
type ClientItem = { name: string; src?: string; bg?: string };

const clientsRow1: ClientItem[] = [
  { name: "Alpha Bravo Construction", src: "/clients/alpha-bravo-light.png" },
  { name: "Highland Redstone", src: "/clients/highland.png" },
  { name: "Inovatiqa", src: "/clients/inovatiqa-light.png" },
  { name: "Jerdoni", src: "/clients/jerdoni.png" },
  { name: "Texas Diagnostic Labs", src: "/clients/texas.png" },
  { name: "Villa Tech", src: "/clients/villa-tech-light.png" },
  { name: "Roshni Clinical Research", src: "/clients/roshni-clinical.png" },
  { name: "Greenhouse Family Practice", src: "/clients/greenhouse.png" },
  { name: "Buddha's Herbs", src: "/clients/buddhas-herbs.png" },
  { name: "Dr. Owais", src: "/clients/dr-owais.png" },
  { name: "Ideal Smile", src: "/clients/ideal-smile.png" },
  { name: "Ironbox", src: "/clients/ironbox.png" },
  { name: "Basil Pizza", src: "/clients/basil-pizza.png" },
  { name: "Met Pakistan", src: "/clients/met-pakistan.png" },
  { name: "Maria Basit Malik", src: "/clients/maria-basit-malik.png" },
];
const clientsRow2: ClientItem[] = [...clientsRow1].reverse();

function LogoChip({
  item,
  onHoverChange,
}: {
  item: ClientItem;
  onHoverChange?: (hovering: boolean) => void;
}) {
  return (
    // constant white card so logos (white backgrounds) render in both themes;
    // logo files are pre-trimmed, so object-contain fits them cleanly in the box.
    // shrink-0 keeps chips at a fixed width inside the horizontal scroller.
    <span
      onMouseEnter={() => onHoverChange?.(true)}
      onMouseLeave={() => onHoverChange?.(false)}
      className="group flex h-20 w-[150px] shrink-0 items-center justify-center overflow-hidden rounded-2xl px-4 py-3 ring-1 ring-black/5 transition-shadow hover:shadow-md sm:h-24 sm:w-[210px] sm:px-6 sm:py-4"
      style={{ backgroundColor: item.bg ?? "#EEEEEE" }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={item.src}
        alt={item.name}
        draggable={false}
        className="h-full w-full select-none object-contain"
      />
    </span>
  );
}

// Native horizontal scroller with two behaviours layered on top:
//  1. auto-scroll via requestAnimationFrame (replaces the CSS keyframe marquee
//     so we can share one scroll position with manual input);
//  2. click/touch drag to move it manually left <-> right.
// Content is duplicated once, so scrollLeft is wrapped within [0, half] to give
// a seamless infinite loop in either direction.
function ClientMarquee({
  items,
  direction,
}: {
  items: ClientItem[];
  direction: "left" | "right";
}) {
  const row = [...items, ...items];
  const scrollerRef = useRef<HTMLDivElement>(null);
  const drag = useRef({ active: false, startX: 0, startScroll: 0, moved: false });
  const hovered = useRef(false);
  // true scroll position kept as a float: some displays round `scrollLeft` to a
  // whole pixel, so accumulating a sub-pixel step on the element itself would
  // get truncated back to the same integer and never move. We accumulate here.
  const pos = useRef(0);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;

    const half = () => el.scrollWidth / 2;
    const wrap = () => {
      const h = half();
      if (h <= 0) return;
      if (pos.current >= h) pos.current -= h;
      else if (pos.current < 0) pos.current += h;
    };

    // start the "right" row mid-way so it has room to scroll backwards
    pos.current = direction === "right" ? half() : 0;
    el.scrollLeft = pos.current;

    const speed = direction === "left" ? 0.4 : -0.4; // px per frame
    let raf = 0;
    const step = () => {
      // always moving unless the user is dragging or hovering a logo on this row
      if (!drag.current.active && !hovered.current) {
        pos.current += speed;
        wrap();
        el.scrollLeft = pos.current;
      }
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [direction]);

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = scrollerRef.current;
    // touch is handled by native overflow-x scrolling; only drive mouse/pen
    if (!el || e.pointerType === "touch") return;
    drag.current = {
      active: true,
      startX: e.clientX,
      startScroll: el.scrollLeft,
      moved: false,
    };
    el.setPointerCapture(e.pointerId);
  };
  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = scrollerRef.current;
    if (!el || !drag.current.active) return;
    const dx = e.clientX - drag.current.startX;
    if (Math.abs(dx) > 3) drag.current.moved = true;
    el.scrollLeft = drag.current.startScroll - dx;
    const h = el.scrollWidth / 2;
    if (h > 0) {
      if (el.scrollLeft >= h) el.scrollLeft -= h;
      else if (el.scrollLeft < 0) el.scrollLeft += h;
      drag.current.startX = e.clientX;
      drag.current.startScroll = el.scrollLeft;
    }
    // keep the float accumulator in sync so auto-scroll continues from here
    pos.current = el.scrollLeft;
  };
  const endDrag = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = scrollerRef.current;
    if (el?.hasPointerCapture(e.pointerId)) el.releasePointerCapture(e.pointerId);
    drag.current.active = false;
  };

  return (
    <div className="marquee-mask relative overflow-hidden">
      <div
        ref={scrollerRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        // prevent the drag from triggering logo clicks / text selection
        onClickCapture={(e) => {
          if (drag.current.moved) e.stopPropagation();
        }}
        className="marquee-drag flex cursor-grab gap-3 overflow-x-auto py-1 active:cursor-grabbing sm:gap-5"
      >
        {row.map((item, i) => (
          <LogoChip
            key={`${item.name}-${i}`}
            item={item}
            onHoverChange={(h) => (hovered.current = h)}
          />
        ))}
      </div>
    </div>
  );
}

// Reveal is driven by the section entering the viewport (not scroll progress),
// so it always completes regardless of viewport height - on short/"small
// desktop" screens the scroll-linked version could never reach full opacity.
const reveal = {
  hidden: { y: 48, opacity: 0 },
  visible: { y: 0, opacity: 1 },
};
const revealTransition = { duration: 0.7, ease: "easeOut" as const };

export default function ClientsSection() {
  return (
    <section className="relative z-30 rounded-t-[2.5rem] bg-white">
      <div className="mx-auto flex min-h-0 max-w-7xl flex-col justify-start px-3 pb-16 pt-16 sm:px-8 sm:pt-20 lg:min-h-screen">
        {/* centered header */}
        <motion.div
          variants={reveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          transition={revealTransition}
          className="mx-auto max-w-3xl text-center"
        >
          <span className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.2em] text-[#9CCC3C]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#9CCC3C]" />
            Trusted by
          </span>
          <h2
            className="mt-5 text-[clamp(2.4rem,5.5vw,5rem)] font-extrabold uppercase leading-[0.9] tracking-tight text-black"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Teams that scale with{" "}
            <span style={{ color: "#9CCC3C" }}>MindWhiz</span>
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-black/70 sm:text-lg">
            From construction to healthcare, our clients rely on us to deliver vetted talent and
            24/7 operations.
          </p>
        </motion.div>

        {/* logo showcase panel - two contained rows */}
        <motion.div
          variants={reveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          transition={revealTransition}
          className="mt-10 overflow-hidden rounded-3xl bg-[#f5f5f5] p-2 sm:mt-14 sm:p-8"
        >
          <div className="flex flex-col gap-3 overflow-hidden sm:gap-5">
            <ClientMarquee items={clientsRow1} direction="left" />
            <ClientMarquee items={clientsRow2} direction="right" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
