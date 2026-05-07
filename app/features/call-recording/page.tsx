"use client"

import { PageLayout } from "@/components/page-layout"
import { SectionHeading, ValueCard, RelatedCards, StatBar, FeatureSplit, DarkBand, InlineList } from "@/components/page-parts"
import { FinalCta } from "@/components/final-cta"
import { Faq } from "@/components/faq"
import { CallRecordingStory } from "@/components/call-recording-story"
import { Mic, Shield, Download, Search, Clock, Bell, ShieldCheck, Users, Lock } from "lucide-react"
import { ArrowRight, Check } from "lucide-react"
import { motion } from "framer-motion"

const VALUES = [
  { icon: Mic,         title: "Full-fidelity recording",      body: "Capture inbound, outbound, or both directions automatically — always-on or on-demand. No agent action required, from the very first ring." },
  { icon: Search,      title: "Under-1s keyword search",      body: "Search your entire call library by keyword, phrase, agent, or date in under a second — across tens of thousands of recordings." },
  { icon: ShieldCheck, title: "Auto-redaction",               body: "Card numbers, ID numbers, and custom patterns are automatically muted in both the audio and transcript. QA reviews freely, no security flags." },
  { icon: Lock,        title: "Role-based access",            body: "Team leads, QA auditors, and admins each get the exact access they need — nothing more. Audit logs track every playback and export." },
  { icon: Clock,       title: "Configurable retention",       body: "Per-queue retention windows from 30 days to 7 years. Regulated calls kept longer, clean calls purged automatically. No manual cleanup." },
  { icon: Bell,        title: "Compliance consent prompts",   body: "Consent disclosures per queue, region, or policy. Customizable message, auto-plays before recording begins on every applicable call." },
]

const ROLES = [
  {
    role: "Team Lead",
    items: ["Listen to calls in their queue", "Export single or bulk recordings", "Adjust retention for their team"],
  },
  {
    role: "QA Auditor",
    items: ["Sample calls org-wide", "Export for scoring and review", "Flag recordings for supervisor"],
  },
  {
    role: "Admin",
    items: ["Org-wide access to all calls", "Manage redaction rules & patterns", "Full audit log — playbacks, exports, changes"],
  },
]

const FAQS = [
  { q: "How long are recordings kept?", a: "Retention is configurable per queue or call type — from 30 days to 7 years. Recordings auto-delete when the window expires. Extended retention is available for regulated queues." },
  { q: "Is redaction automatic?", a: "Yes. Twiching automatically detects and redacts card numbers, ID numbers, and custom patterns in both the audio track and the transcript. No manual review required." },
  { q: "Can consent prompts be applied to only certain queues?", a: "Yes. Consent disclosures are configured per queue, region, or policy. You choose which queues require them — and customise the message." },
  { q: "Where is the audio stored?", a: "Recordings are stored encrypted at rest with AES-256 in geographically redundant cloud storage. In transit, all data uses TLS 1.3." },
  { q: "Does this work with existing phones and numbers?", a: "Yes. Call recording works with all Twiching numbers — virtual, local, business, and toll-free — on any device: softphone, mobile app, or browser." },
  { q: "Who can access recordings?", a: "Access is role-gated. Team leads see their queue, QA auditors sample org-wide, admins have full access. Every playback and export is logged in the audit trail." },
]

