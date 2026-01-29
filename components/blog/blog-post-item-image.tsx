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
  isFirst?: boolean;
  isLast?: boolean;
}

export function BlogPostItemImage({
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
    month: 'long',
    day: '2-digit',
  });

  return (
    <Link
      href={`/${post.slug}`}
      className={`py-3 px-2 w-full ${!isLast ? 'border-b' : ''} cursor-pointer transition-colors block rounded-lg hover:bg-neutral-100`}
      dir={tenantDirection}
    >
      <div className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
        <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 bg-neutral-100">
          {post.main_image_thumb_url ? (
            <Image
              src={post.main_image_thumb_url}
              alt={post.title}
              width={48}
              height={48}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <FileText className="w-6 h-6 text-muted-foreground" />
            </div>
          )}
        </div>

        <div className={`flex flex-col ${isRTL ? 'text-right' : 'text-left'}`}>
          <h3 className="text-base font-medium leading-snug text-foreground">
            {post.title}
          </h3>
          <p className="text-sm text-muted-foreground">
            {formattedDate}
          </p>
        </div>
      </div>
    </Link>
  );
}
