import "react";

// Permette variabili CSS custom (es. "--h-color") negli stili inline.
declare module "react" {
  interface CSSProperties {
    [key: `--${string}`]: string | number | undefined;
  }
}
