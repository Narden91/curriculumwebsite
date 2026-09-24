import React from 'react';
import PageLayout from '../components/layout/PageLayout';
import PageTopper from '../components/layout/PageTopper';
import PublicationsSection from '../components/sections/PublicationsSection';
import { publicationsData } from '../data/publicationsData';
import { fundedProjects } from '../data/projectsData';
import './ResearchPage.css';

const peerReviewedCount = publicationsData.filter((p) => p.type === 'journal' || p.type === 'conference').length;

const ResearchPage: React.FC = () => {
    return (
        <PageLayout>
            <PageTopper
                title="Research & Publications"
                subtitle="Machine learning and pattern recognition for decision support: evolutionary feature selection, multimodal classification, conformal prediction and explainable AI."
                badge={`${peerReviewedCount} peer-reviewed papers`}
            />
            <PublicationsSection />

            <section className="research-projects section">
                <div className="container">
                    <div className="section-header">
                        <h2 className="section-title">Funded research projects</h2>
                    </div>
                    <ul className="project-list">
                        {fundedProjects.map((p) => (
                            <li key={p.name} className="project-item">
                                <div className="project-head">
                                    <h3 className="project-name">
                                        {p.url ? (
                                            <a href={p.url} target="_blank" rel="noopener noreferrer">{p.name}</a>
                                        ) : (
                                            p.name
                                        )}
                                    </h3>
                                    <span className="project-funder">{p.funder}</span>
                                    {p.period && <span className="project-period mono">{p.period}</span>}
                                </div>
                                {p.summary && <p className="project-summary">{p.summary}</p>}
                                <p className="project-role">{p.role}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            </section>
        </PageLayout>
    );
};

export default ResearchPage;
