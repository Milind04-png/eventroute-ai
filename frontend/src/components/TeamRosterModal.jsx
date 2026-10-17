import React, { useState } from "react";
import { 
  X, 
  Printer, 
  Users, 
  Check, 
  Copy, 
  ShieldCheck, 
  Sparkles, 
  School, 
  Download,
  Share2,
  QrCode,
  Building2
} from "lucide-react";
import { STUDENT_PROFILE } from "../data/initialEvents";

export default function TeamRosterModal({ isOpen, onClose, teammates = [] }) {
  if (!isOpen) return null;

  const [copied, setCopied] = useState(false);
  const [teamName, setTeamName] = useState("DTC NeuralRoute Innovators");
  const [targetEvent, setTargetEvent] = useState("TechSpark DTC 2026 & InfoXpression");

  // DTC Core Roster
  const coreMembers = [
    {
      name: STUDENT_PROFILE.name,
      roll_no: STUDENT_PROFILE.roll_no,
      branch: STUDENT_PROFILE.branch,
      college: STUDENT_PROFILE.college,
      role: "Team Lead & Fullstack AI Systems",
      skills: ["Python", "FastAPI", "React", "Docker", "PostgreSQL"],
      github: STUDENT_PROFILE.github,
      email: STUDENT_PROFILE.email
    },
    {
      name: "Arman Chauhan",
      roll_no: "2024CS1018",
      branch: "Computer Science & Engineering",
      college: "Delhi Technical Campus (GGSIPU)",
      role: "Frontend & UI/UX Lead",
      skills: ["React", "Next.js", "Tailwind CSS", "Figma", "TypeScript"],
      github: "https://github.com/arman-chauhan",
      email: "arman@delhitechnicalcampus.ac.in"
    },
    {
      name: "Anshika Tyagi",
      roll_no: "2024AIML1005",
      branch: "AI & Machine Learning",
      college: "Delhi Technical Campus (GGSIPU)",
      role: "AI & Machine Learning Specialist",
      skills: ["PyTorch", "LangChain", "OpenAI APIs", "Vector DBs"],
      github: "https://github.com/anshika-tyagi",
      email: "anshika@delhitechnicalcampus.ac.in"
    },
    {
      name: "Dimple",
      roll_no: "2024CS1034",
      branch: "Computer Science & Engineering",
      college: "Delhi Technical Campus (GGSIPU)",
      role: "Mobile & Cloud Engineer",
      skills: ["Flutter", "Firebase", "Node.js", "REST APIs"],
      github: "https://github.com/dimple-dtc",
      email: "dimple@delhitechnicalcampus.ac.in"
    }
  ];

  const allSkills = Array.from(new Set(coreMembers.flatMap(m => m.skills)));

  const handleCopyJSON = () => {
    const data = {
      team_name: teamName,
      institution: "Delhi Technical Campus (GGSIPU)",
      target_event: targetEvent,
      members: coreMembers,
      combined_stack: allSkills
    };
    navigator.clipboard.writeText(JSON.stringify(data, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#10174D]/60 backdrop-blur-md">
      <div className="bg-white/95 backdrop-blur-xl border border-[#E2E7FA] rounded-3xl max-w-3xl w-full p-6 sm:p-7 text-[#10174D] shadow-2xl overflow-y-auto max-h-[92vh] space-y-5">
        
        {/* Top Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#F0F3FD]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#DFE3FF] text-[#434EEB] flex items-center justify-center border border-[#C7D2FE]">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-display font-bold text-lg sm:text-xl text-[#10174D]">
                Official Hackathon Team Roster Slip
              </h2>
              <p className="text-xs text-[#525A8B]">
                Verified Devfolio & Unstop team entry for Delhi Technical Campus students
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-[#5964FE] to-[#7B73FE] hover:opacity-90 text-xs font-semibold text-white shadow-md shadow-[#5964FE]/20 transition cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Slip</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-xl text-[#8E9BBF] hover:text-[#10174D] hover:bg-[#EEF2FE] transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Team Slip */}
        <div className="p-6 rounded-2xl bg-[#F8FAFF] border border-[#E2E7FA] space-y-4">
          
          {/* Institutional Banner */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#E2E7FA]">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#5964FE] block mb-0.5">
                Representing Institution
              </span>
              <h3 className="font-display font-extrabold text-base text-[#10174D] flex items-center gap-1.5">
                <School className="w-4 h-4 text-[#5964FE]" />
                Delhi Technical Campus, Greater Noida (GGSIPU)
              </h3>
            </div>
            <div className="text-left sm:text-right">
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200">
                ✓ 4-Member Full Roster
              </span>
            </div>
          </div>

          {/* Editable Team & Event Name */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-[10px] uppercase font-bold text-[#8E9BBF] block mb-1">
                Team Name:
              </label>
              <input
                type="text"
                value={teamName}
                onChange={(e) => setTeamName(e.target.value)}
                className="w-full px-3 py-1.5 rounded-xl bg-white border border-[#C7D2FE] text-xs font-bold text-[#10174D] focus:outline-none focus:ring-2 focus:ring-[#5964FE]/20"
              />
            </div>
            <div>
              <label className="text-[10px] uppercase font-bold text-[#8E9BBF] block mb-1">
                Target Hackathon:
              </label>
              <input
                type="text"
                value={targetEvent}
                onChange={(e) => setTargetEvent(e.target.value)}
                className="w-full px-3 py-1.5 rounded-xl bg-white border border-[#C7D2FE] text-xs font-bold text-[#10174D] focus:outline-none focus:ring-2 focus:ring-[#5964FE]/20"
              />
            </div>
          </div>

          {/* Members Table */}
          <div className="overflow-x-auto rounded-xl border border-[#E2E7FA] bg-white">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#EEF2FE] text-[#10174D] font-bold uppercase text-[10px] border-b border-[#DCE3F9]">
                <tr>
                  <th className="p-3">#</th>
                  <th className="p-3">Name & Roll No</th>
                  <th className="p-3">Branch & Year</th>
                  <th className="p-3">Specialization Role</th>
                  <th className="p-3">Primary Tech</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F0F3FD]">
                {coreMembers.map((m, idx) => (
                  <tr key={idx} className="hover:bg-[#F8FAFF]">
                    <td className="p-3 font-bold text-[#5964FE]">{idx + 1}</td>
                    <td className="p-3 font-bold text-[#10174D]">
                      <div>{m.name} {idx === 0 && <span className="text-[9px] font-black text-[#5964FE] bg-[#DFE3FF] px-1 rounded">Lead</span>}</div>
                      <div className="text-[10px] text-[#8E9BBF] font-mono">{m.roll_no}</div>
                    </td>
                    <td className="p-3 text-[#525A8B] font-medium">{m.branch}</td>
                    <td className="p-3 font-semibold text-[#10174D]">{m.role}</td>
                    <td className="p-3">
                      <div className="flex flex-wrap gap-1">
                        {m.skills.slice(0, 3).map((s, i) => (
                          <span key={i} className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-[#EEF2FE] text-[#434EEB]">
                            {s}
                          </span>
                        ))}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Combined Team Stack */}
          <div className="p-3 rounded-xl bg-white border border-[#E2E7FA]">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#8E9BBF] block mb-1.5">
              Combined Team Technology Stack:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {allSkills.map((s, idx) => (
                <span key={idx} className="text-[10px] font-bold px-2 py-0.5 rounded-lg bg-[#DFE3FF] text-[#434EEB] border border-[#C7D2FE]">
                  {s}
                </span>
              ))}
            </div>
          </div>

          {/* Verification Badge */}
          <div className="flex items-center justify-between text-xs text-[#525A8B] pt-2">
            <span className="flex items-center gap-1 font-mono text-[10px]">
              <QrCode className="w-3.5 h-3.5 text-[#5964FE]" />
              ROSTER-VERIF-{STUDENT_PROFILE.roll_no}-DTC-2026
            </span>
            <span className="text-[10px] text-emerald-700 font-bold flex items-center gap-1">
              <Check className="w-3.5 h-3.5" />
              Pre-Approved for DTC Student OD Grant
            </span>
          </div>

        </div>

        {/* Bottom Actions */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
          <button
            onClick={handleCopyJSON}
            className="flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-white hover:bg-[#EEF2FE] border border-[#DCE3F9] text-xs font-bold text-[#10174D] transition cursor-pointer"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4 text-[#5964FE]" />}
            <span>{copied ? "Copied Roster JSON!" : "Copy Devfolio / Unstop JSON"}</span>
          </button>

          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-[#5964FE] text-white text-xs font-bold hover:bg-[#434EEB] transition cursor-pointer"
          >
            Done
          </button>
        </div>

      </div>
    </div>
  );
}
