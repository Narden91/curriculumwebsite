import React from 'react';
import { heroData } from '../../data/heroData';
import { publicationsData, scholarStats } from '../../data/publicationsData';
import { EmailIcon, LinkedInIcon, GitHubIcon, DownloadIcon, ScholarIcon, OrcidIcon } from '../icons';
import './HeroSection.css';

const base = import.meta.env.BASE_URL;

const peerReviewedCount = publicationsData.filter((p) => p.type === 'journal' || p.type === 'conference').length;

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
        <div className="hero-content">
          <p className="hero-eyebrow mono">Postdoc · {heroData.affiliation}</p>
          <h1 className="hero-title">{heroData.name}</h1>
          <p className="hero-subtitle">{heroData.title}</p>
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
          {scholarStats && (
            <p className="hero-stats-note mono">Google Scholar · updated {scholarStats.updatedAt}</p>
          )}
        </div>

        <figure className="hero-figure">
          <picture>
            <source srcSet={`${base}pixel-researcher-still.png`} media="(prefers-reduced-motion: reduce)" />
            <img
              src={`${base}pixel-researcher.gif`}
              width={512}
              height={384}
              alt="Pixel-art researcher holding a laptop in a night-time lab, with a moonlit window, a monitor showing a falling loss curve, and a server rack."
            />
          </picture>
        </figure>
      </div>
    </section>
  );
});

HeroSection.displayName = 'HeroSection';

export default HeroSection;
