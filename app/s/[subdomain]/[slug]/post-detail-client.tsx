'use client';

import { useEffect, useMemo, useRef } from 'react';
import { Tenant, Post } from '@/types';
import { WebsiteLayout } from '@/components/blog/website-layout';
import { WebsiteFooter } from '@/components/blog/website-footer';
import { Small } from '@/components/system-ui/typography';
import { usePageTracking } from '@/hooks/use-page-tracking';
import { useTranslations } from '@/lib/i18n/use-translations';
import { BlogPostItemImage } from '@/components/blog/blog-post-item-image';
import { getRadiusStyleTag } from '@/components/blog/radius-vars';

// Hoisted constants (avoid re-creation on every render / effect run)
const WHITESPACE_RE = /[\u200B\u200C\u200D\uFEFF\u00A0\s\n\r\t]/g;
const IMG_TAG_RE = /<img(?=\s)/g;

const MEANINGFUL_TAGS = new Set([
  'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'figure', 'table',
  'ul', 'ol', 'pre', 'blockquote', 'hr',
]);

const MEDIA_SELECTOR =
  'img, iframe, video, figure, svg, canvas, a[href], table, h1, h2, h3, h4, h5, h6';


interface PostDetailClientProps {
  tenant: Tenant;
  post: Post;
  morePosts: Post[];
}

export function PostDetailClient({ tenant, post, morePosts }: PostDetailClientProps) {
  const tenantLanguage = tenant.website_language || 'en';
  const tenantDirection = tenant.website_direction || 'ltr';
  const { t } = useTranslations(tenantLanguage);
  const contentRef = useRef<HTMLDivElement>(null);
  const maxWidthClass = (tenant.homepage_layout || 'list') === 'cards' ? 'max-w-[640px]' : 'max-w-[560px]';

  const trackingProps = useMemo(() => ({
    page_type: 'blog_post' as const,
    tenant_uuid: tenant.uuid,
    post_uuid: post.uuid,
  }), [tenant.uuid, post.uuid]);

  usePageTracking(trackingProps);

  // ── Pre-process HTML (SSR-safe, no DOM dependency) ──────────────────
  const processedContent = useMemo(() => {
    if (!post.website_content) return '';
    return post.website_content.replace(IMG_TAG_RE, '<img loading="lazy" decoding="async"');
  }, [post.website_content]);

  // ── Single post-render DOM pass ─────────────────────────────────────
  useEffect(() => {
    const container = contentRef.current;
    if (!container) return;

    // 1. Strip Plate's inline text colours from body text ────────────
    //    Plate serialises every span with `color: rgb(0,0,0)` (editor
    //    default). Stripping lets CSS set theme colours via normal
    //    cascade — no !important needed anywhere.
    //    Button text colour is handled purely via CSS (inherit from <a>).
    //    Highlighted text (has background-color) is preserved for
    //    dark-mode CSS inversion.
    for (const el of container.querySelectorAll<HTMLElement>('[style]')) {
      if (!el.style.color) continue;
      if (el.style.backgroundColor) continue;
      el.style.removeProperty('color');
    }

    // 2. Collapse empty blocks ───────────────────────────────────────
    const root = container.querySelector('[data-slate-editor]') || container;
    for (const child of root.children) {
      const el = child as HTMLElement;
      if (MEANINGFUL_TAGS.has(el.tagName.toLowerCase())) continue;
      const text = el.textContent?.replace(WHITESPACE_RE, '') || '';
      if (text.length === 0 && !el.querySelector(MEDIA_SELECTOR)) {
        el.classList.add('empty-block');
      }
    }
  }, [processedContent]);

  const formattedDate = new Date(post.publish_date).toLocaleDateString(tenantLanguage, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  return (
    <div dir={tenantDirection} className="min-h-screen transition-colors">
      <style dangerouslySetInnerHTML={{ __html: getRadiusStyleTag(tenant.corner_radius) }} />
      <WebsiteLayout tenant={tenant}>
        <div className={`mt-10 sm:mt-20 w-full ${maxWidthClass} mx-auto px-5 sm:px-0`}>
          <h1 className="text-[26px] sm:text-4xl font-semibold text-foreground tracking-tight mb-1 leading-tight">
            {post.title}
          </h1>
          {post.subtitle && (
            <h2 className="text-base sm:text-lg font-medium tracking-tight text-muted-foreground leading-snug">
              {post.subtitle}
            </h2>
          )}
          <div className="mt-3 flex items-center gap-2">
            <Small className="text-muted-foreground">{formattedDate}</Small>
            {post.category && (
              <>
                <span className="text-muted-foreground">&bull;</span>
                <Small className="text-muted-foreground">
                  {post.category.emoji} {post.category.name}
                </Small>
              </>
            )}
          </div>

          <article className="my-8 sm:my-10">
            <div
              ref={contentRef}
              className="post-content [&_.slate-editor]:!p-0 w-full"
              dangerouslySetInnerHTML={{ __html: processedContent }}
            />
          </article>

          <footer>
            {morePosts.length > 0 && (
              <div className="mt-10 sm:mt-16">
                <h3 className="text-xs sm:text-sm font-medium text-muted-foreground mb-3 sm:mb-4">
                  {t('common.more_posts')}
                </h3>
                <div>
                  {morePosts.map((morePost, idx) => (
                    <BlogPostItemImage
                      key={morePost.uuid}
                      post={morePost}
                      tenantSlug={tenant.slug}
                      tenantDirection={tenantDirection}
                      tenantLanguage={tenantLanguage}
                      isLast={idx === morePosts.length - 1}
                    />
                  ))}
                </div>
              </div>
            )}
          </footer>
        </div>
      </WebsiteLayout>

      <WebsiteFooter tenant={tenant} />
    </div>
  );
}
