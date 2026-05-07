"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"
import gsap from "gsap"

/* ─── data ─────────────────────────────────────────────────── */
const PROGRESS = [
  { label: "Product",   pct: "56%", color: "#f97316" },
  { label: "Marketing", pct: "65%", color: "#eab308" },
  { label: "Company",   pct: "87%", color: "#22c55e" },
]

const ACTIVITY = [
  { bg: "#fef3c7", stroke: "#d97706", label: "New supplier discovered",  sub: "2h ago · Vendor risk",  kind: "clock" },
  { bg: "#fee2e2", stroke: "#ef4444", label: "GDPR changes need review", sub: "5h ago · Compliance",   kind: "alert" },
  { bg: "#dcfce7", stroke: "#16a34a", label: "HR checklist reviewed",    sub: "Yesterday · HR policy", kind: "check" },
]

/* ─── component ────────────────────────────────────────────── */
export function DashboardPreview() {
  /* refs — GSAP targets */
  const sidebarRef  = useRef<HTMLDivElement>(null)
  const headerRef   = useRef<HTMLDivElement>(null)
  const card1Ref    = useRef<HTMLDivElement>(null)
  const card2Ref    = useRef<HTMLDivElement>(null)
  const card3Ref    = useRef<HTMLDivElement>(null)
  const card4Ref    = useRef<HTMLDivElement>(null)
  const card5Ref    = useRef<HTMLDivElement>(null)
  const chartPathRef = useRef<SVGPathElement>(null)
  const tooltipRef  = useRef<HTMLDivElement>(null)
  const prog0       = useRef<HTMLDivElement>(null)
  const prog1       = useRef<HTMLDivElement>(null)
  const prog2       = useRef<HTMLDivElement>(null)
  const act0        = useRef<HTMLDivElement>(null)
  const act1        = useRef<HTMLDivElement>(null)
  const act2        = useRef<HTMLDivElement>(null)
  const vidMainRef  = useRef<HTMLDivElement>(null)
  const recDotRef   = useRef<HTMLSpanElement>(null)
  const bar0        = useRef<HTMLSpanElement>(null)
  const bar1        = useRef<HTMLSpanElement>(null)
  const bar2        = useRef<HTMLSpanElement>(null)
  const notifRing   = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards    = [card1Ref, card2Ref, card3Ref, card4Ref, card5Ref].map(r => r.current!)
      const actItems = [act0, act1, act2].map(r => r.current!)
      const progs    = [prog0, prog1, prog2]
      const targets  = ["56%", "65%", "87%"]
      const bars     = [bar0, bar1, bar2]

      /* ── initial hidden states */
      gsap.set([sidebarRef.current, headerRef.current, ...cards, ...actItems], { opacity: 0 })
      gsap.set(sidebarRef.current,  { x: -80 })
      gsap.set(headerRef.current,   { y: -20 })
      gsap.set(cards,               { y: 40 })
      gsap.set(actItems,            { y: 10 })
      gsap.set(vidMainRef.current,  { scale: 0.96, opacity: 0 })
      gsap.set(tooltipRef.current,  { scale: 0.9, opacity: 0 })
      progs.forEach(r => { if (r.current) gsap.set(r.current, { width: "0%" }) })

      const pathEl = chartPathRef.current
      if (pathEl) {
        const len = pathEl.getTotalLength()
        gsap.set(pathEl, { strokeDasharray: len, strokeDashoffset: len })
      }

      /* ── main entrance timeline */
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } })

      tl.to(sidebarRef.current,  { x: 0, opacity: 1, duration: 0.6 })
        .to(headerRef.current,   { y: 0, opacity: 1, duration: 0.5 }, "-=0.3")
        .to(cards, { y: 0, opacity: 1, stagger: 0.08, duration: 0.6 }, "-=0.25")
        .to(actItems, { y: 0, opacity: 1, stagger: 0.05, duration: 0.4 }, "-=0.55")
        .to(vidMainRef.current,  { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(1.4)" }, "-=0.5")

      /* progress bars */
      tl.call(() => {
        progs.forEach((r, i) => {
          if (r.current) gsap.to(r.current, { width: targets[i], duration: 1.1, ease: "power2.out" })
        })
      }, [], "-=0.35")

      /* chart draw */
      tl.to(chartPathRef.current, { strokeDashoffset: 0, duration: 1.5, ease: "power2.inOut" }, "-=1.1")

      /* tooltip pop in */
      tl.to(tooltipRef.current, { scale: 1, opacity: 1, duration: 0.4, ease: "back.out(1.7)" }, "-=0.35")

      /* ── looping animations (after entrance) */
      tl.call(() => {
        /* recording dot blink */
        if (recDotRef.current) {
          gsap.to(recDotRef.current, {
            opacity: 0.15, duration: 0.65, repeat: -1, yoyo: true, ease: "none",
          })
        }
        /* audio wave bars */
        bars.forEach((r, i) => {
          if (!r.current) return
          gsap.to(r.current, {
            scaleY: 0.25,
            duration: 0.28 + i * 0.07,
            repeat: -1, yoyo: true,
            ease: "power1.inOut",
            delay: i * 0.13,
            transformOrigin: "bottom center",
          })
        })
        /* notification ring pulse */
        if (notifRing.current) {
          gsap.to(notifRing.current, {
            scale: 2.2, opacity: 0, duration: 1, repeat: -1, ease: "power1.out",
          })
        }
      })
    })

    return () => ctx.revert()
  }, [])

  /* ── Framer Motion variants */
  const cardV = {
    rest:  { y: 0, scale: 1,    boxShadow: "0 1px 3px rgba(0,0,0,0.06)" },
    hover: {
      y: -6, scale: 1.02,
      boxShadow: "0 18px 44px rgba(0,0,0,0.13)",
      transition: { type: "spring" as const, stiffness: 200, damping: 18 },
    },
  }

  const sideV = {
    rest:  { x: 0 },
    hover: { x: 4, transition: { type: "spring" as const, stiffness: 400, damping: 24 } },
  }

  return (
    <div
      className="flex overflow-hidden rounded-[22px] bg-[#eef2f7]"
      style={{ height: 560, fontFamily: "-apple-system,BlinkMacSystemFont,'Inter',sans-serif", fontSize: 13, color: "#111827" }}
    >
      {/* ── Sidebar */}
      <div
        ref={sidebarRef}
        className="flex-shrink-0 flex flex-col items-center py-4 gap-1"
        style={{ width: 58, background: "#1797ac" }}
      >
        {/* logo */}
        <div style={{ width:32, height:32, background:"white", borderRadius:8, display:"flex", alignItems:"center", justifyContent:"center", marginBottom:8 }}>
          <svg width="16" height="16" viewBox="0 0 16 16">
            <rect x="2" y="2" width="5" height="5" rx="1" fill="#1797ac"/>
            <rect x="9" y="2" width="5" height="5" rx="1" fill="#1797ac"/>
            <rect x="2" y="9" width="5" height="5" rx="1" fill="#1797ac"/>
            <rect x="9" y="9" width="5" height="5" rx="1" fill="#60a5fa"/>
          </svg>
        </div>

        {/* nav icons */}
        {[
          <svg key="h" width="15" height="15" viewBox="0 0 16 16" fill="none"><path d="M2 7L8 2l6 5v6a1 1 0 01-1 1H3a1 1 0 01-1-1z" stroke="white" strokeWidth="1.4" strokeLinejoin="round"/><path d="M6 14v-4h4v4" stroke="white" strokeWidth="1.4" strokeLinejoin="round"/></svg>,
          <svg key="b" width="15" height="15" viewBox="0 0 16 16" fill="none"><rect x="2" y="9" width="3" height="5" rx="1" stroke="rgba(255,255,255,.45)" strokeWidth="1.4"/><rect x="6.5" y="6" width="3" height="8" rx="1" stroke="rgba(255,255,255,.45)" strokeWidth="1.4"/><rect x="11" y="2" width="3" height="12" rx="1" stroke="rgba(255,255,255,.45)" strokeWidth="1.4"/></svg>,
          <svg key="d" width="15" height="15" viewBox="0 0 16 16" fill="none"><path d="M10 2H4a1 1 0 00-1 1v10a1 1 0 001 1h8a1 1 0 001-1V5z" stroke="rgba(255,255,255,.45)" strokeWidth="1.4" strokeLinejoin="round"/><path d="M10 2v3h3M5 8h6M5 11h4" stroke="rgba(255,255,255,.45)" strokeWidth="1.4" strokeLinecap="round"/></svg>,
          <svg key="s" width="15" height="15" viewBox="0 0 16 16" fill="none"><path d="M8 2L2 5v4c0 3 2.5 5.5 6 5.5S14 12 14 9V5z" stroke="rgba(255,255,255,.45)" strokeWidth="1.4" strokeLinejoin="round"/><path d="M5.5 8.5l2 2 3-3" stroke="rgba(255,255,255,.45)" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>,
          <svg key="e" width="15" height="15" viewBox="0 0 16 16" fill="none"><path d="M8 3L2 6l6 3 6-3-6-3z" stroke="rgba(255,255,255,.45)" strokeWidth="1.4" strokeLinejoin="round"/><path d="M5 7.5v3c0 1.5 1.5 2.5 3 2.5s3-1 3-2.5v-3" stroke="rgba(255,255,255,.45)" strokeWidth="1.4" strokeLinecap="round"/></svg>,
        ].map((icon, i) => (
          <motion.div key={i} initial="rest" whileHover="hover" variants={sideV}
            style={{ width:36, height:36, borderRadius:10, display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer", background: i===0 ? "rgba(255,255,255,0.22)" : "transparent" }}>
            {icon}
          </motion.div>
        ))}

        <div style={{ marginTop:"auto", width:28, height:28, borderRadius:"50%", background:"#1abcd9", border:"2px solid rgba(255,255,255,.3)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:9, fontWeight:700, color:"white" }}>B</div>
      </div>

      {/* ── Main */}
      <div style={{ flex:1, display:"flex", flexDirection:"column", minWidth:0, overflow:"hidden" }}>

        {/* Header */}
        <div ref={headerRef} style={{ padding:"12px 18px", background:"white", borderBottom:"1px solid #e9ecf0", flexShrink:0, display:"flex", alignItems:"center", justifyContent:"space-between" }}>
          <div>
            <div style={{ fontSize:9, color:"#9ca3af", marginBottom:1 }}>Good morning · Wed, 29 Apr</div>
            <div style={{ fontSize:14, fontWeight:600, color:"#111827" }}>Welcome back, Bianca</div>
          </div>
          <div style={{ display:"flex", alignItems:"center", gap:8 }}>
            <div style={{ position:"relative", width:26, height:26, borderRadius:8, background:"#f3f4f6", display:"flex", alignItems:"center", justifyContent:"center" }}>
              <svg width="12" height="12" viewBox="0 0 14 14" fill="none"><path d="M7 1.5A3 3 0 004 4.5c0 3-1.5 4-1.5 4h9S10 7.5 10 4.5A3 3 0 007 1.5zM5.5 8.5a1.5 1.5 0 003 0" stroke="#6b7280" strokeWidth="1.2" strokeLinecap="round"/></svg>
              {/* static red dot */}
              <span style={{ position:"absolute", top:2, right:2, width:6, height:6, borderRadius:"50%", background:"#ef4444" }} />
              {/* pulse ring */}
              <div ref={notifRing} style={{ position:"absolute", top:2, right:2, width:6, height:6, borderRadius:"50%", background:"#ef4444", opacity:0.7 }} />
            </div>
            <div style={{ width:28, height:28, borderRadius:"50%", background:"#dbeafe", display:"flex", alignItems:"center", justifyContent:"center", fontSize:10, fontWeight:700, color:"#1797ac" }}>BI</div>
          </div>
        </div>

        {/* Cards grid */}
        <div style={{ flex:1, padding:12, display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gridTemplateRows:"1fr 1fr", gap:10, gridTemplateAreas:'"a b c" "d d e"', overflow:"hidden" }}>

          {/* Card 1 — Audit Score */}
          <motion.div ref={card1Ref} initial="rest" whileHover="hover" variants={cardV}
            style={{ gridArea:"a", background:"white", borderRadius:12, padding:13, border:"1px solid #e9ecf0", cursor:"default", overflow:"hidden" }}>
            <div style={{ fontSize:9, fontWeight:700, textTransform:"uppercase", letterSpacing:"0.07em", color:"#9ca3af", marginBottom:8 }}>Real-time audit score</div>
            <div style={{ display:"flex", alignItems:"baseline", gap:5, marginBottom:3 }}>
              <span style={{ fontSize:28, fontWeight:700, lineHeight:1, color:"#111827" }}>526</span>
              <span style={{ fontSize:12, color:"#9ca3af" }}>/ 800</span>
              <span style={{ marginLeft:3, display:"inline-flex", alignItems:"center", gap:3, background:"#dcfce7", color:"#15803d", fontSize:8, fontWeight:700, padding:"2px 7px", borderRadius:20 }}>● Good</span>
            </div>
            <div style={{ fontSize:9, color:"#16a34a", fontWeight:700, marginBottom:10 }}>↑ +36 vs last month</div>
            {PROGRESS.map((p, i) => (
              <div key={p.label}>
                <div style={{ display:"flex", justifyContent:"space-between", marginBottom:2 }}>
                  <span style={{ fontSize:9, color:"#6b7280" }}>{p.label}</span>
                  <span style={{ fontSize:9, fontWeight:700, color:p.color }}>{p.pct}</span>
                </div>
                <div style={{ height:5, background:"#f0f2f5", borderRadius:3, marginBottom:i<2?8:0, overflow:"hidden" }}>
                  <div ref={[prog0,prog1,prog2][i]} style={{ height:"100%", borderRadius:3, background:p.color }} />
                </div>
              </div>
            ))}
          </motion.div>

          {/* Card 2 — Chart */}
          <motion.div ref={card2Ref} initial="rest" whileHover="hover" variants={cardV}
            style={{ gridArea:"b", background:"white", borderRadius:12, padding:13, border:"1px solid #e9ecf0", cursor:"default", position:"relative", overflow:"hidden" }}>
            <div style={{ fontSize:9, fontWeight:700, textTransform:"uppercase", letterSpacing:"0.07em", color:"#9ca3af", marginBottom:8 }}>Score over time</div>
            <svg width="100%" height="105" viewBox="0 0 220 95" preserveAspectRatio="none" style={{ display:"block" }}>
              <defs>
                <linearGradient id="cg2" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#1abcd9" stopOpacity=".18"/>
                  <stop offset="100%" stopColor="#1abcd9" stopOpacity="0"/>
                </linearGradient>
              </defs>
              <path d="M0,80 C25,76 40,60 65,52 C90,45 105,62 135,44 C160,28 178,34 220,14 L220,95 L0,95 Z" fill="url(#cg2)"/>
              <path ref={chartPathRef}
                d="M0,80 C25,76 40,60 65,52 C90,45 105,62 135,44 C160,28 178,34 220,14"
                fill="none" stroke="#1abcd9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="135" cy="44" r="3.5" fill="#1abcd9"/>
              <circle cx="135" cy="44" r="6" fill="none" stroke="#1abcd9" strokeWidth="1" opacity=".4"/>
            </svg>
            {/* tooltip */}
            <div ref={tooltipRef} style={{ position:"absolute", top:34, right:12, background:"white", border:"1px solid #e9ecf0", borderRadius:9, padding:"7px 9px", fontSize:9, minWidth:108, zIndex:2 }}>
              <div style={{ fontWeight:700, fontSize:10, color:"#111827", marginBottom:5 }}>Oct 2024</div>
              {[["#22c55e","Maintained · 24"],["#1abcd9","Improved · 12"],["#f97316","Worsened · 3"]].map(([c,l])=>(
                <div key={l} style={{ display:"flex", alignItems:"center", gap:5, color:"#6b7280", marginBottom:3 }}>
                  <span style={{ width:6, height:6, borderRadius:"50%", background:c, display:"inline-block", flexShrink:0 }}/>
                  {l}
                </div>
              ))}
            </div>
            <div style={{ display:"flex", justifyContent:"space-between", marginTop:3 }}>
              {["Jul","Aug","Sep","Oct","Nov"].map(m=><span key={m} style={{ fontSize:8, color:"#9ca3af" }}>{m}</span>)}
            </div>
          </motion.div>

          {/* Card 3 — Activity Feed */}
          <motion.div ref={card3Ref} initial="rest" whileHover="hover" variants={cardV}
            style={{ gridArea:"c", background:"white", borderRadius:12, padding:13, border:"1px solid #e9ecf0", cursor:"default", overflow:"hidden" }}>
            <div style={{ fontSize:9, fontWeight:700, textTransform:"uppercase", letterSpacing:"0.07em", color:"#9ca3af", marginBottom:8 }}>Activity feed</div>
            {ACTIVITY.map((item, i) => (
              <div key={i} ref={[act0,act1,act2][i]}
                style={{ display:"flex", alignItems:"flex-start", gap:8, padding:"7px 0", borderBottom: i<2 ? "1px solid #f3f4f6" : "none" }}>
                <div style={{ width:26, height:26, borderRadius:7, flexShrink:0, display:"flex", alignItems:"center", justifyContent:"center", background:item.bg }}>
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                    {item.kind==="clock" && <><circle cx="5" cy="5" r="3.5" stroke={item.stroke} strokeWidth="1.2"/><path d="M5 3.2v2l1.4 1" stroke={item.stroke} strokeWidth="1" strokeLinecap="round"/></>}
                    {item.kind==="alert" && <><path d="M5 1.5L1 8.5h8z" stroke={item.stroke} strokeWidth="1.2" strokeLinejoin="round"/><path d="M5 4v2M5 7.2v.4" stroke={item.stroke} strokeWidth="1" strokeLinecap="round"/></>}
                    {item.kind==="check" && <path d="M1.5 5l2.5 2.5 4.5-4.5" stroke={item.stroke} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>}
                  </svg>
                </div>
                <div>
                  <div style={{ fontSize:10, fontWeight:600, color:"#111827" }}>{item.label}</div>
                  <div style={{ fontSize:8, color:"#9ca3af", marginTop:2 }}>{item.sub}</div>
                </div>
              </div>
            ))}
          </motion.div>

          {/* Card 4 — Video Meeting */}
          <motion.div ref={card4Ref} initial="rest" whileHover="hover" variants={cardV}
            style={{ gridArea:"d", background:"white", borderRadius:12, padding:13, border:"1px solid #e9ecf0", cursor:"default", overflow:"hidden" }}>
            <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:10 }}>
              <div style={{ fontSize:9, fontWeight:700, textTransform:"uppercase", letterSpacing:"0.07em", color:"#9ca3af" }}>Risk committee meeting</div>
              <div style={{ display:"flex", alignItems:"center", gap:4, background:"#fef2f2", padding:"3px 8px", borderRadius:20 }}>
                <span ref={recDotRef} style={{ width:6, height:6, borderRadius:"50%", background:"#ef4444", display:"inline-block" }}/>
                <span style={{ fontSize:8, fontWeight:700, color:"#dc2626" }}>Recording</span>
              </div>
            </div>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 2fr", gap:8, marginBottom:10 }}>
              <div style={{ display:"flex", flexDirection:"column", gap:6 }}>
                <div style={{ background:"#1e3a8a", borderRadius:9, height:64, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:3 }}>
                  <div style={{ width:24, height:24, borderRadius:"50%", background:"#1abcd9", display:"flex", alignItems:"center", justifyContent:"center", fontSize:8, fontWeight:700, color:"white" }}>BM</div>
                  <span style={{ fontSize:7, color:"rgba(255,255,255,.5)" }}>Board Member</span>
                </div>
                <div style={{ background:"#14532d", borderRadius:9, height:64, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:3 }}>
                  <div style={{ width:24, height:24, borderRadius:"50%", background:"#22c55e", display:"flex", alignItems:"center", justifyContent:"center", fontSize:8, fontWeight:700, color:"white" }}>DPO</div>
                  <span style={{ fontSize:7, color:"rgba(255,255,255,.5)" }}>Data Protection</span>
                </div>
              </div>
              <div ref={vidMainRef} style={{ background:"#1f2937", borderRadius:9, height:134, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:6, position:"relative" }}>
                <div style={{ width:38, height:38, borderRadius:"50%", background:"#1797ac", display:"flex", alignItems:"center", justifyContent:"center", fontSize:13, fontWeight:700, color:"white" }}>B</div>
                <span style={{ fontSize:10, color:"rgba(255,255,255,.7)", fontWeight:500 }}>Bianca — Host</span>
                {/* audio wave */}
                <div style={{ position:"absolute", bottom:8, left:8, display:"flex", alignItems:"flex-end", gap:2 }}>
                  {[bar0,bar1,bar2].map((r,i)=>(
                    <span key={i} ref={r} style={{ width:3, borderRadius:2, background:"#22c55e", display:"inline-block", height:[8,13,7][i] }}/>
                  ))}
                </div>
              </div>
            </div>
            {/* controls */}
            <div style={{ display:"flex", justifyContent:"center", gap:8 }}>
              {[
                { bg:"#f3f4f6", icon:<svg width="13" height="13" viewBox="0 0 14 14" fill="none"><rect x="1" y="4" width="8" height="6" rx="1.5" stroke="#374151" strokeWidth="1.2"/><path d="M9 6l4-2v6l-4-2z" stroke="#374151" strokeWidth="1.2" strokeLinejoin="round"/></svg> },
                { bg:"#f3f4f6", icon:<svg width="13" height="13" viewBox="0 0 14 14" fill="none"><rect x="4" y="1" width="6" height="8" rx="3" stroke="#374151" strokeWidth="1.2"/><path d="M2 7a5 5 0 0010 0M7 12v1.5" stroke="#374151" strokeWidth="1.2" strokeLinecap="round"/></svg> },
                { bg:"#ef4444", icon:<svg width="13" height="13" viewBox="0 0 14 14" fill="none"><path d="M2 4.5A1.5 1.5 0 013.5 3h.5l1.5 3.5-1.5 1.5a7 7 0 004 4L9.5 10 13 11.5v.5A1.5 1.5 0 0111.5 13.5C5.5 13.5 0 8 0 2z" fill="white" opacity=".9"/><path d="M10 2l-4 4" stroke="white" strokeWidth="1.5" strokeLinecap="round"/></svg> },
              ].map((btn,i)=>(
                <motion.div key={i}
                  whileHover={{ scale: 1.12, boxShadow: i===2 ? "0 4px 14px rgba(239,68,68,0.45)" : "0 4px 12px rgba(0,0,0,0.1)" }}
                  whileTap={{ scale: 0.92 }}
                  style={{ width:34, height:34, borderRadius:"50%", background:btn.bg, display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer" }}>
                  {btn.icon}
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Card 5 — Progress */}
          <motion.div ref={card5Ref} initial="rest" whileHover="hover" variants={cardV}
            style={{ gridArea:"e", background:"white", borderRadius:12, padding:13, border:"1px solid #e9ecf0", cursor:"default", overflow:"hidden" }}>
            <div style={{ fontSize:9, fontWeight:700, textTransform:"uppercase", letterSpacing:"0.07em", color:"#9ca3af", marginBottom:8 }}>Q1 risk treatment plan</div>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:5 }}>
              <span style={{ fontSize:12, fontWeight:600, color:"#111827" }}>3 goals</span>
              <span style={{ fontSize:10, color:"#6b7280" }}>68%</span>
            </div>
            <div style={{ height:6, background:"#f0f2f5", borderRadius:4, marginBottom:12, overflow:"hidden" }}>
              <div style={{ width:"68%", height:"100%", background:"#1abcd9", borderRadius:4 }}/>
            </div>
            {[
              { done:true,  label:"Vendor assessments complete" },
              { done:true,  label:"Data mapping reviewed" },
              { done:false, label:"Board sign-off pending" },
            ].map((g,i)=>(
              <div key={i} style={{ display:"flex", alignItems:"center", gap:7, marginBottom:7 }}>
                <div style={{ width:15, height:15, borderRadius:4, flexShrink:0, display:"flex", alignItems:"center", justifyContent:"center", background: g.done?"#dbeafe":"#f3f4f6", border: g.done?"none":"1px solid #e5e7eb" }}>
                  {g.done && <svg width="8" height="8" viewBox="0 0 8 8" fill="none"><path d="M1 4l2 2 4-4" stroke="#1797ac" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                </div>
                <span style={{ fontSize:10, color: g.done?"#374151":"#9ca3af" }}>{g.label}</span>
              </div>
            ))}
            {/* avatars */}
            <div style={{ display:"flex", alignItems:"center", marginTop:4 }}>
              <div style={{ display:"flex" }}>
                {[["B","#1abcd9"],["M","#8b5cf6"],["D","#06b6d4"]].map(([l,c],i)=>(
                  <div key={i} style={{ width:22, height:22, borderRadius:"50%", background:c, border:"2px solid white", display:"flex", alignItems:"center", justifyContent:"center", fontSize:7, fontWeight:700, color:"white", marginRight:-7, zIndex:3-i, position:"relative" }}>{l}</div>
                ))}
              </div>
              <span style={{ fontSize:9, color:"#9ca3af", marginLeft:14 }}>3 assigned</span>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  )
}
