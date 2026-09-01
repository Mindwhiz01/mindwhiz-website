"use client";

import { motion } from "framer-motion";
import { Check, X, ArrowRight } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import Footer from "@/components/Footer";
import Cta from "@/components/Cta";
import ContactFormSection from "@/components/ContactFormSection";
import { buildMetadata } from "@/seo.config";

const comparisonData = [
  {
    feature: "How you direct work",
    staffAug:
      "You keep full control. You set priorities, run standups, own decisions. Vendor provides people.",
    outsourcing:
      "Vendor owns the outcome. You define requirements; they own approach, team, timeline. Hands-off.",
    managedServices: "Vendor owns operations. You pay for outcomes (e.g., 99.8% uptime). Mostly hands-off.",
  },
  {
    feature: "Speed to contribution",
    staffAug: "2-4 weeks. Your team onboards them into your culture, tools, and processes.",
    outsourcing: "4-8 weeks. Vendor discovers scope, builds team, aligns on delivery.",
    managedServices: "1-2 weeks. Plug-and-play handoff; minimal integration needed.",
  },
  {
    feature: "Cost model",
    staffAug: "$3500-6500/eng/month. No hiring/benefits overhead. Direct cost per person.",
    outsourcing: "Project-based: $50-150k per deliverable. Fixed scope, fixed price.",
    managedServices: "$1500-5000/month per service. Variable based on scale/usage.",
  },
  {
    feature: "When to use",
    staffAug: "Evolving roadmap, building internal capability, scaling existing teams.",
    outsourcing: "Well-defined projects, self-contained work, time-boxed deliverables.",
    managedServices: "Ongoing operations, 24/7 coverage, no internal expertise.",
  },
  {
    feature: "Risk of knowledge loss",
    staffAug: "HIGH. Contractor leaves = knowledge walks. Mitigate with documentation-as-you-go.",
    outsourcing: "MEDIUM. Vendor owns design; you get deliverables. Some IP transfer risk.",
    managedServices: "LOW. Vendor runs it. Process docs stay with you.",
  },
  {
    feature: "Contract length",
    staffAug: "Flexible. Month-to-month ideal. 3-month agreements common.",
    outsourcing: "Fixed project term. Usually 8-16 weeks. Hard stop at delivery.",
    managedServices: "12-month SLA common. Month-to-month available.",
  },
  {
    feature: "Management overhead",
    staffAug: "HIGH. Your team manages them like employees. Requires leadership maturity.",
    outsourcing: "LOW. Project manager at vendor handles day-to-day.",
    managedServices: "NONE. Vendor owns operations; you monitor KPIs.",
  },
  {
    feature: "Who should use it?",
    staffAug: "Tech-mature teams with bandwidth to direct extra people. Scale-phase companies.",
    outsourcing: "Teams with scoped projects. Agencies, consultancies, project-driven work.",
    managedServices: "Understaffed teams needing 24/7 coverage (helpdesk, security, ops).",
  },
];

export async function generateMetadata() {
  return buildMetadata("/comparison", {
    title: "Staff Augmentation vs Outsourcing vs Managed Services | MindWhiz",
    description:
      "Compare staffing models: staff augmentation (you direct), outsourcing (vendor owns outcome), managed services (24/7 ops). Which is right for USA companies?",
  });
}

