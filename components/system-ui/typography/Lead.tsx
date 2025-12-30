import * as React from 'react';
import { cn } from '@/lib/utils';

export interface LeadProps extends React.HTMLAttributes<HTMLParagraphElement> {
  children: React.ReactNode;
}

const Lead = React.forwardRef<HTMLParagraphElement, LeadProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <p
        ref={ref}
        className={cn(
          'flex flex-row items-center gap-2',
          'font-normal text-xl leading-[28px]',
          'text-base-500 dark:text-base-400',
          className
        )}
        {...props}
      >
        {children}
      </p>
    );
  }
);

Lead.displayName = 'Lead';

export { Lead };