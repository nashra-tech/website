/**
 * Magic Link Forms Data
 *
 * Now uses API calls to the backend.
 * Uses React cache() to deduplicate requests across generateMetadata and page components.
 */

import { cache } from 'react';
import { MagicLinkForm } from '@/types/magic-link';
import {
  getMagicLinkFormByIdentifier as apiGetMagicLinkForm,
  subscribeMagicLink as apiSubscribeMagicLink,
} from '@/lib/api';
import { adaptMagicLinkForm } from '@/lib/api/adapters';
import { ApiError } from '@/lib/api/errors';

/**
 * Get magic link form by identifier
 *
 * Now uses API: GET /api/v1/tenants/{slug}/magic-links/{identifier}
 * Wrapped with React cache() to deduplicate requests in the same render
 */
export const getMagicLinkFormByIdentifier = cache(async (
  tenantSlug: string,
  identifier: string
): Promise<MagicLinkForm | null> => {
  const apiForm = await apiGetMagicLinkForm(tenantSlug, identifier);

  if (!apiForm) {
    return null;
  }

  // Note: API doesn't provide requires_confirmation, defaulting to false
  return adaptMagicLinkForm(apiForm, tenantSlug, false);
});

/**
 * Subscribe via magic link
 *
 * Now uses API: POST /api/v1/tenants/{slug}/magic-links/{identifier}
 */
export async function subscribeMagicLink(
  formIdentifier: string,
  email: string,
  tenantSlug: string
): Promise<{
  success: boolean;
  already_subscribed?: boolean;
  has_published_posts?: boolean;
  error?: string;
}> {
  try {
    const response = await apiSubscribeMagicLink(
      tenantSlug,
      formIdentifier,
      email
    );

    return {
      success: true,
      already_subscribed: response.headers.alreadySubscribed,
      has_published_posts: response.headers.hasPublishedPosts,
    };
  } catch (error) {
    if (error instanceof ApiError) {
      return {
        success: false,
        error: error.getUserMessage(),
      };
    }

    return {
      success: false,
      error: 'An unexpected error occurred. Please try again.',
    };
  }
}
