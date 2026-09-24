import generated from './publications.generated.json';

export interface Publication {
  title: string;
  authors: string[];
  year: number | null;
  venue: string;
  pages?: string;
  volume?: string;
  type: 'journal' | 'conference' | 'preprint' | 'other';
  doi?: string;
  url?: string;
  citations?: number;
}

export interface ScholarStats {
  citations: number;
  hIndex: number;
  i10Index: number;
  updatedAt: string;
}

/** Teaching, organizational, and professional accomplishments */
export interface ProfessionalAchievement {
  title: string;
  organization: string;
  date: string;
  description: string;
  type: 'teaching' | 'organization' | 'certification' | 'award';
}

export interface Certification {
  name: string;
  issuer: string;
  date: string;
  id?: string;
  description?: string;
}

// Written by scripts/fetch-publications.mjs (ORCID + Crossref + Google Scholar).
// Do not edit by hand: run `npm run fetch:pubs` to refresh.
export const publicationsData = generated.publications as Publication[];
export const scholarStats = generated.scholar as ScholarStats | null;
export const publicationsUpdatedAt = generated.updatedAt;

export const professionalAchievementsData: ProfessionalAchievement[] = [
  {
    title: "Best EvoApps Paper Award",
    organization: "EvoStar 2026, Toulouse (FR)",
    date: "2026",
    description: "Awarded for \"Toward reliable uncertainty quantification in surrogate-assisted evolutionary algorithms via temporal conformal prediction\" (EvoApplications 2026, LNCS).",
    type: "award"
  },
  {
    title: "Guest Editor",
    organization: "Big Data and Cognitive Computing (MDPI)",
    date: "2026",
    description: "Special Issue \"AI-Driven Pattern Recognition for Next-Generation Biometrics\".",
    type: "organization"
  },
  {
    title: "Workshop Chair — BIOMAP @ ICPR 2026",
    organization: "BIO-inspired Methods for Pattern Recognition",
    date: "2026",
    description: "Chair of the BIOMAP workshop at the International Conference on Pattern Recognition 2026.",
    type: "organization"
  },
  {
    title: "Journal Reviewer",
    organization: "8 international journals",
    date: "2024 - present",
    description: "19 verified reviews: Engineering Applications of Artificial Intelligence (3), Applied Soft Computing (3), Scientific Reports (3), Discover Artificial Intelligence (3), Intelligence-Based Medicine (3), Computers in Human Behavior Reports (2), International Journal of Computational Intelligence Systems (1), BMC Medical Education (1).",
    type: "organization"
  },
  {
    title: "Conference Reviewer",
    organization: "GECCO, PPSN, ICPR workshops",
    date: "2024 - 2026",
    description: "GECCO 2026, PPSN 2026, BIOMAP @ ICPR 2026, AHIA @ ICPR 2026, MCMI @ ICPR 2024.",
    type: "organization"
  },
  {
    title: "Conference Presentations",
    organization: "EvoStar, ICIAP, IGS",
    date: "2023 - 2026",
    description: "EvoStar 2026 Toulouse, 2025 Trieste, 2024 Aberystwyth; ICIAP 2025 Rome; IGS 2025 Montréal and 2023 Évora.",
    type: "teaching"
  },
  {
    title: "IEEE Trainer for Europe",
    organization: "IEEE Region 8",
    date: "11/2024",
    description: "Cross-European trainer credential.",
    type: "certification"
  },
  {
    title: "Invited Speaker — InnovActionPillsOnAir",
    organization: "Rotaract Club Cassino",
    date: "",
    description: "Podcast series on AI and innovation.",
    type: "teaching"
  }
];

export const certificationsData: Certification[] = [
  {
    name: "AI Literacy (EU AI Act)",
    issuer: "Eduhouse Oy",
    date: "04/2026"
  },
  {
    name: "Hugging Face AI Agents Fundamentals",
    issuer: "Hugging Face",
    date: "2025"
  },
  {
    name: "Master in Europrogettazione",
    issuer: "EU project design course",
    date: "09/2024 - 12/2024"
  },
  {
    name: "Microsoft Certified: Azure AI Fundamentals",
    issuer: "Microsoft",
    date: "June 2022",
    description: "Foundational knowledge of machine learning and AI concepts and related Microsoft Azure services"
  },
  {
    name: "Professional Qualification to Practise Engineering (Esame di Stato)",
    issuer: "Italian State Examination",
    date: "December 2021"
  },
  {
    name: "ESB Level 1 Certificate in ESOL International All Modes",
    issuer: "English Speaking Board",
    date: "2021"
  },
  {
    name: "Advanced schools",
    issuer: "DataSLO, ACDL, and others",
    date: "2022 - 2025",
    description: "DataSLO Summer School (2025); ACDL 2024 (Deep Learning, Data Science, GenAI); Ethics and AI (2023); Intelligent Sensing Winter School (2022)."
  }
];

export const technicalSkillsData = {
  "Programming Languages": ["Python", "C++", "C#", "Java", "SQL", "JavaScript"],
  "AI/ML Frameworks": ["PyTorch", "TensorFlow", "scikit-learn", "pandas", "NumPy"],
  "Machine Learning Methods": ["Evolutionary computation", "Feature selection", "Genetic programming", "Multimodal learning", "Bayesian networks", "Conformal prediction"],
  "Explainable AI": ["SHAP", "Attention visualisation"],
  "Agentic AI": ["LangChain", "LangGraph", "smolagents"],
  "Cloud & DevOps": ["Docker", "Kubernetes (GPU orchestration)", "Linux", "MongoDB", "CINECA HPC (EuroHPC Tier-0)"],
  "Photonics & Spectral Data": ["Inverse problems", "Transfer Matrix Method", "THz and Raman spectroscopy data", "Image segmentation"],
  "Desktop & Acquisition": ["C# / WPF", ".NET", "Wacom SDK"]
};

export const languagesData = [
  {
    language: "Italian",
    level: "Native",
    description: "Mother tongue"
  },
  {
    language: "English",
    level: "C1",
    description: "Professional working proficiency"
  }
];
