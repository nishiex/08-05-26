import { MegaNav } from "@/components/mega-nav"
import { Footer } from "@/components/footer"
import {
  PageHero, SectionHeading, StatBar, ValueGrid,
  FeatureSplit, RelatedCards,
} from "@/components/page-parts"
import { FinalCta } from "@/components/final-cta"
import {
  Phone, MessageSquare, Mic2, Bot, PhoneIncoming,
  Globe, BarChart3, ShieldCheck, Repeat2,
} from "lucide-react"

export const metadata = {
  title: "Services — Twiching Business Communications",
  description:
    "Virtual numbers, VoIP voice, bulk SMS, AI receptionists and call analytics — all on one platform. Explore the full Twiching service catalogue.",
}

const SERVICES = [
  {
    icon: Phone,
    title: "Virtual Phone Numbers",
    body: "Local, vanity, toll-free and second numbers across 50+ countries. Port existing numbers or provision instantly.",
    variant: "blue" as const,
  },
  {
    icon: Mic2,
    title: "Voice & VoIP",
    body: "Crystal-clear inbound and outbound calls with global PSTN interconnect, SIP trunking and carrier-grade uptime.",
    variant: "blue" as const,
  },
  {
    icon: MessageSquare,
    title: "Messaging",
    body: "Two-way SMS, MMS, 10DLC-registered campaigns and bulk broadcast — all managed from one inbox.",
    variant: "blue" as const,
  },
  {
    icon: Bot,
    title: "AI Receptionist",
    body: "24/7 intelligent call handling that books meetings, qualifies leads and escalates to humans when it matters.",
    variant: "slate" as const,
  },
  {
    icon: PhoneIncoming,
    title: "Auto-Attendant & IVR",
    body: "Multi-level menus, time-of-day routing, holiday schedules and warm transfers — configured in minutes.",
    variant: "slate" as const,
  },
  {
    icon: BarChart3,
    title: "Conversation Intelligence",
    body: "Transcription, sentiment scoring, keyword spotting and team analytics surfaced inside your dashboard.",
    variant: "slate" as const,
  },
  {
    icon: Repeat2,
    title: "Call Routing & Forwarding",
    body: "Ring groups, sequential failover, geographic routing, simultaneous ring and voicemail-to-email.",
    variant: "slate" as const,
  },
  {
    icon: ShieldCheck,
    title: "Compliance & Security",
    body: "STIR/SHAKEN verification, HIPAA-ready call recording, encrypted voice, GDPR-compliant data residency.",
    variant: "slate" as const,
  },
  {
    icon: Globe,
    title: "Wholesale Voice",
    body: "A-Z termination, DID provisioning, carrier interconnect and SIP peering for telcos and resellers.",
    variant: "blue" as const,
  },
]

const PLANS = [
  {
    title: "Starter",
    desc: "1 local number, unlimited inbound, 500 outbound minutes, SMS included. Perfect for solopreneurs.",
    href: "/pricing",
  },
  {
    title: "Business",
    desc: "5 numbers, unlimited inbound/outbound, AI receptionist, call recording and team analytics.",
    href: "/pricing",
  },
  {
    title: "Enterprise",
    desc: "Unlimited numbers, dedicated SIP trunk, custom SLA, SSO, HIPAA BAA and a dedicated CSM.",
    href: "/contact",
  },
]

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans">
      <MegaNav />

      <PageHero
        eyebrow="Our services"
        h1="Every communication layer your business needs — one platform"
        sub="From a single virtual number to enterprise-grade voice infrastructure, Twiching scales with you from day one."
        primaryCta={{ label: "Start free trial", href: "/pricing" }}
        secondaryCta={{ label: "Talk to sales", href: "/contact" }}
        trustItems={["No credit card required", "14-day free trial", "Cancel anytime"]}
      />

      <StatBar
        stats={[
          { value: "9",      label: "Core services",        note: "fully integrated" },
          { value: "50+",    label: "Countries",            note: "local numbers" },
          { value: "99.99%", label: "Voice uptime SLA",     note: "contractual" },
          { value: "3 min",  label: "Time to first call",   note: "from signup" },
        ]}
      />

      {/* Service grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <SectionHeading
          eyebrow="What we offer"
          h2="Built for the full communications stack"
          sub="Mix and match the services your team needs. Add more as you grow."
        />
        <ValueGrid items={SERVICES} cols={3} />
      </section>

      {/* Feature split — Phone numbers */}
      <section className="bg-gray-50/60 border-y border-gray-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
          <FeatureSplit
            eyebrow="Phone numbers"
            heading="A local number in any area code — instantly"
            body="Virtual numbers give your business nationwide presence without a physical office. Route calls to any device, anywhere in the world."
            points={[
              "50+ country coverage with local area codes",
              "Instant provisioning — no porting wait",
              "STIR/SHAKEN registered for maximum answer rates",
              "Port existing numbers in 3-5 business days",
            ]}
            cta={{ label: "Explore phone numbers", href: "/phone-numbers" }}
            image={{ alt: "Virtual phone number dashboard" }}
          />
          <FeatureSplit
            eyebrow="Messaging"
            heading="SMS that actually delivers"
            body="10DLC-registered campaigns, two-way conversations and bulk broadcast — all managed from a single inbox with full delivery analytics."
            points={[
              "10DLC and toll-free SMS registration handled for you",
              "Bulk broadcast up to 500,000 recipients",
              "Two-way inbox with team assignment",
              "Webhooks and REST API for automation",
            ]}
            cta={{ label: "Explore messaging", href: "/messaging" }}
            image={{ alt: "SMS messaging dashboard" }}
            reverse
          />
        </div>
      </section>

      {/* Plans / tiers */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <SectionHeading
          eyebrow="Pricing tiers"
          h2="Simple plans that scale with your team"
          sub="Start free. Upgrade when you need more."
        />
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mt-2">
          {PLANS.map(({ title, desc, href }) => (
            <a
              key={title}
              href={href}
              className="group block rounded-2xl border border-gray-100 bg-white p-7 hover:border-accent/40 hover:shadow-md transition-all"
            >
              <p className="text-[10px] font-mono font-bold tracking-[2px] uppercase text-accent mb-3">{title}</p>
              <p className="text-[14px] text-gray-600 leading-relaxed mb-5">{desc}</p>
              <span className="text-[13px] font-semibold text-accent group-hover:underline">
                View plan details
              </span>
            </a>
          ))}
        </div>
      </section>

      <RelatedCards
        heading="Explore specific products"
        cards={[
          { title: "Virtual Phone Numbers", desc: "Local numbers in any area code, routed to any device.", href: "/phone-numbers/virtual" },
          { title: "Bulk SMS",              desc: "Send campaigns to thousands with 98%+ delivery rates.",   href: "/messaging/bulk-sms" },
          { title: "SIP Termination",       desc: "Carrier-grade SIP trunking for your existing PBX.",       href: "/voice/sip-termination" },
        ]}
      />

      <FinalCta />

      <Footer />
    </div>
  )
}
