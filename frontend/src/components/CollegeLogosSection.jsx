import React, { useState } from "react";
import { Building2, ShieldCheck, CheckCircle2, Award, ExternalLink, Sparkles, Filter, Check, School } from "lucide-react";

export const COLLEGES_DATA = [
  // --- GGSIPU Affiliated & University Schools ---
  {
    id: "dtc",
    name: "Delhi Technical Campus",
    shortName: "DTC Greater Noida",
    filterKey: "DTC",
    category: "ggsipu",
    university: "Guru Gobind Singh Indraprastha University (GGSIPU)",
    location: "Knowledge Park III, Greater Noida",
    flagshipFest: "TechSpark & Ignite",
    color: "from-blue-600 to-indigo-700",
    bgColor: "bg-blue-50 text-blue-700 border-blue-200",
    odStatus: "100% Fast-Track OD Approved",
    isHomeCollege: true,
    logoLetter: "DTC",
    logoUrl: "/logos/dtc.png",
    description: "Milind's home college. Direct automated OD issuance with Dean & HOD digital signatures."
  },
  {
    id: "ggsipu",
    name: "USICT, GGSIPU Main Campus",
    shortName: "USICT Dwarka",
    filterKey: "USICT",
    category: "ggsipu",
    university: "Guru Gobind Singh Indraprastha University (Main Campus)",
    location: "Sector 16-C, Dwarka, New Delhi",
    flagshipFest: "InfoXpression & Anugoonj",
    color: "from-amber-600 to-yellow-700",
    bgColor: "bg-amber-50 text-amber-800 border-amber-200",
    odStatus: "University Main Campus OD",
    logoLetter: "IPU",
    logoUrl: "/logos/ggsipu.png",
    description: "Apex technology school of GGSIPU. Organizers of North India's premier InfoXpression hackathon."
  },
  {
    id: "mait",
    name: "Maharaja Agrasen Institute of Technology",
    shortName: "MAIT Rohini",
    filterKey: "MAIT",
    category: "ggsipu",
    university: "Guru Gobind Singh Indraprastha University (GGSIPU)",
    location: "Sector 22, Rohini, Delhi",
    flagshipFest: "HackMAIT & TechSurge",
    color: "from-emerald-600 to-teal-700",
    bgColor: "bg-emerald-50 text-emerald-800 border-emerald-200",
    odStatus: "Fast-Track OD Approved",
    logoLetter: "MAIT",
    logoUrl: "/logos/mait.svg",
    description: "Premier engineering institution of GGSIPU, host to 36-hour HackMAIT innovation sprints."
  },
  {
    id: "msit",
    name: "Maharaja Surajmal Institute of Technology",
    shortName: "MSIT Janakpuri",
    filterKey: "MSIT",
    category: "ggsipu",
    university: "Guru Gobind Singh Indraprastha University (GGSIPU)",
    location: "C-4, Janakpuri, New Delhi",
    flagshipFest: "HackMSIT & Avensis",
    color: "from-blue-700 to-indigo-900",
    bgColor: "bg-blue-50 text-blue-800 border-blue-200",
    odStatus: "Fast-Track OD Approved",
    logoLetter: "MSIT",
    logoUrl: "/logos/msit.png",
    description: "Top-tier GGSIPU campus renowned for IEEE MSIT hackathons and competitive programming."
  },
  {
    id: "bvcoe",
    name: "Bharati Vidyapeeth's College of Engineering",
    shortName: "BVCOE New Delhi",
    filterKey: "BVCOE",
    category: "ggsipu",
    university: "Guru Gobind Singh Indraprastha University (GGSIPU)",
    location: "A-4, Paschim Vihar, New Delhi",
    flagshipFest: "BVEST & HackBVEST",
    color: "from-red-600 to-rose-700",
    bgColor: "bg-red-50 text-red-800 border-red-200",
    odStatus: "Fast-Track OD Approved",
    logoLetter: "BVCOE",
    logoUrl: "/logos/bvcoe.png",
    description: "Premier west Delhi tech campus hosting BVEST national hackathons and robotics cups."
  },
  {
    id: "bpit",
    name: "Bhagwan Parshuram Institute of Technology",
    shortName: "BPIT Rohini",
    filterKey: "BPIT",
    category: "ggsipu",
    university: "Guru Gobind Singh Indraprastha University (GGSIPU)",
    location: "Sector 17, Rohini, Delhi",
    flagshipFest: "Corona & HackBPIT",
    color: "from-yellow-600 to-amber-700",
    bgColor: "bg-yellow-50 text-yellow-800 border-yellow-200",
    odStatus: "Fast-Track OD Approved",
    logoLetter: "BPIT",
    logoUrl: "/logos/bpit.jpg",
    description: "Established GGSIPU institute hosting Corona annual national hackathon and Web3 sprints."
  },
  {
    id: "gtbit",
    name: "Guru Tegh Bahadur Institute of Technology",
    shortName: "GTBIT Rajouri",
    filterKey: "GTBIT",
    category: "ggsipu",
    university: "Guru Gobind Singh Indraprastha University (GGSIPU)",
    location: "Rajouri Garden, New Delhi",
    flagshipFest: "Gates & HackGTBIT",
    color: "from-sky-600 to-cyan-700",
    bgColor: "bg-sky-50 text-sky-800 border-sky-200",
    odStatus: "Fast-Track OD Approved",
    logoLetter: "GTBIT",
    logoUrl: "/logos/gtbit.png",
    description: "Prominent GGSIPU college in Central Delhi hosting Gates tech fest and cybersecurity marathons."
  },
  {
    id: "vips",
    name: "Vivekananda Institute of Professional Studies - TC",
    shortName: "VIPS Pitampura",
    filterKey: "VIPS",
    category: "ggsipu",
    university: "Guru Gobind Singh Indraprastha University (GGSIPU)",
    location: "Pitampura, New Delhi",
    flagshipFest: "Init_ & HackVIPS",
    color: "from-purple-600 to-pink-700",
    bgColor: "bg-purple-50 text-purple-800 border-purple-200",
    odStatus: "Fast-Track OD Approved",
    logoLetter: "VIPS",
    logoUrl: "/logos/vips.png",
    description: "School of Engineering & Technology known for Init_ AI hackathons and modern design sprints."
  },
  {
    id: "adgitm",
    name: "Dr. Akhilesh Das Gupta Institute of Tech & Mgmt",
    shortName: "ADGITM Shastri Park",
    filterKey: "ADGITM",
    category: "ggsipu",
    university: "Guru Gobind Singh Indraprastha University (GGSIPU)",
    location: "Shastri Park, Delhi",
    flagshipFest: "InnoBuzz & HackADGITM",
    color: "from-indigo-600 to-violet-800",
    bgColor: "bg-indigo-50 text-indigo-800 border-indigo-200",
    odStatus: "Fast-Track OD Approved",
    logoLetter: "ADG",
    logoUrl: "/logos/adgitm.png",
    description: "ADGIPS / ADGITM campus hosting InnoBuzz annual AI & smart city solution challenges."
  },
  {
    id: "jims",
    name: "JIMS Engineering Management Tech Campus",
    shortName: "JIMS Greater Noida",
    filterKey: "JIMS",
    category: "ggsipu",
    university: "Guru Gobind Singh Indraprastha University (GGSIPU)",
    location: "Knowledge Park III, Greater Noida",
    flagshipFest: "TechnoXian & HackJIMS",
    color: "from-teal-600 to-emerald-700",
    bgColor: "bg-teal-50 text-teal-800 border-teal-200",
    odStatus: "Fast-Track OD Approved",
    logoLetter: "JIMS",
    logoUrl: "/logos/jims.png",
    description: "Knowledge Park campus partner hosting TechnoXian hardware and robotics hackathons."
  },
  {
    id: "hmritm",
    name: "HMR Institute of Technology & Management",
    shortName: "HMRITM Hamidpur",
    filterKey: "HMRITM",
    category: "ggsipu",
    university: "Guru Gobind Singh Indraprastha University (GGSIPU)",
    location: "Hamidpur, North Delhi",
    flagshipFest: "Emblazon & HackHMR",
    color: "from-slate-600 to-gray-800",
    bgColor: "bg-slate-50 text-slate-800 border-slate-200",
    odStatus: "Fast-Track OD Approved",
    logoLetter: "HMR",
    logoUrl: "/logos/hmritm.png",
    description: "North Delhi GGSIPU campus conducting Emblazon hackathon and open innovation leagues."
  },

  // --- National Flagship Partner Campuses ---
  {
    id: "iitb",
    name: "Indian Institute of Technology Bombay",
    shortName: "IIT Bombay",
    filterKey: "IIT Bombay",
    category: "flagship",
    university: "Institute of National Importance",
    location: "Powai, Mumbai",
    flagshipFest: "Techfest & E-Summit",
    color: "from-amber-600 to-orange-700",
    bgColor: "bg-amber-50 text-amber-800 border-amber-200",
    odStatus: "Flagship National Partner",
    logoLetter: "IITB",
    logoUrl: "/logos/iitb.svg",
    description: "Asia's largest science and tech festival hackathon with top recruiters and research labs."
  },
  {
    id: "dtu",
    name: "Delhi Technological University",
    shortName: "DTU Delhi",
    filterKey: "DTU",
    category: "flagship",
    university: "State University of Delhi",
    location: "Bawana Road, Delhi",
    flagshipFest: "Invictus & Vihaan Hack",
    color: "from-red-600 to-rose-800",
    bgColor: "bg-red-50 text-red-800 border-red-200",
    odStatus: "Verified Partner Campus",
    logoLetter: "DTU",
    logoUrl: "/logos/dtu.png",
    description: "Delhi's flagship technological university hosting Vihaan hackathon and Invictus conclave."
  },
  {
    id: "bits",
    name: "BITS Pilani",
    shortName: "BITS Pilani",
    filterKey: "BITS",
    category: "flagship",
    university: "Institute of Eminence",
    location: "Pilani / Goa / Hyderabad",
    flagshipFest: "APOGEE & Conquest",
    color: "from-indigo-600 to-blue-900",
    bgColor: "bg-indigo-50 text-indigo-800 border-indigo-200",
    odStatus: "100% Digital OD Accepted",
    logoLetter: "BITS",
    logoUrl: "/logos/bits.svg",
    description: "Premier private technical university hosting APOGEE and Conquest startup challenge."
  },
  {
    id: "coep",
    name: "COEP Technological University",
    shortName: "COEP Tech Pune",
    filterKey: "COEP",
    category: "flagship",
    university: "State Unitary University",
    location: "Shivajinagar, Pune",
    flagshipFest: "MindSpark & HackAI",
    color: "from-emerald-600 to-teal-700",
    bgColor: "bg-emerald-50 text-emerald-800 border-emerald-200",
    odStatus: "Pre-Approved Inter-City OD",
    logoLetter: "COEP",
    logoUrl: "/logos/coep.jpg",
    description: "One of India's oldest engineering institutions, home to HackAI Pune 2026."
  },
  {
    id: "vjti",
    name: "Veermata Jijabai Technological Institute",
    shortName: "VJTI Mumbai",
    filterKey: "VJTI",
    category: "flagship",
    university: "Autonomous (Mumbai University)",
    location: "Matunga, Mumbai",
    flagshipFest: "Technovanza & Pratibimb",
    color: "from-purple-600 to-indigo-800",
    bgColor: "bg-purple-50 text-purple-800 border-purple-200",
    odStatus: "Autonomous Board Verified",
    logoLetter: "VJTI",
    logoUrl: "/logos/vjti.png",
    description: "Host of National Autonomous Rover Challenge and Technovanza engineering fest."
  },
  {
    id: "rvce",
    name: "R.V. College of Engineering",
    shortName: "RVCE Bengaluru",
    filterKey: "RVCE",
    category: "flagship",
    university: "VTU Belagavi",
    location: "Mysore Road, Bengaluru",
    flagshipFest: "8th Mile & RVCE Hack",
    color: "from-rose-600 to-pink-700",
    bgColor: "bg-rose-50 text-rose-800 border-rose-200",
    odStatus: "VTU Form-B Verified",
    logoLetter: "RVCE",
    logoUrl: "/logos/rvce.png",
    description: "Silicon Valley of India tech hub hosting 8th Mile hackathon with Bengaluru startups."
  },
  {
    id: "ceg",
    name: "College of Engineering, Guindy",
    shortName: "CEG Chennai",
    filterKey: "CEG",
    category: "flagship",
    university: "Anna University",
    location: "Guindy, Chennai",
    flagshipFest: "Kurukshetra (UNESCO Patron)",
    color: "from-cyan-600 to-blue-800",
    bgColor: "bg-cyan-50 text-cyan-800 border-cyan-200",
    odStatus: "Anna Univ Format Verified",
    logoLetter: "CEG",
    logoUrl: "/logos/ceg.png",
    description: "Pioneering technical institute hosting Kurukshetra under UNESCO patronage."
  },
  {
    id: "tsec",
    name: "Thadomal Shahani Engineering College",
    shortName: "TSEC Mumbai",
    filterKey: "TSEC",
    category: "flagship",
    university: "University of Mumbai",
    location: "Bandra, Mumbai",
    flagshipFest: "HackTSEC & Rubix",
    color: "from-sky-600 to-blue-700",
    bgColor: "bg-sky-50 text-sky-700 border-sky-200",
    odStatus: "OD Verified Partner",
    logoLetter: "TS",
    logoUrl: "/logos/tsec.jpg",
    description: "Premier Mumbai institute hosting HackTSEC and Web3 developer sprints."
  }
];

