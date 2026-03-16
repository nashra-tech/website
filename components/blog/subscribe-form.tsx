'use client';

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Icons } from '@/components/ui/icons';
import { H3 } from "@/components/system-ui/typography";
import { Tenant } from '@/types';
import { useTranslations } from '@/lib/i18n';
import { ArrowRight } from 'lucide-react';

interface SubscribeFormProps {
    isPopup?: boolean;
    tenant: Tenant;
    onSubscribe?: () => void;
    buttonText?: string;
}

export function SubscribeForm({
    isPopup = false,
    tenant,
    onSubscribe,
    buttonText,
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

    // Theme settings
    const buttonStyle = tenant.button_style || 'filled';
    const buttonVariant = buttonStyle === 'outline' ? 'outline' as const : 'default' as const;

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
            <div className="relative max-w-sm rounded-[var(--blog-radius)] bg-neutral-100 dark:bg-neutral-800">
                <Input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className={`${error ? 'ring-1 ring-destructive' : ''} ${isTenantRTL ? 'text-right' : 'text-left'} h-11 !rounded-[var(--blog-radius)] border-0 bg-transparent placeholder:text-muted-foreground dark:text-neutral-200 transition-shadow duration-200 ease-out focus:ring-2 focus:ring-primary/20`}
                    placeholder={t('common.email_placeholder')}
                    required
                    dir={tenantDirection}
                />
                <Button
                    type="submit"
                    disabled={processing || subscribed}
                    size="sm"
                    variant={subscribed ? undefined : buttonVariant}
                    className={`group absolute top-1/2 -translate-y-1/2 ${isTenantRTL ? 'left-1.5' : 'right-1.5'} h-8 px-4 rounded-[var(--blog-radius)] font-medium text-sm ${
                        subscribed
                            ? 'bg-green-600 hover:bg-green-600 text-white'
                            : ''
                    }`}
                >
                    {processing ? (
                        <Icons.spinner className="h-4 w-4 animate-spin" />
                    ) : subscribed ? (
                        <>
                            <Icons.check className="h-4 w-4 mr-1 animate-in fade-in duration-200" />
                            {t('common.subscribed')}
                        </>
                    ) : (
                        <>
                            {buttonText || t('common.subscribe')}
                            <ArrowRight className="w-4 h-4 rtl:rotate-180 transition-transform duration-200 ease-out group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5" />
                        </>
                    )}
                </Button>
            </div>

            {error && <p className="text-destructive text-sm mt-2 text-center animate-in fade-in slide-in-from-top-1 duration-200">{error}</p>}
        </form>
    );
}
