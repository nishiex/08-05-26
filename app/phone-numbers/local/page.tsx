import { Metadata } from "next"
import { PageLayout } from "@/components/page-layout"
import { PageHero, SectionHeading, StatBar, ValueGrid, FeatureSplit, ImageSlot, DarkBand, RelatedCards } from "@/components/page-parts"
import { FinalCta } from "@/components/final-cta"
import { Faq } from "@/components/faq"
import { MapPin, TrendingUp, Globe, Layers } from "lucide-react"

export const metadata: Metadata = {
  title: "Local Phone Numbers · Any Area Code, Any City | Twiching",
  description:
    "Local area codes in every major market. 212, 305, 415, 312, and more. 14-day free trial.",
}

const STATS = [
  { value: "3×", label: "Higher answer rate", note: "vs. unknown numbers" },
  { value: "190+", label: "Countries covered", note: "global availability" },
  { value: "24h", label: "Provisioning time", note: "most are instant" },
  { value: "200+", label: "US area codes", note: "every major market" },
]

const BENEFITS = [
  {
    icon: MapPin,
    title: "Local identity, city by city",
    body: "212 says Manhattan. 305 says Miami. 415 says the Bay Area. Match the area code to the market — prospects notice when you don't.",
  },
  {
    icon: TrendingUp,
    title: "Increase answer rates",
    body: "Local numbers answer at 3× the rate of unknown out-of-state calls. More answered calls means more conversations without more dials.",
  },
  {
    icon: Globe,
    title: "190+ countries available",
    body: "Multi-country operations can add local presence in international markets without opening regional offices or managing multiple providers.",
  },
  {
    icon: Layers,
    title: "All managed in one place",
    body: "10 cities, 10 local numbers, one dashboard. All routed to the same central team. No juggling accounts or separate bills.",
  },
]

const AREA_CODES = [
  { code: "212 / 646 / 917", city: "New York" },
  { code: "310 / 323 / 424", city: "Los Angeles" },
  { code: "305 / 786", city: "Miami" },
  { code: "415 / 628", city: "San Francisco" },
  { code: "312 / 872", city: "Chicago" },
  { code: "617 / 857", city: "Boston" },
  { code: "214 / 972 / 469", city: "Dallas" },
  { code: "404 / 678 / 770", city: "Atlanta" },
]

const RELATED = [
  {
    title: "Virtual phone numbers",
    desc: "Broader nationwide reach — any area code, not tied to a specific city.",
    href: "/phone-numbers/virtual",
  },
  {
    title: "Vanity phone numbers",
    desc: "1-800-YOUR-BRAND. Numbers people remember and repeat.",
    href: "/phone-numbers/vanity",
  },
  {
    title: "Business phone numbers",
    desc: "A dedicated professional line. Separate from personal, routes to any device.",
    href: "/phone-numbers/business",
  },
]

