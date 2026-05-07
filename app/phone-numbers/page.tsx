import { Metadata } from "next"
import { PageLayout } from "@/components/page-layout"
import {
  PageHero, SectionHeading, RelatedCards,
} from "@/components/page-parts"
import { FinalCta } from "@/components/final-cta"
import { Faq } from "@/components/faq"
import {
  Globe, MapPin, Sparkles, Briefcase, Smartphone, ArrowRight, Check,
  PhoneCall, MessageSquare, Shield, Zap,
} from "lucide-react"

export const metadata: Metadata = {
  title: "Business Phone Numbers · Virtual, Local, Vanity & More | Twiching",
  description:
    "Five number types in one account. Virtual, local, vanity, business, second numbers. 14-day free trial.",
}

const NUMBER_TYPES = [
  {
    Icon: Globe,
    label: "Virtual Phone Number",
    href: "/phone-numbers/virtual-number",
    best: "Remote teams, expanding businesses, distributed operations",
    desc: "Nationwide connectivity without a physical office. Route to any device from any area code.",
  },
  {
    Icon: MapPin,
    label: "Local Phone Number",
    href: "/phone-numbers/local",
    best: "Sales teams, real estate, regional businesses",
    desc: "A specific area code matching your target market — 212 Manhattan, 305 Miami, 415 Bay Area.",
  },
  {
    Icon: Sparkles,
    label: "Vanity Phone Number",
    href: "/phone-numbers/vanity",
    best: "Consumer brands, advertisers, recall-dependent industries",
    desc: "A number customers actually remember. 1-800-FLOWERS works. 212-555-8391 doesn't.",
  },
  {
    Icon: Briefcase,
    label: "Business Phone Number",
    href: "/phone-numbers/business",
    best: "Consultants, small firms, owner-operators",
    desc: "A dedicated professional line. Separate from personal. Routes to any device.",
  },
  {
    Icon: Smartphone,
    label: "Second Phone Number",
    href: "/phone-numbers/second-number",
    best: "Freelancers, agents, side-hustle owners",
    desc: "Work and life on one phone. Two numbers. No second SIM.",
  },
]

const CAPABILITIES = [
  { Icon: PhoneCall,      label: "Inbound call routing",       desc: "Route calls to any device — mobile, softphone, or SIP." },
  { Icon: MessageSquare,  label: "Two-way SMS",                desc: "Every number supports inbound and outbound text messaging." },
  { Icon: Shield,         label: "STIR/SHAKEN",                desc: "Outbound calls carry attestation to reduce spam flags." },
  { Icon: Zap,            label: "Instant provisioning",       desc: "Most numbers activate within minutes, not business days." },
]

const HOW_IT_WORKS = [
  { step: "01", title: "Choose your number type", body: "Pick from virtual, local, vanity, business, or second number — or add all five from one account." },
  { step: "02", title: "Select your area code",   body: "Nationwide coverage. Pick any area code that matches your market or brand." },
  { step: "03", title: "Configure routing",       body: "Route calls to a mobile, desktop, desk phone, or SIP device. Add IVR and voicemail in minutes." },
  { step: "04", title: "Start taking calls",      body: "Number activates within 24 hours — most instantly. No hardware. No technician visit." },
]

const FAQS = [
  {
    q: "Can I have multiple number types on one account?",
    a: "Yes. Most businesses use 2–3 types. A consultant might have a business number for clients and a second number for public listings.",
  },
  {
    q: "Do I need a separate plan for each number?",
    a: "No. Numbers attach to user seats. One plan, multiple numbers per seat where needed.",
  },
  {
    q: "Can I port existing numbers?",
    a: "Yes. Porting supported for all types. Domestic ports typically complete in 5–10 business days.",
  },
  {
    q: "Do all number types support SMS?",
    a: "Yes. Every Twiching number supports two-way SMS messaging out of the box.",
  },
]

const RELATED = [
  { title: "Voice termination",    desc: "Carrier-grade call routing with STIR/SHAKEN compliance.",       href: "/voice" },
  { title: "SMS gateway",          desc: "Multi-channel messaging from the same account as your numbers.", href: "/messaging/sms-gateway" },
  { title: "Contact center tools", desc: "Inbound and outbound tools for teams of any size.",              href: "/voice/contact-center" },
]

