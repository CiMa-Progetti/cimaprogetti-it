"use client";

import Image from "next/image";
import React, { useState } from "react";
import { useIntersectionObserver } from "./hooks/useIntersectionObserver";
import { SkeletonWave } from "./Skeleton";

interface OptimizedImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  priority?: boolean;
  className?: string;
  objectFit?: "contain" | "cover" | "fill" | "scale-down";
  lazy?: boolean;
}

export const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  width,
  height,
  priority = false,
  className = "",
  objectFit = "cover",
  lazy = true,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [ref, isVisible] = useIntersectionObserver({
    threshold: 0.1,
    rootMargin: "50px",
  });

  if (!lazy || priority) {
    return (
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        priority={priority}
        className={className}
        style={{ objectFit }}
        onLoadingComplete={() => setIsLoaded(true)}
      />
    );
  }

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      {!isVisible ? (
        <SkeletonWave width="100%" height={`${height}px`} />
      ) : (
        <>
          {!isLoaded && (
            <div className="absolute inset-0">
              <SkeletonWave width="100%" height={`${height}px`} />
            </div>
          )}
          <Image
            src={src}
            alt={alt}
            width={width}
            height={height}
            className={`${className} ${isLoaded ? "opacity-100" : "opacity-0"} transition-opacity duration-300`}
            style={{ objectFit }}
            onLoadingComplete={() => setIsLoaded(true)}
          />
        </>
      )}
    </div>
  );
};
