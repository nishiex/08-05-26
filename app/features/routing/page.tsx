import { Metadata } from "next"
import { PageLayout } from "@/components/page-layout"
import { PageHero, SectionHeading, ValueCard, RelatedCards, StatBar, FeatureSplit, DarkBand, InlineList } from "@/components/page-parts"
import { FinalCta } from "@/components/final-cta"
import { Faq } from "@/components/faq"
import { Brain, GitBranch, Clock, Users, Globe, Zap } from "lucide-react"

export const metadata: Metadata = {
  title: "Intelligent Call Routing · Twiching",
  description: "Skill-based, geographic, time-based, and AI-driven call routing that connects every caller to the best available agent.",
}

const VALUES = [
  { icon: Brain, title: "Skill-Based Routing", body: "Match callers to agents with the right expertise. A Spanish-speaking caller routes to a bilingual agent; a VIP account routes to a senior rep — automatically." },
  { icon: Globe, title: "Geographic Routing", body: "Route calls based on the caller's area code or region to the nearest branch, local agent, or regionally appropriate team." },
  { icon: Clock, title: "Time-Based Routing", body: "Define different call flows for morning, afternoon, evening, weekends, and public holidays. One number, infinite routing logic." },
  { icon: GitBranch, title: "Conditional Logic Routing", body: "Build if/then routing rules using caller ID, previous call history, CRM data, or IVR keypress. No developer required." },
  { icon: Users, title: "Ring Group & Round-Robin", body: "Ring a group of agents simultaneously or in sequence. Round-robin distributes calls evenly so no agent is overloaded." },
  { icon: Zap, title: "Overflow & Failover", body: "If an agent team is fully busy, calls overflow to a backup queue, voicemail, or alternate number — no caller is ever left hanging." },
]

const FAQS = [
  { q: "What is skill-based routing?", a: "Skill-based routing directs incoming calls to the agent best qualified to handle them based on attributes like language, product expertise, or account tier." },
  { q: "Can I route calls differently on weekends and holidays?", a: "Yes. Define unique call flows for each day of the week and specific public holidays. Routing switches automatically at the scheduled time." },
  { q: "Does routing integrate with my CRM?", a: "Yes on Professional and Enterprise. Twiching can read CRM data (account tier, owner, open tickets) to inform routing decisions before the call is answered." },
  { q: "What happens when all agents are busy?", a: "You choose: place the caller in a queue with hold music, route to voicemail, overflow to another team, or play a callback offer." },
  { q: "Is intelligent routing available on Starter?", a: "Basic business hours routing and ring groups are included on Starter. Skill-based and CRM-driven routing are available on Professional and Enterprise." },
]

