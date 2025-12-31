/**
 * 404 Not Found Page
 *
 * Matches the Laravel Blade error layout design.
 */

import { ErrorLayout } from '@/components/layouts/error-layout';

export default function NotFound() {
  return (
    <ErrorLayout
      code="404"
      message="This page doesn't seem to exist anymore."
      showHomeLink={false}
    />
  );
}
