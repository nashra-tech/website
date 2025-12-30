/**
 * Magic Link Form Types
 *
 * Type definitions for magic link subscription forms.
 */

export interface MagicLinkForm {
  id: string;
  uuid: string;
  identifier: string;
  title: string;
  subtitle: string;
  image_url: string | null;
  tenant_slug: string;
  requires_confirmation: boolean;
}

export interface MagicLinkSubscription {
  email: string;
  form_id: string;
  tenant_uuid: string;
  subscribed_at: string;
}
