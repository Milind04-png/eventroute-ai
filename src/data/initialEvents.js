/**
 * Initial Client Data Store for EventRoute AI
 * Includes full student persona, academic exams, diverse opportunities,
 * skill learning vault, and college OD templates.
 */

export const STUDENT_PROFILE = {
  id: "usr_milind_01",
  name: "Milind",
  email: "milind@tsec.edu",
  college: "Thadomal Shahani Engineering College (Mumbai University)",
  branch: "Computer Science & Engineering",
  year: "2nd Year (Semester 3)",
  roll_no: "2024CS1042",
  attendance_rate: 78.4, // Close to 75% boundary!
  skills: ["Python", "FastAPI", "React", "PostgreSQL", "Docker", "Tailwind CSS"],
  interests: ["Artificial Intelligence", "Machine Learning", "System Design", "Cloud Native"],
  github: "https://github.com/Milind04-png",
  linkedin: "https://linkedin.com/in/milind-cse",
  portfolio_slug: "milind",
  xp_points: 1420,
  completed_events_count: 4,
  badges: [
    { title: "Hackathon Finalist", event: "Mumbai Hacks 2025", date: "Jan 2025", color: "from-amber-500 to-orange-500" },
    { title: "AI Speaker Attendee", event: "PyCon India Regional", date: "Aug 2025", color: "from-indigo-500 to-purple-500" },
    { title: "Verified Peer Mentor", event: "Campus Code Lab", date: "Sep 2025", color: "from-emerald-500 to-teal-500" }
  ]
};

export const EXAM_CALENDAR = [
  {
    id: "exam_dbms",
    title: "Database Management Systems (Internal Lab Exam)",
    start_date: "2026-10-24T09:00:00",
    end_date: "2026-10-24T12:00:00",
    type: "exam",
    mandatory: true,
    location: "Lab 402",
    notes: "Mandatory physical attendance. No re-exam granted without medical approval."
  },
  {
    id: "exam_se",
    title: "Software Engineering Project Viva",
    start_date: "2026-10-25T10:00:00",
    end_date: "2026-10-25T13:00:00",
    type: "exam",
    mandatory: true,
    location: "Seminar Hall 2",
    notes: "External university evaluator present. Hard clash."
  },
  {
    id: "exam_webtech",
    title: "Web Technologies Practical Assessment",
    start_date: "2026-11-03T14:00:00",
    end_date: "2026-11-03T17:00:00",
    type: "exam",
    mandatory: true,
    location: "Computer Center 1",
    notes: "Laboratory practical examination."
  }
];

export const SKILL_LEARNING_VAULT = {
  "PyTorch": {
    est_hours: 3,
    title: "Fast Inference with PyTorch & TorchScript",
    type: "Crash Course",
    url: "https://pytorch.org/tutorials/beginner/deep_learning_60min_blitz.html",
    desc: "Hands-on guide covering tensors, autograd, and deploying pre-trained vision/NLP models in under 3 hours."
  },
  "TensorRT": {
    est_hours: 2,
    title: "NVIDIA TensorRT Deployment Quickstart",
    type: "Interactive Guide",
    url: "https://developer.nvidia.com/tensorrt",
    desc: "Optimize ONNX model weights for low-latency GPU edge inference during 24h hackathons."
  },
  "Solidity": {
    est_hours: 4,
    title: "Smart Contract Syntax & Hardhat Basics",
    type: "Hands-on Tutorial",
    url: "https://soliditylang.org/",
    desc: "Understand ERC-20 tokens, event emitters, and deploying to testnets."
  },
  "OpenCV": {
    est_hours: 2.5,
    title: "Real-time Video Stream Processing with Python",
    type: "Video Series",
    url: "https://docs.opencv.org/4.x/d6/d00/tutorial_py_root.html",
    desc: "Bounding boxes, color tracking, and camera frame feeds."
  },
  "ROS": {
    est_hours: 5,
    title: "ROS2 Humble Node Pub-Sub Fundamentals",
    type: "Workshop Slides",
    url: "https://docs.ros.org/en/humble/",
    desc: "Robotics middleware communication patterns and sensor fusion."
  },
  "Rust": {
    est_hours: 4,
    title: "Rust in a Nutshell for Systems & WASM",
    type: "Cheat Sheet",
    url: "https://www.rust-lang.org/learn",
    desc: "Ownership, borrowing, and high-performance concurrency essentials."
  },
  "Docker": {
    est_hours: 2,
    title: "Containerizing Python Microservices with Docker Compose",
    type: "Practical Guide",
    url: "https://docker.com",
    desc: "Multi-stage builds, port mappings, and caching."
  }
};

