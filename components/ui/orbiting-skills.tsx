"use client"

import React, { useEffect, useState, memo } from "react"
import {
  Phone,
  MessageSquare,
  Video,
  Mic,
  Hash,
  Sparkles,
  Rocket,
  type LucideIcon,
} from "lucide-react"

/* Custom astroid (4-point star) icon — used for AI on the outer orbit */
const Astroid: LucideIcon = React.forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement> & { strokeWidth?: number | string }>(
  ({ color = "currentColor", strokeWidth = 2, className, ...rest }, ref) => (
    <svg
      ref={ref}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke={color as string}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...rest}
    >
      <path d="M12.983 21.186a1 1 0 0 1-1.966 0 10 10 0 0 0-8.203-8.203 1 1 0 0 1 0-1.966 10 10 0 0 0 8.203-8.203 1 1 0 0 1 1.966 0 10 10 0 0 0 8.203 8.203 1 1 0 0 1 0 1.966 10 10 0 0 0-8.203 8.203" />
    </svg>
  ),
) as unknown as LucideIcon
;(Astroid as { displayName?: string }).displayName = "Astroid"

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

type GlowColor = "cyan" | "deep"

interface SkillConfig {
  id: string
  orbitRadius: number
  size: number
  speed: number
  Icon: LucideIcon
  iconColor: string
  phaseShift: number
  glowColor: GlowColor
  label: string
}

interface OrbitingSkillProps {
  config: SkillConfig
  angle: number
}

interface GlowingOrbitPathProps {
  radius: number
  glowColor?: GlowColor
  animationDelay?: number
}

/* ------------------------------------------------------------------ */
/*  Brand-aligned skill config                                         */
/* ------------------------------------------------------------------ */

const skillsConfig: SkillConfig[] = [
  // Inner orbit — primary channels
  {
    id: "phone",
    orbitRadius: 100,
    size: 44,
    speed: 1,
    Icon: Phone,
    iconColor: "#1abcd9",
    phaseShift: 0,
    glowColor: "cyan",
    label: "Voice",
  },
  {
    id: "chat",
    orbitRadius: 100,
    size: 44,
    speed: 1,
    Icon: MessageSquare,
    iconColor: "#1abcd9",
    phaseShift: (2 * Math.PI) / 3,
    glowColor: "cyan",
    label: "Team Chat",
  },
  {
    id: "video",
    orbitRadius: 100,
    size: 44,
    speed: 1,
    Icon: Video,
    iconColor: "#1abcd9",
    phaseShift: (4 * Math.PI) / 3,
    glowColor: "cyan",
    label: "Video",
  },
  // Outer orbit — supporting layers
  {
    id: "ai",
    orbitRadius: 180,
    size: 48,
    speed: -0.6,
    Icon: Astroid,
    iconColor: "#0f7a8e",
    phaseShift: 0,
    glowColor: "deep",
    label: "AI Insights",
  },
  {
    id: "recording",
    orbitRadius: 180,
    size: 44,
    speed: -0.6,
    Icon: Mic,
    iconColor: "#0f7a8e",
    phaseShift: (2 * Math.PI) / 3,
    glowColor: "deep",
    label: "Recording",
  },
  {
    id: "numbers",
    orbitRadius: 180,
    size: 44,
    speed: -0.6,
    Icon: Hash,
    iconColor: "#0f7a8e",
    phaseShift: (4 * Math.PI) / 3,
    glowColor: "deep",
    label: "Numbers",
  },
]

/* ------------------------------------------------------------------ */
/*  Skill (memoized)                                                   */
/* ------------------------------------------------------------------ */

const OrbitingSkill = memo(({ config, angle }: OrbitingSkillProps) => {
  const [isHovered, setIsHovered] = useState(false)
  const { orbitRadius, size, Icon, iconColor, label } = config

  const x = Math.cos(angle) * orbitRadius
  const y = Math.sin(angle) * orbitRadius

  return (
    <div
      className="absolute top-1/2 left-1/2 transition-all duration-300 ease-out"
      style={{
        width: `${size}px`,
        height: `${size}px`,
        transform: `translate(calc(${x}px - 50%), calc(${y}px - 50%))`,
        zIndex: isHovered ? 20 : 10,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`relative w-full h-full p-2.5 rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer bg-white border border-[#1abcd9]/20 ${
          isHovered ? "scale-125 shadow-2xl" : "shadow-md hover:shadow-xl"
        }`}
        style={{
          boxShadow: isHovered
            ? `0 0 30px ${iconColor}55, 0 0 60px ${iconColor}25`
            : undefined,
        }}
      >
        <Icon className="w-full h-full" color={iconColor} strokeWidth={1.8} />
        {isHovered && (
          <div className="absolute -bottom-9 left-1/2 -translate-x-1/2 px-2.5 py-1 bg-[#0c1115] rounded-md text-[11px] font-mono uppercase tracking-wider text-[#95d9e8] whitespace-nowrap pointer-events-none">
            {label}
          </div>
        )}
      </div>
    </div>
  )
})
OrbitingSkill.displayName = "OrbitingSkill"

/* ------------------------------------------------------------------ */
/*  Orbit path                                                         */
/* ------------------------------------------------------------------ */

const GlowingOrbitPath = memo(({ radius, glowColor = "cyan", animationDelay = 0 }: GlowingOrbitPathProps) => {
  const palette = {
    cyan: {
      primary: "rgba(26, 188, 217, 0.35)",
      secondary: "rgba(149, 217, 232, 0.22)",
      border: "rgba(26, 188, 217, 0.30)",
    },
    deep: {
      primary: "rgba(15, 122, 142, 0.30)",
      secondary: "rgba(15, 122, 142, 0.18)",
      border: "rgba(15, 122, 142, 0.28)",
    },
  }
  const colors = palette[glowColor] || palette.cyan

  return (
    <div
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none"
      style={{
        width: `${radius * 2}px`,
        height: `${radius * 2}px`,
        animationDelay: `${animationDelay}s`,
      }}
    >
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background: `radial-gradient(circle, transparent 30%, ${colors.secondary} 70%, ${colors.primary} 100%)`,
          boxShadow: `0 0 60px ${colors.primary}, inset 0 0 60px ${colors.secondary}`,
          animation: "pulse 4s ease-in-out infinite",
          animationDelay: `${animationDelay}s`,
        }}
      />
      <div
        className="absolute inset-0 rounded-full"
        style={{
          border: `1px dashed ${colors.border}`,
          boxShadow: `inset 0 0 20px ${colors.secondary}`,
        }}
      />
    </div>
  )
})
GlowingOrbitPath.displayName = "GlowingOrbitPath"

