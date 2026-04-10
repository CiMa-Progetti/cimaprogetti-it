"use client";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export default function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!headerRef.current || !cardsRef.current) return;

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      gsap.set(Array.from(headerRef.current.children), { y: 0, opacity: 1 });
      gsap.set(Array.from(cardsRef.current.children), { y: 0, opacity: 1 });
      return;
    }

    // Desktop: Pinned ScrollTrigger for header + first 3 cards,
    // then independent triggers for the bottom 2 cards after unpin
    gsap.matchMedia().add("(min-width: 768px)", () => {
      const allCards = Array.from(cardsRef.current!.children);
      const topCards = allCards.slice(0, 3);
      const bottomCards = allCards.slice(3);

      // Set bottom cards to invisible initially
      gsap.set(bottomCards, { y: 60, opacity: 0 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=900",
          scrub: 1,
          pin: true,
        },
      });

      tl.fromTo(
        Array.from(headerRef.current!.children),
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: "power3.out" },
        0
      );

      tl.fromTo(
        topCards,
        { y: 80, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: "power3.out" },
        0.3
      );

      // Bottom 2 cards animate independently after section unpins
      bottomCards.forEach((card) => {
        gsap.fromTo(
          card,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card as HTMLElement,
              start: "top 90%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    });

    // Mobile: Independent ScrollTriggers without pinning
    gsap.matchMedia().add("(max-width: 767px)", () => {
      gsap.fromTo(
        Array.from(headerRef.current!.children),
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );

      Array.from(cardsRef.current!.children).forEach((card, index) => {
        gsap.fromTo(
          card,
          { y: 80, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card as HTMLElement,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    });
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      id="servizi"
      className="overflow-hidden py-20 lg:py-32 px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div
          ref={headerRef}
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20 items-end"
        >
          <div className="lg:col-span-8">
            <h2 className="text-4xl lg:text-5xl font-black uppercase mb-6">
              Cosa Facciamo
            </h2>
            <div className="w-24 h-2 bg-primary mb-8" />
            <p className="text-xl text-secondary leading-relaxed max-w-2xl">
              Soluzioni su misura per il vostro metodo di lavoro. Automazione,
              gestione dati e competenze umane in un unico flusso.
            </p>
          </div>
        </div>

        {/* Services Grid */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {/* Portali */}
          <div className="bg-surface-container p-8 lg:p-12 border-t-4 border-primary hover:bg-zinc-900 hover:text-white transition-all duration-500 group">
            <span className="material-symbols-outlined text-4xl mb-8 block text-primary group-hover:text-white">
              hub
            </span>
            <h3 className="text-xl lg:text-2xl font-black uppercase mb-4">
              Connetti &amp; dai forma alla tua idea
            </h3>
            <p className="opacity-70 group-hover:opacity-100">
              App, piattaforme e infrastrutture digitali: architetture progettate per dare vita ai tuoi progetti e connettere il tuo lavoro.
            </p>
          </div>

          {/* Database */}
          <div className="bg-surface-container p-8 lg:p-12 border-t-4 border-primary hover:bg-zinc-900 hover:text-white transition-all duration-500 group">
            <span className="material-symbols-outlined text-4xl mb-8 block text-primary group-hover:text-white">
              schema
            </span>
            <h3 className="text-xl lg:text-2xl font-black uppercase mb-4">
              Organizza e gestisci
            </h3>
            <p className="opacity-70 group-hover:opacity-100">
              Sviluppiamo dashboard e gestionali strutturati sulle tue esigenze aziendali: organizzazione del dato al servizio della decisione. Sistemi su misura che riflettono i vostri processi reali.
            </p>
          </div>

          {/* E-commerce */}
          <div className="bg-surface-container p-8 lg:p-12 border-t-4 border-primary hover:bg-zinc-900 hover:text-white transition-all duration-500 group">
            <span className="material-symbols-outlined text-4xl mb-8 block text-primary group-hover:text-white">
              shopping_bag
            </span>
            <h3 className="text-xl lg:text-2xl font-black uppercase mb-4">
              Mostra e vendi i tuoi prodotti
            </h3>
            <p className="opacity-70 group-hover:opacity-100">
              Sviluppiamo siti web ed e-commerce pensati non solo per mostrare, ma per gestire in modo completo vendita, pagamenti, ordini e logistica.
            </p>
          </div>

          {/* Automazioni & IA */}
          <div className="md:col-span-2 bg-zinc-900 text-white p-8 lg:p-12 flex flex-col md:flex-row justify-between items-center gap-8 group transition-colors duration-300 hover:bg-primary">
            <div className="max-w-xl">
              <h3 className="text-2xl lg:text-3xl font-black uppercase mb-4">
                Potenzia i tuoi processi
              </h3>
              <p className="opacity-60 text-base group-hover:opacity-100 transition-all lg:text-lg">
                Dalle automazioni che alleggeriscono i lavori ripetitivi, fino a report
                <br />
                esaustivi sui tuoi dati realizzati dall'intelligenza artificiale.
                <br />
                IA anche in locale per la massima protezione dei tuoi dati.
              </p>
            </div>
            <span className="material-symbols-outlined text-7xl text-white animate-pulse">
              memory
            </span>
          </div>

          {/* Cybersicurezza */}
          <div className="bg-zinc-900 text-white p-8 lg:p-12 flex flex-col justify-between hover:bg-primary transition-colors duration-300">
            <div>
              <h3 className="text-xl lg:text-2xl font-black uppercase mb-4">
                Cybersicurezza
              </h3>
              <p className="opacity-80 group-hover:opacity-100 transition-all">
                Protezione proattiva e monitoraggio continuo dei vostri asset
                digitali.
              </p>
            </div>
            <span className="material-symbols-outlined text-4xl mt-8">
              verified_user
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
