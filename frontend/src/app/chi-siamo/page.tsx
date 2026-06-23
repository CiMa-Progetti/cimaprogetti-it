"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Eyebrow, SectionHeading, Button, Icon } from "@/components/ds";
import { Placeholder } from "@/components/Shared";
import { useReveal } from "@/components/hooks/useReveal";
import { ROUTE_PATH, type Route } from "@/lib/routes";

// ============================================================
// Type definitions for strict TypeScript
// ============================================================

interface TeamMember {
  name: string;
  accent?: string;
  role: string;
  bio: string;
  linkedin?: boolean;
  photo?: string;
  pos?: string;
  placeholder?: boolean;
}

interface FounderSkill {
  icon: string;
  label: string;
}

interface Founder {
  concept: string;
  name: string;
  first: string;
  accent: string;
  rest: string;
  role: string;
  pos: string;
  long: string;
  skills: FounderSkill[];
}

// ============================================================
// Data
// ============================================================

const TEAM: TeamMember[] = [
  {
    name: "Nicola Leone Ciardi",
    accent: "Ci",
    role: "Co-Founder & CEO",
    bio: "Management e computer science. Tiene insieme tecnica e direzione: dall'architettura del codice alla rotta strategica.",
    linkedin: true,
    photo: "team",
    pos: "30% center",
  },
  {
    name: "Valentina Madaudo",
    accent: "Ma",
    role: "Co-Founder & CFO",
    bio: "Jr Engineer & economist for sustainable development. Unisce rigore economico e visione sostenibile alla crescita.",
    linkedin: true,
    photo: "team",
    pos: "70% center",
  },
  {
    name: "[DA INSERIRE]",
    role: "Engineering",
    bio: "Profilo del team in arrivo. Inserisci avatar, nome e bio dal file system.",
    placeholder: true,
  },
  {
    name: "[DA INSERIRE]",
    role: "Design & UX",
    bio: "Profilo del team in arrivo. Inserisci avatar, nome e bio dal file system.",
    placeholder: true,
  },
  {
    name: "[DA INSERIRE]",
    role: "AI & Automazione",
    bio: "Profilo del team in arrivo. Inserisci avatar, nome e bio dal file system.",
    placeholder: true,
  },
  {
    name: "[DA INSERIRE]",
    role: "Growth",
    bio: "Profilo del team in arrivo. Inserisci avatar, nome e bio dal file system.",
    placeholder: true,
  },
  {
    name: "[DA INSERIRE]",
    role: "Project Management",
    bio: "Profilo del team in arrivo. Inserisci avatar, nome e bio dal file system.",
    placeholder: true,
  },
];

const FOUNDERS: Founder[] = [
  {
    concept: "La tecnica",
    name: "Nicola Leone Ciardi",
    first: "Nicola Leone",
    accent: "Ci",
    rest: "ardi",
    role: "Co-Founder & CEO",
    pos: "30% center",
    long: "Parte dal codice e dall'architettura: come deve essere costruito un sistema perché regga, scali e resti sicuro. Il rigore tecnico che dà struttura all'idea, dalla prima riga di codice fino alla rotta strategica dell'azienda.",
    skills: [
      { icon: "terminal", label: "Architettura & engineering" },
      { icon: "memory", label: "IA & automazione" },
      { icon: "schema", label: "Processo & metodo" },
    ],
  },
  {
    concept: "La visione",
    name: "Valentina Madaudo",
    first: "Valentina",
    accent: "Ma",
    rest: "daudo",
    role: "Co-Founder & CFO",
    pos: "70% center",
    long: "Parte dall'obiettivo e dalla sostenibilità: dove deve arrivare il progetto e che valore deve generare. La direzione strategica che dà senso alla struttura, unendo rigore economico e prospettiva di crescita.",
    skills: [
      { icon: "insights", label: "Strategia & sostenibilità" },
      { icon: "account_balance", label: "Economia & finanza" },
      { icon: "lightbulb", label: "Visione & creatività" },
    ],
  },
];

// ============================================================
// Components
// ============================================================

function TeamCard({ p }: { p: TeamMember }) {
  return (
    <React.Fragment>
      <div className="cm-deck__photo">
        {p.placeholder ? (
          <Placeholder label="Avatar" icon="person" />
        ) : (
          <img src={"/images/" + p.photo + ".jpg"} alt={p.name} loading="lazy" style={{ objectPosition: p.pos }} />
        )}
      </div>
      <div className="cm-deck__meta">
        <p className="cm-deck__role">{p.role}</p>
        <p className="cm-deck__name">{p.placeholder ? "[DA INSERIRE]" : p.name.split(" ")[0]}</p>
      </div>
    </React.Fragment>
  );
}

