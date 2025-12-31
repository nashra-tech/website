/**
 * Global Error Page for Root Layout
 *
 * Catches errors that happen in the root layout.
 * Matches the Laravel Blade error layout design.
 */

'use client';

import { useEffect } from 'react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html>
      <body>
        <div className="min-h-screen flex flex-col items-center justify-center bg-neutral-50 dark:bg-neutral-900 px-4">
          <div className="w-full max-w-[800px] flex flex-col items-center gap-10">
            <div className="flex flex-col items-center w-full">
              <div className="flex flex-col items-center gap-10 w-full">
                <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-50">
                  Something went wrong!
                </h2>
                <p className="text-base font-medium text-neutral-500 dark:text-neutral-400 text-center tracking-tight max-w-[320px]">
                  Something went wrong.
                </p>
                <button
                  onClick={() => reset()}
                  className="inline-flex items-center justify-center px-6 py-2 gap-2 bg-neutral-900 dark:bg-neutral-200 hover:bg-neutral-800 dark:hover:bg-neutral-300 text-neutral-50 dark:text-neutral-900 rounded-lg shadow-sm transition-colors text-sm font-medium leading-5"
                >
                  Try again
                </button>
              </div>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
