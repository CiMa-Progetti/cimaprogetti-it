"use client";
// ============================================================
// Contatti — booking + contact form (port of PageContatti.jsx)
// ============================================================
import React, { useState } from "react";
import { Eyebrow as KEyebrow, Button as KBtn, Icon as KIcon } from "@/components/ds";
import { useReveal } from "@/components/hooks/useReveal";
import MaterialSymbolsFont from "@/components/MaterialSymbolsFont";

const PEOPLE = [
  { name: "Nicola Leone Ciardi", role: "Co-Founder & CEO", bio: "Management e computer science.", tel: "+39 338 245 1178", mail: "nicolaleone.ciardi@cimaprogetti.it" },
  { name: "Valentina Madaudo", role: "Co-Founder & CFO", bio: "Jr Engineer & economist for sustainable development.", tel: "+39 339 358 0805", mail: "valentina.madaudo@cimaprogetti.it" },
];

const SLOTS = ["09:30", "10:30", "11:30", "14:30", "15:30", "16:30"];
const DOW = ["Lun", "Mar", "Mer", "Gio", "Ven", "Sab", "Dom"];
const MONTHS = ["Gennaio", "Febbraio", "Marzo", "Aprile", "Maggio", "Giugno", "Luglio", "Agosto", "Settembre", "Ottobre", "Novembre", "Dicembre"];

