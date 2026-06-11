"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

export default function Header() {
  const [time, setTime] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const updateTime = () => {
      const options: Intl.DateTimeFormatOptions = {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      };
      setTime(new Intl.DateTimeFormat("en-US", options).format(new Date()) + " IST");
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const navItems = [
    { label: "01 // Story", href: "#story" },
    { label: "02 // Projects", href: "#projects" },
    { label: "03 // Highlights", href: "#highlights" },
    { label: "04 // Toolset", href: "#skills" },
    { label: "05 // Contact", href: "#contact" },
  ];

  return (
    <>
      <motion.header
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="fixed top-0 left-0 w-full z-40 px-6 md:px-12 py-5 flex justify-between items-center bg-charcoal/40 backdrop-blur-md border-b border-steel/20"
    >
      <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-6">
        <a href="#" className="font-serif text-2xl font-bold tracking-tight text-parchment hover:text-amber-accent transition-colors duration-300">
          Krrish Raj
        </a>
        <div className="hidden sm:block text-[10px] font-mono tracking-widest text-parchment/40 uppercase">
          [ BUILDER // CREATOR ]
        </div>
      </div>

      <div className="flex items-center gap-4 md:gap-8">
        <div className="hidden lg:block text-[11px] font-mono text-amber-accent/80 bg-steel/30 px-3 py-1 rounded-sm border border-steel/40">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-amber-accent animate-pulse mr-2" />
          LATE NIGHTS ACTIVE: {time || "00:00:00 IST"}
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-4 md:gap-6">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-[11px] md:text-[12px] font-sans tracking-wide text-parchment/70 hover:text-amber-accent hover:line-through transition-all duration-200"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setIsOpen(true)}
          className="md:hidden flex items-center justify-center p-2 text-parchment hover:text-amber-accent border border-steel/30 hover:border-amber-accent rounded-sm bg-steel/10 transition-colors cursor-pointer"
          aria-label="Open navigation menu"
        >
          <Menu className="w-5 h-5" />
        </button>
      </div>
    </motion.header>

    {/* Mobile Archival Drawer Menu */}
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/60 z-50 md:hidden"
          />

          {/* Sidebar Ledger */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-y-0 right-0 w-[280px] sm:w-[320px] bg-[#252528] border-l border-steel/30 shadow-2xl z-50 flex flex-col justify-between p-6 md:hidden overflow-hidden"
          >
            {/* Notebook grid overlay */}
            <div className="absolute inset-0 grid-notebook opacity-20 pointer-events-none" />

            {/* Technical binder spine overlay on the left border */}
            <div className="absolute left-0 inset-y-0 w-1.5 bg-gradient-to-r from-steel/20 to-transparent pointer-events-none" />

            {/* Top Section / Header */}
            <div className="relative z-10 space-y-4">
              <div className="flex justify-between items-center pb-3 border-b border-steel/20">
                <div className="flex flex-col">
                  <span className="font-mono text-[9px] text-amber-accent tracking-widest uppercase">
                    SYSTEM INDEX
                  </span>
                  <span className="font-handwriting text-xs text-parchment/40">
                    * late night logs v1.0
                  </span>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 rounded-full border border-steel/30 text-parchment/60 hover:text-amber-accent hover:border-amber-accent hover:bg-steel/10 transition-colors cursor-pointer"
                  aria-label="Close menu"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Index List */}
              <nav className="flex flex-col gap-6 pt-6">
                {navItems.map((item, idx) => {
                  const cleanLabel = item.label.split("// ")[1] || item.label;
                  return (
                    <motion.a
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.08 }}
                      className="group flex items-baseline gap-3 text-parchment hover:text-amber-accent transition-colors py-1 cursor-pointer"
                    >
                      <span className="font-mono text-[10px] text-amber-accent/35 group-hover:text-amber-accent transition-colors">
                        0{idx + 1} /
                      </span>
                      <span className="font-syne text-xl font-bold uppercase tracking-wide group-hover:line-through decoration-amber-accent decoration-2">
                        {cleanLabel}
                      </span>
                    </motion.a>
                  );
                })}
              </nav>
            </div>

            {/* Bottom Section / Status & Metadata */}
            <div className="relative z-10 border-t border-steel/20 pt-4 space-y-3">
              <div className="font-mono text-[9px] text-parchment/40 space-y-1">
                <div className="flex justify-between">
                  <span>SECTOR:</span>
                  <span className="text-amber-accent">NAV_INDEX</span>
                </div>
                <div className="flex justify-between">
                  <span>TIME (IST):</span>
                  <span>{time.split(" ")[0]}</span>
                </div>
                <div className="flex justify-between">
                  <span>STATUS:</span>
                  <span className="text-emerald-400 font-bold">ACTIVE ✓</span>
                </div>
              </div>

              <div className="text-center transform -rotate-1 select-none pointer-events-none">
                <span className="font-handwriting text-amber-accent/80 text-base leading-none">
                  * index sheets locked
                </span>
              </div>
            </div>

            {/* Blueprint Layout Corner Marks */}
            <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-steel/20 pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-steel/20 pointer-events-none" />
          </motion.div>
        </>
      )}
    </AnimatePresence>
    </>
  );
}
