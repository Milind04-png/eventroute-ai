import React from "react";
import { Building2, ShieldCheck, CheckCircle2, Award, ExternalLink, Sparkles } from "lucide-react";

export const COLLEGES_DATA = [
  {
    id: "tsec",
    name: "Thadomal Shahani Engineering College",
    shortName: "TSEC Mumbai",
    university: "University of Mumbai",
    location: "Bandra, Mumbai",
    flagshipFest: "HackTSEC & Rubix",
    color: "from-blue-600 to-indigo-700",
    bgColor: "bg-blue-50 text-blue-700 border-blue-200",
    odStatus: "100% Fast-Track OD Approved",
    isHomeCollege: true,
    logoLetter: "TS",
    logoUrl: "/logos/tsec.jpg"
  },
  {
    id: "iitb",
    name: "Indian Institute of Technology Bombay",
    shortName: "IIT Bombay",
    university: "Institute of National Importance",
    location: "Powai, Mumbai",
    flagshipFest: "Techfest & E-Summit",
    color: "from-amber-600 to-orange-700",
    bgColor: "bg-amber-50 text-amber-800 border-amber-200",
    odStatus: "Flagship National Partner",
    logoLetter: "IITB",
    logoUrl: "/logos/iitb.svg"
  },
  {
    id: "coep",
    name: "COEP Technological University",
    shortName: "COEP Tech Pune",
    university: "State Unitary University",
    location: "Shivajinagar, Pune",
    flagshipFest: "MindSpark & HackAI",
    color: "from-emerald-600 to-teal-700",
    bgColor: "bg-emerald-50 text-emerald-800 border-emerald-200",
    odStatus: "Pre-Approved Inter-City OD",
    logoLetter: "COEP",
    logoUrl: "/logos/coep.jpg"
  },
  {
    id: "vjti",
    name: "Veermata Jijabai Technological Institute",
    shortName: "VJTI Mumbai",
    university: "Autonomous (Mumbai University)",
    location: "Matunga, Mumbai",
    flagshipFest: "Technovanza & Pratibimb",
    color: "from-purple-600 to-indigo-800",
    bgColor: "bg-purple-50 text-purple-800 border-purple-200",
    odStatus: "Autonomous Board Verified",
    logoLetter: "VJTI",
    logoUrl: "/logos/vjti.png"
  },
  {
    id: "rvce",
    name: "R.V. College of Engineering",
    shortName: "RVCE Bengaluru",
    university: "VTU Belagavi",
    location: "Mysore Road, Bengaluru",
    flagshipFest: "8th Mile & RVCE Hack",
    color: "from-rose-600 to-pink-700",
    bgColor: "bg-rose-50 text-rose-800 border-rose-200",
    odStatus: "VTU Form-B Verified",
    logoLetter: "RVCE",
    logoUrl: "/logos/rvce.png"
  },
  {
    id: "ceg",
    name: "College of Engineering, Guindy",
    shortName: "CEG Chennai",
    university: "Anna University",
    location: "Guindy, Chennai",
    flagshipFest: "Kurukshetra (UNESCO Patron)",
    color: "from-cyan-600 to-blue-800",
    bgColor: "bg-cyan-50 text-cyan-800 border-cyan-200",
    odStatus: "Anna Univ Format Verified",
    logoLetter: "CEG",
    logoUrl: "/logos/ceg.png"
  },
  {
    id: "dtu",
    name: "Delhi Technological University",
    shortName: "DTU Delhi",
    university: "State University of Delhi",
    location: "Bawana Road, Delhi",
    flagshipFest: "Invictus & Vihaan Hack",
    color: "from-red-600 to-rose-800",
    bgColor: "bg-red-50 text-red-800 border-red-200",
    odStatus: "Verified Partner Campus",
    logoLetter: "DTU",
    logoUrl: "/logos/dtu.png"
  },
  {
    id: "bits",
    name: "BITS Pilani",
    shortName: "BITS Pilani",
    university: "Deemed University",
    location: "Pilani / Goa / Hyderabad",
    flagshipFest: "APOGEE & Conquest",
    color: "from-indigo-600 to-blue-900",
    bgColor: "bg-indigo-50 text-indigo-800 border-indigo-200",
    odStatus: "100% Digital OD Accepted",
    logoLetter: "BITS",
    logoUrl: "/logos/bits.svg"
  }
];

export default function CollegeLogosSection({ onSelectCollege, activeCollegeFilter }) {
  return (
    <div className="space-y-4">
      
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="font-display font-extrabold text-xl text-[#0F172A] flex items-center gap-2">
              <Building2 className="w-5 h-5 text-emerald-600" />
              Verified Partner Colleges & Institutional Crests
            </h2>
            <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
              8 Campuses
            </span>
          </div>
          <p className="text-xs text-[#64748B] mt-0.5">
            Partner colleges with pre-approved On-Duty (OD) acceptance and verified hackathon hubs.
          </p>
        </div>

        {activeCollegeFilter && (
          <button
            onClick={() => onSelectCollege(null)}
            className="text-xs font-bold text-emerald-600 hover:text-emerald-700 transition self-start"
          >
            Clear college filter ({activeCollegeFilter})
          </button>
        )}
      </div>

      {/* College Logos Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
        {COLLEGES_DATA.map((col) => {
          const isSelected = activeCollegeFilter === col.shortName;

          return (
            <div
              key={col.id}
              onClick={() => onSelectCollege && onSelectCollege(col.shortName)}
              className={`p-3.5 rounded-2xl border transition-all duration-200 flex flex-col items-center text-center justify-between cursor-pointer group ${
                isSelected
                  ? "bg-emerald-50 border-emerald-500 shadow-sm ring-2 ring-emerald-400"
                  : "bg-white border-[#E2E8F0] hover:border-emerald-300 hover:shadow-md hover:-translate-y-0.5"
              }`}
            >
              {/* College Official Logo / Crest */}
              <div className="w-14 h-14 rounded-2xl bg-white border border-slate-200/80 shadow-xs p-1.5 flex items-center justify-center mb-2 group-hover:scale-105 group-hover:shadow-md transition-all shrink-0">
                <img
                  src={col.logoUrl}
                  alt={`${col.shortName} official logo`}
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                    if (e.currentTarget.nextElementSibling) {
                      e.currentTarget.nextElementSibling.style.display = "flex";
                    }
                  }}
                />
                <div 
                  className={`hidden w-full h-full rounded-xl bg-gradient-to-tr ${col.color} text-white font-extrabold text-xs items-center justify-center shadow-xs`}
                >
                  {col.logoLetter}
                </div>
              </div>

              {/* Names */}
              <div className="w-full">
                <h4 className="font-display font-bold text-xs text-[#0F172A] truncate">
                  {col.shortName}
                </h4>
                <p className="text-[10px] text-[#64748B] truncate mt-0.5">
                  {col.flagshipFest}
                </p>
              </div>

              {/* OD Acceptance Badge */}
              <div className="mt-2 w-full">
                <span className={`block w-full text-[9px] font-bold py-0.5 px-1 rounded truncate border ${col.bgColor}`}>
                  {col.isHomeCollege ? "★ Your College" : "OD Verified"}
                </span>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}
