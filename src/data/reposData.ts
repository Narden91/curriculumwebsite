import generated from './repos.generated.json';

export interface Repo {
  name: string;
  url: string;
  description: string | null;
  /** First README paragraph, used when the repo has no GitHub description. */
  summary: string | null;
  language: string | null;
  stars: number;
  forks: number;
  fork: boolean;
  archived: boolean;
  homepage: string | null;
  topics: string[];
  pushedAt: string;
}

// Written by scripts/fetch-repos.mjs at build time (all public repos, pinned first, then newest push).
// Do not edit by hand: run `npm run fetch:repos` to refresh.
export const repos = generated.repos as Repo[];
export const reposUpdatedAt = generated.updatedAt;
export const githubUser = generated.user;
