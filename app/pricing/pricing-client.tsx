"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { TrustBar, SectionHeading } from "@/components/page-parts"
import { Faq } from "@/components/faq"
import { TrialHoverAccordion } from "@/components/trial-hover-accordion"
import { Check, Minus, ArrowRight } from "lucide-react"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

// ── Types ─────────────────────────────────────────────────────────────────────

type Plan = {
  name: string
  annualPrice: string
  monthlyPrice: string
  period: string
  best: string
  highlight: boolean
  highlights: string[]
  features: Record<string, boolean>
  seatMin: string
  isCustom?: boolean
}

// ── Data ──────────────────────────────────────────────────────────────────────

const PLANS: Plan[] = [
  {
    name: "Starter",
    annualPrice: "$9.99",
    monthlyPrice: "$12.99",
    period: "/user/mo",
    best: "Freelancers, consultants, small teams",
    highlight: false,
    seatMin: "No seat minimum",
    highlights: [
      "Unlimited US/Canada calling",
      "Unlimited business SMS & MMS",
      "Mobile apps (iOS/Android)",
      "AI Receptionist (25 min/mo free)",
      "Multi-level auto-attendant (IVR)",
      "2FA + STIR/SHAKEN + HIPAA",
    ],
    features: {
      "Unlimited US/Canada calling": true,
      "Unlimited business SMS & MMS": true,
      "Mobile apps (iOS/Android)": true,
      "Voicemail-to-email + transcription": true,
      "Multi-level auto-attendant (IVR)": true,
      "Call queues": true,
      "HD video meetings": true,
      "Call screening": true,
      "Business hours routing": true,
      "2FA + STIR/SHAKEN + HIPAA": true,
      "Email support": true,
      "AI Receptionist": true,
      "Omnichannel (WhatsApp/IG/FB)": false,
      "CRM integrations": false,
      "Supervisor tools": false,
      "Call recording": false,
      "Auto Dialers": false,
      "SOC 2 audit": false,
      "Dedicated account manager": false,
    },
  },
  {
    name: "Professional",
    annualPrice: "$15.99",
    monthlyPrice: "$19.99",
    period: "/user/mo",
    best: "Growing businesses",
    highlight: true,
    seatMin: "3 seat minimum",
    highlights: [
      "Everything in Starter",
      "AI Receptionist (100 min/mo free)",
      "Call recording (30-day retention)",
      "Omnichannel (WhatsApp/IG/FB)",
      "CRM integrations + Supervisor tools",
      "SOC 2 Type II access",
    ],
    features: {
      "Unlimited US/Canada calling": true,
      "Unlimited business SMS & MMS": true,
      "Mobile apps (iOS/Android)": true,
      "Voicemail-to-email + transcription": true,
      "Multi-level auto-attendant (IVR)": true,
      "Call queues": true,
      "HD video meetings": true,
      "Call screening": true,
      "Business hours routing": true,
      "2FA + STIR/SHAKEN + HIPAA": true,
      "Email support": true,
      "AI Receptionist": true,
      "Omnichannel (WhatsApp/IG/FB)": true,
      "CRM integrations": true,
      "Supervisor tools": true,
      "Call recording": true,
      "Auto Dialers": true,
      "SOC 2 audit": true,
      "Dedicated account manager": false,
    },
  },
  {
    name: "Enterprise",
    annualPrice: "$25.99",
    monthlyPrice: "$29.99",
    period: "/user/mo",
    best: "Contact centers, large teams",
    highlight: false,
    seatMin: "10 seat minimum",
    highlights: [
      "Everything in Professional",
      "AI Receptionist (300 min/mo free)",
      "Advanced call recording (1-year retention)",
      "Predictive & progressive auto dialers",
      "Voice cloning for AI receptionist",
      "Dedicated account manager",
    ],
    features: {
      "Unlimited US/Canada calling": true,
      "Unlimited business SMS & MMS": true,
      "Mobile apps (iOS/Android)": true,
      "Voicemail-to-email + transcription": true,
      "Multi-level auto-attendant (IVR)": true,
      "Call queues": true,
      "HD video meetings": true,
      "Call screening": true,
      "Business hours routing": true,
      "2FA + STIR/SHAKEN + HIPAA": true,
      "Email support": true,
      "AI Receptionist": true,
      "Omnichannel (WhatsApp/IG/FB)": true,
      "CRM integrations": true,
      "Supervisor tools": true,
      "Call recording": true,
      "Auto Dialers": true,
      "SOC 2 audit": true,
      "Dedicated account manager": true,
    },
  },
  {
    name: "Custom",
    annualPrice: "Custom",
    monthlyPrice: "Custom",
    period: "",
    best: "High-volume & enterprise teams",
    highlight: false,
    isCustom: true,
    seatMin: "50 seat minimum",
    highlights: [
      "Everything in Enterprise",
      "Unlimited AI Receptionist minutes",
      "Custom SLA & uptime guarantee",
      "Dedicated infrastructure & routing",
      "Custom compliance & audit support",
      "Named account executive",
    ],
    features: {
      "Unlimited US/Canada calling": true,
      "Unlimited business SMS & MMS": true,
      "Mobile apps (iOS/Android)": true,
      "Voicemail-to-email + transcription": true,
      "Multi-level auto-attendant (IVR)": true,
      "Call queues": true,
      "HD video meetings": true,
      "Call screening": true,
      "Business hours routing": true,
      "2FA + STIR/SHAKEN + HIPAA": true,
      "Email support": true,
      "AI Receptionist": true,
      "Omnichannel (WhatsApp/IG/FB)": true,
      "CRM integrations": true,
      "Supervisor tools": true,
      "Call recording": true,
      "Auto Dialers": true,
      "SOC 2 audit": true,
      "Dedicated account manager": true,
    },
  },
]

