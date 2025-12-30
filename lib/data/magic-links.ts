/**
 * Magic Link Forms Data
 *
 * Static data for magic link subscription forms.
 * In production, replace with API calls to your backend.
 */

import { MagicLinkForm } from '@/types/magic-link';

export const MAGIC_LINK_FORMS: MagicLinkForm[] = [
  {
    id: '1',
    uuid: 'form-uuid-1',
    identifier: 'rV0Q1PSrZjdkHi5Im7iLynFd',
    title: 'Subscribe to our newsletter',
    subtitle: 'Get the latest updates and exclusive content delivered to your inbox.',
    image_url: null,
    tenant_slug: 'sloom',
    requires_confirmation: false,
  },
  {
    id: '2',
    uuid: 'form-uuid-2',
    identifier: 'abc123XYZ456',
    title: 'Join our design community',
    subtitle: 'Stay updated with the latest design trends and inspiration.',
    image_url: null,
    tenant_slug: 'design-matters',
    requires_confirmation: true,
  },
];

// Helper functions
export async function getMagicLinkFormByIdentifier(
  tenantSlug: string,
  identifier: string
): Promise<MagicLinkForm | null> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 100));

  const form = MAGIC_LINK_FORMS.find(
    (f) => f.identifier === identifier && f.tenant_slug === tenantSlug
  );

  return form || null;
}

export async function subscribeMagicLink(
  formIdentifier: string,
  email: string,
  tenantSlug: string
): Promise<{ success: boolean; already_subscribed?: boolean }> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  // In production, this would make an API call to save the subscription
  // For now, we'll just return success
  // Randomly return already_subscribed for demo purposes
  const alreadySubscribed = Math.random() > 0.7;

  return {
    success: true,
    already_subscribed: alreadySubscribed,
  };
}
