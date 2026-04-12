"use client";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export default function QuoteSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const quoteRef = useRef<HTMLHeadingElement>(null);

  useGSAP(() => {
    if (!quoteRef.current) return;

    gsap.fromTo(
      quoteRef.current,
      { y: 30, opacity: 0 },
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
      className="snap-section py-24 lg:py-32 px-6 bg-dark-bg text-white flex flex-col items-center justify-center text-center"
    >
      <div className="max-w-5xl">
        <h2
          ref={quoteRef}
          className="text-2xl md:text-3xl lg:text-4xl italic leading-snug"
        >
          <span className="font-bold">&ldquo;Trasformiamo le tue idee in realt&agrave; digitale</span>
          <span>: </span>
          <br />
          <span>velocit&agrave; dell&apos;IA ed esperienza umana, animate della tua esperienza.&rdquo;</span>
        </h2>
      </div>
    </section>
  );
}
