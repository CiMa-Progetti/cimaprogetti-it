import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="snap-section min-h-screen flex items-center justify-center px-6 lg:px-8 pt-20">
      <div className="max-w-5xl mx-auto text-center">
        <h1 className="text-huge font-black uppercase mb-8 sm:mb-12 hero-slide-up">
          La <span className="text-primary">struttura</span> digitale del
          tuo business.
        </h1>
        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          <Link
            href="/contatti"
            className="hero-fade-up hero-fade-up-delay-1 bg-primary text-on-primary px-6 py-3 sm:px-10 sm:py-5 font-bold uppercase tracking-widest text-sm sm:text-lg transition-all hover:brightness-110 active:scale-[0.98] text-center"
          >
            Inizia il Progetto
          </Link>
          <a
            href="#filosofia"
            className="hero-fade-up hero-fade-up-delay-2 border-2 border-on-background text-on-background px-6 py-3 sm:px-10 sm:py-5 font-bold uppercase tracking-widest text-sm sm:text-lg transition-all hover:bg-on-background hover:text-background active:scale-[0.98] text-center"
          >
            Scopri il Metodo
          </a>
        </div>
      </div>
    </section>
  );
}