const FEATURE_ROWS = [
  "Unlimited US/Canada calling",
  "Unlimited business SMS & MMS",
  "Mobile apps (iOS/Android)",
  "Voicemail-to-email + transcription",
  "Multi-level auto-attendant (IVR)",
  "Call queues",
  "HD video meetings",
  "Call screening",
  "Business hours routing",
  "2FA + STIR/SHAKEN + HIPAA",
  "Email support",
  "AI Receptionist",
  "Omnichannel (WhatsApp/IG/FB)",
  "CRM integrations",
  "Supervisor tools",
  "Call recording",
  "Auto Dialers",
  "SOC 2 audit",
  "Dedicated account manager",
]


const FAQS = [
  { q: "What's included in the 14-day free trial?", a: "Up to 3 users, one phone number per user, unlimited internal calls, video conferencing, and team messaging. External calls and SMS activate after compliance verification." },
  { q: "Is a credit card required?", a: "Yes. Card required at sign-up. No charges during the 14-day trial window. Auto-converts to paid plan after 14 days." },
  { q: "Can I cancel during the trial?", a: "Yes. Cancel anytime before trial ends — redirected to plans page with no charge." },
  { q: "Why can't I make external calls during the trial?", a: "Compliance keeps the platform compliant with carrier rules and protects your number reputation from day one. Activation takes minutes once verified." },
  { q: "What does 'unlimited US/Canada calling' mean?", a: "All paid plans include unlimited domestic US/Canada calling with a fair-use policy. No per-minute charges for normal business use." },
  { q: "What AI Receptionist minutes are included?", a: "Starter 25 min/mo, Professional 100 min/mo, Enterprise 300 min/mo — pooled per account. Overage at $0.15/min." },
  { q: "Do you offer custom pricing?", a: "Yes. Contact us for high-volume or enterprise arrangements beyond the standard plans." },
]

// ── Motion variants ───────────────────────────────────────────────────────────

const heroVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.55, ease: "easeOut" },
  }),
}

const cardContainerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.14, delayChildren: 0.05 } },
}

