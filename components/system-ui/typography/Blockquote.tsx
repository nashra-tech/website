import * as React from 'react';
import { cn } from '@/lib/utils';

export interface BlockquoteProps extends React.BlockquoteHTMLAttributes<HTMLQuoteElement> {
  children: React.ReactNode;
}

const Blockquote = React.forwardRef<HTMLQuoteElement, BlockquoteProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <blockquote
        ref={ref}
        className={cn(
          'flex flex-row items-center gap-2 pl-6 border-l-2 ',
          'font-normal text-base leading-normal',
          'text-base-900 dark:text-base-0',
          className
        )}
        {...props}
      >
        {children}
      </blockquote>
    );
  }
);

Blockquote.displayName = 'Blockquote';

export { Blockquote };
