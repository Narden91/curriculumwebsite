export interface ExperienceEntry {
  company: string;
  role: string;
  duration: string;
  location?: string;
  responsibilities: string[];
  achievements?: string[];
  technologies?: string[];
  supervisors?: string[];
  sortOrder: number; // Add this for proper sorting
}

export const experienceData: ExperienceEntry[] = [
  {
    company: "University of Eastern Finland — Center for Photonics Sciences",
    role: "Postdoctoral Researcher",
    duration: "02/2026 - present",
    location: "Joensuu, Finland",
    responsibilities: [
      "ML/DL for optical and spectral data, inverse-problem reconstruction and image segmentation (PROFI6 programme)",
      "AI/ML lead on HERMES (Horizon Europe): Python and C++ pipelines for Transfer Matrix Method optimisation and inverse-problem reconstruction from experimental photonic data",
      "Interactive dashboards for spectral and material analysis",
      "AI/ML contributor to THz-Skin: sample-library and data-analysis workflow design"
    ],
    achievements: [
      "Co-supervisor of an iPSRS Erasmus Mundus Joint Master research internship (06-08/2026): Raman hyperspectral preprocessing and spectral ratio analysis pipeline for THz-Skin"
    ],
    technologies: ["Python", "C++", "PyTorch", "scikit-learn", "CINECA HPC"],
    supervisors: ["Prof. P. Kuzhir", "Prof. G. Fedorov"],
    sortOrder: 1
  },
  {
    company: "Monozukuri S.p.A. (UEF-funded under HERMES)",
    role: "Industrial Secondment",
    duration: "2026, 4 months",
    location: "Rome, Italy",
    responsibilities: [
      "Feasibility study on THz-based non-invasive glucose detection",
      "Design of AI/ML signal-processing pipelines for THz spectroscopic biosensing data"
    ],
    technologies: ["Python", "Signal processing"],
    sortOrder: 2
  },
  {
    company: "University of Cassino and Southern Lazio",
    role: "Adjunct Lecturer — Artificial Intelligence (MSc LM-32)",
    duration: "A.Y. 2024/25 and 2025/26",
    location: "Cassino, Italy",
    responsibilities: [
      "Adjunct lecturer (docente a contratto) in Artificial Intelligence, MSc in Computer Engineering, 14 h per academic year",
      "Python for machine learning and supervised learning",
      "Metaheuristic optimisation and evolutionary algorithms",
      "Graph optimisation algorithms (Dijkstra, minimum spanning tree) and neural networks"
    ],
    technologies: ["Python", "TensorFlow", "PyTorch"],
    supervisors: ["Prof. Francesco Fontanella", "Prof. Claudio De Stefano"],
    sortOrder: 3
  },
  {
    company: "University of Cassino and Southern Lazio",
    role: "Tutor — Advanced Training Course on Generative AI",
    duration: "02/2025 - 05/2025",
    location: "Cassino, Italy",
    responsibilities: [
      "30 h of hands-on sessions with notebooks on generative AI and large language models",
      "Ethics, reproducibility and responsible use of AI",
      "Agentic AI systems and LLM tools for industrial workflows",
      "Supervision of participants' final projects"
    ],
    technologies: ["Python", "PyTorch", "LangChain", "OpenAI API", "Hugging Face"],
    supervisors: ["Prof. Francesco Fontanella", "Prof. Claudio De Stefano"],
    sortOrder: 4
  },
  {
    company: "University of Cassino and Southern Lazio",
    role: "Invited Seminars",
    duration: "07/2024 and 01/2025",
    location: "Cassino, Italy",
    responsibilities: [
      "Kubernetes and GPU resource management, AIDA LAB (01/2025, 2 h)",
      "Frontiers in AI: generative models, self-supervised learning, diffusion (07/2024, 2 h)"
    ],
    technologies: ["Kubernetes", "Docker", "GPU scheduling"],
    sortOrder: 5
  },
  {
    company: "University of Cassino and Southern Lazio",
    role: "Tutor — PCTO Programme",
    duration: "01/2025",
    location: "Cassino, Italy",
    responsibilities: [
      "20 h introduction to machine learning and Python for secondary-school students (pre-university outreach)"
    ],
    technologies: ["Python", "scikit-learn"],
    sortOrder: 6
  },
  {
    company: "University of Cassino and Southern Lazio — DIEI",
    role: "Research Fellow",
    duration: "04/2021 - 08/2022",
    location: "Cassino, Italy",
    responsibilities: [
      "Two consecutive research fellowships",
      "ML pipelines for the early diagnosis of cognitive impairment from handwriting",
      "Feature extraction and selection for handwriting biomarkers",
      "Design and development of C#/WPF acquisition software for Wacom digitising tablets, used for clinical data collection"
    ],
    achievements: [
      "Developed the stroke-based handwriting features later published in Computers in Biology and Medicine (2025)",
      "Built the handwriting acquisition software used for data collection in the PRIN2022 project"
    ],
    technologies: ["Python", "scikit-learn", "pandas", "NumPy", "C#", "WPF", ".NET", "Wacom SDK"],
    supervisors: ["Prof. Claudio De Stefano", "Prof. Francesco Fontanella"],
    sortOrder: 7
  },
  {
    company: "Corso GenAI Pignataro/Latina",
    role: "Instructor",
    duration: "2025",
    location: "Pignataro/Latina, Italy",
    responsibilities: [
      "Teaching Generative AI fundamentals and applications",
      "Teaching Large Language Models (LLMs) architecture and implementation",
      "Teaching AI Ethics and responsible AI development",
      "Teaching Agentic AI systems and autonomous agents"
    ],
    technologies: ["Python", "TensorFlow", "PyTorch", "LangChain", "OpenAI API", "Hugging Face"],
    sortOrder: 8
  },
  {
    company: "University of Cassino and Southern Lazio — ISESS 2023",
    role: "Conference Organizer & Session Chair",
    duration: "October 2023",
    location: "Cassino, Italy",
    responsibilities: [
      "Member of the Organization Committee of the 1st International PhD Symposium on Engineering and Sport Sciences",
      "Chair of an oral presentation session on engineering and sport sciences"
    ],
    sortOrder: 9
  },
  {
    company: "Cybersecurity National Lab, CINI — CyberChallenge.IT 2023",
    role: "Cybersecurity Instructor",
    duration: "June 2023",
    location: "Cassino, Italy",
    responsibilities: [
      "Hands-on cybersecurity training for university students at the Cassino site",
      "Practical exercises and challenges for participants"
    ],
    technologies: ["Linux", "Network Security", "Penetration Testing", "Cryptography", "Python", "Bash Scripting"],
    sortOrder: 10
  }
];
