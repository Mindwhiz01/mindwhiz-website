// ---------------------------------------------------------------------------
// MindWhiz home-page content — cleaned & reconciled from the existing site.
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
  { label: "Why MindWhiz", href: "/#why" },
  { label: "Industries", href: "/#industries" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "Contact", href: "/contact" },
];

export const hero = {
  eyebrow: "Hybrid Staffing · Staff Augmentation · BPO",
  title: "Empowering businesses with hybrid staffing, staff augmentation & BPO",
  subtitle:
    "Flexible talent, scalable teams, global impact. Get vetted engineers, 24/7 operations coverage, and delivery-focused support across IT, security, and business operations — built for speed, reliability, and enterprise trust.",
  primaryCta: { label: "Get in touch", href: "#contact" },
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
  { name: "IT Helpdesk 24/7", desc: "Tier 1–3 support that never misses a beat.", icon: "Headset" },
  { name: "NOC Monitoring", desc: "Round-the-clock network operations and uptime.", icon: "Activity" },
  { name: "Cybersecurity Monitoring", desc: "24/7 threat detection, prevention, and response.", icon: "ShieldCheck" },
  { name: "Cloud Infrastructure", desc: "Design, migration, and managed cloud operations.", icon: "Cloud" },
  { name: "DevOps & Automation", desc: "CI/CD pipelines and automated delivery.", icon: "GitBranch" },
  { name: "Endpoint Security", desc: "Device protection and centralized management.", icon: "Laptop" },
  { name: "Server & Network Administration", desc: "Secure, stable server and network operations.", icon: "Activity" },
  { name: "HR Services", desc: "RPO, payroll, HRIS, and compliance.", icon: "Users" },
  { name: "Finance & Accounting", desc: "AP, AR, bookkeeping, reporting, CFO support.", icon: "Calculator" },
  { name: "Digital Marketing", desc: "SEO, campaigns, CRM, and content operations.", icon: "Megaphone" },
  { name: "Construction Estimation", desc: "Quantity takeoffs, bid prep, and planning.", icon: "Ruler" },
  { name: "Staff Augmentation", desc: "On-demand specialists to scale fast.", icon: "UserPlus" },
  { name: "Remote Desktop & Assets", desc: "Secure remote access and IT asset tracking.", icon: "MonitorSmartphone" },
];

export const differentiators = [
  { title: "Hybrid", desc: "Onshore and offshore delivery that stays aligned.", icon: "Globe2" },
  { title: "Vetted", desc: "Role-ready professionals matched to your needs.", icon: "BadgeCheck" },
  { title: "Fast", desc: "Short time-to-shortlist and faster onboarding.", icon: "Zap" },
  { title: "Secure", desc: "Process-driven approach built for compliance.", icon: "Lock" },
];

export const comparison = [
  { feature: "Availability", mindwhiz: "Continuous, 24/7 support", others: "Limited support hours" },
  { feature: "Expertise", mindwhiz: "Certified pros, diverse skills", others: "Basic technical support" },
  { feature: "Cost efficiency", mindwhiz: "Up to 30% cost savings", others: "Higher in-house costs" },
  { feature: "Response time", mindwhiz: "Within 15 minutes", others: "Slower response times" },
  { feature: "Tailored support", mindwhiz: "Customized plans", others: "One-size-fits-all" },
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
  "Real Estate",
  "E-commerce & Retail",
  "Logistics & Supply Chain",
  "Startups & SMBs",
  "Industrial Manufacturing",
  "Professional Services",
];

export const caseStudies = [
  {
    client: "Alpha Bravo",
    category: "Construction",
    result: "Streamlined estimation and staffing by deploying vetted remote professionals that integrated fast.",
    highlights: ["Faster delivery", "Lower hiring friction", "Scalable support"],
    img: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=900&q=80",
  },
  {
    client: "Villa Tech",
    category: "IT Staffing",
    result: "Delivered expert IT talent to scale infrastructure and improve system reliability across operations.",
    highlights: ["Rapid onboarding", "Better uptime", "Team expansion"],
    img: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=900&q=80",
  },
  {
    client: "Inovatiqa",
    category: "Back Office",
    result: "Enabled improved accuracy and turnaround by strengthening back-office support and workflows.",
    highlights: ["Higher accuracy", "Faster turnaround", "Process clarity"],
    img: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=900&q=80",
  },
];

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
    "Your team deserves better than burnout, delays, and distractions. MindWhiz puts the right people and processes in place — fast.",
  cta: { label: "Book a free consultation", href: "#contact" },
};

export const footerGroups = [
  {
    title: "Services",
    links: ["IT & Cybersecurity", "Business Support", "Construction Estimation", "Staff Augmentation"],
  },
  {
    title: "Company",
    links: ["Who We Are", "BPO Model", "Global Delivery", "Careers"],
  },
  {
    title: "Resources",
    links: ["White Papers", "Case Studies", "Blog", "Contact"],
  },
];

export type Service = (typeof services)[number];
export type Stat = (typeof stats)[number];
export type CaseStudy = (typeof caseStudies)[number];
export type Testimonial = (typeof testimonials)[number];
