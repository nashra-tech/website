'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Tenant } from '@/types';
import { Button } from '@/components/ui/button';
import { AppAvatar } from '@/components/ui/app-avatar';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { SubscribeForm } from './subscribe-form';
import { ThemeProvider, useTheme } from '@/contexts/theme-context';
import { Icons } from '@/components/ui/icons';
import { useTranslations } from '@/lib/i18n';
import { ArrowRight } from 'lucide-react';

interface WebsiteLayoutProps {
  children: React.ReactNode;
  tenant: Tenant;
}

// Theme Toggle Dropdown Component
function ThemeToggleDropdown() {
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <Button
      onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
      variant="outline"
      className="group flex items-center !p-2 size-8 rounded-[var(--blog-radius)] hover:bg-gray-100 dark:hover:bg-base-800 transition-colors duration-200 ease-out"
    >
      {resolvedTheme === 'light' ? (
        <Icons.moon className="w-4 h-4 text-gray-600 dark:text-gray-300 transition-transform duration-200 ease-out group-hover:rotate-12" />
      ) : (
        <Icons.sun className="w-4 h-4 text-gray-600 dark:text-gray-300 transition-transform duration-200 ease-out group-hover:rotate-12" />
      )}
    </Button>
  );
}

export function WebsiteLayout({ children, tenant }: WebsiteLayoutProps) {
  const [open, setOpen] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Set dynamic favicon from tenant data
  useEffect(() => {
    if (!tenant.favicon) return;

    document
      .querySelectorAll('link[rel="icon"], link[rel="shortcut icon"]')
      .forEach((el) => el.remove());

    const link = document.createElement('link');
    link.rel = 'icon';
    link.type = 'image/png';
    link.setAttribute('sizes', '32x32');
    link.href = tenant.favicon;
    document.head.appendChild(link);
  }, [tenant.favicon]);

  const tenantDirection = tenant.website_direction || 'ltr';
  const tenantLanguage = tenant.website_language || 'en';
  const { t } = useTranslations(tenantLanguage);

  // Theme settings
  const cornerRadius = tenant.corner_radius || 'round';
  const buttonStyle = tenant.button_style || 'filled';
  const buttonVariant = buttonStyle === 'outline' ? 'outline' as const : 'default' as const;
  const layout = tenant.homepage_layout || 'list';
  const maxWidthClass = layout === 'cards' ? 'max-w-[640px]' : 'max-w-[560px]';

  // CSS custom properties for consistent corner radius across all blog components
  // --blog-radius: interactive elements (buttons, inputs)
  // --blog-radius-lg: containers (cards, images, dialogs)
  const radiusMap = {
    sharp: { '--blog-radius': '0.375rem', '--blog-radius-lg': '0.5rem' },
    round: { '--blog-radius': '0.75rem', '--blog-radius-lg': '0.75rem' },
    pill:  { '--blog-radius': '9999px',   '--blog-radius-lg': '1rem' },
  } as const;
  const radiusVars = radiusMap[cornerRadius] as unknown as React.CSSProperties;

  return (
    <ThemeProvider brandColor={tenant.brandColor}>
      <div
        className="min-h-[600px] flex flex-col bg-background transition-colors font-sans"
        dir={tenantDirection}
        style={radiusVars}
      >
        {/* Header */}
        <header className="py-3 sm:py-4">
          <div className={`container mx-auto px-5 sm:px-0 ${maxWidthClass}`}>
            <div className="flex items-center justify-between">
              <Link href={'/'} className="transition-opacity duration-200 ease-out hover:opacity-80">
                <div className="flex items-center gap-2 sm:gap-3">
                  <AppAvatar
                    src={tenant.logo_thumb || tenant.logo}
                    name={tenant.name}
                    alt={tenant.name}
                    className="size-8"
                  />
                  <span className="text-sm sm:text-base font-medium  hidden sm:block">
                    {tenant.name}
                  </span>
                </div>
              </Link>

              <div className="flex items-center gap-2 sm:gap-3">
                <ThemeToggleDropdown />
                <Dialog open={open} onOpenChange={(v) => { setOpen(v); if (!v) setShowSuccess(false); }}>
                  <DialogTrigger asChild>
                    <Button
                      size="sm"
                      variant={buttonVariant}
                      className="group h-8 px-4 rounded-[var(--blog-radius)] font-medium text-sm shadow-md hover:shadow-lg transition-shadow duration-200 ease-out"
                    >
                      {t('common.subscribe')}
                      <ArrowRight className="w-4 h-4 rtl:rotate-180 transition-transform duration-200 ease-out group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent
                    className="sm:max-w-[390px] p-5 sm:p-5 gap-0 border !rounded-[var(--blog-radius-lg)]"
                    showCloseButton={!showSuccess}
                    dir={tenantDirection}
                  >
                    <DialogHeader>
                      <DialogTitle className="sr-only">
                        {showSuccess ? t('dialog.subscription_success_title') : t('dialog.subscribe_title')}
                      </DialogTitle>
                    </DialogHeader>

                    {!showSuccess && (
                      <div className="mb-4" dir={tenantDirection}>
                        <p className="text-[17px] font-medium leading-[1.2] tracking-tight text-black dark:text-white">
                          {tenant.newsletter_headline || t('newsletter.title')}
                        </p>
                        <p className="text-[17px] font-medium leading-[1.2] tracking-tight text-neutral-500 dark:text-base-400">
                          {tenant.newsletter_description || t('newsletter.subtitle')}
                        </p>
                      </div>
                    )}

                    <div>
                      <SubscribeForm
                        isPopup={true}
                        tenant={tenant}
                        buttonText={tenant.newsletter_button_text || undefined}
                        onSubscribe={() => {
                          setShowSuccess(true);
                        }}
                      />
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-grow">
          <div className={`w-full`}>{children}</div>
        </main>
      </div>
    </ThemeProvider>
  );
}
