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
    // optional second-line word rendered in brand pink (helpdesk-style heading)
    highlight?: string;
    body: string[];
    card?: {
      tags: string[];
      image: string;
      title: string;
      desc: string;
      cta: string;
    };
  };
  proof: { value: string; label: string; image?: string }[];
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
  faqs?: { q: string; a: string }[];
};

const sharedImages = {
  helpdesk: "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=1800&q=80",
  noc: "/service-coverage/noc-monitoring/network-monitoring.png",
  remote: "https://images.unsplash.com/photo-1581092921461-eab62e97a780?auto=format&fit=crop&w=1800&q=80",
  cloud: "/service-coverage/cloud-infrastructure/dependable-cloud-environments.png",
  server: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1800&q=80",
  devops: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=1800&q=80",
  cyber: "/service-coverage/cybersecurity/managed-detection.png",
};

export const servicePages: ServicePageContent[] = [
  {
    slug: "it-helpdesk-24-7",
    name: "24/7 IT Helpdesk (Tier 1 to 3)",
    sourceUrl: "https://mindwhiz.com/27-7/",
    group: "IT & Security",
    hero: {
      image: "/banners/it-helpdesk.png",
      title: ["Always On", "IT"],
      highlight: "Support",
      subtitle:
        "From basic troubleshooting to complex issues, our 24/7 helpdesk ensures uninterrupted operations and rapid resolution across all support tiers.",
      cta: "Get 24/7 IT Support",
    },
    intro: {
      kicker: "Comparison",
      title: "24/7 IT helpdesk support across Tiers 1 to 3",
      body: [
        "Why Mindwhiz IT Helpdesk services stand out: round the clock expert support, faster response times, and compliant, cost efficient service designed to scale with your business, not restrict it.",
        "Mindwhiz combines continuous availability, certified IT professionals, customized support plans, and SOC 2 and ISO 27001 aligned security practices.",
      ],
    },
    proof: [
      {
        value: "24/7",
        label: "Continuous, round the clock support",
        image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=900&q=80",
      },
      {
        value: "15 min",
        label: "Fast response within 15 minutes",
        image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=80",
      },
      {
        value: "30%",
        label: "Up to 30% cost savings",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=900&q=80",
      },
      {
        value: "Tier 1 to 3",
        label: "Rapid resolution across all support tiers",
        image: "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=900&q=80",
      },
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
        desc: "A cost efficient helpdesk model can deliver up to 30% cost savings compared with higher in house costs.",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=900&q=80",
      },
      {
        title: "Response Time",
        desc: "Fast response within 15 minutes helps reduce downtime and keeps work moving.",
        image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=80",
      },
      {
        title: "Tailored IT Support",
        desc: "Customized support plans replace one size fits all packages and align with your tools, team, and priorities.",
        image: "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=900&q=80",
      },
      {
        title: "Compliance and Security",
        desc: "SOC 2 and ISO 27001 aligned delivery provides stronger controls than basic security only support.",
        image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=80",
      },
    ],
    benefits: [
      { title: "Industry leading Certifications", desc: "Mindwhiz prioritizes excellence in every aspect of service delivery, with certifications from globally recognized organizations." },
      { title: "Quality and Compliance", desc: "Certified practices help guarantee adherence to high standards of quality, security, and compliance." },
      { title: "Book a Free Consultation", desc: "Discuss your challenges, technical goals, and delivery priorities with a senior consultant." },
      { title: "Clear Next Steps", desc: "Get in depth insights, tailored solutions, and a practical support path for your environment." },
      { title: "Simple Pricing That Grows With You", desc: "Fixed monthly cost per user supports predictable and transparent budgeting." },
      { title: "Transparent Billing", desc: "Service scales with team size and business growth, with no hidden fees or surprise charges." },
      { title: "Maximize ROI", desc: "Reduce downtime, strengthen security, and minimize disruptions through always on support." },
    ],
    process: [
      { title: "Initial Consultation and Needs Assessment", desc: "Review the current environment, pain points, and goals to define support outcomes, SLA targets, and onboarding steps." },
      { title: "Customized Service Plan Development", desc: "Design a support model that fits your team, tools, compliance needs, escalation paths, and reporting cadence." },
      { title: "Ongoing Monitoring and Issue Resolution", desc: "Resolve tickets quickly, escalate when needed, and keep systems stable with proactive monitoring and playbooks." },
    ],
    faqs: [
      {
        q: "Is the helpdesk really staffed 24/7, including weekends and holidays?",
        a: "Yes. Coverage runs continuously rather than on limited business hours, so a request raised overnight or on a holiday reaches a real engineer the same way it would midweek. Target first response is within 15 minutes.",
      },
      {
        q: "What is the difference between Tier 1, Tier 2, and Tier 3 support?",
        a: "Tier 1 handles the everyday volume, access and password issues, device setup, and common application faults. Tier 2 takes deeper operating system, configuration, and connectivity troubleshooting. Tier 3 covers complex escalations, root cause analysis, and vendor coordination, so tickets do not stall at the first person who picks them up.",
      },
      {
        q: "How does pricing work?",
        a: "A fixed monthly cost per user, so budgeting stays predictable as your team changes. The service scales with headcount and business growth, with no hidden fees or surprise charges for busy months.",
      },
      {
        q: "Can you work with the ticketing and IT tools we already use?",
        a: "In most cases yes, we plug into your existing service desk, asset, and monitoring tools rather than forcing a migration. Where you do not have a platform in place, we can bring ours and hand over full access.",
      },
      {
        q: "What does onboarding involve before support goes live?",
        a: "It starts with a consultation and needs assessment covering your current environment, pain points, and SLA targets. From there we build a customized support plan with defined escalation paths, documentation, and reporting cadence before the first ticket is ever routed to us.",
      },
    ],
    finalCta: {
      title: "Build your hybrid team now",
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
      image: "/banners/noc-monitoring.png",
      title: ["Protect", "Your"],
      highlight: "Uptime",
      subtitle:
        "Always on monitoring, incident handling, performance optimization, and operational reporting that scales with your environment.",
      cta: "Take Control of Your IT",
    },
    intro: {
      kicker: "Industry leading NOC operations",
      title: "24/7 NOC",
      highlight: "Monitoring",
      body: [
        "MindWhiz works alongside organizations that value stability, responsiveness, and operational excellence.",
        "Our NOC teams help reduce downtime, improve visibility, and support business continuity with confidence.",
      ],
      card: {
        tags: ["Network Blind Spots", "Downtime Risk"],
        image: sharedImages.noc,
        title: "Delayed Detection",
        desc: "Fragmented monitoring and slow alerts let small network issues turn into costly outages.",
        cta: "Talk to expert",
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
            "Limited real time visibility across network and infrastructure",
            "Delayed alerts causing longer downtime",
            "Too many monitoring tools with no clear signal",
            "Lack of centralized dashboards and reporting",
            "Monitoring that does not scale with network growth",
          ],
        },
        {
          title: "NOC Performance and Operational Strain",
          items: [
            "Underperforming in house or outsourced NOC teams",
            "Slow incident detection and escalation",
            "Engineers stretched across shifts and priorities",
            "Skill gaps in network, cloud, or security monitoring",
            "Burnout due to 24/7 operational demands",
          ],
        },
        {
          title: "Cost Control and Service Predictability",
          items: [
            "Rising costs to staff and manage a full time NOC",
            "Unclear pricing tied to tickets or incidents",
            "Hidden costs from overtime and on call coverage",
            "Vendor complexity across tools and providers",
            "Difficulty forecasting NOC operational spend",
          ],
        },
      ],
    },
    capabilities: [
      { title: "Network Monitoring", desc: "Continuous monitoring of routers, switches, firewalls, and wireless networks to identify performance issues, outages, and abnormal activity.", image: "/service-coverage/noc-monitoring/network-monitoring.png" },
      { title: "Server Monitoring", desc: "Real time monitoring of physical servers, virtual machines, and cloud infrastructure to maintain uptime, capacity health, and stability.", image: "/service-coverage/noc-monitoring/server-monitoring.png" },
      { title: "Application Monitoring", desc: "Visibility into application performance and dependencies to detect slowdowns, failures, and service degradation early.", image: "/service-coverage/noc-monitoring/application-monitoring.png" },
      { title: "Website Monitoring", desc: "Availability checks, certificate status, and user experience validation for websites and portals.", image: "/service-coverage/noc-monitoring/website-monitoring.png" },
      { title: "Broadband Monitoring", desc: "Performance monitoring across broadband networks, including PON, DOCSIS, and customer equipment.", image: "/service-coverage/noc-monitoring/broadband-monitoring.png" },
      { title: "Outage Remediation", desc: "Fast issue resolution using documented runbooks, automated recovery actions, and coordinated escalation.", image: "/service-coverage/noc-monitoring/outage-remediation.png" },
    ],
    benefits: [
      { title: "Real time Incident Management", desc: "Immediate detection, triage, escalation, and resolution help minimize downtime." },
      { title: "Patch and Maintenance Support", desc: "Scheduled patching and system maintenance help preserve operational stability." },
      { title: "Operational Reporting and SLAs", desc: "Clear reporting on uptime, incidents, and response times keeps delivery measurable." },
      { title: "Scalable NOC Architecture", desc: "Monitoring coverage can expand without disrupting the environment." },
    ],
    process: [
      { title: "NOC Strategy", desc: "Define the monitoring model, operational ownership, and reporting expectations." },
      { title: "NOC Implementation", desc: "Configure monitoring, alerting, dashboards, runbooks, and escalation paths." },
      { title: "NOC Operations", desc: "Operate the monitoring desk with continuous incident handling and response." },
    ],
    faqs: [
      {
        q: "What does the NOC actually monitor?",
        a: "Servers, network devices, connectivity, core services, and the availability and performance signals that tell you something is degrading. Thresholds and alert rules are tuned to your environment during onboarding rather than left at vendor defaults.",
      },
      {
        q: "Do you only send alerts, or do you resolve issues too?",
        a: "Both. Routine and well understood conditions are actioned against agreed playbooks so they are fixed rather than forwarded. Anything outside that scope is escalated to your team with the diagnostic context already gathered.",
      },
      {
        q: "How quickly is an alert picked up?",
        a: "The NOC is staffed continuously, so alerts are triaged as they arrive rather than queued until the next working day. Priority and response targets for each alert class are agreed with you up front.",
      },
      {
        q: "Will this replace the monitoring tools we already run?",
        a: "Not necessarily. We can operate the stack you already own, extend it where there are blind spots, or stand up monitoring from scratch if you have none. The goal is coverage, not a tooling change for its own sake.",
      },
      {
        q: "How do we see what the NOC has been doing?",
        a: "You get regular reporting on incidents, response times, recurring faults, and trends, so the value is visible and repeat problems get engineered out instead of quietly absorbed.",
      },
    ],
    finalCta: {
      title: "Strengthen your operations",
      desc: "MindWhiz delivers end to end lifecycle solutions that reduce operational noise while improving performance, reliability, and visibility.",
      button: "Get started",
    },
  },
  {
    slug: "remote-desktop-assets",
    name: "Remote Desktop & IT Asset Management",
    sourceUrl: "https://mindwhiz.com/remote-desktop/",
    group: "Cloud & DevOps",
    hero: {
      image: "/banners/remote-desktop-assets.png",
      title: ["Control", "From"],
      highlight: "Anywhere",
      subtitle:
        "Complete control over your IT from anywhere. Manage devices, users, and assets with secure remote access and centralized IT asset tracking.",
      cta: "Take Control of Your IT",
    },
    intro: {
      kicker: "The power of experience",
      title: "Secure remote desktop and IT asset management",
      body: [
        "MindWhiz delivers IT asset management services that provide clear visibility and control across devices, software, and cloud environments.",
        "Structured lifecycle management supports secure onboarding, controlled access, and compliant asset retirement.",
      ],
      card: {
        tags: ["Asset Sprawl", "Access Risk"],
        image: sharedImages.remote,
        title: "Untracked Devices",
        desc: "Unmanaged laptops, licenses, and remote access create blind spots and security gaps across teams.",
        cta: "Talk to expert",
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
      { title: "Audit Ready Reporting", desc: "Clear reporting supports audits and informed decisions across distributed environments." },
    ],
    process: [
      { title: "Catalog Assets", desc: "Document devices, software, cloud resources, ownership, users, and access status." },
      { title: "Secure Access", desc: "Align remote access with security policies, identity controls, and user requirements." },
      { title: "Operate Lifecycle", desc: "Manage onboarding, offboarding, licensing, changes, and asset updates." },
    ],
    faqs: [
      {
        q: "What is included in IT asset management?",
        a: "A maintained inventory of hardware and software across the business, what exists, who holds it, how it is configured, warranty and licence status, and where it sits in its lifecycle. That record is what makes procurement, audits, and renewals straightforward instead of a scramble.",
      },
      {
        q: "Can you support remote and hybrid staff?",
        a: "Yes. Remote desktop support is built for distributed teams, so a laptop at home or on the road is supported the same way as a machine in the office, without waiting for someone to be on site.",
      },
      {
        q: "How is remote access to our machines secured?",
        a: "Access is controlled, authenticated, and logged, with sessions run under agreed permissions rather than standing administrative access. Delivery is aligned to SOC 2 and ISO 27001 practices.",
      },
      {
        q: "Do you handle software licensing and renewals?",
        a: "Yes. Licences are tracked alongside hardware, so you can see what is in use, what is idle, and what is approaching renewal, which usually surfaces spend that can be reclaimed.",
      },
      {
        q: "Can you manage employee onboarding and offboarding?",
        a: "Yes. New starters can be issued a configured device with the right access from day one, and leavers can have accounts, licences, and equipment recovered on a defined checklist so nothing stays open after they go.",
      },
    ],
    finalCta: {
      title: "Efficiency and security, unlocked",
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
      image: "/banners/cloud-infrastructure.png",
      title: ["Optimize", "Your"],
      highlight: "Cloud",
      subtitle:
        "Optimize, secure, and scale your cloud without complexity. MindWhiz manages cloud environments end to end for performance, cost efficiency, and reliability.",
      cta: "Optimize Your Cloud Today",
    },
    intro: {
      kicker: "Reliable IT infrastructure services",
      title: "Managed cloud infrastructure, migration and operations",
      body: [
        "Your business relies on always available networks, applications, and digital services. MindWhiz helps organizations maintain a resilient IT foundation.",
        "We work with your teams to design, manage, and optimize cloud environments that support performance, availability, and long term scalability.",
      ],
      card: {
        tags: ["Cloud Sprawl", "Downtime Risk"],
        image: sharedImages.cloud,
        title: "Unstable Cloud",
        desc: "Misconfigured, unmonitored cloud environments raise cost, slow teams, and put uptime at risk.",
        cta: "Talk to expert",
      },
    },
    proof: [
      { value: "24/7", label: "System monitoring" },
      { value: "Secure", label: "Backups and storage" },
      { value: "Scale", label: "Compute, storage, and network resources" },
    ],
    capabilities: [
      { title: "Dependable Cloud Environments", desc: "Design and manage cloud environments built on trusted platforms that protect data and support uptime.", image: "/service-coverage/cloud-infrastructure/dependable-cloud-environments.png" },
      { title: "Secure Backups and Storage", desc: "Implement backup and storage strategies to safeguard critical data and support recovery objectives.", image: "/service-coverage/cloud-infrastructure/secure-backups-storage.png" },
      { title: "Scalable Infrastructure", desc: "Scale compute, storage, and network resources as demand grows without disruption or unnecessary overhead.", image: "/service-coverage/cloud-infrastructure/scalable-infrastructure.png" },
    ],
    benefits: [
      { title: "24/7 System Monitoring", desc: "Continuous monitoring detects performance issues, outages, and anomalies early." },
      { title: "Faster Recovery Times", desc: "Backup, recovery, and response processes help restore services quickly after incidents." },
      { title: "Cloud Management Expertise", desc: "MindWhiz handles configuration, monitoring, and optimization so internal teams can focus on priorities." },
      { title: "Predictable Operating Costs", desc: "Clear cost visibility and controlled spending help organizations plan budgets without surprises." },
      { title: "More Focus on Business Growth", desc: "Offloading day to day cloud management gives internal teams more capacity for innovation and growth." },
    ],
    process: [
      { title: "Discovery", desc: "Map your cloud environment, risks, priorities, users, workloads, and performance gaps." },
      { title: "Management Plan", desc: "Define security, performance, backup, recovery, and scalability standards." },
      { title: "Operate and Optimize", desc: "Monitor, improve, tune, and scale the environment continuously." },
    ],
    faqs: [
      {
        q: "Which cloud platforms do you support?",
        a: "The major providers, AWS, Azure, and Google Cloud, along with hybrid setups where part of the estate stays on premises. We work in whichever platform you have already committed to.",
      },
      {
        q: "Can you help reduce what we spend on cloud?",
        a: "Usually, yes. Cost review is part of ongoing management: right sizing overprovisioned resources, removing orphaned storage and idle instances, and matching commitment models to actual usage. Savings depend on how the estate is currently configured.",
      },
      {
        q: "Do you handle migration from on premises infrastructure?",
        a: "Yes. Migrations are planned in stages with defined rollback points rather than moved in a single cutover, so workloads transition without taking the business offline.",
      },
      {
        q: "How are backups and disaster recovery handled?",
        a: "Backup schedules, retention, and recovery targets are agreed with you and then tested rather than assumed. The point of a recovery plan is that it has been exercised before you need it.",
      },
      {
        q: "Who owns our cloud accounts and data?",
        a: "You do. We work inside your accounts and subscriptions under delegated access, so billing, data, and ownership stay with you and access can be revoked at any point.",
      },
    ],
    finalCta: {
      title: "Reliable, secure cloud",
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
      image: "/banners/server-network-administration.png",
      title: ["Power", "Your"],
      highlight: "Backbone",
      subtitle:
        "Reliable infrastructure that powers business continuity. From server management to network optimization, MindWhiz keeps your IT backbone secure, stable, and high performing.",
      cta: "Strengthen Your Infrastructure",
    },
    intro: {
      kicker: "Server management",
      title: "Server and network administration services",
      body: [
        "MindWhiz server management services reduce the security and operational risks that often come with managing servers internally.",
        "Dedicated engineers monitor performance, apply updates, maintain security controls, and help prevent serious server issues before they affect the business.",
      ],
      card: {
        tags: ["Aging Servers", "Downtime Risk"],
        image: sharedImages.server,
        title: "Fragile Infrastructure",
        desc: "Unpatched servers and unmonitored networks turn small faults into outages that stall the business.",
        cta: "Talk to expert",
      },
    },
    proof: [
      { value: "Comanaged", label: "Operating model" },
      { value: "Reduced", label: "Operational risk" },
      { value: "Optimized", label: "Uptime and capacity" },
    ],
    capabilities: [
      { title: "Proactive Monitoring", desc: "Health checks, performance baselines, and alert tuning reduce downtime and improve visibility.", image: "https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&w=900&q=80" },
      { title: "Patch and Harden", desc: "Routine updates and security controls keep server environments stable and aligned with risk posture.", image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=900&q=80" },
      { title: "Incident Response", desc: "Clear escalation paths and fast remediation help resolve issues before disruption spreads.", image: "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=900&q=80" },
      { title: "Capacity Planning", desc: "Right size compute, storage, and resources so infrastructure remains stable as the business grows.", image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=900&q=80" },
    ],
    benefits: [
      { title: "Troubleshooting", desc: "Identify, isolate, and resolve server problems through proactive monitoring and efficient support." },
      { title: "Maintenance", desc: "Ongoing server maintenance reduces downtime and security risk while keeping systems reliable." },
      { title: "Software Installations", desc: "Manage software installations and updates to ensure compatibility and reduce configuration errors." },
      { title: "Cloud Management", desc: "Manage cloud based server configurations and operations with specialized tools and experience." },
      { title: "Server Optimization", desc: "Identify performance gaps and optimize configurations to improve reliability and resource utilization." },
    ],
    process: [
      { title: "Monitor Continuously", desc: "Dedicated teams monitor server environments for potential issues." },
      { title: "Respond Quickly", desc: "When problems are detected, teams respond quickly and notify stakeholders according to defined timelines." },
      { title: "Maintain Proactively", desc: "Routine operating system and software updates reduce common server issues." },
    ],
    faqs: [
      {
        q: "Do you support on premises, cloud, and hybrid environments?",
        a: "Yes. Most environments are a mix, and administration covers physical servers, virtualized workloads, and cloud instances under one arrangement rather than splitting responsibility across providers.",
      },
      {
        q: "How do you handle patching without disrupting the business?",
        a: "Patching runs on an agreed schedule inside maintenance windows that suit your operating hours, with critical security updates handled on a faster track. Changes are staged and reversible.",
      },
      {
        q: "What network security is covered?",
        a: "Firewall configuration and review, VPN and remote access, segmentation, and monitoring of the network layer for faults and suspicious activity, maintained continuously rather than set once at install.",
      },
      {
        q: "Can you take over from our current provider?",
        a: "Yes. Transitions start with an audit of the existing estate and documentation of what is actually running, so nothing is lost in handover before we assume day to day responsibility.",
      },
      {
        q: "Will we get documentation of our own environment?",
        a: "Yes. Configurations, topology, credentials handling, and procedures are documented and kept current, and that documentation is yours, it does not lock you into us.",
      },
    ],
    finalCta: {
      title: "We support multiple platforms",
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
      image: "/banners/endpoint-security.png",
      title: ["Secure", "Every"],
      highlight: "Device",
      subtitle:
        "Endpoint protection, patch visibility, device compliance, and response workflows for distributed teams and managed fleets.",
      cta: "Secure your endpoints",
    },
    intro: {
      kicker: "Endpoint security operations",
      title: "Managed endpoint security and device protection",
      body: [
        "Endpoint security keeps laptops, workstations, and servers protected as teams scale across locations.",
        "MindWhiz supports monitoring, policy alignment, patch visibility, and remediation workflows that reduce device level risk.",
      ],
      card: {
        tags: ["Endpoint Risk", "Compliance Gaps"],
        image: "/service-coverage/endpoint-security/endpoint-protection.png",
        title: "Unmanaged Devices",
        desc: "Unpatched laptops and unmonitored endpoints leave distributed teams exposed to preventable incidents.",
        cta: "Talk to expert",
      },
    },
    proof: [
      { value: "EDR", label: "Managed protection" },
      { value: "Patch", label: "Compliance tracking" },
      { value: "Fleet", label: "Device visibility" },
    ],
    capabilities: [
      { title: "Device Protection", desc: "EDR/AV posture monitoring, policy checks, and response coordination for risky devices.", image: "/services/endpoint-security/device-protection.png" },
      { title: "Patch Tracking", desc: "Patch status, exception followup, and reporting for laptops, workstations, and servers.", image: "/services/endpoint-security/patch-tracking.png" },
      { title: "Access Controls", desc: "Device compliance, enrollment checks, and security hygiene across remote work environments.", image: "/services/endpoint-security/access-control.png" },
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
    faqs: [
      {
        q: "What counts as an endpoint?",
        a: "Any device that connects to your environment and can be used to reach your data, laptops, desktops, servers, and mobile devices, whether they sit in an office or with a remote employee.",
      },
      {
        q: "Does this replace the antivirus we already have?",
        a: "Often it extends it. Traditional antivirus matches known threats; endpoint protection adds behavioural detection, response, and visibility across the fleet. Where your existing tool is capable, we manage it rather than rip it out.",
      },
      {
        q: "What happens when a threat is detected on a device?",
        a: "The device can be isolated to stop lateral movement, the threat is investigated and removed, and the device is restored to a known good state, with a record of what happened and what changed.",
      },
      {
        q: "Can you support employee owned or BYOD devices?",
        a: "Yes, within policies agreed with you. Controls can be scoped to business data and applications so personal devices are protected where it matters without taking blanket control of the whole device.",
      },
      {
        q: "Does endpoint security help with our compliance requirements?",
        a: "It contributes directly. Device inventory, patch status, encryption, access control, and incident records are common evidence requirements, and delivery is aligned to SOC 2 and ISO 27001 practices.",
      },
    ],
    finalCta: {
      title: "Protect every device",
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
      image: "/banners/devops-automation.png",
      title: ["Ship", "With"],
      highlight: "Automation",
      subtitle:
        "Accelerate development with smarter automation. Streamline workflows, reduce deployment time, and improve reliability with modern DevOps practices.",
      cta: "Speed Up Your Delivery",
    },
    intro: {
      kicker: "Software delivery and cloud infrastructure",
      title: "DevOps and delivery automation services",
      body: [
        "MindWhiz works across cloud platforms and environments to support DevOps and automation needs without relying on vendor specific tools.",
        "By automating critical workflows, MindWhiz reduces operational complexity, increases efficiency, and supports security and compliance across modern infrastructure.",
      ],
      card: {
        tags: ["Manual Releases", "Slow Delivery"],
        image: sharedImages.devops,
        title: "Deployment Bottlenecks",
        desc: "Manual, error prone releases slow delivery and make every deployment a risk instead of routine.",
        cta: "Talk to expert",
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
      { title: "Security and Compliance", desc: "Embed security scans, compliance checks, and DevSecOps practices into delivery workflows.", image: "/service-coverage/cybersecurity/security-control.png" },
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
      { title: "Discovery", desc: "Evaluate infrastructure, tooling, workflows, target architecture, and phase based roadmap." },
    ],
    faqs: [
      {
        q: "What does a DevOps engagement typically include?",
        a: "Build and release pipelines, infrastructure as code, containerization and orchestration, environment consistency, and the monitoring that tells you whether a release actually behaved. Scope is set against where your delivery is currently slowest.",
      },
      {
        q: "Which tools do you work with?",
        a: "The mainstream ecosystem, Git based CI/CD, Docker and Kubernetes, Terraform, and the native tooling in AWS, Azure, and Google Cloud. We work with what your team already knows unless there is a clear reason to change.",
      },
      {
        q: "Can you improve our existing pipeline instead of rebuilding it?",
        a: "Usually that is the better path. We audit what you have, fix the parts that cause failed or slow releases, and rebuild only where the existing setup cannot be made reliable.",
      },
      {
        q: "How are secrets and production access handled?",
        a: "Credentials move into managed secret storage rather than living in repositories or CI configuration, and access is scoped and logged. Production access is granted deliberately, not by default.",
      },
      {
        q: "Will releases be disrupted while this is being set up?",
        a: "Changes are introduced incrementally alongside your current process, so the existing route to production keeps working until the replacement is proven.",
      },
    ],
    finalCta: {
      title: "Lead your digital journey",
      desc: "Get a structured, outcome driven DevOps roadmap that accelerates delivery, improves reliability, and reduces operational risk.",
      button: "Get expert consultation",
    },
  },
  {
    slug: "cybersecurity-monitoring",
    name: "Cybersecurity Monitoring",
    sourceUrl: "https://mindwhiz.com/cybersecurity-dummy/",
    group: "IT & Security",
    hero: {
      image: "/banners/cybersecurity-monitoring.png",
      title: ["Defeat", "Cyber"],
      highlight: "Threats",
      subtitle:
        "Real time protection against evolving threats. MindWhiz monitors systems 24/7 to detect, prevent, and respond before threats impact your business.",
      cta: "Protect Your Business Now",
    },
    intro: {
      kicker: "Cybersecurity protection 24/7/365",
      title: "24/7 cybersecurity monitoring and threat response",
      body: [
        "Through monitoring capabilities and deep cybersecurity expertise, MindWhiz helps organizations stay protected while focusing on their most critical security priorities.",
        "MindWhiz supports continuous assessment, monitoring, and response across complex environments.",
      ],
      card: {
        tags: ["Threat Exposure", "Alert Fatigue"],
        image: sharedImages.cyber,
        title: "Blind To Threats",
        desc: "Limited monitoring and noisy alerts let real threats slip through until they become incidents.",
        cta: "Talk to expert",
      },
    },
    proof: [
      { value: "24/7/365", label: "Security monitoring" },
      { value: "MDR", label: "Detection and response" },
      { value: "SIEM + EDR", label: "Technology enabled monitoring" },
      { value: "Unified", label: "Security visibility" },
    ],
    capabilities: [
      { title: "Managed Detection and Response", desc: "Monitor activity, identify threats, and respond to security risks in real time.", image: "/service-coverage/cybersecurity/managed-detection.png" },
      { title: "Threat Hunting", desc: "Structured threat hunting identifies suspicious activity and hidden risks before impact occurs.", image: "/service-coverage/cybersecurity/threat-hunting.png" },
      { title: "Attack Surface Visibility", desc: "Monitoring across endpoints, networks, email, and cloud environments maintains comprehensive coverage.", image: "/service-coverage/cybersecurity/attack-surface.png" },
      { title: "Security Control Management", desc: "Best practice security controls improve visibility while reducing operational complexity.", image: "/service-coverage/cybersecurity/security-control.png" },
    ],
    benefits: [
      { title: "Modern MDR Capabilities", desc: "Integrated threat detection and response supported by SOC workflows." },
      { title: "Technology Enabled Monitoring", desc: "Built on SIEM and EDR platforms without requiring additional tooling investment." },
      { title: "Comprehensive Security Coverage", desc: "Monitoring across defensive controls, threat intelligence, and governance visibility." },
      { title: "Extension of Your Security Team", desc: "Frontline security operations support frees internal teams to focus on strategy." },
      { title: "Prevention, Trust, Platform", desc: "Early prevention, always on coverage, and integrated monitoring create unified visibility." },
    ],
    process: [
      { title: "Assess Coverage", desc: "Review endpoints, networks, email, cloud environments, controls, and governance needs." },
      { title: "Integrate Monitoring", desc: "Connect SIEM, EDR, and existing tools into a flexible monitoring model." },
      { title: "Detect and Investigate", desc: "MDR analysts investigate suspicious activity and neutralize incidents with speed and accuracy." },
    ],
    faqs: [
      {
        q: "What is being monitored, and how?",
        a: "Logs and security signals from endpoints, servers, network devices, and cloud services are collected centrally and correlated, so activity that looks harmless in isolation is caught when it forms a pattern. Monitoring runs continuously.",
      },
      {
        q: "What happens when an incident is detected?",
        a: "It is triaged and validated first to avoid acting on noise, then contained according to an agreed response plan, investigated for scope and root cause, and reported to you with what was affected and what was done.",
      },
      {
        q: "Do you help with compliance frameworks?",
        a: "Yes. Delivery is aligned to SOC 2 and ISO 27001 practices, and the monitoring, logging, and incident records the service produces are the evidence auditors typically ask for. We support your compliance programme rather than certify it on your behalf.",
      },
      {
        q: "Do you replace our internal security team?",
        a: "Only if you want us to. More often we extend an internal team by covering the hours and the alert volume they cannot sustain, and by handling the first line of triage so their time goes to the incidents that matter.",
      },
      {
        q: "How is this reported back to us?",
        a: "Regular reporting covers incidents raised, how they were resolved, response times, and the trends worth acting on, written to be read by both technical staff and management.",
      },
    ],
    finalCta: {
      title: "Prevention, backed by trust",
      desc: "MindWhiz focuses on early threat prevention, always on coverage, and unified visibility across your environment.",
      button: "Get a security review",
    },
  },
  {
    slug: "staff-augmentation",
    name: "Staff Augmentation",
    sourceUrl: "https://mindwhiz.com/staff-augmentation/",
    group: "Talent & Workforce",
    hero: {
      image: "/banners/staff-augmentation.png",
      title: ["On Demand"],
      highlight: "Teams",
      subtitle:
        "Add vetted specialists to your team in weeks, not months. Scale delivery up or down without the cost and commitment of full time hires.",
      cta: "Augment your team",
    },
    intro: {
      kicker: "Talent & Workforce",
      title: "IT staff augmentation and team extension",
      body: [
        "MindWhiz staff augmentation gives you role ready engineers, analysts, and operators who plug straight into your workflows, tools, and standards.",
        "You keep full control of direction and priorities while we handle sourcing, vetting, onboarding, and retention, so your roadmap never waits on hiring.",
      ],
      card: {
        tags: ["Hiring Delays", "Skill Gaps"],
        image: "/service-coverage/staff-augmentation/skilled-talent.png",
        title: "Talent Gaps",
        desc: "Long hiring cycles and missing skills stall roadmaps while the work piles up.",
        cta: "Talk to expert",
      },
    },
    proof: [
      { value: "2 wks", label: "Typical time from brief to onboarded talent" },
      { value: "500+", label: "Specialists across IT, finance, and operations" },
      { value: "30%", label: "Lower cost than local full time hiring" },
      { value: "Flexible", label: "Scale up or down as projects change" },
    ],
    capabilities: [
      {
        title: "Vetted Specialists",
        desc: "Role ready professionals screened for skills, communication, and reliability before they ever reach your shortlist.",
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
      { title: "No Hiring Overhead", desc: "Skip recruiting, benefits, and long term commitments while still getting senior, dedicated people." },
      { title: "Hybrid Delivery", desc: "Onshore and offshore specialists that stay aligned across time zones and handoffs." },
      { title: "Predictable Cost", desc: "Transparent monthly rates that scale with your team, with no hidden fees or surprise charges." },
    ],
    process: [
      { title: "Role and Skills Brief", desc: "We capture the exact skills, seniority, tools, and outcomes you need, plus how success will be measured." },
      { title: "Vetted Shortlist", desc: "You review a short list of prescreened candidates matched to your stack, culture, and priorities." },
      { title: "Onboarding and Integration", desc: "Selected talent connects into your workflows, security, and documentation with minimal disruption." },
    ],
    faqs: [
      {
        q: "How is this different from outsourcing a project?",
        a: "You are adding people to your team, not handing over a deliverable. Augmented staff work inside your processes, tools, and standups, and you direct their priorities day to day.",
      },
      {
        q: "How quickly can someone start?",
        a: "It depends on the role and seniority, but the model exists to move faster than a direct hire, candidates are matched from an existing bench rather than recruited from scratch. We give you a realistic timeline once the role is scoped.",
      },
      {
        q: "Who manages the person day to day?",
        a: "You do. We handle employment, payroll, and retention; you handle direction and priorities, the same as with any member of your team.",
      },
      {
        q: "What time zones can you cover?",
        a: "Coverage can be aligned to your working hours, including overlap with UK and US teams, so collaboration happens live rather than through overnight handoffs.",
      },
      {
        q: "What if someone is not the right fit?",
        a: "Tell us early. Replacement is part of the arrangement, and the terms for it are agreed before an engagement starts so there is no dispute about it later.",
      },
    ],
    finalCta: {
      title: "Build your hybrid team now",
      desc: "Tell us what you are trying to achieve. Mindwhiz will respond with the right people, the right approach, and a clear next step.",
      button: "Get in touch",
    },
  },
];

export function getServicePage(slug: string) {
  return servicePages.find((page) => page.slug === slug);
}
