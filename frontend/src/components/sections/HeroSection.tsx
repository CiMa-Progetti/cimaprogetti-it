"use client";
import Link from "next/link";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!headlineRef.current || !ctaRef.current) return;

    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    tl.fromTo(headlineRef.current,
      { y: 60, opacity: 0 },
      { y: 0, opacity: 1, duration: 1 }
    ).fromTo(
      Array.from(ctaRef.current.children),
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, stagger: 0.15 },
      "-=0.4"
    );
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      className="snap-section min-h-screen flex items-center justify-center px-6 lg:px-8 pt-20"
    >
      <div className="max-w-5xl mx-auto text-center">
        <h1
          ref={headlineRef}
          className="text-huge font-black uppercase mb-12"
        >
          La <span className="text-primary">struttura</span> digitale del
          tuo business.
        </h1>
        <div ref={ctaRef} className="flex flex-col sm:flex-row gap-6 justify-center">
          <Link
            href="/contatti"
            className="bg-primary text-on-primary px-10 py-5 font-bold uppercase tracking-widest text-lg transition-all hover:brightness-110 active:scale-[0.98] text-center"
          >
            Inizia il Progetto
          </Link>
          <a
            href="#filosofia"
            className="border-2 border-on-background text-on-background px-10 py-5 font-bold uppercase tracking-widest text-lg transition-all hover:bg-on-background hover:text-background active:scale-[0.98] text-center"
          >
            Scopri il Metodo
          </a>
        </div>
      </div>
    </section>
  );
}
