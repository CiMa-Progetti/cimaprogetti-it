"use client";
// ============================================================
// Metodo — il metodo di lavoro (port of PageMetodo.jsx)
// ============================================================
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button, Eyebrow, SectionHeading, Icon } from "@/components/ds";
import { useReveal } from "@/components/hooks/useReveal";
import { ROUTE_PATH, type Route } from "@/lib/routes";

const METODO_VALUES = [
  { icon: "visibility", title: "Chiarezza", body: "Linguaggio semplice, gerarchia forte, niente gergo non spiegato. Sai sempre cosa stiamo costruendo e perché." },
  { icon: "build", title: "Praticità", body: "Mostriamo il \"come\" con esempi concreti e risultati reali, non promesse astratte." },
  { icon: "verified_user", title: "Sicurezza", body: "Soluzioni solide nel tempo, processi trasparenti, interazioni affidabili e prevedibili." },
  { icon: "speed", title: "Ottimizzazione", body: "Performance reali, flussi efficienti, sistemi che restano veloci anche mentre cresci." },
];

const METODO_STEPS = [
  { n: "01", title: "Ascolto & Analisi", phase: "Discovery", what: "Studiamo processi, obiettivi e vincoli reali. Mappiamo dove nasce l'inefficienza.", get: "Una fotografia chiara dello stato attuale e delle priorità.", value: "Chiarezza" },
  { n: "02", title: "Strategia & Architettura", phase: "Blueprint", what: "Disegniamo l'architettura del sistema: come i pezzi si parlano e dove l'IA fa leva.", get: "Un piano tecnico-strategico condiviso, prima di scrivere codice.", value: "Praticità" },
  { n: "03", title: "Sviluppo & Integrazione", phase: "Build", what: "Costruiamo per moduli, integrando strumenti esistenti e nuove automazioni.", get: "Un sistema funzionante, costruito su pilastri solidi.", value: "Ottimizzazione" },
  { n: "04", title: "Test & Sicurezza", phase: "Hardening", what: "Verifichiamo qualità, performance e protezione dei dati con protocolli reali.", get: "Affidabilità misurata e vulnerabilità chiuse.", value: "Sicurezza" },
  { n: "05", title: "Lancio & Ottimizzazione continua", phase: "Scale", what: "Andiamo live e continuiamo a migliorare il sistema nel tempo, dati alla mano.", get: "Un ecosistema che evolve insieme alla tua azienda.", value: "Ottimizzazione" },
];

const METODO_GARANZIE = [
  { icon: "verified", title: "Garanzia completa", body: "Tutti i nostri servizi sono coperti da garanzia. Se qualcosa non funziona come concordato, lo sistemiamo." },
  { icon: "handshake", title: "Trasparenza di processo", body: "Tempi, avanzamenti e decisioni sempre visibili. Nessuna scatola nera: sai sempre a che punto siamo." },
  { icon: "update", title: "Supporto nel tempo", body: "Non spariamo dopo il lancio. Accompagniamo ottimizzazione, miglioramento e crescita del sistema." },
  { icon: "encrypted", title: "Dati al sicuro", body: "Protezione e riservatezza per ogni asset digitale, con protocolli di difesa proattivi." },
];

const METODO_IMPACT = [
  { chip: "− sprechi", icon: "cleaning_services", title: "Ottimizzazione", desc: "Elimini ciò che non serve: processi puliti e tempo recuperato." },
  { chip: "− errori", icon: "task_alt", title: "Meno ripetizioni", desc: "Automazioni affidabili: meno errori manuali e rilavorazioni." },
  { chip: "+ velocità", icon: "speed", title: "Più rapidità", desc: "Flussi più veloci e decisioni in tempo reale sui dati." },
  { chip: "− costi", icon: "savings", title: "Risparmio reale", desc: "Costi operativi che scendono e valore che resta nel tempo." },
];

