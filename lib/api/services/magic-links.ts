/**
 * Magic Links Service
 *
 * Service layer for magic link-related API calls
 */

import { apiGet, apiPost } from '../client';
import { API_CONFIG } from '../config';
import type {
  ApiSuccessResponse,
  ApiMagicLinkForm,
  ApiMagicLinkSubscriptionRequest,
  ApiSubscriptionResponse,
  ApiMagicLinkSubscriptionHeaders,
} from '@/types/api';

/**
 * Get magic link form configuration
 *
 * @param tenantSlug - Tenant slug
 * @param identifier - Magic link identifier
 * @returns Magic link form data or null if not found
 *
 * Endpoint: GET /api/v1/tenants/{slug}/magic-links/{identifier}
 * Cache: 30 minutes
 */
export async function getMagicLinkFormByIdentifier(
  tenantSlug: string,
  identifier: string
): Promise<ApiMagicLinkForm | null> {
  try {
    const response = await apiGet<ApiSuccessResponse<ApiMagicLinkForm>>(
      `/tenants/${tenantSlug}/magic-links/${identifier}`,
      {
        revalidate: API_CONFIG.revalidate.magicLink,
        timeout: API_CONFIG.timeout.read,
      }
    );

    return response.data;
  } catch (error) {
    // Return null for 404 errors (magic link not found)
    return null;
  }
}

/**
 * Subscribe via magic link
 *
 * @param tenantSlug - Tenant slug
 * @param identifier - Magic link identifier
 * @param email - Subscriber email
 * @returns Subscription response with headers
 *
 * Endpoint: POST /api/v1/tenants/{slug}/magic-links/{identifier}
 * Response Headers: X-Already-Subscribed, X-Has-Published-Posts
 */
export async function subscribeMagicLink(
  tenantSlug: string,
  identifier: string,
  email: string
): Promise<{
  data: ApiSubscriptionResponse;
  message?: string;
  headers: ApiMagicLinkSubscriptionHeaders;
}> {
  const requestBody: ApiMagicLinkSubscriptionRequest = { email };

  const response = await apiPost<
    ApiMagicLinkSubscriptionRequest,
    ApiSuccessResponse<ApiSubscriptionResponse> & {
      headers: ApiMagicLinkSubscriptionHeaders;
    }
  >(`/tenants/${tenantSlug}/magic-links/${identifier}`, requestBody, {
    timeout: API_CONFIG.timeout.write,
  });

  return {
    data: response.data,
    message: response.message,
    headers: response.headers,
  };
}
