import * as React from 'react';
import { cn } from '@/lib/utils';

export interface CodeProps extends React.HTMLAttributes<HTMLPreElement> {
  children: React.ReactNode;
}

const Code = React.forwardRef<HTMLPreElement, CodeProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <pre
        ref={ref}
        className={cn(
          'flex flex-col justify-center items-center p-4',
          'bg-zinc-900 dark:bg-zinc-950',
          'border border-base-200  rounded-m',
          'font-mono font-normal text-base leading-normal',
          'text-white/47',
          'overflow-x-auto',
          className
        )}
        {...props}
      >
        <code className="w-full">{children}</code>
      </pre>
    );
  }
);

Code.displayName = 'Code';

export { Code };