import type { Metadata } from 'next';
import { Suspense } from 'react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { PostHogProvider } from '@/contexts/posthog-provider';
import { NavigationProgress } from '@/components/navigation-progress';
import './globals.css';

export const metadata: Metadata = {
  title: 'Multi-Tenant Blog Platform',
  description: 'Next.js multi-tenant blog platform with shadcn/ui.'
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');var d=t==='dark'||(t!=='light'&&matchMedia('(prefers-color-scheme:dark)').matches);if(d)document.documentElement.classList.add('dark')}catch(e){}})()`,
          }}
        />
      </head>
      <body className="font-sans antialiased">
        <Suspense>
          <NavigationProgress />
        </Suspense>
        <PostHogProvider>
          {children}
        </PostHogProvider>
        <SpeedInsights />
      </body>
    </html>
  );
}
