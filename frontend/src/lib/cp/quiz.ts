// Domande della diagnosi + punteggio + salvataggio (porting di cp-quiz.js).
import { CP_DATA } from "./data";

export type QuizOpt = { t: string; s: Record<string, number> };
export type QuizQ = { id: string; q: string; hint: string; opts: QuizOpt[] };
export type DiagState = { q: number; answers: Record<string, number> };

export const CP_QUIZ: QuizQ[] = [
  { id: "dati", q: "Dove vivono i dati operativi dell'azienda?", hint: "ordini, commesse, clienti, magazzino", opts: [
    { t: "In un gestionale unico, aggiornato", s: {} },
    { t: "In più file Excel condivisi", s: { sw: 3, auto: 1 } },
    { t: "Tra email, chat e cartelle", s: { sw: 2, app: 1, auto: 1 } },
    { t: "Soprattutto nella testa di qualcuno", s: { sw: 2, form: 1, aff: 1 } } ] },
  { id: "copia", q: "Quanto tempo a settimana passa a copiare dati da un sistema all'altro?", hint: "sommando tutte le persone", opts: [
    { t: "Quasi zero", s: {} },
    { t: "Qualche ora", s: { auto: 2 } },
    { t: "Più di una giornata", s: { auto: 3, report: 1 } },
    { t: "Non lo sappiamo", s: { auto: 2, report: 1 } } ] },
  { id: "report", q: "Come nasce il report periodico?", hint: "vendite, magazzino, produzione", opts: [
    { t: "Si genera da solo", s: {} },
    { t: "Lo prepara una persona, a mano", s: { report: 3 } },
    { t: "Arriva tardi, quando arriva", s: { report: 3, auto: 1 } },
    { t: "Non esiste un vero report", s: { report: 2, sw: 1 } } ] },
  { id: "ia", q: "Come usi l'intelligenza artificiale oggi?", hint: "chatbot, assistenti, traduttori", opts: [
    { t: "Non la usiamo", s: { form: 1 } },
    { t: "Online, anche su documenti riservati", s: { ialocale: 3, cyber: 1 } },
    { t: "Vorremmo, ma i dati non possono uscire", s: { ialocale: 3 } },
    { t: "Non sappiamo chi la usa e come", s: { ialocale: 1, form: 2, cyber: 1 } } ] },
  { id: "backup", q: "L'ultima volta che hai provato a ripristinare un backup?", hint: "non solo farlo: rimetterlo in funzione", opts: [
    { t: "Negli ultimi sei mesi", s: {} },
    { t: "Mai, ma il backup c'è", s: { cyber: 3 } },
    { t: "Non sappiamo se c'è", s: { cyber: 3, aff: 1 } },
    { t: "Se ne occupa un fornitore, non sappiamo come", s: { cyber: 2, aff: 1 } } ] },
  { id: "clienti", q: "Come sanno i clienti a che punto è un ordine o una pratica?", hint: "stato, consegne, documenti", opts: [
    { t: "Lo vedono da soli, online", s: {} },
    { t: "Chiamano o scrivono", s: { app: 3 } },
    { t: "Glielo mandiamo noi, a mano", s: { app: 2, auto: 1 } },
    { t: "Dipende da chi risponde", s: { app: 2, sw: 1 } } ] },
  { id: "strumenti", q: "E l'ultimo strumento digitale che hai preso?", hint: "software, sito, piattaforma", opts: [
    { t: "Lo usano tutti, bene", s: {} },
    { t: "Lo usano in pochi", s: { form: 3 } },
    { t: "Il fornitore è sparito", s: { aff: 3 } },
    { t: "Il sito non riusciamo a modificarlo", s: { web: 3 } } ] },
  { id: "idea", q: "C'è un'idea di prodotto o servizio nuovo nel cassetto?", hint: "anche solo discussa", opts: [
    { t: "No, non ora", s: {} },
    { t: "Sì, ferma da mesi", s: { mvp: 3 } },
    { t: "Sì, ma senza numeri per decidere", s: { mvp: 3 } },
    { t: "Sì, e servirebbe un sito o un'app per lanciarla", s: { mvp: 2, web: 1 } } ] },
];

const KEY = "cp-c-diagnosi";
export const DIAG_EVENT = "cp-c-diagnosi";
export const OPEN_DIAG_EVENT = "cp-open-diagnosi";

export const CP_DIAG = {
  read(): DiagState {
    try {
      return JSON.parse(localStorage.getItem(KEY) || "null") || { q: 0, answers: {} };
    } catch {
      return { q: 0, answers: {} };
    }
  },
  write(d: DiagState) {
    try {
      localStorage.setItem(KEY, JSON.stringify(d));
    } catch {}
    window.dispatchEvent(new Event(DIAG_EVENT));
  },
  done(d: DiagState) {
    return d.q >= CP_QUIZ.length;
  },
  scores(d: DiagState) {
    const s: Record<string, number> = {};
    CP_DATA.services.forEach((x: { id: string }) => { s[x.id] = 0; });
    Object.keys(d.answers || {}).forEach((k) => {
      const qi = +k;
      if (qi >= d.q) return;
      const o = CP_QUIZ[qi] && CP_QUIZ[qi].opts[d.answers[k]];
      if (o) for (const id in o.s) s[id] = (s[id] || 0) + o.s[id];
    });
    return s;
  },
  top(d: DiagState) {
    const s = this.scores(d);
    return Object.keys(s).filter((k) => s[k] > 0).sort((a, b) => s[b] - s[a]).slice(0, 3);
  },
  open() {
    window.dispatchEvent(new Event(OPEN_DIAG_EVENT));
  },
};

export const openDiag = () => CP_DIAG.open();
