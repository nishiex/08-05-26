"use client"

import { PageLayout } from "@/components/page-layout"
import { PageHero, SectionHeading, ValueCard, RelatedCards, StatBar, FeatureSplit, DarkBand, InlineList } from "@/components/page-parts"
import { FinalCta } from "@/components/final-cta"
import { Faq } from "@/components/faq"
import { Shield, Landmark, Phone, MessageSquare, BarChart2, Lock } from "lucide-react"

const VALUES = [
  { icon: Lock, title: "Regulatory-Grade Security", body: "STIR/SHAKEN verified numbers, 2FA, SOC 2 audits on Enterprise. Built to satisfy compliance review at banks and insurers." },
  { icon: Landmark, title: "Local Presence Everywhere", body: "Provision local area code numbers in every region your advisors or agents serve. Clients answer local calls 3× more often." },
  { icon: Phone, title: "Call Recording & Archival", body: "Record inbound and outbound calls for regulatory compliance. Recordings are encrypted, timestamped, and exportable." },
  { icon: MessageSquare, title: "Secure Client SMS", body: "Send account alerts, appointment reminders, and policy updates via SMS. All messages logged for audit purposes." },
  { icon: BarChart2, title: "Supervisor Dashboards", body: "Real-time wallboards, agent scorecards, and call analytics. Identify coaching opportunities before they become compliance risks." },
  { icon: Shield, title: "Fraud Prevention", body: "STIR/SHAKEN attestation on every outbound call reduces spoofing risk and protects your brand reputation." },
]

const FAQS = [
  { q: "Does Twiching support call recording for compliance?", a: "Yes. Call recording is available on the Enterprise plan with encrypted storage, timestamps, and bulk export for regulatory audits." },
  { q: "Can I provision local numbers in multiple regions?", a: "Yes. Provision local area code numbers in any US/Canada region instantly, or port existing numbers within 5–10 business days." },
  { q: "What security certifications does Twiching hold?", a: "Twiching supports STIR/SHAKEN, 2FA, HIPAA, and SOC 2 (Enterprise). BAAs and compliance documentation available on request." },
  { q: "Does Twiching integrate with CRMs like Salesforce?", a: "Yes. CRM integrations including Salesforce, HubSpot, and Zoho are available on Professional and Enterprise plans." },
]

