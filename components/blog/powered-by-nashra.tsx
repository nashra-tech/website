import React from 'react';

interface PoweredByNashraProps {
    className?: string;
    isRtl?: boolean;
    translations?: {
        made_with?: string;
        [key: string]: any;
    };
    clickable?: boolean;
}

export function PoweredByNashra({
    className = "",
    translations = {},
    isRtl = false,
    clickable = true
}: PoweredByNashraProps) {
    const poweredByText = translations.made_with || 'Powered by';

    const flexDirection = isRtl ? "flex-row" : "flex-row";

    const content = (
        <div
            className={`font-medium inline-flex items-center gap-1.5 px-3 py-2 border bg-primary-foreground rounded-lg shadow-xl text-xs text-gray-600 ${flexDirection} ${className}`}
        >
            <span className='text-foreground'>{poweredByText}</span>
            <span className="font-semibold text-foreground">Nashra</span>
        </div>
    );

    if (!clickable) {
        return content;
    }

    return (
        <a
            href="https://nashra-ai.framer.website"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block transition-opacity hover:opacity-80"
        >
            {content}
        </a>
    );
}
