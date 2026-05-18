"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);

  // Prevent scrolling when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Hide Navbar when page loader is active
  useEffect(() => {
    const loaderExists = document.querySelector(".loading-experience-overlay");
    if (loaderExists) {
      setShowNavbar(false);

      const handleLoaded = () => {
        // Smoothly fade in navbar after experience starts loading exit
        setTimeout(() => {
          setShowNavbar(true);
        }, 800);
      };

      window.addEventListener("experience-loaded", handleLoaded);
      return () => window.removeEventListener("experience-loaded", handleLoaded);
    }
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);

  const menuItems = [
    { title: "Home", num: "01", href: "/" },
    { title: "About me", num: "02", href: "/about" },
    { title: "Work", num: "03", href: "/work" },
    { title: "Contact me", num: "04", href: "/contact" },
  ];

  return (
    <>
      {/* Sticky Header */}
      <motion.header
        initial={{ y: -50, opacity: 0 }}
        animate={{
          y: showNavbar ? 0 : -50,
          opacity: showNavbar ? 1 : 0
        }}
        transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-6 md:px-12 pt-12 pb-6 pointer-events-none mix-blend-difference text-white"
      >
        {/* Logo */}
        <div className="pointer-events-auto cursor-pointer flex items-center">
          <img
            src="/logo.png"
            alt="Jaydeep"
            className="h-8 md:h-9 w-auto object-contain"
          />
        </div>

        {/* Hamburger Icon */}
        <button
          onClick={toggleMenu}
          className="pointer-events-auto w-7 h-8 flex items-center justify-center bg-transparent border-none cursor-pointer hover:opacity-70 transition-opacity"
          aria-label="Toggle menu"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 730 630"
            preserveAspectRatio="xMidYMid meet"
            className="w-full h-full"
          >
            <g>
              <g transform="matrix(1,0,0,1,365,315)">
                <path strokeLinecap="round" strokeLinejoin="round" fillOpacity="0" stroke="rgb(255,255,255)" strokeOpacity="1" strokeWidth="55" d=" M-327,-176.5 C-327,-176.5 327,-176.5 327,-176.5"></path>
              </g>
              <g transform="matrix(1,0,0,1,365,315)">
                <path strokeLinecap="round" strokeLinejoin="round" fillOpacity="0" stroke="rgb(255,255,255)" strokeOpacity="1" strokeWidth="55" d=" M-327,176.5 C-327,176.5 327,176.5 327,176.5"></path>
              </g>
            </g>
          </svg>
        </button>
      </motion.header>

      {/* Fullscreen Overlay Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-xl flex flex-col justify-center items-center"
          >
            {/* Overlay Header (Logo & Close Btn) */}
            <div className="absolute top-0 left-0 w-full flex justify-between items-center px-6 md:px-12 pt-12 pb-6">
              <div className="cursor-pointer" onClick={toggleMenu}>
                <img
                  src="/logo.png"
                  alt="Jaydeep"
                  className="h-8 md:h-9 w-auto object-contain"
                />
              </div>
              <button
                onClick={toggleMenu}
                className="w-12 h-10 flex items-center justify-center bg-transparent border-none cursor-pointer hover:opacity-70 transition-opacity"
                aria-label="Close menu"
              >
                <svg viewBox="0 0 24 24" className="w-8 h-8 stroke-white fill-none stroke-2 stroke-[round] stroke-linejoin-[round]">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>

            {/* Menu Links */}
            <nav className="w-full max-w-4xl px-8 flex flex-col items-center">
              {menuItems.map((item, i) => (
                <motion.a
                  key={i}
                  href={item.href}
                  onClick={toggleMenu}
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -30, opacity: 0 }}
                  whileHover="hover"
                  transition={{ duration: 0.4, delay: i * 0.1, ease: [0.76, 0, 0.24, 1] }}
                  className="group relative w-full flex justify-center items-center py-6 border-b border-white/10 no-underline cursor-pointer"
                >
                  <div className="relative inline-flex items-start">
                    <span className="text-[clamp(40px,8vw,80px)] font-bold text-white tracking-[-0.02em] transition-transform duration-300 group-hover:scale-105">
                      {item.title}
                    </span>
                    <span className="absolute -right-6 top-1 md:top-3 text-[clamp(10px,1.5vw,14px)] text-white/50 tracking-wider">
                      {item.num}
                    </span>
                  </div>

                  {/* Animated Progress Bar (ScaleX from Left to Right) */}
                  <motion.div 
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-white"
                    style={{ originX: 0 }}
                    initial={{ scaleX: 0 }}
                    variants={{
                      hover: { scaleX: 1 }
                    }}
                    transition={{ duration: 0.45, ease: [0.76, 0, 0.24, 1] }}
                  />
                </motion.a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