export default function ComparisonPage() {
  return (
    <>
      <SiteHeader />
      <div className="bg-white">
        {/* Hero */}
        <section className="bg-gradient-to-b from-[#EEEEEE] to-white px-6 py-20 sm:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block rounded-full bg-[#9CCC3C]/15 px-3 py-1 text-xs font-semibold text-[#9CCC3C]">
                Staffing Model Guide
              </span>
              <h1 className="mt-6 text-4xl font-extrabold text-black sm:text-5xl">
                Staff Augmentation vs Outsourcing vs Managed Services
              </h1>
              <p className="mt-4 text-lg text-gray-600">
                A practical guide to choosing the right delivery model for your needs, goals, and team maturity.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Comparison Table */}
        <section className="px-6 py-20 sm:px-8">
          <div className="mx-auto max-w-6xl">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-[#1c1d21] text-white">
                    <th className="border border-gray-300 px-6 py-4 text-left font-semibold">Dimension</th>
                    <th className="border border-gray-300 px-6 py-4 text-left font-semibold">Staff Augmentation</th>
                    <th className="border border-gray-300 px-6 py-4 text-left font-semibold">Project Outsourcing</th>
                    <th className="border border-gray-300 px-6 py-4 text-left font-semibold">Managed Services</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonData.map((row, idx) => (
                    <motion.tr
                      key={idx}
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.05 }}
                      className={idx % 2 === 0 ? "bg-white" : "bg-[#EEEEEE]"}
                    >
                      <td className="border border-gray-300 px-6 py-4 font-semibold text-[#1c1d21]">{row.feature}</td>
                      <td className="border border-gray-300 px-6 py-4 text-gray-700">{row.staffAug}</td>
                      <td className="border border-gray-300 px-6 py-4 text-gray-700">{row.outsourcing}</td>
                      <td className="border border-gray-300 px-6 py-4 text-gray-700">{row.managedServices}</td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Decision Tree */}
        <section className="bg-[#EEEEEE] px-6 py-20 sm:px-8">
          <div className="mx-auto max-w-4xl">
            <h2 className="text-3xl font-bold text-black">Quick Decision Guide</h2>

            <div className="mt-12 grid gap-8 md:grid-cols-3">
              {[
                {
                  title: "Staff Augmentation",
                  when: "Choose if...",
                  reasons: [
                    "Your roadmap evolves (not fixed)",
                    "You have the team to direct extra people",
                    "You need 2-6 month flexible engagements",
                    "Building internal capability is a goal",
                    "You want cost savings + full control",
                  ],
                  cost: "$3500-6500/eng/month",
                  icon: "👥",
                },
                {
                  title: "Outsourcing",
                  when: "Choose if...",
                  reasons: [
                    "You have a well-defined project",
                    "Fixed scope + timeline + deliverable",
                    "Don't want to manage extra people",
                    "Prefer vendor accountability",
                    "Work is self-contained",
                  ],
                  cost: "$50-150k per project",
                  icon: "📦",
                },
                {
                  title: "Managed Services",
                  when: "Choose if...",
                  reasons: [
                    "You need 24/7 operations coverage",
                    "Don't want to hire/manage internally",
                    "Prefer outcome-based pricing",
                    "Compliance + security matter (SOC, MDR)",
                    "Ongoing (not one-time) need",
                  ],
                  cost: "$1500-5000/month",
                  icon: "⚙️",
                },
              ].map((model, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="rounded-xl border-2 border-gray-200 bg-white p-6"
                >
                  <div className="text-4xl mb-2">{model.icon}</div>
                  <h3 className="text-xl font-bold text-black">{model.title}</h3>
                  <p className="mt-3 font-semibold text-gray-700">{model.when}</p>
                  <ul className="mt-4 space-y-2">
                    {model.reasons.map((reason, ri) => (
                      <li key={ri} className="flex items-start gap-2 text-sm text-gray-600">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#9CCC3C]" />
                        {reason}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-4 border-t pt-4 text-sm font-semibold text-[#9CCC3C]">{model.cost}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Real Scenarios */}
        <section className="px-6 py-20 sm:px-8">
          <div className="mx-auto max-w-4xl">
            <h2 className="text-3xl font-bold text-black">Real USA Scenarios</h2>

            <div className="mt-12 space-y-8">
              {[
                {
                  scenario: "A Series A fintech startup needs 3 engineers to hit a launch deadline.",
                  chosen: "Staff Augmentation",
                  why: "Flexible 3-month engagement, they direct the team, costs ~$15k/month vs $80k+ for US hiring + benefits.",
                },
                {
                  scenario: "A US MSP needs to offer white-label 24/7 helpdesk to clients but doesn't want to hire 5 people.",
                  chosen: "Managed Services (Helpdesk)",
                  why: "24/7 coverage, predictable cost ($8-12/user), vendor owns operations, client satisfaction guaranteed.",
                },
                {
                  scenario: "A construction firm needs quantity takeoffs for 50 bids over 6 months, then no more.",
                  chosen: "Project Outsourcing",
                  why: "Well-scoped deliverable (~$40k for the project), vendor owns timeline, they don't manage anyone.",
                },
                {
                  scenario: "An enterprise needs a SOC analyst + threat monitoring but has 0 in-house security expertise.",
                  chosen: "Managed Services (SOC/MDR)",
                  why: "24/7 coverage, certified analysts, incident response included, they own the operations + compliance.",
                },
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="rounded-lg border-l-4 border-[#9CCC3C] bg-[#f9f9f9] p-6"
                >
                  <p className="text-sm uppercase tracking-wider text-[#9CCC3C] font-semibold">Scenario {idx + 1}</p>
                  <p className="mt-2 text-lg font-semibold text-black">{item.scenario}</p>
                  <p className="mt-4 text-sm text-gray-700">
                    <span className="font-bold text-[#ed1164]">→ {item.chosen}</span> — {item.why}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-[#1c1d21] to-[#383838] px-6 py-20 text-center text-white sm:px-8"
        >
          <h2 className="text-3xl font-bold">Still not sure which model is right for you?</h2>
          <p className="mt-4 text-lg text-white/80 max-w-2xl mx-auto">
            Our team specializes in all three. We'll help you choose the right approach for your goals, timeline, and budget.
          </p>
          <Cta href="/contact" label="Book Free Consultation" className="mt-8 justify-center" />
        </motion.section>

        <ContactFormSection />
      </div>
      <Footer />
    </>
  );
}
