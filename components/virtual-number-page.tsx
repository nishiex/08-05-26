"use client"

import { useEffect, useRef, useState } from "react"
import {
  motion, AnimatePresence,
  useMotionValue, useSpring, useTransform,
} from "framer-motion"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import type { LucideIcon } from "lucide-react"
import {
  Globe, Smartphone, Zap, Shield, PhoneCall,
  ArrowRight, Check, ChevronRight,
  ShieldCheck, HeartPulse, Activity,
  Search, ShoppingCart, PhoneIncoming, MessageSquare, RefreshCw, Mail, ChevronDown,
} from "lucide-react"
import { Faq } from "@/components/faq"
import { AnnouncementBar } from "@/components/announcement-bar"
import { MegaNav } from "@/components/mega-nav"
import { Footer } from "@/components/footer"
import { FinalCta } from "@/components/final-cta"

gsap.registerPlugin(ScrollTrigger)

/* ─── Types ─────────────────────────────────────────────────── */
interface Benefit   { Icon: LucideIcon; title: string; body: string; accent: string }
interface Step      { n: string; title: string; body: string }
interface CompareRow { problem: string; solution: string }
interface RelatedCard { title: string; desc: string; href: string }
interface FaqItem   { q: string; a: string }
interface Stat      { value: string; label: string }

/* ─── Data ───────────────────────────────────────────────────── */
const BENEFITS: Benefit[] = [
  { Icon: Globe,      title: "Any area code",       body: "Pick the area code that matches your market — not your ZIP. Give Dallas prospects a Dallas number without moving anyone.", accent: "#26bad4" },
  { Icon: Smartphone, title: "Any device",           body: "Mobile, softphone, desk phone or SIP. No hardware required. Activate and route in minutes.",                              accent: "#0f1f2e" },
  { Icon: Zap,        title: "Instant provisioning", body: "Add a number for a new market without waiting. Most numbers activate instantly — all within 24 hours.",                    accent: "#26bad4" },
  { Icon: Shield,     title: "STIR/SHAKEN verified", body: "Outbound calls carry verified caller identity. Your 303 number shows up as a Denver number — not an unknown caller.",     accent: "#059669" },
]

const STEPS: Step[] = [
  { n: "01", title: "Pick your area code",  body: "Choose from nationwide coverage. 200+ area codes available." },
  { n: "02", title: "Number activates",     body: "Typically within 24 hours. Most provision instantly." },
  { n: "03", title: "Configure routing",    body: "Mobile, desk phone, softphone, or SIP device — your choice." },
  { n: "04", title: "Start taking calls",   body: "No hardware. No technician. No long-term contract." },
]

const COMPARE: CompareRow[] = [
  { problem: "Open an office for local presence",  solution: "Provision a virtual number in 24 hours" },
  { problem: "Sign a multi-year telco contract",   solution: "Month-to-month billing, cancel anytime" },
  { problem: "Buy desk phones and a PBX",          solution: "Route to any device you already own" },
  { problem: "Hire a regional receptionist",       solution: "Add auto-attendant routing in minutes" },
  { problem: "One static number, one location",    solution: "Any area code, route anywhere" },
]

const FAQS: FaqItem[] = [
  { q: "How fast does a number activate?",            a: "Most within 24 hours. Many instantly available." },
  { q: "Can I receive SMS on a virtual number?",      a: "Yes. Two-way SMS is supported on every Twiching number." },
  { q: "What devices can a virtual number route to?", a: "Any SIP device, desktop softphone, mobile app, or standard phone number. Configure simultaneous ring, sequential ring, or IVR." },
  { q: "Can I port an existing number?",              a: "Yes. Standard domestic porting: 5–10 business days." },
  { q: "What if I exceed my plan's minutes?",         a: "Starter includes 5,000 domestic minutes/month. Overage at published rates. Professional and Enterprise include unlimited domestic calling." },
]

const STATS: Stat[] = [
  { value: "200+",   label: "Area codes" },
  { value: "24h",    label: "Activation" },
  { value: "99.99%", label: "Uptime SLA" },
  { value: "2-way",  label: "SMS included" },
]

const RELATED: RelatedCard[] = [
  { title: "Local phone numbers",  desc: "A specific city area code — 212, 305, 415 — for market-by-market presence.", href: "/phone-numbers/local" },
  { title: "Business numbers",     desc: "A dedicated professional line separate from personal. One seat, one number.", href: "/phone-numbers/business" },
  { title: "Second phone numbers", desc: "Work and personal on one device. Two numbers, no second SIM.",               href: "/phone-numbers/second-number" },
]



/* ─── Animation constants ────────────────────────────────────── */
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" } as const,
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const, delay },
})

const cardHoverVariants = {
  rest:  { y: 0, boxShadow: "0 1px 3px rgba(0,0,0,0.07)" },
  hover: { y: -5, boxShadow: "0 20px 48px rgba(0,0,0,0.12)", transition: { type: "spring" as const, stiffness: 200, damping: 20 } },
}

/* ─── Shared primitives ──────────────────────────────────────── */
function EyebrowLabel({ children, dark = false }: { children: React.ReactNode; dark?: boolean }) {
  return (
    <p className={`text-[11px] font-mono font-bold tracking-[2px] uppercase mb-3`} style={{ color: dark ? "#26bad4" : "#26bad4" }}>
      {children}
    </p>
  )
}

function PageHeading({ children, dark = false, id }: { children: React.ReactNode; dark?: boolean; id?: string }) {
  return (
    <h2 id={id} className={`font-serif text-[36px] sm:text-[44px] font-semibold tracking-tight ${dark ? "text-white" : "text-gray-900"}`}>
      {children}
    </h2>
  )
}

function PrimaryButton({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <motion.a
      href={href}
      whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
      className="group inline-flex items-center gap-2 bg-accent text-white text-[15px] font-semibold font-mono pl-7 pr-3 py-3 rounded-full hover:bg-[color:var(--accent-dark)] shadow-[0_8px_24px_-6px_rgba(26,188,217,0.5)]"
    >
      {children}
      <span aria-hidden="true" className="grid place-items-center h-8 w-8 rounded-full bg-white/15 ring-1 ring-inset ring-white/20 transition-transform group-hover:translate-x-0.5">
        <ArrowRight className="h-4 w-4" strokeWidth={2.2} />
      </span>
    </motion.a>
  )
}

