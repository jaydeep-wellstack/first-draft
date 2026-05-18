"use client";

import { motion } from "framer-motion";

const projects = [
  {
    title: "Runo",
    year: "/2025",
    color: "from-[#1a1a1a] to-[#0d0d0d]" // Widescreen black runner mockup background color signature
  },
  {
    title: "Sukim",
    year: "/2025",
    color: "from-[#cc5f25] to-[#73300f]" // Widescreen terracotta orange silhouette mockup background color signature
  },
  {
    title: "Arca",
    year: "/2025",
    color: "from-[#3f4a50] to-[#1e2528]" // Widescreen tactical cool-gray winter mockup background color signature
  }
];

export default function Work() {
  return (
    <section className="relative w-full bg-[#0a0a0a] text-white py-32 px-6 md:px-12 lg:px-24">
      {/* Top bar */}
      <div className="w-full max-w-[1400px] mx-auto mb-24">
        <div className="w-full border-t border-white/10 mb-8"></div>
        <div className="flex justify-between items-center text-[11px] tracking-widest text-white/80 uppercase">
          <div className="flex items-center gap-3 font-medium">
            / WORK
          </div>
          <div className="font-medium">N. 02</div>
        </div>
      </div>

      {/* Main Grid Layout */}
      <div className="w-full max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 items-start relative">

        {/* Left Sticky Column: Title */}
        <div className="col-span-12 md:col-span-3 sticky top-[120px] md:top-[160px] z-20 h-fit mb-4 md:mb-0">
          <h2 className="text-5xl md:text-7xl xl:text-[5.5rem] font-bold tracking-tight text-white font-heading leading-none">
            (18-26)
          </h2>
        </div>

        {/* Center Scroll Column: Sticky Stacking Cards */}
        <div className="col-span-12 md:col-span-6 md:col-start-4 space-y-0 pb-[25vh]">
          {projects.map((project, idx) => (
            <div
              key={idx}
              className="sticky w-full bg-[#0a0a0a] pt-4 pb-16"
              style={{
                // Stack directly on top of each other
                top: "160px",
                // Increase z-index for each successive card so they stack over the previous ones
                zIndex: idx + 10
              }}
            >
              {/* Card Shape Container */}
              <div className="w-full aspect-[16/10] bg-gradient-to-br border border-white/5 relative overflow-hidden group cursor-pointer shadow-2xl transition-all duration-300">
                {/* Background color gradient based on screenshot */}
                <div className={`absolute inset-0 bg-gradient-to-br ${project.color}`} />

                {/* Hover overlay glow */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-10 bg-white transition-opacity duration-500 z-10"></div>

                {/* Subtle tech grid lines in background of placeholder card for premium detailing */}
                <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] z-0"></div>
              </div>

              {/* Case Study Details */}
              <div className="flex justify-between items-center mt-6 text-sm font-medium tracking-wide">
                <span className="text-white text-xl font-heading font-medium tracking-wide">{project.title}</span>
                <span className="text-white/40 font-mono">{project.year}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Right Sticky Column: Explore All Button */}
        <div className="col-span-12 md:col-span-3 md:col-start-10 lg:col-start-11 sticky top-[120px] md:top-[160px] z-20 h-fit flex md:justify-end mt-4 md:mt-0">
          <a
            href="/work"
            className="group flex items-center gap-4 text-[11px] uppercase tracking-widest text-white/80 hover:text-white transition-colors duration-300"
          >
            <span className="font-semibold">Explore All</span>
            <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:border-white group-hover:bg-white group-hover:text-black transition-all duration-300">
              <svg className="w-4 h-4 stroke-current fill-none stroke-2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </div>
          </a>
        </div>

      </div>
    </section>
  );
}
