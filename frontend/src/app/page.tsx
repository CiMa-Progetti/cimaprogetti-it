import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import { Suspense } from "react";
import { LazySection } from "@/components/LazySection";
import { Skeleton, SkeletonWave } from "@/components/Skeleton";

const ServicesSection = dynamic(
  () => import("@/components/sections/ServicesSection"),
  {
    loading: () => (
      <div className="py-20 lg:py-32 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <Skeleton variant="heading" className="mb-8" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="bg-surface-container p-8 lg:p-12">
                <SkeletonWave height="40px" className="mb-8" />
                <SkeletonWave height="20px" className="mb-4" />
                <SkeletonWave height="60px" />
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
  }
);

const AboutSection = dynamic(
  () => import("@/components/sections/AboutSection"),
  {
    loading: () => (
      <div className="py-20 lg:py-32 px-6 lg:px-8 overflow-hidden bg-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
          <SkeletonWave width="100%" height="600px" />
          <div className="space-y-8">
            <Skeleton height="60px" />
            <Skeleton height="100px" count={3} />
          </div>
        </div>
      </div>
    ),
  }
);

export default function Home() {
  return (
    <>
      {/* Hero Section - Priority render for LCP */}
      <header className="min-h-screen flex flex-col justify-center px-6 lg:px-8 pt-20">
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
          <div className="lg:col-span-10">
            <h1 className="text-huge font-black uppercase mb-12">
              La{" "}
              <span className="text-primary">struttura</span> digitale del
              vostro business.
            </h1>
            <div className="flex flex-col sm:flex-row gap-6">
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
        </div>
      </header>

      {/* Approccio / Ecosistema Integrato */}
      <section
        id="approccio"
        className="py-20 lg:py-32 px-6 lg:px-8 bg-surface-container-low"
      >
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12">
          <div className="md:col-span-4">
            <p className="text-primary font-bold uppercase tracking-widest text-sm mb-4">
              L&apos;Approccio
            </p>
            <h2 className="text-3xl lg:text-4xl font-black uppercase leading-none">
              Tutto Collegato
            </h2>
          </div>
          <div className="md:col-span-7 md:col-start-6">
            <p className="text-xl lg:text-2xl leading-relaxed text-on-surface">
              Non software isolati, ma infrastrutture digitali portanti. Ogni
              componente dialoga con gli altri per creare un sistema unico,
              costruito attorno al vostro modo di lavorare.
            </p>
          </div>
        </div>
      </section>

      {/* Problema / Valore - Lazy loaded */}
      <LazySection
        className="lazy-section"
        skeletonHeight="400px"
        skeletonCount={1}
      >
        <section className="py-20 lg:py-32 px-6 lg:px-8 border-y border-outline-variant/10">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-px bg-outline-variant/20">
            <div className="bg-background p-8 lg:p-16 space-y-8">
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
            <div className="bg-background p-8 lg:p-16 space-y-8">
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
        </section>
      </LazySection>

      {/* Servizi - Lazy loaded with dynamic import */}
      <LazySection className="lazy-section" skeletonHeight="300px">
        <Suspense>
          <ServicesSection />
        </Suspense>
      </LazySection>

      {/* Chi Siamo - Lazy loaded with dynamic import */}
      <LazySection className="lazy-section" skeletonHeight="600px">
        <Suspense>
          <AboutSection />
        </Suspense>
      </LazySection>

      {/* Filosofia - Lazy loaded */}
      <LazySection className="lazy-section" skeletonHeight="300px">
        <section
          id="filosofia"
          className="py-20 lg:py-32 px-6 lg:px-8 bg-dark-bg text-white"
        >
          <div className="max-w-4xl mx-auto text-center space-y-12">
            <h2 className="text-sm font-bold uppercase tracking-[0.4em] text-primary">
              La nostra idea
            </h2>
            <blockquote className="text-3xl md:text-4xl lg:text-6xl font-black leading-tight italic">
              &ldquo;La forma segue la funzione. La struttura la rende
              duratura.&rdquo;
            </blockquote>
            <p className="text-zinc-400 text-base lg:text-lg max-w-2xl mx-auto leading-relaxed">
              Solido come cemento armato, fluido come un open-space. Zero
              fronzoli, massima efficienza.
            </p>
          </div>
        </section>
      </LazySection>

      {/* CTA / Conversione */}
      <section
        id="progetti"
        className="py-28 lg:py-40 px-6 lg:px-8 bg-primary text-white relative overflow-hidden"
      >
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="max-w-3xl">
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-black uppercase mb-12 leading-none">
              Pronto a scalare?
            </h2>
            <Link
              href="/contatti"
              className="inline-block border-2 border-white bg-white text-primary px-12 py-6 font-black uppercase tracking-widest text-lg lg:text-xl hover:bg-transparent hover:text-white hover:border-2 hover:border-white transition-colors"
            >
              Contattaci
            </Link>
          </div>
        </div>
        <div className="absolute top-0 right-0 h-full w-1/3 opacity-10 pointer-events-none">
          <svg
            className="h-full w-full"
            preserveAspectRatio="none"
            viewBox="0 0 100 100"
          >
            <line
              stroke="white"
              strokeWidth="0.1"
              x1="0"
              x2="100"
              y1="0"
              y2="100"
            />
            <line
              stroke="white"
              strokeWidth="0.1"
              x1="0"
              x2="100"
              y1="20"
              y2="120"
            />
            <line
              stroke="white"
              strokeWidth="0.1"
              x1="0"
              x2="100"
              y1="40"
              y2="140"
            />
            <line
              stroke="white"
              strokeWidth="0.1"
              x1="20"
              x2="120"
              y1="0"
              y2="100"
            />
            <line
              stroke="white"
              strokeWidth="0.1"
              x1="40"
              x2="140"
              y1="0"
              y2="100"
            />
          </svg>
        </div>
      </section>
    </>
  );
}
