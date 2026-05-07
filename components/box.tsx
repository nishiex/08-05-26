"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const STEPS = [
  {
    problem: "Calls go unanswered.",
    detail:
      "Unknown numbers get screened. Your team dials more, but connects less.",
    solution: "Local presence gets picked up.",
  },
  {
    problem: "Your tools don’t talk to each other.",
    detail:
      "Voice, SMS, and numbers live in separate systems. Nothing lines up.",
    solution: "One platform. One system.",
  },
  {
    problem: "Calls fail when they matter.",
    detail:
      "Dropped audio. Spam flags. Providers blame the carrier.",
    solution: "Carrier-grade routing with STIR/SHAKEN.",
  },
  {
    problem: "Customers repeat themselves.",
    detail:
      "Transferred calls. No context. Frustration builds fast.",
    solution: "Smart routing gets it right first time.",
  },
  {
    problem: "Your team handles everything manually.",
    detail:
      "Repetitive calls. No insights. No leverage.",
    solution: "AI handles the first layer.",
  },
];

export default function UcaasScrollStory() {
  const sectionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray(".step").forEach((step: any, i) => {
        gsap.fromTo(
          step,
          { opacity: 0, y: 60 },
          {
            opacity: 1,
            y: 0,
            scrollTrigger: {
              trigger: step,
              start: "top 75%",
              end: "top 40%",
              scrub: true,
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-white py-32 px-[5%]"
    >
      <div className="max-w-6xl mx-auto">

        {/* Heading (matches your tone) */}
        <div className="text-center mb-24">
          <h2 className="font-serif text-4xl md:text-5xl tracking-tight text-gray-900 mb-4">
            What breaks in most systems
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            And what actually works when everything runs on one platform.
          </p>
        </div>

        {/* Steps */}
        <div className="space-y-32">

          {STEPS.map((item, i) => (
            <div
              key={i}
              className="step grid md:grid-cols-2 gap-12 items-center"
            >
              {/* LEFT — Problem */}
              <div className="bg-neutral-50 rounded-2xl p-8 border border-gray-200">
                <p className="text-sm text-red-500 font-mono mb-2">
                  Problem
                </p>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {item.problem}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  {item.detail}
                </p>
              </div>

              {/* RIGHT — Solution */}
              <div className="bg-white rounded-2xl p-8 border border-[#95d9e8]/50 shadow-[0_10px_40px_-20px_rgba(26,188,217,0.25)]">
                <p className="text-sm text-green-600 font-mono mb-2">
                  With Twiching
                </p>
                <h3 className="text-xl font-semibold text-gray-900">
                  {item.solution}
                </h3>
              </div>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
}