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
    <section className="relative overflow-hidden pt-8 pb-16 lg:py-20 bg-[#F8FAFC]">
      
      {/* Soft Ambient Light Gradient Orbs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-400/10 rounded-full blur-3xl pointer-events-none -translate-y-1/2"></div>
      <div className="absolute top-1/3 right-10 w-[30rem] h-[30rem] bg-indigo-500/5 rounded-full blur-3xl pointer-events-none"></div>

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
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200/80 shadow-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
                Explainable Opportunity Intelligence
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl text-[#0F172A] tracking-tight leading-[1.12]">
              Every opportunity,{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-teal-500 to-indigo-600">
                with a reason.
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-[#475569] max-w-2xl leading-relaxed">
              Stop guessing which hackathons, conferences, and workshops are worth your time. 
              EventRoute AI calculates explainable match scores, guards your university exam attendance, 
              and automates college On-Duty (OD) leave approvals in 1-click.
            </p>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              
              {/* Primary Button: Solid Green Background, Dark Text */}
              <button
                onClick={onSeeMatches}
                className="group px-7 py-3.5 rounded-2xl bg-emerald-400 hover:bg-emerald-300 active:scale-95 text-[#0F172A] font-bold text-sm tracking-wide shadow-lg shadow-emerald-400/25 hover:shadow-xl hover:shadow-emerald-400/35 transition-all duration-200 flex items-center gap-2.5 cursor-pointer"
              >
                <span>See my matches</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              {/* Secondary Button: Outline Style with Icon */}
              <button
                onClick={onOpenAssistant}
                className="px-6 py-3.5 rounded-2xl bg-white hover:bg-slate-50 active:scale-95 text-[#0F172A] font-semibold text-sm border-2 border-slate-200 hover:border-slate-300 shadow-sm hover:shadow-md transition-all duration-200 flex items-center gap-2.5 cursor-pointer"
              >
                <Bot className="w-4 h-4 text-emerald-600" />
                <span>Ask the assistant</span>
              </button>

            </div>

            {/* Trust Metrics / Micro-proof */}
            <div className="pt-4 flex flex-wrap items-center gap-6 text-xs text-[#475569]">
              <div className="flex items-center gap-1.5 font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>Exam Collision Shield</span>
              </div>
              <div className="flex items-center gap-1.5 font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>Automated OD Letters</span>
              </div>
              <div className="flex items-center gap-1.5 font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
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
              className="relative w-full max-w-md bg-white rounded-3xl p-6 sm:p-7 border border-[#E2E8F0] shadow-[0_20px_50px_rgba(15,23,42,0.08),0_4px_12px_rgba(15,23,42,0.03)] cursor-pointer select-none group"
            >
              
              {/* Dynamic Glare Reflection Overlay */}
              <motion.div 
                style={{ opacity: glareOpacity }}
                className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-white via-white/40 to-transparent pointer-events-none"
              />

              {/* Card Header */}
              <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-100">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-emerald-50 text-emerald-700 text-[11px] font-bold uppercase tracking-wider mb-1.5">
                    <Sparkles className="w-3 h-3 text-emerald-500" />
                    Top Recommended Match
                  </div>
                  <h3 className="font-display font-bold text-xl text-[#0F172A] group-hover:text-emerald-600 transition-colors">
                    HackML Weekend 2026
                  </h3>
                  <div className="flex items-center gap-3 text-xs text-[#475569] mt-1">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      Oct 26 – 27
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
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
                      stroke="#E2E8F0"
                      strokeWidth="7"
                      fill="transparent"
                    />
                    {/* Animated green progress arc */}
                    <motion.circle
                      cx="45"
                      cy="45"
                      r={radius}
                      stroke="#10B981"
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
                    <span className="font-display font-bold text-xl text-[#0F172A] leading-none">
                      {progress}%
                    </span>
                    <span className="text-[9px] font-semibold text-emerald-600 uppercase tracking-wider">
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
                    <span className="text-[#0F172A] flex items-center gap-1.5">
                      <BrainCircuit className="w-3.5 h-3.5 text-emerald-600" />
                      Semantic similarity
                    </span>
                    <span className="text-emerald-700 font-bold">92%</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: "92%" }}
                      transition={{ duration: 1.2, delay: 0.2, ease: "easeOut" }}
                      className="bg-emerald-500 h-2 rounded-full"
                    />
                  </div>
                </div>

                {/* Bar 2: Skill Overlap */}
                <div>
                  <div className="flex justify-between text-xs font-semibold mb-1">
                    <span className="text-[#0F172A] flex items-center gap-1.5">
                      <Zap className="w-3.5 h-3.5 text-emerald-600" />
                      Skill overlap
                    </span>
                    <span className="text-emerald-700 font-bold">85%</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: "85%" }}
                      transition={{ duration: 1.2, delay: 0.4, ease: "easeOut" }}
                      className="bg-emerald-500 h-2 rounded-full"
                    />
                  </div>
                </div>

                {/* Bar 3: Eligibility & Schedule Fit */}
                <div>
                  <div className="flex justify-between text-xs font-semibold mb-1">
                    <span className="text-[#0F172A] flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                      Eligibility & Schedule fit
                    </span>
                    <span className="text-emerald-700 font-bold">88%</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: "88%" }}
                      transition={{ duration: 1.2, delay: 0.6, ease: "easeOut" }}
                      className="bg-emerald-500 h-2 rounded-full"
                    />
                  </div>
                </div>

              </div>

              {/* Bullet Points with Check Icons */}
              <div className="pt-2 pb-4 space-y-2 text-xs text-[#334155]">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>Matches your FastAPI, React & Python repositories</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>Zero collision with your Saturday DBMS Lab Exam</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>Pre-approved college OD leave letter template ready</span>
                </div>
              </div>

              {/* Card Footer Pill */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-500">Worth-It Index</span>
                <span className="px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-700 font-bold">
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
