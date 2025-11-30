/**
 * Shared TypeScript interfaces and types
 * Centralized type definitions to avoid duplication across data files
 */

// ==========================================
// Achievement Types (Hackathons/Competitions)
// ==========================================

export interface TeamMember {
  name: string;
  role: string;
  contributions: string[];
}

export interface TechnicalDetail {
  title: string;
  icon: string;
  description: string;
  details: string[];
}

export interface WorkflowPhase {
  phase: string;
  description: string;
}

export interface AchievementResources {
  video?: string;
  github?: string;
  demo?: string;
}

/** Hackathon/Competition achievements */
export interface Achievement {
  id: string;
  title: string;
  subtitle: string;
  event: string;
  date: string;
  team: string;
  description: string;
  challenge: string;
  solution: string;
  technicalDetails: TechnicalDetail[];
  workflow: WorkflowPhase[];
  teamMembers: TeamMember[];
  resources: AchievementResources;
  tags: string[];
  /** Optional: section title for technical details (defaults to "Technical Details") */
  technicalDetailsTitle?: string;
}

// ==========================================
// Professional Achievement Types
// ==========================================

/** Teaching, organizational, and professional accomplishments */
export interface ProfessionalAchievement {
  title: string;
  organization: string;
  date: string;
  description: string;
  type: 'teaching' | 'organization' | 'certification' | 'award';
}

// ==========================================
// Publication Types
// ==========================================

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

// ==========================================
// Certification Types
// ==========================================

export interface Certification {
  name: string;
  issuer: string;
  date: string;
  id?: string;
  description?: string;
}

// ==========================================
// Experience Types
// ==========================================

export interface ExperienceEntry {
  company: string;
  role: string;
  duration: string;
  location: string;
  responsibilities: string[];
  achievements: string[];
  technologies: string[];
  sortOrder: number;
}

// ==========================================
// Education Types
// ==========================================

export interface EducationEntry {
  institution: string;
  degree: string;
  field: string;
  duration: string;
  location: string;
  description?: string;
  achievements?: string[];
  gpa?: string;
}

// ==========================================
// Hero/Profile Types
// ==========================================

export interface HeroData {
  name: string;
  title: string;
  tagline: string;
  email: string;
  phone: string;
  linkedin: string;
  github: string;
  cvLink: string;
}

// ==========================================
// About Types
// ==========================================

export interface AboutData {
  summary: string[];
  expertise: string[];
  currentRole: string;
  researchFocus: string;
}

// ==========================================
// Language Types
// ==========================================

export interface Language {
  language: string;
  level: string;
  description: string;
}

// ==========================================
// GitHub Types
// ==========================================

export interface GitHubRepository {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  topics: string[];
  updated_at: string;
}

export interface ProcessedRepository {
  id: number;
  name: string;
  description: string;
  url: string;
  homepage?: string;
  imageUrl: string;
  language: string;
  stars: number;
  forks: number;
  topics: string[];
  lastUpdated: string;
}
