"""
Mock Data & Domain Constants for EventRoute AI
Contains Student Persona (Rahul), Academic Timetable with Exams,
Curated Opportunities across India, Skill Gap Learning Vault, and OD Templates.
"""

STUDENT_PROFILE = {
    "id": "usr_milind_01",
    "name": "Milind",
    "email": "milind@delhitechnicalcampus.ac.in",
    "college": "Delhi Technical Campus (GGSIPU)",
    "branch": "Computer Science & Engineering",
    "year": "2nd Year (Semester 3)",
    "roll_no": "2024CS1042",
    "attendance_rate": 78.4,  # Close to 75% boundary! Makes OD letters urgent
    "skills": ["Python", "FastAPI", "React", "PostgreSQL", "Docker", "Tailwind CSS"],
    "interests": ["Artificial Intelligence", "Machine Learning", "System Design", "Cloud Native"],
    "github": "https://github.com/Milind04-png",
    "linkedin": "https://linkedin.com/in/milind-cse",
    "portfolio_slug": "milind",
    "xp_points": 1420,
    "completed_events_count": 4,
    "badges": [
        {"title": "Hackathon Finalist", "event": "Mumbai Hacks 2025", "date": "Jan 2025"},
        {"title": "AI Speaker Attendee", "event": "PyCon India Regional", "date": "Aug 2025"},
        {"title": "Verified Peer Mentor", "event": "Campus Code Lab", "date": "Sep 2025"}
    ]
}

EXAM_CALENDAR = [
    {
        "id": "exam_dbms",
        "title": "Database Management Systems (Internal Lab Exam)",
        "start_date": "2026-10-24T09:00:00",
        "end_date": "2026-10-24T12:00:00",
        "type": "exam",
        "mandatory": True,
        "notes": "Mandatory physical attendance in Lab 402. No re-exam allowed."
    },
    {
        "id": "exam_se",
        "title": "Software Engineering Project Viva",
        "start_date": "2026-10-25T10:00:00",
        "end_date": "2026-10-25T13:00:00",
        "type": "exam",
        "mandatory": True,
        "notes": "External evaluator present. Hard clash."
    },
    {
        "id": "exam_webtech",
        "title": "Web Technologies Practical Assessment",
        "start_date": "2026-11-03T14:00:00",
        "end_date": "2026-11-03T17:00:00",
        "type": "exam",
        "mandatory": True,
        "notes": "Laboratory exam."
    }
]

SKILL_LEARNING_VAULT = {
    "PyTorch": {
        "est_hours": 3,
        "title": "Fast Inference with PyTorch & TorchScript",
        "type": "Crash Course",
        "url": "https://pytorch.org/tutorials/beginner/deep_learning_60min_blitz.html",
        "desc": "Hands-on guide covering tensors, autograd, and deploying pre-trained vision/NLP models in under 3 hours."
    },
    "TensorRT": {
        "est_hours": 2,
        "title": "NVIDIA TensorRT Deployment Quickstart",
        "type": "Interactive Guide",
        "url": "https://developer.nvidia.com/tensorrt",
        "desc": "Optimize ONNX model weights for low-latency GPU edge inference during 24h hackathons."
    },
    "Solidity": {
        "est_hours": 4,
        "title": "Smart Contract Syntax & Hardhat Basics",
        "type": "Hands-on Tutorial",
        "url": "https://soliditylang.org/",
        "desc": "Understand ERC-20 tokens, event emitters, and deploying to testnets."
    },
    "OpenCV": {
        "est_hours": 2.5,
        "title": "Real-time Video Stream Processing with Python",
        "type": "Video Series",
        "url": "https://docs.opencv.org/4.x/d6/d00/tutorial_py_root.html",
        "desc": "Bounding boxes, color tracking, and camera frame feeds."
    },
    "ROS": {
        "est_hours": 5,
        "title": "ROS2 Humble Node Pub-Sub Fundamentals",
        "type": "Workshop Slides",
        "url": "https://docs.ros.org/en/humble/",
        "desc": "Robotics middleware communication patterns and sensor fusion."
    },
    "Rust": {
        "est_hours": 4,
        "title": "Rust in a Nutshell for Systems & WASM",
        "type": "Cheat Sheet",
        "url": "https://www.rust-lang.org/learn",
        "desc": "Ownership, borrowing, and high-performance concurrency essentials."
    },
    "GraphQL": {
        "est_hours": 1.5,
        "title": "Query & Mutation Schemas with Apollo",
        "type": "Doc Guide",
        "url": "https://graphql.org/learn/",
        "desc": "Building fast typed APIs for mobile and web dashboards."
    }
}

