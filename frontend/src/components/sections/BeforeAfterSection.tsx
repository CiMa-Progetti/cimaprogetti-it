"use client";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function BeforeAfterSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const primaRef = useRef<HTMLDivElement>(null);
  const dopoRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!sectionRef.current || !primaRef.current || !dopoRef.current) return;

    // Prima fades in first
    gsap.fromTo(
      primaRef.current,
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          toggleActions: "play none none reverse",
        },
      }
    );

    // Dopo fades in with slight delay
    gsap.fromTo(
      dopoRef.current,
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        delay: 0.3,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          toggleActions: "play none none reverse",
        },
      }
    );

    // CTA fades in after both panels
    if (ctaRef.current) {
      gsap.fromTo(
        ctaRef.current,
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          delay: 0.6,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      className="snap-section min-h-screen flex items-center justify-center px-6 lg:px-8"
    >
      <div className="max-w-4xl mx-auto w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-outline-variant/20">
          {/* Prima */}
          <div
            ref={primaRef}
            className="bg-background p-8 lg:p-16 space-y-8"
          >
            <span className="material-symbols-outlined text-error text-5xl">
              architecture
            </span>
            <h3 className="text-2xl lg:text-3xl font-black uppercase">Prima</h3>
            <ul className="space-y-4 text-zinc-500">
              {[
                "Dati sparsi ovunque",
                "Processi manuali e lenti",
                "Sistemi vulnerabili",
                "Zero visibilità strategica",
              ].map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-error shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Dopo */}
          <div
            ref={dopoRef}
            className="bg-background p-8 lg:p-16 space-y-8"
          >
            <span className="material-symbols-outlined text-primary text-5xl">
              domain
            </span>
            <h3 className="text-2xl lg:text-3xl font-black uppercase">Dopo</h3>
            <ul className="space-y-4 text-zinc-900">
              {[
                "Un unico flusso di dati",
                "Automazione dove serve",
                "Sicurezza di livello enterprise",
                "Dashboard per decidere in tempo reale",
              ].map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-primary shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div ref={ctaRef} className="text-center mt-12">
          <a
            href="/contatti"
            className="inline-block bg-primary text-on-primary px-6 py-3 sm:px-10 sm:py-5 font-bold uppercase tracking-widest text-sm sm:text-lg transition-all hover:brightness-110 active:scale-[0.98]"
          >
            Trasforma il tuo Business
          </a>
        </div>
      </div>
    </section>
  );
}