export default function CollegeLogosSection({ onSelectCollege, activeCollegeFilter }) {
  const [selectedCategory, setSelectedCategory] = useState("ggsipu");

  const filteredColleges = COLLEGES_DATA.filter((col) => {
    if (selectedCategory === "all") return true;
    return col.category === selectedCategory;
  });

  const ggsipuCount = COLLEGES_DATA.filter(c => c.category === "ggsipu").length;
  const flagshipCount = COLLEGES_DATA.filter(c => c.category === "flagship").length;

  return (
    <div className="space-y-4">
      {/* Section Header & Category Selector */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2.5 flex-wrap">
            <h2 className="font-display font-extrabold text-xl text-[#10174D] flex items-center gap-2">
              <Building2 className="w-5 h-5 text-[#5964FE]" />
              Verified Partner Colleges & Institutional Crests
            </h2>
            <span className="text-[10px] uppercase font-bold px-2.5 py-0.5 rounded-full bg-[#DFE3FF] text-[#434EEB] border border-[#C7D2FE]">
              {COLLEGES_DATA.length} Verified Institutions
            </span>
          </div>
          <p className="text-xs text-[#525A8B] mt-1">
            Tap any institution to filter campus hackathons & generate official On-Duty (OD) approval letters.
          </p>
        </div>

        {/* Category Filter Pills & Reset */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <button
            onClick={() => setSelectedCategory("ggsipu")}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              selectedCategory === "ggsipu"
                ? "bg-[#5964FE] text-white shadow-md shadow-[#5964FE]/20"
                : "bg-white/80 hover:bg-[#EEF2FE] text-[#525A8B] border border-[#E2E7FA]"
            }`}
          >
            <School className="w-3.5 h-3.5" />
            <span>GGSIPU Campuses ({ggsipuCount})</span>
          </button>

          <button
            onClick={() => setSelectedCategory("all")}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              selectedCategory === "all"
                ? "bg-[#5964FE] text-white shadow-md shadow-[#5964FE]/20"
                : "bg-white/80 hover:bg-[#EEF2FE] text-[#525A8B] border border-[#E2E7FA]"
            }`}
          >
            <span>All Campuses ({COLLEGES_DATA.length})</span>
          </button>

          <button
            onClick={() => setSelectedCategory("flagship")}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              selectedCategory === "flagship"
                ? "bg-[#5964FE] text-white shadow-md shadow-[#5964FE]/20"
                : "bg-white/80 hover:bg-[#EEF2FE] text-[#525A8B] border border-[#E2E7FA]"
            }`}
          >
            <span>National Flagships ({flagshipCount})</span>
          </button>

          {activeCollegeFilter && (
            <button
              onClick={() => onSelectCollege(null)}
              className="ml-2 px-2.5 py-1 rounded-xl bg-rose-50 text-rose-700 border border-rose-200 text-xs font-bold hover:bg-rose-100 transition cursor-pointer flex items-center gap-1"
            >
              <span>✕ Clear Filter ({activeCollegeFilter})</span>
            </button>
          )}
        </div>
      </div>

      {/* College Logos Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-11 gap-3">
        {filteredColleges.map((col) => {
          const isSelected = activeCollegeFilter === col.filterKey || activeCollegeFilter === col.shortName;

          return (
            <div
              key={col.id}
              onClick={() => {
                if (isSelected) {
                  onSelectCollege && onSelectCollege(null);
                } else {
                  onSelectCollege && onSelectCollege(col.filterKey);
                }
              }}
              className={`p-3 rounded-2xl border transition-all duration-200 flex flex-col items-center text-center justify-between cursor-pointer group relative ${
                isSelected
                  ? "bg-[#EEF2FE] border-[#5964FE] shadow-md ring-2 ring-[#5964FE]/40 -translate-y-0.5"
                  : col.isHomeCollege
                  ? "bg-gradient-to-b from-blue-50/70 to-white border-blue-300 hover:border-[#5964FE] shadow-sm hover:shadow-md hover:-translate-y-0.5"
                  : "bg-white/95 border-[#E2E7FA] hover:border-[#5964FE] hover:shadow-md hover:-translate-y-0.5"
              }`}
            >
              {/* Home College Corner Star Badge */}
              {col.isHomeCollege && (
                <div className="absolute -top-1.5 -right-1.5 bg-gradient-to-r from-amber-500 to-amber-600 text-white text-[9px] font-black px-1.5 py-0.2 rounded-full shadow-xs flex items-center gap-0.5">
                  ★ Home
                </div>
              )}

              {/* College Official Logo / Crest */}
              <div className="w-14 h-14 rounded-2xl bg-white border border-[#E2E7FA] shadow-xs p-1.5 flex items-center justify-center mb-2 group-hover:scale-105 group-hover:shadow-md transition-all shrink-0">
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
                <h4 className="font-display font-bold text-xs text-[#10174D] truncate group-hover:text-[#5964FE] transition-colors" title={col.name}>
                  {col.shortName}
                </h4>
                <p className="text-[10px] text-[#525A8B] truncate mt-0.5" title={col.flagshipFest}>
                  {col.flagshipFest}
                </p>
              </div>

              {/* OD Acceptance Badge */}
              <div className="mt-2 w-full">
                <span className={`block w-full text-[9px] font-bold py-0.5 px-1 rounded truncate border ${
                  isSelected
                    ? "bg-[#5964FE] text-white border-[#5964FE]"
                    : col.isHomeCollege 
                    ? "bg-[#DFE3FF] text-[#434EEB] border-[#C7D2FE]" 
                    : col.category === "ggsipu"
                    ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                    : "bg-[#F8FAFF] text-[#525A8B] border-[#DCE3F9]"
                }`}>
                  {isSelected ? "✓ Active Filter" : col.isHomeCollege ? "★ Your College" : col.category === "ggsipu" ? "GGSIPU OD" : "OD Verified"}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
