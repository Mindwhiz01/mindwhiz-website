"use client";

import { motion } from "framer-motion";
import { Check, Clock, DollarSign, Users, Shield, TrendingUp } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import Footer from "@/components/Footer";
import Cta from "@/components/Cta";
import ContactFormSection from "@/components/ContactFormSection";
import { buildMetadata } from "@/seo.config";

export async function generateMetadata() {
  return buildMetadata("/usa-it-helpdesk", {
    title: "Outsourced 24/7 IT Helpdesk for US Companies | MindWhiz",
    description:
      "White-label IT helpdesk for USA MSPs & businesses: $6-12/user/month, 15-min response, Tier 1-3 support. Cut IT costs 50%. Free helpdesk assessment.",
  });
}

export default function USAHelpdesk() {
  const stats = [
    { value: "50%", label: "Average cost savings" },
    { value: "15 min", label: "Response time SLA" },
    { value: "24/7", label: "Coverage (your timezone)" },
    { value: "99.8%", label: "Client retention" },
  ];

  const problems = [
    {
      problem: "Hiring IT staff is slow & expensive",
      solution: "Deploy certified helpdesk support in 10 days, not 8 weeks. $6-12/user vs $4000+ salary.",
    },
    {
      problem: "You need 24/7 coverage but can't justify overnight staff",
      solution: "We staff around the clock in your timezone. Customers call during their hours; we answer anytime.",
    },
    {
      problem: "Your current helpdesk is overwhelmed",
      solution: "Add 3-5 agents instantly. Scale up/down without hiring/firing cycles.",
    },
    {
      problem: "You're losing clients to better support competitors",
      solution: "SLAs + certified support turn helpdesk from cost center into competitive advantage.",
    },
  ];

  const faqs = [
    {
      q: "Can you handle our specific ticketing system or PSA?",
      a: "Yes. We integrate with ConnectWise, Halo, Freshdesk, Zendesk, Jira, and most PSAs. If it has an API, we can connect.",
    },
    {
      q: "Can you white-label it for our customers?",
      a: "Fully. Your logo, your brand, your phone number. Customers have no idea it's outsourced.",
    },
    {
      q: "What if we need to escalate to Tier 2 or 3?",
      a: "Included. Our engineers handle complex server/network issues. Seamless escalation with no handoff delays.",
    },
    {
      q: "What's the typical deployment timeline?",
      a: "2-3 weeks. Setup call → training on your environment → initial handoff → 2-week overlap period.",
    },
    {
      q: "Can we start small and grow?",
      a: "Absolutely. Many start with 2-3 agents for 1-2 clients, then scale to 10+ agents across 20+ accounts.",
    },
    {
      q: "What if we want to bring it back in-house?",
      a: "No lock-in. Month-to-month terms. We hand over all documentation and train your team before we leave.",
    },
  ];

  return (
    <>
      <SiteHeader />
      <div className="bg-white">
        {/* Hero */}
        <section className="relative overflow-hidden bg-gradient-to-r from-[#1c1d21] via-[#383838] to-[#2a2b2f] px-6 py-24 text-white sm:px-8">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute -right-40 -top-40 h-80 w-80 rounded-full bg-[#9CCC3C] blur-3xl" />
          </div>
          <div className="relative mx-auto max-w-5xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-flex items-center gap-2 rounded-full bg-[#9CCC3C]/20 px-4 py-2 text-sm font-semibold text-[#9CCC3C]">
                <Users className="h-4 w-4" />
                Trusted by 50+ US companies
              </span>
              <h1 className="mt-6 max-w-3xl text-5xl font-extrabold leading-tight sm:text-6xl">
                24/7 IT Helpdesk for USA Companies
              </h1>
              <p className="mt-4 max-w-2xl text-xl text-white/80">
                White-label Tier 1-3 support for your customers. Save 50% on staffing. Deploy in 10 days. Guaranteed response time.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Cta href="/contact" label="Get Free IT Helpdesk Assessment" />
                <a
                  href="#pricing"
                  className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-white px-6 py-3 font-semibold text-white transition-colors hover:bg-white hover:text-black"
                >
                  See Pricing
                </a>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Stats */}
        <section className="border-y border-gray-200 bg-[#EEEEEE] px-6 py-16 sm:px-8">
          <div className="mx-auto max-w-6xl">
            <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
              {stats.map((stat, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="text-center"
                >
                  <div className="text-4xl font-bold text-[#9CCC3C]">{stat.value}</div>
                  <div className="mt-2 text-sm text-gray-700">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Problems & Solutions */}
        <section className="px-6 py-20 sm:px-8">
          <div className="mx-auto max-w-5xl">
            <motion.h2
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-center text-4xl font-bold text-black"
            >
              The Problem With In-House Helpdesk
            </motion.h2>

            <div className="mt-16 grid gap-8 md:grid-cols-2">
              {problems.map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: idx % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="rounded-xl border-2 border-gray-200 bg-white p-6"
                >
                  <h3 className="font-semibold text-black">{item.problem}</h3>
                  <p className="mt-3 text-sm text-gray-600">
                    <span className="font-semibold text-[#9CCC3C]">✓ Solution:</span> {item.solution}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="bg-[#EEEEEE] px-6 py-20 sm:px-8">
          <div className="mx-auto max-w-5xl">
            <h2 className="text-3xl font-bold text-black">What You Get</h2>

            <div className="mt-16 grid gap-8 md:grid-cols-3">
              {[
                {
                  icon: Clock,
                  title: "15-Min Response SLA",
                  desc: "Faster than most internal teams. Guaranteed response, not best-effort.",
                },
                {
                  icon: Users,
                  title: "Tier 1-3 Support",
                  desc: "Basic troubleshooting through infrastructure & server admin. Complex issues handled.",
                },
                {
                  icon: Shield,
                  title: "SOC 2 & HIPAA Ready",
                  desc: "Compliance-first. Your customers' data is protected. Audit trail included.",
                },
                {
                  icon: DollarSign,
                  title: "Fixed Per-User Pricing",
                  desc: "$6-12/user/month. No setup fees, no hidden charges. Scale up/down anytime.",
                },
                {
                  icon: TrendingUp,
                  title: "Real-Time Reporting",
                  desc: "Dashboard with response times, resolution rates, customer satisfaction scores.",
                },
                {
                  icon: Check,
                  title: "White-Label Ready",
                  desc: "Your branding, your SLA, your phone number. Customers don't know we exist.",
                },
              ].map((feature, idx) => {
                const Icon = feature.icon;
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.05 }}
                    className="rounded-xl bg-white p-6 text-center"
                  >
                    <div className="flex justify-center">
                      <Icon className="h-10 w-10 text-[#9CCC3C]" />
                    </div>
                    <h3 className="mt-4 font-semibold text-black">{feature.title}</h3>
                    <p className="mt-2 text-sm text-gray-600">{feature.desc}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section id="pricing" className="px-6 py-20 sm:px-8">
          <div className="mx-auto max-w-4xl">
            <h2 className="text-3xl font-bold text-black">Pricing (USA Companies)</h2>

            <div className="mt-12 grid gap-8 md:grid-cols-2">
              {[
                {
                  tier: "Tier 1 Support",
                  desc: "Password resets, email/basic troubleshooting, software installation",
                  price: "$6-8/user/month",
                  features: ["Email support", "Basic troubleshooting", "Software installs", "Password resets"],
                },
                {
                  tier: "Tier 1-2 Support",
                  desc: "Everything above + infrastructure, server admin, complex issues",
                  price: "$12-15/user/month",
                  features: ["Tier 1 + everything below", "Server administration", "Infrastructure changes", "Advanced troubleshooting"],
                },
              ].map((plan, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className={`rounded-xl border-2 p-8 ${
                    idx === 1 ? "border-[#9CCC3C] bg-[#9CCC3C]/5" : "border-gray-200 bg-white"
                  }`}
                >
                  <h3 className="text-2xl font-bold text-black">{plan.tier}</h3>
                  <p className="mt-2 text-sm text-gray-600">{plan.desc}</p>
                  <p className="mt-6 text-4xl font-bold text-[#9CCC3C]">{plan.price}</p>
                  <ul className="mt-6 space-y-3 border-t border-gray-200 pt-6">
                    {plan.features.map((feat, fi) => (
                      <li key={fi} className="flex items-center gap-3 text-sm text-gray-700">
                        <Check className="h-5 w-5 text-[#9CCC3C]" />
                        {feat}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>

            <p className="mt-8 text-center text-sm text-gray-600">
              All prices include: training, onboarding, 24/7 coverage, white-label setup, real-time reporting, and SOC 2 compliance.
            </p>
          </div>
        </section>

        {/* FAQ */}
        <section className="bg-[#EEEEEE] px-6 py-20 sm:px-8">
          <div className="mx-auto max-w-4xl">
            <h2 className="text-3xl font-bold text-black">Common Questions</h2>

            <div className="mt-12 grid gap-8 md:grid-cols-2">
              {faqs.map((faq, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.05 }}
                  className="rounded-lg bg-white p-6"
                >
                  <h4 className="font-semibold text-black">{faq.q}</h4>
                  <p className="mt-2 text-sm text-gray-600">{faq.a}</p>
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
          <h2 className="text-4xl font-bold">Ready to scale your helpdesk?</h2>
          <p className="mt-4 text-lg text-white/80 max-w-2xl mx-auto">
            See how much you can save with MindWhiz helpdesk support. Custom quote in 24 hours.
          </p>
          <Cta href="/contact" label="Get Free Helpdesk Assessment" className="mt-8 justify-center" />
          <p className="mt-6 text-sm text-white/60">✓ No long-term contracts · ✓ No setup fees · ✓ 24-hour quote</p>
        </motion.section>

        <ContactFormSection />
      </div>
      <Footer />
    </>
  );
}
