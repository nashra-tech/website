'use client';

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Icons } from '@/components/ui/icons';
import { H3 } from "@/components/system-ui/typography";
import { Tenant } from '@/types';
import { useTranslations } from '@/lib/i18n';

interface SubscribeFormProps {
    isPopup?: boolean;
    tenant: Tenant;
    onSubscribe?: () => void;
}

export function SubscribeForm({
    isPopup = false,
    tenant,
    onSubscribe
}: SubscribeFormProps) {
    const [subscribed, setSubscribed] = useState(false);
    const [email, setEmail] = useState('');
    const [processing, setProcessing] = useState(false);
    const [error, setError] = useState('');

    // Get tenant direction settings
    const tenantDirection = tenant.website_direction || 'ltr';
    const isTenantRTL = tenantDirection === 'rtl';
    const tenantLanguage = tenant.website_language || 'en';
    const { t } = useTranslations(tenantLanguage);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!email) {
            setError(t('common.email_required'));
            return;
        }

        setProcessing(true);
        setError('');

        try {
            // Import the API service dynamically to avoid bundling in server components
            const { subscribeToNewsletter } = await import('@/lib/api');

            await subscribeToNewsletter(tenant.slug, email);

            setEmail('');
            setSubscribed(true);
            onSubscribe?.();
        } catch (err: any) {
            // Handle specific API errors
            if (err?.getUserMessage) {
                setError(err.getUserMessage());
            } else {
                setError(t('common.subscription_error'));
            }
        } finally{
            setProcessing(false);
        }
    };

    // Show success message for popup
    if (subscribed && isPopup) {
        return (
            <div className="flex flex-col items-center justify-center text-center p-3">
                <div className="mb-4 flex h-6 w-6 items-center justify-center rounded-full bg-green-600">
                    <Icons.check className="h-4 w-4 text-white" />
                </div>
                <H3 className="text-lg font-medium mb-2">
                    {t('common.subscription_success')}
                </H3>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} dir={tenantDirection}>
            <div className="relative max-w-sm rounded-lg bg-base-50 dark:bg-base-800 dark:text-base-400">
                <Input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className={`${error ? 'border-destructive' : ''} ${isTenantRTL ? 'text-right' : 'text-left'} h-10 rounded-lg border-gray-300 dark:border-base-800 dark:bg-base-800 dark:text-base-400`}
                    placeholder={t('common.email_placeholder')}
                    required
                    dir={tenantDirection}
                />
                <Button
                    type="submit"
                    disabled={processing}
                    onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                        if (subscribed) {
                            e.preventDefault();
                            return;
                        }
                        handleSubmit(e);
                    }}
                    size="sm"
                    className={`absolute top-1/2 -translate-y-1/2 ${isTenantRTL ? 'left-1' : 'right-1'} h-8 px-4 font-normal text-xs ${
                        subscribed
                            ? 'bg-green-600 hover:bg-green-600 text-white'
                            : 'bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200'
                    }`}
                >
                    {processing ? (
                        <Icons.spinner className="h-4 w-4 animate-spin" />
                    ) : subscribed ? (
                        <>
                            <Icons.check className="h-4 w-4 mr-1" />
                            {t('common.subscribed')}
                        </>
                    ) : (
                        t('common.subscribe')
                    )}
                </Button>
            </div>

            {error && <p className="text-destructive text-sm mt-2 text-center">{error}</p>}
        </form>
    );
}
