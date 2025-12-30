/**
 * Post Types
 *
 * Core type definitions for blog posts.
 * These types define the structure for post data that will be used
 * throughout the application.
 */

export interface Post {
  // Identification
  uuid: string;
  slug: string;
  tenant_slug: string; // Reference to tenant

  // Content
  title: string;
  subtitle?: string;
  website_content: string; // HTML content

  // Media
  main_image_url?: string;
  main_image_thumb_url?: string;

  // Metadata
  publish_date: string;
  created_at: string;
  updated_at: string;

  // Status
  published: boolean;
}

export interface PaginatedPosts {
  data: Post[];
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
  from: number;
  to: number;
}
