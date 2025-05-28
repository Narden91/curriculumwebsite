export interface GithubRepo {
  id: number;
  name: string;
  description: string;
  url: string;
  imageUrl?: string; // Optional: for a preview image of the project
  language: string; // Primary language of the repo
  stars: number;
  forks: number;
}

export const githubRepoData: GithubRepo[] = [
  {
    id: 1,
    name: "CryBabyParentDetector",
    description: "A project to detect and alert parents to a baby's cry using AI. Utilizes audio processing and machine learning.",
    url: "https://github.com/Narden91/CryBabyParentDetector",
    imageUrl: "https://via.placeholder.com/400x200/FFC0CB/000000?Text=Cry+Baby+Detector",
    language: "Python",
    stars: 1, // Placeholder, update with actual
    forks: 0, // Placeholder, update with actual
  },
  {
    id: 2,
    name: "DL_approach_handwriting",
    description: "Deep Learning models for handwriting analysis and recognition. Explores various neural network architectures.",
    url: "https://github.com/Narden91/DL_approach_handwriting",
    imageUrl: "https://via.placeholder.com/400x200/87CEEB/000000?Text=DL+Handwriting",
    language: "Python",
    stars: 2, // Placeholder, update with actual
    forks: 0, // Placeholder, update with actual
  },
  {
    id: 3,
    name: "SchermiMagici2",
    description: "Interactive application, potentially for creative expression or educational purposes, built with C#.",
    url: "https://github.com/Narden91/SchermiMagici2",
    imageUrl: "https://via.placeholder.com/400x200/E6E6FA/000000?Text=Schermi+Magici+2",
    language: "C#",
    stars: 1, // Placeholder, update with actual
    forks: 0, // Placeholder, update with actual
  },
  {
    id: 4,
    name: "GeoMLSoil3D",
    description: "Machine Learning for 3D soil analysis and geological data modeling. Focuses on geospatial data.",
    url: "https://github.com/Narden91/GeoMLSoil3D",
    imageUrl: "https://via.placeholder.com/400x200/98FB98/000000?Text=GeoML+Soil+3D",
    language: "Python",
    stars: 0, // Placeholder, update with actual
    forks: 0, // Placeholder, update with actual
  },
];
