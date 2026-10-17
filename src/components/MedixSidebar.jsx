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
  CheckCircle2
} from "lucide-react";

export default function MedixSidebar({ activeTab, setActiveTab }) {
  const navItems = [
    { id: "feed", label: "Dashboard", icon: LayoutDashboard },
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
    <aside className="w-64 bg-white border-r border-[#E2E8F0] min-h-screen flex flex-col justify-between shrink-0 select-none">
      
      {/* Brand Header */}
      <div>
        <div className="p-5 flex items-center gap-3 border-b border-[#F1F5F9]">
          <div className="w-10 h-10 rounded-2xl bg-emerald-500 text-white flex items-center justify-center shadow-md shadow-emerald-500/20">
            <Compass className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-display font-extrabold text-xl tracking-tight text-[#0F172A]">
                EVENT<span className="text-emerald-600">ROUTE</span>
              </span>
            </div>
            <p className="text-[11px] text-[#64748B] font-medium -mt-0.5">
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
                    ? "bg-[#E6F7F0] text-emerald-800 shadow-xs"
                    : "text-[#475569] hover:bg-[#F8FAFC] hover:text-[#0F172A]"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${isActive ? "text-emerald-600" : "text-[#64748B]"}`} />
                  <span>{item.label}</span>
                </div>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom Footer Actions */}
      <div className="p-4 border-t border-[#F1F5F9] space-y-1">
        <button 
          onClick={() => alert("Settings panel: College ERP & Notification preferences.")}
          className="w-full flex items-center gap-3 px-3.5 py-2 rounded-xl text-xs font-semibold text-[#64748B] hover:text-[#0F172A] hover:bg-[#F8FAFC] transition cursor-pointer"
        >
          <Settings className="w-4 h-4 text-slate-400" />
          <span>Settings</span>
        </button>

        <button 
          onClick={() => alert("Logged in as Milind (2nd Year, TSEC Mumbai).")}
          className="w-full flex items-center gap-3 px-3.5 py-2 rounded-xl text-xs font-semibold text-[#64748B] hover:text-rose-600 hover:bg-rose-50 transition cursor-pointer"
        >
          <LogOut className="w-4 h-4 text-slate-400" />
          <span>Profile Info</span>
        </button>
      </div>

    </aside>
  );
}
