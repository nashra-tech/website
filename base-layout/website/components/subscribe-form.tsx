import React, { useState } from "react";
import { Button } from "@/components/system-ui/Button";
import { Input } from "@/components/ui/input";
import { useForm } from "@inertiajs/react";
import { toast } from "sonner";
import { Icons } from '@/components/ui/icons';
import { useTranslations } from "@/hooks/use-translations";
import { H3 } from "../system-ui/typography";

interface SubscribeFormProps {
    isPopup?: boolean;
    tenant: any;
    className?: string;
    onSubscribeSuccess?: () => void;
    onSubscribe?: () => void;
}

const SubscribeForm: React.FC<SubscribeFormProps> = ({ isPopup = false, tenant, onSubscribeSuccess, onSubscribe }) => {
    const [subscribed, setSubscribed] = useState(false);
    const { t } = useTranslations();
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        name: '',
        tenant_id: tenant.id
    });

    // Get tenant direction settings
    const tenantDirection = tenant.website_direction || 'ltr';
    const isTenantRTL = tenantDirection === 'rtl';

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Try different route names based on what's available
        let routeName = 'website.subscribe';
        try {
            route(routeName);
        } catch {
            routeName = 'website.subscribe';
        }

        post(route(routeName, { slug: tenant.slug }), {
            onSuccess: () => {
                reset('email', 'name');
                if (!isPopup) {
                    toast.success(t('subscribe_success', 'Subscribed successfully'));
                }
                setSubscribed(true);
                onSubscribe?.();
            },
        });
    };



    // Show success message for popup
    if (subscribed && isPopup) {
        return (
            <div className="flex flex-col items-center justify-center text-center p-3">
                <div className="mb-4 flex h-6 w-6 items-center justify-center rounded-full bg-green-600">
                    <Icons.check className="h-4 w-4 text-white" />
                </div>
                <H3 className="text-lg font-medium mb-2">
                    {t('subscribed_title', "You're subscribed!")} 🎉
                </H3>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} dir={tenantDirection}>

            <div className="relative max-w-sm rounded-lg bg-base-50 dark:bg-base-800 dark:text-base-400">
                <Input
                    type="email"
                    value={data.email}
                    onChange={e => setData('email', e.target.value)}
                    className={`${errors.email ? 'border-destructive' : ''} ${isTenantRTL ? 'text-right' : 'text-left'} h-10 rounded-lg border-gray-300 dark:border-base-800 dark:bg-base-800 dark:text-base-400`}
                    placeholder={t('subscribe_placeholder', 'Enter your email address')}
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
                    className={`absolute top-1/2 -translate-y-1/2 ${isTenantRTL ? 'left-1' : 'right-1'} h-8 px-4 font-normal text-xs ${subscribed
                            ? 'bg-green-600 hover:bg-green-600 text-white'
                            : 'bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200'
                        }`}
                >
                    {processing ? (
                        <Icons.spinner className="h-4 w-4 animate-spin" />
                    ) : subscribed ? (
                        <>
                            <Icons.check className="h-4 w-4 mr-1" />
                            {t('subscribed', 'Subscribed')}
                        </>
                    ) : (
                        t('subscribe_button', 'Subscribe')
                    )}
                </Button>
            </div>

            {errors.email && <p className="text-destructive text-sm mt-2 text-center">{errors.email}</p>}
        </form>
    );
};

export default SubscribeForm;
