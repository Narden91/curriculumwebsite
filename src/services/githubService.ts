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

// Pinned repositories - these will always appear first
const PINNED_REPOS = [
  'f1_ai_race_xrp',
  'SmartTravel',
  'SmartAdvisor'
];

// Fallback data in case API fails
const fallbackRepositories: ProcessedRepository[] = [
  {
    id: 1,
    name: "f1_ai_race_xrp",
    description: "Privacy-preserving F1-AI racing platform using FHE and DKG for secure blockchain gaming with XRP.",
    url: "https://github.com/Narden91/f1_ai_race_xrp",
    imageUrl: "https://opengraph.githubassets.com/v1/Narden91/f1_ai_race_xrp",
    language: "Python",
    stars: 0,
    forks: 0,
    topics: ["blockchain", "cryptography", "xrpl", "fhe", "gaming"],
    lastUpdated: "Nov 2025",
  },
  {
    id: 2,
    name: "SmartTravel",
    description: "AI-powered travel planning application leveraging machine learning for personalized itinerary recommendations and optimization.",
    url: "https://github.com/Narden91/SmartTravel",
    imageUrl: "https://opengraph.githubassets.com/v1/Narden91/SmartTravel",
    language: "Python",
    stars: 0,
    forks: 0,
    topics: ["ai", "travel", "machine-learning", "recommendations"],
    lastUpdated: "2024",
  },
  {
    id: 3,
    name: "SmartAdvisor",
    description: "Intelligent advisory system using AI to provide personalized recommendations and decision support.",
    url: "https://github.com/Narden91/SmartAdvisor",
    imageUrl: "https://opengraph.githubassets.com/v1/Narden91/SmartAdvisor",
    language: "Python",
    stars: 0,
    forks: 0,
    topics: ["ai", "advisory", "recommendations", "nlp"],
    lastUpdated: "2024",
  },
  {
    id: 4,
    name: "CryBabyParentDetector",
    description: "A project to detect and alert parents to a baby's cry using AI. Utilizes audio processing and machine learning.",
    url: "https://github.com/Narden91/CryBabyParentDetector",
    imageUrl: "https://opengraph.githubassets.com/v1/Narden91/CryBabyParentDetector",
    language: "Python",
    stars: 1,
    forks: 0,
    topics: ["machine-learning", "audio-processing", "ai"],
    lastUpdated: "Jan 2024",
  },
  {
    id: 5,
    name: "DL_approach_handwriting",
    description: "Deep Learning models for handwriting analysis and recognition. Explores various neural network architectures for medical diagnostics.",
    url: "https://github.com/Narden91/DL_approach_handwriting",
    imageUrl: "https://opengraph.githubassets.com/v1/Narden91/DL_approach_handwriting",
    language: "Python",
    stars: 2,
    forks: 0,
    topics: ["deep-learning", "handwriting-analysis", "medical-ai"],
    lastUpdated: "Feb 2024",
  },
  {
    id: 6,
    name: "GeoMLSoil3D",
    description: "Machine Learning for 3D soil analysis and geological data modeling. Advanced geospatial data processing and visualization.",
    url: "https://github.com/Narden91/GeoMLSoil3D",
    imageUrl: "https://opengraph.githubassets.com/v1/Narden91/GeoMLSoil3D",
    language: "Python",
    stars: 0,
    forks: 0,
    topics: ["machine-learning", "geology", "3d-modeling"],
    lastUpdated: "Sep 2023",
  },
];

/**
 * Fetches README content and extracts a brief description (max 20 words)
 */
const fetchReadmeDescription = async (fullName: string): Promise<string | null> => {
  try {
    const response = await fetch(`${GITHUB_API_BASE}/repos/${fullName}/readme`, {
      headers: {
        'Accept': 'application/vnd.github.v3+json',
      },
    });

    if (!response.ok) {
      return null;
    }

    const data = await response.json();
    const content = atob(data.content); // Decode base64 content

    // Extract first meaningful paragraph (skip headers, badges, images)
    const lines = content.split('\n');
    let description = '';

    for (const line of lines) {
      const trimmed = line.trim();
      // Skip empty lines, headers, badges, images, and HTML comments
      if (!trimmed ||
        trimmed.startsWith('#') ||
        trimmed.startsWith('![') ||
        trimmed.startsWith('[![') ||
        trimmed.startsWith('<') ||
        trimmed.startsWith('---')) {
        continue;
      }

      description = trimmed;
      break;
    }

    if (!description) {
      return null;
    }

    // Truncate to 20 words intelligently
    const words = description.split(' ');
    if (words.length <= 20) {
      return description;
    }

    return words.slice(0, 20).join(' ') + '...';
  } catch (error) {
    console.error(`Error fetching README for ${fullName}:`, error);
    return null;
  }
};

/**
 * Fetches repositories from GitHub API with error handling and fallback
 */
export const fetchGitHubRepositories = async (): Promise<ProcessedRepository[]> => {
  try {
    const response = await fetch(`${GITHUB_API_BASE}/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=30`, {
      headers: {
        'Accept': 'application/vnd.github.v3+json',
      },
    });

    if (!response.ok) {
      console.warn('GitHub API request failed, using fallback data');
      return fallbackRepositories;
    }

    const data = await response.json();
    const repositories = Array.isArray(data) ? data : [];

    // Filter out forks and archived repos if desired, or just use all
    // Also filter out the template repo
    const validRepos = repositories.filter((repo: any) =>
      !repo.fork && !repo.archived && repo.name !== 'GA_template'
    );

    const pinnedRepos: GitHubRepository[] = [];
    const otherRepos: GitHubRepository[] = [];

    validRepos.forEach((repo: any) => {
      if (PINNED_REPOS.includes(repo.name)) {
        pinnedRepos.push(repo);
      } else if (!repo.name.includes('.github.io') && repo.description) {
        otherRepos.push(repo);
      }
    });

    // Sort pinned repos by defined order
    pinnedRepos.sort((a, b) => {
      return PINNED_REPOS.indexOf(a.name) - PINNED_REPOS.indexOf(b.name);
    });

    // Combine: pinned first, then others, limit to 6 total
    const selectedRepos = [...pinnedRepos, ...otherRepos].slice(0, 6);

    // Process repositories with README descriptions
    const processedRepos = await Promise.all(
      selectedRepos.map(async (repo) => {
        const readmeDesc = await fetchReadmeDescription(repo.full_name);
        return processRepository(repo, readmeDesc);
      })
    );

    return processedRepos.length > 0 ? processedRepos : fallbackRepositories;
  } catch (error) {
    console.error('Error fetching GitHub repositories:', error);
    return fallbackRepositories;
  }
};

/**
 * Processes raw GitHub repository data into our desired format
 */
const processRepository = (repo: GitHubRepository, readmeDescription?: string | null): ProcessedRepository => {
  return {
    id: repo.id,
    name: repo.name,
    description: readmeDescription || repo.description || 'No description available',
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