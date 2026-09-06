import { cn } from "@/lib/utils";

interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-lg bg-surface-container-high",
        className
      )}
      aria-hidden="true"
    />
  );
}

export function RoomCardSkeleton() {
  return (
    <div className="bg-surface-container-lowest rounded-xl overflow-hidden shadow-level-1">
      <Skeleton className="h-48 rounded-none" />
      <div className="p-lg flex flex-col gap-md">
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-10 w-full mt-sm" />
      </div>
    </div>
  );
}
