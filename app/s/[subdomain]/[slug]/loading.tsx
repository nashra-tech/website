/**
 * Loading State for Post Detail Page
 *
 * Displays while fetching post data.
 */

import {
  HeaderSkeleton,
  PostDetailHeaderSkeleton,
  PostDetailContentSkeleton,
  MoreArticlesSkeleton,
  FooterSkeleton,
} from '@/components/blog/blog-skeleton';

export default function Loading() {
  return (
    <div className="min-h-screen transition-colors">
      <div className="min-h-[600px] flex flex-col">
        <HeaderSkeleton />

        <main className="flex-grow">
          <PostDetailHeaderSkeleton />
          <div className="w-full max-w-[560px] mx-auto px-5 sm:px-0">
            <PostDetailContentSkeleton />
            <MoreArticlesSkeleton />
          </div>
        </main>
      </div>

      <FooterSkeleton />
    </div>
  );
}
