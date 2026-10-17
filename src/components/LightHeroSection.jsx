import React, { useState, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { 
  Sparkles, 
  ArrowRight, 
  Bot, 
  CheckCircle2, 
  Calendar, 
  MapPin, 
  Award, 
  ShieldCheck, 
  TrendingUp,
  BrainCircuit,
  Zap
} from "lucide-react";

export default function LightHeroSection({ onSeeMatches, onOpenAssistant, onExploreEvent }) {
  // Motion values for 3D parallax tilt
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs
  const springConfig = { damping: 25, stiffness: 150 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [12, -12]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-12, 12]), springConfig);
  const glareOpacity = useSpring(useTransform(mouseY, [-0.5, 0.5], [0.15, 0]), springConfig);

  // Animated circular progress counter
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setProgress(88);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseXPos = (e.clientX - rect.left) / width - 0.5;
    const mouseYPos = (e.clientY - rect.top) / height - 0.5;
    mouseX.set(mouseXPos);
    mouseY.set(mouseYPos);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  // Circular progress calculations (radius = 38)
  const radius = 38;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <section className="relative overflow-hidden pt-8 pb-16 lg:py-20 bg-transparent">
      
      {/* Soft Ambient Light Gradient Orbs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#5964FE]/10 rounded-full blur-3xl pointer-events-none -translate-y-1/2"></div>
      <div className="absolute top-1/3 right-10 w-[30rem] h-[30rem] bg-[#8C6DFE]/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* LEFT COLUMN: Huge Bold Typography & CTAs */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="lg:col-span-7 space-y-6"
          >
            
            {/* Pill Tag */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#DFE3FF] border border-[#C7D2FE] shadow-xs">
              <span className="w-2 h-2 rounded-full bg-[#5964FE] animate-pulse"></span>
              <span className="text-xs font-bold uppercase tracking-wider text-[#434EEB]">
                Explainable Opportunity Intelligence
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl text-[#10174D] tracking-tight leading-[1.12]">
              Every opportunity,{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#434EEB] via-[#5964FE] to-[#8C6DFE]">
                with a reason.
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-[#525A8B] max-w-2xl leading-relaxed">
              Stop guessing which hackathons, conferences, and workshops are worth your time. 
              EventRoute AI calculates explainable match scores, guards your university exam attendance, 
              and automates college On-Duty (OD) leave approvals in 1-click.
            </p>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              
              {/* Primary Button */}
              <button
                onClick={onSeeMatches}
                className="group px-7 py-3.5 rounded-2xl bg-gradient-to-r from-[#5964FE] to-[#7B73FE] hover:opacity-95 active:scale-95 text-white font-bold text-sm tracking-wide shadow-lg shadow-[#5964FE]/25 hover:shadow-xl hover:shadow-[#5964FE]/35 transition-all duration-200 flex items-center gap-2.5 cursor-pointer"
              >
                <span>See my matches</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              {/* Secondary Button */}
              <button
                onClick={onOpenAssistant}
                className="px-6 py-3.5 rounded-2xl bg-white hover:bg-[#EEF2FE] active:scale-95 text-[#10174D] font-semibold text-sm border-2 border-[#DCE3F9] hover:border-[#5964FE] shadow-sm hover:shadow-md transition-all duration-200 flex items-center gap-2.5 cursor-pointer"
              >
                <Bot className="w-4 h-4 text-[#5964FE]" />
                <span>Ask the assistant</span>
              </button>

            </div>

            {/* Trust Metrics / Micro-proof */}
            <div className="pt-4 flex flex-wrap items-center gap-6 text-xs text-[#525A8B]">
              <div className="flex items-center gap-1.5 font-medium">
                <CheckCircle2 className="w-4 h-4 text-[#5964FE]" />
                <span>Exam Collision Shield</span>
              </div>
              <div className="flex items-center gap-1.5 font-medium">
                <CheckCircle2 className="w-4 h-4 text-[#5964FE]" />
                <span>Automated OD Letters</span>
              </div>
              <div className="flex items-center gap-1.5 font-medium">
                <CheckCircle2 className="w-4 h-4 text-[#5964FE]" />
                <span>94%+ Verified Fit</span>
              </div>
            </div>

          </motion.div>

          {/* RIGHT COLUMN: 3D Floating UI Card with Parallax Tilt */}
          <div className="lg:col-span-5 flex justify-center perspective-[1200px]">
            <motion.div
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
              }}
              animate={{
                y: [0, -10, 0],
              }}
              transition={{
                y: {
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }
              }}
              className="relative w-full max-w-md bg-white/95 backdrop-blur-xl rounded-3xl p-6 sm:p-7 border border-[#E2E7FA] shadow-[0_20px_50px_rgba(89,100,254,0.08),0_4px_12px_rgba(89,100,254,0.03)] cursor-pointer select-none group"
            >
              
              {/* Dynamic Glare Reflection Overlay */}
              <motion.div 
                style={{ opacity: glareOpacity }}
                className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-white via-white/40 to-transparent pointer-events-none"
              />

              {/* Card Header */}
              <div className="flex items-start justify-between gap-4 pb-4 border-b border-[#F0F3FD]">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-[#DFE3FF] text-[#434EEB] text-[11px] font-bold uppercase tracking-wider mb-1.5 border border-[#C7D2FE]">
                    <Sparkles className="w-3 h-3 text-[#5964FE]" />
                    Top Recommended Match
                  </div>
                  <h3 className="font-display font-bold text-xl text-[#10174D] group-hover:text-[#5964FE] transition-colors">
                    HackML Weekend 2026
                  </h3>
                  <div className="flex items-center gap-3 text-xs text-[#525A8B] mt-1">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-[#5964FE]" />
                      Oct 26 – 27
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-[#5964FE]" />
                      COEP Tech, Pune
                    </span>
                  </div>
                </div>

                {/* 88% Circular Progress Ring */}
                <div className="relative flex items-center justify-center shrink-0 w-24 h-24">
                  <svg className="w-24 h-24 -rotate-90 transform" viewBox="0 0 90 90">
                    {/* Background track */}
                    <circle
                      cx="45"
                      cy="45"
                      r={radius}
                      stroke="#EEF2FE"
                      strokeWidth="7"
                      fill="transparent"
                    />
                    {/* Animated periwinkle progress arc */}
                    <motion.circle
                      cx="45"
                      cy="45"
                      r={radius}
                      stroke="#5964FE"
                      strokeWidth="7"
                      strokeDasharray={circumference}
                      initial={{ strokeDashoffset: circumference }}
                      animate={{ strokeDashoffset }}
                      transition={{ duration: 1.5, ease: "easeOut" }}
                      strokeLinecap="round"
                      fill="transparent"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                    <span className="font-display font-bold text-xl text-[#10174D] leading-none">
                      {progress}%
                    </span>
                    <span className="text-[9px] font-semibold text-[#5964FE] uppercase tracking-wider">
                      Match
                    </span>
                  </div>
                </div>

              </div>

              {/* Progress Bars for Scoring Dimensions */}
              <div className="py-4 space-y-3">
                
                {/* Bar 1: Semantic Similarity */}
                <div>
                  <div className="flex justify-between text-xs font-semibold mb-1">
                    <span className="text-[#10174D] flex items-center gap-1.5">
                      <BrainCircuit className="w-3.5 h-3.5 text-[#5964FE]" />
                      Semantic similarity
                    </span>
                    <span className="text-[#434EEB] font-bold">92%</span>
                  </div>
                  <div className="w-full bg-[#EEF2FE] rounded-full h-2 overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: "92%" }}
                      transition={{ duration: 1.2, delay: 0.2, ease: "easeOut" }}
                      className="bg-gradient-to-r from-[#5964FE] to-[#7B73FE] h-2 rounded-full"
                    />
                  </div>
                </div>

                {/* Bar 2: Skill Overlap */}
                <div>
                  <div className="flex justify-between text-xs font-semibold mb-1">
                    <span className="text-[#10174D] flex items-center gap-1.5">
                      <Zap className="w-3.5 h-3.5 text-[#5964FE]" />
                      Skill overlap
                    </span>
                    <span className="text-[#434EEB] font-bold">85%</span>
                  </div>
                  <div className="w-full bg-[#EEF2FE] rounded-full h-2 overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: "85%" }}
                      transition={{ duration: 1.2, delay: 0.4, ease: "easeOut" }}
                      className="bg-gradient-to-r from-[#5964FE] to-[#7B73FE] h-2 rounded-full"
                    />
                  </div>
                </div>

                {/* Bar 3: Eligibility & Schedule Fit */}
                <div>
                  <div className="flex justify-between text-xs font-semibold mb-1">
                    <span className="text-[#10174D] flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#5964FE]" />
                      Eligibility & Schedule fit
                    </span>
                    <span className="text-[#434EEB] font-bold">88%</span>
                  </div>
                  <div className="w-full bg-[#EEF2FE] rounded-full h-2 overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: "88%" }}
                      transition={{ duration: 1.2, delay: 0.6, ease: "easeOut" }}
                      className="bg-gradient-to-r from-[#5964FE] to-[#7B73FE] h-2 rounded-full"
                    />
                  </div>
                </div>

              </div>

              {/* Bullet Points with Check Icons */}
              <div className="pt-2 pb-4 space-y-2 text-xs text-[#525A8B]">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#5964FE] shrink-0 mt-0.5" />
                  <span>Matches your FastAPI, React & Python repositories</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#5964FE] shrink-0 mt-0.5" />
                  <span>Zero collision with your Saturday DBMS Lab Exam</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#5964FE] shrink-0 mt-0.5" />
                  <span>Pre-approved college OD leave letter template ready</span>
                </div>
              </div>

              {/* Card Footer Pill */}
              <div className="pt-3 border-t border-[#F0F3FD] flex items-center justify-between text-xs">
                <span className="font-semibold text-[#8E9BBF]">Worth-It Index</span>
                <span className="px-2.5 py-1 rounded-lg bg-[#DFE3FF] text-[#434EEB] font-bold border border-[#C7D2FE]">
                  8.8 / 10 Tier-1
                </span>
              </div>

            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
