/**
 * Tenant Service
 *
 * Service layer for tenant-related API calls
 */

import { apiGet } from '../client';
import { API_CONFIG } from '../config';
import type { ApiSuccessResponse, ApiTenant } from '@/types/api';

/**
 * Get tenant information by slug
 *
 * @param slug - Tenant slug
 * @returns Tenant data
 *
 * Endpoint: GET /api/v1/tenants/{slug}
 * Cache: 1 hour
 */
export async function getTenantBySlug(
  slug: string
): Promise<ApiTenant | null> {
  try {
    const response = await apiGet<ApiSuccessResponse<ApiTenant>>(
      `/tenants/${slug}`,
      {
        revalidate: API_CONFIG.revalidate.tenant,
        timeout: API_CONFIG.timeout.read,
      }
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    // Return null for 404 errors (tenant not found)
    // This allows pages to handle it gracefully with notFound()
    return null;
  }
}
