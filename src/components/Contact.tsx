"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";

const Character = ({ children, progress, range }: { children: string, progress: MotionValue<number>, range: [number, number] }) => {
  const color = useTransform(progress, range, ["rgba(255,255,255,0.18)", "#ffffff"]);
  return <motion.span style={{ color }} className="inline-block mr-[0.22em] transition-colors duration-350 ease-out">{children}</motion.span>;
}

export default function Contact() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 85%", "center center"],
  });

  const line1Words = ["Open", "to", "opportunities"];
  const totalWords = line1Words.length;

  return (
    <section ref={containerRef} className="relative w-full bg-[#0a0a0a] text-white py-40 md:py-48 px-6 md:px-12 lg:px-24 border-b border-white/5 overflow-hidden flex flex-col items-center justify-center text-center">
      {/* Plus icon decorations */}
      <div className="absolute left-12 top-1/2 -translate-y-1/2 text-white/10 text-xl font-light pointer-events-none hidden md:block">+</div>

      <div className="w-full max-w-[1400px] mx-auto flex flex-col items-center justify-center">
        {/* Scroll Animated Heading */}
        <h2 className="text-[clamp(36px,8vw,60px)] md:text-[clamp(48px,6vw,90px)] font-bold tracking-tight leading-[1.1] select-none max-w-5xl">
          {/* Line 1 - Scroll Animated to White */}
          <span className="block">
            {line1Words.map((word, i) => {
              const start = i / totalWords;
              const end = start + (1 / totalWords);
              return (
                <Character key={`l1-${i}`} progress={scrollYProgress} range={[start, end]}>
                  {word}
                </Character>
              );
            })}
          </span>

          {/* Line 2 - Muted Grey Static Text */}
          <span className="block text-white/20 mt-2">
            Let's Connect
          </span>
        </h2>

        {/* Buttons Action Group */}
        <div className="flex flex-row items-center justify-center gap-4 w-full sm:w-auto mt-16 md:mt-20">
          {/* Email Button - White Background, Black Text */}
          <a
            href="mailto:badadarejaydee3@gmail.com"
            className="min-w-[160px] h-[62px] inline-flex items-center justify-center bg-white text-black font-semibold text-sm tracking-wide rounded-none hover:bg-white/90 hover:scale-[1.03] active:scale-[0.98] transition-all duration-300 ease-out cursor-pointer select-none text-center"
          >
            Email
          </a>

          {/* Resume Button - Transparent Background, White Border */}
          <a
            href="/Jaydeep_V_B_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="min-w-[160px] h-[62px] inline-flex items-center justify-center bg-transparent border border-white/40 text-white font-semibold text-sm tracking-wide rounded-none hover:bg-white/10 hover:border-white hover:scale-[1.03] active:scale-[0.98] transition-all duration-300 ease-out cursor-pointer select-none text-center"
          >
            Resume
          </a>
        </div>
      </div>
    </section>
  );
}
