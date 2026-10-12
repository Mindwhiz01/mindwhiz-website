"use client";

// ---------------------------------------------------------------------------
// Blog listing, featured post, category filter chips, a responsive card grid,
// and a newsletter CTA. Shares the MindWhiz brand system used across the site.
// ---------------------------------------------------------------------------

import { useEffect, useMemo, useState } from "react";
import { motion, type Variants } from "framer-motion";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import { ArrowUpRight, Mail } from "lucide-react";
import Footer from "@/components/Footer";
import { SiteHeader } from "@/components/SiteHeader";
import { BOOKING_URL, GREEN_CTA_CLASS, PageBanner } from "@/components/PageBanner";
import { posts, blogCategories, formatDate } from "@/lib/blog";

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

function PostCard({ post, delay = 0 }: { post: (typeof posts)[number]; delay?: number }) {
  return (
    <Reveal delay={delay} className="h-full">
      <a
        href={`/blog/${post.slug}`}
        className="group flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-black/10 bg-white transition-colors hover:border-black/30"
      >
        <div className="relative overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={post.image}
            alt={post.title}
            loading="lazy"
            className="h-52 w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-black backdrop-blur">
            {post.category}
          </span>
        </div>
        <div className="flex flex-1 flex-col p-7">
          <div className="flex items-center gap-2 text-xs text-black/50">
            <span>{formatDate(post.date)}</span>
            <span>·</span>
            <span>{post.readTime}</span>
          </div>
          <h3
            className="mt-3 text-xl font-bold leading-snug text-black"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {post.title}
          </h3>
          <p className="mt-3 flex-1 text-[15px] leading-relaxed text-black/65">{post.excerpt}</p>
        </div>
      </a>
    </Reveal>
  );
}

function FeaturedPost({ post }: { post: (typeof posts)[number] }) {
  return (
    <Reveal>
      <a
        href={`/blog/${post.slug}`}
        className="group grid overflow-hidden rounded-[2rem] border border-black/10 bg-white transition-colors hover:border-black/30 lg:grid-cols-2"
      >
        <div className="relative min-h-[300px] overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={post.image}
            alt={post.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <span className="absolute left-5 top-5 rounded-full bg-[#9CCC3C] px-3 py-1 text-xs font-semibold text-black">
            Featured
          </span>
        </div>
        <div className="flex flex-col justify-center p-8 sm:p-12">
          <div className="flex items-center gap-2 text-xs text-black/50">
            <span className="font-semibold text-[#ed1164]">{post.category}</span>
            <span>·</span>
            <span>{formatDate(post.date)}</span>
            <span>·</span>
            <span>{post.readTime}</span>
          </div>
          <h2
            className="mt-4 text-[clamp(1.8rem,3.2vw,2.8rem)] font-extrabold leading-[1.05] tracking-tight text-black"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {post.title}
          </h2>
          <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-black/65">{post.excerpt}</p>
          <div className="mt-7 flex items-center gap-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={post.author.avatar}
              alt={post.author.name}
              className="h-10 w-10 rounded-full object-cover"
            />
            <div>
              <p className="text-sm font-semibold text-black">{post.author.name}</p>
              <p className="text-xs text-black/55">{post.author.role}</p>
            </div>
          </div>
        </div>
      </a>
    </Reveal>
  );
}

function NewsletterCta() {
  return (
    <section className="bg-white pb-24">
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2.5rem] bg-[#383838] px-8 py-14 text-white sm:px-14">
            <div
              className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full blur-[130px]"
              style={{ backgroundColor: "#9CCC3C59" }}
            />
            <div className="relative flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
              <div>
                <span className="inline-flex items-center gap-2 rounded-full border border-white/20 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white/80">
                  <Mail className="h-3.5 w-3.5 text-[#9CCC3C]" />
                  Newsletter
                </span>
                <h2
                  className="mt-4 max-w-xl text-[clamp(1.8rem,3.5vw,2.8rem)] font-extrabold uppercase leading-[1] tracking-tight"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  Get our best ideas in your inbox
                </h2>
                <p className="mt-3 max-w-md text-[15px] leading-relaxed text-white/65">
                  Once a month. Practical takes on staffing, IT, and operations,
                  no spam, unsubscribe anytime.
                </p>
              </div>
              <a
                href="/newsletter"
                className="group inline-flex shrink-0 items-center gap-2 rounded-full bg-[#9CCC3C] px-4 py-2.5 text-sm font-semibold text-black"
              >
                Subscribe
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export default function BlogListPage({
  allPosts = posts,
}: {
  allPosts?: typeof posts;
} = {}) {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [category, setCategory] = useState<string>("All");

  useEffect(() => {
    const saved = localStorage.getItem("mw-theme");
    if (saved === "dark" || saved === "light") setTheme(saved);
  }, []);
  useEffect(() => {
    localStorage.setItem("mw-theme", theme);
  }, [theme]);

  const featured = useMemo(() => allPosts.find((p) => p.featured) ?? allPosts[0], [allPosts]);
  const rest = useMemo(
    () => allPosts.filter((p) => p.slug !== featured.slug),
    [allPosts, featured]
  );
  const filtered = useMemo(
    () => (category === "All" ? rest : rest.filter((p) => p.category === category)),
    [category, rest]
  );

  return (
    <main className={`${sans.className} ${display.variable} bg-white text-black`}>
      <SiteHeader theme={theme} />

      <div className={theme === "dark" ? "theme-dark" : undefined}>
        <PageBanner
          image="/images/stock/1499750310107-5fef28a66643-w1800.webp"
          h1="MindWhiz Blog: Staff Augmentation, IT Operations and Security Guides"
          titleLines={["The"]}
          rotateWords={["Blog", "Insights", "Guides", "Stories"]}
          highlightClassName="text-[#9CCC3C]"
          subtitle="Ideas, guides, and behind the scenes stories on hybrid staffing, IT operations, and building a team that scales."
          primary={{ label: "Subscribe", href: "/newsletter" }}
          secondary={{ label: "Book free consultation", href: BOOKING_URL, external: true, className: GREEN_CTA_CLASS }}
        />

        <section className="bg-white py-24" id="latest">
          <div className="mx-auto max-w-7xl px-6 sm:px-8">
            <FeaturedPost post={featured} />

            {/* category filter */}
            <Reveal>
              <div className="mt-16 flex flex-wrap gap-2">
                {blogCategories.map((c) => (
                  <button
                    key={c}
                    onClick={() => setCategory(c)}
                    className={`rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${
                      category === c
                        ? "border-black bg-black text-white"
                        : "border-black/15 text-black/70 hover:border-black/40"
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </Reveal>

            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((post, i) => (
                <PostCard key={post.slug} post={post} delay={(i % 3) * 0.06} />
              ))}
            </div>

            {filtered.length === 0 && (
              <p className="mt-10 text-center text-black/50">No posts in this category yet.</p>
            )}
          </div>
        </section>

        <NewsletterCta />

        <Footer />
      </div>
    </main>
  );
}