function TeamDeck() {
  const [active, setActive] = useState(0);
  const n = TEAM.length;
  const cur = TEAM[active];

  const go = (d: number) => setActive((i) => ((i + d) % n + n) % n);

  return (
    <div className="cm-deck-wrap">
      <div className="cm-deck-row">
        <button className="cm-navbtn cm-deck-arrow" onClick={() => go(-1)} aria-label="Precedente" data-cursor="hug">
          <Icon name="arrow_back" size={24} />
        </button>

        <div className="cm-deck cm-deck--carousel">
          {TEAM.map((p, i) => {
            let offset = i - active;
            if (offset > n / 2) offset -= n;
            if (offset < -n / 2) offset += n;
            const abs = Math.abs(offset);
            const isActive = offset === 0;
            const transform = `translateX(calc(-50% + ${offset * 150}px)) translateY(${isActive ? -10 : 0}px) scale(${isActive ? 1.06 : 0.86})`;
            return (
              <button
                key={i}
                className={"cm-deck__card" + (isActive ? " is-active" : "")}
                style={{
                  transform,
                  zIndex: 10 - abs,
                  opacity: abs > 2 ? 0 : 1 - abs * 0.16,
                  pointerEvents: abs > 2 ? "none" : "auto",
                }}
                onClick={() => setActive(i)}
                aria-label={p.placeholder ? "Membro del team da inserire" : p.name}
                aria-hidden={abs > 2}
              >
                <span className="cm-deck__card-inner">
                  <TeamCard p={p} />
                </span>
              </button>
            );
          })}
        </div>

        <button className="cm-navbtn cm-deck-arrow" onClick={() => go(1)} aria-label="Successivo" data-cursor="hug">
          <Icon name="arrow_forward" size={24} />
        </button>
      </div>

      <div className="cm-deck-mobile">
        {TEAM.map((p, i) => (
          <button key={i} className={"cm-deck__card" + (i === active ? " is-active" : "")} onClick={() => setActive(i)}>
            <span className="cm-deck__card-inner">
              <TeamCard p={p} />
            </span>
          </button>
        ))}
      </div>

      <div className="cm-deck__detail" aria-live="polite">
        <h3>{cur.placeholder ? "[DA INSERIRE]" : cur.name}</h3>
        <p className="cm-deck__drole">{cur.role}</p>
        <p>{cur.bio}</p>
        {cur.linkedin && !cur.placeholder && (
          <a className="cm-deck__hint" href="#" onClick={(e) => e.preventDefault()} data-cursor="hug">
            <Icon name="link" size={18} style={{ color: "var(--cm-blue)" }} /> LinkedIn
          </a>
        )}
        <p className="cm-deck__hint" style={{ marginTop: "0.75rem" }}>
          <Icon name="touch_app" size={16} /> Usa le frecce o tocca una carta per portarla al centro
        </p>
      </div>
    </div>
  );
}

function FounderSection({ f, reverse }: { f: Founder; reverse?: boolean }) {
  return (
    <section className="cm-sec cm-sec--tight">
      <div className={"cm-founder cm-reveal" + (reverse ? " cm-founder--rev" : "")}>
        <div className="cm-founder__media">
          <img src="/images/team.jpg" alt={f.name} loading="lazy" style={{ objectPosition: f.pos }} />
          <span className="cm-founder__tagbadge">{f.concept}</span>
        </div>
        <div className="cm-founder__body">
          <Eyebrow>{f.concept}</Eyebrow>
          <h3 className="cm-founder__name">
            {f.first} <span className="cima-accent">{f.accent}</span>
            {f.rest}
          </h3>
          <p className="cm-founder__role">{f.role}</p>
          <p className="cm-founder__bio">{f.long}</p>
          <ul className="cm-founder__list">
            {f.skills.map((s) => (
              <li key={s.label}>
                <Icon name={s.icon} size={20} /> {s.label}
              </li>
            ))}
          </ul>
          <a className="cm-founder__link" href="#" onClick={(e) => e.preventDefault()} data-cursor="hug">
            <Icon name="link" size={18} /> LinkedIn
          </a>
        </div>
      </div>
    </section>
  );
}

// ============================================================
// Main page component
// ============================================================