/* Phone icon shared by both panels */
function PhoneSvg() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path d="M2 4.5A1.5 1.5 0 013.5 3h.5l1.5 3.5-1.5 1.5a7 7 0 004 4L9.5 10l3.5 1.5v.5A1.5 1.5 0 0111.5 13.5C5.5 13.5 0 8 0 2z" fill="currentColor" />
    </svg>
  )
}

/* ─── Page root ─────────────────────────────────────────────── */
export function VirtualNumberPage() {
  const rootRef  = useRef<HTMLDivElement>(null)
  const stepsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.timeline({ defaults: { ease: "power3.out" } })
        .from(".vn-eyebrow",   { y: 16, opacity: 0, duration: 0.5 })
        .from(".vn-h1 span",   { y: 60, opacity: 0, stagger: 0.04, duration: 0.8, ease: "power4.out" }, "-=0.2")
        .from(".vn-sub",       { y: 16, opacity: 0, duration: 0.45 }, "-=0.5")
        .from(".vn-cta",       { y: 12, opacity: 0, duration: 0.4  }, "-=0.35")
        .from(".vn-stat",      { y: 10, opacity: 0, stagger: 0.07, duration: 0.4, ease: "back.out(1.5)" }, "-=0.2")

      gsap.from(".vn-step", {
        x: -30, opacity: 0, stagger: 0.12, duration: 0.6, ease: "power3.out",
        scrollTrigger: { trigger: stepsRef.current, start: "top 75%" },
      })

      gsap.from(".vn-row", {
        y: 18, opacity: 0, stagger: 0.06, duration: 0.5, ease: "power2.out",
        scrollTrigger: { trigger: ".vn-compare", start: "top 80%" },
      })
    }, rootRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={rootRef}>
      <AnnouncementBar />
      <MegaNav />
      <main>
        <HeroSection />
        <NarrativeStrip />
        <BenefitsSection />
        <HowItWorksSection stepsRef={stepsRef} />

        <ComparisonSection />
        <Faq items={FAQS} heading="Virtual number questions, answered." />
        <RelatedSection />
        <FinalCta />
      </main>
      <Footer />
    </div>
  )
}