COLLEGE_OD_TEMPLATES = {
    "DTC_DELHI": {
        "college_name": "Delhi Technical Campus",
        "university": "Guru Gobind Singh Indraprastha University (GGSIPU)",
        "address": "28/1, Knowledge Park III, Greater Noida, Delhi NCR 201306",
        "hod_name": "Dr. Pranay Tanwar",
        "hod_title": "Dean & Head of Department, Computer Science & Engineering",
        "letter_code_prefix": "DTC/CSE/OD/2026/"
    },
    "USICT_DWARKA": {
        "college_name": "University School of Information, Communication and Technology (USICT)",
        "university": "Guru Gobind Singh Indraprastha University (GGSIPU)",
        "address": "Sector 16-C, Dwarka, New Delhi 110078",
        "hod_name": "Prof. Pravin Chandra",
        "hod_title": "Dean, School of Information & Communication Technology",
        "letter_code_prefix": "GGSIPU/USICT/OD/2026/"
    },
    "MAIT_ROHINI": {
        "college_name": "Maharaja Agrasen Institute of Technology",
        "university": "Guru Gobind Singh Indraprastha University (GGSIPU)",
        "address": "PSP Area, Sector 22, Rohini, New Delhi 110086",
        "hod_name": "Prof. (Dr.) Namita Gupta",
        "hod_title": "Head of Department, Computer Science & Engineering",
        "letter_code_prefix": "MAIT/CSE/OD/2026/"
    },
    "MSIT_JANAKPURI": {
        "college_name": "Maharaja Surajmal Institute of Technology",
        "university": "Guru Gobind Singh Indraprastha University (GGSIPU)",
        "address": "C-4, Janakpuri, New Delhi 110058",
        "hod_name": "Prof. (Dr.) Koyel Datta Gupta",
        "hod_title": "Head of Department, Computer Science & Engineering",
        "letter_code_prefix": "MSIT/CSE/OD/2026/"
    },
    "BVCOE_DELHI": {
        "college_name": "Bharati Vidyapeeth's College of Engineering",
        "university": "Guru Gobind Singh Indraprastha University (GGSIPU)",
        "address": "A-4, Paschim Vihar, New Delhi 110063",
        "hod_name": "Dr. Arvind Rehalia",
        "hod_title": "Head of Department, Computer Science & Engineering",
        "letter_code_prefix": "BVCOE/CSE/OD/2026/"
    },
    "BPIT_ROHINI": {
        "college_name": "Bhagwan Parshuram Institute of Technology",
        "university": "Guru Gobind Singh Indraprastha University (GGSIPU)",
        "address": "PSP-4, Sector 17, Rohini, New Delhi 110089",
        "hod_name": "Prof. (Dr.) Deepali Virmani",
        "hod_title": "Head of Department, Computer Science & Engineering",
        "letter_code_prefix": "BPIT/CSE/OD/2026/"
    },
    "GTBIT_DELHI": {
        "college_name": "Guru Tegh Bahadur Institute of Technology",
        "university": "Guru Gobind Singh Indraprastha University (GGSIPU)",
        "address": "G-8 Area, Rajouri Garden, New Delhi 110064",
        "hod_name": "Dr. Rominder Kaur",
        "hod_title": "Head of Department, Computer Science & Engineering",
        "letter_code_prefix": "GTBIT/CSE/OD/2026/"
    },
    "VIPS_DELHI": {
        "college_name": "Vivekananda Institute of Professional Studies - TC",
        "university": "Guru Gobind Singh Indraprastha University (GGSIPU)",
        "address": "AU Block, Outer Ring Road, Pitampura, New Delhi 110034",
        "hod_name": "Dr. Supriya Madan",
        "hod_title": "Dean & Head, School of Engineering & Technology",
        "letter_code_prefix": "VIPS/SET/OD/2026/"
    },
    "ADGITM_DELHI": {
        "college_name": "Dr. Akhilesh Das Gupta Institute of Technology & Management",
        "university": "Guru Gobind Singh Indraprastha University (GGSIPU)",
        "address": "FC-26, Shastri Park, New Delhi 110053",
        "hod_name": "Dr. Saurabh Gupta",
        "hod_title": "Head of Department, Computer Science & Engineering",
        "letter_code_prefix": "ADGITM/CSE/OD/2026/"
    },
    "JIMS_NOIDA": {
        "college_name": "JIMS Engineering Management Technical Campus",
        "university": "Guru Gobind Singh Indraprastha University (GGSIPU)",
        "address": "48/4, Knowledge Park III, Greater Noida, Delhi NCR 201306",
        "hod_name": "Dr. R. K. Raghuwanshi",
        "hod_title": "Head of Department, Computer Science & Engineering",
        "letter_code_prefix": "JIMS/CSE/OD/2026/"
    },
    "HMRITM_DELHI": {
        "college_name": "HMR Institute of Technology and Management",
        "university": "Guru Gobind Singh Indraprastha University (GGSIPU)",
        "address": "Plot No. 326, Hamidpur, Delhi 110036",
        "hod_name": "Dr. Ravinder Kumar",
        "hod_title": "Head of Department, Computer Science & Engineering",
        "letter_code_prefix": "HMRITM/CSE/OD/2026/"
    },
    "DTU_DELHI": {
        "college_name": "Delhi Technological University",
        "university": "State University of Delhi",
        "address": "Shahbad Daulatpur, Bawana Road, Delhi 110042",
        "hod_name": "Prof. Rajeev Kapoor",
        "hod_title": "HOD, Computer Science and Engineering",
        "letter_code_prefix": "DTU/CSE/OD/2026/"
    },
    "IITB_MUMBAI": {
        "college_name": "Indian Institute of Technology Bombay",
        "university": "Institute of National Importance",
        "address": "Main Gate Rd, IIT Area, Powai, Mumbai 400076",
        "hod_name": "Prof. Varsha Apte",
        "hod_title": "Head of Department, Computer Science and Engineering",
        "letter_code_prefix": "IITB/CSE/OD/2026/"
    },
    "TSEC_MUMBAI": {
        "college_name": "Thadomal Shahani Engineering College",
        "university": "University of Mumbai",
        "address": "Bandra (West), Mumbai, Maharashtra 400050",
        "hod_name": "Dr. Tanuja K. Sarode",
        "hod_title": "Head of Department, Computer Engineering",
        "letter_code_prefix": "TSEC/CE/OD/2026/"
    },
    "RVCE_BLR": {
        "college_name": "R.V. College of Engineering",
        "university": "Visvesvaraya Technological University (VTU)",
        "address": "Mysore Road, RV Vidyaniketan, Bengaluru, Karnataka 560059",
        "hod_name": "Dr. B. K. Srinivas",
        "hod_title": "Head of Department, Information Science & Eng.",
        "letter_code_prefix": "RVCE/ISE/OD/2026/"
    },
    "CEG_ANNA": {
        "college_name": "College of Engineering, Guindy",
        "university": "Anna University",
        "address": "Sardar Patel Road, Guindy, Chennai, Tamil Nadu 600025",
        "hod_name": "Dr. S. Shanmugavel",
        "hod_title": "Dean & Professor, Department of CSE",
        "letter_code_prefix": "CEG/CSE/OD/2026/"
    }
}

