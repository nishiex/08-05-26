"use client"

import Image from "next/image"
import { PageLayout } from "@/components/page-layout"
import { PageHero, SectionHeading, ValueCard, RelatedCards, StatBar, FeatureSplit, DarkBand, InlineList } from "@/components/page-parts"
import { FinalCta } from "@/components/final-cta"
import { Faq } from "@/components/faq"
import { Home, Phone, MessageSquare, MapPin, UserCheck, PhoneCall } from "lucide-react"

const VALUES = [
  { icon: Home, title: "Agent Virtual Numbers", body: "Every agent gets a dedicated local number for listings, marketing materials, and client calls — without using their personal mobile." },
  { icon: Phone, title: "Listing Hotlines", body: "Assign a unique number to each property listing. Callers get property details via IVR; leads route to the listing agent automatically." },
  { icon: MessageSquare, title: "Lead Capture via SMS", body: "Display your number on yard signs, portals, and ads. Inbound texts capture lead info and trigger instant follow-up." },
  { icon: MapPin, title: "Local Presence in Every Market", body: "Operate in multiple cities? Provision local area code numbers for each market. Prospects answer local calls far more often." },
  { icon: UserCheck, title: "Round-Robin Lead Distribution", body: "Incoming leads route to agents in rotation. Ensure every agent gets a fair share of inbound enquiries automatically." },
  { icon: PhoneCall, title: "Open House Call Tracking", body: "Use a unique number for each open house or campaign. Track which marketing channel drives the most calls." },
]

const FAQS = [
  { q: "Can each agent have their own number?", a: "Yes. You can provision a dedicated local or toll-free number for every agent on your team. Numbers are billed per seat and manageable from a central admin portal." },
  { q: "How do listing hotlines work?", a: "Assign a unique number to a listing. Callers hear property details, price, and showing availability via IVR, then press 1 to connect to the agent or leave a voicemail." },
  { q: "Can I track which marketing channel generated a call?", a: "Yes. Use a unique number for each channel (yard sign, Zillow, Google Ads) and view call analytics per number to see which drives the most leads." },
  { q: "What happens when an agent leaves the brokerage?", a: "The number stays with the brokerage. You can reassign it to another agent or redirect it to a team line instantly from the admin portal." },
]

