'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import gsap from 'gsap'
import { TypeWritter } from '@/components/ui/typing-writter'
import { ShimmerLoader } from '@/components/ui/shimmer-loader'
import {
  Phone,
  MessageSquare,
  Zap,
  BarChart2,
  CheckCircle2,
  Mic,
  FileText,
  Share2,
} from 'lucide-react'

const TASKS = [
  { id: 'voice',      icon: Phone,         label: 'Cloud Voice',       sub: 'Routing inbound call → Ethan Cooper',   delay: 0,    duration: 2600 },
  { id: 'sms',        icon: MessageSquare, label: 'Omnichannel Inbox', sub: 'SMS thread synced · 3 new messages',    delay: 200,  duration: 3200 },
  { id: 'ai',         icon: Zap,           label: 'AI Reception',      sub: 'Auto-reply drafted · awaiting send',    delay: 100,  duration: 2400 },
  { id: 'crm',        icon: BarChart2,     label: 'CRM Sync',          sub: 'Deal updated · HubSpot ↔ Twiching',     delay: 400,  duration: 2900 },
  { id: 'recording',  icon: Mic,           label: 'Call Recording',    sub: 'Recording saved · 4m 12s',              delay: 0,    duration: 2200 },
  { id: 'transcript', icon: FileText,      label: 'Transcript',        sub: 'AI transcript ready · 94% accuracy',   delay: 2400, duration: 3100 },
  { id: 'voicemail',  icon: Share2,        label: 'Voicemail Share',   sub: 'Link generated · shared to team inbox', delay: 300,  duration: 2700 },
]

const TAGLINE = 'Twiching combines cloud calling, AI reception, omnichannel inboxes, CRM sync, and live analytics into one modern workspace.'

type Status = 'idle' | 'running' | 'done'

export function HeroStoryPanel() {
  const panelRef  = useRef<HTMLDivElement>(null)
  const timers    = useRef<ReturnType<typeof setTimeout>[]>([])
  const [cycleKey, setCycleKey]     = useState(0)
  const [statuses, setStatuses]     = useState<Status[]>(TASKS.map(() => 'idle'))
  const [showTagline, setShowTagline] = useState(false)

  const clear = () => timers.current.forEach(clearTimeout)

  const run = useCallback(() => {
    clear()
    setCycleKey(k => k + 1)
    setStatuses(TASKS.map(() => 'idle'))
    setShowTagline(false)

    TASKS.forEach((task, i) => {
      const t1 = setTimeout(() => {
        setStatuses(prev => { const s = [...prev]; s[i] = 'running'; return s })
        const t2 = setTimeout(() => {
          setStatuses(prev => { const s = [...prev]; s[i] = 'done'; return s })
        }, task.duration)
        timers.current.push(t2)
      }, task.delay + 600)
      timers.current.push(t1)
    })

    const maxDone = Math.max(...TASKS.map(t => t.delay + t.duration)) + 600
    const t3 = setTimeout(() => setShowTagline(true), maxDone + 300)
    const t4 = setTimeout(() => run(), maxDone + 4200)
    timers.current.push(t3, t4)
  }, [])

  useEffect(() => {
    gsap.fromTo(
      panelRef.current,
      { opacity: 0, y: 28 },
      { opacity: 1, y: 0, duration: 0.85, ease: 'power3.out', delay: 0.5 },
    )
    run()
    return () => clear()
  }, [run])

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
            agent · active
          </span>
        </div>

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
          {TASKS.map((task, i) => {
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
                      status === 'done'    ? 'text-accent' :
                      status === 'running' ? 'text-[#0d2e35]' : 'text-[#0d2e35]/25',
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

      </div>
    </div>
  )
}
