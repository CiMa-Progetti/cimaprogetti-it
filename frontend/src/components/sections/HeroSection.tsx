import Link from "next/link";
import Image from "next/image";
import InlineLogo from "./ui/inline-logo.svg";

export default function HeroSection() {
  return (
    <section className="snap-section min-h-screen flex flex-col justify-center items-center text-center px-6 pt-36 pb-6">
      <div className="mb-4 hero-fade-up">
        <span className="text-primary font-bold text-xl lg:text-2xl lowercase rounded-[10px] bg-transparent px-4 py-2 inline-block">
          soluzioni digitali
        </span>
      </div>
      <h1 className="font-heading text-[4.5rem] font-black mb-6 max-w-5xl hero-slide-up tracking-tight leading-[0.55]">
        Porta in <InlineLogo alt="cima_" className="inline h-[4.5rem] pb-2" />
        <br />
        il tuo business.
      </h1>
      <p className="text-xl lg:text-2xl max-w-2xl mb-8 text-on-background hero-fade-up leading-relaxed">
        Il tuo partner per scalare nella transizione 5.0:
        <br />
        <span className="font-bold">
          leader in automazioni IA, conversione
          <br className="hidden sm:inline" />
          online e infrastrutture digitali per le aziende.
        </span>
      </p>
      <div className="flex flex-col sm:flex-row gap-6 w-full sm:w-auto hero-fade-up hero-fade-up-delay-2">
        <Link
          href="/#servizi"
          className="bg-primary text-on-primary px-10 py-5 font-bold uppercase tracking-widest text-lg transition-all border-2 border-primary hover:bg-transparent hover:text-primary active:scale-[0.98] text-center rounded-[10px]"
          data-cursor="hug"
        >
          Vai ai servizi
        </Link>
        <Link
          href="/contatti"
          className="border-2 border-on-background text-on-background px-10 py-5 font-bold uppercase tracking-widest text-lg transition-all hover:bg-on-background hover:text-background active:scale-[0.98] text-center rounded-[10px]"
          data-cursor="hug"
        >
          Contattaci
        </Link>
      </div>
      <div className="mt-10 flex flex-col items-center gap-3 text-on-background hero-fade-up hero-fade-up-delay-2">
        <span className="text-lg uppercase tracking-widest">
          Scopri di pi&ugrave;
        </span>
        <svg
          className="w-6 h-6 animate-scroll-down"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 5v14m0 0l-5-5m5 5l5-5"
          />
        </svg>
      </div>
    </section>
  );
}
