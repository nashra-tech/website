'use client';

import posthog from 'posthog-js';
import { PostHogProvider as PHProvider } from 'posthog-js/react';
import { useEffect } from 'react';

/**
 * PostHog Provider Component
 * 
 * Initializes PostHog analytics and provides context to the app.
 * This must be used in a client component and wrap the entire app.
 */
export function PostHogProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Only initialize if we have the API key and haven't initialized yet
    const posthogKey = process.env.POSTHOG_KEY;
    const posthogHost = process.env.POSTHOG_HOST || 'https://us.i.posthog.com';

    if (posthogKey && typeof window !== 'undefined') {
      posthog.init(posthogKey, {
        api_host: posthogHost,
        // Capture pageviews manually for better control
        capture_pageview: false,
        // Capture page leaves for session duration tracking
        capture_pageleave: true,
        // Enable session recording if needed
        // disable_session_recording: false,
      });
    }
  }, []);

  return <PHProvider client={posthog}>{children}</PHProvider>;
}
