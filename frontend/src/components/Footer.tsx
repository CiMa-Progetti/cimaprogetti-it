import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-dark-bg w-full py-16 px-6 lg:px-8 mt-auto border-t border-zinc-800 relative overflow-hidden">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 max-w-7xl mx-auto">
        <div className="lg:col-span-1">
          <span className="text-xl font-bold text-white tracking-tighter mb-4 block uppercase">
            CiMa Progetti
          </span>
          <p className="font-sans text-sm tracking-wide text-zinc-400 leading-relaxed">
            Via Otranto 39
            <br />
            00192 Roma, Italia
            <br />
            P.IVA 18328621000
            <br />
            REA RM-1778381
          </p>
        </div>

        <div>
          <p className="text-white font-bold mb-6 uppercase text-xs tracking-widest">
            Navigazione
          </p>
          <ul className="space-y-3">
            {["Chi siamo", "Servizi", "Metodo", "Progetti"].map((item) => (
              <li key={item}>
                <Link
                  href={`/#${item.toLowerCase().replace(" ", "-")}`}
                  className="font-sans text-sm tracking-wide text-zinc-400 hover:text-blue-400 transition-colors"
                >
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-white font-bold mb-6 uppercase text-xs tracking-widest">
            Supporto
          </p>
          <ul className="space-y-3">
            {["Privacy Policy", "Termini e Condizioni", "FAQ"].map((item) => (
              <li key={item}>
                <Link
                  href="#"
                  className="font-sans text-sm tracking-wide text-zinc-400 hover:text-blue-400 transition-colors"
                >
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-white font-bold mb-6 uppercase text-xs tracking-widest">
            Contatti
          </p>
          <p className="font-sans text-sm tracking-wide text-zinc-400 mb-4">
            <a href="mailto:info@cimaprogetti.it" className="text-blue-400 hover:text-blue-300">
              info@cimaprogetti.it
            </a>
            <br />
            <a href="https://wa.me/393382451171" className="text-blue-400 hover:text-blue-300">
              +39 338 245 1171
            </a>
            <br />
            <a href="mailto:cima.progetti@pec-societa.it" className="text-blue-400 hover:text-blue-300">
              cima.progetti@pec-societa.it
            </a>
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-zinc-800 text-center sm:text-left">
        <p className="font-sans text-xs tracking-wide text-zinc-500 uppercase">
          &copy; 2026 CiMa Progetti Srls. Soluzioni digitali.
        </p>
      </div>
      {/* Watermark */}
      <span className="hidden lg:block absolute bottom-0 right-0 text-[200px] font-black tracking-tighter leading-none select-none pointer-events-none text-[#2e2e2e] translate-x-4 translate-y-12">
        CIMA
      </span>
    </footer>
  );
}