function ImpactTrack() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const n = METODO_IMPACT.length;
  useEffect(() => {
    if (paused) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setActive((a) => (a + 1) % n), 2600);
    return () => clearInterval(id);
  }, [paused, n]);
  return (
    <div className="cm-impact__track-wrap">
      <span className="cm-impact__yaxis">impatto sul <strong>tuo</strong> business</span>
      <div className="cm-impact__track" onMouseLeave={() => setPaused(false)}>
        {METODO_IMPACT.map((it, i) => (
          <div key={it.chip}
            className={"cm-impact__pt" + (active === i ? " is-active" : "")}
            onMouseEnter={() => { setActive(i); setPaused(true); }}
            onFocus={() => { setActive(i); setPaused(true); }}
            tabIndex={0}>
            <div className="cm-impact__desc">
              <h4>{it.title}</h4>
              <p>{it.desc}</p>
            </div>
            <div className="cm-impact__marker"><Icon name={it.icon} size={28} /></div>
            <div className="cm-impact__chip">{it.chip}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function PageMetodo() {
  useReveal();
  const router = useRouter();
  const onNavigate = (r: Route) => router.push(ROUTE_PATH[r]);

  return (
    <div>
      {/* INTRO */}
      <section className="cm-pagehero">
        <div className="cm-pagehero__grid cm-reveal">
          <div>
            <Eyebrow>Il metodo</Eyebrow>
            <h1 className="text-huge" style={{ marginTop: "1rem" }}>COME<br />LAVORIAMO</h1>
            <div className="accent-bar" style={{ marginTop: "1.25rem" }} />
          </div>
          <p className="cm-pagehero__intro">
            Un metodo è una promessa. Il nostro è ancorato a quattro valori — chiarezza, praticità,
            sicurezza e ottimizzazione — che attraversano ogni fase del lavoro.
          </p>
        </div>
        <div className="cm-values cm-reveal">
          {METODO_VALUES.map((v) => (
            <div className="cm-value" key={v.title}>
              <span className="material-symbols-outlined">{v.icon}</span>
              <h3>{v.title}</h3>
              <p>{v.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* PROCESSO IN FASI */}
      <section className="cm-sec">
        <div className="cm-eyebrow-row cm-reveal" style={{ marginBottom: "1rem" }}>
          <Eyebrow>Il processo</Eyebrow>
          <SectionHeading level="h2">Fasi chiare,<br />nessuna sorpresa.</SectionHeading>
        </div>
        <div className="cm-steps">
          {METODO_STEPS.map((s) => (
            <div className="cm-step cm-reveal" key={s.n}>
              <div className="cm-step__num">{s.n}</div>
              <div className="cm-step__body">
                <div>
                  <p className="cm-step__phase">{s.phase}</p>
                  <h3 className="cm-step__title">{s.title}</h3>
                </div>
                <div className="cm-step__col">
                  <h4>Cosa facciamo</h4>
                  <p>{s.what}</p>
                </div>
                <div className="cm-step__col">
                  <h4>Cosa ottieni</h4>
                  <p>{s.get}</p>
                  <span className="cm-step__value" style={{ marginTop: "0.75rem" }}>
                    <Icon name="check_circle" size={16} />{s.value}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* RISULTATI MISURABILI */}
      <section className="cm-impact cm-reveal">
        <div className="cm-impact__inner">
          <div className="cm-impact__head">
            <p className="cm-impact__eyebrow">Risultati misurabili</p>
            <h2 className="cm-impact__title">Risultati concreti.<br />Non solo bei progetti.</h2>
            <p className="cm-impact__sub">Il metodo è pensato per produrre impatto reale: più praticità, più ottimizzazione, più risparmio. Passa il mouse sui traguardi — o lasciali scorrere.</p>
          </div>
          <ImpactTrack />
        </div>
      </section>

      {/* GARANZIA & TRASPARENZA */}
      <section className="cm-sec cm-sec--tight" style={{ paddingTop: "6rem" }}>
        <div className="cm-eyebrow-row cm-reveal" style={{ marginBottom: "1rem" }}>
          <Eyebrow>Garanzia & trasparenza</Eyebrow>
          <SectionHeading level="h2">Cosa <span className="cima-accent">garantiamo</span>.</SectionHeading>
        </div>
        <div className="cm-garanzia cm-reveal">
          {METODO_GARANZIE.map((g) => (
            <div className="cm-garanzia__card" key={g.title}>
              <span className="material-symbols-outlined">{g.icon}</span>
              <h3>{g.title}</h3>
              <p>{g.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA minimale */}
      <section className="cm-sec cm-minicta cm-reveal">
        <Button onClick={() => onNavigate("contatti")}>Prenota una call</Button>
        <Button variant="outline" onClick={() => onNavigate("contatti")}>Contattaci</Button>
      </section>
    </div>
  );
}
