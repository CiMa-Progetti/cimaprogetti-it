"use client";

import Image from "next/image";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!sectionRef.current) return;

    if (imageRef.current) {
      gsap.fromTo(
        imageRef.current,
        { x: -60, opacity: 0 },
        {
          x: 0,
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
    }

    if (textRef.current) {
      gsap.fromTo(
        Array.from(textRef.current.children),
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      id="chi-siamo"
      className="snap-section py-24 px-6 lg:px-12 bg-white overflow-hidden"
    >
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-10 lg:gap-16 items-center lg:items-start justify-center">
        {/* Image */}
        <div ref={imageRef} className="relative w-full max-w-sm lg:max-w-[400px] shrink-0">
          <Image
            alt="Nicola Leone Ciardi e Valentina Madaudo"
            src="/images/team.jpg"
            width={640}
            height={800}
            className="w-full h-auto object-cover grayscale hover:grayscale-0 transition-all duration-500"
          />
        </div>

        {/* Content */}
        <div ref={textRef} className="space-y-10">
          <div className="space-y-6">
            <p className="text-secondary font-medium leading-relaxed max-w-xl text-base lg:text-lg">
              Due figure giovani, ma strutturate: il dualismo di tecnica e
              visione, processo e creatività, velocità e consapevolezza.
            </p>
            <h2 className="text-4xl lg:text-5xl xl:text-6xl font-black uppercase leading-[0.85] tracking-tighter">
              DALL&apos;IDEA
              <br />
              AI PROCESSI.
              <br />
              DALLA <span className="text-primary">VISIONE</span>
              <br />
              AL SISTEMA.
            </h2>
            <p className="text-secondary font-medium leading-relaxed max-w-xl text-base lg:text-lg">
              Perché per noi innovare significa integrare competenze e
              prospettive, per costruire soluzioni che non siano solo funzionali,
              ma solide nel tempo.
            </p>
          </div>

          {/* Name badges */}
          <div className="pt-8 flex flex-col sm:flex-row gap-8 items-start relative">
            <div className="border border-on-background px-6 sm:px-8 py-4 sm:py-5 flex items-center justify-center font-bold text-lg sm:text-xl bg-white shadow-sm hover:shadow-xl transition-shadow cursor-default z-10 w-full sm:w-auto sm:min-w-[280px]">
              Nicola Leone <span className="text-primary ml-2">Ciardi</span>
            </div>
            <div className="border border-outline-variant px-6 sm:px-8 py-4 sm:py-5 flex items-center justify-center font-bold text-lg sm:text-xl bg-white shadow-lg hover:shadow-2xl transition-all cursor-default sm:rotate-[-6deg] sm:-mt-4 sm:ml-[-20px] z-20 w-full sm:w-auto sm:min-w-[280px]">
              Valentina <span className="text-primary ml-2">Madaudo</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
