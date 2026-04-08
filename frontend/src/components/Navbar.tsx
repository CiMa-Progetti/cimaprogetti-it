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
    <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-zinc-100">
      <div className="flex justify-between items-center px-6 lg:px-8 py-4 max-w-7xl mx-auto">
        <Link href="/" className="block">
          <Image
            src="/logo.svg"
            alt="CiMa Progetti"
            width={110}
            height={40}
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
            className={`px-6 py-2 font-bold text-sm uppercase tracking-widest transition-all active:scale-95 ${
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
        >
          <svg
            className="w-7 h-7"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            {menuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="lg:hidden bg-white border-t border-zinc-100 px-6 py-6 space-y-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block font-sans uppercase tracking-tighter font-bold text-sm text-zinc-600 hover:text-primary transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/contatti"
            className="block bg-primary text-white px-6 py-2 font-bold text-sm uppercase tracking-widest text-center"
            onClick={() => setMenuOpen(false)}
          >
            Contatti
          </Link>
        </div>
      )}
    </nav>
  );
}
