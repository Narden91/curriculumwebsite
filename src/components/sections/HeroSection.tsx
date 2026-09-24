import React from 'react';
import { heroData } from '../../data/heroData';
import { publicationsData, scholarStats, isPeerReviewed } from '../../data/publicationsData';
import { EmailIcon, LinkedInIcon, GitHubIcon, DownloadIcon, ScholarIcon, OrcidIcon } from '../icons';
import CitationChart from '../ui/CitationChart';
import './HeroSection.css';

const base = import.meta.env.BASE_URL;

const peerReviewedCount = publicationsData.filter(isPeerReviewed).length;

const profileLinks = [
  { href: `mailto:${heroData.email}`, label: `Email ${heroData.email}`, Icon: EmailIcon },
  { href: heroData.scholar, label: 'Google Scholar', Icon: ScholarIcon },
  { href: heroData.orcid, label: 'ORCID', Icon: OrcidIcon },
  { href: heroData.github, label: 'GitHub', Icon: GitHubIcon },
  { href: heroData.linkedin, label: 'LinkedIn', Icon: LinkedInIcon },
];

const HeroSection: React.FC = React.memo(() => {
  return (
    <section id="hero" className="hero-section">
      <div className="hero-grid">
        <aside className="hero-margin mono" aria-label="Summary">
          <span className="hero-margin-mark">§0</span>
          <span>Postdoc, UEF</span>
          <span>{heroData.location}</span>
          <span className="hero-margin-dim">62.60° N, 29.76° E</span>
        </aside>

        <div className="hero-main">
          <h1 className="hero-title serif">{heroData.name}</h1>
          <p className="hero-lede serif">
            Machine learning and pattern recognition for <em>decisions under uncertainty.</em>
          </p>
          <p className="hero-description">{heroData.tagline}</p>

          <div className="hero-actions">
            <a href={`${base}${heroData.cvLink}`} download className="btn btn-primary">
              <DownloadIcon className="btn-icon" />
              Download CV
            </a>
            <ul className="hero-links">
              {profileLinks.map(({ href, label, Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    className="hero-link"
                    aria-label={label}
                    title={label}
                    {...(href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  >
                    <Icon />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <figure className="hero-figure">
          <div className="hero-figure-frame">
            <picture>
              <source srcSet={`${base}pixel-researcher-still.png`} media="(prefers-reduced-motion: reduce)" />
              <img
                src={`${base}pixel-researcher.gif`}
                width={512}
                height={384}
                alt="Pixel-art researcher holding a laptop in a night-time lab, with a moonlit window, a monitor showing a falling loss curve, and a server rack."
              />
            </picture>
          </div>
          <figcaption>
            <span className="mono">Fig. 1</span> Night shift in the lab.
          </figcaption>
        </figure>
      </div>

      <div className="hero-data">
        <dl className="hero-stats">
          <div className="hero-stat">
            <dt>Peer-reviewed papers</dt>
            <dd className="mono">{peerReviewedCount}</dd>
          </div>
          {scholarStats && (
            <>
              <div className="hero-stat">
                <dt>Citations</dt>
                <dd className="mono">{scholarStats.citations}</dd>
              </div>
              <div className="hero-stat">
                <dt>h-index</dt>
                <dd className="mono">{scholarStats.hIndex}</dd>
              </div>
            </>
          )}
        </dl>
        {scholarStats?.byYear && (
          <div className="hero-chart">
            <CitationChart
              data={scholarStats.byYear}
              caption={
                <>
                  <span className="mono">Fig. 2</span> Citations per year, Google Scholar, updated{' '}
                  <span className="mono">{scholarStats.updatedAt}</span>.
                </>
              }
            />
          </div>
        )}
      </div>
    </section>
  );
});

HeroSection.displayName = 'HeroSection';

export default HeroSection;
