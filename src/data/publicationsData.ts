import generated from './publications.generated.json';

export interface Publication {
  title: string;
  authors: string[];
  year: number | null;
  venue: string;
  pages?: string;
  volume?: string;
  type: 'journal' | 'conference' | 'preprint' | 'other';
  doi?: string;
  url?: string;
  citations?: number;
}

interface ScholarStats {
  citations: number;
  hIndex: number;
  i10Index: number;
  byYear?: { year: number; citations: number }[];
  updatedAt: string;
}

// Written by scripts/fetch-publications.mjs (ORCID + Crossref + Google Scholar).
// Do not edit by hand: run `npm run fetch:pubs` to refresh.
export const publicationsData = generated.publications as Publication[];
export const scholarStats = generated.scholar as ScholarStats | null;
export const publicationsUpdatedAt = generated.updatedAt;

/** Awards keyed by lower-case DOI (from the CV); shown next to the paper wherever it is listed. */
const paperAwards: Record<string, string> = {
  '10.1007/978-3-032-23604-3_24': 'Best EvoApps Paper Award, EvoStar 2026',
};

export const awardFor = (p: Publication) => (p.doi ? paperAwards[p.doi.toLowerCase()] : undefined);

export const peerReviewedPublications = publicationsData.filter((p) => p.type === 'journal' || p.type === 'conference');
