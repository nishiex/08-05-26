"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { gsap } from "gsap"
import {
  Phone, Video, MoreVertical, Send, Plus, Clock, Mail, Calendar,
  Check, Edit3, Zap, MessageSquare as MsgIcon, ShieldCheck, Bot, Hash,
} from "lucide-react"

if (typeof window !== "undefined") {
  const { ScrollTrigger } = require("gsap/ScrollTrigger")
  gsap.registerPlugin(ScrollTrigger)
}

const MESSAGES = [
  { id: 1, from: "user",  text: "Hi, I'd like to schedule a consultation" },
  { id: 2, from: "agent", text: "Of course! I have availability tomorrow at 2 PM" },
  { id: 3, from: "user",  text: "That works perfectly for me" },
  { id: 4, from: "agent", text: "hello" },
  { id: 5, from: "user",  text: "Hello! How are you? 😊" },
]

const SIDEBAR_CHATS = [
  { name: "Sarah Mitchell", preview: "Appointment confirmed...", time: "2m", active: true },
  { name: "James R.",       preview: "...the quick re...",       time: "15m" },
  { name: "Ana M.",         preview: "3pm today",                time: "1h" },
  { name: "Carlos V.",      preview: "...and the report?",       time: "2h" },
  { name: "Lin K.",         preview: "...on the prese...",       time: "3h" },
]

const ACTIVITY = [
  { Icon: Phone,    label: "Call · 12 min",     time: "Yesterday" },
  { Icon: Mail,     label: "Email opened",       time: "2 days ago" },
  { Icon: Calendar, label: "Meeting booked",     time: "1 week ago" },
]

// ── Floating notification pills ───────────────────────────────────────────────
const FLOAT_CARDS = [
  {
    badge: "PORT-IN", badgeColor: "bg-amber-100 text-amber-700",
    Icon: Zap, iconColor: "text-amber-600",
    title: "Number Ported",
    sub: "+1 415 808 · Zero fees",
    pos: "top-[-18px] left-[-24px]",
    delay: 0, duration: 3.2,
  },
  {
    badge: "CALL LIVE", badgeColor: "bg-emerald-100 text-emerald-700",
    Icon: Phone, iconColor: "text-emerald-600",
    title: "Inbound Connected",
    sub: "Sales · Atlanta · 0.9s",
    pos: "top-[60px] right-[-28px]",
    delay: 0.6, duration: 4.0,
  },
  {
    badge: "SMS SENT", badgeColor: "bg-[#e0f7fa] text-accent",
    Icon: MsgIcon, iconColor: "text-accent",
    title: "12,480 Delivered",
    sub: "98.4% delivery · 10DLC",
    pos: "bottom-[60px] right-[-28px]",
    delay: 1.1, duration: 3.6,
  },
  {
    badge: "AI HANDLED", badgeColor: "bg-purple-100 text-purple-700",
    Icon: Bot, iconColor: "text-purple-600",
    title: "Demo Booked",
    sub: "Thursday 10am · Auto",
    pos: "bottom-[-18px] left-[30%]",
    delay: 0.4, duration: 4.4,
  },
]

