/**
 * Data Access Layer
 *
 * This module provides clean, reusable functions for accessing tenant and post data.
 * Migrated to use API calls instead of static data.
 *
 * All consuming code remains unchanged - only the implementation has changed!
 */

import { Tenant, Post, PaginatedPosts } from '@/types';
import {
  getTenantBySlug as apiGetTenantBySlug,
  getPosts as apiGetPosts,
  getPostBySlug as apiGetPostBySlug,
  getMorePosts as apiGetMorePosts,
} from '@/lib/api';
import {
  adaptTenant,
  adaptPostDetail,
  adaptPaginatedPosts,
} from '@/lib/api/adapters';

// Magic Link exports - updated to use API
export {
  getMagicLinkFormByIdentifier,
  subscribeMagicLink,
} from './magic-links';

// ============================================================================
// TENANT DATA ACCESS
// ============================================================================

/**
 * Get tenant by slug
 *
 * Now uses API: GET /api/v1/tenants/{slug}
 */
export async function getTenantBySlug(slug: string): Promise<Tenant | null> {
  const apiTenant = await apiGetTenantBySlug(slug);

  if (!apiTenant) {
    return null;
  }

  return adaptTenant(apiTenant);
}

// ============================================================================
// POST DATA ACCESS
// ============================================================================

/**
 * Get all posts for a tenant (with optional pagination)
 *
 * Now uses API: GET /api/v1/tenants/{slug}/posts
 */
export async function getPosts(
  tenantSlug: string,
  options: {
    page?: number;
    perPage?: number;
    published?: boolean; // Note: API only returns published posts
  } = {}
): Promise<PaginatedPosts> {
  const { page = 1, perPage = 10 } = options;

  const apiResponse = await apiGetPosts(tenantSlug, { page, perPage });

  return adaptPaginatedPosts(apiResponse, tenantSlug);
}

/**
 * Get a single post by slug
 *
 * Now uses API: GET /api/v1/tenants/{slug}/posts/{post}
 */
export async function getPostBySlug(
  tenantSlug: string,
  postSlug: string
): Promise<Post | null> {
  const apiPost = await apiGetPostBySlug(tenantSlug, postSlug);

  if (!apiPost) {
    return null;
  }

  return adaptPostDetail(apiPost, tenantSlug);
}

/**
 * Get more posts for "Related Articles" section
 * Excludes the current post
 *
 * Now uses API: GET /api/v1/tenants/{slug}/posts (with client-side filtering)
 */
export async function getMorePosts(
  tenantSlug: string,
  currentPostUuid: string,
  limit: number = 3
): Promise<Post[]> {
  const apiPosts = await apiGetMorePosts(tenantSlug, currentPostUuid, limit);

  return apiPosts.map((post) => ({
    uuid: post.uuid,
    slug: post.slug,
    tenant_slug: tenantSlug,
    title: post.title,
    subtitle: post.subtitle || undefined,
    website_content: '',
    main_image_url: post.main_image_url || undefined,
    main_image_thumb_url: post.main_image_thumb_url || undefined,
    publish_date: post.publish_date,
    created_at: post.created_at,
    updated_at: post.created_at,
    published: true,
  }));
}
