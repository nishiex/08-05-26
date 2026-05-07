"use client"

import { useRef, useEffect } from "react"
import { motion, useInView } from "framer-motion"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { PageLayout } from "@/components/page-layout"
import { PageHero, SectionHeading, RelatedCards, InlineList, DarkBand } from "@/components/page-parts"
import { FinalCta } from "@/components/final-cta"
import { Faq } from "@/components/faq"
import { Users, Phone, BarChart2, MessageSquare, Zap, Target, TrendingUp, Clock, CheckCircle } from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

// ─── Data ────────────────────────────────────────────────────────────────────

const VALUES = [
  { icon: Phone, title: "Local Presence Dialing", body: "Outbound calls show a local area code number matching the prospect's region. Answer rates increase by up to 4× compared to toll-free or out-of-state numbers." },
  { icon: Zap, title: "Auto Dialers", body: "Predictive and power dialers maximize agent talk time. Skip voicemails, busy signals, and disconnected numbers automatically." },
  { icon: BarChart2, title: "Sales Call Analytics", body: "Track calls per rep, average handle time, conversion rate, and connect rate. Coach underperformers with real data, not guesswork." },
  { icon: MessageSquare, title: "SMS Follow-Up Sequences", body: "Send automated SMS follow-ups after a call or demo. Reps stay top-of-mind without manual effort." },
  { icon: Target, title: "CRM Integration", body: "Log every call, text, and voicemail to Salesforce, HubSpot, or Zoho automatically. Keep your pipeline up to date without admin overhead." },
  { icon: Users, title: "Supervisor Coaching Tools", body: "Listen live to rep calls, whisper coaching notes only the rep hears, or barge in on challenging calls. Build better reps faster." },
]

const USE_CASES = [
  { title: "Outbound prospecting", body: "Power through cold call lists with auto dialing and local caller ID. Spend time talking, not waiting for rings." },
  { title: "Post-demo follow-up", body: "Auto-send a personalized SMS follow-up one hour after a demo call. Keep momentum while the prospect is still warm." },
  { title: "Pipeline acceleration", body: "SMS reminders before scheduled calls reduce no-shows. Reps start more demos, close more deals." },
  { title: "New rep onboarding", body: "Supervisors listen to new reps' first calls and whisper real-time coaching tips. Ramp time drops significantly." },
  { title: "Territory management", body: "Assign local numbers to each sales territory. Reps build local brand recognition with consistent caller ID." },
  { title: "CRM call logging", body: "Every call and SMS automatically logged to CRM with duration, recording link, and outcome. Zero manual entry." },
]

const STATS = [
  { value: "4×", label: "higher answer rate with local presence" },
  { value: "60%", label: "less time spent on manual CRM entry" },
  { value: "3×", label: "faster new rep ramp with whisper coaching" },
  { value: "40%", label: "more talk time with auto dialers" },
]

const FAQS = [
  { q: "How does local presence dialing work?", a: "When a rep dials a prospect, Twiching automatically presents a local area code number matching the prospect's area code. This dramatically increases the chance the call is answered." },
  { q: "Does Twiching have a power dialer?", a: "Yes. Auto dialers are available on Enterprise. Predictive dialing queues the next call as the current one ends, maximizing agent talk time." },
  { q: "Which CRMs does Twiching integrate with?", a: "Twiching integrates with Salesforce, HubSpot, Zoho, and other popular CRMs on Professional and Enterprise plans. Call logs, recordings, and dispositions sync automatically." },
  { q: "Can managers listen to calls in real time?", a: "Yes. Supervisor Tools on Professional and Enterprise plans allow live call monitoring, whisper coaching, and call barge to assist reps during challenging conversations." },
]

// ─── Sub-components ──────────────────────────────────────────────────────────

function AnimatedValueCard({
  icon: Icon,
  title,
  body,
  index,
}: {
  icon: React.ElementType
  title: string
  body: string
  index: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.45, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -4, boxShadow: "0 12px 32px -8px rgba(59,130,246,0.13)" }}
      className="group p-6 rounded-2xl border border-gray-100 bg-white transition-colors hover:border-[#95d9e8]/50"
    >
      <motion.div
        className="w-10 h-10 rounded-xl bg-[#e0f7fa] flex items-center justify-center mb-4 transition-colors group-hover:bg-accent"
        whileHover={{ scale: 1.08 }}
      >
        <Icon className="h-5 w-5 text-accent transition-colors group-hover:text-white" strokeWidth={1.8} />
      </motion.div>
      <h3 className="font-semibold text-[15px] text-gray-900 mb-2">{title}</h3>
      <p className="text-[13px] text-gray-600 leading-relaxed">{body}</p>
    </motion.div>
  )
}

