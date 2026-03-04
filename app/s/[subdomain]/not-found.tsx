/**
 * Tenant 404 Not Found Page
 *
 * Tenant-aware 404 — uses the blog's language, direction, and logo.
 */

import { headers } from 'next/headers';
import { getTenantBySlug } from '@/lib/data';
import { getTranslations } from '@/lib/i18n';
import { ErrorLayout } from '@/components/layouts/error-layout';

async function getSubdomain(): Promise<string | null> {
  const headersList = await headers();
  const host = headersList.get('host') || '';
  const hostname = host.split(':')[0];

  // Local development
  if (hostname.includes('localhost') || hostname.includes('127.0.0.1')) {
    if (hostname.includes('.localhost')) {
      return hostname.split('.')[0];
    }
    return null;
  }

  const rootDomain = (process.env.NEXT_PUBLIC_ROOT_DOMAIN || 'localhost:3000').split(':')[0];

  // Vercel preview
  if (hostname.includes('---') && hostname.endsWith('.vercel.app')) {
    const parts = hostname.split('---');
    return parts.length > 0 ? parts[0] : null;
  }

  // Nashra subdomain
  if (
    hostname !== rootDomain &&
    hostname !== `www.${rootDomain}` &&
    hostname.endsWith(`.${rootDomain}`)
  ) {
    return hostname.replace(`.${rootDomain}`, '');
  }

  // Custom domain
  if (hostname !== rootDomain && hostname !== `www.${rootDomain}`) {
    return hostname;
  }

  return null;
}

export default async function TenantNotFound() {
  const subdomain = await getSubdomain();
  const tenant = subdomain ? await getTenantBySlug(subdomain) : null;

  if (!tenant) {
    return (
      <ErrorLayout
        code="404"
        message="This page doesn't exist."
      />
    );
  }

  const translations = getTranslations(tenant.website_language || 'en');

  return (
    <ErrorLayout
      code="404"
      message={translations.errors.page_not_found}
      homeLinkText={translations.errors.back_to_home}
      showHomeLink={true}
      tenant={tenant}
    />
  );
}
