'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import gsap from 'gsap'
import { TypeWritter } from '@/components/ui/typing-writter'
import { ShimmerLoader } from '@/components/ui/shimmer-loader'
import {
  LayoutDashboard,
  Radio,
  Layers,
  TrendingUp,
  Phone,
  MessageSquare,
  Zap,
  BarChart2,
  CheckCircle2,
} from 'lucide-react'

// ── Phase 1: Story steps ────────────────────────────────────────────────────
const STORY_STEPS = [
  { icon: LayoutDashboard, label: 'One workspace',      sub: 'Every tool your team needs, unified.' },
  { icon: Radio,           label: 'Every channel',      sub: 'Voice, SMS, and chat — one inbox.'  },
  { icon: Layers,          label: 'Never switch tabs',  sub: 'Call, message, and review deals here.' },
  { icon: TrendingUp,      label: 'Zero missed leads',  sub: 'AI picks up every call, day or night.' },
]

// ── Phase 2: Agent tasks (simultaneous) ────────────────────────────────────
const AGENT_TASKS = [
  { id: 'voice', icon: Phone,        label: 'Cloud Voice',       sub: 'Routing inbound call → Ethan Cooper', delay: 0,    duration: 2600 },
  { id: 'sms',   icon: MessageSquare,label: 'Omnichannel Inbox', sub: 'SMS thread synced · 3 new messages',  delay: 300,  duration: 3200 },
  { id: 'ai',    icon: Zap,          label: 'AI Reception',      sub: 'Auto-reply drafted · awaiting send',  delay: 600,  duration: 2400 },
  { id: 'crm',   icon: BarChart2,    label: 'CRM Sync',          sub: 'Deal updated · HubSpot ↔ Twiching',  delay: 900,  duration: 2900 },
]

const TAGLINE = 'Twiching combines cloud calling, AI reception, omnichannel inboxes, CRM sync, and live analytics into one modern workspace.'

type Phase = 'story' | 'agent'
type TaskStatus = 'idle' | 'running' | 'done'

