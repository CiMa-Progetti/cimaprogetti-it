import type { Metadata } from "next";
import MetodoPage from "@/components/cp/pages/Metodo";

export const metadata: Metadata = {
  title: "Come lavoriamo | CiMa Progetti",
  description: "Sei passaggi, dal sopralluogo gratuito all’affiancamento: come lavoriamo con te.",
};

export default function MetodoRoute() {
  return <MetodoPage />;
}
