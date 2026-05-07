import { Metadata } from "next"
import { PageLayout } from "@/components/page-layout"
import { PageHero, SectionHeading, ValueCard, RelatedCards, StatBar, DarkBand } from "@/components/page-parts"
import { FinalCta } from "@/components/final-cta"
import { Faq } from "@/components/faq"
import { Phone, Globe, Zap, BarChart2, Shield, RefreshCw, MessageSquare, MapPin } from "lucide-react"

export const metadata: Metadata = {
  title: "Toll-Free Numbers · Twiching",
  description: "Get a toll-free 800, 833, 844, 855, 866, 877, or 888 number instantly. Route calls, track performance, and keep callers happy — no charge to them.",
}

const FEATURES = [
  {
    icon: Phone,
    title: "Instant activation",
    body: "Search, claim, and activate a toll-free number in minutes. 800, 833, 844, 855, 866, 877, and 888 prefixes available across the US and Canada.",
  },
  {
    icon: Globe,
    title: "Professional national presence",
    body: "A toll-free number signals credibility and national reach. Callers know you're a real business — and there's no cost for them to call.",
  },
  {
    icon: RefreshCw,
    title: "Advanced call routing",
    body: "Route toll-free calls to any team, device, or location. Time-based rules, IVR menus, and queue routing work exactly the same as local numbers.",
  },
  {
    icon: MessageSquare,
    title: "SMS on toll-free",
    body: "Send and receive text messages on your toll-free number. Two-way SMS, automated responses, and bulk messaging all supported.",
  },
  {
    icon: BarChart2,
    title: "Call analytics",
    body: "Track call volume, hold times, and conversion rates per number. Attribute campaigns and measure ROI across every toll-free line you run.",
  },
  {
    icon: Shield,
    title: "Number portability",
    body: "Already have a toll-free number? Port it to Twiching and keep all your existing marketing materials, ads, and customer familiarity intact.",
  },
]

const FAQS = [
  {
    q: "Which toll-free prefixes are available?",
    a: "Twiching supports all major US/Canada toll-free prefixes: 800, 833, 844, 855, 866, 877, and 888. Search for available numbers in the dashboard.",
  },
  {
    q: "Can I send SMS from a toll-free number?",
    a: "Yes. Toll-free SMS is supported for two-way messaging, automated responses, and bulk campaigns. Toll-free numbers must be verified for A2P messaging compliance.",
  },
  {
    q: "Can I port my existing toll-free number to Twiching?",
    a: "Yes. Number porting is free and typically takes 5–10 business days. Your number stays active throughout the process — no downtime.",
  },
  {
    q: "Is there a per-minute charge for inbound toll-free calls?",
    a: "Inbound toll-free calls use your plan's included minutes. Callers are never charged. Additional minutes beyond your plan are billed at standard rates.",
  },
  {
    q: "Can I use a toll-free number with IVR and call queues?",
    a: "Yes. Toll-free numbers support all the same routing features as local numbers — IVR menus, call queues, time-of-day routing, and voicemail.",
  },
]

export default function TollFreeNumbersPage() {
  return (
    <PageLayout>
      <PageHero
        eyebrow="Phone Numbers · Toll-Free"
        h1="A toll-free number that works as hard as you do."
        sub="Get an 800, 855, or 888 number instantly. Route calls, track performance, send SMS — and give callers a free, professional way to reach you."
        trustItems={["Instant activation", "SMS included", "Free number porting", "All 7 toll-free prefixes"]}
        primaryCta={{ label: "Start Free Trial", href: "/pricing" }}
        secondaryCta={{ label: "Talk to sales", href: "/contact" }}
        image={{ alt: "Twiching toll-free number dashboard with call routing and analytics" }}
      />

      <StatBar stats={[
        { value: "7",      label: "Toll-free prefixes",  note: "800, 833, 844, 855, 866, 877, 888" },
        { value: "5 min",  label: "Activation time",     note: "search, claim, and go live" },
        { value: "$0",     label: "Cost to caller",      note: "you absorb the inbound charges" },
        { value: "Free",   label: "Number porting",      note: "keep your existing number" },
      ]} />

<section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <SectionHeading eyebrow="What's included" h2="More than just a number" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
          {FEATURES.map((f) => <ValueCard key={f.title} icon={f.icon} title={f.title} body={f.body} />)}
        </div>
      </section>

      <DarkBand>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-[11px] font-mono font-bold tracking-[2px] uppercase text-gray-500 mb-3">National presence</p>
              <h2 className="text-3xl sm:text-4xl font-semibold text-white tracking-tight leading-tight mb-5">
                One number. Every caller, anywhere.
              </h2>
              <p className="text-base text-gray-400 leading-relaxed max-w-lg">
                Route your toll-free line to any team, any location, any device. Seasonal overflow, remote agents, and multi-location businesses all handled from one dashboard — no carrier involvement required.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "800–888",       note: "All prefix types supported" },
                { label: "US & Canada",   note: "Full coverage, both countries" },
                { label: "IVR routing",   note: "Full menu builder included" },
                { label: "SMS-enabled",   note: "Two-way text messaging" },
              ].map(({ label, note }) => (
                <div key={label} className="p-5 rounded-xl border border-white/10 bg-white/5">
                  <p className="font-mono font-bold text-[16px] text-white mb-1">{label}</p>
                  <p className="font-mono text-[11px] text-gray-500">{note}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </DarkBand>

      <Faq items={FAQS} heading="Toll-Free Numbers FAQ" />

      <RelatedCards
        heading="Related features"
        cards={[
          { title: "Business Phone Number", desc: "Dedicated business lines that separate work from personal.",  href: "/phone-numbers/business" },
          { title: "Auto-Attendant & IVR",  desc: "Route toll-free callers to the right team automatically.",   href: "/features/auto-attendant" },
          { title: "Call Recording",         desc: "Encrypted recordings with searchable transcripts.",          href: "/features/call-recording" },
        ]}
      />

      <FinalCta />
    </PageLayout>
  )
}
