"use client";

import { motion } from "framer-motion";
import { Cpu, Layout, Compass, Layers, Smartphone, Users, Database, Brain, Code2, Sparkles } from "lucide-react";

interface SkillItem {
  name: string;
  desc: string;
  icon: React.ReactNode;
}

export default function Skills() {
  const track1: SkillItem[] = [
    { name: "Python", desc: "Used for anomaly detection systems, automation, and machine learning pipelines.", icon: <Code2 className="w-4 h-4 text-amber-accent" /> },
    { name: "React / Next.js", desc: "Modern interactive web interfaces, design systems, and frontend architecture.", icon: <Layout className="w-4 h-4 text-amber-accent" /> },
    { name: "Kotlin", desc: "Native Android applications built using modern Jetpack UI frameworks.", icon: <Smartphone className="w-4 h-4 text-amber-accent" /> },
    { name: "MongoDB", desc: "Caches telemetry data, indices unstructured records, and executes searches.", icon: <Database className="w-4 h-4 text-amber-accent" /> },
    { name: "Node.js", desc: "Event-driven high-performance backend microservices and API routing.", icon: <Cpu className="w-4 h-4 text-amber-accent" /> },
    { name: "Figma", desc: "High-fidelity prototypes, system wireframes, and design specs.", icon: <Compass className="w-4 h-4 text-amber-accent" /> },
    { name: "Java", desc: "Backend application architecture, object-oriented design structures, and platform systems.", icon: <Code2 className="w-4 h-4 text-amber-accent" /> },
  ];

  const track2: SkillItem[] = [
    { name: "Machine Learning", desc: "Autoencoders, neural networks, and multi-sensor predictive diagnostics.", icon: <Brain className="w-4 h-4 text-amber-accent" /> },
    { name: "Scikit-Learn", desc: "Predictive model training, clustering models, and telemetry preprocessing.", icon: <Layers className="w-4 h-4 text-amber-accent" /> },
    { name: "Express.js", desc: "Custom security middleware, rate-limiting, and RESTful routing.", icon: <Cpu className="w-4 h-4 text-amber-accent" /> },
    { name: "Jetpack Compose", desc: "Declarative UI with spring physics and custom canvas renderings.", icon: <Smartphone className="w-4 h-4 text-amber-accent" /> },
    { name: "Adobe Illustrator", desc: "Visual vector design, technical layouts, and brand assets.", icon: <Layers className="w-4 h-4 text-amber-accent" /> },
    { name: "Pandas", desc: "Data cleaning, real-time ingestion pipelines, and FFT telemetry features.", icon: <Database className="w-4 h-4 text-amber-accent" /> },
    { name: "OpenCV", desc: "Used for real-time edge detection, computer vision models, and camera frames processing.", icon: <Compass className="w-4 h-4 text-amber-accent" /> },
  ];

  const track3: SkillItem[] = [
    { name: "Firebase", desc: "Real-time database sync, user auth, and serverless functions.", icon: <Database className="w-4 h-4 text-amber-accent" /> },
    { name: "Adobe Premiere Pro", desc: "Video timelines, custom overlays, and post-production rendering.", icon: <Layout className="w-4 h-4 text-amber-accent" /> },
    { name: "Team Management", desc: "Coordinating developers, agile sprints, and code standards.", icon: <Users className="w-4 h-4 text-amber-accent" /> },
    { name: "Public Speaking", desc: "Presenting tech specs and explaining system architectural blueprints.", icon: <Sparkles className="w-4 h-4 text-amber-accent" /> },
    { name: "Leadership", desc: "Directing projects from initial concept phase to verified deployments.", icon: <Users className="w-4 h-4 text-amber-accent" /> },
    { name: "Critical Thinking", desc: "Refactoring modules, performance caching, and debugging systems.", icon: <Brain className="w-4 h-4 text-amber-accent" /> },
    { name: "SQL", desc: "Relational database schema modeling, queries optimization, and telemetry archiving.", icon: <Database className="w-4 h-4 text-amber-accent" /> },
    { name: "Git", desc: "Distributed version control, repository branches, and code repository pipeline flows.", icon: <Layers className="w-4 h-4 text-amber-accent" /> },
  ];

  const drawLine = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { type: "spring" as const, duration: 2, bounce: 0 },
        opacity: { duration: 0.1 },
      },
    },
  };

  const renderTrack = (items: SkillItem[], reverse = false) => {
    // Duplicate to ensure seamless looping marquee
    const duplicatedItems = [...items, ...items];
    return (
      <div className="overflow-hidden w-full flex select-none pointer-events-auto py-2">
        <div
          className={`flex gap-6 w-max ${
            reverse ? "animate-marquee-reverse" : "animate-marquee"
          } hover:[animation-play-state:paused]`}
        >
          {duplicatedItems.map((item, idx) => (
            <div
              key={`${item.name}-${idx}`}
              className="w-[280px] sm:w-[320px] shrink-0 border border-steel/20 bg-dark-gray/60 backdrop-blur-sm p-4 rounded flex flex-col justify-between hover:border-amber-accent/40 transition-colors duration-300 relative group cursor-pointer"
            >
              <div>
                <div className="flex justify-between items-center border-b border-steel/20 pb-2 mb-3">
                  <div className="flex items-center gap-2">
                    {item.icon}
                    <span className="font-syne text-xs font-bold uppercase tracking-tight text-parchment group-hover:text-amber-accent transition-colors">
                      {item.name}
                    </span>
                  </div>
                  <span className="font-mono text-[8px] text-parchment/30">
                    [ {idx < items.length ? `SK_0${idx + 1}` : `SK_0${idx - items.length + 1}`} ]
                  </span>
                </div>
                <p className="text-xs text-parchment/60 font-sans leading-relaxed">
                  {item.desc}
                </p>
              </div>

              {/* Technical visual schematic graphic element showing on hover */}
              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 shrink-0 mt-3 flex justify-end">
                <div className="flex items-center gap-1 font-mono text-[8px] text-amber-accent">
                  <Compass className="w-3 h-3 animate-spin-slow" />
                  <span>SYNAPSE ACTIVE</span>
                </div>
              </div>

              {/* Blueprint grid layout corner indicators */}
              <div className="absolute top-0 left-0 w-1.5 h-1.5 border-t border-l border-steel/50" />
              <div className="absolute top-0 right-0 w-1.5 h-1.5 border-t border-r border-steel/50" />
              <div className="absolute bottom-0 left-0 w-1.5 h-1.5 border-b border-l border-steel/50" />
              <div className="absolute bottom-0 right-0 w-1.5 h-1.5 border-b border-r border-steel/50" />
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <section id="skills" className="relative min-h-screen pt-24 pb-12 md:py-20 lg:py-24 px-6 md:px-12 lg:px-20 border-b border-steel/20 bg-charcoal grid-notebook overflow-hidden scroll-mt-20">
      
      {/* Background Section Index Header */}
      <div className="absolute top-12 left-6 md:top-8 md:left-12 lg:left-20 font-mono text-[11px] text-amber-accent tracking-widest uppercase">
        04 // THE ARCHITECTURE SHEET
      </div>

      <div className="max-w-7xl mx-auto flex flex-col gap-12 mt-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-start gap-4">
          <div>
            <h2 className="font-syne text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold uppercase tracking-tight text-parchment">
              Technical Blueprints.
            </h2>
            <p className="text-parchment/60 font-sans mt-2 text-base md:text-lg max-w-xl">
              An evidence-based overview of systems, models, and layout technologies I build with. Hover any card to pause the ticker.
            </p>
          </div>
          <div className="flex items-center gap-2 font-mono text-xs text-amber-accent select-none mt-2">
            <span className="w-2 h-2 rounded-full bg-amber-accent animate-pulse" />
            <span>SHEET TYPE: SYS_ARCH</span>
          </div>
        </div>

        {/* Blueprint Grid Layout */}
        <div className="relative w-full border border-steel/30 rounded p-4 sm:p-6 md:p-8 overflow-hidden bg-transparent">
          {/* Cyan/Steel Technical grid background pattern */}
          <div className="absolute inset-0 grid-notebook opacity-30 pointer-events-none" />

          {/* SVG blueprint alignment marks overlay */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-30 z-0">
            <motion.circle
              cx="50%"
              cy="50%"
              r="220"
              fill="none"
              stroke="rgba(243, 239, 224, 0.03)"
              strokeWidth="1.5"
              strokeDasharray="4,4"
              className="hidden lg:block"
            />
          </svg>

          {/* Scrolling Tickers Columns */}
          <div className="relative z-10 flex flex-col gap-6 w-full">
            {renderTrack(track1, false)}
            {renderTrack(track2, true)}
            {renderTrack(track3, false)}
          </div>

        </div>

        {/* Conceptual visual representation of skills */}
        <div className="text-center mt-6">
          <span className="font-handwriting text-xl text-amber-accent/80 select-none">
            * Systems aligned, verified against active developer workspace ✓
          </span>
        </div>

      </div>
    </section>
  );
}
