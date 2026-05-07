import { MegaNav } from "@/components/mega-nav"
import { Footer } from "@/components/footer"

export const metadata = {
  title: "Privacy Policy — Twiching",
  description: "How Twiching collects, uses and protects your personal data in accordance with the PDPA, GDPR and applicable privacy laws.",
}

const LAST_UPDATED = "1 April 2025"

interface Section { id: string; title: string; body: React.ReactNode }

const SECTIONS: Section[] = [
  {
    id: "overview",
    title: "1. Overview",
    body: (
      <>
        <p>Twiching Pte. Ltd. (&ldquo;Twiching&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo; or &ldquo;our&rdquo;) is incorporated in Singapore and provides business communications services including virtual phone numbers, voice services, and SMS messaging.</p>
        <p>This Privacy Policy explains how we collect, use, disclose and safeguard information about you when you use our website at twiching.ai and our associated services (collectively, the &ldquo;Services&rdquo;).</p>
        <p>By using our Services you agree to the collection and use of information in accordance with this policy. If you do not agree, please discontinue use of the Services.</p>
      </>
    ),
  },
  {
    id: "data-collected",
    title: "2. Data we collect",
    body: (
      <>
        <p>We collect the following categories of personal data:</p>
        <ul>
          <li><strong>Account data</strong> — name, email address, password hash, company name and billing details provided during registration.</li>
          <li><strong>Usage data</strong> — call detail records (CDRs), message logs, call durations, originating and terminating numbers, and timestamps. These are required to deliver the Services.</li>
          <li><strong>Device and network data</strong> — IP address, browser type, operating system, referring URL and pages visited, collected automatically via server logs and cookies.</li>
          <li><strong>Communications content</strong> — where call recording or transcription features are enabled by you, the content of calls and messages may be stored on your behalf.</li>
          <li><strong>Support data</strong> — information you provide when contacting our support team, including attachments and correspondence.</li>
        </ul>
        <p>We do not intentionally collect data from children under 13. If you believe a child has provided us personal data, contact us immediately at <a href="mailto:privacy@twiching.ai" className="text-accent hover:underline">privacy@twiching.ai</a>.</p>
      </>
    ),
  },
  {
    id: "use-of-data",
    title: "3. How we use your data",
    body: (
      <>
        <p>We use collected data to:</p>
        <ul>
          <li>Provision, operate and improve the Services</li>
          <li>Process transactions and send related information, including purchase confirmations and invoices</li>
          <li>Send transactional and service notifications (e.g. number expiry alerts)</li>
          <li>Respond to comments and questions and provide customer service</li>
          <li>Send marketing communications where you have opted in (you may opt out at any time)</li>
          <li>Monitor and analyse usage and trends to improve your experience</li>
          <li>Detect, investigate and prevent fraudulent transactions and other illegal activities</li>
          <li>Comply with legal obligations, including law enforcement requests and regulatory reporting</li>
        </ul>
        <p>We process your data on the following legal bases: <strong>contract performance</strong> (to deliver the Services you have purchased), <strong>legitimate interests</strong> (fraud prevention, security, service improvement), <strong>consent</strong> (marketing communications), and <strong>legal obligation</strong> (compliance with applicable laws).</p>
      </>
    ),
  },
  {
    id: "sharing",
    title: "4. Data sharing and disclosure",
    body: (
      <>
        <p>We do not sell, trade or rent your personal data to third parties. We may share your information with:</p>
        <ul>
          <li><strong>Service providers</strong> — payment processors, cloud infrastructure providers (AWS, Equinix), analytics tools and customer support software operating under data processing agreements.</li>
          <li><strong>Telecommunications carriers</strong> — to route calls and deliver messages, your number and minimal CDR data is shared with carrier partners under confidentiality obligations.</li>
          <li><strong>Legal authorities</strong> — when required by law, court order, or to protect the rights and safety of Twiching, its customers or others.</li>
          <li><strong>Business transfers</strong> — in connection with a merger, acquisition or sale of assets, your data may be transferred. You will be notified via email and/or a prominent notice on our website.</li>
        </ul>
      </>
    ),
  },
  {
    id: "retention",
    title: "5. Data retention",
    body: (
      <p>We retain account data for the duration of your subscription and for 3 years after account closure for legal and tax compliance purposes. Call detail records are retained for 12 months unless you have enabled long-term archiving. You may request deletion of your data at any time, subject to legal retention requirements, by writing to <a href="mailto:privacy@twiching.ai" className="text-accent hover:underline">privacy@twiching.ai</a>.</p>
    ),
  },
  {
    id: "security",
    title: "6. Security",
    body: (
      <p>We implement administrative, technical and physical safeguards designed to protect your information, including TLS 1.3 in transit, AES-256 encryption at rest, role-based access controls and regular penetration testing. No method of transmission over the internet is 100% secure; we cannot guarantee absolute security but we work continuously to improve our defences.</p>
    ),
  },
  {
    id: "rights",
    title: "7. Your rights",
    body: (
      <>
        <p>Depending on your jurisdiction, you may have the right to:</p>
        <ul>
          <li>Access the personal data we hold about you</li>
          <li>Correct inaccurate or incomplete data</li>
          <li>Request deletion of your data (&ldquo;right to be forgotten&rdquo;)</li>
          <li>Restrict or object to processing</li>
          <li>Receive your data in a portable format</li>
          <li>Withdraw consent at any time (for consent-based processing)</li>
          <li>Lodge a complaint with your local supervisory authority</li>
        </ul>
        <p>To exercise any of these rights, email <a href="mailto:privacy@twiching.ai" className="text-accent hover:underline">privacy@twiching.ai</a>. We will respond within 30 days.</p>
      </>
    ),
  },
  {
    id: "cookies",
    title: "8. Cookies",
    body: (
      <p>We use strictly necessary cookies (session, CSRF), functional cookies (preferences, language) and, where you have consented, analytics cookies (page views, conversion tracking). You may manage or disable cookies through your browser settings; disabling certain cookies may impair functionality. We do not use cookies to serve third-party advertising.</p>
    ),
  },
  {
    id: "transfers",
    title: "9. International transfers",
    body: (
      <p>Our primary infrastructure is in Singapore. We may transfer personal data to countries outside your jurisdiction. Where required, we rely on Standard Contractual Clauses (SCCs) approved by the European Commission, or other legally recognised mechanisms, to ensure an adequate level of data protection.</p>
    ),
  },
  {
    id: "changes",
    title: "10. Changes to this policy",
    body: (
      <p>We may update this Privacy Policy from time to time. We will notify you of material changes by email or by a notice on our website at least 14 days before the change takes effect. Your continued use of the Services after the effective date constitutes acceptance of the revised policy.</p>
    ),
  },
  {
    id: "contact-dpo",
    title: "11. Contact and DPO",
    body: (
      <>
        <p>For any privacy-related questions or to exercise your rights, contact our Data Protection Officer:</p>
        <address className="not-italic mt-2 space-y-1 text-gray-600">
          <p><strong>Twiching Pte. Ltd.</strong></p>
          <p>Attn: Data Protection Officer</p>
          <p>Singapore</p>
          <p><a href="mailto:privacy@twiching.ai" className="text-accent hover:underline">privacy@twiching.ai</a></p>
        </address>
      </>
    ),
  },
]

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-white font-sans">
      <MegaNav />

      {/* Header */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-10">
        <p className="text-[11px] font-mono font-bold tracking-[2px] uppercase text-accent mb-4">Legal</p>
        <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight text-gray-900 leading-tight mb-4">
          Privacy Policy
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
          </nav>

          {/* Body */}
          <article className="flex-1 min-w-0 prose prose-sm prose-gray max-w-none
            prose-headings:font-semibold prose-headings:tracking-tight prose-headings:text-gray-900
            prose-p:text-gray-600 prose-p:leading-relaxed
            prose-li:text-gray-600 prose-li:leading-relaxed
            prose-a:text-accent prose-a:no-underline hover:prose-a:underline
            prose-strong:text-gray-800"
          >
            {SECTIONS.map((s) => (
              <section key={s.id} id={s.id} className="mb-10 scroll-mt-24">
                <h2 className="text-xl font-semibold text-gray-900 mb-3 tracking-tight">{s.title}</h2>
                <div className="space-y-3 text-[14px] text-gray-600 leading-relaxed [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-2 [&_li]:leading-relaxed">
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
