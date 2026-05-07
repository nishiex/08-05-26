import {
  Globe,
  MapPin,
  Sparkles,
  Briefcase,
  PhoneIncoming,
  Check,
  ArrowRight,
  type LucideIcon,
} from "lucide-react"

type NumberType = {
  name: string
  bestFor: string
  desc: string
  tag: string
  Icon: LucideIcon
  featured?: boolean
}

const numberTypes: NumberType[] = [
  {
    name: "Virtual",
    bestFor: "Remote teams, expanding businesses, distributed operations.",
    desc: "Nationwide connectivity without a physical office. Route to any device from any area code.",
    tag: "Nationwide",
    Icon: Globe,
  },
  {
    name: "Local",
    bestFor: "Sales teams, real estate, regional businesses.",
    desc: "Specific area codes matching your market — 212 Manhattan, 305 Miami, 415 Bay Area.",
    tag: "4× answer rate",
    Icon: MapPin,
    featured: true,
  },
  {
    name: "Vanity",
    bestFor: "Consumer brands, advertisers, recall-dependent industries.",
    desc: "1-800-YOUR-BRAND. Numbers that survive a commute, a meeting and a distracted evening.",
    tag: "Remembered",
    Icon: Sparkles,
  },
  {
    name: "Business",
    bestFor: "Consultants, small firms, owner-operators.",
    desc: "Dedicated professional line. Separate from personal. Routes to any device you already own.",
    tag: "No crossover",
    Icon: Briefcase,
  },
  {
    name: "Second",
    bestFor: "Freelancers, agents, side-hustle owners.",
    desc: "Work and life on one phone. Two numbers. No second SIM, no extra hardware.",
    tag: "Privacy-first",
    Icon: PhoneIncoming,
  },
]

export function ComparisonTable() {
  return (
    <section id="s-compare" data-sec="compare" className="py-14 md:py-20 px-[5%] bg-slate-50/60">
      <div className="max-w-[1120px] mx-auto">
        <div className="max-w-[680px] mb-12">
          <p className="text-xs font-bold tracking-[1.5px] uppercase text-accent mb-3 font-mono">
            Five number types · one provider
          </p>
          <h2 className="font-serif text-3xl md:text-4xl font-semibold tracking-tight leading-tight mb-3">
            A number for every way your business actually communicates.
          </h2>
          <p className="text-[15px] text-gray-500 leading-relaxed">
            Different conversations need different numbers. Most providers make you pick one.
            Twiching gives you all five — from one account. Also available in 190+ countries for
            cross-border operations.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {numberTypes.map(({ Icon, name, bestFor, desc, tag, featured }) => (
            <article
              key={name}
              className={`relative rounded-3xl p-7 transition-all duration-300 ${
                featured
                  ? "bg-gradient-to-br from-accent via-[#1abcd9] to-[#1797ac] text-white shadow-[0_30px_60px_-25px_rgba(26,188,217,0.6)]"
                  : "bg-white ring-1 ring-gray-200/70 hover:ring-gray-300 hover:shadow-[0_20px_40px_-28px_rgba(15,23,42,0.25)]"
              }`}
            >
              <div className="flex items-center justify-between mb-5">
                <span
                  className={`grid place-items-center w-10 h-10 rounded-2xl ${
                    featured
                      ? "bg-white/15 ring-1 ring-white/25 text-white"
                      : "bg-[#e0f7fa] text-accent"
                  }`}
                >
                  <Icon className="h-5 w-5" strokeWidth={1.8} />
                </span>
                <span
                  className={`text-[10px] font-bold font-mono tracking-[1.5px] uppercase rounded-full px-2.5 py-1 ${
                    featured
                      ? "bg-white/15 ring-1 ring-white/25 text-white"
                      : "bg-slate-100 ring-1 ring-gray-200 text-gray-600"
                  }`}
                >
                  {tag}
                </span>
              </div>
              <h3
                className={`font-serif text-2xl font-semibold mb-3 ${
                  featured ? "text-white" : "text-black"
                }`}
              >
                {name}
              </h3>
              <p
                className={`text-[14px] leading-relaxed mb-5 ${
                  featured ? "text-white/85" : "text-gray-500"
                }`}
              >
                {desc}
              </p>
              <div
                className={`flex items-start gap-2 text-[13px] font-medium pt-4 border-t ${
                  featured ? "text-white/90 border-white/20" : "text-gray-700 border-gray-100"
                }`}
              >
                <Check
                  className={`h-4 w-4 mt-0.5 shrink-0 ${featured ? "text-white" : "text-accent"}`}
                  strokeWidth={2.4}
                />
                <span>
                  <span className="block text-[10px] font-mono tracking-[1.5px] uppercase opacity-60 mb-0.5">
                    Best for
                  </span>
                  {bestFor}
                </span>
              </div>
            </article>
          ))}

          {/* Shared features card — softer, no hard border */}
          <div className="rounded-3xl p-7 bg-white/60 backdrop-blur ring-1 ring-dashed ring-gray-300">
            <p className="text-[11px] font-bold tracking-[1.5px] uppercase text-gray-500 font-mono mb-4">
              Every number includes
            </p>
            <ul className="space-y-3 text-[13.5px] text-gray-700">
              {[
                "Inbound routing to any device",
                "Two-way SMS capability",
                "Voicemail and call forwarding",
                "STIR/SHAKEN attestation",
                "Connection to the full stack",
              ].map((item) => (
                <li key={item} className="flex items-center gap-2.5">
                  <span className="grid place-items-center h-5 w-5 rounded-full bg-[#e0f7fa] text-accent">
                    <Check className="h-3 w-3" strokeWidth={2.6} />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Final cap ribbon — softer, no hard rectangle */}
        <div className="mt-10 rounded-full bg-white ring-1 ring-gray-200/70 px-6 py-4 flex flex-wrap items-center justify-between gap-4 shadow-[0_10px_30px_-20px_rgba(15,23,42,0.2)]">
          <p className="text-[14.5px] text-gray-700">
            <span className="font-serif font-semibold">One account, five number types.</span>{" "}
            Provisioning included — no per-number fees on standard numbers.
          </p>
          <a
            href="#"
            className="group inline-flex items-center gap-2 bg-accent text-white text-[13px] font-semibold font-mono pl-5 pr-2 py-1.5 rounded-full hover:bg-[color:var(--accent-dark)] transition-colors"
          >
            See pricing
            <span className="grid place-items-center h-6 w-6 rounded-full bg-white/15 transition-transform group-hover:translate-x-0.5">
              <ArrowRight className="h-3 w-3" strokeWidth={2.4} />
            </span>
          </a>
        </div>
      </div>
    </section>
  )
}
