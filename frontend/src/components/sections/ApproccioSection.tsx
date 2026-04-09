"use client";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ApproccioSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!contentRef.current) return;

    const children = contentRef.current.children;

    gsap.fromTo(
      Array.from(children),
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
      id="approccio"
      className="snap-section min-h-screen flex items-center justify-center px-6 lg:px-8 bg-surface-container-low"
    >
      <div ref={contentRef} className="max-w-3xl mx-auto text-center">
        <p className="text-primary font-bold uppercase tracking-widest text-sm mb-4">
          L&apos;Approccio
        </p>
        <h2 className="text-huge font-black uppercase mb-8">
          Tutto Collegato
        </h2>
        <p className="text-xl lg:text-2xl leading-relaxed text-on-background mb-12">
          Non software isolati, ma infrastrutture digitali portanti. Ogni
          componente dialoga con gli altri per creare un sistema unico,
          costruito attorno al vostro modo di lavorare.
        </p>
        <a
          href="#servizi"
          className="inline-block border-2 border-on-background text-on-background px-10 py-5 font-bold uppercase tracking-widest text-lg transition-all hover:bg-on-background hover:text-background active:scale-[0.98]"
        >
          Scopri i Servizi
        </a>
      </div>
    </section>
  );
}
