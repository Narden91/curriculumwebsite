import React, { useEffect, useState } from 'react';
import { fetchGitHubRepositories, getLanguageColor, type ProcessedRepository } from '../../services/githubService';
import { heroData } from '../../data/heroData';
import { GitHubIcon, StarIcon, ForkIcon } from '../icons';
import './GithubProjectsSection.css';

const GithubProjectsSection: React.FC = () => {
  const [repositories, setRepositories] = useState<ProcessedRepository[] | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    fetchGitHubRepositories()
      .then(setRepositories)
      .catch((err) => {
        console.error('Error loading repositories:', err);
        setFailed(true);
      });
  }, []);

  return (
    <section id="github-projects" className="nb-section">
      <div className="container">
        <div className="nb-grid nb-head">
          <div className="nb-margin"><span className="section-mark">§5.1</span>Code</div>
          <div className="repo-head">
            <h2 className="section-title">Repositories</h2>
            <a href={heroData.github} target="_blank" rel="noopener noreferrer" className="repo-all">
              <GitHubIcon /> All on GitHub &rarr;
            </a>
          </div>
        </div>

        {failed && (
          <p className="repo-empty">
            GitHub did not answer. The repositories are on{' '}
            <a href={heroData.github} target="_blank" rel="noopener noreferrer">github.com/Narden91</a>.
          </p>
        )}

        <ol className="repo-list" aria-busy={!repositories && !failed}>
          {!repositories && !failed &&
            [0, 1, 2, 3].map((i) => (
              <li key={i} className="repo-item repo-skeleton" aria-hidden="true">
                <span className="skeleton repo-sk-line repo-sk-short" />
                <span className="skeleton repo-sk-line" />
                <span className="skeleton repo-sk-line repo-sk-mid" />
              </li>
            ))}

          {repositories?.map((repo, i) => (
            <li key={repo.id} className="repo-item reveal" style={{ '--i': i } as React.CSSProperties}>
              <span className="repo-index mono">{String(i + 1).padStart(2, '0')}</span>
              <div className="repo-body">
                <h3 className="repo-name">
                  <a href={repo.url} target="_blank" rel="noopener noreferrer">
                    <span className="repo-owner mono">Narden91/</span>
                    {repo.name}
                  </a>
                </h3>
                <p className="repo-desc">{repo.description}</p>
                <p className="repo-meta mono">
                  {repo.language !== 'Unknown' && (
                    <span className="repo-lang">
                      <span className="repo-dot" style={{ background: getLanguageColor(repo.language) }} />
                      {repo.language}
                    </span>
                  )}
                  <span className="repo-stat"><StarIcon width={13} height={13} /> {repo.stars}</span>
                  <span className="repo-stat"><ForkIcon width={13} height={13} /> {repo.forks}</span>
                  <span>updated {repo.lastUpdated}</span>
                  {repo.homepage && (
                    <a href={repo.homepage} target="_blank" rel="noopener noreferrer">live &rarr;</a>
                  )}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
};

export default GithubProjectsSection;
