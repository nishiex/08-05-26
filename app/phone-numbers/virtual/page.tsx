import { Metadata } from "next"
import { VirtualNumberPage } from "@/components/virtual-number-page"

export const metadata: Metadata = {
  title: "Virtual Phone Numbers · Any Area Code, Any Device | Twiching",
  description:
    "Virtual phone numbers routed to any device. Nationwide area codes. STIR/SHAKEN ready. 14-day free trial.",
}

export default function VirtualPage() {
  return <VirtualNumberPage />
}
