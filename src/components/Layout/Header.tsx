"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function Header() {
  const [time, setTime] = useState("");

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

      <div className="flex items-center gap-6 md:gap-8">
        <div className="hidden lg:block text-[11px] font-mono text-amber-accent/80 bg-steel/30 px-3 py-1 rounded-sm border border-steel/40">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-amber-accent animate-pulse mr-2" />
          LATE NIGHTS ACTIVE: {time || "00:00:00 IST"}
        </div>

        <nav className="flex items-center gap-4 md:gap-6">
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
      </div>
    </motion.header>
  );
}
