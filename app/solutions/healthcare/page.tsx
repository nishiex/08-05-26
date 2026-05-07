"use client"

import { PageLayout } from "@/components/page-layout"
import { PageHero, SectionHeading, ValueCard, RelatedCards, StatBar, FeatureSplit, DarkBand, InlineList } from "@/components/page-parts"
import { FinalCta } from "@/components/final-cta"
import { Faq } from "@/components/faq"
import { Heart, Shield, Phone, MessageSquare, Clock, Users } from "lucide-react"

const VALUES = [
  { icon: Shield, title: "HIPAA-Compliant", body: "End-to-end encrypted calls and messages. Business Associate Agreements (BAA) available on Professional and Enterprise plans." },
  { icon: Phone, title: "Virtual Numbers for Every Provider", body: "Assign dedicated local or toll-free numbers to physicians, departments, or locations. Patients always reach the right person." },
  { icon: MessageSquare, title: "Appointment SMS Reminders", body: "Automated text reminders reduce no-shows by up to 40%. Two-way SMS lets patients confirm or reschedule instantly." },
  { icon: Clock, title: "After-Hours Auto-Attendant", body: "Route after-hours calls to on-call staff, urgent care lines, or voicemail with a custom message — never leave a patient stranded." },
  { icon: Users, title: "Multi-Location Support", body: "One account for every practice location. Centralized billing, unified reporting, and per-site number management." },
  { icon: Heart, title: "Patient Experience First", body: "HD voice, minimal hold times, and intelligent call routing put patients at ease from the first ring." },
]

const FAQS = [
  { q: "Is Twiching HIPAA-compliant?", a: "Yes. Twiching supports HIPAA-compliant communications including encrypted calls, secure voicemail, and Business Associate Agreements on Professional and Enterprise plans." },
  { q: "Can I assign different numbers to different departments?", a: "Yes. You can provision local or toll-free numbers for each department, provider, or location and route them independently." },
  { q: "Does Twiching support after-hours routing?", a: "Yes. The multi-level auto-attendant lets you define business hours and configure after-hours routing to on-call staff, urgent lines, or custom voicemail greetings." },
  { q: "Can patients reply to SMS appointment reminders?", a: "Yes. Two-way SMS allows patients to confirm, cancel, or reschedule by replying to the reminder — responses route to your team's dashboard." },
]

