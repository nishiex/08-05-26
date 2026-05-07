"use client"

const logos = [
  { name: "Sparkle",      src: "https://cdn-ilegfjm.nitrocdn.com/kDlhiaoQNYImjijUkaQuvAdvaQsammmp/assets/images/optimized/rev-819ba67/www.acepeak.com/wp-content/uploads/2025/12/1-logo-sparkle.webp" },
  { name: "Telin",        src: "https://cdn-ilegfjm.nitrocdn.com/kDlhiaoQNYImjijUkaQuvAdvaQsammmp/assets/images/optimized/rev-819ba67/www.acepeak.com/wp-content/uploads/2025/12/1-logo-telin.webp" },
  { name: "Airtel",       src: "https://cdn-ilegfjm.nitrocdn.com/kDlhiaoQNYImjijUkaQuvAdvaQsammmp/assets/images/optimized/rev-819ba67/www.acepeak.com/wp-content/uploads/2025/12/1-logo-airtel.webp" },
  { name: "HKBN",         src: "https://cdn-ilegfjm.nitrocdn.com/kDlhiaoQNYImjijUkaQuvAdvaQsammmp/assets/images/optimized/rev-819ba67/www.acepeak.com/wp-content/uploads/2025/12/1-logo-hkbn.webp" },
  { name: "China Mobile", src: "https://cdn-ilegfjm.nitrocdn.com/kDlhiaoQNYImjijUkaQuvAdvaQsammmp/assets/images/optimized/rev-819ba67/www.acepeak.com/wp-content/uploads/2025/12/1-logo-china-mobile.webp" },
  { name: "Twilio",       src: "https://cdn-ilegfjm.nitrocdn.com/kDlhiaoQNYImjijUkaQuvAdvaQsammmp/assets/images/optimized/rev-819ba67/www.acepeak.com/wp-content/uploads/2025/12/1-logo-twilio.webp" },
  { name: "T-Mobile",     src: "https://cdn-ilegfjm.nitrocdn.com/kDlhiaoQNYImjijUkaQuvAdvaQsammmp/assets/images/optimized/rev-819ba67/www.acepeak.com/wp-content/uploads/2025/12/1-log-t-mobile.webp" },
  { name: "Infobip",      src: "https://cdn-ilegfjm.nitrocdn.com/kDlhiaoQNYImjijUkaQuvAdvaQsammmp/assets/images/optimized/rev-819ba67/www.acepeak.com/wp-content/uploads/2025/12/1-logo-infobip.webp" },
]

// 4 copies — translateX(-25%) = exactly one set, seamless on any screen width
const track = [...logos, ...logos, ...logos, ...logos]

export function LogoStrip() {
  return (
    <section
      id="s-logos"
      data-sec="logos"
      aria-label="Partner logos"
      className="bg-[#ffffff] py-6 overflow-hidden"
    >
      <div
        className="flex gap-12 items-center w-max animate-logo-scroll"
        aria-hidden="true"
      >
        {track.map((logo, i) => (
          <div key={i} className="flex-shrink-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={logo.src}
              alt={logo.name}
              style={{
                width: "110px",
                height: "auto",
                objectFit: "contain",
                filter: "grayscale(100%) contrast(1) brightness(0.3)",
              }}
            />
          </div>
        ))}
      </div>

      <style>{`
        @keyframes logo-scroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-25%); }
        }
        .animate-logo-scroll {
          animation: logo-scroll 28s linear infinite;
        }
        .animate-logo-scroll:hover {
          animation-play-state: paused;
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-logo-scroll {
            animation: none;
          }
        }
      `}</style>
    </section>
  )
}
