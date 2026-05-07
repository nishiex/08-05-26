import { Metadata } from "next"
import { PageLayout } from "@/components/page-layout"
import { PageHero, SectionHeading, ValueCard, RelatedCards, StatBar, FeatureSplit, DarkBand, InlineList } from "@/components/page-parts"
import { FinalCta } from "@/components/final-cta"
import { Faq } from "@/components/faq"
import { Brain, Search, BarChart2, MessageSquare, Shield, Zap } from "lucide-react"

export const metadata: Metadata = {
  title: "Conversation Intelligence · Twiching",
  description: "AI-powered call transcription, keyword detection, sentiment analysis, and automated call scoring for every conversation.",
}

const VALUES = [
  { icon: Brain, title: "AI Transcription", body: "Every call transcribed automatically with speaker separation, timestamps, and 95%+ accuracy. Searchable within seconds of the call ending." },
  { icon: Search, title: "Keyword & Topic Detection", body: "Define keyword libraries — competitor mentions, compliance phrases, objection language. Flag calls the moment they contain your keywords." },
  { icon: BarChart2, title: "Sentiment Analysis", body: "AI scores caller and agent sentiment at the utterance level. Track sentiment trends across your team, by agent, and by topic." },
  { icon: MessageSquare, title: "Automated Call Summaries", body: "AI generates a structured summary — topics discussed, action items, and outcome — posted to your CRM automatically after the call." },
  { icon: Shield, title: "Compliance Monitoring", body: "Flag calls that contain or are missing required compliance disclosures. Build custom compliance checklist libraries per product or regulation." },
  { icon: Zap, title: "Agent Coaching Triggers", body: "When a call scores below your quality threshold, automatically assign a coaching review. Managers focus on the calls that need attention most." },
]

const FAQS = [
  { q: "How accurate is the transcription?", a: "Twiching's AI transcription achieves 95%+ word-error rate accuracy on clear business calls in English. Accuracy on recordings with background noise or heavy accents may vary." },
  { q: "Which plan includes Conversation Intelligence?", a: "Conversation Intelligence is available on the Enterprise plan, where it includes transcription, keyword detection, sentiment analysis, and automated summaries." },
  { q: "Can I create custom keyword libraries?", a: "Yes. Build keyword libraries specific to your compliance requirements, competitive intelligence needs, or QA scorecards. Libraries apply across all recorded calls." },
  { q: "Does Conversation Intelligence integrate with CRMs?", a: "Yes. Summaries, sentiment scores, and action items sync to Salesforce, HubSpot, and Zoho automatically after the call." },
  { q: "Is Conversation Intelligence available in real time?", a: "Transcription and keyword detection are available in near-real-time (3–5 second delay). Full sentiment analysis and summaries are post-call." },
]

