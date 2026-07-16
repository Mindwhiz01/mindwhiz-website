"use client";

import { LegalPage, type LegalSection } from "@/components/LegalPage";

const sections: LegalSection[] = [
  {
    heading: "Information We Collect",
    body: [
      "We collect information you provide directly to us, and limited technical information generated when you use our website.",
      [
        "Contact details you submit through our forms — name, email address, phone number, company, and the message you send us.",
        "Business information shared during engagements, such as project requirements, staffing needs, and billing details.",
        "Candidate information where you apply to work with us — CV/resume, work history, and professional certifications.",
        "Technical data such as IP address, browser type, pages visited, and referring URLs, collected through standard server logs and analytics.",
      ],
    ],
  },
  {
    heading: "How We Use Your Information",
    body: [
      "We use the information we collect to:",
      [
        "Respond to enquiries and provide the services you request.",
        "Match client requirements with candidate profiles and manage ongoing engagements.",
        "Send service-related communications, and — only where you have opted in — marketing updates.",
        "Operate, secure, and improve our website and services.",
        "Meet legal, regulatory, and contractual obligations across the regions we operate in.",
      ],
    ],
  },
  {
    heading: "How We Share Information",
    body: [
      "We do not sell your personal information. We share it only in the following circumstances:",
      [
        "With clients, where you are a candidate being proposed for an engagement, and with your knowledge.",
        "With service providers who support our operations (hosting, analytics, communications), bound by confidentiality obligations.",
        "Within our delivery hubs in the United States, the United Kingdom, and Pakistan, to deliver the services you request.",
        "Where required by law, regulation, or a valid legal process.",
      ],
    ],
  },
  {
    heading: "International Transfers",
    body: [
      "MindWhiz operates delivery hubs in the United States, the United Kingdom, and Pakistan. Your information may be processed in any of these locations. Wherever it is processed, we apply the same safeguards described in this policy and put appropriate contractual protections in place for cross-border transfers.",
    ],
  },
  {
    heading: "Data Security",
    body: [
      "We apply administrative, technical, and physical safeguards appropriate to the sensitivity of the information we hold, including access controls, encryption in transit, and security monitoring. No method of transmission or storage is completely secure, and we cannot guarantee absolute security.",
    ],
  },
  {
    heading: "Data Retention",
    body: [
      "We keep personal information only as long as needed for the purposes described above — typically for the duration of an engagement plus the period required by law or legitimate business need. Candidate profiles are retained while relevant to placement opportunities and deleted on request.",
    ],
  },
  {
    heading: "Your Rights",
    body: [
      "Depending on where you live, you may have rights to access, correct, delete, or restrict the use of your personal information, and to withdraw consent where processing is based on consent. To exercise any of these rights, contact us using the details below. We respond to verified requests within the timelines required by applicable law.",
    ],
  },
  {
    heading: "Cookies & Analytics",
    body: [
      "Our website uses essential cookies for core functionality and may use analytics to understand how the site is used. You can control cookies through your browser settings; disabling them may affect parts of the site.",
    ],
  },
  {
    heading: "Changes to This Policy",
    body: [
      "We may update this policy from time to time. Material changes will be reflected on this page with an updated “Last updated” date. Continued use of our services after changes take effect constitutes acceptance of the revised policy.",
    ],
  },
];

export default function PrivacyPage() {
  return (
    <LegalPage
      kicker="Legal"
      title="Privacy Policy"
      updated="July 15, 2026"
      intro="This policy explains what information MindWhiz collects, how we use and share it, and the choices you have. It applies to our website and to the staffing, staff augmentation, and BPO services we provide from our hubs in the United States, the United Kingdom, and Pakistan."
      sections={sections}
    />
  );
}
