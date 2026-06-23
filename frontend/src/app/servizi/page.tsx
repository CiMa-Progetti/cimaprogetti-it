"use client";
// ============================================================
// Servizi — service areas overview (port of PageServizi.jsx)
// ============================================================
import React, { useState, useEffect } from "react";
import { Eyebrow, Icon } from "@/components/ds";
import { CtaFooter } from "@/components/Shared";
import { useReveal } from "@/components/hooks/useReveal";

const AREE: {
  id: string;
  num: string;
  nav: string;
  title: string;
  desc: string;
  services: { icon: string; name: string; desc: string; green?: boolean }[];
  result: React.ReactNode;
  cross: { label: string; to: string }[];
}[] = [
  {
    id: "ia",
    num: "01",
    nav: "IA & Automazione",
    title: "IA & Automazione",
    desc: "Mettiamo l'intelligenza artificiale al servizio dei tuoi processi: automatizziamo ciò che ti ruba tempo e potenziamo le decisioni con i tuoi stessi dati. L'IA è una leva, non un sostituto del valore umano.",
    services: [
      { icon: "account_tree", name: "Automazioni di flussi", desc: "Processi ripetitivi gestiti end-to-end, senza intervento manuale." },
      { icon: "memory", name: "Integrazione di IA nei flussi", desc: "Modelli e agenti inseriti dentro i tuoi processi esistenti." },
      { icon: "smart_toy", name: "Chatbot & Assistenti", desc: "Assistenti che rispondono, smistano e operano H24." },
      { icon: "insights", name: "IA per analisi & reportistica", desc: "Sintesi e insight generati automaticamente sui tuoi dati." },
      { icon: "dns", name: "Configurazione IA in locale", desc: "Modelli eseguiti on-premise, per privacy e controllo totale." },
    ],
    result: (
      <>
        Meno tempo speso in attività ripetitive, più capacità decisionale guidata dai dati.{" "}
        <span style={{ opacity: 0.7 }}>[Esempio rappresentativo — DA INSERIRE caso reale]</span>
      </>
    ),
    cross: [
      { label: "Si combina con Piattaforme & Portali", to: "piat" },
      { label: "e con Organizzazione & Gestione", to: "org" },
    ],
  },
  {
    id: "org",
    num: "02",
    nav: "Organizzazione & Gestione",
    title: "Organizzazione & Gestione",
    desc: "Mettiamo ordine nei dati e nei processi. Dashboard, gestionali e archivi digitali che centralizzano le informazioni e ti danno controllo in tempo reale, fino alla conformità normativa.",
    services: [
      { icon: "schema", name: "Dashboard operative", desc: "Controllo e visibilità in tempo reale su ciò che conta." },
      { icon: "table_view", name: "Sistemi gestionali", desc: "Gestionali su misura dei tuoi processi reali." },
      { icon: "folder_open", name: "Archivi digitali", desc: "Documenti e dati centralizzati, ricercabili e sicuri." },
      { icon: "eco", name: "Sistemi ESG per direttive CSRD", desc: "Raccolta e rendicontazione dati di sostenibilità conformi.", green: true },
    ],
    result: (
      <>
        Dati prima frammentati ora centralizzati in un'unica vista decisionale.{" "}
        <span style={{ opacity: 0.7 }}>[Esempio rappresentativo — DA INSERIRE caso reale]</span>
      </>
    ),
    cross: [
      { label: "Si potenzia con IA & Automazione", to: "ia" },
      { label: "e con Proteggi", to: "prot" },
    ],
  },
  {
    id: "prot",
    num: "03",
    nav: "Proteggi",
    title: "Proteggi",
    desc: "Blindiamo l'ecosistema digitale con soluzioni di cybersicurezza reali: difesa proattiva, controllo degli accessi e protezione dei dati, a ogni livello dell'infrastruttura.",
    services: [
      { icon: "security", name: "Protezione sistemi & dati", desc: "Difesa proattiva e monitoraggio costante degli asset." },
      { icon: "key", name: "Gestione permessi & accessi", desc: "Chi può fare cosa: ruoli e accessi sotto controllo." },
      { icon: "dns", name: "Sicurezza infrastrutturale", desc: "Reti, server e ambienti protetti per design." },
      { icon: "encrypted", name: "Protezione Dati", desc: "Crittografia, backup e conformità alla privacy." },
    ],
    result: (
      <>
        Vulnerabilità chiuse e accessi tracciati, con continuità operativa garantita.{" "}
        <span style={{ opacity: 0.7 }}>[Esempio rappresentativo — DA INSERIRE caso reale]</span>
      </>
    ),
    cross: [{ label: "È la base per Piattaforme & Portali", to: "piat" }],
  },
  {
    id: "piat",
    num: "04",
    nav: "Piattaforme & Portali",
    title: "Piattaforme & Portali",
    desc: "Le fondamenta portanti del tuo digitale: portali, aree riservate, app e piattaforme su misura, integrate con i tuoi database e pronte a scalare come SaaS.",
    services: [
      { icon: "corporate_fare", name: "Portali interni aziendali", desc: "Un'unica casa digitale per team e processi." },
      { icon: "lock", name: "Aree riservate per clienti", desc: "Spazi protetti dove i clienti accedono ai loro servizi." },
      { icon: "phone_iphone", name: "App Mobile iOS & Android", desc: "Applicazioni native e cross-platform performanti." },
      { icon: "dashboard_customize", name: "Piattaforme", desc: "Software web custom costruito sui tuoi processi." },
      { icon: "cable", name: "Integrazione database", desc: "Colleghiamo gli strumenti che oggi non si parlano." },
      { icon: "cloud", name: "SaaS", desc: "Prodotti software erogati come servizio, pronti a scalare." },
    ],
    result: (
      <>
        Strumenti aziendali finalmente connessi in un'unica piattaforma scalabile.{" "}
        <span style={{ opacity: 0.7 }}>[Esempio rappresentativo — DA INSERIRE caso reale]</span>
      </>
    ),
    cross: [
      { label: "Si integra con IA & Automazione", to: "ia" },
      { label: "e con E-commerce & Website", to: "web" },
    ],
  },
  {
    id: "web",
    num: "05",
    nav: "E-commerce & Website",
    title: "E-commerce & Website",
    desc: "Trasformiamo l'attenzione in clienti. Siti, e-commerce ed esperienze digitali progettati non solo per essere belli, ma per convertire — veloci, accessibili e misurabili.",
    services: [
      { icon: "shopping_bag", name: "E-commerce", desc: "Negozi online che gestiscono ogni fase della vendita." },
      { icon: "monitor", name: "Siti web aziendali", desc: "Presenza digitale veloce, chiara e orientata all'azione." },
      { icon: "design_services", name: "UI/UX design", desc: "Interfacce curate, usabili e coerenti col brand." },
      { icon: "trending_up", name: "SEO & CRO", desc: "Più visibilità e più conversioni, dati alla mano." },
    ],
    result: (
      <>
        Più richieste qualificate grazie a percorsi di conversione ottimizzati.{" "}
        <span style={{ opacity: 0.7 }}>[Esempio rappresentativo — DA INSERIRE caso reale]</span>
      </>
    ),
    cross: [{ label: "Si potenzia con IA & Automazione", to: "ia" }],
  },
  {
    id: "altri",
    num: "06",
    nav: "Altri servizi",
    title: "Altri servizi",
    desc: "Oltre alla realizzazione, ti accompagniamo prima e dopo: dalla strategia alla formazione, dalla manutenzione alla consulenza, perché il sistema resti solido nel tempo.",
    services: [
      { icon: "school", name: "Formazione", desc: "Mettiamo il tuo team in grado di usare al meglio gli strumenti." },
      { icon: "architecture", name: "Strategia & progettazione", desc: "Dall'idea all'architettura, prima di scrivere codice." },
      { icon: "build", name: "Manutenzione & assistenza", desc: "Supporto continuo: il sistema evolve insieme a te." },
      { icon: "troubleshoot", name: "Risoluzione problemi", desc: "Interventi mirati quando qualcosa va sistemato." },
      { icon: "handshake", name: "Consulenza", desc: "Partner tecnico e strategico per le tue decisioni digitali." },
    ],
    result: (
      <>
        Un unico interlocutore per progettare, realizzare e far crescere il digitale.{" "}
        <span style={{ opacity: 0.7 }}>[Esempio rappresentativo — DA INSERIRE caso reale]</span>
      </>
    ),
    cross: [{ label: "Accompagna tutte le altre aree", to: "ia" }],
  },
];