export default function LocalNumberPage() {
  return (
    <PageLayout>
      {/* ── Hero — two-column with image slot ──────────────────── */}
      <PageHero
        eyebrow="Local Phone Numbers"
        h1="A local area code. In any city. Without the office."
        sub="Local numbers that make your business feel like it is already next door."
        trustItems={["Every major area code", "Instant provisioning", "STIR/SHAKEN", "190+ countries"]}
        primaryCta={{ label: "Start 14-day free trial", href: "/pricing" }}
        secondaryCta={{ label: "See pricing", href: "/pricing" }}
        image={{
          // Replace src with your own image URL to populate the hero visual
          // src: "/images/local-hero.jpg",
          alt: "Local phone number hero — city presence",
        }}
      />


      {/* ── Stats ──────────────────────────────────────────────── */}
      <StatBar stats={STATS} />

      {/* ── Benefits grid ──────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <SectionHeading
          eyebrow="Local presence"
          h2="What a local number does for your business"
          sub="Four ways local numbers move the needle — beyond just call routing."
        />
        <ValueGrid items={BENEFITS} cols={4} />
      </section>

      {/* ── Feature split: answer-rate math ────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <FeatureSplit
          eyebrow="The math"
          heading="What the answer-rate difference is worth"
          body="200 dials a week at a 15% unknown-number answer rate gets you 30 conversations. The same 200 dials from a matching local area code — at 45% — gets you 90. That is 60 additional conversations per rep per week without a single extra dial."
          points={[
            "3× higher answer rate vs. unknown out-of-state",
            "Applies to cold outbound and warm follow-up equally",
            "Scales with rep count — 10 reps = 600 extra conversations/week",
          ]}
          cta={{ label: "Start free trial", href: "/pricing" }}
          image={{
            // src: "/images/local-answer-rate.jpg",
            alt: "Answer rate comparison chart",
          }}
        />
      </section>

      {/* ── Dark band: area codes ───────────────────────────────── */}
      <DarkBand>
        <SectionHeading eyebrow="Coverage" h2="Major markets, covered" />
        <p className="text-base text-gray-400 leading-relaxed max-w-[520px] mb-10 -mt-4">
          Every major US market is available, plus 190+ countries for international operations.
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {AREA_CODES.map(({ code, city }) => (
            <div key={city} className="rounded-2xl bg-white/5 border border-white/10 px-5 py-4">
              <p className="font-mono text-[13px] font-bold text-[#95d9e8] mb-1">{code}</p>
              <p className="text-[12px] text-gray-400">{city}</p>
            </div>
          ))}
        </div>
        <p className="mt-6 text-[12px] text-gray-500">
          Full US coverage plus international markets.{" "}
          <a href="#" className="text-[#1abcd9] hover:underline">
            Ask about your target market.
          </a>
        </p>
      </DarkBand>

      {/* ── Feature split: multi-market with image ─────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <FeatureSplit
          eyebrow="Multi-market"
          heading="Running across multiple cities"
          body="10 cities? Add a local number for each. All routed to your central team. All managed from one dashboard. Caller ID shows the local number, not your HQ area code."
          points={[
            "One account for all your local numbers",
            "Each city number routes to the same team",
            "Caller ID shows the local number — not your HQ area code",
            "Available in 190+ countries for global operations",
          ]}
          cta={{ label: "Start free trial", href: "/pricing" }}
          image={{
            // src: "/images/local-multi-market.jpg",
            alt: "Multi-market phone number routing diagram",
          }}
          reverse
        />
      </section>

      {/* ── Example setup card ─────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <div className="rounded-2xl border border-gray-100 bg-gray-50 p-8">
            <p className="text-[10px] font-mono font-bold tracking-[2px] uppercase text-accent mb-5">
              Example setup
            </p>
            <div className="space-y-3">
              {[
                { city: "New York", code: "212" },
                { city: "Miami", code: "305" },
                { city: "Los Angeles", code: "310" },
                { city: "Chicago", code: "312" },
                { city: "San Francisco", code: "415" },
              ].map(({ city, code }) => (
                <div
                  key={city}
                  className="flex items-center justify-between py-2.5 border-b border-gray-100 last:border-0"
                >
                  <span className="text-[13px] font-semibold text-gray-700">{city}</span>
                  <span className="text-[11px] font-mono text-accent font-bold bg-[#e0f7fa] px-2 py-0.5 rounded">
                    {code}
                  </span>
                  <span className="text-[12px] text-gray-400">Central support team</span>
                </div>
              ))}
            </div>
          </div>

          {/* Image slot — swap in your own src */}
          <ImageSlot
            alt="City coverage map or dashboard screenshot"
            aspect="aspect-[4/3]"
          // src="/images/local-setup-visual.jpg"
          />
        </div>
      </section>

      <Faq />
      <RelatedCards heading="Explore other number types" cards={RELATED} />
      <FinalCta />
    </PageLayout>
  )
}
