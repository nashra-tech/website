'use client';

import { useState } from 'react';
import { Tenant } from '@/types';
import { MagicLinkForm } from '@/types/magic-link';
import { Button } from '@/components/ui/button';
import { PoweredByNashra } from '@/components/blog/powered-by-nashra';
import { InputField } from '@/components/system-ui/InputField';
import { DotPattern } from '@/components/ui/DotPattern';
import { AppAvatar } from '@/components/ui/app-avatar';
import { subscribeMagicLink } from '@/lib/data';
import { useTranslations } from '@/lib/i18n';

interface MagicLinkClientProps {
  form: MagicLinkForm;
  tenant: Tenant;
}

export function MagicLinkClient({ form, tenant }: MagicLinkClientProps) {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [alreadySubscribed, setAlreadySubscribed] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [emailError, setEmailError] = useState<string | null>(null);

  const direction = tenant.website_direction || 'ltr';
  const isRTL = direction === 'rtl';
  const language = tenant.website_language || 'en';
  const { t } = useTranslations(language);

  // Email validation function
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Clear previous errors
    setEmailError(null);

    // Frontend validation
    if (!email.trim()) {
      setEmailError(t('common.email_required'));
      return;
    }

    if (!validateEmail(email.trim())) {
      setEmailError(t('common.invalid_email'));
      return;
    }

    setProcessing(true);

    try {
      const result = await subscribeMagicLink(
        form.identifier,
        email.trim(),
        tenant.slug
      );

      if (result.success) {
        setIsSubscribed(true);
        if (result.already_subscribed) {
          setAlreadySubscribed(true);
        }
        // Update hasPublishedPosts from API response
        if (result.has_published_posts !== undefined) {
          setHasPublishedPosts(result.has_published_posts);
        }
      } else {
        // Handle API error
        setEmailError(result.error || t('common.subscription_error'));
      }
    } catch (error) {
      setEmailError(t('common.subscription_error'));
    } finally {
      setProcessing(false);
    }
  };

  const handleExploreBlog = () => {
    window.location.href = window.location.origin;
  };

  // Track if tenant has published posts (from API response)
  const [hasPublishedPosts, setHasPublishedPosts] = useState(true);

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center p-0 bg-gray-50 overflow-hidden">
      <div className="absolute inset-0 w-full h-full [mask-image:radial-gradient(600px_circle_at_center,white,transparent)]">
        <DotPattern width={24} height={24} cx={1} cy={1} cr={1} className="text-gray-200" />
      </div>

      {/* Centered Card */}
      <div className="relative w-full max-w-[480px] min-h-screen bg-white rounded-none shadow-sm border-x border-gray-100 p-8 md:p-12 z-10 flex flex-col justify-between">
        {/* 1. Header Section: Avatar & Workspace Name */}
        <div className="w-full flex flex-col items-center justify-center pt-8">
          <AppAvatar
            src={tenant.logo}
            name={tenant.name}
            alt={tenant.name}
            className="size-16 mb-4"
          />
          <h2 className="text-lg font-bold text-gray-900 leading-tight">
            {tenant.name}
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
                    placeholder={t('magic_link.your_email')}
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      // Clear error when user starts typing
                      if (emailError) setEmailError(null);
                    }}
                    error={emailError}
                    inputMode="email"
                    dir={direction}
                  />
                  <Button
                    type="submit"
                    disabled={processing}
                    className="w-full bg-gray-900 text-white hover:bg-black rounded-lg font-medium transition-all shadow-lg shadow-gray-900/10"
                  >
                    {processing ? t('magic_link.subscribing') : t('magic_link.subscribe')}
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
                    ? t('magic_link.already_subscribed')
                    : form.requires_confirmation
                    ? t('magic_link.check_email')
                    : t('magic_link.you_are_in')}
                </h2>
                <p className="text-gray-500 text-sm leading-relaxed">
                  {alreadySubscribed ? (
                    <>
                      {t('magic_link.already_subscribed_message')}{' '}
                      <span className="font-semibold text-gray-900">{form.title}</span>.
                    </>
                  ) : form.requires_confirmation ? (
                    `${t('magic_link.check_email_message')} ${form.title}`
                  ) : (
                    <>
                      {t('magic_link.subscribed_to')}{' '}
                      <span className="font-semibold text-gray-900">{form.title}</span>.
                    </>
                  )}
                </p>
              </div>
              {hasPublishedPosts && (
                <Button
                  onClick={handleExploreBlog}
                  dir={direction}
                  className="w-full bg-gray-900 text-white hover:bg-black rounded-lg font-medium shadow-lg shadow-gray-900/10"
                >
                  {t('common.explore')} {tenant.name}
                </Button>
              )}
            </div>
          )}
        </div>

        {/* 3. Footer Section: Powered By */}
        <div className="w-full flex justify-center">
          <PoweredByNashra
            isRtl={isRTL}
            translations={{ made_with: t('common.powered_by') }}
            clickable={true}
            className="opacity-80 hover:opacity-100 transition-opacity"
          />
        </div>
      </div>
    </div>
  );
}
