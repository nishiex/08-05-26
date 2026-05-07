import { Metadata } from "next"
import { PageLayout } from "@/components/page-layout"
import { PageHero, SectionHeading } from "@/components/page-parts"
import { FinalCta } from "@/components/final-cta"
import { Faq } from "@/components/faq"
import { PhoneCall, Network, Building2, Headphones, PhoneIncoming, ArrowRight, Shield } from "lucide-react"

export const metadata: Metadata = {
  title: "Business Voice Services · Termination, SIP, Wholesale | Twiching",
  description: "Voice termination, SIP trunking, wholesale VoIP, contact center tools. Carrier-grade routing with STIR/SHAKEN.",
}

const VOICE_SERVICES = [
  { Icon: PhoneCall,     label: "Voice Termination",  href: "/voice/termination",      desc: "Delivering your outbound to the other end. Global reach, stable routing." },
  { Icon: Network,       label: "SIP Termination",    href: "/voice/sip-termination",  desc: "Secure SIP-based delivery with encrypted signaling." },
  { Icon: Building2,     label: "VoIP Wholesaler",    href: "/voice/voip-wholesale",   desc: "Wholesale-rate routing for high-volume operations." },
  { Icon: Headphones,    label: "Omnichannel",         href: "/voice/contact-center",   desc: "Tools that enhance customer interaction experiences." },
  { Icon: PhoneIncoming, label: "Call Termination",   href: "/voice/call-termination", desc: "Reliable worldwide call delivery at transparent rates." },
]

const FAQS = [
  { q: "Do I need SIP if I have virtual numbers?", a: "Not necessarily. Virtual numbers handle most small and mid-sized needs. SIP is for businesses running their own PBX or high-volume setups." },
  { q: "Is wholesale VoIP available to small businesses?", a: "Wholesale rates generally apply to higher volume. Contact us for specifics." },
]

export default function VoiceHub() {
  return (
    <PageLayout>
      <PageHero
        h1="Voice infrastructure that just works."
        sub="Call termination, SIP, wholesale routes, and contact center tools — one platform."
        trustItems={["Carrier-grade", "STIR/SHAKEN", "99.99% uptime", "Redundant routing"]}
        primaryCta={{ label: "Start Free Trial", href: "/pricing" }}
        secondaryCta={{ label: "See pricing", href: "/pricing" }}
      />

      <section className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="max-w-[680px] font-mono text-[15px] text-gray-600 leading-relaxed space-y-4">
          <p>Voice is the part of your stack that fails silently until it suddenly doesn&apos;t.</p>
          <p>Calls drop. Audio goes one-way. Numbers get flagged as spam. And every time, the provider says &quot;it must be the other end.&quot;</p>
          <p>Twiching&apos;s voice services run on carrier-grade infrastructure — so you spend time on calls, not on debugging call quality.</p>
        </div>
      </section>

      {/* Voice services grid */}
      <section className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-gray-100">
        <SectionHeading eyebrow="Voice stack" h2="What's in the voice stack" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {VOICE_SERVICES.map(({ Icon, label, href, desc }) => (
            <a key={href} href={href}
              className="group block p-7 rounded-2xl border border-gray-100 hover:border-accent/30 hover:shadow-lg hover:shadow-accent/5 transition-all bg-white">
              <span className="w-10 h-10 rounded-2xl bg-[#e0f7fa] text-accent grid place-items-center mb-5 group-hover:bg-accent group-hover:text-white transition-colors">
                <Icon className="h-5 w-5" strokeWidth={1.8} />
              </span>
              <h3 className="font-mono font-bold text-[15px] text-gray-900 mb-2">{label}</h3>
              <p className="font-mono text-[13px] text-gray-500 leading-relaxed mb-4">{desc}</p>
              <span className="inline-flex items-center gap-1.5 text-accent text-[12px] font-semibold font-mono">
                Learn more <ArrowRight className="h-3 w-3 group-hover:translate-x-0.5 transition-transform" />
              </span>
            </a>
          ))}
        </div>
      </section>

      {/* Why voice quality matters */}
      <section className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-gray-100">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div>
            <SectionHeading eyebrow="Quality" h2="Why voice quality actually matters" />
            <p className="font-mono text-[14px] text-gray-600 mb-5">Every dropped call costs you:</p>
            <ul className="space-y-3 mb-8">
              {[
                "A prospect's patience",
                "A support ticket that gets reopened",
                "A sales conversation that restarts from scratch",
                "A customer who quietly decides not to come back",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2 font-mono text-[14px] text-gray-700">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-red-400 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
            <p className="font-mono text-[14px] text-gray-600 leading-relaxed">
              Voice infrastructure that holds up isn&apos;t a luxury. It&apos;s the baseline your business runs on.
            </p>
          </div>

          <div className="bg-gray-50 rounded-2xl p-8">
            <div className="flex items-center gap-3 mb-5">
              <Shield className="h-6 w-6 text-accent" strokeWidth={1.8} />
              <p className="font-mono font-bold text-[13px] tracking-[1.5px] uppercase text-gray-700">STIR/SHAKEN on every outbound</p>
            </div>
            <p className="font-mono text-[14px] text-gray-600 leading-relaxed mb-5">
              Numbers flagged as &quot;Spam Likely&quot; get answered at <strong className="text-red-500">12% rates</strong>. Attested calls get answered at <strong className="text-green-600">70%+</strong>.
            </p>
            <p className="font-mono text-[14px] text-gray-600 leading-relaxed">
              Every Twiching outbound carries STIR/SHAKEN attestation — built into every plan, not a higher-tier add-on.
            </p>
          </div>
        </div>
      </section>

      <Faq />
      <FinalCta />
    </PageLayout>
  )
}