export const COLLEGE_OD_TEMPLATES = {
  "TSEC_MUMBAI": {
    college_name: "Thadomal Shahani Engineering College",
    university: "University of Mumbai",
    address: "Adv. Nari Gursahani Marg, TPS III, Bandra (West), Mumbai 400050",
    hod_name: "Dr. Tanuja K. Sarode",
    hod_title: "Head of Department, Computer Engineering",
    letter_code_prefix: "TSEC/CE/OD/2026/"
  },
  "RVCE_BLR": {
    college_name: "R.V. College of Engineering",
    university: "Visvesvaraya Technological University (VTU)",
    address: "Mysore Road, RV Vidyaniketan, Bengaluru, Karnataka 560059",
    hod_name: "Dr. B. K. Srinivas",
    hod_title: "Head of Department, Information Science & Eng.",
    letter_code_prefix: "RVCE/ISE/OD/2026/"
  },
  "CEG_ANNA": {
    college_name: "College of Engineering, Guindy",
    university: "Anna University",
    address: "Sardar Patel Road, Guindy, Chennai, Tamil Nadu 600025",
    hod_name: "Dr. S. Shanmugavel",
    hod_title: "Dean & Professor, Department of CSE",
    letter_code_prefix: "CEG/CSE/OD/2026/"
  },
  "DTU_DELHI": {
    college_name: "Delhi Technological University",
    university: "State University of Delhi",
    address: "Shahbad Daulatpur, Bawana Road, Delhi 110042",
    hod_name: "Prof. Rajeev Kapoor",
    hod_title: "HOD, Computer Science and Engineering",
    letter_code_prefix: "DTU/CSE/OD/2026/"
  }
};

