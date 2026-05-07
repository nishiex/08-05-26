import { Metadata } from "next"
import { PageLayout } from "@/components/page-layout"
import { PageHero, SectionHeading, ValueCard, RelatedCards, StatBar, DarkBand } from "@/components/page-parts"
import { FinalCta } from "@/components/final-cta"
import { Faq } from "@/components/faq"
import { MessageSquare, Hash, Bell, Search, Paperclip, Users, Phone, Lock } from "lucide-react"

export const metadata: Metadata = {
  title: "Team Chat · Twiching",
  description: "Persistent team messaging built into your business phone system. Channels, direct messages, file sharing, and call escalation — all in one place.",
}

const FEATURES = [
  {
    icon: Hash,
    title: "Channels & direct messages",
    body: "Organise conversations by team, project, or topic in persistent channels. Direct message individuals or create group threads — all searchable and always available.",
  },
  {
    icon: Phone,
    title: "Escalate to a call instantly",
    body: "Turn any chat conversation into a voice or video call in one click. No switching apps, no hunting for a number — context carries across.",
  },
  {
    icon: Search,
    title: "Full message search",
    body: "Find any message, file, or link across your entire message history in under a second. Never lose an important decision buried in a thread again.",
  },
  {
    icon: Paperclip,
    title: "File & media sharing",
    body: "Share files, images, and documents directly in chat. Preview inline, download any time, and store securely in your workspace history.",
  },
  {
    icon: Bell,
    title: "Smart notifications",
    body: "Mentions, keywords, and priority channels surface what matters. Quiet hours and per-channel muting keep focus time protected.",
  },
  {
    icon: Lock,
    title: "Enterprise-grade security",
    body: "All messages encrypted at rest and in transit. Admin controls for data retention, export, and compliance archiving built in as standard.",
  },
]

const FAQS = [
  {
    q: "Is Team Chat included in my plan?",
    a: "Team Chat is available on Starter and above plans. Check the pricing page for the full breakdown of what's included per tier.",
  },
  {
    q: "Can I escalate a chat to a phone call?",
    a: "Yes. Any chat conversation — direct message or channel — can be escalated to a voice or video call in one click, with no app switching required.",
  },
  {
    q: "How long is message history kept?",
    a: "Message history is retained for 12 months on standard plans. Extended retention and compliance archiving are available on Business and Enterprise plans.",
  },
  {
    q: "Does Team Chat integrate with our CRM?",
    a: "Yes. Conversations and files can be linked to HubSpot and Zoho records. Call escalations log automatically on the relevant contact or deal.",
  },
  {
    q: "Is there a mobile app?",
    a: "Yes. Team Chat is available on iOS and Android via the Twiching mobile app, with full feature parity including calls, files, and notifications.",
  },
]

export default function TeamChatPage() {
  return (
    <PageLayout>
      <PageHero
        eyebrow="Features · Team Chat"
        h1="Messaging, calls, and files. One workspace."
        sub="Persistent channels and direct messages built into your phone system. Escalate to voice or video in one click — no context lost, no app switching."
        trustItems={["Persistent channels", "1-click call escalation", "Full search history", "E2E encrypted"]}
        primaryCta={{ label: "Start Free Trial", href: "/pricing" }}
        secondaryCta={{ label: "Talk to sales", href: "/contact" }}
        image={{ alt: "Twiching team chat interface showing channels, direct messages, and call escalation" }}
      />

      <StatBar stats={[
        { value: "< 1s",    label: "Message search",      note: "across full history" },
        { value: "1-click", label: "Call escalation",     note: "voice or video, any thread" },
        { value: "12mo",    label: "Message retention",   note: "standard, extendable" },
        { value: "E2E",     label: "Encrypted",           note: "at rest and in transit" },
      ]} />

     
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <SectionHeading eyebrow="What's included" h2="A complete messaging platform, built for teams that also call" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
          {FEATURES.map((f) => <ValueCard key={f.title} icon={f.icon} title={f.title} body={f.body} />)}
        </div>
      </section>

      <DarkBand>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-[11px] font-mono font-bold tracking-[2px] uppercase text-gray-500 mb-3">Built for compliance</p>
              <h2 className="text-3xl sm:text-4xl font-semibold text-white tracking-tight leading-tight mb-5">
                Retention, archiving, and audit logs — standard.
              </h2>
              <p className="text-base text-gray-400 leading-relaxed max-w-lg">
                Every message is encrypted, logged, and exportable. Compliance archiving, data retention controls, and admin audit logs come built in — not as an expensive add-on.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "AES-256",      note: "Encryption at rest" },
                { label: "TLS 1.3",      note: "Encryption in transit" },
                { label: "Audit log",    note: "Every action timestamped" },
                { label: "Export",       note: "Compliance-ready archive" },
              ].map(({ label, note }) => (
                <div key={label} className="p-5 rounded-xl border border-white/10 bg-white/5">
                  <p className="font-mono font-bold text-[16px] text-white mb-1">{label}</p>
                  <p className="font-mono text-[11px] text-gray-500">{note}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </DarkBand>

      <Faq items={FAQS} heading="Team Chat FAQ" />

      <RelatedCards
        heading="Related features"
        cards={[
          { title: "Video Meetings",         desc: "HD video meetings built into your phone system.",             href: "/features/video-meetings" },
          { title: "AI Supervisor Tools",    desc: "Live call monitoring, whisper coaching, and QA scoring.",     href: "/features/supervisor" },
          { title: "HubSpot Integration",    desc: "Sync conversations and calls to HubSpot records.",            href: "/integrations/hubspot" },
        ]}
      />

      <FinalCta />
    </PageLayout>
  )
}
