/**
 * Typography Component System
 *
 * Centralized, reusable typography components following App Typography rules.
 *
 * Usage:
 * ```tsx
 * import { H1, H2, Title, Body, Small } from '@/components/typography';
 *
 * function MyPage() {
 *   return (
 *     <div>
 *       <H1>Page Title</H1>
 *       <Body>Main content goes here...</Body>
 *       <Small>Last updated today</Small>
 *     </div>
 *   );
 * }
 * ```
 */

export { H1 } from './H1';
export { H2 } from './H2';
export { H3 } from './H3';
export { H4 } from './H4';
export { Title } from './Title';
export { Subtitle } from './Subtitle';
export { Paragraph } from './Paragraph';
export { Small } from './Small';
export { Text } from './Text';

export { typographyStyles } from './typography.config';
export type { TypographyVariant } from './typography.config';

// Re-export types for convenience
export type { H1Props } from './H1';
export type { H2Props } from './H2';
export type { H3Props } from './H3';
export type { H4Props } from './H4';
export type { TitleProps } from './Title';
export type { SubtitleProps } from './Subtitle';
export type { ParagraphProps } from './Paragraph';
export type { SmallProps } from './Small';
export type { TextProps } from './Text';
