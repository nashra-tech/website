import * as React from 'react';
import { cn } from '@/lib/utils';
import { typographyStyles } from './typography.config';

export interface H1Props extends React.HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode;
  /**
   * Additional custom className to merge with base styles
   */
  className?: string;
  /**
   * HTML element to render (default: h1)
   * Useful for semantic HTML while maintaining visual style
   */
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'div';
  /**
   * Override font weight (default: font-semibold)
   */
  fontWeight?: string;
  /**
   * Override text size (default: text-4xl)
   */
  textSize?: string;
  /**
   * Override text color (default: text-foreground)
   */
  textColor?: string;
}

/**
 * H1 Component - Page Title (36px)
 *
 * Used for primary page titles and main headings.
 *
 * @example
 * <H1>Dashboard Overview</H1>
 * <H1 className="text-primary">Custom Colored Heading</H1>
 * <H1 as="h2">Semantic H2 with H1 style</H1>
 * <H1 fontWeight="font-bold" textColor="text-primary">Custom styled heading</H1>
 */
export const H1 = React.forwardRef<HTMLHeadingElement, H1Props>(
  ({ children, className, as: Component = 'h1', fontWeight, textSize, textColor, ...props }, ref) => {
    return (
      <Component
        ref={ref}
        className={cn(
          typographyStyles.h1.base,
          typographyStyles.h1.default,
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

H1.displayName = 'H1';
