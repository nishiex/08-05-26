import { Metadata } from "next"
import { PageLayout } from "@/components/page-layout"
import { PageHero, SectionHeading, ValueCard, RelatedCards, StatBar, FeatureSplit, DarkBand, InlineList } from "@/components/page-parts"
import { FinalCta } from "@/components/final-cta"
import { Faq } from "@/components/faq"
import { Users, Eye, Mic, PhoneCall, BarChart2, Bell } from "lucide-react"

export const metadata: Metadata = {
  title: "Supervisor Tools · Twiching",
  description: "Live call monitoring, whisper coaching, call barge, real-time wallboards, and agent scorecards for contact center supervisors.",
}

const VALUES = [
  { icon: Eye, title: "Live Call Monitoring", body: "Listen silently to any live call without the agent or customer knowing. Identify coaching opportunities as they happen, not days later." },
  { icon: Mic, title: "Whisper Coaching", body: "Speak to the agent without the customer hearing. Guide reps through difficult calls in real time — the customer never knows." },
  { icon: PhoneCall, title: "Call Barge", body: "Join a live call as a full participant when an agent needs immediate help. Take over the conversation seamlessly." },
  { icon: BarChart2, title: "Real-Time Wallboards", body: "Live dashboards show queue depth, average wait time, agent status, and call volume. Spot problems before they affect your SLA." },
  { icon: Users, title: "Agent Scorecards", body: "Track per-agent KPIs: calls handled, average handle time, CSAT, first call resolution, and QA scores — updated in real time." },
  { icon: Bell, title: "Threshold Alerts", body: "Set alerts for when queue wait time, abandonment rate, or agent status crosses a threshold. Get notified via SMS or email instantly." },
]

const FAQS = [
  { q: "Can the agent hear me when I use whisper coaching?", a: "Yes — only the agent hears the whisper. The customer hears nothing. The agent continues the conversation normally while receiving your guidance." },
  { q: "Can I barge into any call or only specific queues?", a: "Supervisors can barge into any call handled by agents in their assigned groups. Enterprise administrators can set group-level permissions." },
  { q: "Are Supervisor Tools available on all plans?", a: "Supervisor Tools are available on Professional and Enterprise plans." },
  { q: "Can I monitor multiple agents simultaneously?", a: "Yes. The supervisor wallboard shows all active calls across your team simultaneously. You can click any active call to monitor, whisper, or barge." },
  { q: "Do agents know when they are being monitored?", a: "Silent monitoring is invisible to agents. This allows authentic performance assessment. Whisper and barge are detectable by the agent but not the customer." },
]

