import { Head } from "@inertiajs/react";
import WebsiteLayout from "@/layouts/website-layout";
import { useTranslations } from "@/hooks/use-translations";
import { usePageTracking } from "@/hooks/use-page-tracking";
import { Post } from "@/types";
import { Icons } from "@/components/ui/icons";
import { Separator } from "@/components/ui/separator";
import { router } from "@inertiajs/react";
import { route } from "ziggy-js";
import WebsiteFooter from "@/components/website/website-footer";
import { Small } from "@/components/system-ui/typography";
import { Button } from "@/components/system-ui/Button";
import { useState } from "react";

interface ShowProps {
    slug?: string;
    post: Post;
    more_posts: Post[];
    tenant: any;
    has_paid_subscription: boolean;
}

interface BlogPostProps {
    title: string;
    subtitle?: string;
    publish_date?: string;
    isNew?: boolean;
    onClick?: () => void;
}

// BlogPostItem component (copied from Index.tsx)
function BlogPostItem({ title, publish_date, onClick, tenantDirection }: BlogPostProps & { tenantDirection: string }) {
    const { direction } = useTranslations();
    const isRTL = tenantDirection === 'rtl';

    return (
        <div
            className="py-3 px-2 w-full border-b cursor-pointer transition-colors"
            onClick={onClick}
            dir={tenantDirection}
        >
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 sm:gap-4">
                <h3 className={`text-neutral-500 dark:text-gray-200 text-md font-medium leading-relaxed transition-colors ${isRTL ? 'text-right' : 'text-left'} flex-1`}>
                    {title.length > (window.innerWidth < 640 ? 40 : 80) ? title.substring(0, window.innerWidth < 640 ? 40 : 80) + '...' : title}
                </h3>

                {publish_date && (
                    <p className={`text-neutral-500 font-medium dark:text-gray-500 text-md ${isRTL ? 'text-right' : 'text-left'} flex-shrink-0`}>
                        {new Date(publish_date).toLocaleDateString(direction === 'rtl' ? 'ar-EG' : 'en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                        })}
                    </p>
                )}
            </div>
        </div>
    );
}

export default function WebsiteShow({ post, more_posts, tenant, has_paid_subscription }: ShowProps) {
    const { t, direction } = useTranslations();
    const [copied, setCopied] = useState(false);

    // Track pageview with PostHog
    // Captures analytics data for individual post views
    usePageTracking({
        page_type: 'blog_post',
        tenant_uuid: tenant.uuid,
        post_uuid: post.uuid,
    });

    // Get tenant direction settings
    const tenantDirection = tenant.website_direction || 'ltr';

    const handlePostClick = (slug: string) => {
        router.visit(route('website.show', {
            post: slug,
            slug: tenant.slug
        }));
    };

        const handleCopyToClipboard = async () => {
        try {
            // Get current page URL
            const currentUrl = window.location.href;
            
            // Try modern clipboard API first
            if (navigator.clipboard && navigator.clipboard.writeText) {
                await navigator.clipboard.writeText(currentUrl);
            } else {
                // Fallback for browsers without clipboard API
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
            console.log('URL copied:', currentUrl);
            
            // Reset the copied state after 2 seconds
            setTimeout(() => {
                setCopied(false);
            }, 2000);
        } catch (err) {
            console.error('Failed to copy URL: ', err);
            // Still show success feedback even if there's an error
            setCopied(true);
            setTimeout(() => {
                setCopied(false);
            }, 2000);
        }
    };

    return (
        <div
            dir={tenantDirection}
            className="bg-white dark:bg-base-900 min-h-screen transition-colors"
            style={{ fontFamily: 'sans-serif' }}
        >
            <Head title={post.title} />
            <WebsiteLayout tenant={tenant} has_paid_subscription={has_paid_subscription}>
                {/* Main Layout with Sidebar and Content */}
                <div className="sm:mt-20 mt-16 w-full max-w-[560px] mx-auto p-3 sm:p-0">
                    <div className="">
                        {/* Main Content - Left Side */}
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
                                <Small>
                                    {new Date(post.publish_date).toLocaleDateString(direction === 'rtl' ? 'ar-EG' : 'en-US', {
                                        year: 'numeric',
                                        month: 'short',
                                        day: 'numeric'
                                    })}
                                </Small>
                            </div>

                        </div>

                    </div>

                    <article className="mt-8.5 mb-6">
                        <div className="flex gap-11 items-base">
                            <Button 
                                variant="outline" 
                                className={`w-9 h-9 flex items-center justify-center rounded-md transition-all duration-200 ${
                                    copied ? 'bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800' : ''
                                }`}
                                onClick={handleCopyToClipboard}
                                title={copied ? t('copied', 'Copied!') : t('copy_to_clipboard', 'Copy to clipboard')}
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
                    <footer className="mt-6">
                        {/* Footer Text */}
                        {/* {tenant.footer_text && (
                            <div className="text-center text-base text-gray-600 dark:text-base-400">
                                {tenant.footer_text}
                            </div>
                        )} */}

                        {/* Social Links */}
                        {tenant.social_links && tenant.social_links.length > 0 && (
                            <div className="flex justify-center items-center gap-3 sm:gap-4 flex-wrap mb-6 sm:mb-8">
                                {tenant.social_links.map((link: any, index: number) => (
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
                        {more_posts && more_posts.length > 0 && (
                            <div className="space-y-3 sm:space-y-4 mt-16">
                                <div className={`flex  items-center gap-2 mb-3 sm:mb-4 ${tenantDirection === 'rtl' ? 'flex-row' : ''}`}>
                                <h3 className="text-sm sm:text-base font-semibold text-gray-900 dark:text-white">
                                        {t('more_articles', 'More Articles')}
                                    </h3>
                                    {tenantDirection === 'rtl' ? (
                                        <Icons.arrowLeft className="w-3 h-3 sm:w-4 sm:h-4 text-base" />
                                    ) : (
                                        <Icons.arrowRight className="w-3 h-3 sm:w-4 sm:h-4 text-base" />
                                    )}
                                  
                                </div>
                                <div className="space-y-0">
                                    <Separator />
                                    {more_posts.map((morePost: any, index: number) => (
                                        <BlogPostItem
                                            key={morePost.uuid || index}
                                            title={morePost.title}
                                            subtitle={morePost.subtitle}
                                            publish_date={morePost.created_at}
                                            onClick={() => handlePostClick(morePost.slug)}
                                            tenantDirection={tenantDirection}
                                        />
                                    ))}
                                </div>
                            </div>
                        )}
                    </footer>
                </div>
            </WebsiteLayout>

            <WebsiteFooter tenant={tenant} has_paid_subscription={has_paid_subscription} />
        </div>
    );
};
