"use client";

export default function Footer() {
  return (
    <footer className="relative bg-[#000] overflow-hidden z-10 min-h-[40vh] md:min-h-[55vh] flex flex-col">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_90%_80%_at_50%_100%,#bf4400_0%,#8b2e00_28%,#3a0f00_55%,#000_78%)] pointer-events-none"></div>

      <div className="relative z-[2] grid grid-cols-2 md:grid-cols-[1fr_auto_auto_auto_1fr] grid-rows-2 md:grid-rows-1 items-center gap-4 md:gap-8 p-6 md:pt-8 md:px-12 md:pb-7 border-b border-white/10">
        <a href="#" className="col-span-1 text-[13px] font-normal text-white/80 no-underline tracking-[0.02em] whitespace-nowrap">
          Jaydeep.design
        </a>

        <span className="hidden md:block w-4 h-4 relative opacity-30 shrink-0 before:content-[''] before:absolute before:bg-white before:w-[1px] before:h-full before:left-1/2 before:top-0 after:content-[''] after:absolute after:bg-white after:w-full after:h-[1px] after:top-1/2 after:left-0"></span>

        <ul className="col-span-2 md:col-span-1 flex justify-center gap-8 list-none m-0 p-0">
          <li><a href="/work" className="text-[13px] font-normal text-white/70 no-underline transition-colors duration-250 hover:text-white">Work</a></li>
          <li><a href="/about" className="text-[13px] font-normal text-white/70 no-underline transition-colors duration-250 hover:text-white">About Me</a></li>
          <li><a href="/contact" className="text-[13px] font-normal text-white/70 no-underline transition-colors duration-250 hover:text-white">Contact</a></li>
        </ul>

        <span className="hidden md:block w-4 h-4 relative opacity-30 shrink-0 before:content-[''] before:absolute before:bg-white before:w-[1px] before:h-full before:left-1/2 before:top-0 after:content-[''] after:absolute after:bg-white after:w-full after:h-[1px] after:top-1/2 after:left-0"></span>

        <div className="col-span-2 md:col-span-1 flex justify-center md:justify-end gap-5">
          <a href="https://www.linkedin.com/in/jay-deep/" className="text-[12px] font-medium text-white/60 no-underline tracking-[0.1em] transition-colors duration-250 hover:text-white">LI</a>
          <a href="https://www.behance.net/jay-deep" className="text-[12px] font-medium text-white/60 no-underline tracking-[0.1em] transition-colors duration-250 hover:text-white">BE</a>
          <a href="https://www.instagram.com/jaydeep.design" className="text-[12px] font-medium text-white/60 no-underline tracking-[0.1em] transition-colors duration-250 hover:text-white">IG</a>
        </div>
      </div>

      <div className="relative z-[2] flex-1 flex flex-col items-center w-full mt-auto py-8">
        {/* Jaydeep Container (80% Height Space) */}
        <div className="flex-[8] flex items-center justify-center w-full">
          <div className="text-[clamp(56px,18vw,120px)] md:text-[clamp(96px,17vw,240px)] font-bold tracking-[-0.04em] leading-[0.88] text-white/20 whitespace-nowrap select-none">
            Jaydeep
          </div>
        </div>

        {/* 2026 Container (20% Height Space) */}
        <div className="flex-[2] flex items-center justify-center w-full">
          <span className="text-[13px] text-white/50 tracking-[0.05em]">©2026</span>
        </div>
      </div>
    </footer>
  );
}
