"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Logo, Icon } from "@/components/ds";
import { useTheme } from "@/components/theme/ThemeProvider";
import { NAV_LINKS, ROUTE_PATH, type Route } from "@/lib/routes";

const SOCIAL = [
  { label: "LinkedIn", d: "M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.47-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 110-4.12 2.06 2.06 0 010 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.22.79 24 1.77 24h20.45c.98 0 1.78-.78 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" },
  { label: "Instagram", d: "M12 2.2c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.43.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.43.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.7 3.7 0 01-1.38-.9 3.7 3.7 0 01-.9-1.38c-.16-.43-.36-1.06-.41-2.23C2.21 15.58 2.2 15.2 2.2 12s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.43-.16 1.06-.36 2.23-.41C8.42 2.21 8.8 2.2 12 2.2zm0 3.65A6.15 6.15 0 1018.15 12 6.15 6.15 0 0012 5.85zm0 10.15A4 4 0 1116 12a4 4 0 01-4 4zm6.4-10.4a1.44 1.44 0 11-1.44-1.44 1.44 1.44 0 011.44 1.44z" },
  { label: "Facebook", d: "M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.99 3.66 9.13 8.44 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.78-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.45 2.89h-2.33v6.99C18.34 21.13 22 16.99 22 12z" },
  { label: "TikTok", d: "M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.3 0 .59.04.86.11V9a6.27 6.27 0 00-.86-.06 6.33 6.33 0 00-6.33 6.33A6.33 6.33 0 009.49 21.6a6.33 6.33 0 006.33-6.33V8.78a8.18 8.18 0 003.77.92V6.69z" },
];

export default function Footer() {
  const router = useRouter();
  const { theme } = useTheme();
  const dark = theme === "dark";
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const onNavigate = (r: Route) => router.push(ROUTE_PATH[r]);

  return (
    <footer className="cm-foot">
      <div className="cm-foot__grid">
        <div className="cm-foot__brandcol">
          <Logo variant={dark ? "white" : "dark"} height={40} src={dark ? "/logo-white.svg" : "/logo.svg"} />
          <p className="cm-foot__note">Il tuo partner per scalare nella transizione 5.0. Soluzioni digitali solide nel tempo.</p>
          <div className="cm-foot__social">
            {SOCIAL.map((s) => (
              <a key={s.label} href="#" aria-label={s.label} data-cursor="hug" onClick={(e) => e.preventDefault()}>
                <svg viewBox="0 0 24 24" width="30" height="30" fill="currentColor">
                  <path d={s.d} />
                </svg>
              </a>
            ))}
          </div>
          <div className="cm-foot__newsletter">
            <h4>Newsletter</h4>
            <p className="cm-foot__muted">Aggiornamenti su IA, automazioni e digitale, senza spam.</p>
            {sent ? (
              <p className="cm-foot__muted" style={{ color: "var(--cm-blue)", marginTop: "0.75rem" }}>Iscrizione registrata. Grazie!</p>
            ) : (
              <form
                className="cm-foot__news"
                onSubmit={(e) => {
                  e.preventDefault();
                  if (email.includes("@")) setSent(true);
                }}
              >
                <input type="email" required placeholder="La tua email" value={email} onChange={(e) => setEmail(e.target.value)} aria-label="Email newsletter" />
                <button type="submit" aria-label="Iscriviti">
                  <Icon name="arrow_forward" size={18} />
                </button>
              </form>
            )}
          </div>
        </div>
        <div className="cm-foot__col">
          <h4>Mappa</h4>
          <ul className="cm-foot__list">
            {([{ label: "Home", route: "home" as Route }] as { label: string; route: Route }[])
              .concat(NAV_LINKS)
              .concat([{ label: "Contatti", route: "contatti" }])
              .map((l) => (
                <li key={l.route}>
                  <a onClick={() => onNavigate(l.route)} data-cursor="underline">{l.label}</a>
                </li>
              ))}
          </ul>
        </div>
        <div className="cm-foot__col">
          <h4>Contatti</h4>
          <ul className="cm-foot__list">
            <li><a href="mailto:info@cimaprogetti.it" data-cursor="underline">info@cimaprogetti.it</a></li>
            <li><a href="tel:+393382451171" data-cursor="underline">+39 338 245 1171</a></li>
            <li><a href="mailto:cima.progetti@pec-societa.it" data-cursor="underline">PEC</a></li>
          </ul>
          <h4 style={{ marginTop: "1.5rem" }}>Area riservata</h4>
          <a
            className="cm-foot__reserved"
            href="#"
            onClick={(e) => {
              e.preventDefault();
              onNavigate("login");
            }}
            data-cursor="hug"
          >
            <Icon name="lock" size={16} />
            Login
          </a>
        </div>
        <div className="cm-foot__col">
          <h4>Legals</h4>
          <p className="cm-foot__muted">Via Otranto 39<br />00192 Roma, Italia</p>
          <p className="cm-foot__muted" style={{ marginTop: "0.75rem" }}>REA RM-1778381<br />P.IVA [DA INSERIRE]</p>
          <ul className="cm-foot__list" style={{ marginTop: "1.25rem" }}>
            <li><a onClick={(e) => e.preventDefault()} data-cursor="underline">Privacy Policy</a></li>
            <li><a onClick={(e) => e.preventDefault()} data-cursor="underline">Termini e Condizioni</a></li>
          </ul>
        </div>
      </div>
      <div className="cm-foot__bar">
        <span>© 2025 CIMA PROGETTI Srls · Soluzioni digitali</span>
        <span>Roma, Italia</span>
      </div>
      <span className="cm-foot__mark" aria-hidden="true">CIMA</span>
    </footer>
  );
}