function FloatCard({ card, index }: { card: typeof FLOAT_CARDS[0]; index: number }) {
  const { Icon } = card
  return (
    <motion.div
      initial={{ opacity: 0, y: 12, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: 0.8 + index * 0.15, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className={`float-card absolute ${card.pos} z-30 bg-white rounded-2xl shadow-[0_8px_28px_-6px_rgba(0,0,0,0.16)] border border-white/80 px-3 py-2.5 pointer-events-none min-w-[148px]`}
    >
      <div className={`inline-flex items-center gap-1 ${card.badgeColor} text-[8px] font-bold px-2 py-0.5 rounded-full mb-1.5`}>
        <Icon className={`h-2.5 w-2.5 ${card.iconColor}`} strokeWidth={2.4} />
        {card.badge}
      </div>
      <p className="text-[11px] font-bold text-gray-900 leading-tight">{card.title}</p>
      <p className="text-[9px] font-mono text-gray-400 mt-0.5">{card.sub}</p>
    </motion.div>
  )
}

// ── Right sidebar: Customer Info ──────────────────────────────────────────────
function CustomerInfo() {
  return (
    <div className="w-[170px] flex-shrink-0 bg-white/60 backdrop-blur-sm border-l border-white/50 flex flex-col p-3 overflow-y-auto">
      <div className="flex items-center justify-between mb-3">
        <span className="text-[10px] font-bold text-gray-700">Customer Info</span>
        <MoreVertical className="h-3 w-3 text-gray-400" />
      </div>

      {/* Avatar + profile */}
      <div className="flex flex-col items-center text-center mb-3">
        <div className="h-10 w-10 rounded-full bg-gradient-to-br from-[#1abcd9] to-[#1797ac] flex items-center justify-center mb-1.5 shadow-md">
          <span className="text-white text-[11px] font-bold">SM</span>
        </div>
        <p className="text-[11px] font-bold text-gray-900">Sarah Mitchell</p>
        <p className="text-[8px] text-gray-400 font-mono mt-0.5 leading-tight">sarah.mitchell@company.com</p>
        <div className="flex gap-1 mt-1.5">
          <span className="bg-amber-100 text-amber-700 text-[7px] font-bold px-1.5 py-0.5 rounded-full">VIP</span>
          <span className="bg-[#e0f7fa] text-accent text-[7px] font-bold px-1.5 py-0.5 rounded-full">Enterprise</span>
        </div>
      </div>

      {/* Recent activity */}
      <div className="mb-3">
        <p className="text-[8px] font-mono font-bold tracking-[1.5px] uppercase text-gray-400 mb-2">Recent Activity</p>
        <div className="space-y-2">
          {ACTIVITY.map(({ Icon, label, time }) => (
            <div key={label} className="flex items-start gap-1.5">
              <Icon className="h-2.5 w-2.5 text-gray-400 mt-0.5 flex-shrink-0" strokeWidth={2} />
              <div className="flex-1 min-w-0">
                <p className="text-[9px] font-semibold text-gray-700 leading-tight truncate">{label}</p>
                <p className="text-[8px] text-gray-400 font-mono">{time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Customer value */}
      <div className="mb-3">
        <p className="text-[8px] font-mono font-bold tracking-[1.5px] uppercase text-gray-400 mb-2">Customer Value</p>
        <div className="grid grid-cols-2 gap-1">
          <div className="bg-gray-50 rounded-xl p-2 text-center">
            <p className="text-[11px] font-bold text-gray-900">$24.5k</p>
            <p className="text-[7px] font-mono text-gray-400 uppercase leading-tight">Lifetime</p>
          </div>
          <div className="bg-gray-50 rounded-xl p-2 text-center">
            <p className="text-[11px] font-bold text-gray-900">18</p>
            <p className="text-[7px] font-mono text-gray-400 uppercase leading-tight">Interactions</p>
          </div>
        </div>
      </div>

      {/* Sentiment */}
      <div>
        <p className="text-[8px] font-mono font-bold tracking-[1.5px] uppercase text-gray-400 mb-1.5">Sentiment</p>
        <div className="h-1.5 rounded-full bg-gray-100 overflow-hidden">
          <div className="h-full w-[88%] rounded-full bg-gradient-to-r from-accent to-[#1797ac]" />
        </div>
        <p className="text-[8px] font-mono text-gray-500 mt-1">Very Positive</p>
      </div>
    </div>
  )
}

// ── Main export ───────────────────────────────────────────────────────────────
export function CRMDashboard() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ref.current) return
    const ctx = gsap.context(() => {
      // Float each card independently
      const cards = ref.current!.querySelectorAll(".float-card")
      cards.forEach((card, i) => {
        gsap.to(card, {
          y: i % 2 === 0 ? -10 : -8,
          duration: FLOAT_CARDS[i]?.duration ?? 3.5,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
          delay: FLOAT_CARDS[i]?.delay ?? 0,
        })
      })
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 44, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
      className="relative w-full"
    >
      {/* Floating notification pills */}
      {FLOAT_CARDS.map((card, i) => (
        <FloatCard key={card.badge} card={card} index={i} />
      ))}

      {/* Soft floor glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-8 left-1/2 -translate-x-1/2 h-16 w-[80%] rounded-full"
        style={{ background: "radial-gradient(ellipse, rgba(26,188,217,0.20), transparent 70%)", filter: "blur(18px)" }}
      />

      {/* App shell */}
      <div
        className="relative rounded-[22px] overflow-hidden border border-white/40 shadow-[0_40px_80px_-20px_rgba(15,23,42,0.28),0_8px_24px_-8px_rgba(26,188,217,0.18)]"
        style={{ height: 480 }}
      >
        {/* Site-palette gradient background */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, #e0f7fa 0%, #b2e8f0 30%, #ffffff 60%, #e0f7fa 100%)",
          }}
        />
        {/* Soft radial glow top-right */}
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(600px 400px at 80% 10%, rgba(26,188,217,0.18), transparent 65%), radial-gradient(400px 300px at 10% 90%, rgba(23,151,172,0.12), transparent 65%)",
          }}
        />
        {/* Frosted overlay */}
        <div className="absolute inset-0 bg-white/30 backdrop-blur-[2px]" />

        {/* Top nav */}
        <div className="relative z-10 flex items-center px-3 py-2 bg-white/40 backdrop-blur-sm border-b border-white/30">
          <div className="flex gap-1 mr-3">
            <span className="w-2 h-2 rounded-full bg-red-400/80" />
            <span className="w-2 h-2 rounded-full bg-yellow-400/80" />
            <span className="w-2 h-2 rounded-full bg-emerald-400/80" />
          </div>
          <span className="text-[10px] font-mono text-gray-500">Twiching App</span>
        </div>

        {/* Main area */}
        <div className="relative z-10 flex h-[calc(100%-36px)]">

          {/* Left sidebar: Messages list */}
          <div className="w-[130px] flex-shrink-0 bg-white/50 backdrop-blur-sm border-r border-white/40 flex flex-col">
            <div className="flex items-center justify-between px-3 py-2.5 border-b border-white/40">
              <span className="text-[10px] font-bold text-gray-700">Messages</span>
              <Edit3 className="h-2.5 w-2.5 text-gray-400" />
            </div>
            <div className="flex-1 overflow-y-auto">
              {SIDEBAR_CHATS.map((c) => (
                <div
                  key={c.name}
                  className={`flex items-start gap-2 px-2.5 py-2 border-b border-white/30 cursor-pointer ${
                    c.active ? "bg-white/60" : "hover:bg-white/30"
                  }`}
                >
                  <div className="h-5 w-5 rounded-full bg-gradient-to-br from-accent to-[#1797ac] flex-shrink-0 mt-0.5 flex items-center justify-center">
                    <span className="text-white text-[6px] font-bold">{c.name.slice(0, 2).toUpperCase()}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="text-[8px] font-bold text-gray-800 truncate">{c.name}</p>
                      <span className="text-[7px] font-mono text-gray-400 flex-shrink-0 ml-1">{c.time}</span>
                    </div>
                    <p className="text-[7px] text-gray-500 truncate mt-0.5">{c.preview}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Center: chat + floating widgets */}
          <div className="flex-1 flex flex-col relative min-w-0">
            {/* Chat header */}
            <div className="flex items-center justify-between px-3 py-2 bg-white/40 backdrop-blur-sm border-b border-white/30">
              <div>
                <p className="text-[11px] font-bold text-gray-900">Sarah Mitchell</p>
                <div className="flex items-center gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  <span className="text-[8px] font-mono text-emerald-600">Online</span>
                </div>
              </div>
              <div className="flex items-center gap-1.5">
                <button className="h-6 w-6 rounded-full bg-white/60 flex items-center justify-center hover:bg-white/80 transition">
                  <Phone className="h-2.5 w-2.5 text-gray-600" />
                </button>
                <button className="h-6 w-6 rounded-full bg-white/60 flex items-center justify-center hover:bg-white/80 transition">
                  <Video className="h-2.5 w-2.5 text-gray-600" />
                </button>
                <button className="h-6 w-6 rounded-full bg-white/60 flex items-center justify-center hover:bg-white/80 transition">
                  <MoreVertical className="h-2.5 w-2.5 text-gray-600" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-3 py-3 space-y-2">
              {MESSAGES.map((m) => (
                <div key={m.id} className={`flex ${m.from === "agent" ? "justify-end" : "justify-start"}`}>
                  {m.from === "user" && (
                    <div className="h-5 w-5 rounded-full bg-gradient-to-br from-accent to-[#1797ac] flex-shrink-0 mr-1.5 mt-0.5 flex items-center justify-center self-end">
                      <span className="text-white text-[6px] font-bold">SM</span>
                    </div>
                  )}
                  <div
                    className={`max-w-[72%] px-2.5 py-1.5 rounded-2xl text-[9px] leading-relaxed ${
                      m.from === "agent"
                        ? "bg-[#1797ac] text-white rounded-br-sm"
                        : "bg-white/80 text-gray-800 rounded-bl-sm shadow-sm"
                    }`}
                  >
                    {m.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Input */}
            <div className="flex items-center gap-2 px-3 py-2 bg-white/40 backdrop-blur-sm border-t border-white/30">
              <button className="h-5 w-5 rounded-full bg-white/60 flex items-center justify-center flex-shrink-0">
                <Plus className="h-2.5 w-2.5 text-gray-600" />
              </button>
              <div className="flex-1 bg-white/60 rounded-full px-3 py-1">
                <span className="text-[8px] font-mono text-gray-400">Type a message...</span>
              </div>
              <button className="h-6 w-6 rounded-full bg-accent flex items-center justify-center flex-shrink-0">
                <Send className="h-2.5 w-2.5 text-white" />
              </button>
            </div>

          </div>

          {/* Right sidebar: Customer Info */}
          <CustomerInfo />
        </div>
      </div>
    </motion.div>
  )
}
