/**
 * Tenant Homepage - Blog Post List
 *
 * Main landing page for each tenant showing a list of blog posts.
 * Recreates the functionality from Index.tsx with Next.js App Router.
 */

import { notFound } from 'next/navigation';
import { getTenantBySlug, getPosts } from '@/lib/data';
import { WebsiteLayout } from '@/components/blog/website-layout';
import { WebsiteFooter } from '@/components/blog/website-footer';
import { BlogPostItem } from '@/components/blog/blog-post-item';
import { Pagination } from '@/components/blog/pagination';
import { Separator } from '@/components/ui/separator';
import { Empty } from '@/components/ui/empty';
import { Icons } from '@/components/ui/icons';
import { H2, Subtitle } from '@/components/system-ui/typography';

interface PageProps {
  params: Promise<{
    subdomain: string;
  }>;
  searchParams: Promise<{
    page?: string;
  }>;
}

export default async function TenantHomePage({ params, searchParams }: PageProps) {
  const { subdomain } = await params;
  const { page: pageParam } = await searchParams;
  const page = Number(pageParam) || 1;

  // Fetch tenant data
  const tenant = await getTenantBySlug(subdomain);

  if (!tenant) {
    notFound();
  }

  // Fetch posts for this tenant
  const posts = await getPosts(subdomain, {
    page,
    perPage: 10,
    published: true,
  });

  const tenantDirection = tenant.website_direction || 'ltr';

  return (
    <div
      className="min-h-screen bg-white dark:bg-gray-900 transition-colors flex justify-between flex-col"
      dir={tenantDirection}
      style={{ fontFamily: 'Cairo, system-ui, sans-serif' }}
    >
      <WebsiteLayout tenant={tenant}>
        <div className="max-w-[560px] mx-auto p-3 sm:p-0">
          {/* Header Section - Responsive */}
          <div className="sm:mt-20 sm:mb-16 mt-16 mb-16">
            <H2 className="mb-2">{tenant.name || ''}</H2>
            <Subtitle fontWeight={'font-normal'} textColor={'text-base-500'} textSize={'text-lg'}>
              {tenant.subtitle}
            </Subtitle>
          </div>

          <Separator />

          {/* Posts List */}
          <div className="w-full">
            <div className="space-y-0">
              {posts.data.length > 0 ? (
                posts.data.map((post, index) => (
                  <BlogPostItem
                    key={post.uuid}
                    post={post}
                    tenantSlug={subdomain}
                    tenantDirection={tenantDirection}
                    isFirst={index === 0}
                  />
                ))
              ) : (
                <div className="px-2 py-3 sm:px-2 sm:py-3">
                  <Empty
                    title="We're just getting started. Sign up for updates!"
                    description={undefined}
                    icons={[Icons.annotation, Icons.email]}
                  />
                  <Separator />
                </div>
              )}
            </div>

            {/* Pagination */}
            {posts.data.length > 0 && (
              <Pagination
                currentPage={posts.current_page}
                totalPages={posts.last_page}
                perPage={posts.per_page}
                total={posts.total}
                from={posts.from}
                to={posts.to}
                tenantDirection={tenantDirection}
              />
            )}
          </div>
        </div>
      </WebsiteLayout>

      <WebsiteFooter tenant={tenant} />
    </div>
  );
}

// Generate metadata for SEO
export async function generateMetadata({ params }: PageProps) {
  const { subdomain } = await params;
  const tenant = await getTenantBySlug(subdomain);

  if (!tenant) {
    return {
      title: 'Not Found',
    };
  }

  return {
    title: tenant.title,
    description: tenant.description,
  };
}
