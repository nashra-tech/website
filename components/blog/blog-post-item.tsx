/**
 * BlogPostItem Component
 *
 * Simple list item for displaying posts in the index page.
 * Matches the design from the original Index.tsx
 */

import { Post } from '@/types';
import Link from 'next/link';

interface BlogPostItemProps {
  post: Post;
  tenantSlug: string;
  tenantDirection?: 'ltr' | 'rtl';
  isFirst?: boolean;
  isLast?: boolean;
}

export function BlogPostItem({
  post,
  tenantSlug,
  tenantDirection = 'ltr',
  isFirst = false,
  isLast = false,
}: BlogPostItemProps) {
  const isRTL = tenantDirection === 'rtl';
  const locale = isRTL ? 'ar-EG' : 'en-US';

  const formattedDate = new Date(post.publish_date).toLocaleDateString(locale, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  const truncateTitle = (title: string, maxLength: number) => {
    if (typeof window !== 'undefined') {
      const isMobile = window.innerWidth < 640;
      const limit = isMobile ? 40 : maxLength;
      return title.length > limit ? title.substring(0, limit) + '...' : title;
    }
    return title.length > maxLength ? title.substring(0, maxLength) + '...' : title;
  };

  return (
    <Link
      href={`/${post.slug}`}
      className={`py-3 px-2 w-full ${!isLast ? 'border-b' : ''} cursor-pointer transition-colors block`}
      dir={tenantDirection}
    >
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 sm:gap-4">
        <h3
          className={`text-base font-medium leading-relaxed transition-colors ${
            isRTL ? 'text-right' : 'text-left'
          } flex-1 max-w-[415px] text-muted-foreground`}
        >
          {truncateTitle(post.title, 80)}
        </h3>

        <p
          className={`font-medium text-md ${
            isRTL ? 'text-right' : 'text-left'
          } flex-shrink-0  text-muted-foreground`}
        >
          {formattedDate}
        </p>
      </div>
    </Link>
  );
}
