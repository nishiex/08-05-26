"use client"

import { useState, useRef, useCallback } from "react"
import {
  ChevronDown, ArrowRight, Globe, MapPin, Sparkles, Briefcase,
  PhoneIncoming, PhoneCall, Network, Headphones, Building2,
  MessageSquare, Megaphone, Code2, Menu, X, Users, Home,
  UserCheck, Building, Cloud, Layers, Plane, GitBranch,
  PhoneForwarded, Mic, Shuffle, Brain, Shield, Heart,
  ShoppingBag, Package, Landmark, LayoutGrid,
  Info, Newspaper, BookOpen, LifeBuoy, FileText, Video,
  Lightbulb, Award,
  Icon,
} from "lucide-react"

type MenuKey = "product" | "solutions" | "resources" | null

/* ─── Product panel data ─────────────────────────────────────── */
const productPillars = [
  { title: "Phone Numbers",    sub: "Virtual, local & vanity numbers",  href: "/phone-numbers" },
  { title: "Voice",            sub: "Call termination & routing",        href: "/voice" },
  { title: "Messaging",        sub: "SMS, bulk & API delivery",          href: "/messaging" },
  { title: "Reports & Logs",   sub: "Dashboards, analytics & audit trail", href: "/reports" },
]

const ucaasCapabilities = [
  { title: "Team Chat",               href: "/features/team-chat" },
  { title: "Video Meetings",          href: "/features/video-meetings" },
  { title: "Toll-Free Numbers",       href: "/phone-numbers/toll-free" },
  { title: "Business Phone Number",   href: "/phone-numbers/business" },
  { title: "Second Phone Number",     href: "/phone-numbers/second-number" },
  { title: "SMS Gateway",             href: "/messaging/sms-gateway" },
  { title: "Bulk SMS",                href: "/messaging/bulk-sms" },
]

const contactCenterAI = [
  { title: "SMS API",                    href: "/messaging/sms-api" },
  { title: "Call Recording",             href: "/features/call-recording" },
  { title: "AI Agent Assist",            href: "/voice/contact-center" },
  { title: "AI Supervisor Tools",        href: "/features/supervisor" },
  { title: "Auto-Attendant & IVR",       href: "/features/auto-attendant" },
  { title: "AI Intelligent Routing",     href: "/features/routing" },
  { title: "Omnichannel Contact Center", href: "/voice/contact-center" },
  { title: "AI Conversation Intelligence",  href: "/features/conv-intelligence" },
]

/* ─── Voice data (kept for mobile) ──────────────────────────── */
const voiceCol1 = [
  { title: "Omnichannel",       Icon: Headphones, href: "/voice/contact-center" },
]
const voiceFeatures = [
  { title: "Auto-Attendant",          Icon: Shuffle, href: "/features/auto-attendant" },
  { title: "Call Recording",          Icon: Mic,     href: "/features/call-recording" },
  { title: "AI Intelligent Routing",   Icon: Brain,   href: "/features/routing" },
  { title: "AI Conversation Intelligence", Icon: Shield, href: "/features/conv-intelligence" },
  { title: "AI Supervisor Tools",      Icon: Users,   href: "/features/supervisor" },
]
const numbersCol1 = [
  { title: "Business Phone Number",Icon: Briefcase,     href: "/phone-numbers/business" },
  { title: "Second Phone Number",  Icon: PhoneIncoming, href: "/phone-numbers/second-number" },
]
const messagingCol1 = [
  { title: "SMS Gateway", Icon: MessageSquare, href: "/messaging/sms-gateway" },
  { title: "Bulk SMS",    Icon: Megaphone,     href: "/messaging/bulk-sms" },
  { title: "SMS API",     Icon: Code2,         href: "/messaging/sms-api" },
]

