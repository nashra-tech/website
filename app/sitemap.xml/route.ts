import { NextRequest, NextResponse } from 'next/server';
import { resolveSlugFromHost } from '@/lib/resolve-slug';
import { API_CONFIG } from '@/lib/api/config';

const EMPTY_SITEMAP =
  '<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"></urlset>';

export async function GET(request: NextRequest) {
  const host = request.headers.get('host') || '';
  const slug = resolveSlugFromHost(host);

  if (!slug) {
    return new NextResponse(EMPTY_SITEMAP, {
      status: 200,
      headers: { 'Content-Type': 'application/xml' },
    });
  }

  try {
    const response = await fetch(
      `${API_CONFIG.baseUrl}/api/${API_CONFIG.version}/tenants/${slug}/sitemap.xml`,
      { cache: 'no-store' }
    );

    if (!response.ok) {
      return new NextResponse(EMPTY_SITEMAP, {
        status: 200,
        headers: {
          'Content-Type': 'application/xml',
        },
      });
    }

    const xml = await response.text();
    return new NextResponse(xml, {
      status: 200,
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400',
      },
    });
  } catch {
    return new NextResponse(EMPTY_SITEMAP, {
      status: 200,
      headers: { 'Content-Type': 'application/xml' },
    });
  }
}
