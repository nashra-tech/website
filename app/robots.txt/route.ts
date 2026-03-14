import { NextRequest, NextResponse } from 'next/server';
import { resolveSlugFromHost } from '@/lib/resolve-slug';
import { API_CONFIG } from '@/lib/api/config';

const DISALLOW_ALL = 'User-agent: *\nDisallow: /';

export async function GET(request: NextRequest) {
  const host = request.headers.get('host') || '';
  const slug = resolveSlugFromHost(host);

  if (!slug) {
    return new NextResponse(DISALLOW_ALL, {
      status: 200,
      headers: { 'Content-Type': 'text/plain' },
    });
  }

  try {
    const response = await fetch(
      `${API_CONFIG.baseUrl}/api/${API_CONFIG.version}/tenants/${slug}/robots.txt`,
      { cache: 'no-store' }
    );

    if (!response.ok) {
      return new NextResponse(DISALLOW_ALL, {
        status: 200,
        headers: { 'Content-Type': 'text/plain' },
      });
    }

    const text = await response.text();
    return new NextResponse(text, {
      status: 200,
      headers: {
        'Content-Type': 'text/plain',
        'Cache-Control': 'public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400',
      },
    });
  } catch {
    return new NextResponse(DISALLOW_ALL, {
      status: 200,
      headers: { 'Content-Type': 'text/plain' },
    });
  }
}
