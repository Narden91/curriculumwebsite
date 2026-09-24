export interface ResearchTheme {
  title: string;
  text: string;
}

// Wording follows the CV profile and publication titles.
export const researchThemes: ResearchTheme[] = [
  {
    title: "Evolutionary feature selection",
    text: "Genetic algorithms and genetic programming that choose which features a classifier should use, including causality-driven and data-augmented variants.",
  },
  {
    title: "Multimodal classifier combination",
    text: "Combining handwriting tasks, feature sets and models with Bayesian networks and ensemble methods.",
  },
  {
    title: "Uncertainty you can check",
    text: "Conformal prediction for reliable surrogate-assisted evolutionary algorithms: Best EvoApps Paper Award, EvoStar 2026.",
  },
  {
    title: "Explainable, applied AI",
    text: "SHAP and attention maps for handwriting-based detection of Alzheimer's disease; now spectral data, inverse problems and image segmentation in photonics.",
  },
];

export interface AboutData {
  summary: string[];
  expertise: string[];
  currentRole: string;
  researchFocus: string;
}

export const aboutData: AboutData = {
  summary: [
    "I hold a PhD in Artificial Intelligence (10/2025) from the University of Cassino and Southern Lazio. I work on machine learning and pattern recognition methods for decision support: evolutionary computation and feature selection, multimodal classification and classifier combination, uncertainty quantification with conformal prediction, and explainable AI.",
    "My PhD applied these methods to handwriting analysis for the early detection of cognitive and developmental disorders, with first-author papers in Engineering Applications of Artificial Intelligence, Computers in Biology and Medicine and Pattern Recognition Letters. Our EvoStar 2026 paper on conformal prediction in surrogate-assisted evolutionary algorithms received the Best EvoApps Paper Award.",
    "Since 02/2026 I am a postdoctoral researcher at the University of Eastern Finland, where I use the same methods for inverse problems, spectral data analysis and image segmentation in photonics, as AI/ML lead on the Horizon Europe project HERMES. I also teach Artificial Intelligence as an adjunct lecturer (MSc LM-32) and serve as Guest Editor, Workshop Chair and journal reviewer.",
  ],
  expertise: [
    "Evolutionary computation and feature selection",
    "Multimodal classification and classifier combination",
    "Conformal prediction and uncertainty quantification",
    "Bayesian networks and genetic programming",
    "Explainable AI (SHAP, attention)",
    "Handwriting analysis for cognitive disorder detection",
    "Inverse problems and spectral data analysis in photonics",
    "Agentic AI (LangChain, LangGraph, smolagents)",
    "Python, C++, C#, Java; PyTorch, TensorFlow, scikit-learn",
    "Docker, Kubernetes (GPU orchestration), CINECA HPC",
  ],
  currentRole: "Postdoctoral Researcher, Center for Photonics Sciences, University of Eastern Finland (Joensuu). AI/ML lead on HERMES (Horizon Europe).",
  researchFocus: "Machine learning and pattern recognition for decision support: evolutionary feature selection, multimodal classifier combination, conformal prediction and explainable AI. Applied to handwriting-based early detection of cognitive and developmental disorders, and now to optical and spectral data, inverse-problem reconstruction and image segmentation in photonics.",
};
