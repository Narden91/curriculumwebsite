import { Link } from 'react-router-dom';
import { EmailIcon, ArrowUpIcon } from '../icons';
import ProfileLinks from '../ui/ProfileLinks';
import { heroData } from '../../data/heroData';
import { NAV_LINKS } from '../../data/navigation';
import { publicationsUpdatedAt } from '../../data/publicationsData';
import './Footer.css';

const Footer = () => {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <footer className="footer">
            <div className="container footer-grid">
                <div className="footer-id">
                    <p className="footer-name serif">{heroData.name}</p>
                    <p className="footer-role">Postdoctoral Researcher, {heroData.affiliation}</p>
                    <ProfileLinks className="footer-profiles" />
                </div>

                <nav className="footer-nav" aria-label="Footer">
                    <ul>
                        {NAV_LINKS.map((p) => (
                            <li key={p.path}>
                                <Link to={p.path} viewTransition>{p.label}</Link>
                            </li>
                        ))}
                    </ul>
                </nav>

                <ul className="footer-contact">
                    <li>
                        <EmailIcon />
                        <a href={`mailto:${heroData.email}`}>{heroData.email}</a>
                    </li>
                    <li>
                        <EmailIcon />
                        <a href={`mailto:${heroData.emailSecondary}`}>{heroData.emailSecondary}</a>
                    </li>
                    <li className="footer-location">{heroData.location}</li>
                </ul>
            </div>

            <div className="container footer-colophon">
                <p className="mono">
                    <span className="footer-colophon-label">Colophon</span>
                    Set in Instrument Serif, Geist and Geist Mono. Publications from ORCID and Crossref,
                    citations from Google Scholar, synced {publicationsUpdatedAt}.
                </p>
                <div className="footer-bottom">
                    <p className="mono">&copy; {new Date().getFullYear()} {heroData.name}</p>
                    <button onClick={scrollToTop} className="back-to-top" aria-label="Back to top">
                        <ArrowUpIcon />
                    </button>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
