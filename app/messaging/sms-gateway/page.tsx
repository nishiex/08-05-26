import { Metadata } from "next"
import { PageLayout } from "@/components/page-layout"
import { Faq } from "@/components/faq"
import { FinalCta } from "@/components/final-cta"

export const metadata: Metadata = {
  title: "SMS Gateway · Business Messaging That Gets Read | Twiching",
  description:
    "Send SMS, MMS, and alerts that customers actually see. Two-way messaging, TCR registration handled. 14-day free trial.",
}

const FAQS = [
  {
    q: "Is two-way SMS supported?",
    a: "Yes. Customers can reply and your team can respond from the dashboard or API.",
  },
  {
    q: "Does it support MMS?",
    a: "Yes. Send images, documents, and media alongside text.",
  },
  {
    q: "Do I need to handle 10DLC registration?",
    a: "No. Twiching handles TCR brand and campaign registration for you.",
  },
  {
    q: "What's the difference between SMS Gateway and Bulk SMS?",
    a: "Gateway is for operational messaging. Bulk SMS is for campaign outreach.",
  },
]

export default function SmsGatewayPage() {
  return (
    <PageLayout>
      {/* HERO */}
      <section className="bg-white">
        <div className="max-w-[1200px] mx-auto px-6 py-20 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl font-semibold leading-tight mb-4">
              Messages your customers actually read.
            </h1>
            <p className="text-gray-600 mb-6">
              Email gets ignored. Calls get missed. SMS gets opened.
              Send confirmations, alerts, and support messages from one platform.
            </p>

            <div className="flex gap-4">
              <a
                href="/pricing"
                className="bg-black text-white px-6 py-3 rounded-lg"
              >
                Start free trial
              </a>
              <a
                href="/messaging/bulk-sms"
                className="border px-6 py-3 rounded-lg"
              >
                See Bulk SMS
              </a>
            </div>

            <div className="flex gap-6 mt-6 text-sm text-gray-500">
              <span>98% open rate</span>
              <span>Two-way SMS</span>
              <span>TCR-registered</span>
              <span>Dashboard + API</span>
            </div>
          </div>

          {/* VISUAL PLACEHOLDER */}
          <div className="bg-gray-100 rounded-2xl h-[380px] flex items-center justify-center">
            <p className="text-gray-400 text-sm">
              SMS Dashboard / Chat UI Preview
            </p>
          </div>
        </div>
      </section>

      {/* PROBLEM SECTION */}
      <section className="bg-black text-white text-center py-20">
        <h2 className="text-3xl font-semibold mb-4">
          If it's important, it shouldn't be missed.
        </h2>
        <p className="text-gray-400 max-w-xl mx-auto">
          Appointment reminders sent by email get ignored. Calls go unanswered.
          SMS reaches customers where they actually pay attention — their phone.
        </p>
      </section>

      {/* FEATURES */}
      <section className="max-w-[1200px] mx-auto px-6 py-20">
        <h2 className="text-2xl font-semibold mb-10">
          Built for real-world messaging
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            "Two-way SMS conversations",
            "MMS (images, videos, attachments)",
            "Appointment reminders & confirmations",
            "Order and delivery updates",
            "Alerts, OTPs, and notifications",
            "Scheduled & automated sends",
            "Real-time delivery tracking",
            "Dashboard + API control",
            "High deliverability routing",
          ].map((item) => (
            <div
              key={item}
              className="border rounded-xl p-6 hover:shadow-sm transition"
            >
              <p className="font-medium text-gray-800">{item}</p>
            </div>
          ))}
        </div>
      </section>

      {/* USE CASES */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-[1200px] mx-auto px-6">
          <h2 className="text-2xl font-semibold mb-10">
            Where SMS makes the difference
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Healthcare",
                desc: "Reduce no-shows with appointment reminders",
              },
              {
                title: "E-commerce",
                desc: "Real-time order and delivery updates",
              },
              {
                title: "Finance",
                desc: "Transaction alerts and OTP verification",
              },
              {
                title: "Professional services",
                desc: "Client confirmations and follow-ups",
              },
              {
                title: "Field services",
                desc: "Technician updates and job notifications",
              },
              {
                title: "SaaS platforms",
                desc: "User alerts, onboarding, and engagement",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="bg-white p-6 rounded-xl border"
              >
                <h3 className="font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DIFFERENTIATION */}
      <section className="py-20">
        <div className="max-w-[900px] mx-auto text-center px-6">
          <h2 className="text-2xl font-semibold mb-4">
            Messaging without the compliance headache
          </h2>
          <p className="text-gray-600">
            Most SMS providers make you handle carrier rules, registration,
            and deliverability yourself. Twiching manages TCR registration,
            routing, and compliance — so your messages actually get delivered.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <Faq />

      {/* CTA */}
      <FinalCta />
    </PageLayout>
  )
}
