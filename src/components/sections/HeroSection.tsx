import React from 'react';
import { Link } from 'react-router-dom';
import { heroData } from '../../data/heroData';
import './HeroSection.css';
import { publicationsData } from '../../data/publicationsData';
import { EmailIcon, LinkedInIcon, GitHubIcon, DownloadIcon, ChatIcon } from '../icons';
import EvolutionaryBackground from '../3d/EvolutionaryBackground';

const HeroSection: React.FC = React.memo(() => {
  return (
    <div id="hero" className="hero-section">
      <EvolutionaryBackground />

      <div className="hero-content fade-in visible">
        <h1 className="hero-title display-1">
          <span className="gradient-text">{heroData.name}</span>
        </h1>
        <p className="hero-subtitle">{heroData.title}</p>

        <p className="hero-description">
          {heroData.tagline}
        </p>

        {/* Stats Cards */}
        <div className="hero-stats-pill">
          <div className="stat-item">
            <span className="stat-val">{publicationsData.length}</span>
            <span className="stat-key">Publications</span>
          </div>
          <div className="stat-item">
            <span className="stat-val">3+</span>
            <span className="stat-key">Years Exp.</span>
          </div>
          <div className="stat-item">
            <span className="stat-val">15+</span>
            <span className="stat-key">Projects</span>
          </div>
        </div>

        {/* Floating Dock Socials */}
        <div className="hero-social-dock">
          <a href={`mailto:${heroData.email}`} className="dock-item" title="Email">
            <EmailIcon className="dock-icon" />
          </a>
          <a href={heroData.linkedin} target="_blank" rel="noopener noreferrer" className="dock-item" title="LinkedIn">
            <LinkedInIcon className="dock-icon" />
          </a>
          <a href={heroData.github} target="_blank" rel="noopener noreferrer" className="dock-item" title="GitHub">
            <GitHubIcon className="dock-icon" />
          </a>
        </div>

        {/* Main CTAs */}
        <div className="hero-cta-container">
          <a
            href="./CV_2025.pdf"
            download
            className="btn btn-primary glow-effect"
          >
            <DownloadIcon className="btn-icon" />
            Download CV
          </a>
          <Link
            to="/contact"
            className="btn btn-secondary glass-effect"
          >
            <ChatIcon className="btn-icon" />
            Let's Connect
          </Link>
        </div>
      </div>
    </div>
  );
});

HeroSection.displayName = 'HeroSection';

export default HeroSection;