import { Skeleton } from '@/components/ui/skeleton'

/**
 * MemberCardSkeleton for loading states
 */
export default function MemberCardSkeleton() {
  return (
    <div className="flex-1 min-w-[250px] max-w-sm bg-secondary-base/25 rounded-xl shadow-md p-4 flex flex-col items-center text-center">
      <Skeleton className="h-24 w-24 rounded-full mb-4" />
      <Skeleton className="h-5 w-40 mb-2" />
      <Skeleton className="h-4 w-32" />
      <div className="flex gap-3 mt-4">
        <Skeleton className="h-6 w-6 rounded-full" />
        <Skeleton className="h-6 w-6 rounded-full" />
        <Skeleton className="h-6 w-6 rounded-full" />
        <Skeleton className="h-6 w-6 rounded-full" />
      </div>
    </div>
  )
}
