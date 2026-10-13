"use client";
// Privacy policy · Cookie policy · Termini e condizioni (porting di Legale.dc.html)
import React, { useEffect, useState } from "react";
import Footer from "@/components/cp/Footer";

type DocId = "privacy" | "cookie" | "termini";
type Block =
  | { t: "p"; c: React.ReactNode }
  | { t: "ul"; items: React.ReactNode[] }
  | { t: "info"; rows: [string, React.ReactNode][] };
type Doc = { meta: string; lead: React.ReactNode; sections: { id: string; title: string; blocks: Block[] }[] };

const MONO: React.CSSProperties = { fontFamily: "var(--mono)", fontSize: "12px" };

function B({ children }: { children: React.ReactNode }) {
  return <strong style={{ color: "var(--ink)", fontWeight: 700 }}>{children}</strong>;
}

function A({ href, ext, children }: { href: string; ext?: boolean; children: React.ReactNode }) {
  return (
    <a
      href={href}
      {...(ext ? { target: "_blank", rel: "noopener" } : {})}
      className="h-color"
      style={{ color: "var(--accent)", "--h-color": "var(--ink)" }}
    >
      {children}
    </a>
  );
}

const DOCS: Record<DocId, Doc> = {
  privacy: {
    meta: "privacy policy · ultimo aggiornamento 13 ottobre 2026",
    lead: <>Quali dati personali raccogliamo attraverso questo sito, perché lo facciamo e quali diritti hai, ai sensi degli artt. 13 e 14 del Regolamento (UE) 2016/679 (GDPR).</>,
    sections: [
      { id: "p1", title: "Titolare del trattamento", blocks: [
        { t: "info", rows: [["ragione sociale", <>CIMA PROGETTI S.r.l.s.</>], ["sede", <>Via Otranto 39, 00192 Roma</>], ["REA", <>RM-1778381</>], ["partita IVA", <>18328621000</>], ["email", <><A href="mailto:info@cimaprogetti.it">info@cimaprogetti.it</A></>], ["PEC", <><A href="mailto:cima.progetti@pec-societa.it">cima.progetti@pec-societa.it</A></>]] },
      ] },
      { id: "p2", title: "Quali dati trattiamo", blocks: [
        { t: "ul", items: [<><B>Dati di navigazione.</B> Come ogni sito, i server che lo ospitano registrano dati tecnici: indirizzo IP, tipo di browser, pagine richieste, data e ora. Servono a far funzionare il sito e a proteggerlo, non a identificarti.</>, <><B>Dati che ci invii tu.</B> Quando ci scrivi per email, PEC o WhatsApp, o quando ci chiami, trattiamo il tuo nome, i tuoi recapiti e il contenuto del messaggio.</>, <><B>Risposte alla diagnosi.</B> Restano salvate solo nel tuo browser: non vengono inviate a noi né a terzi.</>, <><B>Dati dei progetti.</B> Se lavoriamo insieme, i dati che ci affidi sono regolati dal contratto e, dove serve, da un accordo di nomina a responsabile del trattamento (art. 28 GDPR).</>] },
      ] },
      { id: "p3", title: "Perché li trattiamo", blocks: [
        { t: "ul", items: [<>Rispondere alle tue richieste, organizzare il sopralluogo e preparare una proposta: <B>misure precontrattuali</B> su tua richiesta (art. 6.1.b).</>, <>Eseguire il contratto, se lavoriamo insieme: <B>esecuzione del contratto</B> (art. 6.1.b).</>, <>Rispettare gli obblighi fiscali e contabili: <B>obbligo di legge</B> (art. 6.1.c).</>, <>Proteggere il sito da abusi e attacchi: <B>legittimo interesse</B> (art. 6.1.f).</>] },
        { t: "p", c: <>Non usiamo i tuoi dati per marketing senza il tuo consenso, non li vendiamo e non facciamo profilazione.</> },
      ] },
      { id: "p4", title: "Intelligenza Artificiale", blocks: [
        { t: "p", c: <>{"L'Intelligenza Artificiale viene utilizzata solo con una scelta esplicita e scritta, conforme agli obiettivi del progetto. Quando bisogna lavorare con dati che non possono essere anonimizzati, installiamo i modelli su server locali: i dati non escono dalla tua infrastruttura."}</> },
        { t: "p", c: <>Nessuna decisione che ti riguarda viene presa in modo solo automatizzato (art. 22 GDPR).</> },
      ] },
      { id: "p5", title: "Per quanto tempo li conserviamo", blocks: [
        { t: "ul", items: [<><B>Richieste senza seguito:</B>{" fino a 12 mesi dall'ultimo contatto."}</>, <><B>Dati contrattuali e fiscali:</B>{" 10 anni, come previsto dall'art. 2220 del Codice civile."}</>, <><B>Dati di navigazione:</B> per il tempo necessario alla sicurezza del sito.</>, <><B>Risposte alla diagnosi:</B> finché non le cancelli dal browser.</>] },
      ] },
      { id: "p6", title: "Chi può riceverli", blocks: [
        { t: "p", c: <>I dati sono trattati da noi e, solo per quanto necessario, da fornitori che agiscono come responsabili del trattamento:</> },
        { t: "ul", items: [<>{"il fornitore dell'hosting del sito e della posta elettronica;"}</>, <>consulenti fiscali e legali, vincolati al segreto professionale;</>, <>Meta Platforms (WhatsApp), solo se scegli di scriverci lì;</>, <>Google (caratteri delle icone) e Automattic (anteprime dei siti nella pagina Progetti): il tuo browser li contatta direttamente per caricare questi elementi.</>] },
        { t: "p", c: <>Non diffondiamo i tuoi dati.</> },
      ] },
      { id: "p7", title: "Trasferimenti fuori dall'UE", blocks: [
        { t: "p", c: <>Alcuni fornitori (Google, Meta, Automattic) hanno sede negli Stati Uniti. Il trasferimento avviene sulla base della decisione di adeguatezza UE-USA (Data Privacy Framework) o delle clausole contrattuali standard approvate dalla Commissione europea.</> },
      ] },
      { id: "p8", title: "I tuoi diritti", blocks: [
        { t: "p", c: <>In qualsiasi momento puoi chiederci:</> },
        { t: "ul", items: [<>{"l'accesso ai tuoi dati (art. 15);"}</>, <>la rettifica (art. 16) o la cancellazione (art. 17);</>, <>la limitazione del trattamento (art. 18);</>, <>la portabilità dei dati (art. 20);</>, <>{"l'opposizione al trattamento (art. 21);"}</>, <>la revoca del consenso, se il trattamento si basa sul consenso.</>] },
        { t: "p", c: <>Per esercitarli scrivi a <A href="mailto:info@cimaprogetti.it">info@cimaprogetti.it</A> o alla PEC <A href="mailto:cima.progetti@pec-societa.it">cima.progetti@pec-societa.it</A>. Rispondiamo entro un mese.</> },
        { t: "p", c: <>Se ritieni che il trattamento violi il GDPR, puoi proporre reclamo al <A href="https://www.garanteprivacy.it" ext>Garante per la protezione dei dati personali</A>.</> },
      ] },
      { id: "p9", title: "Devi fornirci i tuoi dati?", blocks: [
        { t: "p", c: <>No, è facoltativo. Senza un recapito, però, non possiamo risponderti.</> },
      ] },
      { id: "p10", title: "Modifiche", blocks: [
        { t: "p", c: <>{"Possiamo aggiornare questa informativa. La data in alto indica l'ultima versione."}</> },
      ] },
    ],
  },
  cookie: {
    meta: "cookie policy · ultimo aggiornamento 13 ottobre 2026",
    lead: <>Questo sito non usa cookie di profilazione né strumenti di statistica. Per questo non ti chiediamo alcun consenso.</>,
    sections: [
      { id: "c1", title: "Cosa sono", blocks: [
        { t: "p", c: <>{"I cookie sono piccoli file che un sito salva nel tuo browser. L'archiviazione locale (localStorage) funziona in modo simile, ma i dati restano nel browser e non vengono inviati al server a ogni visita."}</> },
      ] },
      { id: "c2", title: "Cosa salviamo nel tuo browser", blocks: [
        { t: "info", rows: [["nome", <>cp-c-diagnosi</>], ["tipo", <>archiviazione locale (localStorage)</>], ["finalità", <>tecnica: ricorda le risposte della diagnosi, così puoi riprendere da dove eri rimasto</>], ["durata", <>finché non ricominci la diagnosi o non cancelli i dati del sito</>], ["consenso", <>non necessario: è uno strumento strettamente necessario al servizio che hai richiesto (art. 122 del Codice privacy)</>]] },
      ] },
      { id: "c3", title: "Contenuti di terze parti", blocks: [
        { t: "p", c: <>Alcune parti del sito vengono caricate da fornitori esterni:</> },
        { t: "ul", items: [<><B>Google Fonts</B>, per i caratteri delle icone (<A href="https://policies.google.com/privacy" ext>informativa</A>);</>, <><B>Automattic / WordPress.com</B>, per le anteprime dei siti nella pagina Progetti (<A href="https://automattic.com/privacy/" ext>informativa</A>).</>] },
        { t: "p", c: <>Per caricarli, il tuo browser si collega ai loro server, che ricevono il tuo indirizzo IP. Tramite loro non attiviamo cookie di profilazione.</> },
      ] },
      { id: "c4", title: "Come gestirli", blocks: [
        { t: "p", c: <>Puoi vedere e cancellare cookie e dati salvati dalle impostazioni del tuo browser. Se cancelli i dati di questo sito, la diagnosi ricomincia da capo.</> },
      ] },
      { id: "c5", title: "Se cambia qualcosa", blocks: [
        { t: "p", c: <>Se in futuro aggiungeremo strumenti di statistica o di marketing, ti chiederemo il consenso prima di attivarli, come previsto dalle Linee guida del Garante del 10 giugno 2021.</> },
      ] },
    ],
  },
  termini: {
    meta: "termini e condizioni · ultimo aggiornamento 13 ottobre 2026",
    lead: <>{"Le regole per l'uso del sito cimaprogetti.it. I servizi che offriamo sono regolati, caso per caso, da una proposta e da un contratto scritti."}</>,
    sections: [
      { id: "t1", title: "Ambito", blocks: [
        { t: "p", c: <>{"Queste condizioni regolano l'uso del sito cimaprogetti.it, gestito da CIMA PROGETTI S.r.l.s., Via Otranto 39, 00192 Roma. Navigando il sito, le accetti."}</> },
      ] },
      { id: "t2", title: "Contenuti e prezzi", blocks: [
        { t: "p", c: <>{"I contenuti del sito hanno scopo informativo. Le fasce di prezzo indicate sono medie dei lavori fatti finora: non sono un listino e non costituiscono offerta al pubblico ai sensi dell'art. 1336 del Codice civile."}</> },
        { t: "p", c: <>Ogni prestazione ha il suo valore, che nasce da esigenze e obiettivi concordati.</> },
      ] },
      { id: "t3", title: "Sopralluogo", blocks: [
        { t: "p", c: <>Il sopralluogo è gratuito. Può essere applicato un rimborso spese, sempre concordato prima.</> },
      ] },
      { id: "t4", title: "Diagnosi online", blocks: [
        { t: "p", c: <>La diagnosi è uno strumento orientativo: il risultato non è una consulenza né un preventivo.</> },
      ] },
      { id: "t5", title: "Proprietà intellettuale", blocks: [
        { t: "p", c: <>Testi, grafica, logo e codice del sito appartengono a CIMA PROGETTI S.r.l.s. o sono usati su licenza. Non puoi copiarli o riutilizzarli senza autorizzazione scritta.</> },
        { t: "p", c: <>I marchi e i progetti dei clienti mostrati appartengono ai rispettivi titolari e sono pubblicati con il loro consenso. I casi riservati sono simulazioni di lavori svolti: nomi, dati e grafiche sono cambiati per tutelare i clienti.</> },
      ] },
      { id: "t6", title: "Link esterni", blocks: [
        { t: "p", c: <>Il sito contiene link a siti di terzi, compresi i progetti online dei nostri clienti. Non siamo responsabili dei loro contenuti né delle loro informative.</> },
      ] },
      { id: "t7", title: "Responsabilità", blocks: [
        { t: "p", c: <>{"Curiamo il sito con attenzione, ma non possiamo garantire che sia sempre disponibile o privo di errori. Nei limiti consentiti dalla legge, non rispondiamo di danni derivanti dall'uso delle informazioni pubblicate."}</> },
      ] },
      { id: "t8", title: "Legge applicabile e foro", blocks: [
        { t: "p", c: <>Si applica la legge italiana. Per ogni controversia è competente il Foro di Roma, salvo il foro del consumatore previsto dal Codice del consumo.</> },
      ] },
      { id: "t9", title: "Contatti", blocks: [
        { t: "info", rows: [["email", <><A href="mailto:info@cimaprogetti.it">info@cimaprogetti.it</A></>], ["PEC", <><A href="mailto:cima.progetti@pec-societa.it">cima.progetti@pec-societa.it</A></>], ["sede", <>Via Otranto 39, 00192 Roma</>]] },
      ] },
    ],
  },
};

