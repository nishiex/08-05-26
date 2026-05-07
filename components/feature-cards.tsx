"use client"

import { Phone, MessageSquare, Brain } from "lucide-react"
import { Feature108 } from "@/components/ui/feature108"

const tabs = [
  {
    value: "cloud-phone",
    icon: <Phone className="h-auto w-4 shrink-0" />,
    label: "Cloud Phone",
    content: {
      badge: "Carrier-grade voice",
      title: "A complete business phone system, ready in minutes.",
      description:
        "Local, vanity, toll-free and second numbers on one account. STIR/SHAKEN attestation on every outbound dial — your calls don't get flagged as spam.",
      bullets: [
        "Five number types — local, vanity, toll-free, virtual, second line",
        "Auto-attendant & multi-level IVR with no-code drag-and-drop",
        "Call recording, transcription and speaker identification",
      ],
      buttonText: "Explore phone features",
      imageSrc:
        "https://images.unsplash.com/photo-1556745753-b2904692b3cd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      imageAlt: "Business phone on a desk",
    },
  },
  {
    value: "messaging",
    icon: <MessageSquare className="h-auto w-4 shrink-0" />,
    label: "Messaging & Chat",
    content: {
      badge: "Sync + async, one app",
      title: "Chat, video and SMS — every channel in one place.",
      description:
        "Team channels and DMs that hop to a call in one click. Video meetings without leaving the app. Two-way SMS, MMS and bulk campaigns from a dedicated number.",
      bullets: [
        "Unlimited channels and direct messages with file sharing",
        "Schedule, host and record video meetings from the same view",
        "10DLC-ready bulk SMS with developer-friendly API",
      ],
      buttonText: "See messaging tools",
      imageSrc:
        "https://images.unsplash.com/photo-1552664730-d307ca884978?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      imageAlt: "Team collaborating on laptops",
    },
  },
  {
    value: "ai-insights",
    icon: <Brain className="h-auto w-4 shrink-0" />,
    label: "AI Insights",
    content: {
      badge: "Real-time intelligence",
      title: "Know what's working — across every conversation.",
      description:
        "Real-time transcripts, sentiment analysis and coaching summaries. Managers see what's converting and what's not, at scale, without listening to every call.",
      bullets: [
        "Live transcription with speaker identification on every call",
        "Sentiment scoring and topic detection per conversation",
        "Auto-generated coaching summaries for sales and support",
      ],
      buttonText: "Try AI insights",
      imageSrc:
        "https://images.unsplash.com/photo-1677442136019-21780ecad995?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      imageAlt: "AI data visualization",
    },
  },
]

export function FeatureCards() {
  return (
    <div id="s-features" data-sec="features">
      <Feature108
        badge="UCaaS Capabilities"
        heading="Everything your team needs. One platform."
        description="Voice, messaging and AI on a single account — one dashboard, one monthly bill, one number to call when something needs to change."
        tabs={tabs}
      />
    </div>
  )
}
