"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Pin, Award, Calendar, Bookmark } from "lucide-react";

interface Highlight {
  id: string;
  role: string;
  organization: string;
  period: string;
  details: string[];
  colorClass: string;
  angle: number;
}

export default function Highlights() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const highlights: Highlight[] = [
    {
      id: "sail",
      role: "Machine Learning Engineer Intern",
      organization: "SAIL (Steel Authority of India)",
      period: "May 2026 — Jun 2026",
      details: [
        "Built an Industrial AI platform using Machine Learning and predictive analytics.",
        "Analyzed exhauster parameters and detected anomalies across 20+ process signals.",
        "Generated critical machine health insights to prevent hardware breakdowns."
      ],
      colorClass: "bg-[#fefce8] text-charcoal border-yellow-200/50", // yellow note
      angle: -2
    },
    {
      id: "gdg",
      role: "UI/UX Designer",
      organization: "GDG KIIT",
      period: "Jan 2026 — Present",
      details: [
        "Designed UI/UX and developed responsive web layouts for developer initiatives.",
        "Focused on accessibility, speed performance, and seamless cross-device flows.",
        "Collaborated closely with engineering teams to deploy active event sites."
      ],
      colorClass: "bg-[#f0f9ff] text-charcoal border-blue-200/50", // blue note
      angle: 3
    },
    {
      id: "kiit_student",
      role: "Interface Designer & Builder",
      organization: "KIIT Bhubaneswar",
      period: "2024 — 2028",
      details: [
        "Learning the core principles of Computer Science while obsessing over interactive layouts.",
        "Spending evenings building custom Android modules, training computer vision filters, and scripting fluid web animations.",
        "Striving to build interfaces that feel alive and responsive, rather than just compiling cleanly."
      ],
      colorClass: "bg-[#fcfaf2] text-charcoal border-amber-200/40", // parchment note
      angle: -1
    },
    {
      id: "design_intern",
      role: "Design Engineering Intern",
      organization: "Last Minutes Deals",
      period: "Dec 2025 — Feb 2026",
      details: [
        "Trained in real-world design thinking under an ex-Swiggy Design Lead.",
        "Designed detailed wireframes, high-fidelity layouts, and interactive prototypes.",
        "Collaborated with developers to turn creative drafts into clean interfaces."
      ],
      colorClass: "bg-[#f5f5f4] text-charcoal border-stone-300/40", // stone note
      angle: 2
    },
    {
      id: "fed",
      role: "Creative Senior Executive UI/UX",
      organization: "FED KIIT (Entrepreneurship)",
      period: "Apr 2025 — Present",
      details: [
        "Led UI/UX and graphic design initiatives for startup programs and events.",
        "Created digital assets, promotional creatives, and branding assets.",
        "Supported campus startup activities and student founder engagement."
      ],
      colorClass: "bg-[#f0fdf4] text-charcoal border-green-200/50", // green note
      angle: -3
    },
    {
      id: "fyndr",
      role: "Graphic Designer Intern",
      organization: "Fyndr",
      period: "Mar 2026 — May 2026",
      details: [
        "Created visual assets, social media graphics, and branding materials.",
        "Collaborated with teams on an AI-powered platform for entrepreneurs.",
        "Maintained a clean, modern, and highly consistent brand identity."
      ],
      colorClass: "bg-[#fdf2f8] text-charcoal border-pink-200/50", // soft pink note
      angle: 1.5
    }
  ];

  return (
    <section id="highlights" className="relative min-h-screen pt-24 pb-12 md:py-20 lg:py-24 px-6 md:px-12 lg:px-20 border-b border-steel/20 bg-charcoal grid-notebook overflow-hidden scroll-mt-20">
      
      {/* Background Section Index Header */}
      <div className="absolute top-12 left-6 md:top-8 md:left-12 lg:left-20 font-mono text-[11px] text-amber-accent tracking-widest uppercase">
        03 // SELECTED HIGHLIGHTS
      </div>

      <div className="max-w-7xl mx-auto flex flex-col gap-12 mt-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-start gap-4">
          <div>
            <h2 className="font-syne text-3xl sm:text-4xl md:text-5xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-bold uppercase tracking-tight text-parchment">
              Selected Highlights.
            </h2>
            <p className="text-parchment/60 font-sans mt-2 text-base md:text-lg max-w-xl">
              Archived field findings and notes documenting engineering applications, academic history, and design contributions.
            </p>
          </div>
          <div className="flex items-center gap-2 font-mono text-xs text-amber-accent select-none mt-2">
            <span className="w-2 h-2 rounded-full bg-amber-accent animate-pulse" />
            <span>RECORD TYPE: ARCHIVE_LOG</span>
          </div>
        </div>

        {/* Notes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10 pt-6">
          
          {highlights.map((hl) => (
            <motion.div
              key={hl.id}
              initial={{ rotate: isMobile ? hl.angle * 0.3 : hl.angle }}
              whileHover={{ scale: 1.02, rotate: isMobile ? hl.angle * 0.1 : hl.angle * 0.3 }}
              className={`p-6 rounded relative border shadow-xl flex flex-col justify-between min-h-[280px] select-none ${hl.colorClass}`}
            >
              {/* Paper Clip Visual */}
              <div className="absolute -top-3 left-6 text-amber-accent/80 opacity-90 z-20 pointer-events-none transform -rotate-12">
                <Pin className="w-5 h-5 fill-current" />
              </div>

              {/* Note Header */}
              <div>
                <div className="flex justify-between items-start border-b border-charcoal/15 pb-2 mb-4 font-mono text-[9px] text-charcoal/50">
                  <span className="flex items-center gap-1">
                    <Bookmark className="w-3 h-3" />
                    {hl.organization}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {hl.period}
                  </span>
                </div>

                <h3 className="font-syne text-sm font-bold uppercase tracking-tight text-charcoal mb-4 flex items-start gap-1.5 leading-snug">
                  <Award className="w-4 h-4 text-amber-accent shrink-0 mt-0.5" />
                  {hl.role}
                </h3>

                {/* Note Details (Handwritten feel) */}
                <ul className="space-y-2.5 font-handwriting text-base text-charcoal/90 leading-tight">
                  {hl.details.map((detail, idx) => (
                    <li key={idx} className="flex gap-2 items-start">
                      <span className="text-amber-accent text-lg leading-none">-</span>
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Pinned note verification stamps */}
              <div className="flex justify-between items-center text-[8px] font-mono text-charcoal/40 mt-6 border-t border-charcoal/10 pt-3">
                <span>RECORD_REF // #{hl.id.toUpperCase()}</span>
                <span>KRRISH RAJ ✓</span>
              </div>
            </motion.div>
          ))}
          
        </div>

        {/* Scribbled instruction */}
        <div className="text-center mt-6">
          <span className="font-handwriting text-xl text-amber-accent/80 select-none">
            * Pinned archives verified against active developer records ✓
          </span>
        </div>

      </div>
    </section>
  );
}
