import React, { useState } from "react";
import { 
  Users, 
  Sparkles, 
  CheckCircle2, 
  UserPlus, 
  MessageSquare, 
  ShieldCheck, 
  Check, 
  School, 
  Search, 
  Send,
  Award,
  Zap,
  Building2
} from "lucide-react";
import { INITIAL_TEAMMATES } from "../data/initialEvents";
import TeamRosterModal from "./TeamRosterModal";

export default function TeammateMatcher({ targetTeammate }) {
  const [teammates, setTeammates] = useState(INITIAL_TEAMMATES);
  const [invited, setInvited] = useState({});
  const [categoryFilter, setCategoryFilter] = useState("all"); // "dtc" | "all" | "cross_campus"
  const [searchQuery, setSearchQuery] = useState("");
  const [isRosterOpen, setIsRosterOpen] = useState(false);

  const handleInvite = (id) => {
    setInvited(prev => ({ ...prev, [id]: true }));
  };

  const dtcCount = teammates.filter(t => t.isDtcPeer).length;
  const crossCampusCount = teammates.filter(t => !t.isDtcPeer).length;

  const filteredTeammates = teammates.filter(tm => {
    if (categoryFilter === "dtc" && !tm.isDtcPeer) return false;
    if (categoryFilter === "cross_campus" && tm.isDtcPeer) return false;

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = tm.name.toLowerCase().includes(q);
      const matchBranch = tm.branch.toLowerCase().includes(q);
      const matchCollege = tm.college.toLowerCase().includes(q);
      const matchRole = tm.role ? tm.role.toLowerCase().includes(q) : false;
      const matchSkill = tm.skills.some(s => s.toLowerCase().includes(q));
      return matchName || matchBranch || matchCollege || matchRole || matchSkill;
    }
    return true;
  });

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      
      {/* Header Banner */}
      <div className="p-6 sm:p-7 rounded-3xl bg-white/95 backdrop-blur-xl border border-[#E2E7FA] shadow-[0_10px_30px_rgba(89,100,254,0.05)] flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-[#DFE3FF] text-[#434EEB] flex items-center justify-center border border-[#C7D2FE]">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="font-display font-bold text-xl text-[#10174D]">
                Teammate Discovery & Synergy Engine
              </h2>
              <span className="text-[10px] uppercase font-bold px-2.5 py-0.5 rounded-full bg-[#DFE3FF] text-[#434EEB] border border-[#C7D2FE]">
                {dtcCount} DTC Batchmates Available
              </span>
            </div>
            <p className="text-xs text-[#525A8B] font-medium mt-0.5">
              AI skill synergy matching: Pairs your FastAPI & React backend with complementary UI/UX, AI, and Mobile specialists from Delhi Technical Campus & partner campuses.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => setIsRosterOpen(true)}
            className="text-xs px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-[#5964FE] to-[#7B73FE] text-white font-bold flex items-center gap-1.5 shadow-sm shadow-[#5964FE]/20 hover:opacity-90 transition cursor-pointer"
          >
            <Users className="w-3.5 h-3.5" />
            <span>Export Official Team Roster</span>
          </button>
          <span className="text-xs px-3 py-1.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 font-semibold flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            Verified College IDs & GitHub
          </span>
        </div>
      </div>

      {/* Filter Tabs & Search Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        {/* Category Pills */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <button
            onClick={() => setCategoryFilter("dtc")}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition cursor-pointer flex items-center gap-1.5 ${
              categoryFilter === "dtc"
                ? "bg-[#5964FE] text-white shadow-md shadow-[#5964FE]/20"
                : "bg-white/90 text-[#525A8B] border border-[#E2E7FA] hover:bg-[#EEF2FE]"
            }`}
          >
            <School className="w-3.5 h-3.5" />
            <span>★ Delhi Technical Campus Peers ({dtcCount})</span>
          </button>

          <button
            onClick={() => setCategoryFilter("all")}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
              categoryFilter === "all"
                ? "bg-[#5964FE] text-white shadow-md shadow-[#5964FE]/20"
                : "bg-white/90 text-[#525A8B] border border-[#E2E7FA] hover:bg-[#EEF2FE]"
            }`}
          >
            <span>All Matches ({teammates.length})</span>
          </button>

          <button
            onClick={() => setCategoryFilter("cross_campus")}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
              categoryFilter === "cross_campus"
                ? "bg-[#5964FE] text-white shadow-md shadow-[#5964FE]/20"
                : "bg-white/90 text-[#525A8B] border border-[#E2E7FA] hover:bg-[#EEF2FE]"
            }`}
          >
            <span>Cross-Campus Partners ({crossCampusCount})</span>
          </button>
        </div>

        {/* Search Input */}
        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-[#8E9BBF] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by name, skill, role..."
            className="w-full pl-9 pr-3.5 py-2 rounded-xl bg-white/90 border border-[#E2E7FA] text-xs text-[#10174D] placeholder-[#8E9BBF] focus:outline-none focus:border-[#5964FE] focus:ring-2 focus:ring-[#5964FE]/20 transition"
          />
        </div>
      </div>

      {/* Teammate Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTeammates.map((tm) => {
          const isInvited = invited[tm.id];
          const isHighlighted = targetTeammate?.id === tm.id;

          return (
            <div 
              key={tm.id}
              className={`p-6 rounded-3xl bg-white/95 backdrop-blur-xl border transition-all flex flex-col justify-between shadow-[0_10px_30px_rgba(89,100,254,0.05)] relative group ${
                isHighlighted
                  ? "border-[#5964FE] ring-2 ring-[#5964FE]/30 shadow-[0_16px_36px_rgba(89,100,254,0.15)]"
                  : tm.isDtcPeer
                  ? "border-blue-200/90 hover:border-[#5964FE] hover:shadow-lg hover:-translate-y-0.5"
                  : "border-[#E2E7FA] hover:border-[#C7D2FE] hover:shadow-md"
              }`}
            >
              {/* DTC Batchmate Badge */}
              {tm.isDtcPeer && (
                <div className="absolute -top-2.5 right-6 bg-gradient-to-r from-blue-600 to-[#5964FE] text-white text-[10px] font-black px-3 py-0.5 rounded-full shadow-xs flex items-center gap-1 border border-white">
                  <span>★ DTC Batchmate</span>
                </div>
              )}

              <div>
                {/* Synergy Score & Avatar Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="w-14 h-14 rounded-2xl overflow-hidden ring-2 ring-[#DFE3FF] bg-[#F8FAFF] shadow-xs">
                    <img src={tm.avatar} alt={tm.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                  </div>
                  <div className="px-3 py-1 rounded-xl bg-[#DFE3FF] border border-[#C7D2FE] text-[#434EEB] text-xs font-black flex items-center gap-1 shadow-xs">
                    <Sparkles className="w-3.5 h-3.5 text-[#5964FE]" />
                    <span>{tm.synergy_score}% Synergy</span>
                  </div>
                </div>

                {/* Profile Details */}
                <div className="mb-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-display font-extrabold text-base text-[#10174D]">
                      {tm.name}
                    </h3>
                    {tm.role && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-[#EEF2FE] text-[#434EEB] border border-[#DCE3F9]">
                        {tm.role}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-[#5964FE] font-bold mt-0.5">{tm.branch}</p>
                  <p className="text-xs text-[#525A8B] font-medium flex items-center gap-1 mt-0.5">
                    <Building2 className="w-3.5 h-3.5 text-[#8E9BBF]" />
                    <span>{tm.college}</span>
                  </p>
                </div>

                {/* Seeking Track */}
                <div className="p-3 rounded-2xl bg-[#F8FAFF] border border-[#DCE3F9] mb-3 text-xs">
                  <span className="text-[10px] uppercase font-bold text-[#8E9BBF] block mb-0.5">
                    Looking For:
                  </span>
                  <p className="text-[#10174D] font-semibold">{tm.looking_for}</p>
                </div>

                {/* AI Synergy Rationale */}
                <p className="text-xs text-[#525A8B] italic mb-4 leading-relaxed font-medium bg-[#F5F7FF] p-2.5 rounded-xl border border-[#E2E7FA]">
                  "{tm.synergy_reason}"
                </p>

                {/* Skills Tags */}
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {tm.skills.map((s, idx) => (
                    <span key={idx} className="text-[10px] font-bold px-2 py-0.5 rounded-lg bg-white text-[#525A8B] border border-[#DCE3F9] shadow-2xs">
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Invite Button */}
              <button
                onClick={() => handleInvite(tm.id)}
                disabled={isInvited}
                className={`w-full py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition cursor-pointer ${
                  isInvited
                    ? "bg-emerald-50 text-emerald-800 border border-emerald-200 cursor-default"
                    : "bg-gradient-to-r from-[#5964FE] to-[#7B73FE] hover:opacity-90 text-white shadow-md shadow-[#5964FE]/20 active:scale-95"
                }`}
              >
                {isInvited ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span>{tm.isDtcPeer ? "Invitation Sent (DTC Team)" : "Invitation Sent"}</span>
                  </>
                ) : (
                  <>
                    <UserPlus className="w-4 h-4" />
                    <span>Invite {tm.name.split(" ")[0]} to Team</span>
                  </>
                )}
              </button>
            </div>
          );
        })}
      </div>

      {/* Team Roster Export Modal */}
      <TeamRosterModal
        isOpen={isRosterOpen}
        onClose={() => setIsRosterOpen(false)}
        teammates={teammates}
      />

    </div>
  );
}
