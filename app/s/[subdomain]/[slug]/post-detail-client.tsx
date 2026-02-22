'use client';

import { useEffect, useMemo, useRef } from 'react';
import { Tenant, Post } from '@/types';
import { WebsiteLayout } from '@/components/blog/website-layout';
import { WebsiteFooter } from '@/components/blog/website-footer';
import { Separator } from '@/components/ui/separator';
import { Icons } from '@/components/ui/icons';
import { Small } from '@/components/system-ui/typography';
import { usePageTracking } from '@/hooks/use-page-tracking';
import { useTranslations } from '@/lib/i18n/use-translations';
import { BlogPostItemImage } from '@/components/blog/blog-post-item-image';

interface PostDetailClientProps {
  tenant: Tenant;
  post: Post;
  morePosts: Post[];
}

export function PostDetailClient({ tenant, post, morePosts }: PostDetailClientProps) {
  const tenantLanguage = tenant.website_language || 'en';
  const tenantDirection = tenant.website_direction || 'ltr';
  const isRTL = tenantDirection === 'rtl';
  const { t } = useTranslations(tenantLanguage);
  const contentRef = useRef<HTMLDivElement>(null);

  const trackingProps = useMemo(() => ({
    page_type: 'blog_post' as const,
    tenant_uuid: tenant.uuid,
    post_uuid: post.uuid,
  }), [tenant.uuid, post.uuid]);

  usePageTracking(trackingProps);

  // Replace YouTube/Vimeo iframes with thumbnail + play button
  useEffect(() => {
    const container = contentRef.current;
    if (!container) return;

    const iframes = container.querySelectorAll('iframe');
    iframes.forEach((iframe) => {
      const src = iframe.src || '';

      const ytMatch = src.match(/youtube\.com\/embed\/([^?&#]+)/);
      const vimeoMatch = src.match(/player\.vimeo\.com\/video\/(\d+)/);

      if (!ytMatch && !vimeoMatch) return;

      const videoId = ytMatch?.[1] || vimeoMatch?.[1];
      const originalUrl = ytMatch
        ? `https://www.youtube.com/watch?v=${videoId}`
        : `https://vimeo.com/${videoId}`;
      const thumbnailUrl = ytMatch
        ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
        : `https://vumbnail.com/${videoId}.jpg`;

      const link = document.createElement('a');
      link.href = originalUrl;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      link.style.aspectRatio = '16/9';
      link.style.display = 'block';
      link.style.position = 'relative';
      link.style.width = '100%';
      link.style.overflow = 'hidden';
      link.style.borderRadius = '0.125rem';

      const img = document.createElement('img');
      img.src = thumbnailUrl;
      img.alt = '';
      img.style.width = '100%';
      img.style.height = '100%';
      img.style.objectFit = 'cover';

      const overlay = document.createElement('div');
      overlay.style.position = 'absolute';
      overlay.style.inset = '0';
      overlay.style.display = 'flex';
      overlay.style.alignItems = 'center';
      overlay.style.justifyContent = 'center';
      overlay.style.pointerEvents = 'none';
      overlay.innerHTML = `<svg width="68" height="48" viewBox="0 0 68 48"><path d="M66.52 7.74c-.78-2.93-2.49-5.41-5.42-6.19C55.79.13 34 0 34 0S12.21.13 6.9 1.55c-2.93.78-4.63 3.26-5.42 6.19C.06 13.05 0 24 0 24s.06 10.95 1.48 16.26c.78 2.93 2.49 5.41 5.42 6.19C12.21 47.87 34 48 34 48s21.79-.13 27.1-1.55c2.93-.78 4.64-3.26 5.42-6.19C67.94 34.95 68 24 68 24s-.06-10.95-1.48-16.26z" fill="#212121" fill-opacity="0.8"/><path d="M45 24L27 14v20" fill="#fff"/></svg>`;

      link.appendChild(img);
      link.appendChild(overlay);

      const parent = iframe.parentElement;
      if (parent) {
        parent.replaceChild(link, iframe);
      }
    });
  }, [post.website_content]);

  const formattedDate = new Date(post.publish_date).toLocaleDateString(tenantLanguage, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  return (
    <div dir={tenantDirection} className="min-h-screen transition-colors">
      <WebsiteLayout tenant={tenant}>
        <div className="sm:mt-20 mt-16 w-full max-w-[560px] mx-auto p-3 sm:p-0">
          <h1 className="text-4xl font-semibold text-foreground tracking-tight mb-1 leading-tight">
            {post.title}
          </h1>
          {post.subtitle && (
            <h2 className="text-lg font-medium tracking-tight text-muted-foreground leading-tight">
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

          <article className="my-10">
            <div
              ref={contentRef}
              className="post-content [&_.slate-editor]:!p-0 w-full"
              dangerouslySetInnerHTML={{ __html: post.website_content || '' }}
            />
          </article>

          <footer>
            {morePosts.length > 0 && (
              <div className="space-y-3 mt-16">
                <div className="flex items-center gap-1">
                  <h3 className="text-lg font-medium text-foreground tracking-tight">
                    {t('common.more_articles')}
                  </h3>
                  {isRTL ? (
                    <Icons.arrowLeft className="w-5 h-5" />
                  ) : (
                    <Icons.arrowRight className="w-5 h-5" />
                  )}
                </div>
                <div>
                  <Separator />
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