/* ─── Sections ──────────────────────────────────────────────── */
function HeroSection() {
  return (
    <section
      className="relative overflow-hidden pt-16 pb-12 md:pt-20 md:pb-16 px-[5%]" style={{ backgroundColor: "#f5f9fa" }}
      aria-labelledby="hero-h1"
    >
      {/* Dot-grid background */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: "radial-gradient(circle, #e2e8f0 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          opacity: 0.55,
        }} />
      {/* Ambient blue orb */}
      <div aria-hidden="true" className="pointer-events-none absolute top-0 left-0 w-[640px] h-[480px]"
        style={{ background: "radial-gradient(ellipse at top left, rgba(38,186,212,0.09) 0%, transparent 65%)" }} />
      <div aria-hidden="true" className="pointer-events-none absolute bottom-0 right-0 w-[480px] h-[360px]"
        style={{ background: "radial-gradient(ellipse at bottom right, rgba(15,31,46,0.07) 0%, transparent 65%)" }} />

      <div className="max-w-[1200px] mx-auto relative">
        {/* ── 1fr 1fr grid ── */}
        <div
          className="grid gap-12 lg:gap-16 items-center"
          style={{ gridTemplateColumns: "1fr 1fr" }}
        >
          {/* LEFT — copy */}
          <div>
            <div className="vn-eyebrow inline-flex items-center gap-2 border text-[11px] font-bold font-mono tracking-[1.5px] uppercase px-4 py-2 rounded-full mb-7"
              style={{ background: "#e8f9fc", borderColor: "#a5e8f2", color: "#26bad4" }}>
              <span aria-hidden="true" className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full rounded-full opacity-70 animate-ping" style={{ backgroundColor: "#26bad4" }} />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full" style={{ backgroundColor: "#26bad4" }} />
              </span>
              Virtual Phone Numbers
            </div>

            <h1
              id="hero-h1"
              className="vn-h1 font-serif font-semibold leading-[1.02] tracking-tight text-slate-900 mb-5 overflow-hidden"
              style={{ fontSize: "clamp(2.4rem, 4vw, 3.8rem)" }}
            >
              <span className="block">
                {"A phone number in".split(" ").map((w, i) => (
                  <span key={`l1-${i}`} className="inline-block mr-[0.18em]">{w}</span>
                ))}
              </span>
              <span               className="block italic" style={{ color: "#26bad4" }}>
                {"any area code.".split(" ").map((w, i) => (
                  <span key={`l2-${i}`} className="inline-block mr-[0.18em]">{w}</span>
                ))}
              </span>
            </h1>

            <p className="vn-sub text-[17px] text-slate-500 leading-relaxed mb-8 max-w-[480px]">
              Virtual numbers give your business nationwide reach — routed to any device — without the office rent.
            </p>

            <div className="vn-cta flex flex-wrap items-center gap-3 mb-8">
              <motion.a
                href="/contact"
                whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
                className="group inline-flex items-center gap-2 bg-accent text-white text-[15px] font-semibold font-mono pl-7 pr-3 py-2 rounded-full hover:bg-[color:var(--accent-dark)] shadow-[0_8px_24px_-6px_rgba(26,188,217,0.45)]"
              >
                Talk to sales
                <span aria-hidden="true" className="grid place-items-center h-8 w-8 rounded-full bg-white/15 ring-1 ring-inset ring-white/20 transition-transform group-hover:translate-x-0.5">
                  <ArrowRight className="h-4 w-4" strokeWidth={2.2} />
                </span>
              </motion.a>
            </div>

            {/* Trust chips */}
            <div className="flex flex-wrap gap-2 mb-8">
              {([
                { label: "14-day free trial", Icon: Check },
                { label: "STIR/SHAKEN",       Icon: ShieldCheck },
                { label: "HIPAA-ready",        Icon: HeartPulse },
                { label: "99.99% uptime",      Icon: Activity },
              ] as { label: string; Icon: LucideIcon }[]).map(({ label, Icon }) => (
                <span
                  key={label}
                  className="hero-chip inline-flex items-center gap-1.5 bg-white/80 backdrop-blur-sm border border-gray-200 text-gray-700 text-[11px] font-semibold font-mono px-3.5 py-[6px] rounded-full shadow-sm"
                >
                  <Icon className="h-3 w-3 text-accent" strokeWidth={2.2} />
                  {label}
                </span>
              ))}
            </div>

          </div>

          {/* RIGHT — live showcase */}
          <div className="vn-dashboard">
            <LiveShowcase />
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─── Number Lifecycle Dashboard (right column of hero) ─────── */

type LifecycleStage = "search" | "buy" | "call" | "sms" | "forward" | "control"

type LifecycleItem = {
  id: number
  stage: LifecycleStage
  Icon: LucideIcon
  title: string
  detail: string
  chip: string
  tint: "blue" | "green" | "violet" | "amber" | "sky"
}

const LIFECYCLE_FEED: LifecycleItem[] = [
  { id: 1, stage: "search",  Icon: Search,        title: "Searching +1 (415) numbers…",        detail: "San Francisco · 12 numbers available instantly",          chip: "SEARCH",  tint: "blue"   },
  { id: 2, stage: "buy",     Icon: ShoppingCart,  title: "Number available: +1 415 555 0192",  detail: "Area code 415 · STIR/SHAKEN ready · activating now",      chip: "PURCHASE", tint: "green"  },
  { id: 3, stage: "call",    Icon: PhoneIncoming, title: "Incoming call → +1 415 555 0192",    detail: "Routed to mobile · Atlanta · answered in 0.9s",            chip: "ROUTED",  tint: "sky"    },
  { id: 4, stage: "sms",     Icon: MessageSquare, title: "SMS received → +1 415 555 0192",     detail: "Forwarded to john@company.com · delivered 340ms",          chip: "FWDED",   tint: "violet" },
  { id: 5, stage: "forward", Icon: RefreshCw,     title: "Call forwarding updated",            detail: "Primary: mobile · Fallback: voicemail · saved",            chip: "UPDATED", tint: "amber"  },
  { id: 6, stage: "control", Icon: Mail,          title: "Voicemail → email transcript",       detail: "2m 14s · transcribed · sent to inbox in 3s",              chip: "DONE",    tint: "green"  },
]

const TINT_MAP: Record<LifecycleItem["tint"], { bg: string; ring: string; text: string; dot: string }> = {
  blue:   { bg: "bg-[#e0f7fa]",    ring: "ring-[#95d9e8]/50",    text: "text-accent",     dot: "bg-[#1abcd9]"      },
  green:  { bg: "bg-emerald-50", ring: "ring-emerald-100", text: "text-emerald-600",  dot: "bg-emerald-500"   },
  violet: { bg: "bg-violet-50",  ring: "ring-violet-100",  text: "text-violet-600",   dot: "bg-violet-500"    },
  amber:  { bg: "bg-amber-50",   ring: "ring-amber-100",   text: "text-amber-600",    dot: "bg-amber-500"     },
  sky:    { bg: "bg-sky-50",     ring: "ring-sky-100",     text: "text-sky-600",       dot: "bg-sky-500"       },
}

type Country = { code: string; flag: string; name: string; areaLabel: string; numDigits: number }

const ALL_COUNTRIES: Country[] = [
  { code: "+1",   flag: "🇺🇸", name: "United States",       areaLabel: "Area code",    numDigits: 3  },
  { code: "+1",   flag: "🇨🇦", name: "Canada",              areaLabel: "Area code",    numDigits: 3  },
  { code: "+44",  flag: "🇬🇧", name: "United Kingdom",      areaLabel: "Area code",    numDigits: 3  },
  { code: "+61",  flag: "🇦🇺", name: "Australia",           areaLabel: "Area code",    numDigits: 2  },
  { code: "+91",  flag: "🇮🇳", name: "India",               areaLabel: "STD code",     numDigits: 4  },
  { code: "+49",  flag: "🇩🇪", name: "Germany",             areaLabel: "Area code",    numDigits: 3  },
  { code: "+33",  flag: "🇫🇷", name: "France",              areaLabel: "Area code",    numDigits: 2  },
  { code: "+39",  flag: "🇮🇹", name: "Italy",               areaLabel: "Area code",    numDigits: 2  },
  { code: "+34",  flag: "🇪🇸", name: "Spain",               areaLabel: "Area code",    numDigits: 2  },
  { code: "+55",  flag: "🇧🇷", name: "Brazil",              areaLabel: "Area code",    numDigits: 2  },
  { code: "+52",  flag: "🇲🇽", name: "Mexico",              areaLabel: "Area code",    numDigits: 3  },
  { code: "+81",  flag: "🇯🇵", name: "Japan",               areaLabel: "Area code",    numDigits: 2  },
  { code: "+82",  flag: "🇰🇷", name: "South Korea",         areaLabel: "Area code",    numDigits: 2  },
  { code: "+86",  flag: "🇨🇳", name: "China",               areaLabel: "Area code",    numDigits: 3  },
  { code: "+65",  flag: "🇸🇬", name: "Singapore",           areaLabel: "Prefix",       numDigits: 1  },
  { code: "+64",  flag: "🇳🇿", name: "New Zealand",         areaLabel: "Area code",    numDigits: 2  },
  { code: "+27",  flag: "🇿🇦", name: "South Africa",        areaLabel: "Area code",    numDigits: 2  },
  { code: "+234", flag: "🇳🇬", name: "Nigeria",             areaLabel: "Area code",    numDigits: 3  },
  { code: "+254", flag: "🇰🇪", name: "Kenya",               areaLabel: "Area code",    numDigits: 3  },
  { code: "+971", flag: "🇦🇪", name: "UAE",                 areaLabel: "Area code",    numDigits: 2  },
  { code: "+966", flag: "🇸🇦", name: "Saudi Arabia",        areaLabel: "Area code",    numDigits: 2  },
  { code: "+20",  flag: "🇪🇬", name: "Egypt",               areaLabel: "Area code",    numDigits: 2  },
  { code: "+212", flag: "🇲🇦", name: "Morocco",             areaLabel: "Area code",    numDigits: 3  },
  { code: "+31",  flag: "🇳🇱", name: "Netherlands",         areaLabel: "Area code",    numDigits: 2  },
  { code: "+32",  flag: "🇧🇪", name: "Belgium",             areaLabel: "Area code",    numDigits: 2  },
  { code: "+41",  flag: "🇨🇭", name: "Switzerland",         areaLabel: "Area code",    numDigits: 2  },
  { code: "+43",  flag: "🇦🇹", name: "Austria",             areaLabel: "Area code",    numDigits: 2  },
  { code: "+45",  flag: "🇩🇰", name: "Denmark",             areaLabel: "Prefix",       numDigits: 2  },
  { code: "+46",  flag: "🇸🇪", name: "Sweden",              areaLabel: "Area code",    numDigits: 2  },
  { code: "+47",  flag: "🇳🇴", name: "Norway",              areaLabel: "Prefix",       numDigits: 2  },
  { code: "+48",  flag: "🇵🇱", name: "Poland",              areaLabel: "Area code",    numDigits: 2  },
  { code: "+351", flag: "🇵🇹", name: "Portugal",            areaLabel: "Area code",    numDigits: 3  },
  { code: "+353", flag: "🇮🇪", name: "Ireland",             areaLabel: "Area code",    numDigits: 2  },
  { code: "+358", flag: "🇫🇮", name: "Finland",             areaLabel: "Area code",    numDigits: 2  },
  { code: "+420", flag: "🇨🇿", name: "Czech Republic",      areaLabel: "Area code",    numDigits: 3  },
  { code: "+36",  flag: "🇭🇺", name: "Hungary",             areaLabel: "Area code",    numDigits: 2  },
  { code: "+30",  flag: "🇬🇷", name: "Greece",              areaLabel: "Area code",    numDigits: 4  },
  { code: "+90",  flag: "🇹🇷", name: "Turkey",              areaLabel: "Area code",    numDigits: 3  },
  { code: "+7",   flag: "🇷🇺", name: "Russia",              areaLabel: "Area code",    numDigits: 3  },
  { code: "+380", flag: "🇺🇦", name: "Ukraine",             areaLabel: "Area code",    numDigits: 3  },
  { code: "+62",  flag: "🇮🇩", name: "Indonesia",           areaLabel: "Area code",    numDigits: 3  },
  { code: "+63",  flag: "🇵🇭", name: "Philippines",         areaLabel: "Area code",    numDigits: 2  },
  { code: "+60",  flag: "🇲🇾", name: "Malaysia",            areaLabel: "Area code",    numDigits: 2  },
  { code: "+66",  flag: "🇹🇭", name: "Thailand",            areaLabel: "Area code",    numDigits: 2  },
  { code: "+84",  flag: "🇻🇳", name: "Vietnam",             areaLabel: "Area code",    numDigits: 2  },
  { code: "+92",  flag: "🇵🇰", name: "Pakistan",            areaLabel: "Area code",    numDigits: 3  },
  { code: "+880", flag: "🇧🇩", name: "Bangladesh",          areaLabel: "Area code",    numDigits: 3  },
  { code: "+94",  flag: "🇱🇰", name: "Sri Lanka",           areaLabel: "Area code",    numDigits: 2  },
  { code: "+56",  flag: "🇨🇱", name: "Chile",               areaLabel: "Area code",    numDigits: 2  },
  { code: "+54",  flag: "🇦🇷", name: "Argentina",           areaLabel: "Area code",    numDigits: 3  },
  { code: "+57",  flag: "🇨🇴", name: "Colombia",            areaLabel: "Area code",    numDigits: 2  },
  { code: "+51",  flag: "🇵🇪", name: "Peru",                areaLabel: "Area code",    numDigits: 2  },
  { code: "+58",  flag: "🇻🇪", name: "Venezuela",           areaLabel: "Area code",    numDigits: 3  },
  { code: "+593", flag: "🇪🇨", name: "Ecuador",             areaLabel: "Area code",    numDigits: 2  },
  { code: "+972", flag: "🇮🇱", name: "Israel",              areaLabel: "Area code",    numDigits: 2  },
  { code: "+98",  flag: "🇮🇷", name: "Iran",                areaLabel: "Area code",    numDigits: 3  },
]

type NumberResult = { number: string; type: "Local" | "Mobile" | "Toll-Free"; carrier: string }

const CARRIERS: Record<string, string[]> = {
  "+1":   ["Verizon", "AT&T", "T-Mobile"],
  "+44":  ["BT", "EE", "Vodafone UK"],
  "+61":  ["Telstra", "Optus", "Vodafone AU"],
  "+91":  ["Jio", "Airtel", "BSNL"],
  "+49":  ["Deutsche Telekom", "Vodafone DE", "O2 Germany"],
  "+33":  ["Orange", "SFR", "Bouygues"],
  default: ["Local Carrier", "National Carrier", "Regional Carrier"],
}

function generateNumbers(country: Country, areaCode: string): NumberResult[] {
  const seed = areaCode.split("").reduce((a, c) => a + c.charCodeAt(0), 0)
  const carriers = CARRIERS[country.code] ?? CARRIERS.default
  const types: NumberResult["type"][] = ["Local", "Mobile", "Toll-Free"]
  return Array.from({ length: 6 }, (_, i) => {
    const base = ((seed * (i + 7) * 1337) % 9000) + 1000
    const ext  = ((seed * (i + 3) * 31)   % 9000) + 1000
    return {
      number:  `${country.code} (${areaCode}) ${base}-${ext}`,
      type:    types[(seed + i) % types.length],
      carrier: carriers[(seed + i) % carriers.length],
    }
  })
}

function NumberSearchBar() {
  const [countryIdx, setCountryIdx] = useState(0)
  const [areaCode, setAreaCode]     = useState("")
  const [open, setOpen]             = useState(false)
  const [filterQ, setFilterQ]       = useState("")
  const [results, setResults]       = useState<NumberResult[] | null>(null)
  const [searching, setSearching]   = useState(false)
  const [claimed, setClaimed]       = useState<Set<string>>(new Set())
  const dropdownRef                 = useRef<HTMLDivElement>(null)

  const country  = ALL_COUNTRIES[countryIdx]
  const filtered = ALL_COUNTRIES.filter(
    (c) => c.name.toLowerCase().includes(filterQ.toLowerCase()) || c.code.includes(filterQ)
  )

  // Close dropdown on outside click
  useEffect(() => {
    function handler(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener("mousedown", handler)
    return () => document.removeEventListener("mousedown", handler)
  }, [])

  function handleSearch() {
    if (!areaCode) return
    setSearching(true)
    setResults(null)
    setTimeout(() => {
      setResults(generateNumbers(country, areaCode))
      setSearching(false)
    }, 820)
  }

  function handleClaim(number: string) {
    setClaimed((prev) => new Set(prev).add(number))
  }

  return (
    <div className="border-b border-gray-100">
      {/* Search row */}
      <div className="px-4 pt-4 pb-3">
        <p className="text-[10px] font-mono font-bold tracking-[1.5px] uppercase text-gray-400 mb-2.5">
          Find a number
        </p>
        <div className="flex items-stretch gap-2">

          {/* Country selector */}
          <div className="relative" ref={dropdownRef}>
            <button
              type="button"
              onClick={() => { setOpen((v) => !v); setFilterQ("") }}
              className="h-10 flex items-center gap-1.5 px-3 rounded-xl bg-gray-50 ring-1 ring-gray-200 text-[13px] font-mono font-semibold text-gray-700 hover:bg-gray-100 transition whitespace-nowrap"
            >
              <span className="text-base leading-none">{country.flag}</span>
              <span>{country.code}</span>
              <ChevronDown className={`h-3 w-3 text-gray-400 transition-transform ${open ? "rotate-180" : ""}`} strokeWidth={2.2} />
            </button>

            <AnimatePresence>
              {open && (
                <motion.div
                  initial={{ opacity: 0, y: -6, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -6, scale: 0.97 }}
                  transition={{ duration: 0.15 }}
                  className="absolute left-0 top-full mt-1 z-30 w-64 bg-white rounded-2xl ring-1 ring-gray-200 shadow-xl overflow-hidden"
                >
                  {/* Filter input */}
                  <div className="px-3 pt-3 pb-2 border-b border-gray-100">
                    <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-gray-50 ring-1 ring-gray-200">
                      <Search className="h-3 w-3 text-gray-400 flex-shrink-0" strokeWidth={2.5} />
                      <input
                        autoFocus
                        type="text"
                        placeholder="Search country…"
                        value={filterQ}
                        onChange={(e) => setFilterQ(e.target.value)}
                        className="flex-1 text-[12px] font-mono bg-transparent text-gray-700 placeholder:text-gray-400 outline-none"
                      />
                    </div>
                  </div>
                  {/* List */}
                  <ul className="max-h-48 overflow-y-auto divide-y divide-gray-50">
                    {filtered.length === 0 ? (
                      <li className="px-4 py-3 text-[12px] text-gray-400 font-mono">No results</li>
                    ) : filtered.map((c, i) => {
                      const realIdx = ALL_COUNTRIES.findIndex((x) => x.name === c.name)
                      return (
                        <li key={`${c.code}-${c.name}`}>
                          <button
                            type="button"
                            onClick={() => { setCountryIdx(realIdx); setOpen(false); setResults(null); setAreaCode("") }}
                            className={`w-full flex items-center gap-2.5 px-3 py-2 text-[12px] font-mono text-gray-700 transition ${realIdx === countryIdx ? "text-[#26bad4]" : "hover:text-[#26bad4]"}`} style={realIdx === countryIdx ? { backgroundColor: "#e8f9fc" } : undefined}
                          >
                            <span className="text-base leading-none w-5 text-center">{c.flag}</span>
                            <span className="flex-1 text-left font-medium truncate">{c.name}</span>
                            <span className="text-gray-400 font-semibold">{c.code}</span>
                          </button>
                        </li>
                      )
                    })}
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Area code input */}
          <input
            type="text"
            inputMode="numeric"
            maxLength={country.numDigits + 1}
            placeholder={country.areaLabel}
            value={areaCode}
            onChange={(e) => { setAreaCode(e.target.value.replace(/\D/g, "")); setResults(null) }}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            className="flex-1 h-10 px-3.5 rounded-xl bg-gray-50 ring-1 ring-gray-200 text-[13px] font-mono text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 transition min-w-0" style={{ "--tw-ring-color": "#26bad4" } as React.CSSProperties}
          />

          {/* Search button */}
          <motion.button
            type="button"
            whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
            onClick={handleSearch}
            disabled={!areaCode || searching}
            className="h-10 flex items-center gap-1.5 px-4 rounded-xl text-white text-[12px] font-mono font-bold tracking-wide transition disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap" style={{ backgroundColor: "#26bad4", boxShadow: "0 4px 14px -4px rgba(38,186,212,0.55)" }}
          >
            {searching
              ? <RefreshCw className="h-3.5 w-3.5 animate-spin" strokeWidth={2.5} />
              : <Search    className="h-3.5 w-3.5" strokeWidth={2.5} />
            }
            {searching ? "Searching…" : "Search"}
          </motion.button>
        </div>
      </div>

      {/* Results panel */}
      <AnimatePresence>
        {results && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-3">
              <div className="flex items-center justify-between mb-2">
                <p className="text-[10px] font-mono font-bold tracking-[1.5px] uppercase text-gray-400">
                  {results.length} numbers available · {country.flag} {country.name} {country.code} ({areaCode})
                </p>
                <button
                  type="button"
                  onClick={() => setResults(null)}
                  className="text-[10px] font-mono text-gray-400 hover:text-gray-600 transition"
                >
                  Clear
                </button>
              </div>
              <ul className="space-y-1.5 max-h-44 overflow-y-auto pr-0.5">
                {results.map((r, i) => (
                  <motion.li
                    key={r.number}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.055, duration: 0.25 }}
                    className="flex items-center gap-2.5 rounded-xl bg-gray-50 ring-1 ring-gray-100 px-3 py-2 transition group hover:ring-[#26bad4]/40 hover:bg-[#e8f9fc]/40"
                  >
                    {/* Number */}
                    <span className="flex-1 text-[12px] font-mono font-semibold text-gray-900 truncate">
                      {r.number}
                    </span>

                    {/* Type badge */}
                    <span className={`text-[9px] font-mono font-bold tracking-[1.2px] uppercase px-2 py-0.5 rounded-full flex-shrink-0 ${
                      r.type === "Local"    ? "bg-[#e0f7fa]   text-accent   ring-1 ring-[#95d9e8]/50"  :
                      r.type === "Mobile"   ? "bg-emerald-50 text-emerald-600 ring-1 ring-emerald-100" :
                                              "bg-amber-50  text-amber-600  ring-1 ring-amber-100"
                    }`}>
                      {r.type}
                    </span>

                    {/* Carrier */}
                    <span className="text-[10px] font-mono text-gray-400 hidden sm:block flex-shrink-0 truncate max-w-[72px]">
                      {r.carrier}
                    </span>

                    {/* Get Number CTA */}
                    {claimed.has(r.number) ? (
                      <span className="flex items-center gap-1 text-[10px] font-mono font-bold text-emerald-600 flex-shrink-0">
                        <Check className="h-3 w-3" strokeWidth={2.5} /> Added
                      </span>
                    ) : (
                      <motion.button
                        type="button"
                        whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
                        onClick={() => handleClaim(r.number)}
                        className="flex-shrink-0 text-[10px] font-mono font-bold px-2.5 py-1 rounded-lg text-white transition opacity-0 group-hover:opacity-100" style={{ backgroundColor: "#26bad4" }}
                      >
                        Get
                      </motion.button>
                    )}
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function LiveShowcase() {
  const cardRef = useRef<HTMLDivElement>(null)

  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const rotX = useSpring(useTransform(my, [-0.5, 0.5], [5, -5]), { stiffness: 120, damping: 18 })
  const rotY = useSpring(useTransform(mx, [-0.5, 0.5], [-5, 5]), { stiffness: 120, damping: 18 })

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect()
    mx.set((e.clientX - rect.left) / rect.width - 0.5)
    my.set((e.clientY - rect.top) / rect.height - 0.5)
  }
  function handleMouseLeave() { mx.set(0); my.set(0) }

  const [cursor, setCursor] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setCursor((c) => (c + 1) % LIFECYCLE_FEED.length), 2400)
    return () => clearInterval(id)
  }, [])

  const visible = [
    LIFECYCLE_FEED[cursor % LIFECYCLE_FEED.length],
    LIFECYCLE_FEED[(cursor + 1) % LIFECYCLE_FEED.length],
    LIFECYCLE_FEED[(cursor + 2) % LIFECYCLE_FEED.length],
  ]

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.45 }}
      style={{ perspective: 1200, rotateX: rotX, rotateY: rotY, transformStyle: "preserve-3d" }}
      className="relative w-full"
    >
      {/* Floor shadow */}
      <div aria-hidden="true"
        className="pointer-events-none absolute -bottom-8 left-1/2 h-16 w-[85%] -translate-x-1/2 rounded-full"
        style={{ background: "radial-gradient(ellipse at center, rgba(38,186,212,0.22), rgba(38,186,212,0) 70%)", filter: "blur(18px)" }}
      />

      {/* Orbit ring decoration */}
      <ShowcaseOrbitRing />

      {/* Main card */}
      <div
        className="relative overflow-hidden rounded-[28px] bg-white/80 backdrop-blur-xl ring-1 ring-gray-200/70 shadow-[0_40px_80px_-30px_rgba(15,23,42,0.22),0_8px_24px_-12px_rgba(26,188,217,0.18)]"
        style={{ transform: "translateZ(0)" }}
      >
        {/* Inner gradient mesh */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-60"
          style={{ background: "radial-gradient(600px 200px at 15% 0%, rgba(38,186,212,0.12), transparent 60%), radial-gradient(500px 180px at 95% 100%, rgba(15,31,46,0.10), transparent 60%)" }}
        />

        {/* Window chrome */}
        <div className="relative flex items-center justify-between px-5 py-3.5 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-red-300/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-300/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-300/80" />
            </div>
            <span className="ml-2 text-[11px] font-mono text-gray-400 tracking-wider">app.twiching.ai / numbers</span>
          </div>
          <div className="flex items-center gap-2">
            <ShowcasePulseDot />
            <span className="text-[11px] font-mono font-bold tracking-[1.5px] uppercase text-emerald-600">Number Lifecycle</span>
          </div>
        </div>

        {/* Number search bar */}
        <NumberSearchBar />

        {/* Rolling lifecycle feed */}
        <div className="relative px-4 py-4 min-h-[220px]">
          <div className="space-y-2.5">
            <AnimatePresence mode="popLayout" initial={false}>
              {visible.map((item, i) => (
                <motion.div
                  key={`${item.id}-${cursor}-${i}`}
                  layout
                  initial={{ opacity: 0, y: 20, scale: 0.96 }}
                  animate={{ opacity: 1 - i * 0.12, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -14, scale: 0.96 }}
                  transition={{ type: "spring", stiffness: 260, damping: 26, mass: 0.8 }}
                >
                  <ShowcaseActivityRow item={item} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* Footer stats */}
        <div className="relative grid grid-cols-3 divide-x divide-gray-100 border-t border-gray-100 bg-gray-50/50">
          <ShowcaseFooterStat label="Today"       value="14,823" sub="calls routed"  />
          <ShowcaseFooterStat label="Answer rate" value="91.4%"  sub="last 24h"      />
          <ShowcaseFooterStat label="Latency p95" value="14ms"   sub="global"        />
        </div>
      </div>
    </motion.div>
  )
}

function ShowcaseActivityRow({ item }: { item: LifecycleItem }) {
  const t = TINT_MAP[item.tint]
  const { Icon } = item
  return (
    <div className="flex items-center gap-3 rounded-2xl bg-white/80 backdrop-blur ring-1 ring-gray-100 px-4 py-2.5 hover:ring-gray-200 transition">
      <span className={`grid place-items-center h-9 w-9 rounded-xl flex-shrink-0 ${t.bg} ring-1 ${t.ring} ${t.text}`}>
        <Icon className="h-4 w-4" strokeWidth={2} />
      </span>
      <div className="flex-1 min-w-0 text-left">
        <p className="text-[12px] font-semibold text-gray-900 font-mono truncate">{item.title}</p>
        <p className="text-[11px] text-gray-500 truncate">{item.detail}</p>
      </div>
      <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[9px] font-mono font-bold tracking-[1.5px] uppercase ${t.bg} ${t.text} ring-1 ${t.ring}`}>
        <motion.span
          className={`inline-block h-1.5 w-1.5 rounded-full ${t.dot}`}
          animate={{ opacity: [1, 0.3, 1] }}
          transition={{ duration: 1.4, repeat: Infinity }}
        />
        {item.chip}
      </span>
    </div>
  )
}

function ShowcasePulseDot() {
  return (
    <span className="relative flex h-2 w-2">
      <motion.span
        className="absolute inline-flex h-full w-full rounded-full bg-emerald-400"
        animate={{ scale: [1, 2.2], opacity: [0.6, 0] }}
        transition={{ duration: 1.6, repeat: Infinity, ease: "easeOut" }}
      />
      <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
    </span>
  )
}

function ShowcaseOrbitRing() {
  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none absolute -top-9 -right-9 h-36 w-36"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.9 }}
    >
      <motion.div
        className="absolute inset-0"
        animate={{ rotate: 360 }}
        transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
      >
        <div         className="absolute inset-0 rounded-full border border-dashed" style={{ borderColor: "rgba(38,186,212,0.5)" }} />
        <span className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 h-2.5 w-2.5 rounded-full bg-accent shadow-[0_0_0_4px_rgba(26,188,217,0.18)]" />
        <span className="absolute bottom-[12%] right-[6%] h-2 w-2 rounded-full bg-violet-500" />
        <span className="absolute left-[10%] bottom-[20%] h-1.5 w-1.5 rounded-full bg-emerald-500" />
      </motion.div>
      <motion.div
        className="absolute inset-5 rounded-full border" style={{ borderColor: "rgba(38,186,212,0.25)" }}
        animate={{ rotate: -360 }}
        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
      >
        <span className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/2 h-2 w-2 rounded-full bg-accent/70" />
      </motion.div>
    </motion.div>
  )
}

function ShowcaseFooterStat({ label, value, sub }: { label: string; value: string; sub: string }) {
  return (
    <div className="px-4 py-3.5 text-left">
      <p className="text-[9px] font-mono font-bold tracking-[1.5px] uppercase text-gray-400">{label}</p>
      <p className="font-serif text-[22px] font-semibold text-gray-900 mt-0.5 leading-none">{value}</p>
      <p className="text-[10px] text-gray-500 font-mono mt-0.5">{sub}</p>
    </div>
  )
}

function NarrativeStrip() {
  return (
    <motion.section {...fadeUp()} className="py-16 px-[5%]" style={{ backgroundColor: "#0f1f2e" }}>
      <div className="max-w-[800px] mx-auto text-center">
        <p className="text-[20px] font-serif leading-relaxed text-gray-300">
          The prospect in Dallas saw an unknown out-of-state number and let it ring to voicemail.
        </p>
        <p className="text-[16px] font-mono text-gray-500 mt-4">
          It wasn't personal. People don't answer numbers they don't recognize.
        </p>
      </div>
    </motion.section>
  )
}

function BenefitsSection() {
  return (
    <section className="py-24 px-[5%]" style={{ backgroundColor: "#f5f9fa" }} aria-labelledby="benefits-h2">
      <div className="max-w-[1200px] mx-auto">
        <motion.div {...fadeUp()} className="text-center mb-14">
          <EyebrowLabel>Why virtual numbers</EyebrowLabel>
          <PageHeading id="benefits-h2">What you actually get</PageHeading>
        </motion.div>
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 list-none p-0 m-0">
          {BENEFITS.map((benefit, i) => (
            <BenefitCard key={benefit.title} {...benefit} delay={i * 0.08} />
          ))}
        </ul>
      </div>
    </section>
  )
}

function BenefitCard({ Icon, title, body, accent, delay }: Benefit & { delay: number }) {
  return (
      <motion.li
      {...fadeUp(delay)}
      initial="rest"
      whileHover="hover"
      variants={cardHoverVariants}
      className="relative rounded-2xl border border-gray-100 p-7 cursor-default overflow-hidden" style={{ backgroundColor: "#ffffff" }}
    >
      <div aria-hidden="true" className="absolute top-0 inset-x-0 h-[3px] rounded-t-2xl opacity-70" style={{ background: accent }} />
      <div aria-hidden="true" className="w-11 h-11 rounded-xl grid place-items-center mb-5"
        style={{ background: `${accent}14`, color: accent }}>
        <Icon className="h-5 w-5" strokeWidth={1.8} />
      </div>
      <h3 className="font-semibold text-[15px] text-gray-900 mb-2">{title}</h3>
      <p className="text-[13px] text-gray-500 leading-relaxed">{body}</p>
    </motion.li>
  )
}

function HowItWorksSection({ stepsRef }: { stepsRef: React.RefObject<HTMLDivElement | null> }) {
  return (
    <section ref={stepsRef} className="py-24 px-[5%] border-y border-gray-100" style={{ backgroundColor: "#f5f9fa" }} aria-labelledby="steps-h2">
      <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div>
          <EyebrowLabel>Setup</EyebrowLabel>
          <PageHeading id="steps-h2">Four steps to your first call</PageHeading>
          <p className="text-[16px] text-gray-500 leading-relaxed mt-5 mb-10">
            It isn't tied to a physical line or a location you rent. It's tied to a routing rule.
            A customer in Chicago dials a 312 number — the call routes to your team in Denver.
          </p>
          <motion.a href="/pricing"
            whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }}
            className="group inline-flex items-center gap-2 bg-accent text-white text-[14px] font-semibold font-mono pl-6 pr-3 py-2.5 rounded-full hover:bg-[color:var(--accent-dark)] transition-colors"
          >
            Get a number
            <span aria-hidden="true" className="grid place-items-center h-7 w-7 rounded-full bg-white/15 group-hover:translate-x-0.5 transition-transform">
              <PhoneCall className="h-3.5 w-3.5" strokeWidth={2} />
            </span>
          </motion.a>
        </div>

        <div>
          <ol className="space-y-4 list-none p-0 m-0">
            {STEPS.map(({ n, title, body }) => (
              <li key={n} className="vn-step flex gap-5 items-start p-5 bg-white rounded-2xl border border-gray-100">
                <div aria-label={`Step ${n}`}
                  className="w-10 h-10 rounded-xl bg-accent text-white text-[11px] font-bold font-mono grid place-items-center flex-shrink-0">
                  {n}
                </div>
                <div>
                  <p className="font-semibold text-[15px] text-gray-900 mb-0.5">{title}</p>
                  <p className="text-[13px] text-gray-500">{body}</p>
                </div>
              </li>
            ))}
          </ol>
          <p className="text-[12px] text-gray-400 font-mono mt-3 pl-1">
            No hardware · No long-term contract · No phone company visit
          </p>
        </div>
      </div>
    </section>
  )
}

const KPI_CARDS = [
  {
    metric: "68%",
    label: "First-contact resolution",
    sub: "Voice + digital, post-launch month 3",
    Icon: PhoneCall,
  },
  {
    metric: "3.2×",
    label: "Supervisor productivity",
    sub: "vs. legacy PBX, median across deployments",
    Icon: Activity,
  },
  {
    metric: "41%",
    label: "Handle time reduction",
    sub: "AI assist + smart routing combined",
    Icon: Zap,
  },
  {
    metric: "99.99%",
    label: "Platform uptime SLA",
    sub: "Carrier-grade, 7 global regions",
    Icon: Shield,
  },
]

function ComparisonSection() {
  return (
    <section className="vn-compare py-24 px-[5%] bg-[#f5f9fa]" aria-labelledby="compare-h2">
      <div className="max-w-[1100px] mx-auto">

        {/* Split header */}
        <motion.div {...fadeUp()} className="flex flex-col md:flex-row md:items-end gap-6 md:gap-16 mb-14">
          <div className="flex-1">
            <p className="text-[11px] font-mono font-bold tracking-[2.5px] uppercase text-accent mb-3">Performance benchmarks</p>
            <h2 id="compare-h2" className="font-serif text-[36px] md:text-[44px] font-bold text-gray-900 leading-[1.1] tracking-tight">
              The only contact-center metrics<br className="hidden md:block" /> your team actually reads.
            </h2>
          </div>
          <div className="md:w-[340px] flex-shrink-0">
            <p className="text-[14px] text-gray-500 leading-relaxed font-mono">
              Benchmark data aggregated across 400+ contact centers. Aligned with Gartner CCaaS definitions. Results measured at month&nbsp;3 post-activation.
            </p>
          </div>
        </motion.div>

        {/* KPI grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {KPI_CARDS.map(({ metric, label, sub, Icon }, i) => (
            <motion.div
              key={label}
              {...fadeUp(i * 0.07)}
              whileHover={{ y: -4, boxShadow: "0 20px 48px -12px rgba(26,188,217,0.18)" }}
              transition={{ type: "spring", stiffness: 300, damping: 22 }}
              className="relative bg-white rounded-[32px] p-7 shadow-[0_4px_20px_-6px_rgba(0,0,0,0.08)] border border-gray-100 flex flex-col gap-3"
            >
              {/* Icon top-right */}
              <div className="absolute top-5 right-5 h-8 w-8 rounded-xl bg-[#e0f7fa] flex items-center justify-center">
                <Icon className="h-4 w-4 text-accent" strokeWidth={2} />
              </div>

              {/* Metric */}
              <p className="font-serif text-[48px] font-bold leading-none text-accent tracking-tight">{metric}</p>

              {/* Label */}
              <p className="text-[15px] font-semibold text-gray-900 leading-snug pr-8">{label}</p>

              {/* Sub */}
              <p className="text-[12px] font-mono text-gray-400 leading-relaxed">{sub}</p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}

function RelatedSection() {
  return (
    <section className="py-20 px-[5%] border-t border-gray-100" style={{ backgroundColor: "#f5f9fa" }} aria-labelledby="related-h2">
      <div className="max-w-[1200px] mx-auto">
        <motion.div {...fadeUp()} className="text-center mb-10">
          <h2 id="related-h2" className="font-serif text-[28px] font-semibold text-gray-900">Explore other number types</h2>
        </motion.div>
        <ul className="grid grid-cols-1 sm:grid-cols-3 gap-5 list-none p-0 m-0">
          {RELATED.map((card, i) => (
            <motion.li key={card.title} {...fadeUp(i * 0.08)}>
              <motion.a href={card.href}
                whileHover={{ y: -4 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="group block h-full bg-white border border-gray-100 rounded-2xl p-7 hover:border-[#95d9e8]/70 hover:shadow-[0_12px_32px_-12px_rgba(26,188,217,0.2)] transition-colors"
              >
                <h3 className="font-semibold text-[15px] text-gray-900 mb-2 group-hover:text-accent transition-colors">{card.title}</h3>
                <p className="text-[13px] text-gray-500 leading-relaxed mb-4">{card.desc}</p>
                <span aria-hidden="true" className="inline-flex items-center gap-1 text-[13px] font-semibold text-accent font-mono">
                  Learn more <ChevronRight className="h-3.5 w-3.5" />
                </span>
              </motion.a>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  )
}

