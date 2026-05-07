import { Metadata } from "next"
import { PageLayout } from "@/components/page-layout"
import { PageHero, SectionHeading, ValueCard, RelatedCards, StatBar, FeatureSplit, DarkBand, InlineList } from "@/components/page-parts"
import { FinalCta } from "@/components/final-cta"
import { Faq } from "@/components/faq"
import { Shuffle, Clock, Phone, GitBranch, Globe, Settings } from "lucide-react"

export const metadata: Metadata = {
  title: "Auto-Attendant (IVR) · Twiching",
  description: "Multi-level auto-attendant and IVR that routes every call to the right person or department — 24/7, no receptionist required.",
}

const VALUES = [
  { icon: Shuffle, title: "Multi-Level IVR", body: "Build unlimited nested menus. Callers press 1 for Sales, 2 for Support, then 1 for Billing — routed precisely every time." },
  { icon: Clock, title: "Business Hours Routing", body: "Define your hours once. Calls in business hours route to your team; after hours route to voicemail, on-call staff, or a custom message." },
  { icon: Phone, title: "Department & Extension Routing", body: "Assign extensions to individuals, teams, or ring groups. Callers who know the extension can bypass menus entirely." },
  { icon: GitBranch, title: "Conditional Call Flows", body: "Route based on time of day, caller ID, geographic area code, or custom tags. Build flows that match your exact business logic." },
  { icon: Globe, title: "Custom Voice Greetings", body: "Record your own greetings or use Twiching's text-to-speech. Update them anytime from the dashboard without calling IT." },
  { icon: Settings, title: "No-Code Flow Builder", body: "Drag-and-drop interface to build, preview, and publish call flows in minutes. No developer required." },
]

const FAQS = [
  { q: "How many menu levels can I create?", a: "Twiching supports unlimited IVR nesting depth. You can create as many levels and options as your call flow requires." },
  { q: "Can I change my auto-attendant greeting without technical help?", a: "Yes. Upload a new recording or type text for TTS directly in the dashboard. Changes go live instantly, no IT involvement needed." },
  { q: "What happens to calls received outside business hours?", a: "You define the after-hours behavior: route to a voicemail box, play a custom message, forward to an on-call number, or any combination." },
  { q: "Can callers skip the IVR if they know their party's extension?", a: "Yes. Callers can dial an extension at any point during the IVR greeting to connect directly, bypassing menu options." },
  { q: "Is the auto-attendant included in all plans?", a: "Yes. Multi-level auto-attendant (IVR) is included on all plans including Starter." },
]

export default function AutoAttendantPage() {
  return (
    <PageLayout>
      {/* Hero — with image placeholder on the right */}
      <PageHero
        eyebrow="Features · Auto-Attendant"
        h1="Route every call to the right person, automatically"
        sub="Multi-level IVR that presents a professional front door for your business 24/7 — without a receptionist. Build your call flow in minutes with a no-code drag-and-drop builder."
        trustItems={["Unlimited levels", "No-code builder", "Business hours routing", "Included on all plans"]}
        primaryCta={{ label: "Start Free Trial", href: "/pricing" }}
        secondaryCta={{ label: "See all features", href: "/pricing" }}
        image={{ alt: "Auto-attendant flow builder dashboard" }}
      />

      {/* Stats bar */}
      <StatBar stats={[
        { value: "∞", label: "Menu levels", note: "no nesting limit" },
        { value: "24/7", label: "Always routing", note: "after-hours flows included" },
        { value: "< 1s", label: "Routing time", note: "zero hold music" },
        { value: "All plans", label: "Included", note: "from Starter upward" },
      ]} />

{/* Value cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {VALUES.map((v) => <ValueCard key={v.title} icon={v.icon} title={v.title} body={v.body} />)}
        </div>
      </section>

      {/* Feature split 1 — No-code builder */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t border-gray-100">
        <FeatureSplit
          eyebrow="No-code builder"
          heading="Build your entire call flow without writing a line of code"
          body="Drag destinations onto a canvas, assign keypresses, preview the caller experience, and publish — all from your browser. Changes are live in under a minute."
          points={[
            "Drag-and-drop menu builder with live preview",
            "Assign any keypress (0–9, *, #) to any destination",
            "Nested submenus with unlimited depth",
            "Test your flow before publishing",
          ]}
          cta={{ label: "Start building free", href: "/pricing" }}
          image={{ alt: "Twiching no-code IVR flow builder interface" }}
        />
      </section>

      {/* Feature split 2 — Business hours routing (reversed) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t border-gray-100">
        <FeatureSplit
          eyebrow="Business hours routing"
          heading="Never miss a call — even when your office is closed"
          body="Define your schedule once. Calls during business hours go to your team; after-hours calls follow a completely separate flow you control — voicemail, on-call forwarding, or a custom message."
          points={[
            "Per-day schedule with custom open and close times",
            "Separate after-hours call flow",
            "Holiday overrides — set it and forget it",
            "Instant toggle to close early or open late",
          ]}
          image={{ alt: "Business hours scheduling settings in Twiching dashboard" }}
          reverse
        />
      </section>

      {/* How it works — 3 steps */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t border-gray-100">
        <SectionHeading eyebrow="How it works" h2="Set up your auto-attendant in three steps" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-2">
          {[
            { step: "01", title: "Record or type your greeting", body: "Upload an audio file, record in the browser, or type your script and let TTS do the rest. Your greeting goes live instantly." },
            { step: "02", title: "Build your menu options", body: "Assign each keypress (1–9, 0, *, #) to a destination: a team, individual, ring group, voicemail, or another submenu." },
            { step: "03", title: "Set your schedule", body: "Define business hours per day of the week. After-hours calls automatically follow a separate flow you control." },
          ].map(({ step, title, body }) => (
            <div key={step} className="p-7 rounded-2xl border border-gray-100 bg-white shadow-sm">
              <p className="font-mono text-[11px] font-bold tracking-[2px] text-accent mb-4">{step}</p>
              <h3 className="font-semibold text-[16px] text-gray-900 mb-2">{title}</h3>
              <p className="text-[13px] text-gray-600 leading-relaxed">{body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Inline checklist + image — works with any plan */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t border-gray-100">
        <SectionHeading eyebrow="Works out of the box" h2="Everything included. No add-ons required." />
        <InlineList
          items={[
            "Included on every plan — Starter, Professional, and Enterprise",
            "No per-minute charges for IVR routing",
            "Unlimited extensions and ring groups",
            "Works with mobile apps — manage your flow on the go",
            "CRM call logging still applies to all routed calls",
            "STIR/SHAKEN and HIPAA compliance built in",
          ]}
          image={{ alt: "Twiching plan comparison showing IVR included on all tiers" }}
        />
      </section>

      {/* Animated IVR flow demo */}
      
      <Faq items={FAQS} heading="Auto-Attendant FAQ" />

      <RelatedCards
        heading="Related features"
        cards={[
          { title: "Intelligent Routing", desc: "Advanced skill-based and conditional call routing.", href: "/features/routing" },
          { title: "Call Recording", desc: "Record, archive, and review every call.", href: "/features/call-recording" },
          { title: "Supervisor Tools", desc: "Monitor and coach your team in real time.", href: "/features/supervisor" },
        ]}
      />

      <FinalCta />
    </PageLayout>
  )
}