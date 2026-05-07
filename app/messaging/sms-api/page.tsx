import { Metadata } from "next"
import { PageLayout } from "@/components/page-layout"
import { PageHero, SectionHeading, ValueCard, RelatedCards, StatBar, FeatureSplit, DarkBand, InlineList } from "@/components/page-parts"
import { FinalCta } from "@/components/final-cta"
import { Faq } from "@/components/faq"
import { Check, Code2, Webhook, MessageSquare, ShieldCheck, Zap, RefreshCw } from "lucide-react"

export const metadata: Metadata = {
  title: "SMS API · Developer-Friendly REST API | Twiching",
  description: "Send and receive SMS programmatically. REST API, two-way messaging, webhooks. Integrate in under a day.",
}

const VALUES = [
  { icon: Code2, title: "REST API", body: "Standard HTTP REST endpoints — works with any language or framework. No SDK required to get started." },
  { icon: Webhook, title: "Inbound Webhooks", body: "Receive inbound SMS to any URL. Build two-way conversations, chatbots, and reply flows without polling." },
  { icon: MessageSquare, title: "Two-Way Messaging", body: "Send outbound and receive inbound on the same number. Handle replies, route responses, and build conversational flows." },
  { icon: ShieldCheck, title: "10DLC Compliance", body: "Carrier registration handled automatically. Your messages clear carrier filters — no manual 10DLC navigation required." },
  { icon: Zap, title: "Delivery Receipts", body: "Status callbacks on every message: delivered, failed, queued. Know whether each message reached its recipient." },
  { icon: RefreshCw, title: "Test Mode", body: "Send test messages without touching real carrier routes. Validate your integration before going live." },
]

const USE_CASES = [
  { label: "OTP / 2FA", desc: "One-time passcodes and two-factor authentication flows" },
  { label: "Transactional alerts", desc: "Order confirmations, shipping updates, payment receipts" },
  { label: "Appointment reminders", desc: "Healthcare, service businesses, scheduling apps" },
  { label: "In-app notifications", desc: "SaaS products embedding SMS alongside push and email" },
  { label: "Chatbots", desc: "Two-way conversational SMS flows" },
]

const FAQS = [
  { q: "What languages are the SDKs available in?", a: "The REST API works with any language. Contact us for SDK availability in specific languages." },
  { q: "Is there a sandbox for testing?", a: "Yes. Test mode is available without sending real messages — validate your integration before going live." },
  { q: "What's the rate limit?", a: "Depends on plan and carrier throughput. Contact us for high-volume requirements." },
  { q: "How does inbound SMS work?", a: "Twiching posts inbound messages to a webhook URL you configure. No polling required — receive replies in real time." },
  { q: "Is 10DLC compliance handled automatically?", a: "Yes. Twiching handles carrier registration so your messages clear filters. You provide the message content; we handle compliance." },
  { q: "Can I send to international numbers?", a: "Yes. International SMS is supported with coverage across multiple regions. Contact us for destination-specific rates." },
]

