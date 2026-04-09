"use client";
import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function useGsapScrollTrigger() {
  useEffect(() => {
    // Refresh ScrollTrigger after layout settles
    const timeout = setTimeout(() => ScrollTrigger.refresh(), 100);

    const onLoad = () => ScrollTrigger.refresh();
    window.addEventListener("load", onLoad);

    return () => {
      clearTimeout(timeout);
      window.removeEventListener("load", onLoad);
    };
  }, []);
}
