"use client"

import {
  ArrowRight,
  Check,
  Building2,
  Globe,
  BarChart3,
  ShieldCheck,
  Zap,
  Users,
  PhoneCall,
  Package,
  TrendingDown,
  Clock,
  MessageSquare,
} from "lucide-react"
import { motion } from "framer-motion"
import { AnnouncementBar } from "@/components/announcement-bar"
import { MegaNav } from "@/components/mega-nav"
import { Footer } from "@/components/footer"
import { Testimonials } from "@/components/testimonials"
import { Faq } from "@/components/faq"
import { FinalCta } from "@/components/final-cta"

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28, filter: "blur(4px)" },
  animate: { opacity: 1, y: 0, filter: "blur(0px)" },
  transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1], delay },
})

/* ─── DATA ──────────────────────────────────────────────────────── */

const WHO_FOR = [
  { Icon: PhoneCall, label: "Contact centers", desc: "Processing high monthly call volumes. Retail rates are eating your margin." },
  { Icon: Building2, label: "MVNOs & resellers", desc: "Resell voice termination under your own brand at volume economics." },
  { Icon: Package, label: "UCaaS platforms", desc: "Embed carrier-grade voice into your product without building a carrier." },
  { Icon: Globe, label: "Multi-country operations", desc: "Businesses with global dial requirements and no desire to manage 12 carriers." },
]

const OLD_VS_NEW = [
  { old: "Multi-year contracts with minimum commitments", new_: "Month-to-month with volume-based pricing" },
  { old: "Credit checks that gate mid-market operators", new_: "Accessible to businesses across call volume ranges" },
  { old: "Support that ignores you unless you&apos;re a top-10 client", new_: "Dedicated account management for all wholesale customers" },
  { old: "Opaque per-minute rates buried in PDFs", new_: "Transparent rate sheets available on request" },
  { old: "Single carrier dependency — one failure takes you down", new_: "Multi-carrier redundancy built in by default" },
]

const STATS = [
  { value: "190+", label: "Countries covered", Icon: Globe },
  { value: "99.999%", label: "Uptime SLA", Icon: ShieldCheck },
  { value: "50K+", label: "Minutes/mo handled", Icon: BarChart3 },
  { value: "<14ms", label: "Route latency p95", Icon: Zap },
]

const FAQS = [
  { q: "What is the minimum volume for wholesale pricing?", a: "Contact us. We work with operations across a range of volumes — from mid-market contact centers to high-volume carriers." },
  { q: "Is there a reseller program?", a: "Yes. Resellers can white-label Twiching SIP termination and voice services under their own brand. Ask us for a reseller agreement." },
  { q: "What countries are covered?", a: "Global coverage across 190+ countries. Specific rate sheets are available on request for your target markets." },
  { q: "Are there minimum commitment requirements?", a: "We offer flexible arrangements. Long-term commitments can unlock deeper rate tiers, but month-to-month is also available." },
  { q: "How does billing work for wholesale?", a: "Per-minute billing with volume thresholds. Rate sheets provided before activation. No surprise overage tiers." },
  { q: "What SLA covers the wholesale service?", a: "99.999% uptime on carrier-grade infrastructure. Redundant routes. Real status page. Dedicated support for wholesale accounts." },
]

const TESTIMONIALS = [
  {
    quote: "We run 50,000 minutes a month. Our previous provider treated us like a small business. Twiching treats us like the volume account we are.",
    name: "Michael Osei",
    role: "CEO · CallBridge Solutions",
    initial: "M",
  },
  {
    quote: "Embedded Twiching voice into our UCaaS product in two weeks. Our customers can&apos;t tell the difference — except the calls actually connect.",
    name: "Priya Agarwal",
    role: "CTO · CloudTalk Platform",
    initial: "P",
  },
  {
    quote: "The rate sheet was real. The support was real. It&apos;s rare to find a wholesale provider that does both.",
    name: "Dan Kowalski",
    role: "VP Ops · Nexus BPO",
    initial: "D",
  },
]

/* ─── Page ──────────────────────────────────────────────────────── */

