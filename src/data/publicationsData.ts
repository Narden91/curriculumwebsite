export interface Publication {
  title: string;
  authors: string[];
  year: number;
  venue: string;
  pages?: string;
  volume?: string;
  type: 'journal' | 'conference' | 'workshop' | 'symposium';
  doi?: string;
  abstract?: string;
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

export const publicationsData: Publication[] = [
  {
    title: "How Data Augmentation Affects Evolutionary Algorithms in Feature Selection: An Experimental Study",
    authors: ["Emanuele Nardone", "Tiziana D'Alessandro", "Claudio De Stefano", "Francesco Fontanella", "Alessandra Scotto di Freca"],
    year: 2025,
    venue: "Springer Nature Computer Science",
    volume: "6",
    pages: "536",
    type: "journal"
  },
  {
    title: "Handwriting strokes as biomarkers for Alzheimer's disease prediction: A novel machine learning approach",
    authors: ["Emanuele Nardone", "Claudio De Stefano", "Nicole Dalia Cilia", "Francesco Fontanella"],
    year: 2025,
    venue: "Computers in Biology and Medicine",
    volume: "190",
    pages: "110039",
    type: "journal"
  },
  {
    title: "A Bayesian network combiner for multimodal handwriting analysis in Alzheimer's disease detection",
    authors: ["Emanuele Nardone", "Tiziana D'Alessandro", "Claudio De Stefano", "Francesco Fontanella", "Alessandra Scotto di Freca"],
    year: 2025,
    venue: "Pattern Recognition Letters",
    volume: "190",
    pages: "177-184",
    type: "journal"
  },
  {
    title: "Transformers and CNNs in Neurodiagnostics: Handwriting Analysis for Alzheimer's Diagnosis",
    authors: ["Gabriele Lozupone", "Emanuele Nardone", "Cesare D. Pace", "Tiziana D'Alessandro"],
    year: 2025,
    venue: "International Conference on Pattern Recognition",
    pages: "447-463",
    type: "conference"
  },
  {
    title: "From Handwriting Analysis to Alzheimer's Disease Prediction: An Experimental Comparison of Classifier Combination Methods",
    authors: ["Tiziana D'Alessandro", "Claudio De Stefano", "Francesco Fontanella", "Emanuele Nardone", "Cesare D. Pace"],
    year: 2024,
    venue: "International Conference on Document Analysis and Recognition",
    pages: "334-351",
    type: "conference"
  },
  {
    title: "Integrating Data Augmentation in Evolutionary Algorithms for Feature Selection: A Preliminary Study",
    authors: ["Tiziana D'Alessandro", "Claudio De Stefano", "Francesco Fontanella", "Emanuele Nardone"],
    year: 2024,
    venue: "International Conference on the Applications of Evolutionary Computation",
    type: "conference"
  },
  {
    title: "UniCas for Medicine and Healthcare",
    authors: ["Marco Cantone", "Svonko Galasso", "Gabriele Lozupone", "Emanuele Nardone", "Cesare D. Pace", "Ciro Russo"],
    year: 2024,
    venue: "Ital-IA",
    type: "conference"
  },
  {
    title: "Feature Evaluation in Handwriting Analysis for Alzheimer's Disease Using Bayesian Network",
    authors: ["Tiziana D'Alessandro", "Claudio De Stefano", "Francesco Fontanella", "Emanuele Nardone", "Alessandra Scotto di Freca"],
    year: 2023,
    venue: "International Graphonomics Conference",
    pages: "122-135",
    type: "conference"
  },
  {
    title: "A Genetic Algorithm for Feature Selection for Alzheimer's Disease Detection Using a Deep Transfer Learning Approach",
    authors: ["Tiziana D'Alessandro", "Claudio De Stefano", "Francesco Fontanella", "Emanuele Nardone"],
    year: 2023,
    venue: "Italian Workshop on Artificial Life and Evolutionary Computation",
    pages: "309-323",
    type: "workshop"
  },
  {
    title: "Predicting Alzheimer's Disease: A Stroke-Based Handwriting Analysis Approach Based on Machine Learning",
    authors: ["Nicole Dalia Cilia", "Tiziana D'Alessandro", "Claudio De Stefano", "Francesco Fontanella", "Emanuele Nardone"],
    year: 2022,
    venue: "International Conference on Pattern Recognition",
    pages: "632-643",
    type: "conference"
  },
  {
    title: "Machine Learning for Early Diagnosis of Neurodegenerative Diseases Through Handwriting Analysis",
    authors: ["Emanuele Nardone", "Francesco Fontanella", "Claudio De Stefano"],
    year: 2021,
    venue: "1st INTERNATIONAL PhD SYMPOSIUM ON ENGINEERING AND SPORT SCIENCE",
    pages: "219",
    type: "symposium"
  },
  {
    title: "How Smart and Green? A Simulation Model of Demand Cost Perception in the Electricity Market",
    authors: ["Ciro Russo", "Tobias Grossauer", "Emanuele Nardone", "Zafeiris Kokkinogenis", "Rosaldo J. F. Rossetti"],
    year: 2020,
    venue: "IEEE International Smart Cities Conference (ISC2)",
    pages: "1-8",
    type: "conference"
  }
];

export const professionalAchievementsData: ProfessionalAchievement[] = [
  {
    title: "Tutor - Corso di Alta Formazione on LLM Tools",
    organization: "University of Cassino and Southern Lazio",
    date: "February 2025 - June 2025",
    description: "Delivered frontal lessons and exercises on LLM tools and their application for industrial workflow optimization. Supervised students throughout the program and provided guidance for their final projects.",
    type: "teaching"
  },
  {
    title: "Adjunct Instructor - Computer Engineering Department",
    organization: "University of Cassino and Southern Lazio",
    date: "Fall 2024",
    description: "Delivered practical instruction in artificial intelligence as part of the Master's degree program in Computer Engineering (LM-32). Focused on developing students' hands-on capabilities through interactive learning sessions and practical exercises.",
    type: "teaching"
  },
  {
    title: "Oral Session Chairman - ISESS 2023",
    organization: "University of Cassino and Southern Lazio",
    date: "October 2023",
    description: "Member of the Organization Committee of the 1st International PhD Symposium on Engineering and Sport Sciences and Oral session Chairman.",
    type: "organization"
  },
  {
    title: "Cybersecurity Instructor - CyberChallenge.IT 2023",
    organization: "Cybersecurity National Lab, CINI",
    date: "June 2023",
    description: "Played a pivotal role at the University of Cassino and Southern Lazio location, facilitating hands-on learning and skill development in cybersecurity for participants. Engaged in delivering cybersecurity exercises, creating a dynamic and interactive learning environment.",
    type: "teaching"
  }
];

export const certificationsData: Certification[] = [
  {
    name: "Professional Qualification to Practice Software Engineering",
    issuer: "Italian Engineering Council",
    date: "December 2021",
    description: "Official professional qualification enabling practice as a Software Engineer in Italy"
  },
  {
    name: "Microsoft Certified: Azure AI Fundamentals",
    issuer: "Microsoft",
    date: "June 2022",
    description: "Certification demonstrating foundational knowledge of artificial intelligence and machine learning concepts and related Microsoft Azure services"
  },
  {
    name: "ESB LEVEL 1 Certificate in ESOL International All Modes",
    issuer: "English Speaking Board",
    date: "2021",
    description: "English language proficiency certification at B2 level (Upper Intermediate)"
  }
];

export const technicalSkillsData = {
  "Programming Languages": ["Python", "C++", "C#", "Java", "JavaScript", "SQL"],
  "AI/ML Frameworks": ["TensorFlow", "PyTorch", "scikit-learn", "Keras", "Transformers", "OpenCV"],
  "Data Science": ["pandas", "NumPy", "matplotlib", "seaborn", "Jupyter", "SciPy"],
  "Medical AI": ["Handwriting Analysis", "Biomarker Detection", "Medical Image Processing", "Signal Processing"],
  "Deep Learning": ["CNNs", "Transformers", "RNNs", "Autoencoders", "Transfer Learning", "Attention Mechanisms"],
  "Machine Learning": ["Bayesian Networks", "Genetic Programming", "Feature Selection", "Ensemble Methods", "SVM", "Random Forest"],
  "Explainable AI": ["SHAP", "Attention Visualization", "Feature Importance", "Model Interpretation"],
  "Development Tools": ["Git", "Docker", "Kubernetes", "Linux", "Windows", "Visual Studio", "VS Code"],
  "Databases": ["SQL Server", "MongoDB", "MySQL", "PostgreSQL"],
  "Cloud & DevOps": ["Microsoft Azure", "Docker", "Kubernetes", "CI/CD"],
  "Agentic AI": ["LangChain", "LangGraph", "smolagents", "RAG Systems"],
  "Desktop Development": ["WPF", ".NET Framework", "Windows API", "Wacom SDK"],
  "Data Acquisition": ["Wacom Tablets", "Sensor Data", "Real-time Processing", "Signal Analysis"]
};

export const languagesData = [
  {
    language: "Italian",
    level: "Native",
    description: "Mother tongue"
  },
  {
    language: "English", 
    level: "B2 (Upper Intermediate)",
    description: "Professional working proficiency, certified by ESB"
  }
];