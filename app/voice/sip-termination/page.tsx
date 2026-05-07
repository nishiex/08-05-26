import {
  ArrowRight,
  Check,
  ShieldCheck,
  Zap,
  RefreshCw,
  Server,
  Globe,
  Lock,
  Terminal,
  Network,
  ArrowLeftRight,
  CheckCircle2,
} from "lucide-react"
import { AnnouncementBar } from "@/components/announcement-bar"
import { MegaNav } from "@/components/mega-nav"
import { Footer } from "@/components/footer"
import { Testimonials } from "@/components/testimonials"
import { Faq } from "@/components/faq"
import { FinalCta } from "@/components/final-cta"

/* ─── DATA ──────────────────────────────────────────────────────── */

const FEATURES = [
  { Icon: Lock, title: "TLS + SRTP encryption", desc: "Every call authenticated and encrypted in transit. No plaintext SIP." },
  { Icon: RefreshCw, title: "Redundant SIP paths", desc: "Multiple failover routes. Single point of failure eliminated by design." },
  { Icon: Server, title: "PBX-compatible", desc: "Works with Asterisk, FreePBX, 3CX, Cisco, Avaya and any standard SIP PBX." },
  { Icon: Terminal, title: "Codec support", desc: "G.711 (ulaw/alaw), G.729, Opus, and standard codecs supported." },
  { Icon: Globe, title: "Global routing", desc: "Carrier-grade infrastructure with coverage across 190+ countries." },
  { Icon: Zap, title: "Carrier-grade uptime", desc: "99.999% uptime commitment backed by a real SLA." },
]

const CODECS = [
  { codec: "G.711 μ-law", bandwidth: "64 kbps", quality: "HD", compatibility: "Universal" },
  { codec: "G.711 a-law", bandwidth: "64 kbps", quality: "HD", compatibility: "Universal" },
  { codec: "G.729", bandwidth: "8 kbps", quality: "Compressed", compatibility: "Most PBX" },
  { codec: "Opus", bandwidth: "6–510 kbps", quality: "Adaptive HD", compatibility: "WebRTC / soft clients" },
]

const PBX_LIST = [
  "Asterisk", "FreePBX", "3CX", "Cisco CUCM", "Avaya Aura",
  "Polycom", "Yealink", "Grandstream", "Fanvil", "Any SIP RFC 3261",
]

const FAQS = [
  { q: "What PBX systems are compatible?", a: "Standard SIP-capable PBX — Asterisk, FreePBX, 3CX, Cisco, Avaya, and more. Contact us for specifics." },
  { q: "Is failover available?", a: "Yes. Redundant routes are standard. Primary and secondary SIP endpoints provided." },
  { q: "What codecs are supported?", a: "G.711 (ulaw/alaw), G.729, Opus, and others. Contact us for codec-specific requirements." },
  { q: "How does authentication work?", a: "IP-based authentication and SIP digest authentication are both supported. TLS + SRTP for encrypted call delivery." },
  { q: "Can I use Twiching SIP with hosted PBX or UCaaS?", a: "Yes. Twiching SIP termination integrates as a trunk into most UCaaS and hosted PBX platforms." },
  { q: "Is there a minimum call volume requirement?", a: "No. SIP termination is available across all business plans. Contact us for wholesale volumes." },
]

const TESTIMONIALS = [
  {
    quote: "The audio was one-way for three days on our old SIP trunk. Pointed it at Twiching — clear calls, no debugging, zero IT headaches.",
    name: "James Thornton",
    role: "IT Director · Meridian Financial",
    initial: "J",
  },
  {
    quote: "We run Asterisk across 40 sites. The transition was a single config change per location. Carrier-grade call quality on day one.",
    name: "Laura Kimani",
    role: "Head of Infrastructure · LogiFleet",
    initial: "L",
  },
  {
    quote: "Twiching SIP sits inside our UCaaS platform now. Our customers get stable calling and we stop babysitting SIP trunks.",
    name: "Raj Mehta",
    role: "CTO · VocalCloud",
    initial: "R",
  },
]

