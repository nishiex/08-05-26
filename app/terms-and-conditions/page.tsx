import { MegaNav } from "@/components/mega-nav"
import { Footer } from "@/components/footer"

export const metadata = {
  title: "Terms and Conditions — Twiching",
  description: "The legal terms governing use of the Twiching platform and services, including acceptable use, billing, service level and liability.",
}

const LAST_UPDATED = "1 April 2025"

interface Section { id: string; title: string; body: React.ReactNode }

const SECTIONS: Section[] = [
  {
    id: "agreement",
    title: "1. Agreement to terms",
    body: (
      <>
        <p>These Terms and Conditions (&ldquo;Terms&rdquo;) constitute a legally binding agreement between you (&ldquo;Customer&rdquo;, &ldquo;you&rdquo;) and Twiching Pte. Ltd. (&ldquo;Twiching&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;). By accessing or using our Services you confirm that you have read, understood and agree to be bound by these Terms.</p>
        <p>If you are using the Services on behalf of a company or other legal entity, you represent that you have the authority to bind that entity to these Terms.</p>
      </>
    ),
  },
  {
    id: "services",
    title: "2. Services",
    body: (
      <>
        <p>Twiching provides cloud-based business communications services including but not limited to virtual phone number provisioning, voice calling, SMS/MMS messaging, call routing, AI-assisted call handling, call recording and associated APIs (collectively, the &ldquo;Services&rdquo;).</p>
        <p>We reserve the right to modify, suspend or discontinue any part of the Services at any time with reasonable notice. Where a modification materially reduces functionality, we will provide at least 30 days notice via email.</p>
      </>
    ),
  },
  {
    id: "accounts",
    title: "3. Accounts and access",
    body: (
      <>
        <p>You must provide accurate, current and complete information when registering. You are responsible for maintaining the confidentiality of your credentials and for all activity under your account. Notify us immediately at <a href="mailto:support@twiching.ai" className="text-accent hover:underline">support@twiching.ai</a> if you suspect unauthorised access.</p>
        <p>You may not share account credentials, create accounts using automated means, or create an account on behalf of another person without their explicit consent.</p>
      </>
    ),
  },
  {
    id: "acceptable-use",
    title: "4. Acceptable use",
    body: (
      <>
        <p>You agree not to use the Services to:</p>
        <ul>
          <li>Transmit unsolicited bulk SMS or voice calls (&ldquo;spam&rdquo;) in violation of applicable law, including the TCPA, CASL, or GDPR</li>
          <li>Engage in robocalling, autodialling or caller-ID spoofing in a deceptive manner</li>
          <li>Facilitate illegal activity, including fraud, phishing, extortion or drug trafficking</li>
          <li>Transmit content that is defamatory, obscene, harassing or that infringes third-party intellectual property rights</li>
          <li>Interfere with or disrupt the integrity or performance of the Services or Twiching&rsquo;s network</li>
          <li>Reverse engineer, decompile or attempt to derive source code from the Services</li>
        </ul>
        <p>Violation of this section may result in immediate suspension or termination without refund and may be reported to relevant authorities.</p>
      </>
    ),
  },
  {
    id: "billing",
    title: "5. Billing and payment",
    body: (
      <>
        <p>Subscription fees are billed monthly or annually in advance. Usage-based charges (outbound calls, SMS, additional numbers) are billed monthly in arrears. All prices are in USD and exclude applicable taxes, which will be added to your invoice.</p>
        <p>Payment is due on the invoice date. Overdue amounts accrue interest at 1.5% per month (or the maximum permitted by law if lower). We reserve the right to suspend Services for non-payment after providing 7 days written notice.</p>
        <p>Refunds are available within 14 days of initial purchase for new subscribers who have not exceeded 100 minutes of usage. Prepaid call credits are non-refundable once consumed.</p>
      </>
    ),
  },
  {
    id: "number-policy",
    title: "6. Phone number policy",
    body: (
      <>
        <p>Numbers provisioned through the Services are leased, not sold. You do not acquire ownership of any telephone number. Numbers are subject to regulations of the originating country and may be reclaimed by the relevant regulatory body without notice.</p>
        <p>We reserve the right to reclaim unverified or inactive numbers after 90 days of non-use. Number portability is subject to carrier cooperation and regulatory approval; we cannot guarantee porting timelines.</p>
      </>
    ),
  },
  {
    id: "sla",
    title: "7. Service Level Agreement",
    body: (
      <>
        <p>We commit to 99.99% monthly uptime for core voice and messaging services, measured as: <em>(total minutes &minus; downtime minutes) / total minutes &times; 100</em>.</p>
        <p>Scheduled maintenance (with at least 48 hours notice), force majeure events and issues caused by third-party carriers are excluded from SLA calculations.</p>
        <p>Where monthly uptime falls below 99.99%, eligible customers receive a service credit equal to 10× the hourly pro-rated subscription fee for each hour of excess downtime, up to a maximum of 30% of monthly fees. Credits are the sole remedy for SLA breaches.</p>
      </>
    ),
  },
  {
    id: "ip",
    title: "8. Intellectual property",
    body: (
      <p>Twiching retains all right, title and interest in the Services, including all software, APIs, documentation and trademarks. You receive a limited, non-exclusive, non-transferable licence to access and use the Services solely for your internal business purposes during the subscription term. You may not copy, modify or create derivative works based on the Services.</p>
    ),
  },
  {
    id: "confidentiality",
    title: "9. Confidentiality",
    body: (
      <p>Each party agrees to keep the other&rsquo;s Confidential Information (including pricing, technical architecture and customer data) strictly confidential and not to disclose it to third parties without prior written consent, except as required by law. This obligation survives termination of these Terms for 3 years.</p>
    ),
  },
  {
    id: "liability",
    title: "10. Limitation of liability",
    body: (
      <>
        <p>TO THE MAXIMUM EXTENT PERMITTED BY LAW, TWICHING SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL OR PUNITIVE DAMAGES, INCLUDING LOSS OF PROFITS, LOSS OF DATA OR BUSINESS INTERRUPTION, ARISING OUT OF OR RELATED TO YOUR USE OF THE SERVICES.</p>
        <p>OUR TOTAL AGGREGATE LIABILITY TO YOU FOR ANY CLAIM ARISING UNDER THESE TERMS SHALL NOT EXCEED THE GREATER OF: (A) THE AMOUNTS PAID BY YOU IN THE 3 MONTHS PRECEDING THE CLAIM, OR (B) USD 100.</p>
      </>
    ),
  },
  {
    id: "termination",
    title: "11. Termination",
    body: (
      <>
        <p>Either party may terminate the agreement on 30 days written notice. We may terminate immediately if you breach these Terms and fail to cure such breach within 10 business days of notice.</p>
        <p>Upon termination, your access will cease, your data will be retained for 90 days for export purposes and then deleted unless a longer retention period is required by law.</p>
      </>
    ),
  },
  {
    id: "governing-law",
    title: "12. Governing law and disputes",
    body: (
      <p>These Terms are governed by the laws of Singapore. Any dispute that cannot be resolved amicably within 30 days shall be submitted to binding arbitration under the SIAC Rules in Singapore, conducted in English. Nothing prevents either party from seeking urgent injunctive relief in a court of competent jurisdiction.</p>
    ),
  },
  {
    id: "changes",
    title: "13. Changes to these terms",
    body: (
      <p>We may revise these Terms at any time. For material changes, we will provide at least 30 days notice via email. Continued use of the Services after the effective date of the revised Terms constitutes acceptance. If you do not accept the revised Terms, you may terminate your subscription before the effective date.</p>
    ),
  },
  {
    id: "contact-legal",
    title: "14. Contact",
    body: (
      <>
        <p>Questions about these Terms should be directed to:</p>
        <address className="not-italic mt-2 space-y-1 text-gray-600">
          <p><strong>Twiching Pte. Ltd.</strong> — Legal Department</p>
          <p>Singapore</p>
          <p><a href="mailto:legal@twiching.ai" className="text-accent hover:underline">legal@twiching.ai</a></p>
        </address>
      </>
    ),
  },
]

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white font-sans">
      <MegaNav />

      {/* Header */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-10">
        <p className="text-[11px] font-mono font-bold tracking-[2px] uppercase text-accent mb-4">Legal</p>
        <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight text-gray-900 leading-tight mb-4">
          Terms and Conditions
        </h1>
        <p className="text-sm text-gray-400 font-mono">Last updated: {LAST_UPDATED}</p>
      </section>

      <div className="border-t border-gray-100" />

      {/* Two-column: TOC + content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="flex gap-14 items-start">

          {/* TOC — sticky on large screens */}
          <nav className="hidden lg:block w-52 flex-shrink-0 sticky top-24">
            <p className="text-[10px] font-mono font-bold tracking-[2px] uppercase text-gray-400 mb-4">Contents</p>
            <ul className="space-y-2">
              {SECTIONS.map((s) => (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    className="block text-[12px] text-gray-500 hover:text-accent transition-colors leading-snug"
                  >
                    {s.title}
                  </a>
                </li>
              ))}
            </ul>
            <div className="mt-8 pt-6 border-t border-gray-100">
              <p className="text-[11px] text-gray-400 font-mono leading-relaxed">
                Questions? Email{" "}
                <a href="mailto:legal@twiching.ai" className="text-accent hover:underline">
                  legal@twiching.ai
                </a>
              </p>
            </div>
          </nav>

          {/* Body */}
          <article className="flex-1 min-w-0">
            {/* Intro notice */}
            <div className="rounded-2xl border border-amber-100 bg-amber-50/60 px-5 py-4 mb-10">
              <p className="text-[13px] text-amber-800 leading-relaxed">
                <strong>Please read these Terms carefully</strong> before using the Twiching platform. By creating an account or using our Services you agree to be bound by these Terms. If you disagree with any part, do not use the Services.
              </p>
            </div>

            {SECTIONS.map((s) => (
              <section key={s.id} id={s.id} className="mb-10 scroll-mt-24">
                <h2 className="text-xl font-semibold text-gray-900 mb-3 tracking-tight">{s.title}</h2>
                <div className="space-y-3 text-[14px] text-gray-600 leading-relaxed [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-2 [&_li]:leading-relaxed [&_a]:text-accent">
                  {s.body}
                </div>
              </section>
            ))}
          </article>

        </div>
      </div>

      <Footer />
    </div>
  )
}
