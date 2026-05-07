"use client"

import { useEffect, useRef, useState } from "react"

/* ------------------------------------------------------------------ */
/*  Hooks                                                              */
/* ------------------------------------------------------------------ */

function useInView<T extends HTMLElement>(threshold = 0.3) {
  const ref = useRef<T | null>(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    if (!ref.current) return
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setInView(true)
            obs.disconnect()
          }
        })
      },
      { threshold },
    )
    obs.observe(ref.current)
    return () => obs.disconnect()
  }, [threshold])
  return { ref, inView }
}

function useCountUp(target: number, start: boolean, duration = 1400, decimals = 0) {
  const [value, setValue] = useState(0)
  useEffect(() => {
    if (!start) return
    const startTs = performance.now()
    let raf = 0
    const step = (now: number) => {
      const p = Math.min((now - startTs) / duration, 1)
      const ease = 1 - Math.pow(1 - p, 3)
      const v = ease * target
      setValue(decimals ? Number(v.toFixed(decimals)) : Math.floor(v))
      if (p < 1) raf = requestAnimationFrame(step)
      else setValue(target)
    }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [start, target, duration, decimals])
  return value
}

/* ------------------------------------------------------------------ */
/*  Phone screens — the visceral compare                               */
/* ------------------------------------------------------------------ */

function PhoneFrame({
  variant,
  caller,
  subline,
  ringtag,
  start,
}: {
  variant: "declined" | "answered"
  caller: string
  subline: string
  ringtag: string
  start: boolean
}) {
  const isAnswered = variant === "answered"
  const accent = isAnswered ? "#1abcd9" : "#6b7280"

  return (
    <div className="relative">
      {/* Editorial caption above the phone */}
      <div className="flex items-center gap-2 mb-5">
        <span
          className="text-[10px] font-mono tracking-[2px] uppercase"
          style={{ color: isAnswered ? "#0f7a8e" : "#9ca3af" }}
        >
          {isAnswered ? "Local area code" : "Unknown prefix"}
        </span>
        <span className="h-px flex-1" style={{ background: isAnswered ? "#0f7a8e33" : "#d1d5db" }} />
        <span
          className="text-[10px] font-mono tabular-nums"
          style={{ color: isAnswered ? "#0f7a8e" : "#9ca3af" }}
        >
          {isAnswered ? "60% answer" : "15% answer"}
        </span>
      </div>

      {/* Phone body */}
      <div
        className={`relative mx-auto rounded-[40px] p-3 transition-transform duration-700 ${
          isAnswered ? "rotate-[-2deg]" : "rotate-[2deg]"
        }`}
        style={{
          width: "min(100%, 320px)",
          background: isAnswered ? "#0c1115" : "#1a1a1a",
          boxShadow: isAnswered
            ? "0 30px 60px -20px rgba(26,188,217,0.35), 0 0 0 1px rgba(149,217,232,0.18)"
            : "0 30px 60px -25px rgba(0,0,0,0.45), 0 0 0 1px rgba(255,255,255,0.04)",
        }}
      >
        {/* Notch */}
        <div className="absolute left-1/2 -translate-x-1/2 top-3 h-5 w-24 rounded-full bg-black/80 z-10" />

        <div
          className="relative rounded-[28px] overflow-hidden h-[440px] flex flex-col"
          style={{
            background: isAnswered
              ? "linear-gradient(170deg, #0a1a20 0%, #0c1115 55%, #061013 100%)"
              : "linear-gradient(170deg, #1a1a1a 0%, #0d0d0d 100%)",
          }}
        >
          {/* Status bar */}
          <div className="flex justify-between items-center px-6 pt-7 text-[10px] font-mono text-white/70">
            <span>9:41</span>
            <span className="flex gap-1 items-center">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-white/70" />
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-white/70" />
              <span className="inline-block h-2 w-3 border border-white/60 rounded-sm" />
            </span>
          </div>

          {/* Incoming label */}
          <div className="px-6 mt-10 text-center">
            <p className="text-[11px] font-mono uppercase tracking-[2px] text-white/40">
              {isAnswered ? "Incoming · accepted" : "Incoming · declined"}
            </p>
          </div>

          {/* Avatar with pulse */}
          <div className="flex-1 flex flex-col items-center justify-center -mt-2">
            <div className="relative">
              {isAnswered && start && (
                <>
                  <span
                    className="absolute inset-0 rounded-full animate-ping"
                    style={{ background: "rgba(26,188,217,0.25)" }}
                  />
                  <span
                    className="absolute inset-[-12px] rounded-full"
                    style={{
                      background: "rgba(26,188,217,0.08)",
                      animation: "ping 2.4s cubic-bezier(0,0,0.2,1) infinite",
                    }}
                  />
                </>
              )}
              <div
                className="relative h-24 w-24 rounded-full flex items-center justify-center font-serif text-3xl"
                style={{
                  background: isAnswered
                    ? "linear-gradient(135deg, #1abcd9, #0f7a8e)"
                    : "#2a2a2a",
                  color: isAnswered ? "#0c1115" : "#666",
                }}
              >
                {isAnswered ? "MK" : "?"}
              </div>
            </div>

            <p
              className="mt-6 font-serif text-2xl"
              style={{ color: isAnswered ? "white" : "#9ca3af" }}
            >
              {caller}
            </p>
            <p
              className="mt-1 text-[11px] font-mono tracking-wider"
              style={{ color: isAnswered ? "#95d9e8" : "#5a5a5a" }}
            >
              {subline}
            </p>
          </div>

          {/* Waveform / dead-line */}
          <div className="px-6 pb-2 h-10 flex items-center justify-center gap-[3px]">
            {Array.from({ length: 24 }).map((_, i) => {
              const heights = [20, 35, 60, 45, 75, 90, 55, 30, 65, 80, 40, 70, 85, 50, 25, 55, 70, 45, 30, 60, 80, 55, 35, 20]
              return (
                <span
                  key={i}
                  className="w-[3px] rounded-full"
                  style={{
                    height: isAnswered && start ? `${heights[i]}%` : "12%",
                    background: isAnswered ? accent : "#3a3a3a",
                    transition: "height 600ms cubic-bezier(0.2,0.8,0.2,1)",
                    transitionDelay: `${i * 30}ms`,
                    opacity: isAnswered ? 1 : 0.6,
                  }}
                />
              )
            })}
          </div>

          {/* Action buttons */}
          <div className="flex justify-around items-center pb-10 pt-3">
            <button
              type="button"
              tabIndex={-1}
              className="h-14 w-14 rounded-full flex items-center justify-center"
              style={{
                background: isAnswered ? "#1f1f1f" : "#dc2626",
                opacity: isAnswered ? 0.5 : 1,
              }}
              aria-hidden
            >
              <svg viewBox="0 0 24 24" className="h-6 w-6 text-white" fill="currentColor">
                <path d="M21 15.46l-5.27-.61-2.52 2.52a15.05 15.05 0 0 1-6.59-6.58l2.53-2.53L8.54 3H3a18 18 0 0 0 18 18v-5.54z" transform="rotate(135 12 12)" />
              </svg>
            </button>
            <button
              type="button"
              tabIndex={-1}
              className="h-14 w-14 rounded-full flex items-center justify-center"
              style={{
                background: isAnswered ? "#10b981" : "#1f1f1f",
                opacity: isAnswered ? 1 : 0.5,
              }}
              aria-hidden
            >
              <svg viewBox="0 0 24 24" className="h-6 w-6 text-white" fill="currentColor">
                <path d="M21 15.46l-5.27-.61-2.52 2.52a15.05 15.05 0 0 1-6.59-6.58l2.53-2.53L8.54 3H3a18 18 0 0 0 18 18v-5.54z" />
              </svg>
            </button>
          </div>
        </div>

        {/* Side buttons */}
        <span className="absolute -left-[3px] top-24 h-12 w-1 rounded-l bg-black/60" />
        <span className="absolute -left-[3px] top-40 h-16 w-1 rounded-l bg-black/60" />
        <span className="absolute -right-[3px] top-32 h-20 w-1 rounded-l bg-black/60" />
      </div>

      {/* Tag below */}
      <div className="mt-5 text-center">
        <span
          className="inline-block px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-[1.5px]"
          style={{
            background: isAnswered ? "#0f7a8e" : "#e5e7eb",
            color: isAnswered ? "#fff" : "#6b7280",
          }}
        >
          {ringtag}
        </span>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Numbered ledger — editorial supporting stats                        */
/* ------------------------------------------------------------------ */

function LedgerEntry({
  index,
  value,
  suffix,
  label,
  detail,
}: {
  index: string
  value: string
  suffix?: string
  label: string
  detail: string
}) {
  return (
    <div className="relative pl-6 md:pl-8 py-6">
      <span className="absolute left-0 top-7 text-[10px] font-mono text-gray-400 tracking-wider">
        {index}
      </span>
      <div className="flex items-baseline gap-1">
        <span className="font-serif text-5xl md:text-6xl text-gray-900 tabular-nums leading-none">
          {value}
        </span>
        {suffix && (
          <span className="font-serif text-3xl md:text-4xl text-[#0f7a8e]">{suffix}</span>
        )}
      </div>
      <p className="mt-3 font-serif text-base text-gray-900 leading-snug">{label}</p>
      <p className="mt-1.5 text-[13px] text-gray-500 leading-relaxed max-w-[28ch]">{detail}</p>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Section                                                            */
/* ------------------------------------------------------------------ */

export function StatsCounter() {
  const { ref, inView } = useInView<HTMLElement>(0.2)
  const recovered = useCountUp(60, inView, 1400)
  const uptime = useCountUp(99.99, inView, 1500, 2)
  const codes = useCountUp(200, inView, 1400)
  const heroX = useCountUp(4, inView, 1400)

  const areaCodes = ["212", "305", "415", "312", "404", "617", "713", "206", "702", "503", "646", "323"]

  return (
    <section
      id="s-stats"
      data-sec="stats"
      ref={ref}
      className="relative py-24 md:py-32 px-[5%] bg-[#fafaf7] overflow-hidden"
    >
      {/* Aurora glow behind hero */}
      <div
        aria-hidden
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[900px] rounded-full opacity-50 blur-3xl pointer-events-none"
        style={{
          background:
            "radial-gradient(closest-side, rgba(26,188,217,0.18), rgba(26,188,217,0) 70%)",
        }}
      />

      <div className="relative max-w-[1240px] mx-auto">
        {/* Eyebrow + headline */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-16 md:mb-20">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 mb-5">
              <span className="h-px w-8 bg-gray-400" />
              <span className="text-[11px] font-mono tracking-[2px] uppercase text-gray-500">
                The math behind a local number
              </span>
            </div>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-gray-900 leading-[1.05] tracking-tight">
              Recognized area codes <span className="italic text-[#0f7a8e]">get answered.</span>
            </h2>
          </div>
          <p className="text-[15px] text-gray-600 max-w-sm leading-relaxed">
            Same dial volume. Same reps. Different caller ID — and the conversations compound from
            day one.
          </p>
        </div>

        {/* Hero stage: phone compare with 4× anchor */}
        <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-6 items-center">
          {/* Left phone — declined */}
          <div className="lg:col-span-4 order-2 lg:order-1">
            <PhoneFrame
              variant="declined"
              caller="Unknown"
              subline="800 prefix · screened"
              ringtag="Sent to voicemail"
              start={inView}
            />
          </div>

          {/* Center anchor — 4× */}
          <div className="lg:col-span-4 order-1 lg:order-2 relative flex flex-col items-center justify-center text-center">
            {/* Editorial frame lines */}
            <div className="hidden lg:block absolute left-0 right-0 top-1/2 -translate-y-1/2 h-px bg-gray-300" />
            <div className="hidden lg:block absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-gray-300/70" />

            <div className="relative bg-[#fafaf7] px-4 py-6">
              <div className="text-[10px] font-mono uppercase tracking-[2px] text-gray-500 mb-2">
                Lift on answer rate
              </div>
              <div className="flex items-baseline justify-center">
                <span
                  className="font-serif text-[140px] md:text-[200px] leading-[0.85] text-gray-900 tabular-nums"
                  style={{
                    background: "linear-gradient(180deg, #0c1115 0%, #0f7a8e 100%)",
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  {heroX}
                </span>
                <span className="font-serif text-6xl md:text-8xl text-[#0f7a8e]">×</span>
              </div>
              <p className="mt-4 font-serif italic text-lg md:text-xl text-gray-700 max-w-[24ch] mx-auto leading-snug">
                from a screened ring to an opened conversation.
              </p>
              {/* Tiny arrow indicator */}
              <div className="hidden lg:flex items-center justify-center gap-2 mt-6">
                <span className="text-[10px] font-mono text-gray-400">15%</span>
                <svg viewBox="0 0 60 10" className="w-16 h-2.5">
                  <defs>
                    <linearGradient id="arrowG" x1="0" x2="1">
                      <stop offset="0%" stopColor="#9ca3af" />
                      <stop offset="100%" stopColor="#0f7a8e" />
                    </linearGradient>
                  </defs>
                  <line x1="0" y1="5" x2="55" y2="5" stroke="url(#arrowG)" strokeWidth="1.5" />
                  <polygon points="55,1 60,5 55,9" fill="#0f7a8e" />
                </svg>
                <span className="text-[10px] font-mono text-[#0f7a8e]">60%</span>
              </div>
            </div>
          </div>

          {/* Right phone — answered */}
          <div className="lg:col-span-4 order-3">
            <PhoneFrame
              variant="answered"
              caller="Maya K."
              subline="415 · San Francisco"
              ringtag="Picked up in 2 rings"
              start={inView}
            />
          </div>
        </div>

        {/* Editorial ledger — supporting stats */}
        <div className="mt-20 md:mt-24 border-t border-gray-300">
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-gray-300">
            <LedgerEntry
              index="01"
              value={`+${recovered}`}
              label="Extra conversations recovered weekly per rep."
              detail="Same 200 dials baseline. The lift compounds without new headcount."
            />
            <LedgerEntry
              index="02"
              value={uptime.toFixed(2)}
              suffix="%"
              label="Uptime SLA on every routed call."
              detail="Carrier-grade redundancy. Live status page. No quiet outages."
            />
            <LedgerEntry
              index="03"
              value={`${codes}+`}
              label="Area codes across every major U.S. market."
              detail="Local presence wherever your buyers actually pick up."
            />
          </div>
        </div>

        {/* Area code marquee */}
        <div className="mt-12 flex flex-wrap items-center gap-2">
          <span className="text-[10px] font-mono uppercase tracking-[2px] text-gray-500 mr-2">
            Coverage sample
          </span>
          {areaCodes.map((c) => (
            <span
              key={c}
              className="px-2.5 py-1 rounded-full bg-white border border-black/5 text-gray-700 text-[12px] font-mono
                         hover:bg-[#0c1115] hover:text-[#95d9e8] transition-colors"
            >
              {c}
            </span>
          ))}
          <span className="px-2.5 py-1 rounded-full bg-[#0c1115] text-[#95d9e8] text-[12px] font-mono">
            +188 more
          </span>
        </div>

        {/* Footnote */}
        <p className="mt-10 text-xs font-mono text-gray-400 max-w-2xl leading-relaxed">
          Source: blended answer-rate data across outbound SMB cohorts (2024–2025). Individual
          results vary by market and list quality.
        </p>
      </div>
    </section>
  )
}

export default StatsCounter
