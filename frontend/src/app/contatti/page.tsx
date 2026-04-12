import type { Metadata } from "next";
import Image from "next/image";
import { LazySection } from "@/components/LazySection";
import { Skeleton, SkeletonWave } from "@/components/Skeleton";
import MaterialSymbolsFont from "@/components/MaterialSymbolsFont";

export const metadata: Metadata = {
  title: "Contatti | CiMa Progetti",
  description: "Parliamo del tuo prossimo progetto digitale.",
};

export default function Contatti() {
  return (
    <div className="pt-36 sm:pt-44 pb-16 sm:pb-24 px-6 lg:px-8 max-w-7xl mx-auto overflow-x-hidden">
      <MaterialSymbolsFont />
      {/* Hero Section - Priority render */}
      <section className="grid grid-cols-1 lg:grid-cols-12 mb-16 lg:mb-24">
        <div className="col-span-12 md:col-span-8">
          <h1 className="text-huge font-black uppercase text-on-surface mb-8">
            CONTATTI
          </h1>
          <div className="h-2 w-24 bg-primary mt-4" />
        </div>
        <div className="col-span-12 md:col-start-9 md:col-span-4 mt-8 md:mt-auto">
          <p className="text-on-surface-variant font-medium text-base sm:text-lg lg:text-xl leading-relaxed">
            Parliamo del tuo prossimo progetto. Nessun impegno, solo una conversazione.
          </p>
        </div>
      </section>

      {/* General Contacts - Lazy loaded */}
      <LazySection
        className="lazy-section grid grid-cols-1 lg:grid-cols-12 mb-16 lg:mb-24 gap-6 lg:gap-12"
        skeletonHeight="300px"
        skeletonCount={1}
      >
        <div className="col-span-12 md:col-span-5 border-t border-outline-variant/20 pt-8">
          <h2 className="text-xs font-black tracking-[0.2em] uppercase text-zinc-400 mb-12">
            contatti
          </h2>
          <div className="space-y-12">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-primary mb-3">
                whatsapp
              </p>
              <a
                className="text-xl sm:text-3xl lg:text-4xl font-black tracking-tighter text-on-surface hover:text-primary transition-colors duration-300"
                href="tel:+393382451171"
                data-cursor="hug"
              >
                +39 338 245 1171
              </a>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-primary mb-3">
                email
              </p>
              <a
                className="text-xl sm:text-3xl lg:text-4xl font-black tracking-tighter text-on-surface hover:text-primary transition-colors duration-300 underline decoration-2 underline-offset-8"
                href="mailto:info@cimaprogetti.it"
                data-cursor="hug"
              >
                info@cimaprogetti.it
              </a>
            </div>
          </div>
        </div>

        {/* Structural Visual Element */}
        <div className="hidden md:block col-start-7 col-span-6 relative overflow-hidden h-[360px]">
          <Image
            alt="Concrete architecture geometric detail"
            className="w-full h-full object-cover grayscale brightness-90 hover:brightness-100 transition-all duration-700"
            src="/images/contatti.jpg"
            width={800}
            height={360}
            loading="lazy"
          />
          <div className="absolute inset-0 bg-primary/5 mix-blend-multiply" />
        </div>
      </LazySection>

      {/* People Behind CiMa - Lazy loaded */}
      <LazySection
        className="lazy-section mb-12"
        skeletonHeight="400px"
        skeletonCount={1}
      >
        <section className="mb-12">
          <div className="border-t border-outline-variant/20 pt-8 mb-8">
            <h2 className="text-xs font-black tracking-[0.2em] uppercase text-zinc-400">
              people behind cima
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-outline-variant/10">
            {/* Nicola Leone Ciardi */}
            <div className="bg-background py-12 pr-0 md:pr-12">
              <div className="flex flex-col h-full">
                <div className="mb-6">
                  <h3 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-black tracking-tighter text-on-surface mb-2">
                    Nicola Leone Ciardi
                  </h3>
                  <p className="text-primary font-bold uppercase text-[10px] tracking-[0.2em]">
                    Co-Founder &amp; CEO
                  </p>
                </div>
                <p className="text-on-surface-variant mb-10 max-w-sm text-base leading-relaxed">
                  Management and computer science.
                </p>
                <div className="mt-auto space-y-4">
                  <a
                    className="flex items-center space-x-3 text-on-surface hover:text-primary transition-colors"
                    href="tel:+393382451178"
                  >
                    <span className="material-symbols-outlined text-primary">
                      call
                    </span>
                    <span className="font-bold tracking-tight text-sm sm:text-base break-all sm:break-normal">
                      +39 338 245 1178
                    </span>
                  </a>
                  <a
                    className="flex items-center space-x-3 text-on-surface hover:text-primary transition-colors"
                    href="mailto:nicolaleone.ciardi@cimaprogetti.it"
                  >
                    <span className="material-symbols-outlined text-primary">
                      mail
                    </span>
                    <span className="font-bold tracking-tight text-sm sm:text-base break-all sm:break-normal">
                      nicolaleone.ciardi@cimaprogetti.it
                    </span>
                  </a>
                </div>
              </div>
            </div>

            {/* Valentina Madaudo */}
            <div className="bg-background py-12 md:pl-12 border-t md:border-t-0 md:border-l border-outline-variant/10">
              <div className="flex flex-col h-full">
                <div className="mb-6">
                  <h3 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-black tracking-tighter text-on-surface mb-2">
                    Valentina Madaudo
                  </h3>
                  <p className="text-primary font-bold uppercase text-[10px] tracking-[0.2em]">
                    Co-Founder &amp; CFO
                  </p>
                </div>
                <p className="text-on-surface-variant mb-10 max-w-sm text-base leading-relaxed">
                  Jr Engineer &amp; economist for sustainable development.
                </p>
                <div className="mt-auto space-y-4">
                  <a
                    className="flex items-center space-x-3 text-on-surface hover:text-primary transition-colors"
                    href="tel:+393393580805"
                  >
                    <span className="material-symbols-outlined text-primary">
                      call
                    </span>
                    <span className="font-bold tracking-tight text-sm sm:text-base break-all sm:break-normal">
                      +39 339 358 0805
                    </span>
                  </a>
                  <a
                    className="flex items-center space-x-3 text-on-surface hover:text-primary transition-colors"
                    href="mailto:valentina.madaudo@cimaprogetti.it"
                  >
                    <span className="material-symbols-outlined text-primary">
                      mail
                    </span>
                    <span className="font-bold tracking-tight text-sm sm:text-base break-all sm:break-normal">
                      valentina.madaudo@cimaprogetti.it
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </LazySection>
    </div>
  );
}
