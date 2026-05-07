import { Metadata } from "next"
import { PageLayout } from "@/components/page-layout"
import { PageHero, SectionHeading, StatBar, ValueGrid, FeatureSplit, ImageSlot } from "@/components/page-parts"
import { FinalCta } from "@/components/final-cta"
import { Faq } from "@/components/faq"
import { Smartphone, VolumeX, MessageSquare, Clock } from "lucide-react"

export const metadata: Metadata = {
  title: "Second Phone Number · No Second SIM Required | Twiching",
  description:
    "Get a second number for work on your existing phone. No SIM swap. 14-day free trial.",
}

const STATS = [
  { value: "0",    label: "Extra hardware",    note: "works on your current phone" },
  { value: "0",    label: "SIM swaps needed",  note: "cloud-routed" },
  { value: "2",    label: "Lines on 1 device", note: "personal + work" },
  { value: "24h",  label: "Activation time",   note: "most are instant" },
]

const FEATURES = [
  {
    icon: Smartphone,
    title: "No second phone",
    body: "Your current device handles both lines. Incoming calls show which number was dialed so you know how to answer.",
  },
  {
    icon: VolumeX,
    title: "Silence work after hours",
    body: "Put the work line on do-not-disturb at 6 PM without silencing family, friends, or emergencies on your personal line.",
  },
  {
    icon: MessageSquare,
    title: "Text from work number",
    body: "Full two-way SMS from the second line. Clients reply to your work number — not your personal cell.",
  },
  {
    icon: Clock,
    title: "Separate voicemail",
    body: "A professional greeting on the work line. Your casual personal greeting stays exactly where it belongs.",
  },
]

const WHO_USES = [
  {
    label: "Real estate agents",
    desc: "Public listing contacts that stop following you after the deal closes.",
  },
  {
    label: "Freelancers",
    desc: "Client calls go to a work line. Personal life stays personal.",
  },
  {
    label: "Side-business owners",
    desc: "Keep the hustle clean. Separate the side project from the day job.",
  },
  {
    label: "Remote workers",
    desc: "Share a work number on company materials without exposing personal details.",
  },
  {
    label: "Anyone who lists publicly",
    desc: "Marketplace sellers, contractors, tutors — anyone whose number ends up online.",
  },
]

export default function SecondNumberPage() {
  return (
    <PageLayout>
      {/* ── Hero — two-column with image slot ──────────────────── */}
      <PageHero
        eyebrow="Second Phone Number"
        h1="Two numbers. One phone."
        sub="A second line for work on the device you already carry. No SIM swap. No second phone. No blurred lines."
        trustItems={["No second SIM", "Same device", "Work-life separation", "Two-way SMS"]}
        primaryCta={{ label: "Start 14-day free trial", href: "/pricing" }}
        secondaryCta={{ label: "See pricing", href: "/pricing" }}
        image={{
          // Replace src with your own image to populate the hero visual
          // src: "/images/second-number-hero.jpg",
          alt: "Second phone number on a single device",
        }}
      />

      
      {/* ── Stats ──────────────────────────────────────────────── */}
      <StatBar stats={STATS} />

      {/* ── Feature grid ───────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <SectionHeading
          eyebrow="How it works"
          h2="Two lines on one device — cleanly separated"
          sub="Cloud-routed, not SIM-based. Both lines live on the same phone with no hardware changes."
        />
        <ValueGrid items={FEATURES} cols={4} />
      </section>

      {/* ── Feature split: how it works ────────────────────────── */}
      <section className="bg-gray-50 border-y border-gray-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FeatureSplit
            eyebrow="The setup"
            heading="Your second number on your existing phone"
            body="Calls come in showing which line was dialed. Outbound shows your work number — not your personal one. No hardware, no SIM card, no carrier visit."
            points={[
              "Incoming calls show which line was dialed",
              "Outbound caller ID shows the work number",
              "Can people tell it&apos;s a second number? No.",
              "Works on iOS, Android, and softphones",
            ]}
            cta={{ label: "Start free trial", href: "/pricing" }}
            image={{
              // src: "/images/second-number-how-it-works.jpg",
              alt: "Second number call routing diagram",
            }}
          />
        </div>
      </section>

      {/* ── Who uses second numbers ─────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div>
            <SectionHeading eyebrow="Who needs one most" h2="Five types of people who need this most" />
            <div className="space-y-3">
              {WHO_USES.map(({ label, desc }) => (
                <div
                  key={label}
                  className="flex items-start gap-4 p-4 rounded-xl border border-gray-100 bg-white hover:border-accent/30 transition-colors"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-[14px] text-gray-900 mb-0.5">{label}</p>
                    <p className="text-[13px] text-gray-500">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Image slot — swap in a product screenshot or use-case photo */}
          <ImageSlot
            alt="Second number use case — real estate agent or freelancer"
            aspect="aspect-[4/3]"
            // src="/images/second-number-who-uses.jpg"
          />
        </div>
      </section>

      <Faq />
      <FinalCta />
    </PageLayout>
  )
}
