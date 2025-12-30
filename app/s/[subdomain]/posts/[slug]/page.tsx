/**
 * Post Detail Page
 *
 * Individual blog post page showing full content.
 * Recreates the functionality from Show.tsx with Next.js App Router.
 */

import { notFound } from 'next/navigation';
import { getTenantBySlug, getPostBySlug, getMorePosts } from '@/lib/data';
import { PostDetailClient } from './post-detail-client';

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
    <PostDetailClient
      tenant={tenant}
      post={post}
      morePosts={morePosts}
    />
  );
}

// Generate metadata for SEO
export async function generateMetadata({ params }: PageProps) {
  const { subdomain, slug } = await params;
  const post = await getPostBySlug(subdomain, slug);

  if (!post) {
    return {
      title: 'Not Found',
    };
  }

  return {
    title: post.title,
    description: post.subtitle || post.title,
  };
}
