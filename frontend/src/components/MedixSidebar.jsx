import React from "react";
import {
  LayoutDashboard,
  Calendar,
  FileText,
  Compass,
  Flame,
  BookmarkCheck,
  Settings,
  LogOut,
  HardDrive
} from "lucide-react";

export default function MedixSidebar({ 
  activeTab, 
  setActiveTab, 
  shortlistCount = 0, 
  onOpenLocalStorageFiles 
}) {
  // Trimmed to 6 core navigation items as requested
  const coreNavItems = [
    { id: "feed", label: "Dashboard", icon: LayoutDashboard },
    { id: "swipe", label: "Swipe Discover", icon: Flame, badge: "AI" },
    { id: "shortlist", label: "My Shortlist", icon: BookmarkCheck, count: shortlistCount },
    { id: "opportunities", label: "Opportunities", icon: Compass },
    { id: "calendar", label: "Exam Guard", icon: Calendar },
    { id: "od_letters", label: "OD Leave Letters", icon: FileText }
  ];

  return (
    <aside className="w-64 bg-[#0B0F19] border-r border-[#1E293B] min-h-screen flex flex-col justify-between shrink-0 select-none shadow-[2px_0_20px_rgba(0,0,0,0.25)] text-slate-300">

      {/* Brand Header */}
      <div>
        <div className="p-5 flex items-center gap-3 border-b border-[#1E293B]">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#1E293B] to-[#0F172A] text-white flex items-center justify-center shadow-md border border-slate-700/80">
            <Compass className="w-5 h-5 stroke-[2.5] text-indigo-400" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-display font-extrabold text-xl tracking-tight text-white">
                EVENT<span className="text-indigo-400">ROUTE</span>
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-medium -mt-0.5">
              Your Career, Connected.
            </p>
          </div>
        </div>

        {/* 6 Core Navigation Items */}
        <nav className="p-3 space-y-1.5">
          {coreNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id || (item.id === "feed" && activeTab === "feed");

            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  isActive
                    ? "bg-white/10 text-white shadow-xs font-bold border border-white/10"
                    : "text-slate-400 hover:bg-white/5 hover:text-white"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${isActive ? "text-white" : item.id === "swipe" ? "text-indigo-400" : "text-slate-500"}`} />
                  <span>{item.label}</span>
                </div>

                {item.badge && (
                  <span className="text-[9px] font-black px-1.5 py-0.5 rounded-md bg-indigo-950 text-indigo-300 border border-indigo-700/50 shadow-xs">
                    {item.badge}
                  </span>
                )}

                {item.count > 0 && (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                    {item.count}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom Footer Actions */}
      <div className="p-4 border-t border-[#1E293B] space-y-1">
        <button
          onClick={onOpenLocalStorageFiles}
          className="w-full flex items-center gap-3 px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white hover:bg-white/5 transition cursor-pointer"
        >
          <HardDrive className="w-4 h-4 text-slate-500" />
          <span>Saved Offline Files</span>
        </button>

        <button
          onClick={() => alert("Settings panel: College ERP & Notification preferences.")}
          className="w-full flex items-center gap-3 px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white hover:bg-white/5 transition cursor-pointer"
        >
          <Settings className="w-4 h-4 text-slate-500" />
          <span>Settings</span>
        </button>

        <button
          onClick={() => alert("Logged in as Milind (2nd Year, Delhi Technical Campus).")}
          className="w-full flex items-center gap-3 px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white hover:bg-white/5 transition cursor-pointer"
        >
          <LogOut className="w-4 h-4 text-slate-500" />
          <span>Profile Info</span>
        </button>
      </div>

    </aside>
  );
}
