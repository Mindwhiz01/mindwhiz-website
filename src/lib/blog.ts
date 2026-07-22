// ---------------------------------------------------------------------------
// Blog content, single source of truth for the /blog listing and the
// /blog/[slug] detail pages. Add a post by appending to `posts`.
// ---------------------------------------------------------------------------

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string; // ISO
  readTime: string;
  author: { name: string; role: string; avatar: string };
  image: string;
  featured?: boolean;
  // Body is an ordered list of blocks rendered on the detail page.
  body: Array<
    | { type: "p"; text: string }
    | { type: "h2"; text: string }
    | { type: "quote"; text: string }
    | { type: "list"; items: string[] }
  >;
};

const authors = {
  ali: {
    name: "Muhammad Ali",
    role: "Co-Founder & CEO",
    avatar:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=200&q=80",
  },
  aftab: {
    name: "Muhammad Aftab Zafar",
    role: "Chief Operating Officer",
    avatar:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=200&q=80",
  },
  team: {
    name: "MindWhiz Team",
    role: "Editorial",
    avatar:
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=200&q=80",
  },
};

export const blogCategories = [
  "All",
  "Staffing",
  "IT & Security",
  "Operations",
  "Culture",
] as const;

export const posts: BlogPost[] = [
  {
    slug: "hybrid-staffing-playbook",
    title: "The hybrid staffing playbook: scaling teams without the overhead",
    excerpt:
      "How growing businesses blend onshore and offshore talent to move faster, spend less, and stay in control, without sacrificing quality.",
    category: "Staffing",
    date: "2026-06-28",
    readTime: "7 min read",
    author: authors.ali,
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1400&q=80",
    featured: true,
    body: [
      { type: "p", text: "For years, the choice was binary: hire expensive in-house teams, or hand everything to an offshore vendor and hope for the best. Hybrid staffing rejects that trade-off." },
      { type: "h2", text: "What hybrid staffing actually means" },
      { type: "p", text: "A hybrid model pairs a small onshore core, people in your timezone who own strategy and client relationships, with a scalable offshore delivery team that handles execution around the clock." },
      { type: "list", items: [
        "Onshore leads own outcomes, SLAs, and communication.",
        "Offshore specialists deliver 24/7 with clear runbooks.",
        "A shared toolchain keeps everyone on the same page.",
      ] },
      { type: "quote", text: "The best hybrid teams feel like one team, the timezone is an advantage, not a barrier." },
      { type: "h2", text: "Where it pays off" },
      { type: "p", text: "IT support, monitoring, finance operations, and back-office work all benefit from continuous coverage. The result is faster resolution times and meaningful cost savings without cutting corners." },
    ],
  },
  {
    slug: "24-7-noc-monitoring-guide",
    title: "Inside a 24/7 NOC: what always-on monitoring really looks like",
    excerpt:
      "A behind-the-scenes look at how a network operations center keeps systems healthy, the tooling, the runbooks, and the people behind the dashboards.",
    category: "IT & Security",
    date: "2026-06-14",
    readTime: "6 min read",
    author: authors.aftab,
    image:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1400&q=80",
    body: [
      { type: "p", text: "Uptime isn't luck. Behind every reliable system is a network operations center quietly catching problems before your users ever notice them." },
      { type: "h2", text: "The three layers of coverage" },
      { type: "list", items: [
        "Detection: real-time alerts tuned to cut out the noise.",
        "Triage: named owners with clear escalation paths.",
        "Resolution: documented runbooks for fast, consistent fixes.",
      ] },
      { type: "p", text: "The magic isn't a single tool, it's the discipline of running the same tight loop every hour of every day." },
      { type: "quote", text: "A good NOC is boring on purpose. Boring means nothing broke." },
    ],
  },
  {
    slug: "cutting-cloud-costs",
    title: "Five ways we cut cloud spend by 30% without downtime",
    excerpt:
      "Cloud bills creep up quietly. Here are the practical, low-risk moves our engineers use to reclaim budget while keeping everything running.",
    category: "Operations",
    date: "2026-05-30",
    readTime: "5 min read",
    author: authors.team,
    image:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1400&q=80",
    body: [
      { type: "p", text: "Most cloud waste isn't dramatic, it's a thousand small inefficiencies. Fixing them is safer and more rewarding than a risky re-architecture." },
      { type: "list", items: [
        "Right-size instances against real usage, not guesses.",
        "Kill idle and orphaned resources on a schedule.",
        "Commit to savings plans for steady baseline load.",
        "Move cold data to cheaper storage tiers.",
        "Set budgets and alerts so surprises never happen again.",
      ] },
      { type: "quote", text: "The cheapest resource is the one you turned off." },
    ],
  },
  {
    slug: "building-culture-across-timezones",
    title: "Building one culture across three time zones",
    excerpt:
      "Remote and distributed doesn't have to mean disconnected. How we keep the MindWhiz team feeling like family across the US, UK, and Pakistan.",
    category: "Culture",
    date: "2026-05-16",
    readTime: "4 min read",
    author: authors.ali,
    image:
      "https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&w=1400&q=80",
    body: [
      { type: "p", text: "Culture doesn't happen by accident when your team spans continents. It's built deliberately, in the small daily rituals." },
      { type: "h2", text: "Async by default, human always" },
      { type: "p", text: "We write things down, celebrate wins publicly, and make room for the human moments, birthdays, milestones, and the occasional office party that spans a video call." },
      { type: "quote", text: "You can't ship great work if people don't feel like they belong." },
    ],
  },
  {
    slug: "endpoint-security-basics",
    title: "Endpoint security basics every small business gets wrong",
    excerpt:
      "The unglamorous fundamentals that stop most attacks, and why so many growing companies skip them until it's too late.",
    category: "IT & Security",
    date: "2026-04-29",
    readTime: "6 min read",
    author: authors.aftab,
    image:
      "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1400&q=80",
    body: [
      { type: "p", text: "The headlines are about sophisticated attacks. The reality is that most breaches start with a missed patch or a reused password." },
      { type: "list", items: [
        "Enforce disk encryption on every device.",
        "Automate patching, don't rely on people to click update.",
        "Require MFA everywhere, no exceptions.",
        "Have a plan for lost and stolen laptops.",
      ] },
      { type: "quote", text: "Security isn't a product you buy. It's a habit you keep." },
    ],
  },
  {
    slug: "faster-onboarding-remote-specialists",
    title: "How we onboard a remote specialist in under two weeks",
    excerpt:
      "Speed-to-productivity is the whole game in staff augmentation. Here's the repeatable process that gets new hires shipping fast.",
    category: "Staffing",
    date: "2026-04-11",
    readTime: "5 min read",
    author: authors.team,
    image:
      "https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?auto=format&fit=crop&w=1400&q=80",
    body: [
      { type: "p", text: "A specialist who takes two months to get productive isn't augmenting your team, they're a tax on it. We designed our onboarding to avoid exactly that." },
      { type: "h2", text: "The two-week runway" },
      { type: "list", items: [
        "Week one: access, context, and shadowing real tickets.",
        "Week two: supervised ownership with a named buddy.",
        "Day fifteen: fully independent, measured against clear KPIs.",
      ] },
      { type: "quote", text: "Onboarding is a product. We iterate on it like one." },
    ],
  },
];

export function getPost(slug: string): BlogPost | undefined {
  return posts.find((p) => p.slug === slug);
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
