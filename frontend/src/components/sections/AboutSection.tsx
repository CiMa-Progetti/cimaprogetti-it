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
      className="snap-section py-24 px-6 lg:px-12 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-10 lg:gap-16 items-center lg:items-start justify-center">
        {/* Image */}
        <div ref={imageRef} className="relative w-full max-w-sm lg:max-w-[455px] shrink-0" data-cursor="hug">
          <Image
            alt="Nicola Leone Ciardi e Valentina Madaudo"
            src="/images/team.jpg"
            width={640}
            height={800}
            className="w-full h-auto object-cover rounded-[10px] shadow-lg"
          />
        </div>

        {/* Content */}
        <div ref={textRef} className="space-y-8">
          <p className="text-secondary leading-relaxed max-w-xl text-lg lg:text-xl">
            Due figure giovani, ma strutturate: il dualismo di tecnica e
            visione, processo e creativit&agrave;, velocit&agrave; e consapevolezza.
          </p>

          <h2 className="font-heading text-4xl lg:text-5xl xl:text-6xl font-bold lowercase leading-tight tracking-tight">
            Dall&apos;idea
            <br />
            ai processi.
            <br />
            Dalla <span className="text-primary">visione</span>
            <br />
            al sistema.
          </h2>

          <p className="text-secondary leading-relaxed max-w-xl text-lg lg:text-xl">
            Perch&eacute; per noi innovare significa integrare competenze e
            prospettive, per costruire soluzioni che non siano solo funzionali,
            ma solide nel tempo.
          </p>

          <div className="border-t border-zinc-200 pt-8" />

          {/* Name badges */}
          <div className="flex flex-col sm:flex-row gap-6 items-start relative">
            <div className="border-2 border-on-background px-8 py-5 flex items-center justify-center text-xl bg-white rounded-[10px] w-full sm:w-auto sm:min-w-[280px]">
              Nicola Leone <span className="text-primary ml-2">Ci</span>ardi
            </div>
            <div className="border-2 border-on-background px-8 py-5 flex items-center justify-center text-xl bg-white rounded-[10px] sm:rotate-[20deg] sm:-mt-2 w-full sm:w-auto sm:min-w-[280px]">
              Valentina <span className="text-primary ml-2">Ma</span>daudo
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
