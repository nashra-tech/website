'use client';

import { usePageTracking } from '@/hooks/use-page-tracking';

/**
 * Page Tracker Component
 * 
 * A lightweight client component to enable page tracking in server components.
 * Use this when you need to add PostHog tracking to a server-rendered page.
 * 
 * @example
 * ```tsx
 * // In a server component:
 * export default async function TenantHomePage() {
 *   const tenant = await getTenantBySlug(subdomain);
 *   
 *   return (
 *     <>
 *       <PageTracker 
 *         pageType="blog_index"
 *         tenantUuid={tenant.uuid}
 *       />
 *       {/* rest of your page *\/}
 *     </>
 *   );
 * }
 * ```
 */

interface PageTrackerProps {
  pageType: 'blog_index' | 'blog_post' | 'magic_link' | string;
  tenantUuid: string;
  postUuid?: string;
  additionalProperties?: Record<string, any>;
}

export function PageTracker({ 
  pageType, 
  tenantUuid, 
  postUuid,
  additionalProperties 
}: PageTrackerProps) {
  usePageTracking({
    page_type: pageType,
    tenant_uuid: tenantUuid,
    ...(postUuid && { post_uuid: postUuid }),
    ...additionalProperties,
  });

  // This component doesn't render anything
  return null;
}