export default function SupervisorPage() {
  return (
    <PageLayout>

      {/* Hero — image placeholder right column */}
      <PageHero
        eyebrow="Features · Supervisor Tools"
        h1="Coach your team on every call, in real time"
        sub="Live monitoring, whisper coaching, call barge, and real-time wallboards that give contact center supervisors complete visibility and control — without waiting for a post-call review."
        trustItems={["Live monitoring", "Whisper coaching", "Real-time wallboards", "Agent scorecards"]}
        primaryCta={{ label: "Start Free Trial", href: "/pricing" }}
        secondaryCta={{ label: "See pricing", href: "/pricing" }}
        image={{ alt: "Supervisor wallboard showing live agent calls and queue metrics" }}
      />

      {/* Stats bar */}
      <StatBar stats={[
        { value: "0s", label: "Coaching delay", note: "whisper in real time" },
        { value: "100%", label: "Call visibility", note: "every active call on one screen" },
        { value: "1-click", label: "To monitor or barge", note: "from wallboard to call" },
        { value: "Pro+", label: "Plan availability", note: "Professional & Enterprise" },
      ]} />

      {/* Value cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {VALUES.map((v) => <ValueCard key={v.title} icon={v.icon} title={v.title} body={v.body} />)}
        </div>
      </section>

      {/* Feature split 1 — Live monitoring + wallboard */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t border-gray-100">
        <FeatureSplit
          eyebrow="Real-time wallboard"
          heading="Every agent. Every call. One screen."
          body="The supervisor wallboard updates every second — agent status, queue depth, average wait time, and call volume in a single view. Spot a problem before it becomes a missed SLA."
          points={[
            "Live agent status: on call, available, wrap-up, or offline",
            "Queue depth and average wait time updated every second",
            "Click any active call to silently join as a monitor",
            "Threshold alerts via SMS or email when KPIs breach limits",
          ]}
          cta={{ label: "See the wallboard in action", href: "/pricing" }}
          image={{ alt: "Real-time supervisor wallboard with agent statuses and queue metrics" }}
        />
      </section>

      {/* Feature split 2 — Whisper + barge (reversed) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t border-gray-100">
        <FeatureSplit
          eyebrow="Whisper & barge"
          heading="Guide the call without the customer ever knowing"
          body="Whisper coaching lets you speak directly to the agent while the customer hears nothing. When a call needs more than coaching, barge joins you as a full participant in one click."
          points={[
            "Whisper: audible to agent only — customer hears nothing",
            "Barge: join as a full call participant instantly",
            "Switch between monitor, whisper, and barge mid-call",
            "Works on mobile app — supervise from anywhere",
          ]}
          image={{ alt: "Whisper coaching interface showing call controls for supervisor" }}
          reverse
        />
      </section>

      {/* How it works — 3 steps */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t border-gray-100">
        <SectionHeading eyebrow="Supervisor workflow" h2="From wallboard to call — in three clicks" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-2">
          {[
            { step: "01", title: "Monitor your wallboard", body: "Open the real-time wallboard to see every agent's status: on call, available, in wrap-up. Queue depth and wait times update every second." },
            { step: "02", title: "Select a call to review", body: "Click any active call to join silently. Listen to the agent-customer conversation without either party knowing you are present." },
            { step: "03", title: "Intervene or coach", body: "Press whisper to coach the agent privately, or barge to join the call as a full participant. Your intervention is instant." },
          ].map(({ step, title, body }) => (
            <div key={step} className="p-7 rounded-2xl border border-gray-100 bg-white shadow-sm">
              <p className="font-mono text-[11px] font-bold tracking-[2px] text-accent mb-4">{step}</p>
              <h3 className="font-semibold text-[16px] text-gray-900 mb-2">{title}</h3>
              <p className="text-[13px] text-gray-600 leading-relaxed">{body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Inline checklist + image — full capability summary */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t border-gray-100">
        <SectionHeading eyebrow="Full capabilities" h2="Everything a supervisor needs, built in" />
        <InlineList
          items={[
            "Silent call monitoring — invisible to agent and customer",
            "Whisper coaching — agent only, customer hears nothing",
            "Call barge — join as a full participant instantly",
            "Switch between monitor, whisper, and barge mid-call",
            "Real-time wallboard — all agents and queues on one screen",
            "Per-agent scorecards: AHT, CSAT, FCR, QA score",
            "Threshold alerts via SMS or email",
            "Available on mobile app — supervise from anywhere",
          ]}
          image={{ alt: "Supervisor tools feature overview in Twiching dashboard" }}
        />
      </section>

      {/* Dark band — supervision philosophy */}
      <DarkBand>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-[11px] font-mono font-bold tracking-[2px] uppercase text-gray-500 mb-3">Built for contact center supervisors</p>
            <h2 className="text-3xl sm:text-4xl font-semibold text-white tracking-tight text-balance leading-tight mb-5">
              Don't review yesterday's calls.<br />Fix today's calls as they happen.
            </h2>
            <p className="text-base text-gray-400 leading-relaxed max-w-lg">
              Post-call QA tells you what went wrong after the damage is done. Twiching's supervisor tools put you inside every live conversation — so you can catch mistakes in real time, coach in the moment, and protect every customer interaction before it ends.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: "Monitor", note: "Silent — neither party knows" },
              { label: "Whisper", note: "Agent only — customer unaware" },
              { label: "Barge", note: "Full participant, one click" },
              { label: "Wallboard", note: "Every call, every second" },
            ].map(({ label, note }) => (
              <div key={label} className="p-5 rounded-xl border border-white/10 bg-white/5">
                <p className="font-mono font-bold text-[16px] text-white mb-1">{label}</p>
                <p className="font-mono text-[11px] text-gray-500">{note}</p>
              </div>
            ))}
          </div>
        </div>
      </DarkBand>

      <Faq items={FAQS} heading="Supervisor Tools FAQ" />

      <RelatedCards
        heading="Related features"
        cards={[
          { title: "Call Recording", desc: "Review any past call after the fact with timestamped recordings.", href: "/features/call-recording" },
          { title: "Conversation Intelligence", desc: "AI scoring and transcription for every call.", href: "/features/conv-intelligence" },
          { title: "Intelligent Routing", desc: "Control which agents receive which calls.", href: "/features/routing" },
        ]}
      />

      <FinalCta />
    </PageLayout>
  )
}