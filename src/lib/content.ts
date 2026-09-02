// ---------------------------------------------------------------------------
// MindWhiz home-page content, cleaned & reconciled from the existing site.
// Single source of truth shared by every design concept so they stay in sync.
// ---------------------------------------------------------------------------

export const brandColors = {
  green: "#9CCC3C",
  greenDark: "#7DB022",
  magenta: "#4B5563",
  magentaDark: "#374151",
  ink: "#0F1B2D",
} as const;

export const company = {
  name: "MindWhiz",
  tagline: "Flexible Talent, Scalable Teams, Global Impact",
  email: "info@mindwhiz.com",
  phone: "+1 (832) 900-4608",
  phoneHref: "tel:+18329004608",
  address: "2313 W Sam Houston Pkwy N #147, Houston, TX 77043, United States",
  city: "Houston, Texas, USA",
  locations: ["United States", "United Kingdom", "Pakistan"],
};

export const nav = [
  { label: "Services", href: "/#services" },
  { label: "Web Services", href: "/web-services" },
  { label: "Industries", href: "/#industries" },
  { label: "About Us", href: "/about" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "Contact", href: "/contact" },
];

export const hero = {
  eyebrow: "Hybrid Staffing · Staff Augmentation · BPO",
  title: "Save 60% on IT staffing. Deploy in 10 days.",
  subtitle:
    "Hire vetted offshore engineers, get 24/7 operations coverage, and offshore BPO support across IT, security, and business operations. 99.8% retention. No hiring fees or benefits overhead. Scale anytime.",
  primaryCta: { label: "Get free consultation", href: "#contact" },
  secondaryCta: { label: "Explore services", href: "#services" },
};

export const stats = [
  { value: "500+", label: "Skilled professionals deployed" },
  { value: "$2.4M", label: "Average annual cost savings" },
  { value: "99.8%", label: "Client retention rate" },
  { value: "10 days", label: "Average deployment time" },
];

// `icon` values are valid lucide-react icon names.
export const services = [
  { name: "IT Helpdesk 24/7", desc: "Tier 1 to 3 support that never misses a beat.", icon: "Headset" },
  { name: "NOC Monitoring", desc: "Round the clock network operations and uptime.", icon: "Activity" },
  { name: "Cybersecurity Monitoring", desc: "24/7 threat detection, prevention, and response.", icon: "ShieldCheck" },
  { name: "Cloud Infrastructure", desc: "Design, migration, and managed cloud operations.", icon: "Cloud" },
  { name: "DevOps & Automation", desc: "CI/CD pipelines and automated delivery.", icon: "GitBranch" },
  { name: "Endpoint Security", desc: "Device protection and centralized management.", icon: "Laptop" },
  { name: "Server & Network Administration", desc: "Secure, stable server and network operations.", icon: "Activity" },
  { name: "HR Services", desc: "RPO, payroll, HRIS, and compliance.", icon: "Users" },
  { name: "Finance & Accounting", desc: "AP, AR, bookkeeping, reporting, CFO support.", icon: "Calculator" },
  { name: "Digital Marketing", desc: "SEO, campaigns, CRM, and content operations.", icon: "Megaphone" },
  { name: "Construction Estimation", desc: "Quantity takeoffs, bid prep, and planning.", icon: "Ruler" },
  { name: "Staff Augmentation", desc: "On demand specialists to scale fast.", icon: "UserPlus" },
  { name: "Remote Desktop & Assets", desc: "Secure remote access and IT asset tracking.", icon: "MonitorSmartphone" },
];

export const differentiators = [
  { title: "Hybrid", desc: "Onshore and offshore delivery that stays aligned.", icon: "Globe2" },
  { title: "Vetted", desc: "Role ready professionals matched to your needs.", icon: "BadgeCheck" },
  { title: "Fast", desc: "Short time to shortlist and faster onboarding.", icon: "Zap" },
  { title: "Secure", desc: "Process driven approach built for compliance.", icon: "Lock" },
];

