"use client"

import React, { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { PageLayout } from "@/components/page-layout"
import { SectionHeading, ValueCard, RelatedCards, StatBar, DarkBand } from "@/components/page-parts"
import { FinalCta } from "@/components/final-cta"
import { Faq } from "@/components/faq"
import { ReportsShowcase } from "@/components/reports-showcase"
import { BarChart2, Download, Bell, Filter, Shield, Search, ArrowRight, Check } from "lucide-react"
import { motion } from "framer-motion"

const FEATURES = [
  { icon: BarChart2, title: "Real-time dashboards",   body: "Monitor call volume, queue wait times, agent activity, and SLA status as they happen. Live data refreshes automatically — no manual refresh required." },
  { icon: Search,    title: "Full call log search",    body: "Search every inbound and outbound call by number, agent, date, duration, or outcome. Filter, sort, and drill into any record in seconds." },
  { icon: Download,  title: "Exportable reports",      body: "Export call logs, usage summaries, and agent performance reports to CSV or PDF. Schedule automated exports directly to your inbox or BI tool." },
  { icon: Filter,    title: "Custom report builder",   body: "Build reports around the metrics that matter to your team. Filter by queue, agent, number, time range, or call outcome — then save for repeat use." },
  { icon: Bell,      title: "Threshold alerts",        body: "Set alerts for queue depth, missed call rate, or SLA breach. Notifications fire to email, SMS, or Slack the moment a threshold is crossed." },
  { icon: Shield,    title: "Audit logs",              body: "Every account action — number changes, user permissions, call recordings accessed, settings modified — is logged with a timestamp and user attribution." },
]

const REPORT_TYPES = [
  { label: "Call Activity",     note: "Volume, duration, and outcome by agent or queue" },
  { label: "Queue Performance", note: "Wait times, abandonment rates, and SLA metrics" },
  { label: "Agent Reports",     note: "Handle time, call count, and availability per rep" },
  { label: "Usage & Billing",   note: "Minutes, SMS, and number usage across your account" },
  { label: "Audit Trail",       note: "Account changes, access events, and admin actions" },
  { label: "Custom Reports",    note: "Build and save reports around your own metrics" },
]

const FAQS = [
  { q: "How far back does call log history go?",     a: "Call logs are retained for 12 months on standard plans. Extended log retention of up to 7 years is available on Business and Enterprise plans." },
  { q: "Can I schedule automated report exports?",   a: "Yes. Reports can be scheduled daily, weekly, or monthly and delivered to any email address or webhook endpoint — including BI tools like Tableau or Power BI." },
  { q: "Are audit logs available for compliance?",   a: "Yes. Every account action is logged with a full timestamp and user attribution. Audit logs are exportable and available for compliance review at any time." },
  { q: "Can I set alerts when queues get too long?", a: "Yes. Threshold alerts can be configured for queue depth, SLA breach, missed call rate, or agent availability. Alerts fire via email, SMS, or webhook." },
  { q: "Can managers see only their team's data?",   a: "Yes. Reports and dashboards are role-gated. Team leads see their queue data, supervisors see their teams, and admins have org-wide visibility." },
]

const TRUST = ["Real-time data", "Custom reports", "Scheduled exports", "Full audit trail"]
const EXPO  = [0.16, 1, 0.3, 1] as const

export default function ReportsPage(): React.ReactElement {
  return (
    <PageLayout>

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-white pt-14 pb-10">

        {/* Background gradient layer */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background: "radial-gradient(ellipse 80% 60% at 60% -10%, rgba(26,188,217,0.07) 0%, transparent 70%)",
          }}
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Text block */}
          <div className="max-w-2xl mb-12">
            <motion.div
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: EXPO }}
              className="flex items-center gap-2 mb-5"
            >
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#1abcd9]" />
              <p className="text-[11px] font-mono font-bold tracking-[2px] uppercase text-[#1abcd9]">
                Platform · Reports & Logs
              </p>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EXPO, delay: 0.08 }}
              className="text-4xl sm:text-5xl lg:text-[52px] font-semibold tracking-tight text-gray-900 leading-[1.06] text-balance"
            >
              Every call tracked.<br />Every metric surfaced.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: EXPO, delay: 0.16 }}
              className="mt-5 text-base sm:text-lg text-gray-500 leading-relaxed"
            >
              Real-time dashboards, searchable call logs, exportable reports, and audit trails —
              across every number, agent, and queue on your account.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: EXPO, delay: 0.24 }}
              className="flex flex-wrap gap-2 mt-6"
            >
              {TRUST.map(item => (
                <span key={item} className="inline-flex items-center gap-1.5 text-[11px] font-mono text-gray-600 bg-gray-50 border border-gray-200 px-2.5 py-1 rounded-full">
                  <Check className="h-3 w-3 text-[#1abcd9]" strokeWidth={2.5} />
                  {item}
                </span>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: EXPO, delay: 0.32 }}
              className="flex flex-wrap items-center gap-3 mt-8"
            >
              <motion.a
                href="/pricing"
                whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
                className="group inline-flex items-center gap-2 bg-[#1abcd9] text-white text-[15px] font-semibold font-mono pl-7 pr-3 py-2 rounded-full hover:bg-[#1797ac] shadow-[0_8px_24px_-6px_rgba(26,188,217,0.45)]"
              >
                Start Free Trial
                <span className="grid place-items-center h-8 w-8 rounded-full bg-white/15 ring-1 ring-inset ring-white/25 transition-transform group-hover:translate-x-0.5">
                  <ArrowRight className="h-4 w-4" strokeWidth={2.2} />
                </span>
              </motion.a>
              <a href="/contact" className="text-[14px] font-semibold text-gray-500 hover:text-[#1abcd9] transition-colors">
                Talk to sales
              </a>
            </motion.div>
          </div>

          {/* Dashboard showcase — the hero visual */}
          <motion.div
            initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EXPO, delay: 0.42 }}
          >
            <ReportsShowcase />
          </motion.div>
        </div>
      </section>

      <StatBar stats={[
        { value: "Real-time", label: "Dashboard refresh",  note: "live queue and agent data" },
        { value: "12mo",      label: "Log retention",      note: "up to 7yr on Enterprise" },
        { value: "9",         label: "Report sections",    note: "calls, agents, SMS & more" },
        { value: "100%",      label: "Actions logged",     note: "full audit trail, every event" },
      ]} />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 pt-8">
        <SectionHeading eyebrow="What's included" h2="Full visibility across your entire phone system" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
          {FEATURES.map((f) => <ValueCard key={f.title} icon={f.icon} title={f.title} body={f.body} />)}
        </div>
      </section>

      <DarkBand>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <SectionHeading eyebrow="Report types" h2="Six report categories, one dashboard." dark />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-10">
            {REPORT_TYPES.map(({ label, note }) => (
              <div key={label} className="p-5 rounded-xl border border-white/10 bg-white/5">
                <p className="font-mono font-bold text-[15px] text-white mb-1">{label}</p>
                <p className="font-mono text-[12px] text-gray-400 leading-relaxed">{note}</p>
              </div>
            ))}
          </div>
        </div>
      </DarkBand>

      <Faq items={FAQS} heading="Reports & Logs FAQ" />

      <RelatedCards
        heading="Related features"
        cards={[
          { title: "AI Supervisor Tools",          desc: "Live monitoring, whisper coaching, and QA scoring.",         href: "/features/supervisor" },
          { title: "Call Recording",               desc: "Encrypted recordings with searchable transcripts.",          href: "/features/call-recording" },
          { title: "AI Conversation Intelligence", desc: "AI transcripts, keyword flagging, and call coaching.",       href: "/features/conv-intelligence" },
        ]}
      />

      <FinalCta />
    </PageLayout>
  )
}
