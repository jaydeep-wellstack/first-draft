"use client";

import { useEffect, useRef, useState } from "react";
import { useScroll, useMotionValueEvent } from "framer-motion";

export default function Blogs() {
  const sectionRef = useRef<HTMLElement>(null);
  const cylinderRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const [cards, setCards] = useState<HTMLElement[]>([]);
  
  useEffect(() => {
    if (cylinderRef.current) {
      const cardEls = Array.from(cylinderRef.current.querySelectorAll('.blog-card')) as HTMLElement[];
      setCards(cardEls);
    }
  }, []);

  const COUNT = 5;
  const SLOTS = [0, 45, 90, 135, 180];
  const RADIUS = 220;

  const ENTER = [
    { x: 0, y: 0 },
    { x: 260, y: 150 },
    { x: 460, y: 290 },
    { x: 540, y: 430 },
    { x: 490, y: 560 },
  ];

  const EXIT = [
    { x: -60, y: -210 },
    { x: -100, y: -390 },
    { x: -120, y: -540 },
    { x: -130, y: -670 },
  ];

  const clamp = (v: number, a: number, b: number) => Math.max(a, Math.min(b, v));
  const easePos = (t: number) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  const easeRot = (t: number) => Math.min(1, t * 1.4 - 0.2 * Math.pow(t, 2));

  const getPos = (fi: number) => {
    if (fi >= 0) {
      const lo = clamp(Math.floor(fi), 0, COUNT - 2);
      const t = fi - lo;
      const a = ENTER[Math.min(lo, ENTER.length - 1)];
      const b = ENTER[Math.min(lo + 1, ENTER.length - 1)];
      return { x: a.x + (b.x - a.x) * t, y: a.y + (b.y - a.y) * t };
    } else {
      const abs = -fi;
      const lo = Math.floor(abs);
      const t = abs - lo;
      const a = lo === 0 ? ENTER[0] : EXIT[Math.min(lo - 1, EXIT.length - 1)];
      const b = EXIT[Math.min(lo, EXIT.length - 1)];
      return { x: a.x + (b.x - a.x) * t, y: a.y + (b.y - a.y) * t };
    }
  };

  const renderCards = (rawProgress: number) => {
    if (!cards.length || window.innerWidth <= 900) return;
    
    // We map rawProgress [0, 1] over the entire section scroll.
    // However, the original used a progress based on section top vs window height.
    // Framer motion's scrollYProgress with offset ["start start", "end end"] is exactly that.
    
    const p = rawProgress;
    const travelPos = easePos(p) * (COUNT - 1);
    const rotP = clamp(easePos(p) * 1.0, 0, 1);
    const rotY = rotP * -180;

    cards.forEach((card, i) => {
      const slot = SLOTS[i] + rotY;

      let va = ((slot % 360) + 360) % 360;
      if (va > 180) va -= 360;

      const fi = i - travelPos;
      const pos = getPos(fi);

      const cosA = Math.cos(slot * Math.PI / 180);
      const zPop = clamp(cosA * RADIUS, -100, RADIUS);
      const front = clamp((cosA + 1) / 2, 0, 1);

      const sc = clamp(0.35 + front * 0.65, 0.35, 1.0);
      const br = clamp(0.08 + front * 0.92, 0.08, 1.0);

      const img = card.querySelector('img');
      if (img) img.style.filter = `brightness(${br})`;

      card.style.transform = `translate(${pos.x}px,${pos.y}px) rotateY(${slot}deg) translateZ(${zPop}px) scale(${sc})`;
      
      card.style.zIndex = fi < -0.05
        ? String(500 + Math.round(Math.abs(fi) * 10))
        : String(Math.round(front * 100));

      card.style.pointerEvents = Math.abs(va) < 25 ? 'auto' : 'none';
    });
  };

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    // latest goes from 0 when section enters to 1 when section leaves
    // We only want to animate when section top is between window bottom and window top?
    // The original logic was: clamp(-rect.top / (section.offsetHeight - innerHeight), 0, 1)
    // To match this, we will use a custom scroll logic if useScroll doesn't map exactly.
    // Let's rely on standard window scroll mapping inside useEffect to match the original feel exactly.
  });

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const raw = clamp(-rect.top / (sectionRef.current.offsetHeight - window.innerHeight), 0, 1);
      renderCards(raw);
    };
    
    if (cards.length > 0) {
      window.addEventListener("scroll", handleScroll, { passive: true });
      window.addEventListener("resize", handleScroll);
      handleScroll();
    }
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [cards]);

  const blogItems = [
    { name: "Cairo", img: "https://cdn.prod.website-files.com/6a035c998ec9d2a95ad04a6f/6a035c998ec9d2a95ad04b3c_project_main_image.webp" },
    { name: "Manila.", img: "https://cdn.prod.website-files.com/6a035c998ec9d2a95ad04a6f/6a035c998ec9d2a95ad04b39_project_main_image.webp" },
    { name: "theo", img: "https://cdn.prod.website-files.com/6a035c998ec9d2a95ad04a6f/6a035c998ec9d2a95ad04b3a_project_main_image.webp" },
    { name: "oslo.", img: "https://cdn.prod.website-files.com/6a035c998ec9d2a95ad04a6f/6a035c998ec9d2a95ad04b3b_project_main_image.webp" },
    { name: "oslo.", img: "https://cdn.prod.website-files.com/6a035c978ec9d2a95ad049ba/6a035c998ec9d2a95ad04aae_CTA_bg_Image.webp" },
  ];

  return (
    <section ref={sectionRef} className="relative bg-[#000] z-10 h-auto md:h-[600vh]">
      <div className="md:sticky md:top-0 md:h-screen w-full overflow-visible flex flex-col pointer-events-none">
        <div className="flex justify-between items-center pt-[64px] px-6 pb-10 md:pt-24 md:px-32 md:pb-0 shrink-0 pointer-events-auto relative z-10">
          <span className="text-[11px] font-normal tracking-[0.14em] uppercase text-white/40">/ Blogs</span>
          <span className="text-[11px] font-normal tracking-[0.14em] uppercase text-white/40">N. 06</span>
        </div>
        
        <div className="flex-1 relative md:perspective-[1200px] md:perspective-origin-center flex items-center justify-center overflow-visible h-auto md:h-full px-5 pb-16 md:px-0 md:pb-0 flex-col md:flex-row gap-5 md:gap-0">
          <div ref={cylinderRef} className="w-full h-auto md:w-0 md:h-0 relative transform-style-3d will-change-transform flex flex-col items-center gap-5 md:block md:gap-0">
            {blogItems.map((item, i) => (
              <a 
                key={i} 
                href="#" 
                className="blog-card static md:absolute w-full max-w-[495px] h-[280px] md:w-[370px] md:h-[256px] md:-top-[128px] md:-left-[185px] rounded-xl overflow-hidden no-underline block cursor-pointer pointer-events-auto backface-visible md:transform-style-3d opacity-100 transition-opacity"
              >
                <img src={item.img} alt={item.name} className="absolute inset-0 w-full h-full object-cover block rounded-xl" />
                <span 
                  className="absolute bottom-3.5 left-4 text-[15px] font-bold text-white tracking-[-0.02em] drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)] z-[2]"
                  style={item.name === "theo" ? { fontStyle: "italic", fontFamily: "Georgia,serif" } : {}}
                >
                  {item.name}
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
