"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Check, Send, Plus, Zap, Sparkles,
  PhoneIncoming, Wifi, ArrowRightLeft,
} from "lucide-react"

// ── Data ──────────────────────────────────────────────────────────────────────

const USERS = [
  {
    initials: "FM", name: "Fatima Mensah",
    sub: "Inbound · +234 · Accra",
    messages: [
      { id: 1, from: "user", text: "Hi, I need help setting up my business line." },
      { id: 2, from: "ai",   text: "Sure! I can provision a local number instantly." },
      { id: 3, type: "action", text: "Warm transfer · 0.2s" },
      { id: 4, from: "user", text: "Can I keep my existing number?" },
      { id: 5, from: "ai",   text: "Yes — port-in is free and takes under 5 mins." },
    ],
  },
  {
    initials: "LN", name: "Lerato Ndlovu",
    sub: "Inbound · +27 · Johannesburg",
    messages: [
      { id: 1, from: "user", text: "What's your uptime guarantee?" },
      { id: 2, from: "ai",   text: "99.9% SLA across 7 global regions — carrier grade." },
      { id: 3, type: "action", text: "Routed to Sales · 0.3s" },
      { id: 4, from: "user", text: "Do you support STIR/SHAKEN?" },
      { id: 5, from: "ai",   text: "Full Attestation A on every outbound call." },
    ],
  },
]


// ── Float helper ──────────────────────────────────────────────────────────────

function Float({ children, y = 8, duration = 3.6, delay = 0 }: {
  children: React.ReactNode; y?: number; duration?: number; delay?: number
}) {
  return (
    <motion.div
      animate={{ y: [0, -y, 0] }}
      transition={{ duration, delay, repeat: Infinity, ease: "easeInOut" }}
    >
      {children}
    </motion.div>
  )
}

// ── Satellite cards ───────────────────────────────────────────────────────────

function CallConnectedCard() {
  const [secs, setSecs] = useState(42)
  useEffect(() => {
    const id = setInterval(() => setSecs(s => s + 1), 1000)
    return () => clearInterval(id)
  }, [])
  const fmt = (n: number) => String(Math.floor(n / 60)).padStart(2, "0") + ":" + String(n % 60).padStart(2, "0")

  return (
    <div className="bg-white rounded-2xl shadow-[0_8px_32px_-8px_rgba(0,0,0,0.13)] border border-gray-100 p-4">
      <div className="flex items-center gap-1.5 mb-2">
        <div className="h-6 w-6 rounded-full bg-[#e0f7fa] flex items-center justify-center">
          <PhoneIncoming className="h-3 w-3 text-accent" strokeWidth={2.2} />
        </div>
        <span className="text-[9px] font-mono font-normal tracking-[1.5px] uppercase text-accent">Call Connected</span>
      </div>
      <p className="text-[22px] font-normal font-mono text-gray-900 leading-none">{fmt(secs)}</p>
      <p className="text-[9px] font-mono text-gray-400 mt-1">Picked up in 0.3s</p>
    </div>
  )
}

function UptimeSLACard() {
  return (
    <div className="bg-white rounded-2xl shadow-[0_8px_32px_-8px_rgba(0,0,0,0.13)] border border-gray-100 p-4">
      <div className="flex items-center gap-1.5 mb-2">
        <div className="h-6 w-6 rounded-full bg-[#e0f7fa] flex items-center justify-center">
          <Wifi className="h-3 w-3 text-accent" strokeWidth={2.2} />
        </div>
        <span className="text-[9px] font-mono font-normal tracking-[1.5px] uppercase text-accent">Uptime SLA</span>
      </div>
      <p className="text-[22px] font-normal font-mono text-gray-900 leading-none">99.9%</p>
      <p className="text-[9px] font-mono text-gray-400 mt-1">90 days · 7 regions</p>
    </div>
  )
}

function PortInCard() {
  return (
    <div className="bg-white rounded-2xl shadow-[0_8px_32px_-8px_rgba(0,0,0,0.13)] border border-gray-100 p-4">
      <div className="inline-flex items-center gap-1 bg-amber-100 text-amber-700 text-[8px] font-normal px-2 py-0.5 rounded-full mb-2">
        <Zap className="h-2.5 w-2.5" strokeWidth={2.4} />
        PORT-IN
      </div>
      <p className="text-[12px] font-normal text-gray-900 leading-tight">Number Ported</p>
      <p className="text-[9px] font-mono text-gray-400 mt-0.5">+234 1 808 · Zero fees</p>
    </div>
  )
}