export default function VoipWholesalePage() {
  return (
    <>
      <AnnouncementBar />
      <MegaNav />
      <main>

        {/* ── HERO: FULL-BLEED DARK ────────────────────────────── */}
        <section className="relative overflow-hidden bg-black text-white min-h-[620px] flex flex-col justify-center">
          {/* Background image */}
          <div className="absolute inset-0">
            <img
              src="/images/voip-wholesale-hero.jpg"
              alt=""
              aria-hidden="true"
              className="w-full h-full object-cover opacity-25"
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.5) 50%, rgba(0,0,0,0.95) 100%)",
              }}
            />
          </div>

          {/* Grid overlay */}
          <div
            aria-hidden="true"
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage:
                "linear-gradient(rgba(26,188,217,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(26,188,217,0.5) 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />

          <div className="relative max-w-7xl mx-auto px-4 pb-[25] sm:px-6 lg:px-8 w-full">
            <div className="max-w-[900px] pt-10">

              {/* Tag */}
              <motion.div {...fadeUp(0)} className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-[#95d9e8] text-xs font-semibold font-mono px-4 py-[6px] rounded-full mb-8">
                <TrendingDown className="h-3 w-3" strokeWidth={2.2} />
                WHOLESALE RATES · CARRIER-GRADE · SCALABLE VOLUME
              </motion.div>

              <motion.h1 {...fadeUp(0.12)} className="text-4xl sm:text-5xl lg:text-6xl font-semibold leading-[1.06] tracking-tight text-white text-balance mb-7">
                VoIP wholesale rates.{" "}
                <span className="text-[#1abcd9] italic">Without the carrier runaround.</span>
              </motion.h1>

              <motion.p {...fadeUp(0.26)} className="text-[18px] sm:text-[20px] text-gray-300 font-mono leading-relaxed max-w-[680px] mb-3">
                Scalable wholesale routing for businesses running serious volume.
              </motion.p>
              <motion.p {...fadeUp(0.34)} className="text-[15px] text-gray-500 font-mono leading-relaxed max-w-[620px] mb-12">
                The call center runs 50,000 minutes a month. They&apos;re paying retail rates designed for a 20-person office. Volume deserves volume pricing — and volume pricing deserves carrier-grade infrastructure behind it.
              </motion.p>

              <motion.div {...fadeUp(0.44)} className="flex flex-wrap items-center gap-3 mb-14">
                <a
                  href="#"
                  className="group inline-flex items-center gap-2 bg-white text-black text-[15px] font-semibold font-mono pl-6 pr-2 py-2.5 rounded-full hover:bg-gray-100 transition-colors"
                >
                  Contact us for wholesale pricing
                  <span className="grid place-items-center h-8 w-8 rounded-full bg-black/10 transition-transform group-hover:translate-x-0.5">
                    <ArrowRight className="h-4 w-4" strokeWidth={2.2} />
                  </span>
                </a>
                <a
                  href="/voice/contact-center"
                  className="inline-flex items-center gap-2 bg-white/10 backdrop-blur text-white border border-white/20 text-[15px] font-semibold font-mono px-6 py-2.5 rounded-full hover:bg-white/20 transition-colors"
                >
                  See contact center tools
                </a>
              </motion.div>

              {/* Inline stats — staggered */}
              <motion.div
                initial="hidden"
                animate="show"
                variants={{
                  hidden: {},
                  show: { transition: { staggerChildren: 0.1, delayChildren: 0.58 } },
                }}
                className="flex flex-wrap gap-6"
              >
                {STATS.map(({ value, label, Icon }) => (
                  <motion.div
                    key={label}
                    variants={{
                      hidden: { opacity: 0, y: 14, filter: "blur(4px)" },
                      show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
                    }}
                    className="flex items-center gap-2.5"
                  >
                    <div className="w-8 h-8 rounded-lg bg-white/10 grid place-items-center">
                      <Icon className="h-3.5 w-3.5 text-[#1abcd9]" strokeWidth={1.8} />
                    </div>
                    <div>
                      <div className="font-mono text-[13px] font-bold text-white">{value}</div>
                      <div className="font-mono text-[10px] text-gray-500">{label}</div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>

            </div>
          </div>
        </section>

        {/* ── WHO IT'S FOR ─────────────────────────────────────── */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-7xl mx-auto">
            <p className="text-[10px] font-mono font-bold tracking-[2px] uppercase text-accent mb-3">Who wholesale VoIP is for</p>
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-gray-900 mb-12 max-w-[620px] text-balance">
              Built for operators who outgrew retail pricing.
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {WHO_FOR.map(({ Icon, label, desc }) => (
                <div
                  key={label}
                  className="group rounded-3xl p-7 bg-white ring-1 ring-gray-200/70 hover:ring-accent/25 hover:shadow-[0_20px_40px_-28px_rgba(26,188,217,0.25)] transition-all"
                >
                  <div className="w-12 h-12 rounded-2xl bg-[#e0f7fa] text-accent grid place-items-center mb-5">
                    <Icon className="h-5 w-5" strokeWidth={1.8} />
                  </div>
                  <h3 className="font-serif text-[18px] font-bold text-gray-900 mb-2">{label}</h3>
                  <p className="text-[13px] text-gray-500 font-mono leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── OLD WAY VS NEW WAY ───────────────────────────────── */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-950 text-white">
          <div className="max-w-7xl mx-auto">
            <p className="text-[10px] font-mono font-bold tracking-[2px] uppercase text-[#1abcd9] mb-3">What makes it different</p>
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-white mb-5 max-w-[620px] text-balance">
              Traditional wholesale VoIP means navigating gatekeepers. Twiching doesn&apos;t.
            </h2>
            <p className="text-[15px] text-gray-400 font-mono leading-relaxed max-w-[560px] mb-14">
              Mid-market and enterprise buyers need wholesale economics without the multi-year lock-in and credit checks designed for companies 10× their size.
            </p>

            <div className="rounded-3xl overflow-hidden ring-1 ring-white/8">
              {/* Header */}
              <div className="grid grid-cols-2 bg-white/10 border-b border-white/20">
                <div className="px-6 py-4 text-[11px] font-mono font-bold tracking-[2px] uppercase text-gray-400">The old way</div>
                <div className="px-6 py-4 text-[11px] font-mono font-bold tracking-[2px] uppercase text-[#1abcd9] border-l border-white/20">The Twiching way</div>
              </div>
              {OLD_VS_NEW.map(({ old, new_ }, i) => (
                <div
                  key={i}
                  className={`grid grid-cols-2 border-b border-white/10 last:border-0 ${i % 2 === 0 ? "bg-white/5" : ""}`}
                >
                  <div className="px-6 py-5 flex items-start gap-3">
                    <div className="mt-1 w-4 h-4 rounded-full bg-red-500/20 grid place-items-center flex-shrink-0">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
                    </div>
                    <p className="text-[13px] font-mono text-gray-400 leading-relaxed" dangerouslySetInnerHTML={{ __html: old }} />
                  </div>
                  <div className="px-6 py-5 flex items-start gap-3 border-l border-white/5">
                    <Check className="mt-0.5 h-4 w-4 text-[#1abcd9] flex-shrink-0" strokeWidth={2.5} />
                    <p className="text-[13px] font-mono text-gray-200 leading-relaxed">{new_}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── COVERAGE STATS STRIP ─────────────────────────────── */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-accent text-white">
          <div className="max-w-[1300px] mx-auto">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { value: "190+", label: "Countries", sub: "Global rate sheets on request" },
                { value: "99.999%", label: "Uptime SLA", sub: "Real status page, real SLA" },
                { value: "Tier-1", label: "Routing", sub: "No reseller-of-reseller chains" },
                { value: "Multi-carrier", label: "Redundancy", sub: "Built-in failover, no single point" },
              ].map(({ value, label, sub }) => (
                <div key={label} className="text-center">
                  <div className="font-serif text-[36px] sm:text-[44px] font-bold text-white leading-none">{value}</div>
                  <div className="text-[12px] font-mono font-bold tracking-wide uppercase text-[#b2e8f0] mt-2">{label}</div>
                  <div className="text-[11px] text-[#e0f7fa]/70 font-mono mt-1">{sub}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── VOLUME TIERS ─────────────────────────────────────── */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-7xl mx-auto">
            <p className="text-[10px] font-mono font-bold tracking-[2px] uppercase text-accent mb-3">Pricing approach</p>
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-gray-900 mb-5 max-w-[560px] text-balance">
              Rate structure built around your volume, not theirs.
            </h2>
            <p className="text-[15px] text-gray-500 font-mono leading-relaxed max-w-[580px] mb-14">
              We don&apos;t publish a rate card here — wholesale is always a conversation about your specific routes, volumes, and regions. What we can tell you: transparent, per-minute billing with no surprise overage tiers.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-10">
              {[
                {
                  tier: "Mid-market",
                  desc: "Contact centers, BPOs, and businesses with growing monthly minutes. Volume pricing without minimum-commitment gatekeeping.",
                  points: ["Flexible monthly minimums", "Domestic + international routes", "Dedicated onboarding support"],
                  cta: "Start a conversation",
                  featured: false,
                },
                {
                  tier: "Reseller",
                  desc: "MVNOs and resellers embedding voice under their own brand. White-label SIP termination with your margins built in.",
                  points: ["White-label SIP endpoints", "Custom rate agreements", "API access for provisioning", "Reseller portal"],
                  cta: "Ask about reseller rates",
                  featured: true,
                },
                {
                  tier: "Enterprise / Carrier",
                  desc: "UCaaS platforms and carriers routing millions of minutes monthly. Infrastructure-grade agreements with SLA teeth.",
                  points: ["Custom SLA with credits", "Dedicated technical account manager", "Multi-carrier redundancy", "Rate locks available"],
                  cta: "Talk to our team",
                  featured: false,
                },
              ].map(({ tier, desc, points, cta, featured }) => (
                <div
                  key={tier}
                  className={`rounded-2xl p-6 flex flex-col ${featured
                      ? "bg-black text-white ring-1 ring-accent/40 shadow-[0_30px_60px_-30px_rgba(26,188,217,0.5)]"
                      : "bg-white ring-1 ring-gray-200/70 hover:ring-accent/20 hover:shadow-[0_20px_40px_-28px_rgba(26,188,217,0.2)] transition-all"
                    }`}
                >
                  {featured && (
                    <div className="inline-flex items-center gap-1 bg-accent text-white text-[10px] font-bold px-2.5 py-[3px] rounded-full font-mono self-start mb-3">
                      Most requested
                    </div>
                  )}
                  <h3 className={`font-serif text-[19px] font-bold mb-2 ${featured ? "text-white" : "text-gray-900"}`}>{tier}</h3>
                  <p className={`text-[12px] font-mono leading-relaxed mb-4 flex-1 ${featured ? "text-gray-400" : "text-gray-500"}`}>{desc}</p>
                  <ul className="space-y-1.5 mb-5">
                    {points.map((p) => (
                      <li key={p} className="flex items-start gap-2">
                        <Check className={`h-3 w-3 mt-0.5 flex-shrink-0 ${featured ? "text-[#1abcd9]" : "text-accent"}`} strokeWidth={2.5} />
                        <span className={`text-[12px] font-mono ${featured ? "text-gray-300" : "text-gray-600"}`}>{p}</span>
                      </li>
                    ))}
                  </ul>
                  <a
                    href="#"
                    className={`inline-flex items-center justify-center gap-2 text-[13px] font-semibold font-mono px-5 py-2.5 rounded-full transition-colors ${featured
                        ? "bg-accent text-white hover:bg-[#1797ac]"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                  >
                    {cta}
                    <ArrowRight className="h-3.5 w-3.5" strokeWidth={2.2} />
                  </a>
                </div>
              ))}
            </div>

            <p className="text-[12px] text-gray-400 font-mono text-center">
              All wholesale pricing discussed directly with our team. <a href="#" className="text-accent hover:underline">Contact us</a> to get started.
            </p>
          </div>
        </section>

        {/* ── WHAT YOU GET STRIP ───────────────────────────────── */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {[
                { Icon: ShieldCheck, title: "Carrier-grade routing", body: "Tier-1 carrier connections. No reseller chains. Your calls don't bounce around three middlemen before hitting the PSTN." },
                { Icon: TrendingDown, title: "Volume economics", body: "Per-minute wholesale rates that scale with your usage. The more you route, the more the economics make sense." },
                { Icon: Clock, title: "Fast provisioning", body: "SIP credentials and rate sheets delivered quickly. No 6-week enterprise procurement process." },
                { Icon: MessageSquare, title: "Real support", body: "Wholesale accounts get dedicated support. Not a ticket queue that treats you like a 5-seat trial user." },
              ].map(({ Icon, title, body }) => (
                <div key={title} className="rounded-2xl bg-white ring-1 ring-gray-200 p-6 hover:ring-accent/20 hover:shadow-md transition-all">
                  <div className="w-10 h-10 rounded-xl bg-[#e0f7fa] text-accent grid place-items-center mb-4">
                    <Icon className="h-4 w-4" strokeWidth={1.8} />
                  </div>
                  <h3 className="font-serif text-[17px] font-bold text-gray-900 mb-2">{title}</h3>
                  <p className="text-[12px] text-gray-500 font-mono leading-relaxed">{body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── TESTIMONIALS ─────────────────────────────────────── */}
        <Testimonials
          quotes={TESTIMONIALS}
          eyebrow="What wholesale customers say"
          heading="High-volume operators who stopped paying retail rates."
        />

        {/* ── FAQ ──────────────────────────────────────────────── */}
        <Faq items={FAQS} heading="VoIP wholesale — questions answered." />

        {/* ── FINAL CTA ────────────────────────────────────────── */}
        <FinalCta
          eyebrow="Get wholesale rates"
          heading="Running serious volume? Get pricing that reflects it."
          sub="Wholesale VoIP rates for contact centers, carriers, UCaaS platforms, and resellers. Transparent per-minute billing. Carrier-grade infrastructure."
          primaryLabel="Contact us for wholesale pricing"
          primaryHref="#"
          secondaryLabel="See contact center tools"
          secondaryHref="/voice/contact-center"
        />

      </main>
      <Footer />
    </>
  )
}
