/**
 * Icon Helper
 *
 * Creates wrapped icon components with consistent styling
 */

import React from 'react';
import { cn } from '@/lib/utils';

export type IconFC = React.FC<React.SVGProps<SVGSVGElement>>;

export interface IconProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
}

export function createIcon(IconComponent: IconFC) {
  const Icon = React.forwardRef<SVGSVGElement, IconProps>(
    ({ className, ...props }, ref) => {
      return (
        <IconComponent
          ref={ref}
          className={cn('h-4 w-4', className)}
          {...props}
        />
      );
    }
  );

  Icon.displayName = IconComponent.displayName || IconComponent.name || 'Icon';

  return Icon;
}

// Export IconFC type for use in other components
export type { IconFC as default };