function ContextHandoffCard() {
  return (
    <div className="bg-white rounded-2xl shadow-[0_8px_32px_-8px_rgba(0,0,0,0.13)] border border-gray-100 p-4">
      <div className="flex items-center gap-1.5 mb-2">
        <div className="h-6 w-6 rounded-full bg-[#e0f7fa] flex items-center justify-center">
          <ArrowRightLeft className="h-3 w-3 text-accent" strokeWidth={2.2} />
        </div>
        <span className="text-[9px] font-mono font-normal tracking-[1.5px] uppercase text-accent">Ava AI</span>
      </div>
      <p className="text-[11px] font-normal text-gray-900 leading-tight">Transferred with full context</p>
      <p className="text-[9px] font-mono text-gray-400 mt-0.5">Sales queue · 0.2s handoff</p>
    </div>
  )
}

// ── Central chat card ─────────────────────────────────────────────────────────

function CentralChatCard({ user }: { user: typeof USERS[0] }) {
  return (
    <div className="relative flex flex-col bg-white rounded-3xl shadow-[0_24px_60px_-16px_rgba(26,188,217,0.22),0_4px_16px_-4px_rgba(0,0,0,0.08)] border border-gray-100 overflow-hidden"
      style={{ height: 420, width: 220 }}>

      {/* Header */}
      <div className="flex items-center gap-2 px-3 pt-3 pb-3 border-b border-gray-50">
        <div className="h-8 w-8 rounded-full bg-gradient-to-br from-accent to-[#1797ac] flex items-center justify-center flex-shrink-0">
          <span className="text-white text-[9px] font-normal">{user.initials}</span>
        </div>
        <div className="min-w-0">
          <p className="text-[11px] font-normal text-gray-900 truncate">{user.name}</p>
          <p className="text-[8px] font-mono text-gray-400 truncate">{user.sub}</p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-hidden px-3 py-3 space-y-2">
        <AnimatePresence mode="wait">
          <motion.div
            key={user.name}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="space-y-2"
          >
            {user.messages.map((msg, i) => {
              if (msg.type === "action") {
                return (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.08 }}
                    className="flex justify-center"
                  >
                    <span className="inline-flex items-center gap-1 bg-[#e0f7fa] text-accent text-[8px] font-normal px-2.5 py-0.5 rounded-full">
                      <Check className="h-2 w-2" strokeWidth={3} />
                      {msg.text}
                    </span>
                  </motion.div>
                )
              }
              return (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08, duration: 0.3 }}
                  className={`flex ${msg.from === "ai" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] px-2.5 py-1.5 rounded-2xl text-[9px] leading-relaxed ${
                      msg.from === "ai"
                        ? "bg-accent text-white rounded-br-sm"
                        : "bg-gray-100 text-gray-800 rounded-bl-sm"
                    }`}
                  >
                    {msg.text}
                  </div>
                </motion.div>
              )
            })}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Input */}
      <div className="flex items-center gap-2 px-3 py-2.5 border-t border-gray-50">
        <button className="h-5 w-5 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
          <Plus className="h-2.5 w-2.5 text-gray-500" />
        </button>
        <div className="flex-1 bg-gray-50 rounded-full px-2.5 py-1">
          <span className="text-[8px] font-mono text-gray-400">Type a message...</span>
        </div>
        <button className="h-6 w-6 rounded-full bg-accent flex items-center justify-center flex-shrink-0">
          <Send className="h-2.5 w-2.5 text-white" />
        </button>
      </div>
    </div>
  )
}

// ── Main export ───────────────────────────────────────────────────────────────

export function UCaaSFloatingDashboard() {
  const [userIdx, setUserIdx] = useState(0)

  useEffect(() => {
    const id = setInterval(() => {
      setUserIdx(i => (i + 1) % USERS.length)
    }, 4200)
    return () => clearInterval(id)
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, y: 32, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.35 }}
      className="relative w-full flex items-center justify-center py-6"
    >
      {/* Radar rings */}
      <div aria-hidden className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {[120, 210, 300, 390].map((r) => (
          <div
            key={r}
            className="absolute rounded-full border border-gray-100"
            style={{ width: r, height: r }}
          />
        ))}
      </div>

      {/* 3-column layout */}
      <div className="relative flex items-center gap-3 z-10">

        {/* Left column */}
        <div className="flex flex-col gap-3 w-[130px]">
          <Float y={6} duration={4.2} delay={0}>
            <CallConnectedCard />
          </Float>
          <Float y={5} duration={5.0} delay={1.2}>
            <UptimeSLACard />
          </Float>
        </div>

        {/* Center chat */}
        <Float y={4} duration={6.0} delay={0.4}>
          <CentralChatCard user={USERS[userIdx]} />
        </Float>

        {/* Right column */}
        <div className="flex flex-col gap-2.5 w-[145px]">
          <Float y={6} duration={4.6} delay={0.7}>
            <PortInCard />
          </Float>
          <Float y={5} duration={3.8} delay={1.5}>
            <ContextHandoffCard />
          </Float>
        </div>

      </div>
    </motion.div>
  )
}
