'use client';

import { createContext, useContext, useEffect, useState, useSyncExternalStore, type ReactNode } from 'react';

type Theme = 'light' | 'dark';

type ThemeContextType = {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const THEME_KEY = 'snoonu-theme';

function subscribeToStorage(callback: () => void) {
  window.addEventListener('storage', callback);
  return () => window.removeEventListener('storage', callback);
}

function readSavedTheme(): Theme | null {
  try {
    const saved = localStorage.getItem(THEME_KEY);
    return saved === 'light' || saved === 'dark' ? saved : null;
  } catch {
    return null;
  }
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  // Saved preference, or 'dark' by default. The server always renders 'dark'.
  const savedTheme = useSyncExternalStore(subscribeToStorage, readSavedTheme, () => null);
  const [chosenTheme, setChosenTheme] = useState<Theme | null>(null);
  const theme: Theme = chosenTheme ?? savedTheme ?? 'dark';

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.setAttribute('data-theme', 'dark');
    } else {
      root.removeAttribute('data-theme');
    }
  }, [theme]);

  // Only an explicit choice is saved, so the first render never overwrites the saved theme
  const setTheme = (newTheme: Theme) => {
    setChosenTheme(newTheme);
    try {
      localStorage.setItem(THEME_KEY, newTheme);
    } catch {
      // Storage can be blocked; the theme still applies for this visit
    }
  };

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
