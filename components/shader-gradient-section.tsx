'use client'

import { useEffect, useRef } from 'react'
import {
  ShaderGradient,
  ShaderGradientInput,
  ShaderGradientPresetName,
} from '@shader-gradient/core'
import { TimelineAnimation } from '@/components/ui/timeline-animation'
import { HeroStoryPanel } from '@/components/ui/hero-story-panel'

export function ShaderGradientSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const gradientRef = useRef<ShaderGradient | null>(null)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    let disposed = false

    async function init() {
      try {
        const gradientOptions: Partial<ShaderGradientInput> = {
          pixelDensity: 1.5,
          preset: 'interstella' as ShaderGradientPresetName,
          color1: '#0a1628',
          color2: '#0d4f6b',
          color3: '#1abcd9',
          cameraZoom: 25.00,
          // ❌ remove chromaticAberration and chromaticAberrationStrength
          // If you want that effect, it’s controlled internally by the preset/shader
        }

        if (disposed || !containerRef.current) return

        gradientRef.current = new ShaderGradient(containerRef.current, gradientOptions)
      } catch (error) {
        console.error('[ShaderGradient] init error:', error)
      }
    }

    init()

    return () => {
      disposed = true
      if (gradientRef.current) {
        gradientRef.current.dispose()
        gradientRef.current = null
      }
    }
  }, [])

  return (
    <section ref={sectionRef} className="relative w-full h-[900px] md:h-[700px] lg:h-[800px] overflow-hidden">
      <div
        ref={containerRef}
        id="shader-gradient"
        className="absolute inset-0 w-full h-full"
      />

      {/* Left / Right content overlay */}
      <div className="absolute inset-0 z-10 flex items-center">
        <div className="w-full max-w-[1280px] mx-auto px-6 lg:px-12 flex flex-col lg:flex-row items-center gap-12 lg:gap-20">

          {/* Left column */}
          <div className="flex-1 flex flex-col items-start text-left max-w-[520px]">
            <TimelineAnimation
              once={true}
              as="span"
              animationNum={1}
              timelineRef={sectionRef}
              className="inline-flex items-center gap-1.5 text-[11px] font-semibold tracking-widest uppercase text-accent border border-accent/40 bg-accent/10 backdrop-blur-sm rounded-full px-4 py-1.5 mb-6"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-accent inline-block" />
              The Platform
            </TimelineAnimation>

            <TimelineAnimation
              once={true}
              as="h2"
              animationNum={2}
              timelineRef={sectionRef}
              className="text-4xl lg:text-5xl font-normal leading-[1.15] tracking-tight mb-4"
            >
              <span className="block text-white">One workspace.</span>
              <span className="block bg-clip-text text-transparent bg-gradient-to-r from-accent to-[#7ee8f5]">
                Every customer conversation.
              </span>
            </TimelineAnimation>

            <TimelineAnimation
              once={true}
              as="p"
              animationNum={3}
              timelineRef={sectionRef}
              className="text-base text-white/70 leading-relaxed max-w-[420px]"
            >
              Stop stitching together disconnected tools. Twiching brings voice, messaging, AI automation, analytics, and customer context into a single workflow.
            </TimelineAnimation>
          </div>

          {/* Right column */}
          <HeroStoryPanel />

        </div>
      </div>
    </section>
  )
}
