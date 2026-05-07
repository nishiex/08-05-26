"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Mic, Search, ShieldCheck, Check } from "lucide-react"

// ─── Easing ───────────────────────────────────────────────────────────────────
const EXPO   = [0.16, 1, 0.3, 1] as const
const CUBIC  = [0.4, 0, 0.2, 1] as const
const SPRING = { type: "spring" as const, stiffness: 280, damping: 26 }

const A     = "#1abcd9"
const A2    = "#1797ac"
const GLOW  = "rgba(26,188,217,0.18)"

// ─── Shared scene wrapper ─────────────────────────────────────────────────────
function SceneShell({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28, scale: 0.97, filter: "blur(6px)" }}
      animate={{ opacity: 1, y: 0,  scale: 1,    filter: "blur(0px)" }}
      exit={{ opacity: 0, y: -20, scale: 0.97, filter: "blur(4px)" }}
      transition={{ duration: 0.55, ease: EXPO }}
      style={{
        background: "rgba(255,255,255,0.82)",
        backdropFilter: "blur(20px) saturate(180%)",
        WebkitBackdropFilter: "blur(20px) saturate(180%)",
        border: "1px solid rgba(255,255,255,0.9)",
        boxShadow: `0 24px 64px -16px rgba(0,0,0,0.10), 0 0 0 1px rgba(26,188,217,0.08), inset 0 1px 0 rgba(255,255,255,0.95)`,
      }}
      className="relative rounded-[28px] p-7 w-full max-w-[480px] overflow-hidden"
    >
      {/* ambient glow */}
      <div aria-hidden className="pointer-events-none absolute -top-16 -right-16 w-56 h-56 rounded-full"
        style={{ background: `radial-gradient(circle, ${GLOW} 0%, transparent 70%)` }} />
      {children}
    </motion.div>
  )
}

// ─── Stagger helpers ──────────────────────────────────────────────────────────
const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09 } },
}
const itemVariants = {
  hidden: { opacity: 0, y: 18, scale: 0.97, rotateX: 4 },
  show:   { opacity: 1, y: 0,  scale: 1,    rotateX: 0,
            transition: { duration: 0.5, ease: EXPO } },
}

// ─── Pill badge ───────────────────────────────────────────────────────────────
function Pill({ children, color = A, bg }: { children: React.ReactNode; color?: string; bg?: string }) {
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }}
      transition={SPRING}
      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono font-bold tracking-wide"
      style={{ background: bg ?? `${color}22`, color, border: `1px solid ${color}33` }}
    >
      {children}
    </motion.span>
  )
}

// ─── SCENE 1 · Recording ──────────────────────────────────────────────────────
const BAR_HEIGHTS = [12, 24, 16, 30, 19, 33, 13, 27, 21, 31, 12, 25, 18, 28, 11, 22]