export default function SmsApiPage() {
  return (
    <PageLayout>

      {/* Hero */}
      <PageHero
        eyebrow="Messaging · SMS API"
        h1="SMS API. Integrate in under a day."
        sub="Developer-friendly REST API for sending and receiving SMS at any scale. Two-way messaging, webhooks, delivery receipts, and 10DLC compliance — all in one API."
        trustItems={["REST API", "Two-way messaging", "Webhooks", "TCR-registered"]}
        primaryCta={{ label: "Start free trial", href: "/pricing" }}
        secondaryCta={{ label: "See Bulk SMS", href: "/messaging/bulk-sms" }}
        image={{ alt: "SMS API code editor showing REST request and delivery receipt webhook" }}
      />

      {/* Stats bar */}
      <StatBar stats={[
        { value: "REST", label: "API standard", note: "any language or framework" },
        { value: "<1 day", label: "Integration time", note: "first message in hours" },
        { value: "2-Way", label: "Messaging", note: "send and receive on one number" },
        { value: "Auto", label: "10DLC compliance", note: "carrier registration handled" },
      ]} />

{/* Value cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {VALUES.map((v) => <ValueCard key={v.title} icon={v.icon} title={v.title} body={v.body} />)}
        </div>
      </section>

      {/* Use cases + code block — preserved from original */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t border-gray-100">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <SectionHeading eyebrow="API features" h2="What you can build" />
            <div className="space-y-3 mt-2">
              {USE_CASES.map(({ label, desc }) => (
                <div key={label} className="p-5 rounded-xl border border-gray-100 bg-white hover:shadow-md hover:border-[#95d9e8]/50 transition-all">
                  <p className="font-mono font-bold text-[13px] text-gray-900 mb-1">{label}</p>
                  <p className="font-mono text-[12px] text-gray-500">{desc}</p>
                </div>
              ))}
            </div>
          </div>
          <div>
            <SectionHeading eyebrow="Technical" h2="API overview" />
            <div className="bg-[#0d1117] rounded-2xl p-6 font-mono text-[13px] mb-6">
              <p className="text-[#8b949e] mb-2">{"// Send an SMS"}</p>
              <p className="text-[#79c0ff]">POST <span className="text-[#a5d6ff]">/v1/messages</span></p>
              <div className="mt-4 space-y-1 text-[#e6edf3]">
                <p>{"{"}</p>
                <p className="pl-4"><span className="text-[#79c0ff]">&quot;to&quot;</span>{": \"+12025551234\","}</p>
                <p className="pl-4"><span className="text-[#79c0ff]">&quot;from&quot;</span>{": \"+18005551000\","}</p>
                <p className="pl-4"><span className="text-[#79c0ff]">&quot;body&quot;</span>{": \"Your code is 482901\""}</p>
                <p>{"}"}</p>
              </div>
            </div>
            <ul className="space-y-3">
              {[
                "HTTP REST — works with any language or framework",
                "Inbound webhooks for two-way conversations",
                "Delivery receipts and status callbacks",
                "10DLC compliance handled — no manual registration",
              ].map((f) => (
                <li key={f} className="flex items-start gap-3 font-mono text-[13px] text-gray-700">
                  <Check className="h-3.5 w-3.5 text-accent mt-0.5 flex-shrink-0" strokeWidth={2.5} />
                  {f}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Feature split 1 — Two-way messaging + webhooks */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t border-gray-100">
        <FeatureSplit
          eyebrow="Two-way messaging"
          heading="Send outbound. Receive inbound. On the same number."
          body="Twiching posts inbound SMS replies to a webhook URL you define — no polling, no long-running connections. Build reply flows, chatbots, confirmation prompts, and survey responses in your own application logic."
          points={[
            "Inbound messages delivered via webhook — real-time, no polling",
            "Send and receive on the same phone number",
            "Route replies to different URLs by keyword or sender",
            "Build conversational flows, OTP confirmations, or survey bots",
          ]}
          cta={{ label: "Start free trial", href: "/pricing" }}
          image={{ alt: "Two-way SMS API flow diagram showing outbound send and inbound webhook receipt" }}
        />
      </section>

      {/* Feature split 2 — Delivery receipts + compliance (reversed) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t border-gray-100">
        <FeatureSplit
          eyebrow="Delivery & compliance"
          heading="Know what delivered. Stay compliant without the overhead."
          body="Every message sends back a delivery receipt — delivered, failed, or queued — so your application logic can react to status. 10DLC carrier registration is handled automatically; you write the message, Twiching clears the filters."
          points={[
            "Delivery status callbacks on every message",
            "10DLC brand and campaign registration — automatic",
            "STOP/HELP opt-out compliance built into the API",
            "Test mode — validate integration without real carrier sends",
          ]}
          image={{ alt: "SMS delivery receipt dashboard showing per-message status and 10DLC compliance indicators" }}
          reverse
        />
      </section>

      {/* Inline checklist — full capabilities */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t border-gray-100">
        <SectionHeading eyebrow="Full capabilities" h2="Everything in the Twiching SMS API" />
        <InlineList
          items={[
            "REST API — standard HTTP, any language or framework",
            "Send outbound SMS to any phone number",
            "Receive inbound SMS via webhook — no polling",
            "Two-way messaging on a single number",
            "Delivery receipts and status callbacks per message",
            "10DLC brand and campaign registration — handled automatically",
            "STOP / HELP opt-out compliance built in",
            "Test mode for integration validation without live sends",
            "International SMS across multiple regions",
            "High-throughput volume — contact us for rate limits",
          ]}
          image={{ alt: "SMS API full capabilities overview in Twiching developer dashboard" }}
        />
      </section>

      {/* Dark band */}
      <DarkBand>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-[11px] font-mono font-bold tracking-[2px] uppercase text-gray-500 mb-3">Built for developers</p>
            <h2 className="text-3xl sm:text-4xl font-semibold text-white tracking-tight text-balance leading-tight mb-5">
              One API call.<br />SMS in your product.
            </h2>
            <p className="text-base text-gray-400 leading-relaxed max-w-lg">
              The Twiching SMS API is designed to be integrated in hours, not weeks. Standard REST, webhooks for replies, delivery receipts for status — and no carrier agreements or 10DLC paperwork to file before you can send your first message.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: "REST", note: "Standard HTTP API" },
              { label: "Webhooks", note: "Real-time inbound delivery" },
              { label: "Receipts", note: "Per-message status callbacks" },
              { label: "10DLC", note: "Compliance auto-handled" },
            ].map(({ label, note }) => (
              <div key={label} className="p-5 rounded-xl border border-white/10 bg-white/5">
                <p className="font-mono font-bold text-[18px] text-white mb-1">{label}</p>
                <p className="font-mono text-[11px] text-gray-500">{note}</p>
              </div>
            ))}
          </div>
        </div>
      </DarkBand>

      <Faq items={FAQS} heading="SMS API FAQ" />

      <RelatedCards
        heading="Related products"
        cards={[
          { title: "Bulk SMS", desc: "Send campaign-scale SMS without writing code.", href: "/messaging/bulk-sms" },
          { title: "SMS Gateway", desc: "High-throughput gateway for platforms and resellers.", href: "/messaging/sms-gateway" },
          { title: "Conversation Intelligence", desc: "Analyze SMS conversations alongside call transcripts.", href: "/features/conv-intelligence" },
        ]}
      />

      <FinalCta />
    </PageLayout>
  )
}