const CHIPS: [DocId, string][] = [
  ["privacy", "Privacy policy"],
  ["cookie", "Cookie policy"],
  ["termini", "Termini e condizioni"],
];

const isDoc = (h: string): h is DocId => h === "privacy" || h === "cookie" || h === "termini";

function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  window.scrollBy({ top: el.getBoundingClientRect().top - 96, behavior: "smooth" });
}

function renderBlock(b: Block, i: number) {
  if (b.t === "p")
    return (
      <p key={i} style={{ margin: 0, fontSize: "17px", lineHeight: 1.65, color: "var(--body)", maxWidth: "68ch", textWrap: "pretty" }}>
        {b.c}
      </p>
    );
  if (b.t === "ul")
    return (
      <ul key={i} style={{ margin: 0, padding: 0, listStyle: "none", display: "grid", gap: "10px", maxWidth: "68ch" }}>
        {b.items.map((it, j) => (
          <li
            key={j}
            style={{ display: "grid", gridTemplateColumns: "14px minmax(0,1fr)", gap: "12px", fontSize: "17px", lineHeight: 1.6, color: "var(--body)" }}
          >
            <span style={{ width: "8px", height: "8px", background: "var(--fill-accent)", marginTop: ".62em" }}></span>
            <span>{it}</span>
          </li>
        ))}
      </ul>
    );
  return (
    <div key={i} style={{ border: "1px solid var(--track)", maxWidth: "68ch" }}>
      {b.rows.map(([label, value], j) => (
        <div
          key={j}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,150px),1fr))",
            gap: "4px 20px",
            padding: "14px 18px",
            borderTop: j ? "1px solid var(--line-soft)" : undefined,
          }}
        >
          <span style={{ ...MONO, color: "var(--meta)" }}>{label}</span>
          <span style={{ fontSize: "16px", lineHeight: 1.45, color: "var(--ink)", gridColumn: "span 2", minWidth: 0, overflowWrap: "anywhere" }}>
            {value}
          </span>
        </div>
      ))}
    </div>
  );
}

