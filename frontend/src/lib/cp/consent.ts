// Consenso cookie e strumenti opzionali (Linee guida Garante privacy, 10 giugno 2021).
// - Nessuna categoria opzionale è attiva di default: senza una scelta esplicita vale "solo necessari".
// - "Rifiuta" ha lo stesso peso di "Accetta"; chiudere il banner equivale a rifiutare.
// - La scelta si salva nel browser e si richiede di nuovo dopo CONSENT_MAX_AGE_DAYS
//   o quando cambia CONSENT_VERSION (nuove categorie o nuovi strumenti).
//
// Per aggiungere uno strumento futuro (es. statistiche):
//   1. aggiungilo a `tools` della categoria giusta (e alla cookie policy in /legale);
//   2. incrementa CONSENT_VERSION, così il banner viene richiesto a tutti;
//   3. caricalo solo se `useConsent("statistiche")` è true (o `hasConsent(...)` lato client).
import { useSyncExternalStore } from "react";

export type ConsentCategoryId = "necessari" | "statistiche" | "marketing";

export type ConsentCategory = {
  id: ConsentCategoryId;
  label: string;
  desc: string;
  required?: boolean;
  /** Strumenti attivi in questa categoria. Vuoto = categoria prevista ma oggi non usata. */
  tools: { name: string; purpose: string }[];
};

export const CONSENT_CATEGORIES: ConsentCategory[] = [
  {
    id: "necessari",
    label: "Necessari",
    desc: "Servono al funzionamento del sito e ai servizi che chiedi tu. Non richiedono consenso.",
    required: true,
    tools: [
      { name: "cp-c-diagnosi", purpose: "ricorda le risposte della diagnosi nel tuo browser" },
      { name: "cp-consent", purpose: "ricorda le scelte che fai in questo pannello" },
      { name: "cima-theme", purpose: "ricorda il tema chiaro o scuro" },
    ],
  },
  {
    id: "statistiche",
    label: "Statistiche",
    desc: "Ci aiutano a capire, in forma aggregata, quali pagine vengono visitate e come migliorarle.",
    tools: [],
  },
  {
    id: "marketing",
    label: "Marketing",
    desc: "Permettono di misurare le campagne e mostrarti contenuti pertinenti su altre piattaforme.",
    tools: [],
  },
];

export const CONSENT_VERSION = 1;
export const CONSENT_MAX_AGE_DAYS = 180;
export const CONSENT_KEY = "cp-consent";
export const CONSENT_EVENT = "cp-consent";
export const OPEN_CONSENT_EVENT = "cp-open-consent";

export type ConsentChoices = Record<ConsentCategoryId, boolean>;
type Stored = { v: number; at: number; choices: ConsentChoices };

export const DENY_ALL: ConsentChoices = { necessari: true, statistiche: false, marketing: false };
export const ALLOW_ALL: ConsentChoices = { necessari: true, statistiche: true, marketing: true };

let cache: Stored | null | undefined;

function load(): Stored | null {
  if (cache !== undefined) return cache;
  cache = null;
  try {
    const s = JSON.parse(localStorage.getItem(CONSENT_KEY) || "null") as Stored | null;
    const fresh = s && s.v === CONSENT_VERSION && Date.now() - s.at < CONSENT_MAX_AGE_DAYS * 864e5;
    if (fresh) cache = { ...s, choices: { ...s.choices, necessari: true } };
  } catch {}
  return cache;
}

/** Scelta salvata e ancora valida, oppure null se il banner va mostrato. */
export function readConsent(): ConsentChoices | null {
  return load()?.choices ?? null;
}

export function saveConsent(choices: ConsentChoices) {
  cache = { v: CONSENT_VERSION, at: Date.now(), choices: { ...choices, necessari: true } };
  try {
    localStorage.setItem(CONSENT_KEY, JSON.stringify(cache));
  } catch {}
  window.dispatchEvent(new Event(CONSENT_EVENT));
}

export function hasConsent(id: ConsentCategoryId): boolean {
  if (id === "necessari") return true;
  return !!readConsent()?.[id];
}

export const openConsent = () => window.dispatchEvent(new Event(OPEN_CONSENT_EVENT));

function subscribe(cb: () => void) {
  window.addEventListener(CONSENT_EVENT, cb);
  return () => window.removeEventListener(CONSENT_EVENT, cb);
}

/** true solo se l'utente ha acconsentito alla categoria. Sul server è sempre false. */
export function useConsent(id: ConsentCategoryId): boolean {
  return useSyncExternalStore(
    subscribe,
    () => hasConsent(id),
    () => id === "necessari",
  );
}
