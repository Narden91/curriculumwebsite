import React from 'react';
import { Link } from 'react-router-dom';
import PageLayout from '../components/layout/PageLayout';
import HeroSection from '../components/sections/HeroSection';
import { publicationsData } from '../data/publicationsData';
import './HomePage.css';

const recent = publicationsData.filter((p) => p.type === 'journal' || p.type === 'conference').slice(0, 4);

const HomePage: React.FC = () => {
    return (
        <PageLayout>
            <HeroSection />

            <section className="home-recent">
                <div className="container">
                    <div className="home-recent-header">
                        <h2 className="section-title">Recent publications</h2>
                        <Link to="/research" className="home-recent-all">All publications &rarr;</Link>
                    </div>
                    <ol className="home-recent-list">
                        {recent.map((p, i) => (
                            <li
                                key={p.doi ?? p.title}
                                className="home-recent-item reveal"
                                style={{ '--i': i } as React.CSSProperties}
                            >
                                <span className="home-recent-year mono">{p.year}</span>
                                <div>
                                    {p.doi ? (
                                        <a href={`https://doi.org/${p.doi}`} target="_blank" rel="noopener noreferrer" className="home-recent-title">
                                            {p.title}
                                        </a>
                                    ) : (
                                        <span className="home-recent-title">{p.title}</span>
                                    )}
                                    <p className="home-recent-venue">{p.venue}</p>
                                </div>
                            </li>
                        ))}
                    </ol>
                </div>
            </section>
        </PageLayout>
    );
};

export default HomePage;
