/**
 * Blog Skeleton Components
 *
 * Loading skeletons matching the blog design.
 */

import { Skeleton } from '@/components/ui/skeleton';

export function BlogPostItemSkeleton() {
  return (
    <div className="py-3 px-3 w-full">
      <div className="flex items-center gap-3">
        <Skeleton className="w-[44px] h-[44px] rounded-md flex-shrink-0" />
        <div className="flex flex-col gap-1.5 flex-1">
          <Skeleton className="h-5 w-3/4 max-w-[280px]" />
          <Skeleton className="h-3.5 w-24" />
        </div>
      </div>
    </div>
  );
}

export function BlogHeaderSkeleton() {
  return (
    <div className="sm:mt-20 sm:mb-16 mt-16 mb-16">
      <Skeleton className="h-8 w-64 max-w-[460px] mb-3" />
      <Skeleton className="h-4 w-full max-w-[380px]" />
    </div>
  );
}

export function BlogListSkeleton({ count = 10 }: { count?: number }) {
  return (
    <div className="w-full">
      <Skeleton className="h-4 w-12 mb-4" />
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
        <Skeleton className="h-10 w-full max-w-[420px] mb-1" />
        <Skeleton className="h-6 w-2/3 mb-3" />
        <Skeleton className="h-4 w-36" />
      </div>
    </div>
  );
}

export function PostDetailContentSkeleton() {
  return (
    <article className="my-10">
      <div className="space-y-4">
        <div className="space-y-2.5">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
        </div>
        <div className="space-y-2.5 pt-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-4/5" />
        </div>
        <div className="space-y-2.5 pt-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </div>
      </div>
    </article>
  );
}

export function MoreArticlesSkeleton() {
  return (
    <div className="mt-16">
      <Skeleton className="h-4 w-24 mb-4" />
      <div className="space-y-0">
        {Array.from({ length: 3 }).map((_, index) => (
          <BlogPostItemSkeleton key={index} />
        ))}
      </div>
    </div>
  );
}

export function PaginationSkeleton() {
  return (
    <div className="py-4 flex justify-center items-center gap-2">
      <Skeleton className="h-8 w-8 rounded-md" />
      <Skeleton className="h-8 w-8 rounded-md" />
      <Skeleton className="h-8 w-8 rounded-md" />
    </div>
  );
}

export function HeaderSkeleton() {
  return (
    <header className="py-2 sm:py-3">
      <div className="container mx-auto px-3 sm:px-0 max-w-[560px]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-3">
            <Skeleton className="size-8 rounded-full" />
            <Skeleton className="h-5 w-32 hidden sm:block" />
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            <Skeleton className="size-8 rounded-md" />
            <Skeleton className="h-8 w-28 rounded-xl" />
          </div>
        </div>
      </div>
    </header>
  );
}

export function FooterSkeleton() {
  return (
    <footer className="p-3 sm:p-0">
      <section className="pt-16 pb-0 mb-0 sm:pb-6 sm:mb-3">
        <div className="max-w-[560px] mx-auto">
          <div className="mb-3">
            <Skeleton className="h-5 w-48 mb-1.5" />
            <Skeleton className="h-5 w-64" />
          </div>
          <Skeleton className="h-11 w-full max-w-sm rounded-xl" />
          <div className="hidden sm:flex justify-between items-center mt-3">
            <Skeleton className="h-3 w-32" />
            <div className="flex gap-3">
              {Array.from({ length: 3 }).map((_, i) => (
                <Skeleton key={i} className="w-5 h-5" />
              ))}
            </div>
          </div>
        </div>
      </section>
    </footer>
  );
}