export default function HealthcarePage() {
  return (
    <PageLayout>
      <PageHero
        eyebrow="Solutions · Healthcare"
        h1="Communications built for healthcare providers"
        sub="HIPAA-compliant voice, SMS, and virtual numbers that help practices, clinics, and telehealth teams deliver better patient experiences — with less administrative overhead."
        trustItems={["HIPAA-compliant", "BAA available", "STIR/SHAKEN", "Encrypted calls"]}
        primaryCta={{ label: "Start Free Trial", href: "/pricing" }}
        secondaryCta={{ label: "Talk to sales", href: "/contact" }}
        image={{ alt: "Healthcare provider communications dashboard showing appointment reminders and patient call routing" }}
      />

      {/* Stats bar */}
      <StatBar stats={[
        { value: "HIPAA", label: "Compliance standard", note: "BAA available on Pro & Enterprise" },
        { value: "40%", label: "Fewer no-shows", note: "with automated SMS reminders" },
        { value: "24/7", label: "After-hours routing", note: "on-call staff always reachable" },
        { value: "Multi-site", label: "Location support", note: "one account, every location" },
      ]} />

{/* Value grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {VALUES.map((v) => <ValueCard key={v.title} icon={v.icon} title={v.title} body={v.body} />)}
        </div>
      </section>

      {/* Feature split 1 — Appointment SMS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t border-gray-100">
        <FeatureSplit
          eyebrow="Appointment reminders"
          heading="Reduce no-shows by 40% with automated SMS reminders."
          body="Twiching sends automated appointment reminders 24–48 hours before each visit. Patients reply CONFIRM or CANCEL directly — and your front desk sees every response in the dashboard without lifting the phone."
          points={[
            "Automated reminders triggered by your scheduling system",
            "Two-way SMS — patients confirm or reschedule by replying",
            "Reminder content fully customizable per appointment type",
            "Responses logged to patient record via CRM sync",
          ]}
          cta={{ label: "Start Free Trial", href: "/pricing" }}
          image={{ alt: "Appointment reminder SMS flow showing patient confirmation and dashboard update" }}
        />
      </section>

      {/* Feature split 2 — HIPAA compliance (reversed) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t border-gray-100">
        <FeatureSplit
          eyebrow="HIPAA compliance"
          heading="Encrypted calls. Secure voicemail. BAA included."
          body="Every call and message on Twiching is encrypted in transit and at rest. Business Associate Agreements are available on Professional and Enterprise — giving your compliance team the documentation they need without a legal back-and-forth."
          points={[
            "End-to-end encrypted voice and SMS",
            "Business Associate Agreement available on Pro & Enterprise",
            "Secure voicemail with encrypted storage",
            "Audit-ready call logs and recording exports",
          ]}
          image={{ alt: "HIPAA compliance checklist and encrypted call storage confirmation in Twiching" }}
          reverse
        />
      </section>

      {/* Use cases */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t border-gray-100">
        <SectionHeading eyebrow="Use cases" h2="How healthcare teams use Twiching" sub="From solo practitioners to multi-site health systems." />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-2">
          {[
            { title: "Appointment scheduling", body: "Dedicated inbound lines per department with call queues and hold music. Patients reach scheduling in seconds." },
            { title: "Telehealth intake", body: "Collect patient info via SMS before a video or phone appointment. Reduce front-desk workload by 30%." },
            { title: "Prescription refill lines", body: "Separate IVR options for refill requests route to pharmacy staff automatically, keeping main lines clear." },
            { title: "On-call physician routing", body: "After-hours calls route to the on-call physician's personal mobile without revealing their private number." },
            { title: "Lab result notifications", body: "Trigger automated SMS when results are ready — patients get notified without staff making individual calls." },
            { title: "Multi-location management", body: "One admin dashboard manages numbers and call flows for every clinic location. Centralized billing." },
          ].map((uc) => (
            <div key={uc.title} className="p-6 rounded-2xl border border-gray-100 bg-white shadow-sm hover:shadow-md hover:border-[#95d9e8]/50 transition-all">
              <h3 className="font-semibold text-[15px] text-gray-900 mb-2">{uc.title}</h3>
              <p className="text-[13px] text-gray-600 leading-relaxed">{uc.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Inline checklist */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t border-gray-100">
        <SectionHeading eyebrow="Full capabilities" h2="Everything healthcare providers need from a phone system" />
        <InlineList
          items={[
            "HIPAA-compliant calls and messaging — encrypted end to end",
            "Business Associate Agreement (BAA) on Pro & Enterprise",
            "Dedicated local or toll-free numbers per provider or department",
            "Automated appointment SMS reminders with two-way replies",
            "After-hours auto-attendant with on-call routing",
            "Multi-location management from one admin portal",
            "Prescription refill and lab result IVR flows",
            "Secure voicemail with encrypted storage",
            "Call recording for quality and compliance review",
          ]}
          image={{ alt: "Healthcare communications capabilities overview in Twiching" }}
        />
      </section>

      {/* Dark band */}
      <DarkBand>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-[11px] font-mono font-bold tracking-[2px] uppercase text-gray-500 mb-3">Built for patient-first care</p>
            <h2 className="text-3xl sm:text-4xl font-semibold text-white tracking-tight text-balance leading-tight mb-5">
              HIPAA from day one.<br />No compliance team required.
            </h2>
            <p className="text-base text-gray-400 leading-relaxed max-w-lg">
              Healthcare providers shouldn't spend billable hours configuring a phone system to meet compliance requirements. Twiching ships HIPAA-ready — encrypted calls, secure voicemail, BAA documentation — so you can focus on patients, not infrastructure.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: "HIPAA", note: "End-to-end encrypted" },
              { label: "BAA", note: "Pro & Enterprise plans" },
              { label: "−40%", note: "Fewer no-shows with SMS" },
              { label: "24/7", note: "After-hours routing" },
            ].map(({ label, note }) => (
              <div key={label} className="p-5 rounded-xl border border-white/10 bg-white/5">
                <p className="font-mono font-bold text-[20px] text-white mb-1">{label}</p>
                <p className="font-mono text-[11px] text-gray-500">{note}</p>
              </div>
            ))}
          </div>
        </div>
      </DarkBand>

      <Faq items={FAQS} heading="Healthcare communications FAQ" />

      <RelatedCards
        heading="Explore more solutions"
        cards={[
          { title: "Finance", desc: "Compliant communications for financial services and insurance.", href: "/solutions/finance" },
          { title: "Real Estate", desc: "Virtual numbers and SMS for agents and brokerages.", href: "/solutions/real-estate" },
          { title: "Auto-Attendant", desc: "Route every patient call to the right department automatically.", href: "/features/auto-attendant" },
        ]}
      />

      <FinalCta />
    </PageLayout>
  )
}
