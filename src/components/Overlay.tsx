"use client";

import { motion, MotionValue, useTransform } from "framer-motion";

interface OverlayProps {
  scrollYProgress: MotionValue<number>;
}

export default function Overlay({ scrollYProgress }: OverlayProps) {
  // Section 1 (0% to 30% scroll): Center
  const opacity1 = useTransform(scrollYProgress, [0, 0.25, 0.30, 0.33, 1], [1, 1, 0, 0, 0]);
  const y1 = useTransform(scrollYProgress, [0, 0.30], [0, -45]);

  // Scroll Indicator (fades out immediately)
  const scrollIndicatorOpacity = useTransform(scrollYProgress, [0, 0.02, 1], [1, 0, 0]);

  // Section 2 (30% to 66% scroll): Left aligned
  const opacity2 = useTransform(scrollYProgress, [0, 0.30, 0.34, 0.62, 0.66, 1], [0, 0, 1, 1, 0, 0]);
  const y2 = useTransform(scrollYProgress, [0, 0.30, 0.34, 0.62, 0.66, 1], [45, 45, 0, 0, -45, -45]);

  // Section 3 (66% to 98% scroll): Right aligned
  const opacity3 = useTransform(scrollYProgress, [0, 0.66, 0.70, 0.94, 0.98, 1], [0, 0, 1, 1, 0, 0]);
  const y3 = useTransform(scrollYProgress, [0, 0.66, 0.70, 0.94, 0.98, 1], [45, 45, 0, 0, -45, -45]);

  return (
    <div className="absolute inset-0 pointer-events-none z-30 w-full h-full">
      {/* Section 1 */}
      <motion.div
        style={{
          opacity: opacity1,
          y: y1
        }}
        className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 pt-[110px] pointer-events-none"
      >
        <h1 className="text-7xl md:text-[10rem] font-bold tracking-tighter mb-4 text-white/70 leading-none">
          Jaydeep
        </h1>
        <p className="text-2xl md:text-5xl text-white/50 font-light tracking-widest uppercase mt-4">
          PRODUCT DESIGNER
        </p>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        style={{
          opacity: scrollIndicatorOpacity
        }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 pointer-events-none"
      >
        <span className="text-white/80 text-lg font-light tracking-wide">
          Scroll
        </span>
        <div className="w-[2px] h-16 bg-gradient-to-b from-white/80 to-transparent"></div>
      </motion.div>

      {/* Section 2 */}
      <motion.div
        style={{
          opacity: opacity2,
          y: y2
        }}
        className="absolute inset-0 flex items-center justify-start text-left px-8 md:px-24 pointer-events-none"
      >
        <h2 style={{ lineHeight: 1.2, textShadow: "0px 0px 8px rgba(255, 255, 255, 0.4)" }} className="text-4xl md:text-7xl font-medium text-white max-w-4xl">
          I build <br />
          <span className="text-white/50 italic font-heading font-bold inline-block mt-1">design <br /> intelligence.</span>
        </h2>
      </motion.div>

      {/* Section 3 */}
      <motion.div
        style={{
          opacity: opacity3,
          y: y3
        }}
        className="absolute inset-0 flex items-center justify-end text-right px-8 md:px-24 pointer-events-none"
      >
        <h2 style={{ lineHeight: 1.2, textShadow: "0px 0px 8px rgba(255, 255, 255, 0.4)" }} className="text-4xl md:text-7xl font-medium text-white max-w-3xl">
          Bridging design, <br />
          <span className="text-white/50 italic font-heading font-bold inline-block mt-1">AI & analytics.</span>
        </h2>
      </motion.div>
    </div>
  );
}
