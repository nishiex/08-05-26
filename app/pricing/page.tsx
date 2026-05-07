import type { Metadata } from "next"
import { PageLayout } from "@/components/page-layout"
import PricingClient from "./pricing-client"
import { FinalCta } from "@/components/final-cta"

export const metadata: Metadata = {
  title: "Twiching Pricing · Starter $9.99 | Professional $15.99 | Enterprise $25.99",
  description: "Four plans. 14-day free trial. Starter from $9.99/mo billed annually.",
}

export default function PricingPage() {
  return (
    <PageLayout>
      <PricingClient />
      <FinalCta />
    </PageLayout>
  )
}
