'use client';
import { Skeleton } from '@nextui-org/react';

export function SkeletonPage() {
    return (
        <div className='space-y-5 mb-5 md:w-2/3 w-full mx-auto py-5'>
            <Skeleton className="h-8 w-36 rounded-small border border-neutral-300" />
            <Skeleton className="h-28 w-full rounded-small border border-neutral-300" />
            <Skeleton className="h-40 w-full rounded-small border border-neutral-300" />
            <Skeleton className="h-80 w-full rounded-small border border-neutral-300" />
            <Skeleton className="h-96 w-full rounded-small border border-neutral-300" />
            <Skeleton className="h-60 w-full rounded-small border border-neutral-300" />
        </div>
    );
}