export default function LegalePage() {
  const [doc, setDoc] = useState<DocId>("privacy");
  const [vw, setVw] = useState(1280);

  useEffect(() => {
    const h = () => {
      const id = location.hash.slice(1);
      if (isDoc(id)) setDoc(id);
    };
    const r = () => setVw(window.innerWidth);
    h();
    r();
    window.addEventListener("hashchange", h);
    window.addEventListener("resize", r);
    return () => {
      window.removeEventListener("hashchange", h);
      window.removeEventListener("resize", r);
    };
  }, []);

  const pick = (id: DocId) => {
    setDoc(id);
    try {
      history.replaceState(null, "", "#" + id);
    } catch {}
  };

  const wide = vw >= 900;
  const d = DOCS[doc];

  return (
    <>
      <main>
        <section style={{ padding: "calc(72px + clamp(48px,9vh,104px)) clamp(20px,4vw,48px) clamp(32px,5vh,56px)" }}>
          <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
            <h1
              data-rise-group="1"
              style={{ fontWeight: 700, fontSize: "clamp(56px,7.6vw,124px)", lineHeight: 0.88, letterSpacing: "-.055em", margin: 0 }}
            >
              <span style={{ display: "block", overflow: "hidden", paddingBottom: ".16em" }}>
                <span data-rise="1" style={{ display: "block" }}>
                  Legale<span style={{ color: "var(--accent)" }}>_</span>
                </span>
              </span>
            </h1>
            <p
              data-reveal="1"
              style={{
                fontSize: "clamp(18px,1.6vw,24px)",
                lineHeight: 1.45,
                color: "var(--body)",
                maxWidth: "640px",
                margin: "clamp(20px,3vh,32px) 0 0",
                textWrap: "pretty",
              }}
            >
              {"Privacy, cookie e condizioni d'uso del sito, scritti in modo chiaro."}
            </p>
            <div data-reveal="1" data-delay="100" style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginTop: "clamp(28px,4vh,44px)" }}>
              {CHIPS.map(([id, label]) => {
                const on = doc === id;
                return (
                  <button
                    key={id}
                    onClick={() => pick(id)}
                    aria-pressed={on}
                    className="h-border-color"
                    style={{
                      flex: "none",
                      whiteSpace: "nowrap",
                      height: "44px",
                      padding: "0 16px",
                      display: "inline-flex",
                      alignItems: "center",
                      border: "1px solid " + (on ? "var(--fill-accent)" : "var(--line)"),
                      background: on ? "var(--fill-accent)" : "var(--bg)",
                      color: on ? "var(--on-fill)" : "var(--ink)",
                      fontWeight: 700,
                      fontSize: "14px",
                      cursor: "pointer",
                      transition: "border-color .2s",
                      "--h-border-color": "var(--accent)",
                    }}
                  >
                    {label}
                  </button>
                );
              })}
            </div>
          </div>
        </section>
        <section
          style={{
            padding: "clamp(24px,4vh,48px) clamp(20px,4vw,48px) clamp(80px,12vh,136px)",
            borderTop: "1px solid var(--line-soft)",
          }}
        >
          <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
            <div
              key={doc}
              style={{
                display: "grid",
                gridTemplateColumns: wide ? "240px minmax(0,1fr)" : "minmax(0,1fr)",
                gap: "clamp(32px,5vw,72px)",
                alignItems: "start",
              }}
            >
              <aside style={{ display: wide ? "flex" : "none", position: "sticky", top: "104px", flexDirection: "column" }}>
                <span style={{ ...MONO, color: "var(--meta)", paddingBottom: "12px" }}>indice_</span>
                {d.sections.map((s, i) => (
                  <button
                    key={s.id}
                    onClick={() => scrollToId(s.id)}
                    className="h-color"
                    style={{
                      display: "grid",
                      gridTemplateColumns: "28px minmax(0,1fr)",
                      gap: "8px",
                      alignItems: "baseline",
                      width: "100%",
                      textAlign: "left",
                      background: "transparent",
                      border: 0,
                      borderTop: "1px solid var(--line-soft)",
                      padding: "11px 0",
                      fontSize: "14px",
                      lineHeight: 1.3,
                      color: "var(--ink)",
                      cursor: "pointer",
                      transition: "color .2s",
                      "--h-color": "var(--accent)",
                    }}
                  >
                    <span style={{ fontFamily: "var(--mono)", fontSize: "11px", color: "var(--accent)" }}>{String(i + 1).padStart(2, "0")}</span>
                    <span>{s.title}</span>
                  </button>
                ))}
              </aside>
              <article style={{ minWidth: 0 }}>
                <div data-reveal="1" style={{ display: "flex", flexDirection: "column", gap: "18px", paddingBottom: "clamp(28px,4vh,40px)" }}>
                  <span style={{ ...MONO, color: "var(--meta)" }}>{d.meta}</span>
                  <p
                    style={{
                      margin: 0,
                      fontWeight: 500,
                      fontSize: "clamp(19px,1.6vw,23px)",
                      lineHeight: 1.4,
                      letterSpacing: "-.015em",
                      color: "var(--ink)",
                      maxWidth: "46ch",
                      textWrap: "pretty",
                    }}
                  >
                    {d.lead}
                  </p>
                </div>
                {d.sections.map((s, i) => (
                  <section
                    key={s.id}
                    id={s.id}
                    style={{
                      scrollMarginTop: "96px",
                      padding: "clamp(28px,4vh,40px) 0",
                      borderTop: "1px solid var(--line-soft)",
                      display: "grid",
                      gap: "16px",
                    }}
                  >
                    <div style={{ display: "flex", gap: "14px", alignItems: "baseline" }}>
                      <span style={{ ...MONO, color: "var(--accent)", flex: "none" }}>{String(i + 1).padStart(2, "0")}</span>
                      <h2
                        style={{
                          margin: 0,
                          fontWeight: 700,
                          fontSize: "clamp(22px,2vw,30px)",
                          lineHeight: 1.1,
                          letterSpacing: "-.03em",
                          textWrap: "balance",
                        }}
                      >
                        {s.title}
                      </h2>
                    </div>
                    {s.blocks.map(renderBlock)}
                  </section>
                ))}
              </article>
            </div>
          </div>
        </section>
      </main>
      <Footer cta={false} index={false} />
    </>
  );
}
