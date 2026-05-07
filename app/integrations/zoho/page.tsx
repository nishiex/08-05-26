import { Metadata } from "next"
import { PageLayout } from "@/components/page-layout"
import { PageHero, SectionHeading, ValueCard, RelatedCards, StatBar, DarkBand } from "@/components/page-parts"
import { FinalCta } from "@/components/final-cta"
import { Faq } from "@/components/faq"
import {
  Phone, RefreshCw, Mic, MousePointerClick,
  MonitorSmartphone, GitMerge, Layers, Zap,
} from "lucide-react"

export const metadata: Metadata = {
  title: "Zoho Integration · Twiching",
  description: "Two-way sync for contacts, leads, tasks and activities across Zoho CRM, Desk, Books, and Bigin. Every call logged automatically — no code required.",
}

const FEATURES = [
  {
    icon: RefreshCw,
    title: "Real-time two-way sync",
    body: "Contacts, leads, deals, tasks, and activities synchronize in both directions within seconds. Create on either side, see it on the other instantly.",
  },
  {
    icon: Phone,
    title: "Every call logged automatically",
    body: "Inbound and outbound calls attach to the matching Zoho record the moment they end. No manual entry, no missed activities.",
  },
  {
    icon: Mic,
    title: "Voicemails with transcripts",
    body: "Audio recordings and written transcripts are saved directly alongside activities on the Zoho record — searchable and shareable with your team.",
  },
  {
    icon: MousePointerClick,
    title: "Click-to-call from any field",
    body: "Dial straight from any phone field across Zoho without copying numbers or switching apps. One click to connect.",
  },
  {
    icon: MonitorSmartphone,
    title: "Screen pop on inbound",
    body: "When a known contact calls, their full Zoho record opens automatically before you even answer. Full context, every time.",
  },
  {
    icon: GitMerge,
    title: "Workflow triggers on call events",
    body: "Missed calls fire automated follow-ups. Ended calls can open Desk tickets, update deal stages, or send internal alerts — all without manual steps.",
  },
]

const ZOHO_APPS = [
  { name: "Zoho CRM",   desc: "Full contact, lead, and deal sync with click-to-call from every record." },
  { name: "Zoho Desk",  desc: "Auto-open tickets on missed calls. Screen pop with open ticket on inbound." },
  { name: "Zoho Books", desc: "Customer call history synced to financial records for billing and account teams." },
  { name: "Zoho Bigin", desc: "Pipeline-focused CRM with the same two-way sync and click-to-call experience." },
]

const FAQS = [
  {
    q: "Does this work with the full Zoho One suite?",
    a: "Yes. The integration works across Zoho CRM, Desk, Books, and Bigin — all under a single Zoho One account with one OAuth authentication.",
  },
  {
    q: "Do I need a developer to set it up?",
    a: "No. Setup is a four-step process: install from the Marketplace, sign in with your Zoho admin account, map your users, and go live. No custom coding required.",
  },
  {
    q: "How quickly does call data sync?",
    a: "Call logs, activities, and contact updates sync within seconds of the call ending — both inbound and outbound, in both directions.",
  },
  {
    q: "Can missed calls automatically trigger follow-up workflows?",
    a: "Yes. Missed call events fire workflow triggers in Zoho that you can use to send follow-up SMS, create tasks, assign leads, or open Desk tickets automatically.",
  },
  {
    q: "Where do recordings appear in Zoho?",
    a: "Recordings and transcripts attach as activity notes directly on the matching CRM record — contact, lead, or deal — and are accessible from within your normal Zoho workflow.",
  },
]

export default function ZohoIntegrationPage() {
  return (
    <PageLayout>
      <PageHero
        eyebrow="Integrations · Zoho"
        h1="Twiching for Zoho. Calls land where your team already works."
        sub="Two-way sync for contacts, leads, tasks, and activities across Zoho CRM, Desk, Books, and Bigin. Every call attached to the right record automatically — no code, no switching tabs."
        trustItems={["No-code setup", "2-way sync", "Screen pop", "Full Zoho One support"]}
        primaryCta={{ label: "Start Free Trial", href: "/pricing" }}
        secondaryCta={{ label: "Talk to sales", href: "/contact" }}
        image={{ alt: "Twiching call activity synced to a Zoho CRM contact record with screen pop" }}
      />

      <StatBar stats={[
        { value: "2-way",  label: "Sync direction",       note: "contacts, leads & activities" },
        { value: "< 15m",  label: "Setup time",           note: "no developer needed" },
        { value: "4",      label: "Zoho apps supported",  note: "CRM, Desk, Books, Bigin" },
        { value: "0",      label: "Manual logging",       note: "every call auto-attached" },
      ]} />

{/* Feature grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <SectionHeading
          eyebrow="What it does"
          h2="Everything synced, nothing manual"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
          {FEATURES.map((f) => (
            <ValueCard key={f.title} icon={f.icon} title={f.title} body={f.body} />
          ))}
        </div>
      </section>

      {/* Wider Zoho stack */}
      <DarkBand>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <SectionHeading
            eyebrow="The wider Zoho stack"
            h2="One integration. Every Zoho app your team uses."
            dark
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            {ZOHO_APPS.map(({ name, desc }) => (
              <div key={name} className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <p className="text-[15px] font-semibold text-white mb-2">{name}</p>
                <p className="text-[13px] text-gray-400 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </DarkBand>

      <Faq items={FAQS} heading="Zoho integration questions, answered." />

      <RelatedCards
        heading="Keep exploring"
        cards={[
          { title: "HubSpot Integration",       desc: "Sync calls, SMS, and AI transcripts directly to HubSpot records.", href: "/integrations/hubspot" },
          { title: "Conversation Intelligence",  desc: "AI transcripts, keyword flagging, and call coaching at scale.",    href: "/features/conv-intelligence" },
          { title: "Intelligent Routing",        desc: "Route calls to the right rep based on CRM data and availability.", href: "/features/routing" },
        ]}
      />

      <FinalCta />
    </PageLayout>
  )
}
