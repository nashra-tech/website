
import { useTranslations } from "@/hooks/use-translations";
import { Head, useForm } from "@inertiajs/react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PoweredByNashra } from "@/components/website/powered-by-nashra";
import { usePageTracking } from "@/hooks/use-page-tracking";
import { InputField } from "@/components/system-ui/InputField";
import { DotPattern } from "@/components/ui/DotPattern";
import { AppAvatar } from "@/components/ui/app-avatar";
import { set } from "lodash";

interface Form {
    id: string;
    uuid: string;
    identifier: string;
    title: string;
    subtitle: string;
    image_url: string | null;
}

interface Props {
    form: Form;
    slug: string;
    workspace_name: string;
    workspace_is_rtl: boolean;
    workspace_logo: string | null | undefined;
    workspace_uuid: string;
    requires_confirmation: boolean;
    translations?: {
        made_with?: string;
        [key: string]: any;
    };
}

// Main component
export default function MagicLink({ form, workspace_name, slug, workspace_logo, workspace_is_rtl, workspace_uuid, requires_confirmation, translations = {} }: Props) {
    const { t } = useTranslations();
    const direction = workspace_is_rtl ? 'rtl' : 'ltr';
    const [isSubscribed, setIsSubscribed] = useState(false);
    const [alreadySubscribed, setAlreadySubscribed] = useState(false);
    const [hasPublishedPosts, setHasPublishedPosts] = useState(false);

    // Translation helper that uses the passed translations prop
    const translate = (key: string, fallback?: string) => {
        return translations[key] || t(key, fallback);
    };


    // SEO Meta Tags
    const metaTitle = `${form.title} | ${workspace_name}`.substring(0, 60);
    const metaDescription = (form.subtitle ?? '').substring(0, 160);
    const canonicalUrl = typeof window !== 'undefined'
        ? `${window.location.origin}${window.location.pathname}`
        : '';
    const locale = workspace_is_rtl ? 'ar_AR' : 'en_US';

    // Track pageview with PostHog
    // Captures analytics data for magic link page views
    usePageTracking({
        page_type: 'magic_link',
        tenant_uuid: workspace_uuid,
        form_uuid: form.id,
    });

    const { data, setData, post, processing, errors } = useForm({
        email: ''
    });

    const [emailError, setEmailError] = useState<string | null>(null);

    // Email validation function
    const validateEmail = (email: string): boolean => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Clear previous errors
        setEmailError(null);

        // Frontend validation
        if (!data.email.trim()) {
            setEmailError(translate('email_required', 'Email is required'));
            return;
        }

        if (!validateEmail(data.email.trim())) {
            setEmailError(translate('email_invalid', 'Please enter a valid email address'));
            return;
        }

        post(route('website.magic_link.subscribe', { slug: slug, identifier: form.identifier }), {
            onSuccess: (page) => {
                setIsSubscribed(true);
                // Check flash data for already_subscribed flag
                const pageFlash = (page.props as { flash?: { already_subscribed?: boolean, has_published_posts?: boolean } }).flash;
                if (pageFlash?.already_subscribed) {
                    setAlreadySubscribed(true);
                }if (pageFlash?.has_published_posts) {
                    setHasPublishedPosts(true);
                }
            }
        });
    };

    const handleExploreBlog = () => {
        window.location.href = window.location.origin;
    };

    return (
        <>
            <Head>
                {/* Basic Meta Tags */}
                <title>{metaTitle}</title>
                <meta name="description" content={metaDescription} />
                <link rel="canonical" href={canonicalUrl} />

                {/* Open Graph Tags */}
                <meta property="og:title" content={metaTitle} />
                <meta property="og:description" content={metaDescription} />
                <meta property="og:url" content={canonicalUrl} />
                <meta property="og:type" content="website" />
                <meta property="og:locale" content={locale} />

                {/* Twitter Card Tags */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={metaTitle} />
                <meta name="twitter:description" content={metaDescription} />

                {/* Robots - Index the subscription form, but not the success state */}
                <meta name="robots" content="noindex, nofollow" />
            </Head>

            <div className="relative min-h-screen w-full flex items-center justify-center p-0 bg-gray-50 overflow-hidden">
                <div className="absolute inset-0 w-full h-full [mask-image:radial-gradient(600px_circle_at_center,white,transparent)]">
                    <DotPattern width={24} height={24} cx={1} cy={1} cr={1} className="text-gray-200" />
                </div>

                {/* Centered Card */}
                <div className="relative w-full max-w-[480px] min-h-screen bg-white rounded-none shadow-sm border-x border-gray-100 p-8 md:p-12 z-10 flex flex-col justify-between">

                    {/* 1. Header Section: Avatar & Workspace Name */}
                    <div className="w-full flex flex-col items-center justify-center pt-8">
                        <AppAvatar
                            src={workspace_logo}
                            name={workspace_name}
                            alt={workspace_name}
                            className="size-16 mb-4"
                        />
                        <h2 className="text-lg font-bold text-gray-900 leading-tight">
                            {workspace_name}
                        </h2>
                    </div>

                    {/* 2. Content Section: Image, Details, Form */}
                    <div className="w-full space-y-6 my-auto">
                        {/* Image */}
                        {form.image_url && (
                            <div className="w-full rounded-xl overflow-hidden bg-gray-50">
                                <img
                                    src={form.image_url}
                                    alt={form.title}
                                    className="w-full h-auto object-cover"
                                />
                            </div>
                        )}

                        {!isSubscribed ? (
                            <>
                                <div className="text-center space-y-2">
                                    <h1 className="text-xl font-bold text-gray-900" dir={direction}>
                                        {form.title}
                                    </h1>
                                    {form.subtitle && (
                                        <p className="text-gray-500 leading-relaxed text-sm" dir={direction}>
                                            {form.subtitle}
                                        </p>
                                    )}
                                </div>

                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div className="space-y-4">
                                        <InputField
                                            type="email"
                                            name="email"
                                            autoComplete="email"
                                            placeholder={translate('magic_link_email_placeholder', 'Your email')}
                                            value={data.email}
                                            onChange={e => {
                                                setData('email', e.target.value);
                                                // Clear error when user starts typing
                                                if (emailError) setEmailError(null);
                                            }}
                                            error={emailError || errors.email}
                                            inputMode="email"
                                            dir={direction}
                                        />
                                        <Button
                                            type="submit"
                                            disabled={processing}
                                            className="w-full bg-gray-900 text-white hover:bg-black rounded-lg font-medium transition-all shadow-lg shadow-gray-900/10"
                                        >
                                            {processing ? translate('magic_link_subscribing', 'Subscribing...') : translate('magic_link_subscribe', 'Subscribe')}
                                        </Button>
                                    </div>
                                </form>
                            </>
                        ) : (
                            /* Success State */
                            <div className="text-center space-y-6 py-4">
                                <div className="space-y-2">
                                    <h2 className="text-xl font-bold text-gray-900" dir={direction}>
                                        {alreadySubscribed
                                            ? translate('magic_link_already_subscribed_title', 'Already Subscribed')
                                            : requires_confirmation
                                                ? translate('magic_link_confirm_title', 'Check your email')
                                                : translate('magic_link_success_title', 'You are in')
                                        }
                                    </h2>
                                    <p className="text-gray-500 text-sm leading-relaxed">
                                        {alreadySubscribed
                                            ? <>{translate('magic_link_already_subscribed_description', 'You are already subscribed to')} <span className="font-semibold text-gray-900">{form.title}</span>.</>
                                            : requires_confirmation
                                                ? translate('magic_link_confirm_description', 'Please check your email to confirm your subscription to :title').replace(':title', form.title)
                                                : <>{translate('magic_link_success_to', 'Subscribed to')} <span className="font-semibold text-gray-900">{form.title}</span>.</>
                                        }
                                    </p>
                                </div>
                                {hasPublishedPosts && (
                                <Button
                                    onClick={handleExploreBlog}
                                    dir={direction}
                                    className="w-full bg-gray-900 text-white hover:bg-black rounded-lg font-medium shadow-lg shadow-gray-900/10"
                                >
                                    {translate('magic_link_explore_blog', 'Explore :workspace').replace(':workspace', workspace_name)}
                                </Button>
                                )}
                            </div>
                        )}
                    </div>

                    {/* 3. Footer Section: Powered By */}
                    <div className="w-full flex justify-center">
                        <PoweredByNashra
                            isRtl={workspace_is_rtl}
                            translations={translations}
                            clickable={true}
                            className="opacity-80 hover:opacity-100 transition-opacity"
                        />
                    </div>
                </div>
            </div>
        </>
    );
}
