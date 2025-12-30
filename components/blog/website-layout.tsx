/**
 * WebsiteLayout Component
 *
 * Main layout wrapper for tenant blog pages.
 * Provides header with logo, subscribe button, and consistent structure.
 * Matches design from website-layout.tsx
 */

'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Tenant } from '@/types';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

interface WebsiteLayoutProps {
  children: React.ReactNode;
  tenant: Tenant;
}

// Simple avatar component
function TenantAvatar({ name, logo }: { name: string; logo?: string }) {
  if (logo) {
    return (
      <img
        src={logo}
        alt={name}
        className="size-8 rounded-full object-cover"
      />
    );
  }

  // Fallback to initials
  const initials = name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .substring(0, 2);

  return (
    <div className="size-8 rounded-full bg-gray-900 dark:bg-gray-100 flex items-center justify-center text-white dark:text-gray-900 text-sm font-medium">
      {initials}
    </div>
  );
}

export function WebsiteLayout({ children, tenant }: WebsiteLayoutProps) {
  const [subscribeDialogOpen, setSubscribeDialogOpen] = useState(false);
  const tenantDirection = tenant.website_direction || 'ltr';
  const isRTL = tenantDirection === 'rtl';

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
              <TenantAvatar name={tenant.name} logo={tenant.logo} />
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
