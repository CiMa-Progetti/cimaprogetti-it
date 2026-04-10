"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navLinks = [
  { label: "Chi siamo", href: "/#approccio" },
  { label: "Servizi", href: "/#servizi" },
  { label: "Metodo", href: "/#filosofia" },
  { label: "Progetti", href: "/#progetti" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-zinc-200">
      <div className="bg-transparent flex justify-between max-h-16 items-center px-6 lg:px-8 py-6 max-w-7xl mx-auto">
        <Link href="/" className="block">
          <Image
            src="/logo.svg"
            alt="CiMa Progetti"
            width={130}
            height={50}
            className="h-8 w-auto"
            priority
          />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex gap-8 items-center">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-sans uppercase tracking-tighter font-bold text-sm text-zinc-600 hover:text-primary transition-colors duration-300"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/contatti"
            className={`px-6 py-2 font-bold text-sm uppercase tracking-widest transition-all active:scale-95 rounded-[10px] ${
              pathname === "/contatti"
                ? "bg-primary text-white"
                : "bg-primary text-white hover:brightness-110"
            }`}
          >
            Contatti
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
          <div className="px-6 py-6 space-y-4 bg-white/80 backdrop-blur-md">
            {navLinks.map((link, index) => (
              <Link
                key={link.href}
                href={link.href}
                className={`block font-sans uppercase tracking-tighter font-bold text-sm transition-all duration-150 ease-out ${
                  menuOpen
                    ? "text-zinc-600 hover:text-primary opacity-100 translate-y-0"
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
              className={`block bg-primary text-white px-6 py-2 font-bold text-sm uppercase tracking-widest text-center rounded-[10px] transition-all duration-150 ease-out ${
                menuOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
              }`}
              style={{ transitionDelay: menuOpen ? "160ms" : "0ms" }}
              onClick={() => setMenuOpen(false)}
            >
              Contatti
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
