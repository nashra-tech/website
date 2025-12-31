/**
 * WebsiteFooter Component
 *
 * Footer with subscription form, social links, and tenant info.
 * Matches design from website-footer.tsx
 */

'use client';

import { Tenant } from '@/types';
import { SubscribeForm } from './subscribe-form';
import { PoweredByNashra } from './powered-by-nashra';
import { useTranslations } from '@/lib/i18n';

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
      <section className="py-0 mb-0 sm:py-6 sm:mb-3 bg-white relative font-sans dark:bg-neutral-900 border-t border-gray-100 dark:border-base-800">
        {/* Fixed Badge at Bottom Right */}
        {!tenant.has_paid_subscription && (
          <div className={`fixed bottom-4 z-50 ${isTenantRTL ? 'left-4' : 'right-4'}`}>
            <PoweredByNashra
              isRtl={isTenantRTL}
              translations={{ made_with: 'Powered by' }}
              clickable={true}
              className="opacity-80 hover:opacity-100 transition-opacity"
            />
          </div>
        )}

        <div className="max-w-[560px] mx-auto">
          <div>
            {/* Subscription Form Section */}
            <div className="mb-4 sm:mt-0 mt-4" dir={tenantDirection}>
              <h2 className="text-md text-primary font-medium text-gray-900 dark:text-white">
                {t('newsletter.title')}
              </h2>
              <p className="text-md font-medium text-neutral-500 dark:text-base-400">
                {t('newsletter.subtitle')}
              </p>
            </div>

            <div className="mb-3">
              <SubscribeForm tenant={tenant} />
            </div>

            {/* Desktop Layout - Copyright and Social Links */}
            <div className="hidden sm:flex justify-between items-center">
              <div className="text-neutral-500 dark:text-base-400 text-xs">
                {tenant.footer_data.physical_address}
              </div>
              <div className="flex items-center gap-3">
                {tenant.footer_data.social_links &&
                  tenant.footer_data.social_links.length > 0 &&
                  tenant.footer_data.social_links.map((link, index) => (
                    <a
                      key={index}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="opacity-60 hover:opacity-100 transition-opacity flex-shrink-0"
                      title={link.name}
                    >
                      <img
                        src={`/images/socials/${link.name.toLowerCase()}.png`}
                        alt={link.name}
                        className="w-5 h-5"
                      />
                    </a>
                  ))}
              </div>
            </div>

            {/* Mobile Layout - Centered */}
            <div className="sm:hidden text-center px-4 py-6 space-y-4">
              {tenant.footer_data.social_links &&
                tenant.footer_data.social_links.length > 0 && (
                  <div className="flex justify-center items-center gap-4 flex-wrap">
                    {tenant.footer_data.social_links.map((link, index) => (
                      <a
                        key={index}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="opacity-60 hover:opacity-100 transition-opacity flex-shrink-0"
                        title={link.name}
                      >
                        <img
                          src={`/images/socials/${link.name.toLowerCase()}.png`}
                          alt={link.name}
                          className="w-5 h-5"
                        />
                      </a>
                    ))}
                  </div>
                )}

              <div className="text-center">
                <p className="text-neutral-500 dark:text-base-400 text-sm">
                  ©{new Date().getFullYear()} {tenant.name} - All rights reserved
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </footer>
  );
}
