import * as React from 'react';
import { cn } from '@/lib/utils';
import { typographyStyles } from './typography.config';

export interface H4Props extends React.HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'div';
  fontWeight?: string;
  textSize?: string;
  textColor?: string;
}

/**
 * H4 Component - Minor Heading (20px)
 *
 * Used for smaller headings and content grouping.
 *
 * @example
 * <H4>Notification Preferences</H4>
 * <H4 className="mb-2">List Header</H4>
 * <H4 fontWeight="font-bold" textColor="text-primary">Custom H4</H4>
 */
export const H4 = React.forwardRef<HTMLHeadingElement, H4Props>(
  ({ children, className, as: Component = 'h4', fontWeight, textSize, textColor, ...props }, ref) => {
    return (
      <Component
        ref={ref}
        className={cn(
          typographyStyles.h4.base,
          typographyStyles.h4.default,
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

H4.displayName = 'H4';
