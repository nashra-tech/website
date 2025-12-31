/**
 * Translation Hook
 *
 * Hook to use translations in client components
 */

'use client';

import { useMemo } from 'react';
import { getTranslations, type Translations } from './translations';

/**
 * Hook to get translations based on language
 *
 * @param language - Language code from tenant (e.g., 'en', 'ar', 'es')
 * @returns Translations object and helper function
 */
export function useTranslations(language: string) {
  const translations = useMemo(() => {
    return getTranslations(language);
  }, [language]);

  /**
   * Helper function to get nested translation
   * Example: t('common.subscribe')
   */
  const t = useMemo(() => {
    return (path: string): string => {
      const keys = path.split('.');
      let value: any = translations;

      for (const key of keys) {
        value = value?.[key];
      }

      return typeof value === 'string' ? value : path;
    };
  }, [translations]);

  return { t, translations };
}
