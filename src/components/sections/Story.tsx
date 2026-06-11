"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Code2, Database, Brain, Sparkles, X, Compass, Layers } from "lucide-react";
import CardSwap, { Card } from "./CardSwap";

interface Chapter {
  id: string;
  title: string;
  year: string;
  tagline: string;
  icon: React.ReactNode;
  content: string;
  sketchLabel: string;
  tabLabel: string;
}


export default function Story() {
  const [activeChapter, setActiveChapter] = useState<Chapter | null>(null);
  const storyRef = useRef<HTMLDivElement>(null);

  const chapters: Chapter[] = [
    {
      id: "cse",
      title: "Learning how software is built",
      year: "2024",
      tagline: "Graduated DPS Bokaro Steel City // KIIT CSE.",
      icon: <Code2 className="w-8 h-8 text-amber-accent" />,
      content: "Graduated school from Delhi Public School Bokaro Steel City and started my B.Tech in Computer Science Engineering at KIIT Bhubaneswar. Moved beyond basic tutorials to deep-dive into compiler logic, discrete structures, and algorithmic complexities.",
      sketchLabel: "KIIT CSE Start",
      tabLabel: "Reliable",
    },
    {
      id: "android-design",
      title: "Design & Engineering",
      year: "2025",
      tagline: "Joining FED KIIT UI/UX team.",
      icon: <Compass className="w-8 h-8 text-amber-accent" />,
      content: "Discovered the intersection of interface logic and aesthetics. Joined FED KIIT as a Creative Senior Executive, leading UI/UX design and branding campaigns for campus startup events, and building visual prototypes in Figma and Illustrator.",
      sketchLabel: "FED UI/UX Executive",
      tabLabel: "Customizable",
    },
    {
      id: "smartbite-scanguard",
      title: "Beyond the tutorials",
      year: "2025",
      tagline: "Coding SmartBite, ScanGuard, & ZeroTrace.",
      icon: <Sparkles className="w-8 h-8 text-amber-accent" />,
      content: "Shipped functional products from scratch. Developed the SmartBite AI meal planner app in Kotlin/Firebase, built the ScanGuard QR scanner using local OpenCV CV filters, and designed the React-based secure data eraser dashboard for ZeroTrace (SIH 2025).",
      sketchLabel: "CV & AI Product Builds",
      tabLabel: "Smooth",
    },
    {
      id: "ui-ux-design-eng",
      title: "Working with real teams",
      year: "2025 — 2026",
      tagline: "Interpreting Swiggy Design Lead insights.",
      icon: <Layers className="w-8 h-8 text-amber-accent" />,
      content: "Worked as a Design Engineering Intern at Last Minutes Deals under an ex-Swiggy Design Lead. Joined GDG KIIT to design and build responsive event web setups, and interned at Fyndr to design branding systems for entrepreneur networks.",
      sketchLabel: "Industry Internships",
      tabLabel: "Scale",
    },
    {
      id: "sail-intern",
      title: "AI in industrial systems",
      year: "2026",
      tagline: "Machine Learning Intern at SAIL.",
      icon: <Database className="w-8 h-8 text-amber-accent" />,
      content: "Interned at Steel Authority of India Limited (SAIL) Bokaro Steel Plant. Developed a machine learning operational anomaly platform processing 1,000+ sensor logs across 20+ process parameters to pre-empt heavy hardware breakdowns.",
      sketchLabel: "SAIL ML Engineering",
      tabLabel: "Analytics",
    },
    {
      id: "ai-now",
      title: "Exploring intelligent products",
      year: "Now",
      tagline: "Focusing on B.Tech CSE & ML models.",
      icon: <Brain className="w-8 h-8 text-amber-accent" />,
      content: "Currently in my B.Tech CSE track at KIIT. Designing predictive diagnostics pipelines, caching telemetry nodes, and exploring local LLM agents to bridge creative UI patterns with robust computing systems.",
      sketchLabel: "CSE B.Tech // Now",
      tabLabel: "Research",
    },
  ];

  return (
    <section id="story" ref={storyRef} className="relative min-h-screen py-24 px-6 md:px-12 lg:px-20 border-b border-steel/20 bg-charcoal">
      {/* Background Section Index Header */}
      <div className="absolute top-8 left-6 md:left-12 lg:left-20 font-mono text-[11px] text-amber-accent tracking-widest uppercase">
        01 // BUILDER&apos;S LOG
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start mt-8">
        {/* Left Editorial Narrative */}
        <div className="lg:col-span-7 space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-syne text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-parchment uppercase leading-[0.95]">
              Breaking things <br />
              <span className="text-amber-accent italic font-serif lowercase">to learn</span> <br />
              how to build.
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, delay: 0.2 }}
            className="space-y-6 text-parchment/70 font-sans text-base md:text-lg leading-relaxed relative"
          >
            {/* Absolute handwritten sticky note overlay in margins */}
            <div className="absolute -right-8 lg:-right-24 top-0 w-36 hidden xl:block pointer-events-none transform rotate-6 animate-float-medium">
              <span className="font-handwriting text-amber-accent text-xl leading-none block">
                * Coffee intake: critical.
              </span>
              <span className="font-handwriting text-parchment-dark text-lg leading-none block mt-1">
                - Sleep: optional.
              </span>
            </div>

            <p>
              I am <span className="marker-highlight text-parchment font-semibold">Krrish Raj</span>, a Computer Science Engineer, AI Builder, and Product Creator. I operate at the intersection of engineering, AI, product development, and user experience design, bringing ideas from raw concept to high-fidelity execution.
            </p>
            <p>
              I believe in learning through creation and constant experimentation. Whether building Android apps, distributed web systems, industrial AI pipelines, or digital scrapbooks, I combine analytical thinking with design-driven aesthetics.
            </p>
            <p>
              Driven by curiosity, I frequently work late into the night bringing ideas to life, optimizing model structures, or building things completely from scratch to solve real-world challenges.
            </p>
          </motion.div>

          {/* Timeline Milestones layout */}
          <div className="pt-8 border-t border-steel/20 space-y-6">
            <h3 className="font-mono text-xs text-parchment/40 uppercase tracking-widest">
              HISTORICAL SNAPSHOTS:
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {chapters.map((ch, idx) => (
                <motion.div
                  key={ch.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.08 }}
                  onClick={() => setActiveChapter(ch)}
                  className="group relative bg-[#151517] border border-steel/30 p-5 rounded cursor-pointer hover:border-amber-accent transition-all duration-300"
                >
                  <div className="font-mono text-[10px] text-amber-accent/70 mb-2">{ch.year}</div>
                  <h4 className="font-sans font-bold text-sm text-parchment group-hover:text-amber-accent transition-colors">
                    {ch.title}
                  </h4>
                  <p className="text-xs text-parchment/50 mt-1 leading-snug">{ch.tagline}</p>
                  <div className="absolute bottom-4 right-4 opacity-10 group-hover:opacity-100 group-hover:text-amber-accent transition-opacity duration-300">
                    <Sparkles className="w-4 h-4" />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Interactive card stack column */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center relative lg:sticky lg:top-32 pt-8 lg:pt-0">
          <div className="relative w-80 h-[400px] max-w-full flex items-center justify-center scale-90 sm:scale-95 lg:scale-100 transition-transform duration-300">
            <CardSwap
              width={288}
              height={360}
              cardDistance={20}
              verticalDistance={20}
              delay={5000}
              pauseOnHover={true}
              onCardClick={(idx) => {
                setActiveChapter(chapters[idx]);
              }}
            >
              {chapters.map((ch, idx) => (
                <Card key={ch.id}>
                  <div className="w-full h-full transition-transform duration-300 hover:scale-[1.02] flex flex-col justify-between p-5 relative">
                    {/* Top Tab sticking out */}
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#121214] px-4 py-1 rounded-md text-[10px] font-mono flex items-center gap-1.5 shadow-md border border-zinc-800 text-zinc-300">
                      <div className="w-3.5 h-3.5 flex items-center justify-center text-zinc-400">
                        {React.cloneElement(ch.icon as any, { className: "w-3.5 h-3.5 text-current" })}
                      </div>
                      <span className="uppercase tracking-wider font-semibold">{ch.tabLabel}</span>
                    </div>

                    {/* Card Header */}
                    <div className="flex justify-between items-center text-[9px] font-mono text-zinc-500 uppercase tracking-widest pt-1">
                      <span>JOURNAL // ENTRY_0{idx + 1}</span>
                      <span>LOG_{ch.year}</span>
                    </div>

                    {/* Card Title */}
                    <h3 className="font-syne font-bold text-sm uppercase tracking-tight text-amber-accent mt-3 leading-tight border-b border-zinc-800/60 pb-2 text-left">
                      {ch.title}
                    </h3>

                    {/* Handwriting details */}
                    <div className="flex-grow flex items-center justify-center my-3 overflow-y-auto pr-0.5 custom-scrollbar text-center">
                      <p className="font-handwriting text-sm text-parchment/85 leading-relaxed">
                        {ch.content}
                      </p>
                    </div>

                    {/* Bottom Barcode */}
                    <div className="border-t border-zinc-800/60 pt-2 flex justify-between items-center text-[7px] font-mono text-zinc-500">
                      <span>REF: #{ch.id.toUpperCase()}</span>
                      <span className="font-handwriting text-xs text-amber-accent font-semibold">
                        verified ✓
                      </span>
                    </div>
                  </div>
                </Card>
              ))}
            </CardSwap>
          </div>

          <div className="text-center mt-12">
            <span className="font-handwriting text-xl text-amber-accent/80">
              * Hover to pause cycling, click card to inspect details
            </span>
          </div>
        </div>
      </div>

      {/* Chapter detail overlay modal (Editorial popup overlay) */}
      <AnimatePresence>
        {activeChapter && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-charcoal/85 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="bg-parchment text-charcoal p-6 md:p-8 rounded max-w-lg w-full relative shadow-2xl border border-steel/20 rough-border"
            >
              {/* Close Button */}
              <button
                onClick={() => setActiveChapter(null)}
                className="absolute top-4 right-4 text-charcoal/60 hover:text-charcoal hover:bg-charcoal/5 p-1 rounded-full transition-colors"
                aria-label="Close details"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-3 mb-4">
                {activeChapter.icon}
                <div>
                  <span className="font-mono text-xs uppercase tracking-widest text-charcoal/50">
                    JOURNAL ENTRY // {activeChapter.year}
                  </span>
                  <h3 className="font-syne text-2xl font-bold uppercase tracking-tight text-charcoal leading-none">
                    {activeChapter.title}
                  </h3>
                </div>
              </div>

              <div className="line-notebook py-4 my-2 border-y border-charcoal/10">
                <p className="font-sans text-sm md:text-base text-charcoal/80 leading-relaxed font-medium">
                  {activeChapter.content}
                </p>
              </div>

              <div className="mt-4 flex justify-between items-center text-xs font-mono text-charcoal/40">
                <span>AUTHOR: KRRISH RAJ</span>
                <span className="font-handwriting text-sm text-amber-accent font-semibold">
                  verified log ✓
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
