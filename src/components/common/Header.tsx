import React from 'react';
import './Header.css';
import { useTheme } from '../../hooks/useTheme';
import ThemeToggleButton from '../ui/ThemeToggleButton'; 
import { 
  HomeIcon, 
  UserIcon, 
  AcademicCapIcon, 
  BriefcaseIcon,
  DocumentTextIcon,
  CodeBracketIcon,
  EnvelopeIcon
} from '@heroicons/react/24/outline';

const Header: React.FC = () => {
  const { theme } = useTheme();

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className={`app-header ${theme === 'dark' ? 'dark-theme' : 'light-theme'}`}>
      <nav className="header-nav">
        <a onClick={() => scrollToSection('hero')} className="nav-link">
          <HomeIcon className="nav-icon" />
          <span>Home</span>
        </a>
        <a onClick={() => scrollToSection('about')} className="nav-link">
          <UserIcon className="nav-icon" />
          <span>About</span>
        </a>
        <a onClick={() => scrollToSection('experience')} className="nav-link">
          <BriefcaseIcon className="nav-icon" />
          <span>Experience</span>
        </a>
        <a onClick={() => scrollToSection('education')} className="nav-link">
          <AcademicCapIcon className="nav-icon" />
          <span>Education</span>
        </a>
        <a onClick={() => scrollToSection('publications')} className="nav-link">
          <DocumentTextIcon className="nav-icon" />
          <span>Publications</span>
        </a>
        <a onClick={() => scrollToSection('github-projects')} className="nav-link">
          <CodeBracketIcon className="nav-icon" />
          <span>Projects</span>
        </a>
        <a onClick={() => scrollToSection('contact')} className="nav-link">
          <EnvelopeIcon className="nav-icon" />
          <span>Contact</span>
        </a>
      </nav>
      <ThemeToggleButton /> 
    </header>
  );
};

export default Header;