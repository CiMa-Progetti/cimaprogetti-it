"use client";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function FilosofiaSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!contentRef.current) return;

    gsap.fromTo(
      Array.from(contentRef.current.children),
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          toggleActions: "play none none reverse",
        },
      }
    );
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      id="filosofia"
      className="snap-section min-h-screen flex items-center justify-center px-6 lg:px-8 bg-dark-bg text-white py-32 lg:py-48"
    >
      <div ref={contentRef} className="max-w-4xl mx-auto text-center space-y-12">
        <h2 className="text-sm font-bold uppercase tracking-[0.4em] text-primary">
          La nostra idea
        </h2>
        <blockquote className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-black leading-tight italic">
          &ldquo;La forma segue la funzione. La struttura la rende
          duratura.&rdquo;
        </blockquote>
        <p className="text-zinc-400 text-base lg:text-lg max-w-2xl mx-auto leading-relaxed">
          Solido come cemento armato, fluido come un open-space. Zero fronzoli,
          massima efficienza.
        </p>
        <a
          href="/contatti"
          className="inline-block border-2 border-white text-white px-6 py-3 sm:px-10 sm:py-5 font-bold uppercase tracking-widest text-sm sm:text-lg transition-all hover:bg-white hover:text-dark-bg active:scale-[0.98]"
        >
          Inizia il Progetto
        </a>
      </div>
    </section>
  );
}
