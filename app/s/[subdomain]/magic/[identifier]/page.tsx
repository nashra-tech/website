/**
 * Magic Link Subscription Page
 *
 * Standalone subscription page with unique identifier.
 * Route: /{tenant-slug}/magic/{identifier}
 */

import { notFound } from 'next/navigation';
import { getTenantBySlug, getMagicLinkFormByIdentifier } from '@/lib/data';
import { MagicLinkClient } from './magic-link-client';

interface PageProps {
  params: Promise<{
    subdomain: string;
    identifier: string;
  }>;
}

export default async function MagicLinkPage({ params }: PageProps) {
  const { subdomain, identifier } = await params;

  // Fetch tenant data
  const tenant = await getTenantBySlug(subdomain);

  if (!tenant) {
    notFound();
  }

  // Fetch magic link form data
  const form = await getMagicLinkFormByIdentifier(subdomain, identifier);

  if (!form) {
    notFound();
  }

  return <MagicLinkClient form={form} tenant={tenant} />;
}

// Generate metadata for SEO
export async function generateMetadata({ params }: PageProps) {
  const { subdomain, identifier } = await params;

  const tenant = await getTenantBySlug(subdomain);
  const form = await getMagicLinkFormByIdentifier(subdomain, identifier);

  if (!tenant || !form) {
    return {
      title: 'Not Found',
      robots: 'noindex, nofollow',
    };
  }

  const metaTitle = `${form.title} | ${tenant.name}`.substring(0, 60);
  const metaDescription = (form.subtitle ?? '').substring(0, 160);

  return {
    title: metaTitle,
    description: metaDescription,
    robots: 'noindex, nofollow', // Magic link pages should not be indexed
    openGraph: {
      title: metaTitle,
      description: metaDescription,
      type: 'website',
      locale: tenant.website_direction === 'rtl' ? 'ar_AR' : 'en_US',
    },
    twitter: {
      card: 'summary_large_image',
      title: metaTitle,
      description: metaDescription,
    },
  };
}
