"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from 'react';
import { DICT, type Lang, type Dictionary } from './i18n';

// ---------------------------------------------------------------------------
// Theme (light / dark)
// ---------------------------------------------------------------------------
type Theme = 'light' | 'dark';

interface ThemeCtx {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeCtx | null>(null);

// ---------------------------------------------------------------------------
// Language (en / ar) + direction
// ---------------------------------------------------------------------------
interface LangCtx {
  lang: Lang;
  dir: 'ltr' | 'rtl';
  setLang: (l: Lang) => void;
  toggleLang: () => void;
  t: Dictionary; // active-language dictionary
}

const LanguageContext = createContext<LangCtx | null>(null);

export function Providers({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('dark'); // dark-first, matches brand
  const [lang, setLangState] = useState<Lang>('en');

  // Hydrate from localStorage once on mount
  useEffect(() => {
    const storedTheme = localStorage.getItem('tbs-theme') as Theme | null;
    const storedLang = localStorage.getItem('tbs-lang') as Lang | null;
    if (storedTheme) setTheme(storedTheme);
    if (storedLang) setLangState(storedLang);
  }, []);

  // Reflect theme on <html>
  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle('dark', theme === 'dark');
    localStorage.setItem('tbs-theme', theme);
  }, [theme]);

  // Reflect lang + dir on <html>
  const dir: 'ltr' | 'rtl' = lang === 'ar' ? 'rtl' : 'ltr';
  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute('lang', lang);
    root.setAttribute('dir', dir);
    localStorage.setItem('tbs-lang', lang);
  }, [lang, dir]);

  const toggleTheme = useCallback(
    () => setTheme((t) => (t === 'dark' ? 'light' : 'dark')),
    []
  );
  const setLang = useCallback((l: Lang) => setLangState(l), []);
  const toggleLang = useCallback(
    () => setLangState((l) => (l === 'en' ? 'ar' : 'en')),
    []
  );

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <LanguageContext.Provider
        value={{ lang, dir, setLang, toggleLang, t: DICT[lang] }}
      >
        {children}
      </LanguageContext.Provider>
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within Providers');
  return ctx;
}

export function useLang() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLang must be used within Providers');
  return ctx;
}
