import { Metadata } from "next"
import { PageLayout } from "@/components/page-layout"
import { PageHero, SectionHeading } from "@/components/page-parts"
import { FinalCta } from "@/components/final-cta"
import { Faq } from "@/components/faq"
import { MessageSquare, Megaphone, Code2, ArrowRight, Shield } from "lucide-react"

export const metadata: Metadata = {
  title: "Business Messaging · SMS Gateway, Bulk SMS, API | Twiching",
  description: "SMS gateway, bulk SMS, developer API. 98% open rates. TCR-registered. 14-day free trial.",
}

const PRODUCTS = [
  { Icon: MessageSquare, label: "SMS Gateway",  href: "/messaging/sms-gateway", desc: "Multi-channel SMS from a dashboard. Confirmations, reminders, alerts, two-way support messages." },
  { Icon: Megaphone,     label: "Bulk SMS",      href: "/messaging/bulk-sms",    desc: "Campaign-grade outreach. Send to thousands in one send." },
  { Icon: Code2,         label: "SMS API",       href: "/messaging/sms-api",     desc: "Developer-friendly REST API. Embed messaging into any application — OTP, alerts, transactional flows." },
]

const FAQS = [
  { q: "Do I need to handle 10DLC registration?", a: "No. TCR brand and campaign registration handled for you. Government fees passed through at cost." },
  { q: "Is two-way SMS supported?", a: "Yes. Where carrier policy allows." },
  { q: "What's the difference between SMS Gateway and Bulk SMS?", a: "Gateway is for ongoing operational messaging (reminders, confirmations, support). Bulk SMS is for campaign-style outreach to large lists." },
]

export default function MessagingHub() {
  return (
    <PageLayout>
      <PageHero
        h1="SMS that reaches people where calls don't."
        sub="Gateway, bulk, and API — messaging infrastructure that fits any business."
        trustItems={["98% open rate", "TCR-registered", "STIR/SHAKEN", "Two-way SMS"]}
        primaryCta={{ label: "Start free trial", href: "/pricing" }}
        secondaryCta={{ label: "Explore SMS Gateway", href: "/messaging/sms-gateway" }}
      />

      <section className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="max-w-[680px] font-mono text-[15px] text-gray-600 leading-relaxed space-y-4">
          <p>The appointment reminder went by email. The patient missed it.</p>
          <p>They checked their texts that morning. Nothing from the clinic was there.</p>
          <p>SMS has a 98% open rate. Email sits at 20%. The gap is where businesses lose customers who were never really lost — just not reached on the right channel.</p>
        </div>
      </section>

      {/* Products */}
      <section className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-gray-100">
        <SectionHeading eyebrow="Messaging stack" h2="What's in the messaging stack" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {PRODUCTS.map(({ Icon, label, href, desc }) => (
            <a key={href} href={href}
              className="group block p-7 rounded-2xl border border-gray-100 hover:border-accent/30 hover:shadow-lg hover:shadow-accent/5 transition-all bg-white">
              <span className="w-10 h-10 rounded-2xl bg-[#e0f7fa] text-accent grid place-items-center mb-5 group-hover:bg-accent group-hover:text-white transition-colors">
                <Icon className="h-5 w-5" strokeWidth={1.8} />
              </span>
              <h3 className="font-mono font-bold text-[16px] text-gray-900 mb-2">{label}</h3>
              <p className="font-mono text-[13px] text-gray-500 leading-relaxed mb-5">{desc}</p>
              <span className="inline-flex items-center gap-1.5 text-accent text-[12px] font-semibold font-mono">
                Learn more <ArrowRight className="h-3 w-3 group-hover:translate-x-0.5 transition-transform" />
              </span>
            </a>
          ))}
        </div>
      </section>

      {/* Compliance + Pricing */}
      <section className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-gray-100">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-gray-50 rounded-2xl p-8">
            <div className="flex items-center gap-3 mb-5">
              <Shield className="h-6 w-6 text-accent" strokeWidth={1.8} />
              <p className="font-mono font-bold text-[13px] tracking-[1.5px] uppercase text-gray-700">Compliance handled</p>
            </div>
            <p className="font-mono text-[14px] text-gray-600 leading-relaxed mb-3">
              TCR (The Campaign Registry) brand and campaign registration handled for you.
            </p>
            <p className="font-mono text-[14px] text-gray-600 leading-relaxed">
              10DLC registration included — no navigating carrier forms alone. Government fees passed through at cost.
            </p>
          </div>
          <div className="bg-white rounded-2xl border border-gray-100 p-8">
            <SectionHeading eyebrow="Included in plans" h2="Pricing" />
            <ul className="space-y-3 mb-5">
              {[
                "SMS Gateway — included on all plans",
                "Bulk SMS — Professional and Enterprise",
                "Full API access — Professional and Enterprise",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2 font-mono text-[13px] text-gray-700">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
            <a href="/pricing" className="inline-flex items-center gap-2 bg-accent text-white text-[13px] font-semibold font-mono px-5 py-2.5 rounded-full hover:bg-[#1797ac] transition-colors">
              See full pricing <ArrowRight className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      </section>

      <Faq />
      <FinalCta />
    </PageLayout>
  )
}
