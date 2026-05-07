"use client"

import { useEffect, useState } from "react"
import { AnnouncementBar } from "@/components/announcement-bar"
import { MegaNav } from "@/components/mega-nav"
import { LogoStrip } from "@/components/logo-strip"
import { FeatureCards } from "@/components/feature-cards"
import { ScrollStory } from "@/components/scroll-story"
import { ValueProp } from "@/components/value-prop"
import { Testimonials } from "@/components/testimonials"
import { Faq } from "@/components/faq"
import { FinalCta } from "@/components/final-cta"
import { Footer } from "@/components/footer"
import { ShaderGradientSection } from "@/components/shader-gradient-section"

export default function Page() {
  
  return (
    <>
      <AnnouncementBar />
      <MegaNav />
      <main >
        <ShaderGradientSection />
        <LogoStrip />
        <FeatureCards />
        <ValueProp />
        <ScrollStory />
        <Testimonials />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
    </>
  )
}