export default function FinancePage() {
  return (
    <PageLayout>
      <PageHero
        eyebrow="Solutions · Finance"
        h1="Compliant communications for financial services"
        sub="Banks, insurers, wealth managers, and fintech teams rely on Twiching for secure, recordable voice and SMS — with the audit trails regulators require."
        trustItems={["SOC 2 Enterprise", "Call recording", "STIR/SHAKEN", "CRM integrations"]}
        primaryCta={{ label: "Start Free Trial", href: "/pricing" }}
        secondaryCta={{ label: "Talk to sales", href: "/contact" }}
        image={{ alt: "Financial services compliance dashboard showing call recordings and audit trail" }}
      />

      {/* Stats bar */}
      <StatBar stats={[
        { value: "SOC 2", label: "Security certification", note: "available on Enterprise" },
        { value: "100%", label: "Calls STIR/SHAKEN attested", note: "every outbound, every plan" },
        { value: "AES-256", label: "Recording encryption", note: "TLS 1.3 in transit" },
        { value: "3×", label: "Higher answer rate", note: "with local area code presence" },
      ]} />

{/* Value cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {VALUES.map((v) => <ValueCard key={v.title} icon={v.icon} title={v.title} body={v.body} />)}
        </div>
      </section>

      {/* Feature split 1 — Call recording & compliance */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t border-gray-100">
        <FeatureSplit
          eyebrow="Call recording & compliance"
          heading="Every call archived. Every audit ready."
          body="Twiching records inbound and outbound calls automatically — encrypted at rest, timestamped, and searchable. Export recordings in bulk for FINRA, SEC, or internal compliance reviews without involving IT."
          points={[
            "AES-256 encryption at rest, TLS 1.3 in transit",
            "Configurable retention from 30 days to 7 years",
            "Bulk ZIP + CSV export for regulatory submissions",
            "Compliant caller disclosure message on every recorded call",
          ]}
          cta={{ label: "Start Free Trial", href: "/pricing" }}
          image={{ alt: "Call recording archive dashboard with compliance export controls" }}
        />
      </section>

      {/* Feature split 2 — CRM routing & local presence (reversed) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t border-gray-100">
        <FeatureSplit
          eyebrow="Local presence & CRM"
          heading="Local numbers. CRM-driven routing. Higher connect rates."
          body="Clients answer calls from familiar area codes. On Professional and Enterprise, Twiching reads your CRM to route inbound calls directly to the assigned advisor — no transfers, no hold music for known clients."
          points={[
            "Provision local numbers in any US/Canada region instantly",
            "Inbound routes to CRM account owner automatically",
            "Salesforce, HubSpot, and Zoho integrations included",
            "VIP clients skip the queue and reach their advisor directly",
          ]}
          image={{ alt: "CRM-driven call routing showing advisor assignment and local number provisioning" }}
          reverse
        />
      </section>

      {/* Use cases */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t border-gray-100">
        <SectionHeading eyebrow="Use cases" h2="How financial services teams use Twiching" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-2">
          {[
            { title: "Client advisor hotlines", body: "Dedicated local numbers per advisor. Clients call a familiar local number; calls route to the advisor's device." },
            { title: "Insurance claims intake", body: "IVR routes claimants to the right team by claim type. Call recordings auto-archived for adjustor review." },
            { title: "Fraud alert SMS", body: "Trigger instant SMS alerts when suspicious account activity is detected. Two-way replies allow confirmation." },
            { title: "Loan officer campaigns", body: "Outbound click-to-call campaigns with local caller ID. Call outcomes logged in CRM automatically." },
            { title: "Compliance call monitoring", body: "Supervisors listen to live calls or review recordings. Score calls against compliance checklists." },
            { title: "Branch number management", body: "Centrally manage numbers and IVR menus for every branch from one admin portal." },
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
        <SectionHeading eyebrow="Full capabilities" h2="Everything financial teams need in one platform" />
        <InlineList
          items={[
            "STIR/SHAKEN attestation on every outbound call",
            "Automatic call recording — inbound, outbound, or both",
            "AES-256 encrypted storage with configurable retention",
            "Bulk export for FINRA, SEC, and internal compliance audits",
            "Local numbers in any US/Canada region",
            "CRM-driven routing to account owner",
            "Supervisor monitoring, whisper coaching, and call barge",
            "Real-time wallboards and agent scorecards",
            "SOC 2 certification available on Enterprise",
          ]}
          image={{ alt: "Finance communications feature checklist in Twiching dashboard" }}
        />
      </section>

      {/* Dark band */}
      <DarkBand>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-[11px] font-mono font-bold tracking-[2px] uppercase text-gray-500 mb-3">Built for regulated industries</p>
            <h2 className="text-3xl sm:text-4xl font-semibold text-white tracking-tight text-balance leading-tight mb-5">
              FINRA. SEC. SOC 2.<br />The compliance burden is ours.
            </h2>
            <p className="text-base text-gray-400 leading-relaxed max-w-lg">
              Financial services teams shouldn't spend their compliance budget managing a phone system. Twiching handles recording, encryption, retention, and audit exports so your compliance team can focus on the regulations, not the infrastructure.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: "SOC 2", note: "Enterprise security audit" },
              { label: "FINRA", note: "Financial recording compliance" },
              { label: "STIR/SHAKEN", note: "Every outbound call attested" },
              { label: "AES-256", note: "Encrypted call archives" },
            ].map(({ label, note }) => (
              <div key={label} className="p-5 rounded-xl border border-white/10 bg-white/5">
                <p className="font-mono font-bold text-[16px] text-white mb-1">{label}</p>
                <p className="font-mono text-[11px] text-gray-500">{note}</p>
              </div>
            ))}
          </div>
        </div>
      </DarkBand>

      <Faq items={FAQS} heading="Finance communications FAQ" />

      <RelatedCards
        heading="Explore more solutions"
        cards={[
          { title: "Healthcare", desc: "HIPAA-compliant voice and SMS for healthcare providers.", href: "/solutions/healthcare" },
          { title: "Sales Teams", desc: "Outbound dialing and CRM integration for sales.", href: "/solutions/sales" },
          { title: "Call Recording", desc: "Record, archive, and review calls for compliance.", href: "/features/call-recording" },
        ]}
      />

      <FinalCta />
    </PageLayout>
  )
}
