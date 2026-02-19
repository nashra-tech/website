/**
 * Canonical URL Utilities
 *
 * Generates canonical URLs for tenants and posts.
 * Uses the incoming request host to determine the correct base URL.
 *
 * Priority:
 * 1. Custom domain (e.g., https://myblog.com)
 * 2. Subdomain (e.g., https://cool-blog.nashra.ai)
 */

import { headers } from 'next/headers';
import { protocol, rootDomain } from '@/lib/utils';

/**
 * Get the canonical base URL for the current tenant request.
 * Reads the Host header from the incoming request.
 *
 * Returns e.g. "https://myblog.com" or "https://cool-blog.nashra.ai"
 */
export async function getCanonicalBaseUrl(): Promise<string> {
  const headersList = await headers();
  const host = headersList.get('host') || '';
  const hostname = host.split(':')[0];

  // In local dev, construct from subdomain + localhost
  if (hostname.includes('localhost') || hostname.includes('127.0.0.1')) {
    return `${protocol}://${host}`;
  }

  return `https://${hostname}`;
}

/**
 * Build a canonical URL for a specific path
 */
export async function getCanonicalUrl(path: string = ''): Promise<string> {
  const baseUrl = await getCanonicalBaseUrl();
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return path ? `${baseUrl}${cleanPath}` : baseUrl;
}

/**
 * Build a canonical URL for a tenant homepage
 */
export async function getTenantCanonicalUrl(): Promise<string> {
  return getCanonicalUrl();
}

/**
 * Build a canonical URL for a specific post
 */
export async function getPostCanonicalUrl(postSlug: string): Promise<string> {
  return getCanonicalUrl(`/${postSlug}`);
}
