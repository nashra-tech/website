import * as React from 'react';
import { cn } from '@/lib/utils';
import { typographyStyles } from './typography.config';

export interface SubtitleProps extends React.HTMLAttributes<HTMLParagraphElement> {
  children: React.ReactNode;
  className?: string;
  as?: 'p' | 'span' | 'div';
  fontWeight?: string;
  textSize?: string;
  textColor?: string;
}

/**
 * Subtitle Component (P2) - Secondary Line (16px)
 *
 * Used for secondary text under titles, descriptions, and supporting content.
 *
 * @example
 * <Subtitle>Manage your account settings</Subtitle>
 * <Subtitle className="text-muted-foreground">Additional context</Subtitle>
 * <Subtitle fontWeight="font-semibold" textColor="text-primary">Custom Subtitle</Subtitle>
 */
export const Subtitle = React.forwardRef<HTMLParagraphElement, SubtitleProps>(
  ({ children, className, as: Component = 'p', fontWeight, textSize, textColor, ...props }, ref) => {
    return (
      <Component
        ref={ref as any}
        className={cn(
          typographyStyles.subtitle.base,
          typographyStyles.subtitle.default,
          fontWeight,
          textSize,
          textColor,
          className
        )}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

Subtitle.displayName = 'Subtitle';
