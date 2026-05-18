"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";

const Character = ({ children, progress, range }: { children: string, progress: MotionValue<number>, range: [number, number] }) => {
  const color = useTransform(progress, range, ["rgba(255,255,255,0.18)", "#ffffff"]);
  return <motion.span style={{ color }} className="inline-block mr-[0.22em] transition-colors duration-350 ease-out">{children}</motion.span>;
}

export default function Insights() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 75%", "center center"],
  });

  const fullText = "Exploring design, technology, and the ideas shaping what comes next. ";
  const words = fullText.split(" ");
  const litIdx = words.indexOf("ideas");
  const animatedLength = litIdx + 1;

  return (
    <section ref={containerRef} className="relative w-full bg-[#0a0a0a] text-white py-32 px-6 md:px-12 lg:px-24 border-b border-white/5 overflow-hidden">
      {/* Plus icon decorations */}
      <div className="absolute right-12 top-1/2 -translate-y-1/2 text-white/10 text-xl font-light pointer-events-none hidden md:block">+</div>

      {/* Top bar */}
      <div className="w-full max-w-[1400px] mx-auto mb-24">
        <div className="w-full border-t border-white/10 mb-8"></div>
        <div className="flex justify-between items-center text-[11px] tracking-widest text-white/80 uppercase">
          <div className="flex items-center gap-3 font-medium">
            / INSIGHTS
          </div>
          <div className="font-medium">N. 05</div>
        </div>
      </div>

      {/* Main Content Alignment Container */}
      <div className="w-full max-w-[1400px] mx-auto">
        <h2 className="text-[clamp(24px,7vw,36px)] md:text-[clamp(28px,4vw,58px)] font-semibold leading-[1.12] tracking-[-0.03em] mb-16 md:mb-20 max-w-4xl text-white">
          {words.map((word, i) => {
            const isAnimated = i < animatedLength;
            if (isAnimated) {
              const start = i / animatedLength;
              const end = start + (1 / animatedLength);
              return (
                <Character key={i} progress={scrollYProgress} range={[start, end]}>
                  {word}
                </Character>
              );
            } else {
              return <span key={i} className="inline-block mr-[0.22em] text-white/20">{word}</span>;
            }
          })}
        </h2>

        {/* 3-Column Asymmetric Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mt-16">
          {/* Column 1 - Stacks 2 boxes */}
          <div className="flex flex-col gap-6 h-full">
            {/* Card 1: AI Is the New Design Partner */}
            <div className="group bg-transparent border-[0.5px] border-white/10 rounded-none p-8 md:p-10 transition-all duration-500 ease-out hover:-translate-y-2 hover:border-white flex flex-col justify-between flex-1 min-h-[220px]">
              <div>
                <div className="inline-flex items-center px-4 py-1.5 border border-white/10 rounded-full bg-white/5 text-[10px] font-semibold tracking-widest text-white/80 uppercase select-none w-fit mb-8 group-hover:border-white/30 group-hover:bg-white/10 transition-all duration-300">
                  AI DESIGN
                </div>
                <h3 className="text-xl md:text-2xl font-semibold text-white mb-4 transition-all duration-300 group-hover:[text-shadow:0_0_8px_rgba(255,255,255,0.5)]">
                  AI Is the New Design Partner
                </h3>
                <p className="text-sm md:text-base text-[#aaaaaa] leading-relaxed font-normal">
                  How AI tools are shifting designers from makers to decision-makers.
                </p>
              </div>
            </div>

            {/* Card 2: Built for Framer */}
            <div className="group bg-transparent border-[0.5px] border-white/10 rounded-none p-8 md:p-10 transition-all duration-500 ease-out hover:-translate-y-2 hover:border-white flex flex-col justify-between flex-1 min-h-[220px]">
              <div>
                <div className="inline-flex items-center px-4 py-1.5 border border-white/10 rounded-full bg-white/5 text-[10px] font-semibold tracking-widest text-white/80 uppercase select-none w-fit mb-8 group-hover:border-white/30 group-hover:bg-white/10 transition-all duration-300">
                  Vibe Coding
                </div>
                <h3 className="text-xl md:text-2xl font-semibold text-white mb-4 transition-all duration-300 group-hover:[text-shadow:0_0_8px_rgba(255,255,255,0.5)]">
                  Vibe Coding Is Powerful — But Is It Safe?
                </h3>
                <p className="text-sm md:text-base text-[#aaaaaa] leading-relaxed font-normal">
                  45% of AI-generated code has security flaws. The real skill is knowing when to trust it.
                </p>
              </div>
            </div>
          </div>

          {/* Column 2 - Tall Card stretching full height */}
          <div className="h-full flex">
            {/* Card 3: Clean, Modern Design */}
            <div className="group bg-transparent border-[0.5px] border-white/10 rounded-none p-8 md:p-10 transition-all duration-500 ease-out hover:-translate-y-2 hover:border-white flex flex-col justify-between w-full min-h-[380px] md:min-h-[500px]">
              {/* Pill at Top */}
              <div className="inline-flex items-center px-4 py-1.5 border border-white/10 rounded-full bg-white/5 text-[10px] font-semibold tracking-widest text-white/80 uppercase select-none w-fit mb-8 group-hover:border-white/30 group-hover:bg-white/10 transition-all duration-300">
                Healthcare × AI
              </div>

              {/* Title & Text at Bottom */}
              <div className="mt-auto pt-8">
                <h3 className="text-xl md:text-2xl font-semibold text-white mb-4 transition-all duration-300 group-hover:[text-shadow:0_0_8px_rgba(255,255,255,0.5)]">
                  Shadow AI Is a Hospital's Biggest Hidden Risk
                </h3>
                <p className="text-sm md:text-base text-[#aaaaaa] leading-relaxed font-normal">
                  Staff are using unauthorized AI tools at work — and health systems are scrambling to respond.
                </p>
              </div>
            </div>
          </div>

          {/* Column 3 - Stacks 2 boxes */}
          <div className="flex flex-col gap-6 h-full">
            {/* Card 4: No-Code Customization */}
            <div className="group bg-transparent border-[0.5px] border-white/10 rounded-none p-8 md:p-10 transition-all duration-500 ease-out hover:-translate-y-2 hover:border-white flex flex-col justify-between flex-1 min-h-[220px]">
              <div>
                <div className="inline-flex items-center px-4 py-1.5 border border-white/10 rounded-full bg-white/5 text-[10px] font-semibold tracking-widest text-white/80 uppercase select-none w-fit mb-8 group-hover:border-white/30 group-hover:bg-white/10 transition-all duration-300">
                  AI Agents
                </div>
                <h3 className="text-xl md:text-2xl font-semibold text-white mb-4 transition-all duration-300 group-hover:[text-shadow:0_0_8px_rgba(255,255,255,0.5)]">
                  The Rise of Agentic AI in Development
                </h3>
                <p className="text-sm md:text-base text-[#aaaaaa] leading-relaxed font-normal">
                  AI no longer waits for prompts — it plans, codes, tests, and deploys on its own.
                </p>
              </div>
            </div>

            {/* Card 5: SEO & Performance Ready */}
            <div className="group bg-transparent border-[0.5px] border-white/10 rounded-none p-8 md:p-10 transition-all duration-500 ease-out hover:-translate-y-2 hover:border-white flex flex-col justify-between flex-1 min-h-[220px]">
              <div>
                <div className="inline-flex items-center px-4 py-1.5 border border-white/10 rounded-full bg-white/5 text-[10px] font-semibold tracking-widest text-white/80 uppercase select-none w-fit mb-8 group-hover:border-white/30 group-hover:bg-white/10 transition-all duration-300">
                  Healthcaare
                </div>
                <h3 className="text-xl md:text-2xl font-semibold text-white mb-4 transition-all duration-300 group-hover:[text-shadow:0_0_8px_rgba(255,255,255,0.5)]">
                  Your Digital Twin Could Plan Your Surgery
                </h3>
                <p className="text-sm md:text-base text-[#aaaaaa] leading-relaxed font-normal">
                  Doctors are rehearsing procedures on virtual replicas of real patients before touching them.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
