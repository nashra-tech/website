/**
 * Post Detail Client Component
 *
 * Client-side component for post detail page with interactive features.
 */

'use client';

import { useState } from 'react';
import { Tenant, Post } from '@/types';
import { WebsiteLayout } from '@/components/blog/website-layout';
import { WebsiteFooter } from '@/components/blog/website-footer';
import { BlogPostItem } from '@/components/blog/blog-post-item';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/ui/icons';
import { Small } from '@/components/system-ui/typography';

interface PostDetailClientProps {
  tenant: Tenant;
  post: Post;
  morePosts: Post[];
}

export function PostDetailClient({ tenant, post, morePosts }: PostDetailClientProps) {
  const [copied, setCopied] = useState(false);

  const tenantDirection = tenant.website_direction || 'ltr';
  const isRTL = tenantDirection === 'rtl';
  const locale = isRTL ? 'ar-EG' : 'en-US';

  const formattedDate = new Date(post.publish_date).toLocaleDateString(locale, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  const handleCopyToClipboard = async () => {
    try {
      const currentUrl = window.location.href;

      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(currentUrl);
      } else {
        // Fallback
        const textArea = document.createElement('textarea');
        textArea.value = currentUrl;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand('copy');
        textArea.remove();
      }

      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy URL:', err);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div
      dir={tenantDirection}
      className="bg-white dark:bg-base-900 min-h-screen transition-colors"
      style={{ fontFamily: 'sans-serif' }}
    >
      <WebsiteLayout tenant={tenant}>
        <div className="sm:mt-20 mt-16 w-full max-w-[560px] mx-auto p-3 sm:p-0">
          <div className="">
            {/* Article Header - Responsive */}
            <div className="">
              <h1 className="text-4xl font-semibold text-[#141C25] tracking-tight dark:text-white mb-1 leading-tight">
                {post.title}
              </h1>
              {post.subtitle && (
                <h2 className="text-base sm:text-lg md:text-2xl lg:text-3xl font-medium tracking-tight text-gray-700 dark:text-base-400 leading-tight">
                  {post.subtitle}
                </h2>
              )}
              <Small>{formattedDate}</Small>
            </div>
          </div>

          <article className="mt-8.5 mb-6">
            <div className="flex gap-11 items-base">
              <Button
                variant="outline"
                className={`w-9 h-9 flex items-center justify-center rounded-md transition-all duration-200 ${
                  copied
                    ? 'bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800'
                    : ''
                }`}
                onClick={handleCopyToClipboard}
                title={copied ? 'Copied!' : 'Copy to clipboard'}
              >
                {copied ? (
                  <Icons.check className="w-4 h-4 sm:w-4 sm:h-4 text-green-600 dark:text-green-400" />
                ) : (
                  <Icons.copy02 className="w-4 h-4 sm:w-4 sm:h-4" />
                )}
              </Button>
              <div
                className="!p-0 !m-0 [&_.slate-editor]:!p-0 [&_.slate-p]:dark:!text-base-400 [&_.slate-h3]:dark:!text-white"
                dangerouslySetInnerHTML={{ __html: post.website_content || '' }}
              />
            </div>
          </article>

          {/* Footer Section */}
          <footer className="mt-16">
            {/* Social Links */}
            {tenant.footer_data.social_links &&
              tenant.footer_data.social_links.length > 0 && (
                <div className="flex justify-center items-center gap-3 sm:gap-4 flex-wrap mb-6 sm:mb-8">
                  {tenant.footer_data.social_links.map((link, index) => (
                    <a
                      key={index}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="opacity-60 hover:opacity-100 transition-opacity flex-shrink-0"
                      title={link.name}
                    >
                      <img
                        src={`/images/socials/${link.name.toLowerCase()}.png`}
                        alt={link.name}
                        className="w-4 h-4 sm:w-5 sm:h-5"
                      />
                    </a>
                  ))}
                </div>
              )}

            {/* More Articles Section */}
            {morePosts && morePosts.length > 0 && (
              <div className="space-y-3 sm:space-y-4 mt-16">
                <div
                  className={`flex items-center gap-2 mb-3 sm:mb-4 ${
                    isRTL ? 'flex-row' : ''
                  }`}
                >
                  <h3 className="text-sm sm:text-base font-semibold text-gray-900 dark:text-white">
                    More Articles
                  </h3>
                  {isRTL ? (
                    <Icons.arrowLeft className="w-3 h-3 sm:w-4 sm:h-4 text-base" />
                  ) : (
                    <Icons.arrowRight className="w-3 h-3 sm:w-4 sm:h-4 text-base" />
                  )}
                </div>
                <div className="space-y-0">
                  <Separator />
                  {morePosts.map((morePost) => (
                    <BlogPostItem
                      key={morePost.uuid}
                      post={morePost}
                      tenantSlug={tenant.slug}
                      tenantDirection={tenantDirection}
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
