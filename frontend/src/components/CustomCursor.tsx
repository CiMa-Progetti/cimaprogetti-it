"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

const CURSOR_W = 22;
const CURSOR_H = 22;
const HALF_W = CURSOR_W / 2;
const HALF_H = CURSOR_H / 2;
const CURSOR_RADIUS = "5px";
const HUG_PADDING = 6;
const MIN_BORDER_RADIUS = "100px";
const PULL_STRENGTH = 0.15;
const Z_NORMAL = 9999;

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const phantomRef = useRef<HTMLDivElement>(null);
  const activeTargetRef = useRef<HTMLElement | null>(null);
  const activeTypeRef = useRef<"hug" | "underline" | null>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const isMorphedRef = useRef(false);
  const isSplitRef = useRef(false); // true when underline + block cursor are both visible
  const mouseRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const morphRef = useRef<{
    baseX: number;
    baseY: number;
    centerX: number;
    centerY: number;
  } | null>(null);

  useEffect(() => {
    const hasFinePointer = window.matchMedia("(pointer: fine)").matches;
    const prefersAnimation = window.matchMedia(
      "(prefers-reduced-motion: no-preference)"
    ).matches;

    if (!hasFinePointer || !prefersAnimation || !cursorRef.current || !phantomRef.current) {
      return;
    }

    const cursor = cursorRef.current;
    const phantom = phantomRef.current;

    // --- Helpers ---
    const killTimeline = () => {
      if (timelineRef.current) {
        timelineRef.current.kill();
        timelineRef.current = null;
      }
    };

    const resolveZIndex = (target: HTMLElement): number => {
      let el: HTMLElement | null = target;
      let maxZ = -1;
      while (el) {
        const z = window.getComputedStyle(el).zIndex;
        if (z !== "auto") {
          const parsed = parseInt(z, 10);
          if (parsed > maxZ) maxZ = parsed;
        }
        el = el.parentElement;
      }
      return maxZ >= 0 ? maxZ + 1 : 1;
    };

    const resolveBorderRadius = (target: HTMLElement): string => {
      const style = window.getComputedStyle(target);
      const parsed = parseFloat(style.borderRadius);
      if (!isNaN(parsed) && parsed >= 8) return style.borderRadius;

      const firstChild = target.firstElementChild as HTMLElement | null;
      if (firstChild) {
        const childStyle = window.getComputedStyle(firstChild);
        const childParsed = parseFloat(childStyle.borderRadius);
        if (!isNaN(childParsed) && childParsed >= 4) return childStyle.borderRadius;
      }

      return MIN_BORDER_RADIUS;
    };

    const updateMorphPosition = (instant?: boolean) => {
      const target = activeTargetRef.current;
      const type = activeTypeRef.current;
      if (!target) return;
      if (!isMorphedRef.current && !isSplitRef.current) return;

      if (type === "hug" && isMorphedRef.current) {
        const rect = target.getBoundingClientRect();
        const baseX = rect.left - HUG_PADDING;
        const baseY = rect.top - HUG_PADDING;
        morphRef.current = {
          baseX,
          baseY,
          centerX: rect.left + rect.width / 2,
          centerY: rect.top + rect.height / 2,
        };

        const m = mouseRef.current;
        const pullX = (m.x - morphRef.current.centerX) * PULL_STRENGTH;
        const pullY = (m.y - morphRef.current.centerY) * PULL_STRENGTH;
        gsap.to(cursor, {
          x: baseX + pullX,
          y: baseY + pullY,
          duration: instant ? 0 : 0.15,
          ease: "power2.out",
          overwrite: "auto",
        });
      } else if (type === "underline" && isMorphedRef.current && !isSplitRef.current) {
        // Only track underline position when NOT split (when split, cursor is free)
        const textEl = target.querySelector("h3") || target;
        const rect = textEl.getBoundingClientRect();
        const baseX = rect.left;
        const baseY = rect.bottom + 4;
        morphRef.current = {
          baseX,
          baseY,
          centerX: rect.left + rect.width / 2,
          centerY: rect.top + rect.height / 2,
        };

        const m = mouseRef.current;
        const pullX = (m.x - morphRef.current.centerX) * PULL_STRENGTH;
        const pullY = (m.y - morphRef.current.centerY) * PULL_STRENGTH;
        gsap.to(cursor, {
          x: baseX + pullX,
          y: baseY + pullY,
          duration: instant ? 0 : 0.15,
          ease: "power2.out",
          overwrite: "auto",
        });
      }

      // Also update phantom position if split
      if (isSplitRef.current && type === "underline") {
        const textEl = target.querySelector("h3") || target;
        const rect = textEl.getBoundingClientRect();
        gsap.to(phantom, {
          x: rect.left,
          y: rect.bottom + 4,
          width: rect.width,
          duration: instant ? 0 : 0.15,
          ease: "power2.out",
          overwrite: "auto",
        });
      }
    };

    // Hide phantom
    const hidePhantom = () => {
      gsap.to(phantom, { opacity: 0, duration: 0.15, overwrite: "auto" });
      isSplitRef.current = false;
    };

    const resetCursor = () => {
      killTimeline();
      isMorphedRef.current = false;
      morphRef.current = null;
      if (isSplitRef.current) hidePhantom();
      gsap.to(cursor, {
        x: mouseRef.current.x - HALF_W,
        y: mouseRef.current.y - HALF_H,
        width: CURSOR_W,
        height: CURSOR_H,
        borderRadius: CURSOR_RADIUS,
        background: "white",
        outline: "2px solid white",
        outlineOffset: "1px",
        opacity: 1,
        mixBlendMode: "difference",
        zIndex: Z_NORMAL,
        duration: 0.3,
        ease: "power3.out",
        overwrite: "auto",
      });
    };

    // --- Split: underline spawns a block cursor ---
    const splitCursor = (target: HTMLElement) => {
      if (isSplitRef.current) return;
      isSplitRef.current = true;

      const textEl = target.querySelector("h3") || target;
      const rect = textEl.getBoundingClientRect();
      const zIndex = resolveZIndex(target);
      const underlineX = rect.left;
      const underlineY = rect.bottom + 4;

      // 1. Transfer the underline shape to the phantom
      gsap.set(phantom, {
        x: underlineX,
        y: underlineY,
        width: rect.width,
        height: 3,
        borderRadius: "2px",
        opacity: 1,
        zIndex: zIndex,
      });

      // 2. Pulse the main cursor (underline thickens briefly at mouse X)
      const tl = gsap.timeline();
      timelineRef.current = tl;

      // Brief pulse at mouse position
      tl.to(cursor, {
        height: 6,
        y: underlineY - 1.5,
        duration: 0.1,
        ease: "power2.out",
      });

      // 3. Peel off: cursor morphs back to block shape, drops down to mouse
      tl.to(cursor, {
        x: mouseRef.current.x - HALF_W,
        y: underlineY + 20, // drop below the underline
        width: CURSOR_W,
        height: CURSOR_H,
        borderRadius: CURSOR_RADIUS,
        background: "white",
        outline: "2px solid white",
        outlineOffset: "1px",
        mixBlendMode: "difference",
        zIndex: Z_NORMAL,
        duration: 0.2,
        ease: "power2.out",
      });

      // After the split animation, cursor is free to follow the mouse
      tl.call(() => {
        isMorphedRef.current = false;
        morphRef.current = null;
      });
    };

    // --- Merge: block cursor returns to underline ---
    const mergeCursor = (target: HTMLElement) => {
      if (!isSplitRef.current) return;

      const textEl = target.querySelector("h3") || target;
      const rect = textEl.getBoundingClientRect();
      const zIndex = resolveZIndex(target);
      const underlineX = rect.left;
      const underlineY = rect.bottom + 4;

      killTimeline();
      const tl = gsap.timeline();
      timelineRef.current = tl;

      // Cursor flies back up to the underline position
      tl.to(cursor, {
        x: underlineX,
        y: underlineY,
        width: rect.width,
        height: 3,
        borderRadius: "2px",
        background: "white",
        outline: "none",
        outlineOffset: "0px",
        mixBlendMode: "difference",
        zIndex: zIndex,
        duration: 0.2,
        ease: "power2.in",
      });

      // Fade out phantom as cursor arrives
      tl.to(phantom, {
        opacity: 0,
        duration: 0.1,
      }, "-=0.05");

      // Set state: cursor is now the underline again
      tl.call(() => {
        isSplitRef.current = false;
        isMorphedRef.current = true;
        morphRef.current = {
          baseX: underlineX,
          baseY: underlineY,
          centerX: rect.left + rect.width / 2,
          centerY: rect.top + rect.height / 2,
        };
      });
    };

    // --- Mouse tracking ---
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };

      if (isMorphedRef.current && morphRef.current && !isSplitRef.current) {
        // Morphed and not split — rubber-band to element
        const m = morphRef.current;
        const pullX = (e.clientX - m.centerX) * PULL_STRENGTH;
        const pullY = (e.clientY - m.centerY) * PULL_STRENGTH;
        gsap.to(cursor, {
          x: m.baseX + pullX,
          y: m.baseY + pullY,
          duration: 0.25,
          ease: "power2.out",
          overwrite: "auto",
        });
      } else if (!isMorphedRef.current) {
        // Free cursor (normal or split mode)
        gsap.to(cursor, {
          x: e.clientX - HALF_W,
          y: e.clientY - HALF_H,
          duration: 0.15,
          ease: "power2.out",
          overwrite: "auto",
        });
      }

      if (cursor.style.opacity === "0") {
        gsap.to(cursor, { opacity: 1, duration: 0.3 });
      }
    };

    const handleScroll = () => {
      if (!activeTargetRef.current) return;
      if (isMorphedRef.current || isSplitRef.current) {
        updateMorphPosition();
      }
    };

    const handleDocEnter = () => {
      gsap.to(cursor, { opacity: 1, duration: 0.3 });
    };

    const handleDocLeave = () => {
      gsap.to(cursor, { opacity: 0, duration: 0.3 });
    };

    // --- Hug enter ---
    const enterHug = (target: HTMLElement) => {
      const rect = target.getBoundingClientRect();
      const borderRadius = resolveBorderRadius(target);
      const zIndex = resolveZIndex(target);

      // If we were split, clean up phantom first
      if (isSplitRef.current) hidePhantom();

      killTimeline();
      isMorphedRef.current = true;

      const baseX = rect.left - HUG_PADDING;
      const baseY = rect.top - HUG_PADDING;
      morphRef.current = {
        baseX,
        baseY,
        centerX: rect.left + rect.width / 2,
        centerY: rect.top + rect.height / 2,
      };

      timelineRef.current = gsap.timeline();

      timelineRef.current.to(cursor, {
        x: baseX,
        y: baseY,
        width: rect.width + HUG_PADDING * 2,
        height: rect.height + HUG_PADDING * 2,
        borderRadius: borderRadius,
        background: "transparent",
        outline: "2px solid white",
        outlineOffset: "0px",
        mixBlendMode: "difference",
        opacity: 1,
        zIndex: zIndex,
        duration: 0.3,
        ease: "power3.out",
      }, 0);

      target.classList.add("cursor-hugged");

      timelineRef.current.to(
        target,
        { scale: 1.05, duration: 0.3, ease: "power3.out" },
        0
      );
    };

    const leaveHug = (target: HTMLElement) => {
      target.classList.remove("cursor-hugged");
      gsap.to(target, { scale: 1, duration: 0.3, ease: "power3.out" });
      resetCursor();
    };

    // --- Underline enter ---
    const enterUnderline = (target: HTMLElement) => {
      const textEl = target.querySelector("h3") || target;
      const rect = textEl.getBoundingClientRect();
      const zIndex = resolveZIndex(target);

      // If we were split from a different FAQ, clean up
      if (isSplitRef.current) hidePhantom();

      killTimeline();
      isMorphedRef.current = true;

      const baseX = rect.left;
      const baseY = rect.bottom + 4;
      morphRef.current = {
        baseX,
        baseY,
        centerX: rect.left + rect.width / 2,
        centerY: rect.top + rect.height / 2,
      };

      timelineRef.current = gsap.timeline();

      timelineRef.current.to(cursor, {
        x: baseX,
        y: baseY,
        width: rect.width,
        height: 3,
        borderRadius: "2px",
        background: "white",
        outline: "none",
        outlineOffset: "0px",
        mixBlendMode: "difference",
        opacity: 1,
        zIndex: zIndex,
        duration: 0.3,
        ease: "power3.out",
      }, 0);

      // If this FAQ is already open, immediately split
      if (target.hasAttribute("data-faq-open")) {
        timelineRef.current.call(() => {
          splitCursor(target);
        });
      }
    };

    const leaveUnderline = () => {
      if (isSplitRef.current) hidePhantom();
      resetCursor();
    };

    // --- MutationObserver: watch for data-faq-open changes ---
    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (mutation.type !== "attributes" || mutation.attributeName !== "data-faq-open") continue;
        const target = mutation.target as HTMLElement;

        // Only act if this is the currently active underline target
        if (target !== activeTargetRef.current || activeTypeRef.current !== "underline") continue;

        if (target.hasAttribute("data-faq-open")) {
          // FAQ opened — split
          splitCursor(target);
        } else {
          // FAQ closed — merge back
          mergeCursor(target);
        }
      }
    });

    // Observe the whole document for data-faq-open changes (FAQ items are dynamic)
    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ["data-faq-open"],
      subtree: true,
    });

    // --- Mouse over/out delegation ---
    const handleMouseOver = (e: MouseEvent) => {
      const el = e.target as HTMLElement;

      const hugTarget = el.closest<HTMLElement>('[data-cursor="hug"]');
      const underlineTarget = el.closest<HTMLElement>('[data-cursor="underline"]');

      const target = hugTarget || underlineTarget;
      const type = hugTarget ? "hug" : underlineTarget ? "underline" : null;

      if (!target || !type) return;
      if (activeTargetRef.current === target) return;

      if (activeTargetRef.current && activeTargetRef.current !== target) {
        if (activeTypeRef.current === "hug") leaveHug(activeTargetRef.current);
        if (activeTypeRef.current === "underline") leaveUnderline();
      }

      activeTargetRef.current = target;
      activeTypeRef.current = type;

      if (type === "hug") enterHug(target);
      if (type === "underline") enterUnderline(target);
    };

    const handleMouseOut = (e: MouseEvent) => {
      const el = e.target as HTMLElement;
      const hugTarget = el.closest<HTMLElement>('[data-cursor="hug"]');
      const underlineTarget = el.closest<HTMLElement>('[data-cursor="underline"]');
      const target = hugTarget || underlineTarget;

      if (!target || target !== activeTargetRef.current) return;

      const related = e.relatedTarget as HTMLElement | null;
      if (related && target.contains(related)) return;

      if (activeTypeRef.current === "hug") leaveHug(target);
      if (activeTypeRef.current === "underline") leaveUnderline();

      activeTargetRef.current = null;
      activeTypeRef.current = null;
    };

    // --- Click bounce (hug elements only) ---
    const handleMouseDown = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest<HTMLElement>('[data-cursor="hug"]');
      if (!target) return;
      gsap.to(target, { scale: 0.95, duration: 0.1, ease: "power2.in" });
    };

    const handleMouseUp = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest<HTMLElement>('[data-cursor="hug"]');
      if (!target) return;
      const tl = gsap.timeline();
      tl.to(target, { scale: 1.08, duration: 0.15, ease: "back.out(2)" }).to(
        target,
        { scale: 1.05, duration: 0.3, ease: "power2.out" }
      );
    };

    // Add listeners
    document.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("scroll", handleScroll, { passive: true });
    document.documentElement.addEventListener("mouseenter", handleDocEnter);
    document.documentElement.addEventListener("mouseleave", handleDocLeave);
    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseout", handleMouseOut);
    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
      document.documentElement.removeEventListener("mouseenter", handleDocEnter);
      document.documentElement.removeEventListener("mouseleave", handleDocLeave);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseout", handleMouseOut);
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mouseup", handleMouseUp);
      observer.disconnect();
      killTimeline();
    };
  }, []);

  const sharedStyle: React.CSSProperties = {
    position: "fixed",
    left: 0,
    top: 0,
    pointerEvents: "none",
    mixBlendMode: "difference",
    willChange: "transform",
  };

  return (
    <>
      {/* Main cursor */}
      <div
        ref={cursorRef}
        className="pointer-events-none"
        style={{
          ...sharedStyle,
          width: CURSOR_W,
          height: CURSOR_H,
          background: "white",
          borderRadius: CURSOR_RADIUS,
          outline: "2px solid white",
          outlineOffset: "1px",
          opacity: 0,
          zIndex: Z_NORMAL,
        }}
      />
      {/* Phantom underline — visible only during split */}
      <div
        ref={phantomRef}
        className="pointer-events-none"
        style={{
          ...sharedStyle,
          width: 0,
          height: 3,
          background: "white",
          borderRadius: "2px",
          outline: "none",
          opacity: 0,
          zIndex: 1,
        }}
      />
    </>
  );
}
