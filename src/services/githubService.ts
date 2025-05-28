export interface GitHubRepository {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
  created_at: string;
  topics: string[];
  homepage: string | null;
  default_branch: string;
  size: number;
  open_issues_count: number;
}

export interface ProcessedRepository {
  id: number;
  name: string;
  description: string;
  url: string;
  imageUrl?: string;
  language: string;
  stars: number;
  forks: number;
  topics: string[];
  lastUpdated: string;
  homepage?: string;
}

const GITHUB_API_BASE = 'https://api.github.com';
const GITHUB_USERNAME = 'Narden91'; 

// Fallback data in case API fails
const fallbackRepositories: ProcessedRepository[] = [
  {
    id: 1,
    name: "CryBabyParentDetector",
    description: "A project to detect and alert parents to a baby's cry using AI. Utilizes audio processing and machine learning.",
    url: "https://github.com/Narden91/CryBabyParentDetector",
    imageUrl: "https://opengraph.githubassets.com/v1/Narden91/CryBabyParentDetector",
    language: "Python",
    stars: 1,
    forks: 0,
    topics: ["machine-learning", "audio-processing", "ai"],
    lastUpdated: "2024-01-15",
  },
  {
    id: 2,
    name: "DL_approach_handwriting",
    description: "Deep Learning models for handwriting analysis and recognition. Explores various neural network architectures for medical diagnostics.",
    url: "https://github.com/Narden91/DL_approach_handwriting",
    imageUrl: "https://opengraph.githubassets.com/v1/Narden91/DL_approach_handwriting",
    language: "Python",
    stars: 2,
    forks: 0,
    topics: ["deep-learning", "handwriting-analysis", "medical-ai"],
    lastUpdated: "2024-02-10",
  },
  {
    id: 3,
    name: "SchermiMagici2",
    description: "Interactive application for creative expression and educational purposes, built with modern C# and WPF technologies.",
    url: "https://github.com/Narden91/SchermiMagici2",
    imageUrl: "https://opengraph.githubassets.com/v1/Narden91/SchermiMagici2",
    language: "C#",
    stars: 1,
    forks: 0,
    topics: ["wpf", "interactive", "education"],
    lastUpdated: "2023-11-20",
  },
  {
    id: 4,
    name: "GeoMLSoil3D",
    description: "Machine Learning for 3D soil analysis and geological data modeling. Advanced geospatial data processing and visualization.",
    url: "https://github.com/Narden91/GeoMLSoil3D",
    imageUrl: "https://opengraph.githubassets.com/v1/Narden91/GeoMLSoil3D",
    language: "Python",
    stars: 0,
    forks: 0,
    topics: ["machine-learning", "geology", "3d-modeling"],
    lastUpdated: "2023-09-15",
  },
];

/**
 * Fetches repositories from GitHub API with error handling and fallback
 */
export const fetchGitHubRepositories = async (): Promise<ProcessedRepository[]> => {
  try {
    const response = await fetch(`${GITHUB_API_BASE}/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=10`, {
      headers: {
        'Accept': 'application/vnd.github.v3+json',
      },
    });

    if (!response.ok) {
      console.warn('GitHub API request failed, using fallback data');
      return fallbackRepositories;
    }

    const repositories: GitHubRepository[] = await response.json();
    
    // Filter out forks and process the data
    const processedRepos = repositories
      .filter(repo => !repo.name.includes('.github.io') && repo.description) // Filter out GitHub Pages and repos without descriptions
      .slice(0, 6) // Limit to 6 repositories for the carousel
      .map(repo => processRepository(repo));

    return processedRepos.length > 0 ? processedRepos : fallbackRepositories;
  } catch (error) {
    console.error('Error fetching GitHub repositories:', error);
    return fallbackRepositories;
  }
};

/**
 * Processes raw GitHub repository data into our desired format
 */
const processRepository = (repo: GitHubRepository): ProcessedRepository => {
  return {
    id: repo.id,
    name: repo.name,
    description: repo.description || 'No description available',
    url: repo.html_url,
    imageUrl: `https://opengraph.githubassets.com/v1/${repo.full_name}`,
    language: repo.language || 'Unknown',
    stars: repo.stargazers_count,
    forks: repo.forks_count,
    topics: repo.topics || [],
    lastUpdated: formatDate(repo.updated_at),
    homepage: repo.homepage || undefined,
  };
};

/**
 * Formats a date string to a readable format
 */
const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

/**
 * Gets the color associated with a programming language
 */
export const getLanguageColor = (language: string): string => {
  const colors: Record<string, string> = {
    'Python': '#3776ab',
    'JavaScript': '#f1e05a',
    'TypeScript': '#2b7489',
    'C#': '#239120',
    'Java': '#b07219',
    'C++': '#f34b7d',
    'HTML': '#e34c26',
    'CSS': '#1572b6',
    'Go': '#00add8',
    'Rust': '#dea584',
    'Shell': '#89e051',
    'Dockerfile': '#384d54',
  };
  
  return colors[language] || '#586069';
};