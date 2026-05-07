import { MegaNav } from "@/components/mega-nav"
import { Footer } from "@/components/footer"
import { ArrowRight } from "lucide-react"

interface InnerLayoutProps {
  eyebrow: string
  headline: string
  subhead: string
  ctaLabel?: string
  ctaHref?: string
  children: React.ReactNode
}

export function InnerLayout({ eyebrow, headline, subhead, ctaLabel = "Start Free Trial", ctaHref = "/pricing", children }: InnerLayoutProps) {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <MegaNav />

      {/* Hero */}
      <section className="pt-32 pb-16 px-[5%] max-w-[1200px] mx-auto">
        <p className="text-[11px] font-mono font-bold tracking-[2px] uppercase text-accent mb-4">{eyebrow}</p>
        <h1 className="text-[42px] md:text-[56px] font-serif font-bold text-foreground leading-[1.08] tracking-tight max-w-[700px] mb-5 text-balance">
          {headline}
        </h1>
        <p className="text-[16px] text-muted-foreground leading-relaxed max-w-[520px] mb-8 text-pretty">
          {subhead}
        </p>
        <a
          href={ctaHref}
          className="inline-flex items-center gap-2 bg-accent text-white font-mono font-semibold text-[14px] px-6 py-3 rounded-full hover:bg-[#1797ac] transition-colors"
        >
          {ctaLabel}
          <ArrowRight className="h-4 w-4" strokeWidth={2.2} />
        </a>
      </section>

      {/* Divider */}
      <div className="border-t border-border" />

      {/* Page content */}
      <main className="px-[5%] max-w-[1200px] mx-auto py-16">
        {children}
      </main>

      <Footer />
    </div>
  )
}

/* ─── Reusable section blocks ─────────────────────────────────── */

export function SectionHeading({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div className="mb-10">
      <p className="text-[10px] font-mono font-bold tracking-[2px] uppercase text-accent mb-2">{eyebrow}</p>
      <h2 className="text-[28px] md:text-[36px] font-serif font-bold text-foreground leading-tight tracking-tight text-balance">
        {title}
      </h2>
    </div>
  )
}

export function FeatureGrid({ items }: { items: { icon: string; title: string; desc: string }[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border border border-border rounded-2xl overflow-hidden">
      {items.map(({ icon, title, desc }) => (
        <div key={title} className="bg-background p-6">
          <div className="text-2xl mb-3">{icon}</div>
          <p className="text-[15px] font-semibold text-foreground mb-1">{title}</p>
          <p className="text-[13px] text-muted-foreground leading-relaxed">{desc}</p>
        </div>
      ))}
    </div>
  )
}

export function StatRow({ stats }: { stats: { value: string; label: string }[] }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-border border border-border rounded-2xl overflow-hidden my-12">
      {stats.map(({ value, label }) => (
        <div key={label} className="bg-background p-6 text-center">
          <p className="text-[36px] font-serif font-bold text-accent leading-none mb-1">{value}</p>
          <p className="text-[12px] font-mono text-muted-foreground uppercase tracking-widest">{label}</p>
        </div>
      ))}
    </div>
  )
}

export function UseCaseList({ items }: { items: { title: string; desc: string }[] }) {
  return (
    <ul className="divide-y divide-border border border-border rounded-2xl overflow-hidden">
      {items.map(({ title, desc }) => (
        <li key={title} className="flex items-start gap-4 p-5 bg-background hover:bg-muted/30 transition-colors">
          <span className="mt-1 w-2 h-2 rounded-full bg-accent flex-shrink-0" />
          <div>
            <p className="text-[14px] font-semibold text-foreground mb-0.5">{title}</p>
            <p className="text-[13px] text-muted-foreground leading-relaxed">{desc}</p>
          </div>
        </li>
      ))}
    </ul>
  )
}

export function CtaBanner({ headline, sub, label = "Start Free Trial", href = "/pricing" }: { headline: string; sub: string; label?: string; href?: string }) {
  return (
    <div className="mt-16 rounded-2xl border border-border bg-[#e0f7fa] p-8 md:p-12 flex flex-col md:flex-row md:items-center justify-between gap-6">
      <div>
        <p className="text-[20px] md:text-[26px] font-serif font-bold text-foreground leading-snug mb-2 text-balance">{headline}</p>
        <p className="text-[14px] text-muted-foreground leading-relaxed">{sub}</p>
      </div>
      <a
        href={href}
        className="flex-shrink-0 inline-flex items-center gap-2 bg-accent text-white font-mono font-semibold text-[14px] px-6 py-3 rounded-full hover:bg-[#1797ac] transition-colors"
      >
        {label}
        <ArrowRight className="h-4 w-4" strokeWidth={2.2} />
      </a>
    </div>
  )
}
