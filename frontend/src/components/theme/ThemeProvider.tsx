"use client";
import React, { createContext, useContext, useState, useCallback } from "react";

type Theme = "light" | "dark";
type ThemeCtx = { theme: Theme; toggle: () => void; setTheme: (t: Theme) => void };

const Ctx = createContext<ThemeCtx>({ theme: "light", toggle: () => {}, setTheme: () => {} });

export const STORAGE_KEY = "cima-theme";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // Initialise from the value the pre-paint script already applied to <html>
  // (avoids a setState-in-effect cascade). Server renders "light".
  const [theme, setThemeState] = useState<Theme>(() =>
    typeof document !== "undefined" && document.documentElement.getAttribute("data-theme") === "dark"
      ? "dark"
      : "light"
  );

  const apply = useCallback((t: Theme) => {
    setThemeState(t);
    try {
      localStorage.setItem(STORAGE_KEY, t);
    } catch {}
    if (t === "dark") document.documentElement.setAttribute("data-theme", "dark");
    else document.documentElement.removeAttribute("data-theme");
  }, []);

  const toggle = useCallback(() => apply(theme === "dark" ? "light" : "dark"), [theme, apply]);

  return <Ctx.Provider value={{ theme, toggle, setTheme: apply }}>{children}</Ctx.Provider>;
}

export const useTheme = () => useContext(Ctx);

/** Inline script string applied in <head> before paint to avoid FOUC. */
export const themeNoFlashScript = `(function(){try{var t=localStorage.getItem('${STORAGE_KEY}');if(t==='dark'){document.documentElement.setAttribute('data-theme','dark');}}catch(e){}})();`;
