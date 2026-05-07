"use client"

import { PageLayout } from "@/components/page-layout"
import { PageHero, SectionHeading, ValueCard, RelatedCards, StatBar, FeatureSplit, DarkBand, InlineList } from "@/components/page-parts"
import { FinalCta } from "@/components/final-cta"
import { Faq } from "@/components/faq"
import { Package, MessageSquare, Phone, MapPin, Clock, Users } from "lucide-react"

const VALUES = [
  { icon: Package, title: "Driver Dispatch Lines", body: "Dedicated numbers for dispatch operations. Drivers call a single line; intelligent routing connects them to the available dispatcher instantly." },
  { icon: MessageSquare, title: "Delivery SMS Updates", body: "Automatically notify recipients when a package is out for delivery, at the door, or delayed. Reduce missed delivery attempts by 60%." },
  { icon: Phone, title: "Customer Tracking Lines", body: "Give customers a local number to call for shipment status. IVR handles enquiries automatically, freeing your team for exceptions." },
  { icon: MapPin, title: "Regional Number Presence", body: "Provision local numbers in every delivery region. Drivers and customers see a local caller ID, increasing answer rates." },
  { icon: Clock, title: "24/7 Operations Support", body: "After-hours call routing keeps night shifts covered. Urgent escalations route to on-call managers automatically." },
  { icon: Users, title: "Fleet-Wide Messaging", body: "Send broadcast SMS to your entire driver fleet or specific routes instantly. Schedule shifts, alerts, and route changes." },
]

const FAQS = [
  { q: "Can drivers receive calls without revealing their personal numbers?", a: "Yes. All outbound calls from Twiching show your company number. Drivers can call customers or dispatch without exposing their personal mobile." },
  { q: "How do delivery SMS notifications work?", a: "You trigger SMS via the Twiching API or dashboard when a delivery status changes. Messages are sent from your branded number and can include tracking links." },
  { q: "Can I manage numbers for multiple depot locations?", a: "Yes. Provision local numbers for each depot or region. Each number has independent routing, IVR, and analytics." },
  { q: "Does Twiching support API-driven SMS for delivery systems?", a: "Yes. The SMS API allows your warehouse management or route optimization system to trigger delivery notifications programmatically." },
]

