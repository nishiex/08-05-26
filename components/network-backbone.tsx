"use client"

import { useEffect, useRef, useState } from "react"
import { Globe2, Radio, ShieldCheck } from "lucide-react"

/* ------------------------------------------------------------------ */
/*  Hooks                                                              */
/* ------------------------------------------------------------------ */

function useInView<T extends HTMLElement>(threshold = 0.25) {
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

function useCountUp(target: number, start: boolean, duration = 1200, decimals = 0) {
  const [value, setValue] = useState(0)
  useEffect(() => {
    if (!start) return
    const ts = performance.now()
    let raf = 0
    const step = (now: number) => {
      const p = Math.min((now - ts) / duration, 1)
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
/*  Trace map                                                          */
/* ------------------------------------------------------------------ */

type Pop = { code: string; city: string; x: number; y: number }

const POPS: Pop[] = [
  { code: "LAX", city: "Los Angeles", x: 110, y: 165 },
  { code: "IAD", city: "Ashburn",     x: 285, y: 145 },
  { code: "LHR", city: "London",      x: 430, y: 110 },
  { code: "FRA", city: "Frankfurt",   x: 470, y: 130 },
  { code: "DXB", city: "Dubai",       x: 565, y: 170 },
  { code: "SIN", city: "Singapore",   x: 720, y: 220 },
  { code: "JNB", city: "Johannesburg",x: 510, y: 290 },
  { code: "GRU", city: "São Paulo",   x: 320, y: 290 },
]

/* Route: LAX → IAD → LHR → FRA → DXB → SIN */
const ROUTE_INDEXES = [0, 1, 2, 3, 4, 5]

function pathFromRoute(): string {
  const pts = ROUTE_INDEXES.map((i) => POPS[i])
  return pts.reduce((d, p, i) => d + (i === 0 ? `M ${p.x} ${p.y}` : ` L ${p.x} ${p.y}`), "")
}

function TraceMap({ start }: { start: boolean }) {
  const totalLatency = useCountUp(188, start, 1500)

  return (
    <div className="relative w-full aspect-[16/8] rounded-2xl overflow-hidden border border-white/10 bg-[#070b0e]">
      {/* Grid background */}
      <svg
        viewBox="0 0 800 400"
        className="absolute inset-0 w-full h-full"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden
      >
        <defs>
          <pattern id="nb-grid" width="32" height="32" patternUnits="userSpaceOnUse">
            <path d="M 32 0 L 0 0 0 32" fill="none" stroke="rgba(149,217,232,0.06)" strokeWidth="1" />
          </pattern>
          <radialGradient id="nb-glow" cx="50%" cy="40%" r="60%">
            <stop offset="0%" stopColor="rgba(26,188,217,0.18)" />
            <stop offset="100%" stopColor="rgba(26,188,217,0)" />
          </radialGradient>
          <linearGradient id="nb-route" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0%" stopColor="#1abcd9" stopOpacity="0.2" />
            <stop offset="50%" stopColor="#1abcd9" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#95d9e8" stopOpacity="0.4" />
          </linearGradient>
        </defs>

        <rect width="800" height="400" fill="url(#nb-grid)" />
        <rect width="800" height="400" fill="url(#nb-glow)" />

        {/* Faint world hint — abstract continents shapes */}
        <g fill="rgba(149,217,232,0.04)" stroke="rgba(149,217,232,0.08)" strokeWidth="1">
          <path d="M 60 130 Q 110 90 180 100 T 280 130 Q 250 170 200 180 T 80 175 Z" />
          <path d="M 320 80 Q 400 70 460 90 T 580 130 Q 540 200 480 200 T 360 170 Q 330 140 320 80 Z" />
          <path d="M 600 130 Q 680 130 740 180 T 770 280 Q 720 290 670 270 T 600 220 Z" />
          <path d="M 280 240 Q 340 250 360 290 T 360 360 Q 310 360 290 320 T 280 240 Z" />
          <path d="M 440 240 Q 510 250 540 290 T 530 360 Q 480 360 460 320 T 440 240 Z" />
        </g>

        {/* Inactive PoP nodes */}
        {POPS.map((p) => {
          const onRoute = ROUTE_INDEXES.some((i) => POPS[i].code === p.code)
          if (onRoute) return null
          return (
            <g key={p.code}>
              <circle cx={p.x} cy={p.y} r="3" fill="rgba(149,217,232,0.5)" />
              <circle cx={p.x} cy={p.y} r="6" fill="none" stroke="rgba(149,217,232,0.18)" />
            </g>
          )
        })}

        {/* Route path — animated draw */}
        <path
          d={pathFromRoute()}
          fill="none"
          stroke="url(#nb-route)"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeDasharray="2000"
          strokeDashoffset={start ? 0 : 2000}
          style={{ transition: "stroke-dashoffset 1.6s cubic-bezier(0.2,0.8,0.2,1)" }}
        />

        {/* Glow underlay along route */}
        <path
          d={pathFromRoute()}
          fill="none"
          stroke="#1abcd9"
          strokeWidth="6"
          strokeLinecap="round"
          opacity="0.18"
          strokeDasharray="2000"
          strokeDashoffset={start ? 0 : 2000}
          style={{ transition: "stroke-dashoffset 1.6s cubic-bezier(0.2,0.8,0.2,1)" }}
        />

        {/* Active PoPs on route */}
        {ROUTE_INDEXES.map((i) => {
          const p = POPS[i]
          return (
            <g key={p.code}>
              <circle cx={p.x} cy={p.y} r="10" fill="rgba(26,188,217,0.12)">
                {start && (
                  <animate
                    attributeName="r"
                    values="6;14;6"
                    dur="2.4s"
                    begin={`${i * 0.18}s`}
                    repeatCount="indefinite"
                  />
                )}
              </circle>
              <circle cx={p.x} cy={p.y} r="4" fill="#1abcd9" />
              <circle cx={p.x} cy={p.y} r="4" fill="none" stroke="#95d9e8" strokeWidth="1" opacity="0.7" />
            </g>
          )
        })}

        {/* Traveling packet */}
        {start && (
          <circle r="3.5" fill="#fff">
            <animateMotion dur="3.2s" repeatCount="indefinite" path={pathFromRoute()} rotate="auto" />
          </circle>
        )}

        {/* Endpoints labels */}
        <g fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace">
          <text x={POPS[0].x - 6} y={POPS[0].y - 14} fontSize="11" fill="#95d9e8" textAnchor="end">
            LAX
          </text>
          <text x={POPS[5].x + 6} y={POPS[5].y - 14} fontSize="11" fill="#95d9e8">
            SIN
          </text>
        </g>
      </svg>

      {/* HUD overlay */}
      <div className="absolute top-4 left-4 right-4 flex items-center justify-between text-[10px] font-mono uppercase tracking-[2px]">
        <div className="flex items-center gap-2 text-emerald-400">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60 animate-ping" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
          </span>
          Live trace · LAX → SIN
        </div>
        <span className="text-[#95d9e8]">SLA &lt; 80ms regional</span>
      </div>

      {/* Latency readout */}
      <div className="absolute bottom-4 left-4 flex items-end gap-4">
        <div>
          <div className="text-[10px] font-mono uppercase tracking-[2px] text-gray-400">
            End-to-end
          </div>
          <div className="font-serif text-3xl text-white tabular-nums leading-none mt-1">
            {totalLatency}
            <span className="text-base text-[#95d9e8] ml-1">ms</span>
          </div>
        </div>
        <div className="hidden sm:block">
          <div className="text-[10px] font-mono uppercase tracking-[2px] text-gray-400">
            Hops
          </div>
          <div className="font-serif text-3xl text-white tabular-nums leading-none mt-1">
            {ROUTE_INDEXES.length - 1}
          </div>
        </div>
        <div className="hidden md:block">
          <div className="text-[10px] font-mono uppercase tracking-[2px] text-gray-400">
            Loss
          </div>
          <div className="font-serif text-3xl text-white tabular-nums leading-none mt-1">
            0.0
            <span className="text-base text-[#95d9e8] ml-1">%</span>
          </div>
        </div>
      </div>

      {/* Top-right legend */}
      <div className="absolute bottom-4 right-4 text-right text-[10px] font-mono text-gray-500 leading-relaxed">
        <div>14 PoPs · 6 continents</div>
        <div className="text-[#95d9e8]">Anycast · STIR/SHAKEN</div>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Stat tile                                                          */
/* ------------------------------------------------------------------ */

function StatTile({
  Icon,
  value,
  suffix,
  label,
  detail,
}: {
  Icon: typeof Globe2
  value: string
  suffix?: string
  label: string
  detail: string
}) {
  return (
    <div className="relative rounded-2xl border border-white/10 bg-white/[0.02] p-6 hover:bg-white/[0.04] transition-colors">
      <div className="flex items-center gap-2 mb-5">
        <span className="grid place-items-center h-8 w-8 rounded-lg bg-[#1abcd9]/10 ring-1 ring-[#1abcd9]/30">
          <Icon className="h-4 w-4 text-[#95d9e8]" strokeWidth={1.8} />
        </span>
        <span className="text-[10px] font-mono uppercase tracking-[2px] text-gray-400">
          {label}
        </span>
      </div>
      <div className="flex items-baseline gap-1">
        <span className="font-serif text-5xl md:text-6xl text-white tabular-nums leading-none">
          {value}
        </span>
        {suffix && (
          <span className="font-serif text-2xl md:text-3xl text-[#95d9e8]">{suffix}</span>
        )}
      </div>
      <p className="mt-4 text-[13px] text-gray-400 leading-relaxed">{detail}</p>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Section                                                            */
/* ------------------------------------------------------------------ */

export function NetworkBackbone() {
  const { ref, inView } = useInView<HTMLElement>(0.2)
  const pops = useCountUp(14, inView, 1300)
  const carriers = useCountUp(99, inView, 1400)
  const uptime = useCountUp(99.99, inView, 1500, 2)

  return (
    <section
      id="s-network"
      data-sec="network"
      ref={ref}
      className="relative py-24 md:py-32 px-[5%] bg-[#0a0f12] text-white overflow-hidden"
    >
      {/* Aurora */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/3 h-[520px] w-[820px] rounded-full opacity-40 blur-3xl"
        style={{
          background:
            "radial-gradient(closest-side, rgba(26,188,217,0.22), rgba(26,188,217,0) 70%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 right-0 h-[420px] w-[620px] rounded-full opacity-25 blur-3xl"
        style={{
          background:
            "radial-gradient(closest-side, rgba(149,217,232,0.18), rgba(149,217,232,0) 70%)",
        }}
      />

      <div className="relative max-w-[1240px] mx-auto">
        {/* Eyebrow + headline */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-12 md:mb-16">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 mb-5">
              <span className="h-px w-8 bg-[#95d9e8]/50" />
              <span className="text-[11px] font-mono tracking-[2px] uppercase text-[#95d9e8]">
                Carrier-grade infrastructure
              </span>
            </div>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white leading-[1.05] tracking-tight">
              A backbone built for{" "}
              <span className="italic text-[#95d9e8]">the calls that matter.</span>
            </h2>
          </div>
          <p className="text-[15px] text-gray-400 max-w-sm leading-relaxed">
            Anycast routing, redundant interconnects and a real status page. The same path your
            voice takes — visible, measurable, accountable.
          </p>
        </div>

        {/* Trace map */}
        <TraceMap start={inView} />

        {/* Stat tiles */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <StatTile
            Icon={Globe2}
            value={`${pops}`}
            label="Edge PoPs"
            detail="Anycast presence across six continents. Calls take the shortest measurable path."
          />
          <StatTile
            Icon={Radio}
            value={`${carriers}`}
            suffix="+"
            label="Tier-1 Carriers"
            detail="Redundant interconnects. If one route degrades, traffic moves before users notice."
          />
          <StatTile
            Icon={ShieldCheck}
            value={uptime.toFixed(2)}
            suffix="%"
            label="Uptime SLA"
            detail="STIR/SHAKEN attestation on every outbound call. Real status page — no quiet outages."
          />
        </div>

        {/* Footnote */}
        <p className="mt-10 text-xs font-mono text-gray-500 max-w-2xl leading-relaxed">
          Live trace samples a representative LAX → SIN path. Latency varies by origin and
          peer; status.twiching.ai publishes 30-day rolling history.
        </p>
      </div>
    </section>
  )
}

export default NetworkBackbone
