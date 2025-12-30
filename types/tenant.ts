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
  subtitle: string;
  description: string;
  logo?: string;

  // Footer data
  footer_data: {
    physical_address?: string;
    social_links: SocialLink[];
    footer_text?: string;
  };

  // Configuration
  website_direction?: 'ltr' | 'rtl';

  // Subscription settings
  has_paid_subscription?: boolean;
}

export interface TenantMeta {
  total_posts: number;
  created_at: string;
  updated_at: string;
}
