"use client";

import { LegalPage, type LegalSection } from "@/components/LegalPage";

const sections: LegalSection[] = [
  {
    heading: "Acceptance of Terms",
    body: [
      "By accessing this website or engaging MindWhiz for services, you agree to these Terms & Conditions. If you are entering into an agreement on behalf of a company, you confirm you have authority to bind that company. If you do not agree with these terms, please do not use the site or our services.",
    ],
  },
  {
    heading: "Our Services",
    body: [
      "MindWhiz provides hybrid staffing, staff augmentation, and business process outsourcing services, including IT helpdesk, NOC monitoring, cybersecurity operations, cloud and DevOps support, construction estimation, finance and accounting, HR services, and web services, delivered from our hubs in the United States, the United Kingdom, and Pakistan.",
      "Specific engagements are governed by the statement of work or service agreement signed for that engagement. Where those documents conflict with these terms, the signed agreement prevails.",
    ],
  },
  {
    heading: "Use of the Website",
    body: [
      "You agree to use this website lawfully and not to:",
      [
        "Attempt to gain unauthorised access to any part of the site or its infrastructure.",
        "Introduce malware, scrape content at scale, or interfere with the site's operation.",
        "Misrepresent your identity or affiliation when contacting us.",
      ],
    ],
  },
  {
    heading: "Intellectual Property",
    body: [
      "The MindWhiz name, logo, site design, and all content on this website are owned by MindWhiz or its licensors and are protected by copyright and trademark laws. You may not reproduce, distribute, or create derivative works from this content without our prior written consent.",
      "Work product created for clients under a signed engagement is owned as set out in that engagement's agreement.",
    ],
  },
  {
    heading: "Client & Candidate Obligations",
    body: [
      [
        "Clients agree to provide accurate requirements and timely access needed for service delivery, and to pay agreed fees on the agreed schedule.",
        "Candidates agree that information submitted to us is accurate and that we may share their professional profile with prospective clients.",
        "Both parties agree not to circumvent MindWhiz by directly engaging personnel introduced through us during an engagement and for the period specified in the applicable agreement.",
      ],
    ],
  },
  {
    heading: "Confidentiality",
    body: [
      "Each party agrees to protect the other's confidential information with at least the care it applies to its own, and to use it only for the engagement it was shared for. This obligation survives the end of an engagement.",
    ],
  },
  {
    heading: "Disclaimers",
    body: [
      "The website and its content are provided “as is” without warranties of any kind, express or implied. While we work to keep information accurate and current, we make no guarantee that the site is error-free, uninterrupted, or that its content reflects the final scope of any service.",
    ],
  },
  {
    heading: "Limitation of Liability",
    body: [
      "To the maximum extent permitted by law, MindWhiz is not liable for indirect, incidental, consequential, or punitive damages arising from use of this website. Liability arising from a service engagement is limited as set out in the signed agreement governing that engagement.",
    ],
  },
  {
    heading: "Termination",
    body: [
      "We may suspend or terminate access to the website for conduct that violates these terms. Termination of service engagements is governed by the applicable service agreement, including any agreed notice periods.",
    ],
  },
  {
    heading: "Governing Law",
    body: [
      "These website terms are governed by the laws of the State of Texas, United States, without regard to conflict-of-law principles. Signed service agreements may specify a different governing law for the engagement they cover.",
    ],
  },
  {
    heading: "Changes to These Terms",
    body: [
      "We may revise these terms from time to time. Changes take effect when posted on this page with an updated “Last updated” date. Continued use of the website after changes are posted constitutes acceptance.",
    ],
  },
];

export default function TermsPageClient() {
  return (
    <LegalPage
      kicker="Legal"
      title="Terms & Conditions"
      updated="July 15, 2026"
      intro="These terms govern your use of the MindWhiz website and set the baseline for how we work with clients and candidates. Individual engagements are governed by their signed agreements, which take precedence over these terms where they differ."
      sections={sections}
    />
  );
}
