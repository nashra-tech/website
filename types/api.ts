/**
 * API Response Types
 *
 * Type definitions for API responses matching the Laravel backend structure
 */

// ============================================================================
// API Response Wrappers
// ============================================================================

export interface ApiMeta {
  version: string;
  timestamp: string;
}

export interface ApiSuccessResponse<T> {
  data: T;
  message?: string;
  meta: ApiMeta;
}

export interface ApiPaginatedResponse<T> {
  data: T[];
  pagination: {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    from: number;
    to: number;
  };
}

export interface ApiErrorResponse {
  error: {
    message: string;
    code: string;
    details?: Record<string, string[]>;
  };
  meta: ApiMeta;
}

// ============================================================================
// API Error Codes
// ============================================================================

export enum ApiErrorCode {
  TENANT_NOT_FOUND = 'TENANT_NOT_FOUND',
  POST_NOT_FOUND = 'POST_NOT_FOUND',
  MAGIC_LINK_INVALID = 'MAGIC_LINK_INVALID',
  EMAIL_ALREADY_SUBSCRIBED = 'EMAIL_ALREADY_SUBSCRIBED',
  SUBSCRIPTION_FAILED = 'SUBSCRIPTION_FAILED',
  MAGIC_LINK_SUBSCRIPTION_FAILED = 'MAGIC_LINK_SUBSCRIPTION_FAILED',
  VALIDATION_ERROR = 'VALIDATION_ERROR',
}

// ============================================================================
// Tenant API Types
// ============================================================================

export interface ApiTenant {
  slug: string;
  name: string;
  logo: string | null;
  website_language: string;
  website_direction: 'ltr' | 'rtl';
  is_rtl: boolean;
  has_active_subscription: boolean;
  newsletter: {
    name: string;
    requires_confirmation: boolean;
  };
}

// ============================================================================
// Post API Types
// ============================================================================

export interface ApiPostListItem {
  id: number;
  uuid: string;
  title: string;
  slug: string;
  subtitle: string | null;
  publish_date: string;
  created_at: string;
  main_image_url: string | null;
  main_image_thumb_url: string | null;
}

export interface ApiPostDetail extends ApiPostListItem {
  content: string; // HTML content
}

// ============================================================================
// Magic Link API Types
// ============================================================================

export interface ApiMagicLinkForm {
  id: string;
  identifier: string;
  title: string;
  subtitle: string;
  image_url: string | null;
}

// ============================================================================
// Subscription API Types
// ============================================================================

export interface ApiSubscriptionRequest {
  email: string;
  name?: string;
}

export interface ApiMagicLinkSubscriptionRequest {
  email: string;
}

export interface ApiSubscriptionResponse {
  uuid: string;
  email: string;
  first_name?: string;
  subscribed_at: string;
}

export interface ApiMagicLinkSubscriptionHeaders {
  alreadySubscribed: boolean;
  hasPublishedPosts: boolean;
}