export default function CallRecordingPage() {
  return (
    <PageLayout>

      {/* ── Custom hero with animation ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* Left text */}
          <div>
            <div className="flex items-center gap-2 mb-5">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-accent" />
              <p className="text-[11px] font-mono font-bold tracking-[2px] uppercase text-accent">Features · Call Recording</p>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-[52px] font-semibold tracking-tight text-gray-900 leading-[1.06] text-balance">
              Every call captured.<br />Every word searchable.
            </h1>
            <p className="mt-5 text-base sm:text-lg text-gray-500 leading-relaxed max-w-[500px]">
              Full-fidelity recording paired with AI transcription, keyword search, automatic redaction, and retention you control. Storing recordings is cheap — finding the one that matters isn't.
            </p>

            <div className="flex flex-wrap gap-2 mt-6">
              {["AES-256 encryption", "Auto-redaction", "Sub-1s search", "HIPAA · GDPR · FINRA"].map(item => (
                <span key={item} className="inline-flex items-center gap-1.5 text-[11px] font-mono text-gray-600 bg-gray-50 border border-gray-200 px-2.5 py-1 rounded-full">
                  <Check className="h-3 w-3 text-accent" strokeWidth={2.5} />
                  {item}
                </span>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-3 mt-8">
              <motion.a
                href="/pricing"
                whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
                className="group inline-flex items-center gap-2 bg-accent text-white text-[15px] font-semibold font-mono pl-7 pr-3 py-2 rounded-full hover:bg-[color:var(--accent-dark)] shadow-[0_8px_24px_-6px_rgba(26,188,217,0.45)]"
              >
                Start Free Trial
                <span className="grid place-items-center h-8 w-8 rounded-full bg-white/15 ring-1 ring-inset ring-white/25 transition-transform group-hover:translate-x-0.5">
                  <ArrowRight className="h-4 w-4" strokeWidth={2.2} />
                </span>
              </motion.a>
              <a href="/contact" className="text-[14px] font-semibold text-gray-500 hover:text-accent transition-colors">
                Talk to sales
              </a>
            </div>
          </div>

          {/* Right — animation */}
          <div className="w-full flex items-center justify-center">
            <CallRecordingStory />
          </div>
        </div>
      </section>

      {/* Stats */}
      <StatBar stats={[
        { value: "< 1s",   label: "Search speed",       note: "across your full call library" },
        { value: "30d–7yr", label: "Retention range",   note: "configurable per queue" },
        { value: "100%",   label: "Auto-transcribed",   note: "every recorded call" },
        { value: "AES-256", label: "Encryption at rest", note: "TLS 1.3 in transit" },
      ]} />

{/* Feature cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <SectionHeading eyebrow="What's included" h2="A complete recording program, out of the box" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
          {VALUES.map((v) => <ValueCard key={v.title} icon={v.icon} title={v.title} body={v.body} />)}
        </div>
      </section>

      {/* Feature split 1 — Search */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t border-gray-100">
        <FeatureSplit
          eyebrow="Keyword search"
          heading="Find any moment in any call — in under a second"
          body="Every recording is automatically transcribed as it finishes. Search across your entire library by keyword, agent, date, or caller ID. Jump directly to the timestamp of the match. No manual scrubbing."
          points={[
            "Full-text search across all transcripts",
            "Jump to the exact timestamp of a keyword hit",
            "Filter by agent, team, direction, or date",
            "Export transcript alongside recording for audits",
          ]}
          cta={{ label: "See it in action", href: "/pricing" }}
          image={{ alt: "Transcript keyword search with highlighted matches" }}
        />
      </section>

      {/* Feature split 2 — Redaction */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t border-gray-100">
        <FeatureSplit
          eyebrow="Auto-redaction"
          heading="Compliance without the spreadsheet"
          body="Card numbers, national ID numbers, and your own custom patterns are automatically muted in both the audio and the transcript. Your QA team can listen to anything without raising a security flag."
          points={[
            "Credit card numbers redacted in audio + transcript",
            "Custom pattern rules for IDs and sensitive fields",
            "Redaction audit log — every rule change is timestamped",
            "HIPAA and PCI-DSS compliance supported out of the box",
          ]}
          image={{ alt: "Auto-redaction rule configuration showing muted credit card in transcript" }}
          reverse
        />
      </section>

      {/* Role-based access */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t border-gray-100">
        <SectionHeading eyebrow="Access control" h2="The right access for every role" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
          {ROLES.map(({ role, items }) => (
            <div key={role} className="p-6 rounded-2xl border border-gray-100 bg-white shadow-sm">
              <p className="text-[11px] font-mono font-bold tracking-[2px] uppercase text-accent mb-1">{role}</p>
              <ul className="mt-3 space-y-2">
                {items.map(item => (
                  <li key={item} className="flex items-start gap-2 text-[13px] text-gray-600 leading-snug">
                    <Check className="h-3.5 w-3.5 text-accent mt-0.5 flex-shrink-0" strokeWidth={2.5} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <p className="text-[13px] text-gray-400 font-mono mt-5">Every playback, export, and rule change is logged in the audit trail.</p>
      </section>

      {/* Compliance dark band */}
      <DarkBand>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-[11px] font-mono font-bold tracking-[2px] uppercase text-gray-500 mb-3">Built for regulated industries</p>
            <h2 className="text-3xl sm:text-4xl font-semibold text-white tracking-tight leading-tight mb-5">
              HIPAA. GDPR. FINRA. SOC 2.<br />Access you can trust.
            </h2>
            <p className="text-base text-gray-400 leading-relaxed max-w-lg">
              Encrypted storage, configurable retention, auto-redaction, consent prompts, and audit-ready exports — all standard, none optional. The audit log of every playback and export is what gets compliance teams to sign off in week one.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: "HIPAA",  note: "Healthcare call compliance" },
              { label: "GDPR",   note: "EU data retention rules" },
              { label: "FINRA",  note: "Financial services recording" },
              { label: "SOC 2",  note: "Enterprise security audit" },
            ].map(({ label, note }) => (
              <div key={label} className="p-5 rounded-xl border border-white/10 bg-white/5">
                <p className="font-mono font-bold text-[18px] text-white mb-1">{label}</p>
                <p className="font-mono text-[11px] text-gray-500">{note}</p>
              </div>
            ))}
          </div>
        </div>
      </DarkBand>

      <Faq items={FAQS} heading="Call Recording FAQ" />

      <RelatedCards
        heading="Related features"
        cards={[
          { title: "Conversation Intelligence", desc: "AI-powered transcription, keyword detection, and call scoring.", href: "/features/conv-intelligence" },
          { title: "Supervisor Tools",          desc: "Live call monitoring, whisper coaching, and QA scoring.",       href: "/features/supervisor" },
          { title: "Auto-Attendant",            desc: "Route calls to the right team before they reach your agents.", href: "/features/auto-attendant" },
        ]}
      />

      <FinalCta />
    </PageLayout>
  )
}