function UseCaseCard({
  title,
  body,
  index,
}: {
  title: string
  body: string
  index: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
      className="p-6 rounded-2xl border border-gray-100 bg-white shadow-sm hover:shadow-md hover:border-[#95d9e8]/50 transition-all"
    >
      <p className="font-mono text-[10px] font-bold tracking-[2px] text-gray-300 mb-3">
        {String(index).padStart(2, "0")}
      </p>
      <h3 className="font-semibold text-[15px] text-gray-900 mb-2">{title}</h3>
      <p className="text-[13px] text-gray-600 leading-relaxed">{body}</p>
    </motion.div>
  )
}

function AnimatedStatBar() {
  return (
    <section className="bg-gray-950 py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="text-center"
            >
              <p className="font-serif text-[42px] font-bold text-accent leading-none mb-2">{s.value}</p>
              <p className="font-mono text-[12px] text-gray-400 leading-snug">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function AnimatedFeatureSplit({
  eyebrow,
  heading,
  body,
  items,
  reverse = false,
}: {
  eyebrow: string
  heading: string
  body: string
  items: string[]
  reverse?: boolean
}) {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t border-gray-100">
      <div className={`grid grid-cols-1 lg:grid-cols-2 gap-16 items-center ${reverse ? "lg:direction-rtl" : ""}`}>
        <motion.div
          initial={{ opacity: 0, x: reverse ? 32 : -32 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className={reverse ? "lg:order-2" : ""}
        >
          <p className="font-mono text-[11px] font-bold tracking-[2px] uppercase text-accent mb-3">{eyebrow}</p>
          <h2 className="font-serif text-[32px] sm:text-[38px] font-bold text-gray-900 leading-[1.15] tracking-tight mb-5 text-balance">
            {heading}
          </h2>
          <p className="font-mono text-[14px] text-gray-500 leading-relaxed mb-7">{body}</p>
          <ul className="space-y-3">
            {items.map((item) => (
              <li key={item} className="flex items-start gap-3 font-mono text-[13px] text-gray-700">
                <CheckCircle className="h-4 w-4 text-accent mt-0.5 flex-shrink-0" strokeWidth={2} />
                {item}
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: reverse ? -32 : 32 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className={`rounded-2xl bg-gradient-to-br from-[#e0f7fa] to-[#e0f7fa] border border-[#95d9e8]/50 aspect-[4/3] flex items-center justify-center ${reverse ? "lg:order-1" : ""}`}
        >
          <div className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center">
            <TrendingUp className="h-8 w-8 text-accent" strokeWidth={1.5} />
          </div>
        </motion.div>
      </div>
    </section>
  )
}

function NarrativeSection() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t border-gray-100">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="font-mono text-[11px] font-bold tracking-[2px] uppercase text-accent mb-3">The advantage</p>
          <h2 className="font-serif text-[30px] sm:text-[36px] font-bold text-gray-900 leading-[1.15] tracking-tight text-balance">
            Every call with full context. Every rep at their best.
          </h2>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.12 }}
          className="space-y-5"
        >
          <p className="font-mono text-[14px] text-gray-600 leading-relaxed">
            Twiching surfaces the full call history, SMS thread, and CRM notes the moment a rep picks up — so every conversation starts warm, not cold.
          </p>
          <p className="font-mono text-[14px] text-gray-600 leading-relaxed">
            Supervisors see real-time dashboards, jump into live calls with a single click, and run post-call coaching sessions from recordings with AI-generated highlights.
          </p>
          <div className="flex items-center gap-3 pt-2">
            <Clock className="h-4 w-4 text-accent flex-shrink-0" strokeWidth={2} />
            <p className="font-mono text-[12px] text-gray-500">Average deal cycle reduced by 18% for teams using auto-dialers + CRM sync together.</p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function SalesPage() {
  const useCasesRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!useCasesRef.current) return
    const heading = useCasesRef.current.querySelector("h2")
    if (!heading) return

    gsap.fromTo(
      heading,
      { x: -40, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: {
          trigger: heading,
          start: "top 80%",
          once: true,
        },
      }
    )

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill())
    }
  }, [])

  return (
    <PageLayout>
      <PageHero
        eyebrow="Solutions · Sales Teams"
        h1="Dial more. Connect more. Close more."
        sub="Local presence dialing, auto dialers, CRM integration, and live coaching tools that give inside and field sales teams every advantage on the phones."
        trustItems={["Local presence", "Auto dialers", "CRM integration", "Live coaching"]}
        primaryCta={{ label: "Start Free Trial", href: "/pricing" }}
        secondaryCta={{ label: "Talk to sales", href: "/contact" }}
        image={{ alt: "Sales team dashboard showing local presence dialing, call analytics, and CRM sync" }}
      />

      {/* Value cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {VALUES.map((v, i) => (
            <AnimatedValueCard key={v.title} icon={v.icon} title={v.title} body={v.body} index={i} />
          ))}
        </div>
      </section>

      {/* Animated stats bar */}
      <AnimatedStatBar />

      {/* Feature splits */}
      <AnimatedFeatureSplit
        eyebrow="Local presence"
        heading="Answer rates that change the game"
        body="Your reps are calling real prospects. Make sure those calls get picked up. Local presence dialing shows the right area code on every outbound call."
        items={[
          "Auto-matches caller ID to prospect's area code",
          "Works across all 50 US states and Canada",
          "No extra hardware or SIM cards needed",
          "Switch off per campaign if needed",
        ]}
      />

      <AnimatedFeatureSplit
        eyebrow="Supervisor tools"
        heading="Coach your team in the moment, not after"
        body="The best coaching happens live. Listen in, whisper guidance only the rep hears, or jump in directly when a deal is on the line."
        items={[
          "Live call monitoring with zero audio interruption to prospect",
          "Whisper coaching audible only to the rep",
          "Call barge for immediate intervention",
          "Post-call recording review with playback",
        ]}
        reverse
      />

      {/* Narrative */}
      <NarrativeSection />

      {/* Use cases */}
      <section
        ref={useCasesRef}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t border-gray-100"
      >
        <SectionHeading eyebrow="Use cases" h2="How sales teams use Twiching" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-2">
          {USE_CASES.map((uc, i) => (
            <UseCaseCard key={uc.title} title={uc.title} body={uc.body} index={i} />
          ))}
        </div>
      </section>

      {/* Inline checklist */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t border-gray-100">
        <SectionHeading eyebrow="Full capabilities" h2="Everything a sales team needs on the phones" />
        <InlineList
          items={[
            "Local presence dialing — auto-matches area code to prospect region",
            "Power and predictive auto dialers — maximize talk time",
            "Salesforce, HubSpot, and Zoho CRM integration",
            "Automatic call and SMS logging to CRM — zero manual entry",
            "SMS follow-up sequences after calls and demos",
            "Live call monitoring — silent, whisper, and barge",
            "Per-rep scorecards: calls, connect rate, conversion, AHT",
            "Post-call recording review with timestamps",
            "Territory number assignment for local brand consistency",
          ]}
          image={{ alt: "Sales team capabilities overview in Twiching — local presence, dialer, CRM, coaching" }}
        />
      </section>

      {/* Dark band */}
      <DarkBand>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-[11px] font-mono font-bold tracking-[2px] uppercase text-gray-500 mb-3">Built for inside sales teams</p>
            <h2 className="text-3xl sm:text-4xl font-semibold text-white tracking-tight text-balance leading-tight mb-5">
              4× answer rate.<br />40% more talk time.<br />3× faster ramp.
            </h2>
            <p className="text-base text-gray-400 leading-relaxed max-w-lg">
              Local presence gets the call answered. Auto dialers keep reps dialing. Whisper coaching builds better reps faster. CRM sync kills manual data entry. Twiching is the phone stack built specifically for the phones.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: "4×", note: "Answer rate with local presence" },
              { label: "40%", note: "More talk time, auto dialers" },
              { label: "3×", note: "Faster ramp, whisper coaching" },
              { label: "60%", note: "Less time on CRM entry" },
            ].map(({ label, note }) => (
              <div key={label} className="p-5 rounded-xl border border-white/10 bg-white/5">
                <p className="font-mono font-bold text-[22px] text-white mb-1">{label}</p>
                <p className="font-mono text-[11px] text-gray-500">{note}</p>
              </div>
            ))}
          </div>
        </div>
      </DarkBand>

      <Faq items={FAQS} heading="Sales team communications FAQ" />

      <RelatedCards
        heading="Explore more solutions"
        cards={[
          { title: "Finance", desc: "Compliant call recording and CRM integration for financial advisors.", href: "/solutions/finance" },
          { title: "Supervisor Tools", desc: "Live monitoring, whisper coaching, and call barge.", href: "/features/supervisor" },
          { title: "Conversation Intelligence", desc: "AI-powered call transcription and insights.", href: "/features/conv-intelligence" },
        ]}
      />

      <FinalCta />
    </PageLayout>
  )
}