export const INITIAL_EVENTS = [
  {
    id: "evt_hackai_pune_26",
    title: "HackAI Pune 2026",
    organizer: "COEP Tech & Google Cloud Student Club",
    type: "Hackathon",
    format: "In-Person (Pune)",
    city: "Pune",
    start_date: "2026-10-26T09:00:00",
    end_date: "2026-10-27T18:00:00",
    registration_deadline: "2026-10-22T23:59:00",
    prize_pool: "₹2,50,000",
    entry_fee: "Free",
    worth_it_score: 94,
    worth_it_breakdown: {
      prize_effort_ratio: 92,
      organizer_prestige: 95,
      career_impact: 96,
      certificate_value: 91
    },
    description: "36-hour flagship national AI hackathon focusing on Multimodal Agents, Healthcare Diagnostics, and Edge Inference. Mentors from Google Cloud and Microsoft. Direct fast-track interview opportunities for top 3 teams.",
    tags: ["Artificial Intelligence", "Machine Learning", "FastAPI", "Python", "Cloud Native", "Hackathon"],
    required_skills: ["Python", "FastAPI", "React", "PyTorch"],
    domains: ["Generative AI", "Healthcare AI", "Edge Computing"],
    travel_estimate: {
      origin: "Mumbai",
      destination: "Pune",
      train_bus_cost: "₹350 - ₹600",
      travel_time: "3.5 hours",
      group_pool_count: 18
    },
    verification_status: "Verified Tier-1",
    featured: true
  },
  {
    id: "evt_web3_defi_sprint",
    title: "Web3 DeFi Sprint Mumbai",
    organizer: "Polygon Guild & BuildersDAO",
    type: "Hackathon",
    format: "In-Person (Bandra, Mumbai)",
    city: "Mumbai",
    start_date: "2026-10-24T10:00:00",
    end_date: "2026-10-25T18:00:00",
    registration_deadline: "2026-10-23T18:00:00",
    prize_pool: "$5,000 USDC",
    entry_fee: "Free",
    worth_it_score: 78,
    worth_it_breakdown: {
      prize_effort_ratio: 85,
      organizer_prestige: 80,
      career_impact: 70,
      certificate_value: 75
    },
    description: "Build decentralized lending, zero-knowledge rollups, and liquidity protocols on Ethereum L2s. Requires Solidity and Web3.js experience.",
    tags: ["Web3", "Blockchain", "Solidity", "Crypto", "Hackathon"],
    required_skills: ["Solidity", "React", "Rust"],
    domains: ["DeFi", "Smart Contracts", "Cryptocurrency"],
    travel_estimate: {
      origin: "Mumbai",
      destination: "Bandra",
      train_bus_cost: "₹40",
      travel_time: "25 mins",
      group_pool_count: 8
    },
    verification_status: "Community Verified",
    featured: false
  },
  {
    id: "evt_iitb_techfest_ai",
    title: "IIT Bombay Techfest: National AI Grand Challenge",
    organizer: "IIT Bombay & NVIDIA",
    type: "Hackathon",
    format: "In-Person (Powai, Mumbai)",
    city: "Mumbai",
    start_date: "2026-11-15T08:00:00",
    end_date: "2026-11-17T20:00:00",
    registration_deadline: "2026-11-05T23:59:00",
    prize_pool: "₹5,00,000",
    entry_fee: "Free",
    worth_it_score: 98,
    worth_it_breakdown: {
      prize_effort_ratio: 97,
      organizer_prestige: 99,
      career_impact: 99,
      certificate_value: 98
    },
    description: "Asia's largest science and technology festival hackathon. Build scalable foundational models and autonomous multi-agent systems. Highest recruiter visibility across top tech unicorns and research labs.",
    tags: ["Artificial Intelligence", "Deep Learning", "System Design", "IIT Bombay", "Hackathon"],
    required_skills: ["Python", "PyTorch", "Docker", "System Design"],
    domains: ["Generative AI", "Robotics", "Autonomous Systems"],
    travel_estimate: {
      origin: "Mumbai",
      destination: "Powai",
      train_bus_cost: "₹80",
      travel_time: "45 mins",
      group_pool_count: 42
    },
    verification_status: "Flagship Tier-1",
    featured: true
  },
  {
    id: "evt_devsphere_blr",
    title: "DevSphere Bengaluru 2026",
    organizer: "AWS User Group & Hasura",
    type: "Conference",
    format: "Hybrid (Bengaluru & Stream)",
    city: "Bengaluru",
    start_date: "2026-11-07T09:30:00",
    end_date: "2026-11-08T18:00:00",
    registration_deadline: "2026-11-01T23:59:00",
    prize_pool: "₹1,00,000 in Grants + Swag",
    entry_fee: "Free for Students",
    worth_it_score: 89,
    worth_it_breakdown: {
      prize_effort_ratio: 75,
      organizer_prestige: 94,
      career_impact: 95,
      certificate_value: 90
    },
    description: "Two days of high-velocity deep dives into Cloud Native architectures, serverless distributed databases, and high-concurrency systems. Networking lounge with 40+ startup CTOs.",
    tags: ["Cloud Native", "Docker", "PostgreSQL", "FastAPI", "Conference"],
    required_skills: ["PostgreSQL", "Docker", "System Design"],
    domains: ["Cloud Infrastructure", "DevOps", "Database Systems"],
    travel_estimate: {
      origin: "Mumbai",
      destination: "Bengaluru",
      train_bus_cost: "₹1,800 (Train) / ₹3,500 (Flight)",
      travel_time: "18 hours (Train) / 2 hours (Flight)",
      group_pool_count: 27
    },
    verification_status: "Verified Tier-1",
    featured: true
  },
  {
    id: "evt_genai_product_sprint",
    title: "GenAI Product Sprint 24h",
    organizer: "KJSCE Vidyavihar & Antler",
    type: "Hackathon",
    format: "In-Person (Mumbai)",
    city: "Mumbai",
    start_date: "2026-10-28T09:00:00",
    end_date: "2026-10-29T12:00:00",
    registration_deadline: "2026-10-26T12:00:00",
    prize_pool: "₹1,50,000 + Incubation",
    entry_fee: "Free",
    worth_it_score: 91,
    worth_it_breakdown: {
      prize_effort_ratio: 90,
      organizer_prestige: 91,
      career_impact: 94,
      certificate_value: 88
    },
    description: "Ideate and deploy a functional MVP powered by LLMs, Agentic tool-use, and modern frontend frameworks within 24 hours. Pre-seed funding pitch opportunity.",
    tags: ["Generative AI", "React", "FastAPI", "Python", "Hackathon"],
    required_skills: ["Python", "FastAPI", "React"],
    domains: ["LLMs", "Product Design", "Fullstack AI"],
    travel_estimate: {
      origin: "Mumbai",
      destination: "Vidyavihar",
      train_bus_cost: "₹30",
      travel_time: "35 mins",
      group_pool_count: 14
    },
    verification_status: "Verified Tier-1",
    featured: true
  },
  {
    id: "evt_react_summit_india",
    title: "React & Modern Web Summit",
    organizer: "Frontend Masters India & GeekyAnts",
    type: "Workshop",
    format: "Online",
    city: "Online",
    start_date: "2026-11-12T17:00:00",
    end_date: "2026-11-12T21:00:00",
    registration_deadline: "2026-11-11T23:59:00",
    prize_pool: "Pro Subscriptions + Books",
    entry_fee: "Free",
    worth_it_score: 86,
    worth_it_breakdown: {
      prize_effort_ratio: 72,
      organizer_prestige: 90,
      career_impact: 92,
      certificate_value: 89
    },
    description: "Master React Server Components, Next.js 15 App Router architecture, and performance optimization techniques from senior frontend architects.",
    tags: ["React", "JavaScript", "Tailwind CSS", "Frontend", "Workshop"],
    required_skills: ["React", "Tailwind CSS"],
    domains: ["Frontend Engineering", "Web Performance"],
    travel_estimate: {
      origin: "Anywhere",
      destination: "Online",
      train_bus_cost: "₹0",
      travel_time: "0 mins",
      group_pool_count: 0
    },
    verification_status: "Verified Tier-1",
    featured: false
  },
  {
    id: "evt_robotics_slam",
    title: "National Autonomous Rover Challenge",
    organizer: "VJTI Mumbai Robotics Club",
    type: "Hackathon",
    format: "In-Person (Matunga, Mumbai)",
    city: "Mumbai",
    start_date: "2026-11-21T09:00:00",
    end_date: "2026-11-22T19:00:00",
    registration_deadline: "2026-11-10T23:59:00",
    prize_pool: "₹1,80,000",
    entry_fee: "₹200 / Team",
    worth_it_score: 83,
    worth_it_breakdown: {
      prize_effort_ratio: 80,
      organizer_prestige: 88,
      career_impact: 85,
      certificate_value: 82
    },
    description: "Simulate and test autonomous SLAM path planning, obstacle avoidance, and computer vision object tracking on physical rovers.",
    tags: ["Robotics", "ROS", "OpenCV", "Python", "Hardware"],
    required_skills: ["Python", "ROS", "OpenCV"],
    domains: ["Robotics", "Embedded AI", "Computer Vision"],
    travel_estimate: {
      origin: "Mumbai",
      destination: "Matunga",
      train_bus_cost: "₹30",
      travel_time: "20 mins",
      group_pool_count: 6
    },
    verification_status: "Verified",
    featured: false
  },
  {
    id: "evt_cybershield_ctf",
    title: "CyberShield National CTF 2026",
    organizer: "Nullcon & CERT-In Student Chapter",
    type: "Competition",
    format: "Online",
    city: "Online",
    start_date: "2026-10-31T12:00:00",
    end_date: "2026-11-01T12:00:00",
    registration_deadline: "2026-10-30T18:00:00",
    prize_pool: "₹1,20,000 + Bug Bounty Invites",
    entry_fee: "Free",
    worth_it_score: 85,
    worth_it_breakdown: {
      prize_effort_ratio: 86,
      organizer_prestige: 92,
      career_impact: 88,
      certificate_value: 84
    },
    description: "24-hour Capture The Flag challenge spanning Web Exploitation, Reverse Engineering, Cryptography, and Memory Forensics.",
    tags: ["Cybersecurity", "CTF", "Ethical Hacking", "Python", "Competition"],
    required_skills: ["Python", "Linux", "Networking"],
    domains: ["Information Security", "Offensive Security"],
    travel_estimate: {
      origin: "Anywhere",
      destination: "Online",
      train_bus_cost: "₹0",
      travel_time: "0 mins",
      group_pool_count: 0
    },
    verification_status: "Verified",
    featured: false
  }
];

