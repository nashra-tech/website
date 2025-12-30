import React from "react";
import { Link } from "@inertiajs/react";
import { useTranslations } from "@/hooks/use-translations";

interface PostCardProps {
    post: {
        uuid?: string;
        slug: string;
        title: string;
        subtitle: string;
        publish_date: string;
        main_image_thumb_url?: string;
        main_image_url?: string;
    };
    tenant: {
        slug: string;
    };
    variant?: 'modern' | 'original';
}

const PostCard: React.FC<PostCardProps> = ({ post, tenant, variant = 'modern' }) => {
    const { t, isRTL } = useTranslations();

    // Helper function to get the correct route name
    const getShowRouteName = () => {
        try {
            route('website.show', { post: post.slug });
            return 'website.show';
        } catch {
            try {
                route('website.show.custom', { post: post.slug });
                return 'website.show.custom';
            } catch {
                // Return a fallback route name - this will be handled by the Link component
                return 'website.show';
            }
        }
    };

    if (variant === 'original') {
        return (
            <Link
                href={route(getShowRouteName(), { post: post.slug })}
            >
                <div className={`hover:bg-gray-100 rounded-lg p-4 cursor-pointer flex ${isRTL ? 'flex-row' : 'flex-row'} justify-between items-start`}>
                    {/* Image - First in RTL (Arabic) and First in LTR (English) */}
                    <div className={`rounded h-28 w-28 flex-shrink-0 ${isRTL ? 'ml-6' : 'mr-6'}`}>
                        <img
                            src={post.main_image_thumb_url || "https://placehold.co/280x180"}
                            alt={post.title}
                            className="h-30 w-30 object-contains rounded"
                        />
                    </div>

                    {/* Content - Always after image */}
                    <div className={`flex flex-col flex-grow ${isRTL ? 'text-right' : 'text-left'}`}>
                        <div className="flex items-center mb-3">
                            <h2 className="text-xl font-extrabold">{post.title}</h2>
                        </div>
                        <div className="flex flex-col">
                            <p className="text-sm mb-3 leading-relaxed text-gray-700">
                                {post.subtitle}
                            </p>
                            <p className="text-gray-500 text-sm">
                                {post.publish_date}
                            </p>
                        </div>
                    </div>
                </div>
            </Link>
        );
    }

    return (
        <Link
            href={route(getShowRouteName(), { post: post.slug })}
            className="block h-full"
        >
            <div className="flex flex-col h-full overflow-hidden rounded-lg border bg-white group">
                {/* Image Section (Top) */}
                <div className="relative w-full h-52 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent z-10"></div>
                    <img
                        src={post.main_image_url || post.main_image_thumb_url || "https://placehold.co/600x400"}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className={`absolute top-3 ${isRTL ? 'right-3' : 'left-3'} bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-gray-700 z-20`}>
                        <span className="inline-flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className={`h-3.5 w-3.5 ${isRTL ? 'ml-1' : 'mr-1'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            {post.publish_date}
                        </span>
                    </div>
                </div>

                {/* Content Section (Bottom) */}
                <div className="p-6 flex flex-col flex-grow">
                    <h2 className="text-xl font-bold mb-2 line-clamp-2 transition-colors">{post.title}</h2>
                    <p className="text-gray-600 mb-4 line-clamp-3">
                        {post.subtitle}
                    </p>
                    <div className="mt-auto flex items-center">
                        <span className={`text-sm font-medium inline-flex items-center group-hover:${isRTL ? '-translate-x-1' : 'translate-x-1'} transition-transform duration-300`}>
                            {t('read_more', 'Read more')}
                            <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 ${isRTL ? 'mr-1 rotate-180' : 'ml-1'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                        </span>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default PostCard;
