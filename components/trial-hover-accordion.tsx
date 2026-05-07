"use client"

import { useState } from "react"
import { motion } from "framer-motion"

const SECTIONS = [
  {
    heading: "No External Calls",
    desc: "External calling and SMS activate within minutes after a quick identity verification — this keeps your number reputation clean from day one and ensures full carrier compliance.",
  },
  {
    heading: "Card Required, Not Charged",
    desc: "A payment method is required at sign-up but nothing is billed during your 14-day trial. Cancel before it ends and you owe nothing — zero, guaranteed.",
  },
  {
    heading: "No Surprises",
    desc: "Auto-converts to the plan you chose at sign-up after 14 days. Every charge is itemized and predictable. One dashboard, one invoice — no hidden fees, ever.",
  },
  {
    heading: "Cancel Anytime",
    desc: "No lock-in, no penalties. Cancel before your trial ends from your dashboard in one click. You'll be redirected to the plans page with zero charge.",
  },
]

export function TrialHoverAccordion() {
  const [hovered, setHovered] = useState<number | null>(null)

  return (
    <div
      className="w-full border-t border-b"
      style={{ borderColor: "rgba(26,188,217,0.20)" }}
    >
      {SECTIONS.map((s, i) => (
        <motion.div
          key={s.heading}
          onMouseEnter={() => setHovered(i)}
          onMouseLeave={() => setHovered(null)}
          animate={{ height: hovered === i ? 200 : 130 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="relative overflow-hidden flex items-center justify-center cursor-default"
          style={{
            background: "#e0f7fa",
            borderBottom: i < SECTIONS.length - 1 ? "1px solid rgba(26,188,217,0.18)" : "none",
          }}
        >
          {/* Large blurring heading */}
          <motion.h3
            animate={
              hovered === i
                ? { opacity: 0.14, filter: "blur(18px)", scale: 1.06 }
                : { opacity: 1, filter: "blur(0px)", scale: 1 }
            }
            transition={{ duration: 0.48, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0 flex items-center justify-center font-bold text-center select-none px-4 leading-none"
            style={{
              fontSize: "clamp(38px, 8.5vw, 96px)",
              color: "#1797ac",
              letterSpacing: "-0.02em",
            }}
          >
            {s.heading}
          </motion.h3>

          {/* Revealed description */}
          <motion.p
            animate={
              hovered === i
                ? { opacity: 1, y: 0 }
                : { opacity: 0, y: 14 }
            }
            transition={{
              duration: 0.42,
              ease: [0.22, 1, 0.36, 1],
              delay: hovered === i ? 0.08 : 0,
            }}
            className="relative z-10 text-center max-w-[600px] px-8 leading-relaxed font-mono text-[14px] md:text-[15px]"
            style={{ color: "#282828" }}
          >
            {s.desc}
          </motion.p>
        </motion.div>
      ))}
    </div>
  )
}
