import * as React from 'react';
import { cn } from '@/lib/utils';
import { typographyStyles } from './typography.config';

export interface ParagraphProps extends React.HTMLAttributes<HTMLParagraphElement> {
  children: React.ReactNode;
  className?: string;
  as?: 'p' | 'span' | 'div';
  fontWeight?: string;
  textSize?: string;
  textColor?: string;
}

/**
 * Paragraph Component (P3) - Default Reading Text (14px)
 *
 * Used for main body content, paragraphs, and default text.
 *
 * @example
 * <Paragraph>This is the main content text that users will read.</Paragraph>
 * <Paragraph className="text-muted-foreground">Secondary content</Paragraph>
 * <Paragraph as="span">Inline body text</Paragraph>
 * <Paragraph fontWeight="font-medium" textColor="text-primary">Custom Paragraph</Paragraph>
 */
export const Paragraph = React.forwardRef<HTMLParagraphElement, ParagraphProps>(
  ({ children, className, as: Component = 'p', fontWeight, textSize, textColor, ...props }, ref) => {
    return (
      <Component
        ref={ref as any}
        className={cn(
          typographyStyles.body.base,
          typographyStyles.body.default,
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

Paragraph.displayName = 'Paragraph';
