import React from 'react';
import { Link } from 'react-router-dom';
import HeroSection from '../components/sections/HeroSection';
import { peerReviewedPublications, awardFor } from '../data/publicationsData';
import { researchThemes } from '../data/aboutData';
import { fundedProjects } from '../data/projectsData';
import { heroData } from '../data/heroData';
import './HomePage.css';

const selected = peerReviewedPublications.slice(0, 5);
const current = fundedProjects.filter((p) => p.period?.includes('present'));

const HomePage: React.FC = () => {
    return (
        <>
            <HeroSection />

            <section className="nb-section">
                <div className="container nb-grid">
                    <div className="nb-margin"><span className="section-mark">§1</span>Themes</div>
                    <div>
                        <h2 className="section-title">Research themes</h2>
                        <ol className="home-themes">
                            {researchThemes.map((t, i) => (
                                <li key={t.title} className="home-theme reveal" style={{ '--i': i } as React.CSSProperties}>
                                    <span className="home-theme-index mono">1.{i + 1}</span>
                                    <h3 className="home-theme-title serif">{t.title}</h3>
                                    <p className="home-theme-text">{t.text}</p>
                                </li>
                            ))}
                        </ol>
                    </div>
                </div>
            </section>

            <section className="nb-section">
                <div className="container nb-grid">
                    <div className="nb-margin"><span className="section-mark">§2</span>Papers</div>
                    <div>
                        <div className="home-head">
                            <h2 className="section-title">Selected work</h2>
                            <Link to="/research" viewTransition className="home-more">All publications &rarr;</Link>
                        </div>
                        <ol className="home-papers">
                            {selected.map((p, i) => {
                                const award = awardFor(p);
                                return (
                                    <li key={p.doi ?? p.title} className="home-paper reveal" style={{ '--i': i } as React.CSSProperties}>
                                        <span className="home-paper-year mono">{p.year}</span>
                                        <div>
                                            {p.doi ? (
                                                <a href={`https://doi.org/${p.doi}`} target="_blank" rel="noopener noreferrer" className="home-paper-title">
                                                    {p.title}
                                                </a>
                                            ) : (
                                                <span className="home-paper-title">{p.title}</span>
                                            )}
                                            <p className="home-paper-venue"><em>{p.venue}</em></p>
                                            {award && <span className="award-mark">{award}</span>}
                                        </div>
                                        {p.citations ? (
                                            <span className="home-paper-cites mono">{p.citations} cit.</span>
                                        ) : <span />}
                                    </li>
                                );
                            })}
                        </ol>
                    </div>
                </div>
            </section>

            <section className="nb-section">
                <div className="container nb-grid">
                    <div className="nb-margin"><span className="section-mark">§3</span>Now</div>
                    <div>
                        <h2 className="section-title">Current projects</h2>
                        <ul className="home-now">
                            {current.map((p, i) => (
                                <li key={p.name} className="home-now-item reveal" style={{ '--i': i } as React.CSSProperties}>
                                    <h3 className="home-now-name serif">{p.name}</h3>
                                    <p className="home-now-funder mono">{p.funder}</p>
                                    {p.summary && <p className="home-now-summary">{p.summary}</p>}
                                    <p className="home-now-role">{p.role}</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </section>

            <section className="nb-section">
                <div className="container nb-grid">
                    <div className="nb-margin"><span className="section-mark">§4</span>Contact</div>
                    <div className="home-contact">
                        <p className="home-contact-line serif">
                            Collaborations, reviews and invited talks: <em>write to me.</em>
                        </p>
                        <p className="home-contact-links mono">
                            <a href={`mailto:${heroData.email}`}>{heroData.email}</a>
                            <a href={`mailto:${heroData.emailSecondary}`}>{heroData.emailSecondary}</a>
                        </p>
                    </div>
                </div>
            </section>
        </>
    );
};

export default HomePage;
