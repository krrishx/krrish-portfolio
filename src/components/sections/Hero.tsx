"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowDownRight, Compass, Sparkles } from "lucide-react";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const },
    },
  };

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen pt-32 pb-16 px-6 md:px-12 lg:px-20 flex flex-col justify-between overflow-hidden grid-notebook"
    >
      {/* Background Notebook Line Grid (Decoupled layout) */}
      <div className="absolute top-0 right-0 w-[50%] h-[75%] border-l border-b border-steel/20 pointer-events-none hidden md:block" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 relative z-10 w-full my-auto"
      >
        {/* Main Brand & Copy */}
        <div className="lg:col-span-8 flex flex-col justify-center">
          <motion.div variants={itemVariants} className="flex items-center gap-2 mb-3">
            <span className="text-[10px] font-mono tracking-widest text-amber-accent bg-amber-accent/10 px-2 py-0.5 rounded-sm border border-amber-accent/20">
              PORTFOLIO EDITION // 2026
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-amber-accent animate-pulse" />
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="font-syne text-[clamp(2.5rem,7.5vw,7rem)] font-extrabold leading-[0.85] text-parchment uppercase tracking-tight select-none"
          >
            Builder. <br />
            <span className="stroke-text">Engineer.</span> <br />
            Creator.
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="mt-6 text-base md:text-lg text-parchment/60 max-w-xl font-sans leading-relaxed"
          >
            I build cool stuff.
            <br />
            <br />
            Sometimes they&apos;re apps.
            <br />
            Sometimes they&apos;re AI systems.
            <br />
            Sometimes they&apos;re ideas that refuse to leave me alone.
          </motion.p>

          <motion.div variants={itemVariants} className="mt-8 flex flex-wrap gap-4 items-center">
            <a
              href="#projects"
              className="group flex items-center gap-2 bg-amber-accent text-charcoal font-sans font-bold px-6 py-3 rounded-sm border border-amber-accent hover:bg-transparent hover:text-amber-accent transition-all duration-300"
            >
              Explore Creations
              <ArrowDownRight className="w-4 h-4 group-hover:translate-x-1 group-hover:translate-y-1 transition-transform" />
            </a>
            <a
              href="/KRRISH_RESUME.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 font-sans font-bold px-6 py-3 rounded-sm border border-amber-accent text-amber-accent hover:bg-amber-accent hover:text-charcoal transition-all duration-300"
            >
              Resume
            </a>
          </motion.div>
        </div>

        {/* Draggable scrapbook overlays */}
        <div className="lg:col-span-4 relative min-h-[480px] md:min-h-[500px] lg:min-h-[450px] md:max-w-2xl md:mx-auto w-full mb-12 md:mb-0">
          {/* Handwritten Card */}
          <motion.div
            drag
            dragConstraints={containerRef}
            whileDrag={{ scale: 1.05, rotate: -2 }}
            initial={isMobile ? { x: 0, y: 10, rotate: 3 } : { x: 20, y: 10, rotate: 3 }}
            data-cursor="drag"
            data-cursor-text="drag me"
            className="absolute top-4 right-2 sm:right-4 lg:right-0 bg-[#fbf2c0] text-charcoal p-5 w-44 sm:w-64 lg:w-52 xl:w-60 2xl:w-64 shadow-xl border border-charcoal/10 font-handwriting text-xl cursor-grab active:cursor-grabbing select-none z-10"
          >
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-4 bg-charcoal/5 border-x border-charcoal/10 pointer-events-none" />
            <h4 className="font-sans font-bold text-[10px] uppercase tracking-widest text-charcoal/40 mb-2">
              NOTEBOOK_ENTRY // #11
            </h4>
            <p className="leading-snug">
              "Operating at the intersection of engineering, AI, product development, and UX to turn concepts into execution."
            </p>
            <div className="mt-4 flex justify-between items-center text-[10px] font-mono text-charcoal/40">
              <span>02:40 AM</span>
              <span>K.R.</span>
            </div>
          </motion.div>

          {/* Polaroid Snap */}
          <motion.div
            drag
            dragConstraints={containerRef}
            whileDrag={{ scale: 1.05, rotate: 2 }}
            initial={isMobile ? { x: 0, y: 120, rotate: -5 } : { x: -10, y: 150, rotate: -5 }}
            data-cursor="drag"
            data-cursor-text="drag me"
            className="absolute top-4 left-2 sm:left-4 lg:left-0 bg-parchment text-charcoal p-4 pb-10 w-48 sm:w-64 lg:w-60 xl:w-68 2xl:w-72 shadow-2xl border border-steel/20 cursor-grab active:cursor-grabbing select-none z-10"
          >
            <div className="w-full aspect-square bg-[#28282B] relative overflow-hidden">
              <img
                src="/DSC02996.JPG"
                alt="Krrish Raj"
                className="w-full h-full object-cover"
                draggable="false"
              />
            </div>
            <p className="font-handwriting text-lg text-charcoal text-center mt-4 leading-none">
              Main Character #001
            </p>
          </motion.div>

          {/* System Card (Ctrl+Z Artwork Swap) */}
          <motion.div
            drag
            dragConstraints={containerRef}
            whileDrag={{ scale: 1.08 }}
            initial={isMobile ? { x: 0, y: 240, rotate: 6 } : { x: 0, y: 280, rotate: 6 }}
            data-cursor="drag"
            data-cursor-text="drag me"
            className="absolute top-4 right-4 sm:right-8 lg:right-[-48px] bg-[#28282B] border border-steel/50 p-3 rounded w-44 sm:w-60 lg:w-52 xl:w-60 2xl:w-64 shadow-2xl cursor-grab active:cursor-grabbing select-none hover:border-amber-accent transition-colors duration-300 z-10"
          >
            <div className="w-full aspect-[4/5] relative overflow-hidden bg-black/20 rounded-sm">
              <img
                src="/ctrl-z.jpg"
                alt="Ctrl+Z Artwork"
                className="w-full h-full object-cover"
                draggable="false"
              />
            </div>
            <div className="mt-2 text-[8px] font-mono text-parchment/40 uppercase tracking-widest text-center">
              SYSTEM_RESTORE // CTRL + Z
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Hero Footnotes */}
      <div className="mt-8 w-full flex flex-col sm:flex-row justify-between items-start sm:items-center border-t border-steel/15 pt-6 relative z-10">
        <div className="flex items-center gap-4 text-[10px] font-mono text-parchment/40 uppercase">
          <span>LATITUDE: 20.2961° N</span>
          <span>LONGITUDE: 85.8245° E</span>
        </div>
        <div className="flex items-center gap-2 mt-3 sm:mt-0 text-[10px] font-mono text-amber-accent uppercase animate-bounce">
          <Compass className="w-3.5 h-3.5 animate-spin-slow" />
          <span>Scroll to scroll the scrapbook</span>
        </div>
      </div>
    </section>
  );
}
