/**
 * BlogPostItem Component
 *
 * Simple list item for displaying posts in the index page.
 * Matches the design from the original Index.tsx
 */

import { Post } from '@/types';
import { FileText } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface BlogPostItemProps {
  post: Post;
  tenantSlug: string;
  tenantDirection?: 'ltr' | 'rtl';
  tenantLanguage?: string;
  isLast?: boolean;
}

export function BlogPostItemImage({
  post,
  tenantSlug,
  tenantDirection = 'ltr',
  tenantLanguage = 'en',
  isLast = false,
}: BlogPostItemProps) {
  const formattedDate = new Date(post.publish_date).toLocaleDateString(tenantLanguage, {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
  });

  return (
    <Link
      href={`/${post.slug}`}
      className={`group py-3 px-2 sm:px-3 w-full cursor-pointer transition-colors duration-200 ease-out block rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800`}
      dir={tenantDirection}
    >
      <div className="flex items-center gap-3">
        <div className="w-[44px] h-[44px] rounded-md overflow-hidden flex-shrink-0 bg-neutral-100 dark:bg-neutral-800">
          {post.main_image_thumb_url ? (
            <Image
              src={post.main_image_thumb_url}
              alt={post.title}
              width={44}
              height={44}
              className="w-full h-full object-cover transition-transform duration-300 ease-out group-hover:scale-[1.03]"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <FileText className="w-5 h-5 text-muted-foreground" />
            </div>
          )}
        </div>

        <div className="flex flex-col gap-1 min-w-0">
          <h3 className="text-[15px] sm:text-[17px] font-medium leading-[1.3] text-foreground tracking-tight line-clamp-2">
            {post.title}
          </h3>
          <p className="text-xs text-muted-foreground">
            {formattedDate}
            {post.category && (
              <> &middot; {post.category.name}</>
            )}
          </p>
        </div>
      </div>
    </Link>
  );
}
