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

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
