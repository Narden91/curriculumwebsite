import React from 'react';
import PageTopper from '../components/layout/PageTopper';
import { heroData } from '../data/heroData';
import './ContactPage.css';

const PROFILES = [
    { label: 'Google Scholar', href: heroData.scholar },
    { label: 'ORCID', href: heroData.orcid },
    { label: 'Scopus', href: heroData.scopus },
    { label: 'GitHub', href: heroData.github },
    { label: 'LinkedIn', href: heroData.linkedin },
];

const ContactPage: React.FC = () => (
    <>
        <PageTopper mark="§6" title="Contact" subtitle="Collaborations, reviews and invited talks." />

        <section className="nb-section">
            <div className="container">
                <div className="nb-row nb-row-first">
                    <div className="nb-margin">Email</div>
                    <p className="contact-lines mono">
                        <a href={`mailto:${heroData.email}`}>{heroData.email}</a>
                        <a href={`mailto:${heroData.emailSecondary}`}>{heroData.emailSecondary}</a>
                    </p>
                </div>

                <div className="nb-row">
                    <div className="nb-margin">Profiles</div>
                    <p className="nb-inline">
                        {PROFILES.map(({ label, href }) => (
                            <span key={label}>
                                <a href={href} target="_blank" rel="noopener noreferrer">{label}</a>
                            </span>
                        ))}
                    </p>
                </div>

                <div className="nb-row">
                    <div className="nb-margin">Address</div>
                    <p className="nb-paragraph">
                        Center for Photonics Sciences
                        <br />
                        {heroData.affiliation}
                        <br />
                        {heroData.location}
                    </p>
                </div>
            </div>
        </section>
    </>
);

export default ContactPage;