function Calendar() {
  const today = new Date(2026, 5, 14);
  const [view, setView] = useState({ y: 2026, m: 5 });
  const [selDay, setSelDay] = useState<number | null>(null);
  const [selSlot, setSelSlot] = useState<string | null>(null);

  const first = new Date(view.y, view.m, 1);
  const startDow = (first.getDay() + 6) % 7;
  const daysInMonth = new Date(view.y, view.m + 1, 0).getDate();
  const cells: (number | null)[] = [];
  for (let i = 0; i < startDow; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  const dayDate = (d: number) => new Date(view.y, view.m, d);
  const isPast = (d: number) => dayDate(d) < new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const isWeekend = (d: number) => { const w = dayDate(d).getDay(); return w === 0 || w === 6; };
  const available = (d: number) => !isPast(d) && !isWeekend(d);

  const shift = (delta: number) => {
    setView((v) => {
      let m = v.m + delta, y = v.y;
      if (m < 0) { m = 11; y--; } if (m > 11) { m = 0; y++; }
      return { y, m };
    });
    setSelDay(null); setSelSlot(null);
  };

  return (
    <div>
      <div className="cm-cal__head">
        <span className="cm-cal__month">{MONTHS[view.m]} {view.y}</span>
        <div className="cm-cal__nav">
          <button onClick={() => shift(-1)} aria-label="Mese precedente" data-cursor="hug"><KIcon name="chevron_left" size={20} /></button>
          <button onClick={() => shift(1)} aria-label="Mese successivo" data-cursor="hug"><KIcon name="chevron_right" size={20} /></button>
        </div>
      </div>
      <div className="cm-cal__grid">
        {DOW.map((d) => <div className="cm-cal__dow" key={d}>{d}</div>)}
        {cells.map((d, i) => d === null
          ? <div key={"e" + i} />
          : (
            <button key={d}
              className={"cm-cal__day" + (available(d) ? " is-available" : "") + (selDay === d ? " is-selected" : "")}
              disabled={!available(d)}
              data-cursor="hug"
              onClick={() => { setSelDay(d); setSelSlot(null); }}>
              {d}
            </button>
          ))}
      </div>

      {selDay && (
        <div className="cm-slots" style={{ animation: "cm-fade .3s both" }}>
          <p className="cm-slots__label">Orari disponibili — {selDay} {MONTHS[view.m]}</p>
          <div className="cm-slots__grid">
            {SLOTS.map((s) => (
              <button key={s} className={"cm-slot" + (selSlot === s ? " is-selected" : "")} onClick={() => setSelSlot(s)} data-cursor="hug">{s}</button>
            ))}
          </div>
        </div>
      )}

      {selDay && selSlot && (
        <div className="cm-book__confirm">
          <KIcon name="event_available" />
          <p>
            Call fissata per <strong>{selDay} {MONTHS[view.m]}</strong> alle <strong>{selSlot}</strong>.{" "}
            Compila il form qui accanto per confermare — ti invieremo l'invito.{" "}
            <span style={{ opacity: 0.7 }}>[Mock — collega Cal.com/Calendly per il booking reale]</span>
          </p>
        </div>
      )}
    </div>
  );
}

function ContactForm() {
  const [v, setV] = useState({ nome: "", email: "", azienda: "", msg: "" });
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [sent, setSent] = useState(false);

  const errs: Record<string, string> = {
    nome: v.nome.trim().length < 2 ? "Inserisci il tuo nome" : "",
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email) ? "" : "Inserisci un'email valida",
    msg: v.msg.trim().length < 10 ? "Raccontaci almeno qualche dettaglio" : "",
  };

  const set = (k: keyof typeof v) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setV({ ...v, [k]: e.target.value });
  const blur = (k: string) => () => setTouched({ ...touched, [k]: true });

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setTouched({ nome: true, email: true, msg: true });
    if (!errs.nome && !errs.email && !errs.msg) setSent(true);
  };

  if (sent) {
    return (
      <div className="cm-form__success">
        <span className="material-symbols-outlined">check_circle</span>
        <h3>Richiesta inviata</h3>
        <p>Grazie {v.nome.split(" ")[0]}. Ti rispondiamo entro 1 giorno lavorativo.</p>
      </div>
    );
  }

  const field = (k: keyof typeof v, label: string, type = "text") => (
    <div className={"cm-field" + (touched[k] && errs[k] ? " cm-field--err" : "")}>
      <label htmlFor={"f-" + k}>{label}</label>
      <input id={"f-" + k} type={type} value={v[k]} onChange={set(k)} onBlur={blur(k)}
        aria-invalid={!!(touched[k] && errs[k])} />
      {touched[k] && errs[k] && <p className="cm-field__err"><KIcon name="error" size={16} />{errs[k]}</p>}
    </div>
  );

  return (
    <form onSubmit={submit} noValidate>
      <div className="cm-form__row">
        {field("nome", "Nome e cognome")}
        {field("email", "Email", "email")}
      </div>
      <div className="cm-field">
        <label htmlFor="f-azienda">Azienda <span style={{ textTransform: "none", fontWeight: 400, color: "var(--text-faint)" }}>(facoltativo)</span></label>
        <input id="f-azienda" type="text" value={v.azienda} onChange={set("azienda")} />
      </div>
      <div className={"cm-field" + (touched.msg && errs.msg ? " cm-field--err" : "")}>
        <label htmlFor="f-msg">Come possiamo aiutarti?</label>
        <textarea id="f-msg" value={v.msg} onChange={set("msg")} onBlur={blur("msg")} placeholder="Obiettivo, contesto, tempistiche…" />
        {touched.msg && errs.msg && <p className="cm-field__err"><KIcon name="error" size={16} />{errs.msg}</p>}
      </div>
      <KBtn variant="primary" caps={false} type="submit" style={{ width: "100%" }}>Invia richiesta</KBtn>
      <p className="cm-response-note"><KIcon name="schedule" size={18} /> Rispondiamo entro 1 giorno lavorativo.</p>
    </form>
  );
}

