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
  title: "Build your hybrid team now",
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
      image: "/banners/information-technology.png",
      title: ["Powering"],
      highlight: "Technology",
      subtitle:
        "Software, cloud, and cybersecurity teams that help IT companies ship faster and run secure, tech-powered infrastructure at scale.",
      cta: "Talk to an IT expert",
    },
    intro: {
      kicker: "Technology & Digital",
      title: "IT staffing and managed services",
      body: [
        "We embed vetted engineers, DevOps, and security specialists into IT and software teams so delivery keeps pace with demand.",
        "From cloud migrations to 24/7 monitoring, MindWhiz keeps your infrastructure reliable, compliant, and cost-efficient.",
      ],
      card: {
        tags: ["Scaling Pains", "Delivery Risk"],
        image: "/service-coverage/cloud-infrastructure/secure-backups-storage.png",
        title: "Stretched IT Teams",
        desc: "Growing roadmaps outpace in-house capacity, slowing delivery and stretching engineers thin.",
        cta: "Talk to expert",
      },
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
    faqs: [
      {
        q: "What kinds of technology companies do you work with?",
        a: "Software firms, managed service providers, SaaS products, and internal IT functions, typically where the team is stretched across support, infrastructure, and delivery at the same time and something is being neglected.",
      },
      {
        q: "Can you extend our existing engineering team rather than replace it?",
        a: "That is the usual arrangement. Our people join your standups, tools, and workflow under your direction, which keeps context and ownership inside your team.",
      },
      {
        q: "Can you cover our working hours?",
        a: "Yes. Coverage is aligned to your time zone, including overlap with UK and US teams, and round-the-clock cover is available where operations require it.",
      },
      {
        q: "How do you handle security and intellectual property?",
        a: "Under signed agreements, with scoped access to only the systems required, and delivery aligned to SOC 2 and ISO 27001 practices. Code and data remain yours throughout.",
      },
      {
        q: "How does an engagement start?",
        a: "With a consultation to understand the environment, the gaps, and the outcome you want. You get a scoped plan and clear next step before any commitment.",
      },
    ],
    finalCta,
  },
  {
    slug: "ecommerce-retail",
    name: "Ecommerce & Retail",
    sourceUrl: "https://mindwhiz.com/industries/",
    group: "Technology & Digital",
    hero: {
      image: "/banners/ecommerce-retail.png",
      title: ["Retail That"],
      highlight: "Scales",
      subtitle:
        "Catalog, customer support, and operations teams that keep online and retail businesses running smoothly around the clock.",
      cta: "Scale your store",
    },
    intro: {
      kicker: "Technology & Digital",
      title: "Ecommerce and retail outsourcing",
      body: [
        "MindWhiz supports ecommerce and retail brands with catalog management, customer service, and back-office operations.",
        "We help you handle peak demand, protect margins, and deliver a consistent experience across every channel.",
      ],
      card: {
        tags: ["Order Backlogs", "Support Load"],
        image: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=1800&q=80",
        title: "Operations Overload",
        desc: "Order spikes, returns, and support volume overwhelm lean teams and hurt the customer experience.",
        cta: "Talk to expert",
      },
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
    faqs: [
      {
        q: "Can you support us through peak trading periods?",
        a: "That is when the support matters most. Coverage runs continuously, so traffic spikes, checkout failures, and stock issues during a sale or holiday period are picked up as they happen rather than the next morning.",
      },
      {
        q: "Which platforms do you work with?",
        a: "The common commerce stacks, Shopify, WooCommerce, Magento, and custom storefronts, along with the hosting and infrastructure underneath them.",
      },
      {
        q: "Can you help with payment security and PCI concerns?",
        a: "We support the technical controls involved, segmentation, access control, monitoring, patching, and evidence collection, and work alongside your assessor. We support your compliance programme rather than certify it for you.",
      },
      {
        q: "Can you connect our store to our other systems?",
        a: "Yes. Integrations between storefront, ERP, inventory, and fulfilment or 3PL systems are common work, and are usually where manual effort and stock errors get eliminated.",
      },
      {
        q: "What happens if the site goes down outside business hours?",
        a: "It is treated as an incident immediately. Monitoring runs continuously, alerts are triaged as they arrive, and agreed escalation paths mean the right people are reached without waiting for the office to open.",
      },
    ],
    finalCta,
  },
  {
    slug: "startups-smbs",
    name: "Startups & SMBs",
    sourceUrl: "https://mindwhiz.com/industries/",
    group: "Technology & Digital",
    hero: {
      image: "/banners/startups-smbs.png",
      title: ["Teams That"],
      highlight: "Scale",
      subtitle:
        "Flexible, cost-effective talent that lets startups and small businesses move fast without the overhead of building every function in-house.",
      cta: "Grow your team",
    },
    intro: {
      kicker: "Technology & Digital",
      title: "Outsourced teams for startups",
      body: [
        "MindWhiz gives startups and SMBs on-demand access to engineering, operations, and support talent that grows exactly as fast as you do.",
        "Skip long hiring cycles and fixed overhead while still getting senior, dedicated people on your account.",
      ],
      card: {
        tags: ["Tight Runway", "Hiring Overhead"],
        image: "/service-coverage/cloud-infrastructure/scalable-infrastructure.png",
        title: "Scaling Too Slow",
        desc: "Long hiring cycles and fixed overhead hold back startups that need to move fast on a lean budget.",
        cta: "Talk to expert",
      },
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
    faqs: [
      {
        q: "We have no internal IT team. Can you be it?",
        a: "Yes. For smaller teams we act as the whole IT function, devices, accounts, support, security, and infrastructure, so nobody on your team has to absorb it alongside their real job.",
      },
      {
        q: "Is this affordable at our size?",
        a: "Pricing is per user on a fixed monthly cost, so it stays proportionate to your headcount and predictable month to month. It is designed to cost less than carrying the equivalent in-house.",
      },
      {
        q: "Can the service grow as we grow?",
        a: "That is the point of the model. Coverage scales with team size and complexity, so you are not re-procuring IT every time you add people or open a location.",
      },
      {
        q: "Are we tied into a long contract?",
        a: "Terms are agreed up front and kept clear, including how to change or exit. We would rather be kept because the service works than because the paperwork makes leaving difficult.",
      },
      {
        q: "Can you help us meet the security expectations of larger customers?",
        a: "Yes, and it is a common reason smaller firms come to us. Access control, endpoint protection, monitoring, and documented process are what enterprise buyers and investors ask for during due diligence, and delivery is aligned to SOC 2 and ISO 27001 practices.",
      },
    ],
    finalCta,
  },
  {
    slug: "construction-engineering",
    name: "Construction & Engineering",
    sourceUrl: "https://mindwhiz.com/industries/",
    group: "Built & Physical",
    hero: {
      image: "/banners/construction-engineering.png",
      title: ["Win More"],
      highlight: "Bids",
      subtitle:
        "Estimation, takeoffs, and engineering support that speed up bids, control costs, and keep construction projects moving.",
      cta: "Request an estimate",
    },
    intro: {
      kicker: "Built & Physical",
      title: "Construction and engineering support",
      body: [
        "MindWhiz gives construction and engineering firms vetted offshore estimators and support teams that deliver fast, accurate takeoffs.",
        "Win more bids, keep projects on schedule, and scale delivery without carrying the fixed cost of in-house capacity.",
      ],
      card: {
        tags: ["Slow Bids", "Estimating Load"],
        image: "https://images.unsplash.com/photo-1581092921461-eab62e97a780?auto=format&fit=crop&w=1800&q=80",
        title: "Missed Bids",
        desc: "Slow, costly estimating limits how many bids you can quote and win each week.",
        cta: "Talk to expert",
      },
    },
    proof: [
      { value: "2x", label: "More bids quoted per week" },
      { value: "48h", label: "Typical takeoff turnaround" },
      { value: "30%", label: "Lower estimating cost" },
      { value: "Accurate", label: "Bid-ready cost estimates" },
    ],
    capabilities: [
      { title: "Quantity Takeoffs", desc: "Fast, accurate material and labor takeoffs across trades.", image: "/industries/construction/quantity-takeoffs.png" },
      { title: "Cost Estimation", desc: "Bid-ready estimates built around current pricing and scope.", image: "/industries/construction/cost-estimation.png" },
      { title: "Engineering Support", desc: "Drafting, BIM, and documentation that keep projects moving.", image: "/industries/construction/engineering-support.png" },
      { title: "Back-Office Operations", desc: "Bid coordination, procurement, and reporting handled for your team.", image: "/industries/construction/back-office-operations.png" },
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
    faqs: [
      {
        q: "What do you actually provide for construction firms?",
        a: "Two things that usually sit apart: pre-construction support such as estimation and quantity takeoffs, and the IT side, site connectivity, devices, and support for teams split between office and field.",
      },
      {
        q: "Which software do you work in?",
        a: "The industry standards, including Bluebeam, PlanSwift, AutoCAD, and Revit, along with the estimating and project tools your team already uses.",
      },
      {
        q: "How do you handle drawing revisions and addenda?",
        a: "Revisions are tracked against the original scope so changes are visible rather than silently absorbed, and updated quantities are reissued with what changed made explicit.",
      },
      {
        q: "Can you support crews working on site?",
        a: "Yes. Site connectivity, mobile devices, and remote support are covered, so field teams are not cut off from systems while they are away from the office.",
      },
      {
        q: "How is estimation work priced?",
        a: "It is scoped per project or on an ongoing basis depending on your bid volume, with the basis of the quote itemized up front so you can see what is included before committing.",
      },
    ],
    finalCta,
  },
  {
    slug: "real-estate",
    name: "Real Estate",
    sourceUrl: "https://mindwhiz.com/industries/",
    group: "Built & Physical",
    hero: {
      image: "/banners/real-estate.png",
      title: ["Property"],
      highlight: "Support",
      subtitle:
        "Listing, transaction, and operations support that keeps real estate and property management teams focused on deals, not admin.",
      cta: "Streamline operations",
    },
    intro: {
      kicker: "Built & Physical",
      title: "Real estate back office support",
      body: [
        "MindWhiz supports real estate and property teams with listing management, transaction coordination, and back-office operations.",
        "Free your agents and managers to focus on clients and deals while we handle the process work behind them.",
      ],
      card: {
        tags: ["Admin Overload", "Slow Deals"],
        image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1800&q=80",
        title: "Coordination Drag",
        desc: "Manual admin and back-office work slow deals and pull your team away from clients.",
        cta: "Talk to expert",
      },
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
    faqs: [
      {
        q: "What do you do for real estate firms?",
        a: "Support the systems the business runs on, agent devices, email and document security, CRM and listing platforms, and the infrastructure connecting multiple offices, so transactions are not delayed by technology.",
      },
      {
        q: "Can you support several branches or offices?",
        a: "Yes. Multi-site environments are standard work, with consistent setup, access control, and support across locations instead of each office solving IT differently.",
      },
      {
        q: "How do you protect client and transaction data?",
        a: "Through access control, encryption, endpoint protection, and monitoring, with delivery aligned to SOC 2 and ISO 27001 practices. Wire fraud and business email compromise are specific risks in this sector and are treated as such.",
      },
      {
        q: "Do you work with the CRM and listing tools we already use?",
        a: "Yes. We support and integrate the platforms you have rather than pushing a migration, unless the existing setup is genuinely holding the business back.",
      },
      {
        q: "Can agents get help outside office hours?",
        a: "Yes. Deals do not keep office hours, and support coverage can run continuously so an agent working an evening or weekend closing is not stuck.",
      },
    ],
    finalCta,
  },
  {
    slug: "industrial-manufacturing",
    name: "Industrial Manufacturing",
    sourceUrl: "https://mindwhiz.com/industries/",
    group: "Built & Physical",
    hero: {
      image: "/banners/industrial-manufacturing.png",
      title: ["Built To"],
      highlight: "Run",
      subtitle:
        "Engineering, back-office, and IT support that keep manufacturing operations efficient, connected, and running at capacity.",
      cta: "Optimize operations",
    },
    intro: {
      kicker: "Built & Physical",
      title: "Manufacturing support services",
      body: [
        "MindWhiz supports manufacturers with engineering documentation, IT operations, and back-office teams that reduce downtime.",
        "We help you connect systems, control costs, and scale support as production demand changes.",
      ],
      card: {
        tags: ["Line Downtime", "Support Gaps"],
        image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1800&q=80",
        title: "Production Stalls",
        desc: "Support and engineering gaps let small issues stop the line and eat into output.",
        cta: "Talk to expert",
      },
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
    faqs: [
      {
        q: "Do you support plant and operational systems as well as office IT?",
        a: "We support the IT estate and the systems that connect to it, and work alongside your operational technology and engineering teams at the boundary. Control systems remain under the specialists who own them.",
      },
      {
        q: "How do you avoid interrupting production?",
        a: "Changes are scheduled around production windows and shift patterns, staged, and made reversible. Where a change carries real risk to output, it is planned with your operations team rather than pushed on an IT calendar.",
      },
      {
        q: "Can you cover multiple facilities and shift patterns?",
        a: "Yes. Continuous coverage suits multi-shift operations, so a fault on a night shift gets the same response as one at midday, across every site.",
      },
      {
        q: "What about older equipment running unsupported software?",
        a: "It is common in this sector and it is handled by managing risk rather than demanding replacement, segmentation, restricted access, and monitoring around legacy systems that cannot simply be upgraded.",
      },
      {
        q: "How do you approach industrial cybersecurity?",
        a: "With segmentation between corporate and production networks, controlled remote access for vendors and engineers, continuous monitoring, and a response plan that accounts for the cost of stopping a line.",
      },
    ],
    finalCta,
  },
  {
    slug: "accounting-finance",
    name: "Accounting & Finance",
    sourceUrl: "https://mindwhiz.com/industries/",
    group: "Finance & Services",
    hero: {
      image: "/banners/accounting-finance.png",
      title: ["Close The"],
      highlight: "Books",
      subtitle:
        "Bookkeeping, reporting, and finance operations handled by vetted professionals, so your close is faster and your data is clean.",
      cta: "Talk to finance",
    },
    intro: {
      kicker: "Finance & Services",
      title: "Outsourced accounting and finance",
      body: [
        "MindWhiz supports finance teams with bookkeeping, AP/AR, payroll, and reporting delivered by vetted accountants.",
        "Get accurate numbers, faster closes, and up to 40% lower back-office cost without sacrificing control.",
      ],
      card: {
        tags: ["Slow Closes", "Compliance Risk"],
        image: "/service-coverage/finance/bookkeeping.png",
        title: "Bottlenecked Finance",
        desc: "Manual processes stretch month-end closes and raise the risk of costly errors.",
        cta: "Talk to expert",
      },
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
    faqs: [
      {
        q: "How is sensitive financial data protected?",
        a: "Access is restricted to what each role requires, data is encrypted, endpoints are protected and monitored, and activity is logged. Delivery is aligned to SOC 2 and ISO 27001 practices.",
      },
      {
        q: "Can you support us through busy season and year-end?",
        a: "Yes, and capacity is planned for it. Coverage can scale for close periods and filing deadlines, when downtime is least affordable and support volume is highest.",
      },
      {
        q: "Which accounting platforms do you work with?",
        a: "The common ledger, tax, practice management, and reporting platforms used in the sector, along with the infrastructure and integrations around them.",
      },
      {
        q: "Can you help with audit and compliance evidence?",
        a: "Yes. Access records, monitoring logs, patch status, and documented procedures are what auditors typically request, and the service produces them as a matter of course rather than reconstructing them under pressure.",
      },
      {
        q: "Can you provide finance staff as well as IT support?",
        a: "Yes. Finance and accounting back-office roles are available through staff augmentation, working inside your processes and under your direction.",
      },
    ],
    finalCta,
  },
  {
    slug: "professional-services",
    name: "Professional Services",
    sourceUrl: "https://mindwhiz.com/industries/",
    group: "Finance & Services",
    hero: {
      image: "/banners/professional-services.png",
      title: ["Deliver"],
      highlight: "More",
      subtitle:
        "Research, operations, and back-office support that let consulting and professional services firms take on more work with confidence.",
      cta: "Add capacity",
    },
    intro: {
      kicker: "Finance & Services",
      title: "Back office for professional services",
      body: [
        "MindWhiz gives professional services firms vetted analysts and support teams that extend delivery capacity on demand.",
        "Take on more engagements, protect utilization, and keep quality high while we handle the supporting work.",
      ],
      card: {
        tags: ["Capacity Limits", "Quality Risk"],
        image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1800&q=80",
        title: "Delivery Strain",
        desc: "Rising demand strains delivery teams and threatens the quality clients expect.",
        cta: "Talk to expert",
      },
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
    faqs: [
      {
        q: "What kinds of firms do you work with?",
        a: "Consultancies, legal and advisory practices, agencies, and similar firms, businesses where billable time is the product and technology failures translate directly into lost hours.",
      },
      {
        q: "Can you support a team that travels or works from client sites?",
        a: "Yes. Remote support and device management are built for distributed work, so someone at a client office or in transit gets the same support as someone at a desk.",
      },
      {
        q: "How do you protect client confidentiality?",
        a: "Through scoped access, encryption, monitoring, and signed confidentiality terms, with delivery aligned to SOC 2 and ISO 27001 practices. Where you hold client-imposed security obligations, we work within them.",
      },
      {
        q: "Can you handle onboarding and offboarding as headcount changes?",
        a: "Yes. Starters can be issued configured devices and correct access on day one, and leavers can have access, licences, and equipment recovered against a defined checklist.",
      },
      {
        q: "Is support available around client deadlines?",
        a: "Yes. Coverage can run outside standard hours, which matters when a filing, pitch, or delivery deadline does not move because a system failed at 9pm.",
      },
    ],
    finalCta,
  },
  {
    slug: "logistics-supply-chain",
    name: "Logistics & Supply Chain",
    sourceUrl: "https://mindwhiz.com/industries/",
    group: "Finance & Services",
    hero: {
      image: "/banners/logistics-supply-chain.png",
      title: ["Keep Goods"],
      highlight: "Moving",
      subtitle:
        "Coordination, tracking, and back-office support that keep logistics and supply chain operations running without gaps.",
      cta: "Streamline logistics",
    },
    intro: {
      kicker: "Finance & Services",
      title: "Logistics and supply chain support",
      body: [
        "MindWhiz supports logistics and supply chain teams with dispatch coordination, tracking, and back-office operations.",
        "We help you reduce delays, control cost, and keep visibility across every shipment and partner.",
      ],
      card: {
        tags: ["Visibility Gaps", "Delays"],
        image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1800&q=80",
        title: "Supply Bottlenecks",
        desc: "Fragmented operations and blind spots cause delays that ripple across the supply chain.",
        cta: "Talk to expert",
      },
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
    faqs: [
      {
        q: "Can you support round-the-clock operations?",
        a: "Yes. Coverage runs continuously, which suits operations that do not stop, night shifts, weekend movements, and depots running outside standard office hours.",
      },
      {
        q: "What about warehouse connectivity, scanners, and mobile devices?",
        a: "Site networks, handheld and scanning devices, and the connectivity between depots are all supported, since these are usually what actually halts throughput when they fail.",
      },
      {
        q: "Do you integrate with our TMS, WMS, or ERP?",
        a: "Yes. Integration between transport, warehouse, and finance systems is common work, and is typically where duplicated manual entry and reconciliation errors get removed.",
      },
      {
        q: "How is downtime handled during peak periods?",
        a: "With monitoring that catches degradation early, agreed escalation paths, and tested recovery plans, because in peak season the cost of an outage compounds across every downstream commitment.",
      },
      {
        q: "Can you support sites in multiple countries?",
        a: "Yes. Multi-site and cross-border operations are supported with consistent standards and support processes across locations rather than different arrangements per country.",
      },
    ],
    finalCta,
  },
  {
    slug: "healthcare-healthtech",
    name: "Healthcare & HealthTech",
    sourceUrl: "https://mindwhiz.com/industries/",
    group: "Healthcare",
    hero: {
      image: "/banners/healthcare-healthtech.png",
      title: ["Compliant"],
      highlight: "Care",
      subtitle:
        "Talent and operations support for care operations and health technology platforms, delivered with compliance built in.",
      cta: "Talk to healthcare",
    },
    intro: {
      kicker: "Healthcare",
      title: "Healthcare and HealthTech support",
      body: [
        "MindWhiz supports healthcare and HealthTech organizations with back-office, IT, and support teams that respect compliance.",
        "We help you scale operations and technology while protecting patient data and meeting regulatory standards.",
      ],
      card: {
        tags: ["Compliance Risk", "Admin Load"],
        image: "https://images.unsplash.com/photo-1576091160550-112173f31f5f?auto=format&fit=crop&w=1800&q=80",
        title: "Care Operations Strain",
        desc: "Administrative load and compliance demands pull focus away from patients and outcomes.",
        cta: "Talk to expert",
      },
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
    faqs: [
      {
        q: "How is patient data handled?",
        a: "Under strict access control, encryption, logging, and monitoring, with delivery aligned to SOC 2 and ISO 27001 practices. We work within your regulatory obligations, including HIPAA where it applies, and support your compliance programme rather than certify it on your behalf.",
      },
      {
        q: "Can clinical systems be supported outside normal hours?",
        a: "Yes. Care does not run on office hours, so coverage is continuous and clinical-impacting issues are prioritized accordingly.",
      },
      {
        q: "Do you work with EHR and EMR platforms?",
        a: "We support the infrastructure, access, integration, and endpoints around the major clinical platforms, and coordinate with the vendor where an issue sits inside the application itself.",
      },
      {
        q: "What happens if there is a security incident?",
        a: "It is contained and investigated against an agreed response plan, with the scope of any data exposure established and documented, which is what your breach notification obligations depend on.",
      },
      {
        q: "Can you support multiple clinics or sites?",
        a: "Yes. Multi-site environments get consistent device standards, access control, and support processes, so a smaller location is not left with weaker protection than the main site.",
      },
    ],
    finalCta,
  },
];

export function getIndustryPage(slug: string) {
  return industryPages.find((page) => page.slug === slug);
}
