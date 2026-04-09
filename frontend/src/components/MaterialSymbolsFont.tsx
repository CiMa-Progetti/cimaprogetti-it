"use client";
import { useEffect } from "react";

const MATERIAL_SYMBOLS_URL =
  "https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@400,0&display=swap";

let loaded = false;

export default function MaterialSymbolsFont() {
  useEffect(() => {
    if (loaded) return;
    loaded = true;
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = MATERIAL_SYMBOLS_URL;
    document.head.appendChild(link);
  }, []);
  return null;
}
