"use client"

import { PageLayout } from "@/components/page-layout"
import { PageHero, SectionHeading, ValueCard, RelatedCards, StatBar, FeatureSplit, DarkBand, InlineList } from "@/components/page-parts"
import { FinalCta } from "@/components/final-cta"
import { Faq } from "@/components/faq"
import { Globe, Users, Phone, MessageSquare, BarChart2, Zap } from "lucide-react"

const VALUES = [
  { icon: Globe, title: "Work From Anywhere", body: "Enable your team to call, message, and collaborate from any device, anywhere in the world with a unified cloud platform." },
  { icon: Users, title: "Team Collaboration Tools", body: "Shared inboxes, internal chat, call transfers, and conferencing keep distributed teams connected in real time." },
  { icon: Phone, title: "Cloud Calling System", body: "Make and receive calls using business numbers on desktop or mobile. No hardware required." },
  { icon: MessageSquare, title: "Unified Messaging", body: "Manage SMS, WhatsApp, and internal communication in one dashboard. Never miss a conversation." },
  { icon: BarChart2, title: "Performance Insights", body: "Track team activity, call metrics, and response times with real-time dashboards and analytics." },
  { icon: Zap, title: "Quick Setup & Scaling", body: "Add new team members, assign numbers, and scale operations instantly without infrastructure hassles." },
]

const FAQS = [
  { q: "Can remote teams use Twiching from anywhere?", a: "Yes. Twiching is fully cloud-based, allowing teams to work from any location using desktop or mobile apps." },
  { q: "Does it support team collaboration features?", a: "Yes. Features like call transfer, shared inbox, team chat, and conferencing make collaboration seamless." },
  { q: "Do I need hardware or VoIP phones?", a: "No. Twiching works directly on your browser or mobile device without requiring physical hardware." },
  { q: "Can I track team performance?", a: "Yes. Supervisors can access dashboards, analytics, and call reports to monitor productivity and performance." },
]

