import { Link } from 'react-router-dom';
import {
    EmailIcon,
    LocationIcon,
    ClockIcon,
    LinkedInIcon,
    GitHubIcon,
    ArrowUpIcon
} from '../icons';
import { heroData } from '../../data/heroData';
import './Footer.css';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-main">
                    {/* Brand Section */}
                    <div className="footer-brand">
                        <h3 className="footer-logo">Emanuele Nardone</h3>
                        <p className="footer-tagline">Postdoctoral Researcher, {heroData.affiliation}</p>
                        <p className="footer-bio">
                            Machine learning and pattern recognition for decision support: evolutionary
                            feature selection, multimodal classification, conformal prediction and explainable AI.
                        </p>
                        <div className="footer-social">
                            <a
                                href={heroData.linkedin}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="social-icon"
                                aria-label="LinkedIn"
                            >
                                <LinkedInIcon />
                            </a>
                            <a
                                href={heroData.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="social-icon"
                                aria-label="GitHub"
                            >
                                <GitHubIcon />
                            </a>
                            <a
                                href={`mailto:${heroData.email}`}
                                className="social-icon"
                                aria-label="Email"
                            >
                                <EmailIcon />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="footer-column">
                        <h4 className="footer-heading">Quick Links</h4>
                        <ul className="footer-nav">
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/about">About</Link></li>
                            <li><Link to="/experience">Experience</Link></li>
                            <li><Link to="/education">Education</Link></li>
                        </ul>
                    </div>

                    {/* Research */}
                    <div className="footer-column">
                        <h4 className="footer-heading">Research</h4>
                        <ul className="footer-nav">
                            <li><Link to="/research">Publications</Link></li>
                            <li><Link to="/achievements">Achievements</Link></li>
                            <li><Link to="/projects">Projects</Link></li>
                            <li><Link to="/contact">Contact</Link></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div className="footer-column">
                        <h4 className="footer-heading">Get In Touch</h4>
                        <ul className="footer-contact-list">
                            <li className="footer-contact-item">
                                <EmailIcon />
                                <a href={`mailto:${heroData.email}`}>{heroData.email}</a>
                            </li>
                            <li className="footer-contact-item">
                                <EmailIcon />
                                <a href={`mailto:${heroData.emailSecondary}`}>{heroData.emailSecondary}</a>
                            </li>
                            <li className="footer-contact-item">
                                <LocationIcon />
                                <span>{heroData.location}</span>
                            </li>
                            <li className="footer-contact-item">
                                <ClockIcon />
                                <span>Mon-Fri, 9AM-6PM CET</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="footer-bottom">
                    <p className="footer-copyright">
                        © {currentYear} Emanuele Nardone. All rights reserved.
                    </p>
                    <button onClick={scrollToTop} className="back-to-top" aria-label="Back to top">
                        <ArrowUpIcon />
                    </button>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