/* ─── Solutions data ─────────────────────────────────────────── */
const solutionsByIndustry = [
  { title: "Healthcare", Icon: Heart, href: "/solutions/healthcare" },
  { title: "Finance", Icon: Landmark, href: "/solutions/finance" },
  { title: "Retail", Icon: ShoppingBag, href: "/solutions/retail" },
  { title: "Logistics", Icon: Package, href: "/solutions/logistics" },
  { title: "Real Estate", Icon: Home, href: "/solutions/real-estate" },
]
const solutionsByRole = [
  { title: "Sales Teams", Icon: Users, href: "/solutions/sales" },
  { title: "Remote Teams", Icon: UserCheck, href: "/solutions/remote" },
  { title: "SaaS", Icon: Cloud, href: "/solutions/saas" },
]
const integrations = [
  { title: "HubSpot", sub: "Sync calls, SMS & AI transcripts to HubSpot records", href: "/integrations/hubspot" },
  { title: "Zoho CRM", sub: "Auto-log calls & screen-pop across Zoho CRM, Desk & Bigin", href: "/integrations/zoho" },
]

/* ─── Company data (merged into Resources) ───────────────────── */
const companyLinks = [
  { title: "About Us", href: "/company/about" },
  { title: "Press",    href: "/company/press" },
  { title: "Legal",    href: "/company/legal" },
]

/* ─── Resources data ──────────────────────────────────────────── */
const resourcesCol1 = [
  { title: "Documentation", desc: "API references and integration guides.", Icon: BookOpen, href: "/docs" },
  { title: "Blog", desc: "Insights, tips, and product updates.", Icon: Lightbulb, href: "/blog" },
  { title: "Webinars", desc: "Live and on-demand sessions.", Icon: Video, href: "/webinars" },
]
const resourcesCol2 = [
  { title: "Help Center", desc: "FAQs, setup guides, troubleshooting.", Icon: LifeBuoy, href: "/support" },
  { title: "Case Studies", desc: "Real results from real customers.", Icon: Layers, href: "/case-studies" },
  { title: "Changelog", desc: "What\'s new in every release.", Icon: GitBranch, href: "/changelog" },
]

