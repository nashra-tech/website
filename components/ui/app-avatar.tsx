import * as React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';

interface AppAvatarProps extends React.ComponentProps<typeof Avatar> {
  src?: string | null;
  alt?: string;
  name?: string;
  textSize?: string;
  fallbackClassName?: string;
}

/**
 * A unified avatar component used across the app.
 * Features:
 * - Always circular
 * - Images use object-cover
 * - Falls back to initials from name
 * - Consistent styling
 */
export function AppAvatar({
  src,
  alt,
  name,
  textSize='text-3xl',
  className,
  fallbackClassName,
  ...props
}: AppAvatarProps) {
  const getInitials = (name?: string) => {
    if (!name) return '?';

    const words = name.trim().split(/\s+/);
    if (words.length >= 2) {
      return (words[0][0] + words[1][0]).toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  return (
    <Avatar className={cn('rounded-lg', className)} {...props}>
      {src && <AvatarImage src={src} alt={alt || name || 'Avatar'} />}
      <AvatarFallback
        className={cn(
          'rounded-full bg-primary text-white dark:text-foreground text-xs',
          fallbackClassName
        )}
      >
        {getInitials(name)}
      </AvatarFallback>
    </Avatar>
  );
}
