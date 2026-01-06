'use client';

import { useEffect } from 'react';
import { usePostHog } from 'posthog-js/react';
import { usePathname, useSearchParams } from 'next/navigation';

/**
 * PostHog page tracking hook for Next.js
 *
 * Tracks pageviews and user activity for analytics including:
 * - Unique visitors
 * - Total pageviews
 * - Bounce rate
 * - Average session duration
 *
 * @param additionalProperties - Optional additional properties to include with the pageview event
 *
 * @example
 * ```tsx
 * // Basic usage
 * usePageTracking();
 *
 * // With additional properties for blog index
 * usePageTracking({ 
 *   page_type: 'blog_index',
 *   tenant_uuid: tenant.uuid 
 * });
 *
 * // With additional properties for post detail
 * usePageTracking({ 
 *   page_type: 'blog_post',
 *   tenant_uuid: tenant.uuid,
 *   post_uuid: post.uuid 
 * });
 * ```
 */
export function usePageTracking(additionalProperties?: Record<string, any>) {
  const posthog = usePostHog();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Only track if PostHog is available and initialized
    if (!posthog || typeof window === 'undefined') return;

    /**
     * Captures a pageview event with standard tracking properties
     */
    const capturePageview = () => {
      // Get subdomain from hostname (e.g., user1.nashra.ai -> user1)
      const hostname = window.location.hostname;
      const subdomain = hostname.split('.')[0];

      // Build tracking properties
      const properties = {
        path: pathname,
        subdomain: hostname,
        subdomain_name: subdomain,
        referrer: document.referrer || null,
        url: window.location.href,
        title: document.title,
        search: searchParams?.toString() || '',
        ...additionalProperties,
      };

      // Capture the pageview event
      posthog.capture('pageview', properties);

      // Also update PostHog's internal pageview tracking
      // This helps with their built-in analytics features
      posthog.capture('$pageview', properties);
    };

    // Capture pageview on initial mount and when path changes
    capturePageview();
  }, [posthog, pathname, searchParams, additionalProperties]);
}

/**
 * Hook to track custom events
 * 
 * @example
 * ```tsx
 * const { trackEvent } = useTrackEvent();
 * trackEvent('button_clicked', { button_name: 'subscribe' });
 * ```
 */
export function useTrackEvent() {
  const posthog = usePostHog();

  const trackEvent = (eventName: string, properties?: Record<string, any>) => {
    if (!posthog || typeof window === 'undefined') return;

    const hostname = window.location.hostname;
    const subdomain = hostname.split('.')[0];

    posthog.capture(eventName, {
      subdomain: hostname,
      subdomain_name: subdomain,
      url: window.location.href,
      ...properties,
    });
  };

  return { trackEvent };
}
