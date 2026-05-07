"use client"

import { useEffect, useRef, useState } from "react"
import gsap from "gsap"
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion"
import {
  ArrowRight,
  ShieldCheck,
  HeartPulse,
  Activity,
  Check,
  PhoneIncoming,
  MessageSquare,
  Bot,
  Hash,
} from "lucide-react"
import dynamic from "next/dynamic"
import { ShaderGradientHero } from "@/components/shader-gradient-hero"

const OrbitingSkills = dynamic(() => import("@/components/ui/orbiting-skills"), {
  ssr: false,
  loading: () => <div className="w-[min(100vw-40px,450px)] aspect-square" />,
})

/* ─── Hero ─────────────────────────────────────────────────────────────────── */
export function Hero() {
  const rootRef = useRef<HTMLDivElement>(null)
  const timelineRef = useRef<gsap.core.Timeline | null>(null)

  const titleLine1 = ["Your", "business", "phone."]
  const titleLine2 = ["Built", "for", "how", "you", "actually", "work."]

  useEffect(() => {
    const root = rootRef.current
    if (!root) return

    /* Cursor parallax — subtle drift on the orbs */
    const orbA = root.querySelector<HTMLElement>('[data-orb="a"]')
    const orbB = root.querySelector<HTMLElement>('[data-orb="b"]')
    const ax = orbA ? gsap.quickTo(orbA, "x", { duration: 1.2, ease: "power3.out" }) : null
    const ay = orbA ? gsap.quickTo(orbA, "y", { duration: 1.2, ease: "power3.out" }) : null
    const bx = orbB ? gsap.quickTo(orbB, "x", { duration: 1.6, ease: "power3.out" }) : null
    const by = orbB ? gsap.quickTo(orbB, "y", { duration: 1.6, ease: "power3.out" }) : null

    const onMove = (e: MouseEvent) => {
      const r = root.getBoundingClientRect()
      const cx = (e.clientX - r.left) / r.width - 0.5
      const cy = (e.clientY - r.top) / r.height - 0.5
      ax?.(cx * 28); ay?.(cy * 18)
      bx?.(cx * -36); by?.(cy * -22)
    }
    root.addEventListener("mousemove", onMove)

    const ctx = gsap.context(() => {
      /* Initial states */
      gsap.set(".hero-pulse", { scaleX: 0, transformOrigin: "0% 50%" })
      gsap.set(".hero-eyebrow", { clipPath: "inset(0% 100% 0% 0%)", opacity: 1 })
      gsap.set(".hero-eyebrow > *", { opacity: 0, y: 4 })
      gsap.set(".hero-line-1 .hero-word", { y: 36, opacity: 0, filter: "blur(8px)" })
      gsap.set(".hero-line-2 .hero-word", { y: 44, rotate: 3, opacity: 0, filter: "blur(8px)" })
      gsap.set(".hero-sub", { y: 18, opacity: 0, filter: "blur(6px)" })
      gsap.set(".hero-cta", { y: 16, opacity: 0, scale: 0.94 })
      gsap.set(".hero-cta-arrow", { x: -8, opacity: 0 })
      gsap.set(".hero-right", { y: 48, opacity: 0, filter: "blur(12px)" })

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } })
      timelineRef.current = tl

      /* Signal pulse — sweeps across the top edge once */
      tl.to(".hero-pulse", { scaleX: 1, duration: 0.85, ease: "power2.inOut" }, 0)
        .to(
          ".hero-pulse",
          { scaleX: 0, transformOrigin: "100% 50%", duration: 0.55, ease: "power2.in" },
          ">-0.05",
        )

      /* Eyebrow — clip-path wipe, then content settles */
      tl.to(".hero-eyebrow", { clipPath: "inset(0% 0% 0% 0%)", duration: 0.65, ease: "power3.out" }, 0.25)
        .to(".hero-eyebrow > *", { opacity: 1, y: 0, duration: 0.4, stagger: 0.06 }, 0.55)

      /* H1 line 1 — words rise + defocus */
      tl.to(
        ".hero-line-1 .hero-word",
        { y: 0, opacity: 1, filter: "blur(0px)", duration: 0.95, stagger: 0.07, ease: "power4.out" },
        0.5,
      )

      /* H1 line 2 — words drift in with slight rotate */
      tl.to(
        ".hero-line-2 .hero-word",
        { y: 0, rotate: 0, opacity: 1, filter: "blur(0px)", duration: 0.85, stagger: 0.06, ease: "power3.out" },
        0.95,
      )

      /* Subhead — defocus → focus */
      tl.to(".hero-sub", { y: 0, opacity: 1, filter: "blur(0px)", duration: 0.6 }, 1.35)

      /* CTA — overshoot in, then arrow tracks across */
      tl.to(".hero-cta", { y: 0, opacity: 1, scale: 1, duration: 0.55, ease: "back.out(1.6)" }, 1.5)
        .to(".hero-cta-arrow", { x: 0, opacity: 1, duration: 0.4, ease: "power3.out" }, 1.7)

      /* Right column — defocus lift */
      tl.to(".hero-right", { y: 0, opacity: 1, filter: "blur(0px)", duration: 1, ease: "power3.out" }, 0.85)

      /* Ambient orb drift — runs forever, opposite phases */
      gsap.to('[data-orb="a"]', {
        xPercent: 5, yPercent: 4,
        duration: 14, ease: "sine.inOut", repeat: -1, yoyo: true,
      })
      gsap.to('[data-orb="b"]', {
        xPercent: -7, yPercent: -5,
        duration: 18, ease: "sine.inOut", repeat: -1, yoyo: true,
      })
    }, rootRef)

    return () => {
      root.removeEventListener("mousemove", onMove)
      ctx.revert()
    }
  }, [])

  return (
    <section
      ref={rootRef}
      id="s-hero"
      data-sec="hero"
      className="relative overflow-hidden pt-14 pb-14 md:pt-20 md:pb-20 px-[5%] min-h-screen"
    >
      {/* ShaderGradient animated background */}
      <ShaderGradientHero />

      {/* Top signal pulse */}
      <div
        aria-hidden="true"
        className="hero-pulse pointer-events-none absolute top-0 left-0 right-0 h-px z-20"
        style={{
          background:
            "linear-gradient(90deg, rgba(26,188,217,0) 0%, rgba(26,188,217,0.6) 50%, rgba(26,188,217,0) 100%)",
        }}
      />

      {/* Light rays + orbs */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden z-10">
        <div className="hero-ray hero-ray--a" />
        <div className="hero-ray hero-ray--b" />
        <div className="hero-ray hero-ray--c" />
        <div
          data-orb="a"
          className="hero-orb"
          style={{
            width: 520,
            height: 520,
            top: "-120px",
            left: "50%",
            transform: "translateX(-50%)",
            background: "radial-gradient(closest-side, rgba(26,188,217,0.18), rgba(26,188,217,0) 70%)",
          }}
        />
        <div
          data-orb="b"
          className="hero-orb"
          style={{
            width: 380,
            height: 380,
            bottom: "-120px",
            right: "8%",
            background: "radial-gradient(closest-side, rgba(23,151,172,0.14), rgba(23,151,172,0) 70%)",
          }}
        />
      </div>

      <div className="max-w-[1280px] mx-auto relative z-30">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">

          {/* ── Left column: text content ── */}
          <div className="flex-1 flex flex-col items-start text-left lg:max-w-[520px]">
            <div
              className="hero-eyebrow inline-flex items-center gap-2 bg-white/70 backdrop-blur border border-[#95d9e8]/50 text-accent text-xs font-medium font-mono px-4 py-[6px] rounded-full mb-7 shadow-[0_1px_0_rgba(255,255,255,0.8)_inset,0_6px_20px_-12px_rgba(26,188,217,0.4)]"
            >
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75 animate-ping" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-green-500" />
              </span>
              <span>CLOUD PHONE · VOICE · SMS · AI</span>
            </div>

            <h1 className="hero-title font-serif text-4xl md:text-5xl lg:text-[52px] font-normal leading-[1.06] tracking-tight mb-6 text-balance">
              <span className="hero-line-1 block">
                {titleLine1.map((w, i) => (
                  <span
                    key={`a-${i}`}
                    className="hero-word inline-block mr-[0.18em] will-change-transform"
                  >
                    {w}
                  </span>
                ))}
              </span>
              <span className="hero-line-2 block italic">
                {titleLine2.map((w, i) => (
                  <span
                    key={`b-${i}`}
                    className="hero-word inline-block mr-[0.18em] will-change-transform"
                  >
                    {w}
                  </span>
                ))}
              </span>
            </h1>

            <p className="hero-sub text-lg text-gray-500 mb-6 leading-relaxed max-w-[480px]">
              Phone numbers, voice, SMS and AI on one platform. Carrier-grade routing, built-in
              compliance, one bill. See it live on a 20-minute call with our team.
            </p>

            <div className="mb-5">
              <a
                href="#"
                className="hero-cta group inline-flex items-center gap-2 bg-accent text-white text-[15px] font-medium font-mono pl-7 pr-3 py-2 rounded-full shadow-[0_8px_24px_-6px_rgba(26,188,217,0.45)] transition-[transform,background-color] duration-200 ease-out hover:-translate-y-0.5 hover:bg-[color:var(--accent-dark)] active:translate-y-0 active:scale-[0.98]"
              >
                Request a Demo
                <span className="grid place-items-center h-8 w-8 rounded-full bg-white/15 ring-1 ring-inset ring-white/25 overflow-hidden">
                  <ArrowRight
                    className="hero-cta-arrow h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"
                    strokeWidth={2.2}
                  />
                </span>
              </a>
            </div>
          </div>

          {/* ── Right column: Call flow story ── */}
          <div className="hero-right flex-1 w-full min-w-0 flex items-center justify-center self-stretch">
            <OrbitingSkills />
          </div>

        </div>
      </div>
    </section>
  )
}

