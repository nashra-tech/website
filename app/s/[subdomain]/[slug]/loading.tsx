/**
 * Loading State for Post Detail Page
 *
 * Displays while fetching post data.
 */

import { Skeleton } from '@/components/ui/skeleton';
import {
  PostDetailHeaderSkeleton,
  PostDetailContentSkeleton,
  MoreArticlesSkeleton,
} from '@/components/blog/blog-skeleton';

export default function Loading() {
  return (
    <div className="min-h-screen transition-colors">
      {/* Header Skeleton */}
      <header className="py-2 sm:py-3 border-b">
        <div className="container mx-auto px-3 sm:px-0 max-w-[560px]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 sm:gap-3">
              <Skeleton className="size-8 rounded-full" />
              <Skeleton className="h-5 w-32 hidden sm:block" />
            </div>
            <div className="flex items-center gap-2 sm:gap-3">
              <Skeleton className="size-8 rounded-md" />
              <Skeleton className="h-8 w-20" />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow">
        <PostDetailHeaderSkeleton />
        <div className="w-full max-w-[560px] mx-auto p-3 sm:p-0">
          <PostDetailContentSkeleton />

          {/* Footer Section Skeleton */}
          <footer className="mt-16 space-y-4">
            <div className="text-center">
              <Skeleton className="h-4 w-64 mx-auto" />
            </div>

            {/* Social Links Skeleton */}
            <div className="flex justify-center items-center gap-3 sm:gap-4 flex-wrap mb-6 sm:mb-8">
              {Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} className="w-5 h-5" />
              ))}
            </div>

            {/* More Articles Skeleton */}
            <MoreArticlesSkeleton />
          </footer>
        </div>
      </main>

      {/* Footer Skeleton */}
      <footer className="border-t py-6 sm:py-8 mt-8">
        <div className="container mx-auto px-3 sm:px-0 max-w-[560px]">
          <div className="flex flex-col items-center gap-4">
            <Skeleton className="h-4 w-48" />
            <div className="flex gap-3 sm:gap-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} className="w-5 h-5" />
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
