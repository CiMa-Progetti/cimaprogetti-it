"use client";
import Link from "next/link";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export default function CtaSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const buttonRef = useRef<HTMLAnchorElement>(null);

  useGSAP(() => {
    if (!headingRef.current || !buttonRef.current) return;

    const tl = gsap.timeline({
      defaults: { ease: "power3.out" },
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 70%",
        toggleActions: "play none none reverse",
      },
    });

    tl.fromTo(headingRef.current,
      { scale: 0.8, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.8 }
    ).fromTo(buttonRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6 },
      "-=0.4"
    );
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      id="progetti"
      className="snap-section min-h-screen flex items-center justify-center px-6 lg:px-8 bg-primary text-white relative overflow-hidden"
    >
      <div className="max-w-4xl mx-auto w-full relative z-10 text-center">
        <div className="mx-auto">
          <h2
            ref={headingRef}
            className="text-4xl md:text-6xl lg:text-7xl font-black uppercase mb-12 leading-none"
          >
            Pronto a scalare?
          </h2>
          <Link
            ref={buttonRef}
            href="/contatti"
            className="inline-block border-2 border-white bg-white text-primary px-12 py-6 font-black uppercase tracking-widest text-lg lg:text-xl hover:bg-transparent hover:text-white hover:border-2 hover:border-white transition-colors"
          >
            Contattaci
          </Link>
        </div>
      </div>

      {/* Decorative SVG Lines */}
      <div className="absolute top-0 right-0 h-full w-1/3 opacity-10 pointer-events-none">
        <svg
          className="h-full w-full"
          preserveAspectRatio="none"
          viewBox="0 0 100 100"
        >
          <line
            stroke="white"
            strokeWidth="0.1"
            x1="0"
            x2="100"
            y1="0"
            y2="100"
          />
          <line
            stroke="white"
            strokeWidth="0.1"
            x1="0"
            x2="100"
            y1="20"
            y2="120"
          />
          <line
            stroke="white"
            strokeWidth="0.1"
            x1="0"
            x2="100"
            y1="40"
            y2="140"
          />
          <line
            stroke="white"
            strokeWidth="0.1"
            x1="20"
            x2="120"
            y1="0"
            y2="100"
          />
          <line
            stroke="white"
            strokeWidth="0.1"
            x1="40"
            x2="140"
            y1="0"
            y2="100"
          />
        </svg>
      </div>
    </section>
  );
}
