import * as React from 'react';
import { cn } from '@/lib/utils';

export interface InlineCodeProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
}

const InlineCode = React.forwardRef<HTMLElement, InlineCodeProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <code
        ref={ref}
        className={cn(
          'inline-flex flex-row justify-center items-center',
          'px-[4.8px] py-[3.2px] gap-2 rounded-xs',
          'bg-base-100 dark:bg-base-800',
          'font-mono font-normal text-sm leading-[20px]',
          'text-base-900 dark:text-base-0',
          className
        )}
        {...props}
      >
        {children}
      </code>
    );
  }
);

InlineCode.displayName = 'InlineCode';

export { InlineCode };