export const INITIAL_TEAMMATES = [
  {
    id: "tm_priya_02",
    name: "Priya Patel",
    college: "Veermata Jijabai Technological Institute (VJTI)",
    branch: "Artificial Intelligence & Data Science (3rd Year)",
    skills: ["PyTorch", "TensorFlow", "Computer Vision", "Python"],
    looking_for: "FastAPI & Frontend Engineer for HackAI Pune",
    synergy_score: 96,
    synergy_reason: "Priya has deep PyTorch and ML model training experience, perfectly complementing your FastAPI & React stack for HackAI Pune 2026.",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150"
  },
  {
    id: "tm_arjun_03",
    name: "Arjun Nair",
    college: "Sardar Patel Institute of Technology (SPIT)",
    branch: "Computer Engineering (3rd Year)",
    skills: ["Solidity", "Smart Contracts", "Rust", "TypeScript"],
    looking_for: "React & UI Designer for Web3 Defi Sprint",
    synergy_score: 82,
    synergy_reason: "Arjun specializes in smart contract protocol logic and seeks a frontend developer.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150"
  },
  {
    id: "tm_ananya_04",
    name: "Ananya Sen",
    college: "COEP Technological University, Pune",
    branch: "Electronics & Telecomm (3rd Year)",
    skills: ["ROS", "Embedded C++", "Edge AI", "OpenCV"],
    looking_for: "Cloud Native Backend Developer for IIT-B Challenge",
    synergy_score: 91,
    synergy_reason: "High synergy for robotics and hardware hackathons needing Python backend bridging.",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150"
  }
];
