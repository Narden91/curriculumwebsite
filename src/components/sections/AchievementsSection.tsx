import React, { useState } from 'react';
import { achievements } from '../../data/achievementsData';
import './AchievementsSection.css';

const AchievementsSection: React.FC = () => {
    const [expandedSections, setExpandedSections] = useState<{ [key: string]: boolean }>({});

    const toggleSection = (sectionId: string) => {
        setExpandedSections(prev => ({
            ...prev,
            [sectionId]: !prev[sectionId]
        }));
    };

    return (
        <section id="achievements" className="achievements-section section">
            <div className="container">
                <div className="section-header">
                    <div className="section-number">05</div>
                    <h2 className="display-2 section-title">Achievements</h2>
                    <p className="section-description">
                        Recognition and awards from hackathons, competitions, and research contributions.
                    </p>
                </div>

                <div className="achievements-container">
                    {achievements.map((achievement) => (
                        <div key={achievement.id} className="achievement-card">
                            {/* Header */}
                            <div className="achievement-header">
                                <h3 className="achievement-title">{achievement.title}</h3>
                                <p className="achievement-subtitle">{achievement.subtitle}</p>
                                <div className="achievement-badges">
                                    <span className="badge badge-event">{achievement.event}</span>
                                    <span className="badge badge-date">{achievement.date}</span>
                                    <span className="badge badge-team">Team {achievement.team}</span>
                                </div>
                            </div>

                            {/* Overview */}
                            <div className="achievement-overview">
                                <h4>📋 Panoramica del Progetto</h4>
                                <p>{achievement.description}</p>
                            </div>

                            {/* Challenge */}
                            <div className="achievement-challenge">
                                <h4>🎯 La Sfida</h4>
                                <p>{achievement.challenge}</p>
                            </div>

                            {/* Solution */}
                            <div className="achievement-solution">
                                <h4>💡 Soluzione Tecnica</h4>
                                <p>{achievement.solution}</p>
                            </div>

                            {/* Technical Details */}
                            <div className="technical-details">
                                <h4 className="section-subtitle">Componenti Crittografici</h4>
                                <div className="tech-grid">
                                    {achievement.technicalDetails.map((tech, index) => (
                                        <div
                                            key={index}
                                            className={`tech-card ${expandedSections[`tech-${index}`] ? 'expanded' : ''}`}
                                        >
                                            <div
                                                className="tech-header"
                                                onClick={() => toggleSection(`tech-${index}`)}
                                            >
                                                <span className="tech-icon">{tech.icon}</span>
                                                <div className="tech-info">
                                                    <h5>{tech.title}</h5>
                                                    <p>{tech.description}</p>
                                                </div>
                                                <svg
                                                    className="expand-icon"
                                                    width="20"
                                                    height="20"
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                >
                                                    <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                                                </svg>
                                            </div>
                                            {expandedSections[`tech-${index}`] && (
                                                <div className="tech-details">
                                                    <ul>
                                                        {tech.details.map((detail, idx) => (
                                                            <li key={idx}>{detail}</li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Workflow */}
                            <div className="workflow-section">
                                <h4 className="section-subtitle">Workflow del Sistema</h4>
                                <div className="workflow-timeline">
                                    {achievement.workflow.map((phase, index) => (
                                        <div key={index} className="workflow-phase">
                                            <div className="phase-number">{index + 1}</div>
                                            <div className="phase-content">
                                                <h5>{phase.phase}</h5>
                                                <p>{phase.description}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Team Members */}
                            <div className="team-section">
                                <h4 className="section-subtitle">Contributi del Team</h4>
                                <div className="team-grid">
                                    {achievement.teamMembers.map((member, index) => (
                                        <div key={index} className="team-member-card">
                                            <div className="member-avatar">{member.name.charAt(0)}</div>
                                            <h5 className="member-name">{member.name}</h5>
                                            <p className="member-role">{member.role}</p>
                                            <ul className="member-contributions">
                                                {member.contributions.map((contribution, idx) => (
                                                    <li key={idx}>{contribution}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Video */}
                            {achievement.resources.video && (
                                <div className="video-section">
                                    <h4 className="section-subtitle">📺 Video Demo</h4>
                                    <div className="video-wrapper">
                                        <iframe
                                            src={`https://www.youtube.com/embed/${achievement.resources.video.split('v=')[1]}`}
                                            title="Project Demo Video"
                                            frameBorder="0"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen
                                        ></iframe>
                                    </div>
                                </div>
                            )}

                            {/* Resources */}
                            <div className="resources-section">
                                <h4 className="section-subtitle">Risorse</h4>
                                <div className="resource-links">
                                    {achievement.resources.video && (
                                        <a
                                            href={achievement.resources.video}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="resource-link"
                                        >
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                                            </svg>
                                            Video Demo
                                        </a>
                                    )}
                                    {achievement.resources.github && (
                                        <a
                                            href={achievement.resources.github}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="resource-link"
                                        >
                                            <svg width="20" height="20" viewBox="0 0 16 16" fill="currentColor">
                                                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
                                            </svg>
                                            GitHub Repository
                                        </a>
                                    )}
                                </div>
                            </div>

                            {/* Tags */}
                            <div className="tags-section">
                                {achievement.tags.map((tag, index) => (
                                    <span key={index} className="achievement-tag">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default AchievementsSection;
