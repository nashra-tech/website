import * as React from 'react';
import { cn } from '@/lib/utils';
import { typographyStyles } from './typography.config';

export interface SmallProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  className?: string;
  as?: 'small' | 'span' | 'p' | 'div';
  fontWeight?: string;
  textSize?: string;
  textColor?: string;
}

/**
 * Small Component - Tertiary Text (12px)
 *
 * Used for captions, labels, metadata, timestamps, and fine print.
 *
 * @example
 * <Small>Last updated 2 hours ago</Small>
 * <Small className="text-muted-foreground">Helper text</Small>
 * <Small as="span">Inline small text</Small>
 * <Small fontWeight="font-medium" textColor="text-primary">Custom Small</Small>
 */
export const Small = React.forwardRef<HTMLElement, SmallProps>(
  ({ children, className, as: Component = 'small', fontWeight, textSize, textColor, ...props }, ref) => {
    return (
      <Component
        ref={ref as any}
        className={cn(
          typographyStyles.small.base,
          typographyStyles.small.default,
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

Small.displayName = 'Small';
