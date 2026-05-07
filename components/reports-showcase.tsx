"use client"

import { useState, useEffect, useRef } from "react"
import {
  Phone, PhoneIncoming, PhoneOutgoing,
  Voicemail, Mic, BarChart2, Activity, Users, MessageSquare,
  Search, RefreshCw, Download, Filter, ArrowRight, Check,
} from "lucide-react"
import {
  Chart as ChartJS, CategoryScale, LinearScale,
  PointElement, LineElement, BarElement,
  Tooltip, Legend, Filler,
} from "chart.js"
import { Line, Bar } from "react-chartjs-2"
import { gsap } from "gsap"

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Tooltip, Legend, Filler)

// ── Design tokens ──────────────────────────────────────────────────────────
const A   = "#1abcd9"
const A2  = "#1797ac"
const GLOW = "rgba(26,188,217,0.15)"

// ── Mock data ──────────────────────────────────────────────────────────────
const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
const WEEK_COLS = ["Tue 28-04","Wed 29-04","Thu 30-04","Fri 01-05","Sat 02-05","Sun 03-05","Mon 04-05"]
const HOURS = Array.from({ length: 24 }, (_, i) => {
  if (i === 0)  return "12 am"
  if (i < 12)   return `${i} am`
  if (i === 12) return "12 pm"
  return `${i - 12} pm`
})

const TREND = {
  labels:   DAYS,
  total:    [145, 189, 203, 178, 234,  89, 67],
  answered: [123, 156, 178, 142, 198,  67, 45],
  missed:   [ 22,  33,  25,  36,  36,  22, 22],
}

const HEATMAP: number[][] = Array.from({ length: 24 }, (_, h) =>
  Array.from({ length: 7 }, (_, d) => {
    if (h < 7 || h > 20) return 0
    if (d >= 5) return Math.floor(Math.random() * 2)
    if ((h >= 9 && h <= 11) || (h >= 14 && h <= 16)) return 3
    if (h === 8 || h === 17) return 2
    return 1
  })
)

const CALL_LOG = [
  { date: "May 5, 09:14 AM", from: "+1 (415) 555-0192", did: "+1 415 200 0044", to: "+1 (800) 555-0177", status: "Answered",  duration: "4:23", charge: "$0.08" },
  { date: "May 5, 09:02 AM", from: "+1 (646) 555-0311", did: "+1 415 200 0044", to: "+1 (312) 555-0192", status: "Missed",    duration: "0:00", charge: "$0.00" },
  { date: "May 5, 08:51 AM", from: "+1 (415) 555-0789", did: "+1 888 200 0011", to: "+1 (646) 555-0311", status: "Answered",  duration: "2:11", charge: "$0.04" },
  { date: "May 4, 05:37 PM", from: "+1 (312) 555-0044", did: "+1 415 200 0044", to: "+1 (415) 555-0789", status: "Answered",  duration: "6:44", charge: "$0.13" },
  { date: "May 4, 04:18 PM", from: "+1 (800) 555-0123", did: "+1 888 200 0011", to: "+1 (312) 555-0044", status: "Voicemail", duration: "0:32", charge: "$0.01" },
]
const OUTBOUND_LOG  = CALL_LOG.filter((_, i) => i !== 1).map(r => ({ ...r, status: r.status === "Voicemail" ? "Answered" : r.status }))
const INBOUND_LOG   = CALL_LOG.filter((_, i) => [0, 2, 4].includes(i))
const VOICEMAIL_LOG = [
  { date: "May 5, 10:32 AM", from: "+1 (800) 555-0123", did: "+1 415 200 0044", to: "Voicemail Box", status: "New",   duration: "0:45", charge: "$0.01" },
  { date: "May 4, 02:11 PM", from: "+1 (312) 555-0789", did: "+1 888 200 0011", to: "Voicemail Box", status: "Heard", duration: "1:12", charge: "$0.02" },
]
const RECORDING_LOG = CALL_LOG.filter(r => r.status === "Answered").map(r => ({ ...r, status: "Recorded" }))

