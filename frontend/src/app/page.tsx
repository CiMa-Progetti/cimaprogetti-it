import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      {/* Hero Section */}
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
      <section id="approccio" className="py-20 lg:py-32 px-6 lg:px-8 bg-surface-container-low">
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
              Non software isolati, ma infrastrutture digitali portanti. Ogni componente dialoga con gli altri per creare un sistema unico, costruito attorno al vostro modo di lavorare.
            </p>
          </div>
        </div>
      </section>

      {/* Problema / Valore */}
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

      {/* Servizi */}
      <section id="servizi" className="py-20 lg:py-32 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20 items-end">
            <div className="lg:col-span-8">
              <h2 className="text-4xl lg:text-5xl font-black uppercase mb-6">
                Cosa Facciamo
              </h2>
              <div className="w-24 h-2 bg-primary mb-8" />
              <p className="text-xl text-secondary leading-relaxed max-w-2xl">
                Soluzioni su misura per il vostro metodo di lavoro. Automazione, gestione dati e competenze umane in un unico flusso.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Portali */}
            <div className="bg-surface-container p-8 lg:p-12 border-t-4 border-primary hover:bg-zinc-900 hover:text-white transition-all duration-500 group">
              <span className="material-symbols-outlined text-4xl mb-8 block text-primary group-hover:text-white">
                hub
              </span>
              <h3 className="text-xl lg:text-2xl font-black uppercase mb-4">
                Portali &amp; Infrastrutture Digitali
              </h3>
              <p className="opacity-70 group-hover:opacity-100">
                Siti, portali e web app costruiti per funzionare e crescere con voi.
              </p>
            </div>

            {/* Database */}
            <div className="bg-surface-container p-8 lg:p-12 border-t-4 border-primary hover:bg-zinc-900 hover:text-white transition-all duration-500 group">
              <span className="material-symbols-outlined text-4xl mb-8 block text-primary group-hover:text-white">
                schema
              </span>
              <h3 className="text-xl lg:text-2xl font-black uppercase mb-4">
                Database &amp; Sistemi Gestionali
              </h3>
              <p className="opacity-70 group-hover:opacity-100">
                I vostri dati organizzati, accessibili e pronti per le decisioni che contano.
              </p>
            </div>

            {/* E-commerce */}
            <div className="bg-surface-container p-8 lg:p-12 border-t-4 border-primary hover:bg-zinc-900 hover:text-white transition-all duration-500 group">
              <span className="material-symbols-outlined text-4xl mb-8 block text-primary group-hover:text-white">
                shopping_bag
              </span>
              <h3 className="text-xl lg:text-2xl font-black uppercase mb-4">
                E-commerce &amp; Piattaforme
              </h3>
              <p className="opacity-70 group-hover:opacity-100">
                Vendita online integrata con la vostra logistica, pronta a scalare.
              </p>
            </div>

            {/* Automazioni & IA */}
            <div className="md:col-span-2 bg-surface-container-high text-on-surface p-8 lg:p-12 flex flex-col md:flex-row justify-between items-center gap-8 group transition-colors duration-300">
              <div className="max-w-xl">
                <h3 className="text-2xl lg:text-3xl font-black uppercase mb-4">
                  Automazioni &amp; IA
                </h3>
                <p className="opacity-60 text-base lg:text-lg">
                  Meno lavoro ripetitivo, più tempo per quello che conta.
                  <br />
                  IA anche in locale, i vostri dati restano vostri.
                </p>
              </div>
              <span className="material-symbols-outlined text-7xl text-primary animate-pulse">
                memory
              </span>
            </div>

            {/* Cybersicurezza */}
            <div className="bg-primary text-white p-8 lg:p-12 flex flex-col justify-between">
              <div>
                <h3 className="text-xl lg:text-2xl font-black uppercase mb-4">
                  Cybersicurezza
                </h3>
                <p className="opacity-80">
                  Protezione proattiva e monitoraggio continuo dei vostri asset digitali.
                </p>
              </div>
              <span className="material-symbols-outlined text-4xl mt-8">
                verified_user
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Chi Siamo */}
      <section className="py-20 lg:py-32 px-6 lg:px-8 overflow-hidden bg-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="relative">
            <Image
              alt="Architettura moderna in vetro e acciaio"
              className="w-full grayscale hover:grayscale-0 transition-all duration-700"
              src="/images/architecture.jpg"
              width={800}
              height={600}
            />
            <div className="absolute -bottom-8 -right-8 bg-primary w-36 h-36 lg:w-48 lg:h-48" />
          </div>
          <div className="space-y-8">
            <h2 className="text-4xl lg:text-5xl font-black uppercase">
              Chi Siamo
            </h2>
            <p className="text-lg lg:text-xl leading-relaxed text-secondary">
              CiMa Progetti unisce architettura e software engineering. Costruiamo sistemi digitali solidi e scalabili per aziende che non accettano compromessi.
            </p>
            <div className="flex flex-col sm:flex-row gap-8 lg:gap-12 border-t border-zinc-200 pt-8">
              <div>
                <p className="text-2xl lg:text-3xl font-black">AI Expert</p>
                <p className="text-xs uppercase tracking-widest text-primary font-bold">
                  Nicola Leone Ciardi
                </p>
              </div>
              <div>
                <p className="text-2xl lg:text-3xl font-black">Jr Engineer</p>
                <p className="text-xs uppercase tracking-widest text-primary font-bold">
                  Valentina Madaudo
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filosofia */}
      <section id="filosofia" className="py-20 lg:py-32 px-6 lg:px-8 bg-dark-bg text-white">
        <div className="max-w-4xl mx-auto text-center space-y-12">
          <h2 className="text-sm font-bold uppercase tracking-[0.4em] text-primary">
            La nostra idea
          </h2>
          <blockquote className="text-3xl md:text-4xl lg:text-6xl font-black leading-tight italic">
            &ldquo;La forma segue la funzione. La struttura la rende duratura.&rdquo;
          </blockquote>
          <p className="text-zinc-400 text-base lg:text-lg max-w-2xl mx-auto leading-relaxed">
            Solido come cemento armato, fluido come un open-space. Zero fronzoli, massima efficienza.
          </p>
        </div>
      </section>

      {/* CTA / Conversione */}
      <section id="progetti" className="py-28 lg:py-40 px-6 lg:px-8 bg-primary text-white relative overflow-hidden">
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
            <line stroke="white" strokeWidth="0.1" x1="0" x2="100" y1="0" y2="100" />
            <line stroke="white" strokeWidth="0.1" x1="0" x2="100" y1="20" y2="120" />
            <line stroke="white" strokeWidth="0.1" x1="0" x2="100" y1="40" y2="140" />
            <line stroke="white" strokeWidth="0.1" x1="20" x2="120" y1="0" y2="100" />
            <line stroke="white" strokeWidth="0.1" x1="40" x2="140" y1="0" y2="100" />
          </svg>
        </div>
      </section>
    </>
  );
}
