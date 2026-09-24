export interface Degree {
  institution: string;
  degree: string;
  field: string;
  year: string;
  dissertationTitle?: string;
  supervisors?: string[];
  honors?: string;
  relevantCoursework?: string[];
  additionalInfo?: string[];
  sortOrder: number; // Add this for proper sorting
}


export const educationData: Degree[] = [
  {
    institution: "University of Cassino and Southern Lazio",
    degree: "PhD in Artificial Intelligence",
    field: "Department of Electrical and Information Engineering (DIEI)",
    year: "11/2022 - 10/2025",
    dissertationTitle: "AI-Based Handwriting Analysis for Early Detection of Developmental and Cognitive Disorders",
    supervisors: [
      "Prof. Francesco Fontanella",
      "Prof. Claudio De Stefano",
      "Prof. Leonardo Vanneschi (co-supervisor)"
    ],
    additionalInfo: [
      "ML/DL for neurodegenerative diseases",
      "ML/DL for specific learning disorders",
      "Evolutionary algorithms",
      "Conformal prediction",
      "Genetic programming"
    ],
    sortOrder: 1
  },
  {
    institution: "NOVA IMS, Universidade Nova de Lisboa",
    degree: "Visiting PhD Researcher",
    field: "Genetic Programming for multimodal classification",
    year: "05/2024 - 08/2024",
    additionalInfo: [
      "International research collaboration",
      "Genetic programming for multimodal data fusion"
    ],
    supervisors: [
      "Prof. Leonardo Vanneschi (host)"
    ],
    sortOrder: 2
  },
  {
    institution: "University of Cassino and Southern Lazio",
    degree: "MSc in Software Engineering (LM-32)",
    field: "Software Engineering",
    year: "2019 - 03/2021",
    dissertationTitle: "A stroke-based Machine Learning approach for early diagnosis of neurodegenerative diseases",
    honors: "110/110 summa cum laude",
    relevantCoursework: [
      "Advanced Software Engineering",
      "Machine Learning Fundamentals",
      "Data Structures and Algorithms",
      "Database Design and Management",
      "Computer Vision and Pattern Recognition",
      "Statistical Data Analysis"
    ],
    sortOrder: 3
  },
  {
    institution: "FEUP, University of Porto",
    degree: "Erasmus+ Exchange",
    field: "Engineering",
    year: "2020",
    additionalInfo: [
      "European student exchange during the MSc"
    ],
    sortOrder: 4
  },
  {
    institution: "Italy — State Examination",
    degree: "Esame di Stato",
    field: "Professional qualification to practise engineering",
    year: "12/2021",
    sortOrder: 5
  }
];
