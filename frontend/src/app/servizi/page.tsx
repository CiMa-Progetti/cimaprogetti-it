import type { Metadata } from "next";
import ServiziPage from "@/components/cp/pages/Servizi";

export const metadata: Metadata = {
  title: "Servizi | CiMa Progetti",
  description: "Software su misura, app, MVP, automazione, agenti IA per la reportistica, IA locale, cybersicurezza, formazione e affiancamento.",
};

export default function ServiziRoute() {
  return <ServiziPage />;
}
