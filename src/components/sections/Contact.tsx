"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Mail, Globe, Sparkles } from "lucide-react";

export default function Contact() {
  const [formState, setFormState] = useState<"idle" | "folding" | "sent">("idle");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    setFormState("folding");
    const startTime = Date.now();

    const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY || "YOUR_ACCESS_KEY_HERE";

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: accessKey,
          name,
          email,
          message,
          subject: `New Portfolio Message from ${name}`,
          from_name: "Krrish Raj Portfolio",
        }),
      });

      const data = await response.json();
      
      // Ensure the folding airplane animation plays for at least 1.5 seconds for premium UX
      const elapsedTime = Date.now() - startTime;
      const remainingTime = Math.max(0, 1500 - elapsedTime);
      await new Promise((resolve) => setTimeout(resolve, remainingTime));

      if (data.success) {
        setFormState("sent");
      } else {
        console.error("Web3Forms submission failed:", data.message);
        alert(`Failed to send dispatch: ${data.message || "Unknown error"}. Make sure NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY is set in your .env.local file.`);
        setFormState("idle");
      }
    } catch (err) {
      console.error("Error submitting contact form:", err);
      const elapsedTime = Date.now() - startTime;
      const remainingTime = Math.max(0, 1500 - elapsedTime);
      await new Promise((resolve) => setTimeout(resolve, remainingTime));
      
      alert("Error sending dispatch. Please try again or email directly.");
      setFormState("idle");
    }
  };

  const handleReset = () => {
    setName("");
    setEmail("");
    setMessage("");
    setFormState("idle");
  };

  return (
    <section id="contact" className="relative min-h-screen pt-24 pb-12 md:py-20 lg:py-24 px-6 md:px-12 lg:px-20 bg-charcoal grid-notebook overflow-hidden scroll-mt-20">
      
      {/* Background Section Index Header */}
      <div className="absolute top-12 left-6 md:top-8 md:left-12 lg:left-20 font-mono text-[11px] text-amber-accent tracking-widest uppercase">
        05 // THE OUTBOX
      </div>

      <div className="max-w-4xl mx-auto flex flex-col gap-12 mt-8 justify-center min-h-[75vh]">
        
        {/* Editorial Heading */}
        <div className="text-center md:text-left">
          <h2 className="font-syne text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold uppercase tracking-tight text-parchment leading-none">
            Send a Dispatch.
          </h2>
          <p className="text-parchment/65 font-sans mt-3 text-base md:text-lg max-w-lg">
            Have a project, a question, or a late-night idea? Drop a letter directly onto my post desk.
          </p>
        </div>

        {/* Post desk cardboard layer */}
        <div className="relative w-full bg-[#1e1e21] border border-steel/30 rounded p-1 md:p-2 shadow-2xl">
          
          <AnimatePresence mode="wait">
            {formState === "idle" && (
              <motion.form
                key="contact-form"
                onSubmit={handleSubmit}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-parchment text-charcoal p-6 md:p-8 rounded-none border border-charcoal/20 grid grid-cols-1 md:grid-cols-12 gap-8 relative overflow-hidden shadow-2xl"
              >
                {/* Left: Input Fields (Letter style lines) */}
                <div className="md:col-span-7 space-y-6">
                  <div className="space-y-1.5">
                    <label className="font-mono text-[10px] uppercase text-charcoal/50 tracking-wider block">
                      FROM (YOUR NAME):
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Nicola Tesla"
                      className="w-full bg-transparent border-b border-charcoal/20 focus:border-amber-accent py-1.5 font-handwriting text-2xl text-charcoal placeholder-charcoal/25 outline-none transition-colors"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-mono text-[10px] uppercase text-charcoal/50 tracking-wider block">
                      REPLY-TO (YOUR EMAIL):
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. nicola@alternatingcurrent.com"
                      className="w-full bg-transparent border-b border-charcoal/20 focus:border-amber-accent py-1.5 font-handwriting text-2xl text-charcoal placeholder-charcoal/25 outline-none transition-colors"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-mono text-[10px] uppercase text-charcoal/50 tracking-wider block">
                      MESSAGE BODY:
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Write your late night idea here..."
                      className="w-full bg-transparent border-b border-charcoal/20 focus:border-amber-accent py-1.5 font-handwriting text-2xl text-charcoal placeholder-charcoal/25 outline-none resize-none transition-colors"
                    />
                  </div>

                  <button
                    type="submit"
                    data-cursor="pointer"
                    className="w-full flex items-center justify-center gap-2 bg-charcoal text-parchment font-sans font-bold text-sm py-3 rounded-sm hover:bg-amber-accent hover:text-charcoal transition-all duration-300"
                  >
                    <Send className="w-4 h-4" />
                    SEND DISPATCH
                  </button>
                </div>

                {/* Right: Stamps & Address (Postcard design elements) */}
                <div className="md:col-span-5 flex flex-col justify-between border-t md:border-t-0 md:border-l border-charcoal/15 pt-8 md:pt-0 md:pl-8 relative">
                  
                  {/* Postcard Stamp Box */}
                  <div className="flex justify-between items-start">
                    <div className="font-mono text-[9px] text-charcoal/40 leading-tight">
                      POSTAGE STAMP<br />
                      REQUIRED
                    </div>
                    
                    {/* The Stamp Graphic */}
                    <div className="w-44 h-44 border-2 border-dashed border-charcoal/30 bg-parchment rotate-3 relative overflow-hidden select-none shadow-md hover:rotate-0 hover:scale-[1.03] transition-all duration-300 z-10">
                       <img
                         src="/wink.jpg"
                         alt="Wink Stamp"
                         className="w-full h-full object-cover"
                         draggable="false"
                       />
                    </div>
                  </div>

                  {/* To Destination Area */}
                  <div className="my-6 md:my-0 space-y-2.5 font-mono text-xs text-charcoal/70 leading-relaxed border-l-2 border-charcoal/15 pl-4">
                    <div className="text-[10px] text-charcoal/40 tracking-wider">TO DESTINATION:</div>
                    <div className="font-bold text-charcoal">Krrish Raj</div>
                    <div>Creative Developer Lab</div>
                    <div>Latitude: 20.2961° N</div>
                    <div>Longitude: 85.8245° E</div>
                  </div>

                  {/* Open To Status */}
                  <div className="my-6 md:my-4 space-y-1.5 font-mono text-[10px] text-charcoal/70 leading-tight border-l-2 border-amber-accent/40 pl-4">
                    <div className="text-[9px] text-charcoal/40 tracking-wider font-bold uppercase">OPEN TO:</div>
                    <ul className="space-y-1">
                      <li className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-accent shrink-0" />
                        Collaborations
                      </li>
                      <li className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-accent shrink-0" />
                        Research Discussions
                      </li>
                      <li className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-accent shrink-0" />
                        Product Ideas
                      </li>
                      <li className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-accent shrink-0" />
                        AI Projects
                      </li>
                      <li className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-accent shrink-0" />
                        Internship Opportunities
                      </li>
                    </ul>
                  </div>

                  {/* Social Postmarks Links */}
                  <div className="space-y-3 pt-6 border-t border-charcoal/10">
                    <span className="font-mono text-[9px] text-charcoal/40 uppercase block">
                      OFFICIAL NETWORKS:
                    </span>
                    <div className="flex flex-wrap gap-4 text-charcoal/70">
                      <a href="mailto:krrishakaraj@gmail.com" className="hover:text-amber-accent transition-colors" title="Email Link">
                        <Mail className="w-4 h-4" />
                      </a>
                      <a href="https://github.com/krrishx" target="_blank" rel="noopener noreferrer" className="hover:text-amber-accent transition-colors" title="GitHub profile">
                        <svg className="w-4.5 h-4.5 fill-current" viewBox="0 0 24 24">
                          <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z"/>
                        </svg>
                      </a>
                      <a href="https://www.linkedin.com/in/krrish-raj-b109b5324/" target="_blank" rel="noopener noreferrer" className="hover:text-amber-accent transition-colors" title="LinkedIn profile">
                        <svg className="w-4.5 h-4.5 fill-current" viewBox="0 0 24 24">
                          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                        </svg>
                      </a>
                      <a href="https://www.instagram.com/krrish.hx/" target="_blank" rel="noopener noreferrer" className="hover:text-amber-accent transition-colors" title="Instagram profile">
                        <svg className="w-4.5 h-4.5 fill-current" viewBox="0 0 24 24">
                          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                        </svg>
                      </a>
                    </div>
                  </div>

                </div>
              </motion.form>
            )}

            {formState === "folding" && (
              <motion.div
                key="folding-animation"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-parchment text-charcoal p-12 rounded-none border border-charcoal/20 flex flex-col justify-center items-center min-h-[350px] relative overflow-hidden shadow-2xl"
              >
                {/* SVG Animated Paper Airplane flying */}
                <svg className="w-24 h-24 text-amber-accent animate-pulse" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <p className="font-handwriting text-2xl text-charcoal mt-6">
                  Folding envelope, firing thrusters...
                </p>
              </motion.div>
            )}

            {formState === "sent" && (
              <motion.div
                key="sent-confirmation"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-parchment text-charcoal p-10 rounded-none border border-charcoal/20 text-center flex flex-col justify-center items-center min-h-[350px] relative overflow-hidden shadow-2xl"
              >
                <div className="w-16 h-16 rounded-full bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20 mb-6">
                  <Sparkles className="w-8 h-8 text-emerald-500" />
                </div>
                <h3 className="font-syne text-3xl font-bold uppercase tracking-tight text-charcoal">
                  DISPATCH DELIVERED!
                </h3>
                <p className="font-handwriting text-2xl text-charcoal/80 max-w-md mt-3">
                  "Thank you! Your letter was successfully delivered to my workspace database queue. I will read it soon."
                </p>

                <button
                  onClick={handleReset}
                  className="mt-8 font-mono text-xs tracking-widest uppercase border border-charcoal/30 hover:border-amber-accent hover:text-amber-accent px-5 py-2.5 transition-colors"
                >
                  Write Another Letter
                </button>
              </motion.div>
            )}
          </AnimatePresence>

        </div>

        {/* Footer / Copyright details */}
        <div className="flex justify-center items-center border-t border-steel/20 pt-8 text-[10px] font-mono text-parchment/30 select-none">
          <span>Made with ♥ by Krrish :)</span>
        </div>

      </div>
    </section>
  );
}