export default function PageChiSiamo() {
  useReveal();
  const router = useRouter();
  const onNavigate = (r: Route) => router.push(ROUTE_PATH[r]);

  return (
    <div>
      <section className="cm-prog-hero">
        <div className="cm-prog-hero__inner cm-reveal">
          <Eyebrow>Chi siamo</Eyebrow>
          <h1 className="cm-prog-hero__title">
            Ogni azienda
            <br />
            nasce dalle persone.
          </h1>
          <p className="cm-prog-hero__sub cm-prog-hero__sub--wide">
            Due figure giovani, ma strutturate, unite da una visione comune: portare le aziende in cima alla
            transizione digitale. Il nome stesso ci racconta — <strong>Ci</strong>ardi + <strong>Ma</strong>daudo =
            CiMa — e così il nostro modo di lavorare, dove tecnica e visione si incontrano in ruoli complementari,
            governati da dialogo e passione. Non siamo un fornitore, ma un partner tecnico e strategico: ascoltiamo,
            progettiamo e costruiamo soluzioni solide nel tempo, mettendo sempre il valore umano al centro e usando la
            tecnologia come leva, mai come sostituto.
          </p>
        </div>
      </section>

      <section className="cm-sec cm-sec--tight" style={{ paddingTop: "1.5rem" }}>
        <div className="cm-eyebrow-row cm-reveal cm-center" style={{ alignItems: "center", marginBottom: "2.5rem" }}>
          <Eyebrow>Il team</Eyebrow>
          <p className="cm-team-intro">
            Un team completo, governato da <strong>dialogo</strong> e <strong>passione</strong>, che si uniscono in{" "}
            <strong>ruoli complementari</strong>.
          </p>
        </div>
        <div className="cm-reveal">
          <TeamDeck />
        </div>
      </section>

      <section className="cm-pv cm-reveal">
        <div className="cm-pv__inner">
          <div className="cm-pv__grid">
            <div className="cm-pv__col">
              <div className="cm-pv__art" aria-hidden="true">
                <svg viewBox="0 0 160 150" fill="none">
                  <circle cx="68" cy="88" r="46" stroke="currentColor" strokeWidth="1.5" />
                  <circle cx="68" cy="88" r="23" stroke="var(--cm-blue)" strokeWidth="1.5" />
                  <circle cx="120" cy="48" r="13" stroke="currentColor" strokeWidth="1.5" />
                </svg>
              </div>
              <h3>Competenze complementari</h3>
              <ul>
                <li>Tecnica e visione che si completano, senza zone grigie tra i ruoli.</li>
                <li>Un team che copre l'intero arco: dall'idea ai processi, dalla visione al sistema.</li>
              </ul>
            </div>
            <div className="cm-pv__col">
              <div className="cm-pv__art" aria-hidden="true">
                <svg viewBox="0 0 200 150" fill="none">
                  <circle cx="78" cy="78" r="42" stroke="currentColor" strokeWidth="1.5" opacity="0.18" />
                  <circle cx="96" cy="78" r="42" stroke="currentColor" strokeWidth="1.5" opacity="0.35" />
                  <circle cx="114" cy="78" r="42" stroke="currentColor" strokeWidth="1.5" opacity="0.55" />
                  <circle cx="134" cy="78" r="42" stroke="var(--cm-blue)" strokeWidth="1.5" />
                </svg>
              </div>
              <h3>Relazione diretta</h3>
              <ul>
                <li>Parli con chi progetta e realizza davvero, senza filtri o intermediari.</li>
                <li>Un rapporto di fiducia che cresce e dura nel tempo.</li>
              </ul>
            </div>
            <div className="cm-pv__col">
              <div className="cm-pv__art" aria-hidden="true">
                <svg viewBox="0 0 200 150" fill="none">
                  <circle cx="80" cy="86" r="46" stroke="currentColor" strokeWidth="1.5" />
                  <circle cx="124" cy="64" r="46" stroke="var(--cm-blue)" strokeWidth="1.5" />
                </svg>
              </div>
              <h3>Il valore umano</h3>
              <ul>
                <li>Le persone al centro: progettiamo pensando a chi (e come) userà il sistema.</li>
                <li>Se usiamo l'IA lo dichiariamo sempre, e non le deleghiamo la progettazione.</li>
              </ul>
            </div>
          </div>
          <p className="cm-pv__note">
            La tecnologia è una leva, non il fine. Il vero valore aggiunto sono le persone: la loro esperienza, la cura
            per il dettaglio e la responsabilità di costruire soluzioni che restano solide nel tempo. È la completezza
            del team — non un singolo strumento — a fare la differenza.
          </p>
        </div>
      </section>

      <div className="cm-sec" style={{ paddingBottom: "1rem" }}>
        <div className="cm-eyebrow-row cm-reveal" style={{ marginBottom: "0" }}>
          <Eyebrow>I founder</Eyebrow>
          <SectionHeading level="h2">
            Complementari
            <br />
            per natura.
          </SectionHeading>
        </div>
      </div>
      <FounderSection f={FOUNDERS[0]} />
      <FounderSection f={FOUNDERS[1]} reverse />

      <section className="cm-sec cm-sec--tight" style={{ paddingBottom: "5rem" }}>
        <div className="cm-softcta cm-reveal">
          <div>
            <h3>Parliamo di persona</h3>
            <p>Dietro CiMa ci sono persone: scrivici, rispondiamo noi.</p>
          </div>
          <Button onClick={() => onNavigate("contatti")}>Contattaci</Button>
        </div>
      </section>
    </div>
  );
}
