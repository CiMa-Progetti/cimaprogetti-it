"use client";
import { useEffect } from "react";

const MATERIAL_SYMBOLS_URL =
  "https://fonts.googleapis.com/css2?family=Material+Symbols+Sharp:opsz,wght,FILL,GRAD@24,500,0,0&display=block";

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
