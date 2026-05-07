"use client"

import { PageLayout } from "@/components/page-layout"
import { PageHero, SectionHeading, ValueCard, RelatedCards, StatBar, FeatureSplit, DarkBand, InlineList } from "@/components/page-parts"
import { FinalCta } from "@/components/final-cta"
import { Faq } from "@/components/faq"
import { Headphones, Phone, MessageSquare, BarChart2, Clock, Workflow } from "lucide-react"

const VALUES = [
  { icon: Headphones, title: "Omnichannel Support", body: "Handle calls, SMS, WhatsApp, and chat from one unified dashboard for faster response times." },
  { icon: Phone, title: "Smart Call Routing", body: "Automatically route calls to the right agent using IVR, skills, or priority-based rules." },
  { icon: MessageSquare, title: "Shared Team Inbox", body: "Collaborate on customer conversations with internal notes, tagging, and assignments." },
  { icon: BarChart2, title: "Real-time Analytics", body: "Monitor call volumes, response times, and agent performance with live dashboards." },
  { icon: Clock, title: "24/7 Availability", body: "Never miss a customer with automated responses, voicemail, and call queues." },
  { icon: Workflow, title: "Workflow Automation", body: "Automate repetitive tasks like ticket creation, follow-ups, and notifications." },
]

const FAQS = [
  { q: "Can I manage multiple support channels in one place?", a: "Yes. Twiching brings calls, SMS, WhatsApp, and chat into a single dashboard for seamless support." },
  { q: "Does it support IVR and call routing?", a: "Yes. You can create custom IVR flows and route calls based on agent skills or availability." },
  { q: "Can I track support team performance?", a: "Yes. Real-time analytics and reports help monitor KPIs like response time and resolution rates." },
  { q: "Is it suitable for small teams?", a: "Absolutely. Twiching scales from small support teams to full contact centers." },
]

