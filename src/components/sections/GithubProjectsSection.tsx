import React, { useMemo, useState } from 'react';
import { repos, reposUpdatedAt, githubUser, type Repo } from '../../data/reposData';
import { heroData } from '../../data/heroData';
import { GitHubIcon, StarIcon, ForkIcon } from '../icons';
import './GithubProjectsSection.css';

const LANGUAGE_COLORS: Record<string, string> = {
  Python: '#3776ab',
  JavaScript: '#f1e05a',
  TypeScript: '#2b7489',
  'C#': '#239120',
  HTML: '#e34c26',
  'Jupyter Notebook': '#da5b0b',
  TeX: '#3d6117',
  MATLAB: '#e16737',
};

const ALL = 'All';

const languageOf = (repo: Repo) => repo.language ?? 'Other';

// Languages ordered by how many repos use them, so the chips read as a histogram.
const countsByLanguage = new Map<string, number>();
for (const repo of repos) {
  countsByLanguage.set(languageOf(repo), (countsByLanguage.get(languageOf(repo)) ?? 0) + 1);
}
const languageCounts = [...countsByLanguage].sort((a, b) => b[1] - a[1]);

const monthYear = new Intl.DateTimeFormat('en', { month: 'short', year: 'numeric' });

function RepoItem({ repo, index }: { repo: Repo; index: number }) {
  const text = repo.description ?? repo.summary;
  return (
    <li className="repo-item reveal" style={{ '--i': index % 12 } as React.CSSProperties}>
      <h3 className="repo-name">
        <a href={repo.url} target="_blank" rel="noopener noreferrer">{repo.name}</a>
        {repo.fork && <span className="repo-flag mono">fork</span>}
        {repo.archived && <span className="repo-flag mono">archived</span>}
      </h3>
      {text && <p className="repo-desc">{text}</p>}
      <p className="repo-meta mono">
        {repo.language && (
          <span className="repo-lang">
            <span className="repo-dot" style={{ background: LANGUAGE_COLORS[repo.language] ?? 'var(--text-color-tertiary)' }} />
            {repo.language}
          </span>
        )}
        {repo.stars > 0 && <span className="repo-stat"><StarIcon width={13} height={13} /> {repo.stars}</span>}
        {repo.forks > 0 && <span className="repo-stat"><ForkIcon width={13} height={13} /> {repo.forks}</span>}
        <span>{monthYear.format(new Date(repo.pushedAt))}</span>
        {repo.homepage && <a href={repo.homepage} target="_blank" rel="noopener noreferrer">live &rarr;</a>}
      </p>
    </li>
  );
}

const GithubProjectsSection: React.FC = () => {
  const [language, setLanguage] = useState(ALL);
  const shown = useMemo(
    () => (language === ALL ? repos : repos.filter((r) => languageOf(r) === language)),
    [language],
  );

  return (
    <section id="github-projects" className="nb-section">
      <div className="container">
        <div className="nb-grid nb-head">
          <div className="nb-margin"><span className="section-mark">§5.1</span>Code</div>
          <div className="repo-head">
            <h2 className="section-title">All {repos.length} public repositories</h2>
            <a href={heroData.github} target="_blank" rel="noopener noreferrer" className="repo-all">
              <GitHubIcon /> github.com/{githubUser} &rarr;
            </a>
          </div>
        </div>

        <div className="filter-chips" role="group" aria-label="Filter by language">
          {[[ALL, repos.length] as const, ...languageCounts].map(([name, count]) => (
            <button key={name} type="button" className="chip" aria-pressed={language === name} onClick={() => setLanguage(name)}>
              {name}
              <span className="chip-count mono">{count}</span>
            </button>
          ))}
        </div>

        <ol className="repo-list">
          {shown.map((repo, i) => (
            <RepoItem key={repo.name} repo={repo} index={i} />
          ))}
        </ol>
        <p className="repo-sync mono">From the GitHub API, synced {reposUpdatedAt}.</p>
      </div>
    </section>
  );
};

export default GithubProjectsSection;
