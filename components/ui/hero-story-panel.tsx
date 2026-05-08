'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import gsap from 'gsap'
import { TypeWritter } from '@/components/ui/typing-writter'

const STEPS = [
  { label: 'One workspace',         detail: 'Every tool your team needs, unified.' },
  { label: 'Every channel',         detail: 'Voice, SMS, chat — all in one inbox.'  },
  { label: 'Never switch tabs',     detail: 'Call, message, and review in one view.' },
  { label: 'Zero missed leads',     detail: 'AI reception picks up every call.'      },
]

const TAGLINE =
  'Twiching combines cloud calling, AI reception, omnichannel inboxes, CRM sync, and live analytics into one modern workspace.'

export function HeroStoryPanel() {
  const [activeStep, setActiveStep] = useState(0)
  const [typing, setTyping]         = useState(true)
  const [showTagline, setShowTagline] = useState(false)
  const dotRefs  = useRef<(HTMLDivElement | null)[]>([])
  const lineRef  = useRef<HTMLDivElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)

  // Animate progress dot + connecting line whenever step changes
  useEffect(() => {
    const dot = dotRefs.current[activeStep]
    if (!dot) return
    gsap.fromTo(dot, { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.35, ease: 'back.out(1.7)' })

    // grow line from top to active dot
    if (lineRef.current) {
      const pct = activeStep === 0 ? 0 : (activeStep / (STEPS.length - 1)) * 100
      gsap.to(lineRef.current, { height: `${pct}%`, duration: 0.45, ease: 'power2.out' })
    }
  }, [activeStep])

  // Entrance animation for panel
  useEffect(() => {
    if (!panelRef.current) return
    gsap.fromTo(panelRef.current, { opacity: 0, x: 40 }, { opacity: 1, x: 0, duration: 0.7, ease: 'power3.out', delay: 0.4 })
  }, [])

  const handleTypingComplete = useCallback(() => {
    setTyping(false)
    const next = activeStep + 1

    if (next < STEPS.length) {
      setTimeout(() => {
        setActiveStep(next)
        setTyping(true)
      }, 600)
    } else {
      // all steps done — show tagline
      setTimeout(() => setShowTagline(true), 500)
    }
  }, [activeStep])

  return (
    <div ref={panelRef} className="flex-1 flex justify-center lg:justify-end opacity-0">
      <div
        className="relative rounded-2xl border border-accent/20 bg-white/60 backdrop-blur-md shadow-[0_8px_40px_-12px_rgba(26,188,217,0.18)] p-8 w-full max-w-[420px]"
      >
        {/* Terminal-style top bar */}
        <div className="flex items-center gap-1.5 mb-6">
          <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
          <span className="ml-3 text-[11px] font-mono text-[#2a5560]/60 tracking-widest uppercase">twiching.workspace</span>
        </div>

        {/* Steps with vertical timeline */}
        <div className="relative flex flex-col gap-0">
          {/* Track line (bg) */}
          <div className="absolute left-[7px] top-3 bottom-3 w-[2px] bg-accent/10 rounded-full" />
          {/* Active fill line */}
          <div
            ref={lineRef}
            className="absolute left-[7px] top-3 w-[2px] bg-accent rounded-full"
            style={{ height: '0%' }}
          />

          {STEPS.map((step, i) => {
            const isDone   = i < activeStep
            const isActive = i === activeStep
            const isFuture = i > activeStep

            return (
              <div key={step.label} className="relative flex items-start gap-5 pb-7 last:pb-0">
                {/* Dot */}
                <div
                  ref={(el) => { dotRefs.current[i] = el }}
                  className={[
                    'mt-1 w-4 h-4 rounded-full border-2 flex-shrink-0 z-10 transition-colors duration-300',
                    isDone   ? 'bg-accent border-accent'        : '',
                    isActive ? 'bg-white border-accent shadow-[0_0_0_4px_rgba(26,188,217,0.18)]' : '',
                    isFuture ? 'bg-white/50 border-accent/20'   : '',
                  ].join(' ')}
                />

                {/* Text */}
                <div className="flex flex-col gap-1 min-h-[42px]">
                  <span
                    className={[
                      'font-mono text-sm font-semibold transition-colors duration-300',
                      isDone   ? 'text-accent/60' : '',
                      isActive ? 'text-[#0d2e35]' : '',
                      isFuture ? 'text-[#0d2e35]/30' : '',
                    ].join(' ')}
                  >
                    {isActive && typing ? (
                      <TypeWritter
                        text={`> ${step.label}`}
                        charDelay={50}
                        onComplete={handleTypingComplete}
                        className="text-accent"
                      />
                    ) : (
                      `> ${step.label}`
                    )}
                  </span>
                  {(isDone || isActive) && (
                    <span className="text-[12px] text-[#2a5560]/70 leading-snug">{step.detail}</span>
                  )}
                </div>
              </div>
            )
          })}
        </div>

        {/* Tagline */}
        {showTagline && (
          <div className="mt-6 pt-5 border-t border-accent/15">
            <TypeWritter
              text={TAGLINE}
              charDelay={18}
              className="block text-[12.5px] font-mono text-[#2a5560]/80 leading-relaxed"
            />
          </div>
        )}
      </div>
    </div>
  )
}
