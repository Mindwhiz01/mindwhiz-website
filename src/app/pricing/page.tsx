"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check, X } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import Footer from "@/components/Footer";
import Cta from "@/components/Cta";
import ContactFormSection from "@/components/ContactFormSection";

const pricingData = [
  {
    service: "IT Helpdesk 24/7",
    tier1Cost: "$6-8/user/month",
    tier2Cost: "$12-15/user/month",
    features: [
      "Tier 1 support included",
      "15-minute response time",
      "Email & phone support",
      "Ticket tracking system",
      "Monthly reporting",
      "Scope: troubleshooting, password resets",
    ],
    tier2Features: [
      "Tier 1-2 support included",
      "10-minute response time",
      "Priority handling",
      "Advanced troubleshooting",
      "Infrastructure changes",
      "Scope: complex issues, server admin",
    ],
  },
  {
    service: "Managed SOC & MDR",
    cost: "$1500-3000/month",
    description: "Based on infrastructure size and monitoring scope",
    features: [
      "24/7 threat detection",
      "SIEM monitoring & alerts",
      "Incident response included",
      "GIAC-certified analysts",
      "Weekly threat briefings",
      "Compliance reporting (SOC 2)",
    ],
  },
  {
    service: "Staff Augmentation",
    cost: "$3500-6500/month per engineer",
    description: "Varies by role, location, experience level",
    features: [
      "Full employment handled",
      "No recruitment fees",
      "Replacement guarantee",
      "10-day deployment typical",
      "Payroll & benefits included",
      "Flexible 1-3 month contracts",
    ],
  },
  {
    service: "Cloud Infrastructure Management",
    cost: "$2000-5000/month",
    description: "Based on infrastructure complexity and usage",
    features: [
      "24/7 cloud monitoring",
      "Cost optimization",
      "Security & compliance",
      "Automated backups",
      "Disaster recovery planning",
      "AWS/Azure/GCP expertise",
    ],
  },
];

export default function PricingPage() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <>
      <SiteHeader />
      <div className="bg-white">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-[#EEEEEE] to-white px-6 py-20 sm:px-8">
          <div className="mx-auto max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <span className="inline-block rounded-full bg-[#9CCC3C]/15 px-3 py-1 text-xs font-semibold text-[#9CCC3C]">
                Transparent Pricing
              </span>
              <h1 className="mt-6 text-4xl font-extrabold text-black sm:text-5xl">
                IT Outsourcing Pricing 2026
              </h1>
              <p className="mt-4 text-lg text-gray-600">
                Exact costs for IT helpdesk, security, cloud, and staffing. No surprises. No hidden fees.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Pricing Cards */}
        <section className="px-6 py-24 sm:px-8">
          <div className="mx-auto max-w-5xl">
            <div className="grid gap-8 md:grid-cols-2">
              {pricingData.map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="rounded-2xl border border-gray-200 bg-white p-8 hover:shadow-lg transition-shadow"
                >
                  <h3 className="text-2xl font-bold text-black">{item.service}</h3>
                  <div className="mt-4">
                    {item.tier1Cost ? (
                      <>
                        <div className="space-y-2">
                          <div>
                            <p className="text-sm text-gray-500">Tier 1 Support</p>
                            <p className="text-3xl font-bold text-[#9CCC3C]">{item.tier1Cost}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Tier 1-2 Support</p>
                            <p className="text-3xl font-bold text-[#ed1164]">{item.tier2Cost}</p>
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        <p className="text-3xl font-bold text-[#9CCC3C]">{item.cost}</p>
                        <p className="mt-1 text-sm text-gray-500">{item.description}</p>
                      </>
                    )}
                  </div>
                  <ul className="mt-6 space-y-3 border-t border-gray-200 pt-6">
                    {(item.features || []).map((feature, fi) => (
                      <li key={fi} className="flex items-start gap-3">
                        <Check className="mt-1 h-5 w-5 shrink-0 text-[#9CCC3C]" />
                        <span className="text-sm text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>

            {/* FAQ Section */}
            <div className="mt-24">
              <h2 className="text-3xl font-bold text-black">Pricing FAQ</h2>
              <div className="mt-12 grid gap-8 md:grid-cols-2">
                {[
                  {
                    q: "What's included in the price?",
                    a: "All prices include employment, payroll, benefits (where applicable), training, and ongoing support. No recruitment fees or hidden charges.",
                  },
                  {
                    q: "Can I negotiate or customize pricing?",
                    a: "Yes. Pricing varies based on scope, volume, and contract length. Contact us for a custom quote based on your specific needs.",
                  },
                  {
                    q: "Is there a setup fee?",
                    a: "No setup fees. You pay only the monthly service cost. We handle onboarding and integration at no extra charge.",
                  },
                  {
                    q: "What's the minimum commitment?",
                    a: "Most services have flexible month-to-month terms. Some roles (like staffing) benefit from 3-month agreements, but we work with your needs.",
                  },
                  {
                    q: "Do you offer discounts for multiple services?",
                    a: "Yes. Bundling IT helpdesk + security + cloud typically saves 10-15%. Ask about volume discounts for large teams.",
                  },
                  {
                    q: "How do costs compare to US hiring?",
                    a: "Offshore staff typically costs 50-60% less than US hiring while offering 24/7 availability and no benefits overhead.",
                  },
                ].map((faq, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.05 }}
                    className="rounded-lg bg-[#EEEEEE] p-6"
                  >
                    <h4 className="font-semibold text-black">{faq.q}</h4>
                    <p className="mt-2 text-sm text-gray-700">{faq.a}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-24 rounded-2xl bg-gradient-to-r from-[#1c1d21] to-[#383838] p-12 text-center text-white"
            >
              <h3 className="text-3xl font-bold">Ready to see your exact cost?</h3>
              <p className="mt-3 text-lg text-white/80">
                Get a custom quote for your specific needs. Free consultation, no obligation.
              </p>
              <Cta href="/contact" label="Get Free Quote" className="mt-8 justify-center" />
            </motion.div>
          </div>
        </section>

        <ContactFormSection />
      </div>
      <Footer />
    </>
  );
}
