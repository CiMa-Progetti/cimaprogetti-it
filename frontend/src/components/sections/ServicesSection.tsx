"use client";
import { useRef, useState, useCallback, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ScrollProgressDots from "@/components/ScrollProgressDots";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    id: "portali",
    title: "Portali & Infrastrutture Digitali",
    icon: "hub",
    description: "Siti, portali e web app costruiti per funzionare e crescere con voi.",
  },
  {
    id: "database",
    title: "Database & Sistemi Gestionali",
    icon: "schema",
    description: "I vostri dati organizzati, accessibili e pronti per le decisioni che contano.",
  },
  {
    id: "ecommerce",
    title: "E-commerce & Piattaforme",
    icon: "shopping_bag",
    description: "Vendita online integrata con la vostra logistica, pronta a scalare.",
  },
  {
    id: "automazioni",
    title: "Automazioni & IA",
    icon: "memory",
    description:
      "Meno lavoro ripetitivo, più tempo per quello che conta. IA anche in locale, i vostri dati restano vostri.",
  },
  {
    id: "cybersecurity",
    title: "Cybersicurezza",
    icon: "verified_user",
    description: "Protezione proattiva e monitoraggio continuo dei vostri asset digitali.",
  },
];

export default function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const desktopContainerRef = useRef<HTMLDivElement>(null);
  const mobileScrollRef = useRef<HTMLDivElement>(null);
  const [currentServiceMobile, setCurrentServiceMobile] = useState(0);

  const handleMobileScroll = useCallback(() => {
    const container = mobileScrollRef.current;
    if (!container) return;
    const card = container.querySelector("[data-mobile-card]") as HTMLElement;
    if (!card) return;
    const cardWidth = card.offsetWidth;
    const gap = parseFloat(getComputedStyle(container).gap) || 0;
    const index = Math.round(container.scrollLeft / (cardWidth + gap));
    setCurrentServiceMobile(Math.min(index, services.length - 1));
  }, []);

  useEffect(() => {
    const container = mobileScrollRef.current;
    if (!container) return;
    container.addEventListener("scroll", handleMobileScroll, { passive: true });
    return () => container.removeEventListener("scroll", handleMobileScroll);
  }, [handleMobileScroll]);

  useGSAP(() => {
    if (!sectionRef.current) return;
    const mm = gsap.matchMedia();

    mm.add("(min-width: 1024px)", () => {
      const cards = desktopContainerRef.current?.querySelectorAll("[data-service-card]");
      if (cards && cards.length > 0) {
        gsap.fromTo(
          Array.from(cards),
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.1,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 70%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    });
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      id="servizi"
      className="snap-section min-h-screen flex items-center justify-center px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto w-full">
        <div className="mb-16 text-center lg:text-left">
          <h2 className="text-4xl lg:text-5xl font-black uppercase mb-6">
            Cosa Facciamo
          </h2>
          <div className="w-24 h-2 bg-primary mb-8 hidden lg:block" />
          <p className="text-xl text-secondary leading-relaxed max-w-2xl">
            Soluzioni su misura per il vostro metodo di lavoro. Automazione,
            gestione dati e competenze umane in un unico flusso.
          </p>
        </div>

        {/* Desktop Grid */}
        <div ref={desktopContainerRef} className="hidden lg:grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {/* Portali */}
          <div
            data-service-card
            className="bg-surface-container p-8 lg:p-12 border-t-4 border-primary hover:bg-zinc-900 hover:text-white transition-all duration-500 group"
          >
            <span className="material-symbols-outlined text-4xl mb-8 block text-primary group-hover:text-white">
              hub
            </span>
            <h3 className="text-xl lg:text-2xl font-black uppercase mb-4">
              {services[0].title}
            </h3>
            <p className="opacity-70 group-hover:opacity-100">
              {services[0].description}
            </p>
          </div>

          {/* Database */}
          <div
            data-service-card
            className="bg-surface-container p-8 lg:p-12 border-t-4 border-primary hover:bg-zinc-900 hover:text-white transition-all duration-500 group"
          >
            <span className="material-symbols-outlined text-4xl mb-8 block text-primary group-hover:text-white">
              schema
            </span>
            <h3 className="text-xl lg:text-2xl font-black uppercase mb-4">
              {services[1].title}
            </h3>
            <p className="opacity-70 group-hover:opacity-100">
              {services[1].description}
            </p>
          </div>

          {/* E-commerce */}
          <div
            data-service-card
            className="bg-surface-container p-8 lg:p-12 border-t-4 border-primary hover:bg-zinc-900 hover:text-white transition-all duration-500 group"
          >
            <span className="material-symbols-outlined text-4xl mb-8 block text-primary group-hover:text-white">
              shopping_bag
            </span>
            <h3 className="text-xl lg:text-2xl font-black uppercase mb-4">
              {services[2].title}
            </h3>
            <p className="opacity-70 group-hover:opacity-100">
              {services[2].description}
            </p>
          </div>

          {/* Automazioni & IA */}
          <div
            data-service-card
            className="md:col-span-2 bg-surface-container-high text-on-surface p-8 lg:p-12 flex flex-col md:flex-row justify-between items-center gap-8 group transition-colors duration-300"
          >
            <div className="max-w-xl">
              <h3 className="text-2xl lg:text-3xl font-black uppercase mb-4">
                {services[3].title}
              </h3>
              <p className="opacity-60 text-base lg:text-lg">
                {services[3].description}
              </p>
            </div>
            <span className="material-symbols-outlined text-7xl text-primary animate-pulse">
              memory
            </span>
          </div>

          {/* Cybersicurezza */}
          <div
            data-service-card
            className="bg-primary text-white p-8 lg:p-12 flex flex-col justify-between"
          >
            <div>
              <h3 className="text-xl lg:text-2xl font-black uppercase mb-4">
                {services[4].title}
              </h3>
              <p className="opacity-80">{services[4].description}</p>
            </div>
            <span className="material-symbols-outlined text-4xl mt-8">
              verified_user
            </span>
          </div>
        </div>

        {/* Mobile Carousel — horizontal scroll-snap */}
        <div className="lg:hidden mb-8">
          <div
            ref={mobileScrollRef}
            className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide gap-4"
            style={{ WebkitOverflowScrolling: "touch" }}
          >
            {services.map((service) => (
              <div
                key={service.id}
                data-mobile-card
                className="snap-start w-[calc(100vw-3rem)] shrink-0 bg-surface-container p-8 border-t-4 border-primary space-y-6"
              >
                <span className="material-symbols-outlined text-4xl block text-primary">
                  {service.icon}
                </span>
                <h3 className="text-xl font-black uppercase mb-4">
                  {service.title}
                </h3>
                <p className="text-on-surface">{service.description}</p>
              </div>
            ))}
          </div>

          {/* Mobile Progress Dots */}
          <div className="flex justify-center mt-6">
            <ScrollProgressDots
              total={services.length}
              current={currentServiceMobile}
            />
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <a
            href="/contatti"
            className="inline-block bg-primary text-on-primary px-10 py-5 font-bold uppercase tracking-widest text-lg transition-all hover:brightness-110 active:scale-[0.98]"
          >
            Parliamo del tuo Progetto
          </a>
        </div>
      </div>
    </section>
  );
}
