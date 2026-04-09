"use client";

import Image from "next/image";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!sectionRef.current || !textRef.current) return;

    gsap.fromTo(
      textRef.current,
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          toggleActions: "play none none reverse",
        },
      }
    );
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      id="chi-siamo"
      className="snap-section min-h-screen flex items-center justify-center px-6 lg:px-8 bg-black relative overflow-hidden"
    >
      {/* Background Image */}
      <div
        ref={imageRef}
        className="absolute inset-0 z-0"
      >
        <Image
          alt="Architettura moderna in vetro e acciaio"
          src="/images/architecture.jpg"
          fill
          className="object-cover"
          priority={false}
        />
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Content Overlay */}
      <div ref={textRef} className="max-w-3xl mx-auto text-center text-white relative z-10">
        <h2 className="text-huge font-black uppercase mb-8">Chi Siamo</h2>
        <p className="text-lg lg:text-xl leading-relaxed mb-12">
          CiMa Progetti unisce architettura e software engineering. Costruiamo
          sistemi digitali solidi e scalabili per aziende che non accettano
          compromessi.
        </p>
        <div className="flex flex-col sm:flex-row gap-8 lg:gap-12 border-t border-white/30 pt-8 justify-center">
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
        <div className="mt-12">
          <a
            href="/contatti"
            className="inline-block border-2 border-white bg-white text-dark-bg px-10 py-5 font-bold uppercase tracking-widest text-lg transition-all hover:bg-transparent hover:text-white active:scale-[0.98]"
          >
            Lavora con Noi
          </a>
        </div>
      </div>
    </section>
  );
}
