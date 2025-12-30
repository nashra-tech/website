import * as React from 'react';
import { cn } from '@/lib/utils';
import { typographyStyles } from './typography.config';

export interface H2Props extends React.HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'div';
  fontWeight?: string;
  textSize?: string;
  textColor?: string;
}

/**
 * H2 Component - Major Section Heading (30px)
 *
 * Used for primary section headings within a page.
 *
 * @example
 * <H2>Recent Campaigns</H2>
 * <H2 className="mb-4">Custom Spacing</H2>
 * <H2 fontWeight="font-bold" textColor="text-primary">Custom H2</H2>
 */
export const H2 = React.forwardRef<HTMLHeadingElement, H2Props>(
  ({ children, className, as: Component = 'h2', fontWeight, textSize, textColor, ...props }, ref) => {
    return (
      <Component
        ref={ref}
        className={cn(
          typographyStyles.h2.base,
          typographyStyles.h2.default,
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

H2.displayName = 'H2';
