import { Skeleton, SkeletonCard } from "../ui/Skeleton.jsx";
import { cn } from "../../utils/cn.js";

export function ProductSkeleton({ className }) {
  return <SkeletonCard className={className} />;
}

export function ProductGridSkeleton({ count = 8, className }) {
  return (
    <div className={cn("grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6 lg:grid-cols-4", className)}>
      {Array.from({ length: count }).map((_, i) => (
        <ProductSkeleton key={i} />
      ))}
    </div>
  );
}

export function CategoryGridSkeleton({ count = 4, className }) {
  return (
    <div className={cn("grid grid-cols-2 gap-4 md:grid-cols-4", className)}>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="space-y-3">
          <Skeleton className="aspect-[4/3] w-full rounded-lg" />
          <Skeleton className="h-4 w-2/3" />
        </div>
      ))}
    </div>
  );
}

export function ProductDetailSkeleton({ className }) {
  return (
    <div className={cn("grid gap-8 lg:grid-cols-2", className)}>
      <Skeleton className="aspect-square w-full rounded-lg" />
      <div className="space-y-4">
        <Skeleton className="h-8 w-3/4" />
        <Skeleton className="h-6 w-1/3" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
        <Skeleton className="mt-6 h-12 w-full" />
      </div>
    </div>
  );
}
