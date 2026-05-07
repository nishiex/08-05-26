"use client"

import { useEffect, useRef, useState } from "react"
import { MessageSquare, Settings, Rocket, ArrowRight } from "lucide-react"

const steps = [
  {
    Icon: MessageSquare,
    step: "01",
    label: "Step 01",
    title: "Start your 14-day trial",
    description:
      "Sign up with a card — no charges during the trial. Up to 3 users, one number per user included.",
    active: false,
  },
  {
    Icon: Settings,
    step: "02",
    label: "Step 02",
    title: "Port or provision numbers",
    description:
      "Bring existing numbers (domestic ports: 5–10 business days) or pick new ones — virtual, local, vanity, business or second.",
    active: false,
  },
  {
    Icon: Rocket,
    step: "03",
    label: "Step 03",
    title: "Activate calling & SMS",
    description:
      "Finish a quick compliance check, route calls to any device, go live in 24 hours. One account, one bill, one support team.",
    active: true,
  },
]

export function ValueProp() {
  const sectionRef = useRef<HTMLElement>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    if (!sectionRef.current) return
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setInView(true)
          obs.disconnect()
        }
      },
      { threshold: 0.15 }
    )
    obs.observe(sectionRef.current)
    return () => obs.disconnect()
  }, [])

  return (
    <section
      id="s-value-prop"
      ref={sectionRef}
      aria-labelledby="vp-heading"
      className="bg-white py-14 md:py-20 px-[5%]"
    >
      <div className="max-w-[1100px] mx-auto">

        {/* Header */}
        <div
          className="mb-10"
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0)" : "translateY(18px)",
            transition: "opacity 0.5s ease, transform 0.5s ease",
          }}
        >
          <p className="text-xs font-medium tracking-[1.8px] uppercase text-accent font-mono mb-3">
            From Sign-up to Live Calls
          </p>
          <h2
            id="vp-heading"
            className="font-serif text-4xl md:text-5xl font-medium text-foreground tracking-tight text-balance leading-[1.06]"
          >
            Up and running in a day, not a quarter.
          </h2>
        </div>

        {/* Steps */}
        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-0 mb-10">
          {steps.map((s, i) => (
            <div
              key={s.step}
              className="relative flex flex-col items-center text-center"
              style={{
                opacity: inView ? 1 : 0,
                transform: inView ? "translateY(0)" : "translateY(22px)",
                transition: "opacity 0.55s ease, transform 0.55s ease",
                transitionDelay: `${i * 120}ms`,
              }}
            >
              {/* Dashed connector — right side, desktop only */}
              {i < steps.length - 1 && (
                <div
                  aria-hidden="true"
                  className="hidden md:block absolute top-[44px] left-[calc(50%+52px)] right-[-calc(50%-52px)] h-[1px]"
                  style={{
                    backgroundImage:
                      "repeating-linear-gradient(to right, #93c5fd 0, #93c5fd 8px, transparent 8px, transparent 16px)",
                    width: "calc(100% - 104px)",
                  }}
                />
              )}

              {/* Circle icon */}
              <div className="relative mb-6 shrink-0">
                <div
                  className={`w-[88px] h-[88px] rounded-full border-2 flex items-center justify-center transition-colors ${s.active
                    ? "bg-accent border-accent"
                    : "bg-white border-[#bfdbfe]"
                    }`}
                >
                  <s.Icon
                    className={`h-7 w-7 ${s.active ? "text-white" : "text-accent"}`}
                    strokeWidth={1.6}
                  />
                </div>
                {/* Step badge */}
                <span
                  className={`absolute bottom-0 right-0 translate-x-1 translate-y-1 text-[11px] font-mono font-medium text-white rounded-full w-6 h-6 flex items-center justify-center ${s.active ? "bg-accent" : "bg-accent"
                    }`}
                >
                  {s.step}
                </span>
              </div>

              {/* Step label */}
              <p className="text-[11px] font-medium tracking-[2px] uppercase text-accent font-mono mb-3">
                {s.label}
              </p>

              {/* Title */}
              <h3 className="font-serif text-[22px] font-medium text-foreground leading-snug mb-3">
                {s.title}
              </h3>

              {/* Description */}
              <p className="text-[14px] text-muted-foreground leading-relaxed max-w-[260px]">
                {s.description}
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div
          className="flex justify-center"
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0)" : "translateY(14px)",
            transition: "opacity 0.5s ease, transform 0.5s ease",
            transitionDelay: "420ms",
          }}
        >
          <a
            href="#"
            className="group inline-flex items-center gap-3 bg-foreground text-background text-[15px] font-medium font-mono px-8 py-4 rounded-full hover:opacity-90 transition-opacity shadow-lg"
          >
            Start Free Trial
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" strokeWidth={2.2} />
          </a>
        </div>
        {/* heloo */}
      </div>
    </section>
  )
}
