"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function CTA() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const parent = canvas.parentElement;
    if (!parent) return;
    
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: false });
    renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
    renderer.setSize(parent.offsetWidth, parent.offsetHeight || window.innerHeight);
    
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(70, parent.offsetWidth / (parent.offsetHeight || window.innerHeight), 0.1, 1000);
    camera.position.z = 5;
    
    const N = 600;
    const pos = new Float32Array(N * 3);
    for (let i = 0; i < N; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 14;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    scene.add(new THREE.Points(geo, new THREE.PointsMaterial({ color: 0xffffff, size: 0.04, transparent: true, opacity: 0.7 })));
    
    const addWisp = (x: number) => {
      const pts = [];
      for (let i = 0; i < 60; i++) {
        pts.push(new THREE.Vector3(x + (Math.random() - 0.5) * 3, (Math.random() - 0.5) * 8, (Math.random() - 0.5) * 2));
      }
      const g = new THREE.BufferGeometry().setFromPoints(pts);
      scene.add(new THREE.Points(g, new THREE.PointsMaterial({ color: 0x4488ff, size: 0.06, transparent: true, opacity: 0.3 })));
    };
    
    addWisp(-7);
    addWisp(7);
    
    const handleResize = () => {
      const w = parent.offsetWidth;
      const h = parent.offsetHeight || window.innerHeight;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    
    window.addEventListener('resize', handleResize);
    
    let t = 0;
    let animationFrameId: number;
    const loop = () => {
      animationFrameId = requestAnimationFrame(loop);
      t += 0.003;
      camera.position.x = Math.sin(t * 0.4) * 0.3;
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

  return (
    <section className="relative bg-[#000] min-h-screen flex flex-col items-center justify-start overflow-hidden z-10">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-0"></canvas>
      
      <div className="relative z-[2] text-center px-6 md:px-12 pt-20 pb-10 w-full">
        <div className="text-[clamp(32px,10vw,60px)] md:text-[clamp(42px,7vw,100px)] font-bold tracking-[-0.03em] leading-none text-white mb-2">
          Open to opportunities
        </div>
        <div className="text-[clamp(30px,9vw,56px)] md:text-[clamp(40px,7vw,96px)] font-bold tracking-[-0.03em] leading-none text-white/25 mb-10">
          Let's Connect
        </div>
        <a href="#" className="inline-flex items-center justify-center px-12 py-3.5 bg-white text-black text-[13px] font-medium tracking-[0.04em] no-underline cursor-pointer border-none transition-all duration-250 hover:bg-white/85 hover:-translate-y-0.5">
          Let's Discuss
        </a>
      </div>
      
      <div className="relative z-[2] w-full max-w-[680px] mx-auto px-6 md:px-12 flex-1 flex items-end justify-center">
        <img className="w-full max-h-[55vh] object-cover object-top block" src="https://cdn.prod.website-files.com/6a035c978ec9d2a95ad049ba/6a05880c51b3bf2cb1b0f375_3.jpeg" alt="Jaydeep" />
      </div>
    </section>
  );
}
