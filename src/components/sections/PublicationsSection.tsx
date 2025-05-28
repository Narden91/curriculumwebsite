import React, { useState } from 'react';
import { publicationsData } from '../../data/publicationsData';
import './PublicationsSection.css';

const PublicationsSection: React.FC = () => {
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedYear, setSelectedYear] = useState<string>('all');

  // Get unique years and types for filtering
  const years = Array.from(new Set(publicationsData.map(pub => pub.year))).sort((a, b) => b - a);
  const types = Array.from(new Set(publicationsData.map(pub => pub.type)));

  // Filter publications based on selected filters
  const filteredPublications = publicationsData.filter(pub => {
    const typeMatch = selectedType === 'all' || pub.type === selectedType;
    const yearMatch = selectedYear === 'all' || pub.year.toString() === selectedYear;
    return typeMatch && yearMatch;
  });

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'journal':
        return (
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
          </svg>
        );
      case 'conference':
        return (
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
          </svg>
        );
      case 'workshop':
        return (
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                  d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path>
          </svg>
        );
      default:
        return (
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
          </svg>
        );
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'journal': return 'journal';
      case 'conference': return 'conference';
      case 'workshop': return 'workshop';
      case 'symposium': return 'symposium';
      default: return 'default';
    }
  };

  return (
    <section id="publications" className="publications-section section">
      <div className="container">
        <div className="section-header">
          <div className="section-number">04</div>
          <h2 className="display-2 section-title">Research Publications</h2>
          <p className="section-description">
            Research contributions in AI-driven medical diagnostics, handwriting analysis and Evolutionary Computation.
          </p>
        </div>

        {/* Publication Statistics */}
        <div className="publication-stats">
          <div className="stat-item">
            <div className="stat-icon">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
              </svg>
            </div>
            <div className="stat-content">
              <span className="stat-number">{publicationsData.length}</span>
              <span className="stat-label">Total Publications</span>
            </div>
          </div>

          <div className="stat-item">
            <div className="stat-icon">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
              </svg>
            </div>
            <div className="stat-content">
              <span className="stat-number">{publicationsData.filter(p => p.type === 'journal').length}</span>
              <span className="stat-label">Journal Articles</span>
            </div>
          </div>

          <div className="stat-item">
            <div className="stat-icon">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
              </svg>
            </div>
            <div className="stat-content">
              <span className="stat-number">{publicationsData.filter(p => p.type === 'conference').length}</span>
              <span className="stat-label">Conference Papers</span>
            </div>
          </div>

          <div className="stat-item">
            <div className="stat-icon">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
              </svg>
            </div>
            <div className="stat-content">
              <span className="stat-number">{new Date().getFullYear() - 2022}</span>
              <span className="stat-label">Years Active</span>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="publication-filters">
          <div className="filter-group">
            <label className="filter-label">Filter by Type:</label>
            <select 
              value={selectedType} 
              onChange={(e) => setSelectedType(e.target.value)}
              className="filter-select"
            >
              <option value="all">All Types</option>
              {types.map(type => (
                <option key={type} value={type}>
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label className="filter-label">Filter by Year:</label>
            <select 
              value={selectedYear} 
              onChange={(e) => setSelectedYear(e.target.value)}
              className="filter-select"
            >
              <option value="all">All Years</option>
              {years.map(year => (
                <option key={year} value={year.toString()}>{year}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Publications List */}
        <div className="publications-list">
          {filteredPublications.map((publication, index) => (
            <div key={index} className="publication-card">
              <div className="publication-header">
                <div className={`publication-type ${getTypeColor(publication.type)}`}>
                  <div className="type-icon">
                    {getTypeIcon(publication.type)}
                  </div>
                  <span>{publication.type}</span>
                </div>
                <span className="publication-year">{publication.year}</span>
              </div>

              <h3 className="publication-title">{publication.title}</h3>
              
              <div className="publication-authors">
                {publication.authors.map((author, idx) => (
                  <span 
                    key={idx} 
                    className={`author ${author === 'Emanuele Nardone' ? 'me' : ''}`}
                  >
                    {author}
                    {idx < publication.authors.length - 1 && ', '}
                  </span>
                ))}
              </div>

              <div className="publication-venue">
                <svg className="venue-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                        d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                </svg>
                <span>{publication.venue}</span>
                {publication.volume && (
                  <span className="publication-details">
                    , vol. {publication.volume}
                    {publication.pages && `, p. ${publication.pages}`}
                  </span>
                )}
              </div>

              {publication.abstract && (
                <div className="publication-abstract">
                  <p>{publication.abstract}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        {filteredPublications.length === 0 && (
          <div className="no-publications">
            <p>No publications found matching the selected filters.</p>
          </div>
        )}

        {/* Research Impact Summary */}
        <div className="research-impact">
          <div className="impact-card">
            <div className="impact-icon">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                      d="M9.663 17h4.673M12 3v1m6.364-.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
              </svg>
            </div>
            <div className="impact-content">
              <h3 className="impact-title">Research Impact</h3>
              <p className="impact-description">
                My research focuses on developing innovative AI-driven diagnostic tools that bridge the gap between 
                artificial intelligence and healthcare. Through handwriting analysis and machine learning, I contribute 
                to early detection methodologies for neurodegenerative diseases, with significant implications for 
                improving patient outcomes and quality of life.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PublicationsSection;