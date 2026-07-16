export type ServicePageContent = {
  slug: string;
  name: string;
  sourceUrl: string;
  group: string;
  hero: {
    image: string;
    title: string[];
    highlight: string;
    subtitle: string;
    cta: string;
  };
  intro: {
    kicker: string;
    title: string;
    body: string[];
    card?: {
      tags: string[];
      image: string;
      title: string;
      desc: string;
      cta: string;
    };
  };
  proof: { value: string; label: string }[];
  problems?: {
    title: string;
    groups: { title: string; items: string[] }[];
  };
  capabilities: { title: string; desc: string; image: string }[];
  benefits: { title: string; desc: string }[];
  process: { title: string; desc: string }[];
  finalCta: {
    title: string;
    desc: string;
    button: string;
  };
};

const sharedImages = {
  helpdesk: "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=1800&q=80",
  noc: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1800&q=80",
  remote: "https://images.unsplash.com/photo-1581092921461-eab62e97a780?auto=format&fit=crop&w=1800&q=80",
  cloud: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1800&q=80",
  server: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1800&q=80",
  devops: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=1800&q=80",
  cyber: "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?auto=format&fit=crop&w=1800&q=80",
};

export const servicePages: ServicePageContent[] = [
  {
    slug: "it-helpdesk-24-7",
    name: "24/7 IT Helpdesk (Tier 1 - 3)",
    sourceUrl: "https://mindwhiz.com/27-7/",
    group: "IT & Security",
    hero: {
      image: sharedImages.helpdesk,
      title: ["Always-On", "IT"],
      highlight: "Support",
      subtitle:
        "From basic troubleshooting to complex issues, our 24/7 helpdesk ensures uninterrupted operations and rapid resolution across all support tiers.",
      cta: "Get 24/7 IT Support",
    },
    intro: {
      kicker: "Comparison",
      title: "Support that never sleeps.",
      body: [
        "Why Mindwhiz IT Helpdesk services stand out: round-the-clock expert support, faster response times, and compliant, cost-efficient service designed to scale with your business, not restrict it.",
        "Mindwhiz combines continuous availability, certified IT professionals, customized support plans, and SOC 2 and ISO 27001 aligned security practices.",
      ],
    },
    proof: [
      { value: "24/7", label: "Continuous, round the clock support" },
      { value: "15 min", label: "Fast response within 15 minutes" },
      { value: "30%", label: "Up to 30% cost savings" },
      { value: "Tier 1-3", label: "Rapid resolution across all support tiers" },
    ],
    capabilities: [
      {
        title: "24/7 Availability",
        desc: "Mindwhiz provides continuous, round the clock support while many providers operate with limited support hours.",
        image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=900&q=80",
      },
      {
        title: "Expert IT Support",
        desc: "Certified IT professionals with diverse expertise handle requests beyond basic technical support.",
        image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=900&q=80",
      },
      {
        title: "Cost Efficiency",
        desc: "A cost-efficient helpdesk model can deliver up to 30% cost savings compared with higher in-house costs.",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=900&q=80",
      },
      {
        title: "Response Time",
        desc: "Fast response within 15 minutes helps reduce downtime and keeps work moving.",
        image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=80",
      },
      {
        title: "Tailored IT Support",
        desc: "Customized support plans replace one-size-fits-all packages and align with your tools, team, and priorities.",
        image: "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=900&q=80",
      },
      {
        title: "Compliance and Security",
        desc: "SOC 2 and ISO 27001 aligned delivery provides stronger controls than basic security-only support.",
        image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=80",
      },
    ],
    benefits: [
      { title: "Industry-leading Certifications", desc: "Mindwhiz prioritizes excellence in every aspect of service delivery, with certifications from globally recognized organizations." },
      { title: "Quality and Compliance", desc: "Certified practices help guarantee adherence to high standards of quality, security, and compliance." },
      { title: "Book a Free Consultation", desc: "Discuss your challenges, technical goals, and delivery priorities with a senior consultant." },
      { title: "Clear Next Steps", desc: "Get in-depth insights, tailored solutions, and a practical support path for your environment." },
      { title: "Simple Pricing That Grows With You", desc: "Fixed monthly cost per user supports predictable and transparent budgeting." },
      { title: "Transparent Billing", desc: "Service scales with team size and business growth, with no hidden fees or surprise charges." },
      { title: "Maximize ROI", desc: "Reduce downtime, strengthen security, and minimize disruptions through always-on support." },
    ],
    process: [
      { title: "Initial Consultation and Needs Assessment", desc: "Review the current environment, pain points, and goals to define support outcomes, SLA targets, and onboarding steps." },
      { title: "Customized Service Plan Development", desc: "Design a support model that fits your team, tools, compliance needs, escalation paths, and reporting cadence." },
      { title: "Ongoing Monitoring and Issue Resolution", desc: "Resolve tickets quickly, escalate when needed, and keep systems stable with proactive monitoring and playbooks." },
    ],
    finalCta: {
      title: "Build your hybrid team now.",
      desc: "Tell us what you are trying to achieve. Mindwhiz will respond with the right people, the right approach, and a clear next step.",
      button: "Get in touch",
    },
  },
  {
    slug: "noc-monitoring",
    name: "NOC Monitoring (24/7)",
    sourceUrl: "https://mindwhiz.com/noc-dummy/",
    group: "IT & Security",
    hero: {
      image: sharedImages.noc,
      title: ["Protect", "Your"],
      highlight: "Uptime",
      subtitle:
        "Always-on monitoring, incident handling, performance optimization, and operational reporting that scales with your environment.",
      cta: "Take Control of Your IT",
    },
    intro: {
      kicker: "Industry-leading NOC operations",
      title: "Certified engineers, reliable monitoring.",
      body: [
        "MindWhiz works alongside organizations that value stability, responsiveness, and operational excellence.",
        "Our NOC teams help reduce downtime, improve visibility, and support business continuity with confidence.",
      ],
      card: {
        tags: ["Network Blind Spots", "Downtime Risk"],
        image: sharedImages.noc,
        title: "Delayed Detection",
        desc: "Fragmented monitoring and slow alerts let small network issues turn into costly outages.",
        cta: "Explore Problem",
      },
    },
    proof: [
      { value: "5+", label: "Years of combined experience" },
      { value: "180+", label: "Supported customers and partners" },
      { value: "90+", label: "NOC support professionals" },
      { value: "24/7", label: "Network operations coverage" },
    ],
    problems: {
      title: "Which NOC challenges are you dealing with?",
      groups: [
        {
          title: "Network Monitoring and Visibility Gaps",
          items: [
            "Limited real-time visibility across network and infrastructure",
            "Delayed alerts causing longer downtime",
            "Too many monitoring tools with no clear signal",
            "Lack of centralized dashboards and reporting",
            "Monitoring that does not scale with network growth",
          ],
        },
        {
          title: "NOC Performance and Operational Strain",
          items: [
            "Underperforming in-house or outsourced NOC teams",
            "Slow incident detection and escalation",
            "Engineers stretched across shifts and priorities",
            "Skill gaps in network, cloud, or security monitoring",
            "Burnout due to 24/7 operational demands",
          ],
        },
        {
          title: "Cost Control and Service Predictability",
          items: [
            "Rising costs to staff and manage a full-time NOC",
            "Unclear pricing tied to tickets or incidents",
            "Hidden costs from overtime and on-call coverage",
            "Vendor complexity across tools and providers",
            "Difficulty forecasting NOC operational spend",
          ],
        },
      ],
    },
    capabilities: [
      { title: "Network Monitoring", desc: "Continuous monitoring of routers, switches, firewalls, and wireless networks to identify performance issues, outages, and abnormal activity.", image: "https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&w=900&q=80" },
      { title: "Server Monitoring", desc: "Real-time monitoring of physical servers, virtual machines, and cloud infrastructure to maintain uptime, capacity health, and stability.", image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=900&q=80" },
      { title: "Application Monitoring", desc: "Visibility into application performance and dependencies to detect slowdowns, failures, and service degradation early.", image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=900&q=80" },
      { title: "Website Monitoring", desc: "Availability checks, certificate status, and user experience validation for websites and portals.", image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=900&q=80" },
      { title: "Broadband Monitoring", desc: "Performance monitoring across broadband networks, including PON, DOCSIS, and customer equipment.", image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=900&q=80" },
      { title: "Outage Remediation", desc: "Fast issue resolution using documented runbooks, automated recovery actions, and coordinated escalation.", image: "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=900&q=80" },
    ],
    benefits: [
      { title: "Real-time Incident Management", desc: "Immediate detection, triage, escalation, and resolution help minimize downtime." },
      { title: "Patch and Maintenance Support", desc: "Scheduled patching and system maintenance help preserve operational stability." },
      { title: "Operational Reporting and SLAs", desc: "Clear reporting on uptime, incidents, and response times keeps delivery measurable." },
      { title: "Scalable NOC Architecture", desc: "Monitoring coverage can expand without disrupting the environment." },
    ],
    process: [
      { title: "NOC Strategy", desc: "Define the monitoring model, operational ownership, and reporting expectations." },
      { title: "NOC Implementation", desc: "Configure monitoring, alerting, dashboards, runbooks, and escalation paths." },
      { title: "NOC Operations", desc: "Operate the monitoring desk with continuous incident handling and response." },
    ],
    finalCta: {
      title: "Strengthen your operations.",
      desc: "MindWhiz delivers end-to-end lifecycle solutions that reduce operational noise while improving performance, reliability, and visibility.",
      button: "Get started",
    },
  },
  {
    slug: "remote-desktop-assets",
    name: "Remote Desktop & IT Asset Management",
    sourceUrl: "https://mindwhiz.com/remote-desktop/",
    group: "Cloud & DevOps",
    hero: {
      image: sharedImages.remote,
      title: ["Control", "From"],
      highlight: "Anywhere",
      subtitle:
        "Complete control over your IT from anywhere. Manage devices, users, and assets with secure remote access and centralized IT asset tracking.",
      cta: "Take Control of Your IT",
    },
    intro: {
      kicker: "The power of experience",
      title: "Control every device and asset.",
      body: [
        "MindWhiz delivers IT asset management services that provide clear visibility and control across devices, software, and cloud environments.",
        "Structured lifecycle management supports secure onboarding, controlled access, and compliant asset retirement.",
      ],
      card: {
        tags: ["Asset Sprawl", "Access Risk"],
        image: sharedImages.remote,
        title: "Untracked Devices",
        desc: "Unmanaged laptops, licenses, and remote access create blind spots and security gaps across teams.",
        cta: "Explore Problem",
      },
    },
    proof: [
      { value: "5+", label: "Years supporting global businesses" },
      { value: "97%", label: "Client satisfaction rate" },
      { value: "1,200+", label: "Assets managed across client environments" },
    ],
    capabilities: [
      { title: "Secure Remote Access", desc: "Manage devices and users through controlled remote access designed for distributed teams.", image: "https://images.unsplash.com/photo-1580894732444-8ecded7900cd?auto=format&fit=crop&w=900&q=80" },
      { title: "IT Asset Management", desc: "Maintain clear visibility into hardware, software, licenses, and cloud assets across the lifecycle.", image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=80" },
      { title: "User Lifecycle Support", desc: "Streamline onboarding, offboarding, access changes, and asset assignment workflows.", image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=900&q=80" },
    ],
    benefits: [
      { title: "Complete Visibility", desc: "Know where hardware and software assets are, who owns them, and how they are being used." },
      { title: "Structured Lifecycle Management", desc: "Support procurement, assignment, access control, license management, and retirement." },
      { title: "Proactive Risk Detection", desc: "Use reporting and oversight to catch compliance gaps, access issues, and asset drift." },
      { title: "Audit-Ready Reporting", desc: "Clear reporting supports audits and informed decisions across distributed environments." },
    ],
    process: [
      { title: "Catalog Assets", desc: "Document devices, software, cloud resources, ownership, users, and access status." },
      { title: "Secure Access", desc: "Align remote access with security policies, identity controls, and user requirements." },
      { title: "Operate Lifecycle", desc: "Manage onboarding, offboarding, licensing, changes, and asset updates." },
    ],
    finalCta: {
      title: "Efficiency and security, unlocked.",
      desc: "MindWhiz simplifies management of devices, software, and access so your teams can stay focused on core business priorities.",
      button: "Request more information",
    },
  },
  {
    slug: "cloud-infrastructure",
    name: "Cloud Infrastructure Management",
    sourceUrl: "https://mindwhiz.com/elementor-18765/",
    group: "Cloud & DevOps",
    hero: {
      image: sharedImages.cloud,
      title: ["Optimize", "Your"],
      highlight: "Cloud",
      subtitle:
        "Optimize, secure, and scale your cloud without complexity. MindWhiz manages cloud environments end-to-end for performance, cost efficiency, and reliability.",
      cta: "Optimize Your Cloud Today",
    },
    intro: {
      kicker: "Reliable IT infrastructure services",
      title: "Cloud that stays stable and secure.",
      body: [
        "Your business relies on always-available networks, applications, and digital services. MindWhiz helps organizations maintain a resilient IT foundation.",
        "We work with your teams to design, manage, and optimize cloud environments that support performance, availability, and long-term scalability.",
      ],
      card: {
        tags: ["Cloud Sprawl", "Downtime Risk"],
        image: sharedImages.cloud,
        title: "Unstable Cloud",
        desc: "Misconfigured, unmonitored cloud environments raise cost, slow teams, and put uptime at risk.",
        cta: "Explore Problem",
      },
    },
    proof: [
      { value: "24/7", label: "System monitoring" },
      { value: "Secure", label: "Backups and storage" },
      { value: "Scale", label: "Compute, storage, and network resources" },
    ],
    capabilities: [
      { title: "Dependable Cloud Environments", desc: "Design and manage cloud environments built on trusted platforms that protect data and support uptime.", image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=900&q=80" },
      { title: "Secure Backups and Storage", desc: "Implement backup and storage strategies to safeguard critical data and support recovery objectives.", image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=900&q=80" },
      { title: "Scalable Infrastructure", desc: "Scale compute, storage, and network resources as demand grows without disruption or unnecessary overhead.", image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=900&q=80" },
    ],
    benefits: [
      { title: "24/7 System Monitoring", desc: "Continuous monitoring detects performance issues, outages, and anomalies early." },
      { title: "Faster Recovery Times", desc: "Backup, recovery, and response processes help restore services quickly after incidents." },
      { title: "Cloud Management Expertise", desc: "MindWhiz handles configuration, monitoring, and optimization so internal teams can focus on priorities." },
      { title: "Predictable Operating Costs", desc: "Clear cost visibility and controlled spending help organizations plan budgets without surprises." },
      { title: "More Focus on Business Growth", desc: "Offloading day-to-day cloud management gives internal teams more capacity for innovation and growth." },
    ],
    process: [
      { title: "Discovery", desc: "Map your cloud environment, risks, priorities, users, workloads, and performance gaps." },
      { title: "Management Plan", desc: "Define security, performance, backup, recovery, and scalability standards." },
      { title: "Operate and Optimize", desc: "Monitor, improve, tune, and scale the environment continuously." },
    ],
    finalCta: {
      title: "Reliable, secure cloud.",
      desc: "Talk to MindWhiz and get a clear cloud infrastructure management plan.",
      button: "Book free consultation",
    },
  },
  {
    slug: "server-network-administration",
    name: "Server & Network Administration",
    sourceUrl: "https://mindwhiz.com/server-dummy/",
    group: "Cloud & DevOps",
    hero: {
      image: sharedImages.server,
      title: ["Power", "Your"],
      highlight: "Backbone",
      subtitle:
        "Reliable infrastructure that powers business continuity. From server management to network optimization, MindWhiz keeps your IT backbone secure, stable, and high-performing.",
      cta: "Strengthen Your Infrastructure",
    },
    intro: {
      kicker: "Server management",
      title: "Servers online and protected.",
      body: [
        "MindWhiz server management services reduce the security and operational risks that often come with managing servers internally.",
        "Dedicated engineers monitor performance, apply updates, maintain security controls, and help prevent serious server issues before they affect the business.",
      ],
      card: {
        tags: ["Aging Servers", "Downtime Risk"],
        image: sharedImages.server,
        title: "Fragile Infrastructure",
        desc: "Unpatched servers and unmonitored networks turn small faults into outages that stall the business.",
        cta: "Explore Problem",
      },
    },
    proof: [
      { value: "Co-managed", label: "Operating model" },
      { value: "Reduced", label: "Operational risk" },
      { value: "Optimized", label: "Uptime and capacity" },
    ],
    capabilities: [
      { title: "Proactive Monitoring", desc: "Health checks, performance baselines, and alert tuning reduce downtime and improve visibility.", image: "https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&w=900&q=80" },
      { title: "Patch and Harden", desc: "Routine updates and security controls keep server environments stable and aligned with risk posture.", image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=900&q=80" },
      { title: "Incident Response", desc: "Clear escalation paths and fast remediation help resolve issues before disruption spreads.", image: "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=900&q=80" },
      { title: "Capacity Planning", desc: "Right-size compute, storage, and resources so infrastructure remains stable as the business grows.", image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=900&q=80" },
    ],
    benefits: [
      { title: "Troubleshooting", desc: "Identify, isolate, and resolve server problems through proactive monitoring and efficient support." },
      { title: "Maintenance", desc: "Ongoing server maintenance reduces downtime and security risk while keeping systems reliable." },
      { title: "Software Installations", desc: "Manage software installations and updates to ensure compatibility and reduce configuration errors." },
      { title: "Cloud Management", desc: "Manage cloud-based server configurations and operations with specialized tools and experience." },
      { title: "Server Optimization", desc: "Identify performance gaps and optimize configurations to improve reliability and resource utilization." },
    ],
    process: [
      { title: "Monitor Continuously", desc: "Dedicated teams monitor server environments for potential issues." },
      { title: "Respond Quickly", desc: "When problems are detected, teams respond quickly and notify stakeholders according to defined timelines." },
      { title: "Maintain Proactively", desc: "Routine operating system and software updates reduce common server issues." },
    ],
    finalCta: {
      title: "We support multiple platforms.",
      desc: "MindWhiz provides comprehensive support for servers and network infrastructure across diverse environments and operational requirements.",
      button: "Request more information",
    },
  },
  {
    slug: "endpoint-security",
    name: "Endpoint Security",
    sourceUrl: "https://mindwhiz.com/cybersecurity-dummy/",
    group: "IT & Security",
    hero: {
      image: "https://images.unsplash.com/photo-1510511459019-5dda7724fd87?auto=format&fit=crop&w=1800&q=80",
      title: ["Secure", "Every"],
      highlight: "Device",
      subtitle:
        "Endpoint protection, patch visibility, device compliance, and response workflows for distributed teams and managed fleets.",
      cta: "Secure your endpoints",
    },
    intro: {
      kicker: "Endpoint security operations",
      title: "Device protection for distributed workforces.",
      body: [
        "Endpoint security keeps laptops, workstations, and servers protected as teams scale across locations.",
        "MindWhiz supports monitoring, policy alignment, patch visibility, and remediation workflows that reduce device-level risk.",
      ],
      card: {
        tags: ["Endpoint Risk", "Compliance Gaps"],
        image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=900&q=80",
        title: "Unmanaged Devices",
        desc: "Unpatched laptops and unmonitored endpoints leave distributed teams exposed to preventable incidents.",
        cta: "Explore Problem",
      },
    },
    proof: [
      { value: "EDR", label: "Managed protection" },
      { value: "Patch", label: "Compliance tracking" },
      { value: "Fleet", label: "Device visibility" },
    ],
    capabilities: [
      { title: "Device Protection", desc: "EDR/AV posture monitoring, policy checks, and response coordination for risky devices.", image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=900&q=80" },
      { title: "Patch Tracking", desc: "Patch status, exception follow-up, and reporting for laptops, workstations, and servers.", image: "https://images.unsplash.com/photo-1517430816045-df4b7de11d1d?auto=format&fit=crop&w=900&q=80" },
      { title: "Access Controls", desc: "Device compliance, enrollment checks, and security hygiene across remote work environments.", image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&w=900&q=80" },
    ],
    benefits: [
      { title: "Centralized Visibility", desc: "Track device posture, protection status, and compliance from a clearer operational view." },
      { title: "Reduced Endpoint Risk", desc: "Use patch visibility, policy controls, and remediation workflows to lower exposure." },
      { title: "Remote Workforce Support", desc: "Keep distributed devices aligned with security standards as teams work from anywhere." },
    ],
    process: [
      { title: "Inventory", desc: "Map endpoint tools, device groups, users, and security baselines." },
      { title: "Policy", desc: "Align endpoint rules with risk, compliance, and user workflows." },
      { title: "Monitor", desc: "Track detections, patch gaps, and device drift across the fleet." },
    ],
    finalCta: {
      title: "Protect every device.",
      desc: "MindWhiz helps keep endpoint security visible, controlled, and responsive across distributed teams.",
      button: "Talk to MindWhiz",
    },
  },
  {
    slug: "devops-automation",
    name: "DevOps & Automation",
    sourceUrl: "https://mindwhiz.com/elementor-18794/",
    group: "Cloud & DevOps",
    hero: {
      image: sharedImages.devops,
      title: ["Ship", "With"],
      highlight: "Automation",
      subtitle:
        "Accelerate development with smarter automation. Streamline workflows, reduce deployment time, and improve reliability with modern DevOps practices.",
      cta: "Speed Up Your Delivery",
    },
    intro: {
      kicker: "Software delivery and cloud infrastructure",
      title: "Automate deployments, ship reliably.",
      body: [
        "MindWhiz works across cloud platforms and environments to support DevOps and automation needs without relying on vendor-specific tools.",
        "By automating critical workflows, MindWhiz reduces operational complexity, increases efficiency, and supports security and compliance across modern infrastructure.",
      ],
      card: {
        tags: ["Manual Releases", "Slow Delivery"],
        image: sharedImages.devops,
        title: "Deployment Bottlenecks",
        desc: "Manual, error-prone releases slow delivery and make every deployment a risk instead of routine.",
        cta: "Explore Problem",
      },
    },
    proof: [
      { value: "5+", label: "Years of driving growth" },
      { value: "350+", label: "Digital initiatives delivered" },
      { value: "96%", label: "Customer satisfaction" },
      { value: "24/7", label: "Support coverage" },
    ],
    capabilities: [
      { title: "Cloud Infrastructure Optimization", desc: "Improve software delivery and cloud operations with structured automation practices.", image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=900&q=80" },
      { title: "Automated Testing", desc: "Improve software quality through automated unit, integration, security, performance, and release readiness checks.", image: "https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?auto=format&fit=crop&w=900&q=80" },
      { title: "Security and Compliance", desc: "Embed security scans, compliance checks, and DevSecOps practices into delivery workflows.", image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&w=900&q=80" },
    ],
    benefits: [
      { title: "Faster Deployments", desc: "CI/CD and deployment automation reduce manual effort and speed release cycles." },
      { title: "Reduced Operational Risk", desc: "Controlled releases, rollback planning, and change management minimize disruption." },
      { title: "Better Reliability", desc: "Monitoring, feedback loops, and optimization improve production health over time." },
      { title: "Modern DevOps Maturity", desc: "Ongoing support evolves tooling, processes, and automation practices." },
    ],
    process: [
      { title: "Initiation", desc: "Identify the need for DevOps transformation, CI/CD improvements, deployment automation, and infrastructure modernization." },
      { title: "Requirement Gathering", desc: "Run stakeholder workshops, define KPIs such as MTTR and deployment frequency, and capture security requirements." },
      { title: "Discovery", desc: "Evaluate infrastructure, tooling, workflows, target architecture, and phase-based roadmap." },
    ],
    finalCta: {
      title: "Lead your digital journey.",
      desc: "Get a structured, outcome-driven DevOps roadmap that accelerates delivery, improves reliability, and reduces operational risk.",
      button: "Get expert consultation",
    },
  },
  {
    slug: "cybersecurity-monitoring",
    name: "Cybersecurity Monitoring",
    sourceUrl: "https://mindwhiz.com/cybersecurity-dummy/",
    group: "IT & Security",
    hero: {
      image: sharedImages.cyber,
      title: ["Defeat", "Cyber"],
      highlight: "Threats",
      subtitle:
        "Real-time protection against evolving threats. MindWhiz monitors systems 24/7 to detect, prevent, and respond before threats impact your business.",
      cta: "Protect Your Business Now",
    },
    intro: {
      kicker: "Cybersecurity protection 24/7/365",
      title: "Coverage for modern threats.",
      body: [
        "Through monitoring capabilities and deep cybersecurity expertise, MindWhiz helps organizations stay protected while focusing on their most critical security priorities.",
        "MindWhiz supports continuous assessment, monitoring, and response across complex environments.",
      ],
      card: {
        tags: ["Threat Exposure", "Alert Fatigue"],
        image: sharedImages.cyber,
        title: "Blind To Threats",
        desc: "Limited monitoring and noisy alerts let real threats slip through until they become incidents.",
        cta: "Explore Problem",
      },
    },
    proof: [
      { value: "24/7/365", label: "Security monitoring" },
      { value: "MDR", label: "Detection and response" },
      { value: "SIEM + EDR", label: "Technology-enabled monitoring" },
      { value: "Unified", label: "Security visibility" },
    ],
    capabilities: [
      { title: "Managed Detection and Response", desc: "Monitor activity, identify threats, and respond to security risks in real time.", image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=900&q=80" },
      { title: "Threat Hunting", desc: "Structured threat hunting identifies suspicious activity and hidden risks before impact occurs.", image: "https://images.unsplash.com/photo-1510511459019-5dda7724fd87?auto=format&fit=crop&w=900&q=80" },
      { title: "Attack Surface Visibility", desc: "Monitoring across endpoints, networks, email, and cloud environments maintains comprehensive coverage.", image: "https://images.unsplash.com/photo-1563206767-5b18f218e8de?auto=format&fit=crop&w=900&q=80" },
      { title: "Security Control Management", desc: "Best-practice security controls improve visibility while reducing operational complexity.", image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&w=900&q=80" },
    ],
    benefits: [
      { title: "Modern MDR Capabilities", desc: "Integrated threat detection and response supported by SOC workflows." },
      { title: "Technology-Enabled Monitoring", desc: "Built on SIEM and EDR platforms without requiring additional tooling investment." },
      { title: "Comprehensive Security Coverage", desc: "Monitoring across defensive controls, threat intelligence, and governance visibility." },
      { title: "Extension of Your Security Team", desc: "Frontline security operations support frees internal teams to focus on strategy." },
      { title: "Prevention, Trust, Platform", desc: "Early prevention, always-on coverage, and integrated monitoring create unified visibility." },
    ],
    process: [
      { title: "Assess Coverage", desc: "Review endpoints, networks, email, cloud environments, controls, and governance needs." },
      { title: "Integrate Monitoring", desc: "Connect SIEM, EDR, and existing tools into a flexible monitoring model." },
      { title: "Detect and Investigate", desc: "MDR analysts investigate suspicious activity and neutralize incidents with speed and accuracy." },
    ],
    finalCta: {
      title: "Prevention, backed by trust.",
      desc: "MindWhiz focuses on early threat prevention, always-on coverage, and unified visibility across your environment.",
      button: "Get a security review",
    },
  },
  {
    slug: "staff-augmentation",
    name: "Staff Augmentation",
    sourceUrl: "https://mindwhiz.com/staff-augmentation/",
    group: "Talent & Workforce",
    hero: {
      image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1800&q=80",
      title: ["On-Demand"],
      highlight: "Teams",
      subtitle:
        "Add vetted specialists to your team in weeks, not months. Scale delivery up or down without the cost and commitment of full-time hires.",
      cta: "Augment your team",
    },
    intro: {
      kicker: "Talent & Workforce",
      title: "The right people, exactly when you need them.",
      body: [
        "MindWhiz staff augmentation gives you role-ready engineers, analysts, and operators who plug straight into your workflows, tools, and standards.",
        "You keep full control of direction and priorities while we handle sourcing, vetting, onboarding, and retention, so your roadmap never waits on hiring.",
      ],
      card: {
        tags: ["Hiring Delays", "Skill Gaps"],
        image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1800&q=80",
        title: "Talent Gaps",
        desc: "Long hiring cycles and missing skills stall roadmaps while the work piles up.",
        cta: "Explore Problem",
      },
    },
    proof: [
      { value: "2 wks", label: "Typical time from brief to onboarded talent" },
      { value: "500+", label: "Specialists across IT, finance, and operations" },
      { value: "30%", label: "Lower cost than local full-time hiring" },
      { value: "Flexible", label: "Scale up or down as projects change" },
    ],
    capabilities: [
      {
        title: "Vetted Specialists",
        desc: "Role-ready professionals screened for skills, communication, and reliability before they ever reach your shortlist.",
        image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=900&q=80",
      },
      {
        title: "Fast Onboarding",
        desc: "Candidates matched to your stack and standards so they contribute in the first sprint, not the first month.",
        image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=900&q=80",
      },
      {
        title: "Flexible Scaling",
        desc: "Ramp teams up for a launch or down after delivery without severance overhead or idle capacity.",
        image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=900&q=80",
      },
      {
        title: "Managed Retention",
        desc: "We handle engagement, reviews, and continuity so knowledge stays on your account for the long run.",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=900&q=80",
      },
    ],
    benefits: [
      { title: "Keep Full Control", desc: "You set direction, priorities, and process; augmented talent works as an extension of your own team." },
      { title: "No Hiring Overhead", desc: "Skip recruiting, benefits, and long-term commitments while still getting senior, dedicated people." },
      { title: "Hybrid Delivery", desc: "Onshore and offshore specialists that stay aligned across time zones and hand-offs." },
      { title: "Predictable Cost", desc: "Transparent monthly rates that scale with your team, with no hidden fees or surprise charges." },
    ],
    process: [
      { title: "Role and Skills Brief", desc: "We capture the exact skills, seniority, tools, and outcomes you need, plus how success will be measured." },
      { title: "Vetted Shortlist", desc: "You review a short list of pre-screened candidates matched to your stack, culture, and priorities." },
      { title: "Onboarding and Integration", desc: "Selected talent connects into your workflows, security, and documentation with minimal disruption." },
    ],
    finalCta: {
      title: "Build your hybrid team now.",
      desc: "Tell us what you are trying to achieve. Mindwhiz will respond with the right people, the right approach, and a clear next step.",
      button: "Get in touch",
    },
  },
];

export function getServicePage(slug: string) {
  return servicePages.find((page) => page.slug === slug);
}
