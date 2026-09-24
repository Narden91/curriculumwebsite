import React, { useState } from 'react';
import { educationData } from '../../data/educationData';
import { ChevronDownIcon } from '../icons';
import './Timeline.css';

const EducationSection: React.FC = () => {
  const [expandedCards, setExpandedCards] = useState<Set<number>>(() => new Set([0]));

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
        <ol className="tl">
          {educationData.map((edu, index) => {
            const isOpen = expandedCards.has(index);
            const panelId = `education-panel-${index}`;
            const hasDetails = Boolean(
              edu.dissertationTitle || edu.honors || edu.supervisors?.length || edu.additionalInfo?.length || edu.relevantCoursework?.length
            );
            return (
              <li key={index} className="tl-item reveal" style={{ '--i': index } as React.CSSProperties}>
                <span className="tl-date mono">{edu.year}</span>
                <div className="tl-body">
                  <button
                    type="button"
                    className="tl-head"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => toggleCard(index)}
                    disabled={!hasDetails}
                  >
                    <span className="tl-title">{edu.degree}</span>
                    <span className="tl-sub">
                      {edu.institution} · {edu.field}
                    </span>
                    {hasDetails && <ChevronDownIcon className="tl-chevron" />}
                  </button>

                  {hasDetails && (
                    <div id={panelId} className="tl-panel" hidden={!isOpen}>
                      {edu.dissertationTitle && (
                        <>
                          <h4 className="tl-label">Thesis</h4>
                          <p className="tl-quote">{edu.dissertationTitle}</p>
                        </>
                      )}

                      {edu.additionalInfo && edu.additionalInfo.length > 0 && (
                        <>
                          <h4 className="tl-label">Topics</h4>
                          <ul className="tl-list">
                            {edu.additionalInfo.map((info, idx) => (
                              <li key={idx}>{info}</li>
                            ))}
                          </ul>
                        </>
                      )}

                      {edu.relevantCoursework && edu.relevantCoursework.length > 0 && (
                        <ul className="tl-tags" aria-label="Relevant coursework">
                          {edu.relevantCoursework.map((course) => (
                            <li key={course}>{course}</li>
                          ))}
                        </ul>
                      )}

                      {edu.honors && <span className="tl-honor">{edu.honors}</span>}

                      {edu.supervisors && edu.supervisors.length > 0 && (
                        <p className="tl-note">Supervisors: {edu.supervisors.join(', ')}</p>
                      )}
                    </div>
                  )}
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
};

export default EducationSection;
