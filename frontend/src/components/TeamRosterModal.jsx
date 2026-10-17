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
  Building2,
  HardDrive,
  FileCheck
} from "lucide-react";
import { STUDENT_PROFILE } from "../data/initialEvents";
import { downloadFileAndSaveLocalStorage } from "../utils/fileDownloader";

export default function TeamRosterModal({ isOpen, onClose, teammates = [] }) {
  if (!isOpen) return null;

  const [copied, setCopied] = useState(false);
  const [teamName, setTeamName] = useState("DTC NeuralRoute Innovators");
  const [targetEvent, setTargetEvent] = useState("TechSpark DTC 2026 & InfoXpression");
  const [downloadStatus, setDownloadStatus] = useState(null);

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

  const getRosterPayload = () => ({
    team_name: teamName,
    institution: "Delhi Technical Campus (GGSIPU)",
    target_event: targetEvent,
    generated_at: new Date().toISOString(),
    verification_hash: `ROSTER-VERIF-${STUDENT_PROFILE.roll_no}-DTC-2026`,
    members: coreMembers,
    combined_stack: allSkills
  });

  const handleCopyJSON = () => {
    const data = getRosterPayload();
    navigator.clipboard.writeText(JSON.stringify(data, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadFile = (format = "json") => {
    const data = getRosterPayload();
    const safeTeam = teamName.replace(/[^a-zA-Z0-9]/g, "_").toLowerCase();

    if (format === "json") {
      const filename = `${safeTeam}_roster.json`;
      downloadFileAndSaveLocalStorage(filename, data, "application/json", "team_roster");
    } else {
      const filename = `${safeTeam}_roster.txt`;
      const text = `================================================================================
OFFICIAL HACKATHON TEAM ROSTER SLIP - DELHI TECHNICAL CAMPUS (GGSIPU)
================================================================================
Team Name:       ${teamName}
Target Event:    ${targetEvent}
Institution:     Delhi Technical Campus (GGSIPU)
Roster Ref:      ROSTER-VERIF-${STUDENT_PROFILE.roll_no}-DTC-2026
Generated At:    ${new Date().toLocaleString()}

TEAM MEMBERS:
--------------------------------------------------------------------------------
${coreMembers.map((m, idx) => `
[#${idx + 1}] ${m.name.toUpperCase()} (${m.role})
Roll No:    ${m.roll_no}
Branch:     ${m.branch}
College:    ${m.college}
Skills:     ${m.skills.join(", ")}
GitHub:     ${m.github}
Email:      ${m.email}
`).join("\n")}
COMBINED TEAM TECH STACK:
${allSkills.join(" • ")}
================================================================================`;
      downloadFileAndSaveLocalStorage(filename, text, "text/plain", "team_roster");
    }

    setDownloadStatus(format.toUpperCase());
    setTimeout(() => setDownloadStatus(null), 3000);
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
              onClick={() => handleDownloadFile("json")}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white hover:bg-[#EEF2FE] border border-[#DCE3F9] text-xs font-semibold text-[#10174D] transition shadow-xs cursor-pointer"
              title="Download file to local storage"
            >
              <Download className="w-3.5 h-3.5 text-[#5964FE]" />
              <span>{downloadStatus === "JSON" ? "Downloaded!" : "Download (.json)"}</span>
            </button>

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

        {/* Download & Storage Toast Notice */}
        {downloadStatus && (
          <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center justify-between gap-2 animate-in fade-in">
            <div className="flex items-center gap-2">
              <FileCheck className="w-4 h-4 text-emerald-600" />
              <span>Roster file saved to local machine & mirrored into browser localStorage!</span>
            </div>
            <span className="text-[10px] bg-emerald-100 px-2 py-0.5 rounded-md text-emerald-900 uppercase">
              Offline Storage
            </span>
          </div>
        )}

        {/* Printable Team Slip */}
        <div className="p-6 rounded-2xl bg-[#F8FAFF] border border-[#E2E7FA] space-y-4">
          
          {/* Institutional Banner */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#E2E7FA]">
            <div>
              <div className="flex items-center gap-1.5 text-xs font-bold text-[#5964FE] uppercase">
                <School className="w-4 h-4" />
                <span>Delhi Technical Campus (GGSIPU Affiliated)</span>
              </div>
              <h3 className="font-display font-black text-xl text-[#10174D] mt-0.5">
                {teamName}
              </h3>
            </div>
            <div className="text-right">
              <span className="text-[10px] uppercase font-bold text-[#8E9BBF] block">Event Target</span>
              <span className="text-xs font-extrabold text-[#434EEB]">{targetEvent}</span>
            </div>
          </div>

          {/* Members Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-[#E2E7FA] text-[#8E9BBF] font-bold text-[10px] uppercase">
                  <th className="py-2">Member</th>
                  <th className="py-2">Roll No</th>
                  <th className="py-2">College & Branch</th>
                  <th className="py-2">Assigned Role</th>
                  <th className="py-2">Core Tech Stack</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E2E7FA]/60">
                {coreMembers.map((m, idx) => (
                  <tr key={idx} className="hover:bg-white/80 transition">
                    <td className="py-2.5 font-bold text-[#10174D]">
                      {m.name}
                      {idx === 0 && <span className="ml-1 text-[9px] px-1.5 py-0.5 rounded bg-blue-100 text-blue-800 font-bold">LEAD</span>}
                    </td>
                    <td className="py-2.5 font-mono text-[11px] text-[#525A8B]">{m.roll_no}</td>
                    <td className="py-2.5 text-[#525A8B]">
                      <div className="font-medium text-[#10174D] text-[11px]">Delhi Technical Campus</div>
                      <div className="text-[10px] text-[#8E9BBF]">{m.branch}</div>
                    </td>
                    <td className="py-2.5 font-semibold text-[#5964FE]">{m.role}</td>
                    <td className="py-2.5">
                      <div className="flex flex-wrap gap-1">
                        {m.skills.slice(0, 3).map((s, sIdx) => (
                          <span key={sIdx} className="px-1.5 py-0.5 rounded bg-white border border-[#DCE3F9] text-[10px] text-[#525A8B]">
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
          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={() => handleDownloadFile("json")}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-white hover:bg-[#EEF2FE] border border-[#DCE3F9] text-xs font-bold text-[#10174D] transition shadow-xs cursor-pointer"
              title="Download JSON to local disk & localStorage"
            >
              <Download className="w-4 h-4 text-[#5964FE]" />
              <span>{downloadStatus === "JSON" ? "Downloaded JSON!" : "Download Roster (.json)"}</span>
            </button>

            <button
              onClick={() => handleDownloadFile("txt")}
              className="flex items-center gap-1.5 px-3 py-2.5 rounded-xl bg-white hover:bg-[#EEF2FE] border border-[#DCE3F9] text-xs font-bold text-[#525A8B] transition shadow-xs cursor-pointer"
              title="Download text slip"
            >
              <HardDrive className="w-3.5 h-3.5 text-[#7B73FE]" />
              <span>.TXT</span>
            </button>

            <button
              onClick={handleCopyJSON}
              className="flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-white hover:bg-[#EEF2FE] border border-[#DCE3F9] text-xs font-bold text-[#525A8B] transition cursor-pointer"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4 text-[#5964FE]" />}
              <span>{copied ? "Copied!" : "Copy JSON"}</span>
            </button>
          </div>

          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#5964FE] to-[#7B73FE] text-white text-xs font-bold hover:opacity-95 transition cursor-pointer shadow-md shadow-[#5964FE]/20"
          >
            Done
          </button>
        </div>

      </div>
    </div>
  );
}
