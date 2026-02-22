'use client';

import { useMemo } from 'react';
import { usePageTracking } from '@/hooks/use-page-tracking';

interface PageTrackerProps {
  pageType: 'blog_index' | 'blog_post' | 'magic_link' | string;
  tenantUuid: string;
  postUuid?: string;
}

export function PageTracker({ pageType, tenantUuid, postUuid }: PageTrackerProps) {
  const trackingProps = useMemo(() => ({
    page_type: pageType,
    tenant_uuid: tenantUuid,
    ...(postUuid && { post_uuid: postUuid }),
  }), [pageType, tenantUuid, postUuid]);

  usePageTracking(trackingProps);

  return null;
}
