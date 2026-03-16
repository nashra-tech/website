/**
 * BlogPostMagazine Component
 *
 * Magazine layout: first post featured large, rest in a compact list.
 */

import { Post } from '@/types';
import Image from 'next/image';
import Link from 'next/link';
import { BlogPostItemImage } from './blog-post-item-image';
import { getPostGradient } from './post-gradient';

interface BlogPostMagazineProps {
  posts: Post[];
  tenantSlug: string;
  tenantDirection?: 'ltr' | 'rtl';
  tenantLanguage?: string;
}

export function BlogPostMagazine({
  posts,
  tenantSlug,
  tenantDirection = 'ltr',
  tenantLanguage = 'en',
}: BlogPostMagazineProps) {
  if (posts.length === 0) return null;

  const [featured, ...rest] = posts;

  const formattedDate = new Date(featured.publish_date).toLocaleDateString(tenantLanguage, {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
  });

  return (
    <div dir={tenantDirection}>
      {/* Featured Post */}
      <Link
        href={`/${featured.slug}`}
        className="group mb-6 block overflow-hidden rounded-[var(--blog-radius-lg)] transition-colors duration-200 ease-out hover:bg-neutral-100 dark:hover:bg-neutral-800"
      >
        <div className="relative w-full overflow-hidden rounded-[var(--blog-radius-lg)] bg-neutral-100 dark:bg-neutral-800">
          {featured.main_image_url ? (
            <Image
              src={featured.main_image_url}
              alt={featured.title}
              width={560}
              height={420}
              className="w-full h-auto transition-transform duration-300 ease-out group-hover:scale-[1.02]"
              sizes="(max-width: 640px) 100vw, 560px"
            />
          ) : (
            <div
              className="w-full aspect-video"
              style={{ background: getPostGradient(featured.title) }}
            />
          )}
        </div>
        <div className="px-1 py-3 pb-0 sm:p-3 sm:pb-0">
          <h3 className="text-[18px] sm:text-[20px] font-medium leading-[1.3] text-foreground tracking-tight">
            {featured.title}
          </h3>
          {featured.subtitle && (
            <p className="mt-1 text-[13px] sm:text-sm text-muted-foreground line-clamp-2">{featured.subtitle}</p>
          )}
          <p className="mt-2 text-xs text-muted-foreground">
            {formattedDate}
            {featured.category && (
              <> &middot; {featured.category.name}</>
            )}
          </p>
        </div>
      </Link>

      {/* Rest in list */}
      {rest.length > 0 && (
        <div className="space-y-0">
          {rest.map((post) => (
            <BlogPostItemImage
              key={post.uuid}
              post={post}
              tenantSlug={tenantSlug}
              tenantDirection={tenantDirection}
              tenantLanguage={tenantLanguage}
            />
          ))}
        </div>
      )}
    </div>
  );
}
