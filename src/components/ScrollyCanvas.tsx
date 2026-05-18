"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import Overlay from "./Overlay";

export default function ScrollyCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  const { scrollY } = useScroll();
  const [scrollDistance, setScrollDistance] = useState(3600); // Premium default

  useEffect(() => {
    const handleResize = () => {
      setScrollDistance(4 * window.innerHeight);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  
  // Absolute linear scroll progress mapped from window scrollY
  const scrollYProgress = useTransform(scrollY, [0, scrollDistance], [0, 1]);

  const numFrames = 120;
  const frameIndex = useTransform(scrollYProgress, [0, 1], [0, numFrames - 1]);
  
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [loadedCount, setLoadedCount] = useState(0);

  useEffect(() => {
    const preloadImages = async () => {
      let currentLoadedCount = 0;
      const promises = Array.from({ length: numFrames }, (_, i) => {
        return new Promise<HTMLImageElement>((resolve) => {
          const img = new Image();
          const paddedIndex = i.toString().padStart(3, "0");
          img.src = `/sequence/frame_${paddedIndex}_delay-0.07s.webp`;
          img.onload = () => {
            currentLoadedCount++;
            setLoadedCount(currentLoadedCount);
            resolve(img);
          };
          img.onerror = () => {
            console.error(`Failed to load image index ${i}`);
            currentLoadedCount++;
            setLoadedCount(currentLoadedCount);
            resolve(img); 
          };
        });
      });

      const startTime = Date.now();
      const loadedImages = await Promise.all(promises);
      setImages(loadedImages);

      // Ensure loader is visible for a minimum of 3 seconds
      const elapsedTime = Date.now() - startTime;
      const remainingTime = Math.max(0, 3000 - elapsedTime);
      if (remainingTime > 0) {
        await new Promise((resolve) => setTimeout(resolve, remainingTime));
      }

      setIsLoaded(true);
      window.dispatchEvent(new CustomEvent("experience-loaded"));
    };

    preloadImages();
  }, []);

  const drawImage = (index: number) => {
    if (!images[index] || !canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = images[index];
    if (!img.width) return; // Skip broken images
    
    // Set canvas dimensions to match window, accounting for device pixel ratio for crispness
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    // Object-fit: cover logic
    const imgRatio = img.width / img.height;
    const canvasRatio = rect.width / rect.height;

    let drawWidth = rect.width;
    let drawHeight = rect.height;
    let offsetX = 0;
    let offsetY = 0;

    if (imgRatio > canvasRatio) {
      // Image is wider than canvas
      drawWidth = rect.height * imgRatio;
      offsetX = (rect.width - drawWidth) / 2;
    } else {
      // Image is taller than canvas
      drawHeight = rect.width / imgRatio;
      offsetY = (rect.height - drawHeight) / 2;
    }

    // Clear canvas before drawing
    ctx.clearRect(0, 0, rect.width, rect.height);
    
    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
  };

  // Draw first frame when loaded
  useEffect(() => {
    if (isLoaded && images.length > 0) {
      drawImage(0);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoaded, images]);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      if (isLoaded) {
        drawImage(Math.round(frameIndex.get()));
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoaded, frameIndex]);

  // Scrub through images on scroll
  useMotionValueEvent(frameIndex, "change", (latest) => {
    if (isLoaded) {
      drawImage(Math.round(latest));
    }
  });

  return (
    <div ref={containerRef} className="relative h-[500vh] bg-[#121212] w-full">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <canvas
          ref={canvasRef}
          className="absolute inset-0 h-full w-full block"
        />

        <Overlay scrollYProgress={scrollYProgress} />
        
        {/* Loading overlay */}
        <AnimatePresence>
          {!isLoaded && (
            <motion.div 
              initial={{ y: 0 }}
              exit={{ y: "-100%" }}
              transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
              className="fixed inset-0 flex items-center justify-center bg-[#121212] z-[100] loading-experience-overlay"
            >
              <div className="inline-flex flex-col items-stretch">
                <h1 className="text-5xl md:text-8xl font-bold tracking-tighter mb-8 text-white text-center">
                  Jaydeep.
                </h1>
                <div className="w-full h-1 bg-white/20 rounded-full overflow-hidden mb-4">
                  <div 
                    className="h-full bg-white transition-all duration-200 ease-out"
                    style={{ width: `${Math.round((loadedCount / numFrames) * 100)}%` }}
                  />
                </div>
                <p className="text-white/60 text-sm tracking-[0.2em] uppercase font-medium animate-pulse text-center">
                  Loading Experience {Math.round((loadedCount / numFrames) * 100)}%
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
