/**
 * WebsiteFooter Component
 *
 * Footer with subscription form, social links, and footer text.
 * Matches Figma design: subscribe section + footer row (footer_text left, social icons right).
 */

'use client';

import { Tenant } from '@/types';
import { SubscribeForm } from './subscribe-form';
import { PoweredByNashra } from './powered-by-nashra';
import { useTranslations } from '@/lib/i18n';
import { getSocialPlatformByName } from '@/lib/data/social-links';
import { Icons } from '../ui/icons';

interface WebsiteFooterProps {
  tenant: Tenant;
}

export function WebsiteFooter({ tenant }: WebsiteFooterProps) {
  const tenantDirection = tenant.website_direction || 'ltr';
  const isTenantRTL = tenantDirection === 'rtl';
  const tenantLanguage = tenant.website_language || 'en';
  const { t } = useTranslations(tenantLanguage);

  return (
    <footer className="p-3 sm:p-0">
      <section className="pt-16 pb-0 mb-0 sm:pb-6 sm:mb-3 bg-white relative font-sans dark:bg-neutral-900">
        {/* Fixed Badge at Bottom Right */}
        {tenant.show_branding && (
          <div className={`fixed bottom-4 z-50 ${isTenantRTL ? 'left-4' : 'right-4'}`}>
            <PoweredByNashra
              isRtl={isTenantRTL}
              translations={{ made_with: t('common.powered_by') }}
              clickable={true}
            />
          </div>
        )}

        <div className="max-w-[560px] mx-auto">
          {/* Subscription Form Section */}
          <div className="mb-3" dir={tenantDirection}>
            <p className="text-[17px] font-medium leading-[1.2] tracking-tight text-black dark:text-white">
              {t('newsletter.title')}
            </p>
            <p className="text-[17px] font-medium leading-[1.2] tracking-tight text-neutral-500 dark:text-base-400">
              {t('newsletter.subtitle')}
            </p>
          </div>

          <div className="mb-3">
            <SubscribeForm tenant={tenant} />
          </div>

          {/* Desktop Layout - Footer Text and Social Links */}
          <div className="hidden sm:flex justify-between items-center">
            {tenant.footer_data.footer_text ? (
              <div
                className="text-neutral-500 dark:text-base-400 text-xs [&_a]:underline [&_a]:text-neutral-500 dark:[&_a]:text-base-400 [&_a]:hover:text-neutral-700 dark:[&_a]:hover:text-base-200 [&_p]:m-0"
                dangerouslySetInnerHTML={{ __html: tenant.footer_data.footer_text }}
              />
            ) : (
              <div />
            )}
            <div className="flex items-center gap-3">
              {tenant.footer_data.social_links &&
                tenant.footer_data.social_links.length > 0 &&
                tenant.footer_data.social_links.map((link, index) => {
                  const iconName = getSocialPlatformByName(link.name)?.icon as keyof typeof Icons;
                  const Icon = Icons[iconName];
                  return (
                    <a
                      key={index}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="opacity-60 hover:opacity-100 transition-opacity flex-shrink-0"
                      title={link.name}
                    >
                      {Icon ? <Icon className="w-5 h-5" /> : null}
                    </a>
                  );
                })}
            </div>
          </div>

          {/* Mobile Layout - Centered */}
          <div className="sm:hidden text-center px-4 py-6 space-y-4">
            {tenant.footer_data.social_links &&
              tenant.footer_data.social_links.length > 0 && (
                <div className="flex justify-center items-center gap-4 flex-wrap">
                  {tenant.footer_data.social_links.map((link, index) => {
                    const iconName = getSocialPlatformByName(link.name)?.icon as keyof typeof Icons;
                    const Icon = Icons[iconName];
                    return (
                      <a
                        key={index}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="opacity-60 hover:opacity-100 transition-opacity flex-shrink-0"
                        title={link.name}
                      >
                        {Icon ? <Icon className="w-5 h-5" /> : null}
                      </a>
                    );
                  })}
                </div>
              )}

            {tenant.footer_data.footer_text && (
              <div
                className="text-neutral-500 dark:text-base-400 text-xs [&_a]:underline [&_a]:text-neutral-500 dark:[&_a]:text-base-400 [&_a]:hover:text-neutral-700 dark:[&_a]:hover:text-base-200 [&_p]:m-0"
                dangerouslySetInnerHTML={{ __html: tenant.footer_data.footer_text }}
              />
            )}
          </div>
        </div>
      </section>
    </footer>
  );
}
