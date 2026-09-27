import React from 'react';
import { useTheme } from '../../hooks/useTheme';
import './ThemeToggleButton.css';

// Shares the theme button's look so the two read as one control group.
const SplatToggleButton: React.FC = () => {
  const { splatEnabled, toggleSplat } = useTheme();
  const label = splatEnabled ? 'Hide background splats' : 'Show background splats';

  return (
    <button
      onClick={toggleSplat}
      className="theme-toggle-button splat-toggle-button"
      aria-pressed={splatEnabled}
      aria-label={label}
      title={label}
    >
      <svg className="theme-toggle-icon" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="8.5" cy="8.5" rx="5" ry="2.75" transform="rotate(-30 8.5 8.5)" />
        <ellipse cx="16" cy="14.5" rx="3.75" ry="2.25" transform="rotate(25 16 14.5)" />
        <circle cx="8" cy="17.5" r="1.75" />
      </svg>
    </button>
  );
};

export default SplatToggleButton;
