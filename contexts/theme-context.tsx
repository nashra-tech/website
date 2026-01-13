/**
 * Theme Context
 *
 * Provides dark/light mode theme switching functionality and dynamic brand color theming
 */

'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { applyThemeColor } from '@/lib/theme-color';

type Theme = 'light' | 'dark' | 'system';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  resolvedTheme: 'light' | 'dark';
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: React.ReactNode;
  brandColor?: string;
}

export function ThemeProvider({ children, brandColor }: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>('dark');
  const [resolvedTheme, setResolvedTheme] = useState<'light' | 'dark'>('dark');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Load theme from localStorage on mount
    const savedTheme = localStorage.getItem('theme') as Theme | null;
    if (savedTheme) {
      setTheme(savedTheme);
    } else {
      // Default to dark if no saved theme
      setTheme('dark');
    }
  }, []);

  useEffect(() => {
    if (!mounted) return;

    // Apply theme to document
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');

    let effectiveTheme: 'light' | 'dark';

    if (theme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light';
      effectiveTheme = systemTheme;
    } else {
      effectiveTheme = theme;
    }

    root.classList.add(effectiveTheme);
    setResolvedTheme(effectiveTheme);

    // Apply brand color after theme is set
    if (brandColor) {
      applyThemeColor(brandColor);
    }

    // Save to localStorage
    localStorage.setItem('theme', theme);
  }, [theme, mounted, brandColor]);

  // Apply brand color when it changes or on mount
  useEffect(() => {
    if (!mounted) return;

    if (brandColor) {
      applyThemeColor(brandColor);
    }
  }, [brandColor, mounted]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, resolvedTheme }}>
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
