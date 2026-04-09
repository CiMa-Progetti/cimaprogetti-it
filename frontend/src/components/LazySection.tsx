"use client";

import React from "react";
import { useIntersectionObserver } from "./hooks/useIntersectionObserver";
import { SkeletonWave } from "./Skeleton";

interface LazySectionProps {
  children: React.ReactNode;
  skeleton?: React.ReactNode;
  className?: string;
  skeletonHeight?: string;
  skeletonCount?: number;
  threshold?: number;
  rootMargin?: string;
}

export const LazySection: React.FC<LazySectionProps> = ({
  children,
  skeleton,
  className = "",
  skeletonHeight = "100px",
  skeletonCount = 3,
  threshold = 0.1,
  rootMargin = "50px",
}) => {
  const [ref, isVisible] = useIntersectionObserver({
    threshold,
    rootMargin,
    triggerOnce: true,
  });

  const defaultSkeleton = (
    <div className="space-y-4">
      {Array.from({ length: skeletonCount }).map((_, i) => (
        <SkeletonWave key={i} height={skeletonHeight} />
      ))}
    </div>
  );

  return (
    <div ref={ref} className={className}>
      {!isVisible ? skeleton || defaultSkeleton : children}
    </div>
  );
};
