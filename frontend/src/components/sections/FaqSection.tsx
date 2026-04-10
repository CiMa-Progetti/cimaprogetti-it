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
      "Non ci fermiamo al design o allo sviluppo di singoli asset. Lavoriamo come partner tecnico e strategico, progettando soluzioni che collegano immagine, processi, strumenti e performance in un sistema più ordinato, efficiente e misurabile.",
  },
  {
    question: "Come utilizzate l'IA nei progetti?",
    answer:
      "Usiamo l’IA come leva per accelerare, organizzare e potenziare i processi, senza sostituire il valore umano. La tecnologia aumenta velocità e precisione; strategia, controllo e decisioni restano guidati dall’esperienza.",
  },
  {
    question: "Possiamo integrare i vostri servizi con strumenti che utilizziamo già?",
    answer:
      "Sì. Quando possibile partiamo da ciò che l’azienda ha già costruito, integrando strumenti, processi e flussi di lavoro esistenti per migliorare l’operatività senza creare complessità inutile.",
  },
  {
    question: "Ci seguite anche dopo la realizzazione?",
    answer:
      "Sì. Un progetto digitale funziona davvero quando può evolversi nel tempo. Per questo accompagniamo il cliente anche nelle fasi di ottimizzazione, miglioramento e crescita del sistema implementato.",
  },
  {
    question: "Perché scegliere CiMa come partner?",
    answer:
      "Perché uniamo visione progettuale, competenze tecniche e un approccio aggiornato ai sistemi digitali contemporanei. Costruiamo soluzioni concrete, pensate per essere utili, sostenibili e davvero integrate nel lavoro quotidiano dell’azienda.",
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
      className="snap-section py-24 px-6 lg:px-12 bg-dark-bg text-white"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div ref={titleRef} className="lg:col-span-4">
          <h2 className="text-7xl font-black uppercase">FAQs</h2>
        </div>
        <div ref={listRef} className="lg:col-span-8 space-y-2">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="border-b border-zinc-700 py-6 cursor-pointer"
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
            >
              <div className="flex justify-between items-center">
                <h3 className="text-xl lg:text-2xl font-bold uppercase tracking-tight pr-4">
                  {faq.question}
                </h3>
                <span className="material-symbols-outlined text-4xl shrink-0 transition-transform duration-300"
                  style={{ transform: openIndex === i ? "rotate(45deg)" : "rotate(0deg)" }}
                >
                  add
                </span>
              </div>
              <div
                className="overflow-hidden transition-all duration-300"
                style={{
                  maxHeight: openIndex === i ? "200px" : "0px",
                  opacity: openIndex === i ? 1 : 0,
                }}
              >
                <p className="text-zinc-400 font-medium leading-relaxed pt-4">
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
