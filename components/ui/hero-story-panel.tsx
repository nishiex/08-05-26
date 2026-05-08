'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import gsap from 'gsap'
import { TypeWritter } from '@/components/ui/typing-writter'
import { Phone, MessageSquare, Layout, Zap } from 'lucide-react'

const STEPS = [
  {
    icon: Layout,
    label: 'One workspace',
    detail: 'Every tool your team needs, unified in one place.',
  },
  {
    icon: MessageSquare,
    label: 'Every channel',
    detail: 'Voice, SMS, and chat — handled from one inbox.',
  },
  {
    icon: Phone,
    label: 'Never switch tabs',
    detail: 'Call, message, and review deals without leaving.',
  },
  {
    icon: Zap,
    label: 'Zero missed leads',
    detail: 'AI reception picks up every call, day or night.',
  },
]

const TAGLINE =
  'Twiching combines cloud calling, AI reception, omnichannel inboxes, CRM sync, and live analytics into one modern workspace.'

export function HeroStoryPanel() {
  const [activeStep, setActiveStep]   = useState(0)
  const [typing, setTyping]           = useState(true)
  const [showTagline, setShowTagline] = useState(false)
  const [completedSteps, setCompletedSteps] = useState<number[]>([])

  const panelRef  = useRef<HTMLDivElement>(null)
  const rowRefs   = useRef<(HTMLDivElement | null)[]>([])

  // Panel entrance
  useEffect(() => {
    if (!panelRef.current) return
    gsap.fromTo(
      panelRef.current,
      { opacity: 0, y: 28 },
      { opacity: 1, y: 0, duration: 0.75, ease: 'power3.out', delay: 0.5 }
    )
  }, [])

  // Row highlight when step changes
  useEffect(() => {
    const row = rowRefs.current[activeStep]
    if (row) {
      gsap.fromTo(row, { opacity: 0, x: -10 }, { opacity: 1, x: 0, duration: 0.4, ease: 'power2.out' })
    }
  }, [activeStep])

  const handleTypingComplete = useCallback(() => {
    setTyping(false)
    const next = activeStep + 1

    if (next < STEPS.length) {
      setTimeout(() => {
        setCompletedSteps(prev => [...prev, activeStep])
        setActiveStep(next)
        setTyping(true)
      }, 700)
    } else {
      setCompletedSteps(prev => [...prev, activeStep])
      setTimeout(() => setShowTagline(true), 600)
    }
  }, [activeStep])

  return (
    <div ref={panelRef} className="flex-1 flex justify-center lg:justify-end opacity-0">
      <div className="w-full max-w-[400px] rounded-2xl overflow-hidden border border-[#0d2e35]/12 bg-white/70 backdrop-blur-xl shadow-[0_20px_60px_-15px_rgba(13,46,53,0.18),0_0_0_1px_rgba(26,188,217,0.08)]">

        {/* Header */}
        <div className="flex items-center px-5 py-3.5 border-b border-[#0d2e35]/8">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span className="text-[11px] font-mono font-medium text-[#0d2e35]/50 tracking-widest uppercase">
              twiching.live
            </span>
          </div>
        </div>

        {/* Steps */}
        <div className="px-5 py-4 flex flex-col divide-y divide-[#0d2e35]/6">
          {STEPS.map((step, i) => {
            const Icon      = step.icon
            const isDone    = completedSteps.includes(i)
            const isActive  = i === activeStep
            const isFuture  = !isDone && !isActive

            return (
              <div
                key={step.label}
                ref={(el) => { rowRefs.current[i] = el }}
                className={[
                  'flex items-start gap-3.5 py-4 transition-opacity duration-300',
                  isFuture ? 'opacity-30' : 'opacity-100',
                ].join(' ')}
              >
                {/* Icon bubble */}
                <div className={[
                  'flex-shrink-0 w-8 h-8 rounded-xl flex items-center justify-center transition-colors duration-300',
                  isDone   ? 'bg-accent/15' : '',
                  isActive ? 'bg-accent text-white shadow-[0_4px_12px_-2px_rgba(26,188,217,0.5)]' : '',
                  isFuture ? 'bg-[#0d2e35]/8' : '',
                ].join(' ')}>
                  <Icon
                    size={14}
                    className={[
                      'transition-colors duration-300',
                      isDone   ? 'text-accent' : '',
                      isActive ? 'text-white'  : '',
                      isFuture ? 'text-[#0d2e35]/40' : '',
                    ].join(' ')}
                    strokeWidth={2.2}
                  />
                </div>

                {/* Text */}
                <div className="flex flex-col gap-0.5 pt-0.5 min-w-0">
                  <span className={[
                    'text-[13px] font-semibold leading-tight',
                    isDone   ? 'text-accent/70'  : '',
                    isActive ? 'text-[#0d2e35]'  : '',
                    isFuture ? 'text-[#0d2e35]'  : '',
                  ].join(' ')}>
                    {isActive && typing ? (
                      <TypeWritter
                        text={step.label}
                        charDelay={45}
                        onComplete={handleTypingComplete}
                      />
                    ) : (
                      step.label
                    )}
                  </span>
                  {(isDone || isActive) && (
                    <span className="text-[11.5px] text-[#2a5560]/65 leading-snug">{step.detail}</span>
                  )}
                </div>
              </div>
            )
          })}
        </div>

        {/* Tagline footer */}
        <div className={[
          'px-5 pb-5 transition-opacity duration-500',
          showTagline ? 'opacity-100' : 'opacity-0 pointer-events-none',
        ].join(' ')}>
          <div className="pt-4 border-t border-accent/15">
            <TypeWritter
              text={TAGLINE}
              charDelay={14}
              className="block text-[11.5px] font-mono text-[#2a5560]/75 leading-relaxed"
            />
          </div>
        </div>

      </div>
    </div>
  )
}
