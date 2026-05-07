import { Metadata } from "next"
import { PageLayout } from "@/components/page-layout"
import { PageHero, SectionHeading, StatBar, ValueGrid, FeatureSplit, ImageSlot } from "@/components/page-parts"
import { FinalCta } from "@/components/final-cta"
import { Faq } from "@/components/faq"
import { Shield, Clock, Smartphone, MessageSquare, PhoneForwarded } from "lucide-react"

export const metadata: Metadata = {
  title: "Business Phone Numbers · Professional Lines | Twiching",
  description:
    "Dedicated business phone numbers that separate work from personal. 14-day free trial.",
}

const STATS = [
  { value: "$480", label: "Avg. annual saving", note: "vs. legacy carrier" },
  { value: "0",    label: "Hardware required",  note: "works on any device" },
  { value: "24h",  label: "Setup time",         note: "activate in minutes" },
  { value: "100%", label: "Personal privacy",   note: "number never exposed" },
]

const FEATURES = [
  {
    icon: Shield,
    title: "Personal privacy",
    body: "Your personal mobile number is never exposed to clients. All calls and SMS route through the business number.",
  },
  {
    icon: Clock,
    title: "Business-hours routing",
    body: "Silence work calls after 6 PM without silencing family. Set hours, set rules, go offline — on your schedule.",
  },
  {
    icon: Smartphone,
    title: "Any device",
    body: "Forward calls to any device you already own — mobile, softphone, or desk phone. No hardware required.",
  },
  {
    icon: MessageSquare,
    title: "Business SMS",
    body: "Text clients from your business number, not your personal cell. Full two-way SMS on every line.",
  },
  {
    icon: PhoneForwarded,
    title: "Professional voicemail",
    body: "A greeting that says your business name — not &quot;Hey, it&apos;s me, leave a message.&quot; Separate voicemail per line.",
  },
]

const WHO_USES = [
  { label: "Freelancers and consultants",            desc: "Clients reach a work line, not your personal cell" },
  { label: "Small business owners",                  desc: "Professional identity without a physical office" },
  { label: "Real estate agents",                     desc: "Listing contacts that don't follow you for years" },
  { label: "Attorneys and accountants",              desc: "Separate billing entity from personal availability" },
  { label: "Sales reps running a side business",     desc: "Clean separation between employer line and personal brand" },
]

export default function BusinessNumberPage() {
  return (
    <PageLayout>
      {/* ── Hero — two-column with image slot ──────────────────── */}
      <PageHero
        eyebrow="Business Phone Numbers"
        h1="A business number that means business."
        sub="Dedicated professional lines. No personal number exposure. No blurred lines between work and life."
        trustItems={["Dedicated line", "Forwards to any device", "Business hours routing", "Two-way SMS"]}
        primaryCta={{ label: "Start 14-day free trial", href: "/pricing" }}
        secondaryCta={{ label: "See pricing", href: "/pricing" }}
        image={{
          // Replace src with your own image to populate the hero visual
          // src: "/images/business-hero.jpg",
          alt: "Business phone number on a professional device",
        }}
      />

      {/* ── Narrative opener ───────────────────────────────────── */}
{/* ── Stats ──────────────────────────────────────────────── */}
      <StatBar stats={STATS} />

      {/* ── Feature grid ───────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <SectionHeading
          eyebrow="What you get"
          h2="Everything a dedicated business line gives you"
          sub="Five features that separate a professional line from just forwarding your cell."
        />
        <ValueGrid items={FEATURES} cols={3} />
      </section>

      {/* ── Feature split: cost comparison ─────────────────────── */}
      <section className="bg-gray-50 border-y border-gray-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FeatureSplit
            eyebrow="Cost savings"
            heading="Fraction of a legacy carrier line"
            body="A traditional business line through a legacy carrier runs $40–$80/month — plus installation, a desk phone, and a multi-year contract. A Twiching business number on Starter is a fraction of that. No hardware. No contract."
            points={[
              "No desk phone or PBX hardware needed",
              "Month-to-month — cancel anytime",
              "Works on the device you already carry",
              "Annual saving: $360–$840 vs. legacy carrier",
            ]}
            cta={{ label: "See pricing", href: "/pricing" }}
            image={{
              // src: "/images/business-savings.jpg",
              alt: "Business phone number cost comparison",
            }}
          />
        </div>
      </section>

      {/* ── Who uses business numbers ───────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div>
            <SectionHeading eyebrow="Who uses it" h2="Who gets the most from a business number" />
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

          {/* Image slot — swap in a screenshot or product photo */}
          <ImageSlot
            alt="Business phone number dashboard or app screenshot"
            aspect="aspect-[4/3]"
            // src="/images/business-who-uses.jpg"
          />
        </div>
      </section>

      <Faq />
      <FinalCta />
    </PageLayout>
  )
}
