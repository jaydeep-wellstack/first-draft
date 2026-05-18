"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import * as THREE from "three";
import { motion, useScroll, useTransform } from "framer-motion";

export default function PortfolioProjects() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Three.js Background particles
  useEffect(() => {
    if (window.innerWidth <= 900) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: false });
    renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
    renderer.setSize(innerWidth, innerHeight);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, innerWidth / innerHeight, 0.1, 1000);
    camera.position.z = 7;

    const N = 400;
    const pos = new Float32Array(N * 3);
    const spd = new Float32Array(N);

    for (let i = 0; i < N; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 22;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 16;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 8;
      spd[i] = 0.003 + Math.random() * 0.006;
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    scene.add(new THREE.Points(geo, new THREE.PointsMaterial({ color: 0xffffff, size: 0.05, transparent: true, opacity: 0.45 })));

    const handleResize = () => {
      renderer.setSize(innerWidth, innerHeight);
      camera.aspect = innerWidth / innerHeight;
      camera.updateProjectionMatrix();
    };
    window.addEventListener('resize', handleResize);

    let animationFrameId: number;
    const loop = () => {
      animationFrameId = requestAnimationFrame(loop);
      const p = geo.attributes.position.array as Float32Array;
      for (let i = 0; i < N; i++) {
        p[i * 3 + 1] += spd[i];
        if (p[i * 3 + 1] > 8) p[i * 3 + 1] = -8;
      }
      geo.attributes.position.needsUpdate = true;
      renderer.render(scene, camera);
    };
    loop();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      renderer.dispose();
      geo.dispose();
    };
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const cards = [
    { name: "Runo", year: "/2025", img: "https://cdn.prod.website-files.com/6a035c998ec9d2a95ad04a6f/6a035c998ec9d2a95ad04b3c_project_main_image.webp" },
    { name: "Biofix", year: "/ 2025", img: "https://cdn.prod.website-files.com/6a035c998ec9d2a95ad04a6f/6a035c998ec9d2a95ad04b39_project_main_image.webp" },
    { name: "Sukim", year: "/ 2025", img: "https://cdn.prod.website-files.com/6a035c998ec9d2a95ad04a6f/6a035c998ec9d2a95ad04b3a_project_main_image.webp" },
    { name: "Arca", year: "/ 2025", img: "https://cdn.prod.website-files.com/6a035c998ec9d2a95ad04a6f/6a035c998ec9d2a95ad04b3b_project_main_image.webp" },
  ];

  // We map the scroll progress across the 4 cards.
  // Card 0 is already visible. As we scroll from 0 to 0.33, card 1 enters.
  // 0.33 to 0.66: card 2 enters.
  // 0.66 to 1.0: card 3 enters.

  const y0 = useTransform(scrollYProgress, [0, 0.33], ["0%", "-5%"]);
  const s0 = useTransform(scrollYProgress, [0, 0.33], [1, 0.88]);

  const y1 = useTransform(scrollYProgress, [0, 0.33, 0.66], ["110%", "0%", "-5%"]);
  const s1 = useTransform(scrollYProgress, [0, 0.33, 0.66], [1, 1, 0.88]);

  const y2 = useTransform(scrollYProgress, [0.33, 0.66, 1], ["110%", "0%", "-5%"]);
  const s2 = useTransform(scrollYProgress, [0.33, 0.66, 1], [1, 1, 0.88]);

  const y3 = useTransform(scrollYProgress, [0.66, 1], ["110%", "0%"]);
  const s3 = useTransform(scrollYProgress, [0.66, 1], [1, 1]);

  const transforms = [
    { y: y0, s: s0 },
    { y: y1, s: s1 },
    { y: y2, s: s2 },
    { y: y3, s: s3 },
  ];

  return (
    <section ref={containerRef} className="relative h-[500vh] bg-[#0a0a08]">
      <canvas ref={canvasRef} className="fixed inset-0 w-full h-full pointer-events-none z-0 opacity-15"></canvas>
      <img className="fixed inset-0 w-full h-full object-cover z-[1] opacity-25 pointer-events-none" src="https://cdn.prod.website-files.com/6a035c978ec9d2a95ad049ba/6a035c998ec9d2a95ad04a9f_Project_BG.webp" alt="" />

      <div className="sticky top-0 h-screen w-full overflow-hidden z-[2] flex flex-col">
        <div className="flex justify-between items-center pt-24 px-6 md:px-12 lg:px-24 w-full shrink-0 relative z-10">
          <span className="text-[11px] font-normal tracking-[0.14em] uppercase text-white/40">/ Projects</span>
          <span className="text-[11px] font-normal tracking-[0.14em] uppercase text-white/40">N. 02</span>
        </div>

        <div className="flex-1 grid grid-cols-1 md:grid-cols-[240px_1fr_200px] items-center px-6 md:px-12 lg:px-24 w-full pb-24">
          <div className="hidden md:flex items-center h-full">
            <span className="text-[clamp(44px,5vw,72px)] font-bold tracking-[-0.03em] text-white leading-none select-none">
              (18-26)
            </span>
          </div>

          <div className="relative h-full flex items-center justify-center">
            <div className="relative w-full h-[calc(100vh-200px)] flex items-center justify-center md:h-[calc(100vh-200px)] flex-col md:flex-row md:block mt-8 md:mt-0 gap-7 md:gap-0">
              {cards.map((card, i) => (
                <motion.div
                  key={i}
                  style={{
                    y: transforms[i].y,
                    scale: transforms[i].s,
                    zIndex: 10 + i
                  }}
                  className={`md:absolute w-full flex flex-col origin-bottom will-change-transform md:transform-none ${i > 0 ? "md:translate-y-[110%]" : ""}`}
                >
                  <div className="w-full overflow-hidden bg-[#111] aspect-[680/480] group">
                    <img
                      src={card.img}
                      alt={card.name}
                      className="w-full h-full object-cover block transition-transform duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:scale-105"
                    />
                  </div>
                  <div className="flex justify-between items-center pt-3">
                    <span className="text-[14px] font-light text-white/85">{card.name}</span>
                    <span className="text-[12px] font-light text-white/40 tracking-[0.06em]">{card.year}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="hidden md:flex items-center justify-end h-full">
            <a href="#" className="flex items-center gap-3 no-underline text-white/80 text-[13px] font-light tracking-[0.06em] whitespace-nowrap">
              Explore All
              <span className="block w-[38px] h-[1px] bg-white/50 relative shrink-0 after:content-[''] after:absolute after:right-0 after:-top-[4px] after:w-[9px] after:h-[9px] after:border-r after:border-t after:border-white/50 after:rotate-45"></span>
            </a>
          </div>
        </div>
      </div>

      <a href="#" className="md:hidden flex items-center justify-center gap-[14px] text-white/80 text-[13px] pt-10 pb-12 px-6 border-t border-white/10 mt-7 relative z-10">
        Explore All Projects
        <span className="block w-[38px] h-[1px] bg-white/50 relative shrink-0 after:content-[''] after:absolute after:right-0 after:-top-[4px] after:w-[9px] after:h-[9px] after:border-r after:border-t after:border-white/50 after:rotate-45"></span>
      </a>
    </section>
  );
}
