/**
 * Post Detail Page
 *
 * Individual blog post page showing full content.
 * Recreates the functionality from Show.tsx with Next.js App Router.
 */

import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTenantBySlug, getPostBySlug, getMorePosts } from '@/lib/data';
import { getPostCanonicalUrl } from '@/lib/canonical-url';
import { PostDetailClient } from './post-detail-client';
import { ThemeColorScript } from '@/components/theme/theme-color-script';

export const dynamic = 'force-dynamic';

interface PageProps {
  params: Promise<{
    subdomain: string;
    slug: string;
  }>;
}

export default async function PostDetailPage({ params }: PageProps) {
  const { subdomain, slug } = await params;

  // Fetch tenant data
  const tenant = await getTenantBySlug(subdomain);

  if (!tenant) {
    notFound();
  }

  // Fetch post data
  const post = await getPostBySlug(subdomain, slug);

  if (!post) {
    notFound();
  }

  // Fetch related posts
  const morePosts = await getMorePosts(subdomain, post.uuid, 3);

  return (
    <>
      <ThemeColorScript brandColor={tenant.brandColor} />
      <PostDetailClient
        tenant={tenant}
        post={post}
        morePosts={morePosts}
      />
    </>
  );
}

// Generate metadata for SEO
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { subdomain, slug } = await params;

  const [tenant, post] = await Promise.all([
    getTenantBySlug(subdomain),
    getPostBySlug(subdomain, slug),
  ]);

  if (!post) {
    return {
      title: 'Not Found',
    };
  }

  const canonicalUrl = await getPostCanonicalUrl(post.slug);
  const title = `${post.title} - ${tenant?.name || ''}`;
  const description = post.subtitle || post.title;
  const ogDescription = 'Wrote in Nashra, simple newsletter + blogging platform';
  const ogImage = post.main_image_url || tenant?.logo || undefined;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: post.title,
      description: ogDescription,
      type: 'article',
      url: canonicalUrl,
      siteName: tenant?.name || '',
      locale: tenant?.website_language || 'en',
      publishedTime: post.publish_date,
      ...(ogImage && {
        images: [{ url: ogImage, width: 1200, height: 630 }],
      }),
    },
    twitter: {
      card: ogImage ? 'summary_large_image' : 'summary',
      title: post.title,
      description: ogDescription,
      ...(ogImage && {
        images: [ogImage],
      }),
    },
  };
}
