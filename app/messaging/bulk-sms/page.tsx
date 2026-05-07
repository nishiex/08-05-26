import { Metadata } from "next"
import { PageLayout } from "@/components/page-layout"
import { PageHero, SectionHeading, ValueCard, RelatedCards, StatBar, FeatureSplit, DarkBand, InlineList } from "@/components/page-parts"
import { FinalCta } from "@/components/final-cta"
import { Faq } from "@/components/faq"
import { Send, ShieldCheck, BarChart2, Sliders, RefreshCw, MessageSquare } from "lucide-react"

export const metadata: Metadata = {
  title: "Bulk SMS · Campaign-Grade Outreach at Scale | Twiching",
  description: "Send thousands of SMS messages in one send. TCR-registered campaigns. 98% open rate. 14-day free trial.",
}

const VALUES = [
  { icon: Send, title: "Campaign-Scale Sends", body: "Upload a contact list and send thousands of personalized messages in a single campaign. No per-batch limits slowing you down." },
  { icon: ShieldCheck, title: "TCR Compliance Built In", body: "Brand and campaign registration handled for you. STOP/HELP opt-out is automatic — no compliance team required." },
  { icon: BarChart2, title: "Delivery Analytics", body: "Track delivered, failed, and opt-out counts per campaign in real time. Know what landed before the campaign even finishes." },
  { icon: Sliders, title: "Personalization Fields", body: "Merge first name, account number, appointment time, or any custom field into each message — at scale, without manual editing." },
  { icon: RefreshCw, title: "Scheduled Campaigns", body: "Set send time in advance. Schedule campaigns for optimal windows — morning alerts, lunchtime promos, pre-event reminders." },
  { icon: MessageSquare, title: "Two-Way Reply Support", body: "Recipients can reply. Route inbound SMS responses to a queue, a CRM record, or a team inbox — automatically." },
]

const FAQS = [
  { q: "Is there a sending limit?", a: "Depends on your plan and carrier throughput. Contact us for high-volume campaign requirements." },
  { q: "Do I need to handle compliance myself?", a: "No. TCR campaign registration handled. You provide the message content and recipient list." },
  { q: "Can recipients opt out?", a: "Yes. STOP handling is automatic and compliant. Opted-out numbers are removed from future sends automatically." },
  { q: "Can I personalize messages per recipient?", a: "Yes. Merge any contact field — first name, appointment date, account number — into each message using template variables." },
  { q: "Can I schedule campaigns in advance?", a: "Yes. Set a future send time per campaign. Twiching delivers at the scheduled window." },
  { q: "What happens to replies?", a: "Inbound replies are captured and can be routed to a team inbox, CRM record, or webhook — depending on your setup." },
]

