"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Logo, Button, Icon } from "@/components/ds";
import { useTheme } from "@/components/theme/ThemeProvider";
import { ROUTE_PATH, type Route } from "@/lib/routes";

type ErrInfo = { code: string; eyebrow: string; title: string; message: string };

export const ERRORS: Record<string, ErrInfo> = {
  "404": { code: "404", eyebrow: "Errore 404", title: "Pagina non trovata", message: "Questa pagina sembra essersi persa nel sistema. Controlla l'indirizzo o torna alla home. Se invece si tratta di un nostro sbaglio, non esitare a contattarci!" },
  "403": { code: "403", eyebrow: "Errore 403", title: "Accesso negato", message: "Sembra che tu non abbia il permesso per arrivare fin qui. Se invece si tratta di un nostro sbaglio, non esitare a contattarci!" },
  "503": { code: "503", eyebrow: "Errore 503", title: "Servizio non disponibile", message: "Stiamo facendo manutenzione: il sistema torna online a breve. Se il problema persiste, non esitare a contattarci!" },
  errore: { code: "OPS", eyebrow: "Errore", title: "Qualcosa non ha funzionato", message: "Si è verificato un imprevisto. Riprova tra poco o torna alla home. Se invece si tratta di un nostro sbaglio, non esitare a contattarci!" },
};

function SysShell({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { theme } = useTheme();
  return (
    <div className="cm-sys">
      <button className="cm-sys__logo" onClick={() => router.push("/")} aria-label="CiMa Progetti — Home">
        <Logo variant={theme === "dark" ? "white" : "dark"} height={44} src={theme === "dark" ? "/logo-white.svg" : "/logo.svg"} />
      </button>
      <div className="cm-sys__body">{children}</div>
      <div className="cm-sys__mark" aria-hidden="true">cima_</div>
    </div>
  );
}

export function PageError({ code = "errore" }: { code?: string }) {
  const router = useRouter();
  const onNavigate = (r: Route) => router.push(ROUTE_PATH[r]);
  const e = ERRORS[code] || ERRORS.errore;
  return (
    <SysShell>
      <span className="cm-sys__eyebrow">{e.eyebrow}</span>
      <div className="cm-sys__code">{e.code}</div>
      <h1 className="cm-sys__title">{e.title}</h1>
      <p className="cm-sys__msg">{e.message}</p>
      <div className="cm-sys__cta">
        <Button onClick={() => onNavigate("home")}>Torna alla home</Button>
        <Button variant="outline" onClick={() => onNavigate("contatti")}>Contattaci</Button>
      </div>
    </SysShell>
  );
}

export function PageLogin() {
  const router = useRouter();
  const [v, setV] = useState({ user: "", pwd: "" });
  const [sent, setSent] = useState(false);
  const submit = (ev: React.FormEvent) => {
    ev.preventDefault();
    if (v.user.length >= 2 && v.pwd.length >= 4) setSent(true);
  };
  return (
    <div className="cm-loginpage">
      <div className="cm-logincard">
        <span className="cm-logincard__eyebrow">cima workspace · accesso</span>
        <h1 className="cm-logincard__title">Accedi</h1>
        <span className="cm-logincard__bar"></span>
        {sent ? (
          <div className="cm-logincard__ok">
            <Icon name="check_circle" size={44} />
            <p>Accesso in corso… <span style={{ opacity: 0.6 }}>[Mock — collega il tuo sistema di autenticazione]</span></p>
          </div>
        ) : (
          <form onSubmit={submit} noValidate>
            <div className="cm-logincard__field">
              <label htmlFor="lg-user">Utente</label>
              <input id="lg-user" type="text" value={v.user} onChange={(ev) => setV({ ...v, user: ev.target.value })} autoComplete="username" autoFocus />
            </div>
            <div className="cm-logincard__field">
              <label htmlFor="lg-pwd">Password</label>
              <input id="lg-pwd" type="password" value={v.pwd} onChange={(ev) => setV({ ...v, pwd: ev.target.value })} autoComplete="current-password" />
            </div>
            <button className="cm-logincard__btn" type="submit" data-cursor="hug">Entra</button>
          </form>
        )}
        <button className="cm-logincard__back" onClick={() => router.push("/")} data-cursor="underline">Torna al sito</button>
      </div>
    </div>
  );
}