export default function PageServizi() {
  useReveal();
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => {
      const threshold = window.innerHeight * 0.35;
      let cur: string | null = null;
      for (const a of AREE) {
        const el = document.getElementById("area-" + a.id);
        if (!el) continue;
        const r = el.getBoundingClientRect();
        if (r.top <= threshold) cur = a.id;
      }
      setActive(cur);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const jump = (id: string) => {
    const el = document.getElementById("area-" + id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div>
      <div className="cm-servizi cm-servizi--top">
        <aside className="cm-servizi__nav" aria-label="Indice servizi">
          <Eyebrow>Servizi</Eyebrow>
          <p className="cm-servizi__nav-title" style={{ marginTop: "1.25rem" }}>
            Aree
          </p>
          {AREE.map((a) => (
            <button
              key={a.id}
              className={"cm-servizi__navlink" + (active === a.id ? " is-active" : "")}
              onClick={() => jump(a.id)}
              data-cursor="underline"
            >
              {a.nav}
            </button>
          ))}
        </aside>

        <div>
          <div className="cm-servizi__intro cm-reveal">
            <h1 className="text-huge" style={{ margin: 0 }}>
              LE NOSTRE
              <br />
              SOLUZIONI
            </h1>
            <div className="accent-bar" style={{ marginTop: "1.25rem", marginBottom: "1.5rem" }} />
            <p className="cm-pagehero__intro" style={{ maxWidth: "54ch" }}>
              Non offriamo servizi isolati. Qui li trovi organizzati per aree, per rendere la consultazione
              più chiara. Nella realtà, spesso un progetto nasce dall'incontro di più elementi.
            </p>
          </div>

          {AREE.map((a) => (
            <section className="cm-area cm-reveal" id={"area-" + a.id} key={a.id}>
              <span className="cm-area__num">{a.num} —</span>
              <h2 className="cm-area__title">{a.title}</h2>
              <p className="cm-area__desc">{a.desc}</p>
              <ul className="cm-area__list">
                {a.services.map((s) => (
                  <li key={s.name} className={s.green ? "cm-svc--green" : undefined}>
                    <span className="material-symbols-outlined">{s.icon}</span>
                    <span>
                      <strong>{s.name}</strong>
                      <span className="cm-svc-desc">{s.desc}</span>
                    </span>
                  </li>
                ))}
              </ul>
              <div className="cm-area__result">
                <Icon name="trending_up" />
                <p>{a.result}</p>
              </div>
              <div className="cm-area__cross">
                <Icon name="alt_route" size={18} style={{ color: "var(--cm-blue)" }} />
                {a.cross.map((c, i) => (
                  <button className="cm-chip" key={i} onClick={() => jump(c.to)} data-cursor="hug">
                    {c.label}
                  </button>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>

      <CtaFooter title="DA DOVE<br/>PARTIAMO?" sub="Raccontaci l'esigenza: combiniamo le aree giuste in un'unica soluzione." />
    </div>
  );
}
