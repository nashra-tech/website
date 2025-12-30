import { useTranslations } from "@/hooks/use-translations";
import SubscribeForm from "@/components/website/subscribe-form";
import { PoweredByNashra } from "@/components/website/powered-by-nashra";

interface WebsiteFooterProps {
    tenant: any;
    has_paid_subscription: boolean;
}

export default function WebsiteFooter({ tenant, has_paid_subscription }: WebsiteFooterProps) {
    const { t } = useTranslations();

    // Get tenant direction settings
    const tenantDirection = tenant.website_direction || 'ltr';
    const isTenantRTL = tenantDirection === 'rtl';

    return (
        <footer className="p-3 sm:p-0">
            {/* Newsletter Section */}
            <section className="py-0 mb-0 sm:py-6 sm:mb-3 bg-white relative font-sans dark:bg-neutral-900 border-t border-gray-100 dark:border-base-800">
                {/* Fixed Badge at Bottom Right */}
                {!has_paid_subscription && (
                    <div className={`fixed bottom-4 z-50 ${isTenantRTL ? 'left-4' : 'right-4'}`}>
                        <PoweredByNashra
                            isRtl={isTenantRTL}
                            translations={{ made_with: t('made_with', 'Powered by') }}
                            clickable={true}
                            className="opacity-80 hover:opacity-100 transition-opacity"
                        />
                    </div>
                )}

                <div className="max-w-[560px] mx-auto">
                    <div>
                        {/* Start Form Section */}
                        <div className="mb-4 sm:mt-0 mt-4">
                            <h2 className="text-md text-primary font-medium text-gray-900 dark:text-white">
                                {t('subscribe_description', 'Get the latest articles')}
                            </h2>
                            <p className="text-md font-medium text-neutral-500 dark:text-base-400">
                                {t('directly_in_email', 'Delivered to your inbox')}
                            </p>
                        </div>

                        <div className="mb-3">
                            <SubscribeForm tenant={tenant} />
                        </div>
                        {/* End Form Section */}

                        {/* Desktop Layout (default) and Mobile Layout (≤390px) */}
                        <div className="hidden sm:flex justify-between items-center">
                            {/* Desktop: Copyright on left, Social links on right */}
                            <div className="text-neutral-500 dark:text-base-400 text-xs">
                                {/* <p>©{new Date().getFullYear()} {tenant.name} - All rights reserved</p> */}
                                {tenant.physical_address}
                            </div>
                            <div className="flex items-center gap-3">
                                {/* Social Links */}
                                {tenant.social_links && tenant.social_links.length > 0 && (
                                    tenant.social_links.map((link: any, index: number) => (
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
                                                className="w-5 h-5"
                                            />
                                        </a>
                                    ))
                                )}
                            </div>
                        </div>

                        {/* Mobile Layout (≤390px) - Centered with proper padding */}
                        <div className="sm:hidden text-center px-4 py-6 space-y-4">
                            {/* Social Links - Centered in rows */}
                            {tenant.social_links && tenant.social_links.length > 0 && (
                                <div className="flex justify-center items-center gap-4 flex-wrap">
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
                                                className="w-5 h-5"
                                            />
                                        </a>
                                    ))}
                                </div>
                            )}

                            {/* Copyright - Centered */}
                            <div className="text-center">
                                <p className="text-neutral-500 dark:text-base-400 text-sm">
                                    ©{new Date().getFullYear()} {tenant.name} - All rights reserved
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </footer>
    );
}
