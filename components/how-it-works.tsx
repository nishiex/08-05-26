import { Fragment } from "react"
import { MessageSquare, Settings, Rocket, ArrowRight, type LucideIcon } from "lucide-react"

type Step = {
  n: string
  title: string
  desc: string
  Icon: LucideIcon
  filled?: boolean
}

const steps: Step[] = [
  {
    n: "01",
    title: "Start your 14-day trial",
    desc: "Sign up with a card — no charges during the trial. Up to 3 users, one number per user included.",
    Icon: MessageSquare,
  },
  {
    n: "02",
    title: "Port or provision numbers",
    desc: "Bring existing numbers (domestic ports: 5–10 business days) or pick new ones — virtual, local, vanity, business or second.",
    Icon: Settings,
  },
  {
    n: "03",
    title: "Activate calling & SMS",
    desc: "Finish a quick compliance check, route calls to any device, go live in 24 hours. One account, one bill, one support team.",
    Icon: Rocket,
    filled: true,
  },
]

export function HowItWorks() {
  return (
    <section
      id="s-how"
      data-sec="how"
      className="py-14 md:py-20 px-[5%] bg-gradient-to-b from-white via-slate-50 to-white"
    >
      <div className="max-w-[960px] mx-auto">
        <p className="text-xs font-bold tracking-[1.5px] uppercase text-accent mb-3 font-mono">
          From sign-up to live calls
        </p>
        <h2 className="font-serif text-3xl md:text-4xl font-semibold tracking-tight leading-tight mb-14 max-w-[640px]">
          Up and running in a day, not a quarter.
        </h2>

        <div className="flex flex-col md:flex-row gap-8 md:gap-0 items-start">
          {steps.map((s, i) => (
            <Fragment key={s.n}>
              <div className="flex-1 flex flex-col items-center text-center px-2">
                <div
                  className={`relative w-16 h-16 rounded-full flex items-center justify-center mb-5 ${
                    s.filled
                      ? "bg-accent text-white shadow-[0_12px_30px_-10px_rgba(26,188,217,0.55)]"
                      : "bg-white text-accent ring-1 ring-accent/25 shadow-[0_6px_18px_-8px_rgba(26,188,217,0.35)]"
                  }`}
                >
                  <s.Icon className="h-6 w-6" strokeWidth={1.8} />
                  <span
                    className={`absolute -bottom-1 -right-1 text-[10px] font-bold font-mono tracking-[1.2px] px-2 py-0.5 rounded-full ${
                      s.filled
                        ? "bg-white text-accent"
                        : "bg-accent text-white"
                    }`}
                  >
                    {s.n}
                  </span>
                </div>
                <div className="text-[11px] font-bold tracking-[1.5px] uppercase text-accent mb-2 font-mono">
                  Step {s.n}
                </div>
                <h3 className="text-lg font-semibold mb-2 font-serif">{s.title}</h3>
                <p className="text-[14px] text-gray-500 leading-relaxed max-w-[240px]">
                  {s.desc}
                </p>
              </div>
              {i < steps.length - 1 && (
                <div className="hidden md:block step-connector mt-8" aria-hidden="true" />
              )}
            </Fragment>
          ))}
        </div>

        <div className="mt-16 text-center">
          <a
            href="#"
            className="group inline-flex items-center gap-2 bg-black text-white text-sm font-semibold font-mono pl-6 pr-2 py-2 rounded-full hover:bg-gray-800 transition-colors"
          >
            Start Free Trial
            <span className="grid place-items-center h-7 w-7 rounded-full bg-white/15 transition-transform group-hover:translate-x-0.5">
              <ArrowRight className="h-3 w-3" strokeWidth={2.4} />
            </span>
          </a>
        </div>
      </div>
    </section>
  )
}