export const comparison = [
  { feature: "Availability", mindwhiz: "Continuous, 24/7 support", others: "Limited support hours" },
  { feature: "Expertise", mindwhiz: "Certified pros, diverse skills", others: "Basic technical support" },
  { feature: "Cost efficiency", mindwhiz: "Up to 30% cost savings", others: "Higher in house costs" },
  { feature: "Response time", mindwhiz: "Within 15 minutes", others: "Slower response times" },
  { feature: "Tailored support", mindwhiz: "Customized plans", others: "One size fits all" },
  { feature: "Compliance", mindwhiz: "SOC 2 & ISO 27001", others: "Basic security only" },
];

export const process = [
  { step: "01", title: "Consultation & needs assessment", desc: "We review your environment, pain points, and goals to define clear outcomes and SLAs." },
  { step: "02", title: "Customized service plan", desc: "A support model built for your team, tools, and compliance needs." },
  { step: "03", title: "Seamless integration", desc: "We connect into your workflows and security standards with minimal disruption." },
  { step: "04", title: "Monitoring & resolution", desc: "Fast ticket resolution and proactive monitoring keep systems stable." },
  { step: "05", title: "Continuous improvement", desc: "KPI reporting and feedback loops keep performance rising." },
];

export const industries = [
  "Information Technology",
  "Construction & Engineering",
  "Accounting & Finance",
  "Healthcare & HealthTech",
  "Ecommerce & Retail",
  "Logistics & Supply Chain",
  "Startups & SMBs",
  "Industrial Manufacturing",
  "Professional Services",
];

