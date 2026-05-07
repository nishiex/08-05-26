import { Metadata } from "next"
import { PageLayout } from "@/components/page-layout"
import { PageHero, SectionHeading, ValueCard, RelatedCards, StatBar, DarkBand } from "@/components/page-parts"
import { FinalCta } from "@/components/final-cta"
import { Faq } from "@/components/faq"
import {
  Phone, MessageSquare, Mic, MousePointerClick,
  GitMerge, BarChart2, Users, Zap, Clock,
} from "lucide-react"

export const metadata: Metadata = {
  title: "HubSpot Integration · Twiching",
  description: "Sync every call, SMS, and voicemail directly into HubSpot records. Click-to-call, AI transcripts, and workflow triggers — all without leaving HubSpot.",
}

const FEATURES = [
  {
    icon: Phone,
    title: "Calls logged automatically",
    body: "Every inbound and outbound call is posted to the matching HubSpot contact, company, or deal record the moment it ends — no manual logging, ever.",
  },
  {
    icon: MessageSquare,
    title: "SMS on the timeline",
    body: "Threaded SMS conversations land on the same record alongside calls. Your team sees the full conversation history in one place.",
  },
  {
    icon: Mic,
    title: "Recordings & AI summaries",
    body: "Call recordings and AI-generated summaries attach to the activity within 30 seconds of hangup. Searchable across every contact and deal timeline.",
  },
  {
    icon: MousePointerClick,
    title: "Click-to-call from any record",
    body: "Dial straight from any HubSpot contact, company, deal, or list view. No tab switching, no copy-pasting numbers.",
  },
  {
    icon: GitMerge,
    title: "Workflow triggers",
    body: "Connected, missed, and ended calls each fire a workflow event. Automate nurture sequences, task creation, or lifecycle stage changes based on real call outcomes.",
  },
  {
    icon: GitMerge,
    title: "Two-way contact sync",
    body: "Create a contact in Twiching and it appears in HubSpot within seconds — and vice versa. No duplicate entry, no sync delays.",
  },
]

const TEAM_BENEFITS = [
  {
    team: "Marketing",
    headline: "Tie revenue to conversations",
    points: [
      "Source attribution on every connected call",
      "Workflow triggers off real call outcomes",
      "Lifecycle stage moves based on what happened on the call",
    ],
  },
  {
    team: "Sales",
    headline: "Full history before every dial",
    points: [
      "Click-to-call from every contact and deal record",
      "Recording and transcript attached to the deal",
      "Connect-to-meeting reports built into your pipeline",
    ],
  },
  {
    team: "Service",
    headline: "Context the moment the phone rings",
    points: [
      "Screen pop with the open ticket when a known customer calls",
      "Auto-routing to the assigned service rep",
      "First-call resolution metrics tied to real call data",
    ],
  },
]

const FAQS = [
  {
    q: "How long does setup take?",
    a: "Under five minutes. Install from the HubSpot App Marketplace, authenticate via OAuth, map your users, and choose your workflow triggers. No developer needed.",
  },
  {
    q: "Does it work with HubSpot workflows?",
    a: "Yes. Connected calls, missed calls, and ended calls each emit a workflow event you can use to trigger nurture sequences, create tasks, move deal stages, or send internal alerts.",
  },
  {
    q: "Are call recordings stored in HubSpot?",
    a: "Recordings and AI transcripts are attached directly to the HubSpot activity record within ~30 seconds of the call ending. They appear inline on the contact or deal timeline.",
  },
  {
    q: "Does SMS sync to HubSpot too?",
    a: "Yes. Every SMS sent or received through Twiching is threaded and logged on the matching HubSpot record alongside calls — giving your team one complete conversation timeline.",
  },
  {
    q: "Which HubSpot plan do I need?",
    a: "The integration works with all HubSpot tiers. Workflow triggers require a HubSpot plan that includes Workflows (Starter or above).",
  },
]

export default function HubSpotIntegrationPage() {
  return (
    <PageLayout>
      <PageHero
        eyebrow="Integrations · HubSpot"
        h1="Twiching for HubSpot. Every call pours into your timeline."
        sub="Contacts, deals, and conversations stay in one place. Every call, SMS, and voicemail becomes a data point on the right HubSpot record — automatically."
        trustItems={["OAuth install", "2-way sync", "AI transcripts", "Workflow triggers"]}
        primaryCta={{ label: "Start Free Trial", href: "/pricing" }}
        secondaryCta={{ label: "Talk to sales", href: "/contact" }}
        image={{ alt: "Twiching call activity logged on a HubSpot contact timeline" }}
      />

      <StatBar stats={[
        { value: "30s",    label: "Transcript delivery",   note: "after call ends" },
        { value: "2-way",  label: "Contact sync",          note: "real-time, both directions" },
        { value: "5 min",  label: "Setup time",            note: "OAuth install, no code" },
        { value: "18%",    label: "Connect-to-meeting lift", note: "reported by Twiching customers" },
      ]} />

{/* Feature grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <SectionHeading
          eyebrow="What lives on the timeline"
          h2="Everything your team needs, synced to HubSpot"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
          {FEATURES.map((f) => (
            <ValueCard key={f.title} icon={f.icon} title={f.title} body={f.body} />
          ))}
        </div>
      </section>

      {/* Team benefits */}
      <DarkBand>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <SectionHeading
            eyebrow="Built for every revenue team"
            h2="One integration. Three teams that actually use it."
            dark
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            {TEAM_BENEFITS.map(({ team, headline, points }) => (
              <div key={team} className="bg-white/5 border border-white/10 rounded-2xl p-7">
                <p className="text-[11px] font-mono font-bold tracking-[2px] uppercase text-accent mb-2">{team}</p>
                <p className="text-[18px] font-semibold text-white mb-5 leading-snug">{headline}</p>
                <ul className="space-y-2.5">
                  {points.map((pt) => (
                    <li key={pt} className="flex items-start gap-2.5 text-[14px] text-gray-300 leading-snug">
                      <span className="mt-1 h-4 w-4 rounded-full bg-accent/20 text-accent flex items-center justify-center flex-shrink-0 text-[10px] font-bold">✓</span>
                      {pt}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </DarkBand>

      <Faq items={FAQS} heading="HubSpot integration questions, answered." />

      <RelatedCards
        heading="Keep exploring"
        cards={[
          { title: "Zoho Integration",         desc: "Auto-log calls across Zoho CRM, Desk, Books, and Bigin.",       href: "/integrations/zoho" },
          { title: "Conversation Intelligence", desc: "AI transcripts, keyword flagging, and call coaching at scale.", href: "/features/conv-intelligence" },
          { title: "Call Recording",            desc: "Encrypted recordings with searchable transcripts.",             href: "/features/call-recording" },
        ]}
      />

      <FinalCta />
    </PageLayout>
  )
}