export default function BulkSmsPage() {
  return (
    <PageLayout>

      {/* Hero */}
      <PageHero
        eyebrow="Messaging · Bulk SMS"
        h1="Reach thousands. In one send."
        sub="Campaign-grade bulk SMS with compliance built in. TCR-registered, opt-out handled, delivery tracked — from a solo practice to a 500-seat operation."
        trustItems={["Campaign scale", "TCR-registered", "98% open rate", "Opt-out handling"]}
        primaryCta={{ label: "Start free trial", href: "/pricing" }}
        secondaryCta={{ label: "See SMS Gateway", href: "/messaging/sms-gateway" }}
        image={{ alt: "Bulk SMS campaign dashboard showing send progress and delivery analytics" }}
      />

      {/* Stats bar */}
      <StatBar stats={[
        { value: "98%", label: "Average open rate", note: "vs. ~20% for email" },
        { value: "90s", label: "Median read time", note: "most SMS read within 90 seconds" },
        { value: "TCR", label: "Compliance handled", note: "brand + campaign registration" },
        { value: "All plans", label: "Available", note: "volume scales with plan" },
      ]} />

{/* Value cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {VALUES.map((v) => <ValueCard key={v.title} icon={v.icon} title={v.title} body={v.body} />)}
        </div>
      </section>

      {/* Use cases grid — preserved from original */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t border-gray-100">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <SectionHeading eyebrow="Use cases" h2="What businesses use bulk SMS for" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
              {[
                { label: "Promotions + flash sales", desc: "Time-sensitive offers that need to land now" },
                { label: "Appointment reminders", desc: "Reduce no-shows before they cost you" },
                { label: "Event alerts", desc: "Webinar starts in 15 minutes" },
                { label: "Renewal nudges", desc: "Subscription or contract renewal coming up" },
                { label: "Product launches", desc: "New feature, new item, new location" },
                { label: "Surveys + feedback", desc: "Short-form responses via SMS reply" },
              ].map(({ label, desc }) => (
                <div key={label} className="p-5 rounded-xl border border-gray-100 bg-white hover:shadow-md hover:border-[#95d9e8]/50 transition-all">
                  <p className="font-mono font-bold text-[13px] text-gray-900 mb-1">{label}</p>
                  <p className="font-mono text-[12px] text-gray-500">{desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-5">
            <div className="bg-accent text-white rounded-2xl p-6">
              <p className="font-mono text-[11px] font-bold tracking-[2px] uppercase text-white/60 mb-3">Open rate</p>
              <p className="font-serif text-[48px] font-bold leading-none">98%</p>
              <p className="font-mono text-[12px] mt-2 text-white/70">vs. 20% for email</p>
            </div>
            <div className="bg-gray-50 rounded-2xl p-6">
              <p className="font-mono font-bold text-[11px] tracking-[2px] uppercase text-gray-500 mb-3">Compliance handled</p>
              <ul className="space-y-2 font-mono text-[12px] text-gray-600">
                <li>TCR brand registration</li>
                <li>Campaign registration</li>
                <li>Automatic STOP/HELP handling</li>
                <li>DNC list management</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Feature split 1 — Campaign builder + personalization */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t border-gray-100">
        <FeatureSplit
          eyebrow="Campaign builder"
          heading="Upload a list. Personalize each message. Send in one click."
          body="Twiching's bulk SMS campaign builder takes a contact list, a message template, and a send time — and handles everything else. Merge fields pull first name, appointment time, or any custom field into each individual message automatically."
          points={[
            "CSV or CRM contact list import",
            "Template variables for first name, date, account number, or any custom field",
            "Preview how each personalized message renders before sending",
            "Schedule campaigns for optimal send windows — morning, lunchtime, pre-event",
          ]}
          cta={{ label: "Start free trial", href: "/pricing" }}
          image={{ alt: "Bulk SMS campaign builder showing message template with merge fields" }}
        />
      </section>

      {/* Feature split 2 — Compliance + delivery analytics (reversed) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t border-gray-100">
        <FeatureSplit
          eyebrow="Compliance & analytics"
          heading="TCR registered. Delivery tracked. Opt-outs automatic."
          body="Bulk SMS without TCR registration gets filtered before it reaches the handset. Twiching handles brand and campaign registration so your messages clear carrier filters — and tracks every delivered, failed, and opted-out number in real time."
          points={[
            "TCR brand and campaign registration handled for you",
            "Automatic STOP and HELP opt-out — compliant by default",
            "DNC list management — opted-out numbers excluded from future sends",
            "Real-time delivery dashboard: delivered, failed, pending, opt-outs",
          ]}
          image={{ alt: "Campaign delivery analytics showing real-time send progress and opt-out tracking" }}
          reverse
        />
      </section>

      {/* Inline checklist — full capabilities */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t border-gray-100">
        <SectionHeading eyebrow="What's included" h2="Everything in Twiching Bulk SMS" />
        <InlineList
          items={[
            "Campaign-scale sends — thousands of messages per campaign",
            "CSV and CRM contact list import",
            "Personalization merge fields — name, date, any custom attribute",
            "Message preview before send",
            "Scheduled send — set future delivery windows",
            "TCR brand and campaign registration included",
            "Automatic STOP / HELP opt-out compliance",
            "DNC list management and exclusion",
            "Real-time delivery analytics per campaign",
            "Two-way reply routing to inbox, CRM, or webhook",
          ]}
          image={{ alt: "Bulk SMS campaign capabilities in Twiching" }}
        />
      </section>

      {/* Dark band */}
      <DarkBand>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-[11px] font-mono font-bold tracking-[2px] uppercase text-gray-500 mb-3">Why SMS outperforms email for time-sensitive sends</p>
            <h2 className="text-3xl sm:text-4xl font-semibold text-white tracking-tight text-balance leading-tight mb-5">
              98% open rate.<br />90 seconds to read.
            </h2>
            <p className="text-base text-gray-400 leading-relaxed max-w-lg">
              Email gets opened when someone has time. SMS gets opened when it arrives. For promotions, reminders, and alerts where timing is the whole point, bulk SMS is the only channel that reliably lands in the moment.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: "98%", note: "Average SMS open rate" },
              { label: "90s", note: "Median time to read" },
              { label: "TCR", note: "Carrier-compliant delivery" },
              { label: "2-Way", note: "Reply routing included" },
            ].map(({ label, note }) => (
              <div key={label} className="p-5 rounded-xl border border-white/10 bg-white/5">
                <p className="font-mono font-bold text-[20px] text-white mb-1">{label}</p>
                <p className="font-mono text-[11px] text-gray-500">{note}</p>
              </div>
            ))}
          </div>
        </div>
      </DarkBand>

      <Faq items={FAQS} heading="Bulk SMS FAQ" />

      <RelatedCards
        heading="Related products"
        cards={[
          { title: "SMS Gateway", desc: "Programmatic SMS sending via API for developers and platforms.", href: "/messaging/sms-gateway" },
          { title: "SMS API", desc: "Direct API access for building SMS into your own product.", href: "/messaging/sms-api" },
          { title: "Local Presence Dialing", desc: "Pair your SMS campaigns with local-number outbound calling.", href: "/solutions/sales" },
        ]}
      />

      <FinalCta />
    </PageLayout>
  )
}