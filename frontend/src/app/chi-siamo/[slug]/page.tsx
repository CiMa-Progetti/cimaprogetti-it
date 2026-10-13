import type { Metadata } from "next";
import { notFound } from "next/navigation";
import FounderPage from "@/components/cp/pages/Founder";
import { CP_DATA } from "@/lib/cp/data";

type Params = { params: Promise<{ slug: string }> };

const findFounder = (slug: string) => CP_DATA.team.find((t: { slug: string }) => t.slug === slug);

export const dynamicParams = false;

export function generateStaticParams() {
  return CP_DATA.team.map((t: { slug: string }) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const f = findFounder((await params).slug);
  if (!f) return {};
  return {
    title: `${f.name} | CiMa Progetti`,
    description: `${f.name}, ${f.title} di CiMa Progetti. ${f.tagline}`,
  };
}

export default async function FounderRoute({ params }: Params) {
  const f = findFounder((await params).slug);
  if (!f) notFound();
  return <FounderPage founder={f} />;
}
