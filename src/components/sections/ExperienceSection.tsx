import React, { useState, useCallback } from 'react';
import { experienceData } from '../../data/experienceData';
import { ChevronDownIcon } from '../icons';
import './Timeline.css';

const ExperienceSection: React.FC = () => {
  // Current role starts open; the rest stay compact.
  const [expandedCards, setExpandedCards] = useState<Set<number>>(() => new Set([0]));

  const toggleCard = useCallback((index: number) => {
    setExpandedCards(prev => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  }, []);

  return (
    <section id="experience" className="experience-section section">
      <div className="container">
        <ol className="tl">
          {experienceData.map((exp, index) => {
            const isOpen = expandedCards.has(index);
            const panelId = `experience-panel-${index}`;
            return (
              <li key={index} className="tl-item reveal" style={{ '--i': index } as React.CSSProperties}>
                <span className="tl-date mono">{exp.duration}</span>
                <div className="tl-body">
                  <button
                    type="button"
                    className="tl-head"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => toggleCard(index)}
                  >
                    <span className="tl-title">{exp.role}</span>
                    <span className="tl-sub">
                      {exp.company}
                      {exp.location && ` · ${exp.location}`}
                    </span>
                    <ChevronDownIcon className="tl-chevron" />
                  </button>

                  <div id={panelId} className="tl-panel" hidden={!isOpen}>
                    <ul className="tl-list">
                      {exp.responsibilities.map((item, idx) => (
                        <li key={idx}>{item}</li>
                      ))}
                    </ul>

                    {exp.achievements && exp.achievements.length > 0 && (
                      <>
                        <h4 className="tl-label">Highlights</h4>
                        <ul className="tl-list">
                          {exp.achievements.map((item, idx) => (
                            <li key={idx}>{item}</li>
                          ))}
                        </ul>
                      </>
                    )}

                    {exp.technologies && exp.technologies.length > 0 && (
                      <ul className="tl-tags" aria-label="Technologies">
                        {exp.technologies.map((tech) => (
                          <li key={tech}>{tech}</li>
                        ))}
                      </ul>
                    )}

                    {exp.supervisors && exp.supervisors.length > 0 && (
                      <p className="tl-note">Supervisors: {exp.supervisors.join(', ')}</p>
                    )}
                  </div>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
};

export default ExperienceSection;
