"use client";
import Link from "next/link";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export default function CtaSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!headingRef.current || !contentRef.current) return;

    const tl = gsap.timeline({
      defaults: { ease: "power3.out" },
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 70%",
        toggleActions: "play none none reverse",
      },
    });

    tl.fromTo(
      headingRef.current,
      { scale: 0.8, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.8 }
    ).fromTo(
      contentRef.current.children,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, stagger: 0.15 },
      "-=0.4"
    );
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      id="progetti"
      className="snap-section py-20 sm:py-28 lg:py-32 px-6 bg-dark-bg text-white text-center"
    >
      <div className="max-w-4xl mx-auto">
        <h2
          ref={headingRef}
          className="text-5xl sm:text-7xl lg:text-8xl font-black uppercase leading-none mb-8 sm:mb-10"
        >
          SYSTEM
          <br />
          UPGRADE
        </h2>
        <div ref={contentRef}>
          <p className="text-lg sm:text-xl lg:text-2xl mb-8 sm:mb-12 max-w-2xl mx-auto opacity-90">
            Progettiamo insieme
            <br />
            il prossimo tassello digitale
            <br />
            della tua azienda.
          </p>
          <Link
            href="/contatti"
            className="inline-block bg-white text-on-background px-12 py-6 font-black uppercase tracking-widest text-lg sm:text-xl transition-all hover:bg-zinc-100 active:scale-[0.98] rounded-[10px]"
            data-cursor="hug"
          >
            Contattaci
          </Link>
        </div>
      </div>
    </section>
  );
}
