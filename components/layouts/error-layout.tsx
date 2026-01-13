/**
 * Error Layout Component
 *
 * Matches the Laravel Blade error layout design.
 * Displays error pages with code, message, and optional back to home link.
 */

'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ThemeProvider } from '@/contexts/theme-context';

interface ErrorLayoutProps {
  code?: string;
  message?: string;
  showHomeLink?: boolean;
}

function ErrorContent({
  code = '500',
  message = 'Something went wrong.',
  showHomeLink = true,
}: ErrorLayoutProps) {

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-neutral-50 dark:bg-neutral-900 px-4">
      {/* Content Container */}
      <div className="w-full max-w-[800px] flex flex-col items-center gap-10">
        {/* Logo */}
        <div className="flex flex-col items-center gap-1.5">
          {/* Light mode logo */}
          <Image
            src="/images/logo/logo-dark.png"
            alt="Nashra"
            width={100}
            height={14}
            className="h-3.5 w-auto dark:hidden"
            priority
            onError={(e) => {
              // Fallback to text if logo not found
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
              const parent = target.parentElement;
              if (parent && !parent.querySelector('.logo-fallback')) {
                const fallback = document.createElement('div');
                fallback.className =
                  'logo-fallback text-xl font-bold text-neutral-900 dark:text-neutral-50';
                fallback.textContent = 'Nashra';
                parent.appendChild(fallback);
              }
            }}
          />
          {/* Dark mode logo */}
          <Image
            src="/images/logo/logo-light.png"
            alt="Nashra"
            width={100}
            height={14}
            className="h-3.5 w-auto hidden dark:block"
            priority
            onError={(e) => {
              // Fallback to text if logo not found
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
              const parent = target.parentElement;
              if (parent && !parent.querySelector('.logo-fallback')) {
                const fallback = document.createElement('div');
                fallback.className =
                  'logo-fallback text-xl font-bold text-neutral-900 dark:text-neutral-50';
                fallback.textContent = 'Nashra';
                parent.appendChild(fallback);
              }
            }}
          />
        </div>

        {/* Error Content */}
        <div className="flex flex-col items-center w-full">
          {/* Error Icon */}
          <div className="w-60 h-60">
            <img
              src={`/images/errors/${code}.svg`}
              alt={`Error ${code}`}
              className="w-full h-full dark:invert"
            />
          </div>

          {/* Description */}
          <div className="flex flex-col items-center gap-10 w-full">
            <p className="text-base font-medium text-neutral-500 dark:text-neutral-400 text-center tracking-tight max-w-[320px]">
              {message}
            </p>

            {/* Back to Home Button */}
            {showHomeLink && (
              <Link
                href="/"
                className="inline-flex items-center justify-center px-6 py-2 gap-2 bg-neutral-900 dark:bg-neutral-200 hover:bg-neutral-800 dark:hover:bg-neutral-300 text-neutral-50 dark:text-neutral-900 rounded-lg shadow-sm transition-colors text-sm font-medium leading-5"
              >
                Back to home
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export function ErrorLayout(props: ErrorLayoutProps) {
  return (
    <ThemeProvider>
      <ErrorContent {...props} />
    </ThemeProvider>
  );
}
