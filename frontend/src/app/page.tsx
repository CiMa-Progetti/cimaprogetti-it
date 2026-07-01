"use client";
// ============================================================
// Home — funnel narrativo (port of PageHome.jsx)
// ============================================================
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button, Eyebrow, SectionHeading, FaqItem, Logo, Icon } from "@/components/ds";
import { CtaFooter } from "@/components/Shared";
import { useReveal } from "@/components/hooks/useReveal";
import { ROUTE_PATH, type Route } from "@/lib/routes";

const HOME_NEWS = [
  { tag: "Novità", icon: "bolt", title: "CiMa OS in sviluppo", text: "Kernel e automazioni AI-driven: un layer intelligente sotto ogni applicazione." },
  { tag: "Garanzia", icon: "verified_user", title: "Garanzia completa", text: "Tutti i nostri servizi sono coperti: se qualcosa non funziona come concordato, lo sistemiamo." },
  { tag: "Transizione 5.0", icon: "trending_up", title: "Incentivi 5.0", text: "Accompagniamo le imprese negli incentivi per la digitalizzazione e l'innovazione." },
  { tag: "Manifesto", icon: "architecture", title: "La forma segue la funzione", text: "La struttura la rende duratura. Ogni riga di codice è un pilastro." },
  { tag: "Un solo partner", icon: "hub", title: "Un unico ecosistema", text: "IA, conversione online e infrastrutture digitali, da un solo partner tecnico e strategico." },
];

const HOME_SERVICES = [
  { icon: "memory", title: "Potenzia i tuoi processi", short: "Automazioni & IA", details: ["Automazioni dei lavori ripetitivi", "Agenti e chatbot intelligenti", "Report generati dall'IA sui tuoi dati"] },
  { icon: "schema", title: "Organizza & gestisci", short: "Dashboard & gestionali", details: ["Gestionali su misura dei tuoi processi", "Dashboard con dati in tempo reale", "Integrazioni tra strumenti esistenti"] },
  { icon: "verified_user", title: "Proteggi i tuoi dati", short: "Cybersicurezza", details: ["Protocolli di difesa proattivi", "Monitoraggio costante degli asset", "Backup e continuità operativa"] },
  { icon: "hub", title: "Dai forma alla tua idea", short: "App & piattaforme", details: ["Piattaforme e web app custom", "Infrastrutture digitali portanti", "Architetture pensate per scalare"] },
  { icon: "shopping_bag", title: "Vendi & sii online", short: "E-commerce & siti", details: ["E-commerce e siti web aziendali", "Gestione pagamenti e spedizioni", "Funnel orientati alla conversione"] },
  { icon: "school", title: "Forma il tuo team", short: "Formazione", details: ["Percorsi su misura sugli strumenti adottati", "Affianchiamo le persone, non solo la tecnologia", "Autonomia reale nell'uso quotidiano"] },
];

const HOME_BA = [
  { before: "Database frammentati", after: "Flussi centralizzati" },
  { before: "Processi manuali obsoleti", after: "Automazione intelligente" },
  { before: "Vulnerabilità di sistema", after: "Crittografia avanzata" },
  { before: "Controllo strategico perso", after: "Dashboard real-time" },
];

const HOME_FAQS = [
  { q: "Realizzate solo siti web?", a: "No. Progettiamo ecosistemi digitali completi: siti, ecommerce, funnel di conversione, piattaforme, dashboard, automazioni, integrazioni e infrastrutture digitali costruite per supportare la crescita." },
  { q: "Cosa vi distingue da una classica agenzia?", a: "Non ci fermiamo al design o allo sviluppo di singoli asset. Lavoriamo come partner tecnico e strategico, progettando soluzioni che collegano immagine, processi, strumenti e performance in un sistema più ordinato, efficiente e misurabile." },
  { q: "Come utilizzate l'IA nei progetti?", a: "Usiamo l'IA come leva per accelerare, organizzare e potenziare i processi, senza sostituire il valore umano. La tecnologia aumenta velocità e precisione; strategia, controllo e decisioni restano guidati dall'esperienza." },
  { q: "Ci seguite anche dopo la realizzazione?", a: "Sì. Un progetto digitale funziona davvero quando può evolversi nel tempo. Per questo accompagniamo il cliente anche nelle fasi di ottimizzazione, miglioramento e crescita del sistema implementato." },
  { q: "Cosa rende CiMa il partner giusto?", a: "Uniamo visione progettuale, competenze tecniche e un approccio aggiornato ai sistemi digitali contemporanei. Costruiamo soluzioni concrete, utili, sostenibili e davvero integrate nel lavoro quotidiano." },
];

