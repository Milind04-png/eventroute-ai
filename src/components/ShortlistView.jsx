import React, { useState } from "react";
import { 
  BookmarkCheck, 
  Sparkles, 
  Calendar, 
  MapPin, 
  Award, 
  ExternalLink, 
  FileText, 
  Zap, 
  Trash2, 
  Flame, 
  Search,
  CheckCircle2,
  AlertTriangle,
  Compass
} from "lucide-react";

export default function ShortlistView({ 
  shortlist = [], 
  onRemoveFromShortlist, 
  onGenerateOD, 
  onOpenSkillGap, 
  onOpenDetails,
  onGoToSwipeDeck 
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [cityFilter, setCityFilter] = useState("All");

  const filtered = shortlist.filter(e => {
    const matchesSearch = e.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (e.tags || []).some(t => t.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (e.required_skills || []).some(s => s.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCity = cityFilter === "All" || e.city === cityFilter;
    return matchesSearch && matchesCity;
  });

  const cities = ["All", ...new Set(shortlist.map(e => e.city).filter(Boolean))];

  return (
    <div className="space-y-6">
      
      {/* Top Header & Metrics Banner */}
      <div className="bg-white p-6 sm:p-7 rounded-3xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
              <BookmarkCheck className="w-4 h-4" />
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
              Personalized Opportunity Vault
            </span>
          </div>
          <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-[#0F172A]">
            My Shortlisted Opportunities
          </h2>
          <p className="text-xs sm:text-sm text-[#64748B] mt-1">
            Events saved via Swipe-to-Discover. Pre-cleared for On-Duty (OD) attendance leave.
          </p>
        </div>

        {/* Stats Pill & Discover Deck Shortcut */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="px-4 py-2 rounded-2xl bg-slate-50 border border-slate-200 text-center">
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Shortlisted</p>
            <p className="font-display font-extrabold text-xl text-emerald-600">{shortlist.length}</p>
          </div>

          <button
            onClick={onGoToSwipeDeck}
            className="px-5 py-3 rounded-2xl bg-rose-500 hover:bg-rose-600 text-white font-bold text-xs flex items-center gap-2 shadow-md shadow-rose-500/20 transition active:scale-95 cursor-pointer"
          >
            <Flame className="w-4 h-4 fill-white" />
            <span>Discover More in Swipe Deck</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      {shortlist.length > 0 && (
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by title, skills, tags..."
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-[#0F172A] placeholder-slate-400 focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400 font-medium">City:</span>
            <select
              value={cityFilter}
              onChange={(e) => setCityFilter(e.target.value)}
              className="px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-[#0F172A] focus:outline-none"
            >
              {cities.map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
        </div>
      )}

      {/* Shortlist Events Grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((event) => {
            const aiScore = event.ai_match?.match_percentage || 88;
            const worthIt = event.worth_it_score || 8.5;
            const hasClash = event.ai_match?.has_clash;

            return (
              <div
                key={event.id}
                className="rounded-3xl bg-white border border-slate-200/90 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all p-5 flex flex-col justify-between space-y-4 group"
              >
                {/* Top Badge & Match Score */}
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200 flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-emerald-600" />
                      <span>{aiScore}% AI MATCH</span>
                    </span>

                    <button
                      onClick={() => onRemoveFromShortlist(event.id)}
                      title="Remove from shortlist"
                      className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Title & Organizer */}
                  <div className="text-[10px] font-bold uppercase tracking-wider text-[#64748B] mb-0.5">
                    {event.organizer}
                  </div>
                  <h3 
                    onClick={() => onOpenDetails(event)}
                    className="font-display font-bold text-lg text-[#0F172A] hover:text-emerald-700 transition cursor-pointer line-clamp-2"
                  >
                    {event.title}
                  </h3>

                  {/* Location & Dates */}
                  <div className="flex flex-wrap items-center gap-2 mt-2 text-[11px] text-[#64748B]">
                    <span className="flex items-center gap-1 bg-slate-50 px-2 py-0.5 rounded border border-slate-200">
                      <MapPin className="w-3 h-3 text-emerald-600" />
                      <span>{event.city}</span>
                    </span>
                    <span className="flex items-center gap-1 bg-slate-50 px-2 py-0.5 rounded border border-slate-200">
                      <Calendar className="w-3 h-3 text-indigo-500" />
                      <span>{event.start_date}</span>
                    </span>
                    <span className="flex items-center gap-1 bg-amber-50 text-amber-800 px-2 py-0.5 rounded border border-amber-200 font-bold">
                      <Award className="w-3 h-3 text-amber-500" />
                      <span>Worth: {worthIt}/100</span>
                    </span>
                  </div>

                  {/* Exam Clash Status */}
                  {hasClash ? (
                    <div className="mt-2 text-[11px] font-semibold text-rose-600 bg-rose-50 px-2.5 py-1 rounded-lg border border-rose-200 flex items-center gap-1.5">
                      <AlertTriangle className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                      <span className="truncate">Collides with semester exam</span>
                    </div>
                  ) : (
                    <div className="mt-2 text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200 flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>Zero timetable clash</span>
                    </div>
                  )}

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1 mt-3">
                    {(event.tags || []).slice(0, 3).map((t, i) => (
                      <span key={i} className="text-[10px] px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-medium">
                        #{t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bottom Actions Row */}
                <div className="space-y-2 pt-3 border-t border-slate-100">
                  <div className="grid grid-cols-2 gap-2">
                    {/* Skill Gap Button */}
                    <button
                      onClick={() => onOpenSkillGap(event.id)}
                      className="px-3 py-2 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold text-xs flex items-center justify-center gap-1.5 transition cursor-pointer border border-indigo-200"
                    >
                      <Zap className="w-3.5 h-3.5 fill-indigo-600" />
                      <span>Skill Gap</span>
                    </button>

                    {/* Official Registration Link */}
                    <a
                      href={event.registration_link || "https://unstop.com"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs flex items-center justify-center gap-1.5 transition"
                    >
                      <span>Register</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>

                  {/* 1-Click OD Letter Clearance */}
                  <button
                    onClick={() => onGenerateOD(event.id)}
                    className="w-full px-3 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 active:scale-98 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition cursor-pointer"
                  >
                    <FileText className="w-4 h-4" />
                    <span>Generate Official OD Letter</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Empty State */
        <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center max-w-lg mx-auto space-y-4">
          <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
            <BookmarkCheck className="w-8 h-8" />
          </div>
          <div>
            <h3 className="font-display font-extrabold text-xl text-[#0F172A]">
              Your Shortlist is Empty
            </h3>
            <p className="text-xs text-[#64748B] mt-1 leading-relaxed">
              Use the Tinder-style Swipe-to-Discover deck to swipe right on events you love! Every right swipe instantly saves them here.
            </p>
          </div>
          <button
            onClick={onGoToSwipeDeck}
            className="px-6 py-2.5 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs flex items-center gap-2 mx-auto shadow-md transition active:scale-95 cursor-pointer"
          >
            <Flame className="w-4 h-4 fill-white" />
            <span>Launch Swipe Discover Deck</span>
          </button>
        </div>
      )}

    </div>
  );
}