/* ------------------------------------------------------------------ */
/*  Main component                                                     */
/* ------------------------------------------------------------------ */

export default function OrbitingSkills() {
  const [time, setTime] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (isPaused || !mounted) return
    let raf = 0
    let last = performance.now()
    const tick = (now: number) => {
      const delta = (now - last) / 1000
      last = now
      setTime((t) => t + delta)
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [isPaused, mounted])

  if (!mounted) {
    return <div className="w-[min(100vw-40px,450px)] aspect-square" />
  }

  const orbitConfigs: Array<{ radius: number; glowColor: GlowColor; delay: number }> = [
    { radius: 100, glowColor: "cyan", delay: 0 },
    { radius: 180, glowColor: "deep", delay: 1.5 },
  ]

  return (
    <div className="w-full flex items-center justify-center">
      <div
        className="relative w-[min(100vw-40px,450px)] aspect-square flex items-center justify-center"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* News pill — top right */}
        <div
          className="absolute top-2 right-2 z-30 inline-flex items-center gap-2 pl-3 pr-3.5 py-1.5 rounded-full border border-[#1abcd9]/25 bg-white shadow-[0_10px_30px_-12px_rgba(15,122,142,0.30)] animate-news-in"
          style={{ animationDelay: "0.4s", animationFillMode: "both" }}
        >
          <span className="grid place-items-center h-5 w-5 rounded-full bg-[#1abcd9]/10">
            <Sparkles className="h-3 w-3 text-accent" strokeWidth={2.2} />
          </span>
          <span className="text-[11px] font-mono text-gray-700 whitespace-nowrap">
            UCaaS Visionary 2026
          </span>
        </div>

        {/* News pill — bottom left */}
        <div
          className="absolute bottom-2 left-2 z-30 inline-flex items-center gap-2 pl-3 pr-3.5 py-1.5 rounded-full border border-[#1abcd9]/25 bg-white shadow-[0_10px_30px_-12px_rgba(15,122,142,0.30)] animate-news-in"
          style={{ animationDelay: "0.9s", animationFillMode: "both" }}
        >
          <span className="grid place-items-center h-5 w-5 rounded-full bg-[#1abcd9]/10">
            <Rocket className="h-3 w-3 text-accent" strokeWidth={2.2} />
          </span>
          <span className="text-[11px] font-mono text-gray-700 whitespace-nowrap">
            AI Receptionist · 47 langs
          </span>
        </div>

        <style jsx>{`
          @keyframes news-in {
            from { opacity: 0; transform: translateY(8px); }
            to   { opacity: 1; transform: translateY(0); }
          }
          :global(.animate-news-in) {
            opacity: 0;
            animation: news-in 500ms cubic-bezier(0.2, 0.8, 0.2, 1);
          }
        `}</style>
        {/* Center node — Twiching mark */}
        <div className="w-20 h-20 rounded-full flex items-center justify-center z-10 relative bg-white border border-[#1abcd9]/30 shadow-[0_8px_30px_-8px_rgba(26,188,217,0.45)]">
          <div className="absolute inset-0 rounded-full bg-[#1abcd9]/15 blur-xl animate-pulse" />
          <img
            src="/favicon.png"
            alt="Twiching"
            className="relative z-10 h-10 w-10 object-contain"
          />
        </div>

        {orbitConfigs.map((c) => (
          <GlowingOrbitPath
            key={`path-${c.radius}`}
            radius={c.radius}
            glowColor={c.glowColor}
            animationDelay={c.delay}
          />
        ))}

        {skillsConfig.map((config) => {
          const angle = time * config.speed + (config.phaseShift || 0)
          return <OrbitingSkill key={config.id} config={config} angle={angle} />
        })}
      </div>
    </div>
  )
}
