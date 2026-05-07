"use client"

import { useState } from "react"
import { Plus } from "lucide-react"
import { SectionHeading } from "@/components/page-parts"

export function FaqSection({ items, heading }: { items: { q: string; a: string }[]; heading?: string }) {
  const [open, setOpen] = useState<number | null>(null)
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t border-gray-100">
      <SectionHeading eyebrow="FAQ" h2={heading ?? "Common questions"} />
      <div className="max-w-[720px] divide-y divide-gray-100">
        {items.map((item, i) => (
          <div key={i}>
            <button
              onClick={() => setOpen(open === i ? null : i)}
              className="w-full flex items-center justify-between py-5 text-left gap-4"
              aria-expanded={open === i}
            >
              <span className="font-semibold text-[15px] text-gray-800">{item.q}</span>
              <Plus
                className={`h-4 w-4 text-gray-400 flex-shrink-0 transition-transform duration-200 ${open === i ? "rotate-45" : ""}`}
                strokeWidth={2}
              />
            </button>
            <div className={`overflow-hidden transition-all duration-300 ${open === i ? "max-h-96 pb-5" : "max-h-0"}`}>
              <p className="text-base text-gray-600 leading-relaxed">{item.a}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
