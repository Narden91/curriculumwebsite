import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import { fetchGitHubRepositories, getLanguageColor, type ProcessedRepository } from '../../services/githubService';
import './GithubCarouselSection.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const GithubCarouselSection: React.FC = () => {
  const [repositories, setRepositories] = useState<ProcessedRepository[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadRepositories = async () => {
      try {
        setLoading(true);
        const repos = await fetchGitHubRepositories();
        setRepositories(repos);
        setError(null);
      } catch (err) {
        setError('Failed to load repositories');
        console.error('Error loading repositories:', err);
      } finally {
        setLoading(false);
      }
    };

    loadRepositories();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    arrows: true,
    cssEase: 'cubic-bezier(0.4, 0, 0.2, 1)',
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 2,
          arrows: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          arrows: false,
          dots: true,
        },
      },
    ],
  };

  if (loading) {
    return (
      <section id="github-projects" className="github-carousel-section section">
        <div className="container">
          <div className="section-header">
            <div className="section-number">06</div>
            <h2 className="display-2 section-title">GitHub Projects</h2>
            <p className="section-description">
              Loading my latest open-source projects and contributions...
            </p>
          </div>
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>Fetching repositories from GitHub...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="github-projects" className="github-carousel-section section">
        <div className="container">
          <div className="section-header">
            <div className="section-number">06</div>
            <h2 className="display-2 section-title">GitHub Projects</h2>
            <p className="section-description">
              Unable to load repositories at the moment.
            </p>
          </div>
          <div className="error-container">
            <p>{error}</p>
            <button onClick={() => window.location.reload()} className="retry-button">
              Try Again
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="github-projects" className="github-carousel-section section">
      <div className="container">
        <div className="section-header">
          <div className="section-number">06</div>
          <h2 className="display-2 section-title">GitHub Projects</h2>
          <p className="section-description">
            A selection of my open-source projects and research contributions showcasing AI, machine learning, and software development expertise.
          </p>
        </div>

        {repositories.length > 0 ? (
          <Slider {...settings}>
            {repositories.map((repo: ProcessedRepository) => (
              <div key={repo.id} className="repo-slide">
                <div className="repo-card">
                  {repo.imageUrl && (
                    <div className="repo-image-container">
                      <img
                        src={repo.imageUrl}
                        alt={`${repo.name} preview`}
                        className="repo-image"
                        onError={(e) => {
                          // Fallback to a default image if the GitHub social preview fails
                          const target = e.target as HTMLImageElement;
                          target.src = `https://via.placeholder.com/400x200/${getLanguageColor(repo.language).slice(1)}/ffffff?text=${encodeURIComponent(repo.name)}`;
                        }}
                      />
                      <div className="repo-overlay">
                        <div className="repo-language-badge" style={{ backgroundColor: getLanguageColor(repo.language) }}>
                          {repo.language}
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="repo-info">
                    <div className="repo-header">
                      <h3 className="repo-name">{repo.name}</h3>
                      <div className="repo-stats">
                        <span className="repo-stars" title="Stars">
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                            <path d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25z" />
                          </svg>
                          {repo.stars}
                        </span>
                        <span className="repo-forks" title="Forks">
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                            <path d="M5 3.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm0 2.122a2.25 2.25 0 10-1.5 0v.878A2.25 2.25 0 005.75 8.5h1.5v2.128a2.251 2.251 0 101.5 0V8.5h1.5a2.25 2.25 0 002.25-2.25v-.878a2.25 2.25 0 10-1.5 0v.878a.75.75 0 01-.75.75h-4.5A.75.75 0 015 6.25v-.878z" />
                          </svg>
                          {repo.forks}
                        </span>
                      </div>
                    </div>

                    <p className="repo-description">{repo.description}</p>

                    {repo.topics && repo.topics.length > 0 && (
                      <div className="repo-topics">
                        {repo.topics.slice(0, 3).map((topic, index) => (
                          <span key={index} className="topic-tag">
                            {topic}
                          </span>
                        ))}
                        {repo.topics.length > 3 && (
                          <span className="topic-tag more-topics">+{repo.topics.length - 3}</span>
                        )}
                      </div>
                    )}

                    <div className="repo-footer">
                      <div className="repo-meta">
                        <span className="repo-updated">Updated {repo.lastUpdated}</span>
                      </div>

                      <div className="repo-actions">
                        {repo.homepage && (
                          <a
                            href={repo.homepage}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="repo-link secondary"
                            title="View live demo"
                          >
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                              <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
                            </svg>
                            Demo
                          </a>
                        )}
                        <a
                          href={repo.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="repo-link primary"
                        >
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                            <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
                          </svg>
                          View Code
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        ) : (
          <div className="no-repositories">
            <p>No repositories found to display.</p>
          </div>
        )}

        <div className="github-profile-link">
          <a
            href="https://github.com/Narden91"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline"
          >
            <svg width="20" height="20" viewBox="0 0 16 16" fill="currentColor">
              <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
            </svg>
            View All Projects on GitHub
          </a>
        </div>
      </div>
    </section>
  );
};

export default GithubCarouselSection;