export const caseStudies = [
  {
    slug: "connecteffect",
    client: "Connect Effect",
    category: "Social & Development",
    result: "Accelerated social growth and business expansion through comprehensive social media services. Deployed strategic content, community management, and engagement initiatives that scaled their online presence and converted followers into customers. Leadership sees real-time growth metrics and consistent ROI on social investment.",
    highlights: ["Social growth acceleration", "Community engagement", "Brand expansion"],
    img: "/clients/connecteffect-site.png",
    logo: "/clients/connecteffect-site.png",
    services: ["Social Media Management", "Content Strategy", "Digital Growth", "Community Engagement"],
    video: "/clients/connecteffect-video.mp4",
    challenge:
      "Connect Effect faced stagnant social media presence and limited digital reach. Manual posting and inconsistent engagement meant they were missing opportunities to build community and convert prospects. Social channels weren't integrated into their broader business growth strategy.",
    approach: [
      "We developed a comprehensive social media strategy aligned with business goals and target audience needs.",
      "Strategic content calendars, daily community management, and proactive engagement built real momentum.",
      "Real-time performance tracking and continuous optimization ensured consistent growth and measurable ROI.",
    ],
    outcomes: [
      "Significant acceleration in follower growth and engagement rates.",
      "Established consistent brand voice and community presence across platforms.",
      "Social channels now directly contribute to customer acquisition and business growth.",
    ],
    metrics: [
      { value: "+300%", label: "Growth in engagement" },
      { value: "Real-time", label: "Performance tracking" },
      { value: "Qualified", label: "Leads from social" },
    ],
    quote: {
      text: "MindWhiz transformed our social presence from an afterthought into a real business growth engine. The results speak for themselves.",
      author: "CEO, Connect Effect",
    },
  },
  {
    slug: "alpha-bravo",
    client: "Alpha Bravo",
    category: "Construction",
    result: "Streamlined estimation and staffing by deploying vetted remote professionals that integrated fast. The team plugged directly into existing bid workflows, cutting turnaround on takeoffs and pricing. Within the first quarter, Alpha Bravo was submitting more competitive bids without adding headcount in house.",
    highlights: ["Faster delivery", "Lower hiring friction", "Scalable support"],
    img: "/clients/alpha-bravo.png",
    logo: "/clients/alpha-bravo.png",
    services: ["Construction Estimation", "Staff Augmentation", "Bid Support"],
    challenge:
      "Alpha Bravo's in house estimating team was the bottleneck on every bid. Takeoffs and pricing took days, forcing them to pass on opportunities or submit rushed numbers. Hiring locally was slow and expensive, and each new estimator took months to become productive.",
    approach: [
      "We embedded vetted remote estimators directly into Alpha Bravo's existing bid workflow, no new tools to learn, no process disruption.",
      "A shared cadence of daily handoffs let the team work takeoffs overnight, so pricing was ready when the office opened.",
      "Clear SLAs and named owners kept accountability tight as volume scaled up.",
    ],
    outcomes: [
      "Turnaround on takeoffs and pricing cut dramatically within weeks.",
      "More competitive bids submitted without adding in house headcount.",
      "A repeatable staffing model the team could scale up or down by season.",
    ],
    metrics: [
      { value: "1st Q", label: "More competitive bids submitted" },
      { value: "0", label: "New in house hires needed" },
      { value: "~2x", label: "Bid throughput capacity" },
    ],
    quote: {
      text: "MindWhiz plugged straight into how we already work. We were bidding more, faster, without growing the office.",
      author: "Operations Lead, Alpha Bravo",
    },
  },
  {
    slug: "villa-tech",
    client: "Villa Tech",
    category: "IT Staffing",
    result: "Delivered expert IT talent to scale infrastructure and improve system reliability across operations. Engineers were embedded within two weeks, closing coverage gaps across monitoring, patching, and incident response. Downtime incidents dropped sharply as proactive maintenance replaced reactive firefighting.",
    highlights: ["Rapid onboarding", "Better uptime", "Team expansion"],
    img: "/clients/villa-tech.png",
    logo: "/clients/villa-tech.png",
    services: ["Staff Augmentation", "NOC Monitoring", "Server & Network Administration"],
    challenge:
      "Villa Tech was growing faster than its IT function could keep up. Monitoring gaps meant issues were caught late, patching slipped, and the small internal team spent its days firefighting incidents instead of preventing them.",
    approach: [
      "We embedded expert engineers within two weeks, closing coverage gaps across monitoring, patching, and incident response.",
      "Proactive maintenance routines replaced reactive firefighting, with round the clock eyes on critical systems.",
      "The augmented team scaled alongside Villa Tech's infrastructure as new services came online.",
    ],
    outcomes: [
      "Downtime incidents dropped sharply as problems were caught before users noticed.",
      "System reliability improved across the board.",
      "The internal team was freed to focus on higher value engineering work.",
    ],
    metrics: [
      { value: "2 wks", label: "From kickoff to embedded" },
      { value: "↓", label: "Sharp drop in downtime" },
      { value: "24/7", label: "Proactive coverage" },
    ],
    quote: {
      text: "MindWhiz provided the perfect talent to scale our infrastructure. Downtime is no longer something we worry about daily.",
      author: "CTO, Villa Tech",
    },
  },
  {
    slug: "inovatiqa",
    client: "Inovatiqa",
    category: "Back Office",
    result: "Enabled improved accuracy and turnaround by strengthening back office support and workflows. Standardized checklists and QA passes cut processing errors well below the client's target threshold. Leadership now gets same day visibility into throughput instead of waiting on weekly manual reports.",
    highlights: ["Higher accuracy", "Faster turnaround", "Process clarity"],
    img: "/clients/inovatiqa.png",
    logo: "/clients/inovatiqa.png",
    services: ["Back Office Support", "Process Design", "Quality Assurance"],
    challenge:
      "Inovatiqa's back office processing was inconsistent and error prone. Leadership had no real time view of throughput and relied on weekly manual reports that were already out of date by the time they landed.",
    approach: [
      "We strengthened back office workflows with standardized checklists and structured QA passes at every stage.",
      "A clear ownership model and daily reporting replaced the slow weekly manual rollups.",
      "Continuous refinement kept error rates falling as volume grew.",
    ],
    outcomes: [
      "Processing errors cut well below the client's target threshold.",
      "Turnaround times improved noticeably.",
      "Leadership gained same day visibility into throughput.",
    ],
    metrics: [
      { value: "<target", label: "Error rate vs. threshold" },
      { value: "Same day", label: "Throughput visibility" },
      { value: "QA'd", label: "Every workflow standardized" },
    ],
    quote: {
      text: "We finally trust our numbers and see them the same day. The workflows just run.",
      author: "Head of Operations, Inovatiqa",
    },
  },
];