const AGENTS = [
  { name: "Sarah Mitchell", total: 87, outgoing: 45, answered: 71, time: "4:23:12", incoming: 42, incomingAnswered: 38, timeIncoming: "2:18:44" },
  { name: "James Osei",     total: 74, outgoing: 38, answered: 61, time: "3:44:09", incoming: 36, incomingAnswered: 31, timeIncoming: "1:52:30" },
  { name: "Amara Diallo",   total: 62, outgoing: 29, answered: 55, time: "2:58:47", incoming: 33, incomingAnswered: 29, timeIncoming: "1:37:21" },
  { name: "David Nkrumah",  total: 51, outgoing: 22, answered: 44, time: "2:11:33", incoming: 29, incomingAnswered: 25, timeIncoming: "1:14:18" },
]

const SMS_LOG = [
  { date: "May 5, 10:22 AM", from: "+1 (415) 555-0192", via: "🇺🇸 +1 415 200 0044", to: "+91 98765 43210",  direction: "Outbound", status: "Delivered", type: "SMS", cost: "$0.01" },
  { date: "May 5, 09:55 AM", from: "+1 (646) 555-0311", via: "🇺🇸 +1 888 200 0011", to: "+44 20 7946 0958", direction: "Outbound", status: "Delivered", type: "SMS", cost: "$0.02" },
  { date: "May 5, 09:30 AM", from: "+44 20 7946 0958",  via: "🇺🇸 +1 415 200 0044", to: "+1 (415) 555-0192",direction: "Inbound",  status: "Received", type: "SMS", cost: "$0.00" },
  { date: "May 4, 03:48 PM", from: "+1 (479) 335-3310", via: "🇺🇸 +1 479 335 3310", to: "+91 77386 51080",  direction: "Outbound", status: "Delivered", type: "SMS", cost: "$0.00" },
]

const ACTIVITY_HOURS = ["12:00 AM","1:00 AM","2:00 AM","3:00 AM","4:00 AM","9:00 AM","10:00 AM","11:00 AM","2:00 PM","3:00 PM","4:00 PM"]
const ACTIVITY_DATA  = [0, 0, 0, 0, 0, 3, 5, 4, 3, 6, 2]

