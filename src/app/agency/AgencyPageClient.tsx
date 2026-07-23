"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useTransform, type Variants } from "framer-motion";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import { ArrowUpRight, Mail, MousePointer2, Phone } from "lucide-react";
import { company } from "@/lib/content";
import FaqSection, { type Faq } from "@/components/FaqSection";

const sans = Inter({ subsets: ["latin"], display: "swap" });
const display = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-display",
  display: "swap",
});

const ORANGE = "#ff4b00";
const BLUE = "#1000d8";
const CREAM = "#eee8e0";
const INK = "#3f3f3d";

const reveal: Variants = {
  hidden: { opacity: 0, y: 42 },
  show: { opacity: 1, y: 0, transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] } },
};

const services = [
  "Digital advertising strategy",
  "Analytics & reporting",
  "Campaign tracking & optimization",
  "Conversion rate optimization (CRO)",
  "SEO",
  "Email marketing",
  "Web design & development",
];

const work = ["Performance Media", "Search Systems", "Lifecycle CRM", "Creative Testing"];
const clients = [
  "Alpha Bravo",
  "Villa Tech",
  "Inovatiqa",
  "Highland",
  "Texas",
  "Jerdoni",
  "Growth Desk",
  "MindWhiz",
  "Alpha Bravo",
  "Villa Tech",
  "Inovatiqa",
  "Highland",
];

