import { useState, useEffect, type ReactNode } from 'react';
import { ThemeContext, type Theme } from './useTheme';

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  // index.html sets data-theme before first paint (dark unless the visitor chose light).
  // Start from it so the first effect run cannot overwrite the stored choice with a default.
  const [theme, setTheme] = useState<Theme>(() =>
    document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark'
  );

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  // Background splats are on unless the visitor turned them off.
  const [splatEnabled, setSplatEnabled] = useState(() => localStorage.getItem('splat') !== 'off');

  useEffect(() => {
    localStorage.setItem('splat', splatEnabled ? 'on' : 'off');
  }, [splatEnabled]);

  const toggleSplat = () => setSplatEnabled((enabled) => !enabled);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, splatEnabled, toggleSplat }}>
      {children}
    </ThemeContext.Provider>
  );
};
