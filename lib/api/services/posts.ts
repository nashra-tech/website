/**
 * Posts Service
 *
 * Service layer for post-related API calls
 */

import { apiGet, buildQueryString } from '../client';
import { API_CONFIG } from '../config';
import type {
  ApiSuccessResponse,
  ApiPaginatedResponse,
  ApiPostListItem,
  ApiPostDetail,
} from '@/types/api';

/**
 * Get paginated posts for a tenant
 *
 * @param tenantSlug - Tenant slug
 * @param page - Page number (default: 1)
 * @param perPage - Items per page (default: 10, max: 50)
 * @returns Paginated posts
 *
 * Endpoint: GET /api/v1/tenants/{slug}/posts
 * Cache: 10 minutes (page 1), 15 minutes (other pages)
 */
export async function getPosts(
  tenantSlug: string,
  options: {
    page?: number;
    perPage?: number;
  } = {}
): Promise<ApiPaginatedResponse<ApiPostListItem>> {
  const { page = 1, perPage = 10 } = options;

  const queryString = buildQueryString({
    page,
    per_page: perPage,
  });

  // Use different cache time for page 1 vs other pages
  const revalidate =
    page === 1
      ? API_CONFIG.revalidate.postsPage1
      : API_CONFIG.revalidate.postsOther;

  const response = await apiGet<ApiPaginatedResponse<ApiPostListItem>>(
    `/tenants/${tenantSlug}/posts${queryString}`,
    {
      revalidate,
      timeout: API_CONFIG.timeout.read,
    }
  );

  return response;
}

/**
 * Get a single post by slug
 *
 * @param tenantSlug - Tenant slug
 * @param postSlug - Post slug
 * @returns Post detail or null if not found
 *
 * Endpoint: GET /api/v1/tenants/{slug}/posts/{post}
 * Cache: 30 minutes
 */
export async function getPostBySlug(
  tenantSlug: string,
  postSlug: string
): Promise<ApiPostDetail | null> {
  try {
    const response = await apiGet<ApiSuccessResponse<ApiPostDetail>>(
      `/tenants/${tenantSlug}/posts/${postSlug}`,
      {
        revalidate: API_CONFIG.revalidate.postDetail,
        timeout: API_CONFIG.timeout.read,
      }
    );

    return response.data;
  } catch (error) {
    // Return null for 404 errors (post not found)
    return null;
  }
}

/**
 * Get more posts for "Related Articles" section
 * This is a client-side helper that filters out the current post
 * from the posts list
 *
 * @param tenantSlug - Tenant slug
 * @param currentPostUuid - UUID of current post to exclude
 * @param limit - Number of posts to return (default: 3)
 * @returns Array of posts
 */
export async function getMorePosts(
  tenantSlug: string,
  currentPostUuid: string,
  limit: number = 3
): Promise<ApiPostListItem[]> {
  try {
    // Fetch first page of posts
    const response = await getPosts(tenantSlug, {
      page: 1,
      perPage: limit + 5, // Fetch extra to ensure we have enough after filtering
    });

    // Filter out current post and limit results
    const morePosts = response.data
      .filter((post) => post.uuid !== currentPostUuid)
      .slice(0, limit);

    return morePosts;
  } catch (error) {
    // Return empty array on error
    return [];
  }
}
