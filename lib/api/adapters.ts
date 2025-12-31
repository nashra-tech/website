/**
 * API Adapters
 *
 * Converts API response types to internal application types
 * This provides a clean separation between API contract and internal data structures
 */

import type { ApiTenant, ApiPostListItem, ApiPostDetail, ApiMagicLinkForm } from '@/types/api';
import type { Tenant, Post, PaginatedPosts, MagicLinkForm } from '@/types';

/**
 * Convert API Tenant to internal Tenant type
 *
 * The API provides minimal tenant data, so we'll provide sensible defaults
 * for fields that aren't included in the API response
 */
export function adaptTenant(apiTenant: ApiTenant): Tenant {
  return {
    uuid: '', // Not provided by API, would need separate endpoint
    slug: apiTenant.slug,
    name: apiTenant.name,
    title: apiTenant.name, // Use name as title
    subtitle: apiTenant.description, // Not provided by API
    logo: apiTenant.logo || undefined,
    footer_data: {
      physical_address: apiTenant.physical_address || undefined,
      social_links: apiTenant.social_links || [],
      footer_text: apiTenant.footer_text || undefined,
    },
    website_direction: apiTenant.website_direction,
    has_paid_subscription: apiTenant.has_active_subscription,
  };
}

/**
 * Convert API Post List Item to internal Post type
 */
export function adaptPostListItem(apiPost: ApiPostListItem): Post {
  return {
    uuid: apiPost.uuid,
    slug: apiPost.slug,
    tenant_slug: '', // Would need to be passed from context
    title: apiPost.title,
    subtitle: apiPost.subtitle || undefined,
    website_content: '', // Not included in list items
    main_image_url: apiPost.main_image_url || undefined,
    main_image_thumb_url: apiPost.main_image_thumb_url || undefined,
    publish_date: apiPost.publish_date,
    created_at: apiPost.created_at,
    updated_at: apiPost.created_at, // API doesn't provide updated_at in list
    published: true, // API only returns published posts
  };
}

/**
 * Convert API Post Detail to internal Post type
 */
export function adaptPostDetail(apiPost: ApiPostDetail, tenantSlug: string): Post {
  return {
    uuid: apiPost.uuid,
    slug: apiPost.slug,
    tenant_slug: tenantSlug,
    title: apiPost.title,
    subtitle: apiPost.subtitle || undefined,
    website_content: apiPost.content,
    main_image_url: apiPost.main_image_url || undefined,
    main_image_thumb_url: apiPost.main_image_thumb_url || undefined,
    publish_date: apiPost.publish_date,
    created_at: apiPost.created_at,
    updated_at: apiPost.created_at, // API doesn't provide updated_at
    published: true,
  };
}

/**
 * Convert API Magic Link Form to internal MagicLinkForm type
 */
export function adaptMagicLinkForm(
  apiForm: ApiMagicLinkForm,
  tenantSlug: string,
  requiresConfirmation: boolean = false
): MagicLinkForm {
  return {
    id: apiForm.id,
    uuid: apiForm.id, // API doesn't provide separate UUID
    identifier: apiForm.identifier,
    title: apiForm.title,
    subtitle: apiForm.subtitle,
    image_url: apiForm.image_url,
    tenant_slug: tenantSlug,
    requires_confirmation: requiresConfirmation, // Not provided by API, default to false
  };
}

/**
 * Convert API paginated posts to internal PaginatedPosts type
 */
export function adaptPaginatedPosts(
  apiResponse: { data: ApiPostListItem[]; pagination: any },
  tenantSlug: string
): PaginatedPosts {
  return {
    data: apiResponse.data.map((post) => ({
      ...adaptPostListItem(post),
      tenant_slug: tenantSlug,
    })),
    current_page: apiResponse.pagination.current_page,
    last_page: apiResponse.pagination.last_page,
    per_page: apiResponse.pagination.per_page,
    total: apiResponse.pagination.total,
    from: apiResponse.pagination.from,
    to: apiResponse.pagination.to,
  };
}
