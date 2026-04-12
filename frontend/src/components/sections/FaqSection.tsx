"use client";
import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const faqs = [
  {
    question: "Realizzate solo siti web?",
    answer:
      "No. Progettiamo ecosistemi digitali completi: siti, ecommerce, funnel di conversione, piattaforme, dashboard, automazioni, integrazioni e infrastrutture digitali costruite per supportare la crescita e migliorare la gestione operativa.",
  },
  {
    question: "Cosa vi distingue da una classica agenzia?",
    answer:
      "Non ci fermiamo al design o allo sviluppo di singoli asset. Lavoriamo come partner tecnico e strategico, progettando soluzioni che collegano immagine, processi, strumenti e performance in un sistema pi\u00f9 ordinato, efficiente e misurabile.",
  },
  {
    question: "Come utilizzate l\u2019IA nei progetti?",
    answer:
      "Usiamo l\u2019IA come leva per accelerare, organizzare e potenziare i processi, senza sostituire il valore umano. La tecnologia aumenta velocit\u00e0 e precisione; strategia, controllo e decisioni restano guidati dall\u2019esperienza.",
  },
  {
    question: "Possiamo integrare i vostri servizi con strumenti che utilizziamo gi\u00e0?",
    answer:
      "S\u00ec. Quando possibile partiamo da ci\u00f2 che l\u2019azienda ha gi\u00e0 costruito, integrando strumenti, processi e flussi di lavoro esistenti per migliorare l\u2019operativit\u00e0 senza creare complessit\u00e0 inutile.",
  },
  {
    question: "Ci seguite anche dopo la realizzazione?",
    answer:
      "S\u00ec. Un progetto digitale funziona davvero quando pu\u00f2 evolversi nel tempo. Per questo accompagniamo il cliente anche nelle fasi di ottimizzazione, miglioramento e crescita del sistema implementato.",
  },
  {
    question: "Perch\u00e9 scegliere CiMa come partner?",
    answer:
      "Perch\u00e9 uniamo visione progettuale, competenze tecniche e un approccio aggiornato ai sistemi digitali contemporanei. Costruiamo soluzioni concrete, pensate per essere utili, sostenibili e davvero integrate nel lavoro quotidiano dell\u2019azienda.",
  },
];

export default function FaqSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  useGSAP(() => {
    if (!titleRef.current || !listRef.current) return;

    gsap.fromTo(
      titleRef.current,
      { x: -40, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          toggleActions: "play none none reverse",
        },
      }
    );

    gsap.fromTo(
      Array.from(listRef.current.children),
      { y: 20, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.08,
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
      className="snap-section py-24 px-6 lg:px-12"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div ref={titleRef} className="lg:col-span-3">
          <h2 className="font-heading text-6xl lg:text-7xl font-bold">FAQs</h2>
        </div>
        <div ref={listRef} className="lg:col-span-9 space-y-0">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="border-b border-zinc-300 py-8"
              data-cursor="underline"
              data-faq-open={openIndex === i ? "true" : undefined}
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
            >
              <div className="flex justify-between items-center">
                <h3 className="text-2xl lg:text-3xl pr-4">
                  {faq.question}
                </h3>
                <svg
                  className={`w-6 h-6 shrink-0 transition-transform duration-300 ${
                    openIndex === i ? "rotate-45" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                </svg>
              </div>
              <div
                className="overflow-hidden transition-all duration-300"
                style={{
                  maxHeight: openIndex === i ? "200px" : "0px",
                  opacity: openIndex === i ? 1 : 0,
                }}
              >
                <p className="text-secondary leading-relaxed pt-4 text-lg">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
