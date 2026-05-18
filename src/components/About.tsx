"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";

const Character = ({ children, progress, range }: { children: string, progress: MotionValue<number>, range: [number, number] }) => {
  const color = useTransform(progress, range, ["#404040", "#ffffff"]);
  return <motion.span style={{ color }}>{children}</motion.span>;
}

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 75%", "center center"], // Animate as container enters view
  });

  const fullText = "I'm an UI/UX Product designer\nshaping impactful digital products from\nBangalore, India.";
  const animatedLength = "I'm an UI/UX Product designer\nshaping impactful ".length;

  return (
    <section ref={containerRef} className="relative w-full bg-[#0a0a0a] text-white py-32 px-6 md:px-12 lg:px-24">
      {/* Top bar */}
      <div className="w-full max-w-[1400px] mx-auto mb-32">
        <div className="w-full border-t border-white/10 mb-8"></div>
        <div className="flex justify-between items-center text-[11px] tracking-widest text-white/80 uppercase">
          <div className="flex items-center gap-3">
            / ABOUT
          </div>
          <div>N. 01</div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 items-start max-w-[1400px] mx-auto">
        {/* Left SVG Icon */}
        <div className="md:col-span-4 lg:col-span-3">
          <div className="w-full aspect-square flex items-center justify-center p-2">
            <svg viewBox="0 0 200 200" className="w-[80%] h-[80%] text-white/90" fill="none" xmlns="http://www.w3.org/2000/svg">
              <polygon points="100,15 45,95 155,95" fill="currentColor" />
              <rect x="20" y="110" width="70" height="70" fill="currentColor" />
              <circle cx="145" cy="145" r="35" fill="currentColor" />
            </svg>
          </div>
        </div>

        {/* Right Content */}
        <div className="md:col-span-8 lg:col-span-9 md:pl-10 lg:pl-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl xl:text-[4.5rem] font-medium tracking-tight leading-[1.50] max-w-5xl">
            {fullText.split("").map((char, i) => {
              if (char === "\n") return <br key={i} />;

              const isAnimated = i < animatedLength;
              if (isAnimated) {
                const start = i / animatedLength;
                const end = start + (1 / animatedLength);
                return (
                  <Character key={i} progress={scrollYProgress} range={[start, end]}>
                    {char}
                  </Character>
                );
              } else {
                return <span key={i} className="text-[#555555]">{char}</span>;
              }
            })}
          </h2>
        </div>
      </div>

      {/* Bottom Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 max-w-[1400px] mx-auto mt-16 md:mt-24">
        {/* Column 1: Just a + mark */}
        <div className="hidden md:block md:col-span-4 lg:col-span-3 relative">
          <div className="absolute top-0 left-0 text-[#555555] text-xl font-light leading-none">+</div>
        </div>

        {/* Column 2: 8+ stats */}
        <div className="md:col-span-4 lg:col-span-4 lg:pl-16 relative">
          {/* plus mark for mobile only here if needed, but we keep it hidden/absolute */}
          <div className="pt-2 md:pt-8">
            <div className="text-6xl md:text-7xl xl:text-[5.5rem] font-medium mb-6 tracking-tighter text-white">8+</div>
            <div className="text-base text-white mb-2">Years of Experience</div>
            <div className="text-base text-[#555555]">Building reliable, production-ready products</div>
          </div>
        </div>

        {/* Column 3: 10+ stats */}
        <div className="md:col-span-4 lg:col-span-5 relative">
          <div className="absolute top-0 left-0 text-[#555555] text-xl font-light leading-none hidden md:block">+</div>
          <div className="pt-2 md:pt-8">
            <div className="text-6xl md:text-7xl xl:text-[5.5rem] font-medium mb-6 tracking-tighter text-white">5</div>
            <div className="text-base text-white mb-2">Products</div>
            <div className="text-base text-[#555555]">AI solutions across Healthcare, Education & E-commerce.</div>
          </div>
        </div>
      </div>
    </section>
  );
}
