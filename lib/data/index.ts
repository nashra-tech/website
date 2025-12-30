/**
 * Data Access Layer
 *
 * This module provides clean, reusable functions for accessing tenant and post data.
 * Currently uses static data, but designed for easy migration to API calls.
 *
 * Migration Example:
 * Before:
 *   const tenant = TENANTS_DB.find(t => t.slug === slug);
 *
 * After:
 *   const response = await fetch(`/api/tenants/${slug}`);
 *   const tenant = await response.json();
 *
 * All consuming code remains unchanged!
 */

import { Tenant, Post, PaginatedPosts } from '@/types';
import { TENANTS_DB } from './tenants';
import { POSTS_DB } from './posts';

// ============================================================================
// TENANT DATA ACCESS
// ============================================================================

/**
 * Get all tenants
 *
 * Migration path: Replace with API call
 * Example: await fetch('/api/tenants')
 */
export async function getTenants(): Promise<Tenant[]> {
  // Simulate async behavior (remove in production)
  await new Promise((resolve) => setTimeout(resolve, 0));

  return TENANTS_DB;
}

/**
 * Get tenant by slug
 *
 * Migration path: Replace with API call
 * Example: await fetch(`/api/tenants/${slug}`)
 */
export async function getTenantBySlug(slug: string): Promise<Tenant | null> {
  // Simulate async behavior (remove in production)
  await new Promise((resolve) => setTimeout(resolve, 0));

  const tenant = TENANTS_DB.find((t) => t.slug === slug);
  return tenant || null;
}

/**
 * Get tenant by UUID
 *
 * Migration path: Replace with API call
 * Example: await fetch(`/api/tenants/uuid/${uuid}`)
 */
export async function getTenantByUuid(uuid: string): Promise<Tenant | null> {
  // Simulate async behavior (remove in production)
  await new Promise((resolve) => setTimeout(resolve, 0));

  const tenant = TENANTS_DB.find((t) => t.uuid === uuid);
  return tenant || null;
}

// ============================================================================
// POST DATA ACCESS
// ============================================================================

/**
 * Get all posts for a tenant (with optional pagination)
 *
 * Migration path: Replace with API call
 * Example: await fetch(`/api/tenants/${tenantSlug}/posts?page=${page}&per_page=${perPage}`)
 */
export async function getPosts(
  tenantSlug: string,
  options: {
    page?: number;
    perPage?: number;
    published?: boolean;
  } = {}
): Promise<PaginatedPosts> {
  const { page = 1, perPage = 10, published = true } = options;

  // Simulate async behavior (remove in production)
  await new Promise((resolve) => setTimeout(resolve, 0));

  // Filter posts by tenant and published status
  let filteredPosts = POSTS_DB.filter((post) => post.tenant_slug === tenantSlug);

  if (published) {
    filteredPosts = filteredPosts.filter((post) => post.published);
  }

  // Sort by publish date (newest first)
  filteredPosts.sort((a, b) => {
    return new Date(b.publish_date).getTime() - new Date(a.publish_date).getTime();
  });

  // Calculate pagination
  const total = filteredPosts.length;
  const lastPage = Math.ceil(total / perPage);
  const from = (page - 1) * perPage + 1;
  const to = Math.min(page * perPage, total);

  // Slice for current page
  const data = filteredPosts.slice((page - 1) * perPage, page * perPage);

  return {
    data,
    current_page: page,
    last_page: lastPage,
    per_page: perPage,
    total,
    from: total > 0 ? from : 0,
    to: total > 0 ? to : 0,
  };
}

/**
 * Get a single post by slug
 *
 * Migration path: Replace with API call
 * Example: await fetch(`/api/tenants/${tenantSlug}/posts/${postSlug}`)
 */
export async function getPostBySlug(
  tenantSlug: string,
  postSlug: string
): Promise<Post | null> {
  // Simulate async behavior (remove in production)
  await new Promise((resolve) => setTimeout(resolve, 0));

  const post = POSTS_DB.find(
    (p) => p.tenant_slug === tenantSlug && p.slug === postSlug && p.published
  );

  return post || null;
}

/**
 * Get more posts for "Related Articles" section
 * Excludes the current post
 *
 * Migration path: Replace with API call
 * Example: await fetch(`/api/tenants/${tenantSlug}/posts?exclude=${currentPostUuid}&limit=${limit}`)
 */
export async function getMorePosts(
  tenantSlug: string,
  currentPostUuid: string,
  limit: number = 3
): Promise<Post[]> {
  // Simulate async behavior (remove in production)
  await new Promise((resolve) => setTimeout(resolve, 0));

  const posts = POSTS_DB.filter(
    (p) => p.tenant_slug === tenantSlug && p.uuid !== currentPostUuid && p.published
  )
    .sort((a, b) => new Date(b.publish_date).getTime() - new Date(a.publish_date).getTime())
    .slice(0, limit);

  return posts;
}

/**
 * Search posts by title or subtitle
 *
 * Migration path: Replace with API call
 * Example: await fetch(`/api/tenants/${tenantSlug}/posts/search?q=${query}`)
 */
export async function searchPosts(
  tenantSlug: string,
  query: string
): Promise<Post[]> {
  // Simulate async behavior (remove in production)
  await new Promise((resolve) => setTimeout(resolve, 0));

  const lowerQuery = query.toLowerCase();
  const posts = POSTS_DB.filter(
    (p) =>
      p.tenant_slug === tenantSlug &&
      p.published &&
      (p.title.toLowerCase().includes(lowerQuery) ||
        p.subtitle?.toLowerCase().includes(lowerQuery))
  ).sort((a, b) => new Date(b.publish_date).getTime() - new Date(a.publish_date).getTime());

  return posts;
}

/**
 * Get post count for a tenant
 *
 * Migration path: Replace with API call
 * Example: await fetch(`/api/tenants/${tenantSlug}/posts/count`)
 */
export async function getPostCount(tenantSlug: string): Promise<number> {
  // Simulate async behavior (remove in production)
  await new Promise((resolve) => setTimeout(resolve, 0));

  return POSTS_DB.filter((p) => p.tenant_slug === tenantSlug && p.published).length;
}
