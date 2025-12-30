import React from 'react';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/ui/icons';
import { router } from '@inertiajs/react';

interface WebsitePaginationProps {
    currentPage: number;
    totalPages: number;
    perPage: number;
    total: number;
    from: number;
    to: number;
    tenantDirection?: string;
}

export function WebsitePagination({ 
    currentPage, 
    totalPages, 
    perPage,
    total,
    from,
    to,
    tenantDirection = 'ltr'
}: WebsitePaginationProps) {
    // Don't render if there are no posts or only 1 page
    if (total === 0 || totalPages <= 1) {
        return null;
    }

    const isRTL = tenantDirection === 'rtl';

    // Generate page numbers to display
    const getPageNumbers = () => {
        const pages = [];
        const maxVisiblePages = 5;
        
        if (totalPages <= maxVisiblePages) {
            // Show all pages if total is small
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            // Always show first page
            pages.push(1);
            
            if (currentPage > 3) {
                pages.push('...');
            }
            
            // Show pages around current page
            const start = Math.max(2, currentPage - 1);
            const end = Math.min(totalPages - 1, currentPage + 1);
            
            for (let i = start; i <= end; i++) {
                if (!pages.includes(i)) {
                    pages.push(i);
                }
            }
            
            if (currentPage < totalPages - 2) {
                pages.push('...');
            }
            
            // Always show last page
            if (!pages.includes(totalPages)) {
                pages.push(totalPages);
            }
        }
        
        return pages;
    };

    const pageNumbers = getPageNumbers();

    const handlePageChange = (page: number) => {
        const url = new URL(window.location.href);
        const params = new URLSearchParams(url.search);
        
        if (page === 1) {
            params.delete('page');
        } else {
            params.set('page', String(page));
        }
        
        const newUrl = params.toString() ? `${url.pathname}?${params.toString()}` : url.pathname;
        router.visit(newUrl);
    };

    return (
        <div className="flex justify-end mt-12 mb-2" dir={tenantDirection}>
            <div className="flex items-center gap-1">
                {/* Previous button */}
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage <= 1}
                    className="px-3 py-2 bg-base-100 hover:text-gray-700 disabled:opacity-25 disabled:cursor-not-allowed"
                >
                    <Icons.chevronLeft className="h-4 w-4" />
                </Button>

                {/* Page numbers */}
                {pageNumbers.map((page, index) => {
                    if (page === '...') {
                        return (
                            <span key={`ellipsis-${index}`} className="px-3 py-2 text-gray-400">
                                ...
                            </span>
                        );
                    }

                    const isCurrentPage = page === currentPage;
                    return (
                        <Button
                            key={page}
                            variant={isCurrentPage ? "default" : "ghost"}
                            size="sm"
                            onClick={() => handlePageChange(page as number)}
                            className={`px-3 py-2 min-w-[36px] ${
                                isCurrentPage 
                                    ? "bg-base-100 text-primary hover:bg-base-100" 
                                    : "text-gray-500 hover:text-gray-700 hover:bg-base-100"
                            }`}
                        >
                            {page}
                        </Button>
                    );
                })}

                {/* Next button */}
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage >= totalPages}
                    className="px-3 py-2 bg-base-100  hover:text-gray-700 disabled:opacity-25 disabled:cursor-not-allowed"
                >
                    <Icons.chevronRight className="h-4 w-4" />
                </Button>
            </div>
        </div>
    );
}
