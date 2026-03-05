import React from 'react';

interface PoweredByNashraProps {
    className?: string;
    isRtl?: boolean;
    translations?: {
        made_with?: string;
        [key: string]: any;
    };
    clickable?: boolean;
    variant?: 'badge' | 'inline';
}

function NashraLogoIcon({ className = '' }: { className?: string }) {
    return (
        <svg width="11" height="11" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
            <path fillRule="evenodd" clipRule="evenodd" d="M11.2999 5.98767V11.6257L10.8763 11.2089C10.6433 10.9797 9.72897 10.0694 8.84445 9.18611C7.95993 8.30283 6.87936 7.22525 6.4431 6.79146L5.64993 6.00275V8.82609V11.6495H2.82497H0V6.01515V0.380827L0.249814 0.618037C0.387195 0.748491 1.23281 1.58732 2.12894 2.48208C3.0251 3.37683 4.17904 4.52841 4.69327 5.04112L5.6282 5.97334L5.63937 3.16147L5.65059 0.349609H8.4752H11.2999V5.98767Z" fill="currentColor"/>
        </svg>
    );
}

export function PoweredByNashra({
    className = "",
    isRtl = false,
    translations = {},
    clickable = true,
    variant = 'badge'
}: PoweredByNashraProps) {
    const poweredByText = translations.made_with || 'Powered by';

    const baseStyles = variant === 'badge'
        ? `inline-flex items-center gap-2 px-3 py-2 border bg-white dark:bg-neutral-800 border-[#E5E5E5] dark:border-neutral-700 rounded-[4px] text-[13px] leading-4 text-[#737373] dark:text-neutral-400`
        : `inline-flex items-center gap-1.5 text-xs text-muted-foreground`;

    const content = (
        <div
            dir={isRtl ? 'rtl' : 'ltr'}
            className={`${baseStyles} ${className}`}
        >
            <span>{poweredByText}</span>
            <span dir="ltr" className="inline-flex items-center gap-[2.8px]">
                <NashraLogoIcon className="text-black dark:invert" />
                <span className="font-medium text-black dark:text-neutral-200">Nashra</span>
            </span>
        </div>
    );

    if (!clickable) {
        return content;
    }

    return (
        <a
            href="https://nashra.ai"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block transition-opacity hover:opacity-80"
        >
            {content}
        </a>
    );
}
