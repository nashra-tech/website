import { NextRequest, NextResponse } from 'next/server';
import { getTenantBySlug, getPosts } from '@/lib/data';
import { postListToMarkdown } from '@/lib/markdown';
import { protocol, rootDomain } from '@/lib/utils';

export const dynamic = 'force-dynamic';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ subdomain: string }> }
) {
  const { subdomain } = await params;
  const tenant = await getTenantBySlug(subdomain);

  if (!tenant) {
    return new NextResponse('Not found', { status: 404 });
  }

  const { data: posts } = await getPosts(subdomain, { page: 1, perPage: 50 });

  const host = request.headers.get('host') || `${subdomain}.${rootDomain}`;
  const baseUrl = `${protocol}://${host}`;

  const markdown = postListToMarkdown(posts, tenant, baseUrl);

  return new NextResponse(markdown, {
    status: 200,
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
    },
  });
}
