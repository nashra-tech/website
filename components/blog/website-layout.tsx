/**
 * WebsiteLayout Component
 *
 * Main layout wrapper for tenant blog pages.
 * Provides header with logo, subscribe button, and consistent structure.
 * Matches design from website-layout.tsx
 */

'use client';

import React from 'react';
import Link from 'next/link';
import { Tenant } from '@/types';
import { Button } from '@/components/ui/button';
import { AppAvatar } from '@/components/ui/app-avatar';

interface WebsiteLayoutProps {
  children: React.ReactNode;
  tenant: Tenant;
}

export function WebsiteLayout({ children, tenant }: WebsiteLayoutProps) {
  const tenantDirection = tenant.website_direction || 'ltr';

  return (
    <div
      className="min-h-screen flex flex-col bg-white dark:bg-neutral-900 transition-colors font-sans"
      dir={tenantDirection}
      style={{ fontFamily: 'Cairo, system-ui, sans-serif' }}
    >
      {/* Header */}
      <header className="py-2 sm:py-3 border-b border-gray-100 dark:border-base-800">
        <div className="container mx-auto px-3 sm:px-0 max-w-[560px]">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 sm:gap-3">
              <AppAvatar name={tenant.name} src={tenant.logo} className="size-8" />
              <span className="text-sm sm:text-base text-primary font-medium dark:text-gray-100 hidden sm:block">
                {tenant.name}
              </span>
            </Link>

            <div className="flex items-center gap-2 sm:gap-3">
              <Button
                className="px-3 sm:px-4 bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 text-xs !font-normal"
                size="sm"
                variant="default"
                onClick={() => {
                  // In a real app, this would open a subscribe dialog
                  // For now, we'll scroll to the footer subscription form
                  const footer = document.querySelector('footer');
                  footer?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow">{children}</main>
    </div>
  );
}
