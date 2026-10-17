import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  Sparkles, 
  ThumbsUp, 
  ThumbsDown, 
  HelpCircle, 
  CheckCircle2, 
  Calendar, 
  MapPin, 
  Award, 
  Sliders, 
  Layers, 
  ArrowUpRight,
  TrendingUp,
  BrainCircuit,
  Zap,
  ShieldCheck,
  RefreshCw
} from "lucide-react";

export default function LightExplainableFeed({ 
  onWhyClick, 
  onSkillGapClick, 
  onODClick,
  onFeedback,
  downvoted,
  upvoted
}) {
  // Configurable weights in the dark settings panel
  const [weights, setWeights] = useState({
    semantic: 50,
    skill: 30,
    eligibility: 20
  });

  // Animated circular score ring for 87%
  const [scoreProgress, setScoreProgress] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setScoreProgress(87);
    }, 400);
    return () => clearTimeout(timer);
  }, []);

  // Recalculate dynamic score based on weight sliders
  const calculatedScore = Math.round(
    (weights.semantic * 0.91 + weights.skill * 0.78 + weights.eligibility * 0.88) / 
    ((weights.semantic + weights.skill + weights.eligibility) / 100)
  );

  const radius = 42;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (scoreProgress / 100) * circumference;

  return (
    <section className="py-12 lg:py-16 bg-transparent relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-10">
          <p className="text-xs font-bold text-[#5964FE] uppercase tracking-widest mb-2 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#5964FE]"></span>
            01 EXPLAINABLE RECOMMENDATIONS
          </p>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-[#10174D] tracking-tight">
            Your feed, ranked — and justified.
          </h2>
          <p className="text-sm text-[#525A8B] mt-2 max-w-xl">
            Every match score is synthesized from transparent mathematical vectors, 
            not opaque sponsored promotions.
          </p>
        </div>

        {/* Two-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT COLUMN: Dark-Mode Tinted Settings Panel */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-4 bg-[#10174D] text-white rounded-3xl p-6 sm:p-7 shadow-2xl shadow-[#10174D]/20 border border-[#2A346C] relative overflow-hidden"
          >
            {/* Subtle background glow */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-[#5964FE]/20 rounded-full blur-2xl pointer-events-none"></div>

            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#5964FE]/30 text-white flex items-center justify-center border border-[#5964FE]/40">
                  <Sliders className="w-4 h-4" />
                </div>
                <h3 className="font-display font-bold text-base text-white">Hybrid score weights</h3>
              </div>
              <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-white/10 text-white/80">
                Active Model
              </span>
            </div>

            <p className="text-xs text-slate-300 mb-6 leading-relaxed">
              Adjust multi-objective ranking preferences. Weights adapt automatically in real-time as you interact with the feed.
            </p>

            {/* Horizontal Animated Progress Bars / Sliders */}
            <div className="space-y-6">
              
              {/* Semantic Weight */}
              <div>
                <div className="flex justify-between items-center text-xs mb-2">
                  <span className="font-medium text-slate-200 flex items-center gap-1.5">
                    <BrainCircuit className="w-3.5 h-3.5 text-[#5964FE]" />
                    Semantic interest fit
                  </span>
                  <span className="font-mono font-bold text-white">{weights.semantic}%</span>
                </div>
                <div className="w-full bg-white/10 rounded-full h-2.5 overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${weights.semantic}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="bg-gradient-to-r from-[#5964FE] to-[#7B73FE] h-2.5 rounded-full"
                  />
                </div>
                <input 
                  type="range" 
                  min="10" 
                  max="80" 
                  value={weights.semantic} 
                  onChange={(e) => setWeights({ ...weights, semantic: Number(e.target.value) })}
                  className="w-full mt-2 accent-[#5964FE] cursor-pointer h-1 bg-white/10 rounded-lg appearance-none opacity-60 hover:opacity-100 transition-opacity"
                />
              </div>

              {/* Skill Overlap Weight */}
              <div>
                <div className="flex justify-between items-center text-xs mb-2">
                  <span className="font-medium text-slate-200 flex items-center gap-1.5">
                    <Zap className="w-3.5 h-3.5 text-[#5964FE]" />
                    Verified skill overlap
                  </span>
                  <span className="font-mono font-bold text-white">{weights.skill}%</span>
                </div>
                <div className="w-full bg-white/10 rounded-full h-2.5 overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${weights.skill}%` }}
                    transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
                    className="bg-gradient-to-r from-[#5964FE] to-[#7B73FE] h-2.5 rounded-full"
                  />
                </div>
                <input 
                  type="range" 
                  min="10" 
                  max="80" 
                  value={weights.skill} 
                  onChange={(e) => setWeights({ ...weights, skill: Number(e.target.value) })}
                  className="w-full mt-2 accent-[#5964FE] cursor-pointer h-1 bg-white/10 rounded-lg appearance-none opacity-60 hover:opacity-100 transition-opacity"
                />
              </div>

              {/* Eligibility & Calendar Fit */}
              <div>
                <div className="flex justify-between items-center text-xs mb-2">
                  <span className="font-medium text-slate-200 flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#5964FE]" />
                    Eligibility & exam clash guard
                  </span>
                  <span className="font-mono font-bold text-white">{weights.eligibility}%</span>
                </div>
                <div className="w-full bg-white/10 rounded-full h-2.5 overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${weights.eligibility}%` }}
                    transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
                    className="bg-gradient-to-r from-[#5964FE] to-[#7B73FE] h-2.5 rounded-full"
                  />
                </div>
                <input 
                  type="range" 
                  min="10" 
                  max="80" 
                  value={weights.eligibility} 
                  onChange={(e) => setWeights({ ...weights, eligibility: Number(e.target.value) })}
                  className="w-full mt-2 accent-[#5964FE] cursor-pointer h-1 bg-white/10 rounded-lg appearance-none opacity-60 hover:opacity-100 transition-opacity"
                />
              </div>

            </div>

            {/* Reset Weights Action */}
            <div className="mt-8 pt-4 border-t border-white/10 flex items-center justify-between text-xs">
              <span className="text-slate-300">Total Weight: 100%</span>
              <button 
                onClick={() => setWeights({ semantic: 50, skill: 30, eligibility: 20 })}
                className="text-[#5964FE] hover:text-[#7B73FE] flex items-center gap-1 font-semibold transition cursor-pointer"
              >
                <RefreshCw className="w-3 h-3" />
                <span>Reset to default</span>
              </button>
            </div>

          </motion.div>

          {/* RIGHT COLUMN: Detailed Feed Card (#1 HackML Weekend 2026) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            whileHover={{ y: -6 }}
            className="lg:col-span-8 bg-white/95 backdrop-blur-xl rounded-3xl p-6 sm:p-8 border border-[#E2E7FA] shadow-[0_15px_40px_rgba(89,100,254,0.06)] hover:shadow-[0_25px_60px_rgba(89,100,254,0.12)] transition-all duration-300 relative group"
          >
            
            {/* Top Row: Rank Tag, Title, and 87% Score Ring */}
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6 pb-6 border-b border-[#F0F3FD]">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-lg bg-gradient-to-r from-[#5964FE] to-[#7B73FE] text-white font-bold text-xs uppercase tracking-wider shadow-xs">
                    #1 Ranked
                  </span>
                  <span className="px-2.5 py-0.5 rounded-lg bg-[#EEF2FE] text-[#434EEB] font-semibold text-xs border border-[#DCE3F9]">
                    Worth it 8.7 / 10
                  </span>
                  <span className="px-2.5 py-0.5 rounded-lg bg-[#DFE3FF] text-[#434EEB] font-semibold text-xs border border-[#C7D2FE]">
                    Verified Tier-1
                  </span>
                </div>

                <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-[#10174D]">
                  HackML Weekend 2026
                </h3>

                <div className="flex flex-wrap items-center gap-4 text-xs text-[#525A8B] pt-1">
                  <span className="flex items-center gap-1.5 font-medium">
                    <Calendar className="w-4 h-4 text-[#5964FE]" />
                    Oct 26 – 27, 2026
                  </span>
                  <span className="flex items-center gap-1.5 font-medium">
                    <MapPin className="w-4 h-4 text-[#5964FE]" />
                    COEP Tech, Pune (In-Person)
                  </span>
                  <span className="flex items-center gap-1.5 font-medium">
                    <Award className="w-4 h-4 text-[#5964FE]" />
                    ₹2,50,000 Prize Pool
                  </span>
                </div>
              </div>

              {/* Large Glowing Circular Progress Ring (87%) */}
              <div className="relative flex items-center justify-center shrink-0 w-28 h-28 self-center sm:self-auto">
                <svg className="w-28 h-28 -rotate-90 transform" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r={radius}
                    stroke="#EEF2FE"
                    strokeWidth="8"
                    fill="transparent"
                  />
                  <motion.circle
                    cx="50"
                    cy="50"
                    r={radius}
                    stroke="#5964FE"
                    strokeWidth="8"
                    strokeDasharray={circumference}
                    initial={{ strokeDashoffset: circumference }}
                    animate={{ strokeDashoffset }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    strokeLinecap="round"
                    fill="transparent"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <span className="font-display font-extrabold text-2xl text-[#10174D] leading-none">
                    {calculatedScore}%
                  </span>
                  <span className="text-[10px] font-bold text-[#5964FE] uppercase tracking-wider mt-0.5">
                    Match
                  </span>
                </div>
              </div>

            </div>

            {/* Tags Row */}
            <div className="py-4 flex flex-wrap items-center justify-between gap-3 border-b border-[#F0F3FD]">
              <div className="flex flex-wrap gap-1.5">
                {["Generative AI", "FastAPI", "Python", "Healthcare", "Edge Computing"].map((tag, idx) => (
                  <span 
                    key={idx} 
                    className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-[#F8FAFF] text-[#525A8B] border border-[#DCE3F9]"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Action Buttons: 👍, 👎, and "Why?" */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => onFeedback("evt_hackai_pune_26", "upvote")}
                  title="Upvote: Boost similar opportunities"
                  className={`p-2 rounded-xl border transition-all cursor-pointer ${
                    upvoted 
                      ? "bg-[#5964FE] text-white border-[#5964FE] font-bold shadow-xs" 
                      : "bg-[#EEF2FE] hover:bg-[#DFE3FF] text-[#525A8B] hover:text-[#434EEB] border-[#DCE3F9]"
                  }`}
                >
                  <ThumbsUp className="w-4 h-4" />
                </button>

                <button
                  onClick={() => onFeedback("evt_hackai_pune_26", "downvote", "Demote for demo")}
                  title="Downvote: Adjust weights"
                  className={`p-2 rounded-xl border transition-all cursor-pointer ${
                    downvoted 
                      ? "bg-rose-500 text-white border-rose-500 font-bold shadow-xs" 
                      : "bg-[#EEF2FE] hover:bg-rose-50 text-[#525A8B] hover:text-rose-600 border-[#DCE3F9]"
                  }`}
                >
                  <ThumbsDown className="w-4 h-4" />
                </button>

                <button
                  onClick={onWhyClick}
                  className="px-3.5 py-2 rounded-xl bg-[#EEF2FE] hover:bg-[#DFE3FF] text-[#10174D] font-bold text-xs flex items-center gap-1.5 transition border border-[#DCE3F9] cursor-pointer"
                >
                  <HelpCircle className="w-4 h-4 text-[#5964FE]" />
                  <span>Why?</span>
                </button>
              </div>
            </div>

            {/* Bullet Points with Checkmarks */}
            <div className="py-5 space-y-2.5 text-xs sm:text-sm text-[#525A8B]">
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#5964FE] shrink-0 mt-0.5" />
                <span className="leading-relaxed">
                  Matches your verified <strong className="text-[#10174D]">NLP & Healthcare AI</strong> projects on GitHub.
                </span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#5964FE] shrink-0 mt-0.5" />
                <span className="leading-relaxed">
                  Only 1 minor prerequisite gap: <strong className="text-[#10174D]">PyTorch</strong> (curated 3-hour fast-track prep ready).
                </span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#5964FE] shrink-0 mt-0.5" />
                <span className="leading-relaxed">
                  Starts Sunday morning — <strong className="text-[#434EEB] font-semibold">zero exam conflict</strong> with your Saturday DBMS Lab Exam.
                </span>
              </div>
            </div>

            {/* Bottom Row: Actions & Three Mini-Cards */}
            <div className="pt-5 border-t border-[#F0F3FD] flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              
              {/* Quick Actions */}
              <div className="flex items-center gap-2">
                <button
                  onClick={onSkillGapClick}
                  className="px-3.5 py-2 rounded-xl bg-[#EEF2FE] hover:bg-[#DFE3FF] text-[#434EEB] text-xs font-bold border border-[#DCE3F9] transition cursor-pointer"
                >
                  View Skill-Gap Bridge
                </button>
                <button
                  onClick={onODClick}
                  className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-[#5964FE] to-[#7B73FE] hover:opacity-90 text-white text-xs font-bold transition shadow-xs cursor-pointer"
                >
                  1-Click OD Letter
                </button>
              </div>

              {/* Three Mini-Cards at Bottom Right (91 Semantic, 78 Skills, 88 Fit) */}
              <div className="flex items-center gap-2.5 self-end md:self-auto">
                
                {/* Mini Card 1 */}
                <div className="px-3 py-2 rounded-xl bg-[#F8FAFF] border border-[#DCE3F9] text-center min-w-[70px]">
                  <p className="font-display font-bold text-base text-[#10174D]">91</p>
                  <p className="text-[10px] text-[#525A8B] uppercase font-semibold">Semantic</p>
                </div>

                {/* Mini Card 2 */}
                <div className="px-3 py-2 rounded-xl bg-[#F8FAFF] border border-[#DCE3F9] text-center min-w-[70px]">
                  <p className="font-display font-bold text-base text-[#10174D]">78</p>
                  <p className="text-[10px] text-[#525A8B] uppercase font-semibold">Skills</p>
                </div>

                {/* Mini Card 3 */}
                <div className="px-3 py-2 rounded-xl bg-[#F8FAFF] border border-[#DCE3F9] text-center min-w-[70px]">
                  <p className="font-display font-bold text-base text-[#10174D]">88</p>
                  <p className="text-[10px] text-[#525A8B] uppercase font-semibold">Fit</p>
                </div>

              </div>

            </div>

          </motion.div>

        </div>

      </div>
    </section>
  );
}
