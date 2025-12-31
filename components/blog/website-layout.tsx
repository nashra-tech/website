'use client';

import React, { useState } from 'react';
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
      className="flex items-center !p-2 size-8 rounded-md hover:bg-gray-100 dark:hover:bg-base-800 transition-colors"
    >
      {resolvedTheme === 'light' ? (
        <Icons.moon className="w-4 h-4 text-gray-600 dark:text-gray-300" />
      ) : (
        <Icons.sun className="w-4 h-4 text-gray-600 dark:text-gray-300" />
      )}
    </Button>
  );
}

export function WebsiteLayout({ children, tenant }: WebsiteLayoutProps) {
  const [open, setOpen] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const tenantDirection = tenant.website_direction || 'ltr';
  const tenantLanguage = tenant.website_language || 'en';
  const { t } = useTranslations(tenantLanguage);

  return (
    <ThemeProvider>
      <div
        className="min-h-[600px] flex flex-col bg-background transition-colors font-sans"
        dir={tenantDirection}
      >
        {/* Header */}
        <header className="py-2 sm:py-3 border-b ">
          <div className="container mx-auto px-3 sm:px-0 max-w-[560px]">
            <div className="flex items-center justify-between">
              <Link href={'/'}>
                <div className="flex items-center gap-2 sm:gap-3">
                  <AppAvatar
                    src={tenant.logo}
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
                <Dialog open={open} onOpenChange={setOpen}>
                  <DialogTrigger asChild>
                    <Button
                      className="px-3 sm:px-4 bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 text-xs !font-normal"
                      size="sm"
                      variant="default"
                    >
                      {t('common.subscribe')}
                    </Button>
                  </DialogTrigger>
                  <DialogContent
                    className="sm:max-w-[390px] p-0 sm:p-0 px-3 sm:px-3 border"
                    showCloseButton={!showSuccess}
                    dir={tenantDirection}
                  >
                    <DialogHeader className="">
                      <DialogTitle className="sr-only">
                        {showSuccess ? t('dialog.subscription_success_title') : t('dialog.subscribe_title')}
                      </DialogTitle>
                    </DialogHeader>

                    {!showSuccess && (
                      <div>
                        {/* Start Form Section */}
                        <div className="mb-3" dir={tenantDirection}>
                          <h2 className="text-md text-primary font-medium text-gray-900 dark:text-white">
                            {t('newsletter.title')}
                          </h2>
                          <p className="text-md font-medium text-neutral-500 dark:text-gray-300">
                            {t('newsletter.subtitle')}
                          </p>
                        </div>
                      </div>
                    )}

                    <div className="mb-3">
                      <SubscribeForm
                        isPopup={true}
                        tenant={tenant}
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