export default function RealEstatePage() {
  return (
    <PageLayout>
      <PageHero
        eyebrow="Solutions · Real Estate"
        h1="Virtual numbers built for agents and brokerages"
        sub="Give every agent a professional number, track leads by marketing channel, and never miss a showing enquiry — all managed from one brokerage-level portal."
        trustItems={["Per-agent numbers", "Listing hotlines", "Lead tracking", "Round-robin routing"]}
        primaryCta={{ label: "Start Free Trial", href: "/pricing" }}
        secondaryCta={{ label: "Talk to sales", href: "/contact" }}
        image={{ src: "/images/real-estate-hero.jpg", alt: "Real estate agent using Twiching on a smartphone outside a property" }}
      />

      {/* Stats bar */}
      <StatBar stats={[
        { value: "3×", label: "Higher answer rate", note: "with local area code numbers" },
        { value: "Per-agent", label: "Dedicated numbers", note: "no personal mobile required" },
        { value: "1 portal", label: "Brokerage management", note: "all agents, all numbers" },
        { value: "Instant", label: "Number reassignment", note: "when agents leave or join" },
      ]} />

{/* Value cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {VALUES.map((v) => <ValueCard key={v.title} icon={v.icon} title={v.title} body={v.body} />)}
        </div>
      </section>

      {/* Feature split 1 — Listing hotlines + lead tracking */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t border-gray-100">
        <FeatureSplit
          eyebrow="Listing hotlines"
          heading="Every listing gets its own number. Every call tracked."
          body="Assign a unique phone number to each property. Callers hear price, square footage, and showing availability via IVR — then connect to the agent or leave a voicemail. Call analytics tell you exactly which listing and which channel drives the most enquiries."
          points={[
            "Unique number per listing — yard sign, portal, ad, or mailer",
            "IVR plays property details, price, and availability automatically",
            "Press 1 to connect to agent, press 2 to leave voicemail",
            "Call analytics per number — see which channel converts best",
          ]}
          cta={{ label: "Start Free Trial", href: "/pricing" }}
          image={{ alt: "Listing hotline call flow showing IVR property details and agent connection" }}
        />
      </section>

      {/* Feature split 2 — Round-robin + brokerage management (reversed) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t border-gray-100">
        <FeatureSplit
          eyebrow="Brokerage management"
          heading="One portal. Every agent. Every number."
          body="Provision, manage, and reassign agent numbers from one brokerage-level dashboard. When an agent joins, assign a number in seconds. When they leave, the number stays with the brokerage and routes to whoever takes their desk."
          points={[
            "Provision local or toll-free numbers for each agent instantly",
            "Round-robin routing distributes inbound leads fairly",
            "Numbers stay with the brokerage — never with the agent",
            "Broker-level call monitoring and performance dashboards",
          ]}
          image={{ alt: "Brokerage admin portal showing agent number management and round-robin routing" }}
          reverse
        />
      </section>

      {/* Use cases + sticky team photo — preserved from original */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t border-gray-100">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div>
            <SectionHeading eyebrow="Use cases" h2="How real estate teams use Twiching" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
              {[
                { title: "Yard sign call capture", body: "Unique numbers on every yard sign. Know exactly which listing generated a call, and route to the right agent instantly." },
                { title: "Showing confirmation SMS", body: "Automated SMS confirms showing appointments, reducing no-shows and double bookings for agents." },
                { title: "New listing alerts", body: "Blast SMS to opted-in buyer leads when a new listing matching their criteria hits the market." },
                { title: "Broker oversight", body: "Brokers can monitor agent call volume, listen to recorded calls, and coach agents — all from the supervisor dashboard." },
                { title: "Out-of-hours enquiries", body: "After-hours callers hear listing details via IVR and leave a voicemail. Agents get a transcription via email the next morning." },
                { title: "Open house follow-up", body: "Capture sign-in contact info via SMS at open houses. Trigger automated follow-up messages 24 hours later." },
              ].map((uc) => (
                <div key={uc.title} className="p-5 rounded-2xl border border-gray-100 bg-white shadow-sm hover:shadow-md hover:border-[#95d9e8]/50 transition-all">
                  <h3 className="font-semibold text-[14px] text-gray-900 mb-1.5">{uc.title}</h3>
                  <p className="text-[12px] text-gray-500 leading-relaxed">{uc.body}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:sticky lg:top-24">
            <div className="relative w-full aspect-[3/4] rounded-3xl overflow-hidden shadow-lg">
              <Image
                src="/images/real-estate-team.jpg"
                alt="Real estate brokerage team reviewing call analytics on a dashboard"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute bottom-4 left-4 right-4 flex items-center gap-2 bg-white/90 backdrop-blur-sm rounded-xl px-4 py-3 shadow-sm">
                <span className="inline-block w-2 h-2 rounded-full bg-accent flex-shrink-0" />
                <p className="text-[12px] font-mono font-semibold text-gray-700">Brokerage command centre — all agents, one view</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Inline checklist */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t border-gray-100">
        <SectionHeading eyebrow="Full capabilities" h2="Everything agents and brokerages need" />
        <InlineList
          items={[
            "Dedicated local or toll-free number per agent",
            "Unique numbers per listing for call source tracking",
            "IVR property hotlines — details, price, and showing availability",
            "Round-robin inbound lead distribution",
            "Automated showing confirmation and reminder SMS",
            "New listing blast SMS to opted-in buyer leads",
            "After-hours IVR with voicemail transcription to email",
            "Brokerage-level number management portal",
            "Numbers stay with the brokerage when agents leave",
          ]}
          image={{ alt: "Real estate communications capabilities overview in Twiching" }}
        />
      </section>

      {/* Dark band */}
      <DarkBand>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-[11px] font-mono font-bold tracking-[2px] uppercase text-gray-500 mb-3">Built for agents and brokerages</p>
            <h2 className="text-3xl sm:text-4xl font-semibold text-white tracking-tight text-balance leading-tight mb-5">
              Every lead captured.<br />Every call attributed.
            </h2>
            <p className="text-base text-gray-400 leading-relaxed max-w-lg">
              Real estate is a game of response time and local trust. Twiching gives every agent a local number, routes every inbound lead to the right person in seconds, and tells you exactly which marketing channel — yard sign, portal, ad — is driving your calls.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: "3×", note: "Higher answer rate, local numbers" },
              { label: "Per-agent", note: "Dedicated numbers" },
              { label: "Round-robin", note: "Fair lead distribution" },
              { label: "Attribution", note: "Track every call source" },
            ].map(({ label, note }) => (
              <div key={label} className="p-5 rounded-xl border border-white/10 bg-white/5">
                <p className="font-mono font-bold text-[16px] text-white mb-1">{label}</p>
                <p className="font-mono text-[11px] text-gray-500">{note}</p>
              </div>
            ))}
          </div>
        </div>
      </DarkBand>

      <Faq items={FAQS} heading="Real estate communications FAQ" variant="tinted" />

      <RelatedCards
        heading="Explore more solutions"
        cards={[
          { title: "Sales Teams", desc: "Outbound dialing and CRM integration for sales.", href: "/solutions/sales" },
          { title: "Local Phone Number", desc: "Establish local presence in any market.", href: "/phone-numbers/local" },
          { title: "Intelligent Routing", desc: "Route leads to the right agent automatically.", href: "/features/routing" },
        ]}
      />

      <FinalCta />
    </PageLayout>
  )
}
