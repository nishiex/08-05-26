"use client"

import dynamic from "next/dynamic"

const OrbitingSkills = dynamic(() => import("@/components/ui/orbiting-skills"), {
  ssr: false,
  loading: () => <div className="w-[min(100vw-40px,450px)] aspect-square" />,
})

export function ChannelOrbit() {
  return (
    <section
      id="s-orbit"
      data-sec="orbit"
      className="relative bg-white py-16 md:py-24 px-[5%] overflow-hidden"
    >
      {/* Soft brand aurora */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[480px] w-[820px] rounded-full opacity-40 blur-3xl"
        style={{
          background:
            "radial-gradient(closest-side, rgba(26,188,217,0.18), rgba(26,188,217,0) 70%)",
        }}
      />

      <div className="relative max-w-[1100px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
        {/* Left: copy */}
        <div className="max-w-md">
          <div className="inline-flex items-center gap-2 mb-5">
            <span className="h-px w-8 bg-accent/50" />
            <span className="text-[11px] font-mono tracking-[2px] uppercase text-accent">
              One platform, every channel
            </span>
          </div>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-[44px] font-medium leading-[1.1] tracking-tight text-gray-900">
            Every channel your customers reach out on.{" "}
            <span className="italic text-accent">In one orbit.</span>
          </h2>
          <p className="mt-5 text-[15px] text-gray-500 leading-relaxed max-w-[440px]">
            Voice, chat, video, AI, recording and numbers — connected by one
            account, one dashboard, and one bill. Hover any node to see what it
            does.
          </p>
        </div>

        {/* Right: orbital animation */}
        <div className="flex items-center justify-center">
          <OrbitingSkills />
        </div>
      </div>
    </section>
  )
}
