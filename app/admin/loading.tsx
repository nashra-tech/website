/**
 * Loading State for Admin Dashboard
 *
 * Displays while fetching tenant data.
 */

import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

export default function Loading() {
  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      {/* Header Skeleton */}
      <div className="flex justify-between items-center mb-8">
        <Skeleton className="h-9 w-64" />
        <Skeleton className="h-5 w-32" />
      </div>

      {/* Tenant Grid Skeleton */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <Card key={i}>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <Skeleton className="h-7 w-32" />
                <Skeleton className="h-9 w-9 rounded-md" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <Skeleton className="h-12 w-12 rounded-md" />
                <Skeleton className="h-4 w-28" />
              </div>
              <div className="mt-4">
                <Skeleton className="h-5 w-full" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
