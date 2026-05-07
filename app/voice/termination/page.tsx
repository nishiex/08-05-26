import { Metadata } from "next"
import { PageLayout } from "@/components/page-layout"
import { PageHero, SectionHeading, StatBar, FeatureSplit, DarkBand, InlineList, RelatedCards } from "@/components/page-parts"
import { FinalCta } from "@/components/final-cta"
import { Faq } from "@/components/faq"

export const metadata: Metadata = {
  title: "Voice Termination · Global Call Delivery | Twiching",
  description: "Carrier-grade voice termination with STIR/SHAKEN. Reliable routing, transparent pricing.",
}

const FAQS = [
  { q: "Is international termination available?", a: "Yes. Global reach with transparent rate sheets available on request." },
  { q: "What's the difference between termination and SIP?", a: "Voice termination is the call-delivery leg. SIP is the protocol carrying it. Twiching provides both." },
]

export default function VoiceTerminationPage() {
  return (
    <PageLayout>

      {/* Hero — image placeholder right column */}
      <PageHero
        eyebrow="Voice · Termination"
        h1="Outbound calls that actually get answered."
        sub="Voice termination with STIR/SHAKEN attestation on every call. Carrier-grade infrastructure, redundant routing, and transparent pricing — included on all plans."
        trustItems={["STIR/SHAKEN on every call", "Carrier-grade", "Global reach"]}
        primaryCta={{ label: "Start free trial", href: "/pricing" }}
        secondaryCta={{ label: "See SIP termination", href: "/voice/sip-termination" }}
        image={{ alt: "Voice termination call quality and STIR/SHAKEN attestation dashboard" }}
      />

      {/* Stats bar */}
      <StatBar stats={[
        { value: "100%", label: "Calls STIR/SHAKEN attested", note: "every outbound, every plan" },
        { value: "A-grade", label: "Attestation level", note: "full origination attestation" },
        { value: "Global", label: "Reach", note: "rate sheets available on request" },
        { value: "All plans", label: "Included", note: "not a premium add-on" },
      ]} />

      {/* Original narrative opener — preserved */}
      <section className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 pb-16 pt-12">
        <div className="max-w-[680px] border-l-2 border-accent/20 pl-6 space-y-4">
          <p className="font-mono text-[15px] text-gray-900 font-semibold leading-relaxed">Three calls dropped in the same client demo.</p>
          <p className="font-mono text-[15px] text-gray-600 leading-relaxed">The product looked fine. The pitch was solid. After the third interruption, the prospect stopped trusting the meeting — not because the pitch was bad, but because the call quality made the company look amateur.</p>
          <p className="font-mono text-[15px] text-gray-600 leading-relaxed">Voice quality isn&apos;t a nice-to-have.</p>
        </div>
      </section>

      {/* Original good/bad termination + STIR/SHAKEN section — preserved */}
      <section className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-gray-100">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <SectionHeading eyebrow="What it means" h2="What voice termination means" />
            <p className="font-mono text-[14px] text-gray-600 leading-relaxed mb-5">Voice termination is how your outbound call reaches the other end.</p>
            <div className="space-y-3">
              {[
                { label: "Good termination", desc: "Clear audio, first-attempt connection, no spam flagging", color: "bg-green-400" },
                { label: "Bad termination", desc: "Dropped calls, one-way audio, 'Spam Likely' on caller ID", color: "bg-red-400" },
              ].map(({ label, desc, color }) => (
                <div key={label} className="p-5 rounded-xl border border-gray-100 bg-white flex items-start gap-3">
                  <span className={`mt-1 w-2 h-2 rounded-full ${color} flex-shrink-0`} />
                  <div>
                    <p className="font-mono font-bold text-[13px] text-gray-900 mb-1">{label}</p>
                    <p className="font-mono text-[12px] text-gray-500">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-5 font-mono text-[14px] text-gray-600 leading-relaxed">
              Twiching routes through carrier-grade infrastructure with redundant paths — so a single route failure doesn&apos;t drop your calls.
            </p>
          </div>

          <div>
            <SectionHeading eyebrow="Compliance" h2="STIR/SHAKEN attestation" />
            <p className="font-mono text-[14px] text-gray-600 leading-relaxed mb-5">
              Under FCC rules, calls without proper attestation get flagged by carriers. Answer rates on flagged numbers are brutally low.
            </p>
            <p className="font-mono text-[14px] text-gray-600 leading-relaxed mb-5">
              Every Twiching outbound carries STIR/SHAKEN attestation — included on all plans, not premium.
            </p>
            <SectionHeading eyebrow="This matters for" h2="Who uses voice termination" />
            <ul className="space-y-2">
              {["Outbound sales teams", "Appointment reminder calls", "Customer callback flows", "Contact centers", "SaaS platforms embedding calling"].map((u) => (
                <li key={u} className="flex items-center gap-2 font-mono text-[13px] text-gray-700">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" />{u}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Feature split 1 — Carrier-grade infrastructure */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t border-gray-100">
        <FeatureSplit
          eyebrow="Carrier-grade infrastructure"
          heading="Redundant routing that survives single-path failures"
          body="Twiching routes every outbound call through carrier-grade infrastructure with multiple redundant paths. If one route degrades, calls switch automatically — no dropped connections, no one-way audio."
          points={[
            "Multiple redundant carrier paths per call",
            "Automatic failover on route degradation",
            "HD voice quality on all domestic calls",
            "Real-time monitoring of route quality and latency",
          ]}
          cta={{ label: "Start free trial", href: "/pricing" }}
          image={{ alt: "Voice routing infrastructure diagram showing redundant carrier paths" }}
        />
      </section>

      {/* Feature split 2 — Global reach + pricing (reversed) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t border-gray-100">
        <FeatureSplit
          eyebrow="Global reach"
          heading="International termination with transparent rate sheets"
          body="Twiching terminates calls to destinations worldwide. No surprise per-minute charges — rate sheets are available on request before you commit. Domestic US and Canada calling is unlimited on all plans."
          points={[
            "Unlimited US and Canada outbound on all plans",
            "International termination to global destinations",
            "Transparent rate sheets available on request",
            "No premium markups for STIR/SHAKEN — included standard",
          ]}
          image={{ alt: "International call termination rate sheet and global coverage map" }}
          reverse
        />
      </section>

      {/* Inline checklist — what's included */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t border-gray-100">
        <SectionHeading eyebrow="What's included" h2="Everything in Twiching voice termination" />
        <InlineList
          items={[
            "STIR/SHAKEN A-level attestation on every outbound call",
            "Carrier-grade routing with automatic redundant failover",
            "HD voice quality on domestic calls",
            "Unlimited US and Canada outbound on all plans",
            "International termination — rate sheets on request",
            "No 'Spam Likely' flagging on properly attested numbers",
            "Compliant caller disclosure for recorded calls",
            "Works with SIP trunking and direct calling from Twiching apps",
          ]}
          image={{ alt: "Voice termination capability checklist in Twiching" }}
        />
      </section>

      {/* Dark band */}
      <DarkBand>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-[11px] font-mono font-bold tracking-[2px] uppercase text-gray-500 mb-3">Why STIR/SHAKEN matters</p>
            <h2 className="text-3xl sm:text-4xl font-semibold text-white tracking-tight text-balance leading-tight mb-5">
              &ldquo;Spam Likely&rdquo; kills answer rates.<br />Attestation fixes it.
            </h2>
            <p className="text-base text-gray-400 leading-relaxed max-w-lg">
              Carriers flag unauthenticated calls as spam before the phone even rings. STIR/SHAKEN attestation proves the call originates from a verified number — dramatically improving answer rates for sales, support, and reminder calls alike.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: "STIR/SHAKEN", note: "A-level attestation standard" },
              { label: "Redundant", note: "Multi-path carrier routing" },
              { label: "HD Voice", note: "Wideband audio quality" },
              { label: "Global", note: "Worldwide termination reach" },
            ].map(({ label, note }) => (
              <div key={label} className="p-5 rounded-xl border border-white/10 bg-white/5">
                <p className="font-mono font-bold text-[16px] text-white mb-1">{label}</p>
                <p className="font-mono text-[11px] text-gray-500">{note}</p>
              </div>
            ))}
          </div>
        </div>
      </DarkBand>

      <Faq items={FAQS} heading="Voice Termination FAQ" />

      <RelatedCards
        heading="Related products"
        cards={[
          { title: "SIP Termination", desc: "Bring your own SIP infrastructure and terminate through Twiching.", href: "/voice/sip-termination" },
          { title: "Local Presence Dialing", desc: "Show a local area code on every outbound call.", href: "/solutions/sales" },
          { title: "Intelligent Routing", desc: "Control how inbound calls are handled after they arrive.", href: "/features/routing" },
        ]}
      />

      <FinalCta />
    </PageLayout>
  )
}