RAW_EVENTS = [
    {
        "id": "evt_hackai_pune_26",
        "title": "HackAI Pune 2026",
        "organizer": "COEP Tech & Google Cloud Student Club",
        "type": "Hackathon",
        "format": "In-Person (Pune)",
        "city": "Pune",
        "start_date": "2026-10-26T09:00:00",
        "end_date": "2026-10-27T18:00:00",
        "registration_deadline": "2026-10-22T23:59:00",
        "prize_pool": "₹2,50,000",
        "entry_fee": "Free",
        "worth_it_score": 94,
        "worth_it_breakdown": {
            "prize_effort_ratio": 92,
            "organizer_prestige": 95,
            "career_impact": 96,
            "certificate_value": 91
        },
        "description": "36-hour flagship national AI hackathon focusing on Multimodal Agents, Healthcare Diagnostics, and Edge Inference. Mentors from Google Cloud and Microsoft. Direct fast-track interview opportunities for top 3 teams.",
        "tags": ["Artificial Intelligence", "Machine Learning", "FastAPI", "Python", "Cloud Native", "Hackathon"],
        "required_skills": ["Python", "FastAPI", "React", "PyTorch"],
        "domains": ["Generative AI", "Healthcare AI", "Edge Computing"],
        "travel_estimate": {
            "origin": "Mumbai",
            "destination": "Pune",
            "train_bus_cost": "₹350 - ₹600",
            "travel_time": "3.5 hours",
            "group_pool_count": 18
        },
        "verification_status": "Verified Tier-1",
        "featured": True
    },
    {
        "id": "evt_web3_defi_sprint",
        "title": "Web3 DeFi Sprint Mumbai",
        "organizer": "Polygon Guild & BuildersDAO",
        "type": "Hackathon",
        "format": "In-Person (Bandra, Mumbai)",
        "city": "Mumbai",
        "start_date": "2026-10-24T10:00:00",
        "end_date": "2026-10-25T18:00:00",
        "registration_deadline": "2026-10-23T18:00:00",
        "prize_pool": "$5,000 USDC",
        "entry_fee": "Free",
        "worth_it_score": 78,
        "worth_it_breakdown": {
            "prize_effort_ratio": 85,
            "organizer_prestige": 80,
            "career_impact": 70,
            "certificate_value": 75
        },
        "description": "Build decentralized lending, zero-knowledge rollups, and liquidity protocols on Ethereum L2s. Requires Solidity and Web3.js experience.",
        "tags": ["Web3", "Blockchain", "Solidity", "Crypto", "Hackathon"],
        "required_skills": ["Solidity", "React", "Rust"],
        "domains": ["DeFi", "Smart Contracts", "Cryptocurrency"],
        "travel_estimate": {
            "origin": "Mumbai",
            "destination": "Bandra",
            "train_bus_cost": "₹40",
            "travel_time": "25 mins",
            "group_pool_count": 8
        },
        "verification_status": "Community Verified",
        "featured": False
    },
    {
        "id": "evt_iitb_techfest_ai",
        "title": "IIT Bombay Techfest: National AI Grand Challenge",
        "organizer": "IIT Bombay & NVIDIA",
        "type": "Hackathon",
        "format": "In-Person (Powai, Mumbai)",
        "city": "Mumbai",
        "start_date": "2026-11-15T08:00:00",
        "end_date": "2026-11-17T20:00:00",
        "registration_deadline": "2026-11-05T23:59:00",
        "prize_pool": "₹5,00,000",
        "entry_fee": "Free",
        "worth_it_score": 98,
        "worth_it_breakdown": {
            "prize_effort_ratio": 97,
            "organizer_prestige": 99,
            "career_impact": 99,
            "certificate_value": 98
        },
        "description": "Asia's largest science and technology festival hackathon. Build scalable foundational models and autonomous multi-agent systems. Highest recruiter visibility across top tech unicorns and research labs.",
        "tags": ["Artificial Intelligence", "Deep Learning", "System Design", "IIT Bombay", "Hackathon"],
        "required_skills": ["Python", "PyTorch", "Docker", "System Design"],
        "domains": ["Generative AI", "Robotics", "Autonomous Systems"],
        "travel_estimate": {
            "origin": "Mumbai",
            "destination": "Powai",
            "train_bus_cost": "₹80",
            "travel_time": "45 mins",
            "group_pool_count": 42
        },
        "verification_status": "Flagship Tier-1",
        "featured": True
    },
    {
        "id": "evt_devsphere_blr",
        "title": "DevSphere Bengaluru 2026",
        "organizer": "AWS User Group & Hasura",
        "type": "Conference",
        "format": "Hybrid (Bengaluru & Live Stream)",
        "city": "Bengaluru",
        "start_date": "2026-11-07T09:30:00",
        "end_date": "2026-11-08T18:00:00",
        "registration_deadline": "2026-11-01T23:59:00",
        "prize_pool": "₹1,00,000 in Grants + Swag",
        "entry_fee": "Free for Students",
        "worth_it_score": 89,
        "worth_it_breakdown": {
            "prize_effort_ratio": 75,
            "organizer_prestige": 94,
            "career_impact": 95,
            "certificate_value": 90
        },
        "description": "Two days of high-velocity deep dives into Cloud Native architectures, serverless distributed databases, and high-concurrency systems. Networking lounge with 40+ startup CTOs.",
        "tags": ["Cloud Native", "Docker", "PostgreSQL", "FastAPI", "Conference"],
        "required_skills": ["PostgreSQL", "Docker", "System Design"],
        "domains": ["Cloud Infrastructure", "DevOps", "Database Systems"],
        "travel_estimate": {
            "origin": "Mumbai",
            "destination": "Bengaluru",
            "train_bus_cost": "₹1,800 (Train) / ₹3,500 (Flight)",
            "travel_time": "18 hours (Train) / 2 hours (Flight)",
            "group_pool_count": 27
        },
        "verification_status": "Verified Tier-1",
        "featured": True
    },
    {
        "id": "evt_genai_product_sprint",
        "title": "GenAI Product Sprint 24h",
        "organizer": "KJSCE Vidyavihar & Antler",
        "type": "Hackathon",
        "format": "In-Person (Mumbai)",
        "city": "Mumbai",
        "start_date": "2026-10-28T09:00:00",
        "end_date": "2026-10-29T12:00:00",
        "registration_deadline": "2026-10-26T12:00:00",
        "prize_pool": "₹1,50,000 + Incubation",
        "entry_fee": "Free",
        "worth_it_score": 91,
        "worth_it_breakdown": {
            "prize_effort_ratio": 90,
            "organizer_prestige": 91,
            "career_impact": 94,
            "certificate_value": 88
        },
        "description": "Ideate and deploy a functional MVP powered by LLMs, Agentic tool-use, and modern frontend frameworks within 24 hours. Pre-seed funding pitch opportunity.",
        "tags": ["Generative AI", "React", "FastAPI", "Python", "Hackathon"],
        "required_skills": ["Python", "FastAPI", "React"],
        "domains": ["LLMs", "Product Design", "Fullstack AI"],
        "travel_estimate": {
            "origin": "Mumbai",
            "destination": "Vidyavihar",
            "train_bus_cost": "₹30",
            "travel_time": "35 mins",
            "group_pool_count": 14
        },
        "verification_status": "Verified Tier-1",
        "featured": True
    },
    {
        "id": "evt_robotics_slam",
        "title": "National Autonomous Rover Challenge",
        "organizer": "VJTI Mumbai Robotics Club",
        "type": "Hackathon",
        "format": "In-Person (Matunga, Mumbai)",
        "city": "Mumbai",
        "start_date": "2026-11-21T09:00:00",
        "end_date": "2026-11-22T19:00:00",
        "registration_deadline": "2026-11-10T23:59:00",
        "prize_pool": "₹1,80,000",
        "entry_fee": "₹200 / Team",
        "worth_it_score": 83,
        "worth_it_breakdown": {
            "prize_effort_ratio": 80,
            "organizer_prestige": 88,
            "career_impact": 85,
            "certificate_value": 82
        },
        "description": "Simulate and test autonomous SLAM path planning, obstacle avoidance, and computer vision object tracking on physical rovers.",
        "tags": ["Robotics", "ROS", "OpenCV", "Python", "Hardware"],
        "required_skills": ["Python", "ROS", "OpenCV"],
        "domains": ["Robotics", "Embedded AI", "Computer Vision"],
        "travel_estimate": {
            "origin": "Mumbai",
            "destination": "Matunga",
            "train_bus_cost": "₹30",
            "travel_time": "20 mins",
            "group_pool_count": 6
        },
        "verification_status": "Verified",
        "featured": False
    },
    {
        "id": "evt_react_summit_india",
        "title": "React & Modern Web Summit",
        "organizer": "Frontend Masters India & GeekyAnts",
        "type": "Workshop",
        "format": "Online",
        "city": "Online",
        "start_date": "2026-11-12T17:00:00",
        "end_date": "2026-11-12T21:00:00",
        "registration_deadline": "2026-11-11T23:59:00",
        "prize_pool": "Pro Subscriptions + Books",
        "entry_fee": "Free",
        "worth_it_score": 86,
        "worth_it_breakdown": {
            "prize_effort_ratio": 72,
            "organizer_prestige": 90,
            "career_impact": 92,
            "certificate_value": 89
        },
        "description": "Master React Server Components, Next.js 15 App Router architecture, and performance optimization techniques from senior frontend architects.",
        "tags": ["React", "JavaScript", "Tailwind CSS", "Frontend", "Workshop"],
        "required_skills": ["React", "Tailwind CSS"],
        "domains": ["Frontend Engineering", "Web Performance"],
        "travel_estimate": {
            "origin": "Anywhere",
            "destination": "Online",
            "train_bus_cost": "₹0",
            "travel_time": "0 mins",
            "group_pool_count": 0
        },
        "verification_status": "Verified Tier-1",
        "featured": False
    },
    {
        "id": "evt_cybershield_ctf",
        "title": "CyberShield National CTF 2026",
        "organizer": "Nullcon & CERT-In Student Chapter",
        "type": "Competition",
        "format": "Online",
        "city": "Online",
        "start_date": "2026-10-31T12:00:00",
        "end_date": "2026-11-01T12:00:00",
        "registration_deadline": "2026-10-30T18:00:00",
        "prize_pool": "₹1,20,000 + Bug Bounty Invites",
        "entry_fee": "Free",
        "worth_it_score": 85,
        "worth_it_breakdown": {
            "prize_effort_ratio": 86,
            "organizer_prestige": 92,
            "career_impact": 88,
            "certificate_value": 84
        },
        "description": "24-hour Capture The Flag challenge spanning Web Exploitation, Reverse Engineering, Cryptography, and Memory Forensics.",
        "tags": ["Cybersecurity", "CTF", "Ethical Hacking", "Python", "Competition"],
        "required_skills": ["Python", "Linux", "Networking"],
        "domains": ["Information Security", "Offensive Security"],
        "travel_estimate": {
            "origin": "Anywhere",
            "destination": "Online",
            "train_bus_cost": "₹0",
            "travel_time": "0 mins",
            "group_pool_count": 0
        },
        "verification_status": "Verified",
        "featured": False
    },
    {
        "id": "evt_techspark_dtc_26",
        "title": "TechSpark DTC 2026: Inter-College AI Hackathon",
        "organizer": "Delhi Technical Campus (DTC Greater Noida)",
        "type": "Hackathon",
        "format": "In-Person (Greater Noida, Delhi NCR)",
        "city": "Delhi NCR",
        "start_date": "2026-11-10T09:00:00",
        "end_date": "2026-11-11T18:00:00",
        "registration_deadline": "2026-11-06T23:59:00",
        "prize_pool": "₹1,50,000",
        "entry_fee": "Free",
        "worth_it_score": 95,
        "worth_it_breakdown": {
            "prize_effort_ratio": 94,
            "organizer_prestige": 96,
            "career_impact": 95,
            "certificate_value": 95
        },
        "description": "Home college flagship hackathon at Delhi Technical Campus. 24-hour sprint focused on AI-powered student utility tools, cloud backends, and sustainable engineering.",
        "tags": ["Artificial Intelligence", "FastAPI", "Python", "React", "DTC", "GGSIPU", "Hackathon"],
        "required_skills": ["Python", "FastAPI", "React", "Docker"],
        "domains": ["Generative AI", "Fullstack Systems", "Campus Tech"],
        "travel_estimate": {
            "origin": "Greater Noida",
            "destination": "DTC Campus",
            "train_bus_cost": "₹0 - ₹20",
            "travel_time": "10 mins",
            "group_pool_count": 50
        },
        "verification_status": "Home Campus Verified",
        "featured": True
    },
    {
        "id": "evt_infoxpression_usict_26",
        "title": "InfoXpression 2026: GGSIPU Flagship AI Hackathon",
        "organizer": "USICT Dwarka (Guru Gobind Singh Indraprastha University)",
        "type": "Hackathon",
        "format": "In-Person (Dwarka, Delhi)",
        "city": "Delhi",
        "start_date": "2026-11-20T09:00:00",
        "end_date": "2026-11-21T18:00:00",
        "registration_deadline": "2026-11-15T23:59:00",
        "prize_pool": "₹3,00,000",
        "entry_fee": "Free",
        "worth_it_score": 96,
        "worth_it_breakdown": {
            "prize_effort_ratio": 95,
            "organizer_prestige": 98,
            "career_impact": 97,
            "certificate_value": 96
        },
        "description": "The annual technical extravaganza of USICT, GGSIPU Dwarka Main Campus. Build AI, Web3, and IoT solutions with guidance from top alumni at Google, Amazon, and Microsoft.",
        "tags": ["Artificial Intelligence", "Machine Learning", "Cloud Native", "USICT", "GGSIPU", "Hackathon"],
        "required_skills": ["Python", "FastAPI", "React", "PyTorch"],
        "domains": ["Multimodal AI", "Decentralized Systems", "FinTech"],
        "travel_estimate": {
            "origin": "Greater Noida",
            "destination": "Dwarka Sector 14 Metro",
            "train_bus_cost": "₹60 (Metro)",
            "travel_time": "55 mins",
            "group_pool_count": 36
        },
        "verification_status": "University Main Campus Flagship",
        "featured": True
    },
    {
        "id": "evt_hackmait_26",
        "title": "HackMAIT 4.0: Delhi NCR Innovation Challenge",
        "organizer": "MAIT Rohini (Maharaja Agrasen Institute of Technology)",
        "type": "Hackathon",
        "format": "In-Person (Rohini, Delhi)",
        "city": "Delhi",
        "start_date": "2026-11-14T09:00:00",
        "end_date": "2026-11-15T18:00:00",
        "registration_deadline": "2026-11-10T23:59:00",
        "prize_pool": "₹2,00,000",
        "entry_fee": "Free",
        "worth_it_score": 93,
        "worth_it_breakdown": {
            "prize_effort_ratio": 93,
            "organizer_prestige": 94,
            "career_impact": 93,
            "certificate_value": 92
        },
        "description": "MAIT's premier 36-hour hackathon. Tackle real-world problems in Smart Cities, AI in FinTech, and Decentralized Cloud with premier student developers across Delhi NCR.",
        "tags": ["Artificial Intelligence", "React", "FastAPI", "MAIT", "GGSIPU", "Hackathon"],
        "required_skills": ["Python", "React", "FastAPI"],
        "domains": ["Smart Cities", "Autonomous Systems", "Healthcare AI"],
        "travel_estimate": {
            "origin": "Greater Noida",
            "destination": "Rithala Metro Station",
            "train_bus_cost": "₹60 (Metro)",
            "travel_time": "60 mins",
            "group_pool_count": 28
        },
        "verification_status": "Verified Tier-1",
        "featured": True
    },
    {
        "id": "evt_hackmsit_26",
        "title": "HackMSIT 2026: Flagship AI & Systems Sprint",
        "organizer": "MSIT Janakpuri (Maharaja Surajmal Institute of Technology)",
        "type": "Hackathon",
        "format": "In-Person (Janakpuri, Delhi)",
        "city": "Delhi",
        "start_date": "2026-11-28T09:00:00",
        "end_date": "2026-11-29T18:00:00",
        "registration_deadline": "2026-11-24T23:59:00",
        "prize_pool": "₹1,75,000",
        "entry_fee": "Free",
        "worth_it_score": 91,
        "worth_it_breakdown": {
            "prize_effort_ratio": 90,
            "organizer_prestige": 92,
            "career_impact": 92,
            "certificate_value": 90
        },
        "description": "Organized by IEEE MSIT & ACM MSIT. High-intensity sprint for building agentic AI, system architectures, and cloud services.",
        "tags": ["Machine Learning", "System Design", "Docker", "MSIT", "GGSIPU", "Hackathon"],
        "required_skills": ["Python", "Docker", "System Design"],
        "domains": ["Agentic AI", "High Performance Systems", "Cloud"],
        "travel_estimate": {
            "origin": "Greater Noida",
            "destination": "Janakpuri East Metro",
            "train_bus_cost": "₹50 (Metro)",
            "travel_time": "50 mins",
            "group_pool_count": 22
        },
        "verification_status": "Verified Tier-1",
        "featured": True
    },
    {
        "id": "evt_bvest_bvcoe_26",
        "title": "BVEST Hack 2026: National Tech Symposium",
        "organizer": "BVCOE New Delhi (Bharati Vidyapeeth's College of Engineering)",
        "type": "Hackathon",
        "format": "In-Person (Paschim Vihar, Delhi)",
        "city": "Delhi",
        "start_date": "2026-12-04T09:00:00",
        "end_date": "2026-12-05T18:00:00",
        "registration_deadline": "2026-11-30T23:59:00",
        "prize_pool": "₹1,50,000",
        "entry_fee": "Free",
        "worth_it_score": 90,
        "worth_it_breakdown": {
            "prize_effort_ratio": 89,
            "organizer_prestige": 91,
            "career_impact": 90,
            "certificate_value": 89
        },
        "description": "BVCOE New Delhi's flagship hackathon celebrating engineering innovation, embedded edge computing, and modern fullstack AI.",
        "tags": ["Artificial Intelligence", "Python", "BVCOE", "GGSIPU", "Hackathon"],
        "required_skills": ["Python", "React", "OpenCV"],
        "domains": ["Computer Vision", "Web Applications", "IoT"],
        "travel_estimate": {
            "origin": "Greater Noida",
            "destination": "Paschim Vihar East Metro",
            "train_bus_cost": "₹55 (Metro)",
            "travel_time": "52 mins",
            "group_pool_count": 19
        },
        "verification_status": "Verified Tier-1",
        "featured": False
    },
    {
        "id": "evt_corona_bpit_26",
        "title": "Corona Hack 2026: National Level Hackathon",
        "organizer": "BPIT Rohini (Bhagwan Parshuram Institute of Technology)",
        "type": "Hackathon",
        "format": "In-Person (Rohini, Delhi)",
        "city": "Delhi",
        "start_date": "2026-12-12T09:00:00",
        "end_date": "2026-12-13T18:00:00",
        "registration_deadline": "2026-12-08T23:59:00",
        "prize_pool": "₹1,25,000",
        "entry_fee": "Free",
        "worth_it_score": 88,
        "worth_it_breakdown": {
            "prize_effort_ratio": 88,
            "organizer_prestige": 89,
            "career_impact": 88,
            "certificate_value": 87
        },
        "description": "Flagship national hackathon of BPIT Rohini. Open innovation track featuring prizes for best AI for Good and Web3 protocols.",
        "tags": ["Artificial Intelligence", "Web3", "BPIT", "GGSIPU", "Hackathon"],
        "required_skills": ["Python", "React", "PostgreSQL"],
        "domains": ["Social Impact", "Web3 Infrastructure"],
        "travel_estimate": {
            "origin": "Greater Noida",
            "destination": "Rohini Sector 18 Metro",
            "train_bus_cost": "₹60 (Metro)",
            "travel_time": "58 mins",
            "group_pool_count": 15
        },
        "verification_status": "Verified Tier-1",
        "featured": False
    },
    {
        "id": "evt_gates_gtbit_26",
        "title": "Gates & HackGTBIT 2026: Tech Innovation Sprint",
        "organizer": "GTBIT Rajouri Garden (Guru Tegh Bahadur Institute of Technology)",
        "type": "Hackathon",
        "format": "In-Person (Rajouri Garden, Delhi)",
        "city": "Delhi",
        "start_date": "2026-12-18T09:00:00",
        "end_date": "2026-12-19T18:00:00",
        "registration_deadline": "2026-12-14T23:59:00",
        "prize_pool": "₹1,20,000",
        "entry_fee": "Free",
        "worth_it_score": 87,
        "worth_it_breakdown": {
            "prize_effort_ratio": 86,
            "organizer_prestige": 88,
            "career_impact": 87,
            "certificate_value": 86
        },
        "description": "Annual tech festival hackathon of GTBIT. Hands-on coding marathon for cybersecurity, AI pipelines, and mobile apps.",
        "tags": ["Cybersecurity", "Python", "GTBIT", "GGSIPU", "Hackathon"],
        "required_skills": ["Python", "Linux", "Docker"],
        "domains": ["Cybersecurity", "Applied Machine Learning"],
        "travel_estimate": {
            "origin": "Greater Noida",
            "destination": "Rajouri Garden Metro",
            "train_bus_cost": "₹50 (Metro)",
            "travel_time": "48 mins",
            "group_pool_count": 17
        },
        "verification_status": "Verified Tier-1",
        "featured": False
    },
    {
        "id": "evt_init_vips_26",
        "title": "Init_ Hack VIPS 2026: National Developer Challenge",
        "organizer": "VIPS Pitampura (Vivekananda Institute of Professional Studies)",
        "type": "Hackathon",
        "format": "In-Person (Pitampura, Delhi)",
        "city": "Delhi",
        "start_date": "2026-12-22T09:00:00",
        "end_date": "2026-12-23T18:00:00",
        "registration_deadline": "2026-12-18T23:59:00",
        "prize_pool": "₹1,40,000",
        "entry_fee": "Free",
        "worth_it_score": 89,
        "worth_it_breakdown": {
            "prize_effort_ratio": 88,
            "organizer_prestige": 90,
            "career_impact": 90,
            "certificate_value": 88
        },
        "description": "Premier developer challenge hosted by VIPS School of Engineering & Technology. Dedicated track for Generative AI and cross-platform web systems.",
        "tags": ["Generative AI", "React", "VIPS", "GGSIPU", "Hackathon"],
        "required_skills": ["React", "FastAPI", "Tailwind CSS"],
        "domains": ["Generative UI", "Fullstack AI"],
        "travel_estimate": {
            "origin": "Greater Noida",
            "destination": "Pitampura Metro",
            "train_bus_cost": "₹55 (Metro)",
            "travel_time": "54 mins",
            "group_pool_count": 21
        },
        "verification_status": "Verified Tier-1",
        "featured": False
    },
    {
        "id": "evt_innobuzz_adgitm_26",
        "title": "InnoBuzz ADGITM 2026: Smart Delhi AI Sprint",
        "organizer": "ADGITM Shastri Park (Dr. Akhilesh Das Gupta Institute)",
        "type": "Hackathon",
        "format": "In-Person (Shastri Park, Delhi)",
        "city": "Delhi",
        "start_date": "2027-01-08T09:00:00",
        "end_date": "2027-01-09T18:00:00",
        "registration_deadline": "2027-01-03T23:59:00",
        "prize_pool": "₹1,10,000",
        "entry_fee": "Free",
        "worth_it_score": 86,
        "worth_it_breakdown": {
            "prize_effort_ratio": 85,
            "organizer_prestige": 87,
            "career_impact": 86,
            "certificate_value": 85
        },
        "description": "ADGITM's flagship annual innovation hackathon solving civic tech, healthcare accessibility, and agentic workflows.",
        "tags": ["Artificial Intelligence", "ADGITM", "GGSIPU", "Hackathon"],
        "required_skills": ["Python", "FastAPI", "React"],
        "domains": ["Civic Tech", "Clean Energy AI"],
        "travel_estimate": {
            "origin": "Greater Noida",
            "destination": "Shastri Park Metro",
            "train_bus_cost": "₹45 (Metro)",
            "travel_time": "42 mins",
            "group_pool_count": 14
        },
        "verification_status": "Verified Tier-1",
        "featured": False
    },
    {
        "id": "evt_technoxian_jims_26",
        "title": "TechnoXian JIMS Hack 2026: Robotics & AI Conclave",
        "organizer": "JIMS Greater Noida (JIMS EMTC)",
        "type": "Hackathon",
        "format": "In-Person (Greater Noida, Delhi NCR)",
        "city": "Delhi NCR",
        "start_date": "2027-01-15T09:00:00",
        "end_date": "2027-01-16T18:00:00",
        "registration_deadline": "2027-01-10T23:59:00",
        "prize_pool": "₹1,00,000",
        "entry_fee": "Free",
        "worth_it_score": 85,
        "worth_it_breakdown": {
            "prize_effort_ratio": 84,
            "organizer_prestige": 86,
            "career_impact": 85,
            "certificate_value": 84
        },
        "description": "Hardware and AI hackathon in Greater Noida Knowledge Park corridor. Hardware kits and mentors provided.",
        "tags": ["Robotics", "Artificial Intelligence", "JIMS", "GGSIPU", "Hackathon"],
        "required_skills": ["Python", "ROS", "OpenCV"],
        "domains": ["Embedded AI", "Robotics"],
        "travel_estimate": {
            "origin": "Greater Noida",
            "destination": "Knowledge Park III",
            "train_bus_cost": "₹15",
            "travel_time": "5 mins",
            "group_pool_count": 32
        },
        "verification_status": "Verified Tier-1",
        "featured": False
    },
    {
        "id": "evt_emblazon_hmritm_26",
        "title": "Emblazon HMRITM 2026: Open Innovation Hackathon",
        "organizer": "HMRITM Hamidpur (HMR Institute of Technology & Management)",
        "type": "Hackathon",
        "format": "In-Person (Hamidpur, Delhi)",
        "city": "Delhi",
        "start_date": "2027-01-22T09:00:00",
        "end_date": "2027-01-23T18:00:00",
        "registration_deadline": "2027-01-18T23:59:00",
        "prize_pool": "₹1,00,000",
        "entry_fee": "Free",
        "worth_it_score": 84,
        "worth_it_breakdown": {
            "prize_effort_ratio": 83,
            "organizer_prestige": 85,
            "career_impact": 84,
            "certificate_value": 83
        },
        "description": "Annual technical symposium and 24h coding sprint by HMRITM Computer Science department.",
        "tags": ["Cloud Native", "React", "HMRITM", "GGSIPU", "Hackathon"],
        "required_skills": ["React", "PostgreSQL", "Docker"],
        "domains": ["Open Innovation", "Cloud"],
        "travel_estimate": {
            "origin": "Greater Noida",
            "destination": "Samaypur Badli / Hamidpur",
            "train_bus_cost": "₹60 (Metro + Bus)",
            "travel_time": "65 mins",
            "group_pool_count": 12
        },
        "verification_status": "Verified Tier-1",
        "featured": False
    }
]

