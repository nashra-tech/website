/**
 * Typography System Configuration
 *
 * Centralized typography styles following the App Typography rules.
 * Update font-size, weight, line-height, and spacing from here.
 *
 * Font Scale:
 * - H1 (36px) → Page title
 * - H2 (30px) → Major section heading
 * - H3 (24px) → Subsection heading
 * - H4 (20px) → Minor heading
 * - Title/P1 (18px) → Card/module title
 * - Subtitle/P2 (16px) → Secondary line under titles
 * - Body/P3 (14px) → Default reading text
 * - Small (12px) → Tertiary text
 */

export const typographyStyles = {
  h1: {
    base: 'scroll-m-20 text-4xl font-semibold tracking-tight leading-tight',
    default: 'text-neutral-900 dark:text-base-50',
  },
  h2: {
    base: 'scroll-m-20 text-3xl font-semibold tracking-tight leading-tight',
    default: 'text-neutral-900 dark:text-base-50',
  },
  h3: {
    base: 'scroll-m-20 text-2xl font-semibold tracking-tight leading-tight',
    default: 'text-neutral-900 dark:text-base-50',
  },
  h4: {
    base: 'scroll-m-20 text-xl font-semibold tracking-tight leading-tight',
    default: 'text-neutral-900 dark:text-base-50',
  },
  title: {
    base: 'text-[18px] font-semibold leading-snug',
    default: 'text-neutral-900 dark:text-base-50',
  },
  subtitle: {
    base: 'text-[16px] font-medium leading-relaxed',
    default: 'text-base-500 dark:text-neutral-400',
  },
  body: {
    base: 'text-[14px] font-normal leading-relaxed',
    default: 'text-neutral-900 dark:text-base-50',
  },
  small: {
    base: 'text-[14px] font-normal leading-relaxed',
    default: 'text-base-500 dark:text-neutral-400',
  },
} as const;

export type TypographyVariant = keyof typeof typographyStyles;
