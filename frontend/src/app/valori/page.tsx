import type { Metadata } from "next";
import ValoriPage from "@/components/cp/pages/Valori";

export const metadata: Metadata = {
  title: "Valori | CiMa Progetti",
  description: "Consapevolezza, persone, dati e misura: i quattro valori che filtrano ogni progetto.",
};

export default function ValoriRoute() {
  return <ValoriPage />;
}
