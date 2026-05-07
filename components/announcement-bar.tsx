import { ArrowRight } from "lucide-react"

export function AnnouncementBar() {
  return (
    <div className="bg-accent text-white text-center text-xs font-medium py-2 px-5 tracking-wide font-mono">
      14-day free trial · compliance included · one account for numbers, voice and SMS.
      <a
        href="#"
        className="group inline-flex items-center gap-1.5 bg-white/20 ring-1 ring-inset ring-white/30 text-white text-[11px] font-medium font-mono pl-2 pr-2 py-1 rounded-full ml-3 hover:bg-white/30 transition-colors"
      >
        Request a Demo
        <span className="grid place-items-center h-4 w-4 rounded-full bg-white/20 transition-transform group-hover:translate-x-0.5">
          <ArrowRight className="h-2.5 w-2.5" strokeWidth={2.4} />
        </span>
      </a>
    </div>
  )
}
