"use client"

import { PageLayout } from "@/components/page-layout"
import { PageHero, SectionHeading, ValueCard, RelatedCards, StatBar, FeatureSplit, DarkBand, InlineList } from "@/components/page-parts"
import { FinalCta } from "@/components/final-cta"
import { Faq } from "@/components/faq"
import { ShoppingBag, MessageSquare, Phone, BarChart2, Megaphone, Globe } from "lucide-react"

const VALUES = [
  { icon: ShoppingBag, title: "Store & Brand Numbers", body: "Provision local numbers for every store location. Customers call a familiar area code; calls route to the right store automatically." },
  { icon: MessageSquare, title: "Bulk SMS Campaigns", body: "Send promotions, flash sale alerts, and loyalty updates to thousands of customers instantly. Opt-in/opt-out managed automatically." },
  { icon: Phone, title: "Customer Support Lines", body: "Multi-level IVR handles order status, returns, and general enquiries — reducing hold times and agent workload." },
  { icon: Megaphone, title: "Omnichannel Outreach", body: "Reach customers across SMS, WhatsApp, Instagram, and Facebook Messenger from one unified inbox." },
  { icon: Globe, title: "Nationwide Virtual Numbers", body: "One national toll-free number plus local numbers per region. Build local trust while managing everything centrally." },
  { icon: BarChart2, title: "Campaign Analytics", body: "Track delivery rates, response rates, and conversion by campaign. Identify which messages drive the most foot traffic." },
]

const FAQS = [
  { q: "Can I send promotional SMS to my customer list?", a: "Yes. Bulk SMS on Professional and Enterprise plans supports large list sends with delivery reporting. Opt-out management is handled automatically to keep you compliant." },
  { q: "How do I manage numbers for multiple store locations?", a: "Provision individual local numbers for each location from the admin portal. Each number has its own call routing, IVR, and reporting." },
  { q: "Does Twiching support WhatsApp and Instagram messaging?", a: "Yes. Omnichannel messaging (WhatsApp, Instagram, Facebook Messenger) is included in Professional and Enterprise plans." },
  { q: "Can customers text my store's main number?", a: "Yes. All Twiching numbers are SMS-enabled by default. Inbound texts route to your team's unified inbox." },
]

