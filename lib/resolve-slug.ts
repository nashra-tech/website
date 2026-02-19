/**
 * Resolve tenant slug from the Host header
 *
 * For nashra subdomains: returns the subdomain part (e.g., "cool-blog" from "cool-blog.nashra.website")
 * For custom domains: returns the full hostname (e.g., "myblog.com")
 * For the bare root domain: returns null
 */

import { rootDomain } from '@/lib/utils';

export function resolveSlugFromHost(host: string): string | null {
  if (!host) return null;

  // Remove port if present
  const hostname = host.split(':')[0];
  const rootDomainFormatted = rootDomain.split(':')[0];

  // Local development: extract subdomain from localhost
  if (hostname.includes('localhost') || hostname.includes('127.0.0.1')) {
    if (hostname.includes('.localhost')) {
      const sub = hostname.split('.')[0];
      return sub || null;
    }
    return null;
  }

  // Handle Vercel preview deployments (tenant---branch-name.vercel.app)
  if (hostname.includes('---') && hostname.endsWith('.vercel.app')) {
    const parts = hostname.split('---');
    return parts.length > 0 ? parts[0] : null;
  }

  // Check if this is a subdomain of our root domain
  const isSubdomain =
    hostname !== rootDomainFormatted &&
    hostname !== `www.${rootDomainFormatted}` &&
    hostname.endsWith(`.${rootDomainFormatted}`);

  if (isSubdomain) {
    const slug = hostname.replace(`.${rootDomainFormatted}`, '');
    return slug || null;
  }

  // Check if this is a custom domain (not root domain, not www)
  const isCustomDomain =
    hostname !== rootDomainFormatted &&
    hostname !== `www.${rootDomainFormatted}`;

  if (isCustomDomain) {
    return hostname;
  }

  return null;
}
