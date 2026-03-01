import { NextRequest, NextResponse } from 'next/server';
import { resolveSlugFromHost } from '@/lib/resolve-slug';
import { getTenantBySlug, getPosts } from '@/lib/data';
import { protocol, rootDomain } from '@/lib/utils';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  const host = request.headers.get('host') || '';
  const slug = resolveSlugFromHost(host);

  if (!slug) {
    return new NextResponse('# Nashra\n\nNo tenant found.', {
      status: 200,
      headers: { 'Content-Type': 'text/markdown; charset=utf-8' },
    });
  }

  const tenant = await getTenantBySlug(slug);

  if (!tenant) {
    return new NextResponse('Not found', { status: 404 });
  }

  const { data: posts } = await getPosts(slug, { page: 1, perPage: 50 });

  const baseUrl = `${protocol}://${host}`;

  const lines: string[] = [];
  lines.push(`# ${tenant.name}`);
  lines.push('');
  if (tenant.subtitle) {
    lines.push(`> ${tenant.subtitle}`);
    lines.push('');
  }
  lines.push('## Posts');
  lines.push('');
  for (const post of posts) {
    lines.push(`- [${post.title}](${baseUrl}/${post.slug}): ${post.subtitle || ''}`);
  }

  return new NextResponse(lines.join('\n'), {
    status: 200,
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
    },
  });
}
