import React, { useState } from 'react';
import { achievements } from '../../data/achievementsData';
import { YouTubeIcon, GitHubIcon, ChevronDownIcon } from '../icons';
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
                                <h4>📋 Project Overview</h4>
                                <p>{achievement.description}</p>
                            </div>

                            {/* Challenge */}
                            <div className="achievement-challenge">
                                <h4>🎯 The Challenge</h4>
                                <p>{achievement.challenge}</p>
                            </div>

                            {/* Solution */}
                            <div className="achievement-solution">
                                <h4>💡 Technical Solution</h4>
                                <p>{achievement.solution}</p>
                            </div>

                            {/* Technical Details */}
                            <div className="technical-details">
                                <h4 className="section-subtitle">
                                    {achievement.technicalDetailsTitle || 'Technical Details'}
                                </h4>
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
                                                <ChevronDownIcon className="expand-icon" />
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
                                <h4 className="section-subtitle">System Workflow</h4>
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
                                <h4 className="section-subtitle">Team Contributions</h4>
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
                                <h4 className="section-subtitle">Resources</h4>
                                <div className="resource-links">
                                    {achievement.resources.video && (
                                        <a
                                            href={achievement.resources.video}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="resource-link"
                                        >
                                            <YouTubeIcon />
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
                                            <GitHubIcon />
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