export default function RemoteTeamsPage() {
  return (
    <PageLayout>
      <PageHero
        eyebrow="Solutions · Remote Teams"
        h1="UCaaS platform built for remote teams"
        sub="Empower distributed teams with cloud calling, messaging, and collaboration tools — all in one unified platform designed for productivity and scale."
        trustItems={["Cloud-based", "Global numbers", "Team collaboration", "Real-time analytics"]}
        primaryCta={{ label: "Start Free Trial", href: "/pricing" }}
        secondaryCta={{ label: "Talk to sales", href: "/contact" }}
        image={{ alt: "Remote team members collaborating via Twiching cloud calling on laptops and mobile devices" }}
      />

      {/* Stats bar */}
      <StatBar stats={[
        { value: "0", label: "Hardware required", note: "browser and mobile app only" },
        { value: "Global", label: "Number provisioning", note: "any country, any time zone" },
        { value: "1 dashboard", label: "All channels", note: "calls, SMS, chat unified" },
        { value: "Instant", label: "Team scaling", note: "add seats in seconds" },
      ]} />

{/* Value cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {VALUES.map((v) => (
            <ValueCard key={v.title} icon={v.icon} title={v.title} body={v.body} />
          ))}
        </div>
      </section>

      {/* Feature split 1 — Cloud calling + no hardware */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t border-gray-100">
        <FeatureSplit
          eyebrow="Cloud calling"
          heading="Business numbers on every device. No hardware, no IT project."
          body="Twiching runs in the browser and on the mobile app. Every team member gets a professional business number they can use to call and message from a laptop in a coffee shop or a phone in a different country — without a single desk phone or SIM card."
          points={[
            "Desktop app, mobile app, and browser — all included",
            "Business number rings on all devices simultaneously",
            "Calls transfer between devices mid-conversation",
            "Local numbers available in 50+ countries",
          ]}
          cta={{ label: "Start Free Trial", href: "/pricing" }}
          image={{ alt: "Remote team member making a business call on laptop with Twiching softphone" }}
        />
      </section>

      {/* Feature split 2 — Team collaboration (reversed) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t border-gray-100">
        <FeatureSplit
          eyebrow="Team collaboration"
          heading="Shared inbox. Internal notes. One team, any location."
          body="Distributed teams lose context when conversations are siloed across personal phones. Twiching's shared inbox gives the whole team visibility into every customer conversation — with internal notes, assignments, and tags so nothing falls through the cracks."
          points={[
            "Shared team inbox for calls, SMS, and WhatsApp",
            "Internal notes and conversation tagging",
            "Assign conversations to team members",
            "Real-time dashboards — see who's available across time zones",
          ]}
          image={{ alt: "Shared team inbox showing distributed team conversation assignments and internal notes" }}
          reverse
        />
      </section>

      {/* Use cases */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t border-gray-100">
        <SectionHeading eyebrow="Use cases" h2="How remote teams use Twiching" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-2">
          {[
            { title: "Distributed support teams", body: "Support agents work from anywhere while handling calls and messages through a unified dashboard." },
            { title: "Remote sales teams", body: "Sales reps use local numbers and click-to-call to reach prospects globally with higher answer rates." },
            { title: "Virtual call centers", body: "Build a cloud call center with IVR, routing, and analytics without physical infrastructure." },
            { title: "Startup remote teams", body: "Set up a complete communication system instantly without expensive hardware or office setup." },
            { title: "Freelancer collaboration", body: "Freelancers and agencies manage client communication professionally using business numbers." },
            { title: "Global team coordination", body: "Keep international teams aligned with shared inboxes, messaging, and real-time updates." },
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
        <SectionHeading eyebrow="Full capabilities" h2="Everything a remote team needs to stay connected" />
        <InlineList
          items={[
            "Cloud calling — desktop, mobile, and browser apps included",
            "Business numbers in 50+ countries",
            "Shared team inbox for calls, SMS, and WhatsApp",
            "Internal notes, tags, and conversation assignments",
            "Call transfer between devices mid-conversation",
            "Real-time availability dashboards across time zones",
            "IVR and intelligent call routing — no hardware needed",
            "Performance analytics: call volume, response time, agent activity",
            "Add new team members and assign numbers in seconds",
          ]}
          image={{ alt: "Remote team communications capabilities overview in Twiching" }}
        />
      </section>

      {/* Dark band */}
      <DarkBand>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-[11px] font-mono font-bold tracking-[2px] uppercase text-gray-500 mb-3">Built for distributed teams</p>
            <h2 className="text-3xl sm:text-4xl font-semibold text-white tracking-tight text-balance leading-tight mb-5">
              One platform.<br />Every device. Every time zone.
            </h2>
            <p className="text-base text-gray-400 leading-relaxed max-w-lg">
              Remote teams don't need a phone system built for an office. Twiching is built cloud-first — professional numbers, shared inboxes, and real-time analytics that work the same whether your team is in the same building or on four different continents.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: "Cloud", note: "No hardware required" },
              { label: "Global", note: "Numbers in 50+ countries" },
              { label: "Unified", note: "Calls, SMS, chat in one view" },
              { label: "Instant", note: "New seats in seconds" },
            ].map(({ label, note }) => (
              <div key={label} className="p-5 rounded-xl border border-white/10 bg-white/5">
                <p className="font-mono font-bold text-[18px] text-white mb-1">{label}</p>
                <p className="font-mono text-[11px] text-gray-500">{note}</p>
              </div>
            ))}
          </div>
        </div>
      </DarkBand>

      <Faq items={FAQS} heading="Remote teams FAQ" />

      <RelatedCards
        heading="Explore more solutions"
        cards={[
          { title: "Sales Teams", desc: "Boost outbound calling and CRM workflows.", href: "/solutions/sales" },
          { title: "Customer Support", desc: "Deliver fast and efficient support with cloud communication.", href: "/solutions/support" },
          { title: "Call Analytics", desc: "Track performance and optimize team productivity.", href: "/features/analytics" },
        ]}
      />

      <FinalCta />
    </PageLayout>
  )
}