export function getCaseStudy(slug: string) {
  return caseStudies.find((c) => c.slug === slug);
}

export const testimonials = [
  { name: "Villa Tech", role: "CTO, USA", quote: "MindWhiz provided the perfect talent to boost our cybersecurity efficiently. Highly recommended!" },
  { name: "IT Partners", role: "CEO, Canada", quote: "MindWhiz delivered top talent, ensuring seamless integration and outstanding results." },
  { name: "Tempura", role: "CEO, USA", quote: "MindWhiz's staff augmentation seamlessly integrated with our team, boosting our security posture." },
  { name: "Inovatiqa", role: "COO, USA", quote: "With MindWhiz's expert staff, we quickly strengthened and enhanced our cybersecurity capabilities." },
  { name: "Houston Club", role: "Miami, USA", quote: "MindWhiz provided the right talent to elevate our cybersecurity efforts efficiently." },
];

export const clients = ["Alpha", "Highrise", "INO", "JER", "Texas", "Villa Tech"];

export const certifications = ["SOC 2", "ISO 27001", "ITIL", "CompTIA", "Microsoft", "AWS"];

export const finalCta = {
  title: "Stop struggling. Start scaling.",
  subtitle:
    "Your team deserves better than burnout, delays, and distractions. MindWhiz puts the right people and processes in place, fast.",
  cta: { label: "Book a free consultation", href: "#contact" },
};

export const footerGroups = [
  {
    title: "Services",
    links: [
      { label: "IT Helpdesk 24/7", href: "/services/it-helpdesk-24-7" },
      { label: "NOC Monitoring", href: "/services/noc-monitoring" },
      { label: "Cybersecurity Monitoring", href: "/services/cybersecurity-monitoring" },
      { label: "Cloud Infrastructure", href: "/services/cloud-infrastructure" },
      { label: "DevOps & Automation", href: "/services/devops-automation" },
      { label: "Endpoint Security", href: "/services/endpoint-security" },
      { label: "Server & Network Administration", href: "/services/server-network-administration" },
      { label: "Remote Desktop & Assets", href: "/services/remote-desktop-assets" },
      { label: "Staff Augmentation", href: "/services/staff-augmentation" },
      { label: "HR Services", href: "/services/hr-services" },
      { label: "Finance & Accounting", href: "/services/finance-accounting" },
      { label: "Digital Marketing", href: "/services/digital-marketing" },
      { label: "Construction Estimation", href: "/services/construction-estimation" },
    ],
  },
  {
    title: "Industries",
    links: [
      { label: "Information Technology", href: "/industries/information-technology" },
      { label: "Ecommerce & Retail", href: "/industries/ecommerce-retail" },
      { label: "Startups & SMBs", href: "/industries/startups-smbs" },
      { label: "Construction & Engineering", href: "/industries/construction-engineering" },
      { label: "Industrial Manufacturing", href: "/industries/industrial-manufacturing" },
      { label: "Accounting & Finance", href: "/industries/accounting-finance" },
      { label: "Professional Services", href: "/industries/professional-services" },
      { label: "Logistics & Supply Chain", href: "/industries/logistics-supply-chain" },
      { label: "Healthcare & HealthTech", href: "/industries/healthcare-healthtech" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Why MindWhiz", href: "/why-mindwhiz" },
      { label: "Case Studies", href: "/case-studies" },
      { label: "Web Services", href: "/web-services" },
      { label: "Careers", href: "/careers" },
      { label: "Blog", href: "/blog" },
      { label: "Newsletter", href: "/newsletter" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Locations",
    links: [
      { label: "United States", href: "/locations/us" },
      { label: "United Kingdom", href: "/locations/uk" },
      { label: "Pakistan", href: "/locations/pk" },
    ],
  },
];

export type Service = (typeof services)[number];
export type Stat = (typeof stats)[number];
export type CaseStudy = (typeof caseStudies)[number];
export type Testimonial = (typeof testimonials)[number];
