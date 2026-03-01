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
      className={`py-3 px-3 w-full ${!isLast ? 'border-b' : ''} cursor-pointer transition-colors block rounded-lg hover:bg-neutral-100`}
      dir={tenantDirection}
    >
      <div className="flex items-center gap-3">
        <div className="w-[44px] h-[44px] rounded-md overflow-hidden flex-shrink-0 bg-neutral-100">
          {post.main_image_thumb_url ? (
            <Image
              src={post.main_image_thumb_url}
              alt={post.title}
              width={44}
              height={44}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <FileText className="w-5 h-5 text-muted-foreground" />
            </div>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <h3 className="text-[17px] font-medium leading-[1.2] text-foreground tracking-tight">
            {post.title}
          </h3>
          <p className="text-xs text-muted-foreground">
            {formattedDate}
          </p>
        </div>
      </div>
    </Link>
  );
}