// ── Status badge ───────────────────────────────────────────────────────────
const STATUS_CLS: Record<string, string> = {
  Answered:  "bg-emerald-50 text-emerald-700 border-emerald-200",
  Missed:    "bg-red-50     text-red-600     border-red-200",
  Voicemail: "bg-amber-50   text-amber-700   border-amber-200",
  Recorded:  "bg-blue-50    text-blue-700    border-blue-200",
  New:       "bg-sky-50     text-sky-700     border-sky-200",
  Heard:     "bg-gray-50    text-gray-500    border-gray-200",
  Delivered: "bg-emerald-50 text-emerald-700 border-emerald-200",
  Received:  "bg-teal-50    text-teal-700    border-teal-200",
  Outbound:  "bg-violet-50  text-violet-700  border-violet-200",
  Inbound:   "bg-blue-50    text-blue-700    border-blue-200",
}
function Badge({ label }: { label: string }) {
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-bold border tracking-wide ${STATUS_CLS[label] ?? "bg-gray-50 text-gray-500 border-gray-200"}`}>
      {label}
    </span>
  )
}

// ── Animated stat counter ──────────────────────────────────────────────────
function Counter({ to, label, active = false }: { to: number; label: string; active?: boolean }) {
  const numRef  = useRef<HTMLSpanElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!numRef.current) return
    const obj = { v: 0 }
    gsap.to(obj, {
      v: to, duration: 1.4, ease: "power3.out",
      onUpdate() { if (numRef.current) numRef.current.textContent = Math.round(obj.v).toLocaleString() },
    })
  }, [to])

  function onEnter() {
    gsap.to(cardRef.current, { scale: 1.025, boxShadow: "0 8px 24px -6px rgba(26,188,217,0.2)", duration: 0.2, ease: "power2.out" })
  }
  function onLeave() {
    gsap.to(cardRef.current, { scale: 1, boxShadow: "0 0 0 0 transparent", duration: 0.25, ease: "power2.inOut" })
  }

  return (
    <div
      ref={cardRef}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      className={`flex-1 min-w-[90px] rounded-xl border px-3 py-3 text-center cursor-default transition-colors ${
        active ? "border-[#1abcd9]/40 bg-[#1abcd9]/5" : "border-gray-100 bg-white"
      }`}
      style={{ transformOrigin: "center" }}
    >
      <p className="text-[20px] font-bold text-gray-900 leading-none mb-1">
        <span ref={numRef}>0</span>
      </p>
      <p className={`text-[9px] font-mono font-bold tracking-[1.5px] uppercase ${active ? "text-[#1abcd9]" : "text-gray-400"}`}>
        {label}
      </p>
    </div>
  )
}

// ── Top bar ────────────────────────────────────────────────────────────────
function TopBar({ title, showSearch = true, showDownload = false, range = "Last 7 Days" }: {
  title: string; showSearch?: boolean; showDownload?: boolean; range?: string
}) {
  return (
    <div className="flex items-center justify-between gap-3 mb-5 flex-wrap">
      <h2 className="text-[17px] font-semibold" style={{ color: A }}>{title}</h2>
      <div className="flex items-center gap-1.5">
        {showSearch && (
          <div className="flex items-center gap-2 border border-gray-200 rounded-lg px-2.5 py-1.5 bg-white">
            <Search className="h-3 w-3 text-gray-400" />
            <span className="text-[11px] text-gray-400 font-mono">Search</span>
          </div>
        )}
        <div className="flex items-center gap-1 border border-gray-200 rounded-lg px-2.5 py-1.5 bg-white text-[11px] font-mono text-gray-500">
          {range} <span className="ml-0.5 text-gray-300">▾</span>
        </div>
        <button className="p-1.5 rounded-lg border border-gray-200 bg-white hover:border-[#1abcd9]/50 transition-colors group">
          <RefreshCw className="h-3 w-3 text-gray-400 group-hover:text-[#1abcd9] transition-colors" />
        </button>
        {showDownload && (
          <button className="p-1.5 rounded-lg border border-gray-200 bg-white hover:border-[#1abcd9]/50 transition-colors group">
            <Download className="h-3 w-3 text-gray-400 group-hover:text-[#1abcd9] transition-colors" />
          </button>
        )}
        <button className="p-1.5 rounded-lg border border-gray-200 bg-white hover:border-[#1abcd9]/50 transition-colors group">
          <Filter className="h-3 w-3 text-gray-400 group-hover:text-[#1abcd9] transition-colors" />
        </button>
      </div>
    </div>
  )
}

// ── Call table ─────────────────────────────────────────────────────────────
type CallRow = { date: string; from: string; did: string; to: string; status: string; duration: string; charge: string }
function CallTable({ rows }: { rows: CallRow[] }) {
  const tbRef = useRef<HTMLTableSectionElement>(null)
  useEffect(() => {
    if (!tbRef.current) return
    const trs = tbRef.current.querySelectorAll("tr")
    gsap.fromTo(trs,
      { opacity: 0, y: 8 },
      { opacity: 1, y: 0, stagger: 0.05, duration: 0.35, ease: "power2.out", delay: 0.12 }
    )
  }, [rows])
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left min-w-[580px]">
        <thead>
          <tr className="border-b border-gray-100">
            {["Date","From","DID","To","Status","Duration","Charge","Action"].map(h => (
              <th key={h} className="pb-2 px-2.5 text-[9px] font-mono font-bold text-gray-400 tracking-[1.5px] uppercase whitespace-nowrap">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody ref={tbRef}>
          {rows.map((r, i) => (
            <tr key={i} className="border-b border-gray-50 hover:bg-slate-50/60 transition-colors group">
              <td className="py-2 px-2.5 text-[11px] font-mono text-gray-500 whitespace-nowrap">{r.date}</td>
              <td className="py-2 px-2.5 text-[11px] font-mono text-gray-800 whitespace-nowrap">{r.from}</td>
              <td className="py-2 px-2.5 text-[11px] font-mono text-gray-400 whitespace-nowrap">{r.did}</td>
              <td className="py-2 px-2.5 text-[11px] font-mono text-gray-800 whitespace-nowrap">{r.to}</td>
              <td className="py-2 px-2.5"><Badge label={r.status} /></td>
              <td className="py-2 px-2.5 text-[11px] font-mono text-gray-600">{r.duration}</td>
              <td className="py-2 px-2.5 text-[11px] font-mono text-gray-600">{r.charge}</td>
              <td className="py-2 px-2.5">
                <button className="text-[10px] font-mono font-bold opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: A }}>View</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

// ── Shared chart options ───────────────────────────────────────────────────
const lineOpts = {
  responsive: true, maintainAspectRatio: false,
  animation: { duration: 900, easing: "easeOutQuart" as const },
  plugins: {
    legend: { position: "top" as const, labels: { font: { family: "monospace", size: 10 }, boxWidth: 10, padding: 12 } },
    tooltip: { mode: "index" as const, intersect: false },
  },
  scales: {
    x: { grid: { display: false }, ticks: { font: { family: "monospace", size: 10 } } },
    y: { grid: { color: "rgba(0,0,0,0.04)" }, ticks: { font: { family: "monospace", size: 10 } } },
  },
}

// ── Section views ──────────────────────────────────────────────────────────
function CallHistoryView() {
  const data = {
    labels: TREND.labels,
    datasets: [
      { label: "Total",    data: TREND.total,    borderColor: A,         backgroundColor: `${A}18`,              fill: true, tension: 0.4, pointBackgroundColor: A,         pointRadius: 3 },
      { label: "Answered", data: TREND.answered, borderColor: "#22c55e", backgroundColor: "rgba(34,197,94,0.06)", fill: true, tension: 0.4, pointBackgroundColor: "#22c55e", pointRadius: 3 },
      { label: "Missed",   data: TREND.missed,   borderColor: "#ef4444", backgroundColor: "rgba(239,68,68,0.05)", fill: true, tension: 0.4, pointBackgroundColor: "#ef4444", pointRadius: 3 },
    ],
  }
  return (
    <div>
      <TopBar title="Call history" showDownload />
      <div className="flex gap-2 mb-4 flex-wrap">
        <Counter to={1247} active label="Total Calls" />
        <Counter to={891}  label="Answered Calls" />
        <Counter to={423}  label="Outgoing Calls" />
        <Counter to={356}  label="Missed Calls" />
        <Counter to={89}   label="Voicemails" />
      </div>
      <div className="rounded-xl border border-gray-100 bg-white p-3 mb-4" style={{ height: 200 }}>
        <Line data={data} options={lineOpts} />
      </div>
      <CallTable rows={CALL_LOG} />
    </div>
  )
}

function OutboundView() {
  return <div><TopBar title="Outbound" showDownload /><CallTable rows={OUTBOUND_LOG} /></div>
}

function InboundView() {
  return (
    <div>
      <TopBar title="Inbound" />
      <div className="flex gap-2 mb-4 flex-wrap">
        <Counter to={824} active label="Total Calls" />
        <Counter to={712}  label="Answered" />
        <Counter to={112}  label="Missed" />
        <Counter to={89}   label="Voicemails" />
        <Counter to={2138} label="Total Duration" />
      </div>
      <CallTable rows={INBOUND_LOG} />
    </div>
  )
}

function VoicemailView() {
  return <div><TopBar title="Voicemail" showDownload /><CallTable rows={VOICEMAIL_LOG} /></div>
}

function CallRecordingView() {
  return <div><TopBar title="Call Recording" showDownload /><CallTable rows={RECORDING_LOG} /></div>
}

function CallVolumeView() {
  const BUSINESS_HOURS = HOURS.slice(7, 20)
  const BUSINESS_HEATMAP = HEATMAP.slice(7, 20)
  const cellBg = (v: number) => {
    if (v === 0) return "rgba(0,0,0,0)"
    if (v === 1) return "rgba(26,188,217,0.15)"
    if (v === 2) return "rgba(26,188,217,0.45)"
    return "rgba(26,188,217,0.85)"
  }
  const legend = [
    { label: "Low",    color: "rgba(26,188,217,0.15)" },
    { label: "Medium", color: "rgba(26,188,217,0.45)" },
    { label: "High",   color: "rgba(26,188,217,0.85)" },
  ]
  return (
    <div>
      <TopBar title="Call volume" showSearch={false} />
      <div className="overflow-x-auto">
        <table className="w-full min-w-[480px] text-[10px] font-mono border-collapse">
          <thead>
            <tr className="bg-gray-50/80">
              <th className="px-2 py-1.5 text-left text-gray-400 font-bold w-12">Time</th>
              {WEEK_COLS.map(d => (
                <th key={d} className="px-1 py-1.5 text-gray-400 font-bold text-center leading-tight whitespace-nowrap">{d}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {BUSINESS_HOURS.map((h, hi) => (
              <tr key={h} className="border-t border-gray-50">
                <td className="px-2 py-0.5 text-gray-400 whitespace-nowrap">{h}</td>
                {BUSINESS_HEATMAP[hi].map((v, di) => (
                  <td key={di} className="px-1 py-0.5 text-center">
                    <div
                      className="mx-auto h-3 rounded-sm transition-all duration-200 hover:opacity-80 cursor-default"
                      style={{ background: cellBg(v), minWidth: "24px" }}
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex items-center gap-4 mt-2.5 flex-wrap">
        {legend.map(({ label, color }) => (
          <div key={label} className="flex items-center gap-1.5">
            <span className="inline-block w-3 h-3 rounded-sm" style={{ background: color, border: "1px solid rgba(0,0,0,0.06)" }} />
            <span className="text-[10px] font-mono text-gray-400">{label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function ActivityView() {
  const data = {
    labels: ACTIVITY_HOURS,
    datasets: [{
      label: "Calls",
      data: ACTIVITY_DATA,
      backgroundColor: ACTIVITY_DATA.map(v => v > 0 ? `${A}cc` : "rgba(239,68,68,0.12)"),
      borderRadius: 4,
      borderSkipped: false as const,
    }],
  }
  const opts = {
    indexAxis: "y" as const,
    responsive: true, maintainAspectRatio: false,
    animation: { duration: 800, easing: "easeOutQuart" as const },
    plugins: {
      legend: { display: false },
      tooltip: { callbacks: { label: (c: { raw: unknown }) => ` ${c.raw} calls` } },
    },
    scales: {
      x: { grid: { color: "rgba(0,0,0,0.04)" }, ticks: { font: { family: "monospace", size: 10 } } },
      y: { grid: { display: false }, ticks: { font: { family: "monospace", size: 10 } } },
    },
  }
  return (
    <div>
      <TopBar title="Activity" showSearch={false} range="Today  12:00 AM – 5:00 AM" />
      <div className="rounded-xl border border-gray-100 bg-white p-3" style={{ height: 340 }}>
        <p className="text-[10px] font-mono text-gray-400 mb-2">Timezone — America/Denver</p>
        <div style={{ height: 300 }}><Bar data={data} options={opts} /></div>
      </div>
    </div>
  )
}

function AgentReportsView() {
  const tbRef = useRef<HTMLTableSectionElement>(null)
  useEffect(() => {
    if (!tbRef.current) return
    const trs = tbRef.current.querySelectorAll("tr")
    gsap.fromTo(trs, { opacity: 0, x: -10 }, { opacity: 1, x: 0, stagger: 0.07, duration: 0.4, ease: "power2.out" })
  }, [])
  const chartData = {
    labels: AGENTS.map(a => a.name.split(" ")[0]),
    datasets: [
      { label: "Total",    data: AGENTS.map(a => a.total),    backgroundColor: `${A}cc`,    borderRadius: 4 },
      { label: "Answered", data: AGENTS.map(a => a.answered), backgroundColor: "#22c55e99", borderRadius: 4 },
      { label: "Outgoing", data: AGENTS.map(a => a.outgoing), backgroundColor: "#8b5cf699", borderRadius: 4 },
    ],
  }
  const opts = {
    responsive: true, maintainAspectRatio: false,
    animation: { duration: 800, easing: "easeOutQuart" as const },
    plugins: { legend: { position: "top" as const, labels: { font: { family: "monospace", size: 10 }, boxWidth: 10, padding: 10 } } },
    scales: {
      x: { grid: { display: false }, ticks: { font: { family: "monospace", size: 10 } } },
      y: { grid: { color: "rgba(0,0,0,0.04)" }, ticks: { font: { family: "monospace", size: 10 } } },
    },
  }
  return (
    <div>
      <TopBar title="Agent reports" showDownload />
      <div className="rounded-xl border border-gray-100 bg-white p-3 mb-4" style={{ height: 200 }}>
        <Bar data={chartData} options={opts} />
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left min-w-[680px]">
          <thead>
            <tr className="border-b border-gray-100">
              {["Name","Total","Outgoing","Answered","Time on Calls","Incoming","Inc. Answered","Time on Inc."].map(h => (
                <th key={h} className="pb-2 px-2.5 text-[9px] font-mono font-bold text-gray-400 tracking-[1.2px] uppercase whitespace-nowrap">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody ref={tbRef}>
            {AGENTS.map((a, i) => (
              <tr key={i} className="border-b border-gray-50 hover:bg-slate-50/60 transition-colors">
                <td className="py-2 px-2.5 text-[12px] font-semibold text-gray-800">{a.name}</td>
                <td className="py-2 px-2.5 text-[12px] font-mono font-bold" style={{ color: A }}>{a.total}</td>
                <td className="py-2 px-2.5 text-[11px] font-mono text-gray-600">{a.outgoing}</td>
                <td className="py-2 px-2.5 text-[11px] font-mono text-gray-600">{a.answered}</td>
                <td className="py-2 px-2.5 text-[11px] font-mono text-gray-500">{a.time}</td>
                <td className="py-2 px-2.5 text-[11px] font-mono text-gray-600">{a.incoming}</td>
                <td className="py-2 px-2.5 text-[11px] font-mono text-gray-600">{a.incomingAnswered}</td>
                <td className="py-2 px-2.5 text-[11px] font-mono text-gray-500">{a.timeIncoming}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function SmsLogView() {
  const tbRef = useRef<HTMLTableSectionElement>(null)
  useEffect(() => {
    if (!tbRef.current) return
    const trs = tbRef.current.querySelectorAll("tr")
    gsap.fromTo(trs, { opacity: 0, y: 8 }, { opacity: 1, y: 0, stagger: 0.06, duration: 0.35, ease: "power2.out", delay: 0.1 })
  }, [])
  return (
    <div>
      <TopBar title="Sms log" showDownload />
      <div className="overflow-x-auto">
        <table className="w-full text-left min-w-[620px]">
          <thead>
            <tr className="border-b border-gray-100">
              {["Date/Time","From","Via DID","To","Direction","Status","Type","Cost"].map(h => (
                <th key={h} className="pb-2 px-2.5 text-[9px] font-mono font-bold text-gray-400 tracking-[1.2px] uppercase whitespace-nowrap">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody ref={tbRef}>
            {SMS_LOG.map((r, i) => (
              <tr key={i} className="border-b border-gray-50 hover:bg-slate-50/60 transition-colors">
                <td className="py-2 px-2.5 text-[11px] font-mono text-gray-500 whitespace-nowrap">{r.date}</td>
                <td className="py-2 px-2.5 text-[11px] font-mono text-gray-800 whitespace-nowrap">{r.from}</td>
                <td className="py-2 px-2.5 text-[11px] font-mono text-gray-400 whitespace-nowrap">{r.via}</td>
                <td className="py-2 px-2.5 text-[11px] font-mono text-gray-800 whitespace-nowrap">{r.to}</td>
                <td className="py-2 px-2.5"><Badge label={r.direction} /></td>
                <td className="py-2 px-2.5"><Badge label={r.status} /></td>
                <td className="py-2 px-2.5 text-[11px] font-mono text-gray-600">{r.type}</td>
                <td className="py-2 px-2.5 text-[11px] font-mono text-gray-600">{r.cost}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

// ── Sidebar config ─────────────────────────────────────────────────────────
type SectionKey = "history"|"outbound"|"inbound"|"voicemail"|"recording"|"volume"|"activity"|"agents"|"sms"

const NAV: { key: SectionKey; label: string; Icon: React.ElementType }[] = [
  { key: "history",   label: "Call History",  Icon: Phone },
  { key: "outbound",  label: "Outbound",       Icon: PhoneOutgoing },
  { key: "inbound",   label: "Inbound",        Icon: PhoneIncoming },
  { key: "voicemail", label: "Voicemail",      Icon: Voicemail },
  { key: "recording", label: "Call Recording", Icon: Mic },
  { key: "volume",    label: "Call Volume",    Icon: BarChart2 },
  { key: "activity",  label: "Activity",       Icon: Activity },
  { key: "agents",    label: "Agent Reports",  Icon: Users },
  { key: "sms",       label: "SMS-Log",        Icon: MessageSquare },
]

const VIEWS: Record<SectionKey, React.FC> = {
  history: CallHistoryView, outbound: OutboundView, inbound: InboundView,
  voicemail: VoicemailView, recording: CallRecordingView, volume: CallVolumeView,
  activity: ActivityView,   agents: AgentReportsView,     sms: SmsLogView,
}

// ── Main component ─────────────────────────────────────────────────────────
export function ReportsShowcase() {
  const [active, setActive]   = useState<SectionKey>("history")
  const [mounted, setMounted] = useState(false)

  const wrapRef    = useRef<HTMLDivElement>(null)
  const glowRef    = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const indicRef   = useRef<HTMLDivElement>(null)

  // Mount flag (SSR safe)
  useEffect(() => { setMounted(true) }, [])

  // Cinematic entrance
  useEffect(() => {
    if (!mounted || !wrapRef.current) return
    const ctx = gsap.context(() => {
      gsap.fromTo(wrapRef.current,
        { opacity: 0, y: 44, scale: 0.96, filter: "blur(8px)", rotateX: "3deg" },
        { opacity: 1, y: 0,  scale: 1,    filter: "blur(0px)", rotateX: "0deg",
          duration: 0.9, ease: "power4.out", delay: 0.15 }
      )
      // Breathing background glow
      if (glowRef.current) {
        gsap.to(glowRef.current, {
          scale: 1.25, opacity: 0.7, duration: 4.5,
          ease: "sine.inOut", yoyo: true, repeat: -1,
        })
      }
    })
    return () => ctx.revert()
  }, [mounted])

  // Animated sidebar indicator
  useEffect(() => {
    if (!indicRef.current) return
    const idx = NAV.findIndex(n => n.key === active)
    gsap.to(indicRef.current, { y: idx * 36, duration: 0.35, ease: "power3.out" })
  }, [active])

  function switchTo(key: SectionKey) {
    if (key === active || !contentRef.current) { setActive(key); return }
    gsap.to(contentRef.current, {
      opacity: 0, y: 10, duration: 0.18, ease: "power2.inOut",
      onComplete() {
        setActive(key)
        gsap.fromTo(contentRef.current,
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.32, ease: "expo.out" }
        )
      },
    })
  }

  const View = VIEWS[active]

  return (
    <div
      ref={wrapRef}
      className="relative rounded-2xl overflow-hidden border border-gray-200/80 bg-white"
      style={{
        perspective: "1200px",
        boxShadow: "0 32px 80px -20px rgba(0,0,0,0.12), 0 0 0 1px rgba(26,188,217,0.06)",
        opacity: 0,
      }}
    >
      {/* Ambient glow */}
      <div
        ref={glowRef}
        aria-hidden
        className="pointer-events-none absolute -top-24 -right-24 w-80 h-80 rounded-full opacity-30"
        style={{ background: `radial-gradient(circle, ${GLOW} 0%, transparent 70%)`, zIndex: 0 }}
      />

      {/* Browser chrome */}
      <div className="relative z-10 flex items-center gap-2 px-4 py-2.5 border-b border-gray-100 bg-white/90 backdrop-blur-sm">
        <span className="h-2.5 w-2.5 rounded-full bg-red-400/80" />
        <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/80" />
        <span className="h-2.5 w-2.5 rounded-full bg-green-400/80" />
        <div className="ml-3 flex-1 flex items-center">
          <span className="text-[11px] font-mono text-gray-400 bg-gray-50 border border-gray-100 rounded-md px-3 py-0.5">
            app.twiching.ai/reports
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400" />
          <span className="text-[10px] font-mono text-gray-400">Live</span>
        </div>
      </div>

      {/* App shell */}
      <div className="relative z-10 flex" style={{ minHeight: 540 }}>

        {/* Sidebar */}
        <aside className="relative w-[175px] flex-shrink-0 border-r border-gray-100 bg-white/95 py-3">
          <p className="px-4 text-[9px] font-bold tracking-[2px] uppercase text-gray-400 font-mono mb-2.5">Reports</p>

          {/* Sliding active indicator */}
          <div ref={indicRef} className="absolute left-0 w-[3px] rounded-r-full h-9" style={{ background: `linear-gradient(180deg, ${A}, ${A2})`, top: 36, zIndex: 1 }} />

          <nav>
            {NAV.map(({ key, label, Icon }) => (
              <button
                key={key}
                onClick={() => switchTo(key)}
                className={`w-full flex items-center gap-2 px-4 py-2 text-[12px] font-mono text-left transition-colors ${
                  active === key
                    ? "font-semibold bg-[#1abcd9]/5"
                    : "text-gray-500 hover:bg-gray-50/80 hover:text-gray-700"
                }`}
                style={{ color: active === key ? A : undefined, height: 36 }}
              >
                <Icon className="h-3.5 w-3.5 flex-shrink-0" strokeWidth={1.8} />
                {label}
              </button>
            ))}
          </nav>
        </aside>

        {/* Content */}
        <main className="flex-1 p-5 overflow-auto bg-gray-50/30 min-w-0">
          <div ref={contentRef}>
            <View />
          </div>
        </main>
      </div>
    </div>
  )
}
