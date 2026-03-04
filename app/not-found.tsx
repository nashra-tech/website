/**
 * 404 Not Found Page (root)
 *
 * Fallback for non-tenant routes.
 */

import { ErrorLayout } from '@/components/layouts/error-layout';

export default function NotFound() {
  return (
    <ErrorLayout
      code="404"
      message="This page doesn't exist."
      showHomeLink={true}
    />
  );
}