export default function ConversationIntelligencePage() {
  return (
    <PageLayout>

      {/* Hero — image placeholder right column */}
      <PageHero
        eyebrow="Features · Conversation Intelligence"
        h1="Every call. Transcribed. Analyzed. Actioned."
        sub="AI-powered transcription, keyword detection, sentiment scoring, and automated call summaries that turn every conversation into structured, searchable business intelligence."
        trustItems={["95%+ accuracy", "Real-time keywords", "CRM sync", "Compliance monitoring"]}
        primaryCta={{ label: "Start Free Trial", href: "/pricing" }}
        secondaryCta={{ label: "See pricing", href: "/pricing" }}
        image={{ alt: "Conversation Intelligence dashboard showing transcript and sentiment analysis" }}
      />

      {/* Stats bar */}
      <StatBar stats={[
        { value: "95%+", label: "Transcription accuracy", note: "on clear business calls" },
        { value: "100%", label: "Calls scored", note: "vs. 5% manual sampling" },
        { value: "3–5s", label: "Keyword detection", note: "near-real-time flagging" },
        { value: "Enterprise", label: "Plan availability", note: "full AI feature suite" },
      ]} />

{/* Value cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {VALUES.map((v) => <ValueCard key={v.title} icon={v.icon} title={v.title} body={v.body} />)}
        </div>
      </section>

      {/* Feature split 1 — AI transcription + keyword detection */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t border-gray-100">
        <FeatureSplit
          eyebrow="AI transcription"
          heading="Searchable transcripts ready seconds after every call"
          body="Every recorded call is transcribed automatically with speaker separation and timestamps. Search your entire call library by keyword, phrase, or agent — and jump directly to the moment that matters."
          points={[
            "Speaker-separated transcripts with utterance timestamps",
            "Full-text search across your entire call library",
            "Keyword libraries for competitors, objections, and compliance phrases",
            "Near-real-time flagging — keywords surface within 3–5 seconds",
          ]}
          cta={{ label: "See it in action", href: "/pricing" }}
          image={{ alt: "Transcript view with keyword highlighting and speaker labels" }}
        />
      </section>

      {/* Feature split 2 — Sentiment + summaries (reversed) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t border-gray-100">
        <FeatureSplit
          eyebrow="Sentiment & summaries"
          heading="AI writes the call notes. You close the deal."
          body="After every call, AI generates a structured summary — topics covered, action items, and outcome — and posts it to your CRM automatically. Sentiment scores track caller and agent mood at the utterance level."
          points={[
            "Structured summaries posted to CRM within minutes of call end",
            "Caller and agent sentiment scored per utterance",
            "Sentiment trend dashboards by agent, team, and topic",
            "Auto-assigned coaching reviews when scores fall below threshold",
          ]}
          image={{ alt: "AI-generated call summary and sentiment score chart" }}
          reverse
        />
      </section>

      {/* Use cases grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t border-gray-100">
        <SectionHeading eyebrow="Use cases" h2="What teams do with Conversation Intelligence" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-2">
          {[
            { title: "Voice of the customer", body: "Analyze thousands of transcripts to identify recurring pain points, product feature requests, and competitor mentions at scale." },
            { title: "Sales win/loss analysis", body: "Compare transcripts of won and lost deals. Identify the language patterns and objection-handling techniques that correlate with closed revenue." },
            { title: "Compliance auditing", body: "Flag calls where required disclosures were missing or competitor names were mentioned in potentially problematic contexts." },
            { title: "Agent QA at scale", body: "Score 100% of calls against your QA rubric automatically. Move from sampling 5% of calls to reviewing every interaction." },
            { title: "CRM enrichment", body: "Auto-populate call notes, next steps, and sentiment scores in CRM records immediately after the call ends. Zero manual data entry." },
            { title: "Training library", body: "Search transcripts for calls that demonstrate specific best practices. Build a searchable library of exemplary conversations." },
          ].map((uc) => (
            <div key={uc.title} className="p-6 rounded-2xl border border-gray-100 bg-white shadow-sm hover:shadow-md hover:border-[#95d9e8]/50 transition-all">
              <h3 className="font-semibold text-[15px] text-gray-900 mb-2">{uc.title}</h3>
              <p className="text-[13px] text-gray-600 leading-relaxed">{uc.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Inline checklist + image — full capability list */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t border-gray-100">
        <SectionHeading eyebrow="Full capabilities" h2="Everything included in Conversation Intelligence" />
        <InlineList
          items={[
            "Automatic transcription with speaker separation and timestamps",
            "95%+ accuracy on clear English business calls",
            "Custom keyword libraries — unlimited topics and phrases",
            "Near-real-time keyword flagging (3–5 second delay)",
            "Utterance-level sentiment scoring for caller and agent",
            "Sentiment trend dashboards by agent, team, and date",
            "AI-generated structured call summaries",
            "Auto CRM sync — summaries and scores to Salesforce, HubSpot, Zoho",
            "Compliance disclosure monitoring with custom checklists",
            "Auto-assigned coaching reviews on low-scoring calls",
          ]}
          image={{ alt: "Conversation Intelligence capability overview in Twiching" }}
        />
      </section>

      {/* Dark band — AI intelligence callout */}
      <DarkBand>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-[11px] font-mono font-bold tracking-[2px] uppercase text-gray-500 mb-3">Stop sampling. Start knowing.</p>
            <h2 className="text-3xl sm:text-4xl font-semibold text-white tracking-tight text-balance leading-tight mb-5">
              Your team has hundreds of calls a day.<br />AI reviews all of them.
            </h2>
            <p className="text-base text-gray-400 leading-relaxed max-w-lg">
              Manual QA sampling catches 1 in 20 calls at best. Twiching's AI scores every single call — surfacing the coaching moments, compliance gaps, and competitor signals your team would otherwise never see.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: "Transcription", note: "Speaker-separated, timestamped" },
              { label: "Keywords", note: "Real-time library matching" },
              { label: "Sentiment", note: "Utterance-level scoring" },
              { label: "Summaries", note: "Auto-posted to CRM" },
            ].map(({ label, note }) => (
              <div key={label} className="p-5 rounded-xl border border-white/10 bg-white/5">
                <p className="font-mono font-bold text-[16px] text-white mb-1">{label}</p>
                <p className="font-mono text-[11px] text-gray-500">{note}</p>
              </div>
            ))}
          </div>
        </div>
      </DarkBand>

      <Faq items={FAQS} heading="Conversation Intelligence FAQ" />

      <RelatedCards
        heading="Related features"
        cards={[
          { title: "Call Recording", desc: "The foundation that feeds Conversation Intelligence.", href: "/features/call-recording" },
          { title: "Supervisor Tools", desc: "Act on intelligence in real time with live monitoring.", href: "/features/supervisor" },
          { title: "Sales Teams", desc: "Win more deals with data-driven call insights.", href: "/solutions/sales" },
        ]}
      />

      <FinalCta />
    </PageLayout>
  )
}