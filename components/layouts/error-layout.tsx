/**
 * Error Layout Component
 *
 * Nashra style — calm, minimal.
 * Supports tenant-aware mode (user's logo, language, direction).
 */

'use client';

import Link from 'next/link';
import { Tenant } from '@/types';
import { AppAvatar } from '@/components/ui/app-avatar';
import { ThemeProvider } from '@/contexts/theme-context';

interface ErrorLayoutProps {
  code?: string;
  message?: string;
  homeLinkText?: string;
  showHomeLink?: boolean;
  tenant?: Tenant | null;
}

function ErrorContent({
  code = '500',
  message = 'Something went wrong.',
  homeLinkText = 'Back to home',
  showHomeLink = true,
  tenant,
}: ErrorLayoutProps) {
  const direction = tenant?.website_direction || 'ltr';

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center bg-neutral-50 dark:bg-neutral-900 px-6"
      dir={direction}
      style={{ fontFamily: 'Cairo, system-ui, sans-serif' }}
    >
      <div className="flex flex-col items-center gap-16">
        {/* Tenant logo */}
        {tenant && (
          <AppAvatar
            src={tenant.logo_thumb || tenant.logo}
            name={tenant.name}
            alt={tenant.name}
            className="size-10"
          />
        )}

        {/* Error */}
        <div className="flex flex-col items-center gap-6">
          <span className="text-8xl font-extralight tracking-tight text-neutral-300 dark:text-neutral-700 select-none">
            {code}
          </span>

          <p className="text-sm text-neutral-500 dark:text-neutral-400 text-center tracking-tight max-w-[320px]">
            {message}
          </p>
        </div>

        {/* Home link */}
        {showHomeLink && (
          <Link
            href="/"
            className="text-sm text-neutral-400 dark:text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors duration-300"
          >
            &larr; {homeLinkText}
          </Link>
        )}
      </div>
    </div>
  );
}

export function ErrorLayout(props: ErrorLayoutProps) {
  return (
    <ThemeProvider brandColor={props.tenant?.brandColor}>
      <ErrorContent {...props} />
    </ThemeProvider>
  );
}