function Scene1() {
  const [secs, setSecs] = useState(47)
  useEffect(() => {
    const id = setInterval(() => setSecs(s => s + 1), 1000)
    return () => clearInterval(id)
  }, [])
  const fmt = (n: number) => `0:${String(n).padStart(2, "0")}`

  return (
    <SceneShell>
      <motion.div variants={containerVariants} initial="hidden" animate="show" className="space-y-5">

        {/* header */}
        <motion.div variants={itemVariants} className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <motion.div
              animate={{ boxShadow: [`0 0 0 0 ${A}44`, `0 0 0 10px ${A}00`] }}
              transition={{ duration: 1.8, repeat: Infinity }}
              className="h-12 w-12 rounded-full flex items-center justify-center flex-shrink-0"
              style={{ background: `linear-gradient(135deg, #e0f7fa, #b2ebf2)` }}
            >
              <Mic className="h-5 w-5" style={{ color: A }} strokeWidth={2} />
            </motion.div>
            <div>
              <p className="text-[15px] font-semibold text-gray-900 leading-tight">Sarah Mitchell</p>
              <p className="text-[11px] font-mono text-gray-400">+1 312 555 0192 · Inbound</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <motion.span
              animate={{ opacity: [1, 0.2, 1], scale: [1, 0.85, 1] }}
              transition={{ duration: 1.1, repeat: Infinity, ease: CUBIC }}
              className="block h-2.5 w-2.5 rounded-full bg-red-500"
            />
            <span className="text-[12px] font-mono font-bold text-red-500 tracking-wide">REC</span>
          </div>
        </motion.div>

        {/* waveform */}
        <motion.div variants={itemVariants}
          className="flex items-end gap-[4px] h-20 px-2 rounded-2xl py-3"
          style={{ background: "linear-gradient(180deg, rgba(26,188,217,0.04) 0%, rgba(26,188,217,0.08) 100%)" }}
        >
          {BAR_HEIGHTS.map((h, i) => (
            <motion.div
              key={i}
              className="flex-1 rounded-full"
              style={{ background: `linear-gradient(180deg, ${A} 0%, ${A2} 100%)` }}
              animate={{ height: [`${h * 0.7}px`, `${h}px`, `${h * 0.5}px`, `${h * 0.9}px`, `${h * 0.7}px`] }}
              transition={{ duration: 1.4 + (i % 4) * 0.18, delay: i * 0.04, repeat: Infinity, ease: "easeInOut" }}
            />
          ))}
        </motion.div>

        {/* timer */}
        <motion.div variants={itemVariants} className="flex items-end justify-between">
          <div>
            <motion.p
              key={secs}
              initial={{ opacity: 0.6, y: -4 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              className="text-[42px] font-mono font-light text-gray-900 leading-none tracking-tight"
            >
              {fmt(secs)}
            </motion.p>
            <p className="text-[11px] font-mono text-gray-400 mt-1.5">AES-256 · auto-saved to record</p>
          </div>
          <Pill color={A}>● Recording</Pill>
        </motion.div>

      </motion.div>
    </SceneShell>
  )
}

// ─── SCENE 2 · Live Transcript ────────────────────────────────────────────────
const TX_LINES = [
  { spk: "Agent",    text: "Hi Sarah, thanks for calling. How can I help today?" },
  { spk: "Customer", text: "I need to update my billing details, please." },
  { spk: "Agent",    text: "Of course — can I confirm your account number first?" },
  { spk: "Customer", text: "Sure, it's the one ending in 3821." },
]

function Scene2() {
  const [count, setCount] = useState(1)
  useEffect(() => {
    const id = setInterval(() => setCount(c => Math.min(c + 1, TX_LINES.length)), 950)
    return () => clearInterval(id)
  }, [])

  return (
    <SceneShell>
      <motion.div variants={containerVariants} initial="hidden" animate="show" className="space-y-5">

        <motion.div variants={itemVariants} className="flex items-center justify-between">
          <p className="text-[12px] font-mono font-bold tracking-[1.8px] uppercase" style={{ color: A }}>
            Live Transcript
          </p>
          <Pill color="#22c55e">● AI Transcribing</Pill>
        </motion.div>

        <div className="space-y-3 min-h-[180px]">
          <AnimatePresence>
            {TX_LINES.slice(0, count).map((l, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10, filter: "blur(3px)" }}
                animate={{ opacity: 1, y: 0,  filter: "blur(0px)" }}
                transition={{ duration: 0.4, ease: EXPO }}
                className="flex gap-2.5 items-start"
              >
                <span
                  className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-md flex-shrink-0 mt-0.5 tracking-wide"
                  style={l.spk === "Agent"
                    ? { background: `${A}18`, color: A }
                    : { background: "#f1f5f9", color: "#64748b" }
                  }
                >
                  {l.spk.toUpperCase()}
                </span>
                <p className="text-[14px] text-gray-700 leading-relaxed">{l.text}</p>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <motion.p variants={itemVariants} className="text-[11px] font-mono text-gray-400">
          Delivered in ~30s after hangup · Searchable immediately
        </motion.p>

      </motion.div>
    </SceneShell>
  )
}

// ─── SCENE 3 · Auto-Redaction ─────────────────────────────────────────────────
function Scene3() {
  const [phase, setPhase] = useState<"plain" | "detecting" | "redacted">("plain")
  useEffect(() => {
    const t1 = setTimeout(() => setPhase("detecting"), 700)
    const t2 = setTimeout(() => setPhase("redacted"),  1600)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [])

  return (
    <SceneShell>
      <motion.div variants={containerVariants} initial="hidden" animate="show" className="space-y-5">

        <motion.div variants={itemVariants} className="flex items-center gap-3">
          <motion.div
            animate={phase === "redacted"
              ? { boxShadow: [`0 0 0 0 rgba(34,197,94,0.4)`, `0 0 0 12px rgba(34,197,94,0)`] }
              : {}}
            transition={{ duration: 1.2, repeat: phase === "redacted" ? 2 : 0 }}
            className="h-12 w-12 rounded-full flex items-center justify-center flex-shrink-0"
            style={{ background: phase === "redacted" ? "rgba(34,197,94,0.12)" : `${A}18` }}
          >
            <ShieldCheck className="h-5 w-5" style={{ color: phase === "redacted" ? "#22c55e" : A }} strokeWidth={2} />
          </motion.div>
          <div>
            <p className="text-[13px] font-mono font-bold tracking-[1.6px] uppercase" style={{ color: A }}>
              Auto-Redaction
            </p>
            <p className="text-[11px] font-mono text-gray-400">Card numbers · IDs · Custom patterns</p>
          </div>
        </motion.div>

        {/* the redaction moment */}
        <motion.div
          variants={itemVariants}
          animate={phase === "detecting"
            ? { boxShadow: "0 0 0 2px rgba(251,146,60,0.5)" }
            : phase === "redacted"
            ? { boxShadow: "0 0 0 2px rgba(34,197,94,0.4)" }
            : { boxShadow: "0 0 0 1px rgba(0,0,0,0.06)" }
          }
          transition={{ duration: 0.35 }}
          className="rounded-2xl p-4"
          style={{ background: "rgba(0,0,0,0.025)" }}
        >
          <p className="text-[11px] font-mono text-gray-400 mb-2.5 tracking-wide">TRANSCRIPT · 1:42</p>
          <p className="text-[15px] text-gray-800 leading-relaxed">
            "My card number is{" "}
            <AnimatePresence mode="wait">
              {phase === "plain" && (
                <motion.span key="p" className="font-mono text-orange-500" exit={{ opacity: 0, filter: "blur(4px)" }} transition={{ duration: 0.25 }}>
                  4929 1234 5678 3456
                </motion.span>
              )}
              {phase === "detecting" && (
                <motion.span key="d" initial={{ opacity: 0 }} animate={{ opacity: [0.4, 1, 0.4] }}
                  transition={{ duration: 0.4, repeat: 2 }}
                  className="font-mono text-orange-400 underline decoration-dotted">
                  4929 1234 5678 3456
                </motion.span>
              )}
              {phase === "redacted" && (
                <motion.span key="r"
                  initial={{ opacity: 0, letterSpacing: "0.05em" }}
                  animate={{ opacity: 1, letterSpacing: "0.18em" }}
                  transition={{ duration: 0.4, ease: EXPO }}
                  className="font-mono font-bold text-gray-800"
                >
                  ████ ████ ████ ████
                </motion.span>
              )}
            </AnimatePresence>
            "
          </p>
        </motion.div>

        <AnimatePresence>
          {phase === "redacted" && (
            <motion.div
              key="done"
              initial={{ opacity: 0, y: 8, scale: 0.94 }}
              animate={{ opacity: 1, y: 0,  scale: 1 }}
              transition={SPRING}
              className="flex items-center gap-2"
            >
              <Pill color="#22c55e">
                <Check className="h-3 w-3" strokeWidth={3} />
                Redacted in audio + transcript
              </Pill>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.p variants={itemVariants} className="text-[11px] font-mono text-gray-400">
          QA reviews freely — no security flags
        </motion.p>

      </motion.div>
    </SceneShell>
  )
}

// ─── SCENE 4 · Keyword Search ─────────────────────────────────────────────────
const RESULTS = [
  { initials: "DO", name: "David Osei",     time: "14:22", snip: "…mentioned the cancellation policy…" },
  { initials: "AD", name: "Amara Diallo",   time: "11:08", snip: "…asked about the cancellation fee…" },
  { initials: "JN", name: "James Nkrumah",  time: "Yesterday", snip: "…escalated over cancellation terms…" },
]

function Scene4() {
  const [shown, setShown] = useState(0)
  const [count, setCount] = useState(0)
  useEffect(() => {
    const ri = setInterval(() => setShown(v => Math.min(v + 1, RESULTS.length)), 420)
    const ci = setInterval(() => setCount(c => Math.min(c + 412, 12438)), 30)
    return () => { clearInterval(ri); clearInterval(ci) }
  }, [])

  return (
    <SceneShell>
      <motion.div variants={containerVariants} initial="hidden" animate="show" className="space-y-4">

        {/* search bar */}
        <motion.div variants={itemVariants}
          className="flex items-center gap-3 rounded-2xl px-4 py-3"
          style={{ background: "rgba(0,0,0,0.032)", border: "1px solid rgba(26,188,217,0.2)" }}
        >
          <Search className="h-4.5 w-4.5 text-gray-400 flex-shrink-0" strokeWidth={2} />
          <span className="text-[15px] font-mono text-gray-800">cancellation</span>
          <motion.span
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 0.9, repeat: Infinity }}
            className="inline-block w-0.5 h-4 rounded-full ml-0.5 align-middle"
            style={{ background: A }}
          />
        </motion.div>

        {/* count */}
        <motion.div variants={itemVariants} className="flex items-center justify-between">
          <p className="text-[11px] font-mono text-gray-400">
            <motion.span className="font-bold" style={{ color: A }}>
              {count.toLocaleString()}
            </motion.span>
            {" "}calls indexed
          </p>
          <Pill color={A}>{shown} result{shown !== 1 ? "s" : ""}</Pill>
        </motion.div>

        {/* results */}
        <div className="space-y-1.5 min-h-[140px]">
          <AnimatePresence>
            {RESULTS.slice(0, shown).map((r, i) => (
              <motion.a
                key={i}
                href="#"
                onClick={e => e.preventDefault()}
                initial={{ opacity: 0, x: -10, filter: "blur(3px)" }}
                animate={{ opacity: 1, x: 0,   filter: "blur(0px)" }}
                transition={{ duration: 0.35, ease: EXPO }}
                whileHover={{ x: 3, backgroundColor: "rgba(26,188,217,0.05)" }}
                className="flex items-center gap-3 p-2.5 rounded-xl cursor-default transition-colors"
              >
                <div className="h-9 w-9 rounded-full flex items-center justify-center flex-shrink-0 text-white text-[11px] font-bold"
                  style={{ background: `linear-gradient(135deg, ${A}, ${A2})` }}>
                  {r.initials}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-1">
                    <p className="text-[13px] font-semibold text-gray-900 truncate">{r.name}</p>
                    <p className="text-[11px] font-mono text-gray-400 flex-shrink-0">{r.time}</p>
                  </div>
                  <p className="text-[12px] text-gray-500 leading-snug truncate">{r.snip}</p>
                </div>
              </motion.a>
            ))}
          </AnimatePresence>
        </div>

        <motion.p variants={itemVariants} className="text-[11px] font-mono text-gray-400">
          Under 1s across your full call library
        </motion.p>

      </motion.div>
    </SceneShell>
  )
}

// ─── Scene registry ───────────────────────────────────────────────────────────
const SCENES = [
  { key: "rec",     label: "Recording",   icon: Mic,         Scene: Scene1 },
  { key: "tx",      label: "Transcript",  icon: Mic,         Scene: Scene2 },
  { key: "redact",  label: "Redaction",   icon: ShieldCheck, Scene: Scene3 },
  { key: "search",  label: "Search",      icon: Search,      Scene: Scene4 },
]

// ─── Main export ──────────────────────────────────────────────────────────────
export function CallRecordingStory() {
  const [idx, setIdx] = useState(0)
  const [mounted, setMounted] = useState(false)
  useEffect(() => { setMounted(true) }, [])
  useEffect(() => {
    const id = setInterval(() => setIdx(i => (i + 1) % SCENES.length), 4400)
    return () => clearInterval(id)
  }, [])

  const { Scene, key } = SCENES[idx]

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.96, filter: "blur(8px)" }}
      animate={mounted ? { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" } : {}}
      transition={{ duration: 0.75, ease: EXPO }}
      className="relative w-full flex flex-col items-center gap-7"
      style={{ perspective: "1000px" }}
    >
      {/* ambient background glow — breathes slowly */}
      <motion.div
        aria-hidden
        animate={{ scale: [1, 1.06, 1], opacity: [0.35, 0.55, 0.35] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full"
        style={{ background: `radial-gradient(circle, ${GLOW} 0%, transparent 70%)`, zIndex: 0 }}
      />

      {/* scene area */}
      <div className="relative z-10 w-full flex items-center justify-center min-h-[260px]">
        <AnimatePresence mode="wait">
          <Scene key={key} />
        </AnimatePresence>
      </div>

      {/* step indicators */}
      <div className="relative z-10 flex items-center gap-5">
        {SCENES.map((s, i) => (
          <motion.button
            key={s.key}
            onClick={() => setIdx(i)}
            className="flex flex-col items-center gap-1.5 group"
            whileTap={{ scale: 0.92 }}
          >
            <motion.div
              animate={{
                width: i === idx ? 32 : 8,
                background: i === idx
                  ? `linear-gradient(90deg, ${A}, ${A2})`
                  : "#e2e8f0",
                boxShadow: i === idx ? `0 0 10px ${A}55` : "none",
              }}
              transition={{ duration: 0.4, ease: EXPO }}
              className="h-1.5 rounded-full"
            />
            <motion.span
              animate={{ opacity: i === idx ? 1 : 0.4, y: i === idx ? 0 : 1 }}
              transition={{ duration: 0.3 }}
              className="text-[11px] font-mono font-bold tracking-wide"
              style={{ color: i === idx ? A : "#94a3b8" }}
            >
              {s.label.toUpperCase()}
            </motion.span>
          </motion.button>
        ))}
      </div>
    </motion.div>
  )
}
