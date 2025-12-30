import React, { useState, useEffect, useRef } from "react";
import { Link } from "@inertiajs/react";
import SubscribeForm from "@/components/website/subscribe-form";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/system-ui/Dialog";
import { Toaster } from "sonner";
import { useTranslations } from "@/hooks/use-translations";
import { ThemeProvider, useTheme } from "@/contexts/theme-context";
import { Icons } from "@/components/ui/icons";
import { Small } from "@/components/system-ui/typography";
import { AppAvatar } from "@/components/ui/app-avatar";


interface WebsiteLayoutProps {
    children: React.ReactNode;
    tenant: any;
    width?: string;
    has_paid_subscription: boolean;
}

// Logo with tenant name component using AppAvatar
function LogoWithName({ tenant, isRTL }: { tenant: any; isRTL: boolean }) {
    return (
        <div className={`flex items-center gap-2 sm:gap-3`}>
            <AppAvatar
                src={tenant.logo}
                name={tenant.name}
                alt={tenant.name}
                className="size-8"
            />
            <span className="text-sm sm:text-base text-primary font-medium dark:text-gray-100 hidden sm:block">
                {tenant.name}
            </span>
        </div>
    );
}

// Theme Toggle Dropdown Component
function ThemeToggleDropdown() {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const { theme, setTheme } = useTheme();
    const { t } = useTranslations();

    const themes = [
        { id: "light", name: t('day_mode', 'Day Mode'), icon: Icons.sun },
        { id: "dark", name: t('night_mode', 'Night Mode'), icon: Icons.moon },
        { id: "system", name: t('auto_mode', 'Auto Mode'), icon: Icons.sun }
    ] as const;

    const currentTheme = themes.find(t => t.id === theme);
    const CurrentIcon = currentTheme?.icon || Icons.sun;

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <Button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            variant="outline"
            className="flex items-center !p-2 size-8 rounded-md hover:bg-gray-100 dark:hover:bg-base-800 transition-colors border-gray-300 dark:border-gray-600 bg-white dark:bg-base-900"
        >
            <CurrentIcon className="w-4 h-4 text-gray-600 dark:text-gray-300" />
        </Button>
    );
}

const WebsiteLayout: React.FC<WebsiteLayoutProps> = ({ children, tenant, width = '560px' }) => {
    const [open, setOpen] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const { t, isRTL } = useTranslations();

    // Get tenant direction settings
    const tenantDirection = tenant.website_direction || 'ltr';

    return (
        <ThemeProvider>
            <div
                className="min-h-[600px] flex flex-col bg-white dark:bg-neutral-900 transition-colors font-sans"
                dir={tenantDirection}
            >
                {/* Header */}
                <header className="py-2 sm:py-3 border-b border-gray-100 dark:border-base-800 ">
                    <div className={`container mx-auto px-3 sm:px-0 max-w-[${width}] mx-auto`}>
                        <div className="flex items-center justify-between">
                            <Link href={'/'}>
                                <div className="flex items-center">
                                    <LogoWithName tenant={tenant} isRTL={isRTL} />
                                </div>
                            </Link>

                            <div className="flex items-center gap-2 sm:gap-3">
                                {/* <ThemeToggleDropdown /> */}
                                <Dialog open={open} onOpenChange={setOpen}>
                                    <DialogTrigger asChild>
                                        <Button className="px-3 sm:px-4 bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 text-xs !font-normal" size="sm" variant="default">
                                            {t('subscribe_button', 'Subscribe')}
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent className="sm:max-w-[390px] p-0 sm:p-0 px-3 sm:px-3   border  dark:border-base-800 " showCloseButton={!showSuccess} dir={tenantDirection}>
                                        {!showSuccess && (
                                            <>
                                                <DialogHeader className="">

                                                </DialogHeader>
                                                <div>
                                                    {/* Start Form Section */}
                                                    <div className="mb-3">
                                                        <h2 className="text-md text-primary font-medium text-gray-900 dark:text-white">
                                                            {t('subscribe_description', 'Get the latest articles')}
                                                        </h2>
                                                        <p className="text-md font-medium text-neutral-500 dark:text-gray-300">
                                                            {t('directly_in_email', 'Delivered to your inbox')}
                                                        </p>
                                                    </div>
                                                </div>
                                            </>
                                        )}

                                        <div className="mb-3">
                                            <SubscribeForm
                                                isPopup={true}
                                                tenant={tenant}
                                                onSubscribeSuccess={() => {
                                                    // Just close the dialog when "Back to Blog" is clicked
                                                    setOpen(false);
                                                    setShowSuccess(false);
                                                }}
                                                onSubscribe={() => {
                                                    // Hide header when subscribed
                                                    setShowSuccess(true);
                                                }}
                                            />
                                        </div>
                                    </DialogContent>
                                </Dialog>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Main Content */}
                <main className="flex-grow ">
                    <div className={`w-full`}>
                        {children}
                    </div>
                </main>


                <Toaster />
            </div>
        </ThemeProvider>
    );
};

export default WebsiteLayout;
