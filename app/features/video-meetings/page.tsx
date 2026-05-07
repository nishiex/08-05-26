import { Metadata } from "next"
import { PageLayout } from "@/components/page-layout"
import { PageHero, SectionHeading, ValueCard, RelatedCards, StatBar, DarkBand, FeatureSplit } from "@/components/page-parts"
import { FinalCta } from "@/components/final-cta"
import { Faq } from "@/components/faq"
import { Video, Users, MonitorSmartphone, Share2, Lock, Calendar, Mic, LayoutGrid } from "lucide-react"

export const metadata: Metadata = {
  title: "Video Meetings · Twiching",
  description: "HD video meetings built into your business phone system. No downloads, no friction — just click and connect with your team or customers.",
}

const FEATURES = [
  {
    icon: Video,
    title: "HD video, one click",
    body: "Start or join a meeting instantly from any device — browser, desktop, or mobile. No app downloads, no account required for guests.",
  },
  {
    icon: Users,
    title: "Up to 200 participants",
    body: "Host team stand-ups, all-hands calls, or customer webinars. Scale from two people to your entire company without switching tools.",
  },
  {
    icon: Share2,
    title: "Screen sharing & whiteboard",
    body: "Share your screen, present slides, or collaborate on an interactive whiteboard in real time. Built for both internal teams and customer calls.",
  },
  {
    icon: Mic,
    title: "AI meeting summaries",
    body: "Every meeting is automatically transcribed and summarised by AI. Action items, decisions, and key moments surfaced instantly after the call ends.",
  },
  {
    icon: Lock,
    title: "End-to-end encrypted",
    body: "All video and audio is encrypted in transit and at rest. Waiting rooms, host controls, and participant lock keep your meetings secure.",
  },
  {
    icon: Calendar,
    title: "Calendar & CRM integration",
    body: "Schedule meetings from HubSpot, Zoho, or Google Calendar. Meeting links auto-generated and attached to the right contact or deal record.",
  },
]

const FAQS = [
  {
    q: "Do guests need to download anything?",
    a: "No. Guests join via a browser link — no app, no account, no friction. Hosts can use the Twiching desktop or mobile app for additional controls.",
  },
  {
    q: "How many people can join a meeting?",
    a: "Up to 200 participants per meeting. For larger events or webinars, contact our team for enterprise capacity options.",
  },
  {
    q: "Are meetings recorded?",
    a: "Yes. Recordings are available on all paid plans. They're stored encrypted, auto-transcribed, and searchable from your dashboard.",
  },
  {
    q: "Does this integrate with our CRM?",
    a: "Yes. Video Meetings integrates with HubSpot and Zoho — meeting links, recordings, and AI summaries attach directly to the relevant contact or deal record.",
  },
  {
    q: "Is video included in my existing plan?",
    a: "Video Meetings is available on Growth and above plans. Check the pricing page for full feature breakdowns per tier.",
  },
]

export default function VideoMeetingsPage() {
  return (
    <PageLayout>
      <PageHero
        eyebrow="Features · Video Meetings"
        h1="HD video meetings. Built into your phone system."
        sub="Start a meeting in one click from any device. AI summaries, screen sharing, and CRM sync — no extra tools, no separate subscription."
        trustItems={["No downloads for guests", "Up to 200 participants", "AI summaries", "E2E encrypted"]}
        primaryCta={{ label: "Start Free Trial", href: "/pricing" }}
        secondaryCta={{ label: "Talk to sales", href: "/contact" }}
        image={{
          src: "/ChatGPTImageMay6202605_04_16PM.png",
          alt: "Twiching video meeting — Quarterly planning sync with participant grid and screen share",
          className:" h-[410]  contain object-cover object-top  "
        }}
      />

      <StatBar stats={[
        { value: "200",   label: "Max participants",   note: "per meeting" },
        { value: "1-click", label: "Meeting start",   note: "no app required for guests" },
        { value: "30s",   label: "AI summary",         note: "delivered after call ends" },
        { value: "E2E",   label: "Encrypted",          note: "audio, video & chat" },
      ]} />

<section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <SectionHeading eyebrow="What's included" h2="Everything your team needs in a meeting" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
          {FEATURES.map((f) => <ValueCard key={f.title} icon={f.icon} title={f.title} body={f.body} />)}
        </div>
      </section>

      <DarkBand>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-[11px] font-mono font-bold tracking-[2px] uppercase text-gray-500 mb-3">AI-powered meetings</p>
              <h2 className="text-3xl sm:text-4xl font-semibold text-white tracking-tight leading-tight mb-5">
                Never take meeting notes again.
              </h2>
              <p className="text-base text-gray-400 leading-relaxed max-w-lg">
                Every meeting is automatically transcribed, summarised, and indexed. Action items are extracted and can trigger tasks in your CRM. Your team leaves every call knowing exactly what happens next.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "Auto-transcript",  note: "Full meeting transcription" },
                { label: "AI summary",       note: "Key decisions & action items" },
                { label: "CRM sync",         note: "Attached to contact or deal" },
                { label: "Searchable",        note: "Find any moment, any meeting" },
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

      <Faq items={FAQS} heading="Video Meetings FAQ" />

      <RelatedCards
        heading="Related features"
        cards={[
          { title: "Team Chat",              desc: "Persistent messaging channels for your whole team.",          href: "/features/team-chat" },
          { title: "AI Conversation Intelligence", desc: "AI transcripts, keyword flagging, and call coaching.", href: "/features/conv-intelligence" },
          { title: "HubSpot Integration",    desc: "Sync meetings, calls, and transcripts to HubSpot records.",  href: "/integrations/hubspot" },
        ]}
      />

      <FinalCta />
    </PageLayout>
  )
}
