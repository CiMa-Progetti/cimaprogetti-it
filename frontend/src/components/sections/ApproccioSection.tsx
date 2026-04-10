"use client";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export default function ApproccioSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!headerRef.current || !cardsRef.current) return;

    gsap.fromTo(
      Array.from(headerRef.current.children),
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

    gsap.fromTo(
      Array.from(cardsRef.current.children),
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: cardsRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      }
    );
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      id="approccio"
      className="snap-section py-24 px-6 lg:px-12 bg-white"
    >
      <div
        ref={headerRef}
        className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-start"
      >
        <div className="lg:col-span-5">
          <p className="text-primary font-black uppercase tracking-widest text-xs mb-4">
            L&apos;Approccio
          </p>
          <h2 className="text-5xl lg:text-6xl font-black uppercase leading-[0.9] mb-8">
            Ecosistema
            <br />
            Integrato
          </h2>
        </div>
        <div className="lg:col-span-7">
          <p className="text-xl lg:text-2xl font-medium leading-relaxed text-on-background">
            Non costruiamo software isolati, ma infrastrutture digitali portanti.
            Ogni riga di codice è un pilastro, ogni interfaccia un varco
            funzionale verso l&apos;efficienza operativa. La nostra visione
            architettonica trasforma il caos informativo in un sistema di
            precisione millimetrica.
          </p>
        </div>
      </div>

      <div
        ref={cardsRef}
        className="max-w-7xl mx-auto mt-20 grid grid-cols-1 md:grid-cols-2 gap-8"
      >
        {/* Prima */}
        <div className="bg-surface-container-low p-12 lg:p-16 min-h-[400px]">
          <span className="material-symbols-outlined text-primary text-5xl mb-8 block">
            architecture
          </span>
          <h3 className="text-4xl font-black uppercase mb-10">Prima</h3>
          <ul className="space-y-6 text-secondary font-medium">
            {[
              "Database frammentati",
              "Processi manuali obsoleti",
              "Vulnerabilità di sistema",
              "Perdita di controllo strategico",
            ].map((item) => (
              <li key={item} className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 bg-primary shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Dopo */}
        <div className="bg-surface-container-low p-12 lg:p-16 min-h-[400px]">
          <span className="material-symbols-outlined text-primary text-5xl mb-8 block">
            domain
          </span>
          <h3 className="text-4xl font-black uppercase mb-10">Dopo</h3>
          <ul className="space-y-6 text-on-background font-medium">
            {[
              "Flussi centralizzati",
              "Automazione intelligente",
              "Crittografia militare",
              "Dashboard decisionali real-time",
            ].map((item) => (
              <li key={item} className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 bg-primary shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