export function HeroStoryPanel() {
  const panelRef      = useRef<HTMLDivElement>(null)
  const timers        = useRef<ReturnType<typeof setTimeout>[]>([])

  const [phase, setPhase]           = useState<Phase>('story')
  const [cycleKey, setCycleKey]     = useState(0)

  // Story phase state
  const [storyStep, setStoryStep]   = useState(-1)   // -1 = none visible yet
  const [doneSteps, setDoneSteps]   = useState<number[]>([])

  // Agent phase state
  const [statuses, setStatuses]     = useState<TaskStatus[]>(AGENT_TASKS.map(() => 'idle'))
  const [showTagline, setShowTagline] = useState(false)

  const clear = () => timers.current.forEach(clearTimeout)

  const runStoryPhase = useCallback(() => {
    setPhase('story')
    setStoryStep(-1)
    setDoneSteps([])

    // Reveal each step sequentially: 0 → 1 → 2 → 3
    // Each step types in ~700ms, then marks done, then next starts
    const STEP_GAP = 1300
    STORY_STEPS.forEach((_, i) => {
      const t = setTimeout(() => {
        setStoryStep(i)
        const t2 = setTimeout(() => {
          setDoneSteps(prev => [...prev, i])
        }, 900)
        timers.current.push(t2)
      }, 600 + i * STEP_GAP)
      timers.current.push(t)
    })

    // Transition to agent phase after all steps done
    const phaseSwitch = 600 + STORY_STEPS.length * STEP_GAP + 800
    const t3 = setTimeout(() => runAgentPhase(), phaseSwitch)
    timers.current.push(t3)
  }, [])

  const runAgentPhase = useCallback(() => {
    setPhase('agent')
    setStatuses(AGENT_TASKS.map(() => 'idle'))
    setShowTagline(false)
    setCycleKey(k => k + 1)

    AGENT_TASKS.forEach((task, i) => {
      const t1 = setTimeout(() => {
        setStatuses(prev => { const s = [...prev]; s[i] = 'running'; return s })
        const t2 = setTimeout(() => {
          setStatuses(prev => { const s = [...prev]; s[i] = 'done'; return s })
        }, task.duration)
        timers.current.push(t2)
      }, task.delay + 400)
      timers.current.push(t1)
    })

    const maxDone = Math.max(...AGENT_TASKS.map(t => t.delay + t.duration)) + 500
    const t3 = setTimeout(() => setShowTagline(true), maxDone + 400)
    // Loop back to story phase
    const t4 = setTimeout(() => {
      clear()
      runStoryPhase()
    }, maxDone + 4000)
    timers.current.push(t3, t4)
  }, [runStoryPhase])

  useEffect(() => {
    gsap.fromTo(
      panelRef.current,
      { opacity: 0, y: 28 },
      { opacity: 1, y: 0, duration: 0.85, ease: 'power3.out', delay: 0.5 },
    )
    runStoryPhase()
    return () => clear()
  }, [runStoryPhase])

  return (
    <div ref={panelRef} className="flex-1 flex items-center justify-center lg:justify-end opacity-0">
      <div className="w-full max-w-[400px] rounded-2xl overflow-hidden border border-[#0d2e35]/10 bg-white shadow-[0_16px_48px_-12px_rgba(13,46,53,0.14)]">

        {/* Header */}
        <div className="flex items-center gap-2 px-5 py-3.5 border-b border-[#0d2e35]/8">
          <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
          <span className="text-[11px] font-mono font-medium text-[#0d2e35]/45 tracking-widest uppercase">
            twiching.live
          </span>
          <span className="ml-auto text-[10px] font-mono px-2 py-0.5 rounded-full bg-accent/10 text-accent">
            {phase === 'story' ? 'story' : 'agent · active'}
          </span>
        </div>

        {/* ── Phase 1: Story steps ─────────────────────────────────── */}
        {phase === 'story' && (
          <div className="px-5 py-4 flex flex-col gap-3">
            {STORY_STEPS.map((step, i) => {
              const Icon    = step.icon
              const visible = i <= storyStep
              const done    = doneSteps.includes(i)
              const active  = i === storyStep && !done

              return (
                <div
                  key={step.label}
                  className={[
                    'flex items-start gap-3 transition-opacity duration-500',
                    visible ? 'opacity-100' : 'opacity-0',
                  ].join(' ')}
                >
                  <div className={[
                    'w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 transition-all duration-500',
                    done   ? 'bg-accent text-white shadow-[0_0_10px_rgba(26,188,217,0.3)]' : '',
                    active ? 'bg-accent/12 text-accent' : '',
                    !visible ? 'bg-[#0d2e35]/5 text-[#0d2e35]/20' : '',
                  ].join(' ')}>
                    {done ? <CheckCircle2 className="w-4 h-4" strokeWidth={2} /> : <Icon className="w-4 h-4" strokeWidth={2} />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={[
                      'text-[13px] font-medium leading-tight transition-colors duration-500',
                      done ? 'text-accent' : active ? 'text-[#0d2e35]' : 'text-[#0d2e35]/25',
                    ].join(' ')}>
                      {active ? (
                        <TypeWritter key={`story-${i}-${cycleKey}`} text={step.label} charDelay={48} />
                      ) : step.label}
                    </p>
                    <p className={[
                      'text-[11px] font-mono mt-0.5 transition-colors duration-500',
                      done || active ? 'text-[#0d2e35]/40' : 'text-[#0d2e35]/15',
                    ].join(' ')}>
                      {step.sub}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        )}

        {/* ── Phase 2: Agent tasks ──────────────────────────────────── */}
        {phase === 'agent' && (
          <>
            {/* Prompt */}
            <div className="px-5 pt-4 pb-3.5 border-b border-[#0d2e35]/6">
              <p className="text-[10px] font-mono uppercase tracking-widest text-[#0d2e35]/35 mb-1.5">Request</p>
              <TypeWritter
                key={`prompt-${cycleKey}`}
                text="Handle everything, simultaneously."
                charDelay={44}
                className="text-[13px] font-mono text-[#0d2e35] font-medium"
              />
            </div>

            {/* Task rows */}
            <div className="px-5 py-3 flex flex-col gap-2.5">
              {AGENT_TASKS.map((task, i) => {
                const status = statuses[i]
                const Icon   = task.icon
                return (
                  <div key={task.id} className="flex flex-col gap-1">
                    <div className="flex items-center gap-3">
                      <div className={[
                        'w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-500',
                        status === 'done'    ? 'bg-accent text-white shadow-[0_0_10px_rgba(26,188,217,0.35)]' : '',
                        status === 'running' ? 'bg-accent/12 text-accent' : '',
                        status === 'idle'    ? 'bg-[#0d2e35]/5 text-[#0d2e35]/25' : '',
                      ].join(' ')}>
                        {status === 'done'
                          ? <CheckCircle2 className="w-4 h-4" strokeWidth={2} />
                          : <Icon className={['w-4 h-4 transition-all duration-500', status === 'running' ? 'animate-pulse' : ''].join(' ')} strokeWidth={2} />
                        }
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className={[
                          'text-[13px] font-medium leading-tight transition-colors duration-500',
                          status === 'done' ? 'text-accent' : status === 'running' ? 'text-[#0d2e35]' : 'text-[#0d2e35]/25',
                        ].join(' ')}>{task.label}</p>
                        <p className={[
                          'text-[11px] font-mono truncate transition-colors duration-500',
                          status !== 'idle' ? 'text-[#0d2e35]/45' : 'text-[#0d2e35]/18',
                        ].join(' ')}>{task.sub}</p>
                      </div>
                      <span className={[
                        'text-[10px] font-mono px-2 py-0.5 rounded-full flex-shrink-0 transition-all duration-500',
                        status === 'done'    ? 'bg-accent/10 text-accent' : '',
                        status === 'running' ? 'bg-amber-50 text-amber-500' : '',
                        status === 'idle'    ? 'bg-[#0d2e35]/5 text-[#0d2e35]/20' : '',
                      ].join(' ')}>
                        {status === 'done' ? 'done' : status === 'running' ? 'running' : 'queued'}
                      </span>
                    </div>
                    {status === 'running' && <ShimmerLoader height="2px" className="ml-11" rounded="rounded-full" />}
                    {status === 'done'    && <div className="ml-11 h-[2px] rounded-full bg-accent/20" />}
                    {status === 'idle'    && <div className="ml-11 h-[2px] rounded-full bg-[#0d2e35]/5" />}
                  </div>
                )
              })}
            </div>

            {/* Tagline */}
            <div className={[
              'px-5 py-4 border-t border-[#0d2e35]/8 transition-opacity duration-700',
              showTagline ? 'opacity-100' : 'opacity-0 pointer-events-none',
            ].join(' ')}>
              {showTagline && (
                <TypeWritter
                  key={`tagline-${cycleKey}`}
                  text={TAGLINE}
                  charDelay={16}
                  className="text-[11.5px] font-mono text-[#2a5560]/65 leading-relaxed"
                />
              )}
            </div>
          </>
        )}

      </div>
    </div>
  )
}
