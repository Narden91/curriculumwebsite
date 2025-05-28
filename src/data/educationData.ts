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
    degree: "Doctor of Philosophy (PhD)",
    field: "Artificial Intelligence - Department of Electrical and Information Engineering (DIEI)",
    year: "2022 - Present",
    // dissertationTitle: "Digital handwriting analysis using Machine and Deep Learning techniques for early diagnosis of DSA in children",
    supervisors: [
      "Prof. Francesco Fontanella",
      "Prof. Claudio De Stefano", 
      "Prof. Leonardo Vanneschi"
    ],
    additionalInfo: [
      "Developed C# WPF application for data acquisition for the PRIN2022 project on Alzheimer's disease through voice and handwriting",
      "Developed AI and Acquisition system for Parkinson's disease through handwriting for San Raffaele Cassino",
      "Developed AI pipeline for handwriting analysis"
    ],
    sortOrder: 1
  },
  {
    institution: "University of NOVA IMS - Lisbon",
    degree: "PhD Period Abroad",
    field: "Genetic Programming & Multi-modal Classification",
    year: "2024",
    // dissertationTitle: "Genetic Programming approach for Multi-modal classification system",
    additionalInfo: [
      "International research collaboration",
      "Advanced genetic programming techniques",
      "Multi-modal data fusion methodologies"
    ],
    supervisors: [
      "Prof. Leonardo Vanneschi"
    ],
    sortOrder: 2
  },
  {
    institution: "University of Cassino and Southern Lazio",
    degree: "Master's Degree",
    field: "Software Engineering",
    year: "2019 - 2021",
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
    institution: "Faculdade de Engenharia da Universidade do Porto",
    degree: "Erasmus+ Exchange Program",
    field: "Engineering",
    year: "2020",
    additionalInfo: [
      "European Student Exchange Program",
      "International academic experience",
      "Cross-cultural engineering education",
      "Portuguese language and culture immersion"
    ],
    sortOrder: 4
  }
];