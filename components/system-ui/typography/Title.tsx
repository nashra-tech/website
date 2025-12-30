import * as React from 'react';
import { cn } from '@/lib/utils';
import { typographyStyles } from './typography.config';

export interface TitleProps extends React.HTMLAttributes<HTMLParagraphElement> {
  children: React.ReactNode;
  className?: string;
  as?: 'p' | 'span' | 'div' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  fontWeight?: string;
  textSize?: string;
  textColor?: string;
}

/**
 * Title Component (P1) - Card/Module Title (18px)
 *
 * Used for titles within cards, dialogs, modules, and smaller UI sections.
 *
 * @example
 * <Title>Card Header</Title>
 * <Title as="h3">Semantic heading with Title style</Title>
 * <Title className="text-primary">Colored Title</Title>
 * <Title fontWeight="font-bold" textColor="text-primary">Custom Title</Title>
 */
export const Title = React.forwardRef<HTMLParagraphElement, TitleProps>(
  ({ children, className, as: Component = 'p', fontWeight, textSize, textColor, ...props }, ref) => {
    return (
      <Component
        ref={ref as any}
        className={cn(
          typographyStyles.title.base,
          typographyStyles.title.default,
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

Title.displayName = 'Title';
