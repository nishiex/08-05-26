"use client"

import { useEffect, useState } from "react"
import { AnnouncementBar } from "@/components/announcement-bar"
import { MegaNav } from "@/components/mega-nav"
import { Footer } from "@/components/footer"

interface PageLayoutProps {
  children: React.ReactNode
}

export function PageLayout({ children }: PageLayoutProps) {
  const [leavesVisible, setLeavesVisible] = useState(false)

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "s" || e.key === "S") setLeavesVisible((v) => !v)
    }
    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  }, [])

  return (
    <>
      <video
        id="leaves-overlay"
        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/leaves-wIvMm5mhKUhiRewKNv6OP1rtYnFtLX.mp4"
        autoPlay muted loop playsInline aria-hidden="true"
        style={{
          position: "fixed", inset: 0, width: "100%", height: "100%",
          objectFit: "cover", objectPosition: "top",
          mixBlendMode: "multiply", pointerEvents: "none",
          zIndex: 999, opacity: leavesVisible ? 1 : 0,
          transition: "opacity 700ms cubic-bezier(0.23,1,0.32,1)",
        }}
      />
      <AnnouncementBar />
      <MegaNav />
      <main id="main-content">{children}</main>
      <Footer />
    </>
  )
}
