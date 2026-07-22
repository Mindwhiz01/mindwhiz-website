"use client";

// ---------------------------------------------------------------------------
// Clients section: "Trusted by" header + two opposite-direction logo marquees.
// Text slides in from the left, logos from the right - driven by scroll
// progress as the section moves up through the viewport.
// Shared between the homepage and Web Services page.
// ---------------------------------------------------------------------------

import { motion } from "framer-motion";

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

function LogoChip({ item }: { item: ClientItem }) {
  return (
    // constant white card so logos (white backgrounds) render in both themes;
    // logo files are pre-trimmed, so object-contain fits them cleanly in the box.
    <span
      className="group flex h-24 w-[210px] items-center justify-center overflow-hidden rounded-2xl px-6 py-4 ring-1 ring-black/5 transition-shadow hover:shadow-md"
      style={{ backgroundColor: item.bg ?? "#EEEEEE" }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={item.src}
        alt={item.name}
        className="h-full w-full object-contain"
      />
    </span>
  );
}

function ClientMarquee({
  items,
  direction,
}: {
  items: ClientItem[];
  direction: "left" | "right";
}) {
  const row = [...items, ...items];
  return (
    <div className="marquee marquee-mask relative overflow-hidden">
      <div
        className={`marquee-track gap-5 py-1 ${
          direction === "left" ? "animate-marquee-left" : "animate-marquee-right"
        }`}
      >
        {row.map((item, i) => (
          <LogoChip key={`${item.name}-${i}`} item={item} />
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
      <div className="mx-auto flex min-h-0 max-w-7xl flex-col justify-start px-6 pb-16 pt-16 sm:px-8 sm:pt-20 lg:min-h-screen">
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
          className="mt-10 overflow-hidden rounded-3xl bg-[#f5f5f5] p-4 sm:mt-14 sm:p-8"
        >
          <div className="flex flex-col gap-5 overflow-hidden">
            <ClientMarquee items={clientsRow1} direction="left" />
            <ClientMarquee items={clientsRow2} direction="right" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
