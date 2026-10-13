// @ts-nocheck — porting automatico di Home.dc.html (logica originale quasi verbatim)
"use client";
/* eslint-disable */
import React from "react";
import Link from "next/link";
import Footer from "@/components/cp/Footer";
import { CP_DATA } from "@/lib/cp/data";
import { CP_QUIZ, CP_DIAG } from "@/lib/cp/quiz";

class HomePage extends React.Component<any, any> {
  [key: string]: any;
  state = { cl: 0, clt: 0, vw: 1280, faqOpen: 0, hs: 0, ht: 0, after: false, auto: true, ft: 0, hov: null, sym: 0, st: 0, v: 0, vt: 0, vp: false };
  heroBarRef = React.createRef();
  hero = [
    { room: 'amm', text: 'Excel condiviso, 14 versioni dello stesso file', metric: '14', unit: 'versioni', label: 'dello stesso file, in tre cartelle', service: 'Software su misura' },
    { room: 'mag', text: 'Tre ore ogni lunedì a copiare dati tra due sistemi', metric: '12h', unit: 'al mese', label: 'di copia-incolla che nessuno ha deciso', service: 'Automazione dei processi' },
    { room: 'srv', text: "Il backup c'è, ma nessuno l'ha mai ripristinato", metric: '0', unit: 'test', label: 'di ripristino negli ultimi tre anni', service: 'Cybersicurezza' },
    { room: 'seg', text: 'Documenti dei clienti caricati su IA online', metric: '38', unit: 'file', label: 'riservati, finiti su servizi esterni', service: 'IA locale' }
  ];
  claims = [
    [['Gestionali e app', ''], ['costruiti con te,', ''], ['', 'spiegati a tutti']],
    [['IA installata', ''], ['sui tuoi server,', ''], ['', 'non altrove']],
    [['Automatizziamo', ''], ['i processi,', ''], ['', 'non le persone']],
    [['Software e IA', ''], ['solo dove', ''], ['', 'conviene davvero']]
  ];
  rooms = [
    { id: 'dir', label: 'direzione', x: 0, y: 0, w: 36, h: 32 }, { id: 'amm', label: 'amministrazione', x: 36, y: 0, w: 64, h: 32 },
    { id: 'ven', label: 'vendite', x: 0, y: 32, w: 28, h: 68 }, { id: 'mag', label: 'magazzino', x: 28, y: 32, w: 44, h: 40 },
    { id: 'srv', label: 'server', x: 72, y: 32, w: 28, h: 26 }, { id: 'seg', label: 'segreteria', x: 72, y: 58, w: 28, h: 42 },
    { id: 'prd', label: 'reparto', x: 28, y: 72, w: 44, h: 28 }
  ];
  flowBefore = [
    { title: 'Ordini via email', sub: 'ricopiati a mano nel gestionale', note: '15′ a ordine' },
    { title: 'Excel condiviso', sub: 'magazzino aggiornato quando si può', note: '3 versioni in giro' },
    { title: 'Controllo manuale', sub: 'una persona incrocia vendite e giacenze', note: '2 giorni a settimana' },
    { title: 'Report a fine mese', sub: 'le anomalie arrivano tardi', note: '30 giorni dopo' }
  ];
  flowAfter = [
    { title: 'Ordini dal portale', sub: 'i clienti li inseriscono da soli', note: '0′ di data entry' },
    { title: 'Gestionale unico', sub: 'un dato, un posto, sempre aggiornato', note: 'tempo reale' },
    { title: 'Agente IA', sub: 'incrocia vendite e giacenze ogni notte', note: 'automatico' },
    { title: 'Report il lunedì alle 7', sub: 'con le anomalie già segnalate', note: '6 giorni prima' }
  ];
  kpis = [{ label: 'tempo per il report', before: '2 giorni', after: '15′' }, { label: 'anomalie scoperte', before: 'a fine mese', after: 'il lunedì' }];
  componentDidMount() {
    if (this.state && 'vw' in this.state) this.setState({ vw: window.innerWidth });
    this.heroLoop();
    if (!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches)) this._cl = setInterval(() => this.setState(s => ({ cl: (s.cl + 1) % this.claims.length, clt: s.clt + 1 })), 5000); this._rs = () => this.setState({ vw: window.innerWidth }); window.addEventListener('resize', this._rs);
    this._flow = setInterval(() => { if (this.state.auto) this.setState(s => ({ after: !s.after, ft: s.ft + 1 })); }, 4200);
    this._sym = setInterval(() => { if (!this.state.hov) this.setState(s => ({ sym: (s.sym + 1) % 10, st: s.st + 1 })); }, 2800);
    this.boot();
  }
  componentWillUnmount() { clearInterval(this._cl); window.removeEventListener('resize', this._rs); clearTimeout(this._h); clearInterval(this._flow); clearInterval(this._sym); clearTimeout(this._w); }
  boot() { if (!CP_DATA) { this._w = setTimeout(() => this.boot(), 30); return; } this.forceUpdate(); }
  heroLoop() {
    const step = () => {
      const b = this.heroBarRef.current;
      if (b) { b.style.transition = 'none'; b.style.width = '0'; void b.offsetWidth; b.style.transition = 'width 4s linear'; b.style.width = '100%'; }
      this._h = setTimeout(() => this.setState(s => ({ hs: (s.hs + 1) % this.hero.length, ht: s.ht + 1 }), step), 4000);
    };
    this._h = setTimeout(step, 400);
  }
  renderVals(): any {
    const { hs, ht, after, ft, hov, sym, st, v, vt, vp, vw, cl, clt } = this.state;
    const pad = n => String(n).padStart(2, '0');
    const a1 = (k, d) => (k % 2 ? 'cp-in' : 'cp-in2') + ' .5s cubic-bezier(.2,.7,.2,1) both' + (d ? ' ' + d + 'ms' : '');
    const cur = this.hero[hs], idxOf = id => this.hero.findIndex(h => h.room === id);
    const rooms = this.rooms.map(r => { const k = idxOf(r.id), on = k === hs, done = k >= 0 && k < hs, h = this.hero[k];
      return { label: r.label, x: r.x + '%', y: r.y + '%', w: r.w + '%', h: r.h + '%', on, metric: h ? h.metric : '', unit: h ? h.unit : '', mark: done ? '✓' : '',
        bg: on ? 'var(--fill-accent)' : done ? 'var(--bg)' : 'var(--glass-strong)', bd: on || done ? 'var(--accent)' : 'var(--line-strong)', fg: on ? 'var(--on-fill)' : done ? 'var(--accent)' : 'var(--meta)', td: on ? '.8s' : '0s' }; });
    const cr = this.rooms.find(r => r.id === cur.room), cxN = cr.x + cr.w / 2, cyN = cr.y + cr.h / 2, p3 = n => String(Math.round(n * 10)).padStart(3, '0');
    const wide = vw >= 1000, mid = vw >= 640;
    const L = wide ? { S: ['1 / 8', '1 / 3'], P: ['8 / 13', '1'], V: ['8 / 13', '2'], M: ['1 / 9', '3'], C: ['9 / 13', '3'] } : mid ? { S: ['1 / 7', '1'], P: ['1 / 4', '2'], V: ['4 / 7', '2'], M: ['1 / 7', '3'], C: ['1 / 7', '4'] } : { S: ['1', 'auto'], P: ['1', 'auto'], V: ['1', 'auto'], M: ['1', 'auto'], C: ['1', 'auto'] };
    const door = k => ({ gc: L[k][0], gr: L[k][1] });
    const heroRows = this.hero.map((r, i) => { const done = i < hs, on = i === hs; return { n: pad(i + 1), text: r.text, bg: on ? 'var(--accent-tint)' : 'transparent', fg: on || done ? 'var(--ink)' : 'var(--meta)', status: done ? 'risolto' : on ? 'rilevato' : 'in coda', sbg: done ? 'var(--fill-accent)' : 'var(--bg)', sc: done ? 'var(--on-fill)' : on ? 'var(--accent)' : 'var(--meta)', sbd: done || on ? 'var(--accent)' : 'var(--line)' }; });
    const base = {
      heroBarRef: this.heroBarRef, heroRows, hero: { ...cur, roomLabel: cr.label }, heroAnim: a1(ht, 700), heroStep: pad(hs + 1), rooms,
      cx: cxN + '%', cy: cyN + '%', coord: 'x ' + p3(cxN) + ' · y ' + p3(cyN), chipT: cxN > 60 ? 'translate(calc(-100% - 20px),-36px)' : 'translate(20px,-36px)',
      claimLines: this.claims[cl].map((l, i, arr) => ({ a: l[0], b: l[1], last: i === arr.length - 1, anim: (clt % 2 ? 'cp-up' : 'cp-up2') + ' .7s cubic-bezier(.2,.7,.2,1) both ' + (120 + i * 80) + 'ms' })),
      heroCols: wide ? 'minmax(0,1.3fr) minmax(0,1fr)' : 'minmax(0,1fr)',
      doorCols: 'repeat(' + (wide ? 12 : mid ? 6 : 1) + ',minmax(0,1fr))', dS: door('S'), dP: door('P'), dV: door('V'), dM: door('M'), dC: door('C'), trackCols: 'repeat(' + (vw >= 760 ? 6 : 3) + ',minmax(0,1fr))',
      openDiag: () => window.dispatchEvent(new Event('cp-open-diagnosi')),
      toggleX: after ? 'translateX(100%)' : 'translateX(0)', beforeFg: after ? 'var(--ink)' : 'var(--on-fill)', afterFg: after ? 'var(--on-fill)' : 'var(--ink)',
      showBefore: () => this.setState(s => s.after ? { after: false, auto: false, ft: s.ft + 1 } : { auto: false }),
      showAfter: () => this.setState(s => s.after ? { auto: false } : { after: true, auto: false, ft: s.ft + 1 }),
      flow: (after ? this.flowAfter : this.flowBefore).map((n, i) => ({ ...n, ghost: (after ? this.flowBefore : this.flowAfter)[i], num: pad(i + 1), arrow: i < 3 ? '→' : after ? '✓' : '…', bd: after ? 'var(--accent)' : 'var(--line-strong)', bs: after ? 'solid' : 'dashed', bg: after ? 'var(--bg)' : 'var(--subtle-2)', accent: after ? 'var(--accent)' : 'var(--meta)', anim: a1(ft, i * 90) })),
      kpis: this.kpis.map(k => ({ label: k.label, v: after ? k.after : k.before, ghost: after ? k.before : k.after, fg: after ? 'var(--accent)' : 'var(--ink)', anim: a1(ft, 300) }))
    };
    const D = CP_DATA; if (!D) return base;
    const svc = Object.fromEntries(D.services.map(s => [s.id, s]));
    const cs = hov ? svc[hov] : D.services[sym];
    return { ...base,
      sym: { ...cs, titleLower: cs.title.toLowerCase() }, symAnim: a1(st),
      stats: ['officina', 'legale', 'poliambulatorio', 'manifattura'].map(id => { const p = D.projects.find(x => x.id === id); return { stat: p.stat, statLabel: p.statLabel, href: '/progetti#' + id }; }),
      projLink: 'Tutti gli ' + D.projects.length + ' casi →',
      proj: (() => { const ids = ['officina', 'legale', 'poliambulatorio', 'manifattura'], p = D.projects.find(x => x.id === ids[st % 4]) || D.projects[0]; return { stat: p.stat, statLabel: p.statLabel }; })(),
      faq: D.faq.map((f, i) => { const on = this.state.faqOpen === i; return { ...f, rows: on ? '1fr' : '0fr', rot: on ? 'rotate(45deg)' : 'none', iconBg: on ? 'var(--fill-ink)' : 'var(--fill-accent)', toggle: () => this.setState(s => ({ faqOpen: s.faqOpen === i ? -1 : i })) }; }),
      method: D.method.map((m, i) => ({ num: m.num, title: m.title, mk: i === 0 ? 'var(--fill-accent)' : 'var(--bg)' })),
      vals: D.values.map((x, i) => ({ title: x.title, c: i === st % D.values.length ? 'var(--accent)' : 'var(--ink)' })),
      projCount: pad(D.projects.filter(p => p.kind !== 'archived').length + (D.live || []).length) + ' progetti'
    };
  }

  render() {
    const { claimLines, openDiag, heroStep, rooms, coord, hero, heroBarRef, showBefore, showAfter, flow, kpis, sym, projCount, vals, method, faq, afterFg, beforeFg, chipT, cx, cy, dC, dM, doorCols, dP, dS, dV, heroAnim, heroCols, symAnim, toggleX, trackCols } = this.renderVals();
    return (<>
    <main>
      <section
        style={{
          padding: "calc(72px + clamp(40px,8vh,96px)) clamp(20px,4vw,48px) clamp(64px,10vh,112px)",
          backgroundImage: "radial-gradient(var(--dot) 1px,transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      >
        <div
          style={{
            maxWidth: "1280px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: heroCols,
            gap: "56px",
            alignItems: "center",
          }}
        >
          <div>
            <div
              data-reveal="1"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
                background: "var(--bg)",
                border: "1px solid var(--line)",
                padding: "8px 12px",
                fontFamily: "var(--mono)",
                fontSize: "12px",
                color: "var(--body)",
              }}
            >
              La tua Software House di persone, non solo strumenti
            </div>
            <h1
              aria-live="polite"
              style={{
                fontWeight: "700",
                fontSize: "clamp(40px,5.4vw,84px)",
                lineHeight: "1",
                letterSpacing: "-.045em",
                margin: "28px 0 0",
                minHeight: "3.24em",
              }}
            >
              {(claimLines || []).map((l, l_i) => (
                <React.Fragment key={l_i}>
                  <span style={{ display: "block", overflow: "hidden", paddingBottom: ".08em" }}>
                    <span style={{ display: "block", animation: l.anim }}>
                      {l.a}
                      <span style={{ color: "var(--accent)" }}>{l.b}</span>
                      {l.last ? (
                        <>
                          <span style={{ color: "var(--accent)", animation: "cp-blink 1.1s steps(1) infinite" }}>_</span>
                        </>
                      ) : null}
                    </span>
                  </span>
                </React.Fragment>
              ))}
            </h1>
            <p
              data-reveal="1"
              data-delay="300"
              style={{
                fontSize: "clamp(17px,1.35vw,20px)",
                lineHeight: "1.5",
                color: "var(--body)",
                maxWidth: "680px",
                margin: "28px 0 0",
                textWrap: "pretty",
              }}
            >
              Software su misura, automazione e IA per aziende che vogliono attraversare la transizione digitale senza perdere il proprio
              valore.
              <br />
              Partiamo da come lavori, dai tuoi metodi, dalle persone dietro la tua realtà: software e infrastrutture che si adattano alla
              tua azienda, non il contrario.
            </p>
            <div
              data-reveal="1"
              data-delay="400"
              style={{ display: "flex", flexWrap: "wrap", gap: "10px", alignItems: "center", marginTop: "36px" }}
            >
              <button
                data-magnetic="1"
                onClick={openDiag}
                className="h-background"
                style={{
                  height: "56px",
                  padding: "0 24px",
                  background: "var(--fill-accent)",
                  color: "var(--on-fill)",
                  border: "0",
                  fontWeight: "700",
                  fontSize: "16px",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "12px",
                  cursor: "pointer",
                  transition: "background .25s",
                  "--h-background": "var(--fill-ink)",
                }}
              >
                Fai la diagnosi{" "}
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                  <path d="M4 12h15M12 5l7 7-7 7" style={{ stroke: "var(--on-fill)", strokeWidth: "2.4px", strokeLinecap: "square" }} />
                </svg>
              </button>
              <Link
                href="/progetti"
                className="h-border-color h-color"
                style={{
                  height: "56px",
                  padding: "0 24px",
                  border: "1px solid var(--line-strong)",
                  background: "var(--bg)",
                  color: "var(--ink)",
                  fontWeight: "700",
                  fontSize: "16px",
                  display: "inline-flex",
                  alignItems: "center",
                  transition: "border-color .25s",
                  "--h-border-color": "var(--ink)",
                  "--h-color": "var(--ink)",
                }}
              >
                Guarda i progetti
              </Link>
            </div>
            <div
              data-reveal="1"
              data-delay="500"
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "8px 22px",
                marginTop: "28px",
                fontFamily: "var(--mono)",
                fontSize: "12px",
                color: "var(--body)",
              }}
            >
              <span style={{ display: "inline-flex", gap: "8px" }}>
                <span style={{ color: "var(--accent)" }}>✓</span>sopralluogo gratuito
              </span>
              <span style={{ display: "inline-flex", gap: "8px" }}>
                <span style={{ color: "var(--accent)" }}>✓</span>tempi e costi prima
              </span>
              <span style={{ display: "inline-flex", gap: "8px" }}>
                <span style={{ color: "var(--accent)" }}>✓</span>il codice resta tuo
              </span>
            </div>
          </div>
          <div data-reveal="1" data-delay="200">
            <div
              data-spot="1"
              style={{
                background:
                  "radial-gradient(520px circle at var(--mx,-999px) var(--my,-999px),var(--accent-wash),transparent 60%),var(--bg)",
                border: "1px solid var(--line)",
                boxShadow: "var(--shadow-lift)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: "12px",
                  padding: "14px 18px",
                  borderBottom: "1px solid var(--line-soft)",
                  fontFamily: "var(--mono)",
                  fontSize: "12px",
                  color: "var(--meta)",
                }}
              >
                <span style={{ display: "inline-flex", gap: "8px", alignItems: "center" }}>
                  <span style={{ position: "relative", width: "6px", height: "6px" }}>
                    <span
                      style={{
                        position: "absolute",
                        inset: "0",
                        background: "var(--fill-accent)",
                        animation: "cp-ping 1.6s cubic-bezier(0,0,.2,1) infinite",
                      }}
                    ></span>
                    <span style={{ position: "absolute", inset: "0", background: "var(--fill-accent)" }}></span>
                  </span>
                  sopralluogo in corso
                </span>
                <span>
                  rilevazione <span style={{ color: "var(--accent)" }}>{heroStep}</span> / 04
                </span>
              </div>
              <div style={{ padding: "18px" }}>
                <div
                  style={{
                    position: "relative",
                    aspectRatio: "6/5",
                    border: "2px solid var(--ink)",
                    backgroundColor: "var(--bg)",
                    backgroundImage:
                      "linear-gradient(var(--grid) 1px,transparent 1px),linear-gradient(90deg,var(--grid) 1px,transparent 1px)",
                    backgroundSize: "20px 20px",
                    overflow: "hidden",
                  }}
                >
                  {(rooms || []).map((r, r_i) => (
                    <React.Fragment key={r_i}>
                      <div style={{ position: "absolute", left: r.x, top: r.y, width: r.w, height: r.h, padding: "3px" }}>
                        <div
                          style={{
                            height: "100%",
                            border: `1px solid ${r.bd}`,
                            backgroundColor: r.bg,
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "space-between",
                            gap: "6px",
                            padding: "clamp(6px,1vw,12px)",
                            overflow: "hidden",
                            transition: `background-color .35s ease ${r.td},border-color .35s ease ${r.td}`,
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              gap: "6px",
                              fontFamily: "var(--mono)",
                              fontSize: "clamp(9px,.85vw,11px)",
                              lineHeight: "1.2",
                              color: r.fg,
                              transition: `color .35s ease ${r.td}`,
                            }}
                          >
                            <span style={{ overflowWrap: "anywhere" }}>{r.label}</span>
                            <span>{r.mark}</span>
                          </div>
                          {r.on ? (
                            <>
                              <div style={{ color: "var(--on-fill)", animation: "cp-in .45s cubic-bezier(.2,.7,.2,1) both .95s" }}>
                                <div
                                  style={{
                                    fontWeight: "700",
                                    fontSize: "clamp(28px,3.6vw,56px)",
                                    lineHeight: ".85",
                                    letterSpacing: "-.05em",
                                  }}
                                >
                                  {r.metric}
                                </div>
                                <div style={{ fontFamily: "var(--mono)", fontSize: "clamp(9px,.85vw,11px)", marginTop: "6px" }}>
                                  {r.unit}
                                </div>
                              </div>
                            </>
                          ) : null}
                        </div>
                      </div>
                    </React.Fragment>
                  ))}
                  <div
                    style={{
                      position: "absolute",
                      top: "0",
                      bottom: "0",
                      left: cx,
                      width: "1px",
                      background: "var(--fill-accent)",
                      transition: "left .9s cubic-bezier(.65,0,.35,1)",
                      pointerEvents: "none",
                    }}
                  ></div>
                  <div
                    style={{
                      position: "absolute",
                      left: "0",
                      right: "0",
                      top: cy,
                      height: "1px",
                      background: "var(--fill-accent)",
                      transition: "top .9s cubic-bezier(.65,0,.35,1)",
                      pointerEvents: "none",
                    }}
                  ></div>
                  <div
                    style={{
                      position: "absolute",
                      left: cx,
                      top: cy,
                      width: "28px",
                      height: "28px",
                      margin: "-14px 0 0 -14px",
                      border: "2px solid var(--ink)",
                      transition: "left .9s cubic-bezier(.65,0,.35,1),top .9s cubic-bezier(.65,0,.35,1)",
                      pointerEvents: "none",
                    }}
                  ></div>
                  <div
                    style={{
                      position: "absolute",
                      left: cx,
                      top: cy,
                      transform: chipT,
                      background: "var(--fill-ink)",
                      color: "var(--on-fill)",
                      fontFamily: "var(--mono)",
                      fontSize: "10px",
                      lineHeight: "1",
                      padding: "5px 7px",
                      whiteSpace: "nowrap",
                      transition: "left .9s cubic-bezier(.65,0,.35,1),top .9s cubic-bezier(.65,0,.35,1)",
                      pointerEvents: "none",
                    }}
                  >
                    {coord}
                  </div>
                </div>
              </div>
              <div
                style={{
                  borderTop: "1px solid var(--line-soft)",
                  padding: "18px",
                  display: "grid",
                  gridTemplateColumns: "minmax(0,1fr) auto",
                  gap: "10px 20px",
                  alignItems: "end",
                }}
              >
                <div style={{ animation: heroAnim }}>
                  <div style={{ fontFamily: "var(--mono)", fontSize: "11px", color: "var(--meta)" }}>rilevato in {hero.roomLabel}_</div>
                  <div
                    style={{
                      fontWeight: "700",
                      fontSize: "clamp(16px,1.3vw,19px)",
                      lineHeight: "1.3",
                      letterSpacing: "-.01em",
                      marginTop: "8px",
                      textWrap: "pretty",
                    }}
                  >
                    {hero.text}
                  </div>
                </div>
                <div style={{ animation: heroAnim, textAlign: "right" }}>
                  <div style={{ fontFamily: "var(--mono)", fontSize: "11px", color: "var(--meta)" }}>soluzione_</div>
                  <div
                    style={{
                      color: "var(--accent)",
                      fontWeight: "700",
                      fontSize: "14px",
                      textTransform: "uppercase",
                      marginTop: "8px",
                      lineHeight: "1.2",
                    }}
                  >
                    → {hero.service}
                  </div>
                </div>
              </div>
              <div style={{ height: "2px", background: "var(--track)" }}>
                <div ref={heroBarRef} style={{ height: "100%", width: "0", background: "var(--fill-accent)" }}></div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section style={{ borderTop: "1px solid var(--line-soft)" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "clamp(80px,12vh,136px) clamp(20px,4vw,48px)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: "28px 48px", flexWrap: "wrap" }}>
            <div style={{ maxWidth: "760px" }}>
              <div
                data-reveal="1"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "10px",
                  fontFamily: "var(--mono)",
                  fontSize: "12px",
                  color: "var(--meta)",
                }}
              >
                01 · cosa facciamo, in concreto
              </div>
              <h2
                data-rise-group="1"
                style={{
                  fontWeight: "700",
                  fontSize: "clamp(34px,4.4vw,64px)",
                  lineHeight: "1",
                  letterSpacing: "-.04em",
                  margin: "18px 0 0",
                }}
              >
                <span style={{ display: "block", overflow: "hidden", paddingBottom: ".08em" }}>
                  <span data-rise="1" style={{ display: "block" }}>
                    Stesso lavoro.
                  </span>
                </span>
                <span style={{ display: "block", overflow: "hidden", paddingBottom: ".08em" }}>
                  <span data-rise="1" style={{ display: "block" }}>
                    Senza il lavoro inutile_
                  </span>
                </span>
              </h2>
              <p
                data-reveal="1"
                style={{
                  fontSize: "clamp(16px,1.25vw,19px)",
                  lineHeight: "1.5",
                  color: "var(--body)",
                  margin: "20px 0 0",
                  maxWidth: "600px",
                  textWrap: "pretty",
                }}
              >
                Un caso reale: ordini, magazzino e report di un distributore alimentare. Ecco cosa cambia quando lo strumento si adatta al
                processo, e non il contrario.
              </p>
            </div>
            <div
              data-reveal="1"
              style={{
                position: "relative",
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                border: "1px solid var(--line)",
                background: "var(--bg)",
                padding: "4px",
                width: "min(100%,300px)",
              }}
            >
              <span
                style={{
                  position: "absolute",
                  top: "4px",
                  bottom: "4px",
                  left: "4px",
                  width: "calc(50% - 4px)",
                  background: "var(--fill-accent)",
                  transform: toggleX,
                  transition: "transform .5s cubic-bezier(.2,.7,.2,1)",
                }}
              ></span>
              <button
                onClick={showBefore}
                style={{
                  position: "relative",
                  height: "44px",
                  border: "0",
                  background: "transparent",
                  cursor: "pointer",
                  fontWeight: "700",
                  fontSize: "14px",
                  color: beforeFg,
                  transition: "color .3s",
                }}
              >
                Prima
              </button>
              <button
                onClick={showAfter}
                style={{
                  position: "relative",
                  height: "44px",
                  border: "0",
                  background: "transparent",
                  cursor: "pointer",
                  fontWeight: "700",
                  fontSize: "14px",
                  color: afterFg,
                  transition: "color .3s",
                }}
              >
                Con CiMa
              </button>
            </div>
          </div>
          <div
            style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,230px),1fr))", gap: "12px", marginTop: "48px" }}
          >
            {(flow || []).map((n, n_i) => (
              <React.Fragment key={n_i}>
                <div
                  style={{
                    border: `1px ${n.bs} ${n.bd}`,
                    background: n.bg,
                    padding: "22px",
                    minHeight: "210px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    gap: "24px",
                    transition: "border-color .5s,background .5s",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      fontFamily: "var(--mono)",
                      fontSize: "12px",
                      color: "var(--meta)",
                    }}
                  >
                    <span>{n.num}</span>
                    <span style={{ color: n.accent, transition: "color .5s" }}>{n.arrow}</span>
                  </div>
                  {/* Testo "prima" e "con CiMa" impilati nella stessa cella: quello inattivo è invisibile
                      ma occupa spazio, così l'altezza della card non cambia allo switch (mobile). */}
                  <div style={{ display: "grid" }}>
                    {[n, n.ghost].map((t, t_i) => (
                      <div
                        key={t_i}
                        aria-hidden={t_i === 1 || undefined}
                        style={{ gridArea: "1 / 1", visibility: t_i ? "hidden" : undefined, animation: t_i ? undefined : n.anim }}
                      >
                        <div style={{ fontWeight: "700", fontSize: "20px", letterSpacing: "-.02em", lineHeight: "1.1" }}>{t.title}</div>
                        <div style={{ fontSize: "14px", lineHeight: "1.45", color: "var(--body)", marginTop: "8px" }}>{t.sub}</div>
                      </div>
                    ))}
                  </div>
                  <div style={{ display: "grid", fontFamily: "var(--mono)", fontSize: "12px", color: n.accent }}>
                    <div style={{ gridArea: "1 / 1", animation: n.anim }}>{n.note}</div>
                    <div aria-hidden="true" style={{ gridArea: "1 / 1", visibility: "hidden" }}>
                      {n.ghost.note}
                    </div>
                  </div>
                </div>
              </React.Fragment>
            ))}
          </div>
          <div
            style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,260px),1fr))", gap: "12px", marginTop: "12px" }}
          >
            {(kpis || []).map((k, k_i) => (
              <React.Fragment key={k_i}>
                <div
                  style={{
                    border: "1px solid var(--line)",
                    padding: "22px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-end",
                    gap: "16px",
                  }}
                >
                  <span style={{ fontFamily: "var(--mono)", fontSize: "12px", color: "var(--meta)" }}>{k.label}</span>
                  <span
                    style={{
                      display: "grid",
                      justifyItems: "end",
                      fontWeight: "700",
                      fontSize: "clamp(28px,2.8vw,40px)",
                      letterSpacing: "-.04em",
                      lineHeight: "1",
                    }}
                  >
                    <span style={{ gridArea: "1 / 1", color: k.fg, animation: k.anim, transition: "color .4s" }}>{k.v}</span>
                    <span aria-hidden="true" style={{ gridArea: "1 / 1", visibility: "hidden" }}>
                      {k.ghost}
                    </span>
                  </span>
                </div>
              </React.Fragment>
            ))}
            <Link
              href="/progetti#distributore"
              data-dark="1"
              className="h-background h-color"
              style={{
                background: "var(--fill-accent)",
                color: "var(--on-fill)",
                padding: "22px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: "16px",
                fontWeight: "700",
                fontSize: "16px",
                transition: "background .25s",
                "--h-background": "var(--fill-ink)",
                "--h-color": "var(--on-fill)",
              }}
            >
              Vai ai progetti
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <path d="M4 12h15M12 5l7 7-7 7" style={{ stroke: "var(--on-fill)", strokeWidth: "2.4px", strokeLinecap: "square" }} />
              </svg>
            </Link>
          </div>
        </div>
      </section>
      <section style={{ borderTop: "1px solid var(--line-soft)" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "clamp(80px,12vh,136px) clamp(20px,4vw,48px)" }}>
          <div style={{ marginBottom: "clamp(32px,5vh,56px)" }}>
            <div data-reveal="1" style={{ fontFamily: "var(--mono)", fontSize: "12px", color: "var(--meta)" }}>
              02 · in breve
            </div>
            <h2
              data-rise-group="1"
              style={{
                fontWeight: "700",
                fontSize: "clamp(34px,4.4vw,64px)",
                lineHeight: "1",
                letterSpacing: "-.04em",
                margin: "18px 0 0",
              }}
            >
              <span style={{ display: "block", overflow: "hidden", paddingBottom: ".08em" }}>
                <span data-rise="1" style={{ display: "block" }}>
                  Scegli da dove
                </span>
              </span>
              <span style={{ display: "block", overflow: "hidden", paddingBottom: ".08em" }}>
                <span data-rise="1" style={{ display: "block", color: "var(--accent)" }}>
                  entrare_
                </span>
              </span>
            </h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: doorCols, gap: "10px" }}>
            <Link
              data-reveal="1"
              href="/servizi"
              className="h-transform h-border-color h-color"
              style={{
                gridColumn: dS.gc,
                gridRow: dS.gr,
                minHeight: "clamp(380px,54vh,540px)",
                background: "var(--fill-accent)",
                color: "var(--on-fill)",
                border: "1px solid var(--accent)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                gap: "28px",
                padding: "clamp(22px,2.4vw,32px)",
                textDecoration: "none",
                transition: "transform .35s cubic-bezier(.2,.7,.2,1),border-color .25s",
                "--h-transform": "translateY(-4px)",
                "--h-border-color": "var(--ink)",
                "--h-color": "var(--on-fill)",
              }}
            >
              <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    gap: "16px",
                    flexWrap: "wrap",
                    fontFamily: "var(--mono)",
                    fontSize: "12px",
                    color: "var(--on-fill)",
                  }}
                >
                  <span>01</span>
                  <span>frasi che sentiamo spesso_</span>
                </div>
                <div
                  style={{
                    fontWeight: "700",
                    fontSize: "clamp(28px,2.8vw,44px)",
                    lineHeight: ".95",
                    letterSpacing: "-.045em",
                    color: "var(--on-fill)",
                  }}
                >
                  Servizi<span style={{ color: "var(--on-fill)" }}>_</span>
                </div>
              </div>
              <div
                style={{
                  fontWeight: "500",
                  fontSize: "clamp(22px,2.3vw,34px)",
                  lineHeight: "1.15",
                  letterSpacing: "-.03em",
                  textWrap: "balance",
                  maxWidth: "24ch",
                  animation: symAnim,
                }}
              >
                “{sym.symptomShort}”
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: "16px" }}>
                <div>
                  <div style={{ fontFamily: "var(--mono)", fontSize: "12px" }}>la risposta_</div>
                  <div
                    style={{
                      fontWeight: "700",
                      fontSize: "clamp(18px,1.6vw,22px)",
                      letterSpacing: "-.02em",
                      textTransform: "uppercase",
                      lineHeight: "1.1",
                      marginTop: "8px",
                      animation: symAnim,
                    }}
                  >
                    → {sym.title}
                  </div>
                </div>
                <span
                  style={{
                    width: "48px",
                    height: "48px",
                    flex: "none",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "var(--bg)",
                    border: "1px solid var(--bg)",
                  }}
                >
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                    <path d="M4 12h15M12 5l7 7-7 7" style={{ stroke: "var(--accent)", strokeWidth: "2.4px", strokeLinecap: "square" }} />
                  </svg>
                </span>
              </div>
            </Link>
            <Link
              data-reveal="1"
              data-delay="80"
              href="/progetti"
              className="h-transform h-border-color h-color"
              style={{
                gridColumn: dP.gc,
                gridRow: dP.gr,
                minHeight: "240px",
                background: "var(--bg)",
                color: "var(--ink)",
                border: "1px solid var(--line)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                gap: "28px",
                padding: "clamp(22px,2.4vw,32px)",
                textDecoration: "none",
                transition: "transform .35s cubic-bezier(.2,.7,.2,1),border-color .25s",
                "--h-transform": "translateY(-4px)",
                "--h-border-color": "var(--accent)",
                "--h-color": "var(--ink)",
              }}
            >
              <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    gap: "16px",
                    flexWrap: "wrap",
                    fontFamily: "var(--mono)",
                    fontSize: "12px",
                    color: "var(--meta)",
                  }}
                >
                  <span>02</span>
                  <span>{projCount}</span>
                </div>
                <div
                  style={{
                    fontWeight: "700",
                    fontSize: "clamp(28px,2.8vw,44px)",
                    lineHeight: ".95",
                    letterSpacing: "-.045em",
                    color: "var(--ink)",
                  }}
                >
                  Progetti<span style={{ color: "var(--accent)" }}>_</span>
                </div>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: "16px" }}>
                <div
                  style={{
                    minWidth: "0",
                    fontWeight: "500",
                    fontSize: "clamp(16px,1.35vw,20px)",
                    lineHeight: "1.3",
                    letterSpacing: "-.015em",
                    textWrap: "pretty",
                    maxWidth: "30ch",
                  }}
                >
                  Scopri come abbiamo già aiutato <span style={{ color: "var(--accent)" }}>più di 15 clienti</span> negli ultimi 6 mesi
                </div>
                <span
                  style={{
                    width: "48px",
                    height: "48px",
                    flex: "none",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "var(--fill-accent)",
                    border: "1px solid var(--accent)",
                  }}
                >
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                    <path d="M4 12h15M12 5l7 7-7 7" style={{ stroke: "var(--on-fill)", strokeWidth: "2.4px", strokeLinecap: "square" }} />
                  </svg>
                </span>
              </div>
            </Link>
            <Link
              data-reveal="1"
              data-delay="160"
              href="/valori"
              className="h-transform h-border-color h-color"
              style={{
                gridColumn: dV.gc,
                gridRow: dV.gr,
                minHeight: "240px",
                background: "var(--bg)",
                color: "var(--ink)",
                border: "1px solid var(--line)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                gap: "28px",
                padding: "clamp(22px,2.4vw,32px)",
                textDecoration: "none",
                transition: "transform .35s cubic-bezier(.2,.7,.2,1),border-color .25s",
                "--h-transform": "translateY(-4px)",
                "--h-border-color": "var(--accent)",
                "--h-color": "var(--ink)",
              }}
            >
              <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    gap: "16px",
                    flexWrap: "wrap",
                    fontFamily: "var(--mono)",
                    fontSize: "12px",
                    color: "var(--meta)",
                  }}
                >
                  <span>03</span>
                  <span>il nostro filtro_</span>
                </div>
                <div
                  style={{
                    fontWeight: "700",
                    fontSize: "clamp(28px,2.8vw,44px)",
                    lineHeight: ".95",
                    letterSpacing: "-.045em",
                    color: "var(--ink)",
                  }}
                >
                  Valori<span style={{ color: "var(--accent)" }}>_</span>
                </div>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: "16px" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: "6px", minWidth: "0" }}>
                  {(vals || []).map((v, v_i) => (
                    <React.Fragment key={v_i}>
                      <span
                        style={{
                          fontWeight: "700",
                          fontSize: "clamp(13px,1.1vw,16px)",
                          letterSpacing: "-.01em",
                          textTransform: "uppercase",
                          lineHeight: "1.2",
                          color: v.c,
                          transition: "color .4s",
                        }}
                      >
                        {v.title}
                      </span>
                    </React.Fragment>
                  ))}
                </div>
                <span
                  style={{
                    width: "48px",
                    height: "48px",
                    flex: "none",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "var(--fill-accent)",
                    border: "1px solid var(--accent)",
                  }}
                >
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                    <path d="M4 12h15M12 5l7 7-7 7" style={{ stroke: "var(--on-fill)", strokeWidth: "2.4px", strokeLinecap: "square" }} />
                  </svg>
                </span>
              </div>
            </Link>
            <Link
              data-reveal="1"
              href="/metodo"
              className="h-transform h-border-color h-color"
              style={{
                gridColumn: dM.gc,
                gridRow: dM.gr,
                minHeight: "240px",
                background: "var(--bg)",
                color: "var(--ink)",
                border: "1px solid var(--line)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                gap: "28px",
                padding: "clamp(22px,2.4vw,32px)",
                textDecoration: "none",
                transition: "transform .35s cubic-bezier(.2,.7,.2,1),border-color .25s",
                "--h-transform": "translateY(-4px)",
                "--h-border-color": "var(--accent)",
                "--h-color": "var(--ink)",
              }}
            >
              <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    gap: "16px",
                    flexWrap: "wrap",
                    fontFamily: "var(--mono)",
                    fontSize: "12px",
                    color: "var(--meta)",
                  }}
                >
                  <span>04</span>
                  <span>si parte da un sopralluogo gratuito_</span>
                </div>
                <div
                  style={{
                    fontWeight: "700",
                    fontSize: "clamp(28px,2.8vw,44px)",
                    lineHeight: ".95",
                    letterSpacing: "-.045em",
                    color: "var(--ink)",
                  }}
                >
                  Come lavoriamo<span style={{ color: "var(--accent)" }}>_</span>
                </div>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: "24px" }}>
                <div style={{ flex: "1", minWidth: "0", display: "grid", gridTemplateColumns: trackCols, rowGap: "20px" }}>
                  {(method || []).map((m, m_i) => (
                    <React.Fragment key={m_i}>
                      <div style={{ display: "flex", flexDirection: "column", gap: "10px", minWidth: "0" }}>
                        <div style={{ position: "relative", height: "14px" }}>
                          <span
                            style={{
                              position: "absolute",
                              left: "0",
                              right: "0",
                              top: "6px",
                              height: "2px",
                              background: "var(--fill-accent)",
                            }}
                          ></span>
                          <span
                            style={{
                              position: "relative",
                              display: "block",
                              width: "14px",
                              height: "14px",
                              background: m.mk,
                              border: "2px solid var(--accent)",
                            }}
                          ></span>
                        </div>
                        <span style={{ fontFamily: "var(--mono)", fontSize: "11px", color: "var(--accent)" }}>{m.num}</span>
                        <span
                          style={{
                            fontWeight: "700",
                            fontSize: "clamp(11px,1vw,13px)",
                            letterSpacing: "-.01em",
                            textTransform: "uppercase",
                            lineHeight: "1.15",
                            paddingRight: "8px",
                            overflowWrap: "anywhere",
                          }}
                        >
                          {m.title}
                        </span>
                      </div>
                    </React.Fragment>
                  ))}
                </div>
                <span
                  style={{
                    width: "48px",
                    height: "48px",
                    flex: "none",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "var(--fill-accent)",
                    border: "1px solid var(--accent)",
                  }}
                >
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                    <path d="M4 12h15M12 5l7 7-7 7" style={{ stroke: "var(--on-fill)", strokeWidth: "2.4px", strokeLinecap: "square" }} />
                  </svg>
                </span>
              </div>
            </Link>
            <Link
              data-reveal="1"
              data-delay="80"
              href="/chi-siamo"
              className="h-transform h-border-color h-color"
              style={{
                gridColumn: dC.gc,
                gridRow: dC.gr,
                minHeight: "240px",
                background: "var(--fill-ink)",
                color: "var(--on-fill)",
                border: "1px solid var(--ink)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                gap: "28px",
                padding: "clamp(22px,2.4vw,32px)",
                textDecoration: "none",
                transition: "transform .35s cubic-bezier(.2,.7,.2,1),border-color .25s",
                "--h-transform": "translateY(-4px)",
                "--h-border-color": "var(--accent)",
                "--h-color": "var(--on-fill)",
              }}
            >
              <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    gap: "16px",
                    flexWrap: "wrap",
                    fontFamily: "var(--mono)",
                    fontSize: "12px",
                    color: "var(--on-fill)",
                  }}
                >
                  <span>05</span>
                </div>
                <div
                  style={{
                    fontWeight: "700",
                    fontSize: "clamp(28px,2.8vw,44px)",
                    lineHeight: ".95",
                    letterSpacing: "-.045em",
                    color: "var(--on-fill)",
                  }}
                >
                  Chi siamo<span style={{ color: "var(--on-fill)" }}>_</span>
                </div>
              </div>
              <div
                style={{
                  fontWeight: "500",
                  fontSize: "clamp(16px,1.35vw,20px)",
                  lineHeight: "1.3",
                  letterSpacing: "-.015em",
                  textWrap: "balance",
                }}
              >
                Ogni azienda nasce dalle persone.
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: "16px" }}>
                <span style={{ fontFamily: "var(--mono)", fontSize: "12px" }}>Nicola · Valentina</span>
                <span
                  style={{
                    width: "48px",
                    height: "48px",
                    flex: "none",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "var(--bg)",
                    border: "1px solid var(--bg)",
                  }}
                >
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                    <path d="M4 12h15M12 5l7 7-7 7" style={{ stroke: "var(--ink)", strokeWidth: "2.4px", strokeLinecap: "square" }} />
                  </svg>
                </span>
              </div>
            </Link>
          </div>
        </div>
      </section>
      <section
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          padding: "clamp(48px,8vh,96px) clamp(20px,4vw,48px)",
          display: "flex",
          flexWrap: "wrap",
          gap: "32px 64px",
          alignItems: "start",
        }}
      >
        <div style={{ flex: "0 1 260px" }}>
          <div
            data-reveal="1"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "10px",
              fontFamily: "var(--mono)",
              fontSize: "12px",
              color: "var(--meta)",
            }}
          >
            le prime cose che ci chiedi
          </div>
          <h2
            data-rise-group="1"
            style={{ fontWeight: "700", fontSize: "clamp(34px,4.4vw,64px)", lineHeight: "1", letterSpacing: "-.04em", margin: "18px 0 0" }}
          >
            <span style={{ display: "block", overflow: "hidden", paddingBottom: ".08em" }}>
              <span data-rise="1" style={{ display: "block" }}>
                Domande_
              </span>
            </span>
          </h2>
        </div>
        <div style={{ flex: "1 1 560px", minWidth: "0", borderTop: "1px solid var(--line)" }}>
          {(faq || []).map((f, f_i) => (
            <React.Fragment key={f_i}>
              <div style={{ borderBottom: "1px solid var(--line)" }}>
                <button
                  onClick={f.toggle}
                  className="h-color"
                  style={{
                    width: "100%",
                    background: "transparent",
                    border: "0",
                    padding: "22px 0",
                    display: "flex",
                    justifyContent: "space-between",
                    gap: "20px",
                    alignItems: "center",
                    cursor: "pointer",
                    textAlign: "left",
                    transition: "color .2s",
                    "--h-color": "var(--accent)",
                  }}
                >
                  <span style={{ fontWeight: "700", fontSize: "clamp(18px,1.5vw,21px)", letterSpacing: "-.01em" }}>{f.q}</span>
                  <span
                    style={{
                      width: "36px",
                      height: "36px",
                      background: f.iconBg,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flex: "none",
                      transition: "background .3s",
                    }}
                  >
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      style={{ transform: f.rot, transition: "transform .35s cubic-bezier(.2,.7,.2,1)" }}
                    >
                      <path d="M5 12h14M12 5v14" style={{ stroke: "var(--on-fill)", strokeWidth: "2.6px", strokeLinecap: "square" }} />
                    </svg>
                  </span>
                </button>
                <div style={{ display: "grid", gridTemplateRows: f.rows, transition: "grid-template-rows .45s cubic-bezier(.2,.7,.2,1)" }}>
                  <div style={{ overflow: "hidden" }}>
                    <p
                      style={{
                        margin: "0 0 24px",
                        fontSize: "16px",
                        lineHeight: "1.55",
                        color: "var(--body)",
                        maxWidth: "760px",
                        textWrap: "pretty",
                      }}
                    >
                      {f.a}
                    </p>
                  </div>
                </div>
              </div>
            </React.Fragment>
          ))}
        </div>
      </section>
    </main>
    <Footer />
  </>);
  }
}

export default HomePage;
