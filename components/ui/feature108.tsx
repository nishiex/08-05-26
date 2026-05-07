"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

interface TabContent {
  badge: string
  title: string
  description: string
  buttonText: string
  imageSrc: string
  imageAlt: string
  bullets?: string[]
}

interface Tab {
  value: string
  icon: React.ReactNode
  label: string
  content: TabContent
}

interface Feature108Props {
  badge?: string
  heading?: string
  description?: string
  tabs: Tab[]
}

const Feature108 = ({
  badge = "UCaaS Capabilities",
  heading = "Everything your team needs.",
  description = "Voice, messaging and AI on a single account — one dashboard, one monthly bill.",
  tabs,
}: Feature108Props) => {
  return (
    <section className="relative py-14 md:py-20 px-[5%] bg-white overflow-hidden">
      {/* Brand aurora */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 h-[420px] w-[820px] rounded-full opacity-50 blur-3xl"
        style={{
          background:
            "radial-gradient(closest-side, rgba(26,188,217,0.18), rgba(26,188,217,0) 70%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 right-0 h-[360px] w-[520px] rounded-full opacity-30 blur-3xl"
        style={{
          background:
            "radial-gradient(closest-side, rgba(149,217,232,0.20), rgba(149,217,232,0) 70%)",
        }}
      />
      <div className="relative max-w-[1100px] mx-auto">
        <div className="flex flex-col items-center gap-4 text-center">
          <Badge
            variant="outline"
            className="border-[#1abcd9]/40 bg-[#1abcd9]/5 text-accent font-mono tracking-[2px] uppercase text-[10px] px-3"
          >
            {badge}
          </Badge>
          <h2 className="font-serif max-w-2xl text-3xl md:text-4xl lg:text-5xl font-medium leading-[1.05] tracking-tight text-gray-900">
            {heading}
          </h2>
          <p className="text-muted-foreground max-w-lg">{description}</p>
        </div>
        <Tabs defaultValue={tabs[0].value} className="mt-8 md:mt-10">
          <TabsList className="flex flex-col items-center justify-center gap-3 sm:flex-row md:gap-2">
            {tabs.map((tab) => (
              <TabsTrigger
                key={tab.value}
                value={tab.value}
                className="flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium font-mono text-muted-foreground border border-transparent hover:border-gray-200 data-[state=active]:bg-[#1abcd9]/[0.08] data-[state=active]:border-[#1abcd9]/30 data-[state=active]:text-accent transition-colors"
              >
                {tab.icon} {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
          <div
            className="mx-auto mt-8 rounded-2xl border border-[#1abcd9]/15 p-6 md:p-10 shadow-[0_24px_60px_-30px_rgba(26,188,217,0.25)]"
            style={{
              background:
                "linear-gradient(160deg, #f4fbfc 0%, #ffffff 45%, #f0f8fb 100%)",
            }}
          >
            {tabs.map((tab) => (
              <TabsContent
                key={tab.value}
                value={tab.value}
                className="grid place-items-center gap-10 lg:grid-cols-2 lg:gap-12"
              >
                <div className="flex flex-col gap-4 w-full">
                  <Badge
                    variant="outline"
                    className="w-fit bg-[#1abcd9]/10 text-[10px] font-mono tracking-[1.5px] uppercase border-[#1abcd9]/30 text-accent"
                  >
                    {tab.content.badge}
                  </Badge>
                  <h3 className="font-serif text-2xl md:text-3xl lg:text-4xl font-medium leading-tight tracking-tight text-gray-900">
                    {tab.content.title}
                  </h3>
                  <p className="text-muted-foreground text-[15px] leading-relaxed">
                    {tab.content.description}
                  </p>
                  {tab.content.bullets && (
                    <ul className="mt-1 space-y-2">
                      {tab.content.bullets.map((b) => (
                        <li
                          key={b}
                          className="flex items-start gap-2 text-[14px] text-gray-700"
                        >
                          <span className="mt-1.5 inline-block h-1.5 w-1.5 rounded-full bg-[#1abcd9] shrink-0" />
                          {b}
                        </li>
                      ))}
                    </ul>
                  )}
                  <Button
                    size="lg"
                    className="mt-2 w-fit bg-accent hover:bg-[color:var(--accent-dark)] text-white font-mono"
                  >
                    {tab.content.buttonText}
                  </Button>
                </div>
                <div className="relative w-full max-w-[480px]">
                  <div
                    aria-hidden
                    className="absolute -inset-3 rounded-2xl blur-2xl opacity-60"
                    style={{
                      background:
                        "radial-gradient(closest-side, rgba(26,188,217,0.22), rgba(26,188,217,0) 70%)",
                    }}
                  />
                  <img
                    src={tab.content.imageSrc}
                    alt={tab.content.imageAlt}
                    className="relative rounded-xl w-full aspect-[4/3] object-cover ring-1 ring-[#1abcd9]/20 shadow-[0_20px_40px_-20px_rgba(15,122,142,0.35)]"
                  />
                </div>
              </TabsContent>
            ))}
          </div>
        </Tabs>
      </div>
    </section>
  )
}

export { Feature108 }
