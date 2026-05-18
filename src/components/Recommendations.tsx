"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useScroll, useTransform, MotionValue } from "framer-motion";

const Character = ({ children, progress, range }: { children: string, progress: MotionValue<number>, range: [number, number] }) => {
  const color = useTransform(progress, range, ["#404040", "#ffffff"]);
  return <motion.span style={{ color }}>{children}</motion.span>;
}

const testimonials = [
  {
    num: "/01",
    quote: "Working with Jaydeep was seamless —high-quality work, fast turnaround, and impressive attention to detail.",
    name: "Gorgia Ferico",
    role: "Co-Founder at Luca",
    image: "/avatar_1.jpg"
  },
  {
    num: "/02",
    quote: "Jaydeep possesses a unique blend of analytical thinking and design mastery. He transformed our concept into a world-class platform.",
    name: "Marcus Vance",
    role: "VP of Product at Zenith",
    image: "/avatar_2.jpg"
  },
  {
    num: "/03",
    quote: "Exceptional creativity and speed. Jaydeep didn't just deliver beautiful interfaces; he elevated our entire product experience.",
    name: "Elena Rostova",
    role: "Design Lead at Aether AI",
    image: "/avatar_3.jpg"
  }
];

export default function Recommendations() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right

  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 75%", "center center"], // Animate as container enters view
  });

  const fullText = "Our results speak volumes—discover what clients say about partnering with us.";
  const animatedLength = "Our results speak volumes—discover what clients".length;

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 50 : -50,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -50 : 50,
      opacity: 0
    })
  };

  const nextSlide = () => {
    setDirection(1);
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setDirection(-1);
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const current = testimonials[activeIndex];

  return (
    <section ref={containerRef} className="relative w-full bg-[#0a0a0a] text-white py-32 px-6 md:px-12 lg:px-24 overflow-hidden border-b border-white/5">
      {/* Plus icon decorations */}
      <div className="absolute right-12 top-1/2 -translate-y-1/2 text-white/10 text-xl font-light pointer-events-none hidden md:block">+</div>

      {/* Top bar */}
      <div className="w-full max-w-[1400px] mx-auto mb-24">
        <div className="w-full border-t border-white/10 mb-8"></div>
        <div className="flex justify-between items-center text-[11px] tracking-widest text-white/80 uppercase">
          <div className="flex items-center gap-3 font-medium">
            / RECOMMENDATIONS
          </div>
          <div className="font-medium">N. 04</div>
        </div>
      </div>

      {/* Heading */}
      <div className="max-w-[1400px] mx-auto mb-24 md:mb-32">
        <h2 className="text-4xl md:text-5xl lg:text-6xl xl:text-[4.2rem] font-bold tracking-tight leading-[1.12] max-w-6xl font-heading">
          {fullText.split("").map((char, i) => {
            const isAnimated = i < animatedLength;
            const charSpan = isAnimated ? (
              <Character key={i} progress={scrollYProgress} range={[i / animatedLength, (i + 1) / animatedLength]}>
                {char}
              </Character>
            ) : (
              <span key={i} className="text-[#404040]">{char}</span>
            );

            // Inject line break after "volumes—" to match screenshot layout perfectly
            if (char === "—") {
              return (
                <span key={i}>
                  {charSpan}
                  <br className="hidden md:inline" />
                </span>
              );
            }
            return charSpan;
          })}
        </h2>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 items-start max-w-[1400px] mx-auto relative min-h-[380px] md:min-h-[300px]">

        {/* Left Column (Profile Image) */}
        <div className="md:col-span-4 lg:col-span-3 relative flex justify-start">
          {/* Subtle Plus icon decoration under image */}
          <div className="absolute -bottom-10 -left-2 text-white/20 text-lg font-light select-none">+</div>

          <div className="w-full aspect-[4/5] md:aspect-square bg-[#111111] overflow-hidden relative max-w-[320px]">
            {/* Overlapping Background-Colored Corner Boxes */}
            <div className="absolute top-0 right-0 w-8 h-8 bg-[#0a0a0a] z-10" />
            <div className="absolute top-10 right-10 w-3 h-3 bg-[#0a0a0a] z-10" />

            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={activeIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
                className="w-full h-full relative"
              >
                <Image
                  src={current.image}
                  alt={current.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 300px"
                  priority
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Right Column (Quote & Author info) */}
        <div className="md:col-span-8 lg:col-span-9 md:pl-10 lg:pl-16 flex flex-col justify-between h-full min-h-[260px]">

          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={activeIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
              className="flex-1"
            >
              {/* Quote Index */}
              <div className="text-white/40 text-sm font-medium mb-6 md:mb-8 font-mono tracking-wider">
                {current.num}
              </div>

              {/* Quote Text (reduced size and increased line-height as requested) */}
              <blockquote className="text-lg md:text-xl lg:text-[1.8rem] xl:text-[2rem] font-light leading-[1.5] text-white tracking-wide max-w-5xl">
                "{current.quote}"
              </blockquote>
            </motion.div>
          </AnimatePresence>

          {/* Bottom Author Row & Navigation Buttons (clean vertical space, no border-t) */}
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end mt-16 md:mt-20 gap-8 w-full">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={activeIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
              >
                <div className="text-xl font-bold text-white tracking-wide font-heading">{current.name}</div>
                <div className="text-sm text-white/50 mt-1 font-medium tracking-wide">{current.role}</div>
              </motion.div>
            </AnimatePresence>

            {/* Slider Navigation Buttons (Solid white circles with dark arrows) */}
            <div className="flex gap-4 pointer-events-auto">
              <button
                onClick={prevSlide}
                className="w-16 h-16 rounded-full bg-white text-black flex items-center justify-center hover:bg-white/80 transition-all duration-300"
                aria-label="Previous testimonial"
              >
                <svg className="w-6 h-6 stroke-current fill-none stroke-[2.5]" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={nextSlide}
                className="w-16 h-16 rounded-full bg-white text-black flex items-center justify-center hover:bg-white/80 transition-all duration-300"
                aria-label="Next testimonial"
              >
                <svg className="w-6 h-6 stroke-current fill-none stroke-[2.5]" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