/* ─── Helpers ─────────────────────────────────────────────────── */
function Chevron({ open }: { open: boolean }) {
  return (
    <ChevronDown
      className={`h-3.5 w-3.5 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
      strokeWidth={2.2}
    />
  )
}

function ColHeading({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[10px] font-mono font-medium tracking-[1.4px] uppercase text-gray-400 mb-3">
      {children}
    </p>
  )
}

function FeaturedCard({ headline, sub }: { headline: string; sub: string }) {
  return (
    <div className="rounded-2xl bg-[#F5F5F5] p-5 flex flex-col justify-between h-full min-h-[180px]">
      <div>
        <p className="text-[11px] font-mono font-medium tracking-[1.2px] uppercase text-[#1abcd9] mb-3">Featured</p>
        <p className="text-[15px] font-medium text-black leading-snug mb-2">{headline}</p>
        <p className="text-[13px] text-gray-500 leading-relaxed">{sub}</p>
      </div>
      <a
        href="/pricing"
        className="mt-4 inline-flex items-center gap-1.5 bg-[#1abcd9] text-white text-[13px] font-medium font-mono px-4 py-2 rounded-full hover:bg-[#1797ac] transition-colors self-start"
      >
        Start Free Trial
        <ArrowRight className="h-3.5 w-3.5" strokeWidth={2.2} />
      </a>
    </div>
  )
}

function LinkRow({
  title, desc, Icon, href, close,
}: { title: string; desc?: string; Icon: React.ElementType; href: string; close: () => void }) {
  return (
    <a
      href={href}
      onClick={close}
      className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-slate-50 transition-colors group"
    >
      <span className="mt-0.5 w-9 h-9 rounded-full bg-[#e0f7fa] text-[#1abcd9] grid place-items-center flex-shrink-0 group-hover:bg-[#95d9e8]/30 transition-colors">
        <Icon className="h-3.5 w-3.5" strokeWidth={1.8} />
      </span>
      <span>
        <span className="block text-[13px] font-medium text-black leading-tight">{title}</span>
        {desc && <span className="block text-[11px] text-gray-500 mt-0.5 leading-relaxed">{desc}</span>}
      </span>
    </a>
  )
}

function SmallLinkRow({
  title, Icon, href, close,
}: { title: string; Icon: React.ElementType; href: string; close: () => void }) {
  return (
    <a
      href={href}
      onClick={close}
      className="flex items-center gap-2.5 px-2.5 py-2 rounded-xl hover:bg-slate-50 transition-colors text-[13px] font-medium text-gray-700 hover:text-black group"
    >
      <span className="w-6 h-6 rounded-md bg-slate-100 text-gray-500 grid place-items-center flex-shrink-0 group-hover:bg-[#e0f7fa] group-hover:text-[#1abcd9] transition-colors">
        <Icon className="h-3 w-3" strokeWidth={1.8} />
      </span>
      {title}
    </a>
  )
}

/* ─── Product panel ───────────────────────────────────────────── */
function ProductPanel({ close }: { close: () => void }) {
  return (
    <div className="max-w-[1280px] mx-auto px-[5%] py-8 grid gap-0 divide-x divide-gray-200" style={{ gridTemplateColumns: "1fr 1.1fr 1.3fr 1fr" }}>

      {/* Col 1 — Product Pillars */}
      <div className="pr-8">
        <ColHeading>Product Pillars</ColHeading>
        <ul className="space-y-1">
          {productPillars.map(({ title, sub, href }) => (
            <li key={title}>
              <a
                href={href}
                onClick={close}
                className="block px-3 py-2.5 rounded-xl hover:bg-slate-50 transition-colors group"
              >
                <span className="block text-[14px] font-medium text-gray-900 group-hover:text-[#1abcd9] transition-colors leading-tight">{title}</span>
                <span className="block text-[12px] text-gray-400 mt-0.5 leading-snug">{sub}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* Col 2 — UCaaS Capabilities */}
      <div className="px-8">
        <ColHeading>UCaaS Capabilities</ColHeading>
        <ul className="space-y-0.5">
          {ucaasCapabilities.map(({ title, href }) => (
            <li key={title}>
              <a
                href={href}
                onClick={close}
                className="block px-2 py-1.5 text-[14px] text-gray-700 hover:text-[#1abcd9] hover:bg-slate-50 rounded-lg transition-colors leading-snug"
              >
                {title}
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* Col 3 — Contact Center & AI */}
      <div className="px-8">
        <ColHeading>Contact Center &amp; AI</ColHeading>
        <ul className="space-y-0.5">
          {contactCenterAI.map(({ title, href }) => (
            <li key={title}>
              <a
                href={href}
                onClick={close}
                className="block px-2 py-1.5 text-[14px] text-gray-700 hover:text-[#1abcd9] hover:bg-slate-50 rounded-lg transition-colors whitespace-nowrap"
              >
                {title}
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* Col 4 — Promo */}
      <div className="pl-8 flex flex-col justify-between">
        <div>
          <p className="text-[18px] font-medium text-gray-900 leading-snug mb-3">
            One platform.<br />Every conversation.
          </p>
          <p className="text-[13px] text-gray-500 leading-relaxed">
            Cloud phone, AI contact center, SMS, and wholesale voice — all on one platform with 99.99% uptime, carrier-grade infrastructure, and 500+ active partners.
          </p>
        </div>
        <a
          href="/contact"
          onClick={close}
          className="mt-6 inline-flex items-center gap-1.5 bg-[#1abcd9] text-white text-[14px] font-medium font-sans px-5 py-2.5 rounded-full hover:bg-[#1797ac] transition-colors self-start"
        >
          Get A Free Trial
          <ArrowRight className="h-4 w-4" strokeWidth={2} />
        </a>
      </div>

    </div>
  )
}

/* ─── Plain link helper (shared by Solutions + Resources) ────── */
function PlainLink({ title, href, close }: { title: string; href: string; close: () => void }) {
  return (
    <a
      href={href}
      onClick={close}
      className="block px-2 py-1.5 text-[14px] text-gray-700 hover:text-[#1abcd9] hover:bg-slate-50 rounded-lg transition-colors whitespace-nowrap"
    >
      {title}
    </a>
  )
}

/* ─── Solutions panel ─────────────────────────────────────────── */
function SolutionsPanel({ close }: { close: () => void }) {
  return (
    <div className="max-w-[1280px] mx-auto px-[5%] py-8 grid gap-0 divide-x divide-gray-200" style={{ gridTemplateColumns: "1fr 1fr 1fr 1fr" }}>

      {/* Col 1 — By Industry */}
      <div className="pr-8">
        <ColHeading>By Industry</ColHeading>
        <ul className="space-y-0.5">
          {solutionsByIndustry.map(({ title, href }) => (
            <li key={title}><PlainLink title={title} href={href} close={close} /></li>
          ))}
        </ul>
      </div>

      {/* Col 2 — By Role */}
      <div className="px-8">
        <ColHeading>By Role</ColHeading>
        <ul className="space-y-0.5">
          {solutionsByRole.map(({ title, href }) => (
            <li key={title}><PlainLink title={title} href={href} close={close} /></li>
          ))}
        </ul>
      </div>

      {/* Col 3 — Integrations */}
      <div className="px-8">
        <ColHeading>Integrations</ColHeading>
        <ul className="space-y-2">
          {integrations.map(({ title, sub, href }) => (
            <li key={title}>
              <a
                href={href}
                onClick={close}
                className="block px-2 py-2 rounded-lg hover:bg-slate-50 transition-colors group"
              >
                <span className="block text-[14px] font-medium text-gray-900 group-hover:text-[#1abcd9] transition-colors leading-tight whitespace-nowrap">{title}</span>
                <span className="block text-[12px] text-gray-400 mt-0.5 leading-snug">{sub}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* Col 4 — Promo */}
      <div className="pl-8 flex flex-col justify-between">
        <div>
          <p className="text-[18px] font-medium text-gray-900 leading-snug mb-3">
            Built for every team,<br />every industry.
          </p>
          <p className="text-[13px] text-gray-500 leading-relaxed">
            Sales, remote, healthcare, finance — Twiching adapts to how your team works, wherever they are.
          </p>
        </div>
        <a href="/contact" onClick={close}
          className="mt-6 inline-flex items-center gap-1.5 bg-[#1abcd9] text-white text-[14px] font-medium font-sans px-5 py-2.5 rounded-full hover:bg-[#1797ac] transition-colors self-start">
          Get A Free Trial
          <ArrowRight className="h-4 w-4" strokeWidth={2} />
        </a>
      </div>
    </div>
  )
}

/* ─── Resources panel ─────────────────────────────────────────── */
function ResourcesPanel({ close }: { close: () => void }) {
  return (
    <div className="max-w-[1280px] mx-auto px-[5%] py-8 grid gap-0 divide-x divide-gray-200" style={{ gridTemplateColumns: "1fr 1fr 1fr 1fr" }}>

      {/* Col 1 — Learn */}
      <div className="pr-8">
        <ColHeading>Learn</ColHeading>
        <ul className="space-y-0.5">
          {resourcesCol1.map(({ title, href }) => (
            <li key={title}><PlainLink title={title} href={href} close={close} /></li>
          ))}
        </ul>
      </div>

      {/* Col 2 — Support */}
      <div className="px-8">
        <ColHeading>Support</ColHeading>
        <ul className="space-y-0.5">
          {resourcesCol2.map(({ title, href }) => (
            <li key={title}><PlainLink title={title} href={href} close={close} /></li>
          ))}
        </ul>
      </div>

      {/* Col 3 — Company */}
      <div className="px-8">
        <ColHeading>Company</ColHeading>
        <ul className="space-y-0.5">
          {companyLinks.map(({ title, href }) => (
            <li key={title}><PlainLink title={title} href={href} close={close} /></li>
          ))}
        </ul>
      </div>

      {/* Col 4 — Promo */}
      <div className="pl-8 flex flex-col justify-between">
        <div>
          <p className="text-[18px] font-medium text-gray-900 leading-snug mb-3">
            Everything you need<br />to get started.
          </p>
          <p className="text-[13px] text-gray-500 leading-relaxed">
            Docs, guides, case studies, and expert support — all in one place.
          </p>
        </div>
        <a href="/contact" onClick={close}
          className="mt-6 inline-flex items-center gap-1.5 bg-[#1abcd9] text-white text-[14px] font-medium font-sans px-5 py-2.5 rounded-full hover:bg-[#1797ac] transition-colors self-start">
          Get A Free Trial
          <ArrowRight className="h-4 w-4" strokeWidth={2} />
        </a>
      </div>
    </div>
  )
}

/* ─── Main component ──────────────────────────────────────────── */
export function MegaNav() {
  const [open, setOpen] = useState<MenuKey>(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [mobileSection, setMobileSection] = useState<MenuKey>(null)
  const leaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const handleMouseEnter = useCallback((key: MenuKey) => {
    if (leaveTimer.current) clearTimeout(leaveTimer.current)
    setOpen(key)
  }, [])

  const handleMouseLeave = useCallback(() => {
    leaveTimer.current = setTimeout(() => setOpen(null), 150)
  }, [])

  const close = useCallback(() => setOpen(null), [])

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[100] focus:bg-white focus:px-4 focus:py-2 focus:rounded focus:outline-[2px] focus:outline-[#1abcd9] focus:outline-offset-2 text-sm font-medium"
      >
        Skip to content
      </a>

      <header
        className="sticky top-0 z-30 bg-white/10 backdrop-blur-md border-b border-white/10"
        onMouseLeave={handleMouseLeave}
      >
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-[5%] h-16 flex items-center justify-between gap-6">

          {/* Logo */}
          <a href="/" className="flex items-center flex-shrink-0" aria-label="Twiching home">
            <img
              src="/twiching-logo.png"
              alt="Twiching General Trading"
              width={160}
              height={60}
              className="h-14 sm:h-12 w-auto object-contain"
            />
          </a>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-0.5" aria-label="Main navigation">
            {/* Product */}
            <button
              onMouseEnter={() => handleMouseEnter("product")}
              onClick={() => setOpen(open === "product" ? null : "product")}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setOpen(open === "product" ? null : "product") }
                if (e.key === "Escape") setOpen(null)
              }}
              aria-expanded={open === "product"}
              aria-haspopup="true"
              className={`flex items-center gap-1 px-3.5 py-2 rounded-full text-[14px] font-sans font-medium transition-colors ${open === "product" ? "bg-slate-100 text-black" : "text-gray-600 hover:text-black hover:bg-slate-50"
                }`}
            >
              Product
              <Chevron open={open === "product"} />
            </button>

            {/* Solutions */}
            <button
              onMouseEnter={() => handleMouseEnter("solutions")}
              onClick={() => setOpen(open === "solutions" ? null : "solutions")}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setOpen(open === "solutions" ? null : "solutions") }
                if (e.key === "Escape") setOpen(null)
              }}
              aria-expanded={open === "solutions"}
              aria-haspopup="true"
              className={`flex items-center gap-1 px-3.5 py-2 rounded-full text-[14px] font-sans font-medium transition-colors ${open === "solutions" ? "bg-slate-100 text-black" : "text-gray-600 hover:text-black hover:bg-slate-50"
                }`}
            >
              Solutions
              <Chevron open={open === "solutions"} />
            </button>

            {/* Resources */}
            <button
              onMouseEnter={() => handleMouseEnter("resources")}
              onClick={() => setOpen(open === "resources" ? null : "resources")}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setOpen(open === "resources" ? null : "resources") }
                if (e.key === "Escape") setOpen(null)
              }}
              aria-expanded={open === "resources"}
              aria-haspopup="true"
              className={`flex items-center gap-1 px-3.5 py-2 rounded-full text-[14px] font-sans font-medium transition-colors ${open === "resources" ? "bg-slate-100 text-black" : "text-gray-600 hover:text-black hover:bg-slate-50"
                }`}
            >
              Resources
              <Chevron open={open === "resources"} />
            </button>

            {/* Pricing and plan */}
            <a
              href="/pricing"
              className="px-3.5 py-2 text-[14px] font-sans font-medium text-gray-600 hover:text-black hover:bg-slate-50 rounded-full transition-colors"
            >
              Pricing
            </a>
          </nav>

          {/* Desktop right CTAs */}
          <div className="hidden lg:flex items-center gap-2 flex-shrink-0">
            <a
              href="#"
              className="text-[14px] font-sans font-medium text-gray-600 hover:text-black px-3 py-2"
            >
              Sign In
            </a>
            <a
              href="/pricing"
              className="inline-flex items-center gap-1.5 bg-[#1abcd9] text-white text-[14px] font-medium font-sans px-5 py-2 rounded-full hover:bg-[#1797ac] transition-colors"
            >
              Start Free Trial
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            className="lg:hidden p-2 text-gray-700 rounded-lg hover:bg-slate-50 transition-colors"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            onClick={() => { setMobileOpen(!mobileOpen); setMobileSection(null) }}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {/* Desktop mega panel */}
        {open && (
          <div
            className="hidden lg:block absolute left-0 right-0 top-full bg-white border-b border-[#E5E5E5] shadow-sm"
            onMouseEnter={() => handleMouseEnter(open)}
          >
            {open === "product" && <ProductPanel close={close} />}
            {open === "solutions" && <SolutionsPanel close={close} />}
            {open === "resources" && <ResourcesPanel close={close} />}
          </div>
        )}
      </header>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 z-40 bg-white overflow-y-auto"
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
        >
          <div className="flex items-center justify-between px-4 h-14 border-b border-[#E5E5E5]">
            <a href="/" aria-label="Twiching home" onClick={() => setMobileOpen(false)}>
              <img
                src="https://www.twiching.ai/wp-content/uploads/2023/07/White-new-logo.png"
                alt="Twiching"
                width={120}
                height={32}
                className="h-7 w-auto object-contain"
              />
            </a>
            <button onClick={() => setMobileOpen(false)} aria-label="Close menu" className="p-2 rounded-lg hover:bg-slate-50 text-gray-700">
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="px-4 pt-4 pb-32 space-y-1 text-sm">
            {/* Product */}
            <div>
              <button
                onClick={() => setMobileSection(mobileSection === "product" ? null : "product")}
                className="w-full flex items-center justify-between h-14 px-3 rounded-xl text-gray-800 font-medium text-[15px] hover:bg-slate-50 transition-colors"
              >
                Product
                <Chevron open={mobileSection === "product"} />
              </button>
              {mobileSection === "product" && (
                <div className="ml-2 mb-2 space-y-1">
                  <p className="text-[10px] font-mono font-medium tracking-[1.2px] uppercase text-gray-400 px-3 pt-1 pb-1">Phone Numbers</p>
                  {numbersCol1.map(({ title, Icon, href }) => (
                    <a key={title} href={href} onClick={() => setMobileOpen(false)}
                      className="flex items-center gap-3 px-3 h-12 rounded-xl hover:bg-slate-50 transition-colors text-[14px] font-medium text-gray-700">
                      <span className="w-7 h-7 rounded-lg bg-[#e0f7fa] text-[#1abcd9] grid place-items-center flex-shrink-0">
                        <Icon className="h-3.5 w-3.5" strokeWidth={1.8} />
                      </span>
                      {title}
                    </a>
                  ))}
                  <p className="text-[10px] font-mono font-medium tracking-[1.2px] uppercase text-gray-400 px-3 pt-3 pb-1">Voice</p>
                  {voiceCol1.map(({ title, Icon, href }) => (
                    <a key={title} href={href} onClick={() => setMobileOpen(false)}
                      className="flex items-center gap-3 px-3 h-12 rounded-xl hover:bg-slate-50 transition-colors text-[14px] font-medium text-gray-700">
                      <span className="w-7 h-7 rounded-lg bg-[#e0f7fa] text-[#1abcd9] grid place-items-center flex-shrink-0">
                        <Icon className="h-3.5 w-3.5" strokeWidth={1.8} />
                      </span>
                      {title}
                    </a>
                  ))}
                  <p className="text-[10px] font-mono font-medium tracking-[1.2px] uppercase text-gray-400 px-3 pt-3 pb-1">Messaging</p>
                  {messagingCol1.map(({ title, Icon, href }) => (
                    <a key={title} href={href} onClick={() => setMobileOpen(false)}
                      className="flex items-center gap-3 px-3 h-12 rounded-xl hover:bg-slate-50 transition-colors text-[14px] font-medium text-gray-700">
                      <span className="w-7 h-7 rounded-lg bg-[#e0f7fa] text-[#1abcd9] grid place-items-center flex-shrink-0">
                        <Icon className="h-3.5 w-3.5" strokeWidth={1.8} />
                      </span>
                      {title}
                    </a>
                  ))}
                  <p className="text-[10px] font-mono font-medium tracking-[1.2px] uppercase text-gray-400 px-3 pt-3 pb-1">Call Features</p>
                  {voiceFeatures.map(({ title, Icon, href }) => (
                    <a key={title} href={href} onClick={() => setMobileOpen(false)}
                      className="flex items-center gap-3 px-3 h-12 rounded-xl hover:bg-slate-50 transition-colors text-[14px] font-medium text-gray-700">
                      <span className="w-7 h-7 rounded-lg bg-[#e0f7fa] text-[#1abcd9] grid place-items-center flex-shrink-0">
                        <Icon className="h-3.5 w-3.5" strokeWidth={1.8} />
                      </span>
                      {title}
                    </a>
                  ))}
                </div>
              )}
            </div>

            {/* Solutions */}
            <div>
              <button
                onClick={() => setMobileSection(mobileSection === "solutions" ? null : "solutions")}
                className="w-full flex items-center justify-between h-14 px-3 rounded-xl text-gray-800 font-medium text-[15px] hover:bg-slate-50 transition-colors"
              >
                Solutions
                <Chevron open={mobileSection === "solutions"} />
              </button>
              {mobileSection === "solutions" && (
                <div className="ml-2 mb-2 space-y-1">
                  <p className="text-[10px] font-mono font-medium tracking-[1.2px] uppercase text-gray-400 px-3 pt-1 pb-1">By Industry</p>
                  {solutionsByIndustry.map(({ title, Icon, href }) => (
                    <a key={title} href={href} onClick={() => setMobileOpen(false)}
                      className="flex items-center gap-3 px-3 h-12 rounded-xl hover:bg-slate-50 transition-colors text-[14px] font-medium text-gray-700">
                      <span className="w-7 h-7 rounded-lg bg-slate-100 text-gray-500 grid place-items-center flex-shrink-0">
                        <Icon className="h-3 w-3" strokeWidth={1.8} />
                      </span>
                      {title}
                    </a>
                  ))}
                  <p className="text-[10px] font-mono font-medium tracking-[1.2px] uppercase text-gray-400 px-3 pt-3 pb-1">By Role</p>
                  {solutionsByRole.map(({ title, Icon, href }) => (
                    <a key={title} href={href} onClick={() => setMobileOpen(false)}
                      className="flex items-center gap-3 px-3 h-12 rounded-xl hover:bg-slate-50 transition-colors text-[14px] font-medium text-gray-700">
                      <span className="w-7 h-7 rounded-lg bg-slate-100 text-gray-500 grid place-items-center flex-shrink-0">
                        <Icon className="h-3 w-3" strokeWidth={1.8} />
                      </span>
                      {title}
                    </a>
                  ))}
                  <p className="text-[10px] font-mono font-medium tracking-[1.2px] uppercase text-gray-400 px-3 pt-3 pb-1">Integrations</p>
                  {integrations.map(({ title, href }) => (
                    <a key={title} href={href} onClick={() => setMobileOpen(false)}
                      className="flex flex-col justify-center px-3 h-12 rounded-xl hover:bg-slate-50 transition-colors text-[14px] font-medium text-gray-700">
                      {title}
                    </a>
                  ))}
                </div>
              )}
            </div>

            {/* Resources */}
            <div>
              <button
                onClick={() => setMobileSection(mobileSection === "resources" ? null : "resources")}
                className="w-full flex items-center justify-between h-14 px-3 rounded-xl text-gray-800 font-medium text-[15px] hover:bg-slate-50 transition-colors"
              >
                Resources
                <Chevron open={mobileSection === "resources"} />
              </button>
              {mobileSection === "resources" && (
                <div className="ml-2 mb-2 space-y-1">
                  <p className="text-[10px] font-mono font-medium tracking-[1.2px] uppercase text-gray-400 px-3 pt-1 pb-1">Learn</p>
                  {resourcesCol1.map(({ title, Icon, href }) => (
                    <a key={title} href={href} onClick={() => setMobileOpen(false)}
                      className="flex items-center gap-3 px-3 h-12 rounded-xl hover:bg-slate-50 transition-colors text-[14px] font-medium text-gray-700">
                      <span className="w-7 h-7 rounded-lg bg-[#e0f7fa] text-[#1abcd9] grid place-items-center flex-shrink-0">
                        <Icon className="h-3.5 w-3.5" strokeWidth={1.8} />
                      </span>
                      {title}
                    </a>
                  ))}
                  <p className="text-[10px] font-mono font-medium tracking-[1.2px] uppercase text-gray-400 px-3 pt-3 pb-1">Support</p>
                  {resourcesCol2.map(({ title, Icon, href }) => (
                    <a key={title} href={href} onClick={() => setMobileOpen(false)}
                      className="flex items-center gap-3 px-3 h-12 rounded-xl hover:bg-slate-50 transition-colors text-[14px] font-medium text-gray-700">
                      <span className="w-7 h-7 rounded-lg bg-[#e0f7fa] text-[#1abcd9] grid place-items-center flex-shrink-0">
                        <Icon className="h-3.5 w-3.5" strokeWidth={1.8} />
                      </span>
                      {title}
                    </a>
                  ))}
                  <p className="text-[10px] font-mono font-medium tracking-[1.2px] uppercase text-gray-400 px-3 pt-3 pb-1">Company</p>
                  {companyLinks.map(({ title, href }) => (
                    <a key={title} href={href} onClick={() => setMobileOpen(false)}
                      className="flex items-center px-3 h-12 rounded-xl hover:bg-slate-50 transition-colors text-[14px] font-medium text-gray-700">
                      {title}
                    </a>
                  ))}
                </div>
              )}
            </div>

            {/* Pricing and plan */}
            <a
              href="/pricing"
              onClick={() => setMobileOpen(false)}
              className="flex items-center h-14 px-3 rounded-xl text-gray-800 font-medium text-[15px] hover:bg-slate-50 transition-colors"
            >
              Pricing and plan
            </a>
          </div>

          {/* Pinned bottom CTAs */}
          <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-[#E5E5E5] px-4 py-4 flex flex-col gap-2">
            <a
              href="#"
              className="block text-center py-3 text-[15px] font-medium text-gray-600 border border-gray-200 rounded-full hover:bg-slate-50 transition-colors"
            >
              Sign In
            </a>
            <a
              href="#"
              className="block text-center py-3 text-[15px] font-medium text-white bg-[#1abcd9] rounded-full hover:bg-[#1797ac] transition-colors"
            >
              Start Free Trial
            </a>
          </div>
        </div>
      )}
    </>
  )
}
