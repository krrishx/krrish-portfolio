"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [cursorType, setCursorType] = useState<"default" | "pointer" | "drag" | "draw">("default");
  const [cursorText, setCursorText] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 35, stiffness: 350, mass: 0.35 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Hide native cursor on desktop to allow our custom cursor
    if (window.innerWidth > 768) {
      document.body.style.cursor = "none";
    }

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeaveWindow = () => {
      setIsVisible(false);
    };

    window.addEventListener("mousemove", moveCursor);
    document.addEventListener("mouseleave", handleMouseLeaveWindow);

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      const cursorEl = target.closest("[data-cursor]");
      const textEl = target.closest("[data-cursor-text]");

      if (cursorEl) {
        setCursorType(cursorEl.getAttribute("data-cursor") as any);
        setCursorText(textEl ? textEl.getAttribute("data-cursor-text") || "" : "");
      } else if (target.closest("a, button, input, textarea, select") || target.style.cursor === "pointer") {
        setCursorType("pointer");
        setCursorText("");
      } else {
        setCursorType("default");
        setCursorText("");
      }
    };

    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      document.body.style.cursor = "auto";
      window.removeEventListener("mousemove", moveCursor);
      document.removeEventListener("mouseleave", handleMouseLeaveWindow);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [cursorX, cursorY, isVisible]);

  // Disable custom cursor on mobile touch screens for better UX
  const [isMobile, setIsMobile] = useState(true);
  useEffect(() => {
    setIsMobile(window.innerWidth <= 768);
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (isMobile || !isVisible) return null;

  return (
    <motion.div
      className="pointer-events-none fixed left-0 top-0 z-50 flex items-center justify-center -translate-x-1/2 -translate-y-1/2"
      style={{
        x: cursorXSpring,
        y: cursorYSpring,
      }}
    >
      {/* Outer ring */}
      <motion.div
        className="absolute rounded-full border border-amber-accent bg-amber-accent/5"
        animate={{
          width: cursorType !== "default" ? 64 : 16,
          height: cursorType !== "default" ? 64 : 16,
          borderColor: cursorType === "drag" ? "#E25543" : "rgba(243, 239, 224, 0.4)",
          backgroundColor: cursorType === "drag" ? "rgba(226, 85, 67, 0.08)" : "rgba(243, 239, 224, 0.02)",
        }}
        transition={{ type: "spring", stiffness: 350, damping: 25 }}
      />
      {/* Inner scribble dot */}
      <motion.div
        className="absolute w-1.5 h-1.5 bg-amber-accent rounded-full"
        animate={{
          scale: cursorType !== "default" ? 0.5 : 1,
          backgroundColor: cursorType !== "default" ? "#E25543" : "#f3efe0",
        }}
      />
      {/* Floating text label if any */}
      {cursorText && (
        <motion.span
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          className="absolute text-[10px] tracking-widest text-amber-accent font-sans font-bold uppercase bg-charcoal/90 px-2 py-0.5 rounded border border-steel/60 whitespace-nowrap shadow-lg translate-y-8"
        >
          {cursorText}
        </motion.span>
      )}
    </motion.div>
  );
}
