/**
 * Loading State for Tenant Homepage
 *
 * Displays while fetching tenant data and posts.
 */

import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import {
  BlogHeaderSkeleton,
  BlogListSkeleton,
  PaginationSkeleton,
} from '@/components/blog/blog-skeleton';

export default function Loading() {
  return (
    <div className="min-h-screen transition-colors flex justify-between flex-col">
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
        <div className="max-w-[560px] mx-auto p-3 sm:p-0">
          <BlogHeaderSkeleton />
          <Separator />
          <BlogListSkeleton count={10} />
          <PaginationSkeleton />
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
