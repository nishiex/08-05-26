"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { Phone, PhoneIncoming, Check, Mic, FileText } from "lucide-react"

const A = "#1abcd9"
const D = "#1797ac"
const sp = { type: "spring" as const, stiffness: 110, damping: 20 }

function Title({ children }: { children: React.ReactNode }) {
  return (
    <motion.h2
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ ...sp, delay: 0.04 }}
      className="text-[16px] font-normal italic text-center leading-tight mb-1"
      style={{ color: A, fontFamily: "var(--font-source-serif), Georgia, serif" }}
    >
      {children}
    </motion.h2>
  )
}

// ── Scene 1 ───────────────────────────────────────────────────────────────────

function Scene1() {
  return (
    <div className="flex flex-col items-center gap-6 w-full">
      <Title>A call comes in</Title>

      <div className="flex items-center justify-center gap-8">
        {/* Inbound */}
        <motion.div
          initial={{ x: -22, opacity: 0 }} animate={{ x: 0, opacity: 1 }}
          transition={{ ...sp, delay: 0.12 }}
          className="flex flex-col items-center gap-2 bg-white/80 backdrop-blur rounded-2xl shadow-lg px-5 py-4"
        >
          <PhoneIncoming className="h-6 w-6" style={{ color: A }} />
          <p className="text-[13px] font-mono text-gray-400 tracking-widest uppercase">Inbound</p>
        </motion.div>

        {/* Radar */}
        <div className="relative flex items-center justify-center" style={{ width: 160, height: 160 }}>
          {[48, 90, 132].map((size, i) => (
            <motion.div key={size} className="absolute rounded-full"
              style={{ width: size, height: size, border: `1.5px solid ${A}` }}
              animate={{ scale: [1, 1.25, 1], opacity: [0.45, 0, 0.45] }}
              transition={{ duration: 2.6, delay: i * 0.62, repeat: Infinity, ease: "easeOut" }}
            />
          ))}
          <motion.div
            initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ ...sp, delay: 0.07 }}
            className="relative z-10 h-16 w-16 rounded-full flex items-center justify-center shadow-xl"
            style={{ background: A }}
          >
            <Phone className="h-7 w-7 text-white" />
          </motion.div>
        </div>

        {/* Twiching logo */}
        <motion.div
          initial={{ x: 22, opacity: 0 }} animate={{ x: 0, opacity: 1 }}
          transition={{ ...sp, delay: 0.12 }}
          className="flex flex-col items-center gap-2 rounded-2xl shadow-lg px-5 py-4 bg-white/80 backdrop-blur"
        >
          <Image src="/favicon.png" alt="Twiching" width={24} height={24} className="object-contain" />
          <p className="text-[13px] font-mono text-gray-400 tracking-widest uppercase">Twiching</p>
        </motion.div>
      </div>

      {/* Caller ID */}
      <motion.div
        initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
        transition={{ ...sp, delay: 0.22 }}
        className="bg-white/85 backdrop-blur rounded-2xl shadow-xl px-5 py-4 flex items-center gap-4 w-full max-w-[380px]"
      >
        <div className="h-11 w-11 rounded-full flex items-center justify-center text-white text-[13px] font-normal flex-shrink-0"
          style={{ background: `linear-gradient(135deg, ${A}, ${D})` }}>
          EC
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[15px] font-normal text-gray-900">Ethan Cooper</p>
          <p className="text-[13px] font-mono text-gray-400">New York · +1 917 555 0142</p>
        </div>
        <div className="flex items-center gap-1.5 text-[13px] font-mono px-3 py-1.5 rounded-full flex-shrink-0"
          style={{ background: "#fff0f0", color: "#e53e3e" }}>
          <motion.span className="h-1.5 w-1.5 rounded-full inline-block" style={{ background: "#e53e3e" }}
            animate={{ opacity: [1, 0.2, 1] }} transition={{ duration: 1, repeat: Infinity }} />
          RINGING
        </div>
      </motion.div>

      {/* Channel pill */}
      <motion.div
        initial={{ y: 12, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
        transition={{ ...sp, delay: 0.33 }}
        className="bg-white/80 backdrop-blur rounded-full shadow-lg px-5 py-2.5 flex items-center gap-4"
      >
        <span className="text-[13px] font-mono tracking-[2.5px] text-gray-400 uppercase">Any Channel</span>
        <span className="text-[13px] font-mono text-white px-3 py-1 rounded-full" style={{ background: A }}>Voice</span>
        <span className="text-[13px] font-mono text-gray-400">SMS</span>
        <span className="text-[13px] font-mono text-gray-400">Video</span>
      </motion.div>
    </div>
  )
}

