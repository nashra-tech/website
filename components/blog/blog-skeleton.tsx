/**
 * Blog Skeleton Components
 *
 * Loading skeletons matching the blog design.
 */

import { Skeleton } from '@/components/ui/skeleton';
import { Separator } from '@/components/ui/separator';

export function BlogPostItemSkeleton() {
  return (
    <div className="py-3 px-2 w-full border-b">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 sm:gap-4">
        <Skeleton className="h-6 flex-1 max-w-[415px]" />
        <Skeleton className="h-6 w-24 flex-shrink-0" />
      </div>
    </div>
  );
}

export function BlogHeaderSkeleton() {
  return (
    <div className="sm:mt-20 sm:mb-16 mt-16 mb-16">
      <Skeleton className="h-8 w-48 mb-2" />
      <Skeleton className="h-6 w-full max-w-md" />
    </div>
  );
}

export function BlogListSkeleton({ count = 10 }: { count?: number }) {
  return (
    <div className="w-full">
      <div className="space-y-0">
        {Array.from({ length: count }).map((_, index) => (
          <BlogPostItemSkeleton key={index} />
        ))}
      </div>
    </div>
  );
}

export function PostDetailHeaderSkeleton() {
  return (
    <div className="sm:mt-20 mt-16 w-full max-w-[560px] mx-auto p-3 sm:p-0">
      <div className="mb-8">
        <Skeleton className="h-10 w-full mb-3" />
        <Skeleton className="h-6 w-3/4 mb-2" />
        <Skeleton className="h-4 w-32" />
      </div>
    </div>
  );
}

export function PostDetailContentSkeleton() {
  return (
    <article className="mt-8.5 mb-6">
      <div className="flex gap-11 items-base">
        <Skeleton className="w-9 h-9 rounded-md flex-shrink-0" />
        <div className="space-y-3 flex-1">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-4/5" />
          <div className="pt-4">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full mt-2" />
            <Skeleton className="h-4 w-3/4 mt-2" />
          </div>
        </div>
      </div>
    </article>
  );
}

export function MoreArticlesSkeleton() {
  return (
    <div className="space-y-3 sm:space-y-4 mt-16">
      <div className="flex items-center gap-2 mb-3 sm:mb-4">
        <Skeleton className="h-5 w-32" />
        <Skeleton className="h-4 w-4" />
      </div>
      <div className="space-y-0">
        <Separator />
        {Array.from({ length: 3 }).map((_, index) => (
          <BlogPostItemSkeleton key={index} />
        ))}
      </div>
    </div>
  );
}

export function PaginationSkeleton() {
  return (
    <div className="py-3 px-2 flex justify-between items-center">
      <Skeleton className="h-9 w-24" />
      <Skeleton className="h-9 w-24" />
    </div>
  );
}
