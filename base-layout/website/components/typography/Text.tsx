import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const textVariants = cva(
  'flex flex-row items-center gap-2',
  {
    variants: {
      variant: {
        lg: 'font-semibold text-lg leading-[28px] text-neutral-900 dark:text-base-0',
        small: 'font-medium text-sm leading-[20px] text-neutral-900 dark:text-base-0',
        muted: 'font-medium text-sm leading-[20px] text-neutral-500 dark:text-base-400',
      },
    },
    defaultVariants: {
      variant: 'small',
    },
  }
);

export interface TextProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof textVariants> {
  children: React.ReactNode;
  /**
   * Override font weight
   */
  fontWeight?: string;
  /**
   * Override text size
   */
  textSize?: string;
  /**
   * Override text color
   */
  textColor?: string;
}

const Text = React.forwardRef<HTMLSpanElement, TextProps>(
  ({ className, variant, children, fontWeight, textSize, textColor, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(textVariants({ variant }), fontWeight, textSize, textColor, className)}
        {...props}
      >
        {children}
      </span>
    );
  }
);

Text.displayName = 'Text';

export { Text, textVariants };