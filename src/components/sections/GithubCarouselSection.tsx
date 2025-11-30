import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import { fetchGitHubRepositories, getLanguageColor, type ProcessedRepository } from '../../services/githubService';
import { GitHubIcon, StarIcon, ForkIcon } from '../icons';
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
                          <StarIcon />
                          {repo.stars}
                        </span>
                        <span className="repo-forks" title="Forks">
                          <ForkIcon />
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
                            <GitHubIcon width={16} height={16} />
                            Demo
                          </a>
                        )}
                        <a
                          href={repo.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="repo-link primary"
                        >
                          <GitHubIcon width={16} height={16} />
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
            <GitHubIcon />
            View All Projects on GitHub
          </a>
        </div>
      </div>
    </section>
  );
};

export default GithubCarouselSection;