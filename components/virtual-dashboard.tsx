"use client"

import { useEffect, useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import gsap from "gsap"
import {
  AreaChart, Area, ResponsiveContainer,
  XAxis, YAxis, Tooltip, CartesianGrid,
} from "recharts"
import {
  Phone, PhoneCall, TrendingUp, ShieldCheck,
  Globe, Signal, MoreHorizontal, ArrowUpRight,
  PhoneMissed, Voicemail, CheckCircle2,
} from "lucide-react"

/* ─── Data ───────────────────────────────────────────────────── */
const CALL_VOLUME = [
  { time: "6am",  calls: 28,  success: 24 },
  { time: "8am",  calls: 72,  success: 64 },
  { time: "10am", calls: 148, success: 131 },
  { time: "12pm", calls: 176, success: 159 },
  { time: "2pm",  calls: 203, success: 185 },
  { time: "4pm",  calls: 189, success: 173 },
  { time: "6pm",  calls: 134, success: 121 },
  { time: "8pm",  calls: 87,  success: 80  },
  { time: "Now",  calls: 71,  success: 66  },
]

const KPI = [
  { label: "Total Numbers", raw: 1284,  display: "1,284",  delta: "+14 this week",    Icon: Globe,       accent: "#1abcd9", bg: "#e0f7fa" },
  { label: "Active Calls",  raw: 47,    display: "47",     delta: "live right now",   Icon: PhoneCall,   accent: "#0891b2", bg: "#ecfeff" },
  { label: "Success Rate",  raw: 914,   display: "91.4%",  delta: "+2.1% vs last wk", Icon: TrendingUp,  accent: "#059669", bg: "#f0fdf4" },
  { label: "Uptime SLA",   raw: 9999,  display: "99.99%", delta: "30-day average",   Icon: ShieldCheck, accent: "#7c3aed", bg: "#f5f3ff" },
]

const NUMBERS = [
  { number: "+1 (212) 555-0193", label: "NYC Sales",      region: "NY", status: "active", calls: 84 },
  { number: "+1 (312) 555-0184", label: "Chicago HQ",     region: "IL", status: "active", calls: 61 },
  { number: "+1 (415) 555-0271", label: "SF Engineering",  region: "CA", status: "active", calls: 57 },
  { number: "+1 (305) 555-0247", label: "Miami Office",    region: "FL", status: "idle",   calls: 12 },
  { number: "+1 (720) 555-0388", label: "Denver Remote",   region: "CO", status: "idle",   calls: 9  },
]

const CHANNELS = [
  { label: "Voice (SIP)",  pct: 74, accent: "#1abcd9" },
  { label: "VoIP Direct",  pct: 58, accent: "#0891b2" },
  { label: "SMS",          pct: 41, accent: "#059669" },
  { label: "Call Forward", pct: 23, accent: "#7c3aed" },
]

const RECENT = [
  { from: "+1 (646) 555-0119", to: "NYC Main",      dur: "8m 54s", status: "connected" },
  { from: "+1 (214) 555-0193", to: "Dallas Virtual", dur: "4m 22s", status: "connected" },
  { from: "+1 (415) 555-0271", to: "SF Business",   dur: "—",      status: "missed"    },
  { from: "+1 (305) 555-0247", to: "Miami Office",  dur: "—",      status: "voicemail" },
]

/* ─── Helpers ────────────────────────────────────────────────── */
const STATUS_CFG = {
  connected: { color: "#059669", bg: "#f0fdf4", border: "#bbf7d0", Icon: CheckCircle2, label: "Connected" },
  missed:    { color: "#dc2626", bg: "#fef2f2", border: "#fecaca", Icon: PhoneMissed,  label: "Missed"    },
  voicemail: { color: "#d97706", bg: "#fffbeb", border: "#fde68a", Icon: Voicemail,    label: "Voicemail" },
} as const

function StatusPill({ status }: { status: keyof typeof STATUS_CFG }) {
  const cfg = STATUS_CFG[status]
  return (
    <span
      className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold"
      style={{ color: cfg.color, background: cfg.bg, border: `1px solid ${cfg.border}` }}
    >
      {cfg.label}
    </span>
  )
}

/* ─── Tab bar ────────────────────────────────────────────────── */
function TabBar({
  tabs,
  active,
  onSelect,
}: {
  tabs: string[]
  active: number
  onSelect: (i: number) => void
}) {
  return (
    <div
      className="flex items-center gap-px px-4 pt-3 pb-0"
      style={{ borderBottom: "1px solid #e2e8f0" }}
      role="tablist"
    >
      {tabs.map((tab, i) => (
        <button
          key={tab}
          role="tab"
          aria-selected={active === i}
          onClick={() => onSelect(i)}
          className="relative px-3 py-2 text-[11px] font-semibold rounded-t-lg transition-colors cursor-pointer"
          style={{
            color:      active === i ? "#1abcd9" : "#94a3b8",
            background: active === i ? "#e0f7fa" : "transparent",
          }}
        >
          {tab}
          {active === i && (
            <motion.div
              layoutId={`tab-indicator-${tabs.join("-")}`}
              className="absolute bottom-0 left-0 right-0 h-0.5 rounded-t"
              style={{ background: "#1abcd9" }}
              transition={{ type: "spring", stiffness: 380, damping: 30 }}
            />
          )}
        </button>
      ))}
    </div>
  )
}

/* ─── Custom chart tooltip ───────────────────────────────────── */
function ChartTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null
  return (
    <div className="rounded-xl border border-slate-200 bg-white shadow-xl p-3" style={{ fontSize: 11 }}>
      <p className="font-semibold text-slate-700 mb-1.5">{label}</p>
      {payload.map((p: any) => (
        <div key={p.dataKey} className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full" style={{ background: p.color }} />
          <span className="text-slate-500 capitalize">{p.dataKey}:</span>
          <span className="font-semibold text-slate-800">{p.value}</span>
        </div>
      ))}
    </div>
  )
}

