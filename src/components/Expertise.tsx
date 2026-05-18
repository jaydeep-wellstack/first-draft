"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";

const Character = ({ children, progress, range }: { children: string, progress: MotionValue<number>, range: [number, number] }) => {
  const color = useTransform(progress, range, ["rgba(255,255,255,0.18)", "#ffffff"]);
  return <motion.span style={{ color }} className="inline-block mr-[0.22em] transition-colors duration-350 ease-out">{children}</motion.span>;
}

export default function Expertise() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 75%", "center center"],
  });

  const fullText = "Skills I bring to help organizations achieve meaningful and lasting results:";
  const words = fullText.split(" ");
  const litIdx = words.indexOf("achieve");
  const animatedLength = litIdx + 1;

  const icon = (l: string, bg: string) => `data:image/svg+xml,${encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20'><rect width='20' height='20' rx='4' fill='${bg}'/><text x='10' y='14' font-family='Inter,sans-serif' font-size='9' font-weight='700' fill='#fff' text-anchor='middle'>${l}</text></svg>`)}`;

  const R1 = [
    { name: 'Figma', icon: 'https://cdn.simpleicons.org/figma/F24E1E' },
    { name: 'Adobe XD', icon: 'https://cdn.simpleicons.org/adobexd/FF61F6' },
    { name: 'Photoshop', icon: 'https://cdn.simpleicons.org/adobephotoshop/31A8FF' },
    { name: 'Illustrator', icon: 'https://cdn.simpleicons.org/adobeillustrator/FF9A00' },
    { name: 'After Effects', icon: 'https://cdn.simpleicons.org/adobeaftereffects/9999FF' },
    { name: 'Webflow', icon: 'https://cdn.simpleicons.org/webflow/4353FF' },
    { name: 'Framer', icon: 'https://cdn.simpleicons.org/framer/0055FF' },
    { name: 'Antigravity', icon: icon('AG', '#1a1a2e') },
    { name: 'Vercel', icon: 'https://cdn.simpleicons.org/vercel/ffffff' },
    { name: 'Loveable', icon: icon('LV', '#e63946') },
    { name: 'Balsamiq', icon: icon('BQ', '#cc0000') },
    { name: 'Miro', icon: 'https://cdn.simpleicons.org/miro/FFD02F' },
    { name: 'Midjourney', icon: icon('MJ', '#333') },
    { name: 'UIzard', icon: icon('UI', '#6c3fc5') },
    { name: 'Userbrain', icon: icon('UB', '#f4511e') },
    { name: 'Usertesting', icon: icon('UT', '#f26522') },
    { name: 'Google Optimize', icon: 'https://cdn.simpleicons.org/google/4285F4' },
    { name: 'Hotjar', icon: 'https://cdn.simpleicons.org/hotjar/FD3A5C' },
    { name: 'Mixpanel', icon: 'https://cdn.simpleicons.org/mixpanel/7856FF' },
  ];

  const R2 = [
    { name: 'HTML', icon: 'https://cdn.simpleicons.org/html5/E34F26' },
    { name: 'CSS', icon: 'https://cdn.simpleicons.org/css3/1572B6' },
    { name: 'JavaScript', icon: 'https://cdn.simpleicons.org/javascript/F7DF1E' },
    { name: 'React', icon: 'https://cdn.simpleicons.org/react/61DAFB' },
    { name: 'Next.js', icon: 'https://cdn.simpleicons.org/nextdotjs/ffffff' },
    { name: 'Three.js', icon: 'https://cdn.simpleicons.org/threedotjs/ffffff' },
    { name: 'Node.js', icon: 'https://cdn.simpleicons.org/nodedotjs/339933' },
    { name: 'Angular', icon: 'https://cdn.simpleicons.org/angular/DD0031' },
  ];

  return (
    <section ref={containerRef} className="relative w-full bg-[#0a0a0a] text-white py-32 px-6 md:px-12 lg:px-24 z-10 overflow-hidden">
      {/* Top bar */}
      <div className="w-full max-w-[1400px] mx-auto mb-24">
        <div className="w-full border-t border-white/10 mb-8"></div>
        <div className="flex justify-between items-center text-[11px] tracking-widest text-white/80 uppercase">
          <div className="flex items-center gap-3 font-medium">
            / EXPERTISE
          </div>
          <div className="font-medium">N. 03</div>
        </div>
      </div>

      {/* Main Content Alignment Container */}
      <div className="w-full max-w-[1400px] mx-auto">
        <h2 className="text-[clamp(24px,7vw,36px)] md:text-[clamp(28px,4vw,58px)] font-semibold leading-[1.12] tracking-[-0.03em] mb-12 md:mb-16 max-w-4xl text-white">
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

        <div className="flex flex-col gap-6 md:gap-8 -mx-6 md:-mx-12 lg:-mx-24 px-6 md:px-12 lg:px-24">
          <div className="skills-track-wrap relative overflow-hidden py-4 -my-4">
            <div className="skills-track row-ltr flex gap-4 w-max py-2">
              {[...R1, ...R1, ...R1].map((skill, i) => (
                <div key={i} className="inline-flex items-center gap-2.5 px-5 py-3 border border-white/10 rounded-full bg-white/5 whitespace-nowrap cursor-default transition-all duration-300 hover:scale-110 hover:border-white/35 hover:bg-white/10 select-none">
                  <img className="w-5 h-5 object-contain shrink-0" src={skill.icon} alt={skill.name} onError={(e) => { e.currentTarget.src = icon(skill.name[0], '#333') }} />
                  <span className="text-[13px] font-normal text-white/80 tracking-[0.01em]">{skill.name}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="skills-track-wrap relative overflow-hidden py-4 -my-4">
            <div className="skills-track row-rtl flex gap-4 w-max py-2">
              {[...R2, ...R2, ...R2, ...R2, ...R2].map((skill, i) => (
                <div key={i} className="inline-flex items-center gap-2.5 px-5 py-3 border border-white/10 rounded-full bg-white/5 whitespace-nowrap cursor-default transition-all duration-300 hover:scale-110 hover:border-white/35 hover:bg-white/10 select-none">
                  <img className="w-5 h-5 object-contain shrink-0" src={skill.icon} alt={skill.name} onError={(e) => { e.currentTarget.src = icon(skill.name[0], '#333') }} />
                  <span className="text-[13px] font-normal text-white/80 tracking-[0.01em]">{skill.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 1x4 Capabilities Grid (integrated sub-section) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full mt-20 md:mt-24">
          {/* Card 1 */}
          <div className="group bg-transparent border-[0.5px] border-white/10 rounded-none p-8 md:p-10 transition-all duration-500 ease-out hover:-translate-y-2 hover:border-white">
            <div className="w-12 h-12 rounded-none flex items-center justify-center bg-transparent mb-8 group-hover:bg-white/10 transition-all duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                <polygon points="12 2 2 7 12 12 22 7 12 2" />
                <polyline points="2 17 12 22 22 17" />
                <polyline points="2 12 12 17 22 12" />
              </svg>
            </div>
            <h3 className="text-xl md:text-2xl font-semibold text-white mb-4 transition-all duration-300 group-hover:[text-shadow:0_0_8px_rgba(255,255,255,0.5)]">
              Product Design & Strategy
            </h3>
            <p className="text-sm md:text-base text-[#aaaaaa] leading-relaxed font-normal">
              Leading end-to-end product design — from research and wireframes to production-ready interfaces that solve real user problems.
            </p>
          </div>

          {/* Card 2 */}
          <div className="group bg-transparent border-[0.5px] border-white/10 rounded-none p-8 md:p-10 transition-all duration-500 ease-out hover:-translate-y-2 hover:border-white">
            <div className="w-12 h-12 rounded-none flex items-center justify-center bg-transparent mb-8 group-hover:bg-white/10 transition-all duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                <circle cx="18" cy="5" r="3" />
                <circle cx="6" cy="12" r="3" />
                <circle cx="18" cy="19" r="3" />
                <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
                <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
              </svg>
            </div>
            <h3 className="text-xl md:text-2xl font-semibold text-white mb-4 transition-all duration-300 group-hover:[text-shadow:0_0_8px_rgba(255,255,255,0.5)]">
              AI & Data Interface Design
            </h3>
            <p className="text-sm md:text-base text-[#aaaaaa] leading-relaxed font-normal">
              Designing intuitive interfaces for AI products, analytics dashboards and PowerBI reports that make complex data feel simple.
            </p>
          </div>

          {/* Card 3 */}
          <div className="group bg-transparent border-[0.5px] border-white/10 rounded-none p-8 md:p-10 transition-all duration-500 ease-out hover:-translate-y-2 hover:border-white">
            <div className="w-12 h-12 rounded-none flex items-center justify-center bg-transparent mb-8 group-hover:bg-white/10 transition-all duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
                <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
                <path d="M9 15c-1.8 0-3.9-1.1-5-3 1.9-1.1 4-3 5-3" />
                <path d="M15 9c0 1.8 1.1 3.9 3 5-1.9 1.1-3 4-3 5" />
              </svg>
            </div>
            <h3 className="text-xl md:text-2xl font-semibold text-white mb-4 transition-all duration-300 group-hover:[text-shadow:0_0_8px_rgba(255,255,255,0.5)]">
              Healthcare Solutions UX
            </h3>
            <p className="text-sm md:text-base text-[#aaaaaa] leading-relaxed font-normal">
              Crafting seamless experiences for healthcare solutions — dashboards, data ecosystems and clinical tools built for real decision-making.
            </p>
          </div>

          {/* Card 4 */}
          <div className="group bg-transparent border-[0.5px] border-white/10 rounded-none p-8 md:p-10 transition-all duration-500 ease-out hover:-translate-y-2 hover:border-white">
            <div className="w-12 h-12 rounded-none flex items-center justify-center bg-transparent mb-8 group-hover:bg-white/10 transition-all duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                <line x1="8" y1="21" x2="16" y2="21" />
                <line x1="12" y1="17" x2="12" y2="21" />
              </svg>
            </div>
            <h3 className="text-xl md:text-2xl font-semibold text-white mb-4 transition-all duration-300 group-hover:[text-shadow:0_0_8px_rgba(255,255,255,0.5)]">
              Design Systems & Brand Standards
            </h3>
            <p className="text-sm md:text-base text-[#aaaaaa] leading-relaxed font-normal">
              Building scalable component libraries, brand guidelines and design systems that keep products consistent and teams aligned.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
