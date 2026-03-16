'use client';

import React, { useEffect, useState } from 'react';
import type { PostHog } from 'posthog-js';

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  const [client, setClient] = useState<PostHog | null>(null);

  useEffect(() => {
    const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;
    if (!key) return;

    const host = process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://us.i.posthog.com';

    import('posthog-js').then(({ default: posthog }) => {
      posthog.init(key, {
        api_host: host,
        capture_pageview: false,
        capture_pageleave: true,
      });
      setClient(posthog);
    });
  }, []);

  if (!client) {
    return <>{children}</>;
  }

  // Lazy-load the React provider only when PostHog is initialized
  const PHProvider = React.lazy(() =>
    import('posthog-js/react').then((mod) => ({ default: mod.PostHogProvider }))
  );

  return (
    <React.Suspense fallback={children}>
      <PHProvider client={client}>{children}</PHProvider>
    </React.Suspense>
  );
}