export default function SupportPage() {
  return (
    <PageLayout>
      <PageHero
        eyebrow="Solutions · Customer Support"
        h1="Cloud contact center for modern support teams"
        sub="Deliver fast, reliable, and scalable customer support with voice, messaging, and automation — all in one UCaaS platform."
        trustItems={["Omnichannel", "IVR routing", "Live analytics", "Automation"]}
        primaryCta={{ label: "Start Free Trial", href: "/pricing" }}
        secondaryCta={{ label: "Talk to sales", href: "/contact" }}
        image={{ alt: "Customer support team dashboard showing omnichannel inbox and live agent analytics" }}
      />

      {/* Stats bar */}
      <StatBar stats={[
        { value: "4 channels", label: "Omnichannel support", note: "calls, SMS, WhatsApp, chat" },
        { value: "Real-time", label: "Agent analytics", note: "live dashboards, no delay" },
        { value: "24/7", label: "Availability", note: "queues, voicemail, auto-responses" },
        { value: "No-code", label: "IVR builder", note: "routing flows without engineering" },
      ]} />

{/* Value cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {VALUES.map((v) => (
            <ValueCard key={v.title} icon={v.icon} title={v.title} body={v.body} />
          ))}
        </div>
      </section>

      {/* Feature split 1 — Smart routing + omnichannel */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t border-gray-100">
        <FeatureSplit
          eyebrow="Smart routing"
          heading="Every customer reaches the right agent, first time."
          body="Twiching's IVR and skills-based routing reads caller history, account tier, and IVR selections to connect each customer to the best available agent. No transfers. No re-explaining. First-call resolution improves immediately."
          points={[
            "Skills-based routing — match caller needs to agent expertise",
            "Priority routing for VIP accounts and high-tier customers",
            "IVR handles FAQs and order status automatically",
            "Overflow routing when all agents are busy — no abandoned calls",
          ]}
          cta={{ label: "Start Free Trial", href: "/pricing" }}
          image={{ alt: "Smart call routing configuration showing skills-based routing rules and IVR flow" }}
        />
      </section>

      {/* Feature split 2 — Analytics + team performance (reversed) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t border-gray-100">
        <FeatureSplit
          eyebrow="Live analytics"
          heading="See every queue, every agent, every metric — live."
          body="Supervisor wallboards update in real time — queue depth, average wait time, agent status, and CSAT scores on one screen. Spot a spike in volume before it becomes a missed SLA. Coach the agent who needs it before the call ends."
          points={[
            "Real-time wallboards: queue depth, AHT, agent status",
            "Per-agent scorecards: CSAT, FCR, call volume, handle time",
            "Threshold alerts via SMS or email when KPIs breach limits",
            "Historical reporting for weekly and monthly reviews",
          ]}
          image={{ alt: "Supervisor wallboard showing real-time queue metrics and agent performance scores" }}
          reverse
        />
      </section>

      {/* Use cases */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t border-gray-100">
        <SectionHeading eyebrow="Use cases" h2="How support teams use Twiching" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-2">
          {[
            { title: "Helpdesk operations", body: "Centralize all customer queries into one platform and resolve issues faster." },
            { title: "E-commerce support", body: "Handle order inquiries, returns, and updates via calls and messaging." },
            { title: "Technical support teams", body: "Provide real-time troubleshooting with call recording and logs." },
            { title: "SaaS customer success", body: "Engage customers proactively with reminders, onboarding calls, and support." },
            { title: "Inbound call centers", body: "Manage high call volumes with IVR, queues, and smart routing." },
            { title: "Global support teams", body: "Support customers worldwide with local numbers and distributed agents." },
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
        <SectionHeading eyebrow="Full capabilities" h2="Everything a modern support team needs" />
        <InlineList
          items={[
            "Omnichannel inbox: calls, SMS, WhatsApp, and chat unified",
            "Skills-based and priority call routing",
            "No-code IVR builder for self-service and routing flows",
            "Shared team inbox with internal notes and assignments",
            "Real-time wallboards and live agent status",
            "Per-agent scorecards: CSAT, FCR, AHT, call volume",
            "Supervisor monitoring, whisper coaching, and call barge",
            "Threshold alerts via SMS or email",
            "24/7 availability via queues, voicemail, and auto-responses",
          ]}
          image={{ alt: "Customer support capabilities overview in Twiching" }}
        />
      </section>

      {/* Dark band */}
      <DarkBand>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-[11px] font-mono font-bold tracking-[2px] uppercase text-gray-500 mb-3">Built for support teams that scale</p>
            <h2 className="text-3xl sm:text-4xl font-semibold text-white tracking-tight text-balance leading-tight mb-5">
              Every channel. One inbox.<br />Zero repeat conversations.
            </h2>
            <p className="text-base text-gray-400 leading-relaxed max-w-lg">
              The best support teams don't make customers repeat themselves. Twiching unifies every channel — calls, SMS, WhatsApp, chat — in one inbox, with the full conversation history visible before the agent says hello.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: "Omnichannel", note: "All channels, one inbox" },
              { label: "Live", note: "Real-time dashboards" },
              { label: "24/7", note: "Queues and auto-responses" },
              { label: "No-code", note: "IVR and routing builder" },
            ].map(({ label, note }) => (
              <div key={label} className="p-5 rounded-xl border border-white/10 bg-white/5">
                <p className="font-mono font-bold text-[16px] text-white mb-1">{label}</p>
                <p className="font-mono text-[11px] text-gray-500">{note}</p>
              </div>
            ))}
          </div>
        </div>
      </DarkBand>

      <Faq items={FAQS} heading="Customer support FAQ" />

      <RelatedCards
        heading="Explore more solutions"
        cards={[
          { title: "Remote Teams", desc: "Enable distributed teams with cloud communication.", href: "/solutions/remote-teams" },
          { title: "Sales Teams", desc: "Boost outbound performance with smart dialing.", href: "/solutions/sales" },
          { title: "Call Recording", desc: "Record and review conversations for quality.", href: "/features/call-recording" },
        ]}
      />

      <FinalCta />
    </PageLayout>
  )
}
