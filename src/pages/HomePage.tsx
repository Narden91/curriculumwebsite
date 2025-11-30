import React from 'react';
import PageLayout from '../components/layout/PageLayout';
import HeroSection from '../components/sections/HeroSection';
import { Link } from 'react-router-dom';
import './HomePage.css';

const HomePage: React.FC = () => {
    return (
        <PageLayout>
            <HeroSection />

            {/* Quick Bio - Modern Layout */}
            <div className="home-bio">
                <div className="container">
                    <div className="bio-container">
                        <h2 className="section-title">About Me</h2>
                        <p className="bio-text">
                            PhD in <span className="highlight">Artificial Intelligence</span> specializing in medical diagnostics and machine learning.
                            Developing AI-driven tools for early detection of neurodegenerative diseases through <span className="highlight">handwriting analysis</span>.
                        </p>
                        <Link to="/about" className="btn btn-outline">
                            More About Me
                        </Link>
                    </div>
                </div>
            </div>
        </PageLayout>
    );
};

export default HomePage;
