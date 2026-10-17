import React, { useState } from "react";
import { Users, Sparkles, CheckCircle2, UserPlus, MessageSquare, ShieldCheck } from "lucide-react";
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
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center border border-indigo-500/30">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <h2 className="font-display font-bold text-xl text-white">Cross-College Teammate Discovery</h2>
            <p className="text-xs text-slate-400">
              AI skill synergy matching: Pairs your FastAPI & React stack with complementary ML & Hardware engineers.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-semibold flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4" />
            Verified GitHub & College IDs
          </span>
        </div>
      </div>

      {/* Teammate Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {teammates.map((tm) => {
          const isInvited = invited[tm.id];
          const isHighlighted = targetTeammate?.id === tm.id;

          return (
            <div 
              key={tm.id}
              className={`p-5 rounded-2xl border transition-all flex flex-col justify-between ${
                isHighlighted
                  ? "bg-slate-900 border-indigo-500 ring-2 ring-indigo-500/40 glow-indigo"
                  : "bg-slate-900/90 border-slate-800 hover:border-slate-700"
              }`}
            >
              <div>
                {/* Synergy Score Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden ring-2 ring-indigo-500/30 bg-slate-800">
                    <img src={tm.avatar} alt={tm.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="px-2.5 py-1 rounded-xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-xs font-bold flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{tm.synergy_score}% Synergy</span>
                  </div>
                </div>

                {/* Profile Details */}
                <h3 className="font-display font-bold text-base text-slate-100">{tm.name}</h3>
                <p className="text-xs text-indigo-400 font-medium mb-1">{tm.branch}</p>
                <p className="text-xs text-slate-400 mb-3">{tm.college}</p>

                {/* Seeking Track */}
                <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800/80 mb-3 text-xs">
                  <span className="text-[10px] uppercase font-bold text-slate-500 block mb-0.5">Looking For:</span>
                  <p className="text-slate-300 font-medium">{tm.looking_for}</p>
                </div>

                {/* AI Synergy Rationale */}
                <p className="text-xs text-slate-400 italic mb-4 leading-relaxed">
                  "{tm.synergy_reason}"
                </p>

                {/* Skills Tags */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {tm.skills.map((s, idx) => (
                    <span key={idx} className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 border border-slate-700/60">
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Invite Button */}
              <button
                onClick={() => handleInvite(tm.id)}
                disabled={isInvited}
                className={`w-full py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition ${
                  isInvited
                    ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 cursor-default"
                    : "bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-600/20 active:scale-95"
                }`}
              >
                {isInvited ? (
                  <>
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Invite Sent to Workspace ✓</span>
                  </>
                ) : (
                  <>
                    <UserPlus className="w-3.5 h-3.5" />
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
