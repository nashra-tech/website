/**
 * Translation Utilities
 *
 * Simple i18n system based on tenant's website_language
 */

import en from '@/translations/en.json';
import ar from '@/translations/ar.json';
import es from '@/translations/es.json';
import pt from '@/translations/pt.json';
import fr from '@/translations/fr.json';
import de from '@/translations/de.json';
import zh from '@/translations/zh.json';
import hi from '@/translations/hi.json';
import ja from '@/translations/ja.json';
import id from '@/translations/id.json';

export type SupportedLanguage = 'en' | 'ar' | 'es' | 'pt' | 'fr' | 'de' | 'zh' | 'hi' | 'ja' | 'id';

export type TranslationKey = keyof typeof en;

export type Translations = typeof en;

const translations: Record<SupportedLanguage, Translations> = {
  en,
  ar,
  es,
  pt,
  fr,
  de,
  zh,
  hi,
  ja,
  id,
};

/**
 * Get translations for a specific language
 * Fallback to English if language not found
 */
export function getTranslations(language: string): Translations {
  const lang = language as SupportedLanguage;
  return translations[lang] || translations.en;
}

/**
 * Get a specific translation by path
 * Example: t('common.subscribe', 'en')
 */
export function t(path: string, language: string = 'en'): string {
  const trans = getTranslations(language);
  const keys = path.split('.');

  let value: any = trans;
  for (const key of keys) {
    value = value?.[key];
  }

  return typeof value === 'string' ? value : path;
}

/**
 * Language metadata
 */
export const LANGUAGE_NAMES: Record<SupportedLanguage, string> = {
  ar: 'Arabic',
  en: 'English',
  es: 'Spanish',
  pt: 'Portuguese',
  fr: 'French',
  de: 'German',
  zh: 'Chinese (Simplified)',
  hi: 'Hindi',
  ja: 'Japanese',
  id: 'Indonesian',
};

/**
 * Check if a language is RTL
 */
export function isRTL(language: string): boolean {
  return language === 'ar';
}