const news = [
  {
    title: "Organic social vs paid social: stop choosing sides",
    img: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "A century of change: what growth marketing needs next",
    img: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Introducing MindWhiz Studio: the bond behind growth",
    img: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&w=900&q=80",
  },
];

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
      viewport={{ once: true, margin: "-90px" }}
      transition={{ delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function Flower({ className = "", color = "currentColor" }: { className?: string; color?: string }) {
  return (
    <span
      aria-hidden
      className={`relative inline-block h-[1em] w-[1em] align-[-0.12em] ${className}`}
      style={{ color }}
    >
      {Array.from({ length: 8 }).map((_, index) => (
        <span
          key={index}
          className="absolute left-1/2 top-1/2 h-[0.28em] w-[0.9em] origin-left rounded-full bg-current"
          style={{ transform: `rotate(${index * 45}deg) translateY(-50%)` }}
        />
      ))}
      <span className="absolute left-1/2 top-1/2 h-[0.28em] w-[0.28em] -translate-x-1/2 -translate-y-1/2 rounded-full bg-current" />
    </span>
  );
}

function SectionLabel({
  children,
  dark = false,
  centered = false,
}: {
  children: React.ReactNode;
  dark?: boolean;
  centered?: boolean;
}) {
  return (
    <div
      className={`flex items-center gap-2 text-[clamp(1.25rem,2vw,2rem)] font-extrabold uppercase leading-none ${
        centered ? "justify-center" : ""
      } ${dark ? "text-white" : "text-[#1f1f1e]"}`}
      style={{ fontFamily: "var(--font-display)" }}
    >
      <Flower />
      {children}
    </div>
  );
}

function SplitLine({ text, delay = 0 }: { text: string; delay?: number }) {
  return (
    <span className="block overflow-hidden">
      <motion.span
        initial={{ y: "112%" }}
        animate={{ y: 0 }}
        transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
        className="block"
      >
        {text}
      </motion.span>
    </span>
  );
}

function BlobButton({ children, href = "#contact" }: { children: React.ReactNode; href?: string }) {
  return (
    <motion.a
      href={href}
      whileHover={{ scale: 1.06, rotate: -4 }}
      className="relative grid h-36 w-36 place-items-center rounded-[44%_56%_48%_52%/56%_44%_56%_44%] bg-[#1000d8] text-center text-xl font-extrabold uppercase leading-none text-white"
      style={{ fontFamily: "var(--font-display)" }}
    >
      {children}
    </motion.a>
  );
}

function CursorDot() {
  const [pos, setPos] = useState({ x: -100, y: -100 });

  useEffect(() => {
    const onMove = (event: MouseEvent) => setPos({ x: event.clientX, y: event.clientY });
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <motion.div
      aria-hidden
      animate={{ x: pos.x - 7, y: pos.y - 7 }}
      transition={{ type: "spring", stiffness: 520, damping: 36, mass: 0.25 }}
      className="pointer-events-none fixed left-0 top-0 z-[90] hidden h-4 w-4 rounded-full bg-[#9ca8ff] lg:block"
    />
  );
}

function HeroSection() {
  const { scrollYProgress } = useScroll();
  const starRotate = useTransform(scrollYProgress, [0, 0.22], [0, 80]);
  const badgeY = useTransform(scrollYProgress, [0, 0.22], [0, -90]);

  return (
    <section className="relative min-h-screen overflow-hidden bg-[#ff4b00] text-white">
      <div className="absolute left-5 top-7 z-10 max-w-44 text-2xl font-extrabold leading-tight" style={{ fontFamily: "var(--font-display)" }}>
        New studio,
        <br />
        same MindWhiz DNA
      </div>

      <div className="flex min-h-screen items-end px-5 pb-10 sm:px-8">
        <div className="relative w-full">
          <h1
            className="max-w-[56rem] text-[clamp(3.6rem,11vw,11rem)] font-extrabold uppercase leading-[0.88] tracking-[-0.05em]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            <SplitLine text="Your" />
            <SplitLine text="digital" delay={0.08} />
            <SplitLine text="agency" delay={0.16} />
          </h1>

          <motion.div style={{ rotate: starRotate }} className="absolute bottom-12 left-[28rem] hidden text-[9rem] leading-none text-[#1000d8] xl:block">
            <Flower />
          </motion.div>
          <motion.div style={{ y: badgeY }} className="absolute bottom-14 left-[40rem] hidden xl:block">
            <BlobButton>Let&apos;s bond</BlobButton>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function ManifestoArcSection() {
  return (
    <section id="manifesto" className="relative min-h-screen overflow-hidden bg-[#1000d8] px-5 py-7 text-white sm:px-8">
      <SectionLabel dark>Our manifesto</SectionLabel>
      <div className="flex min-h-[calc(var(--vh)*78)] items-center justify-center">
        <motion.h2
          initial={{ opacity: 0, rotate: -12, y: 70 }}
          whileInView={{ opacity: 1, rotate: 9, y: 0 }}
          viewport={{ once: true, amount: 0.45 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-6xl text-center text-[clamp(3.4rem,7.2vw,7.5rem)] font-extrabold uppercase leading-none"
          style={{ fontFamily: "var(--font-display)" }}
        >
          The bond behind brand success
        </motion.h2>
      </div>
    </section>
  );
}

function ManifestoStatementSection() {
  return (
    <section className="flex min-h-screen items-center justify-center bg-[#1000d8] px-5 py-24 text-center text-white sm:px-8">
      <Reveal>
        <h2
          className="mx-auto max-w-7xl text-[clamp(2.5rem,4.6vw,5.8rem)] font-extrabold uppercase leading-[1.05]"
          style={{ fontFamily: "var(--font-display)" }}
        >
          We bring strategy, creativity, and agile approach together to help
          brands connect with people, and turn that connection into real results
        </h2>
      </Reveal>
    </section>
  );
}

function ServicesSection() {
  return (
    <section id="services" className="min-h-screen bg-[#eee8e0] px-5 py-7 text-[#1f1f1e] sm:px-8">
      <SectionLabel>Services</SectionLabel>
      <div className="mx-auto grid max-w-7xl gap-12 pt-20 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
        <Reveal>
          <h2 className="text-[clamp(3.2rem,5vw,6rem)] font-extrabold uppercase leading-none text-[#ff4b00]" style={{ fontFamily: "var(--font-display)" }}>
            Performance & Growth
          </h2>
          <p className="mt-7 text-2xl text-[#1f1f1e]">
            We track, measure, and optimize to ensure lasting results.
          </p>
          <div className="mt-9 flex max-w-4xl flex-wrap gap-4">
            {services.map((service) => (
              <span key={service} className="rounded-full border border-[#1f1f1e] px-5 py-2 text-lg">
                {service}
              </span>
            ))}
          </div>
          <div className="mt-14 space-y-10 text-[clamp(2.8rem,4.4vw,5rem)] font-extrabold uppercase leading-none text-[#bdb7b1]" style={{ fontFamily: "var(--font-display)" }}>
            <p>Creative Solutions</p>
            <p>Digital Presence</p>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="grid aspect-square grid-cols-2 grid-rows-2 gap-0">
            <div className="rounded-full bg-[#ff4b00]" />
            <div className="rounded-full bg-[#ff4b00] p-[27%]">
              <div className="h-full w-full rounded-full bg-[#eee8e0]" />
            </div>
            <div className="rounded-full bg-[#ff4b00] p-[27%]">
              <div className="h-full w-full rounded-full bg-[#eee8e0]" />
            </div>
            <div className="rounded-full bg-[#ff4b00]" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function BondCtaSection() {
  return (
    <section className="bg-[#eee8e0] px-5 py-28 sm:px-8">
      <div className="mx-auto flex max-w-[95rem] items-center justify-between gap-10 rounded-full bg-[#ff4b00] px-8 py-12 text-white sm:px-16 sm:py-20">
        <h2 className="max-w-5xl text-[clamp(2rem,3.4vw,4.4rem)] font-extrabold uppercase leading-[1.05]" style={{ fontFamily: "var(--font-display)" }}>
          Ready when you are. Reach out and see what happens when the right
          minds connect
        </h2>
        <div className="hidden shrink-0 lg:block">
          <BlobButton>Let&apos;s bond</BlobButton>
        </div>
      </div>
    </section>
  );
}

function WorkSection() {
  return (
    <section id="work" className="bg-[#1000d8] px-5 py-24 text-white sm:px-8">
      <SectionLabel dark>Featured work</SectionLabel>
      <div className="mx-auto mt-24 max-w-7xl divide-y divide-white/25 border-y border-white/25">
        {work.map((item, index) => (
          <Reveal key={item} delay={index * 0.04}>
            <a href="#contact" className="group flex items-center justify-between gap-8 py-8">
              <h3 className="text-[clamp(3rem,5vw,6rem)] font-extrabold uppercase leading-none" style={{ fontFamily: "var(--font-display)" }}>
                {item}
              </h3>
              <span className="grid h-16 w-16 shrink-0 place-items-center rounded-full bg-[#ff4b00] transition-transform group-hover:rotate-45">
                <ArrowUpRight className="h-7 w-7" />
              </span>
            </a>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function ClientsSection() {
  return (
    <section id="clients" className="relative overflow-hidden bg-[#eee8e0] px-5 py-7 text-[#3f3f3d] sm:px-8">
      <SectionLabel>Our clients</SectionLabel>
      <div className="relative mx-auto min-h-[calc(var(--vh)*82)] max-w-[105rem] pt-24">
        <Reveal>
          <h2 className="text-[clamp(3.5rem,7.2vw,9.2rem)] font-extrabold uppercase leading-[1.05]" style={{ fontFamily: "var(--font-display)" }}>
            When the
            <br />
            C<span className="inline-block w-[0.12em]" />
            <span className="inline-block w-[0.48em] rounded-full bg-[#ff4b00] align-middle">&nbsp;</span>
            <span className="inline-block w-[0.48em] rounded-full bg-[#ff4b00] align-middle">&nbsp;</span>
            <span className="inline-block w-[0.48em] rounded-full bg-[#ff4b00] align-middle">&nbsp;</span>
            <span className="inline-block w-[0.48em] rounded-full bg-[#ff4b00] align-middle">&nbsp;</span>
            nnection
            <br />
            is real, it shows
          </h2>
        </Reveal>
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-8 right-10 hidden h-56 w-56 place-items-center rounded-[44%_56%_48%_52%/56%_44%_56%_44%] bg-[#1000d8] text-center text-white xl:grid"
        >
          <div>
            <p className="text-[5.6rem] font-extrabold leading-none" style={{ fontFamily: "var(--font-display)" }}>
              9.6
            </p>
            <p className="mt-2 text-sm font-extrabold uppercase tracking-widest">Client score</p>
          </div>
        </motion.div>
      </div>
      <div className="flex w-max animate-agency-marquee gap-4 pb-10">
        {clients.map((client, index) => (
          <div key={`${client}-${index}`} className="grid h-20 min-w-52 place-items-center rounded-full border border-[#3f3f3d] px-8 text-xl font-extrabold uppercase" style={{ fontFamily: "var(--font-display)" }}>
            {client}
          </div>
        ))}
      </div>
    </section>
  );
}

function AboutSection() {
  return (
    <section id="about" className="relative min-h-screen overflow-hidden bg-[#ff4b00] px-5 py-7 text-white sm:px-8">
      <SectionLabel dark>About us</SectionLabel>
      <div className="mx-auto max-w-[106rem] pt-36">
        <Reveal>
          <p className="max-w-[92rem] text-[clamp(3.1rem,5.1vw,6.4rem)] font-extrabold uppercase leading-[1.03]" style={{ fontFamily: "var(--font-display)" }}>
            We&apos;re thinkers, makers, and doers. Curious by nature, strategic by
            choice. We explore, question, and connect until the answer fits.
            Every project is a journey, and we&apos;re here for the ride.
          </p>
          <a href="#contact" className="mt-20 inline-block border-b-4 border-white text-3xl font-extrabold uppercase" style={{ fontFamily: "var(--font-display)" }}>
            Bond more with us
          </a>
        </Reveal>
      </div>
      <motion.div
        animate={{ y: [0, -16, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-10 right-10 hidden h-[18rem] w-[18rem] overflow-hidden rounded-[44%_56%_48%_52%/56%_44%_56%_44%] bg-[#1000d8] xl:block"
      >
        <img
          src="https://images.unsplash.com/photo-1580894732444-8ecded7900cd?auto=format&fit=crop&w=800&q=80"
          alt=""
          className="h-full w-full object-cover"
        />
      </motion.div>
    </section>
  );
}

function NiceToBondSection() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#ff4b00] px-5 py-7 text-center text-white sm:px-8">
      <SectionLabel dark>About us</SectionLabel>
      <div className="absolute inset-y-0 left-0 w-[24vw] rounded-r-[100%] bg-[#eee8e0]" />
      <div className="absolute inset-y-0 right-0 w-[24vw] rounded-l-[100%] bg-[#eee8e0]" />
      <Reveal>
        <h2 className="relative z-10 text-[clamp(4rem,7vw,9rem)] font-extrabold uppercase leading-[0.95]" style={{ fontFamily: "var(--font-display)" }}>
          Nice to
          <br />
          bond
          <br />
          with you
        </h2>
      </Reveal>
    </section>
  );
}

function NewsSection() {
  return (
    <section className="min-h-screen bg-[#1000d8] px-5 py-7 text-white sm:px-8">
      <SectionLabel dark centered>Latest news</SectionLabel>
      <Reveal>
        <h2 className="mx-auto mt-28 max-w-6xl text-center text-[clamp(2.5rem,4.5vw,5.4rem)] font-extrabold uppercase leading-[1.05]" style={{ fontFamily: "var(--font-display)" }}>
          We create, but we also reflect. Explore what we&apos;ve been thinking
          about lately
        </h2>
      </Reveal>
      <div className="mx-auto mt-24 grid max-w-7xl gap-10 lg:grid-cols-3">
        {news.map((item, index) => (
          <Reveal key={item.title} delay={index * 0.08}>
            <a href="#contact" className="group block">
              <div className="aspect-[0.86] overflow-hidden rounded-[48%_52%_45%_55%/8%_8%_16%_16%] bg-[#ff4b00]">
                <img src={item.img} alt="" className="h-full w-full object-cover opacity-80 transition-transform duration-700 group-hover:scale-105" />
              </div>
              <p className="mt-5 text-2xl font-extrabold uppercase leading-tight" style={{ fontFamily: "var(--font-display)" }}>
                {item.title}
              </p>
            </a>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function ContactSection() {
  return (
    <section id="contact" className="bg-[#ff4b00] px-5 py-28 text-white sm:px-8">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
        <Reveal>
          <h2 className="text-[clamp(4rem,7.5vw,10rem)] font-extrabold uppercase leading-[0.9]" style={{ fontFamily: "var(--font-display)" }}>
            Let&apos;s
            <br />
            bond
          </h2>
        </Reveal>
        <Reveal delay={0.08}>
          <div className="space-y-5 text-2xl font-extrabold uppercase" style={{ fontFamily: "var(--font-display)" }}>
            <a href={`mailto:${company.email}`} className="flex items-center gap-4 hover:text-[#1000d8]">
              <Mail className="h-7 w-7" />
              {company.email}
            </a>
            <a href={company.phoneHref} className="flex items-center gap-4 hover:text-[#1000d8]">
              <Phone className="h-7 w-7" />
              {company.phone}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-[#1000d8] px-5 py-16 text-white sm:px-8">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.8fr_1.2fr]">
        <p className="text-4xl font-extrabold uppercase" style={{ fontFamily: "var(--font-display)" }}>
          [mind-whiz] noun
        </p>
        <p className="text-4xl font-extrabold uppercase leading-tight" style={{ fontFamily: "var(--font-display)" }}>
          A practical link between strategy, creativity, performance, and the
          delivery teams that make growth real.
        </p>
      </div>
    </footer>
  );
}

const faqs: Faq[] = [
  {
    q: "What kind of work does the agency take on?",
    a: "Brand, design, and digital product work, identity systems, websites, campaigns, and the interfaces around them, for teams that want the strategy and the execution handled together.",
  },
  {
    q: "How do projects usually start?",
    a: "With a conversation about what you are actually trying to move, then a scoped proposal with phases, deliverables, and cost itemized before any work begins.",
  },
  {
    q: "How long does a project take?",
    a: "It depends entirely on scope. Focused pieces of work run in weeks; full identity or platform builds run considerably longer. You get a timeline with milestones at proposal stage so progress is visible throughout.",
  },
  {
    q: "Do you work with our in-house team?",
    a: "Often, yes. We can lead the work end to end or plug into an existing team where you need specific capability, and we are comfortable handing over cleanly at the end.",
  },
  {
    q: "What happens after launch?",
    a: "We can stay on for iteration, new features, and ongoing support, or hand over documented files and assets so your team can run with it. Both are fine, the choice is yours.",
  },
];

export default function AgencyPageClient() {
  return (
    <main className={`${sans.className} ${display.variable} bg-[#eee8e0]`}>
      <CursorDot />
      <HeroSection />
      <ManifestoArcSection />
      <ManifestoStatementSection />
      <ServicesSection />
      <BondCtaSection />
      <WorkSection />
      <ClientsSection />
      <AboutSection />
      <NiceToBondSection />
      <NewsSection />
      <FaqSection faqs={faqs} />

      <ContactSection />
      <Footer />
    </main>
  );
}