// ── Scene 2 ───────────────────────────────────────────────────────────────────

function Scene2() {
  const [ok, setOk] = useState(false)
  useEffect(() => {
    const t = setTimeout(() => setOk(true), 2400)
    return () => clearTimeout(t)
  }, [])

  const bubbles = [
    { user: true,  text: "Hi — I need to book a demo" },
    { user: false, text: "Happy to help! I have Tue 10am, Tue 2pm, or Thu 3:30pm — which works?" },
    { user: true,  text: "Thursday 3:30 please" },
  ]

  return (
    <div className="flex flex-col items-center gap-5 w-full">
      <Title>AI Agent answers in 0.3s</Title>

      <div className="relative w-full max-w-[380px]" style={{ minHeight: 220 }}>
        <AnimatePresence mode="wait">
          {!ok ? (
            <motion.div key="chat" className="flex flex-col gap-3 w-full"
              initial={{ opacity: 1 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.28 }}
            >
              {bubbles.map((b, i) => (
                <motion.div key={i}
                  initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ ...sp, delay: 0.18 + i * 0.3 }}
                  className={`flex ${b.user ? "justify-end" : "justify-start"}`}
                >
                  <div className="max-w-[82%] px-4 py-2.5 rounded-2xl text-[15px] leading-relaxed"
                    style={b.user
                      ? { background: A, color: "white", borderBottomRightRadius: 5 }
                      : { background: "rgba(255,255,255,0.88)", backdropFilter: "blur(8px)", color: "#282828", borderBottomLeftRadius: 5, boxShadow: "0 2px 14px rgba(0,0,0,0.07)" }
                    }
                  >{b.text}</div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div key="success"
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
              transition={sp}
              className="flex flex-col items-center gap-4 py-6 w-full"
            >
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ ...sp, delay: 0.06 }}
                className="h-14 w-14 rounded-full flex items-center justify-center"
                style={{ background: "rgba(34,197,94,0.12)" }}>
                <Check className="h-7 w-7 text-green-500" strokeWidth={2.2} />
              </motion.div>
              <p className="text-[15px] font-normal text-gray-900">Demo booked · Thursday 3:30 PM</p>
              <div className="flex gap-2 flex-wrap justify-center">
                {["Calendar", "CRM", "Email", "SMS"].map((tag, i) => (
                  <motion.span key={tag}
                    initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                    transition={{ ...sp, delay: 0.15 + i * 0.07 }}
                    className="text-[13px] font-mono px-3 py-1 rounded-full bg-green-50 text-green-600"
                  >{tag}</motion.span>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

// ── Scene 3 (transcript) ──────────────────────────────────────────────────────

const TRANSCRIPT = [
  { speaker: "AGENT",  time: "00:01", text: "Thank you for calling Twiching support. How can I help you today?" },
  { speaker: "CALLER", time: "00:06", text: "Hi, I need to upgrade my account to the Business plan." },
  { speaker: "AGENT",  time: "00:10", text: "Of course! I can see your account right here. Let me pull that up." },
  { speaker: "CALLER", time: "00:15", text: "Will my existing number stay the same after the upgrade?" },
  { speaker: "AGENT",  time: "00:19", text: "Absolutely — your number is fully preserved, no interruptions." },
  { speaker: "CALLER", time: "00:24", text: "And how quickly will the Business features go live?" },
  { speaker: "AGENT",  time: "00:27", text: "Instantly. Processing the upgrade now — all done!" },
]

function Scene5({ onComplete }: { onComplete?: () => void }) {
  const [visible, setVisible] = useState(0)
  const [secs, setSecs] = useState(18)
  const [showSummary, setShowSummary] = useState(false)

  useEffect(() => {
    const t = setInterval(() => setSecs(s => s + 1), 1000)
    return () => clearInterval(t)
  }, [])

  useEffect(() => {
    if (visible < TRANSCRIPT.length) {
      const t = setTimeout(() => setVisible(v => v + 1), 850)
      return () => clearTimeout(t)
    } else {
      const t = setTimeout(() => setShowSummary(true), 600)
      return () => clearTimeout(t)
    }
  }, [visible])

  useEffect(() => {
    if (!showSummary) return
    const t = setTimeout(() => onComplete?.(), 2200)
    return () => clearTimeout(t)
  }, [showSummary, onComplete])

  const fmt = (n: number) =>
    String(Math.floor(n / 60)).padStart(2, "0") + ":" + String(n % 60).padStart(2, "0")

  return (
    <div className="flex flex-col items-center gap-2.5 w-full">
      <Title>Every word, captured live</Title>

      {/* Header */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
        transition={{ ...sp, delay: 0.08 }}
        className="bg-white/85 backdrop-blur rounded-xl shadow-md px-3 py-2 flex items-center gap-2.5 w-full max-w-[340px]"
      >
        <div className="h-7 w-7 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: A }}>
          <Mic className="h-3.5 w-3.5 text-white" strokeWidth={2} />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[13px] font-normal text-gray-900">Live Transcript</p>
          <p className="text-[11px] font-mono text-gray-400 truncate">Ethan Cooper · +1 917 555 0142</p>
        </div>
        <div className="flex items-center gap-1.5 flex-shrink-0">
          <div className="flex items-center gap-1 bg-red-50 rounded-full px-1.5 py-0.5">
            <motion.span className="h-1.5 w-1.5 rounded-full bg-red-500 inline-block"
              animate={{ opacity: [1, 0.2, 1] }} transition={{ duration: 1, repeat: Infinity }} />
            <span className="text-[11px] font-mono text-red-500">REC</span>
          </div>
          <span className="text-[11px] font-mono text-gray-500 tabular-nums">{fmt(secs)}</span>
        </div>
      </motion.div>

      {/* Transcript panel */}
      <div
        className="relative w-full max-w-[340px] bg-white/85 backdrop-blur rounded-xl shadow-md px-3 py-2.5 space-y-1.5 overflow-hidden"
        style={{ minHeight: 200 }}
      >
        {TRANSCRIPT.slice(0, visible).map((line, i) => (
          <motion.div key={i}
            initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
            transition={{ ...sp }}
            className="flex items-start gap-1.5"
          >
            <span className="text-[10px] font-mono text-gray-400 pt-0.5 w-9 flex-shrink-0 tabular-nums">{line.time}</span>
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-full flex-shrink-0 mt-0.5"
              style={line.speaker === "AGENT"
                ? { background: A, color: "white" }
                : { background: "#f0f0f0", color: "#555" }
              }
            >{line.speaker}</span>
            <p className="text-[13px] font-normal text-gray-700 leading-snug">{line.text}</p>
          </motion.div>
        ))}

        {/* Typing cursor */}
        {visible > 0 && visible < TRANSCRIPT.length && (
          <div className="flex items-center gap-1.5 pl-[84px]">
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-full"
              style={{ background: A + "30", color: D }}>
              {TRANSCRIPT[visible].speaker}
            </span>
            <motion.span className="h-3 w-px bg-gray-400 inline-block"
              animate={{ opacity: [1, 0, 1] }} transition={{ duration: 0.65, repeat: Infinity }} />
          </div>
        )}
      </div>

      {/* AI Summary */}
      <AnimatePresence>
        {showSummary && (
          <motion.div
            initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
            transition={{ ...sp }}
            className="w-full max-w-[340px] rounded-xl px-3 py-2.5 flex items-start gap-2.5"
            style={{ background: "rgba(26,188,217,0.10)", border: "1px solid rgba(26,188,217,0.18)" }}
          >
            <FileText className="h-3.5 w-3.5 flex-shrink-0 mt-0.5" style={{ color: D }} strokeWidth={1.8} />
            <div>
              <p className="text-[10px] font-mono tracking-widest uppercase mb-1" style={{ color: D }}>AI Summary</p>
              <p className="text-[13px] font-normal text-gray-700 leading-snug">
                Customer upgrading to Business plan. Number portability confirmed. No issues raised.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// ── Main export ───────────────────────────────────────────────────────────────

export function CallFlowStory() {
  const [scene, setScene] = useState(0)
  const advance = () => setScene(s => (s + 1) % 3)

  useEffect(() => {
    if (scene === 2) return // transcript self-advances via onComplete
    const t = setInterval(advance, 7000)
    return () => clearInterval(t)
  }, [scene])

  return (
    <div className="relative w-full flex flex-col items-center justify-center" style={{ minHeight: 480 }}>

      {/* Scene content */}
      <div className="relative z-10 w-full max-w-[440px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={scene}
            initial={{ opacity: 0, scale: 0.97, y: 14 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: -14 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            {scene === 0 && <Scene1 />}
            {scene === 1 && <Scene2 />}
            {scene === 2 && <Scene5 onComplete={advance} />}
          </motion.div>
        </AnimatePresence>
      </div>

    </div>
  )
}