const FLOW_STEPS = [
  { label: "Your PBX / UCaaS", sublabel: "Asterisk · 3CX · Cisco · any SIP", Icon: Server, side: "left" },
  { label: "SIP INVITE (TLS)", sublabel: "Authenticated · Encrypted · RFC 3261", Icon: ArrowLeftRight, side: "center" },
  { label: "Twiching SIP Edge", sublabel: "Redundant · Carrier-grade · Global", Icon: Network, side: "center-right" },
  { label: "PSTN Carrier Network", sublabel: "Tier-1 routes · 190+ countries", Icon: Globe, side: "right" },
]

/* ─── Page ──────────────────────────────────────────────────────── */

export default function SipTerminationPage() {
  return (
    <>
      <AnnouncementBar />
      <MegaNav />
      <main>

        {/* ── HERO: SPLIT LAYOUT ───────────────────────────────── */}
        <section className="relative overflow-hidden bg-white">
          {/* Right-side image panel */}
          <div className="absolute right-0 top-0 bottom-0 w-1/2 hidden lg:block">
            <img
              src="/images/sip-hero.jpg"
              alt="SIP infrastructure"
              className="w-full h-full object-cover"
            />
            <div
              className="absolute inset-0"
              style={{
                background: "linear-gradient(90deg, rgba(255,255,255,1) 0%, rgba(255,255,255,0.3) 40%, rgba(255,255,255,0) 100%)",
              }}
            />
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="lg:max-w-[55%] pt-14 pb-24">
              {/* Tag */}
              <div className="inline-flex items-center gap-2 bg-[#e0f7fa] border border-[#95d9e8]/50 text-accent text-xs font-semibold font-mono px-4 py-[6px] rounded-full mb-7">
                <ShieldCheck className="h-3 w-3" strokeWidth={2.2} />
                TLS + SRTP · CARRIER-GRADE · PBX-COMPATIBLE
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold leading-[1.06] tracking-tight text-gray-900 text-balance mb-6">
                SIP termination for businesses that{" "}
                <span className="text-accent italic">can&apos;t afford downtime.</span>
              </h1>

              <p className="text-[17px] sm:text-[19px] text-gray-500 font-mono leading-relaxed max-w-[560px] mb-3">
                Encrypted SIP delivery. Redundant paths. Compatible with any standard SIP PBX.
              </p>
              <p className="text-[14px] text-gray-400 font-mono leading-relaxed max-w-[540px] mb-10">
                The PBX was configured. The SIP trunk was pointed. And then the audio was one-way for three days. Debugging SIP issues isn&apos;t what most businesses want their IT team solving.
              </p>

              <div className="flex flex-wrap items-center gap-3 mb-10">
                <a
                  href="#"
                  className="group inline-flex items-center gap-2 bg-accent text-white text-[15px] font-semibold font-mono pl-6 pr-2 py-2.5 rounded-full hover:bg-[#1797ac] transition-colors shadow-[0_8px_24px_-6px_rgba(26,188,217,0.45)]"
                >
                  Contact us about SIP setup
                  <span className="grid place-items-center h-8 w-8 rounded-full bg-white/15 transition-transform group-hover:translate-x-0.5">
                    <ArrowRight className="h-4 w-4" strokeWidth={2.2} />
                  </span>
                </a>
                <a
                  href="/voice/voip-wholesale"
                  className="inline-flex items-center gap-2 bg-white text-gray-700 border border-gray-200 text-[15px] font-semibold font-mono px-6 py-2.5 rounded-full hover:border-gray-400 transition-colors"
                >
                  See VoIP wholesale
                </a>
              </div>

              {/* Trust chips */}
              <div className="flex flex-wrap gap-2">
                {["TLS + SRTP", "Redundant routes", "G.711 / G.729 / Opus", "99.999% uptime", "RFC 3261 compliant"].map((item) => (
                  <span
                    key={item}
                    className="inline-flex items-center gap-1.5 bg-gray-50 border border-gray-200 text-gray-600 text-xs font-semibold font-mono px-3.5 py-1.5 rounded-full"
                  >
                    <Check className="h-3 w-3 text-accent" strokeWidth={2.5} />
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── SIP CALL FLOW DIAGRAM ────────────────────────────── */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-950 text-white">
          <div className="max-w-7xl mx-auto">
            <p className="text-[10px] font-mono font-bold tracking-[2px] uppercase text-[#1abcd9] mb-3">How it works</p>
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-white mb-3">
              One config change. Carrier-grade calling.
            </h2>
            <p className="text-[14px] text-gray-400 font-mono leading-relaxed max-w-[560px] mb-16">
              Point your SIP device or PBX at Twiching&apos;s termination endpoints. For businesses already on SIP, the switch is typically one configuration change — not a rip-and-replace project.
            </p>

            {/* Flow diagram */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-0">
              {/* PBX node */}
              <div className="flex flex-col items-center text-center">
                <div className="w-20 h-20 rounded-2xl bg-white/8 ring-1 ring-white/15 grid place-items-center mb-3">
                  <Server className="h-8 w-8 text-[#1abcd9]" strokeWidth={1.5} />
                </div>
                <div className="text-[13px] font-mono font-bold text-white">Your PBX</div>
                <div className="text-[10px] text-gray-500 font-mono mt-1">Asterisk · 3CX · Cisco</div>
              </div>

              {/* Arrow + label */}
              <div className="flex flex-col items-center mx-2 sm:mx-4 my-3 sm:my-0">
                <div className="flex items-center gap-1 mb-1">
                  <div className="w-12 sm:w-20 h-[2px] bg-gradient-to-r from-[#1abcd9]/30 to-[#1abcd9]" />
                  <ArrowRight className="h-4 w-4 text-[#1abcd9] -ml-1" strokeWidth={2} />
                </div>
                <div className="text-[9px] font-mono font-bold text-[#1abcd9] tracking-[1.5px] uppercase">SIP INVITE · TLS</div>
              </div>

              {/* Twiching edge */}
              <div className="flex flex-col items-center text-center">
                <div className="w-24 h-24 rounded-2xl bg-accent ring-2 ring-[#1abcd9]/40 grid place-items-center mb-3 shadow-[0_0_40px_rgba(26,188,217,0.4)]">
                  <Network className="h-9 w-9 text-white" strokeWidth={1.5} />
                </div>
                <div className="text-[13px] font-mono font-bold text-white">Twiching SIP</div>
                <div className="text-[10px] text-gray-400 font-mono mt-1">Redundant · Encrypted · Global</div>
              </div>

              {/* Arrow + label */}
              <div className="flex flex-col items-center mx-2 sm:mx-4 my-3 sm:my-0">
                <div className="flex items-center gap-1 mb-1">
                  <div className="w-12 sm:w-20 h-[2px] bg-gradient-to-r from-emerald-500/30 to-emerald-500" />
                  <ArrowRight className="h-4 w-4 text-emerald-500 -ml-1" strokeWidth={2} />
                </div>
                <div className="text-[9px] font-mono font-bold text-emerald-400 tracking-[1.5px] uppercase">PSTN ROUTE · SRTP</div>
              </div>

              {/* PSTN node */}
              <div className="flex flex-col items-center text-center">
                <div className="w-20 h-20 rounded-2xl bg-white/8 ring-1 ring-white/15 grid place-items-center mb-3">
                  <Globe className="h-8 w-8 text-emerald-400" strokeWidth={1.5} />
                </div>
                <div className="text-[13px] font-mono font-bold text-white">PSTN Network</div>
                <div className="text-[10px] text-gray-500 font-mono mt-1">Tier-1 · 190+ countries</div>
              </div>
            </div>

            {/* Security badges below diagram */}
            <div className="mt-12 flex flex-wrap justify-center gap-4">
              {[
                { label: "TLS 1.2 / 1.3", sub: "Transport layer security" },
                { label: "SRTP", sub: "Media encryption" },
                { label: "SIP Digest Auth", sub: "or IP whitelisting" },
                { label: "Redundant routes", sub: "Primary + failover" },
              ].map(({ label, sub }) => (
                <div key={label} className="flex items-center gap-3 rounded-xl bg-white/5 ring-1 ring-white/10 px-5 py-3">
                  <CheckCircle2 className="h-4 w-4 text-[#1abcd9] flex-shrink-0" strokeWidth={1.8} />
                  <div>
                    <div className="text-[12px] font-mono font-bold text-white">{label}</div>
                    <div className="text-[10px] text-gray-500 font-mono">{sub}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FEATURES GRID ────────────────────────────────────── */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-7xl mx-auto">
            <p className="text-[10px] font-mono font-bold tracking-[2px] uppercase text-accent mb-3">What you get</p>
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-gray-900 mb-14 max-w-[600px] text-balance">
              Everything an IT team wants in a SIP trunk. None of what they don&apos;t.
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {FEATURES.map(({ Icon, title, desc }) => (
                <div
                  key={title}
                  className="group rounded-3xl p-7 bg-white ring-1 ring-gray-200/70 hover:ring-accent/25 hover:shadow-[0_20px_40px_-28px_rgba(26,188,217,0.3)] transition-all"
                >
                  <div className="w-11 h-11 rounded-xl bg-[#e0f7fa] text-accent grid place-items-center mb-5">
                    <Icon className="h-5 w-5" strokeWidth={1.8} />
                  </div>
                  <h3 className="font-serif text-[18px] font-bold text-gray-900 mb-2">{title}</h3>
                  <p className="text-[13px] text-gray-500 font-mono leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── ENCRYPTION SPLIT ─────────────────────────────────── */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

              {/* Text side */}
              <div>
                <p className="text-[10px] font-mono font-bold tracking-[2px] uppercase text-accent mb-3">Security</p>
                <h2 className="font-serif text-[32px] sm:text-[38px] font-bold text-gray-900 mb-5 text-balance leading-tight">
                  TLS + SRTP: every call encrypted, end to end.
                </h2>
                <p className="text-[14px] text-gray-500 font-mono leading-relaxed mb-8">
                  Unencrypted SIP is a liability. Twiching authenticates and encrypts every leg of every call — transport layer and media — so nothing travels in plaintext between your PBX and the carrier network.
                </p>
                <ul className="space-y-3 mb-8">
                  {[
                    "TLS 1.2 / 1.3 on all SIP signaling channels",
                    "SRTP for end-to-end media encryption",
                    "SIP Digest Auth or IP whitelist — your choice",
                    "No plaintext SIP. No unprotected RTP media streams",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-[13px] font-mono text-gray-700">
                      <CheckCircle2 className="h-4 w-4 text-accent flex-shrink-0 mt-0.5" strokeWidth={2} />
                      {item}
                    </li>
                  ))}
                </ul>
                <a
                  href="#"
                  className="inline-flex items-center gap-2 bg-accent text-white text-[14px] font-semibold font-mono px-6 py-2.5 rounded-full hover:bg-[#1797ac] transition-colors"
                >
                  Talk to us about security
                  <ArrowRight className="h-4 w-4" strokeWidth={2.2} />
                </a>
              </div>

              {/* Image side */}
              <div className="relative">
                <div className="aspect-[4/3] rounded-3xl bg-gray-100 ring-1 ring-gray-200/80 overflow-hidden flex items-center justify-center">
                  <div className="w-full h-full bg-gradient-to-br from-[#e0f7fa] via-white to-gray-100 flex flex-col items-center justify-center gap-6 p-10">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-2xl bg-white ring-1 ring-gray-200 shadow-sm grid place-items-center">
                        <Server className="h-7 w-7 text-gray-400" strokeWidth={1.5} />
                      </div>
                      <div className="flex flex-col gap-1">
                        <div className="h-[2px] w-20 bg-accent rounded-full" />
                        <div className="text-[9px] font-mono font-bold text-accent tracking-widest uppercase">TLS 1.3</div>
                        <div className="h-[2px] w-20 bg-[#95d9e8] rounded-full" />
                      </div>
                      <div className="w-16 h-16 rounded-2xl bg-accent shadow-[0_0_30px_rgba(26,188,217,0.35)] grid place-items-center">
                        <Lock className="h-7 w-7 text-white" strokeWidth={1.5} />
                      </div>
                      <div className="flex flex-col gap-1">
                        <div className="h-[2px] w-20 bg-emerald-500 rounded-full" />
                        <div className="text-[9px] font-mono font-bold text-emerald-600 tracking-widest uppercase">SRTP</div>
                        <div className="h-[2px] w-20 bg-emerald-300 rounded-full" />
                      </div>
                      <div className="w-16 h-16 rounded-2xl bg-white ring-1 ring-gray-200 shadow-sm grid place-items-center">
                        <Globe className="h-7 w-7 text-gray-400" strokeWidth={1.5} />
                      </div>
                    </div>
                    <div className="flex gap-3">
                      {["TLS 1.3", "SRTP", "Digest Auth"].map((tag) => (
                        <span key={tag} className="px-3 py-1 rounded-full bg-[#e0f7fa] border border-[#95d9e8]/50 text-[10px] font-mono font-bold text-accent">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <p className="text-[10px] font-mono text-gray-400 text-center">TLS + SRTP encrypted call delivery diagram</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── CODEC TABLE ──────────────────────────────────────── */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

              {/* Codec table */}
              <div>
                <p className="text-[10px] font-mono font-bold tracking-[2px] uppercase text-accent mb-3">Codec support</p>
                <h2 className="font-serif text-[28px] font-bold text-gray-900 mb-8 text-balance">
                  Works with the codecs your gear already uses.
                </h2>
                <div className="rounded-2xl overflow-hidden ring-1 ring-gray-200">
                  <table className="w-full text-[13px] font-mono">
                    <thead>
                      <tr className="bg-gray-900 text-white">
                        <th className="text-left px-5 py-3 font-bold tracking-wide text-[11px] uppercase">Codec</th>
                        <th className="text-left px-5 py-3 font-bold tracking-wide text-[11px] uppercase">Bandwidth</th>
                        <th className="text-left px-5 py-3 font-bold tracking-wide text-[11px] uppercase">Quality</th>
                        <th className="text-left px-5 py-3 font-bold tracking-wide text-[11px] uppercase">Compat.</th>
                      </tr>
                    </thead>
                    <tbody>
                      {CODECS.map((row, i) => (
                        <tr key={row.codec} className={`border-t border-gray-100 ${i % 2 === 0 ? "bg-white" : "bg-gray-50/50"}`}>
                          <td className="px-5 py-3.5 font-semibold text-gray-900">{row.codec}</td>
                          <td className="px-5 py-3.5 text-gray-500">{row.bandwidth}</td>
                          <td className="px-5 py-3.5">
                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold ${row.quality === "HD" || row.quality === "Adaptive HD"
                                ? "bg-green-50 text-green-700"
                                : "bg-amber-50 text-amber-700"
                              }`}>
                              {row.quality}
                            </span>
                          </td>
                          <td className="px-5 py-3.5 text-gray-400">{row.compatibility}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="text-[11px] text-gray-400 font-mono mt-3">Additional codecs available on request.</p>
              </div>

              {/* Compatible PBX grid */}
              <div>
                <p className="text-[10px] font-mono font-bold tracking-[2px] uppercase text-accent mb-3">PBX compatibility</p>
                <h2 className="font-serif text-[28px] font-bold text-gray-900 mb-8 text-balance">
                  Drops into your existing stack.
                </h2>
                <div className="grid grid-cols-2 gap-3">
                  {PBX_LIST.map((pbx) => (
                    <div
                      key={pbx}
                      className="flex items-center gap-2.5 rounded-xl bg-white ring-1 ring-gray-200 px-4 py-3"
                    >
                      <CheckCircle2 className="h-3.5 w-3.5 text-accent flex-shrink-0" strokeWidth={2} />
                      <span className="text-[13px] font-mono font-semibold text-gray-700">{pbx}</span>
                    </div>
                  ))}
                </div>
                <p className="text-[12px] text-gray-400 font-mono mt-4">Any standard SIP RFC 3261-compliant device works. <a href="/contact" className="text-accent hover:underline">Contact us</a> for specifics.</p>
              </div>
            </div>
          </div>
        </section>

        {/* ── PROVISIONING SPLIT (dark, reversed) ──────────────── */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-950 text-white">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

              {/* Image side (left on desktop) */}
              <div className="relative order-2 lg:order-1">
                <div className="aspect-[4/3] rounded-3xl bg-white/5 ring-1 ring-white/10 overflow-hidden flex items-center justify-center">
                  <div className="w-full h-full flex flex-col items-center justify-center gap-5 p-10">
                    {/* Simulated config block */}
                    <div className="w-full max-w-xs rounded-2xl bg-gray-900 ring-1 ring-white/10 p-5 font-mono text-[11px] leading-relaxed">
                      <p className="text-gray-500 mb-2">{`; sip.conf — Twiching trunk`}</p>
                      <p><span className="text-[#1abcd9]">[twiching-trunk]</span></p>
                      <p><span className="text-gray-400">type</span>=<span className="text-emerald-400">peer</span></p>
                      <p><span className="text-gray-400">host</span>=<span className="text-emerald-400">sip.twiching.ai</span></p>
                      <p><span className="text-gray-400">transport</span>=<span className="text-emerald-400">tls</span></p>
                      <p><span className="text-gray-400">encryption</span>=<span className="text-emerald-400">yes</span></p>
                      <p><span className="text-gray-400">qualify</span>=<span className="text-emerald-400">yes</span></p>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-emerald-400" strokeWidth={2} />
                      <span className="text-[11px] font-mono text-gray-400">One config block. Carrier-grade calling active.</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Text side (right on desktop) */}
              <div className="order-1 lg:order-2">
                <p className="text-[10px] font-mono font-bold tracking-[2px] uppercase text-[#1abcd9] mb-3">Setup</p>
                <h2 className="font-serif text-[32px] sm:text-[38px] font-bold text-white mb-5 text-balance leading-tight">
                  One config change. No rip-and-replace.
                </h2>
                <p className="text-[14px] text-gray-400 font-mono leading-relaxed mb-8">
                  If your team already runs SIP, switching to Twiching is a single config file edit — not a six-week migration. Update your outbound SIP host, enable TLS, and your existing PBX is on Twiching&apos;s carrier network.
                </p>
                <ul className="space-y-4">
                  {[
                    { step: "01", label: "Update your SIP trunk host to sip.twiching.ai" },
                    { step: "02", label: "Enable TLS transport and SRTP encryption" },
                    { step: "03", label: "Provision credentials or whitelist your IP" },
                    { step: "04", label: "Make a test call — carrier-grade from minute one" },
                  ].map(({ step, label }) => (
                    <li key={step} className="flex items-start gap-4">
                      <span className="text-[11px] font-mono font-bold text-[#1abcd9] tracking-widest mt-0.5">{step}</span>
                      <span className="text-[13px] font-mono text-gray-300 leading-relaxed">{label}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>
          </div>
        </section>

        {/* ── WHO USES SIP ─────────────────────────────────────── */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-7xl mx-auto">
            <p className="text-[10px] font-mono font-bold tracking-[2px] uppercase text-accent mb-3">Who uses it</p>
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-gray-900 mb-10 max-w-[600px] text-balance">
              Built for the teams that own the infrastructure.
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { title: "Enterprises on-premise", body: "Running Cisco, Avaya, or Asterisk PBX in your own data center? SIP termination connects without a rip-and-replace." },
                { title: "Contact centers", body: "Custom routing logic, multi-site call distribution, and queue integration — all through standard SIP trunks." },
                { title: "UCaaS platforms", body: "Embed Twiching as your SIP voice provider. Your customers get stable calling. You stop babysitting trunks." },
                { title: "Resellers & carriers", body: "White-label SIP termination for resellers. Rate sheets and wholesale volumes available on request." },
              ].map(({ title, body }) => (
                <div
                  key={title}
                  className="rounded-3xl bg-white ring-1 ring-gray-200/70 p-7 hover:ring-accent/25 hover:shadow-[0_20px_40px_-28px_rgba(26,188,217,0.2)] transition-all"
                >
                  <div className="w-2 h-2 rounded-full bg-accent mb-5" />
                  <h3 className="font-serif text-[18px] font-bold text-gray-900 mb-3">{title}</h3>
                  <p className="text-[13px] text-gray-500 font-mono leading-relaxed">{body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FULL CAPABILITIES SPLIT ──────────────────────────── */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

              {/* Checklist side */}
              <div>
                <p className="text-[10px] font-mono font-bold tracking-[2px] uppercase text-accent mb-3">Full capabilities</p>
                <h2 className="font-serif text-[32px] sm:text-[38px] font-bold text-gray-900 mb-6 text-balance leading-tight">
                  Everything included in Twiching SIP termination.
                </h2>
                <ul className="space-y-3">
                  {[
                    "Carrier-grade SIP termination — 99.999% uptime SLA",
                    "TLS 1.2 / 1.3 on all signaling channels",
                    "SRTP media encryption — no plaintext RTP",
                    "Redundant SIP paths with automatic failover",
                    "G.711 μ-law / a-law, G.729, Opus codec support",
                    "Compatible with Asterisk, FreePBX, 3CX, Cisco, Avaya",
                    "IP whitelist or SIP Digest authentication",
                    "Global reach — Tier-1 routes to 190+ countries",
                    "Wholesale volumes available — rate sheets on request",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-[13px] font-mono text-gray-700">
                      <CheckCircle2 className="h-4 w-4 text-accent flex-shrink-0 mt-0.5" strokeWidth={2} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Image side */}
              <div>
                <div className="aspect-[4/3] rounded-3xl bg-white ring-1 ring-gray-200/80 overflow-hidden flex items-center justify-center">
                  <div className="w-full h-full bg-gradient-to-br from-gray-50 via-white to-[#e0f7fa]/30 flex flex-col items-center justify-center gap-5 p-10">
                    {/* Uptime / stats visual */}
                    <div className="w-full max-w-xs space-y-3">
                      {[
                        { label: "Uptime SLA", value: "99.999%", color: "bg-emerald-500" },
                        { label: "Countries covered", value: "190+", color: "bg-accent" },
                        { label: "Failover routes", value: "Redundant", color: "bg-[#1abcd9]" },
                        { label: "Encryption", value: "TLS + SRTP", color: "bg-violet-500" },
                      ].map(({ label, value, color }) => (
                        <div key={label} className="flex items-center gap-3 rounded-xl bg-white ring-1 ring-gray-200 px-4 py-3 shadow-sm">
                          <div className={`w-2 h-2 rounded-full ${color} flex-shrink-0`} />
                          <span className="text-[11px] font-mono text-gray-500 flex-1">{label}</span>
                          <span className="text-[12px] font-mono font-bold text-gray-900">{value}</span>
                        </div>
                      ))}
                    </div>
                    <p className="text-[10px] font-mono text-gray-400 text-center">Twiching SIP termination capabilities at a glance</p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ── TESTIMONIALS ─────────────────────────────────────── */}
        <Testimonials
          quotes={TESTIMONIALS}
          eyebrow="What IT teams say"
          heading="From one-way audio to carrier-grade clarity — teams who made the switch."
        />

        {/* ── FAQ ──────────────────────────────────────────────── */}
        <Faq />

        {/* ── FINAL CTA ────────────────────────────────────────── */}
        <FinalCta
          eyebrow="Get connected"
          heading="One config change away from stable, encrypted SIP calling."
          sub="Carrier-grade SIP termination. TLS + SRTP. Redundant failover. Works with your existing PBX."
          primaryLabel="Contact us about SIP setup"
          primaryHref="#"
          secondaryLabel="See VoIP wholesale"
          secondaryHref="/voice/voip-wholesale"
        />

      </main>
      <Footer />
    </>
  )
}