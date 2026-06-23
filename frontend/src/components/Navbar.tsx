"use client";
import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Logo, Button, Icon } from "@/components/ds";
import { useTheme } from "@/components/theme/ThemeProvider";
import { NAV_LINKS, ROUTE_PATH, type Route } from "@/lib/routes";

function activeRoute(pathname: string): Route | null {
  if (pathname === "/") return "home";
  const hit = (Object.entries(ROUTE_PATH) as [Route, string][]).find(
    ([, p]) => p !== "/" && pathname.startsWith(p)
  );
  return hit ? hit[0] : null;
}

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const { theme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [mobOpen, setMobOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const active = activeRoute(pathname);
  const dark = theme === "dark";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Publish navbar's visible bottom edge to --nav-h. Uses getBoundingClientRect().bottom
  // (not offsetHeight) so sticky followers (e.g. /progetti tab bar) pin flush to the
  // navbar while it shrinks, and snap to top:0 when the navbar scrolls off-screen.
  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;
    const setVar = () => {
      const bottom = Math.max(0, nav.getBoundingClientRect().bottom);
      document.documentElement.style.setProperty("--nav-h", `${bottom}px`);
    };
    setVar();
    const ro = new ResizeObserver(setVar);
    ro.observe(nav);
    window.addEventListener("scroll", setVar, { passive: true });
    window.addEventListener("resize", setVar);
    return () => {
      ro.disconnect();
      window.removeEventListener("scroll", setVar);
      window.removeEventListener("resize", setVar);
    };
  }, []);

  const go = (r: Route) => {
    setMobOpen(false);
    router.push(ROUTE_PATH[r]);
  };

  const logoSrc = dark ? "/logo-white.svg" : "/logo.svg";

  return (
    <>
      <nav ref={navRef} className={"cm-nav" + (scrolled ? " cm-nav--scrolled" : "")}>
        <div className="cm-nav__inner">
          <button className="cm-nav__logo" onClick={() => go("home")} aria-label="CiMa Progetti — Home" data-cursor="hug">
            <Logo variant={dark ? "white" : "dark"} height={scrolled ? 38 : 50} src={logoSrc} />
          </button>
          <div className="cm-nav__links">
            {NAV_LINKS.map((l) => (
              <button
                key={l.route}
                className={"cm-nav__link" + (active === l.route ? " is-active" : "")}
                onClick={() => go(l.route)}
                data-cursor="hug"
              >
                {l.label}
              </button>
            ))}
          </div>
          <div className="cm-nav__right">
            <span className="cm-nav__cta-desktop" style={{ display: "inline-flex" }}>
              <Button variant="primary" caps={false} size="sm" onClick={() => go("contatti")}>
                Contattaci
              </Button>
            </span>
            <button className="cm-nav__burger" aria-label="Apri menu" onClick={() => setMobOpen(true)} data-cursor="hug">
              <Icon name="menu" size={32} />
            </button>
          </div>
        </div>
      </nav>

      {mobOpen && (
        <div className="cm-mobnav">
          <div className="cm-mobnav__top">
            <Logo variant={dark ? "white" : "dark"} height={44} src={logoSrc} />
            <button className="cm-iconbtn" aria-label="Chiudi menu" onClick={() => setMobOpen(false)}>
              <Icon name="close" size={32} />
            </button>
          </div>
          <div className="cm-mobnav__links">
            {NAV_LINKS.concat([{ label: "Contatti", route: "contatti" }]).map((l) => (
              <button key={l.route} className={active === l.route ? "is-active" : ""} onClick={() => go(l.route)}>
                {l.label}
              </button>
            ))}
          </div>
          <div className="cm-mobnav__cta">
            <Button variant="primary" caps={false} onClick={() => go("contatti")} style={{ width: "100%" }}>
              Contattaci
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
