"use client";

import Image from "next/image";

export default function AboutSection() {
  return (
    <section className="py-20 lg:py-32 px-6 lg:px-8 overflow-hidden bg-white">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        <div className="relative">
          <Image
            alt="Architettura moderna in vetro e acciaio"
            className="w-full grayscale hover:grayscale-0 transition-all duration-700"
            src="/images/architecture.jpg"
            width={800}
            height={600}
            loading="lazy"
          />
          <div className="absolute -bottom-8 -right-8 bg-primary w-36 h-36 lg:w-48 lg:h-48" />
        </div>
        <div className="space-y-8">
          <h2 className="text-4xl lg:text-5xl font-black uppercase">
            Chi Siamo
          </h2>
          <p className="text-lg lg:text-xl leading-relaxed text-secondary">
            CiMa Progetti unisce architettura e software engineering. Costruiamo
            sistemi digitali solidi e scalabili per aziende che non accettano
            compromessi.
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
  );
}
