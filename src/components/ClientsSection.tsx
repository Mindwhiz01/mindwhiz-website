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

// Logos are small WebP (~440px, a few KB each) resized to their display size;
// the two that were already tiny stay as PNG (WebP made them larger).
const clientsRow1: ClientItem[] = [
  { name: "Alpha Bravo Construction", src: "/clients/alpha-bravo-light.webp" },
  { name: "Highland Redstone", src: "/clients/highland.webp" },
  { name: "Inovatiqa", src: "/clients/inovatiqa-light.png" },
  { name: "Jerdoni", src: "/clients/jerdoni.webp" },
  { name: "Texas Diagnostic Labs", src: "/clients/texas.webp" },
  { name: "Villa Tech", src: "/clients/villa-tech-light.webp" },
  { name: "Advanced Clinical Research", src: "/clients/advanced-clinical-research.webp" },
  { name: "Mondok", src: "/clients/mondok.webp" },
  { name: "Basil Pizza", src: "/clients/basil-pizza.png" },
  { name: "Met Pakistan", src: "/clients/met-pakistan.webp", bg: "#0d0d0d" },
  { name: "Greenhouse Family Practice", src: "/clients/greenhouse.webp" },
  { name: "Buddha's Herbs", src: "/clients/buddhas-herbs.webp" },
  { name: "Dr. Owais", src: "/clients/dr-owais.webp" },
  { name: "Ideal Smile", src: "/clients/ideal-smile.webp" },
  { name: "Maria Basit Malik", src: "/clients/maria-basit-malik.webp" },
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
        loading="lazy"
        decoding="async"
        width={210}
        height={96}
        className="h-full w-full select-none object-contain"
      />
    </span>
  );
}

// A single self-contained marquee row. Instead of native scrolling, the whole
// track is moved with a GPU `transform: translate3d`, driven by one float
// position (`pos`). Having one source of truth means the auto-scroll and manual
// drag never fight each other (that tug-of-war was the mobile "shake").
//  - auto-scroll: rAF advances `pos` each frame;
//  - drag: pointer events move `pos` directly (all input types);
//  - loop: content is duplicated once, so `pos` wraps within [0, half] for a
//    seamless infinite loop in either direction.
function ClientMarquee({
  items,
  direction,
}: {
  items: ClientItem[];
  direction: "left" | "right";
}) {
  const row = [...items, ...items];
  const trackRef = useRef<HTMLDivElement>(null);
  const drag = useRef({ active: false, startX: 0, startPos: 0, moved: false });
  const hovered = useRef(false);
  const pos = useRef(0);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    const half = () => el.scrollWidth / 2; // width of one copy of the set
    const apply = () => {
      el.style.transform = `translate3d(${-pos.current}px,0,0)`;
    };
    const wrap = () => {
      const h = half();
      if (h <= 0) return;
      if (pos.current >= h) pos.current -= h;
      else if (pos.current < 0) pos.current += h;
    };

    // start the "right" row mid-way so it has room to scroll backwards
    pos.current = direction === "right" ? half() : 0;
    apply();

    const speed = direction === "left" ? 0.75 : -0.75; // px per frame
    let raf = 0;
    const step = () => {
      // always moving unless the user is dragging or hovering a logo on this row
      if (!drag.current.active && !hovered.current) {
        pos.current += speed;
        wrap();
        apply();
      }
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [direction]);

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = trackRef.current;
    if (!el) return;
    drag.current = { active: true, startX: e.clientX, startPos: pos.current, moved: false };
    // capture mouse/pen so the drag keeps tracking outside the row; for touch we
    // skip capture so a vertical swipe can still scroll the page (touch-action)
    if (e.pointerType !== "touch") el.setPointerCapture(e.pointerId);
  };
  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = trackRef.current;
    if (!el || !drag.current.active) return;
    const dx = e.clientX - drag.current.startX;
    if (Math.abs(dx) > 3) drag.current.moved = true;
    pos.current = drag.current.startPos - dx;
    const h = el.scrollWidth / 2;
    if (h > 0) {
      if (pos.current >= h) pos.current -= h;
      else if (pos.current < 0) pos.current += h;
      // rebase so the next move is a small delta (keeps the loop seamless)
      drag.current.startX = e.clientX;
      drag.current.startPos = pos.current;
    }
    el.style.transform = `translate3d(${-pos.current}px,0,0)`;
  };
  const endDrag = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = trackRef.current;
    if (el?.hasPointerCapture(e.pointerId)) el.releasePointerCapture(e.pointerId);
    drag.current.active = false;
  };

  return (
    <div className="marquee-mask relative overflow-hidden">
      <div
        ref={trackRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        // prevent the drag from triggering logo clicks / text selection
        onClickCapture={(e) => {
          if (drag.current.moved) e.stopPropagation();
        }}
        className="marquee-drag flex w-max cursor-grab select-none gap-3 py-1 will-change-transform active:cursor-grabbing sm:gap-5"
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
          className="relative mx-auto max-w-3xl text-center"
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
