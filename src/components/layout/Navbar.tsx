import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import ThemeToggleButton from '../ui/ThemeToggleButton';
import './Navbar.css';

const Navbar: React.FC = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const location = useLocation();

    const navLinks = [
        { path: '/', label: 'Home' },
        { path: '/about', label: 'About' },
        { path: '/experience', label: 'Experience' },
        { path: '/education', label: 'Education' },
        { path: '/research', label: 'Research' },
        { path: '/achievements', label: 'Achievements' },
        { path: '/projects', label: 'Projects' },
        { path: '/contact', label: 'Contact' },
    ];

    const isActive = (path: string) => location.pathname === path;

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    const closeMenu = () => setIsMenuOpen(false);

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <Link to="/" className="navbar-logo" onClick={closeMenu}>
                    <span className="logo-text">Emanuele Nardone</span>
                    <span className="logo-subtitle">PhD in AI</span>
                </Link>

                <ul className={`navbar-menu ${isMenuOpen ? 'active' : ''}`}>
                    {navLinks.map((link) => (
                        <li key={link.path} className="navbar-item">
                            <Link
                                to={link.path}
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