function NewsRotator() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const n = HOME_NEWS.length;
  useEffect(() => {
    if (paused) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const id = setInterval(() => setI((x) => (x + 1) % n), 4200);
    return () => clearInterval(id);
  }, [paused, n]);
  const cur = HOME_NEWS[i];
  return (
    <section className="cm-sec cm-sec--tight" style={{ paddingTop: "1rem" }}>
      <div
        className="cm-newsbox cm-reveal"
        role="button"
        tabIndex={0}
        data-cursor="hug"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onClick={() => setI((x) => (x + 1) % n)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") setI((x) => (x + 1) % n);
        }}
      >
        <div className="cm-newsbox__inner" key={i}>
          <span className="cm-newsbox__icon"><span className="material-symbols-outlined">{cur.icon}</span></span>
          <div className="cm-newsbox__text">
            <span className="cm-newsbox__tag">{cur.tag}</span>
            <h3 className="cm-newsbox__title">{cur.title}</h3>
            <p>{cur.text}</p>
          </div>
        </div>
        <div className="cm-newsbox__dots" role="tablist" aria-label="Novità">
          {HOME_NEWS.map((_, k) => (
            <button
              key={k}
              className={"cm-dot cm-dot--light" + (k === i ? " is-active" : "")}
              onClick={(e) => {
                e.stopPropagation();
                setI(k);
              }}
              aria-label={"Novità " + (k + 1)}
              data-cursor="hug"
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function BeforeAfterRows() {
  return (
    <div className="cm-ba2">
      <div className="cm-ba2__col cm-ba2__col--before">
        <span className="cm-ba2__label">Prima</span>
        <ul>{HOME_BA.map((r, i) => <li key={i}>{r.before}</li>)}</ul>
      </div>
      <div className="cm-ba2__arrow" aria-hidden="true"><Icon name="arrow_forward" size={26} /></div>
      <div className="cm-ba2__col cm-ba2__col--after">
        <span className="cm-ba2__label">Dopo</span>
        <ul>{HOME_BA.map((r, i) => <li key={i}>{r.after}</li>)}</ul>
      </div>
    </div>
  );
}

function ServiceTile({ s }: { s: (typeof HOME_SERVICES)[number] }) {
  return (
    <article className="cm-svccard" tabIndex={0} data-cursor="hug">
      <span className="cm-svccard__icon"><span className="material-symbols-outlined">{s.icon}</span></span>
      <div className="cm-svccard__slider">
        <div className="cm-svccard__front">
          <h3 className="cm-svccard__title">{s.title}</h3>
          <span className="cm-svccard__short">{s.short}</span>
        </div>
        <div className="cm-svccard__back">
          <ul>
            {s.details.map((d) => (
              <li key={d}><span className="material-symbols-outlined">check</span>{d}</li>
            ))}
          </ul>
        </div>
      </div>
      <span className="cm-svccard__more"><Icon name="expand_less" size={20} /></span>
    </article>
  );
}

export default function Home() {
  useReveal();
  const router = useRouter();
  const onNavigate = (r: Route) => router.push(ROUTE_PATH[r]);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <div className="cm-fold-shell">
      {/* HERO */}
      <section className="cm-hero">
        <Eyebrow lower>soluzioni digitali</Eyebrow>
        <h1 className="cm-hero__title hero-slide-up">
          Porta in <Logo variant="wordmark" height={64} src="/inline-logo.svg" />
          <br />il tuo business.
        </h1>
        <p className="cm-hero__sub">
          Il tuo partner per scalare nella transizione 5.0:{" "}
          <strong>leader in automazioni IA, conversione online e infrastrutture digitali per le aziende.</strong>
        </p>
        <div className="cm-hero__cta">
          <Button onClick={() => onNavigate("servizi")}>Scopri i servizi</Button>
          <Button variant="outline" onClick={() => onNavigate("contatti")}>Contattaci</Button>
        </div>
        <button
          className="cm-hero__scroll"
          onClick={() => document.getElementById("home-approccio")?.scrollIntoView({ behavior: "smooth" })}
          data-cursor="hug"
        >
          <span className="cm-hero__scroll-circle"><span className="material-symbols-outlined">arrow_downward</span></span>
          Scopri di più
        </button>
      </section>

      {/* NEWS ROTATOR */}
      <NewsRotator />

      {/* APPROCCIO */}
      <section id="home-approccio" className="cm-sec">
        <div className="cm-approccio__head cm-reveal">
          <div className="cm-eyebrow-row">
            <Eyebrow>L'approccio</Eyebrow>
            <SectionHeading level="h2">Un ecosistema<br />integrato</SectionHeading>
          </div>
          <div className="cm-approccio__spacer" aria-hidden="true"></div>
          <p className="cm-lead">
            Non costruiamo software isolati, ma infrastrutture digitali portanti. Ogni riga di codice è un
            pilastro, ogni interfaccia un varco verso l'efficienza. Trasformiamo il caos informativo in un
            sistema di precisione millimetrica.
          </p>
        </div>
        <div className="cm-reveal"><BeforeAfterRows /></div>
      </section>

      {/* SERVIZI panoramica */}
      <section className="cm-sec cm-sec--tight">
        <div className="cm-services__head cm-reveal">
          <SectionHeading level="h2" bar>
            Servizi <span className="cima-accent">essenziali</span>. Impatto concreto.
          </SectionHeading>
          <p className="cm-lead cm-center" style={{ maxWidth: "52ch" }}>
            Trasformiamo esigenze operative e obiettivi aziendali in strumenti concreti. Passa il mouse su
            ogni servizio per scoprire cosa include.
          </p>
        </div>
        <div className="cm-svcgrid cm-reveal">
          {HOME_SERVICES.map((s) => <ServiceTile key={s.icon} s={s} />)}
        </div>
        <div className="cm-center" style={{ marginTop: "2.5rem" }}>
          <Button variant="outline" onClick={() => onNavigate("servizi")}>Esplora tutti i servizi</Button>
        </div>
      </section>

      {/* VISION */}
      <section className="cm-quote cm-reveal">
        <p>
          "Trasformiamo le tue idee in realtà digitale: velocità dell'IA ed esperienza umana, <span className="cima-accent">animate dalla tua visione</span>."
        </p>
      </section>

      {/* TEASER CHI SIAMO */}
      <section className="cm-sec">
        <div className="cm-teaser cm-reveal">
          <div className="cm-teaser__photo" data-cursor="hug">
            <img src="/images/team.jpg" alt="Nicola Leone Ciardi e Valentina Madaudo" loading="lazy" />
          </div>
          <div className="cm-teaser__body">
            <Eyebrow>Chi siamo</Eyebrow>
            <p className="cm-muted">Due figure giovani, ma strutturate: il dualismo di tecnica e visione, processo e creatività, velocità e consapevolezza.</p>
            <SectionHeading level="h2">
              Dall'idea<br />ai processi.<br />Dalla <span className="cima-accent">visione</span><br />al sistema.
            </SectionHeading>
            <p className="cm-muted">Innovare significa integrare competenze e prospettive, per costruire soluzioni non solo funzionali, ma solide nel tempo.</p>
            <p className="cm-teaser__names">
              Nicola Leone <span className="cima-accent">Ci</span>ardi&nbsp;&nbsp;·&nbsp;&nbsp;Valentina <span className="cima-accent">Ma</span>daudo
            </p>
            <hr className="cm-teaser__divider" />
            <button className="cm-teaser__cta" onClick={() => onNavigate("chisiamo")} data-cursor="hug">
              Scopri chi siamo <Icon name="arrow_forward" size={20} />
            </button>
          </div>
        </div>
      </section>

      {/* SYSTEM UPGRADE */}
      <CtaFooter title="SYSTEM<br/>UPGRADE" sub="Progettiamo insieme il prossimo tassello digitale della tua azienda." />

      {/* FAQ */}
      <section className="cm-sec">
        <div className="cm-faq cm-reveal">
          <h2 className="cm-faq__title">FAQ</h2>
          <div className="cm-faq__list">
            {HOME_FAQS.map((f, i) => (
              <div key={i} onMouseEnter={() => setOpenFaq(i)}>
                <FaqItem question={f.q} open={openFaq === i} onToggle={() => setOpenFaq(openFaq === i ? null : i)}>{f.a}</FaqItem>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