const cardVariants = {
  hidden: { opacity: 0, y: 44 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
}

// ── Sub-components ────────────────────────────────────────────────────────────

function BillingToggle({
  isAnnual,
  onToggle,
}: {
  isAnnual: boolean
  onToggle: () => void
}) {
  const tabs = [
    { label: "Monthly", value: false },
    { label: "Annual", value: true },
  ]

  return (
    <div className="flex items-center justify-center mt-7">
      <div className="relative flex items-center bg-gray-100 rounded-full p-1">
        {tabs.map(({ label, value }) => {
          const active = isAnnual === value
          return (
            <button
              key={label}
              onClick={() => !active && onToggle()}
              className="relative z-10 px-5 py-1.5 rounded-full font-mono text-[13px] font-semibold flex items-center gap-1.5 cursor-pointer"
              style={{ color: active ? "#111827" : "#9ca3af" }}
            >
              {active && (
                <motion.div
                  layoutId="billing-pill"
                  className="absolute inset-0 rounded-full bg-white shadow-sm"
                  transition={{ type: "spring", stiffness: 500, damping: 36 }}
                />
              )}
              <span className="relative z-10">{label}</span>
              {label === "Annual" && (
                <motion.span
                  animate={{ opacity: isAnnual ? 1 : 0.45, scale: isAnnual ? 1 : 0.85 }}
                  transition={{ duration: 0.2 }}
                  className="relative z-10 text-[10px] bg-green-100 text-green-700 font-bold px-1.5 py-0.5 rounded-full leading-none"
                >
                  SAVE 20%
                </motion.span>
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}

function PriceDisplay({ plan, isAnnual }: { plan: Plan; isAnnual: boolean }) {
  if (plan.isCustom) {
    return (
      <div className="mb-2">
        <div className="flex items-end gap-1 mb-0.5" style={{ height: 44 }}>
          <span className="font-serif text-[36px] font-bold text-gray-900 leading-none italic">Custom</span>
        </div>
        <p className="font-mono text-[10px] text-gray-400">Built around your contract</p>
      </div>
    )
  }

  const price = isAnnual ? plan.annualPrice : plan.monthlyPrice
  const note = isAnnual
    ? `billed annually · ${plan.monthlyPrice}/mo monthly`
    : `billed monthly · save with annual`

  return (
    <div className="mb-2">
      <div className="flex items-end gap-1 mb-0.5">
        <div className="relative overflow-hidden" style={{ height: 44, minWidth: 120 }}>
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={price}
              initial={{ y: isAnnual ? -36 : 36, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: isAnnual ? 36 : -36, opacity: 0 }}
              transition={{ type: "spring", stiffness: 360, damping: 30 }}
              className="font-serif text-[36px] font-bold text-gray-900 leading-none absolute bottom-0 left-0"
            >
              {price}
            </motion.span>
          </AnimatePresence>
        </div>
        <span className="font-mono text-[11px] text-gray-400 pb-1.5">{plan.period}</span>
      </div>
      <AnimatePresence mode="wait" initial={false}>
        <motion.p
          key={note}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          className="font-mono text-[10px] text-gray-400"
        >
          {note}
        </motion.p>
      </AnimatePresence>
    </div>
  )
}

// ── Main export ───────────────────────────────────────────────────────────────

export default function PricingClient() {
  const [isAnnual, setIsAnnual] = useState(true)

  const tableBodyRef = useRef<HTMLTableSectionElement>(null)
  const glowLayerRef = useRef<HTMLDivElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window === "undefined") return

    const ctx = gsap.context(() => {
      if (tableBodyRef.current) {
        const rows = tableBodyRef.current.querySelectorAll("tr")
        gsap.set(rows, { opacity: 0, x: -18 })
        ScrollTrigger.create({
          trigger: tableBodyRef.current,
          start: "top 83%",
          once: true,
          onEnter: () => {
            gsap.to(rows, { opacity: 1, x: 0, duration: 0.38, stagger: 0.025, ease: "power2.out" })
          },
        })
      }

      if (glowLayerRef.current) {
        gsap.fromTo(
          glowLayerRef.current,
          { boxShadow: "0 0 18px 4px rgba(26,188,217,0.12), 0 20px 50px -10px rgba(26,188,217,0.14)" },
          {
            boxShadow: "0 0 34px 10px rgba(26,188,217,0.24), 0 24px 60px -10px rgba(26,188,217,0.30)",
            duration: 2,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
          }
        )
      }

      if (ctaRef.current) {
        gsap.to(ctaRef.current, {
          backgroundPosition: "100% 50%",
          duration: 8,
          repeat: -1,
          yoyo: true,
          ease: "none",
        })
      }
    })

    return () => ctx.revert()
  }, [])

  return (
    <>
      {/* HERO */}
      <section className="max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-6 text-center">
        <motion.div
          custom={0}
          variants={heroVariants}
          initial="hidden"
          animate="visible"
          className="inline-flex items-center gap-2 bg-white border border-gray-200 rounded-full px-4 py-1.5 mb-8 shadow-sm"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-accent" />
          <span className="font-mono text-[11px] font-bold tracking-[2px] uppercase text-gray-500">Pricing</span>
        </motion.div>

        <motion.h1
          custom={1}
          variants={heroVariants}
          initial="hidden"
          animate="visible"
          className="font-serif text-[44px] sm:text-[58px] font-bold leading-[1.08] tracking-tight text-balance"
        >
          <span className="text-gray-900">Pricing that scales </span>
          <span className="text-accent">with you.</span>
        </motion.h1>

        <motion.p
          custom={2}
          variants={heroVariants}
          initial="hidden"
          animate="visible"
          className="mt-5 text-[17px] text-gray-500 leading-relaxed max-w-[580px] mx-auto"
        >
          One platform for calling, messaging, AI and analytics. Simple per-user pricing,
          no hidden fees, cancel anytime.
        </motion.p>

        <motion.div custom={3} variants={heroVariants} initial="hidden" animate="visible">
          <BillingToggle isAnnual={isAnnual} onToggle={() => setIsAnnual((v) => !v)} />
        </motion.div>

        <motion.div custom={4} variants={heroVariants} initial="hidden" animate="visible" className="flex justify-center">
          <TrustBar items={["No credit card required", "Cancel anytime", "14-day free trial", "HIPAA compliant"]} />
        </motion.div>
      </section>

      {/* PRICING CARDS */}
      <section className="max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8 pb-16 pt-8">
        <motion.div
          variants={cardContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
        >
          {PLANS.map((plan) => (
            <motion.div
              key={plan.name}
              variants={cardVariants}
              className={`relative rounded-2xl border p-6 flex flex-col ${
                plan.highlight
                  ? "border-accent bg-white ring-1 ring-accent/20 z-10"
                  : "border-gray-100 bg-white"
              }`}
              whileHover={{
                scale: plan.highlight ? 1.04 : 1.025,
                transition: { type: "spring", stiffness: 280, damping: 20 },
              }}
            >
              {plan.highlight && (
                <div ref={glowLayerRef} className="absolute inset-0 rounded-2xl pointer-events-none" />
              )}

              {plan.highlight && (
                <motion.span
                  initial={{ opacity: 0, y: -10, scale: 0.88 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ delay: 0.55, type: "spring", stiffness: 300, damping: 20 }}
                  className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-accent text-white text-[10px] font-mono font-bold tracking-[1.5px] uppercase px-4 py-1 rounded-full z-20 shadow-sm"
                >
                  Most popular
                </motion.span>
              )}

              <p className="font-mono text-[10px] font-bold tracking-[2px] uppercase text-gray-400 mb-3">
                {plan.best}
              </p>

              <PriceDisplay plan={plan} isAnnual={isAnnual} />

              <p className="font-mono font-bold text-[15px] text-gray-800 mb-4 mt-1">{plan.name}</p>

              <ul className="space-y-2 flex-1 mb-5">
                {plan.highlights.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-[12px] font-mono text-gray-700">
                    <Check className="h-3 w-3 text-accent mt-0.5 flex-shrink-0" strokeWidth={2.5} />
                    {f}
                  </li>
                ))}
              </ul>

              <p className="text-[11px] font-mono text-gray-400 mb-4 -mt-1">
                + more &middot;{" "}
                <a
                  href="#comparison"
                  className="underline underline-offset-2 hover:text-accent transition-colors"
                >
                  see full comparison ↓
                </a>
              </p>

              {/* Seat minimum badge */}
              <div className={`inline-flex self-start items-center font-mono text-[10px] font-bold tracking-[1.2px] uppercase px-3 py-1 rounded-full mb-4 ${
                plan.highlight
                  ? "bg-accent/10 text-accent ring-1 ring-accent/20"
                  : plan.isCustom
                  ? "bg-gray-900 text-white"
                  : "bg-gray-100 text-gray-500 ring-1 ring-gray-200"
              }`}>
                {plan.seatMin}
              </div>

              <motion.a
                href="#"
                className={`group inline-flex items-center justify-center gap-2 text-[13px] font-semibold font-mono px-5 py-2.5 rounded-full transition-colors ${
                  plan.highlight
                    ? "bg-accent text-white hover:bg-[#1797ac]"
                    : plan.isCustom
                    ? "bg-gray-900 text-white hover:bg-gray-700"
                    : "border border-gray-200 text-gray-700 hover:border-accent hover:text-accent"
                }`}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 420, damping: 22 }}
              >
                {plan.isCustom ? "Contact Sales" : "Start Free Trial"}
                <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
              </motion.a>
            </motion.div>
          ))}
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-center font-mono text-[11px] text-gray-400 mt-4"
        >
          Annual prices shown above. Monthly billing available at the rates displayed on each card. Custom pricing available for 50+ seats.
        </motion.p>
      </section>

      {/* FEATURE COMPARISON TABLE */}
      <section
        id="comparison"
        className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-gray-100"
      >
        <SectionHeading eyebrow="Full comparison" h2="Feature by feature" />

        <div className="overflow-x-auto rounded-2xl border border-gray-100 mt-8">
          <table className="w-full text-[13px] font-mono min-w-[640px]">
            <thead className="sticky top-0 z-10">
              <tr className="border-b border-gray-100 bg-gray-50/95 backdrop-blur-sm">
                <th className="text-left px-5 py-4 text-[11px] font-bold tracking-[1.5px] uppercase text-gray-400 w-[280px]">
                  Feature
                </th>
                {PLANS.map((p) => (
                  <th
                    key={p.name}
                    className={`text-center px-5 py-4 text-[12px] font-bold ${p.highlight ? "text-accent" : "text-gray-800"}`}
                  >
                    {p.name}
                    <AnimatePresence mode="wait" initial={false}>
                      <motion.span
                        key={isAnnual ? p.annualPrice : p.monthlyPrice}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.18 }}
                        className="block font-normal text-[10px] text-gray-400 mt-0.5"
                      >
                        {isAnnual ? p.annualPrice : p.monthlyPrice}/mo
                      </motion.span>
                    </AnimatePresence>
                  </th>
                ))}
              </tr>
            </thead>

            <tbody ref={tableBodyRef}>
              {FEATURE_ROWS.map((feature, i) => (
                <tr
                  key={feature}
                  className={`border-b border-gray-50 ${i % 2 === 0 ? "bg-white" : "bg-gray-50/30"}`}
                >
                  <td className="px-5 py-3.5 text-gray-700">{feature}</td>
                  {PLANS.map((p) => (
                    <td
                      key={p.name}
                      className={`px-5 py-3.5 text-center ${p.highlight ? "hover:bg-[#e0f7fa]/25 transition-colors" : ""}`}
                    >
                      {p.features[feature] ? (
                        <motion.span
                          className="inline-block"
                          whileHover={{ scale: 1.28 }}
                          transition={{ type: "spring", stiffness: 400, damping: 18 }}
                        >
                          <Check className="h-4 w-4 text-accent" strokeWidth={2.5} />
                        </motion.span>
                      ) : (
                        <Minus className="h-4 w-4 text-gray-200 mx-auto" strokeWidth={2} />
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="font-mono text-[11px] text-gray-400 mt-3 text-center"
        >
          AI Receptionist: Starter 25 min/mo · Professional 100 min/mo · Enterprise 300 min/mo (pooled per account).{" "}
          Call recording: Professional basic 30-day · Enterprise advanced 1-year.
        </motion.p>
      </section>

      {/* TRIAL LIMITS — hover accordion */}
      <TrialHoverAccordion />

      {/* FAQ — matches home page style */}
      <Faq items={FAQS} heading="Pricing questions, answered." />

      {/* FINAL CTA */}
      <motion.div
        ref={ctaRef}
        className="py-16 mt-8"
        style={{
          background: "linear-gradient(135deg, #1797ac 0%, #1abcd9 45%, #95d9e8 100%)",
          backgroundSize: "200% 200%",
          backgroundPosition: "0% 50%",
        }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.55 }}
      >
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.p
            className="font-serif text-[30px] sm:text-[36px] font-bold text-white mb-3 text-balance"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.5 }}
          >
            14 days free. No risk.
          </motion.p>

          <motion.p
            className="font-mono text-[15px] text-white/80 max-w-[520px] mx-auto mb-8 leading-relaxed"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Start your free trial today. No setup fees, no contracts, cancel anytime.
          </motion.p>

          <motion.a
            href="#"
            className="group inline-flex items-center gap-2 bg-white text-accent text-[15px] font-semibold font-mono pl-6 pr-3 py-2.5 rounded-full"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.5 }}
            whileHover={{ scale: 1.06, boxShadow: "0 14px 36px rgba(0,0,0,0.24)" }}
            whileTap={{ scale: 0.97 }}
          >
            Start Free Trial
            <span className="grid place-items-center h-8 w-8 rounded-full bg-accent/10">
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" strokeWidth={2.2} />
            </span>
          </motion.a>
        </div>
      </motion.div>
    </>
  )
}
