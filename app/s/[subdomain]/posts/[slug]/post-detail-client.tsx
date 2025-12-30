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
          {/* Article Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-semibold text-[#141C25] tracking-tight dark:text-white mb-1 leading-tight">
              {post.title}
            </h1>
            {post.subtitle && (
              <h2 className="text-base sm:text-lg md:text-2xl lg:text-3xl font-medium tracking-tight text-gray-700 dark:text-base-400 leading-tight">
                {post.subtitle}
              </h2>
            )}
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
              {formattedDate}
            </p>
          </div>

          {/* Article Content */}
          <article className="mt-8 mb-6">
            <div className="flex gap-4 items-start">
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
                  <CheckIcon className="w-4 h-4 text-green-600 dark:text-green-400" />
                ) : (
                  <CopyIcon className="w-4 h-4" />
                )}
              </Button>
              <div
                className="prose prose-lg dark:prose-invert max-w-none flex-1"
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
                        src={`/images/social-links/${link.name.toLowerCase()}.png`}
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
                    <ArrowLeftIcon className="w-3 h-3 sm:w-4 sm:h-4 text-base" />
                  ) : (
                    <ArrowRightIcon className="w-3 h-3 sm:w-4 sm:h-4 text-base" />
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

// Simple SVG icons
function CopyIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className={className}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184"
      />
    </svg>
  );
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className={className}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
    </svg>
  );
}

function ArrowLeftIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className={className}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
      />
    </svg>
  );
}

function ArrowRightIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className={className}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
      />
    </svg>
  );
}
