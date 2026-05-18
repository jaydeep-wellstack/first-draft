"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";

const Character = ({ children, progress, range }: { children: string, progress: MotionValue<number>, range: [number, number] }) => {
  const color = useTransform(progress, range, ["rgba(255,255,255,0.18)", "#ffffff"]);
  return <motion.span style={{ color }} className="inline-block mr-[0.22em] transition-colors duration-350 ease-out">{children}</motion.span>;
}

export default function Testimonials() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 75%", "center center"], 
  });

  const fullText = "Our results speak volumes—discover what clients say about partnering with us.";
  const words = fullText.split(" ");
  // We want to animate up to the word "say"
  const litIdx = words.indexOf("say");
  const animatedLength = litIdx + 1; // number of words to animate
  
  const slides = [
    {
      img: "https://cdn.prod.website-files.com/6a035c978ec9d2a95ad049ba/6a035c998ec9d2a95ad04a8a_Client_Image_1.jpg",
      quote: "Working with Enzo was seamless —high-quality work, fast turnaround, and impressive attention to detail.",
      author: "Gorgia Ferico",
      role: "Co-Founder at Luca"
    },
    {
      img: "https://cdn.prod.website-files.com/6a035c978ec9d2a95ad049ba/6a035c998ec9d2a95ad04adc_Client_Image_3.jpg",
      quote: "Exceptional creativity and strategy that significantly elevated our brand's overall digital presence and impact.",
      author: "Maria Gomez",
      role: "Designer at Flowless"
    },
    {
      img: "https://cdn.prod.website-files.com/6a035c978ec9d2a95ad049ba/6a035c998ec9d2a95ad04adb_Client%20Image.jpg",
      quote: "Outstanding creativity and strategic thinking that truly elevated our brand's digital presence.",
      author: "Daiel Hoga",
      role: "Art Director at Bodna"
    },
    {
      img: "https://cdn.prod.website-files.com/6a035c978ec9d2a95ad049ba/6a035c998ec9d2a95ad04adc_Client_Image_3.jpg",
      quote: "A rare combination of design thinking and technical execution. Jaydeep delivered beyond our expectations every single time.",
      author: "Alex Moran",
      role: "Creative Director at Forma"
    },
    {
      img: "https://cdn.prod.website-files.com/6a035c978ec9d2a95ad049ba/6a035c998ec9d2a95ad04a8a_Client_Image_1.jpg",
      quote: "Transformed our vision into a stunning digital experience. The detail and craft in every screen was remarkable.",
      author: "Priya Nair",
      role: "Head of Product at Orbit"
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);

  // Swipe handling
  const [touchStart, setTouchStart] = useState(0);
  const handleTouchStart = (e: React.TouchEvent) => setTouchStart(e.touches[0].clientX);
  const handleTouchEnd = (e: React.TouchEvent) => {
    const dx = e.changedTouches[0].clientX - touchStart;
    if (Math.abs(dx) > 40) {
      if (dx < 0) nextSlide();
      else prevSlide();
    }
  };

  return (
    <section ref={containerRef} className="relative bg-[#0a0a08] py-24 px-6 md:px-32 z-10">
      <div className="flex justify-between items-center mb-14">
        <span className="text-[11px] font-normal tracking-[0.14em] uppercase text-white/40">/ Testimonials</span>
        <span className="text-[11px] font-normal tracking-[0.14em] uppercase text-white/40">N. 05</span>
      </div>
      
      <h2 className="text-[clamp(24px,7vw,36px)] md:text-[clamp(28px,4vw,58px)] font-semibold leading-[1.12] tracking-[-0.03em] mb-10 md:mb-20 max-w-5xl">
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
            return <span key={i} className="inline-block mr-[0.22em] text-white/18">{word}</span>;
          }
        })}
      </h2>
      
      <div className="overflow-hidden">
        <div 
          className="flex transition-transform duration-500 ease-[cubic-bezier(0.77,0,0.18,1)] will-change-transform"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {slides.map((slide, i) => (
            <div key={i} className="min-w-full grid grid-cols-1 md:grid-cols-[220px_1fr_60px] gap-6 md:gap-12 items-start">
              <div className="flex flex-row md:flex-col items-center md:items-start gap-4 md:gap-5">
                <div className="w-[76px] h-[90px] md:w-[180px] md:h-[210px] overflow-hidden bg-[#1a1a18] relative shrink-0">
                  <img src={slide.img} alt={slide.author} className="w-full h-full object-cover object-top block" />
                  <div className="hidden md:block absolute -bottom-2 -right-2 w-5 h-5 bg-[#0a0a08]"></div>
                </div>
                <span className="text-[12px] text-white/30 tracking-[0.1em]">/0{i + 1}</span>
              </div>
              
              <div className="pt-2">
                <p className="text-[clamp(16px,5vw,22px)] md:text-[clamp(18px,2.2vw,28px)] font-medium leading-[1.35] tracking-[-0.02em] text-white mb-6 md:mb-12">
                  {slide.quote}
                </p>
                <div className="text-[14px] font-normal text-white/85 mb-1">{slide.author}</div>
                <div className="text-[13px] font-light text-white/30 tracking-[0.02em]">{slide.role}</div>
              </div>
              
              <div className="hidden md:flex justify-end pt-2">
                <span className="w-5 h-5 relative opacity-25 block before:content-[''] before:absolute before:bg-white before:w-[1px] before:h-full before:left-1/2 before:top-0 after:content-[''] after:absolute after:bg-white after:w-full after:h-[1px] after:top-1/2 after:left-0"></span>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="flex justify-center md:justify-end gap-[10px] mt-8 md:mt-12">
        <button onClick={prevSlide} className="w-[60px] h-[60px] rounded-full border-none bg-white text-black cursor-pointer flex items-center justify-center transition-all duration-250 hover:bg-[#e0e0e0] hover:scale-105 shrink-0">
          <svg viewBox="0 0 24 24" className="w-5 h-5 stroke-black fill-none stroke-2 stroke-[round] stroke-linejoin-[round]"><polyline points="15 18 9 12 15 6"/></svg>
        </button>
        <button onClick={nextSlide} className="w-[60px] h-[60px] rounded-full border-none bg-white text-black cursor-pointer flex items-center justify-center transition-all duration-250 hover:bg-[#e0e0e0] hover:scale-105 shrink-0">
          <svg viewBox="0 0 24 24" className="w-5 h-5 stroke-black fill-none stroke-2 stroke-[round] stroke-linejoin-[round]"><polyline points="9 6 15 12 9 18"/></svg>
        </button>
      </div>
    </section>
  );
}
