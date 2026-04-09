"use client";

import React from "react";

interface SkeletonProps {
  width?: string | number;
  height?: string | number;
  className?: string;
  variant?: "text" | "heading" | "rect" | "circle";
  count?: number;
}

export const Skeleton: React.FC<SkeletonProps> = ({
  width = "100%",
  height = "1rem",
  className = "",
  variant = "rect",
  count = 1,
}) => {
  const skeletons = Array.from({ length: count });

  const baseStyles =
    "animate-pulse bg-gradient-to-r from-surface-container via-surface-container-high to-surface-container";

  const variantStyles: Record<string, string> = {
    text: "rounded h-4",
    heading: "rounded h-12 w-full mb-4",
    rect: "rounded",
    circle: "rounded-full",
  };

  const styles = `${baseStyles} ${variantStyles[variant]} ${className}`;

  return (
    <>
      {skeletons.map((_, i) => (
        <div
          key={i}
          className={`${styles} ${i < skeletons.length - 1 ? "mb-3" : ""}`}
          style={{
            width: typeof width === "number" ? `${width}px` : width,
            height: typeof height === "number" ? `${height}px` : height,
          }}
        />
      ))}
    </>
  );
};

interface SkeletonWaveProps {
  width?: string | number;
  height?: string | number;
  className?: string;
}

export const SkeletonWave: React.FC<SkeletonWaveProps> = ({
  width = "100%",
  height = "1rem",
  className = "",
}) => {
  return (
    <div
      className={`relative overflow-hidden rounded bg-surface-container ${className}`}
      style={{
        width: typeof width === "number" ? `${width}px` : width,
        height: typeof height === "number" ? `${height}px` : height,
      }}
    >
      {/* Wave animation using linear-gradient */}
      <div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
        style={{
          animation: "wave 2s infinite",
          backgroundSize: "200% 100%",
        }}
      />
      <style>{`
        @keyframes wave {
          0% {
            backgroundPosition: 200% 0;
          }
          100% {
            backgroundPosition: -200% 0;
          }
        }
      `}</style>
    </div>
  );
};

interface SkeletonContainerProps {
  isLoading: boolean;
  children: React.ReactNode;
  skeleton?: React.ReactNode;
  className?: string;
}

export const SkeletonContainer: React.FC<SkeletonContainerProps> = ({
  isLoading,
  children,
  skeleton,
  className = "",
}) => {
  if (isLoading) {
    return <div className={className}>{skeleton}</div>;
  }

  return <div className={className}>{children}</div>;
};
