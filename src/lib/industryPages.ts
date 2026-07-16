import type { ServicePageContent } from "@/lib/servicePages";

// Industry detail pages reuse the ServicePageContent shape so they can render
// through the shared ServiceDetailPage component. `group` holds the mega-menu
// category (Technology & Digital, Built & Physical, etc.).

const cap = {
  a: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=900&q=80",
  b: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=80",
  c: "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=900&q=80",
  d: "https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=900&q=80",
  e: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=900&q=80",
  f: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=900&q=80",
};

const finalCta = {
  title: "Build your hybrid team now.",
  desc: "Tell us what you are trying to achieve. Mindwhiz will respond with the right people, the right approach, and a clear next step.",
  button: "Get in touch",
};

export const industryPages: ServicePageContent[] = [
  {
    slug: "information-technology",
    name: "Information Technology",
    sourceUrl: "https://mindwhiz.com/industries/",
    group: "Technology & Digital",
    hero: {
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1800&q=80",
      title: ["Powering"],
      highlight: "Technology",
      subtitle:
        "Software, cloud, and cybersecurity teams that help IT companies ship faster and run secure, tech-powered infrastructure at scale.",
      cta: "Talk to an IT expert",
    },
    intro: {
      kicker: "Technology & Digital",
      title: "Engineering capacity that scales with your roadmap.",
      body: [
        "We embed vetted engineers, DevOps, and security specialists into IT and software teams so delivery keeps pace with demand.",
        "From cloud migrations to 24/7 monitoring, MindWhiz keeps your infrastructure reliable, compliant, and cost-efficient.",
      ],
    },
    proof: [
      { value: "24/7", label: "Monitoring and support coverage" },
      { value: "500+", label: "Vetted technology specialists" },
      { value: "30%", label: "Lower blended engineering cost" },
      { value: "SOC 2", label: "Security-aligned delivery" },
    ],
    capabilities: [
      { title: "Cloud & Infrastructure", desc: "Design, migration, and managed operations across AWS, Azure, and GCP.", image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=900&q=80" },
      { title: "Software Engineering", desc: "Full-stack developers and QA who plug into your sprints and standards.", image: cap.a },
      { title: "Cybersecurity", desc: "Threat monitoring, endpoint protection, and compliance-aligned controls.", image: cap.b },
      { title: "DevOps & Automation", desc: "CI/CD pipelines and automated delivery that reduce release risk.", image: cap.c },
    ],
    benefits: [
      { title: "Faster Delivery", desc: "Add engineering capacity in weeks so your roadmap never waits on hiring." },
      { title: "Secure By Design", desc: "SOC 2 and ISO 27001 aligned practices protect data and systems." },
      { title: "Hybrid Teams", desc: "Onshore and offshore specialists that stay aligned across time zones." },
      { title: "Predictable Cost", desc: "Transparent monthly rates that scale with your team and workload." },
    ],
    process: [
      { title: "Discovery & Assessment", desc: "We review your stack, goals, and gaps to define outcomes and SLAs." },
      { title: "Team Design", desc: "A blend of engineering, DevOps, and security roles matched to your needs." },
      { title: "Integration", desc: "We connect into your workflows, tooling, and security standards." },
    ],
    finalCta,
  },
  {
    slug: "ecommerce-retail",
    name: "E-commerce & Retail",
    sourceUrl: "https://mindwhiz.com/industries/",
    group: "Technology & Digital",
    hero: {
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1800&q=80",
      title: ["Retail That"],
      highlight: "Scales",
      subtitle:
        "Catalog, customer support, and operations teams that keep online and retail businesses running smoothly around the clock.",
      cta: "Scale your store",
    },
    intro: {
      kicker: "Technology & Digital",
      title: "Operations that keep every order moving.",
      body: [
        "MindWhiz supports e-commerce and retail brands with catalog management, customer service, and back-office operations.",
        "We help you handle peak demand, protect margins, and deliver a consistent experience across every channel.",
      ],
    },
    proof: [
      { value: "24/7", label: "Customer support coverage" },
      { value: "30%", label: "Lower operations cost" },
      { value: "99%", label: "Order and catalog accuracy" },
      { value: "Peak", label: "Ready for seasonal surges" },
    ],
    capabilities: [
      { title: "Catalog Management", desc: "Accurate product data, listings, and merchandising across marketplaces.", image: cap.a },
      { title: "Customer Support", desc: "Omnichannel service across chat, email, and phone that protects loyalty.", image: cap.f },
      { title: "Order Operations", desc: "Order processing, returns, and fulfillment coordination that scale.", image: cap.b },
      { title: "Performance Marketing", desc: "Paid, SEO, and CRM operations that turn traffic into repeat revenue.", image: cap.d },
    ],
    benefits: [
      { title: "Handle Peak Demand", desc: "Flex support and operations up for launches and holidays without overhiring." },
      { title: "Protect Margins", desc: "Efficient offshore and hybrid delivery keeps operating costs in check." },
      { title: "Consistent Experience", desc: "Trained teams keep service quality steady across every channel." },
      { title: "Faster Time To Market", desc: "Get catalogs, campaigns, and support live quickly." },
    ],
    process: [
      { title: "Store & Ops Review", desc: "We map your channels, tools, and volumes to define support outcomes." },
      { title: "Team Design", desc: "A mix of support, catalog, and ops roles matched to your season." },
      { title: "Integration", desc: "We connect into your platform, helpdesk, and SOPs." },
    ],
    finalCta,
  },
  {
    slug: "startups-smbs",
    name: "Startups & SMBs",
    sourceUrl: "https://mindwhiz.com/industries/",
    group: "Technology & Digital",
    hero: {
      image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1800&q=80",
      title: ["Teams That"],
      highlight: "Scale",
      subtitle:
        "Flexible, cost-effective talent that lets startups and small businesses move fast without the overhead of building every function in-house.",
      cta: "Grow your team",
    },
    intro: {
      kicker: "Technology & Digital",
      title: "Punch above your size.",
      body: [
        "MindWhiz gives startups and SMBs on-demand access to engineering, operations, and support talent that grows exactly as fast as you do.",
        "Skip long hiring cycles and fixed overhead while still getting senior, dedicated people on your account.",
      ],
    },
    proof: [
      { value: "2 wks", label: "From brief to onboarded talent" },
      { value: "30%", label: "Lower cost than local hiring" },
      { value: "Flexible", label: "Scale up or down anytime" },
      { value: "Senior", label: "Dedicated, vetted specialists" },
    ],
    capabilities: [
      { title: "Engineering On Demand", desc: "Developers and DevOps who ship product without a full-time commitment.", image: cap.c },
      { title: "Back-Office Support", desc: "Finance, admin, and operations handled so founders can focus on growth.", image: cap.a },
      { title: "Customer Support", desc: "Responsive service that scales as your customer base grows.", image: cap.f },
      { title: "Growth & Marketing", desc: "SEO, campaigns, and CRM operations that build a repeatable pipeline.", image: cap.d },
    ],
    benefits: [
      { title: "Move Fast", desc: "Add capacity in weeks instead of months of recruiting." },
      { title: "Stay Lean", desc: "Pay for the capacity you need with no fixed overhead." },
      { title: "Senior Talent", desc: "Role-ready specialists, not junior generalists." },
      { title: "Grow Flexibly", desc: "Scale exactly as fast as your traction allows." },
    ],
    process: [
      { title: "Needs & Goals", desc: "We learn your product, stage, and priorities to define outcomes." },
      { title: "Right-Sized Team", desc: "A lean blend of roles matched to your runway and roadmap." },
      { title: "Onboarding", desc: "Talent connects into your tools and workflows quickly." },
    ],
    finalCta,
  },
  {
    slug: "construction-engineering",
    name: "Construction & Engineering",
    sourceUrl: "https://mindwhiz.com/industries/",
    group: "Built & Physical",
    hero: {
      image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1800&q=80",
      title: ["Win More"],
      highlight: "Bids",
      subtitle:
        "Estimation, takeoffs, and engineering support that speed up bids, control costs, and keep construction projects moving.",
      cta: "Request an estimate",
    },
    intro: {
      kicker: "Built & Physical",
      title: "Quote more work, without the overhead.",
      body: [
        "MindWhiz gives construction and engineering firms vetted offshore estimators and support teams that deliver fast, accurate takeoffs.",
        "Win more bids, keep projects on schedule, and scale delivery without carrying the fixed cost of in-house capacity.",
      ],
    },
    proof: [
      { value: "2x", label: "More bids quoted per week" },
      { value: "48h", label: "Typical takeoff turnaround" },
      { value: "30%", label: "Lower estimating cost" },
      { value: "Accurate", label: "Bid-ready cost estimates" },
    ],
    capabilities: [
      { title: "Quantity Takeoffs", desc: "Fast, accurate material and labor takeoffs across trades.", image: cap.b },
      { title: "Cost Estimation", desc: "Bid-ready estimates built around current pricing and scope.", image: cap.a },
      { title: "Engineering Support", desc: "Drafting, BIM, and documentation that keep projects moving.", image: cap.c },
      { title: "Back-Office Operations", desc: "Bid coordination, procurement, and reporting handled for your team.", image: cap.e },
    ],
    benefits: [
      { title: "Win More Work", desc: "Quote more bids, faster, without adding headcount." },
      { title: "Control Costs", desc: "Reduce estimating overhead while improving accuracy." },
      { title: "Stay On Schedule", desc: "Reliable support keeps projects and deadlines on track." },
      { title: "Scale Flexibly", desc: "Add capacity for busy seasons and scale down after." },
    ],
    process: [
      { title: "Scope & Standards", desc: "We align on trades, formats, and accuracy expectations." },
      { title: "Team Setup", desc: "Estimators and engineers matched to your project types." },
      { title: "Integration", desc: "We connect into your takeoff tools and bid workflows." },
    ],
    finalCta,
  },
  {
    slug: "real-estate",
    name: "Real Estate",
    sourceUrl: "https://mindwhiz.com/industries/",
    group: "Built & Physical",
    hero: {
      image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1800&q=80",
      title: ["Property"],
      highlight: "Support",
      subtitle:
        "Listing, transaction, and operations support that keeps real estate and property management teams focused on deals, not admin.",
      cta: "Streamline operations",
    },
    intro: {
      kicker: "Built & Physical",
      title: "Close more, coordinate less.",
      body: [
        "MindWhiz supports real estate and property teams with listing management, transaction coordination, and back-office operations.",
        "Free your agents and managers to focus on clients and deals while we handle the process work behind them.",
      ],
    },
    proof: [
      { value: "24/7", label: "Operations and support coverage" },
      { value: "30%", label: "Lower back-office cost" },
      { value: "Faster", label: "Listing and transaction turnaround" },
      { value: "Accurate", label: "Documentation and records" },
    ],
    capabilities: [
      { title: "Listing Management", desc: "Accurate listings, media coordination, and portal updates.", image: cap.a },
      { title: "Transaction Coordination", desc: "Documents, deadlines, and compliance handled end to end.", image: cap.b },
      { title: "Marketing Support", desc: "Campaigns, CRM, and content that keep pipelines full.", image: cap.d },
      { title: "Back-Office Operations", desc: "Bookkeeping, reporting, and admin for property teams.", image: cap.e },
    ],
    benefits: [
      { title: "Focus On Deals", desc: "Agents spend time with clients, not paperwork." },
      { title: "Lower Overhead", desc: "Efficient support reduces back-office cost." },
      { title: "Faster Turnaround", desc: "Listings and transactions move without bottlenecks." },
      { title: "Reliable Records", desc: "Accurate, compliant documentation you can trust." },
    ],
    process: [
      { title: "Process Review", desc: "We map your listing and transaction workflows and tools." },
      { title: "Team Setup", desc: "Coordinators and support matched to your volume." },
      { title: "Integration", desc: "We connect into your CRM, forms, and compliance steps." },
    ],
    finalCta,
  },
  {
    slug: "industrial-manufacturing",
    name: "Industrial Manufacturing",
    sourceUrl: "https://mindwhiz.com/industries/",
    group: "Built & Physical",
    hero: {
      image: "https://images.unsplash.com/photo-1565043666747-69f6646db940?auto=format&fit=crop&w=1800&q=80",
      title: ["Built To"],
      highlight: "Run",
      subtitle:
        "Engineering, back-office, and IT support that keep manufacturing operations efficient, connected, and running at capacity.",
      cta: "Optimize operations",
    },
    intro: {
      kicker: "Built & Physical",
      title: "Keep the line moving.",
      body: [
        "MindWhiz supports manufacturers with engineering documentation, IT operations, and back-office teams that reduce downtime.",
        "We help you connect systems, control costs, and scale support as production demand changes.",
      ],
    },
    proof: [
      { value: "24/7", label: "IT and operations coverage" },
      { value: "30%", label: "Lower support cost" },
      { value: "Uptime", label: "Reliable systems and processes" },
      { value: "Scalable", label: "Capacity that flexes with output" },
    ],
    capabilities: [
      { title: "Engineering Support", desc: "CAD, documentation, and process support for production teams.", image: cap.b },
      { title: "IT & Systems", desc: "Network, ERP, and endpoint support that keep the floor connected.", image: cap.c },
      { title: "Supply & Procurement", desc: "Vendor coordination, purchasing, and inventory operations.", image: cap.e },
      { title: "Back-Office Operations", desc: "Finance, reporting, and admin handled for lean plants.", image: cap.a },
    ],
    benefits: [
      { title: "Reduce Downtime", desc: "Proactive IT and support keep systems and lines running." },
      { title: "Control Costs", desc: "Efficient support lowers operating overhead." },
      { title: "Connected Systems", desc: "Integrated tools and data across the operation." },
      { title: "Flexible Capacity", desc: "Scale support with production volume." },
    ],
    process: [
      { title: "Operations Review", desc: "We assess systems, workflows, and support gaps." },
      { title: "Team Design", desc: "Engineering, IT, and ops roles matched to your plant." },
      { title: "Integration", desc: "We connect into your ERP, tooling, and standards." },
    ],
    finalCta,
  },
  {
    slug: "accounting-finance",
    name: "Accounting & Finance",
    sourceUrl: "https://mindwhiz.com/industries/",
    group: "Finance & Services",
    hero: {
      image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1800&q=80",
      title: ["Close The"],
      highlight: "Books",
      subtitle:
        "Bookkeeping, reporting, and finance operations handled by vetted professionals, so your close is faster and your data is clean.",
      cta: "Talk to finance",
    },
    intro: {
      kicker: "Finance & Services",
      title: "Finance operations that scale with you.",
      body: [
        "MindWhiz supports finance teams with bookkeeping, AP/AR, payroll, and reporting delivered by vetted accountants.",
        "Get accurate numbers, faster closes, and up to 40% lower back-office cost without sacrificing control.",
      ],
    },
    proof: [
      { value: "40%", label: "Lower back-office cost" },
      { value: "Faster", label: "Month-end closes" },
      { value: "99%", label: "Reconciliation accuracy" },
      { value: "SOC 2", label: "Controls-aligned delivery" },
    ],
    capabilities: [
      { title: "Bookkeeping", desc: "Clean, current books with reconciliations you can rely on.", image: cap.a },
      { title: "AP / AR", desc: "Payables and receivables managed for healthy cash flow.", image: cap.b },
      { title: "Payroll", desc: "Accurate, compliant payroll processing on schedule.", image: cap.e },
      { title: "Reporting & FP&A", desc: "Dashboards and analysis that inform better decisions.", image: cap.d },
    ],
    benefits: [
      { title: "Faster Closes", desc: "Structured processes shorten month-end cycles." },
      { title: "Lower Cost", desc: "Up to 40% savings versus in-house back office." },
      { title: "Clean Data", desc: "Accurate books and reporting you can trust." },
      { title: "Stay Compliant", desc: "Controls-aligned delivery reduces risk." },
    ],
    process: [
      { title: "Finance Review", desc: "We map your systems, cadence, and reporting needs." },
      { title: "Team Setup", desc: "Accountants matched to your tools and volume." },
      { title: "Integration", desc: "We connect into your ledger, banking, and controls." },
    ],
    finalCta,
  },
  {
    slug: "professional-services",
    name: "Professional Services",
    sourceUrl: "https://mindwhiz.com/industries/",
    group: "Finance & Services",
    hero: {
      image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1800&q=80",
      title: ["Deliver"],
      highlight: "More",
      subtitle:
        "Research, operations, and back-office support that let consulting and professional services firms take on more work with confidence.",
      cta: "Add capacity",
    },
    intro: {
      kicker: "Finance & Services",
      title: "Deliver more without diluting quality.",
      body: [
        "MindWhiz gives professional services firms vetted analysts and support teams that extend delivery capacity on demand.",
        "Take on more engagements, protect utilization, and keep quality high while we handle the supporting work.",
      ],
    },
    proof: [
      { value: "2 wks", label: "To onboarded support" },
      { value: "30%", label: "Lower delivery cost" },
      { value: "Flexible", label: "Scale with engagements" },
      { value: "Vetted", label: "Analysts and specialists" },
    ],
    capabilities: [
      { title: "Research & Analysis", desc: "Market, data, and desk research that sharpens client work.", image: cap.d },
      { title: "Operations Support", desc: "Project coordination, scheduling, and delivery operations.", image: cap.f },
      { title: "Back-Office", desc: "Finance, admin, and reporting that keep the firm running.", image: cap.a },
      { title: "Presentation & Docs", desc: "Decks, reports, and documentation built to your standards.", image: cap.b },
    ],
    benefits: [
      { title: "Protect Utilization", desc: "Support work handled so senior staff stay billable." },
      { title: "Take On More", desc: "Extend capacity to win and deliver more engagements." },
      { title: "Keep Quality High", desc: "Vetted specialists trained to your standards." },
      { title: "Flexible Scaling", desc: "Ramp support with your engagement pipeline." },
    ],
    process: [
      { title: "Needs Review", desc: "We map your delivery model and support gaps." },
      { title: "Team Setup", desc: "Analysts and coordinators matched to your practice." },
      { title: "Integration", desc: "We connect into your tools, templates, and process." },
    ],
    finalCta,
  },
  {
    slug: "logistics-supply-chain",
    name: "Logistics & Supply Chain",
    sourceUrl: "https://mindwhiz.com/industries/",
    group: "Finance & Services",
    hero: {
      image: "https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&w=1800&q=80",
      title: ["Keep Goods"],
      highlight: "Moving",
      subtitle:
        "Coordination, tracking, and back-office support that keep logistics and supply chain operations running without gaps.",
      cta: "Streamline logistics",
    },
    intro: {
      kicker: "Finance & Services",
      title: "Operations that never stop.",
      body: [
        "MindWhiz supports logistics and supply chain teams with dispatch coordination, tracking, and back-office operations.",
        "We help you reduce delays, control cost, and keep visibility across every shipment and partner.",
      ],
    },
    proof: [
      { value: "24/7", label: "Coordination coverage" },
      { value: "30%", label: "Lower operations cost" },
      { value: "Visibility", label: "Tracking across the chain" },
      { value: "Reliable", label: "On-time coordination" },
    ],
    capabilities: [
      { title: "Dispatch & Coordination", desc: "Load, carrier, and route coordination across time zones.", image: cap.b },
      { title: "Track & Trace", desc: "Shipment tracking and exception handling that reduce delays.", image: cap.c },
      { title: "Vendor & Procurement", desc: "Supplier coordination and purchasing operations.", image: cap.e },
      { title: "Back-Office Operations", desc: "Billing, documentation, and reporting handled for your team.", image: cap.a },
    ],
    benefits: [
      { title: "Reduce Delays", desc: "Proactive coordination keeps freight on schedule." },
      { title: "Control Cost", desc: "Efficient support lowers operating overhead." },
      { title: "Full Visibility", desc: "Tracking and reporting across the supply chain." },
      { title: "Round-The-Clock", desc: "Coverage that matches global operations." },
    ],
    process: [
      { title: "Operations Review", desc: "We map your lanes, partners, and systems." },
      { title: "Team Setup", desc: "Coordinators and support matched to your volume." },
      { title: "Integration", desc: "We connect into your TMS and communication tools." },
    ],
    finalCta,
  },
  {
    slug: "healthcare-healthtech",
    name: "Healthcare & HealthTech",
    sourceUrl: "https://mindwhiz.com/industries/",
    group: "Healthcare",
    hero: {
      image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1800&q=80",
      title: ["Compliant"],
      highlight: "Care",
      subtitle:
        "Talent and operations support for care operations and health technology platforms, delivered with compliance built in.",
      cta: "Talk to healthcare",
    },
    intro: {
      kicker: "Healthcare",
      title: "Care operations you can trust.",
      body: [
        "MindWhiz supports healthcare and HealthTech organizations with back-office, IT, and support teams that respect compliance.",
        "We help you scale operations and technology while protecting patient data and meeting regulatory standards.",
      ],
    },
    proof: [
      { value: "24/7", label: "Support and operations coverage" },
      { value: "HIPAA", label: "Compliance-aligned delivery" },
      { value: "30%", label: "Lower back-office cost" },
      { value: "Accurate", label: "Records and documentation" },
    ],
    capabilities: [
      { title: "Revenue Cycle", desc: "Billing, coding support, and claims operations that protect revenue.", image: cap.a },
      { title: "IT & HealthTech", desc: "Platform support, integrations, and monitoring for health systems.", image: cap.c },
      { title: "Patient Support", desc: "Scheduling and service operations that improve access.", image: cap.f },
      { title: "Compliance & Records", desc: "Accurate documentation aligned with HIPAA standards.", image: cap.b },
    ],
    benefits: [
      { title: "Stay Compliant", desc: "HIPAA-aligned processes protect patient data." },
      { title: "Lower Cost", desc: "Efficient support reduces back-office overhead." },
      { title: "Scale Safely", desc: "Grow operations without compromising standards." },
      { title: "Reliable Records", desc: "Accurate documentation and reporting." },
    ],
    process: [
      { title: "Compliance Review", desc: "We align on regulatory, security, and data requirements." },
      { title: "Team Setup", desc: "Support and IT roles matched to your operations." },
      { title: "Integration", desc: "We connect into your systems with compliant controls." },
    ],
    finalCta,
  },
];

export function getIndustryPage(slug: string) {
  return industryPages.find((page) => page.slug === slug);
}
