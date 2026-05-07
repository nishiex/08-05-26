/* ── Link columns ─────────────────────────────────────────────────── */
const cols = [
  {
    title: "Features",
    links: [
      { label: "Video Meetings",               href: "/features/video-meetings" },
      { label: "Team Chat",                    href: "/features/team-chat" },
      { label: "Call Recording",               href: "/features/call-recording" },
      { label: "AI Conversation Intelligence", href: "/features/conv-intelligence" },
      { label: "AI Supervisor Tools",          href: "/features/supervisor" },
      { label: "Auto-Attendant & IVR",         href: "/features/auto-attendant" },
      { label: "AI Intelligent Routing",       href: "/features/routing" },
    ],
  },
  {
    title: "Products",
    links: [
      { label: "Business Phone Number", href: "/phone-numbers/business" },
      { label: "Toll-Free Numbers",     href: "/phone-numbers/toll-free" },
      { label: "Second Phone Number",   href: "/phone-numbers/second-number" },
      { label: "Voice Termination",     href: "/voice/termination" },
      { label: "SMS Gateway",           href: "/messaging/sms-gateway" },
      { label: "Bulk SMS",              href: "/messaging/bulk-sms" },
      { label: "Reports & Logs",        href: "/reports" },
      { label: "Pricing",               href: "/pricing" },
    ],
  },
  {
    title: "Integrations",
    links: [
      { label: "HubSpot",  href: "/integrations/hubspot" },
      { label: "Zoho CRM", href: "/integrations/zoho" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us",          href: "/company/about" },
      { label: "Press",             href: "/company/press" },
      { label: "Contact",           href: "/contact" },
      { label: "Request a Demo",    href: "/contact", highlight: true },
      { label: "Legal",             href: "/company/legal" },
    ],
  },
]

/* ── Footer ──────────────────────────────────────────────────────── */
export function Footer() {
  return (
    <footer className="bg-black text-white pt-16 pb-8 px-4 sm:px-6 lg:px-[5%]">
      <div className="max-w-[1299px] mx-auto">

        {/* Top grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-10 pb-12 border-b border-white/10">

          {/* Brand col */}
          <div className="sm:col-span-2 lg:col-span-2">
            <a href="/" className="inline-block mb-5" aria-label="Twiching">
              <img
                src="https://www.twiching.ai/wp-content/uploads/2023/07/White-new-logo.png"
                alt="Twiching"
                width={190}
                height={40}
                className="h-11 w-auto object-contain"
              />
            </a>
            <p className="text-sm text-gray-400 leading-relaxed font-mono max-w-[300px]">
              Phone numbers, voice and SMS on one platform. Built for how modern businesses
              actually work. 14-day free trial — no charges during the trial window.
            </p>
          </div>

          {/* Link cols */}
          {cols.map((col) => (
            <div key={col.title} className="min-w-0">
              <div className="text-[10px] font-medium tracking-[2px] uppercase text-gray-500 mb-4 font-mono">
                {col.title}
              </div>
              <ul className="space-y-3">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      className={`text-sm font-mono transition-colors ${l.highlight
                        ? "text-[#1abcd9] font-medium"
                        : "text-gray-400 hover:text-white"
                        }`}
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 text-xs text-gray-500 font-mono">
          <div>© 2026 Twiching Pte. Ltd. · Infrastructure anchored in Singapore</div>
          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            {[
              { label: "Privacy",  href: "/privacy-policy" },
              { label: "Terms",    href: "/terms-and-conditions" },
              { label: "SLA",      href: "#" },
              { label: "Security", href: "#" },
            ].map((l) => (
              <a key={l.label} href={l.href} className="hover:text-white transition-colors">{l.label}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
