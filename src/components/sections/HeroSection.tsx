import React from 'react';
import { heroData } from '../../data/heroData';
import { peerReviewedPublications, scholarStats } from '../../data/publicationsData';
import { DownloadIcon } from '../icons';
import CitationChart from '../ui/CitationChart';
import ProfileLinks from '../ui/ProfileLinks';
import './HeroSection.css';

const base = import.meta.env.BASE_URL;

const HeroSection: React.FC = React.memo(() => {
  return (
    <section id="hero" className="hero-section">
      <div className="container hero-grid">
        <aside className="hero-margin mono" aria-label="Summary">
          <span className="hero-margin-mark">§0</span>
          <span>Postdoc, UEF</span>
          <span>Center for Photonics Sciences</span>
          <span>{heroData.location}</span>
          <span className="hero-margin-dim">62.60° N, 29.76° E</span>
        </aside>

        <div className="hero-main">
          <h1 className="hero-title serif">{heroData.name}</h1>
          <p className="hero-lede serif">
            Learning from light, with <em>physics and uncertainty</em> built in.
          </p>
          <p className="hero-description">{heroData.tagline}</p>

          <div className="hero-actions">
            <a href={`${base}${heroData.cvLink}`} download className="btn btn-primary">
              <DownloadIcon className="btn-icon" />
              Download CV
            </a>
            <ProfileLinks withEmail />
          </div>
        </div>

        <figure className="hero-figure">
          <div className="hero-figure-frame">
            <picture>
              <source srcSet={`${base}pixel-researcher-still.png`} media="(prefers-reduced-motion: reduce)" />
              {/* Lossless animated WebP: same frames as the GIF at a third of the size */}
              <source srcSet={`${base}pixel-researcher.webp`} type="image/webp" />
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

      <div className="container hero-data">
        <dl className="hero-stats">
          <div className="hero-stat">
            <dt>Peer-reviewed papers</dt>
            <dd className="mono">{peerReviewedPublications.length}</dd>
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
