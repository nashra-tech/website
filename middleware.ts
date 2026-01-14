import { type NextRequest, NextResponse } from 'next/server';
import { rootDomain } from '@/lib/utils';

/**
 * Extract tenant identifier from request
 *
 * For nashra.website subdomains: returns subdomain only (e.g., "mahmoud" from mahmoud.nashra.website)
 * For custom domains: returns full hostname (e.g., "mahmoud.msgpilot.com" or "msgpilot.com")
 */
function extractSubdomain(request: NextRequest): string | null {
  const url = request.url;
  const host = request.headers.get('host') || '';
  const hostname = host.split(':')[0];

  // Local development environment
  if (url.includes('localhost') || url.includes('127.0.0.1')) {
    // Try to extract subdomain from the full URL
    const fullUrlMatch = url.match(/http:\/\/([^.]+)\.localhost/);
    if (fullUrlMatch && fullUrlMatch[1]) {
      return fullUrlMatch[1];
    }

    // Fallback to host header approach
    if (hostname.includes('.localhost')) {
      return hostname.split('.')[0];
    }

    return null;
  }

  // Production environment
  const rootDomainFormatted = rootDomain.split(':')[0];

  // Handle preview deployment URLs (tenant---branch-name.vercel.app)
  if (hostname.includes('---') && hostname.endsWith('.vercel.app')) {
    const parts = hostname.split('---');
    return parts.length > 0 ? parts[0] : null;
  }

  // Check if this is a nashra.website subdomain
  const isNashraSubdomain =
    hostname !== rootDomainFormatted &&
    hostname !== `www.${rootDomainFormatted}` &&
    hostname.endsWith(`.${rootDomainFormatted}`);

  if (isNashraSubdomain) {
    // For nashra.website subdomains, return subdomain only
    return hostname.replace(`.${rootDomainFormatted}`, '');
  }

  // Check if this is a custom domain (not the root domain and not www)
  const isCustomDomain =
    hostname !== rootDomainFormatted &&
    hostname !== `www.${rootDomainFormatted}`;

  if (isCustomDomain) {
    // For custom domains, return the full hostname
    return hostname;
  }

  return null;
}

export async function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  const subdomain = extractSubdomain(request);

  if (subdomain) {
    // Block access to admin page from subdomains
    if (pathname.startsWith('/admin')) {
      return NextResponse.redirect(new URL('/', request.url));
    }

    // For the root path on a subdomain, rewrite to the subdomain page
    if (pathname === '/') {
      return NextResponse.rewrite(new URL(`/s/${subdomain}${search}`, request.url));
    }

    // For post detail pages on subdomain
    if (pathname.startsWith('/')) {
      const slug = pathname.replace('/', '');
      return NextResponse.rewrite(new URL(`/s/${subdomain}/${slug}${search}`, request.url));
    }

    // For any other paths on subdomain, rewrite to subdomain route
    // This handles pagination and other query params
    return NextResponse.rewrite(new URL(`/s/${subdomain}${pathname}${search}`, request.url));
  }

  // On the root domain, allow normal access
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all paths except for:
     * 1. /api routes
     * 2. /_next (Next.js internals)
     * 3. /images (static assets)
     * 4. all root files inside /public (e.g. /favicon.ico)
     */
    '/((?!api|_next|images|[\\w-]+\\.\\w+).*)'
  ]
};
