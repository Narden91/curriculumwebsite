import React from 'react';
import { useTheme } from '../../hooks/useTheme';
import './ThemeToggleButton.css';

const ThemeToggleButton: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="theme-toggle-button" // Use the class from CSS file
      aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
    >
      {theme === 'light' ? (
        // Simple Moon Icon (SVG or character)
        <svg className="theme-toggle-icon moon-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path></svg>
      ) : (
        // Simple Sun Icon (SVG or character)
        <svg className="theme-toggle-icon sun-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m8.66-8.66l-.707.707M5.05 5.05l-.707.707M21 12h-1M4 12H3m15.364 6.364l-.707-.707M6.364 5.05l-.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z"></path></svg>
      )}
    </button>
  );
};

export default ThemeToggleButton;
