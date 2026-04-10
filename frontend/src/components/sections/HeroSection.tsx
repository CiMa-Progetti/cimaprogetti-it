import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="snap-section min-h-screen flex flex-col justify-center items-center text-center px-6 pt-24 pb-12">
      <div className="mb-3 hero-fade-up">
        <span className="bg-primary text-on-primary px-6 py-2 font-black uppercase text-sm tracking-widest inline-block rounded-[10px]">
          soluzioni digitali
        </span>
      </div>
      <h1 className="text-huge font-black uppercase mb-10 max-w-5xl hero-slide-up">
        PORTA IN <span className="text-primary">CIMA</span>
        <br />
        IL TUO BUSINESS
      </h1>
      <p className="text-lg lg:text-xl font-medium max-w-2xl mb-12 hero-fade-up">
        Il tuo partner per scalare nella transizione 5.0:
        <br />
        <span className="font-black">
          leader in automazioni IA, conversione
          <br className="hidden sm:inline" />
          online e infrastrutture digitali per le aziende.
        </span>
      </p>
      <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto hero-fade-up hero-fade-up-delay-2">
        <Link
          href="/#servizi"
          className="bg-primary text-on-primary px-10 py-5 font-black uppercase tracking-widest text-base transition-all border-3 border-primary hover:bg-transparent hover:text-primary active:scale-[0.98] text-center rounded-[10px]"
        >
          Vai ai servizi
        </Link>
        <Link
          href="/contatti"
          className="border-2 border-on-background text-on-background px-10 py-5 font-black uppercase tracking-widest text-base transition-all hover:bg-on-background hover:text-background active:scale-[0.98] text-center rounded-[10px]"
        >
          Contattaci
        </Link>
      </div>
      <div className="mt-15 flex flex-col items-center gap-4 text-secondary hero-fade-up hero-fade-up-delay-2">
        <span className="text-[10px] uppercase tracking-[0.3em] font-bold">
          Scopri di più
        </span>
        <svg
          className="w-10 h-10 animate-bounce"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.5}
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m9 12.75 3 3m0 0 3-3m-3 3v-7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
          />
        </svg>
      </div>
    </section>
  );
}
