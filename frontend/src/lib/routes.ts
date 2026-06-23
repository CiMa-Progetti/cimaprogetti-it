// Central mapping between the design's onNavigate(route) keys and Next.js paths.
export type Route = "home" | "metodo" | "servizi" | "progetti" | "chisiamo" | "contatti" | "login";

export const ROUTE_PATH: Record<Route, string> = {
  home: "/",
  metodo: "/metodo",
  servizi: "/servizi",
  progetti: "/progetti",
  chisiamo: "/chi-siamo",
  contatti: "/contatti",
  login: "/login",
};

export const NAV_LINKS: { label: string; route: Route }[] = [
  { label: "Il Metodo", route: "metodo" },
  { label: "Servizi", route: "servizi" },
  { label: "Progetti", route: "progetti" },
  { label: "Chi Siamo", route: "chisiamo" },
];
