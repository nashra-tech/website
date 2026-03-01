import { NodeHtmlMarkdown } from 'node-html-markdown';
import type { Post, Tenant } from '@/types';

const nhm = new NodeHtmlMarkdown();

export function htmlToMarkdown(html: string): string {
  return nhm.translate(html);
}

export function postToMarkdown(post: Post, tenant: Tenant): string {
  const lines: string[] = [];

  lines.push(`# ${post.title}`);
  lines.push('');
  if (post.subtitle) {
    lines.push(`> ${post.subtitle}`);
    lines.push('');
  }
  lines.push(`**Author:** ${tenant.name}`);
  if (post.category?.name) {
    lines.push(`**Category:** ${post.category.name}`);
  }
  lines.push(`**Published:** ${post.publish_date}`);
  lines.push('');
  lines.push('---');
  lines.push('');
  lines.push(htmlToMarkdown(post.website_content));

  return lines.join('\n');
}

export function postListToMarkdown(
  posts: Post[],
  tenant: Tenant,
  baseUrl: string
): string {
  const lines: string[] = [];

  lines.push(`# ${tenant.name}`);
  lines.push('');
  if (tenant.subtitle) {
    lines.push(tenant.subtitle);
    lines.push('');
  }
  lines.push('---');
  lines.push('');
  lines.push('## Posts');
  lines.push('');

  for (const post of posts) {
    const date = post.publish_date;
    const category = post.category?.name ? ` [${post.category.name}]` : '';
    lines.push(`- [${post.title}](${baseUrl}/${post.slug}) — ${date}${category}`);
  }

  if (posts.length === 0) {
    lines.push('No posts published yet.');
  }

  return lines.join('\n');
}
