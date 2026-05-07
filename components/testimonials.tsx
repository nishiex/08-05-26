import { Quote } from "lucide-react"

export interface TestimonialItem {
  quote: string
  name: string
  role: string
  initial: string
}

const defaultQuotes: TestimonialItem[] = [
  {
    quote:
      "Every listing city has its own local number now. Open-house calls actually get answered — no more screened voicemails from unknown prefixes.",
    name: "Marcus Whitfield",
    role: "Broker · Arbor Homes Realty",
    initial: "M",
  },
  {
    quote:
      "Moved our appointment reminders and after-hours line in a weekend. Patients don&apos;t hit voicemail at 5:01 PM anymore, and the whole thing stayed HIPAA-aligned.",
    name: "Dr. Elaine Carter",
    role: "Director · Northside Family Clinic",
    initial: "E",
  },
  {
    quote:
      "Our support number used to show as &ldquo;unknown caller&rdquo; in customers&apos; CRMs. Not anymore. One account, one bill, one team that picks up.",
    name: "Devon Harper",
    role: "Co-founder · Telemetry SaaS",
    initial: "D",
  },
]

interface TestimonialsProps {
  quotes?: TestimonialItem[]
  eyebrow?: string
  heading?: string
}

export function Testimonials({
  quotes = defaultQuotes,
  eyebrow = "What businesses say",
  heading = "From solo practices to 500-seat teams — Twiching carries the call.",
}: TestimonialsProps) {
  return (
    <section
      id="s-testi"
      data-sec="testimonials"
      className="py-14 md:py-20 px-[5%] bg-white"
    >
      <div className="max-w-[1120px] mx-auto">
        <p className="text-xs font-medium tracking-[1.5px] uppercase text-accent mb-3 font-mono">
          {eyebrow}
        </p>
        <h2 className="font-serif text-3xl md:text-4xl font-medium tracking-tight leading-tight mb-12 max-w-[680px]">
          {heading}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {quotes.map((q) => (
            <figure
              key={q.name}
              className="relative rounded-3xl p-8 bg-white ring-1 ring-gray-200/70 hover:ring-gray-300 hover:shadow-[0_20px_40px_-28px_rgba(15,23,42,0.3)] transition-all"
            >
              <Quote className="h-7 w-7 text-accent/60 mb-5" strokeWidth={1.5} />
              <blockquote
                className="text-[15px] text-gray-700 leading-relaxed mb-6 font-serif"
                dangerouslySetInnerHTML={{ __html: `&ldquo;${q.quote}&rdquo;` }}
              />
              <figcaption className="flex items-center gap-3 border-t border-gray-100 pt-5">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#95d9e8]/40 to-[#95d9e8]/70 grid place-items-center text-accent font-medium text-sm font-mono">
                  {q.initial}
                </div>
                <div>
                  <div className="text-sm font-medium">{q.name}</div>
                  <div className="text-xs text-gray-500 font-mono">{q.role}</div>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
