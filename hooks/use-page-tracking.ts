'use client';

import { useEffect } from 'react';
import { usePostHog } from 'posthog-js/react';
import { usePathname } from 'next/navigation';

/**
 * PostHog page tracking hook for Next.js
 *
 * Tracks pageviews for analytics (unique visitors, total pageviews,
 * bounce rate, average session duration).
 *
 * @param additionalProperties - Stable (memoized) object of extra properties
 */
export function usePageTracking(additionalProperties?: Record<string, any>) {
  const posthog = usePostHog();
  const pathname = usePathname();

  useEffect(() => {
    if (!posthog || typeof window === 'undefined') return;

    const hostname = window.location.hostname;
    const subdomain = hostname.split('.')[0];

    posthog.capture('$pageview', {
      path: pathname,
      subdomain: hostname,
      subdomain_name: subdomain,
      referrer: document.referrer || null,
      url: window.location.href,
      title: document.title,
      search: window.location.search,
      ...additionalProperties,
    });
  }, [posthog, pathname, additionalProperties]);
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
