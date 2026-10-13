import type { Metadata } from "next";
import ContattiPage from "@/components/cp/pages/Contatti";

export const metadata: Metadata = {
  title: "Contatti | CiMa Progetti",
  description: "Parliamo del tuo prossimo progetto. Email, telefono e founder di CiMa Progetti.",
};

export default function ContattiRoute() {
  return <ContattiPage />;
}
