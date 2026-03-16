import { type NextRequest, NextResponse } from 'next/server';
import { getTenantBySlug, getPostBySlug } from '@/lib/data';
import { postToMarkdown } from '@/lib/markdown';

export const dynamic = 'force-dynamic';

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ subdomain: string; slug: string }> }
) {
  const { subdomain, slug } = await params;
  const [tenant, post] = await Promise.all([
    getTenantBySlug(subdomain),
    getPostBySlug(subdomain, slug),
  ]);

  if (!tenant || !post) {
    return new NextResponse('Not found', { status: 404 });
  }

  const markdown = postToMarkdown(post, tenant);

  return new NextResponse(markdown, {
    status: 200,
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
    },
  });
}
