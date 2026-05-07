import { Metadata } from "next"
import { PageLayout } from "@/components/page-layout"
import { PageHero, SectionHeading, StatBar, FeatureSplit, ImageSlot } from "@/components/page-parts"
import { FinalCta } from "@/components/final-cta"
import { Faq } from "@/components/faq"

export const metadata: Metadata = {
  title: "Vanity Phone Numbers · 1-800 Numbers That Get Remembered | Twiching",
  description:
    "Vanity toll-free and local vanity numbers. Spell your brand. Search available patterns. 14-day free trial.",
}

const STATS = [
  { value: "7×", label: "More memorable", note: "vs. random digits" },
  { value: "800+", label: "Patterns available", note: "toll-free & local" },
  { value: "All", label: "Prefixes covered", note: "800, 888, 877, 866..." },
  { value: "24h", label: "Activation time", note: "most are instant" },
]

const PATTERNS = [
  {
    example: "1-800-FLOWERS",
    type: "Brand keyword",
    note: "Spells what you sell. The strongest pattern for ad recall.",
  },
  {
    example: "1-800-CONTACTS",
    type: "Product name",
    note: "Says exactly what you are in 7 letters.",
  },
  {
    example: "1-800-800-8000",
    type: "Repeating digits",
    note: "Rhythm-based memory. Easy to say, hard to forget.",
  },
  {
    example: "212-555-LOAN",
    type: "Local vanity",
    note: "Local area code plus keyword. Best for regional advertisers.",
  },
]

export default function VanityNumberPage() {
  return (
    <PageLayout>
      {/* ── Hero — two-column with image slot ──────────────────── */}
      <PageHero
        eyebrow="Vanity Phone Numbers"
        h1="The only phone number your customers will remember."
        sub="1-800 vanity numbers that spell your brand. Built for businesses that advertise."
        trustItems={["Custom patterns", "Toll-free", "STIR/SHAKEN", "All 800 prefixes"]}
        primaryCta={{ label: "Start 14-day free trial", href: "/pricing" }}
        secondaryCta={{ label: "See pricing", href: "/pricing" }}
        image={{
          // Replace src with your own image to populate the hero visual
          // src: "/images/vanity-hero.jpg",
          alt: "Vanity number billboard advertisement",
        }}
      />

      {/* ── Narrative opener ───────────────────────────────────── */}
{/* ── Stats ──────────────────────────────────────────────── */}
      <StatBar stats={STATS} />

      {/* ── Pattern showcase ───────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <SectionHeading
          eyebrow="What works"
          h2="Two patterns dominate vanity numbers"
          sub="Numbers that spell something or repeat a rhythm. Both beat random digits on every recall test."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {PATTERNS.map(({ example, type, note }) => (
            <div
              key={example}
              className="rounded-2xl border border-gray-100 bg-white p-6 hover:border-accent/30 hover:shadow-sm transition-all"
            >
              <p className="font-mono text-[18px] font-bold text-gray-900 mb-2 tracking-tight">{example}</p>
              <p className="text-[11px] font-mono font-bold uppercase tracking-wider text-accent mb-2">{type}</p>
              <p className="text-[13px] text-gray-500 leading-relaxed">{note}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Feature split: toll-free options ───────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <FeatureSplit
          eyebrow="Toll-free vanity"
          heading="All major 800 prefixes available"
          body="800, 888, 877, 866, 855, 844, 833 — every toll-free prefix is available for vanity patterns. Search by keyword or phonetic pattern to see what's open."
          points={[
            "Search your brand name, product, or tagline",
            "All toll-free prefixes — not just 800",
            "Custom patterns and partial matches available",
            "Same routing, SMS, and features as standard numbers",
          ]}
          cta={{ label: "Find your number", href: "/pricing" }}
          image={{
            // src: "/images/vanity-tollfree.jpg",
            alt: "Toll-free vanity number search interface",
          }}
        />
      </section>

      {/* ── Feature split: local vanity (reversed) ─────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <FeatureSplit
          eyebrow="Local vanity"
          heading="Local area code. Memorable pattern."
          body="Want 212-555-LOAN or 415-CAB-HOME? Local vanity numbers combine the credibility of a city area code with the memorability of a keyword pattern."
          points={[
            "Pairs city-level credibility with brand recall",
            "Available wherever local vanity patterns exist",
            "Best for regional TV, radio, and outdoor advertising",
          ]}
          cta={{ label: "Start free trial", href: "/pricing" }}
          image={{
            // src: "/images/vanity-local.jpg",
            alt: "Local vanity number on a billboard",
          }}
          reverse
        />
      </section>

      {/* ── How to find yours ──────────────────────────────────── */}
      <section className="bg-gray-50 border-y border-gray-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <SectionHeading
                eyebrow="Process"
                h2="How to find your vanity number"
              />
              <ol className="space-y-5">
                {[
                  { n: "01", step: "Tell us your brand, keyword, or pattern", note: "A word, acronym, or phonetic sequence you want to spell." },
                  { n: "02", step: "Get a list of available options",         note: "We search all prefixes and local area codes for matches." },
                  { n: "03", step: "Pick and activate",                       note: "Instant provisioning. Same routing and features as any number." },
                ].map(({ n, step, note }) => (
                  <li key={n} className="flex items-start gap-4">
                    <span className="font-mono text-[11px] font-bold text-accent bg-[#e0f7fa] px-2 py-1 rounded mt-0.5 flex-shrink-0">
                      {n}
                    </span>
                    <div>
                      <p className="font-semibold text-[14px] text-gray-900 mb-0.5">{step}</p>
                      <p className="text-[13px] text-gray-500">{note}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
            {/* Image slot — swap in a process diagram or screenshot */}
            <ImageSlot
              alt="Vanity number search and activation process"
              aspect="aspect-[4/3]"
              // src="/images/vanity-process.jpg"
            />
          </div>
        </div>
      </section>

      <Faq />
      <FinalCta />
    </PageLayout>
  )
}
