import React from 'react';
import { aboutData } from '../../data/aboutData';
import './AboutSection.css';
import { publicationsData } from '../../data/publicationsData';

const AboutSection: React.FC = () => {
  // Calculate years of experience from PhD start date (2022)
  const calculateExperienceYears = () => {
    const phdStartYear = 2022;
    const currentYear = new Date().getFullYear();
    return currentYear - phdStartYear + 1;
  };

  // Calculate total project count more accurately
  const calculateProjectCount = () => {
    // Base projects from research, publications, and development work
    const researchProjects = 4; // Major research projects mentioned in experience
    const softwareProjects = 6; // GitHub repositories and applications developed
    const academicProjects = 5; // Conference presentations, workshops, academic collaborations
    
    return researchProjects + softwareProjects + academicProjects;
  };

  return (
    <section id="about" className="about-section section">
      <div className="container">
        <div className="section-header">
          <div className="section-number">01</div>
          <h2 className="display-2 section-title">About Me</h2>
          <p className="section-description">
            I hold a PhD in AI with a focus on machine learning in biomedical fields. 
          </p>
        </div>
        
        <div className="about-content-grid">
          {/* Core Expertise Card */}
          <div className="about-card card-feature">
            <div className="card-header">
              <div className="card-icon">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                        d="M9.663 17h4.673M12 3v1m6.364-.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
                </svg>
              </div>
              <h3 className="heading-1">Core Expertise</h3>
            </div>
            
            <div className="expertise-grid">
              {aboutData.expertise.map((skill, index) => (
                <div key={index} className="expertise-item">
                  <div className="expertise-bullet">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </div>
                  <span>{skill}</span>
                </div>
              ))}
            </div>
          </div>
          
          {/* Current Impact Card */}
          <div className="about-card">
            <div className="card-header">
              <div className="card-icon">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                        d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                </svg>
              </div>
              <h3 className="heading-1">Current Position & Research</h3>
            </div>
            
            <div className="impact-content">
              <div className="current-role">
                <h4 className="role-title">Current Role</h4>
                <p className="role-description">{aboutData.currentRole}</p>
              </div>
              
              <div className="research-focus">
                <h4 className="focus-title">Research Focus</h4>
                <p className="focus-description">{aboutData.researchFocus}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Summary Content */}
        <div className="about-summary">
          {aboutData.summary.map((paragraph, index) => (
            <p key={index} className="summary-paragraph">
              {paragraph}
            </p>
          ))}
        </div>

        {/* Achievement Stats */}
        <div className="achievement-stats">
          <div className="stat-card">
            <div className="stat-icon">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
              </svg>
            </div>
            <span className="stat-number">{publicationsData.length}</span>
            <span className="stat-label">Research Publications</span>
          </div>
          
          <div className="stat-card">
            <div className="stat-icon">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <span className="stat-number">{calculateExperienceYears()}+</span>
            <span className="stat-label">Years Experience</span>
          </div>
          
          <div className="stat-card">
            <div className="stat-icon">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                      d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"></path>
              </svg>
            </div>
            <span className="stat-number">{calculateProjectCount()}+</span>
            <span className="stat-label">Projects Completed</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;