export default function LogisticsPage() {
  return (
    <PageLayout>
      <PageHero
        eyebrow="Solutions · Logistics"
        h1="Keep drivers, dispatchers, and customers connected"
        sub="Dedicated dispatch lines, automated delivery SMS, and fleet-wide messaging that reduce missed deliveries and keep your operations running without friction."
        trustItems={["Driver dispatch lines", "Delivery SMS", "API integration", "24/7 routing"]}
        primaryCta={{ label: "Start Free Trial", href: "/pricing" }}
        secondaryCta={{ label: "Talk to sales", href: "/contact" }}
        image={{ alt: "Logistics operations dashboard showing driver dispatch lines and delivery SMS status" }}
      />

      {/* Stats bar */}
      <StatBar stats={[
        { value: "−60%", label: "Missed delivery attempts", note: "with automated SMS updates" },
        { value: "24/7", label: "Operations coverage", note: "night shift routing included" },
        { value: "API", label: "Integration", note: "trigger SMS from any WMS or TMS" },
        { value: "Fleet-wide", label: "Broadcast SMS", note: "reach every driver instantly" },
      ]} />

{/* Value cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {VALUES.map((v) => <ValueCard key={v.title} icon={v.icon} title={v.title} body={v.body} />)}
        </div>
      </section>

      {/* Feature split 1 — Delivery SMS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t border-gray-100">
        <FeatureSplit
          eyebrow="Delivery SMS notifications"
          heading="Customers know when it's coming. Drivers make fewer second trips."
          body="Trigger automated SMS notifications at every delivery milestone — out for delivery, 30 minutes away, delivered, or failed attempt. Recipients can reply with delivery instructions or reschedule without calling your support line."
          points={[
            "API-triggered SMS from any WMS, TMS, or route optimization system",
            "Customizable message templates per delivery status",
            "Two-way replies for delivery instructions or rescheduling",
            "Branded sender number — customers recognize your company name",
          ]}
          cta={{ label: "Start Free Trial", href: "/pricing" }}
          image={{ alt: "Delivery SMS notification flow showing out-for-delivery alert and customer reply" }}
        />
      </section>

      {/* Feature split 2 — Dispatch communications (reversed) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t border-gray-100">
        <FeatureSplit
          eyebrow="Dispatch & fleet communications"
          heading="Dispatchers reach any driver instantly. Fleet gets updates in one SMS."
          body="Dedicated dispatch numbers route to the right driver or team in seconds. Need to change a route, announce a shift, or alert the whole fleet? Broadcast SMS reaches every driver simultaneously — without a group chat or personal phone numbers."
          points={[
            "Dedicated dispatch lines with intelligent driver routing",
            "Fleet-wide broadcast SMS for shift changes and alerts",
            "Drivers call out using company number — personal mobile never exposed",
            "Regional local numbers for each depot — higher driver answer rates",
          ]}
          image={{ alt: "Fleet dispatch dashboard showing broadcast SMS and driver routing controls" }}
          reverse
        />
      </section>

      {/* Use cases */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t border-gray-100">
        <SectionHeading eyebrow="Use cases" h2="How logistics teams use Twiching" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-2">
          {[
            { title: "Last-mile delivery alerts", body: "Trigger SMS when a driver is 30 minutes away. Customers prepare; missed attempts drop significantly." },
            { title: "Dispatch-to-driver calls", body: "Dispatchers reach any driver via a single click. Calls connect instantly without manual dialing." },
            { title: "Failed delivery rescheduling", body: "Automatically SMS customers after a failed attempt with a reschedule link. Reduces repeat delivery costs." },
            { title: "Customs and delay notifications", body: "Proactively notify importers of customs holds or carrier delays via SMS before they call you." },
            { title: "Warehouse shift alerts", body: "Broadcast shift change, overtime, or emergency alerts to all warehouse staff instantly." },
            { title: "Customer service IVR", body: "Route inbound tracking enquiries to automated status updates, keeping agents free for complex issues." },
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
        <SectionHeading eyebrow="Full capabilities" h2="Everything logistics teams need to stay connected" />
        <InlineList
          items={[
            "API-triggered delivery SMS at every shipment milestone",
            "Two-way SMS replies for customer instructions and rescheduling",
            "Dedicated dispatch lines with intelligent driver routing",
            "Fleet-wide broadcast SMS for shift and route changes",
            "Regional local numbers per depot — higher answer rates",
            "Driver-to-customer calls masked behind company number",
            "24/7 after-hours routing to on-call operations managers",
            "Customer self-service IVR for shipment status enquiries",
            "Per-depot number management from one admin portal",
          ]}
          image={{ alt: "Logistics communications capabilities overview in Twiching" }}
        />
      </section>

      {/* Dark band */}
      <DarkBand>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-[11px] font-mono font-bold tracking-[2px] uppercase text-gray-500 mb-3">Built for last-mile operations</p>
            <h2 className="text-3xl sm:text-4xl font-semibold text-white tracking-tight text-balance leading-tight mb-5">
              Fewer missed deliveries.<br />Faster dispatch. Happier customers.
            </h2>
            <p className="text-base text-gray-400 leading-relaxed max-w-lg">
              Logistics operations run on communication. Twiching gives dispatch teams instant reach to every driver, gives customers proactive delivery updates, and gives operations managers 24/7 visibility — all from one platform.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: "−60%", note: "Missed delivery attempts" },
              { label: "API", note: "WMS / TMS integration" },
              { label: "Broadcast", note: "Fleet-wide SMS alerts" },
              { label: "24/7", note: "Operations routing" },
            ].map(({ label, note }) => (
              <div key={label} className="p-5 rounded-xl border border-white/10 bg-white/5">
                <p className="font-mono font-bold text-[20px] text-white mb-1">{label}</p>
                <p className="font-mono text-[11px] text-gray-500">{note}</p>
              </div>
            ))}
          </div>
        </div>
      </DarkBand>

      <Faq items={FAQS} heading="Logistics communications FAQ" />

      <RelatedCards
        heading="Explore more solutions"
        cards={[
          { title: "Retail", desc: "Order updates and customer outreach for retail brands.", href: "/solutions/retail" },
          { title: "SMS API", desc: "Trigger delivery notifications programmatically.", href: "/messaging/sms-api" },
          { title: "Intelligent Routing", desc: "Connect drivers and dispatchers to the right person instantly.", href: "/features/routing" },
        ]}
      />

      <FinalCta />
    </PageLayout>
  )
}
