import { createContext, useContext, useEffect, useMemo, useRef, useState } from 'react';

const STORAGE_KEY = 'ras-theme';

const ThemeContext = createContext({
  theme: 'light',
  toggleTheme: () => {},
  setTheme: () => {},
  resetTheme: () => {},
});

const prefersDark = () => window.matchMedia('(prefers-color-scheme: dark)').matches;

const applyThemeClass = (mode) => {
  if (typeof document === 'undefined') return;
  const body = document.body;
  const root = document.documentElement;
  if (!body || !root) return;

  const isDark = mode === 'dark';
  body.classList.toggle('theme-dark', isDark);
  body.classList.toggle('theme-light', !isDark);
  root.classList.toggle('theme-dark', isDark);
  root.classList.toggle('theme-light', !isDark);
  body.dataset.theme = mode;
  root.dataset.theme = mode;
};

const getInitialTheme = () => {
  if (typeof window === 'undefined') {
    return { theme: 'light', persisted: false };
  }

  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (stored === 'light' || stored === 'dark') {
    return { theme: stored, persisted: true };
  }

  return { theme: prefersDark() ? 'dark' : 'light', persisted: false };
};

export const ThemeProvider = ({ children }) => {
  const initial = useMemo(() => getInitialTheme(), []);
  const [theme, setThemeState] = useState(() => {
    applyThemeClass(initial.theme);
    return initial.theme;
  });
  const persistedRef = useRef(initial.persisted);

  useEffect(() => {
    applyThemeClass(theme);
    if (persistedRef.current) {
      window.localStorage.setItem(STORAGE_KEY, theme);
    } else {
      window.localStorage.removeItem(STORAGE_KEY);
    }
  }, [theme]);

  useEffect(() => {
    const media = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (event) => {
      if (!persistedRef.current) {
        setThemeState(event.matches ? 'dark' : 'light');
      }
    };
    media.addEventListener('change', handleChange);
    return () => media.removeEventListener('change', handleChange);
  }, []);

  const value = useMemo(
    () => ({
      theme,
      toggleTheme: () => {
        persistedRef.current = true;
        setThemeState((current) => (current === 'dark' ? 'light' : 'dark'));
      },
      setTheme: (mode) => {
        persistedRef.current = true;
        setThemeState(mode === 'dark' ? 'dark' : 'light');
      },
      resetTheme: () => {
        persistedRef.current = false;
        setThemeState(prefersDark() ? 'dark' : 'light');
      },
    }),
    [theme]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => useContext(ThemeContext);
