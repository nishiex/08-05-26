import { MegaNav } from "@/components/mega-nav"
import { Footer } from "@/components/footer"
import {
  PageHero, SectionHeading, StatBar, ValueGrid,
  FeatureSplit, ImageSlot,
} from "@/components/page-parts"
import { FinalCta } from "@/components/final-cta"
import {
  Globe, ShieldCheck, Zap, Users, HeartHandshake,
  ServerCrash, Building2, Lightbulb,
} from "lucide-react"

export const metadata = {
  title: "About Twiching — Modern Business Communications",
  description:
    "Learn how Twiching is building the next generation of business phone, voice and messaging infrastructure — anchored in Singapore, trusted worldwide.",
}

const VALUES = [
  {
    icon: ShieldCheck,
    title: "Trust first",
    body: "STIR/SHAKEN verified numbers, end-to-end encryption, HIPAA-ready architecture. We treat your calls like you treat your customers.",
  },
  {
    icon: Zap,
    title: "Speed over ceremony",
    body: "Provision a number, route a call, deploy a campaign — all in minutes, not days. No tickets. No waiting.",
  },
  {
    icon: Globe,
    title: "Global reach",
    body: "Local numbers across 50+ countries from a single dashboard. Your customers hear a familiar area code every time.",
  },
  {
    icon: HeartHandshake,
    title: "Humans behind the API",
    body: "Real support from engineers who have built telecom infrastructure. Not chatbots. Not tier-1 scripts.",
  },
  {
    icon: ServerCrash,
    title: "Built for uptime",
    body: "99.99% SLA backed by multi-region failover. Singapore-primary infrastructure with global PoPs.",
  },
  {
    icon: Lightbulb,
    title: "Opinionated defaults",
    body: "Smart defaults so your first call just works. Advanced controls when you need them — never in the way.",
  },
]

const TEAM = [
  { name: "Aryan Shah",    role: "CEO & Co-founder",      note: "Previously VP Infra at a Tier-1 carrier" },
  { name: "Mei Lin Tan",   role: "CTO & Co-founder",      note: "10 yrs building VoIP infrastructure" },
  { name: "James Okafor",  role: "Head of Engineering",   note: "Ex-AWS, distributed systems" },
  { name: "Priya Nair",    role: "Head of Product",        note: "Ex-Twilio, enterprise UCaaS" },
  { name: "Lucas Ferreira",role: "Head of Sales",          note: "Built APAC telecom partnerships" },
  { name: "Aiko Watanabe", role: "Head of Customer Success", note: "NPS-obsessed, former SRE" },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans">
      <MegaNav />

      {/* Hero */}
      <PageHero
        eyebrow="About Twiching"
        h1="Communications infrastructure built for modern businesses"
        sub="We started Twiching because business phone systems were stuck in the 90s — complex, expensive, and locked to hardware. We are changing that."
        primaryCta={{ label: "Start free trial", href: "/pricing" }}
        secondaryCta={{ label: "Contact us", href: "/contact" }}
      />

      {/* Stats */}
      <StatBar
        stats={[
          { value: "50+",    label: "Countries covered",       note: "local numbers everywhere" },
          { value: "99.99%", label: "Uptime SLA",              note: "backed by contract" },
          { value: "14ms",   label: "Median call latency",     note: "p95 global" },
          { value: "2019",   label: "Founded in Singapore",    note: "Twiching Pte. Ltd." },
        ]}
      />

      {/* Mission */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <SectionHeading
              eyebrow="Our mission"
              h2="Phone infrastructure that gets out of your way"
              sub="Every company deserves a phone system as reliable and simple as sending an email. We build the infrastructure layer so your team can focus on talking to customers — not managing telephony."
            />
            <p className="text-base text-gray-500 leading-relaxed mt-4">
              Twiching is headquartered in Singapore with infrastructure anchored in Equinix SG1.
              We serve startups, scale-ups and enterprises across APAC, Europe and the Americas —
              from a single freelancer needing a local number to Fortune 500 teams routing
              10,000 concurrent calls.
            </p>
          </div>
          <ImageSlot alt="Twiching Singapore HQ" aspect="aspect-[4/3]" />
        </div>
      </section>

      {/* Values */}
      <section className="bg-gray-50/60 border-y border-gray-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="What we believe"
            h2="Our values"
            sub="Six principles that shape every product decision we make."
            align="center"
          />
          <ValueGrid items={VALUES} cols={3} />
        </div>
      </section>

      {/* Team */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <SectionHeading
          eyebrow="The team"
          h2="Built by people who live and breathe telecom"
          sub="Deep carrier expertise meets modern software engineering."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-2">
          {TEAM.map(({ name, role, note }) => (
            <div
              key={name}
              className="rounded-2xl border border-gray-100 bg-white p-6 hover:border-accent/30 hover:shadow-sm transition-all"
            >
              {/* Avatar placeholder */}
              <div className="w-12 h-12 rounded-full bg-gray-100 mb-4 flex items-center justify-center">
                <Users className="h-5 w-5 text-gray-400" strokeWidth={1.8} />
              </div>
              <p className="font-semibold text-[15px] text-gray-900">{name}</p>
              <p className="text-[13px] text-accent font-mono mt-0.5">{role}</p>
              <p className="text-[12px] text-gray-400 mt-2 leading-relaxed">{note}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Backed by / investors strip */}
      <section className="border-t border-gray-100 bg-gray-50/40 py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-[10px] font-mono font-bold tracking-[2px] uppercase text-gray-400 mb-8">
            Infrastructure partners
          </p>
          <div className="flex flex-wrap items-center justify-center gap-10">
            {["Equinix", "AWS", "Cloudflare", "Twilio Ecosystem", "APNIC"].map((name) => (
              <span
                key={name}
                className="text-[13px] font-mono font-semibold text-gray-400 hover:text-gray-700 transition-colors"
              >
                {name}
              </span>
            ))}
          </div>
        </div>
      </section>

      <FinalCta />

      <Footer />
    </div>
  )
}
