"use client";

// ---------------------------------------------------------------------------
// Trusted by clients: horizontal testimonial carousel - each card pairs the
// client's words + stats with a video, arrows scroll one card at a time.
// Shared between the homepage and Why MindWhiz page.
// ---------------------------------------------------------------------------

import { useRef, useState } from "react";
import Image from "next/image";
import { motion, type Variants } from "framer-motion";
import { ArrowLeft, ArrowRight, Play, Pause } from "lucide-react";
import Cta from "@/components/Cta";

const reveal: Variants = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};

function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      variants={reveal}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-60px" }}
      transition={{ delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

const clientTestimonials = [
  {
    quote: "MindWhiz is a must-have for scaling support as a growing business today.",
    author: "Alpha Bravo Construction",
    video: "https://videos.pexels.com/video-files/3195394/3195394-hd_1920_1080_25fps.mp4",
    image: "/clients/alpha-bravo-site.png",
    stats: [
      { value: "+38%", label: "Bid win rate" },
      { value: "120+", label: "Projects estimated" },
    ],
  },
  {
    quote: "Their engineers plugged in fast and our uptime has never been better.",
    author: "Villa Tech",
    video: "https://videos.pexels.com/video-files/3209828/3209828-hd_1920_1080_25fps.mp4",
    image: "/clients/villa-tech-site.png",
    stats: [
      { value: "2wks", label: "To onboard" },
      { value: "99.9%", label: "Uptime monitored" },
    ],
  },
  {
    quote: "MindWhiz let us ship an AI-powered site without growing the team.",
    author: "AISureTech",
    video: "https://videos.pexels.com/video-files/3195394/3195394-hd_1920_1080_25fps.mp4",
    image: "/clients/aisuretech-site.png",
    stats: [
      { value: "4x", label: "Faster launch" },
      { value: "24/7", label: "AI support" },
    ],
  },
  {
    quote: "Our orders climbed the moment the new storefront went live.",
    author: "Tempura Food Management",
    video: "https://videos.pexels.com/video-files/3205624/3205624-hd_1920_1080_25fps.mp4",
    image: "/clients/tempura-site.png",
    stats: [
      { value: "+52%", label: "Online orders" },
      { value: "3wks", label: "To launch" },
    ],
  },
  {
    quote: "I would recommend MindWhiz to anyone. Don't take my word - see the results.",
    author: "Inovatiqa",
    video: "https://videos.pexels.com/video-files/7989708/7989708-hd_1920_1080_25fps.mp4",
    image: "/clients/basil-pizza-site.png",
    stats: [
      { value: "60%", label: "Faster turnaround" },
      { value: "99%+", label: "Accuracy rate" },
    ],
  },
  {
    quote: "Their NOC team catches issues before our customers ever notice them.",
    author: "Highland Redstone",
    video: "https://videos.pexels.com/video-files/3196344/3196344-hd_1920_1080_25fps.mp4",
    image: "/clients/connecteffect-site.png",
    stats: [
      { value: "-45%", label: "IT costs" },
      { value: "15min", label: "Avg response" },
    ],
  },
  {
    quote: "Month-end closing used to take two weeks. Now it takes four days.",
    author: "Jerdoni",
    video: "https://videos.pexels.com/video-files/3205624/3205624-hd_1920_1080_25fps.mp4",
    stats: [
      { value: "+$104,500", label: "Annual savings" },
      { value: "3x", label: "Faster closing" },
    ],
  },
  {
    quote: "We doubled our team capacity in two weeks without a single bad hire.",
    author: "Texas Diagnostic Laboratories",
    video: "https://videos.pexels.com/video-files/3191572/3191572-hd_1920_1080_25fps.mp4",
    stats: [
      { value: "+70%", label: "Team capacity" },
      { value: "2wks", label: "To onboard" },
    ],
  },
];

function TestimonialVideo({ src }: { src: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  const toggle = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      v.play();
      setPlaying(true);
    } else {
      v.pause();
      setPlaying(false);
    }
  };

  return (
    <div className="relative h-64 overflow-hidden lg:h-full">
      <video
        ref={videoRef}
        src={src}
        muted
        loop
        playsInline
        preload="metadata"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <button
        type="button"
        onClick={toggle}
        aria-label={playing ? "Pause video" : "Play video"}
        className="absolute bottom-4 left-4 grid h-12 w-12 place-items-center rounded-full bg-white text-black shadow-lg transition-transform hover:scale-105"
      >
        {playing ? <Pause className="h-4 w-4 fill-current" /> : <Play className="ml-0.5 h-4 w-4 fill-current" />}
      </button>
    </div>
  );
}

export default function TrustedByClients() {
  const trackRef = useRef<HTMLDivElement>(null);
  const indexRef = useRef(0);

  // always land a card dead-center so the neighbors peek evenly on both sides
  const scrollByCard = (dir: number) => {
    const el = trackRef.current;
    if (!el) return;
    const cards = el.querySelectorAll<HTMLElement>("[data-tcard]");
    if (!cards.length) return;
    const next = Math.min(cards.length - 1, Math.max(0, indexRef.current + dir));
    indexRef.current = next;
    const card = cards[next];
    const target = card.offsetLeft - (el.clientWidth - card.offsetWidth) / 2;
    el.scrollTo({ left: target, behavior: "smooth" });
  };

  return (
    <section className="bg-white py-24">
      {/* heading + arrows */}
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 sm:px-8">
        <Reveal>
          <h2
            className="text-[clamp(2.6rem,5.5vw,5rem)] font-extrabold uppercase leading-[0.9] tracking-tight text-black"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Trusted by <span style={{ color: "#ed1164" }}>clients</span>
          </h2>
        </Reveal>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => scrollByCard(-1)}
            aria-label="Previous testimonial"
            className="grid h-11 w-11 place-items-center rounded-full bg-black/5 text-black transition-colors hover:bg-black/10"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => scrollByCard(1)}
            aria-label="Next testimonial"
            className="grid h-11 w-11 place-items-center rounded-full bg-black/5 text-black transition-colors hover:bg-black/10"
          >
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* carousel track - neighbors peek at both edges, faded by gradient masks */}
      <div className="relative mt-10">
        {/* edge fades so the peeking cards read as inactive */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-[5vw] bg-gradient-to-r from-white/60 to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-[5vw] bg-gradient-to-l from-white/60 to-transparent" />

        <div
          ref={trackRef}
          className="flex snap-x snap-mandatory gap-6 overflow-x-auto px-[8vw] pb-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {clientTestimonials.map((t) => (
            <div
              key={t.author}
              data-tcard
              className="grid w-[86vw] max-w-6xl shrink-0 snap-center overflow-hidden rounded-3xl bg-[#FAF7F0] lg:grid-cols-2"
            >
              {/* left: quote + author + cta + stats */}
              <div className="flex flex-col p-8 sm:p-12">
                <p
                  className="text-2xl font-bold leading-snug text-black sm:text-3xl"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  &quot;{t.quote}&quot;
                </p>
                <p className="mt-6 text-sm text-black/60">{t.author}</p>
                <Cta href="/contact" label="Learn more" className="mt-7 w-fit" />
                <div className="mt-auto flex gap-12 pt-12">
                  {t.stats.map((s) => (
                    <div key={s.label}>
                      <p
                        className="text-3xl font-bold text-black sm:text-4xl"
                        style={{ fontFamily: "var(--font-display)" }}
                      >
                        {s.value}
                      </p>
                      <p className="mt-1 text-sm text-black/60">{s.label}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* right: client screenshot or video - flush with the card's top, bottom, and right edges */}
              {t.image ? (
                <div className="relative h-64 overflow-hidden lg:h-full">
                  <Image
                    src={t.image}
                    alt={`${t.author} website`}
                    fill
                    className="object-cover object-center"
                    sizes="(min-width: 1024px) 43vw, 86vw"
                  />
                </div>
              ) : (
                <TestimonialVideo src={t.video} />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
