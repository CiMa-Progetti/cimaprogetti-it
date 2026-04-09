"use client";

import { useEffect, useRef, useState } from "react";

interface UseIntersectionObserverOptions {
  threshold?: number | number[];
  rootMargin?: string;
  triggerOnce?: boolean;
}

export const useIntersectionObserver = (
  options: UseIntersectionObserverOptions = {}
): [React.RefObject<HTMLDivElement>, boolean] => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);

  const {
    threshold = 0.1,
    rootMargin = "50px",
    triggerOnce = true,
  } = options;

  useEffect(() => {
    const currentElement = ref.current;

    if (!currentElement) return;

    // If already visible and triggerOnce is true, don't set up observer
    if (hasTriggered && triggerOnce) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          setHasTriggered(true);

          if (triggerOnce) {
            observer.unobserve(currentElement);
          }
        } else if (!triggerOnce) {
          setIsVisible(false);
        }
      },
      {
        threshold,
        rootMargin,
      }
    );

    observer.observe(currentElement);

    return () => {
      observer.unobserve(currentElement);
    };
  }, [threshold, rootMargin, triggerOnce, hasTriggered]);

  return [ref as any, isVisible];
};

interface UseLazyLoadProps {
  threshold?: number;
  rootMargin?: string;
}

export const useLazyLoad = (
  options: UseLazyLoadProps = {}
): [React.RefObject<HTMLDivElement>, boolean, boolean] => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const { threshold = 0.1, rootMargin = "50px" } = options;

  useEffect(() => {
    const currentElement = ref.current;

    if (!currentElement) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Simulate loading time
          setTimeout(() => {
            setIsLoading(false);
          }, 300);

          observer.unobserve(currentElement);
        }
      },
      {
        threshold,
        rootMargin,
      }
    );

    observer.observe(currentElement);

    return () => {
      observer.unobserve(currentElement);
    };
  }, [threshold, rootMargin]);

  return [ref as any, isVisible, isLoading];
};
