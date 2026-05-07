"use client"

import { useEffect, useRef, useState } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import {
  Phone,
  MessageSquare,
  Video,
  Smartphone,
  Play,
  Pause,
  Voicemail,
  Send,
  Camera,
  MessageCircle,
  CalendarClock,
  Timer,
  CalendarPlus,
  CalendarX,
  VideoIcon,
  CheckCheck,
  Clock3,
  type LucideIcon,
} from "lucide-react"

/* ── Call Flow UI (Node 1) ─────────────────────────────────────────── */

function CallFlowUI() {
  const [playing, setPlaying] = useState(false)
  const bars = [3, 6, 9, 5, 11, 7, 4, 9, 6, 8, 3, 7, 10, 5, 8, 4, 9, 6]

  const rows = [
    {
      label: "SMS Broadcast",
      detail: "Flash Sale 20% Off...",
      status: "DELIVERED",
      statusColor: "text-emerald-400",
      extra: null,
    },
    {
      label: "Voice API",
      detail: "Welcome IVR Flow...",
      status: "ACTIVE",
      statusColor: "text-[#1abcd9]",
      extra: (
        <div className="flex items-center gap-2 flex-1 min-w-0">
          <button
            onClick={() => setPlaying((p) => !p)}
            className="w-5 h-5 rounded-full bg-[#1abcd9] flex items-center justify-center shrink-0 hover:bg-[#1797ac] transition-colors"
            aria-label={playing ? "Pause" : "Play"}
          >
            {playing
              ? <Pause className="h-2.5 w-2.5 text-white fill-white" strokeWidth={0} />
              : <Play className="h-2.5 w-2.5 text-white fill-white translate-x-[1px]" strokeWidth={0} />
            }
          </button>
          <div className="flex items-center gap-[2px]">
            {bars.map((h, i) => (
              <span
                key={i}
                className="rounded-full transition-colors duration-300"
                style={{
                  width: 2,
                  height: h,
                  backgroundColor: playing && i < bars.length * 0.55
                    ? "#1abcd9"
                    : "rgba(255,255,255,0.12)",
                }}
              />
            ))}
          </div>
        </div>
      ),
    },
    {
      label: "MMS Campaign",
      detail: "Product Launch Video...",
      status: "DRAFTING",
      statusColor: "text-amber-400",
      extra: null,
    },
  ]

  return (
    <div
      className="mt-6 rounded-2xl p-6 font-mono"
      style={{
        background: "rgba(7,7,16,0.90)",
        border: "1px solid rgba(26,188,217,0.22)",
        boxShadow: "0 0 0 1px rgba(26,188,217,0.06), 0 0 28px -6px rgba(26,188,217,0.18)",
        backdropFilter: "blur(12px)",
      }}
    >
      <div className="space-y-4">
        {rows.map(({ label, detail, status, statusColor, extra }) => (
          <div key={label} className="flex items-center gap-3">
            <span className="text-[12px] text-white/35 w-[110px] shrink-0">{label}</span>
            {extra ?? (
              <span className="text-[12px] text-white/55 flex-1 truncate">{detail}</span>
            )}
            <span className={`text-[11px] font-medium tracking-wider shrink-0 ${statusColor}`}>
              {status}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-5 pt-4 border-t border-white/[0.06] flex items-center justify-between">
        <span className="text-[10px] text-white/25 tracking-widest uppercase">3 Gateways Connected</span>
        <span className="text-[10px] text-[#1abcd9] tracking-widest uppercase">API Latency: 12ms</span>
      </div>
    </div>
  )
}

/* ── Chat Channels UI (Node 2) ─────────────────────────────────────── */

const TABS = ["All", "Team", "Direct", "Favorites"] as const
type Tab = typeof TABS[number]

const TAB_ROWS: Record<Tab, { label: string; preview: string; status: string; statusColor: string; Icon: typeof MessageSquare; color: string }[]> = {
  All: [
    { label: "Chat",      Icon: MessageSquare, color: "#1abcd9", preview: "Team standup notes...", status: "UNREAD",    statusColor: "text-[#1abcd9]" },
    { label: "Telegram",  Icon: Send,          color: "#0088cc", preview: "Hey, are you free...", status: "READ",       statusColor: "text-white/30" },
    { label: "Instagram", Icon: Camera,        color: "#E1306C", preview: "Check this out...",    status: "ACTIVE",     statusColor: "text-emerald-400" },
    { label: "Facebook",  Icon: MessageCircle, color: "#0084ff", preview: "Can we schedule...",   status: "READ",       statusColor: "text-white/30" },
    { label: "WhatsApp",  Icon: Phone,         color: "#25D366", preview: "Thanks for the...",    status: "DELIVERED",  statusColor: "text-emerald-400" },
  ],
  Team: [
    { label: "Design",    Icon: MessageSquare, color: "#1abcd9", preview: "Figma link updated...", status: "UNREAD",   statusColor: "text-[#1abcd9]" },
    { label: "Dev",       Icon: MessageSquare, color: "#1abcd9", preview: "PR merged to main...",  status: "READ",     statusColor: "text-white/30" },
    { label: "Marketing", Icon: MessageSquare, color: "#1abcd9", preview: "Campaign is live...",   status: "ACTIVE",   statusColor: "text-emerald-400" },
  ],
  Direct: [
    { label: "Sarah M.",  Icon: MessageCircle, color: "#0088cc", preview: "When's the call?...",   status: "UNREAD",   statusColor: "text-[#1abcd9]" },
    { label: "Alex K.",   Icon: MessageCircle, color: "#0084ff", preview: "Sent the deck...",      status: "READ",     statusColor: "text-white/30" },
    { label: "Jordan T.", Icon: MessageCircle, color: "#25D366", preview: "All done here...",      status: "DELIVERED",statusColor: "text-emerald-400" },
  ],
  Favorites: [
    { label: "WhatsApp",  Icon: Phone,         color: "#25D366", preview: "Thanks for the...",    status: "DELIVERED",  statusColor: "text-emerald-400" },
    { label: "Instagram", Icon: Camera,        color: "#E1306C", preview: "Check this out...",    status: "ACTIVE",     statusColor: "text-emerald-400" },
  ],
}

function ChatChannelsUI() {
  const [activeTab, setActiveTab] = useState<Tab>("All")
  const rows = TAB_ROWS[activeTab]

  return (
    <div
      className="mt-6 rounded-2xl font-mono overflow-hidden"
      style={{
        background: "rgba(7,7,16,0.90)",
        border: "1px solid rgba(26,188,217,0.22)",
        boxShadow: "0 0 0 1px rgba(26,188,217,0.06), 0 0 28px -6px rgba(26,188,217,0.18)",
        backdropFilter: "blur(12px)",
      }}
    >
      {/* Tab bar */}
      <div className="flex border-b border-white/[0.06]">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-2.5 text-[11px] tracking-wider transition-colors ${
              activeTab === tab
                ? "text-[#1abcd9] border-b-2 border-[#1abcd9] -mb-px"
                : "text-white/25 hover:text-white/50"
            }`}
          >
            {tab.toUpperCase()}
          </button>
        ))}
      </div>

      {/* Rows */}
      <div className="p-4 space-y-3">
        {rows.map(({ label, Icon, color, preview, status, statusColor }) => (
          <div key={label} className="flex items-center gap-3">
            <div
              className="w-7 h-7 rounded-full flex items-center justify-center shrink-0"
              style={{ background: `${color}22`, border: `1px solid ${color}44` }}
            >
              <Icon className="h-3 w-3" style={{ color }} strokeWidth={1.8} />
            </div>
            <span className="text-[12px] text-white/55 w-[72px] shrink-0 truncate">{label}</span>
            <span className="text-[12px] text-white/30 flex-1 truncate">{preview}</span>
            <span className={`text-[10px] font-medium tracking-wider shrink-0 ${statusColor}`}>{status}</span>
          </div>
        ))}
      </div>

      <div className="px-4 pb-3 border-t border-white/[0.06] pt-3">
        <span className="text-[10px] text-white/25 tracking-widest uppercase">5 Channels Active</span>
      </div>
    </div>
  )
}

/* ── Meetings UI (Node 3) ──────────────────────────────────────────── */

const MEETING_ITEMS = [
  { label: "Upcoming Meetings",  Icon: CalendarClock, count: 3  },
  { label: "Ongoing Meetings",   Icon: Timer,         count: 1  },
  { label: "Invited Meetings",   Icon: CalendarPlus,  count: 2  },
  { label: "Past Meetings",      Icon: CalendarX,     count: null },
  { label: "Recordings",         Icon: VideoIcon,     count: null },
]

const UPCOMING = [
  { title: "Product Sync",   time: "10:00 AM", guests: 4  },
  { title: "Client Call",    time: "02:30 PM", guests: 2  },
  { title: "Design Review",  time: "04:00 PM", guests: 6  },
]

function MeetingsUI() {
  const [active, setActive] = useState("Upcoming Meetings")

  return (
    <div
      className="mt-6 rounded-2xl font-mono overflow-hidden"
      style={{
        background: "rgba(7,7,16,0.90)",
        border: "1px solid rgba(26,188,217,0.22)",
        boxShadow: "0 0 0 1px rgba(26,188,217,0.06), 0 0 28px -6px rgba(26,188,217,0.18)",
        backdropFilter: "blur(12px)",
      }}
    >
      {/* Menu list */}
      <div className="p-2 space-y-0.5">
        {MEETING_ITEMS.map(({ label, Icon, count }) => (
          <button
            key={label}
            onClick={() => setActive(label)}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-colors ${
              active === label
                ? "bg-[#1abcd9]/12 text-[#1abcd9]"
                : "text-white/40 hover:text-white/65 hover:bg-white/[0.04]"
            }`}
          >
            <Icon className="h-3.5 w-3.5 shrink-0" strokeWidth={1.8} />
            <span className="text-[12px] flex-1">{label}</span>
            {count !== null && (
              <span
                className={`text-[10px] px-1.5 py-0.5 rounded-full font-medium ${
                  active === label
                    ? "bg-[#1abcd9]/20 text-[#1abcd9]"
                    : "bg-white/[0.06] text-white/30"
                }`}
              >
                {count}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Preview strip — shown only for Upcoming */}
      {active === "Upcoming Meetings" && (
        <div className="border-t border-white/[0.06] px-4 py-3 space-y-2.5">
          {UPCOMING.map(({ title, time, guests }) => (
            <div key={title} className="flex items-center gap-3">
              <span className="text-[11px] text-[#1abcd9] w-[58px] shrink-0">{time}</span>
              <span className="text-[12px] text-white/60 flex-1 truncate">{title}</span>
              <span className="text-[10px] text-white/25">{guests} guests</span>
            </div>
          ))}
        </div>
      )}

      <div className="px-4 pb-3 pt-2 border-t border-white/[0.06]">
        <span className="text-[10px] text-white/25 tracking-widest uppercase">Today · 3 Upcoming</span>
      </div>
    </div>
  )
}

/* ── Text / SMS UI (Node 4) ────────────────────────────────────────── */

const SMS_THREADS = [
  { name: "Sarah M.",    number: "+1 312 555 0192", preview: "Your appt is confirmed ✓",  time: "10:32 AM", status: "read"      },
  { name: "Flash Sale",  number: "Campaign · 2.4k",  preview: "20% off ends tonight!",     time: "09:15 AM", status: "delivered" },
  { name: "Alex K.",     number: "+1 415 555 0847", preview: "Can you send the invoice?",  time: "Yesterday",status: "sent"      },
  { name: "Dev Team",    number: "Group · 8 people", preview: "Deploy went smooth 🚀",      time: "Yesterday",status: "read"      },
]

const STATUS_MAP = {
  read:      { label: "READ",      icon: CheckCheck, color: "#1abcd9"   },
  delivered: { label: "DELIVERED", icon: CheckCheck, color: "#10b981"   },
  sent:      { label: "SENT",      icon: Clock3,     color: "rgba(255,255,255,0.25)" },
}

function TextSmsUI() {
  const [selected, setSelected] = useState(0)

  return (
    <div
      className="mt-6 rounded-2xl font-mono overflow-hidden"
      style={{
        background: "rgba(7,7,16,0.90)",
        border: "1px solid rgba(26,188,217,0.22)",
        boxShadow: "0 0 0 1px rgba(26,188,217,0.06), 0 0 28px -6px rgba(26,188,217,0.18)",
        backdropFilter: "blur(12px)",
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/[0.06]">
        <span className="text-[11px] text-white/30 tracking-widest uppercase">Messages</span>
        <span className="inline-flex items-center gap-1.5 text-[10px] text-[#1abcd9] bg-[#1abcd9]/10 px-2.5 py-1 rounded-full border border-[#1abcd9]/20">
          <span className="w-1.5 h-1.5 rounded-full bg-[#1abcd9] animate-pulse" />
          2 Unread
        </span>
      </div>

      {/* Thread list */}
      <div className="divide-y divide-white/[0.04]">
        {SMS_THREADS.map(({ name, number, preview, time, status }, i) => {
          const s = STATUS_MAP[status as keyof typeof STATUS_MAP]
          const isSelected = selected === i
          return (
            <button
              key={name}
              onClick={() => setSelected(i)}
              className={`w-full flex items-start gap-3 px-4 py-3 text-left transition-colors ${
                isSelected ? "bg-[#1abcd9]/08" : "hover:bg-white/[0.03]"
              }`}
            >
              {/* Avatar */}
              <div className="w-8 h-8 rounded-full bg-[#1abcd9]/15 border border-[#1abcd9]/20 flex items-center justify-center shrink-0 text-[11px] text-[#1abcd9]">
                {name[0]}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-0.5">
                  <span className="text-[12px] text-white/70 truncate">{name}</span>
                  <span className="text-[10px] text-white/25 shrink-0 ml-2">{time}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <s.icon className="h-2.5 w-2.5 shrink-0" style={{ color: s.color }} strokeWidth={2.2} />
                  <span className="text-[11px] text-white/30 truncate">{preview}</span>
                </div>
              </div>
            </button>
          )
        })}
      </div>

      <div className="px-4 py-2.5 border-t border-white/[0.06] flex items-center justify-between">
        <span className="text-[10px] text-white/25 tracking-widest uppercase">SMS · MMS · Bulk</span>
        <span className="text-[10px] text-[#1abcd9] tracking-widest uppercase">1 Dedicated Number</span>
      </div>
    </div>
  )
}

/* ── Node Data ─────────────────────────────────────────────────────── */

type NodeData = {
  id: number
  Icon: LucideIcon
  num: string
  category: string
  heading: string
  desc: string
  content: string
  CustomUI?: React.ComponentType
}

const NODES: NodeData[] = [
  {
    id: 1,
    Icon: Phone,
    num: "/01",
    category: "VOICE COMMUNICATION",
    heading: "CALL",
    desc: "Crystal-clear audio for every business call. Route, record, and manage in real time — without switching tabs.",
    content: "",
    CustomUI: CallFlowUI,
  },
  {
    id: 2,
    Icon: MessageSquare,
    num: "/02",
    category: "TEAM MESSAGING",
    heading: "CHAT",
    desc: "Keep every thread organized. All channels, direct messages, and team conversations in one place.",
    content: "",
    CustomUI: ChatChannelsUI,
  },
  {
    id: 3,
    Icon: Video,
    num: "/03",
    category: "VIDEO CONFERENCING",
    heading: "MEET",
    desc: "Face-to-face meetings, anywhere. Schedule, host, and record without ever switching apps.",
    content: "",
    CustomUI: MeetingsUI,
  },
  {
    id: 4,
    Icon: Smartphone,
    num: "/04",
    category: "BUSINESS TEXTING",
    heading: "TEXT",
    desc: "Reach customers on their phones. SMS, MMS, and bulk campaigns from a single dedicated number.",
    content: "",
    CustomUI: TextSmsUI,
  },
]

/* ── Main Component ────────────────────────────────────────────────── */

export function ScrollStory() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const lineFillRef = useRef<HTMLDivElement>(null)
  const lineTrackRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    if (!sectionRef.current) return

    const ctx = gsap.context(() => {
      if (lineFillRef.current && lineTrackRef.current) {
        gsap.fromTo(
          lineFillRef.current,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: {
              trigger: lineTrackRef.current,
              start: "top 65%",
              end: "bottom 35%",
              scrub: 0.8,
            },
          }
        )
      }

      gsap.utils.toArray<HTMLElement>(".tl-node").forEach((node) => {
        const iconWrap = node.querySelector(".tl-icon-wrap")
        const glowEl = node.querySelector(".tl-glow")

        if (iconWrap) {
          gsap.fromTo(
            iconWrap,
            { scale: 0.65, opacity: 0.25 },
            {
              scale: 1,
              opacity: 1,
              duration: 0.55,
              ease: "back.out(2.2)",
              scrollTrigger: {
                trigger: node,
                start: "top 60%",
                toggleActions: "play none none reverse",
              },
            }
          )
        }

        if (glowEl) {
          gsap.fromTo(
            glowEl,
            { opacity: 0, scale: 0.4 },
            {
              opacity: 1,
              scale: 1,
              duration: 0.7,
              ease: "power2.out",
              scrollTrigger: {
                trigger: node,
                start: "top 60%",
                toggleActions: "play none none reverse",
              },
            }
          )
        }
      })

      gsap.utils.toArray<HTMLElement>(".tl-content").forEach((block) => {
        gsap.fromTo(
          block,
          { y: 50, opacity: 0, x: 24 },
          {
            y: 0,
            opacity: 1,
            x: 0,
            duration: 0.75,
            ease: "power3.out",
            scrollTrigger: {
              trigger: block,
              start: "top 68%",
              toggleActions: "play none none reverse",
            },
          }
        )
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="s-scroll-story"
      data-sec="story"
      className="relative bg-[#070710] py-24 md:py-32 px-[5%] overflow-hidden"
      style={{
        backgroundImage:
          "linear-gradient(rgba(255,255,255,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.07) 1px, transparent 1px)",
        backgroundSize: "60px 60px",
      }}
    >
      {/* Ambient glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 40% at 50% 0%, rgba(26,188,217,0.10), transparent 60%), radial-gradient(ellipse 60% 30% at 50% 100%, rgba(26,188,217,0.06), transparent 60%)",
        }}
      />

      {/* ── Section header ── */}
      <div className="max-w-[620px] mx-auto text-center mb-20 md:mb-28 relative z-10">
        <div className="inline-flex items-center gap-2.5 bg-white/[0.04] border border-white/[0.08] text-[#1abcd9] text-[11px] font-mono font-medium tracking-[2.5px] uppercase px-5 py-2.5 rounded-full mb-8">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full rounded-full bg-[#1abcd9] opacity-70 animate-ping" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#1abcd9]" />
          </span>
          ONE TAB. EVERY CONVERSATION.
        </div>

        <h2 className="font-serif text-4xl md:text-5xl lg:text-[58px] font-medium leading-[1.04] tracking-tight mb-6">
          <span className="block text-white">Talk. Text. Meet.</span>
          <span className="block text-white/30">All from Twiching.</span>
        </h2>

        <p className="text-[16px] text-white/40 leading-relaxed max-w-[500px] mx-auto">
          Phone calls, team chats, video meetings, and business texting. You used to juggle a dozen
          different apps just to talk to your team and customers. Now, your entire communications
          stack is handled in one place.
        </p>
      </div>

      {/* ── Desktop Timeline (lg+) ── */}
      <div
        ref={lineTrackRef}
        className="hidden lg:block max-w-[860px] mx-auto relative z-10"
      >
        {/* Vertical track line */}
        <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[2px] bg-white/[0.06]">
          <div
            ref={lineFillRef}
            className="absolute inset-0 bg-gradient-to-b from-[#1abcd9] via-[#1797ac] to-[#0891b2]"
            style={{ transform: "scaleY(0)", transformOrigin: "top" }}
          />
        </div>

        {NODES.map((node) => {
          const flip = node.id % 2 === 0

          const textBlock = (
            <div className={`tl-content max-w-[320px] ${flip ? "text-left" : "text-right"}`}>
              <div className={`flex items-center gap-3 mb-4 ${flip ? "justify-start" : "justify-end"}`}>
                <span className="text-[13px] font-mono font-medium text-[#1abcd9]">{node.num}</span>
                <span className="text-[11px] font-mono font-medium tracking-[2px] text-white/30 uppercase">{node.category}</span>
              </div>
              <h3 className="font-serif text-[56px] md:text-[72px] font-medium leading-none tracking-tight text-white mb-4">
                {node.heading}
              </h3>
              <p className="text-[14px] text-white/45 leading-relaxed">{node.desc}</p>
            </div>
          )

          const contentBlock = (
            <div className="tl-content max-w-[340px]">
              {node.content && <p className="text-[15px] text-white/55 leading-[1.85]">{node.content}</p>}
              {node.CustomUI && <node.CustomUI />}
            </div>
          )

          return (
            <div
              key={node.id}
              className="tl-node grid grid-cols-[1fr_auto_1fr] items-start py-20 first:pt-6 last:pb-6"
            >
              {/* Left column */}
              <div className={`flex ${flip ? "justify-end pr-8" : "justify-end pr-8"}`}>
                {flip ? contentBlock : textBlock}
              </div>

              {/* Center icon node */}
              <div className="relative z-10 flex items-center justify-center pt-0">
                <div
                  className="tl-glow absolute w-28 h-28 rounded-full"
                  style={{
                    background: "radial-gradient(circle, rgba(26,188,217,0.22) 0%, transparent 70%)",
                  }}
                />
                <div className="tl-icon-wrap group relative w-[82px] h-[82px] rounded-full bg-black border border-gray-800 flex items-center justify-center cursor-pointer transition-all duration-300 ease-in-out hover:scale-110 hover:border-[#1abcd9] hover:shadow-[0_0_20px_rgba(26,188,217,0.5)]">
                  <node.Icon className="h-6 w-6 text-gray-500 transition-colors duration-300 group-hover:text-white" strokeWidth={1.8} />
                </div>
              </div>

              {/* Right column */}
              <div className={`flex ${flip ? "justify-start pl-8" : "justify-start pl-8"}`}>
                {flip ? textBlock : contentBlock}
              </div>
            </div>
          )
        })}
      </div>

      {/* ── Mobile Timeline (< lg) ── */}
      <div className="lg:hidden max-w-[480px] mx-auto relative z-10">
        <div className="absolute left-5 top-0 bottom-0 w-[2px] bg-white/[0.06]">
          <div className="absolute inset-0 bg-gradient-to-b from-[#1abcd9] to-[#0891b2]" />
        </div>

        {NODES.map((node) => (
          <div key={node.id} className="relative flex gap-7 pb-14 last:pb-0 pl-12">
            <div className="absolute left-0 top-0 z-10 w-10 h-10 rounded-full bg-[#0d1117] border border-[#1abcd9]/25 flex items-center justify-center shadow-[0_0_16px_rgba(26,188,217,0.15)]">
              <node.Icon className="h-4 w-4 text-[#1abcd9]" strokeWidth={1.8} />
            </div>
            <div className="pt-1 w-full">
              {node.content && <p className="text-[14px] text-white/50 leading-relaxed">{node.content}</p>}
              {node.CustomUI && <node.CustomUI />}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
