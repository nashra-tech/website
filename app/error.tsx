/**
 * Global Error Page
 *
 * Handles runtime errors in the application.
 * Matches the Laravel Blade error layout design.
 */

'use client';

import { useEffect } from 'react';
import { ErrorLayout } from '@/components/layouts/error-layout';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <ErrorLayout
      code="500"
      message="Something went wrong."
      showHomeLink={true}
    />
  );
}
