import React from "react";
import { 
  LayoutDashboard, 
  Sparkles, 
  Calendar, 
  FileText, 
  BookOpen, 
  Briefcase, 
  Users, 
  Lightbulb, 
  Building2, 
  Settings, 
  LogOut,
  Compass,
  CheckCircle2,
  Flame,
  BookmarkCheck
} from "lucide-react";

export default function MedixSidebar({ activeTab, setActiveTab, shortlistCount = 0 }) {
  const navItems = [
    { id: "feed", label: "Dashboard", icon: LayoutDashboard },
    { id: "swipe", label: "Swipe Discover", icon: Flame, badge: "AI" },
    { id: "shortlist", label: "My Shortlist", icon: BookmarkCheck, count: shortlistCount },
    { id: "opportunities", label: "Opportunities", icon: Compass },
    { id: "calendar", label: "Exam & Calendar", icon: Calendar },
    { id: "od_letters", label: "OD Leave Letters", icon: FileText },
    { id: "skills", label: "Skill-Gap Vault", icon: BookOpen },
    { id: "colleges", label: "Partner Colleges", icon: Building2 },
    { id: "teammates", label: "Teammate Match", icon: Users },
    { id: "portfolio", label: "Verified Portfolio", icon: Briefcase },
    { id: "validator", label: "Idea Validator", icon: Lightbulb }
  ];

  return (
    <aside className="w-64 bg-white/95 backdrop-blur-xl border-r border-[#E2E7FA] min-h-screen flex flex-col justify-between shrink-0 select-none shadow-[2px_0_20px_rgba(89,100,254,0.03)]">
      
      {/* Brand Header */}
      <div>
        <div className="p-5 flex items-center gap-3 border-b border-[#F0F3FD]">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#5964FE] to-[#7B73FE] text-white flex items-center justify-center shadow-md shadow-[#5964FE]/25">
            <Compass className="w-5 h-5 stroke-[2.5]" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-display font-extrabold text-xl tracking-tight text-[#10174D]">
                EVENT<span className="text-[#5964FE]">ROUTE</span>
              </span>
            </div>
            <p className="text-[11px] text-[#525A8B] font-medium -mt-0.5">
              Your Career, Connected.
            </p>
          </div>
        </div>

        {/* Navigation List */}
        <nav className="p-3 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id || (item.id === "feed" && activeTab === "feed");

            return (
              <button
                key={item.id}
                onClick={() => {
                  if (item.onClick) {
                    item.onClick();
                  } else {
                    setActiveTab(item.id);
                  }
                }}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  isActive
                    ? "bg-[#DFE3FF] text-[#434EEB] shadow-xs font-bold"
                    : "text-[#525A8B] hover:bg-[#F1F4FE] hover:text-[#10174D]"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${isActive ? "text-[#434EEB]" : item.id === "swipe" ? "text-[#8C52FF]" : "text-[#8E9BBF]"}`} />
                  <span>{item.label}</span>
                </div>

                {item.badge && (
                  <span className="text-[9px] font-black px-1.5 py-0.5 rounded-md bg-gradient-to-r from-[#5964FE] to-[#8C6DFE] text-white shadow-xs">
                    {item.badge}
                  </span>
                )}

                {item.count > 0 && (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#DFE3FF] text-[#434EEB]">
                    {item.count}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom Footer Actions */}
      <div className="p-4 border-t border-[#F0F3FD] space-y-1">
        <button 
          onClick={() => alert("Settings panel: College ERP & Notification preferences.")}
          className="w-full flex items-center gap-3 px-3.5 py-2 rounded-xl text-xs font-semibold text-[#525A8B] hover:text-[#10174D] hover:bg-[#F1F4FE] transition cursor-pointer"
        >
          <Settings className="w-4 h-4 text-[#8E9BBF]" />
          <span>Settings</span>
        </button>

        <button 
          onClick={() => alert("Logged in as Milind (2nd Year, Delhi Technical Campus).")}
          className="w-full flex items-center gap-3 px-3.5 py-2 rounded-xl text-xs font-semibold text-[#525A8B] hover:text-[#434EEB] hover:bg-[#DFE3FF]/50 transition cursor-pointer"
        >
          <LogOut className="w-4 h-4 text-[#8E9BBF]" />
          <span>Profile Info</span>
        </button>
      </div>

    </aside>
  );
}
