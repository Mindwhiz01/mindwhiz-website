// ---------------------------------------------------------------------------
// Dedicated landing pages for keyword clusters that Search Console showed
// ranking with no matching page (audit items K1-K4):
//   offshore staff augmentation        -> /services/offshore-staff-augmentation
//   cybersecurity staff augmentation   -> /services/cybersecurity-staff-augmentation
//   cloud security consulting          -> /services/cloud-security-consulting
//   accounting staff augmentation      -> /services/accounting-staff-augmentation
// They render through the shared ServiceDetailPage like every other service.
// ---------------------------------------------------------------------------

import type { ServicePageContent } from "@/lib/servicePages";
import { claims } from "@/lib/claims";


const usHoursFaq = {
  q: "How do offshore staff in Pakistan work US hours?",
  a: "By shift. Lahore is 9 hours ahead of US Eastern and 12 ahead of Pacific, so US-facing staff work an evening or night shift in Pakistan: 8 am to 5 pm Eastern is 5 pm to 2 am in Lahore. You get live overlap for standups, chat and calls rather than overnight handoffs.",
};

export const newServicePages: ServicePageContent[] = [
  // ======================================================================= K1
  {
    slug: "offshore-staff-augmentation",
    capabilitiesHook: { audience: "For US teams that need engineers this month", question: "What would ship faster with two more senior engineers starting in two weeks?" },
    name: "Offshore Staff Augmentation",
    sourceUrl: "",
    group: "Talent & Workforce",
    hero: {
      h1: "Offshore Staff Augmentation Services for US Companies",
      image: "/banners/staff-augmentation.webp",
      title: ["Offshore", "Talent,"],
      highlight: "Your Hours",
      heroRotate: ["Your Team", "Your Stack"],
      subtitle: `Add vetted offshore engineers, analysts and specialists to your team in ${claims.deployTime}. They work your US hours, inside your tools, at typically ${claims.savingsRange} less than a local hire.`,
      cta: "Get offshore talent",
    },
    intro: {
      kicker: "Offshore staff augmentation",
      title: "Offshore developers and specialists who work as part of your team",
      body: [
        "Offshore staff augmentation lets US companies add dedicated remote professionals to their own team without opening a foreign entity or running international payroll. MindWhiz recruits, employs and retains the people in Lahore, Pakistan; you direct their work day to day exactly as you would an employee.",
        "Unlike project outsourcing, you keep full control of priorities, code and process. Unlike freelancers, every specialist is full time on your account, background checked, covered by NDA and IP assignment, and replaced on agreed terms if the fit is wrong.",
      ],
      card: {
        tags: ["Hiring Delays", "US Salary Costs"],
        image: "/banners/information-technology.webp",
        title: "Roadmap Waiting On Hiring",
        desc: `A US technical hire commonly takes ${claims.usHireTime}. Offshore augmentation typically starts in ${claims.deployTime}.`,
        cta: "Talk to expert",
      },
    },
    proof: [
      { value: claims.deployTimeShort, label: "Typical time to start" },
      { value: claims.savingsRange, label: "Typical saving vs a US in-house hire" },
      { value: claims.teamSize, label: "Vetted specialists in our Lahore team" },
      { value: "US hours", label: "Dedicated evening and night shifts" },
    ],
    problems: {
      title: "When offshore staff augmentation is the right call",
      groups: [
        {
          title: "Good fit",
          items: [
            "You have a backlog and an engineering lead, but not enough hands.",
            "US hiring is too slow or too expensive for the roles you need.",
            "You need niche skills for months, not a permanent headcount.",
            "You want people inside your sprint, not a vendor delivering a black box.",
          ],
        },
        {
          title: "What we handle",
          items: [
            "Sourcing, technical vetting and English communication screening.",
            "Employment, payroll, benefits and equipment in Pakistan.",
            "Secure devices, MFA and least-privilege access setup.",
            "Retention, reviews and replacement on written terms.",
          ],
        },
        {
          title: "Consider something else if",
          items: [
            "You need a fixed-scope project delivered end to end.",
            "Nobody on your side can direct the work day to day.",
            "The role legally requires US residency or clearance.",
          ],
        },
      ],
    },
    capabilities: [
      { title: "Software Engineers", desc: "Full-stack, front-end and back-end developers in React, Node.js, Python, .NET, PHP and mobile.", image: "/banners/web-services.webp" },
      { title: "DevOps and Cloud Engineers", desc: "AWS, Azure and GCP engineers for CI/CD, Kubernetes, Terraform and cloud operations.", image: "/banners/devops-automation.webp" },
      { title: "QA and Test Engineers", desc: "Manual and automation testers using Playwright, Cypress and Selenium.", image: "/banners/information-technology.webp" },
      { title: "IT Support and NOC", desc: "Helpdesk, systems and network engineers for US-hours and 24/7 coverage.", image: "/banners/it-helpdesk.webp" },
      { title: "Security Analysts", desc: "SOC analysts and security engineers for monitoring, vulnerability management and compliance.", image: "/banners/cybersecurity-monitoring.webp" },
      { title: "Finance and Back Office", desc: "Accountants, bookkeepers and operations specialists for US-standard processes.", image: "/banners/finance.webp" },
    ],
    benefits: [
      { title: "Full Control", desc: "Specialists join your standups, tools and repos. You set priorities; we handle employment." },
      { title: "Real US-Hours Overlap", desc: "Dedicated shifts aligned to Eastern, Central, Mountain or Pacific time." },
      { title: "Lower Total Cost", desc: `Typically ${claims.savingsRange} below the fully loaded cost of a US hire, with one monthly rate per person.` },
      { title: "Security Built In", desc: "NDAs, IP assignment, managed devices, MFA and access revoked on the last day." },
    ],
    process: [
      { title: "Role Brief", desc: "A 30-minute call to define skills, seniority, hours of overlap and success measures." },
      { title: "Vetted Shortlist", desc: `Pre-screened candidates in ${claims.shortlistTime}. You interview and choose.` },
      { title: "Onboard and Deliver", desc: `Your specialist starts in ${claims.deployTime} with a secure device and access ready.` },
    ],
    faqs: [
      {
        q: "What is offshore staff augmentation?",
        a: "Offshore staff augmentation is hiring dedicated remote professionals in another country through a provider who employs them, while they work as part of your team. You direct the work; the provider handles recruiting, payroll, benefits, equipment and retention.",
      },
      {
        q: "How much does offshore staff augmentation cost?",
        a: `You pay one monthly rate per person, set by role and seniority. Compared with the fully loaded cost of the same role in the US, offshore augmentation from Pakistan is typically ${claims.savingsRangeWords} cheaper. The pricing table on this page uses US Bureau of Labor Statistics wage data for comparison.`,
      },
      {
        q: "Why Pakistan for offshore staff augmentation?",
        a: "Pakistan has a large, English-speaking technical workforce, strong university pipelines in computer science and accounting, and a time zone that allows dedicated US-hours shifts. Costs are lower than in more saturated offshore markets for comparable seniority.",
      },
      usHoursFaq,
      {
        q: "Who owns the code and intellectual property?",
        a: "You do. Every specialist signs an NDA and an IP assignment, and our client agreement assigns all work product to you. Code lives in your repositories and accounts, never ours.",
      },
      {
        q: "What happens if a specialist is not the right fit?",
        a: "Tell us early. Replacement terms are agreed in writing before the engagement starts, and we shortlist a replacement from the same vetted bench.",
      },
      {
        q: "Is there a minimum contract length?",
        a: "Engagements are usually month to month after an initial period agreed up front, so you can scale up or down as your roadmap changes.",
      },
    ],
    relatedReading: [
      { title: "Staff augmentation pros and cons", desc: "The real tradeoffs, costs and when to choose something else.", href: "/blog/staff-augmentation-pros-and-cons" },
      { title: "IT staff augmentation services", desc: "How our general staff augmentation model works.", href: "/services/staff-augmentation" },
      { title: "MindWhiz in the United States", desc: "How we work with US companies, shift table and FAQs.", href: "/locations/us" },
    ],
    finalCta: {
      title: "Add offshore talent to your team",
      desc: "Tell us the role and hours you need. We will come back with a shortlist plan and a fixed monthly rate.",
      button: "Get a shortlist",
    },
  },

  // ======================================================================= K2
  {
    slug: "cybersecurity-staff-augmentation",
    capabilitiesHook: { audience: "For security leaders and MSPs", question: "How many alerts did your team not get to last night?" },
    name: "Cybersecurity Staff Augmentation",
    sourceUrl: "https://mindwhiz.com/cyber-security-staff-augmentation-services/",
    group: "IT & Security",
    hero: {
      h1: "Cybersecurity Staff Augmentation for US Companies and MSPs",
      image: "/banners/cybersecurity-monitoring.webp",
      title: ["Security", "Talent,"],
      highlight: "On Demand",
      heroRotate: ["Analysts", "Engineers", "Experts"],
      subtitle: `Add vetted SOC analysts, security engineers and GRC specialists to your team in ${claims.deployTime}, covering US hours and nights, without a 6-month hiring search.`,
      cta: "Hire security talent",
    },
    intro: {
      kicker: "Cybersecurity staff augmentation",
      title: "Dedicated security analysts and engineers who join your team",
      body: [
        "Cybersecurity staff augmentation gives you dedicated security professionals who work inside your SOC, tools and processes, directed by your security lead. MindWhiz handles recruiting, employment, certification support and retention from our Lahore delivery center.",
        "It is the right model when you already own your security program but lack the people to run it 24/7, clear an alert backlog, or deliver a compliance project. If you would rather hand over the whole service against an SLA, see our managed SOC and MDR service instead.",
      ],
      card: {
        tags: ["Talent Shortage", "Alert Backlog"],
        image: "/service-coverage/cybersecurity/threat-hunting.webp",
        title: "Not Enough Analysts",
        desc: "Security roles are among the hardest to fill, and every unstaffed shift is an unwatched one.",
        cta: "Talk to expert",
      },
    },
    proof: [
      { value: claims.deployTimeShort, label: "Typical time to start" },
      { value: "24/7", label: "Shift coverage available" },
      { value: "CEH · OSCP · GIAC", label: "Certifications across the team" },
      { value: claims.savingsRange, label: "Typical saving vs a US in-house hire" },
    ],
    capabilities: [
      { title: "SOC Analysts (Tier 1-3)", desc: "Alert triage, investigation and incident handling in your SIEM and EDR.", image: "/service-coverage/cybersecurity/managed-detection.webp" },
      { title: "Security Engineers", desc: "SIEM content, EDR tuning, firewall and identity hardening, automation.", image: "/service-coverage/cybersecurity/security-control.webp" },
      { title: "Vulnerability Management", desc: "Scanning, prioritization, patch coordination and reporting.", image: "/service-coverage/cybersecurity/attack-surface.webp" },
      { title: "Penetration Testers", desc: "Web, API and network testing by OSCP- and GWAPT-certified testers.", image: "/service-coverage/cybersecurity/threat-hunting.webp" },
      { title: "GRC and Compliance", desc: "SOC 2, ISO 27001, HIPAA and PCI DSS evidence, policies and audit support.", image: "/banners/endpoint-security.webp" },
    ],
    benefits: [
      { title: "Your Program, More Hands", desc: "Analysts follow your playbooks and escalation paths, under your security lead." },
      { title: "Night and Weekend Cover", desc: "Shifts that cover the hours your in-house team cannot." },
      { title: "Certified Talent", desc: "Team members hold or are working toward CompTIA Security+, CEH, GIAC and OSCP." },
      { title: "Controlled Access", desc: "Managed devices, MFA, least privilege and logged access to your environment." },
    ],
    process: [
      { title: "Scope the Role", desc: "Skills, tools, shift pattern and the security outcomes you need." },
      { title: "Technical Shortlist", desc: "Candidates assessed on your SIEM, EDR and scenarios before you interview." },
      { title: "Onboard Securely", desc: "Device, access and runbooks ready on day one." },
    ],
    faqs: [
      {
        q: "What is cybersecurity staff augmentation?",
        a: "It is adding dedicated, vetted security professionals to your own team through a provider who employs them. They work under your direction, in your tools, while the provider handles hiring, payroll, retention and replacement.",
      },
      {
        q: "Staff augmentation or managed SOC: which should I choose?",
        a: "Choose staff augmentation if you have a security lead and want more people inside your program. Choose a managed SOC or MDR if you want a provider accountable for 24/7 monitoring against an SLA. Many companies combine both.",
      },
      {
        q: "How much does a cybersecurity analyst cost through staff augmentation?",
        a: `The US median wage for an information security analyst is $129,180 (BLS, May 2025), or roughly $185,000 a year with benefits. Through offshore staff augmentation the same role typically costs ${claims.savingsRangeWords} less, billed as one monthly rate.`,
      },
      {
        q: "Can augmented analysts work in our SIEM and EDR?",
        a: "Yes. They work in your tools, such as Microsoft Sentinel and Defender, Splunk, CrowdStrike, SentinelOne, Elastic or Wazuh, using accounts you control and can revoke at any time.",
      },
      usHoursFaq,
      {
        q: "Do you provide cybersecurity talent for MSPs and MSSPs?",
        a: "Yes. MSPs use our analysts to staff a white-label SOC or to add night coverage, working in the MSP's PSA, RMM and security stack under its brand.",
      },
    ],
    relatedReading: [
      { title: "Managed SOC and MDR", desc: "Hand over 24/7 monitoring against an SLA instead.", href: "/services/cybersecurity-monitoring" },
      { title: "Cloud security consulting", desc: "Assess and harden AWS, Azure and GCP.", href: "/services/cloud-security-consulting" },
      { title: "Offshore staff augmentation", desc: "How our offshore model works across all roles.", href: "/services/offshore-staff-augmentation" },
    ],
    finalCta: {
      title: "Staff your security team",
      desc: "Tell us the roles, tools and shifts you need. We will send a shortlist plan and monthly rates.",
      button: "Get security talent",
    },
  },

  // ======================================================================= K3
  {
    slug: "cloud-security-consulting",
    capabilitiesHook: { audience: "For teams running on AWS, Azure or GCP", question: "Do you know which of your cloud storage buckets are public right now?" },
    name: "Cloud Security Consulting",
    sourceUrl: "https://mindwhiz.com/top-cloud-security-consulting/",
    group: "Cloud & DevOps",
    hero: {
      h1: "Cloud Security Consulting Services for AWS, Azure and GCP",
      image: "/banners/cloud-infrastructure.webp",
      title: ["Secure", "Your"],
      highlight: "Cloud",
      heroRotate: ["AWS", "Azure", "GCP"],
      subtitle: "Cloud security assessments, architecture reviews and hands-on remediation for US companies running on AWS, Azure and Google Cloud, delivered by certified cloud security engineers.",
      cta: "Get a cloud security review",
    },
    intro: {
      kicker: "Cloud security consulting",
      title: "Find and fix cloud security gaps before attackers do",
      body: [
        "Most cloud breaches start with misconfiguration: public storage, over-privileged identities, exposed keys or missing logging. Our cloud security consultants assess your AWS, Azure or GCP environment against the CIS Benchmarks and your compliance needs, then help your team fix what matters first.",
        "Engagements range from a fixed-scope assessment to ongoing cloud security engineering, and we can run continuous posture monitoring after the initial work so gaps do not return.",
      ],
      card: {
        tags: ["Misconfiguration", "Excess Permissions"],
        image: "/service-coverage/cloud-infrastructure/secure-backups-storage.webp",
        title: "Invisible Exposure",
        desc: "One public bucket or leaked access key can undo every other control you have.",
        cta: "Talk to expert",
      },
    },
    proof: [
      { value: "AWS · Azure · GCP", label: "Platforms covered" },
      { value: "CIS", label: "Benchmark-based assessments" },
      { value: "2-4 wks", label: "Typical assessment timeline" },
      { value: "Fix-first", label: "Prioritized remediation plan" },
    ],
    capabilities: [
      { title: "Cloud Security Assessment", desc: "Configuration review against CIS Benchmarks and provider best practices.", image: "/service-coverage/cloud-infrastructure/dependable-cloud-environments.webp" },
      { title: "Identity and Access Review", desc: "Least-privilege IAM, MFA, role design and key rotation.", image: "/service-coverage/cybersecurity/security-control.webp" },
      { title: "Architecture Review", desc: "Network segmentation, encryption, secrets management and landing zones.", image: "/service-coverage/cloud-infrastructure/scalable-infrastructure.webp" },
      { title: "Posture Monitoring", desc: "Ongoing CSPM with Security Hub, Defender for Cloud or Security Command Center.", image: "/service-coverage/cybersecurity/attack-surface.webp" },
      { title: "Compliance Readiness", desc: "Cloud evidence for SOC 2, HIPAA, PCI DSS and ISO 27001.", image: "/service-coverage/cloud-infrastructure/secure-backups-storage.webp" },
    ],
    benefits: [
      { title: "Prioritized Findings", desc: "Every finding ranked by real risk, with the fix and effort spelled out." },
      { title: "Hands-on Remediation", desc: "We can fix issues with your team, not just hand over a PDF." },
      { title: "Infrastructure as Code", desc: "Fixes delivered in Terraform or your IaC so they stay fixed." },
      { title: "Continuous Coverage", desc: "Optional posture monitoring catches drift after the assessment." },
    ],
    process: [
      { title: "Scope and Access", desc: "Agree accounts, subscriptions and projects in scope, with read-only access." },
      { title: "Assess", desc: "Automated scanning plus manual review of identity, network, data and logging." },
      { title: "Report and Remediate", desc: "Walkthrough of findings, a prioritized plan, and optional hands-on fixes." },
    ],
    faqs: [
      {
        q: "What do cloud security consulting services include?",
        a: "Typically a configuration and architecture assessment, an identity and access review, logging and detection checks, a prioritized remediation plan, and optional hands-on remediation and continuous posture monitoring.",
      },
      {
        q: "How long does a cloud security assessment take?",
        a: "A typical assessment of a small to mid-sized environment takes two to four weeks from access to report, depending on the number of accounts, subscriptions and workloads in scope.",
      },
      {
        q: "Which frameworks do you assess against?",
        a: "We use the CIS Benchmarks for AWS, Azure and GCP, the provider's own well-architected security guidance, and map findings to SOC 2, HIPAA, PCI DSS or ISO 27001 where you need compliance evidence.",
      },
      {
        q: "Do you need admin access to our cloud?",
        a: "No. Assessments run with read-only, audited access that you create and can revoke. Write access is only needed if you ask us to carry out remediation.",
      },
      {
        q: "How is cloud security consulting priced?",
        a: "Assessments are usually a fixed fee based on the number of accounts and workloads in scope. Ongoing engineering and posture monitoring are billed monthly. We quote after a short scoping call.",
      },
      {
        q: "Can you help after the assessment?",
        a: "Yes. We can remediate alongside your engineers, provide a dedicated cloud security engineer through staff augmentation, or run continuous posture monitoring.",
      },
    ],
    relatedReading: [
      { title: "Cloud infrastructure management", desc: "Ongoing AWS, Azure and GCP operations.", href: "/services/cloud-infrastructure" },
      { title: "Managed SOC and MDR", desc: "24/7 detection and response, including cloud.", href: "/services/cybersecurity-monitoring" },
      { title: "Cybersecurity staff augmentation", desc: "Dedicated security engineers on your team.", href: "/services/cybersecurity-staff-augmentation" },
    ],
    finalCta: {
      title: "Get a cloud security review",
      desc: "Tell us which clouds and accounts you run. We will scope an assessment and send a fixed quote.",
      button: "Scope my assessment",
    },
  },

  // ======================================================================= K4
  {
    slug: "accounting-staff-augmentation",
    capabilitiesHook: { audience: "For CPA firms and finance teams", question: "How much of busy season is your team spending on work an offshore accountant could do?" },
    name: "Accounting Staff Augmentation",
    sourceUrl: "https://mindwhiz.com/accounting-staff-augmentation/",
    group: "Talent & Workforce",
    hero: {
      h1: "Accounting and Finance Staff Augmentation for US Firms",
      image: "/banners/accounting-finance.webp",
      title: ["More", "Hands,"],
      highlight: "Same Books",
      heroRotate: ["Faster Close", "Busy Season"],
      subtitle: `Add dedicated offshore accountants, bookkeepers and AP/AR specialists to your team in ${claims.deployTime}, trained on US GAAP and the software you already use.`,
      cta: "Hire accounting talent",
    },
    intro: {
      kicker: "Accounting staff augmentation",
      title: "Dedicated offshore accountants who work inside your firm",
      body: [
        "Accounting staff augmentation gives CPA firms and in-house finance teams dedicated accountants who work in your systems, follow your checklists and report to your managers. MindWhiz recruits, employs and retains them in Lahore, where accounting talent with US GAAP experience is strong.",
        "It suits firms facing busy-season peaks, a shortage of staff accountants, or a backlog of bookkeeping and reconciliations. If you would rather outsource whole processes such as AP or month-end close, see our finance and accounting outsourcing service.",
      ],
      card: {
        tags: ["Staff Shortage", "Busy Season"],
        image: "/service-coverage/finance/bookkeeping.webp",
        title: "Too Few Accountants",
        desc: "The accounting talent shortage means open seats, overtime and work turned away.",
        cta: "Talk to expert",
      },
    },
    proof: [
      { value: claims.deployTimeShort, label: "Typical time to start" },
      { value: "US GAAP", label: "Trained on US standards" },
      { value: "QBO · Xero · NetSuite", label: "Software your team uses" },
      { value: claims.savingsRange, label: "Typical saving vs a US in-house hire" },
    ],
    capabilities: [
      { title: "Bookkeeping", desc: "Transaction coding, bank and card reconciliations, and clean ledgers.", image: "/service-coverage/finance/bookkeeping.webp" },
      { title: "Accounts Payable", desc: "Invoice processing, approvals, vendor management and payment runs.", image: "/service-coverage/finance/accounts-payable.webp" },
      { title: "Accounts Receivable", desc: "Invoicing, cash application and collections follow-up.", image: "/service-coverage/finance/accounts-receivable.webp" },
      { title: "Month-End Close", desc: "Accruals, reconciliations, schedules and financial statements.", image: "/service-coverage/finance/financial-reporting.webp" },
      { title: "Tax Preparation Support", desc: "1040, 1065 and 1120 workpapers prepared for your reviewers.", image: "/service-coverage/finance/fpa-cfo-support.webp" },
      { title: "Payroll Support", desc: "Payroll processing support and reconciliation.", image: "/service-coverage/finance/payroll.webp" },
    ],
    benefits: [
      { title: "Your Reviewers Stay in Control", desc: "Work is prepared by our team and reviewed and signed off by yours." },
      { title: "Your Software", desc: "QuickBooks Online, Xero, NetSuite, Sage Intacct, Bill, CCH and more." },
      { title: "Secure Client Data", desc: "Managed devices, MFA, no local storage, and access you can revoke." },
      { title: "Scale for Busy Season", desc: "Add seats ahead of deadlines and scale back afterwards." },
    ],
    process: [
      { title: "Define the Seat", desc: "Tasks, software, review process and hours of overlap." },
      { title: "Shortlist and Test", desc: "Candidates tested on practical accounting exercises before you interview." },
      { title: "Onboard", desc: "Access, checklists and a ramp-up plan agreed with your manager." },
    ],
    faqs: [
      {
        q: "What is accounting staff augmentation?",
        a: "It is adding dedicated accountants or bookkeepers to your firm through a provider who employs them. They work in your systems under your managers, while the provider handles hiring, payroll and retention.",
      },
      {
        q: "How much does an offshore accountant cost?",
        a: `The median US accountant wage is $83,680 (BLS, May 2025), roughly $120,000 with benefits. An offshore accountant through staff augmentation typically costs ${claims.savingsRangeWords} less, billed as one monthly rate.`,
      },
      {
        q: "Are offshore accountants trained on US GAAP and US tax?",
        a: "Yes. We shortlist accountants with US GAAP experience and test them on practical exercises. Tax preparation support is done under the review and signature of your licensed staff.",
      },
      {
        q: "How do you protect client financial data?",
        a: "Accountants work on managed devices with MFA and endpoint protection, access your systems through accounts you control, and do not store client files locally. NDAs cover all client information.",
      },
      usHoursFaq,
      {
        q: "Can we use augmented accountants only during tax season?",
        a: "Yes. Many firms add seats from January to April and for extension season, then scale down. Agree your seasonal plan early so we can line up candidates.",
      },
    ],
    relatedReading: [
      { title: "Finance and accounting outsourcing", desc: "Outsource whole processes like AP or month-end close.", href: "/services/finance-accounting" },
      { title: "Accounting and finance industry", desc: "How we support accounting firms.", href: "/industries/accounting-finance" },
      { title: "Offshore staff augmentation", desc: "How our offshore model works.", href: "/services/offshore-staff-augmentation" },
    ],
    finalCta: {
      title: "Add accountants to your firm",
      desc: "Tell us the seats, software and season you need covered. We will send a shortlist plan and monthly rates.",
      button: "Get accounting talent",
    },
  },
];
