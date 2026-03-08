/**
 * Loading State for Tenant Homepage
 *
 * Displays while fetching tenant data and posts.
 */

import {
  HeaderSkeleton,
  BlogHeaderSkeleton,
  BlogListSkeleton,
  PaginationSkeleton,
  FooterSkeleton,
} from '@/components/blog/blog-skeleton';

export default function Loading() {
  return (
    <div className="min-h-screen transition-colors flex justify-between flex-col">
      <div className="min-h-[600px] flex flex-col">
        <HeaderSkeleton />

        <main className="flex-grow">
          <div className="max-w-[560px] mx-auto px-5 sm:px-0">
            <BlogHeaderSkeleton />
            <BlogListSkeleton count={8} />
            <PaginationSkeleton />
          </div>
        </main>
      </div>

      <FooterSkeleton />
    </div>
  );
}