export default function PageContatti() {
  useReveal();
  return (
    <div>
      <MaterialSymbolsFont />
      <div className="cm-contatti">
        <div className="cm-reveal" style={{ marginBottom: "3rem" }}>
          <h1 className="text-huge" style={{ fontWeight: 900, textTransform: "uppercase", margin: 0 }}>CONTATTI</h1>
          <div className="accent-bar" style={{ marginTop: "1rem" }} />
          <p className="cm-pagehero__intro" style={{ marginTop: "1.5rem", maxWidth: "46ch" }}>
            Parliamo del tuo prossimo progetto. Nessun impegno, solo una conversazione.
          </p>
        </div>

        <div className="cm-contatti__channels cm-reveal">
          <div className="cm-channel-list">
            <div className="cm-channel">
              <p className="cm-channel__label">whatsapp</p>
              <a href="tel:+393382451171" data-cursor="hug">+39 338 245 1171</a>
            </div>
            <div className="cm-channel">
              <p className="cm-channel__label">email</p>
              <a className="is-underline" href="mailto:info@cimaprogetti.it" data-cursor="hug">info@cimaprogetti.it</a>
            </div>
          </div>
          <div className="cm-contatti__art" aria-hidden="true">
            <svg viewBox="0 0 500 657" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M237.691 383.215C210.065 374.604 33.9083 350.993 24.77 364.701C15.0073 379.342 41.0933 419.975 47.398 432.588" stroke="var(--cm-blue)" strokeWidth="25" strokeLinecap="round" strokeLinejoin="round"></path>
              <path d="M266.485 418.187C280.276 446.048 382.424 631.697 377.575 641.393C296.026 632.097 140.508 637.817 122.48 619.791C111.766 609.077 109.491 586.421 100.88 573.506" stroke="var(--cm-blue)" strokeWidth="25" strokeLinecap="round" strokeLinejoin="round"></path>
              <path d="M147.179 414.074C147.995 411.054 145.059 409.131 144.093 406.875" stroke="var(--cm-blue)" strokeWidth="25" strokeLinecap="round" strokeLinejoin="round"></path>
              <path d="M484.602 120.733C419.985 -69.8593 139.011 18.7115 194.691 216.545C224.878 323.792 430.166 374.271 474.772 203.749" stroke="currentColor" strokeWidth="25" strokeLinecap="round" strokeLinejoin="round"></path>
              <path d="M261.738 184.321C263.054 174.16 263.542 167.971 265.73 158.861" stroke="currentColor" strokeWidth="25" strokeLinecap="round" strokeLinejoin="round"></path>
              <path d="M320.406 186.233C320.894 177.676 323.036 171.396 325.311 163.13" stroke="currentColor" strokeWidth="25" strokeLinecap="round" strokeLinejoin="round"></path>
              <path d="M70.0282 463.446C81.7161 465.915 92.559 470.361 101.916 477.845C185.952 545.073 58.7422 568.42 19.6263 490.189C11.989 474.911 13.9534 458.193 23.7422 445.96" stroke="currentColor" strokeWidth="25" strokeLinecap="round" strokeLinejoin="round"></path>
              <path d="M474.898 405.28C452.184 309.128 310.29 379.438 328.836 453.623C339.851 497.677 379.58 444.373 385.41 426.88" stroke="currentColor" strokeWidth="25" strokeLinecap="round" strokeLinejoin="round"></path>
              <path d="M384.381 443.768C387.652 488.786 436.11 468.859 453.299 444.796" stroke="currentColor" strokeWidth="25" strokeLinecap="round" strokeLinejoin="round"></path>
            </svg>
          </div>
        </div>

        <div className="cm-eyebrow-row cm-reveal" style={{ marginBottom: "1.5rem" }}>
          <KEyebrow>Iniziamo</KEyebrow>
        </div>
        <div className="cm-book cm-reveal">
          <div className="cm-book__col">
            <h2>Prenota una call</h2>
            <p className="cm-sub">Scegli giorno e orario: 30 minuti per capire se possiamo esserti utili.</p>
            <Calendar />
          </div>
          <div className="cm-book__col">
            <h2>Oppure scrivici</h2>
            <p className="cm-sub">Preferisci il testo? Mandaci due righe, pensiamo noi al resto.</p>
            <ContactForm />
          </div>
        </div>

        <div className="cm-people cm-reveal">
          <p className="cm-people__eyebrow">people behind cima</p>
          <div className="cm-people__grid">
            {PEOPLE.map((p) => (
              <div className="cm-person" key={p.name}>
                <h3>{p.name}</h3>
                <p className="cm-person__role">{p.role}</p>
                <p className="cm-person__bio">{p.bio}</p>
                <div className="cm-person__links">
                  <a href={"tel:" + p.tel.replace(/\s/g, "")} data-cursor="hug"><KIcon name="call" />{p.tel}</a>
                  <a href={"mailto:" + p.mail} data-cursor="hug"><KIcon name="mail" />{p.mail}</a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
