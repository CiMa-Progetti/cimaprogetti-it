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
      className="snap-section py-24 px-6 lg:px-12"
    >
      <div className="max-w-7xl mx-auto">
        <div
          ref={headerRef}
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-16"
        >
          <div className="lg:col-span-5">
            <p className="text-primary font-bold uppercase tracking-widest text-sm mb-4">
              L&apos;Approccio
            </p>
            <h2 className="font-heading text-5xl lg:text-6xl font-bold lowercase leading-[0.95]">
              Ecosistema
              <br />
              integrato
            </h2>
          </div>
          <div className="lg:col-span-7">
            <p className="text-xl lg:text-2xl leading-relaxed text-on-background">
              Non costruiamo software isolati, ma infrastrutture digitali portanti.
              Ogni riga di codice &egrave; un pilastro, ogni interfaccia un varco
              funzionale verso l&apos;efficienza operativa. La nostra visione
              architettonica trasforma il caos informativo in un sistema di
              precisione millimetrica.
            </p>
          </div>
        </div>

        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-2 gap-px bg-zinc-200 rounded-[10px] overflow-hidden max-w-5xl mx-auto"
        >
          {/* Prima */}
          <div className="bg-white p-12 lg:p-16">
            <span className="material-symbols-outlined text-primary text-4xl mb-8 block">
              architecture
            </span>
            <h3 className="text-3xl font-black uppercase mb-10">Prima</h3>
            <ul className="space-y-4 text-secondary">
              {[
                "Database frammentati",
                "Processi manuali obsoleti",
                "Vulnerabilit\u00e0 di sistema",
                "Perdita di controllo strategico",
              ].map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-primary shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Dopo */}
          <div className="bg-white p-12 lg:p-16">
            <span className="material-symbols-outlined text-primary text-4xl mb-8 block">
              domain
            </span>
            <h3 className="text-3xl font-black uppercase mb-10">Dopo</h3>
            <ul className="space-y-4 text-on-background">
              {[
                "Flussi centralizzati",
                "Automazione intelligente",
                "Crittografia militare",
                "Dashboard decisionali real-time",
              ].map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-primary shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
