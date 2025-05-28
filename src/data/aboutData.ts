export interface AboutData {
  summary: string[];
  expertise: string[];
  currentRole: string;
  researchFocus: string;
}

export const aboutData: AboutData = {
  summary: [
    "I am a PhD student focused on developing AI-driven medical diagnostic tools through machine learning and artificial intelligence applications. I analyze multiple data sources - handwriting dynamics, neuroimaging, and biological markers - to create early detection methods for Neurodegenerative Diseases (ND) and Specific Learning Disorders (SLD).",
    "My research utilizes deep learning architectures, specifically Transformers and CNNs, to build diagnostic frameworks that show promising results in the early detection of conditions like Alzheimer's disease using offline handwriting images. I implement explainability tools such as SHAP values and attention visualization to ensure that AI-driven diagnoses provide clear insights for healthcare practitioners."
  ],
  expertise: [
    "Deep Learning (Transformers, CNNs) for Medical Diagnostics",
    "Handwriting Analysis & Biometric Pattern Recognition",
    "Machine Learning for Neurodegenerative Disease Detection",
    "Data Augmentation & Feature Selection Optimization",
    "Bayesian Networks & Genetic Programming",
    "Explainable AI (SHAP, Attention Visualization)",
    "Multi-modal Classification Systems",
    "Software Development (Python, C#, C++, Java)",
    "MLOps & Container Technologies (Docker, Kubernetes)",
    "Agentic AI Development (LangChain, LangGraph)"
  ],
  currentRole: "PhD Student at University of Cassino and Southern Lazio - Department of Electrical and Information Engineering (DIEI)",
  researchFocus: "Digital handwriting analysis using Machine and Deep Learning techniques for early diagnosis of Specific Learning Disorders (SLD) in children and neurodegenerative diseases like Alzheimer's and Parkinson's. Evolutionary algorithms and Bayesian networks. Genetic programming for feature selection and optimization in medical data analysis.",
};