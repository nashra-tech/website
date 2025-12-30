import * as React from 'react';
import { cn } from '@/lib/utils';
import { typographyStyles } from './typography.config';

export interface H3Props extends React.HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'div';
  fontWeight?: string;
  textSize?: string;
  textColor?: string;
}

/**
 * H3 Component - Subsection Heading (24px)
 *
 * Used for subsection headings and nested content structure.
 *
 * @example
 * <H3>Email Settings</H3>
 * <H3 className="text-destructive">Error Section</H3>
 * <H3 fontWeight="font-bold" textColor="text-primary">Custom H3</H3>
 */
export const H3 = React.forwardRef<HTMLHeadingElement, H3Props>(
  ({ children, className, as: Component = 'h3', fontWeight, textSize, textColor, ...props }, ref) => {
    return (
      <Component
        ref={ref}
        className={cn(
          typographyStyles.h3.base,
          typographyStyles.h3.default,
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

H3.displayName = 'H3';