export default function RoutingPage() {
  return (
    <PageLayout>

      {/* Hero — image placeholder right column */}
      <PageHero
        eyebrow="Features · Intelligent Routing"
        h1="Connect every caller to the right agent, every time"
        sub="Skill-based, geographic, time-based, and CRM-driven routing that eliminates misdirected calls and reduces handle time — all configured without writing a line of code."
        trustItems={["Skill-based routing", "Geographic routing", "CRM integration", "No-code builder"]}
        primaryCta={{ label: "Start Free Trial", href: "/pricing" }}
        secondaryCta={{ label: "See pricing", href: "/pricing" }}
        image={{ alt: "Intelligent routing configuration dashboard in Twiching" }}
      />

      {/* Stats bar */}
      <StatBar stats={[
        { value: "6+", label: "Routing strategies", note: "skill, geo, time, CRM, round-robin, overflow" },
        { value: "0", label: "Misdirected calls", note: "with correct skill tags" },
        { value: "No-code", label: "Setup", note: "drag-and-drop rule builder" },
        { value: "Pro+", label: "CRM routing", note: "Starter gets basic ring groups" },
      ]} />

{/* Value cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {VALUES.map((v) => <ValueCard key={v.title} icon={v.icon} title={v.title} body={v.body} />)}
        </div>
      </section>

      {/* Feature split 1 — Skill-based routing */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t border-gray-100">
        <FeatureSplit
          eyebrow="Skill-based routing"
          heading="Match every caller to the agent who can actually help"
          body="Assign skill tags to agents — language, product line, account tier, or any custom attribute. Twiching routes each call to the best qualified available agent, automatically."
          points={[
            "Custom skill tags per agent — unlimited attributes",
            "Language, product, tier, region — any dimension you need",
            "VIP callers bypass the queue and reach their dedicated rep",
            "Overflow to next-best-skill when first choice is unavailable",
          ]}
          cta={{ label: "Start building free", href: "/pricing" }}
          image={{ alt: "Skill-based routing configuration showing agent skill tags" }}
        />
      </section>

      {/* Feature split 2 — CRM-driven routing (reversed) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t border-gray-100">
        <FeatureSplit
          eyebrow="CRM-driven routing"
          heading="Route using what your CRM already knows about the caller"
          body="On Professional and Enterprise, Twiching reads account owner, tier, and open ticket data from your CRM before the call even rings. Inbound leads go to their assigned owner. VIPs skip the queue."
          points={[
            "Salesforce, HubSpot, and Zoho integrations included",
            "Route to CRM account owner automatically",
            "Read account tier to prioritize queue position",
            "Unassigned leads route round-robin to available reps",
          ]}
          image={{ alt: "CRM routing rules showing Salesforce account owner lookup" }}
          reverse
        />
      </section>

      {/* Routing scenarios grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t border-gray-100">
        <SectionHeading eyebrow="Routing scenarios" h2="Built for every team structure" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-2">
          {[
            { title: "Contact centers", body: "Route by skill, language, or queue priority. Real-time wallboards show queue depth so supervisors can rebalance instantly." },
            { title: "Sales teams", body: "Inbound leads route to the account owner in the CRM. Unassigned leads go round-robin to the first available SDR." },
            { title: "Multi-location businesses", body: "Callers from New York route to the NY office; callers from LA route to the LA team — with a single inbound number." },
            { title: "After-hours operations", body: "Day shift routes to the main team. Evening routes to reduced staff. Overnight routes to voicemail with a next-day callback promise." },
            { title: "VIP accounts", body: "Recognize VIP callers by number. Skip the queue, bypass IVR, and connect directly to their dedicated account manager." },
            { title: "Overflow handling", body: "When queue wait times exceed your threshold, offer a callback or route to an overflow team — keeping abandonment rates low." },
          ].map((uc) => (
            <div key={uc.title} className="p-6 rounded-2xl border border-gray-100 bg-white shadow-sm hover:shadow-md hover:border-[#95d9e8]/50 transition-all">
              <h3 className="font-semibold text-[15px] text-gray-900 mb-2">{uc.title}</h3>
              <p className="text-[13px] text-gray-600 leading-relaxed">{uc.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Inline checklist + image — routing capabilities summary */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t border-gray-100">
        <SectionHeading eyebrow="Full capabilities" h2="Every routing tool in one platform" />
        <InlineList
          items={[
            "Skill-based routing with unlimited custom agent tags",
            "Geographic routing by area code or region",
            "Time-of-day and day-of-week routing schedules",
            "Holiday overrides with instant manual toggle",
            "CRM-driven routing — account owner, tier, open tickets",
            "Ring groups: simultaneous, sequential, or round-robin",
            "Overflow and failover to backup queues or voicemail",
            "No-code rule builder — no developer required",
          ]}
          image={{ alt: "Routing rule builder interface in Twiching" }}
        />
      </section>

      {/* Dark band — routing strategy callout */}
      <DarkBand>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-[11px] font-mono font-bold tracking-[2px] uppercase text-gray-500 mb-3">Every routing strategy, one platform</p>
            <h2 className="text-3xl sm:text-4xl font-semibold text-white tracking-tight text-balance leading-tight mb-5">
              The right agent. The right moment.<br />No transfers. No dead ends.
            </h2>
            <p className="text-base text-gray-400 leading-relaxed max-w-lg">
              Twiching's routing engine combines six strategies — skill, geography, time, CRM data, ring groups, and overflow — into a single no-code rule builder. Mix and match to match your exact operation.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: "Skill-Based", note: "Match expertise to need" },
              { label: "Geographic", note: "Route by region or area code" },
              { label: "Time-Based", note: "Schedules & holiday flows" },
              { label: "CRM-Driven", note: "Owner, tier, open tickets" },
            ].map(({ label, note }) => (
              <div key={label} className="p-5 rounded-xl border border-white/10 bg-white/5">
                <p className="font-mono font-bold text-[16px] text-white mb-1">{label}</p>
                <p className="font-mono text-[11px] text-gray-500">{note}</p>
              </div>
            ))}
          </div>
        </div>
      </DarkBand>

      <Faq items={FAQS} heading="Intelligent Routing FAQ" />

      <RelatedCards
        heading="Related features"
        cards={[
          { title: "Auto-Attendant", desc: "The IVR layer that feeds your routing logic.", href: "/features/auto-attendant" },
          { title: "Supervisor Tools", desc: "Monitor queues and rebalance routing in real time.", href: "/features/supervisor" },
          { title: "Omnichannel", desc: "Full omnichannel solution for larger teams.", href: "/voice/contact-center" },
        ]}
      />

      <FinalCta />
    </PageLayout>
  )
}
