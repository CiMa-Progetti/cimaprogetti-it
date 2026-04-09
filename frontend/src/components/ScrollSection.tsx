"use client";
import React, { forwardRef } from "react";

interface ScrollSectionProps {
  id?: string;
  className?: string;
  children: React.ReactNode;
  isLast?: boolean;
}

const ScrollSection = forwardRef<HTMLElement, ScrollSectionProps>(
  ({ id, className = "", children, isLast = false }, ref) => {
    return (
      <section
        ref={ref}
        id={id}
        data-pin-section
        {...(isLast ? { "data-pin-last": true } : {})}
        className={`min-h-screen flex items-center justify-center px-6 lg:px-8 relative overflow-hidden ${className}`}
        style={{ willChange: "transform" }}
      >
        {children}
      </section>
    );
  }
);

ScrollSection.displayName = "ScrollSection";
export default ScrollSection;