/* ─── Live showcase (framer-motion) ────────────────────────────────────────── */

type Activity = {
  id: number
  kind: "call" | "sms" | "ai" | "number"
  Icon: typeof PhoneIncoming
  title: string
  detail: string
  chip: string
  tint: "blue" | "green" | "violet" | "amber"
}

const ACTIVITY_FEED: Activity[] = [
  {
    id: 1,
    kind: "call",
    Icon: PhoneIncoming,
    title: "Inbound · +1 415 555 0138",
    detail: "Routed to Sales · Atlanta · answered in 0.9s",
    chip: "LIVE",
    tint: "green",
  },
  {
    id: 2,
    kind: "sms",
    Icon: MessageSquare,
    title: "SMS delivered · +1 212 555 0194",
    detail: "OTP code · Verizon · 340ms",
    chip: "SENT",
    tint: "blue",
  },
  {
    id: 3,
    kind: "ai",
    Icon: Bot,
    title: "AI receptionist · +44 20 7946 0512",
    detail: "After-hours · booked demo for Thursday 10am",
    chip: "HANDLED",
    tint: "violet",
  },
  {
    id: 4,
    kind: "number",
    Icon: Hash,
    title: "Local number ported · +1 303 555 0112",
    detail: "Denver · CenturyLink · registered STIR/SHAKEN",
    chip: "READY",
    tint: "amber",
  },
  {
    id: 5,
    kind: "call",
    Icon: PhoneIncoming,
    title: "Inbound · +1 646 555 0102",
    detail: "Routed to Support · Brooklyn · answered in 1.2s",
    chip: "LIVE",
    tint: "green",
  },
  {
    id: 6,
    kind: "sms",
    Icon: MessageSquare,
    title: "Campaign blast · 12,480 recipients",
    detail: "Marketing · 10DLC · 98.4% delivery",
    chip: "SENT",
    tint: "blue",
  },
]

