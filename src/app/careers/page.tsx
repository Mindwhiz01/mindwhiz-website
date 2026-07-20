"use client";

// ---------------------------------------------------------------------------
// Careers — talent landing page. Section layouts modeled on the Google Careers
// reference: a scrolling role-cards rail, an "Our locations" split card, a
// "Find your team" media split, a benefits split, and a "Working at MindWhiz"
// bento grid — all reskinned to the MindWhiz brand system.
// ---------------------------------------------------------------------------

import { useEffect, useRef, useState } from "react";
import { motion, type Variants } from "framer-motion";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import Footer from "@/components/Footer";
import { SiteHeader } from "@/components/SiteHeader";
import { PageBanner } from "@/components/PageBanner";

const sans = Inter({ subsets: ["latin"], display: "swap" });
const display = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-display",
  display: "swap",
});

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

function Kicker({ children }: { children: React.ReactNode }) {
  return (
    <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[#9CCC3C]">
      {children}
    </span>
  );
}

// ---------------------------------------------------------------------------
// Role cards rail — pastel cards with an image, a title, and a pill CTA that
// scrolls horizontally, mirroring the Google "Software Engineering roles" row.
// ---------------------------------------------------------------------------
const roles = [
  {
    title: "IT Support & Helpdesk roles",
    tint: "#E7F2D8",
    pill: "#4E7A22",
    image:
      "https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?auto=format&fit=crop&w=900&q=80",
    href: "/services/it-helpdesk-24-7",
  },
  {
    title: "Cloud & DevOps roles",
    tint: "#FBECC6",
    pill: "#8A5A16",
    image:
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=900&q=80",
    href: "/services/cloud-infrastructure",
  },
  {
    title: "Cybersecurity roles",
    tint: "#F6D9DE",
    pill: "#B33241",
    image:
      "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=900&q=80",
    href: "/services/cybersecurity-monitoring",
  },
  {
    title: "Finance & BPO roles",
    tint: "#D8E4FB",
    pill: "#2F5BD1",
    image:
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=900&q=80",
    href: "/finance",
  },
  {
    title: "HR & Recruiting roles",
    tint: "#E7F2D8",
    pill: "#4E7A22",
    image:
      "https://images.unsplash.com/photo-1573497491208-6b1acb260507?auto=format&fit=crop&w=900&q=80",
    href: "/hr",
  },
];

function RolesRail() {
  const scroller = useRef<HTMLDivElement>(null);
  const scrollBy = (dir: 1 | -1) => {
    scroller.current?.scrollBy({ left: dir * 360, behavior: "smooth" });
  };

  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        <Reveal>
          <div className="flex items-end justify-between gap-6">
            <div>
              <Kicker>Open roles</Kicker>
              <h2
                className="mt-4 text-[clamp(2.4rem,5vw,4.4rem)] font-extrabold uppercase leading-[0.92] tracking-tight text-black"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Find your <span style={{ color: "#ed1164" }}>role</span>
              </h2>
            </div>
            <div className="hidden gap-2 sm:flex">
              <button
                onClick={() => scrollBy(-1)}
                aria-label="Previous roles"
                className="grid h-11 w-11 place-items-center rounded-full border border-black/15 text-black transition-colors hover:border-black/40"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={() => scrollBy(1)}
                aria-label="More roles"
                className="grid h-11 w-11 place-items-center rounded-full border border-black/15 text-black transition-colors hover:border-black/40"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </Reveal>

        <div
          ref={scroller}
          className="mt-12 flex snap-x snap-mandatory gap-6 overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {roles.map((r, i) => (
            <Reveal
              key={r.title}
              delay={i * 0.06}
              className="w-[300px] shrink-0 snap-start sm:w-[340px]"
            >
              <a
                href={r.href}
                className="group flex h-full flex-col overflow-hidden rounded-[2rem]"
                style={{ backgroundColor: r.tint }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={r.image}
                  alt={r.title}
                  loading="lazy"
                  className="h-52 w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                />
                <div className="flex flex-1 flex-col justify-between p-7">
                  <h3
                    className="text-2xl font-bold leading-tight text-black"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {r.title}
                  </h3>
                  <span
                    className="mt-10 inline-flex w-fit items-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold text-white"
                    style={{ backgroundColor: r.pill }}
                  >
                    Learn more
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Our locations — split card: copy + linked hub list on the left, media right.
// ---------------------------------------------------------------------------
const locationLinks = [
  { label: "Houston", href: "/locations/us" },
  { label: "New York", href: "/locations/us" },
  { label: "London", href: "/locations/uk" },
  { label: "Manchester", href: "/locations/uk" },
  { label: "Lahore", href: "/locations/pk" },
  { label: "Islamabad", href: "/locations/pk" },
];

function LocationsSection() {
  return (
    <section className="bg-[#FAF9F5] py-24">
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        <Reveal>
          <div className="grid overflow-hidden rounded-[2rem] border border-black/10 bg-white lg:grid-cols-2">
            <div className="flex flex-col justify-center p-10 sm:p-14">
              <h2
                className="text-[clamp(2.6rem,5vw,4.5rem)] font-extrabold uppercase leading-[0.92] tracking-tight text-black"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Our
                <br />
                <span style={{ color: "#9CCC3C" }}>locations</span>
              </h2>
              <p className="mt-6 max-w-md text-[15px] leading-relaxed text-black/65">
                Large or small, every MindWhiz hub is built to inspire focused
                work, fast delivery, and a real sense of community across three
                time zones.
              </p>
              <div className="mt-10 grid max-w-md grid-cols-2 gap-x-8 gap-y-4 sm:grid-cols-3">
                {locationLinks.map((l) => (
                  <a
                    key={l.label}
                    href={l.href}
                    className="text-sm font-semibold text-[#2F5BD1] transition-colors hover:text-[#ed1164]"
                  >
                    {l.label}
                  </a>
                ))}
              </div>
            </div>
            <div className="relative min-h-[340px]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1400&q=80"
                alt="MindWhiz workspace"
                className="h-full w-full object-cover"
              />
              <a
                href="/locations/us"
                className="group absolute bottom-6 right-6 inline-flex items-center gap-2 rounded-full bg-[#2F5BD1] px-4 py-2.5 text-sm font-semibold text-white"
              >
                View all locations
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Find your team — media left, copy + featured team card right.
// ---------------------------------------------------------------------------
function FindYourTeam() {
  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        <Reveal>
          <div className="grid items-stretch overflow-hidden rounded-[2rem] border border-black/10 lg:grid-cols-2">
            <div className="relative min-h-[360px]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1400&q=80"
                alt="MindWhiz team collaborating"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="flex flex-col justify-center p-10 sm:p-14">
              <h2
                className="text-[clamp(2.6rem,5vw,4.5rem)] font-extrabold uppercase leading-[0.92] tracking-tight text-black"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Find your <span style={{ color: "#ed1164" }}>team</span>
              </h2>
              <p className="mt-6 max-w-md text-[15px] leading-relaxed text-black/65">
                Together, we deliver reliable operations and build products for
                clients worldwide. Ready to become a MindWhizzer? Find your team.
              </p>

              <a
                href="/services/it-helpdesk-24-7"
                className="group mt-8 flex items-center justify-between gap-6 rounded-2xl bg-[#F1F4EC] p-6 transition-colors hover:bg-[#E7F2D8]"
              >
                <div>
                  <p className="text-lg font-bold text-[#2F5BD1] underline decoration-2 underline-offset-2">
                    Engineering &amp; Tech
                  </p>
                  <p className="mt-1 text-[15px] leading-snug text-black/70">
                    Build and run the delivery systems that power thousands of
                    clients.
                  </p>
                </div>
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-[#2F5BD1] text-[#2F5BD1] transition-transform duration-300 group-hover:translate-x-1">
                  <ArrowRight className="h-5 w-5" />
                </span>
              </a>

              <a
                href="/#services"
                className="group mt-8 inline-flex w-fit items-center gap-2 rounded-full bg-[#2F5BD1] px-4 py-2.5 text-sm font-semibold text-white"
              >
                View all teams
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Benefits — copy left, media right.
// ---------------------------------------------------------------------------
function BenefitsSection() {
  return (
    <section className="bg-[#FAF9F5] py-24">
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        <Reveal>
          <div className="grid items-stretch overflow-hidden rounded-[2rem] border border-black/10 bg-white lg:grid-cols-2">
            <div className="flex flex-col justify-center p-10 sm:p-14">
              <h2
                className="text-[clamp(2.6rem,5vw,4.5rem)] font-extrabold uppercase leading-[0.92] tracking-tight text-black"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Benefits at
                <br />
                <span style={{ color: "#9CCC3C" }}>MindWhiz</span>
              </h2>
              <p className="mt-6 max-w-md text-[15px] leading-relaxed text-black/65">
                We strive to give every MindWhizzer and their loved ones a
                world-class experience — supporting their physical, emotional,
                and financial wellbeing at every stage of their career.
              </p>
              <a
                href="/why-mindwhiz"
                className="group mt-9 inline-flex w-fit items-center gap-2 rounded-full bg-[#2F5BD1] px-4 py-2.5 text-sm font-semibold text-white"
              >
                View all benefits
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
            </div>
            <div className="relative min-h-[360px]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1400&q=80"
                alt="MindWhiz culture"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Working at MindWhiz — bento grid of feature cards (image + tinted panel).
// ---------------------------------------------------------------------------
function WorkingAtCard({
  title,
  image,
  tint,
  pill,
  cta,
  href,
  imageTop = false,
  className = "",
}: {
  title: string;
  image: string;
  tint: string;
  pill: string;
  cta: string;
  href: string;
  imageTop?: boolean;
  className?: string;
}) {
  const media = (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={image}
      alt={title}
      loading="lazy"
      className="h-52 w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
    />
  );
  const body = (
    <div className="flex flex-1 flex-col justify-between p-7">
      <h3
        className="text-xl font-bold leading-snug text-black sm:text-2xl"
        style={{ fontFamily: "var(--font-display)" }}
      >
        {title}
      </h3>
      <span
        className="mt-8 inline-flex w-fit items-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold text-white"
        style={{ backgroundColor: pill }}
      >
        {cta}
        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
      </span>
    </div>
  );

  return (
    <a
      href={href}
      className={`group flex flex-col overflow-hidden rounded-[1.75rem] ${className}`}
      style={{ backgroundColor: tint }}
    >
      {imageTop ? (
        <>
          {media}
          {body}
        </>
      ) : (
        <>
          {body}
          {media}
        </>
      )}
    </a>
  );
}

function WorkingAtSection() {
  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        <Reveal>
          <h2
            className="text-[clamp(2.4rem,5vw,4.4rem)] font-extrabold uppercase leading-[0.92] tracking-tight text-black"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Working at <span style={{ color: "#ed1164" }}>MindWhiz</span>
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          <Reveal>
            <WorkingAtCard
              title="Take a look inside our hiring process"
              image="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1000&q=80"
              tint="#F6D9DE"
              pill="#B33241"
              cta="See how we hire"
              href="/contact"
              className="h-full"
            />
          </Reveal>
          <Reveal delay={0.06}>
            <WorkingAtCard
              title="Life across our US, UK & Pakistan hubs"
              image="https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1000&q=80"
              tint="#FBECC6"
              pill="#8A5A16"
              cta="Learn more"
              href="/culture"
              imageTop
              className="h-full"
            />
          </Reveal>
          <Reveal delay={0.06}>
            <WorkingAtCard
              title="How our teams grow careers, not just headcount"
              image="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1000&q=80"
              tint="#E7F2D8"
              pill="#4E7A22"
              cta="Learn more"
              href="/why-mindwhiz"
              imageTop
              className="h-full"
            />
          </Reveal>
          <Reveal delay={0.12}>
            <WorkingAtCard
              title="Create your MindWhiz talent profile"
              image="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=1000&q=80"
              tint="#D8E4FB"
              pill="#2F5BD1"
              cta="Learn more"
              href="/contact"
              className="h-full"
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Page shell
// ---------------------------------------------------------------------------
export default function CareersPage() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  useEffect(() => {
    const saved = localStorage.getItem("mw-theme");
    if (saved === "dark" || saved === "light") setTheme(saved);
  }, []);
  useEffect(() => {
    localStorage.setItem("mw-theme", theme);
  }, [theme]);

  return (
    <main className={`${sans.className} ${display.variable} bg-white text-black`}>
      <SiteHeader theme={theme} />

      <div className={theme === "dark" ? "theme-dark" : undefined}>
        <PageBanner
          image="https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1800&q=80"
          title={
            <>
              Build your <span className="text-[#9CCC3C]">career.</span>
            </>
          }
          subtitle="Join a global delivery team spanning the US, UK, and Pakistan. Do meaningful work, grow fast, and help thousands of businesses run better."
          primary={{ label: "See open roles", href: "#roles" }}
          secondary={{ label: "Life at MindWhiz", href: "#working" }}
        />

        <div id="roles">
          <RolesRail />
        </div>
        <LocationsSection />
        <FindYourTeam />
        <BenefitsSection />
        <div id="working">
          <WorkingAtSection />
        </div>

        <Footer />
      </div>
    </main>
  );
}