SAMPLE_TEAMMATES = [
    {
        "id": "tm_priya_02",
        "name": "Priya Patel",
        "college": "Veermata Jijabai Technological Institute (VJTI)",
        "branch": "Artificial Intelligence & Data Science (3rd Year)",
        "skills": ["PyTorch", "TensorFlow", "Computer Vision", "Python"],
        "looking_for": "FastAPI & Frontend Engineer for HackAI Pune",
        "synergy_score": 96,
        "synergy_reason": "Priya has deep PyTorch and ML model training experience, perfectly complementing your FastAPI & React stack for HackAI Pune 2026.",
        "avatar": "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150"
    },
    {
        "id": "tm_arjun_03",
        "name": "Arjun Nair",
        "college": "Sardar Patel Institute of Technology (SPIT)",
        "branch": "Computer Engineering (3rd Year)",
        "skills": ["Solidity", "Smart Contracts", "Rust", "TypeScript"],
        "looking_for": "React & UI Designer for Web3 Defi Sprint",
        "synergy_score": 82,
        "synergy_reason": "Arjun specializes in smart contract protocol logic and seeks a frontend developer.",
        "avatar": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150"
    },
    {
        "id": "tm_ananya_04",
        "name": "Ananya Sen",
        "college": "COEP Technological University, Pune",
        "branch": "Electronics & Telecomm (3rd Year)",
        "skills": ["ROS", "Embedded C++", "Edge AI", "OpenCV"],
        "looking_for": "Cloud Native Backend Developer for IIT-B Challenge",
        "synergy_score": 91,
        "synergy_reason": "High synergy for robotics and hardware hackathons needing Python backend bridging.",
        "avatar": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150"
    }
]