const TINT: Record<Activity["tint"], { bg: string; ring: string; text: string; dot: string }> = {
  blue: { bg: "bg-[#e0f7fa]", ring: "ring-[#95d9e8]/50", text: "text-accent", dot: "bg-accent" },
  green: { bg: "bg-emerald-50", ring: "ring-emerald-100", text: "text-emerald-600", dot: "bg-emerald-500" },
  violet: { bg: "bg-violet-50", ring: "ring-violet-100", text: "text-violet-600", dot: "bg-violet-500" },
  amber: { bg: "bg-amber-50", ring: "ring-amber-100", text: "text-amber-600", dot: "bg-amber-500" },
}

function LiveShowcase() {
  const cardRef = useRef<HTMLDivElement>(null)

  // Mouse parallax tilt
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const rotX = useSpring(useTransform(my, [-0.5, 0.5], [6, -6]), { stiffness: 120, damping: 18 })
  const rotY = useSpring(useTransform(mx, [-0.5, 0.5], [-6, 6]), { stiffness: 120, damping: 18 })

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect()
    mx.set((e.clientX - rect.left) / rect.width - 0.5)
    my.set((e.clientY - rect.top) / rect.height - 0.5)
  }
  function handleMouseLeave() {
    mx.set(0)
    my.set(0)
  }

  // Rolling feed: show 3 at once, advance every 2.4s
  const [cursor, setCursor] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setCursor((c) => (c + 1) % ACTIVITY_FEED.length), 2400)
    return () => clearInterval(id)
  }, [])
  const visible = [
    ACTIVITY_FEED[cursor % ACTIVITY_FEED.length],
    ACTIVITY_FEED[(cursor + 1) % ACTIVITY_FEED.length],
    ACTIVITY_FEED[(cursor + 2) % ACTIVITY_FEED.length],
  ]

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.45 }}
      style={{
        perspective: 1200,
        rotateX: rotX,
        rotateY: rotY,
        transformStyle: "preserve-3d",
      }}
      className="relative w-full"
    >
      {/* Soft floor shadow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-8 left-1/2 h-16 w-[85%] -translate-x-1/2 rounded-full"
        style={{
          background: "radial-gradient(ellipse at center, rgba(26,188,217,0.22), rgba(26,188,217,0) 70%)",
          filter: "blur(18px)",
        }}
      />

      {/* Orbiting decorative ring (top-left corner) */}
      <OrbitRing />

      {/* Main dashboard card */}
      <div
        className="relative overflow-hidden rounded-[28px] bg-white/80 backdrop-blur-xl ring-1 ring-gray-200/70 shadow-[0_40px_80px_-30px_rgba(15,23,42,0.25),0_8px_24px_-12px_rgba(26,188,217,0.2)]"
        style={{ transform: "translateZ(0)" }}
      >
        {/* Gradient mesh inside */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-60"
          style={{
            background:
              "radial-gradient(600px 200px at 15% 0%, rgba(26,188,217,0.14), transparent 60%), radial-gradient(500px 180px at 95% 100%, rgba(23,151,172,0.12), transparent 60%)",
          }}
        />

        {/* Card header */}
        <div className="relative flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-red-300/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-300/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-300/80" />
            </div>
            <span className="ml-3 text-[11px] font-mono text-gray-500 tracking-wider">
              app.twiching.ai / live
            </span>
          </div>
          <div className="flex items-center gap-2">
            <PulseDot />
            <span className="text-[11px] font-mono font-medium tracking-[1.5px] uppercase text-emerald-600">
              Live activity
            </span>
          </div>
        </div>

        <div className="relative px-4 md:px-6 py-4 min-h-[260px]">
          <div className="space-y-3">
            <AnimatePresence mode="popLayout" initial={false}>
              {visible.map((item, i) => (
                <motion.div
                  key={`${item.id}-${cursor}-${i}`}
                  layout
                  initial={{ opacity: 0, y: 24, scale: 0.96 }}
                  animate={{ opacity: 1 - i * 0.12, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -16, scale: 0.96 }}
                  transition={{ type: "spring", stiffness: 260, damping: 26, mass: 0.8 }}
                >
                  <ActivityRow item={item} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* Footer stats */}
        <div className="relative grid grid-cols-3 divide-x divide-gray-100 border-t border-gray-100 bg-gray-50/50">
          <FooterStat label="Today" value="14,823" sub="calls routed" />
          <FooterStat label="Answer rate" value="91.4%" sub="last 24h" />
          <FooterStat label="Latency p95" value="14ms" sub="global" />
        </div>
      </div>
    </motion.div>
  )
}

/* ─── Sub-components ───────────────────────────────────────────────────────── */

function ActivityRow({ item }: { item: Activity }) {
  const t = TINT[item.tint]
  const { Icon } = item
  return (
    <div className="flex items-center gap-3 rounded-2xl bg-white/80 backdrop-blur ring-1 ring-gray-100 px-4 py-3 hover:ring-gray-200 transition">
      <span className={`grid place-items-center h-10 w-10 rounded-xl ${t.bg} ring-1 ${t.ring} ${t.text}`}>
        <Icon className="h-4 w-4" strokeWidth={2} />
      </span>
      <div className="flex-1 min-w-0 text-left">
        <p className="text-sm font-medium text-gray-900 font-mono truncate">{item.title}</p>
        <p className="text-[12px] text-gray-500 truncate">{item.detail}</p>
      </div>
      <span
        className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-mono font-medium tracking-[1.5px] uppercase ${t.bg} ${t.text} ring-1 ${t.ring}`}
      >
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

function PulseDot() {
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


function OrbitRing() {
  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none absolute -top-10 -right-10 h-40 w-40"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.9 }}
    >
      <motion.div
        className="absolute inset-0"
        animate={{ rotate: 360 }}
        transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
      >
        <div className="absolute inset-0 rounded-full border border-dashed border-[#95d9e8]/70/80" />
        <span className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 h-3 w-3 rounded-full bg-accent shadow-[0_0_0_4px_rgba(26,188,217,0.18)]" />
        <span className="absolute bottom-[12%] right-[6%] h-2 w-2 rounded-full bg-violet-500" />
        <span className="absolute left-[10%] bottom-[20%] h-1.5 w-1.5 rounded-full bg-emerald-500" />
      </motion.div>
      <motion.div
        className="absolute inset-6 rounded-full border border-[#95d9e8]/50"
        animate={{ rotate: -360 }}
        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
      >
        <span className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/2 h-2 w-2 rounded-full bg-accent/70" />
      </motion.div>
    </motion.div>
  )
}


function FooterStat({ label, value, sub }: { label: string; value: string; sub: string }) {
  return (
    <div className="px-5 py-4 text-left">
      <p className="text-[10px] font-mono font-medium tracking-[1.5px] uppercase text-gray-400">
        {label}
      </p>
      <p className="font-serif text-2xl font-medium text-gray-900 mt-0.5 leading-none">
        {value}
      </p>
      <p className="text-[11px] text-gray-500 font-mono mt-1">{sub}</p>
    </div>
  )
}