/* ─── Panel fade animation ───────────────────────────────────── */
const panelVariants = {
  enter: { opacity: 0, y: 6 },
  show:  { opacity: 1, y: 0, transition: { duration: 0.2, ease: "easeOut" } },
  exit:  { opacity: 0, y: -4, transition: { duration: 0.12, ease: "easeIn" } },
}

/* ─── Main component ─────────────────────────────────────────── */
export function VirtualDashboard() {
  const containerRef = useRef<HTMLDivElement>(null)
  const kpiRefs      = useRef<(HTMLDivElement | null)[]>([])
  const barRefs      = useRef<(HTMLDivElement | null)[]>([])
  const pulseRef     = useRef<HTMLSpanElement>(null)
  const headerRef    = useRef<HTMLDivElement>(null)
  const bodyRef      = useRef<HTMLDivElement>(null)

  const [counters, setCounters]   = useState({ numbers: 0, calls: 0, success: 0, uptime: 0 })
  const [leftTab,  setLeftTab]    = useState(0)   // 0 = Call Volume, 1 = Recent Calls
  const [rightTab, setRightTab]   = useState(0)   // 0 = Numbers,     1 = Channels
  const [period,   setPeriod]     = useState(0)   // 0 = 1D, 1 = 7D, 2 = 30D

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set([headerRef.current, bodyRef.current], { opacity: 0, y: 16 })
      gsap.set(kpiRefs.current, { opacity: 0, y: 12 })

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } })
      tl.to(headerRef.current, { opacity: 1, y: 0, duration: 0.4 })
        .to(kpiRefs.current,   { opacity: 1, y: 0, stagger: 0.07, duration: 0.45 }, "-=0.15")
        .to(bodyRef.current,   { opacity: 1, y: 0, duration: 0.45 }, "-=0.3")

      tl.call(() => {
        // Animate bars (right tab 1 — deferred, will re-run on tab switch too)
        animateBars()
        // Count-up
        const targets = [1284, 47, 914, 9999]
        const keys: (keyof typeof counters)[] = ["numbers", "calls", "success", "uptime"]
        keys.forEach((k, i) => {
          const obj = { val: 0 }
          gsap.to(obj, {
            val: targets[i], duration: 1.1, ease: "power2.out",
            onUpdate: () => setCounters(prev => ({ ...prev, [k]: Math.round(obj.val) })),
          })
        })
      }, [], "-=0.3")

      if (pulseRef.current) {
        gsap.to(pulseRef.current, { scale: 2.2, opacity: 0, duration: 1.2, repeat: -1, ease: "power1.out" })
      }
    }, containerRef)
    return () => ctx.revert()
  }, [])

  // Re-animate bars whenever Channels tab is opened
  function animateBars() {
    CHANNELS.forEach((ch, i) => {
      const el = barRefs.current[i]
      if (el) gsap.fromTo(el, { width: "0%" }, { width: `${ch.pct}%`, duration: 0.9, ease: "power2.out", delay: i * 0.07 })
    })
  }

  function handleRightTab(i: number) {
    setRightTab(i)
    if (i === 1) setTimeout(animateBars, 40)
  }

  const fmtCounter = (k: keyof typeof counters) => {
    if (k === "numbers") return counters.numbers.toLocaleString()
    if (k === "calls")   return String(counters.calls)
    if (k === "success") return `${(counters.success / 10).toFixed(1)}%`
    return `${(counters.uptime / 100).toFixed(2)}%`
  }

  const cardLift = {
    rest:  { y: 0,  boxShadow: "0 1px 2px rgba(0,0,0,0.05), 0 0 0 1px rgba(0,0,0,0.04)" },
    hover: { y: -2, boxShadow: "0 6px 20px rgba(0,0,0,0.09), 0 0 0 1px rgba(0,0,0,0.05)", transition: { type: "spring" as const, stiffness: 300, damping: 22 } },
  }

  return (
    <div
      ref={containerRef}
      className="w-full select-none overflow-hidden rounded-2xl"
      style={{
        background:  "#f8fafc",
        border:      "1px solid #e2e8f0",
        boxShadow:   "0 4px 6px -1px rgba(0,0,0,0.07), 0 2px 4px -2px rgba(0,0,0,0.05)",
        fontFamily:  "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
        fontSize:    13,
        color:       "#0f172a",
      }}
    >
      {/* ── Chrome bar ────────────────────────────────────────── */}
      <div
        ref={headerRef}
        className="flex items-center justify-between px-5 py-3"
        style={{ background: "#ffffff", borderBottom: "1px solid #e2e8f0" }}
      >
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5" aria-hidden="true">
            <span className="w-3 h-3 rounded-full" style={{ background: "#ff5f57" }} />
            <span className="w-3 h-3 rounded-full" style={{ background: "#febc2e" }} />
            <span className="w-3 h-3 rounded-full" style={{ background: "#28c840" }} />
          </div>
          <div className="h-4 w-px bg-slate-200" aria-hidden="true" />
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md flex items-center justify-center" style={{ background: "#1abcd9" }}>
              <Phone size={11} color="white" strokeWidth={2.2} />
            </div>
            <span className="text-[12px] font-semibold text-slate-700">Number Analytics</span>
            <span className="text-slate-300 text-[10px]">/</span>
            <span className="text-[11px] text-slate-400">Virtual</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Live indicator */}
          <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full"
            style={{ background: "#f0fdf4", border: "1px solid #bbf7d0" }}>
            <span className="relative flex h-1.5 w-1.5">
              <span ref={pulseRef} className="absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-70" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
            </span>
            <span className="text-[9px] font-bold tracking-wide text-emerald-700">LIVE</span>
          </span>

          {/* Period selector */}
          <div className="flex items-center gap-px rounded-lg overflow-hidden" style={{ border: "1px solid #e2e8f0" }}
            role="group" aria-label="Time period">
            {["1D", "7D", "30D"].map((p, i) => (
              <button
                key={p}
                onClick={() => setPeriod(i)}
                className="px-2.5 py-1 text-[10px] font-semibold transition-colors cursor-pointer"
                aria-pressed={period === i}
                style={{
                  background:  period === i ? "#1abcd9" : "#ffffff",
                  color:       period === i ? "#ffffff"  : "#64748b",
                  borderRight: i < 2 ? "1px solid #e2e8f0" : "none",
                }}
              >
                {p}
              </button>
            ))}
          </div>

          <button
            className="w-7 h-7 rounded-lg flex items-center justify-center cursor-pointer transition-colors hover:bg-slate-100"
            style={{ border: "1px solid #e2e8f0", background: "#ffffff" }}
            aria-label="More options"
          >
            <MoreHorizontal size={13} color="#94a3b8" />
          </button>
        </div>
      </div>

      {/* ── KPI row ───────────────────────────────────────────── */}
      <div
        className="grid grid-cols-2 sm:grid-cols-4 gap-px"
        style={{ background: "#e2e8f0", borderBottom: "1px solid #e2e8f0" }}
      >
        {KPI.map(({ label, Icon, accent, bg, delta }, i) => (
          <motion.div
            key={label}
            ref={el => { kpiRefs.current[i] = el }}
            initial="rest" whileHover="hover" variants={cardLift}
            className="flex items-center gap-3 px-4 py-3 cursor-default"
            style={{ background: "#ffffff" }}
          >
            <div
              className="w-7 h-7 rounded-lg flex-shrink-0 flex items-center justify-center"
              style={{ background: bg }}
            >
              <Icon size={13} color={accent} strokeWidth={2} />
            </div>
            <div className="min-w-0">
              <div
                className="text-[17px] font-bold text-slate-900 leading-none mb-0.5"
                style={{ fontVariantNumeric: "tabular-nums" }}
              >
                {fmtCounter(["numbers", "calls", "success", "uptime"][i] as keyof typeof counters)}
              </div>
              <div className="text-[10px] text-slate-500 leading-none">{label}</div>
              <div className="text-[9px] font-semibold mt-0.5" style={{ color: accent }}>{delta}</div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* ── Two-column tabbed body ────────────────────────────── */}
      <div
        ref={bodyRef}
        className="grid grid-cols-1 lg:grid-cols-[1fr_300px]"
        style={{ minHeight: 320 }}
      >
        {/* LEFT column ─────────────────────────────────────── */}
        <div className="flex flex-col" style={{ borderRight: "1px solid #e2e8f0" }}>

          <TabBar
            tabs={["Call Volume", "Recent Calls"]}
            active={leftTab}
            onSelect={setLeftTab}
          />

          <div className="flex-1 overflow-hidden" style={{ background: "#ffffff" }}>
            <AnimatePresence mode="wait" initial={false}>
              {leftTab === 0 && (
                <motion.div
                  key="chart"
                  variants={panelVariants}
                  initial="enter" animate="show" exit="exit"
                  className="flex flex-col h-full px-5 py-4"
                >
                  {/* Legend */}
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest mb-0.5">Call Volume</div>
                      <div className="text-[12px] font-semibold text-slate-800">Today · 24-hour view</div>
                    </div>
                    <div className="flex items-center gap-3">
                      {[["#1abcd9", "Total"], ["#0891b2", "Connected"]].map(([c, l]) => (
                        <div key={l} className="flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full" style={{ background: c }} />
                          <span className="text-[10px] text-slate-500">{l}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div style={{ height: 200 }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={CALL_VOLUME} margin={{ top: 4, right: 8, bottom: 0, left: -20 }}>
                        <defs>
                          <linearGradient id="lgTotal" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%"   stopColor="#1abcd9" stopOpacity={0.15} />
                            <stop offset="100%" stopColor="#1abcd9" stopOpacity={0}    />
                          </linearGradient>
                          <linearGradient id="lgConn" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%"   stopColor="#0891b2" stopOpacity={0.15} />
                            <stop offset="100%" stopColor="#0891b2" stopOpacity={0}    />
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="4 4" stroke="#f1f5f9" vertical={false} />
                        <XAxis dataKey="time" tick={{ fontSize: 10, fill: "#94a3b8" }} tickLine={false} axisLine={false} />
                        <YAxis tick={{ fontSize: 10, fill: "#94a3b8" }} tickLine={false} axisLine={false} width={28} />
                        <Tooltip content={<ChartTooltip />} />
                        <Area type="monotone" dataKey="calls"   stroke="#1abcd9" strokeWidth={2} fill="url(#lgTotal)" dot={false} />
                        <Area type="monotone" dataKey="success" stroke="#0891b2" strokeWidth={2} fill="url(#lgConn)"  dot={false} />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </motion.div>
              )}

              {leftTab === 1 && (
                <motion.div
                  key="recent"
                  variants={panelVariants}
                  initial="enter" animate="show" exit="exit"
                  className="px-5 py-4"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest">Recent Calls</div>
                    <button className="text-[11px] font-semibold cursor-pointer flex items-center gap-1" style={{ color: "#1abcd9" }}>
                      View all <ArrowUpRight size={10} />
                    </button>
                  </div>
                  <div className="divide-y divide-slate-50">
                    {RECENT.map((call, i) => (
                      <div key={i} className="flex items-center justify-between py-3">
                        <div className="flex items-center gap-2.5 min-w-0">
                          <div
                            className="w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center"
                            style={{ background: STATUS_CFG[call.status as keyof typeof STATUS_CFG].bg }}
                          >
                            <Phone size={11} color={STATUS_CFG[call.status as keyof typeof STATUS_CFG].color} strokeWidth={2} />
                          </div>
                          <div className="min-w-0">
                            <div className="text-[12px] font-semibold text-slate-800 truncate">{call.from}</div>
                            <div className="text-[10px] text-slate-400 truncate">{call.to}</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 flex-shrink-0 ml-3">
                          <span className="text-[11px] text-slate-400 font-mono hidden sm:block">{call.dur}</span>
                          <StatusPill status={call.status as keyof typeof STATUS_CFG} />
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* RIGHT column ────────────────────────────────────── */}
        <div className="flex flex-col" style={{ background: "#ffffff" }}>

          <TabBar
            tabs={["Numbers", "Channels"]}
            active={rightTab}
            onSelect={handleRightTab}
          />

          <div className="flex-1 overflow-hidden">
            <AnimatePresence mode="wait" initial={false}>

              {rightTab === 0 && (
                <motion.div
                  key="numbers"
                  variants={panelVariants}
                  initial="enter" animate="show" exit="exit"
                  className="px-4 py-3"
                >
                  <div className="flex items-center justify-between mb-2.5">
                    <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest">Active Numbers</div>
                    <span
                      className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                      style={{ background: "#e0f7fa", color: "#1abcd9", border: "1px solid #bfdbfe" }}
                    >
                      {NUMBERS.length} total
                    </span>
                  </div>

                  <div className="space-y-1">
                    {NUMBERS.map((n) => (
                      <motion.div
                        key={n.number}
                        whileHover={{ x: 2 }}
                        transition={{ type: "spring", stiffness: 400, damping: 24 }}
                        className="flex items-center gap-2.5 p-2 rounded-xl cursor-default transition-colors"
                        style={{ border: "1px solid transparent" }}
                        onMouseEnter={e => {
                          e.currentTarget.style.borderColor = "#e2e8f0"
                          e.currentTarget.style.background  = "#f8fafc"
                        }}
                        onMouseLeave={e => {
                          e.currentTarget.style.borderColor = "transparent"
                          e.currentTarget.style.background  = "transparent"
                        }}
                      >
                        <div
                          className="w-7 h-7 rounded-lg flex-shrink-0 flex items-center justify-center text-[9px] font-black"
                          style={{
                            background: n.status === "active" ? "#e0f7fa" : "#f8fafc",
                            color:      n.status === "active" ? "#1abcd9" : "#94a3b8",
                            border: `1px solid ${n.status === "active" ? "#bfdbfe" : "#e2e8f0"}`,
                          }}
                        >
                          {n.region}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-[11px] font-semibold text-slate-800 truncate">{n.number}</div>
                          <div className="text-[10px] text-slate-400 truncate">{n.label}</div>
                        </div>
                        <div className="text-right flex-shrink-0">
                          <div className="text-[11px] font-semibold text-slate-700">{n.calls}</div>
                          <div className="text-[9px] text-slate-400">calls</div>
                        </div>
                        <span
                          className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                          style={{ background: n.status === "active" ? "#059669" : "#cbd5e1" }}
                        />
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}

              {rightTab === 1 && (
                <motion.div
                  key="channels"
                  variants={panelVariants}
                  initial="enter" animate="show" exit="exit"
                  className="px-4 py-3"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest">Channel Usage</div>
                    <Signal size={12} color="#94a3b8" />
                  </div>

                  <div className="space-y-3">
                    {CHANNELS.map((ch, i) => (
                      <div key={ch.label}>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-[11px] font-medium text-slate-600">{ch.label}</span>
                          <span className="text-[11px] font-bold" style={{ color: ch.accent }}>{ch.pct}%</span>
                        </div>
                        <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "#f1f5f9" }}>
                          <div
                            ref={el => { barRefs.current[i] = el }}
                            className="h-full rounded-full"
                            style={{ width: "0%", background: ch.accent }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Uptime badge */}
                  <div
                    className="mt-4 flex items-center justify-between p-3 rounded-xl"
                    style={{ background: "#f0fdf4", border: "1px solid #bbf7d0" }}
                  >
                    <div className="flex items-center gap-2">
                      <ShieldCheck size={13} color="#059669" strokeWidth={2} />
                      <span className="text-[11px] font-semibold text-emerald-700">Uptime SLA</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-[14px] font-bold text-emerald-800">99.99%</span>
                      <span className="text-[9px] text-emerald-600 font-mono">30d avg</span>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* ── Footer bar ───────────────────────────────────────── */}
      <div
        className="flex items-center justify-between px-5 py-2"
        style={{ background: "#f8fafc", borderTop: "1px solid #e2e8f0" }}
      >
        <div className="flex items-center gap-4">
          {[
            { val: "200+", label: "Area codes" },
            { val: "24h",  label: "Activation" },
            { val: "38",   label: "Countries"  },
          ].map(({ val, label }) => (
            <div key={label} className="flex items-center gap-1.5">
              <span className="text-[12px] font-bold text-slate-700">{val}</span>
              <span className="text-[10px] text-slate-400">{label}</span>
            </div>
          ))}
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
          <span className="text-[10px] font-semibold text-slate-500">All systems operational</span>
        </div>
      </div>
    </div>
  )
}
