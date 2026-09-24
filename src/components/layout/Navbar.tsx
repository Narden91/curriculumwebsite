import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import ThemeToggleButton from '../ui/ThemeToggleButton';
import './Navbar.css';

const Navbar: React.FC = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const location = useLocation();

    const navLinks = [
        { path: '/research', label: 'Research' },
        { path: '/experience', label: 'Experience' },
        { path: '/education', label: 'Education' },
        { path: '/about', label: 'About' },
        { path: '/projects', label: 'Projects' },
        { path: '/contact', label: 'Contact' },
    ];

    // Achievements lives under About in the menu, so About stays highlighted there.
    const isActive = (path: string) =>
        location.pathname === path || (path === '/about' && location.pathname === '/achievements');

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    const closeMenu = () => setIsMenuOpen(false);

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <Link to="/" viewTransition className="navbar-logo" onClick={closeMenu}>
                    <span className="logo-text">Emanuele Nardone</span>
                    <span className="logo-subtitle">Postdoc · University of Eastern Finland</span>
                </Link>

                <ul id="navbar-menu" className={`navbar-menu ${isMenuOpen ? 'active' : ''}`}>
                    {navLinks.map((link) => (
                        <li key={link.path} className="navbar-item">
                            <Link
                                to={link.path}
                                viewTransition
                                className={`navbar-link ${isActive(link.path) ? 'active' : ''}`}
                                onClick={closeMenu}
                            >
                                {link.label}
                            </Link>
                        </li>
                    ))}
                </ul>

                <div className="navbar-actions">
                    <ThemeToggleButton />
                    <button
                        className={`hamburger ${isMenuOpen ? 'active' : ''}`}
                        onClick={toggleMenu}
                        aria-label="Toggle menu"
                        aria-expanded={isMenuOpen}
                        aria-controls="navbar-menu"
                    >
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
