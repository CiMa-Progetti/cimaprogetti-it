"use client";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const topServices = [
  {
    title: "POTENZIA\nI TUOI PROCESSI",
    description: (
      <>
        Dalle <strong>automazioni</strong> che alleggeriscono lavori ripetitivi, fino a report esaustivi sui tuoi dati realizzati dall&apos;<strong>intelligenza artificiale</strong>.
      </>
    ),
    icon: "memory",
  },
  {
    title: "ORGANIZZA\n& GESTISCI",
    description: (
      <>
        Sviluppiamo <strong>dashboard</strong> e <strong>gestionali</strong> strutturati sulle tue esigenze aziendali: sistemi su misura che riflettono i vostri processi reali.
      </>
    ),
    icon: "schema",
  },
  {
    title: "PROTEGGI\nI TUOI DATI",
    description: (
      <>
        Blindiamo l&apos;ecosistema digitale con <strong>soluzioni di cybersicurezza</strong> reali: dai protocolli di difesa proattivi a un monitoraggio costante degli asset.
      </>
    ),
    icon: "verified_user",
  },
];

const bottomServices = [
  {
    title: "CONNETTI & DAI FORMA\nALLA TUA IDEA",
    description: (
      <>
        <strong>App</strong>, <strong>piattaforme</strong> e <strong>infrastrutture digitali</strong>: architetture progettate per dare vita ai tuoi progetti e connettere il tuo lavoro.
      </>
    ),
    icon: "hub",
    wide: true,
  },
  {
    title: "VENDI I TUOI\nPRODOTTI",
    description: "Sviluppiamo E-commerce per gestire ogni fase della vendita.",
    icon: "shopping_bag",
    wide: false,
  },
];

export default function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!headerRef.current || !cardsRef.current) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      gsap.set(Array.from(headerRef.current.children), { y: 0, opacity: 1 });
      gsap.set(Array.from(cardsRef.current.children), { y: 0, opacity: 1 });
      return;
    }

    gsap.matchMedia().add("(min-width: 768px)", () => {
      const allCards = Array.from(cardsRef.current!.children);
      const topCards = allCards.slice(0, 3);
      const bottomCards = allCards.slice(3);

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

      Array.from(cardsRef.current!.children).forEach((card) => {
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
          className="text-center mb-20 max-w-4xl mx-auto"
        >
          <h2 className="font-heading text-4xl lg:text-6xl font-bold lowercase mb-6">
            Servizi <span className="text-primary">essenziali</span>. Impatto concreto.
          </h2>
          <div className="w-24 h-2 bg-primary mx-auto mb-8" />
          <p className="text-xl text-on-background leading-relaxed">
            Trasformiamo esigenze operative e obiettivi aziendali in strumenti concreti.
            <br className="hidden md:inline" />
            Ogni servizio &egrave; pensato per semplificare la gestione, migliorare i processi
            <br className="hidden md:inline" />
            e dare struttura alla crescita.
          </p>
        </div>

        {/* Services Grid */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {/* Top 3 cards */}
          {topServices.map((service) => (
            <div
              key={service.icon}
              className="bg-zinc-800 text-white p-8 lg:p-12 rounded-[10px] flex flex-col justify-between min-h-[390px] group hover:bg-zinc-900 transition-colors duration-300"
            >
              <span className="material-symbols-outlined text-4xl mb-8 block text-white">
                {service.icon}
              </span>
              <div className="flex flex-col gap-4 mt-auto">
                <h3 className="text-2xl lg:text-3xl font-black uppercase whitespace-pre-line leading-tight">
                  {service.title}
                </h3>
                <p className="text-white/80 text-lg leading-relaxed">
                  {service.description}
                </p>
              </div>
            </div>
          ))}

          {/* Bottom 2 cards */}
          {bottomServices.map((service) => (
            <div
              key={service.icon}
              className={`bg-zinc-800 text-white p-8 lg:p-12 rounded-[10px] flex flex-col justify-between min-h-[230px] group hover:bg-zinc-900 transition-colors duration-300 ${
                service.wide ? "md:col-span-2" : ""
              }`}
            >
              <div className="flex justify-between items-start mb-6">
                <h3 className="text-xl lg:text-2xl font-black uppercase whitespace-pre-line leading-tight">
                  {service.title}
                </h3>
                <span className="material-symbols-outlined text-3xl text-white shrink-0 ml-4">
                  {service.icon}
                </span>
              </div>
              <p className="text-white/80 text-lg leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