export default function RetailPage() {
  return (
    <PageLayout>
      <PageHero
        eyebrow="Solutions · Retail"
        h1="Connect with customers wherever they shop"
        sub="Virtual numbers, SMS campaigns, and omnichannel support that help retail brands and e-commerce stores deliver seamless customer experiences — online and in-store."
        trustItems={["Bulk SMS", "Omnichannel", "Per-location numbers", "Campaign analytics"]}
        primaryCta={{ label: "Start Free Trial", href: "/pricing" }}
        secondaryCta={{ label: "Talk to sales", href: "/contact" }}
        image={{ alt: "Retail brand SMS campaign dashboard showing delivery rates and omnichannel inbox" }}
      />

      {/* Stats bar */}
      <StatBar stats={[
        { value: "98%", label: "SMS open rate", note: "vs. ~20% for email" },
        { value: "4 channels", label: "Omnichannel reach", note: "SMS, WhatsApp, IG, Messenger" },
        { value: "Per-store", label: "Local numbers", note: "one admin portal for all" },
        { value: "Real-time", label: "Campaign analytics", note: "delivery, response, conversion" },
      ]} />

{/* Value cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {VALUES.map((v) => <ValueCard key={v.title} icon={v.icon} title={v.title} body={v.body} />)}
        </div>
      </section>

      {/* Feature split 1 — Bulk SMS campaigns */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t border-gray-100">
        <FeatureSplit
          eyebrow="Bulk SMS campaigns"
          heading="Flash sale alerts that land before the sale ends."
          body="Twiching's bulk SMS sends thousands of personalized messages in one campaign. TCR compliance is handled automatically — your messages clear carrier filters and reach customers' phones, not spam folders."
          points={[
            "Campaign-scale sends — thousands of messages per send",
            "Personalization merge fields — name, loyalty tier, last purchase",
            "TCR brand and campaign registration included",
            "Real-time delivery analytics: delivered, opened, opted-out",
          ]}
          cta={{ label: "Start Free Trial", href: "/pricing" }}
          image={{ alt: "Bulk SMS campaign builder showing retail flash sale message with merge fields" }}
        />
      </section>

      {/* Feature split 2 — Omnichannel + per-location numbers (reversed) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t border-gray-100">
        <FeatureSplit
          eyebrow="Omnichannel & local presence"
          heading="One inbox. Every channel. Every store location."
          body="Customers reach out on WhatsApp, Instagram, SMS, and Messenger — and your team responds from one unified inbox. Local numbers per store give customers a familiar area code to call, while you manage every location from a single admin portal."
          points={[
            "Unified inbox for SMS, WhatsApp, Instagram, Facebook Messenger",
            "Local numbers for every store location — managed centrally",
            "Inbound texts and messages routed to the right store team",
            "Campaign analytics per channel and per location",
          ]}
          image={{ alt: "Omnichannel inbox showing retail customer messages across SMS, WhatsApp, and Instagram" }}
          reverse
        />
      </section>

      {/* Use cases */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t border-gray-100">
        <SectionHeading eyebrow="Use cases" h2="How retail teams use Twiching" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-2">
          {[
            { title: "Flash sale alerts", body: "Send time-sensitive promotions to opted-in customers. SMS open rates average 98% within 3 minutes." },
            { title: "Order status updates", body: "Trigger automated SMS when orders ship, arrive, or require action. Reduce customer service call volume." },
            { title: "In-store pickup notifications", body: "Let customers know their click-and-collect order is ready — automatically, the moment staff mark it prepared." },
            { title: "Loyalty program outreach", body: "Remind loyalty members of points balances, exclusive offers, and expiring rewards via SMS." },
            { title: "Customer support IVR", body: "Route calls to returns, order enquiries, or store directions. Agents handle only escalated issues." },
            { title: "Post-purchase review requests", body: "Send SMS asking for a review 48 hours after delivery. Drive verified reviews with a two-tap link." },
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
        <SectionHeading eyebrow="Full capabilities" h2="Everything retail teams need to reach customers" />
        <InlineList
          items={[
            "Bulk SMS — campaign-scale sends with TCR compliance included",
            "Personalization merge fields per recipient",
            "Real-time delivery analytics per campaign",
            "Omnichannel inbox: SMS, WhatsApp, Instagram, Facebook Messenger",
            "Local numbers for every store location",
            "Centralized multi-location management portal",
            "Automated order status and pickup notification SMS",
            "Loyalty program outreach and reward reminders",
            "IVR for order enquiries, returns, and store routing",
          ]}
          image={{ alt: "Retail communications capabilities overview in Twiching" }}
        />
      </section>

      {/* Dark band */}
      <DarkBand>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-[11px] font-mono font-bold tracking-[2px] uppercase text-gray-500 mb-3">Built for retail and e-commerce</p>
            <h2 className="text-3xl sm:text-4xl font-semibold text-white tracking-tight text-balance leading-tight mb-5">
              98% open rate.<br />Every channel. One inbox.
            </h2>
            <p className="text-base text-gray-400 leading-relaxed max-w-lg">
              Retail customers shop across SMS, WhatsApp, Instagram, and in-store. Twiching puts every channel in one inbox, gives every store a local number, and lets you send campaign-scale SMS in minutes — with compliance handled automatically.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: "98%", note: "Average SMS open rate" },
              { label: "4 channels", note: "SMS, WhatsApp, IG, Messenger" },
              { label: "Per-store", note: "Local number management" },
              { label: "TCR", note: "Compliance auto-handled" },
            ].map(({ label, note }) => (
              <div key={label} className="p-5 rounded-xl border border-white/10 bg-white/5">
                <p className="font-mono font-bold text-[18px] text-white mb-1">{label}</p>
                <p className="font-mono text-[11px] text-gray-500">{note}</p>
              </div>
            ))}
          </div>
        </div>
      </DarkBand>

      <Faq items={FAQS} heading="Retail communications FAQ" />

      <RelatedCards
        heading="Explore more solutions"
        cards={[
          { title: "Bulk SMS", desc: "Campaign-grade outreach at scale for any audience.", href: "/messaging/bulk-sms" },
          { title: "Logistics", desc: "Delivery updates and driver communications.", href: "/solutions/logistics" },
          { title: "SMS Gateway", desc: "Multi-channel SMS delivery from one dashboard.", href: "/messaging/sms-gateway" },
        ]}
      />

      <FinalCta />
    </PageLayout>
  )
}
