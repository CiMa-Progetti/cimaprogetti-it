"use client";
import { useTheme } from "./ThemeProvider";

export default function ThemeToggle({ floating = false }: { floating?: boolean }) {
  const { theme, toggle } = useTheme();
  const isDark = theme === "dark";
  const btn = (
    <button
      className="cm-switch"
      role="switch"
      aria-checked={isDark}
      aria-label={isDark ? "Passa al tema chiaro" : "Passa al tema scuro"}
      onClick={toggle}
      data-cursor="hug"
      suppressHydrationWarning
    >
      <span className="cm-switch__knob">
        <span className="material-symbols-outlined">{isDark ? "dark_mode" : "light_mode"}</span>
      </span>
    </button>
  );
  if (floating) {
    return (
      <div className="cm-theme-float">
        <span className="cm-theme-float__label">{isDark ? "Scuro" : "Chiaro"}</span>
        {btn}
      </div>
    );
  }
  return <div className="cm-theme">{btn}</div>;
}
