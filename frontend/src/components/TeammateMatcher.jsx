import React, { useState } from "react";
import { Users, Sparkles, CheckCircle2, UserPlus, MessageSquare, ShieldCheck, Check } from "lucide-react";
import { INITIAL_TEAMMATES } from "../data/initialEvents";

export default function TeammateMatcher({ targetTeammate }) {
  const [teammates, setTeammates] = useState(INITIAL_TEAMMATES);
  const [invited, setInvited] = useState({});

  const handleInvite = (id) => {
    setInvited(prev => ({ ...prev, [id]: true }));
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      
      {/* Header Banner */}
      <div className="p-6 sm:p-7 rounded-3xl bg-white/95 backdrop-blur-xl border border-[#E2E7FA] shadow-[0_10px_30px_rgba(89,100,254,0.05)] flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-[#DFE3FF] text-[#434EEB] flex items-center justify-center border border-[#C7D2FE]">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <h2 className="font-display font-bold text-xl text-[#10174D]">Cross-College Teammate Discovery</h2>
            <p className="text-xs text-[#525A8B] font-medium">
              AI skill synergy matching: Pairs your FastAPI & React stack with complementary ML & Hardware engineers.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs px-3 py-1.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 font-semibold flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            Verified GitHub & College IDs
          </span>
        </div>
      </div>

      {/* Teammate Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {teammates.map((tm) => {
          const isInvited = invited[tm.id];
          const isHighlighted = targetTeammate?.id === tm.id;

          return (
            <div 
              key={tm.id}
              className={`p-6 rounded-3xl bg-white/95 backdrop-blur-xl border transition-all flex flex-col justify-between shadow-[0_10px_30px_rgba(89,100,254,0.05)] ${
                isHighlighted
                  ? "border-[#5964FE] ring-2 ring-[#5964FE]/30 shadow-[0_16px_36px_rgba(89,100,254,0.15)]"
                  : "border-[#E2E7FA] hover:border-[#C7D2FE]"
              }`}
            >
              <div>
                {/* Synergy Score Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden ring-2 ring-[#DFE3FF] bg-[#F8FAFF]">
                    <img src={tm.avatar} alt={tm.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="px-2.5 py-1 rounded-xl bg-[#DFE3FF] border border-[#C7D2FE] text-[#434EEB] text-xs font-bold flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 text-[#5964FE]" />
                    <span>{tm.synergy_score}% Synergy</span>
                  </div>
                </div>

                {/* Profile Details */}
                <h3 className="font-display font-bold text-base text-[#10174D]">{tm.name}</h3>
                <p className="text-xs text-[#5964FE] font-semibold mb-0.5">{tm.branch}</p>
                <p className="text-xs text-[#525A8B] mb-3 font-medium">{tm.college}</p>

                {/* Seeking Track */}
                <div className="p-3 rounded-2xl bg-[#F8FAFF] border border-[#DCE3F9] mb-3 text-xs">
                  <span className="text-[10px] uppercase font-bold text-[#8E9BBF] block mb-0.5">Looking For:</span>
                  <p className="text-[#10174D] font-medium">{tm.looking_for}</p>
                </div>

                {/* AI Synergy Rationale */}
                <p className="text-xs text-[#525A8B] italic mb-4 leading-relaxed font-medium">
                  "{tm.synergy_reason}"
                </p>

                {/* Skills Tags */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {tm.skills.map((s, idx) => (
                    <span key={idx} className="text-[10px] font-semibold px-2 py-0.5 rounded-lg bg-[#F8FAFF] text-[#525A8B] border border-[#DCE3F9]">
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
                    <span>Invitation Sent</span>
                  </>
                ) : (
                  <>
                    <UserPlus className="w-4 h-4" />
                    <span>Invite to Hackathon Team</span>
                  </>
                )}
              </button>
            </div>
          );
        })}
      </div>

    </div>
  );
}
