import React, { useState } from 'react';
import { educationData } from '../../data/educationData';
import './EducationSection.css';

const EducationSection: React.FC = () => {
  const [expandedCards, setExpandedCards] = useState<Set<number>>(new Set());

  const toggleCard = (index: number) => {
    const newExpanded = new Set(expandedCards);
    if (newExpanded.has(index)) {
      newExpanded.delete(index);
    } else {
      newExpanded.add(index);
    }
    setExpandedCards(newExpanded);
  };

  return (
    <section id="education" className="education-section section">
      <div className="container">
        <div className="section-header">
          <div className="section-number">03</div>
          <h2 className="display-2 section-title">Academic</h2>
          <p className="section-description">
            Academic study in AI and Software Engineering
          </p>
        </div>

        <div className="education-timeline">
          {educationData.map((edu, index) => (
            <div 
              key={index} 
              className={`education-card ${index % 2 === 0 ? 'left' : 'right'} ${
                expandedCards.has(index) ? 'expanded' : 'collapsed'
              }`}
            >
              <div className="timeline-connector">
                <div className="timeline-dot">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                          d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
                  </svg>
                </div>
              </div>

              <div className="education-content">
                <div 
                  className="education-header"
                  onClick={() => toggleCard(index)}
                >
                  <div className="education-header-content">
                    <div className="degree-badge">
                      <svg className="degree-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                              d="M9.663 17h4.673M12 3v1m6.364-.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
                      </svg>
                      <span className="degree-level">
                        {edu.degree.includes('PhD') || edu.degree.includes('Doctor') ? 'Doctorate' :
                         edu.degree.includes('Master') || edu.degree.includes('M.S.') ? 'Master\'s' : 'Bachelor\'s'}
                      </span>
                    </div>
                    
                    <h3 className="education-degree">{edu.degree}</h3>
                    
                    <div className="education-meta">
                      <div className="institution-info">
                        <svg className="institution-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                        </svg>
                        <span className="institution-name">{edu.institution}</span>
                      </div>
                      
                      <div className="education-details-meta">
                        <div className="field-info">
                          <svg className="field-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                                  d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                          </svg>
                          <span>{edu.field}</span>
                        </div>
                        
                        <div className="year-info">
                          <svg className="year-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                          </svg>
                          <span>{edu.year}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="expand-toggle">
                    <svg 
                      className={`toggle-icon ${expandedCards.has(index) ? 'expanded' : ''}`}
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                    </svg>
                  </div>
                </div>

                <div className="education-details">
                  {edu.dissertationTitle && (
                    <div className="dissertation-section">
                      <h4 className="section-subtitle">
                        <svg className="subtitle-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
                        </svg>
                        Dissertation
                      </h4>
                      <div className="dissertation-content">
                        <p className="dissertation-title">"{edu.dissertationTitle}"</p>
                      </div>
                    </div>
                  )}

                  {edu.honors && (
                    <div className="honors-section">
                      <div className="honor-badge">
                        <svg className="honor-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                                d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"></path>
                        </svg>
                        <span className="honor-text">{edu.honors}</span>
                      </div>
                    </div>
                  )}

                  {edu.additionalInfo && edu.additionalInfo.length > 0 && (
                    <div className="additional-info-section">
                      <h4 className="section-subtitle">
                        <svg className="subtitle-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                        Key Activities
                      </h4>
                      <ul className="additional-info-list">
                        {edu.additionalInfo.map((info, idx) => (
                          <li key={idx} className="additional-info-item">
                            <div className="info-bullet">
                              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                              </svg>
                            </div>
                            <span>{info}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {edu.relevantCoursework && edu.relevantCoursework.length > 0 && (
                    <div className="coursework-section">
                      <h4 className="section-subtitle">
                        <svg className="subtitle-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                                d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"></path>
                        </svg>
                        Relevant Coursework
                      </h4>
                      <div className="coursework-grid">
                        {edu.relevantCoursework.map((course, idx) => (
                          <div key={idx} className="course-item">
                            <div className="course-bullet">
                              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                              </svg>
                            </div>
                            <span className="course-name">{course}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Education Summary */}
        <div className="education-summary">
          <div className="summary-stats">
            <div className="stat-item">
              <div className="stat-icon">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                        d="M9.663 17h4.673M12 3v1m6.364-.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
                </svg>
              </div>
              <div className="stat-content">
                <span className="stat-number">3</span>
                <span className="stat-label">Degrees Earned</span>
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
                <span className="stat-number">10+</span>
                <span className="stat-label">Years of Study</span>
              </div>
            </div>
          </div>

          <div className="education-highlight">
            <div className="highlight-content">
              <h3 className="highlight-title">Academic Excellence</h3>
              <p className="highlight-description">
                My academic journey reflects a deep commitment to advancing the field of artificial intelligence through rigorous research, 
                innovative thinking, and collaborative learning across multiple prestigious institutions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EducationSection;