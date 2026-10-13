"use client";
/* eslint-disable */
// Mockup UI dei "Casi riservati" (porting di CaseUI.dc.html).
// Sono schermate di clienti fittizi: i colori restano quelli dei mockup, in entrambi i temi.
import React, { useEffect } from "react";

const FONTS =
  "https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800&family=Jost:wght@400;500&family=Great+Vibes&family=Hanken+Grotesk:wght@400;500;600&family=Instrument+Serif:ital@1&family=Geist:wght@400;500;600&family=Newsreader:opsz,wght@6..72,400;6..72,500&family=Space+Grotesk:wght@400;500;700&family=Sora:wght@400;600;700&display=swap";
let fontsLoaded = false;

export default function CaseUI({ skin, style }: { skin: string; style?: React.CSSProperties }) {
  useEffect(() => {
    if (fontsLoaded) return;
    fontsLoaded = true;
    const l = document.createElement("link");
    l.rel = "stylesheet";
    l.href = FONTS;
    document.head.appendChild(l);
  }, []);
  const isA = skin === "affitti",
    isE = skin === "estetica",
    isK = skin === "circolo",
    isL = skin === "legale",
    isD = skin === "distributore",
    isS = skin === "startup";
  return (
    <div style={style}>
  <>
    <div style={{ position: "absolute", inset: "0", fontSize: "1.55cqw", lineHeight: "1.25", overflow: "hidden", textAlign: "left" }}>
      {isE ? (
        <>
          <div
            style={{
              position: "absolute",
              inset: "0",
              background: "#FBF4F3",
              color: "#4A2E33",
              fontFamily: "'Jost',sans-serif",
              display: "grid",
              gridTemplateColumns: "minmax(0,1.55fr) minmax(0,1fr)",
              gap: "1.3em",
              padding: "1.3em 1.5em",
            }}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: ".8em", minWidth: "0" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: "1em" }}>
                <div>
                  <div style={{ fontFamily: "'Great Vibes',cursive", fontSize: "2.7em", lineHeight: ".85", color: "#C7838D" }}>
                    Seraphine
                  </div>
                  <div style={{ fontSize: ".56em", letterSpacing: ".42em", color: "#9A7A7F", marginTop: ".5em" }}>
                    NAILS &amp; BEAUTY · ROMA
                  </div>
                </div>
                <span style={{ fontSize: ".56em", letterSpacing: ".32em", color: "#9A7A7F", whiteSpace: "nowrap" }}>
                  VENERDÌ 10 OTTOBRE
                </span>
              </div>
              <div
                style={{
                  flex: "1",
                  background: "#fff",
                  borderRadius: ".5em",
                  padding: ".3em 1.1em",
                  display: "flex",
                  flexDirection: "column",
                  minHeight: "0",
                  boxShadow: "0 .6em 1.6em -1em rgba(120,60,70,.3)",
                }}
              >
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "3.2em minmax(0,1fr) auto",
                    gap: ".9em",
                    alignItems: "center",
                    padding: ".62em 0",
                    borderBottom: "1px solid #F3E6E6",
                  }}
                >
                  <span style={{ fontSize: ".76em", color: "#9A7A7F", letterSpacing: ".04em" }}>09:30</span>
                  <span style={{ minWidth: "0", lineHeight: "1.25" }}>
                    <span
                      style={{
                        display: "block",
                        fontWeight: "500",
                        fontSize: ".88em",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      Giulia R.
                    </span>
                    <span style={{ fontSize: ".7em", color: "#9A7A7F" }}>Semipermanente mani</span>
                  </span>
                  <span
                    style={{
                      fontSize: ".62em",
                      letterSpacing: ".06em",
                      padding: ".35em .8em",
                      borderRadius: "2em",
                      whiteSpace: "nowrap",
                      background: "#F6E3E5",
                      color: "#A45A66",
                    }}
                  >
                    acconto ✓
                  </span>
                </div>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "3.2em minmax(0,1fr) auto",
                    gap: ".9em",
                    alignItems: "center",
                    padding: ".62em 0",
                    borderBottom: "1px solid #F3E6E6",
                  }}
                >
                  <span style={{ fontSize: ".76em", color: "#9A7A7F", letterSpacing: ".04em" }}>10:30</span>
                  <span style={{ minWidth: "0", lineHeight: "1.25" }}>
                    <span
                      style={{
                        display: "block",
                        fontWeight: "500",
                        fontSize: ".88em",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      Chiara M.
                    </span>
                    <span style={{ fontSize: ".7em", color: "#9A7A7F" }}>Laminazione ciglia</span>
                  </span>
                  <span
                    style={{
                      fontSize: ".62em",
                      letterSpacing: ".06em",
                      padding: ".35em .8em",
                      borderRadius: "2em",
                      whiteSpace: "nowrap",
                      background: "#fff",
                      color: "#A45A66",
                      border: "1px solid #E8C6CB",
                    }}
                  >
                    promemoria inviato
                  </span>
                </div>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "3.2em minmax(0,1fr) auto",
                    gap: ".9em",
                    alignItems: "center",
                    padding: ".62em 0",
                    borderBottom: "1px solid #F3E6E6",
                  }}
                >
                  <span style={{ fontSize: ".76em", color: "#9A7A7F", letterSpacing: ".04em" }}>11:30</span>
                  <span style={{ minWidth: "0", lineHeight: "1.25" }}>
                    <span
                      style={{
                        display: "block",
                        fontWeight: "500",
                        fontSize: ".88em",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      Slot liberato
                    </span>
                    <span style={{ fontSize: ".7em", color: "#9A7A7F" }}>avvisate 3 clienti in attesa</span>
                  </span>
                  <span
                    style={{
                      fontSize: ".62em",
                      letterSpacing: ".06em",
                      padding: ".35em .8em",
                      borderRadius: "2em",
                      whiteSpace: "nowrap",
                      background: "#4A2E33",
                      color: "#FBF4F3",
                    }}
                  >
                    di nuovo prenotabile
                  </span>
                </div>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "3.2em minmax(0,1fr) auto",
                    gap: ".9em",
                    alignItems: "center",
                    padding: ".62em 0",
                    borderBottom: "1px solid #F3E6E6",
                  }}
                >
                  <span style={{ fontSize: ".76em", color: "#9A7A7F", letterSpacing: ".04em" }}>14:00</span>
                  <span style={{ minWidth: "0", lineHeight: "1.25" }}>
                    <span
                      style={{
                        display: "block",
                        fontWeight: "500",
                        fontSize: ".88em",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      Federica T.
                    </span>
                    <span style={{ fontSize: ".7em", color: "#9A7A7F" }}>Ricostruzione unghie</span>
                  </span>
                  <span
                    style={{
                      fontSize: ".62em",
                      letterSpacing: ".06em",
                      padding: ".35em .8em",
                      borderRadius: "2em",
                      whiteSpace: "nowrap",
                      background: "#F6E3E5",
                      color: "#A45A66",
                    }}
                  >
                    acconto ✓
                  </span>
                </div>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "3.2em minmax(0,1fr) auto",
                    gap: ".9em",
                    alignItems: "center",
                    padding: ".62em 0",
                    borderBottom: "1px solid #F3E6E6",
                  }}
                >
                  <span style={{ fontSize: ".76em", color: "#9A7A7F", letterSpacing: ".04em" }}>15:30</span>
                  <span style={{ minWidth: "0", lineHeight: "1.25" }}>
                    <span
                      style={{
                        display: "block",
                        fontWeight: "500",
                        fontSize: ".88em",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      Sara L.
                    </span>
                    <span style={{ fontSize: ".7em", color: "#9A7A7F" }}>Pedicure</span>
                  </span>
                  <span
                    style={{
                      fontSize: ".62em",
                      letterSpacing: ".06em",
                      padding: ".35em .8em",
                      borderRadius: "2em",
                      whiteSpace: "nowrap",
                      background: "#fff",
                      color: "#A45A66",
                      border: "1px solid #E8C6CB",
                    }}
                  >
                    confermato
                  </span>
                </div>
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: ".8em", minWidth: "0" }}>
              <div style={{ background: "#F3DDE0", borderRadius: ".5em", padding: "1em 1.1em" }}>
                <div style={{ fontSize: ".56em", letterSpacing: ".32em", color: "#8E5560" }}>NO-SHOW QUESTO MESE</div>
                <div style={{ display: "flex", alignItems: "baseline", gap: ".5em", marginTop: ".3em" }}>
                  <span style={{ fontFamily: "'Great Vibes',cursive", fontSize: "3.2em", lineHeight: ".9", color: "#A45A66" }}>3</span>
                  <span style={{ fontSize: ".74em", color: "#8E5560" }}>erano 12</span>
                </div>
              </div>
              <div
                style={{
                  background: "#fff",
                  borderRadius: ".5em",
                  padding: "1em 1.1em",
                  boxShadow: "0 .6em 1.6em -1em rgba(120,60,70,.3)",
                }}
              >
                <div style={{ fontSize: ".56em", letterSpacing: ".32em", color: "#9A7A7F" }}>TRATTENUTA AUTOMATICA</div>
                <div style={{ fontSize: "1.7em", fontWeight: "500", color: "#4A2E33", marginTop: ".15em" }}>30%</div>
                <div style={{ fontSize: ".7em", color: "#9A7A7F" }}>solo per disdette tardive</div>
              </div>
              <div
                style={{
                  flex: "1",
                  background: "#fff",
                  borderRadius: ".5em",
                  padding: "1em 1.1em",
                  display: "flex",
                  flexDirection: "column",
                  gap: ".5em",
                  boxShadow: "0 .6em 1.6em -1em rgba(120,60,70,.3)",
                }}
              >
                <div style={{ fontSize: ".56em", letterSpacing: ".32em", color: "#9A7A7F" }}>MAGAZZINO</div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: ".78em" }}>
                  <span>Gel base</span>
                  <span style={{ color: "#A45A66", fontWeight: "500" }}>2 · riordina</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: ".78em" }}>
                  <span>Top coat</span>
                  <span style={{ color: "#9A7A7F" }}>6</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: ".78em" }}>
                  <span>Colla ciglia</span>
                  <span style={{ color: "#9A7A7F" }}>11</span>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}

      {isL ? (
        <>
          <div
            style={{
              position: "absolute",
              inset: "0",
              background: "#F6F4EF",
              color: "#1D1C1A",
              fontFamily: "'Geist',sans-serif",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                position: "absolute",
                left: "2.2em",
                right: "2.2em",
                top: "1.5em",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: "1em",
                fontSize: ".76em",
                color: "#6E6A62",
              }}
            >
              <span style={{ display: "flex", gap: ".7em", alignItems: "baseline" }}>
                <b style={{ color: "#1D1C1A", fontWeight: "600", fontSize: "1.1em" }}>Archivio</b>
                <span>18.420 fascicoli · 1987–2025</span>
              </span>
              <span
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: ".45em",
                  background: "#fff",
                  borderRadius: "2em",
                  padding: ".4em .85em",
                }}
              >
                <svg width="1.05em" height="1.05em" viewBox="0 0 24 24" fill="none">
                  <rect x="5" y="11" width="14" height="9" rx="2" style={{ stroke: "currentColor", strokeWidth: "2px" }} />
                  <path d="M8 11V8a4 4 0 0 1 8 0v3" style={{ stroke: "currentColor", strokeWidth: "2px" }} />
                </svg>
                Sul server dello studio
              </span>
            </div>
            <div
              style={{
                position: "absolute",
                left: "2.2em",
                top: "4.6em",
                width: "33em",
                display: "flex",
                flexDirection: "column",
                gap: "1.1em",
              }}
            >
              <div style={{ fontSize: "1.5em", fontWeight: "500", letterSpacing: "-.03em", lineHeight: "1.18", textWrap: "balance" }}>
                Abbiamo già seguito casi di recesso del conduttore per gravi motivi?
              </div>
              <p style={{ margin: "0", fontFamily: "'Newsreader',serif", fontSize: "1.02em", lineHeight: "1.6", color: "#36332D" }}>
                Sì, in tre pratiche. Nel parere del 2019 lo studio ha sostenuto che il calo documentato del fatturato integra i gravi motivi
                <span
                  style={{
                    display: "inline-flex",
                    width: "1.35em",
                    height: "1.35em",
                    borderRadius: "50%",
                    background: "#1D1C1A",
                    color: "#fff",
                    fontFamily: "'Geist',sans-serif",
                    fontSize: ".6em",
                    alignItems: "center",
                    justifyContent: "center",
                    verticalAlign: ".4em",
                    marginLeft: ".2em",
                  }}
                >
                  1
                </span>
                , linea poi confermata in appello
                <span
                  style={{
                    display: "inline-flex",
                    width: "1.35em",
                    height: "1.35em",
                    borderRadius: "50%",
                    background: "#1D1C1A",
                    color: "#fff",
                    fontFamily: "'Geist',sans-serif",
                    fontSize: ".6em",
                    alignItems: "center",
                    justifyContent: "center",
                    verticalAlign: ".4em",
                    marginLeft: ".2em",
                  }}
                >
                  2
                </span>
                . Nel 2021, al contrario, la memoria ha contestato un recesso comunicato senza preavviso
                <span
                  style={{
                    display: "inline-flex",
                    width: "1.35em",
                    height: "1.35em",
                    borderRadius: "50%",
                    background: "#1D1C1A",
                    color: "#fff",
                    fontFamily: "'Geist',sans-serif",
                    fontSize: ".6em",
                    alignItems: "center",
                    justifyContent: "center",
                    verticalAlign: ".4em",
                    marginLeft: ".2em",
                  }}
                >
                  3
                </span>
                .
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: ".45em" }}>
                <span
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: ".5em",
                    background: "#ECE8DF",
                    borderRadius: "2em",
                    padding: ".4em .9em .4em .45em",
                    fontSize: ".68em",
                    whiteSpace: "nowrap",
                  }}
                >
                  <span
                    style={{
                      width: "1.6em",
                      height: "1.6em",
                      borderRadius: "50%",
                      background: "#fff",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: "600",
                    }}
                  >
                    1
                  </span>
                  <span>
                    <b style={{ fontWeight: "600" }}>Parere</b> · pratica 2231
                  </span>
                </span>
                <span
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: ".5em",
                    background: "#ECE8DF",
                    borderRadius: "2em",
                    padding: ".4em .9em .4em .45em",
                    fontSize: ".68em",
                    whiteSpace: "nowrap",
                  }}
                >
                  <span
                    style={{
                      width: "1.6em",
                      height: "1.6em",
                      borderRadius: "50%",
                      background: "#fff",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: "600",
                    }}
                  >
                    2
                  </span>
                  <span>
                    <b style={{ fontWeight: "600" }}>Sentenza</b> · pratica 1874
                  </span>
                </span>
                <span
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: ".5em",
                    background: "#ECE8DF",
                    borderRadius: "2em",
                    padding: ".4em .9em .4em .45em",
                    fontSize: ".68em",
                    whiteSpace: "nowrap",
                  }}
                >
                  <span
                    style={{
                      width: "1.6em",
                      height: "1.6em",
                      borderRadius: "50%",
                      background: "#fff",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: "600",
                    }}
                  >
                    3
                  </span>
                  <span>
                    <b style={{ fontWeight: "600" }}>Memoria</b> · pratica 2412
                  </span>
                </span>
              </div>
            </div>
            <div
              style={{
                position: "absolute",
                left: "2.2em",
                width: "33em",
                bottom: "1.7em",
                background: "#fff",
                borderRadius: "2em",
                padding: ".5em .5em .5em 1.2em",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                boxShadow: "0 1em 2em -1.6em rgba(40,30,10,.35)",
              }}
            >
              <span style={{ fontSize: ".8em", color: "#9A958B" }}>{"Chiedi qualcos'altro all'archivio…"}</span>
              <span
                style={{
                  width: "2.2em",
                  height: "2.2em",
                  borderRadius: "50%",
                  background: "#1D1C1A",
                  color: "#fff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: ".85em",
                }}
              >
                ↑
              </span>
            </div>
            <div style={{ position: "absolute", right: "2.6em", top: "4.4em", width: "22.5em", height: "29.6em" }}>
              <div
                style={{
                  position: "absolute",
                  inset: "0",
                  background: "#fff",
                  borderRadius: ".7em",
                  transform: "rotate(4deg) translate(1.2em,.4em)",
                  boxShadow: "0 1em 2em -1.6em rgba(40,30,10,.3)",
                }}
              ></div>
              <div
                style={{
                  position: "absolute",
                  inset: "0",
                  background: "#FCFBF8",
                  borderRadius: ".7em",
                  transform: "rotate(-2.5deg) translate(-.6em,.2em)",
                  boxShadow: "0 1em 2em -1.6em rgba(40,30,10,.3)",
                }}
              ></div>
              <div
                style={{
                  position: "absolute",
                  inset: "0",
                  background: "#fff",
                  borderRadius: ".7em",
                  padding: "1.6em 1.7em",
                  display: "flex",
                  flexDirection: "column",
                  gap: ".8em",
                  boxShadow: "0 1.6em 3em -2em rgba(40,30,10,.45)",
                }}
              >
                <span style={{ fontSize: ".66em", color: "#9A958B" }}>Pratica 2231 · Parere · 2019</span>
                <span style={{ fontFamily: "'Newsreader',serif", fontSize: "1.25em", lineHeight: "1.2", letterSpacing: "-.01em" }}>
                  Parere sul recesso del conduttore per gravi motivi
                </span>
                <p style={{ margin: "0", fontFamily: "'Newsreader',serif", fontSize: ".74em", lineHeight: "1.75", color: "#4A463E" }}>
                  {
                    "Il conduttore, ai sensi dell'art. 27 della legge 392/1978, può recedere dal contratto in qualsiasi momento qualora ricorrano gravi motivi. Nel caso in esame, "
                  }
                  <span style={{ background: "linear-gradient(transparent 52%,#F1E19B 52%)" }}>
                    la contrazione del fatturato, documentata e non prevedibile al momento della stipula, rende oggettivamente gravosa la
                    prosecuzione del rapporto
                  </span>
                  , e integra pertanto i presupposti richiesti dalla norma.
                </p>
                <p style={{ margin: "0", fontFamily: "'Newsreader',serif", fontSize: ".74em", lineHeight: "1.75", color: "#4A463E" }}>
                  {"Resta fermo l'obbligo di preavviso di sei mesi, da comunicarsi con lettera raccomandata …"}
                </p>
                <span style={{ marginTop: "auto", fontSize: ".64em", color: "#9A958B" }}>pag. 4 di 12</span>
              </div>
            </div>
          </div>
        </>
      ) : null}

      {isK ? (
        <>
          <div
            style={{
              position: "absolute",
              inset: "0",
              background: "#DDE6DA",
              color: "#16241C",
              fontFamily: "'Hanken Grotesk',sans-serif",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                position: "absolute",
                left: "-7em",
                bottom: "-12em",
                width: "32em",
                height: "32em",
                borderRadius: "50%",
                background: "#CFDBCB",
              }}
            ></div>
            <div
              style={{
                position: "absolute",
                left: "12.4em",
                right: "1.6em",
                top: "1.6em",
                bottom: "1.6em",
                background: "#fff",
                borderRadius: "1.7em",
                boxShadow: "0 2em 4em -2.6em rgba(22,36,28,.4)",
                padding: "1.5em 1.8em 1.4em 6.4em",
                display: "flex",
                flexDirection: "column",
                gap: "1em",
                minWidth: "0",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: "1em" }}>
                <span style={{ display: "flex", alignItems: "baseline", gap: ".7em" }}>
                  <span style={{ fontFamily: "'Instrument Serif',serif", fontStyle: "italic", fontSize: "1.35em" }}>Pineta</span>
                  <span style={{ fontSize: ".74em", color: "#6B776F" }}>Bar della piscina</span>
                </span>
                <span style={{ fontSize: ".72em", color: "#6B776F", whiteSpace: "nowrap" }}>oggi · 18 ordini · € 742</span>
              </div>
              <div style={{ fontSize: "2.1em", fontWeight: "600", letterSpacing: "-.04em", lineHeight: "1" }}>Ordini</div>
              <div style={{ display: "flex", gap: ".4em", flexWrap: "wrap", fontSize: ".72em", fontWeight: "600" }}>
                <span style={{ background: "#1F3A2C", color: "#fff", borderRadius: "2em", padding: ".5em 1em" }}>Nuovi&nbsp; 2</span>
                <span style={{ background: "#F1F4EF", borderRadius: "2em", padding: ".5em 1em" }}>In preparazione&nbsp; 1</span>
                <span style={{ background: "#F1F4EF", borderRadius: "2em", padding: ".5em 1em" }}>Pronti&nbsp; 1</span>
                <span style={{ color: "#6B776F", padding: ".5em 1em" }}>Consegnati&nbsp; 14</span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: ".15em", margin: "0 -.8em" }}>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "2.9em minmax(0,1fr) 3.6em auto",
                    gap: "1em",
                    alignItems: "center",
                    padding: ".7em .8em",
                    borderRadius: "1.1em",
                    background: "#F3F6F1",
                  }}
                >
                  <span
                    style={{
                      width: "2.9em",
                      height: "2.9em",
                      borderRadius: "50%",
                      background: "#fff",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      lineHeight: "1",
                    }}
                  >
                    <span style={{ fontSize: ".5em", color: "#6B776F" }}>lettino</span>
                    <span style={{ fontWeight: "600", fontSize: "1em", letterSpacing: "-.03em" }}>14</span>
                  </span>
                  <span style={{ minWidth: "0" }}>
                    <span style={{ display: "block", fontWeight: "600", fontSize: ".9em", letterSpacing: "-.015em" }}>Marco Rossi</span>
                    <span
                      style={{
                        display: "block",
                        fontSize: ".72em",
                        color: "#6B776F",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      2 Spritz · Club sandwich
                    </span>
                  </span>
                  <span style={{ fontWeight: "600", fontSize: ".88em", textAlign: "right" }}>€ 39</span>
                  <span
                    style={{
                      background: "#1F3A2C",
                      color: "#fff",
                      borderRadius: "2em",
                      padding: ".5em 1em",
                      fontSize: ".72em",
                      fontWeight: "600",
                      whiteSpace: "nowrap",
                    }}
                  >
                    Prepara
                  </span>
                </div>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "2.9em minmax(0,1fr) 3.6em auto",
                    gap: "1em",
                    alignItems: "center",
                    padding: ".7em .8em",
                    borderRadius: "1.1em",
                  }}
                >
                  <span
                    style={{
                      width: "2.9em",
                      height: "2.9em",
                      borderRadius: "50%",
                      background: "#F1F4EF",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      lineHeight: "1",
                    }}
                  >
                    <span style={{ fontSize: ".5em", color: "#6B776F" }}>cabina</span>
                    <span style={{ fontWeight: "600", fontSize: "1em", letterSpacing: "-.03em" }}>3</span>
                  </span>
                  <span style={{ minWidth: "0" }}>
                    <span style={{ display: "block", fontWeight: "600", fontSize: ".9em", letterSpacing: "-.015em" }}>Elena Sarti</span>
                    <span
                      style={{
                        display: "block",
                        fontSize: ".72em",
                        color: "#6B776F",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      Spritz
                    </span>
                  </span>
                  <span style={{ fontWeight: "600", fontSize: ".88em", textAlign: "right" }}>€ 9</span>
                  <span
                    style={{
                      background: "#1F3A2C",
                      color: "#fff",
                      borderRadius: "2em",
                      padding: ".5em 1em",
                      fontSize: ".72em",
                      fontWeight: "600",
                      whiteSpace: "nowrap",
                    }}
                  >
                    Prepara
                  </span>
                </div>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "2.9em minmax(0,1fr) 3.6em auto",
                    gap: "1em",
                    alignItems: "center",
                    padding: ".7em .8em",
                    borderRadius: "1.1em",
                  }}
                >
                  <span
                    style={{
                      width: "2.9em",
                      height: "2.9em",
                      borderRadius: "50%",
                      background: "#F1F4EF",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      lineHeight: "1",
                    }}
                  >
                    <span style={{ fontSize: ".5em", color: "#6B776F" }}>lettino</span>
                    <span style={{ fontWeight: "600", fontSize: "1em", letterSpacing: "-.03em" }}>6</span>
                  </span>
                  <span style={{ minWidth: "0" }}>
                    <span style={{ display: "block", fontWeight: "600", fontSize: ".9em", letterSpacing: "-.015em" }}>Giulia Bianchi</span>
                    <span
                      style={{
                        display: "block",
                        fontSize: ".72em",
                        color: "#6B776F",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      Insalata Cesare · Acqua · Caffè
                    </span>
                  </span>
                  <span style={{ fontWeight: "600", fontSize: ".88em", textAlign: "right" }}>€ 44</span>
                  <span
                    style={{
                      background: "#EEF2EC",
                      color: "#1F3A2C",
                      borderRadius: "2em",
                      padding: ".5em 1em",
                      fontSize: ".72em",
                      fontWeight: "600",
                      whiteSpace: "nowrap",
                    }}
                  >
                    Segna pronto
                  </span>
                </div>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "2.9em minmax(0,1fr) 3.6em auto",
                    gap: "1em",
                    alignItems: "center",
                    padding: ".7em .8em",
                    borderRadius: "1.1em",
                  }}
                >
                  <span
                    style={{
                      width: "2.9em",
                      height: "2.9em",
                      borderRadius: "50%",
                      background: "#F1F4EF",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      lineHeight: "1",
                    }}
                  >
                    <span style={{ fontSize: ".5em", color: "#6B776F" }}>lettino</span>
                    <span style={{ fontWeight: "600", fontSize: "1em", letterSpacing: "-.03em" }}>21</span>
                  </span>
                  <span style={{ minWidth: "0" }}>
                    <span style={{ display: "block", fontWeight: "600", fontSize: ".9em", letterSpacing: "-.015em" }}>Luca Ferri</span>
                    <span
                      style={{
                        display: "block",
                        fontSize: ".72em",
                        color: "#6B776F",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      Panino del Circolo · Birra
                    </span>
                  </span>
                  <span style={{ fontWeight: "600", fontSize: ".88em", textAlign: "right" }}>€ 23</span>
                  <span
                    style={{
                      background: "#D8EBD3",
                      color: "#1F5A33",
                      borderRadius: "2em",
                      padding: ".5em 1em",
                      fontSize: ".72em",
                      fontWeight: "600",
                      whiteSpace: "nowrap",
                    }}
                  >
                    Consegna
                  </span>
                </div>
              </div>
              <div style={{ marginTop: "auto", fontSize: ".7em", color: "#6B776F" }}>
                Menù aggiornato 2 minuti fa · Tiramisù esaurito, nascosto ai soci
              </div>
            </div>
            <div
              style={{
                position: "absolute",
                left: "2.6em",
                top: "2.4em",
                width: "13.2em",
                height: "31.4em",
                background: "#16241C",
                borderRadius: "2.3em",
                padding: ".4em",
                boxShadow: "0 2.4em 3.6em -2em rgba(22,36,28,.6)",
              }}
            >
              <div
                style={{
                  position: "relative",
                  height: "100%",
                  background: "#FAF8F3",
                  borderRadius: "1.95em",
                  overflow: "hidden",
                  display: "flex",
                  flexDirection: "column",
                  padding: "1.5em 1em 1em",
                  gap: ".85em",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontFamily: "'Instrument Serif',serif", fontStyle: "italic", fontSize: "1.1em" }}>Pineta</span>
                  <span
                    style={{
                      width: "2.1em",
                      height: "2.1em",
                      borderRadius: "50%",
                      background: "#E6ECE3",
                      fontSize: ".6em",
                      fontWeight: "600",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    MR
                  </span>
                </div>
                <div style={{ fontSize: "1.32em", fontWeight: "600", letterSpacing: "-.035em", lineHeight: "1.05" }}>
                  Ciao Marco,
                  <br />
                  cosa ti portiamo?
                </div>
                <div style={{ display: "flex", gap: ".35em", fontSize: ".62em", fontWeight: "600" }}>
                  <span style={{ background: "#16241C", color: "#fff", borderRadius: "2em", padding: ".45em .95em" }}>Bar</span>
                  <span style={{ background: "#ECEFE8", borderRadius: "2em", padding: ".45em .95em" }}>Cucina</span>
                  <span style={{ background: "#ECEFE8", borderRadius: "2em", padding: ".45em .95em" }}>Dolci</span>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: ".75em" }}>
                  <div style={{ display: "flex", gap: ".6em", alignItems: "center" }}>
                    <span
                      style={{
                        position: "relative",
                        width: "3em",
                        height: "3em",
                        borderRadius: ".9em",
                        background: "#F2B880",
                        flex: "none",
                      }}
                    >
                      <span
                        style={{
                          position: "absolute",
                          top: "-.35em",
                          right: "-.35em",
                          width: "1.35em",
                          height: "1.35em",
                          borderRadius: "50%",
                          background: "#16241C",
                          color: "#fff",
                          fontSize: ".55em",
                          fontWeight: "600",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        2
                      </span>
                    </span>
                    <span style={{ flex: "1", minWidth: "0" }}>
                      <span style={{ display: "block", fontSize: ".76em", fontWeight: "600", letterSpacing: "-.01em" }}>Spritz</span>
                      <span style={{ fontSize: ".64em", color: "#6B776F" }}>€ 9</span>
                    </span>
                    <span
                      style={{
                        width: "1.75em",
                        height: "1.75em",
                        borderRadius: "50%",
                        background: "#E6ECE3",
                        color: "#16241C",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: ".8em",
                        flex: "none",
                      }}
                    >
                      +
                    </span>
                  </div>
                  <div style={{ display: "flex", gap: ".6em", alignItems: "center" }}>
                    <span
                      style={{
                        position: "relative",
                        width: "3em",
                        height: "3em",
                        borderRadius: ".9em",
                        background: "#E9DDC4",
                        flex: "none",
                      }}
                    >
                      <span
                        style={{
                          position: "absolute",
                          top: "-.35em",
                          right: "-.35em",
                          width: "1.35em",
                          height: "1.35em",
                          borderRadius: "50%",
                          background: "#16241C",
                          color: "#fff",
                          fontSize: ".55em",
                          fontWeight: "600",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        1
                      </span>
                    </span>
                    <span style={{ flex: "1", minWidth: "0" }}>
                      <span style={{ display: "block", fontSize: ".76em", fontWeight: "600", letterSpacing: "-.01em" }}>Club sandwich</span>
                      <span style={{ fontSize: ".64em", color: "#6B776F" }}>€ 14</span>
                    </span>
                    <span
                      style={{
                        width: "1.75em",
                        height: "1.75em",
                        borderRadius: "50%",
                        background: "#E6ECE3",
                        color: "#16241C",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: ".8em",
                        flex: "none",
                      }}
                    >
                      +
                    </span>
                  </div>
                  <div style={{ display: "flex", gap: ".6em", alignItems: "center" }}>
                    <span
                      style={{
                        position: "relative",
                        width: "3em",
                        height: "3em",
                        borderRadius: ".9em",
                        background: "#CFE0C3",
                        flex: "none",
                      }}
                    ></span>
                    <span style={{ flex: "1", minWidth: "0" }}>
                      <span style={{ display: "block", fontSize: ".76em", fontWeight: "600", letterSpacing: "-.01em" }}>
                        Insalata Cesare
                      </span>
                      <span style={{ fontSize: ".64em", color: "#6B776F" }}>€ 16</span>
                    </span>
                    <span
                      style={{
                        width: "1.75em",
                        height: "1.75em",
                        borderRadius: "50%",
                        background: "#E6ECE3",
                        color: "#16241C",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: ".8em",
                        flex: "none",
                      }}
                    >
                      +
                    </span>
                  </div>
                  <div style={{ display: "flex", gap: ".6em", alignItems: "center" }}>
                    <span
                      style={{
                        position: "relative",
                        width: "3em",
                        height: "3em",
                        borderRadius: ".9em",
                        background: "#D6E2EA",
                        flex: "none",
                      }}
                    ></span>
                    <span style={{ flex: "1", minWidth: "0" }}>
                      <span style={{ display: "block", fontSize: ".76em", fontWeight: "600", letterSpacing: "-.01em" }}>
                        Acqua frizzante
                      </span>
                      <span style={{ fontSize: ".64em", color: "#6B776F" }}>€ 3</span>
                    </span>
                    <span
                      style={{
                        width: "1.75em",
                        height: "1.75em",
                        borderRadius: "50%",
                        background: "#E6ECE3",
                        color: "#16241C",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: ".8em",
                        flex: "none",
                      }}
                    >
                      +
                    </span>
                  </div>
                </div>
                <div
                  style={{
                    position: "absolute",
                    left: ".8em",
                    right: ".8em",
                    bottom: ".8em",
                    background: "#16241C",
                    color: "#fff",
                    borderRadius: "2em",
                    padding: ".75em 1em",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    fontSize: ".66em",
                  }}
                >
                  <span style={{ color: "#B9C7BC" }}>3 articoli</span>
                  <b style={{ fontWeight: "600" }}>Ordina · € 39</b>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}

      {isA ? (
        <>
          <div
            style={{
              position: "absolute",
              inset: "0",
              background: "#F4F6F7",
              color: "#141A1F",
              fontFamily: "'Plus Jakarta Sans',sans-serif",
              display: "grid",
              gridTemplateColumns: "12.5em minmax(0,1fr)",
            }}
          >
            <div
              style={{
                background: "#fff",
                borderRight: "1px solid #E8ECEE",
                padding: "1.4em 0 1.2em",
                display: "flex",
                flexDirection: "column",
                gap: ".2em",
              }}
            >
              <div style={{ padding: "0 1.2em 1.3em" }}>
                <div style={{ fontWeight: "800", fontSize: "1.3em", letterSpacing: "-.035em" }}>Dimora</div>
                <div style={{ fontSize: ".68em", color: "#5F6B73" }}>Property Management</div>
              </div>
              <span style={{ padding: ".6em 1.2em .6em 1.42em", fontSize: ".78em", color: "#5F6B73" }}>▦&nbsp; Overview</span>
              <span
                style={{
                  padding: ".6em 1.2em",
                  fontSize: ".78em",
                  color: "#12A06B",
                  fontWeight: "700",
                  borderLeft: ".22em solid #12A06B",
                  background: "#EFFAF4",
                }}
              >
                ▦&nbsp; Suite Navona
              </span>
              <span style={{ padding: ".6em 1.2em .6em 1.42em", fontSize: ".78em", color: "#5F6B73" }}>▦&nbsp; Loft Prati</span>
              <span style={{ padding: ".6em 1.2em .6em 1.42em", fontSize: ".78em", color: "#5F6B73" }}>▦&nbsp; Studio Trastevere</span>
              <span style={{ marginTop: "auto", padding: ".6em 1.42em", fontSize: ".78em", color: "#5F6B73" }}>⚙&nbsp; Impostazioni</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", minWidth: "0" }}>
              <div
                style={{
                  height: "3.5em",
                  flex: "none",
                  background: "#fff",
                  borderBottom: "1px solid #E8ECEE",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "0 1.4em",
                  gap: "1em",
                }}
              >
                <span style={{ fontWeight: "800", fontSize: "1em", letterSpacing: "-.02em", whiteSpace: "nowrap" }}>
                  Suite Navona — Gestione casa
                </span>
                <span
                  style={{ display: "flex", alignItems: "center", gap: ".7em", fontSize: ".76em", color: "#5F6B73", whiteSpace: "nowrap" }}
                >
                  🔔&nbsp; Ciao <b style={{ color: "#141A1F" }}>Marco</b>
                  <span
                    style={{
                      width: "2.1em",
                      height: "2.1em",
                      borderRadius: "50%",
                      background: "#1D2A33",
                      color: "#fff",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: "700",
                    }}
                  >
                    M
                  </span>
                </span>
              </div>
              <div
                style={{
                  flex: "1",
                  padding: "1.1em 1.4em",
                  display: "grid",
                  gridTemplateColumns: "minmax(0,1.75fr) minmax(0,1fr)",
                  gridTemplateRows: "auto minmax(0,1fr)",
                  gap: "1em",
                  minHeight: "0",
                }}
              >
                <div
                  style={{
                    background: "linear-gradient(135deg,#0E2B23,#12181C 72%)",
                    color: "#fff",
                    borderRadius: "1.3em",
                    padding: "1.15em 1.4em",
                    display: "flex",
                    flexDirection: "column",
                    gap: ".45em",
                    boxShadow: "0 1em 2em -1.2em rgba(14,43,35,.7)",
                  }}
                >
                  <span style={{ fontSize: ".64em", letterSpacing: ".14em", color: "#4ADE9D", fontWeight: "700" }}>STATO AUTOFATTURE</span>
                  <span style={{ fontWeight: "800", fontSize: "2.3em", letterSpacing: "-.04em", lineHeight: "1" }}>€ 42.890,00</span>
                  <span style={{ fontSize: ".76em", color: "#C3CDD2" }}>Incassi del periodo · portali e prenotazioni dirette</span>
                  <span style={{ display: "flex", gap: ".5em", marginTop: ".45em" }}>
                    <span
                      style={{
                        background: "#4ADE9D",
                        color: "#0E2B23",
                        borderRadius: ".6em",
                        padding: ".5em .95em",
                        fontWeight: "700",
                        fontSize: ".76em",
                      }}
                    >
                      ➤ Invia allo SdI
                    </span>
                    <span
                      style={{ background: "#253037", borderRadius: ".6em", padding: ".5em .95em", fontWeight: "600", fontSize: ".76em" }}
                    >
                      👁 Dettagli
                    </span>
                  </span>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: ".8em", minWidth: "0" }}>
                  <div style={{ flex: "1", background: "#FBEEEE", borderRadius: "1em", padding: ".85em 1em" }}>
                    <div style={{ color: "#D33A3A", fontWeight: "800", fontSize: ".95em" }}>ⓘ Avvisi</div>
                    <div style={{ fontSize: ".74em", color: "#D33A3A", marginTop: ".25em" }}>2 fatture da inviare</div>
                  </div>
                  <div
                    style={{
                      flex: "1",
                      background: "#131A2B",
                      color: "#fff",
                      borderRadius: "1em",
                      padding: ".85em 1em",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      gap: ".5em",
                    }}
                  >
                    <span>
                      <b style={{ fontSize: ".92em" }}>Esporta dati</b>
                      <br />
                      <span style={{ fontSize: ".68em", color: "#A9B1C4" }}>Report PDF mensile</span>
                    </span>
                    <span>→</span>
                  </div>
                </div>
                <div
                  style={{
                    background: "#fff",
                    borderRadius: "1.3em",
                    padding: "1em 1.3em",
                    display: "flex",
                    flexDirection: "column",
                    minHeight: "0",
                    minWidth: "0",
                  }}
                >
                  <div
                    style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: "1em", marginBottom: ".6em" }}
                  >
                    <span>
                      <span style={{ display: "block", fontWeight: "800", fontSize: "1.12em", letterSpacing: "-.025em" }}>
                        Fatture in attesa
                      </span>
                      <span style={{ fontSize: ".68em", color: "#5F6B73" }}>tutti gli appartamenti</span>
                    </span>
                    <span style={{ fontSize: ".72em", color: "#12A06B", fontWeight: "700" }}>Archivio</span>
                  </div>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "minmax(0,1.5fr) 5em 6.2em 4.4em",
                      gap: ".8em",
                      fontSize: ".58em",
                      letterSpacing: ".12em",
                      color: "#8A959C",
                      fontWeight: "700",
                      padding: ".4em 0",
                    }}
                  >
                    <span>APPARTAMENTO</span>
                    <span>DATA</span>
                    <span>IMPORTO</span>
                    <span style={{ textAlign: "right" }}>AZIONI</span>
                  </div>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "minmax(0,1.5fr) 5em 6.2em 4.4em",
                      gap: ".8em",
                      alignItems: "center",
                      padding: ".62em 0",
                      borderTop: "1px solid #EEF1F3",
                      fontSize: ".8em",
                    }}
                  >
                    <span style={{ display: "flex", alignItems: "center", gap: ".6em", fontWeight: "700", minWidth: "0" }}>
                      <span style={{ width: "1.9em", height: "1.9em", borderRadius: ".45em", background: "#DCE3E7", flex: "none" }}></span>
                      <span style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>Suite Navona</span>
                    </span>
                    <span style={{ color: "#5F6B73" }}>22 ott</span>
                    <span style={{ color: "#12A06B", fontWeight: "700" }}>€ 1.450,00</span>
                    <span style={{ display: "flex", gap: ".7em", justifyContent: "flex-end", fontWeight: "700" }}>
                      <span style={{ color: "#12A06B" }}>✓</span>
                      <span style={{ color: "#8A959C" }}>✎</span>
                      <span style={{ color: "#D33A3A" }}>✕</span>
                    </span>
                  </div>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "minmax(0,1.5fr) 5em 6.2em 4.4em",
                      gap: ".8em",
                      alignItems: "center",
                      padding: ".62em 0",
                      borderTop: "1px solid #EEF1F3",
                      fontSize: ".8em",
                    }}
                  >
                    <span style={{ display: "flex", alignItems: "center", gap: ".6em", fontWeight: "700", minWidth: "0" }}>
                      <span style={{ width: "1.9em", height: "1.9em", borderRadius: ".45em", background: "#DCE3E7", flex: "none" }}></span>
                      <span style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>Loft Prati</span>
                    </span>
                    <span style={{ color: "#5F6B73" }}>21 ott</span>
                    <span style={{ color: "#12A06B", fontWeight: "700" }}>€ 2.100,00</span>
                    <span style={{ display: "flex", gap: ".7em", justifyContent: "flex-end", fontWeight: "700" }}>
                      <span style={{ color: "#12A06B" }}>✓</span>
                      <span style={{ color: "#8A959C" }}>✎</span>
                      <span style={{ color: "#D33A3A" }}>✕</span>
                    </span>
                  </div>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "minmax(0,1.5fr) 5em 6.2em 4.4em",
                      gap: ".8em",
                      alignItems: "center",
                      padding: ".62em 0",
                      borderTop: "1px solid #EEF1F3",
                      fontSize: ".8em",
                    }}
                  >
                    <span style={{ display: "flex", alignItems: "center", gap: ".6em", fontWeight: "700", minWidth: "0" }}>
                      <span style={{ width: "1.9em", height: "1.9em", borderRadius: ".45em", background: "#DCE3E7", flex: "none" }}></span>
                      <span style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>Studio Trastevere</span>
                    </span>
                    <span style={{ color: "#5F6B73" }}>20 ott</span>
                    <span style={{ color: "#12A06B", fontWeight: "700" }}>€ 680,00</span>
                    <span style={{ display: "flex", gap: ".7em", justifyContent: "flex-end", fontWeight: "700" }}>
                      <span style={{ color: "#12A06B" }}>✓</span>
                      <span style={{ color: "#8A959C" }}>✎</span>
                      <span style={{ color: "#D33A3A" }}>✕</span>
                    </span>
                  </div>
                </div>
                <div
                  style={{
                    background: "#fff",
                    borderRadius: "1.3em",
                    padding: "1em 1.2em",
                    display: "flex",
                    flexDirection: "column",
                    gap: ".45em",
                    minWidth: "0",
                  }}
                >
                  <span style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: ".5em" }}>
                    <span
                      style={{
                        width: "2.1em",
                        height: "2.1em",
                        borderRadius: ".6em",
                        background: "#DCEBFA",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: ".8em",
                      }}
                    >
                      ▣
                    </span>
                    <span
                      style={{
                        background: "#DDF7EA",
                        color: "#12A06B",
                        borderRadius: "2em",
                        padding: ".25em .7em",
                        fontSize: ".62em",
                        fontWeight: "700",
                        whiteSpace: "nowrap",
                      }}
                    >
                      +12,4% sul mese
                    </span>
                  </span>
                  <span style={{ fontWeight: "800", fontSize: "1.2em", letterSpacing: "-.025em", marginTop: "auto" }}>Ciclo fiscale</span>
                  <span style={{ fontSize: ".72em", color: "#5F6B73" }}>1 – 31 ottobre</span>
                  <div style={{ height: ".45em", background: "#ECEFF1", borderRadius: "1em", marginTop: ".3em" }}>
                    <div style={{ width: "78%", height: "100%", background: "#12A06B", borderRadius: "1em" }}></div>
                  </div>
                  <span style={{ fontSize: ".64em", color: "#5F6B73" }}>78% delle fatture emesse</span>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}

      {isD ? (
        <>
          <div
            style={{
              position: "absolute",
              inset: "0",
              background: "#EFEBFF",
              color: "#1A1333",
              fontFamily: "'Space Grotesk',sans-serif",
              display: "grid",
              gridTemplateColumns: "minmax(0,1.05fr) minmax(0,1fr)",
              gap: "1em",
              padding: "1.3em",
            }}
          >
            <div
              style={{
                background: "#fff",
                borderRadius: "1.2em",
                padding: "1.1em 1.2em",
                display: "flex",
                flexDirection: "column",
                gap: ".8em",
                minWidth: "0",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: ".5em", fontWeight: "700", fontSize: "1.05em" }}>
                <span style={{ width: ".7em", height: ".7em", borderRadius: ".2em", background: "#6D4AFF" }}></span>Pulse{" "}
                <span style={{ fontWeight: "400", color: "#7B7394", fontSize: ".8em" }}>· report del lunedì</span>
              </div>
              <div
                style={{
                  alignSelf: "flex-end",
                  maxWidth: "85%",
                  background: "#6D4AFF",
                  color: "#fff",
                  borderRadius: "1em 1em .2em 1em",
                  padding: ".6em .8em",
                  fontSize: ".85em",
                }}
              >
                Quali clienti hanno calato gli ordini a settembre?
              </div>
              <div
                style={{
                  alignSelf: "flex-start",
                  maxWidth: "92%",
                  background: "#F5F2FF",
                  borderRadius: "1em 1em 1em .2em",
                  padding: ".7em .85em",
                  fontSize: ".85em",
                  display: "flex",
                  flexDirection: "column",
                  gap: ".45em",
                }}
              >
                <span>3 clienti sotto la loro media:</span>
                <span style={{ display: "flex", justifyContent: "space-between", gap: "1em" }}>
                  <b>Market Rossi</b>
                  <span style={{ color: "#E8553A", fontWeight: "700" }}>−18%</span>
                </span>
                <span style={{ display: "flex", justifyContent: "space-between", gap: "1em" }}>
                  <b>Bio Sud</b>
                  <span style={{ color: "#E8553A", fontWeight: "700" }}>−12%</span>
                </span>
                <span style={{ display: "flex", justifyContent: "space-between", gap: "1em" }}>
                  <b>Gastronomia Lux</b>
                  <span style={{ color: "#E8553A", fontWeight: "700" }}>−9%</span>
                </span>
                <span style={{ fontSize: ".8em", color: "#7B7394" }}>fonte: gestionale + magazzino · 07:00</span>
              </div>
              <div
                style={{
                  marginTop: "auto",
                  border: "1px solid #DED7FF",
                  borderRadius: "2em",
                  padding: ".55em .9em",
                  fontSize: ".8em",
                  color: "#9A93B3",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <span>Chiedi ai tuoi dati…</span>
                <span style={{ color: "#6D4AFF", fontWeight: "700" }}>↑</span>
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "1em", minWidth: "0" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: ".8em" }}>
                <div style={{ background: "#fff", borderRadius: "1em", padding: ".8em .9em" }}>
                  <div style={{ fontSize: ".75em", color: "#7B7394" }}>Vendite settimana</div>
                  <div style={{ fontWeight: "700", fontSize: "1.6em", letterSpacing: "-.03em" }}>€ 412k</div>
                  <div style={{ fontSize: ".75em", color: "#1E9E6A", fontWeight: "700" }}>+4%</div>
                </div>
                <div style={{ background: "#1A1333", color: "#fff", borderRadius: "1em", padding: ".8em .9em" }}>
                  <div style={{ fontSize: ".75em", color: "#B9B0DA" }}>Giacenze anomale</div>
                  <div style={{ fontWeight: "700", fontSize: "1.6em", letterSpacing: "-.03em" }}>7</div>
                  <div style={{ fontSize: ".75em", color: "#FF8A6B", fontWeight: "700" }}>da guardare</div>
                </div>
              </div>
              <div
                style={{
                  flex: "1",
                  background: "#fff",
                  borderRadius: "1em",
                  padding: ".9em 1em",
                  display: "flex",
                  flexDirection: "column",
                  gap: ".6em",
                  minHeight: "0",
                }}
              >
                <div style={{ fontSize: ".8em", fontWeight: "700" }}>Ordini per zona</div>
                <div
                  style={{
                    flex: "1",
                    display: "grid",
                    gridTemplateColumns: "repeat(5,minmax(0,1fr))",
                    gap: ".6em",
                    alignItems: "end",
                    minHeight: "0",
                  }}
                >
                  <div style={{ height: "78%", background: "#6D4AFF", borderRadius: ".4em .4em 0 0" }}></div>
                  <div style={{ height: "64%", background: "#6D4AFF", borderRadius: ".4em .4em 0 0" }}></div>
                  <div style={{ height: "90%", background: "#6D4AFF", borderRadius: ".4em .4em 0 0" }}></div>
                  <div style={{ height: "42%", background: "#FF7A59", borderRadius: ".4em .4em 0 0" }}></div>
                  <div style={{ height: "70%", background: "#6D4AFF", borderRadius: ".4em .4em 0 0" }}></div>
                </div>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(5,minmax(0,1fr))",
                    gap: ".6em",
                    fontSize: ".7em",
                    color: "#7B7394",
                    textAlign: "center",
                  }}
                >
                  <span>Nord</span>
                  <span>Centro</span>
                  <span>Roma</span>
                  <span style={{ color: "#E8553A", fontWeight: "700" }}>Sud</span>
                  <span>Isole</span>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}

      {isS ? (
        <>
          <div
            style={{
              position: "absolute",
              inset: "0",
              background: "#FFE7DA",
              color: "#1C1C1C",
              fontFamily: "'Sora',sans-serif",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "3em",
              padding: "1.2em",
            }}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: ".9em", maxWidth: "17em" }}>
              <div style={{ fontWeight: "700", fontSize: "2.6em", letterSpacing: "-.05em", lineHeight: "1" }}>
                ultimo<span style={{ color: "#FF5A36" }}>.</span>
              </div>
              <div style={{ fontSize: ".9em", color: "#6B4A3F" }}>{"L'app per i corrieri dell'ultimo miglio"}</div>
              <div style={{ display: "flex", gap: ".5em", flexWrap: "wrap" }}>
                <span style={{ background: "#1C1C1C", color: "#fff", borderRadius: "2em", padding: ".4em .9em", fontSize: ".75em" }}>
                  MVP · 3 funzioni
                </span>
                <span style={{ background: "#fff", borderRadius: "2em", padding: ".4em .9em", fontSize: ".75em" }}>12 corrieri pilota</span>
              </div>
            </div>
            <div
              style={{
                width: "15em",
                height: "30em",
                background: "#1C1C1C",
                borderRadius: "2.4em",
                padding: ".5em",
                flex: "none",
                boxShadow: "0 1.6em 3em -1.4em rgba(120,40,10,.45)",
              }}
            >
              <div
                style={{
                  height: "100%",
                  background: "#FFF8F3",
                  borderRadius: "2em",
                  padding: "1.4em 1em 1em",
                  display: "flex",
                  flexDirection: "column",
                  gap: ".8em",
                  overflow: "hidden",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: ".65em", fontWeight: "600" }}>
                  <span>9:41</span>
                  <span>●●●</span>
                </div>
                <div style={{ fontWeight: "700", fontSize: "1.25em", letterSpacing: "-.03em" }}>Ciao Marco</div>
                <div
                  style={{
                    background: "#FF5A36",
                    color: "#fff",
                    borderRadius: "1.2em",
                    padding: ".9em",
                    display: "flex",
                    flexDirection: "column",
                    gap: ".3em",
                  }}
                >
                  <span style={{ fontSize: ".7em", opacity: ".85" }}>Prossima consegna · tra 6 min</span>
                  <span style={{ fontWeight: "700", fontSize: "1em", lineHeight: "1.2" }}>Via Indipendenza 18</span>
                  <span style={{ fontSize: ".7em" }}>2 colli · citofono Bianchi</span>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: ".55em", fontSize: ".75em" }}>
                  <span style={{ display: "flex", alignItems: "center", gap: ".6em" }}>
                    <span
                      style={{
                        width: "1.3em",
                        height: "1.3em",
                        borderRadius: "50%",
                        background: "#1C1C1C",
                        color: "#fff",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: ".8em",
                      }}
                    >
                      ✓
                    </span>
                    <span style={{ textDecoration: "line-through", color: "#9A8A82" }}>Via Rizzoli 4</span>
                  </span>
                  <span style={{ display: "flex", alignItems: "center", gap: ".6em" }}>
                    <span
                      style={{
                        width: "1.3em",
                        height: "1.3em",
                        borderRadius: "50%",
                        background: "#1C1C1C",
                        color: "#fff",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: ".8em",
                      }}
                    >
                      ✓
                    </span>
                    <span style={{ textDecoration: "line-through", color: "#9A8A82" }}>Piazza Maggiore 1</span>
                  </span>
                  <span style={{ display: "flex", alignItems: "center", gap: ".6em" }}>
                    <span style={{ width: "1.3em", height: "1.3em", borderRadius: "50%", border: "2px solid #FF5A36" }}></span>
                    <b>Via Indipendenza 18</b>
                  </span>
                  <span style={{ display: "flex", alignItems: "center", gap: ".6em" }}>
                    <span style={{ width: "1.3em", height: "1.3em", borderRadius: "50%", border: "2px solid #E5D6CD" }}></span>
                    <span>Strada Maggiore 30</span>
                  </span>
                </div>
                <div
                  style={{
                    marginTop: "auto",
                    background: "#1C1C1C",
                    color: "#fff",
                    borderRadius: "1.2em",
                    padding: ".8em",
                    textAlign: "center",
                    fontWeight: "600",
                    fontSize: ".85em",
                  }}
                >
                  Consegnato
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </div>
  </>
</div>
  );
}
