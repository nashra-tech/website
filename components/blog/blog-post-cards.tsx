/**
 * BlogPostCards Component
 *
 * 2-column card grid layout for blog posts with larger images.
 */

import { Post } from '@/types';
import Image from 'next/image';
import Link from 'next/link';
import { getPostGradient } from './post-gradient';

interface BlogPostCardsProps {
  posts: Post[];
  tenantSlug: string;
  tenantDirection?: 'ltr' | 'rtl';
  tenantLanguage?: string;
}

export function BlogPostCards({
  posts,
  tenantSlug,
  tenantDirection = 'ltr',
  tenantLanguage = 'en',
}: BlogPostCardsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4" dir={tenantDirection}>
      {posts.map((post) => {
        const formattedDate = new Date(post.publish_date).toLocaleDateString(tenantLanguage, {
          year: 'numeric',
          month: 'short',
          day: '2-digit',
        });

        return (
          <Link
            key={post.uuid}
            href={`/${post.slug}`}
            className="group block overflow-hidden rounded-[var(--blog-radius-lg)] transition-colors duration-200 ease-out hover:bg-neutral-100 dark:hover:bg-neutral-800 cursor-pointer"
          >
            <div className="relative w-full overflow-hidden rounded-[var(--blog-radius-lg)] bg-neutral-100 dark:bg-neutral-800">
              {post.main_image_url ? (
                <Image
                  src={post.main_image_url}
                  alt={post.title}
                  width={400}
                  height={300}
                  className="w-full aspect-video object-cover transition-transform duration-300 ease-out group-hover:scale-[1.02]"
                  sizes="(max-width: 640px) 100vw, 50vw"
                />
              ) : (
                <div
                  className="w-full aspect-video"
                  style={{ background: getPostGradient(post.title) }}
                />
              )}
            </div>
            <div className="px-1 py-3 sm:p-3">
              <h3 className="text-[14px] sm:text-[15px] font-medium leading-[1.3] text-foreground tracking-tight line-clamp-2">
                {post.title}
              </h3>
              <p className="mt-1.5 text-xs text-muted-foreground">
                {formattedDate}
                {post.category && (
                  <> &middot; {post.category.name}</>
                )}
              </p>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
