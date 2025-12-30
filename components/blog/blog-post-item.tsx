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
}

export function BlogPostItem({
  post,
  tenantSlug,
  tenantDirection = 'ltr',
  isFirst = false,
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
      href={`/posts/${post.slug}`}
      className="py-3 px-2 w-full border-b cursor-pointer transition-colors block"
      dir={tenantDirection}
    >
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 sm:gap-4">
        <h3
          className={`${
            isFirst ? 'text-base-900' : 'text-base-500'
          } dark:text-base-400 text-base font-medium leading-relaxed transition-colors ${
            isRTL ? 'text-right' : 'text-left'
          } flex-1 max-w-[415px]`}
        >
          {truncateTitle(post.title, 80)}
        </h3>

        <p
          className={`${
            isFirst ? 'text-base-900' : 'text-base-500'
          } font-medium dark:text-base-400 text-md ${
            isRTL ? 'text-right' : 'text-left'
          } flex-shrink-0`}
        >
          {formattedDate}
        </p>
      </div>
    </Link>
  );
}
