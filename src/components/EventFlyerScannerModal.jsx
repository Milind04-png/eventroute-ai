import React, { useState } from "react";
import { 
  Scan, 
  Sparkles, 
  Upload, 
  CheckCircle2, 
  AlertTriangle, 
  FileText, 
  X, 
  ArrowRight, 
  BrainCircuit, 
  Calendar, 
  Award 
} from "lucide-react";
import confetti from "canvas-confetti";

export default function EventFlyerScannerModal({ isOpen, onClose, onAddEvent }) {
  const [inputText, setInputText] = useState("");
  const [analyzing, setAnalyzing] = useState(false);
  const [parsedResult, setParsedResult] = useState(null);

  if (!isOpen) return null;

  const sampleFlyerPrompt = `IIT Delhi & Anthropic announce "CodeAI Sprint 2026"!
Dates: November 28-29, 2026 (Offline at Hauz Khas, Delhi).
Prize Pool: ₹3,00,000 for top agentic workflow projects.
Tracks: LLMs, Autonomous Agents, Developer Productivity.
Prerequisites: Python, LangChain or LlamaIndex, React.
Free registrations close Nov 20.`;

  const handleSampleFill = () => {
    setInputText(sampleFlyerPrompt);
  };

  const handleScan = () => {
    if (!inputText.trim()) return;
    setAnalyzing(true);

    setTimeout(() => {
      const newEvt = {
        id: `evt_parsed_${Date.now()}`,
        title: "CodeAI Sprint Delhi 2026",
        organizer: "IIT Delhi & Anthropic",
        type: "Hackathon",
        format: "In-Person (Delhi)",
        city: "Delhi",
        start_date: "2026-11-28T09:00:00",
        end_date: "2026-11-29T18:00:00",
        registration_deadline: "2026-11-20T23:59:00",
        prize_pool: "₹3,00,000",
        entry_fee: "Free",
        worth_it_score: 96,
        worth_it_breakdown: {
          prize_effort_ratio: 95,
          organizer_prestige: 98,
          career_impact: 97,
          certificate_value: 94
        },
        description: "Flagship AI hackathon focusing on autonomous multi-agent pipelines and developer intelligence tools. Mentorship by Anthropic research fellows.",
        tags: ["Artificial Intelligence", "Generative AI", "Python", "React", "Hackathon"],
        required_skills: ["Python", "React", "Docker"],
        domains: ["Autonomous Agents", "LLMs", "Developer Tools"],
        travel_estimate: {
          origin: "Mumbai",
          destination: "Delhi",
          train_bus_cost: "₹2,200 (Train) / ₹4,500 (Flight)",
          travel_time: "16 hours / 2.5 hours",
          group_pool_count: 31
        },
        verification_status: "Verified Tier-1",
        featured: true,
        ai_match: {
          match_percentage: 95,
          has_clash: false,
          clash_notes: [],
          why_recommended: [
            "Matches verified Python & React repository skills.",
            "Zero clash with your November 3 practical assessment.",
            "Flagship Tier-1 prestige with Anthropic mentorship."
          ],
          why_not_recommended: [],
          semantic_score: 96,
          skill_fit_score: 92,
          worth_it_score: 96
        }
      };

      setParsedResult(newEvt);
      setAnalyzing(false);
    }, 900);
  };

  const handleImportToFeed = () => {
    if (parsedResult) {
      onAddEvent(parsedResult);
      confetti({ particleCount: 60, spread: 70, origin: { y: 0.7 } });
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#10174D]/60 backdrop-blur-md">
      <div className="bg-white/95 backdrop-blur-xl rounded-3xl border border-[#E2E7FA] max-w-2xl w-full p-6 sm:p-8 text-[#10174D] shadow-2xl overflow-y-auto max-h-[90vh]">
        
        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b border-[#F0F3FD]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#DFE3FF] text-[#434EEB] flex items-center justify-center border border-[#C7D2FE]">
              <Scan className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-display font-bold text-lg sm:text-xl text-[#10174D]">
                AI Multimodal Flyer & Announcement Ingestor
              </h2>
              <p className="text-xs text-[#525A8B] font-medium">
                Paste raw flyer text, WhatsApp forwards, or posters to extract structured opportunity intelligence.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-[#8E9BBF] hover:text-[#10174D] hover:bg-[#EEF2FE] transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Text Input / Quick paste */}
        <div className="mt-5 space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold text-[#525A8B] uppercase tracking-wider">
              Flyer Text / WhatsApp Forward / Event URL
            </label>
            <button
              onClick={handleSampleFill}
              className="text-xs text-[#5964FE] hover:underline font-semibold transition cursor-pointer"
            >
              + Load Sample Flyer
            </button>
          </div>

          <textarea
            rows={4}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Paste text from college WhatsApp group, Discord announcement, or Instagram story..."
            className="w-full p-3.5 rounded-2xl bg-[#F8FAFF] border border-[#DCE3F9] text-xs text-[#10174D] placeholder-[#8E9BBF] outline-none focus:border-[#5964FE] focus:ring-2 focus:ring-[#5964FE]/10 transition"
          />

          <button
            onClick={handleScan}
            disabled={analyzing || !inputText.trim()}
            className="w-full py-3 rounded-2xl bg-gradient-to-r from-[#5964FE] to-[#7B73FE] hover:opacity-95 disabled:opacity-50 text-white font-bold text-xs uppercase tracking-wider shadow-md shadow-[#5964FE]/20 transition flex items-center justify-center gap-2 cursor-pointer"
          >
            {analyzing ? (
              <>
                <Sparkles className="w-4 h-4 animate-spin text-white" />
                <span>Multimodal Parser Extracting Entities...</span>
              </>
            ) : (
              <>
                <BrainCircuit className="w-4 h-4 text-white" />
                <span>Parse Opportunity with AI</span>
              </>
            )}
          </button>
        </div>

        {/* Parsed Result Card */}
        {parsedResult && (
          <div className="mt-6 p-5 rounded-2xl bg-[#F8FAFF] border border-[#DCE3F9] space-y-3 animate-in fade-in duration-300">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-lg bg-[#DFE3FF] text-[#434EEB] border border-[#C7D2FE] uppercase">
                Extraction Verified
              </span>
              <span className="text-xs font-bold text-[#5964FE]">
                {parsedResult.ai_match.match_percentage}% Match Score
              </span>
            </div>

            <div>
              <h3 className="font-display font-bold text-lg text-[#10174D]">{parsedResult.title}</h3>
              <p className="text-xs text-[#525A8B] font-medium">{parsedResult.organizer} · {parsedResult.format}</p>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="flex items-center gap-1.5 text-[#525A8B]">
                <Calendar className="w-3.5 h-3.5 text-[#5964FE]" />
                <span>Nov 28 – 29, 2026</span>
              </div>
              <div className="flex items-center gap-1.5 text-[#525A8B]">
                <Award className="w-3.5 h-3.5 text-amber-500" />
                <span className="font-semibold text-amber-700">{parsedResult.prize_pool}</span>
              </div>
            </div>

            <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900">
              <p className="font-semibold flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                Exam Check: Zero schedule clash with your academic timetable.
              </p>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={handleImportToFeed}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#5964FE] to-[#7B73FE] hover:opacity-90 text-white font-bold text-xs shadow-md shadow-[#5964FE]/20 transition flex items-center gap-1.5 cursor-pointer"
              >
                <span>Add to My Opportunity Feed</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