export default function PhoneNumbersHub() {
  return (
    <PageLayout>
      <PageHero
        eyebrow="Phone Numbers"
        h1="A number for every way your business actually communicates."
        sub="Five number types. One account. Pick what fits — or use all five."
        trustItems={["5 number types", "Instant provisioning", "Porting supported", "STIR/SHAKEN"]}
        primaryCta={{ label: "Start free trial", href: "/pricing" }}
        secondaryCta={{ label: "See pricing", href: "/pricing" }}
      />

      {/* ── Social proof / trust bar ─────────────────────────────── */}
      <section className="border-y border-gray-100 bg-gray-50 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap items-center justify-center gap-x-10 gap-y-3">
          {["190+ countries covered", "STIR/SHAKEN certified", "14-day free trial", "No hardware required", "Porting supported"].map((item) => (
            <span key={item} className="flex items-center gap-2 text-[13px] text-gray-500 font-medium">
              <Check className="h-3.5 w-3.5 text-accent flex-shrink-0" strokeWidth={2.5} />
              {item}
            </span>
          ))}
        </div>
      </section>

      {/* ── Opening copy ─────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-[680px] space-y-4 text-base text-gray-600 leading-relaxed">
          <p>Different conversations need different numbers.</p>
          <p>
            A vanity line for your TV spot. A local area code for the market you&apos;re expanding into.
            A business number for your team. A second number so your personal mobile stops being a listing contact.
          </p>
          <p>Most providers make you pick one. Twiching gives you all five — from one account.</p>
        </div>
      </section>

      {/* ── Five number types ────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t border-gray-100">
        <SectionHeading
          eyebrow="Number types"
          h2="The five number types"
          sub="Every type provisioned from the same account, the same dashboard, the same bill."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {NUMBER_TYPES.map(({ Icon, label, href, best, desc }) => (
            <a
              key={href}
              href={href}
              className="group block p-7 rounded-2xl border border-gray-200 bg-white shadow-sm hover:shadow-md hover:border-[#95d9e8]/70 transition-all"
            >
              <span className="w-10 h-10 rounded-xl bg-[#e0f7fa] text-accent grid place-items-center mb-5 group-hover:bg-accent group-hover:text-white transition-colors">
                <Icon className="h-5 w-5" strokeWidth={1.8} />
              </span>
              <h3 className="font-semibold text-[16px] text-gray-900 mb-1.5">{label}</h3>
              <p className="text-[13px] text-gray-600 leading-relaxed mb-3">{desc}</p>
              <p className="text-[11px] text-gray-400 mb-4">
                <strong className="text-gray-600">Best for:</strong> {best}
              </p>
              <span className="inline-flex items-center gap-1.5 text-accent text-[12px] font-semibold">
                Learn more{" "}
                <ArrowRight className="h-3 w-3 group-hover:translate-x-0.5 transition-transform" />
              </span>
            </a>
          ))}
        </div>
      </section>

      {/* ── Core capabilities ────────────────────────────────────── */}
      <section className="bg-gray-50 border-y border-gray-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Every number type"
            h2="What every number includes"
            sub="These capabilities are standard — not add-ons — on every number type."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {CAPABILITIES.map(({ Icon, label, desc }) => (
              <div key={label} className="rounded-2xl border border-gray-200 bg-white shadow-sm p-6">
                <div className="w-10 h-10 rounded-xl bg-[#e0f7fa] text-accent grid place-items-center mb-4">
                  <Icon className="h-5 w-5" strokeWidth={1.8} />
                </div>
                <h3 className="font-semibold text-[15px] text-gray-900 mb-2">{label}</h3>
                <p className="text-[13px] text-gray-600 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How it works ─────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <SectionHeading
          eyebrow="Setup"
          h2="How to get a number"
          sub="From signup to taking calls in under 24 hours."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {HOW_IT_WORKS.map(({ step, title, body }) => (
            <div key={step} className="relative">
              <div className="text-[11px] font-mono font-bold text-accent tracking-[2px] mb-3">{step}</div>
              <h3 className="font-semibold text-[16px] text-gray-900 mb-2">{title}</h3>
              <p className="text-[13px] text-gray-600 leading-relaxed">{body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Differentiation block ────────────────────────────────── */}
      <section className="bg-gray-950 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-[10px] font-mono font-bold tracking-[2px] uppercase text-[#1abcd9] mb-4">Why Twiching</p>
              <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-white text-balance leading-tight mb-5">
                One account. Five number types. Zero juggling.
              </h2>
              <p className="text-base text-gray-400 leading-relaxed mb-8">
                Most providers lock you into one number type or require separate accounts for each. Twiching gives you
                virtual, local, vanity, business, and second numbers — all provisioned, routed, and billed from a single
                dashboard.
              </p>
              <a
                href="/pricing"
                className="inline-flex items-center gap-2 bg-accent text-white text-[15px] font-semibold px-6 py-3 rounded-lg hover:bg-[#1797ac] transition-colors"
              >
                See pricing <ArrowRight className="h-4 w-4" />
              </a>
            </div>
            <div className="grid grid-cols-1 gap-4">
              {[
                { old: "Separate accounts per number type", twiching: "All five types from one account" },
                { old: "Month-long porting windows",        twiching: "5–10 day domestic port completion" },
                { old: "Hardware required for provisioning", twiching: "Software-only, route to any device" },
                { old: "Manual setup per additional number", twiching: "Add numbers instantly from dashboard" },
              ].map(({ old, twiching }) => (
                <div key={old} className="grid grid-cols-2 gap-4">
                  <div className="flex items-start gap-2 text-[13px] text-gray-500">
                    <span className="mt-1 w-3 h-3 rounded-full bg-red-500/20 grid place-items-center flex-shrink-0">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
                    </span>
                    {old}
                  </div>
                  <div className="flex items-start gap-2 text-[13px] text-gray-200">
                    <Check className="h-3.5 w-3.5 text-[#1abcd9] flex-shrink-0 mt-0.5" strokeWidth={2.5} />
                    {twiching}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Faq />
      <RelatedCards heading="Related pages" cards={RELATED} />
      <FinalCta />
    </PageLayout>
  )
}
