import { ArrowRight, Check, X, Image as ImageIcon } from "lucide-react"
export { FaqSection } from "@/components/faq-section"

/* ─────────────────────────────────────────────────────────────────────
   IMAGE SLOT
   A dedicated, flexible image zone that renders an <img> when `src` is
   provided, or a clearly-labelled placeholder when it isn't.
   Use this wherever an image can be inserted on a page.
───────────────────────────────────────────────────────────────────── */
interface ImageSlotProps {
  /** Full URL or local path of the image to display */
  src?: string
  /** Alt text for the image */
  alt?: string
  /** Aspect ratio class, e.g. "aspect-video" | "aspect-square" | "aspect-[4/3]" */
  aspect?: string
  className?: string
}

export function ImageSlot({ src, alt = "", aspect = "aspect-video", className = "" }: ImageSlotProps) {
  return (
    <div
      className={`w-[800] ${aspect} rounded-2xl overflow-hidden border border-gray-100 bg-gray-50 relative`}
    >
      {src ? (
        <img
          src={src}
          alt={alt}
          className={` object-cover ${className}`}
        />
      ) : (
        /* Placeholder: drop in your real src prop to replace */
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-gray-300 select-none">
          <ImageIcon className="h-10 w-10" strokeWidth={1.2} />
          <span className="text-[11px] font-mono tracking-wider uppercase">
            {alt || "Insert image here"}
          </span>
        </div>
      )}
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────────────
   TRUST PILL & TRUST BAR
───────────────────────────────────────────────────────────────────── */
function TrustPill({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 bg-gray-50 border border-gray-200 text-gray-500 text-[11px] font-mono font-semibold px-3 py-1 rounded-full">
      <Check className="h-3 w-3 text-accent flex-shrink-0" strokeWidth={2.5} />
      {label}
    </span>
  )
}

export function TrustBar({ items }: { items: string[] }) {
  return (
    <div className="flex flex-wrap items-center gap-2 mt-6">
      {items.map((item) => <TrustPill key={item} label={item} />)}
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────────────
   PAGE HERO
   Two-column split: left = headline + CTAs, right = ImageSlot.
   The `image` prop is optional — omit for a placeholder visual.
───────────────────────────────────────────────────────────────────── */
interface PageHeroProps {
  eyebrow?: string
  h1: string
  sub: string
  trustItems?: string[]
  primaryCta?: { label: string; href: string }
  secondaryCta?: { label: string; href: string }
  /** Optional image for the hero right column */
  image?: { src?: string; alt?: string; className?: string; aspect?: string }
  /** Accent color override for the eyebrow dot */
  accentClass?: string
}

export function PageHero({
  eyebrow, h1, sub, trustItems = [], primaryCta, secondaryCta, image,
}: PageHeroProps) {
  const hasImage = image !== undefined

  return (
    <section className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-20">
      <div className={`grid gap-10 items-center ${hasImage ? "grid-cols-1 lg:grid-cols-[4fr_8fr]" : "grid-cols-1"}`}>
        {/* Left: text */}
        <div className={hasImage ? "" : "max-w-[800px]"}>
          {eyebrow && (
            <div className="flex items-center gap-2 mb-5">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-accent" />
              <p className="text-[11px] font-mono font-bold tracking-[2px] uppercase text-accent">{eyebrow}</p>
            </div>
          )}
          <h1 className="text-2xl sm:text-[28px] lg:text-[30px] font-medium tracking-tight text-gray-900 leading-[1.2] text-balance">
            {h1}
          </h1>
          <p className="mt-5 text-base sm:text-lg text-gray-500 leading-relaxed max-w-[520px]">
            {sub}
          </p>

          {trustItems.length > 0 && (
            <div className="flex flex-wrap items-center gap-2 mt-6">
              {trustItems.map((item) => <TrustPill key={item} label={item} />)}
            </div>
          )}

          {(primaryCta || secondaryCta) && (
            <div className="flex flex-wrap items-center gap-3 mt-8">
              {primaryCta && (
                <a
                  href={primaryCta.href}
                  className="inline-flex items-center gap-2 bg-accent text-white text-[14px] font-semibold px-5 py-2.5 rounded-lg hover:bg-accent-dark transition-colors shadow-sm"
                >
                  {primaryCta.label}
                  <ArrowRight className="h-4 w-4" />
                </a>
              )}
              {secondaryCta && (
                <a
                  href={secondaryCta.href}
                  className="inline-flex items-center gap-2 text-[14px] font-semibold text-gray-600 px-5 py-2.5 rounded-lg border border-gray-200 hover:border-gray-400 hover:text-gray-900 transition-colors"
                >
                  {secondaryCta.label}
                </a>
              )}
            </div>
          )}
        </div>

        {/* Right: image (only rendered when prop is provided) */}
        {hasImage && (
          <div className="w-full">
            <ImageSlot
              src={image!.src}
              alt={image!.alt}
              aspect={image!.aspect ?? "aspect-[2/1]"}
              className={image!.className ?? ""}
            />
          </div>
        )}
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────────────────────────────────
   SECTION HEADING
───────────────────────────────────────────────────────────────────── */
export function SectionHeading({
  eyebrow, h2, sub, align = "left",
}: {
  eyebrow?: string
  h2: string
  sub?: string
  align?: "left" | "center"
}) {
  const base = align === "center" ? "text-center mx-auto" : ""
  return (
    <div className={`mb-10 ${base}`}>
      {eyebrow && (
        <div className={`flex items-center gap-2 mb-3 ${align === "center" ? "justify-center" : ""}`}>
          <span className="inline-block w-1 h-1 rounded-full bg-accent" />
          <p className="text-[10px] font-mono font-bold tracking-[2.5px] uppercase text-accent">{eyebrow}</p>
        </div>
      )}
      <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-[#48cae0] text-balance leading-tight">{h2}</h2>
      {sub && <p className="mt-4 text-base text-gray-500 leading-relaxed max-w-[580px]">{sub}</p>}
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────────────
   FEATURE SPLIT
   Two-column: text left, ImageSlot right (or reversed).
   The `image` prop is optional — omit or pass `src` to swap in a real photo.
───────────────────────────────────────────────────────────────────── */
interface FeatureSplitProps {
  eyebrow?: string
  heading: string
  body: string
  points?: string[]
  cta?: { label: string; href: string }
  /** Image slot — omit `src` to show placeholder */
  image?: { src?: string; alt?: string }
  reverse?: boolean
}

export function FeatureSplit({ eyebrow, heading, body, points, cta, image, reverse }: FeatureSplitProps) {
  return (
    <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center ${reverse ? "lg:[&>*:first-child]:order-last" : ""}`}>
      <div>
        {eyebrow && (
          <div className="flex items-center gap-2 mb-4">
            <span className="inline-block w-1 h-1 rounded-full bg-accent" />
            <p className="text-[10px] font-mono font-bold tracking-[2px] uppercase text-accent">{eyebrow}</p>
          </div>
        )}
        <h3 className="text-2xl sm:text-3xl font-semibold tracking-tight text-gray-900 text-balance leading-tight mb-4">{heading}</h3>
        <p className="text-base text-gray-500 leading-relaxed mb-6">{body}</p>
        {points && (
          <ul className="space-y-3 mb-6">
            {points.map((p) => (
              <li key={p} className="flex items-start gap-3 text-[14px] text-gray-700">
                <Check className="h-4 w-4 text-accent mt-0.5 flex-shrink-0" strokeWidth={2.5} />
                {p}
              </li>
            ))}
          </ul>
        )}
        {cta && (
          <a
            href={cta.href}
            className="inline-flex items-center gap-1.5 text-accent text-[14px] font-semibold hover:gap-2.5 transition-all"
          >
            {cta.label} <ArrowRight className="h-3.5 w-3.5" />
          </a>
        )}
      </div>
      <div>
        <ImageSlot src={image?.src} alt={image?.alt} aspect="aspect-[4/3]" />
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────────────
   STAT BAR
   Full-width horizontal band of key metrics.
───────────────────────────────────────────────────────────────────── */
interface Stat { value: string; label: string; note?: string }

export function StatBar({ stats }: { stats: Stat[] }) {
  return (
    <section className="border-y border-gray-100 bg-gray-50/60 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
          {stats.map(({ value, label, note }) => (
            <div key={label} className="flex flex-col gap-1">
              <span className="text-3xl sm:text-4xl font-semibold tracking-tight text-gray-900">{value}</span>
              <span className="text-[13px] font-medium text-gray-500">{label}</span>
              {note && <span className="text-[11px] text-gray-400 font-mono">{note}</span>}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────────────────────────────────
   VALUE GRID
   Responsive grid of benefit cards. Icon + title + body.
───────────────────────────────────────────────────────────────────── */
interface ValueItem {
  icon: React.ElementType
  title: string
  body: string
  /** Optional accent color for the icon bg: "blue" | "slate" | "green" */
  variant?: "blue" | "slate"
}

export function ValueGrid({ items, cols = 4 }: { items: ValueItem[]; cols?: 2 | 3 | 4 }) {
  const colClass = {
    2: "grid-cols-1 sm:grid-cols-2",
    3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
  }[cols]

  return (
    <div className={`grid ${colClass} gap-5`}>
      {items.map(({ icon: Icon, title, body, variant = "blue" }) => (
        <div
          key={title}
          className="group rounded-2xl border border-gray-100 bg-white p-6 hover:border-accent/30 hover:shadow-sm transition-all"
        >
          <div
            className={`w-9 h-9 rounded-xl grid place-items-center mb-5 ${variant === "blue" ? "bg-[#e0f7fa] text-accent" : "bg-gray-100 text-gray-500"}`}
          >
            <Icon className="h-4.5 w-4.5" strokeWidth={1.8} />
          </div>
          <h3 className="font-semibold text-[15px] text-gray-900 mb-2 leading-snug">{title}</h3>
          <p className="text-[13px] text-gray-500 leading-relaxed">{body}</p>
        </div>
      ))}
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────────────
   VALUE CARD  (single card — kept for backward compat)
───────────────────────────────────────────────────────────────────── */
export function ValueCard({ icon: Icon, title, body }: { icon: React.ElementType; title: string; body: string }) {
  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-6 hover:border-accent/30 hover:shadow-sm transition-all">
      <div className="w-9 h-9 rounded-xl bg-[#e0f7fa] text-accent grid place-items-center mb-5">
        <Icon className="h-4.5 w-4.5" strokeWidth={1.8} />
      </div>
      <h3 className="font-semibold text-[15px] text-gray-900 mb-2">{title}</h3>
      <p className="text-[13px] text-gray-500 leading-relaxed">{body}</p>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────────────
   INLINE LIST  — checklist with optional image beside it
───────────────────────────────────────────────────────────────────── */
export function InlineList({
  items, image,
}: {
  items: string[]
  image?: { src?: string; alt?: string }
}) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
      <ul className="space-y-3">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-3 text-[14px] text-gray-700">
            <Check className="h-4 w-4 text-accent mt-0.5 flex-shrink-0" strokeWidth={2.5} />
            {item}
          </li>
        ))}
      </ul>
      {image && <ImageSlot src={image.src} alt={image.alt} aspect="aspect-[4/3]" />}
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────────────
   DARK BAND  — full-width dark stripe with inner content slot
───────────────────────────────────────────────────────────────────── */
export function DarkBand({ children }: { children: React.ReactNode }) {
  return (
    <section className="bg-gray-950 text-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {children}
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────────────────────────────────
   USE CASE CARDS
───────────────────────────────────────────────────────────────────── */
export function UseCaseCard({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-6">
      <h3 className="font-semibold text-[15px] text-gray-900 mb-2">{title}</h3>
      <p className="text-[13px] text-gray-500 leading-relaxed">{body}</p>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────────────
   FEATURE BLOCK  — kept for backward compat
───────────────────────────────────────────────────────────────────── */
interface FeatureBlockProps {
  eyebrow?: string
  heading: string
  body: string
  points?: string[]
  cta?: { label: string; href: string }
  visual: React.ReactNode
  reverse?: boolean
}
export function FeatureBlock({ eyebrow, heading, body, points, cta, visual, reverse }: FeatureBlockProps) {
  return (
    <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center ${reverse ? "lg:[&>*:first-child]:order-2" : ""}`}>
      <div>
        {eyebrow && (
          <div className="flex items-center gap-2 mb-4">
            <span className="inline-block w-1 h-1 rounded-full bg-accent" />
            <p className="text-[10px] font-mono font-bold tracking-[2px] uppercase text-accent">{eyebrow}</p>
          </div>
        )}
        <h3 className="text-3xl sm:text-4xl font-semibold tracking-tight text-gray-900 text-balance leading-tight mb-4">{heading}</h3>
        <p className="text-base text-gray-500 leading-relaxed mb-6">{body}</p>
        {points && (
          <ul className="space-y-3 mb-6">
            {points.map((p) => (
              <li key={p} className="flex items-start gap-3 text-[14px] text-gray-700">
                <Check className="h-4 w-4 text-accent mt-0.5 flex-shrink-0" strokeWidth={2.5} />
                {p}
              </li>
            ))}
          </ul>
        )}
        {cta && (
          <a href={cta.href} className="inline-flex items-center gap-1.5 text-accent text-[14px] font-semibold hover:gap-2.5 transition-all">
            {cta.label} <ArrowRight className="h-3.5 w-3.5" />
          </a>
        )}
      </div>
      <div>{visual}</div>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────────────
   RELATED CARDS
───────────────────────────────────────────────────────────────────── */
interface RelatedCard { title: string; desc: string; href: string }
export function RelatedCards({ heading, cards }: { heading: string; cards: RelatedCard[] }) {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t border-gray-100">
      <SectionHeading eyebrow="Explore more" h2={heading} />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {cards.map((c) => (
          <a
            key={c.href}
            href={c.href}
            className="group block p-6 rounded-2xl border border-gray-100 bg-white hover:border-accent/30 hover:shadow-sm transition-all"
          >
            <h3 className="font-semibold text-[15px] text-gray-900 group-hover:text-accent transition-colors mb-2">{c.title}</h3>
            <p className="text-[13px] text-gray-500 leading-relaxed">{c.desc}</p>
            <span className="mt-4 inline-flex items-center gap-1 text-accent text-[12px] font-semibold">
              Learn more <ArrowRight className="h-3 w-3 group-hover:translate-x-0.5 transition-transform" />
            </span>
          </a>
        ))}
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────────────────────────────────
   COMPARE TABLE
───────────────────────────────────────────────────────────────────── */
export function CompareTable({
  headers,
  rows,
}: {
  headers: string[]
  rows: { label: string; values: string[] }[]
}) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-gray-100 shadow-sm mt-8">
      <table className="w-full text-[13px]">
        <thead>
          <tr className="border-b border-gray-100 bg-gray-50">
            <th className="text-left px-6 py-4 text-[11px] font-bold tracking-[1.5px] uppercase text-gray-400 w-[240px]">{headers[0]}</th>
            {headers.slice(1).map((h) => (
              <th key={h} className="text-left px-6 py-4 text-[11px] font-bold tracking-[1.5px] uppercase text-gray-700">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className={`border-b border-gray-50 last:border-0 ${i % 2 === 0 ? "bg-white" : "bg-gray-50/40"}`}>
              <td className="px-6 py-4 font-medium text-gray-400 flex items-center gap-2">
                <X className="h-3.5 w-3.5 text-red-300 flex-shrink-0" strokeWidth={2.5} />{row.label}
              </td>
              {row.values.map((v, j) => (
                <td key={j} className="px-6 py-4 text-gray-700 font-medium">
                  <span className="flex items-center gap-2">
                    <Check className="h-3.5 w-3.5 text-accent flex-shrink-0" strokeWidth={2.5} />{v}
                  </span>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────────────
   NEXT STEP BAND  — CTA footer band
───────────────────────────────────────────────────────────────────── */
export function NextStepBand({
  heading, sub, primary, secondary,
}: {
  heading?: string
  sub?: string
  primary: { label: string; href: string }
  secondary?: { label: string; href: string }
}) {
  return (
    <section className="bg-accent py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl sm:text-4xl font-semibold text-white text-balance mb-4 tracking-tight">
          {heading ?? "Ready to get started?"}
        </h2>
        {sub && <p className="text-base text-white/70 leading-relaxed max-w-[520px] mx-auto mb-8">{sub}</p>}
        {!sub && <div className="mb-8" />}
        <div className="flex flex-wrap items-center justify-center gap-3">
          <a
            href={primary.href}
            className="inline-flex items-center gap-2 bg-white text-accent text-[14px] font-semibold px-6 py-3 rounded-lg hover:bg-[#e0f7fa] transition-colors shadow-sm"
          >
            {primary.label} <ArrowRight className="h-4 w-4" />
          </a>
          {secondary && (
            <a
              href={secondary.href}
              className="inline-flex items-center gap-2 text-[14px] font-semibold text-white/80 px-6 py-3 rounded-lg border border-white/30 hover:border-white transition-colors"
            >
              {secondary.label}
            </a>
          )}
        </div>
      </div>
    </section>
  )
}
