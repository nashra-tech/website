import { useState } from "react";
import { Head } from "@inertiajs/react";
import { Icons } from "@/components/ui/icons";
import { useTranslations } from "@/hooks/use-translations";
import { usePageTracking } from "@/hooks/use-page-tracking";
import WebsiteLayout from "@/layouts/website-layout";
import { router } from "@inertiajs/react";
import { route } from "ziggy-js";
import { Separator } from "@/components/ui/separator";
import { WebsitePagination } from "@/components/website/website-pagination";
import { Empty } from "@/components/ui/empty";
import WebsiteFooter from "@/components/website/website-footer";
import { H1, H2, Subtitle } from '@/components/system-ui/typography';

// Type definitions
interface WebsiteIndexProps {
    posts: {
        data: Array<{
            uuid?: string;
            slug: string;
            title: string;
            subtitle: string;
            publish_date: string;
            created_at: string;
            main_image_url?: string;
            main_image_thumb_url?: string;
        }>;
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
        from: number;
        to: number;
    };
    tenant: any;
    has_paid_subscription: boolean;
}

interface BlogPostProps {
    title: string;
    subtitle?: string;
    publish_date?: string;
    isNew?: boolean;
    onClick?: () => void;
    isFirst?: boolean;
}




// Components
function BlogPostItem({ title, publish_date, onClick, tenantDirection, isFirst }: BlogPostProps & { tenantDirection: string, isFirst: boolean }) {
    const { direction } = useTranslations();
    const isRTL = tenantDirection === 'rtl';

    return (
        <div
            className=" py-3 px-2 w-full border-b cursor-pointer transition-colors"
            onClick={onClick}
            dir={tenantDirection}
        >
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 sm:gap-4">
                <h3 className={`${isFirst ? 'text-base-900' : 'text-base-500'} dark:text-base-400 text-base font-medium leading-relaxed transition-colors ${isRTL ? 'text-right' : 'text-left'} flex-1 max-w-[415px]`}>
                    {title.length > (window.innerWidth < 640 ? 40 : 80) ? title.substring(0, window.innerWidth < 640 ? 40 : 80) + '...' : title}
                </h3>

                {publish_date && (
                    <p className={`${isFirst ? 'text-base-900' : 'text-base-500'} font-medium dark:text-base-400 text-md  ${isRTL ? 'text-right' : 'text-left'} flex-shrink-0`}>
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


// Main component
export default function WebsiteIndex({ posts, tenant, has_paid_subscription }: WebsiteIndexProps) {
    const { t } = useTranslations();
    const [searchTerm] = useState("");

    // Track pageview with PostHog
    // Captures analytics data including unique visitors, pageviews, bounce rate, etc.
    usePageTracking({
        page_type: 'blog_index',
        tenant_uuid: tenant.uuid,
    });

    // Get tenant direction settings
    const tenantDirection = tenant.website_direction || 'ltr';

    const filteredPosts = posts.data.filter(post => {
        const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (post.subtitle && post.subtitle.toLowerCase().includes(searchTerm.toLowerCase()));
        // Note: Real posts don't have categories, so we'll only filter by search for now
        // You can implement categories later if needed
        return matchesSearch;
    });

    const handlePostClick = (slug: string) => {
        console.log(slug);
        router.visit(route('website.show', {
            post: slug,
            slug: tenant.slug
        }));

        // #### Is For Custom Subdomain Feature ########

        // Try different route names based on what's available
        // let routeName = 'website.show';
        // let routeFound = false;
        //
        // try {
        //     route('website.show',{
        //         post:slug,
        //         slug:tenant.slug
        //     });
        //     routeFound = true;
        // } catch {
        //     try {
        //         routeName = 'website.show.custom';
        //         route(routeName, { post: slug });
        //         routeFound = true;
        //     } catch {
        //         console.error('No valid route found for post navigation');
        //         return;
        //     }
        // }
        //
        // if (routeFound) {
        //     // Navigate to post detail page using the slug
        //     router.visit(route(routeName, { post: slug }));
        // }
    };

    return (
        <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors flex justify-between flex-col" dir={tenantDirection} style={{ fontFamily: 'Cairo, system-ui, sans-serif' }}>
            <Head title={tenant.name} />

            <WebsiteLayout tenant={tenant} has_paid_subscription={has_paid_subscription}>
                <div className="max-w-[560px] mx-auto p-3 sm:p-0">
                    {/* Header Section - Responsive */}
                    <div className="sm:mt-20 sm:mb-16 mt-16 mb-16">
                        <H2 className="mb-2">{tenant.name || ''}</H2>
                        <Subtitle fontWeight={'font-normal'} textColor={'text-base-500'} textSize={'text-lg'}>{tenant.description}</Subtitle>
                    </div>

                    <Separator />
                    {/* Main Content - Responsive */}
                    <div className="w-full">
                        {/* Blog Section */}
                        <div className="w-full">
                            <div className="space-y-0">
                                {filteredPosts.length > 0 ? (
                                    filteredPosts.map((post, index) => (
                                        <BlogPostItem
                                            key={post.uuid || index}
                                            title={post.title}
                                            subtitle={post.subtitle}
                                            publish_date={post.created_at}
                                            onClick={() => handlePostClick(post.slug)}
                                            tenantDirection={tenantDirection}
                                            isFirst={index === 0}
                                        />
                                    ))
                                ) : (
                                    <div className="px-2 py-3 sm:px-2 sm:py-3">
                                        <Empty
                                            title={searchTerm ? t('no_search_results', 'No articles match your search') : "We're just getting started. Sign up for updates!"}
                                            description={searchTerm ? undefined : undefined}
                                            icons={[Icons.annotation, Icons.email]}
                                        />
                                        <Separator />
                                    </div>
                                )}
                            </div>

                            {/* Pagination */}
                            {filteredPosts.length > 0 && (
                                <WebsitePagination
                                    currentPage={posts.current_page}
                                    totalPages={posts.last_page}
                                    perPage={posts.per_page}
                                    total={posts.total}
                                    from={posts.from || 0}
                                    to={posts.to || 0}
                                    tenantDirection={tenantDirection}
                                />
                            )}
                        </div>
                    </div>
                </div>
            </WebsiteLayout>

            <WebsiteFooter tenant={tenant} has_paid_subscription={has_paid_subscription} />
        </div>
    );
}
