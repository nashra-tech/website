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
import { ThemeProvider } from '@/contexts/theme-context';

interface MagicLinkClientProps {
  form: MagicLinkForm;
  tenant: Tenant;
}

export function MagicLinkClient({ form, tenant }: MagicLinkClientProps) {
  const [email, setEmail] = useState('');
  const [fieldValues, setFieldValues] = useState<Record<string, string>>({});
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [alreadySubscribed, setAlreadySubscribed] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [hasPublishedPosts, setHasPublishedPosts] = useState(true);

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
      // Build extra fields from fieldValues (only non-empty values)
      const extraFields: Record<string, string> = {};
      for (const [key, value] of Object.entries(fieldValues)) {
        if (value.trim()) {
          extraFields[key] = value.trim();
        }
      }

      const result = await subscribeMagicLink(
        form.identifier,
        email.trim(),
        tenant.slug,
        Object.keys(extraFields).length > 0 ? extraFields : undefined
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

  return (
    <ThemeProvider brandColor={tenant.brandColor}>
      <div className="relative min-h-screen w-full flex items-center justify-center p-4 bg-gray-50 dark:bg-neutral-950 overflow-hidden">
        <div className="absolute inset-0 w-full h-full [mask-image:radial-gradient(600px_circle_at_center,white,transparent)]">
          <DotPattern width={24} height={24} cx={1} cy={1} cr={1} className="text-gray-200 dark:text-neutral-800" />
        </div>

        {/* Centered Card */}
        <div className="relative w-full max-w-[400px] bg-white dark:bg-neutral-900 rounded-2xl shadow-sm border border-gray-100 dark:border-neutral-800 overflow-hidden z-10">
          {/* Header: Avatar & Name — horizontal layout */}
          <div className="flex items-center gap-2.5 px-5 pt-6 pb-4">
            <AppAvatar
              src={tenant.logo_thumb || tenant.logo}
              name={tenant.name}
              alt={tenant.name}
              className="size-9"
            />
            <span className="text-sm font-medium text-foreground">
              {tenant.name}
            </span>
          </div>

          {/* Image — 4:3 aspect ratio */}
          {form.image_url && (
            <div className="mx-5 mb-4">
              <img
                src={form.image_url}
                alt={form.title}
                className="w-full rounded-xl object-cover"
                style={{ aspectRatio: '4/3' }}
              />
            </div>
          )}

          {!isSubscribed ? (
            <>
              {/* Title */}
              <div className="px-5 pb-2">
                <h1 className="text-base font-semibold leading-snug text-foreground" dir={direction}>
                  {form.title}
                </h1>
              </div>

              {/* Subtitle */}
              {form.subtitle && (
                <div className="px-5 pb-5">
                  <p className="text-sm leading-relaxed text-muted-foreground" dir={direction}>
                    {form.subtitle}
                  </p>
                </div>
              )}

              {/* Form */}
              <form onSubmit={handleSubmit}>
                {/* Dynamic fields */}
                {form.fields.length > 0 && (
                  <div className="px-5 space-y-2 pb-2">
                    {form.fields.map((field) => (
                      <InputField
                        key={field.key}
                        type="text"
                        name={field.key}
                        placeholder={field.label}
                        value={fieldValues[field.key] || ''}
                        onChange={(e) => {
                          setFieldValues((prev) => ({
                            ...prev,
                            [field.key]: e.target.value,
                          }));
                        }}
                        dir={direction}
                        className="bg-neutral-50 dark:bg-neutral-800"
                      />
                    ))}
                  </div>
                )}

                {/* Email input */}
                <div className="px-5 pb-3">
                  <InputField
                    type="email"
                    name="email"
                    autoComplete="email"
                    placeholder={t('magic_link.your_email')}
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (emailError) setEmailError(null);
                    }}
                    error={emailError}
                    inputMode="email"
                    dir={direction}
                    className="bg-neutral-50 dark:bg-neutral-800"
                  />
                </div>

                {/* Submit button */}
                <div className="px-5 pb-5">
                  <Button
                    type="submit"
                    disabled={processing}
                    className="w-full"
                  >
                    {processing ? t('magic_link.subscribing') : form.button_text}
                  </Button>
                </div>
              </form>
            </>
          ) : (
            /* Success State */
            <div className="px-5 pb-5 space-y-6 py-4">
              <div className="space-y-2">
                <h2 className="text-base font-semibold text-foreground" dir={direction}>
                  {alreadySubscribed
                    ? t('magic_link.already_subscribed')
                    : form.requires_confirmation
                      ? t('magic_link.check_email')
                      : t('magic_link.you_are_in')}
                </h2>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {alreadySubscribed ? (
                    <>
                      {t('magic_link.already_subscribed_message')}{' '}
                      <span className="font-semibold text-foreground">{form.title}</span>.
                    </>
                  ) : form.requires_confirmation ? (
                    `${t('magic_link.check_email_message')} ${form.title}`
                  ) : (
                    <>
                      {t('magic_link.subscribed_to')}{' '}
                      <span className="font-semibold text-foreground">{form.title}</span>.
                    </>
                  )}
                </p>
              </div>
              {hasPublishedPosts && (
                <Button
                  onClick={handleExploreBlog}
                  dir={direction}
                  className="w-full"
                >
                  {t('common.explore')} {tenant.name}
                </Button>
              )}
            </div>
          )}

          {/* Footer: Powered By */}
          {tenant.show_branding && (
            <div className="flex items-center justify-center border-t border-border py-3">
              <PoweredByNashra
                isRtl={isRTL}
                translations={{ made_with: t('common.powered_by') }}
                clickable={true}
                className="opacity-80 hover:opacity-100 transition-opacity"
              />
            </div>
          )}
        </div>
      </div>
    </ThemeProvider>
  );
}
