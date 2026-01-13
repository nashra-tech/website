/**
 * Tenant Types
 *
 * Core type definitions for multi-tenant blog architecture.
 * These types define the structure for tenant data that will be used
 * throughout the application.
 */

export interface SocialLink {
  name: string;
  url: string;
}

export interface Tenant {
  // Core tenant identification
  uuid: string;
  slug: string; // Used for routing (subdomain or path-based)

  // Display information
  name: string;
  title: string;
  subtitle: string | null;
  logo?: string;

  // Footer data
  footer_data: {
    physical_address?: string;
    social_links: SocialLink[];
    footer_text?: string;
  };

  // Configuration
  website_direction?: 'ltr' | 'rtl';
  website_language?: string; // ISO language code (e.g., 'en', 'ar', 'es')

  // Subscription settings
  has_paid_subscription?: boolean;
  show_branding?: boolean;
  brandColor?:string;
}

export interface TenantMeta {
  total_posts: number;
  created_at: string;
  updated_at: string;
}
