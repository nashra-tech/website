/**
 * BlogPostMagazine Component
 *
 * Magazine layout: first post featured large, rest in a compact list.
 */

import { Post } from '@/types';
import { FileText } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { BlogPostItemImage } from './blog-post-item-image';

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
        className="group mb-6 block overflow-hidden rounded-lg transition-colors hover:bg-neutral-100 dark:hover:bg-neutral-800"
      >
        <div className="aspect-[16/9] w-full overflow-hidden rounded-lg bg-neutral-100 dark:bg-neutral-800">
          {featured.main_image_url ? (
            <Image
              src={featured.main_image_url}
              alt={featured.title}
              width={560}
              height={315}
              className="h-full w-full object-cover transition-transform group-hover:scale-[1.02]"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <FileText className="h-10 w-10 text-muted-foreground" />
            </div>
          )}
        </div>
        <div className="p-3 pb-0">
          <h3 className="text-[20px] font-medium leading-[1.3] text-foreground tracking-tight">
            {featured.title}
          </h3>
          {featured.subtitle && (
            <p className="mt-1 text-sm text-muted-foreground line-clamp-2">{featured.subtitle}</p>
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
