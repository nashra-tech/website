import * as React from 'react';
import { cn } from '@/lib/utils';

export interface ListProps extends React.HTMLAttributes<HTMLUListElement | HTMLOListElement> {
  ordered?: boolean;
  children: React.ReactNode;
}

const List = React.forwardRef<HTMLUListElement | HTMLOListElement, ListProps>(
  ({ className, ordered = false, children, ...props }, ref) => {
    const Component = ordered ? 'ol' : 'ul';
    
    return (
      <Component
        ref={ref as any}
        className={cn(
          'font-normal text-base leading-normal',
          'text-base-900 dark:text-base-0',
          ordered ? 'list-decimal' : 'list-disc',
          'pl-6 space-y-1',
          className
        )}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

List.displayName = 'List';

export { List };