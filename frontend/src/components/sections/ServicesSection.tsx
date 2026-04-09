"use client";

export default function ServicesSection() {
  return (
    <section id="servizi" className="py-20 lg:py-32 px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20 items-end">
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
              Siti, portali e web app costruiti per funzionare e crescere con
              voi.
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
              I vostri dati organizzati, accessibili e pronti per le decisioni
              che contano.
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
              Vendita online integrata con la vostra logistica, pronta a
              scalare.
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
