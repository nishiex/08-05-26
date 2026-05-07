"use client"

import { useState } from "react"
import { MegaNav } from "@/components/mega-nav"
import { Footer } from "@/components/footer"
import { motion } from "framer-motion"
import {
  Mail, Phone, MapPin, Clock,
  MessageSquare, Building2, ArrowRight, Check,
} from "lucide-react"

const CONTACT_CHANNELS = [
  {
    icon: MessageSquare,
    label: "Sales enquiries",
    detail: "sales@twiching.ai",
    note: "Response within 2 business hours",
  },
  {
    icon: Phone,
    label: "Support",
    detail: "support@twiching.ai",
    note: "24/7 for Business & Enterprise",
  },
  {
    icon: Building2,
    label: "Partnerships",
    detail: "partners@twiching.ai",
    note: "Carrier, reseller & API partners",
  },
  {
    icon: MapPin,
    label: "Headquarters",
    detail: "Singapore, Pte. Ltd.",
    note: "Equinix SG1 infrastructure",
  },
]

type FormState = "idle" | "submitting" | "success"

export default function ContactPage() {
  const [form, setForm]       = useState({ name: "", company: "", email: "", phone: "", interest: "", message: "" })
  const [state, setState]     = useState<FormState>("idle")

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setState("submitting")
    // Simulate network round-trip; replace with real API call
    await new Promise((r) => setTimeout(r, 1200))
    setState("success")
  }

  return (
    <div className="min-h-screen bg-white font-sans">
      <MegaNav />

      {/* Page header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16">
        <div className="max-w-[640px]">
          <div className="flex items-center gap-2 mb-5">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-accent" />
            <p className="text-[11px] font-mono font-bold tracking-[2px] uppercase text-accent">Contact us</p>
          </div>
          <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight text-gray-900 leading-[1.06] text-balance mb-5">
            {"Let's talk"}
          </h1>
          <p className="text-base sm:text-lg text-gray-500 leading-relaxed">
            Whether you want to start a free trial, discuss enterprise pricing, or ask a technical question — our team responds fast.
          </p>
        </div>
      </section>

      <div className="border-t border-gray-100" />

      {/* Two-column layout */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-14 items-start">

          {/* LEFT — contact form */}
          <div>
            {state === "success" ? (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-2xl border border-emerald-100 bg-emerald-50 p-10 flex flex-col items-center text-center gap-4"
              >
                <span className="w-14 h-14 rounded-full bg-emerald-100 grid place-items-center">
                  <Check className="h-7 w-7 text-emerald-600" strokeWidth={2.5} />
                </span>
                <h2 className="text-xl font-semibold text-gray-900">Message received</h2>
                <p className="text-sm text-gray-500 max-w-[340px] leading-relaxed">
                  {"Thanks for reaching out. A member of our team will be in touch within 2 business hours."}
                </p>
                <button
                  onClick={() => { setState("idle"); setForm({ name: "", company: "", email: "", phone: "", interest: "", message: "" }) }}
                  className="mt-2 text-[13px] font-semibold text-accent hover:underline"
                >
                  Send another message
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Send us a message</h2>

                {/* Name + Company */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-[12px] font-semibold text-gray-600 mb-1.5">Full name <span className="text-red-400">*</span></label>
                    <input
                      id="name" name="name" type="text" required
                      value={form.name} onChange={handleChange}
                      placeholder="Jane Smith"
                      className="w-full h-11 px-4 rounded-xl border border-gray-200 bg-white text-[14px] text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition"
                    />
                  </div>
                  <div>
                    <label htmlFor="company" className="block text-[12px] font-semibold text-gray-600 mb-1.5">Company</label>
                    <input
                      id="company" name="company" type="text"
                      value={form.company} onChange={handleChange}
                      placeholder=""
                      className="w-full h-11 px-4 rounded-xl border border-gray-200 bg-white text-[14px] text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition"
                    />
                  </div>
                </div>

                {/* Email + Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="email" className="block text-[12px] font-semibold text-gray-600 mb-1.5">Work email <span className="text-red-400">*</span></label>
                    <input
                      id="email" name="email" type="email" required
                      value={form.email} onChange={handleChange}
                      placeholder=""
                      className="w-full h-11 px-4 rounded-xl border border-gray-200 bg-white text-[14px] text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-[12px] font-semibold text-gray-600 mb-1.5">Phone number</label>
                    <input
                      id="phone" name="phone" type="tel"
                      value={form.phone} onChange={handleChange}
                      placeholder="+1 415 555 0100"
                      className="w-full h-11 px-4 rounded-xl border border-gray-200 bg-white text-[14px] text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition"
                    />
                  </div>
                </div>

                {/* Interest */}
                <div>
                  <label htmlFor="interest" className="block text-[12px] font-semibold text-gray-600 mb-1.5">{"I'm interested in"}</label>
                  <select
                    id="interest" name="interest"
                    value={form.interest} onChange={handleChange}
                    className="w-full h-11 px-4 rounded-xl border border-gray-200 bg-white text-[14px] text-gray-900 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition"
                  >
                    <option value="">Select a topic…</option>
                    <option value="virtual-numbers">Virtual phone numbers</option>
                    <option value="voice">Voice & VoIP</option>
                    <option value="messaging">SMS & Messaging</option>
                    <option value="enterprise">Enterprise plan</option>
                    <option value="wholesale">Wholesale voice</option>
                    <option value="support">Technical support</option>
                    <option value="other">Something else</option>
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className="block text-[12px] font-semibold text-gray-600 mb-1.5">Message <span className="text-red-400">*</span></label>
                  <textarea
                    id="message" name="message" required rows={5}
                    value={form.message} onChange={handleChange}
                    placeholder="Tell us what you need — team size, use case, current setup..."
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-[14px] text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition resize-none"
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={state === "submitting"}
                  whileHover={{ y: -1 }} whileTap={{ scale: 0.98 }}
                  className="inline-flex items-center gap-2 bg-accent text-white font-semibold text-[14px] px-7 py-3 rounded-full shadow-[0_6px_20px_-6px_rgba(26,188,217,0.5)] hover:bg-[#1797ac] transition disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {state === "submitting" ? "Sending…" : "Send message"}
                  {state !== "submitting" && <ArrowRight className="h-4 w-4" strokeWidth={2.2} />}
                </motion.button>
              </form>
            )}
          </div>

          {/* RIGHT — channel cards + hours */}
          <div className="space-y-4">
            <h2 className="text-[14px] font-semibold text-gray-900 mb-6">Other ways to reach us</h2>

            {CONTACT_CHANNELS.map(({ icon: Icon, label, detail, note }) => (
              <div
                key={label}
                className="flex items-start gap-4 rounded-2xl border border-gray-100 bg-white p-5 hover:border-accent/20 hover:shadow-sm transition-all"
              >
                <span className="w-9 h-9 rounded-xl bg-[#e0f7fa] text-accent grid place-items-center flex-shrink-0">
                  <Icon className="h-4 w-4" strokeWidth={1.8} />
                </span>
                <div>
                  <p className="text-[13px] font-semibold text-gray-900">{label}</p>
                  <p className="text-[13px] text-accent font-mono mt-0.5">{detail}</p>
                  <p className="text-[11px] text-gray-400 mt-1">{note}</p>
                </div>
              </div>
            ))}

            {/* Office hours */}
            <div className="rounded-2xl border border-gray-100 bg-gray-50/60 p-5 mt-2">
              <div className="flex items-center gap-2 mb-3">
                <Clock className="h-4 w-4 text-gray-400" strokeWidth={1.8} />
                <p className="text-[12px] font-mono font-bold tracking-[1.5px] uppercase text-gray-400">Office hours (SGT)</p>
              </div>
              <div className="space-y-1.5 text-[13px] text-gray-600">
                <div className="flex justify-between"><span>Mon – Fri</span><span className="font-semibold">09:00 – 18:00</span></div>
                <div className="flex justify-between"><span>Sat</span><span className="font-semibold">10:00 – 14:00</span></div>
                <div className="flex justify-between text-gray-400"><span>Sun</span><span>Closed</span></div>
              </div>
              <p className="text-[11px] text-gray-400 mt-3 font-mono">Enterprise: 24/7 dedicated support line</p>
            </div>
          </div>

        </div>
      </section>

      <Footer />
    </div>
  )
}
