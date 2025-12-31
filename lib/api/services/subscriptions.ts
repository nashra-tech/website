/**
 * Subscriptions Service
 *
 * Service layer for newsletter subscription API calls
 */

import { apiPost } from '../client';
import { API_CONFIG } from '../config';
import type {
  ApiSuccessResponse,
  ApiSubscriptionRequest,
  ApiSubscriptionResponse,
} from '@/types/api';

/**
 * Subscribe to a tenant's newsletter
 *
 * @param tenantSlug - Tenant slug
 * @param email - Subscriber email
 * @param name - Subscriber name (optional)
 * @returns Subscription response
 *
 * Endpoint: POST /api/v1/tenants/{slug}/subscribe
 */
export async function subscribeToNewsletter(
  tenantSlug: string,
  email: string,
  name?: string
): Promise<ApiSubscriptionResponse> {
  const requestBody: ApiSubscriptionRequest = { email, name };

  const response = await apiPost<
    ApiSubscriptionRequest,
    ApiSuccessResponse<ApiSubscriptionResponse>
  >(`/tenants/${tenantSlug}/subscribe`, requestBody, {
    timeout: API_CONFIG.timeout.write,
  });

  return response.data;
}
