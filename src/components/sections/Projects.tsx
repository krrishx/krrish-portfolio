"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Terminal, ArrowUpRight, Zap } from "lucide-react";

interface Project {
  id: string;
  num: string;
  title: string;
  category: string;
  description: string;
  tech: string[];
  storytelling: {
    problem: string;
    thinking: string;
    process: string;
    outcome: string;
  };
  metrics: { label: string; value: string }[];
  codeSnippet: string;
  link?: string;
}

export default function Projects() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
  });

  // Transform vertical scroll progress into horizontal offset
  // We have 6 panels (1 cover + 5 projects), so we scroll 6 panel widths (0% to -83.333%)
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-83.333%"]);

  // Flagship project dynamic telemetry visualizer state
  const [injectFault, setInjectFault] = useState(false);
  const [points, setPoints] = useState<number[]>(Array(50).fill(0));
  const [timeStep, setTimeStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeStep((prev) => prev + 1);
      setPoints((prev) => {
        const nextPoints = [...prev.slice(1)];
        const t = timeStep * 0.28;
        // Baseline vibration wave model (sine harmonics + random noise)
        let val = Math.sin(t) * 10 + Math.sin(t * 2.1) * 4 + (Math.random() - 0.5) * 2;
        if (injectFault) {
          // Inject chaotic high-frequency harmonic deformation
          val += Math.sin(t * 6.5) * 14 + (Math.random() - 0.5) * 6;
        }
        nextPoints.push(val);
        return nextPoints;
      });
    }, 60);
    return () => clearInterval(interval);
  }, [timeStep, injectFault]);

  const projects: Project[] = [
    {
      id: "machine_health",
      num: "01",
      title: "Operational Anomaly Detection",
      category: "SAIL Bokaro Steel Plant Project",
      description: "An Industrial AI platform developed at SAIL Bokaro Steel Plant using 1000+ operational records and 20+ process parameters to detect anomalies, monitor machine health, and analyze exhauster performance.",
      tech: ["Python", "Streamlit", "Scikit-Learn", "Pandas", "Plotly"],
      storytelling: {
        problem: "Industrial exhausters generate massive sensor signals that contain silent signatures of anomaly, but traditional rule-based warnings only trigger after damage is done.",
        thinking: "Model multivariable parameters using unsupervised machine learning to dynamically score baseline variance and predict anomaly indices.",
        process: "Ingested sensor parameters using Pandas, extracted spectral signatures, built a Scikit-Learn prediction pipeline, and rendered telemetry in a Streamlit dashboard.",
        outcome: "Created an ML-powered dashboard for anomaly detection, health scoring, and predictive maintenance insights, enabling data-driven operational monitoring."
      },
      metrics: [
        { label: "Process Variables", value: "20+" },
        { label: "Operational Logs", value: "1,000+" },
        { label: "Anomalies Flagged", value: "Active" }
      ],
      codeSnippet: `def compute_anomaly_score(sensor_feed):
    # Perform Fast Fourier Transform for frequency features
    fft_features = np.abs(np.fft.fft(sensor_feed))[:N//2]
    # Predict reconstruction through PyTorch autoencoder
    reconstruction = autoencoder.predict(fft_features)
    loss = np.mean(np.square(fft_features - reconstruction))
    
    is_anomaly = loss > threshold_matrix[machine_id]
    return {"loss": loss, "alert": is_anomaly}`,
      link: "https://github.com/krrishx/AI-Driven-Operational-Anomaly-Detection"
    },
    {
      id: "smartbite",
      num: "02",
      title: "SmartBite",
      category: "AI Meal Planner App",
      description: "An AI-driven food recommendation app providing personalized, ingredient-based recipe suggestions and meal planning. Implemented Firebase authentication, smart notifications, and grocery inventory management.",
      tech: ["Android (Kotlin)", "Firebase", "Jetpack Compose"],
      storytelling: {
        problem: "Users struggle to map calorie limits to custom ingredients available in their local grocery inventories while keeping track of diet plans.",
        thinking: "Design a Kotlin-based Android UI that syncs to Firebase realtime database and applies nutritional models to calculate ingredient-based suggestions.",
        process: "Coded Jetpack Compose interface templates, integrated Firebase Auth modules, and set up local grocery inventory state management.",
        outcome: "Created a fully responsive smart meal planner with offline sync features, smart notifications, and customized biometrics inputs."
      },
      metrics: [
        { label: "Biometric Math", value: "Dynamic" },
        { label: "UI System", value: "Compose" },
        { label: "User Database", value: "Firebase" }
      ],
      codeSnippet: `const mealPlanSchema = {
  type: "object",
  properties: {
    meals: { type: "array", items: { $ref: "#/definitions/meal" } }
  },
  required: ["meals"]
};
const response = await gemini.generate({
  prompt: \`Generate meal plan for \${userProfile}\`,
  schema: mealPlanSchema
});`,
      link: "https://github.com/krrishx/SmartBite"
    },
    {
      id: "scanguard",
      num: "03",
      title: "ScanGuard",
      category: "AI-Powered Scan & Detection",
      description: "A QR code scanning system using computer vision and Python libraries to analyze scanned data. Identified potentially unsafe or suspicious content while ensuring accurate and user-friendly scanning results.",
      tech: ["Python", "PyTorch", "OpenCV", "Computer Vision"],
      storytelling: {
        problem: "Scanned QR code data can mask hidden malicious redirection patterns that standard mobile scanners resolve without verification.",
        thinking: "Apply computer vision frames pre-processing in OpenCV and execute suspicious string parsing models in PyTorch locally to flag redirects.",
        process: "Captured frames with OpenCV camera loops, processed local image threshold filters, and ran token classification models on decoded QR payloads.",
        outcome: "Completed a reliable scan verification system that alerts users to unsafe redirects and suspicious code payloads instantly."
      },
      metrics: [
        { label: "Frame Parser", value: "OpenCV" },
        { label: "Payload Check", value: "PyTorch" },
        { label: "Scan Velocity", value: "Local" }
      ],
      codeSnippet: `fun detectDocumentEdges(frame: Mat): MatOfPoint2f {
    val gray = Mat()
    Imgproc.cvtColor(frame, gray, Imgproc.COLOR_BGR2GRAY)
    Imgproc.GaussianBlur(gray, gray, Size(5.0, 5.0), 0.0)
    val edged = Mat()
    Imgproc.Canny(gray, edged, 75.0, 200.0)
    return findLargestContour(edged)
}`,
      link: "https://github.com/krrishx/ScanGuard"
    },
    {
      id: "zerotrace",
      num: "04",
      title: "ZeroTrace",
      category: "Secure Data Wiping (SIH 2025)",
      description: "Designed the frontend interface for a secure data erasure application focused on usability and clarity. Created tamper-free wipe certification designs to support trust, verification, and compliance in IT asset recycling.",
      tech: ["React.js", "HTML", "CSS", "JavaScript", "Figma"],
      storytelling: {
        problem: "Secure storage erasure operations are run in low-level terminals that lack a clear, intuitive verification interface for compliance audits.",
        thinking: "Design an atomic frontend layout mapping raw drive wipe states to graphic progress dials and verifiable PDF certificates.",
        process: "Wired React.js interfaces to track block-wipe metrics, mapped user workflows in Figma, and created a responsive dashboard layout.",
        outcome: "Designed a secure SIH 2025 submission dashboard highlighting active disk wiping statuses, tamper-proof logs, and certificates."
      },
      metrics: [
        { label: "Design Tool", value: "Figma" },
        { label: "Frontend Code", value: "React.js" },
        { label: "SIH Status", value: "Active" }
      ],
      codeSnippet: `export default function ZeroTraceWipe() {
  const [percent, setPercent] = useState(0);
  const handleWipe = () => {
    runNistPasses((progress) => setPercent(progress));
  };
  return <CertDialog progress={percent} verified={percent === 100} />;
}`,
    },
    {
      id: "portfolio",
      num: "05",
      title: "Personal Portfolio",
      category: "React & Framer Motion Project",
      description: "Developed a high-performance personal portfolio using React.js and Vite, focusing on component reusability and fast rendering.",
      tech: ["React.js", "JavaScript", "HTML5", "CSS", "Framer Motion", "GSAP"],
      storytelling: {
        problem: "A builder's digital home should reflect both technical and visual craft instead of looking like a generic static profile.",
        thinking: "Combine a technical engineering blueprint theme with editorial layouts and interactive scrapbook physics using drag mechanics.",
        process: "Coded dynamic SVG path triggers, added drag listeners via Framer Motion, and engineered local .NET asset compression.",
        outcome: "Built a fully optimized, responsive 2026 edition portfolio serving assets smoothly with low latency."
      },
      metrics: [
        { label: "Scroll Speed", value: "Lenis" },
        { label: "Animation", value: "Framer" },
        { label: "Asset Size", value: "~90 KB" }
      ],
      codeSnippet: `export default function PolaroidCard({ imageSrc }) {
  return (
    <motion.div
      drag
      whileDrag={{ scale: 1.05, rotate: 2 }}
      className="bg-parchment p-4 w-64 shadow-2xl"
    >
      <img src={imageSrc} className="w-full h-full object-cover" />
    </motion.div>
  );
}`,
      link: "https://github.com/krrishx/krrish-portfolio"
    }
  ];

  return (
    <div id="projects" ref={containerRef} className="relative h-auto lg:h-[600vh] bg-charcoal grid-notebook scroll-mt-20">
      {/* Sticky horizontal viewport */}
      <div className="lg:sticky lg:top-0 lg:h-screen w-full lg:overflow-hidden flex flex-col justify-start py-8 gap-8 md:gap-12 relative h-auto overflow-visible">

        {/* Horizontal Navigation, Context Header & Progress Bar */}
        <div className="px-6 md:px-12 flex flex-col gap-3 z-20 w-full">
          <div className="flex justify-between items-center w-full">
            <div>
              <span className="font-mono text-[11px] text-amber-accent tracking-widest uppercase block">
                02 // PROJECTS PORTFOLIO
              </span>
              <span className="font-handwriting text-lg text-parchment/40">
                * Swipe or scroll vertically to browse
              </span>
            </div>
            <div className="flex items-center gap-2 text-xs font-mono text-parchment/40">
              <span>[ SCROLL DOWN ]</span>
            </div>
          </div>

          {/* Horizontal Scroll Progress bar (Top Positioned) */}
          <div className="w-full bg-steel/20 h-[1.5px] rounded-full relative">
            <motion.div
              style={{ scaleX: scrollYProgress }}
              className="absolute left-0 top-0 h-full w-full bg-amber-accent origin-left"
            />
          </div>
          <div className="flex justify-between items-center text-[9px] font-mono text-parchment/30 select-none">
            <span>INDEX: PROJECT 01</span>
            <span>INDEX: PROJECT 05</span>
          </div>
        </div>

        {/* Transforming Horizontal Container */}
        <motion.div style={isMobile ? {} : { x }} className="flex flex-col lg:flex-row h-auto lg:h-[70vh] w-full lg:w-[600vw] relative z-10 gap-8 lg:gap-0">
          {/* Cover Panel / Heading slide */}
          <div className="w-full lg:w-screen h-auto lg:h-full shrink-0 px-6 md:px-12 lg:px-20 flex flex-col justify-center relative min-h-[45vh] lg:min-h-0 py-16 lg:py-0 border-b border-steel/10 lg:border-b-0">
            <div className="absolute inset-y-0 right-0 w-[45%] border-l border-steel/10 pointer-events-none hidden md:block" />

            {/* Right side Projects Admission Ticket (taped to the page) */}
            <div className="hidden md:flex lg:absolute md:relative lg:right-20 lg:top-1/2 lg:-translate-y-1/2 md:mt-8 md:mx-auto md:w-fit flex-col select-none">
              <div className="relative">

                {/* Perforated Ticket Access Pass */}
                <div className="w-[620px] h-72 bg-dark-gray border border-steel/30 rounded flex overflow-hidden shadow-2xl relative rotate-2 hover:rotate-0 transition-transform duration-500 tape-effect">

                  {/* Left Visual Stub (red/orange tinted schematic diagram sketch) */}
                  <div className="w-[32%] bg-black/40 border-r border-steel/20 relative overflow-hidden flex items-center justify-center">
                    <div className="absolute inset-0 bg-red-500/10 mix-blend-multiply" />

                    {/* Schematic SVG Mountain/Grid contour lines */}
                    <svg className="w-full h-full stroke-red-500/60" viewBox="0 0 100 100" fill="none">
                      {/* Sketchy lines representing terrain/hills similar to the screenshot */}
                      <path d="M 10,80 L 30,55 L 50,70 L 80,40 L 95,65 L 100,60" strokeWidth="1" />
                      <path d="M 5,85 L 25,60 L 45,75 L 75,45 L 90,70 L 98,68" strokeWidth="0.8" />
                      <path d="M 0,90 L 15,75 L 35,80 L 60,50 L 85,80" strokeWidth="0.6" strokeDasharray="1,2" />

                      {/* Shading strokes */}
                      {[...Array(15)].map((_, idx) => (
                        <line
                          key={idx}
                          x1={20 + idx * 3}
                          y1="100"
                          x2={10 + idx * 3}
                          y2={50 + idx * 2}
                          stroke="rgba(239, 68, 68, 0.25)"
                          strokeWidth="0.5"
                        />
                      ))}

                      <circle cx="80" cy="25" r="5" stroke="rgba(239, 68, 68, 0.4)" strokeWidth="0.8" />
                      <line x1="80" y1="15" x2="80" y2="35" stroke="rgba(239, 68, 68, 0.2)" strokeWidth="0.5" />
                      <line x1="70" y1="25" x2="90" y2="25" stroke="rgba(239, 68, 68, 0.2)" strokeWidth="0.5" />
                    </svg>

                    {/* Vertical ticket label */}
                    <span className="absolute bottom-5 left-5 font-mono text-[10px] text-red-500/70 tracking-widest rotate-270 origin-left uppercase">
                      SYS_BUILD_2026
                    </span>
                  </div>

                  {/* Main Ticket body */}
                  <div className="w-[48%] p-6 flex flex-col justify-between font-mono relative bg-[#222225]">
                    <div className="space-y-1">
                      <span className="text-[9px] text-amber-accent/60 tracking-wider block">ACCESS PROTOCOL // AUTHORIZED</span>
                      <h3 className="font-syne font-bold text-2xl text-parchment leading-tight tracking-wide">ADMIT ONE</h3>
                      <p className="font-sans text-xs md:text-[13px] text-parchment/50 leading-relaxed mt-1">
                        Your access pass to explore Krrish Raj&apos;s verified production code, telemetry logs, and prototypes.
                      </p>
                    </div>

                    <div className="space-y-0.5 text-[10px] text-parchment/40 font-mono">
                      <div className="flex justify-between">
                        <span>ROW: <strong className="text-parchment">LATE_NIGHTS</strong></span>
                        <span>SEAT: <strong className="text-parchment">02:40_AM</strong></span>
                      </div>
                      <div className="text-[16px] font-bold text-amber-accent tracking-widest mt-1.5 font-mono">
                        BUILDER_LOG
                      </div>
                    </div>

                    <span className="absolute bottom-3 right-6 text-[11px] text-parchment/20 font-bold">2026</span>
                  </div>

                  {/* Perforation Line Separator */}
                  <div className="w-[2px] h-full border-r-2 border-dashed border-[#1E1E1E] relative z-20">
                    {/* Perforation notches */}
                    <div className="absolute -top-3.5 -right-[8px] w-4 h-4 bg-[#1E1E1E] rounded-full border border-steel/15 z-30" />
                    <div className="absolute -bottom-3.5 -right-[8px] w-4 h-4 bg-[#1E1E1E] rounded-full border border-steel/15 z-30" />
                  </div>

                  {/* Tear-off Stub */}
                  <div className="w-[20%] bg-[#1a1a1c] p-4 flex flex-col justify-between items-center text-center font-mono">
                    <span className="font-mono text-[9px] text-parchment/30 rotate-90 origin-center tracking-widest uppercase my-auto whitespace-nowrap">
                      KRRISH RAJ // PASS
                    </span>

                    {/* Mock Barcode / QR Code block */}
                    <div className="w-12 h-12 bg-parchment p-0.5 rounded-sm flex flex-col justify-between">
                      <svg className="w-full h-full text-charcoal" viewBox="0 0 10 10" fill="currentColor">
                        <path d="M0,0 h3 v1 h-3 z M4,0 h2 v1 h-2 z M7,0 h3 v2 h-1 v-1 h-2 z" />
                        <path d="M0,2 h1 v3 h-1 z M2,2 h2 v1 h-2 z M5,3 h3 v1 h-3 z M9,3 h1 v2 h-1 z" />
                        <path d="M2,5 h4 v1 h-4 z M7,5 h2 v3 h-2 z" />
                        <path d="M0,6 h1 v4 h-1 z M2,7 h3 v1 h-3 z M5,8 h3 v2 h-3 z" />
                        <path d="M0,9 h6 v1 h-6 z M8,9 h2 v1 h-2 z" />
                      </svg>
                    </div>

                    <span className="text-[8px] text-parchment/40 tracking-tighter mt-1 block font-mono">
                      ROW LN
                    </span>
                  </div>

                </div>

                {/* Taped Sticky Note overlapping the ticket pass surface */}
                <div className="absolute bottom-4 right-10 w-60 bg-[#faf5e6] text-charcoal p-4 pt-6 shadow-2xl border border-amber-900/15 rotate-[-2deg] z-30 tape-effect">
                  <div className="font-handwriting text-lg md:text-xl text-charcoal/90 leading-tight pt-1">
                    <span>Design should </span>
                    <span className="relative inline-block px-1">
                      <span className="absolute -top-4.5 left-1/2 -translate-x-1/2 font-handwriting text-xs md:text-sm text-red-600 font-semibold rotate-[-6deg] whitespace-nowrap">
                        question
                      </span>
                      <span className="line-through decoration-red-500 decoration-2">follow</span>
                    </span>
                    <span> rules.</span>
                  </div>
                </div>

              </div>
            </div>

            <div className="max-w-4xl space-y-6">
              <div className="flex items-center gap-2 mb-2">
                <span className="font-mono text-xs text-amber-accent uppercase tracking-widest block bg-amber-accent/5 px-2 py-0.5 rounded border border-amber-accent/15">
                  SEC_02 // SYSTEM WORKS
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-amber-accent animate-pulse" />
              </div>
              <h2 className="font-syne text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-[0.95] text-parchment uppercase tracking-tight">
                Selected <br />
                <span className="text-amber-accent italic font-serif lowercase">creations &amp;</span> <br />
                Case Studies.
              </h2>
              <p className="text-parchment/65 font-sans text-base md:text-lg max-w-xl leading-relaxed">
                A structured engineering log documenting software systems, machine learning models, user experiences, and cryptographic platforms built to solve real-world problems.
              </p>
              <div className="pt-8 flex items-center gap-2.5 font-mono text-[10px] text-amber-accent/80 uppercase">
                <span className="w-2.5 h-2.5 border border-amber-accent/40 rounded-full flex items-center justify-center animate-bounce">↓</span>
                <span>Scroll down to slide open the projects list</span>
              </div>
            </div>

            {/* Technical grid corner elements */}
            <div className="absolute top-4 left-6 md:left-12 lg:left-20 w-4 h-4 border-t border-l border-steel/20" />
            <div className="absolute top-4 right-6 md:right-12 lg:right-20 w-4 h-4 border-t border-r border-steel/20" />
            <div className="absolute bottom-4 left-6 md:left-12 lg:left-20 w-4 h-4 border-b border-l border-steel/20" />
            <div className="absolute bottom-4 right-6 md:right-12 lg:right-20 w-4 h-4 border-b border-r border-steel/20" />
          </div>

          {projects.map((proj) => (
            <div
              key={proj.id}
              className="w-full lg:w-screen h-auto lg:h-full shrink-0 px-6 md:px-12 lg:px-20 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center py-8 lg:py-0 border-b border-steel/10 lg:border-b-0"
            >
              {/* Project Title and Text Detail */}
              <div className="lg:col-span-6 space-y-4">
                <div className="flex flex-col sm:flex-row items-start sm:items-baseline gap-2 sm:gap-4 w-full">
                  <span className="font-mono text-4xl text-amber-accent/30 font-extrabold select-none">
                    {proj.num}
                  </span>
                  <div className="w-full">
                    <span className="font-mono text-[10px] text-amber-accent uppercase tracking-widest block mb-1">
                      {proj.category}
                    </span>
                    <h3 className="font-syne text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight text-parchment">
                      {proj.title}
                    </h3>
                  </div>
                </div>

                <p className="text-parchment/70 font-sans text-sm md:text-base leading-relaxed">
                  {proj.description}
                </p>

                {/* Tech Badges (scrapbook tags) */}
                <div className="flex flex-wrap gap-2">
                  {proj.tech.map((t) => (
                    <span
                      key={t}
                      className="text-[10px] font-mono text-parchment bg-steel/30 px-2.5 py-1 rounded-sm border border-steel/55 hover:border-amber-accent transition-colors cursor-default"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {/* Structured Case Study Storytelling */}
                <div className="space-y-3.5 border-l border-amber-accent/20 pl-4 py-1.5 max-h-[130px] overflow-y-auto pr-2 custom-scrollbar">
                  <div className="space-y-1">
                    <span className="font-mono text-[9px] text-amber-accent uppercase tracking-wider block">01 / The Problem</span>
                    <p className="text-xs text-parchment/70 font-sans leading-relaxed">{proj.storytelling.problem}</p>
                  </div>
                  <div className="space-y-1">
                    <span className="font-mono text-[9px] text-amber-accent uppercase tracking-wider block">02 / The Thinking</span>
                    <p className="text-xs text-parchment/70 font-sans leading-relaxed">{proj.storytelling.thinking}</p>
                  </div>
                  <div className="space-y-1">
                    <span className="font-mono text-[9px] text-amber-accent uppercase tracking-wider block">03 / The Process</span>
                    <p className="text-xs text-parchment/70 font-sans leading-relaxed">{proj.storytelling.process}</p>
                  </div>
                  <div className="space-y-1">
                    <span className="font-mono text-[9px] text-amber-accent uppercase tracking-wider block">04 / The Outcome</span>
                    <p className="text-xs text-parchment/70 font-sans leading-relaxed">{proj.storytelling.outcome}</p>
                  </div>
                </div>

                {/* Live Link Button */}
                {proj.link && (
                  <a
                    href={proj.link}
                    data-cursor="pointer"
                    data-cursor-text="view live"
                    className="inline-flex items-center gap-2 text-xs font-mono tracking-widest text-parchment bg-transparent border border-steel hover:border-amber-accent hover:text-amber-accent px-5 py-3 rounded-sm transition-all duration-300 uppercase"
                  >
                    View Project Code
                    <ArrowUpRight className="w-4 h-4" />
                  </a>
                )}
              </div>

              {/* Showcase & Terminal Mockups */}
              <div className="lg:col-span-6 grid grid-cols-1 md:grid-cols-12 gap-6 items-center relative">
                {/* Metrics Notebook Card */}
                <div className="md:col-span-4 grid grid-cols-3 md:flex md:flex-col gap-2 sm:gap-3 md:space-y-4">
                  {proj.metrics.map((met, i) => (
                    <div
                      key={i}
                      className="bg-[#28282B] border border-steel/30 p-2 sm:p-3 md:p-4 rounded flex flex-col justify-between items-center text-center shadow-lg hover:border-amber-accent transition-colors duration-300 min-w-0"
                    >
                      <span className="font-mono text-[8px] sm:text-[9px] text-parchment/40 uppercase leading-tight break-words">
                        {met.label}
                      </span>
                      <span className="font-syne text-xs sm:text-base md:text-lg lg:text-xl xl:text-2xl font-black text-amber-accent mt-1 whitespace-nowrap">
                        {met.value}
                      </span>
                    </div>
                  ))}

                  {/* Scribble note attached to metrics */}
                  <div className="hidden md:block transform -rotate-2 select-none pointer-events-none">
                    <span className="font-handwriting text-amber-accent/70 text-lg leading-tight block">
                      * Verified engineering metrics
                    </span>
                  </div>
                </div>

                {/* Code Terminal or Flagship Telemetry Visualizer */}
                {proj.id === "machine_health" ? (
                  <div className="md:col-span-8 bg-[#121214] border border-steel/45 rounded shadow-2xl p-4 h-[260px] sm:h-[340px] flex flex-col justify-between select-none relative overflow-hidden z-20">
                    <div className="absolute inset-0 grid-notebook opacity-25 pointer-events-none" />

                    {/* Telemetry Header */}
                    <div className="flex justify-between items-center pb-2 border-b border-steel/30 relative z-10">
                      <span className="font-mono text-[9px] text-parchment/45 flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-accent animate-pulse" />
                        TELEMETRY STREAM // SENSOR_FFT_128
                      </span>
                      <span className={`font-mono text-[8px] px-2 py-0.5 rounded border tracking-wide font-bold transition-all duration-300 ${injectFault
                          ? "text-red-400 border-red-500/40 bg-red-950/20 animate-pulse"
                          : "text-emerald-400 border-emerald-500/30 bg-emerald-950/20"
                        }`}>
                        {injectFault ? "ANOMALY STATUS: ALARM" : "ANOMALY STATUS: CLEAR"}
                      </span>
                    </div>

                    {/* Live Oscilloscope Wave */}
                    <div className="h-20 sm:h-32 w-full flex items-center justify-center relative my-2 bg-charcoal/20 border border-steel/20 rounded overflow-hidden">
                      {/* Grid overlay */}
                      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:10px_10px]" />
                      <div className="absolute top-1/2 left-0 w-full h-[1.5px] bg-steel/20" />
                      <div className="absolute top-[25%] left-0 w-full h-[1px] border-t border-dashed border-red-500/20" />
                      <div className="absolute top-[75%] left-0 w-full h-[1px] border-t border-dashed border-red-500/20" />

                      <svg className="w-full h-full absolute inset-0 z-10" viewBox="0 0 300 100" preserveAspectRatio="none">
                        <path
                          d={points.map((val, idx) => `${idx === 0 ? "M" : "L"} ${(idx / (points.length - 1)) * 300} ${50 + val}`).join(" ")}
                          fill="none"
                          stroke={injectFault ? "#f87171" : "#E25543"}
                          strokeWidth="1.5"
                          className="transition-colors duration-300"
                        />
                      </svg>
                      {injectFault && (
                        <span className="absolute top-2 right-2 font-mono text-[8px] text-red-400 bg-black/60 px-1 rounded border border-red-500/20">
                          MSE: {(0.84 + Math.random() * 0.05).toFixed(4)}
                        </span>
                      )}
                    </div>

                    {/* System Flow Diagram */}
                    <div className="grid grid-cols-7 gap-1 items-center justify-between text-[7px] font-mono text-center text-parchment/60 relative z-10">
                      <div className="border border-steel/30 p-1 bg-charcoal/50 rounded flex flex-col justify-center">
                        <span>Vibration</span>
                        <span className="text-[6px] text-parchment/40">Raw Feed</span>
                      </div>
                      <span className="text-amber-accent font-bold">→</span>
                      <div className="border border-steel/30 p-1 bg-charcoal/50 rounded flex flex-col justify-center">
                        <span>FFT Bin</span>
                        <span className="text-[6px] text-parchment/40">Frequency</span>
                      </div>
                      <span className="text-amber-accent font-bold">→</span>
                      <div className={`border p-1 rounded flex flex-col justify-center transition-colors duration-300 ${injectFault ? "border-red-500/50 bg-red-950/20 text-red-300" : "border-steel/30 bg-charcoal/50 text-parchment"
                        }`}>
                        <span>Autoencoder</span>
                        <span className="text-[6px] text-parchment/40">Bottleneck</span>
                      </div>
                      <span className="text-amber-accent font-bold">→</span>
                      <div className={`border p-1 rounded flex flex-col justify-center transition-colors duration-300 ${injectFault ? "border-red-500 bg-red-900/30 text-red-400 font-bold" : "border-steel/30 bg-charcoal/50 text-parchment"
                        }`}>
                        <span>MSE Eval</span>
                        <span className="text-[6px] text-parchment/40">Threshold</span>
                      </div>
                    </div>

                    {/* Interactive controls */}
                    <button
                      onClick={() => setInjectFault(!injectFault)}
                      className={`w-full py-2 mt-2 font-mono text-[9px] tracking-wider uppercase rounded transition-all duration-300 border relative z-10 cursor-pointer ${injectFault
                          ? "bg-red-950/40 text-red-400 border-red-500 hover:bg-transparent"
                          : "bg-transparent text-amber-accent border-amber-accent/40 hover:bg-amber-accent hover:text-charcoal"
                        }`}
                    >
                      {injectFault ? "Reset Telemetry Stream" : "Inject Sensor Fault (Simulate Anomaly)"}
                    </button>
                  </div>
                ) : (
                  <div className="md:col-span-8 bg-[#121214] border border-steel/45 rounded shadow-2xl overflow-hidden h-[260px] sm:h-[340px] flex flex-col justify-between z-20">
                    {/* Top Bar */}
                    <div className="bg-[#28282B] px-4 py-2 border-b border-steel/30 flex justify-between items-center">
                      <div className="flex items-center gap-1.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                        <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                        <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                      </div>
                      <span className="font-mono text-[9px] text-parchment/40 flex items-center gap-1.5">
                        <Terminal className="w-3.5 h-3.5 text-amber-accent shrink-0" />
                        {proj.id}_controller.py
                      </span>
                    </div>
                    {/* Code Area */}
                    <div className="p-4 font-mono text-[10px] text-parchment/70 overflow-x-auto whitespace-pre-wrap leading-relaxed select-text flex-grow">
                      <pre className="text-emerald-400/90">{proj.codeSnippet}</pre>
                    </div>
                    {/* Bottom Console Status */}
                    <div className="bg-[#28282B]/50 px-4 py-1.5 border-t border-steel/30 flex items-center justify-between text-[8px] font-mono text-parchment/40 select-none">
                      <span className="flex items-center gap-1">
                        <Zap className="w-3 h-3 text-emerald-400" />
                        GREEN COMPILER
                      </span>
                      <span>100% COVERAGE</span>
                    </div>
                  </div>
                )}

                {proj.id === "portfolio" && (
                  <motion.div
                    drag
                    dragConstraints={{ left: -400, right: 100, top: -450, bottom: 100 }}
                    whileDrag={{ scale: 1.05, rotate: -2 }}
                    initial={{ rotate: 6 }}
                    data-cursor="drag"
                    data-cursor-text="drag me"
                    className="absolute -bottom-8 -right-4 lg:-bottom-10 lg:-right-8 bg-[#28282B] border border-steel/50 p-2.5 rounded shadow-2xl w-44 sm:w-52 lg:w-56 cursor-grab active:cursor-grabbing select-none hover:border-amber-accent transition-colors duration-300 z-30"
                  >
                    <div className="w-full aspect-[4/5] relative overflow-hidden bg-black/20 rounded-sm">
                      <img
                        src="/oh-yes.jpg"
                        alt="Oh Yes Artwork"
                        className="w-full h-full object-cover"
                        draggable="false"
                      />
                    </div>
                    <div className="mt-1.5 text-[8px] font-mono text-parchment/40 uppercase tracking-widest text-center">
                      MEM_LOG // OH_YES!
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          ))}
        </motion.div>

      </div>
    </div>
  );
}
