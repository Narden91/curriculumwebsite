import React from 'react';
import { achievements } from '../../data/achievementsData';
import { YouTubeIcon, GitHubIcon } from '../icons';
import './AchievementsSection.css';

const AchievementsSection: React.FC = () => {
    return (
        <section id="achievements" className="nb-section">
            <div className="container">
                {achievements.map((a) => (
                    <article key={a.id}>
                        <div className="nb-grid nb-head">
                            <div className="nb-margin"><span className="section-mark">Case</span>{a.date}</div>
                            <div>
                                <h2 className="section-title">{a.title}</h2>
                                <p className="nb-lede serif">{a.subtitle}</p>
                                <p className="ach-meta mono">{a.event} · Team {a.team}</p>
                            </div>
                        </div>

                        <div className="nb-row">
                            <div className="nb-margin">Overview</div>
                            <p className="nb-paragraph">{a.description}</p>
                        </div>

                        <div className="nb-row">
                            <div className="nb-margin">Challenge</div>
                            <p className="nb-paragraph">{a.challenge}</p>
                        </div>

                        <div className="nb-row">
                            <div className="nb-margin">Solution</div>
                            <p className="nb-paragraph">{a.solution}</p>
                        </div>

                        <div className="nb-row">
                            <div className="nb-margin">{a.technicalDetailsTitle || 'Technical details'}</div>
                            <ul className="nb-entries">
                                {a.technicalDetails.map((t) => (
                                    <li key={t.title}>
                                        <p className="nb-entry-title">{t.title}</p>
                                        <p className="nb-entry-sub">{t.description}</p>
                                        <ul className="nb-list">
                                            {t.details.map((d) => (
                                                <li key={d}>{d}</li>
                                            ))}
                                        </ul>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="nb-row">
                            <div className="nb-margin">Workflow</div>
                            <ol className="ach-steps">
                                {a.workflow.map((phase, i) => (
                                    <li key={phase.phase}>
                                        <span className="ach-step-n mono">{String(i + 1).padStart(2, '0')}</span>
                                        <div>
                                            <p className="nb-entry-title">{phase.phase}</p>
                                            <p className="nb-entry-text">{phase.description}</p>
                                        </div>
                                    </li>
                                ))}
                            </ol>
                        </div>

                        <div className="nb-row">
                            <div className="nb-margin">Team</div>
                            <ul className="nb-entries ach-team">
                                {a.teamMembers.map((m) => (
                                    <li key={m.name}>
                                        <p className="nb-entry-title">
                                            {m.name === 'Emanuele Nardone' ? <strong>{m.name}</strong> : m.name}
                                        </p>
                                        <p className="nb-entry-sub">{m.role}</p>
                                        <p className="nb-entry-text">{m.contributions.join('; ')}.</p>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {a.resources.video && (
                            <div className="nb-row">
                                <div className="nb-margin">Demo</div>
                                <div className="ach-video">
                                    <iframe
                                        src={`https://www.youtube-nocookie.com/embed/${a.resources.video.split('v=')[1]}`}
                                        title="Project demo video"
                                        loading="lazy"
                                        allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                    />
                                </div>
                            </div>
                        )}

                        <div className="nb-row">
                            <div className="nb-margin">Links</div>
                            <div>
                                <p className="ach-links">
                                    {a.resources.video && (
                                        <a href={a.resources.video} target="_blank" rel="noopener noreferrer">
                                            <YouTubeIcon /> Video
                                        </a>
                                    )}
                                    {a.resources.github && (
                                        <a href={a.resources.github} target="_blank" rel="noopener noreferrer">
                                            <GitHubIcon /> Repository
                                        </a>
                                    )}
                                </p>
                                <p className="nb-inline ach-tags mono">
                                    {a.tags.map((tag) => (
                                        <span key={tag}>{tag}</span>
                                    ))}
                                </p>
                            </div>
                        </div>
                    </article>
                ))}
            </div>
        </section>
    );
};

export default AchievementsSection;
