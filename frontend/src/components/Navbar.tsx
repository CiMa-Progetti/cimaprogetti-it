"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef, useCallback } from "react";

const navLinks = [
  { label: "Servizi", href: "/#servizi" },
  { label: "Il metodo", href: "/#approccio" },
  { label: "Progetti", href: "/#progetti" },
  { label: "Chi Siamo", href: "/#chi-siamo" },
];

const sectionIds = ["servizi", "approccio", "progetti", "chi-siamo"];

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0, opacity: 0 });
  const navLinksRef = useRef<(HTMLAnchorElement | null)[]>([]);
  const indicatorContainerRef = useRef<HTMLDivElement>(null);

  const updateIndicatorPosition = useCallback((sectionId: string | null) => {
    if (!sectionId) {
      setIndicatorStyle((prev) => ({ ...prev, opacity: 0 }));
      return;
    }

    const linkIndex = navLinks.findIndex(
      (link) => link.href === `/#${sectionId}`
    );

    if (linkIndex !== -1 && navLinksRef.current[linkIndex]) {
      const link = navLinksRef.current[linkIndex];
      const container = indicatorContainerRef.current;

      if (container && link) {
        const containerRect = container.getBoundingClientRect();
        const linkRect = link.getBoundingClientRect();

        setIndicatorStyle({
          left: linkRect.left - containerRect.left,
          width: linkRect.width,
          opacity: 1,
        });
      }
    }
  }, []);

  // Combined scroll handler: scrolled state + active section detection
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      if (pathname !== "/") return;

      // Find which section is currently in the top portion of the viewport
      const viewportThreshold = window.innerHeight * 0.4;
      let current: string | null = null;

      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        // Section is active if its top has scrolled past the top of the viewport
        // but its bottom is still visible
        if (rect.top <= viewportThreshold && rect.bottom > 0) {
          current = id;
        }
      }

      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    // Run once on mount to set initial state
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  // Update indicator position when activeSection or scrolled changes
  useEffect(() => {
    if (pathname !== "/") {
      setIndicatorStyle((prev) => ({ ...prev, opacity: 0 }));
      return;
    }

    // Delay slightly so the navbar transition (py change) settles
    const timeout = setTimeout(() => updateIndicatorPosition(activeSection), 50);
    return () => clearTimeout(timeout);
  }, [pathname, activeSection, scrolled, updateIndicatorPosition]);

  // Recalculate on resize
  useEffect(() => {
    if (pathname !== "/" || !activeSection) return;

    const handleResize = () => updateIndicatorPosition(activeSection);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [pathname, activeSection, updateIndicatorPosition]);

  return (
    <nav
      className={`fixed px-6 lg:px-[5vw] xl:px-[15vw] top-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/80 backdrop-blur-md shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className={`flex justify-between items-center transition-all duration-300 ${scrolled ? "py-2" : "py-4 lg:py-8"}`}>
        <Link href="/" className="block">
          <Image
            src="/logo.svg"
            alt="CiMa Progetti"
            width={140}
            height={100}
            className={`w-fit transition-all duration-300 ${scrolled ? "h-10" : "h-12 lg:h-20"}`}
            priority
          />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex lg:gap-8 xl:gap-20 items-center">
          <div
            ref={indicatorContainerRef}
            className="flex lg:gap-6 xl:gap-[50px] items-center relative"
          >
            {navLinks.map((link, index) => (
              <Link
                key={link.href}
                ref={(el) => {
                  navLinksRef.current[index] = el;
                }}
                href={link.href}
                className={`font-sans lg:text-lg xl:text-2xl transition-colors duration-300 whitespace-nowrap relative z-10 ${
                  activeSection === link.href.substring(2) // remove #
                    ? "text-primary"
                    : "text-on-background hover:text-primary"
                }`}
                data-cursor="hug"
              >
                {link.label}
              </Link>
            ))}
            {/* Sliding indicator bar */}
            {pathname === "/" && (
              <div
                className="absolute bottom-0 h-1 bg-primary rounded transition-all duration-300 ease-out"
                style={{
                  left: `${indicatorStyle.left}px`,
                  width: `${indicatorStyle.width}px`,
                  opacity: indicatorStyle.opacity,
                }}
              />
            )}
          </div>
          <Link
            href="/contatti"
            className={`lg:px-5 xl:px-8 py-3 font-bold lg:text-lg xl:text-2xl transition-all active:scale-95 rounded-[10px] ${
              pathname === "/contatti"
                ? "bg-primary text-white"
                : "bg-primary text-white hover:brightness-110"
            }`}
            data-cursor="hug"
          >
            Contattaci
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          className="lg:hidden flex items-center p-2 focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
        >
          <div className="w-7 h-5 relative flex flex-col justify-between">
            <span
              className={`block h-0.5 w-full bg-current rounded-full transition-all duration-150 ease-out origin-center ${
                menuOpen ? "translate-y-[9px] rotate-45" : ""
              }`}
            />
            <span
              className={`block h-0.5 w-full bg-current rounded-full transition-opacity duration-150 ease-out ${
                menuOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block h-0.5 w-full bg-current rounded-full transition-all duration-150 ease-out origin-center ${
                menuOpen ? "-translate-y-[9px] -rotate-45" : ""
              }`}
            />
          </div>
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        id="mobile-menu"
        aria-hidden={!menuOpen}
        className="grid lg:hidden bg-transparent transition-[grid-template-rows] duration-200 ease-out"
        style={{ gridTemplateRows: menuOpen ? "1fr" : "0fr" }}
      >
        <div className={`overflow-hidden min-h-0 ${menuOpen ? "border-t border-zinc-100" : ""}`}>
          <div className="px-6 py-6 space-y-4 bg-white/90 backdrop-blur-md">
            {navLinks.map((link, index) => (
              <Link
                key={link.href}
                href={link.href}
                className={`block font-sans text-lg transition-all duration-150 ease-out ${
                  menuOpen
                    ? "text-on-background hover:text-primary opacity-100 translate-y-0"
                    : "opacity-0 translate-y-2"
                }`}
                style={{ transitionDelay: menuOpen ? `${index * 40}ms` : "0ms" }}
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/contatti"
              className={`block bg-primary text-white px-6 py-3 font-bold text-lg text-center rounded-[10px] transition-all duration-150 ease-out ${
                menuOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
              }`}
              style={{ transitionDelay: menuOpen ? "160ms" : "0ms" }}
              onClick={() => setMenuOpen(false)}
            >
              Contattaci
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
